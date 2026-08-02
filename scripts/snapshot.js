// 기억(Memory) 사이트 시각 스냅샷 캡처.
//
// 쓰는 법은 docs/snapshots/README.md 참조. 요약하면:
//   1) npm run dev  (포트는 알아서 찾는다)
//   2) 아래 LABEL 을 바꾸고 Playwright MCP 의 browser_run_code_unsafe 에
//      filename 으로 이 파일의 절대 경로를 넘긴다
//   3) python3 scripts/snapshot-diff.py baseline current
//
// ※ 이 파일은 모듈이 아니라 함수 하나여야 한다. `async (page) => {...}` 형태를
//    유지할 것 — export / require 를 쓰면 MCP 가 로드하지 못한다.
// ※ MCP 는 저장소 밖 파일을 로드하지 못한다. 이 파일이 저장소 안에 있어야 하는 이유다.

async (page) => {
  // 'baseline' | 'current' | 'control' — docs/snapshots/<LABEL>/ 에 쌓인다.
  const LABEL = 'current';

  const REPO = '/Users/tuesdaymorning/Devguru/devguru_website';
  const OUT = REPO + '/docs/snapshots/' + LABEL;

  // 페이지 목록. 새 페이지를 만들면 여기에 추가한다.
  const PATHS = [
    '/',
    '/studio/',
    '/work/',
    '/contact/',
    '/MonkeyFlash/privacy/',
    '/404',
  ];

  // 데스크톱 / 모바일 두 폭. 여기를 늘리면 비교 비용도 같이 는다.
  const VIEWPORTS = [
    { name: 'w1440', width: 1440, height: 900 },
    { name: 'w390', width: 390, height: 844 },
  ];

  // astro dev 는 포트가 밀리기 쉬워서(4321 사용 중이면 4322…) 직접 찾는다.
  // 제목에 '기억' 이 있는 서버만 이 사이트로 인정한다 — 도림사 서버를 잘못 찍는 사고 방지.
  const MARKER = '기억';

  const browser = page.context().browser();
  const probe = await browser.newContext();
  const pp = await probe.newPage();
  let base = null;
  for (let port = 4321; port <= 4335; port++) {
    try {
      await pp.goto('http://localhost:' + port + '/', { waitUntil: 'domcontentloaded', timeout: 2500 });
      if ((await pp.title()).includes(MARKER)) { base = 'http://localhost:' + port; break; }
    } catch (e) { /* 그 포트엔 아무것도 없다 */ }
  }
  await probe.close();
  if (!base) return 'dev 서버를 못 찾았다. `npm run dev` 를 먼저 띄워라 (4321~4335 확인함).';

  const done = ['base = ' + base, 'out  = ' + OUT, ''];

  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      // 아래 세 가지가 캡처를 결정적으로 만든다. 바꾸면 과거 스냅샷과 비교 불가.
      deviceScaleFactor: 1,
      reducedMotion: 'reduce',
    });
    const p = await ctx.newPage();
    for (const path of PATHS) {
      const url = base + path;
      try {
        await p.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
      } catch (e) {
        try { await p.goto(url, { waitUntil: 'load', timeout: 45000 }); }
        catch (e2) { done.push('FAIL ' + url + ' :: ' + e2.message); continue; }
      }
      await p.waitForTimeout(1200);
      // 스크롤 리빌을 전부 발화시킨 뒤 맨 위로 되돌린다. 이걸 빼면 아래쪽 섹션이
      // 등장 전 상태(opacity 0)로 찍힌다.
      await p.evaluate(async () => {
        const h = document.body.scrollHeight;
        for (let y = 0; y < h; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 40)); }
        window.scrollTo(0, 0);
      });
      await p.waitForTimeout(900);
      const slug = ('memory' + path.replace(/\//g, '_')).replace(/_+$/, '');
      const file = OUT + '/' + slug + '.' + vp.name + '.png';
      await p.screenshot({ path: file, fullPage: true, animations: 'disabled' });
      done.push(slug + '.' + vp.name + '.png');
    }
    await ctx.close();
  }
  return done.join('\n');
}
