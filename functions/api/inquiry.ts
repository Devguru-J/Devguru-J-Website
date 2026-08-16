/* =========================================================================
   문의 접수 — POST /api/inquiry
   -------------------------------------------------------------------------
   사이트는 정적입니다. 이 경로 하나만 Cloudflare Pages Function 으로 돕니다.

   흐름:
     폼 제출 → 이 함수 → Resend 발송 → Cloudflare Email Routing → Gmail

     From      noreply@bymemory.dev   (Resend 로 인증한 발신 주소)
     To        jeff@bymemory.dev      (Email Routing 이 Gmail 로 전달)
     Reply-To  문의한 사람의 주소      (받은편지함에서 답장을 누르면 바로 감)

   환경 변수 (Cloudflare Pages → Settings → Environment variables):
     RESEND_API_KEY   필수. 암호화 변수로 저장합니다.
     INQUIRY_TO       선택. 기본값 jeff@bymemory.dev
     INQUIRY_FROM     선택. 기본값 기억 문의 <noreply@bymemory.dev>

   응답은 언제나 JSON 입니다. 폼은 ok 필드만 봅니다.
     200 { ok: true }               접수됨 (봇으로 판단해 버린 경우도 여기)
     400 { ok: false, error: '…' }  보낸 내용이 조건에 맞지 않음
     500 { ok: false, error: '…' }  키가 없음 — 설정 문제
     502 { ok: false, error: '…' }  Resend 쪽 실패
   ========================================================================= */

interface Env {
  RESEND_API_KEY?: string;
  INQUIRY_TO?: string;
  INQUIRY_FROM?: string;
}

/** 폼이 보내는 필드. 화면의 순서와 같습니다. */
const FIELDS = [
  ['name', '이름'],
  ['org', '회사 또는 팀'],
  ['contact', '연락 수단'],
  ['timeline', '예상 일정'],
  ['type', '필요한 작업'],
  ['budget', '예산 범위'],
] as const;

const REQUIRED = ['name', 'contact', 'type', 'budget', 'message'] as const;

/** 한 칸에 들어올 수 있는 최대 길이. 넘으면 보관도 읽기도 곤란해집니다. */
const LIMITS: Record<string, number> = {
  name: 100,
  org: 200,
  contact: 200,
  timeline: 200,
  type: 100,
  budget: 100,
  message: 5000,
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });

const text = (value: unknown) => (typeof value === 'string' ? value.trim() : '');

const looksLikeEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

/** 링크만 잔뜩 든 본문은 사람이 쓴 문의가 아닙니다. */
const linkCount = (value: string) => (value.match(/https?:\/\//gi) ?? []).length;

/** 메일 헤더는 줄바꿈으로 나뉩니다. 제목에 줄바꿈이 들어가면 안 됩니다. */
const singleLine = (value: string) => value.replace(/[\r\n]+/g, ' ').slice(0, 120);

const seoulTime = () =>
  new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(new Date());

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  const { request, env } = context;

  let data: Record<string, unknown>;
  try {
    data = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: '보낸 내용을 읽지 못했습니다.' }, 400);
  }

  // 미끼 칸이 채워졌으면 봇입니다. 조용히 접수된 척합니다 —
  // 거절을 알려주면 다음 시도에서 채우지 않을 뿐입니다.
  if (text(data.company)) return json({ ok: true });

  const message = text(data.message);

  // 사람이 쓴 문의라면 링크가 이만큼 필요하지 않습니다. 이것도 조용히 버립니다.
  if (linkCount(message) > 4) return json({ ok: true });

  for (const key of REQUIRED) {
    if (!text(data[key])) {
      return json({ ok: false, error: '필요한 칸이 비어 있습니다.' }, 400);
    }
  }

  if (data.consent !== true) {
    return json({ ok: false, error: '보관 동의가 필요합니다.' }, 400);
  }

  for (const [key, limit] of Object.entries(LIMITS)) {
    if (text(data[key]).length > limit) {
      return json({ ok: false, error: '적어주신 내용이 너무 깁니다.' }, 400);
    }
  }

  if (!env.RESEND_API_KEY) {
    // 키가 없으면 메일이 나갈 방법이 없습니다. 성공한 척하지 않습니다.
    console.error('RESEND_API_KEY 가 설정되지 않았습니다.');
    return json({ ok: false, error: '지금은 문의를 받을 수 없습니다.' }, 500);
  }

  const name = text(data.name);
  const contact = text(data.contact);

  const meta = FIELDS.map(([key, label]) => [label, text(data[key])] as const)
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`);

  const body = [
    message,
    '',
    '—',
    ...meta,
    `받은 시각: ${seoulTime()}`,
  ].join('\n');

  const payload: Record<string, unknown> = {
    from: env.INQUIRY_FROM || '기억 문의 <noreply@bymemory.dev>',
    to: [env.INQUIRY_TO || 'jeff@bymemory.dev'],
    subject: singleLine(`[기억] ${name} 님의 문의 · ${text(data.type)}`),
    text: body,
  };

  // 연락 수단이 이메일일 때만 Reply-To 를 답니다. 전화번호를 넣으면
  // 답장 버튼이 보내지지 않는 주소로 향합니다.
  if (looksLikeEmail(contact)) payload.reply_to = contact;

  let response: Response;
  try {
    response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${env.RESEND_API_KEY}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error('Resend 요청 실패', error);
    return json({ ok: false, error: '메일을 보내지 못했습니다.' }, 502);
  }

  if (!response.ok) {
    console.error('Resend 응답 오류', response.status, await response.text());
    return json({ ok: false, error: '메일을 보내지 못했습니다.' }, 502);
  }

  return json({ ok: true });
};

/** POST 외의 메서드로 열어보는 요청. 폼 페이지는 이 경로를 GET 하지 않습니다. */
export const onRequest = async () =>
  json({ ok: false, error: '이 주소는 문의 전송에만 씁니다.' }, 405);
