# HANDOFF — 기억 (Memory) 브랜드 사이트

다른 세션에서 이 폴더를 이어받아 작업하기 위한 인수인계 문서.
**작업을 시작하기 전에 이 문서를 끝까지 읽으세요.** 특히 §6(함정)은 다시 밟으면
시간을 크게 낭비하는 항목들입니다.

최초 작성: 2026-07-28

> **2026-07-28 이 저장소에 설치 완료.** 이 문서는 디자인을 만든 세션에서 넘어온
> 원문이고, 저장소 사정에 맞춰 §1 폴더 구조 · §8 · §10 만 갱신했습니다.
> 저장소 고유의 제약(주소·MonkeyFlash 법적 페이지 등)은 §12 에 정리했습니다.

---

## 1. 이 프로젝트가 무엇인가

독립 소프트웨어 스튜디오 **기억(Memory)** 의 브랜드 사이트.

- **정적 사이트** — Astro 5, SSR 없음, 아일랜드 없음, 프레임워크 통합 없음
- **배포** — Cloudflare Pages. 기존에 있던 다른 디자인을 **교체**하는 건이다
- **톤앤매너** — Black & White 2색만. 중간 톤은 전부 `currentColor` 투명도로 만든다
- **폰트** — Pretendard Variable (jsDelivr dynamic subset CDN)
- **디자인 출처** — 구매한 WordPress 테마 **Salient**(`reference/salient-new/`)의
  디자인 언어와 모션을 이식. 마크업을 베낀 것이 아니라 **모션 사양(duration /
  easing / transform)을 원본 수치 그대로** 가져와 의존성 없는 vanilla JS로 재구현했다

### 폴더 구조 (저장소 최상위)

디자인 폴더의 `site/` 내용이 곧 **저장소 루트**다. `site/` `export/` 구분은 없다.

```
devguru_website/            ← 저장소 루트 (= 예전 memory_website/site/)
├─ src/  public/  docs/     ← docs/HANDOFF.md 가 이 문서
├─ astro.config.mjs  package.json  tsconfig.json
└─ dist/                    ← 빌드 산출물 (gitignore)
```

원본 export 폴더(`memory_design/`)와 이전 디자인·기획 자료는 저장소 밖
`~/Devguru/devguru_website_ARCHIVE_20260728/` 에 보관돼 있다.

> **아카이브는 열지 않는다. 예외 없다.**
> 카피 원문(`concept.md`)이든 이전 디자인이든 마찬가지다. 소유자가 이전 자료를
> 저장소에서 격리한 이유가 "지난 디자인에 영향을 받아 창의성이 떨어진다"였고,
> 브랜드 원문도 그 격리 안에 있다. 필요하다고 판단되면 **먼저 소유자에게 요청**하고,
> 허락을 받은 것만 그때 열어본다. 조용히 꺼내 보고 나중에 보고하지 않는다.
>
> 그래서 **이 저장소 안에 있는 것이 곧 사실의 전부**다. 카피의 근거는 실제
> 페이지(`src/pages/**`)와 `src/data/*.ts` 이고, 그 밖의 브랜드 정의가 필요하면
> 소유자에게 묻는다.

---

## 2. 사이트 구조

| 경로 | 파일 | 내용 |
| --- | --- | --- |
| `/` | `src/pages/index.astro` | 히어로 → 선언 → 01~08 챕터 → 간주 한 줄 → 푸터 (아래 §2-1) |
| `/work/` | `src/pages/work/index.astro` | 작업 목록 |
| `/work/{slug}/` | `src/pages/work/[slug].astro` | 작업 상세 (`works` 배열에서 자동 생성) |
| `/studio/` | `src/pages/studio.astro` | 만든 사람 · 작업 방식 · 규모 |
| `/contact/` | `src/pages/contact.astro` | 연락 (푸터 없음 — `hideFooter`) |
| `/404` | `src/pages/404.astro` | (푸터 없음) |

### 2-1. 홈의 열 개 구간 (2026-07-28)

서사는 **잃음 → 기준 → 약속 → 증거 → 방법 → 정직 → 초대** 순으로 흐른다.
읽는 사람이 01에서 자기 경험을 떠올리고, 02에서 왜 그러는지 알게 되고,
03에서 실제로 만든 것을 보고, 08에서 과장하지 않는다는 걸 확인한 뒤 연락에 닿는다.

| 구간 | id | 배경 | 내용 |
| --- | --- | --- | --- |
| 히어로 | — | 흰 | 그때까지 남아 있으면 좋겠습니다 + 2054년 |
| 선언 | — | 흰 | 등대는 배를 부르지 않습니다 |
| 01 사라진 것들 | `lost` | 검 | 공감의 축. 종료된 서비스 경험 |
| 02 정한 기준 | `standard` | 흰 | 14년 된 키보드 · 원칙 5개 |
| 03 켜 둔 것들 | `works` | 흰 | 작업 목록 |
| 04 등을 세우는 순서 | `order` | 검 | 다섯 단계 |
| 05 유리를 닦는 일 | `glass` | 검 | 유지보수가 작업의 본체 |
| 06 곁에 있는 방식 | `beside` | 흰 | Monkey Flash |
| 07 등대지기 한 사람 | `keeper` | 흰 | 규모를 감추지 않음 |
| 08 하지 않는 말 | `unsaid` | 검 | 쓰지 않는 표현 |
| 간주 | — | 검 | 히어로 문장 한 줄 + `기억` 서명 |

**번호와 라벨은 `src/data/chapters.ts` 배열 순서에서 나온다.** 하드코딩이 아니다.
섹션을 넣거나 빼면 eyebrow 번호와 상단 목차가 함께 따라온다. `id` 는 목차 앵커라
바꾸면 링크가 끊긴다.

### 세계관 — 등대

`concept.md`(아카이브, 열지 않음)의 절제 원칙 위에 등대 은유를 얹었다.
**비유는 라벨과 대제목에만 쓰고 본문은 담백하게 둔다.** 제품=등, 유지보수=유리를 닦는 일,
출시=처음 불을 켠 날, 작업 목록=켜 둔 것들.

> **봉인 — 절대 쓰지 않는다:** 길을 밝히다 · 이정표 · 나침반 · 등불이 되어 드리다 ·
> 항해를 돕다 · 어둠 속에서 · 희망의 빛.
> 사용자를 인도하는 프레임 전부다. 이 브랜드는 "사용자의 관심을 계속 요구하지 않는다"가
> 원칙이라, 방향을 제시하는 순간 태도가 무너진다. 배는 목적지를 스스로 안다.

Monkey Flash 가 화면을 덮고 지금 창만 밝게 남기는 앱이라 이 은유에서 유일하게
사실 그대로지만, **"Monkey Flash는 등대입니다"라고 설명하지 않는다.**
알아채는 편이 낫고, 설명하는 순간 촌스러워진다.

**간주는 반복하지 않는다.** 처음에는 Salient `scrolling-text` 로 히어로 문장을
가로로 흘렸는데, 1인칭 소망이 다섯 번 되풀이되니 다짐이 아니라 주문처럼 읽혔다
("공포영화 같다"). 지금은 움직임 없는 한 줄이고, 사이트에서 **유일하게 가운데 정렬**이라
그 자체로 서명 역할을 한다. 흐르는 문장 포팅은 쓰지 않게 되어 삭제했다 —
안 쓰는 요소를 남겨두지 않는다. 필요해지면 커밋 `e6a0362` 에서 되살릴 수 있다.

---

## 3. 디자인 시스템

전부 `src/styles/global.css` 상단 `:root` 에 있다. 값을 흩뿌리지 말고 여기서 관리한다.

### 색

```
--ink   #000    --paper #fff
--nectar-page-background-color / --nectar-page-text-color
```

뒤의 두 변수는 **스크롤에 따라 JS가 실시간으로 바꾼다**(§4 배경 반전).
`body` 의 배경·글자색이 이 변수를 참조하므로, 새로 만드는 요소는
**절대 색을 고정하지 말고** `currentColor` 와 `color-mix()` 를 써야 한다.

```css
/* 좋음 — 흑배경/백배경 양쪽에서 자동으로 맞는다 */
border-color: color-mix(in srgb, currentColor 14%, transparent);
opacity: 0.55;

/* 나쁨 — 배경이 검정으로 바뀌면 보이지 않는다 */
color: #666;
border-color: rgba(0,0,0,0.14);
```

경계선 투명도는 사이트 전체에서 **14%** 로 통일돼 있다. 이 값을 지켜라.

### 타입 스케일

```
--fs-display  clamp(2.5rem, 6vw, 6.5rem)     히어로 전용
--fs-h1       clamp(2.5rem, 6.2vw, 6rem)     페이지 상단 제목
--fs-h2       clamp(2rem, 4.4vw, 4.25rem)    섹션 제목
--fs-h3 / h4 / lead / body / meta(0.8125rem)
```

- 제목 자간은 `-0.04em ~ -0.055em`. 크면 클수록 더 조인다
- 본문 `line-height: 1.75`, 제목 `1.18`, split-heading 내부는 **반드시 `1.2`**
  (Salient 사양. 이걸 바꾸면 단어 마스킹이 어긋나 글자가 잘린다)
- 한글 줄바꿈은 `word-break: keep-all` + `text-wrap: pretty` 가 전역 적용돼 있다

### 여백

```
--gutter      clamp(24px, 5.2vw, 96px)
--page-max    1560px
--section-y   clamp(120px, 15vw, 260px)
```

섹션이 연달아 오면 위아래 패딩이 **합산되어 과해진다**. 이미 발생했던 문제라
`.statement` 는 아래 패딩을 `0` 으로 두고 다음 섹션 패딩에 맡긴다.
새 섹션을 붙일 때 같은 상황을 확인할 것.

### 그리드

12칼럼 (`.grid`). 사이트 전체가 쓰는 배치 규칙:

- 섹션 제목 `1 / span 6`, 본문 `8 / span 4` — 7번 칼럼은 **비운다**(숨 쉬는 간격)
- 작업 목록은 12칼럼 그리드를 쓰지 않는다 — `WorkList` 가 자체 flex 행을 갖는다
- 900px 이하에서 전부 `1 / -1` 로 떨어진다

---

## 4. 모션 계약 (가장 중요)

**요구사항이 "Salient에서 구동되는 요소·모션·트랜지션이 100% 동일하게 작동"이었다.**
따라서 아래 수치는 취향이 아니라 **사양**이다. 임의로 바꾸지 마라.
바꿔야 한다면 Salient 원본을 먼저 확인할 것. 원본 테마는 저장소 자산이 아니라
소유자의 자료이므로, 위치를 스스로 뒤지지 말고 **소유자에게 요청한다**(§1).

구현은 두 파일에 나뉜다:
- `src/styles/global.css` §5 — 정적 사양 (초기 transform, transition, keyframes)
- `src/scripts/motion.js` — 트리거 로직 (waypoint, split 마크업 생성, 색 반전)

| 동작 | Salient 원본 위치 | 사양 |
| --- | --- | --- |
| **문장 라인 리빌** | `includes/class-nectar-element-styles.php` (split_line_heading) + `js/src/init.js splitLineHeadings()` | 단어별 `overflow:hidden` 래핑, inner `translateY(1.3em)→0`, `1.2s cubic-bezier(0.25,1,0.5,1)`, stagger `clamp(500/단어수, 15, 50)ms` |
| **스크롤 연동 문장** | `init.js NectarSplitHeadingTimeline` | 단어 opacity `0.2→1`, duration 450ms, wordDelay 150ms(느릴 때 250ms), `speed`/`topCushion` 계산식까지 동일 |
| **컬럼·요소 등장** | `init.js colAndImgAnimations()` | `650ms`, easeOutCubic(`cubic-bezier(0.215,0.61,0.355,1)`), waypoint **88%**, `translateY(75px)` |
| **미디어 등장** | `css/src/style.css zoom-out-reveal` | frame `scale(0.7)→1` + inner `scale(1.75)→1`, `1.3s cubic-bezier(0.12,0.75,0.4,1)`, opacity `0.4s ease-out`, waypoint 70% |
| **배경 반전** | `js/build/elements/nectar-color-change-bg.js` | IntersectionObserver + rAF 재스캔, 가시성 임계 `0.4`, 자손 임계 `0.05`, 전환 `0.8s` |
| **화살표 CTA** | `nectar_cta[data-style="arrow-animation"]` | 키프레임 6종, `0.45s cubic-bezier(0.23,0.46,0.4,1)`, polyline은 hover에서 0.25s 지연 후 그려짐 |
| **링크 밑줄** | `.nectar-underline` | `background-size 0% 1px → 100% 1px`, `0.55s cubic-bezier(.2,.75,.5,1)` |
| **작업 목록** | `nectar_post_grid[data-style="vertical_list"]` | 헤어라인 `scaleX(0)→1` `1s ease`, 번호 원 40px, ≥1000px 에서 행 flex |
| **커서 추종 이미지** | `featured_image_follow` + `NectarIconMouseFollow('post-grid-images')` | 20vw / 4:3 `position:fixed`, lerp **0.1**, `mappedX = 0.5*winW + (clientX/winW)*(winW/2)`, `clip-path inset(20%)→0%` `0.6s cubic-bezier(.1,.75,.5,1)` |
| **제목 쓸림** | `nectar_reveal_fade_in` | mask `linear-gradient(90deg,#fff 33.3%,rgba(255,255,255,.1) 66.6%)`, `mask-size 300% 100%`, `0.85s cubic-bezier(0.4,0,0.3,1)` |
| **스크롤 인디케이터** | `nudgeMouse` / `trackBallSlide` | `2.4s` 무한 |
| **챕터 목차** | `element-page-submenu.css` + `init.js` Bootstrap ScrollSpy 3.2.0 포크(~3955행) | `.stuck` 시 `position:fixed; top:0`, `transition: all 0.3s`, 활성 판정 오프셋 `10` + 바 높이, 바닥에서는 마지막 항목, 첫 섹션 위에서는 활성 없음, 활성 클래스 `.current-menu-item` |
| **연락 양식** | `css/src/ascend.css` (`.container-wrap input/textarea`) | 배경 `transparent`, 테두리 `1px`, `padding:16px`, `font-size:16px`, 그림자 없음, `:focus` 는 테두리만 진해짐. 검은 배경(`.span_12.light`)에서는 테두리 흰색 60% |
| **강조 목록** | `element-fancy-unordered-list.css` | 항목 초기값 `opacity:0; left:-20px`, `data-list-icon="dot"` 은 `content:"•"` + `padding-left:15px` |

### 배경 반전은 "섹션 블록"이 아니다

이걸 오해하면 안 된다. 검정 섹션은 **검정 배경의 블록이 아니라**,
그 섹션이 화면에 들어오면 **페이지 전체(`body`)가 검정으로 크로스페이드**되는 것이다.
Salient의 원래 동작이 그렇고, 스크롤할 때 훨씬 고급스럽다.

그래서 **모든 `<section>` 에 아래 두 속성이 반드시 있어야 한다:**

```html
<section data-color-change-section-bg-color="#ffffff"
         data-color-change-section-text-color="#000000">
```

빠뜨리면 그 섹션은 이전 섹션 색을 그대로 유지한다 → 흰 배경에 흰 글자가 되는
사고가 난다. **새 섹션을 만들 때 가장 먼저 챙길 것.**

부작용 하나: 전체 페이지 스크린샷(fullPage)을 찍으면 배경색이 한 가지로만 나오고
등장 애니메이션도 트리거되지 않는다. 확인할 때는 §7처럼 **구간별로 스크롤하며** 찍어야 한다.

---

## 5. 컴포넌트 사용법

```astro
<!-- 라인 리빌 제목. <br> 로 줄바꿈 위치를 직접 지정한다 -->
<SplitHeading tag="h2" class="chapter__title">
  기억은 저장에 대한<br />이야기가 아닙니다.
</SplitHeading>

<!-- 스크롤 연동 문장 (긴 선언문에 사용) -->
<SplitHeading tag="p" effect="scroll-opacity-reveal" class="statement__text">
  좋은 소프트웨어는 사용자의 관심을 계속 요구하지 않습니다.
</SplitHeading>

<!-- 등장 래퍼. as 로 태그 교체 (리스트 항목이면 as="li") -->
<Reveal animation="slight-fade-in-from-bottom" delay={120} class="…">…</Reveal>
<Reveal as="li" animation="fade-in" delay={i * 70} class="…">…</Reveal>

<!-- CTA -->
<Cta href="/work/">작업 전체 보기</Cta>
<Cta href="https://…" external style="underline">사이트 보기</Cta>

<!-- 작업 목록 (홈 · /work/ 공통). 3~5개 기준 레이아웃 -->
<WorkList works={works} class="works" />
```

`animation` 값: `fade-in` · `fade-in-from-bottom` · `slight-fade-in-from-bottom` ·
`fade-in-from-left` · `fade-in-from-right` · `grow-in`

리스트를 순차 등장시킬 때 `delay={i * 70}` ~ `{i * 80}` 이 사이트 전체 관례다.

---

## 6. 함정 — 다시 밟지 말 것

### ① Astro 스코프 스타일이 자식 컴포넌트 루트에 닿지 않는다

`index.astro` 의 `<style>` 에서 `.hero__title` 을 써도, 그게
`<SplitHeading class="hero__title">` 의 루트라면 **적용되지 않는다.**
Astro는 자기 파일에서 렌더한 요소에만 `data-astro-cid-*` 를 붙이기 때문이다.

**해결 방식(이미 적용됨):** Astro가 부모의 cid를 **props로 전달**해 준다는 점을 이용해,
컴포넌트에서 나머지 props를 루트에 스프레드한다.

```astro
const { animation, delay, class: className, ...rest } = Astro.props;
<Tag class:list={[...]} {...rest}>
```

`Reveal` · `SplitHeading` · `Cta` · `WorkList` 네 개에 모두 들어가 있다.
**새 컴포넌트를 만들면 반드시 같은 처리를 하라.** 안 하면 스타일이 조용히 사라진다.

### ② `h1` 의 브라우저 기본 `font-size: 2em`

`global.css` 리셋에 `h1~h6 { font-size: inherit }` 이 들어 있다. **지우지 마라.**

`SplitHeading` 은 래퍼 `<div>` 에 `font-size` 를 주고 안의 `<h1>` 이 상속받는 구조인데,
`inherit` 이 없으면 UA 스타일시트의 `2em` 이 곱해져 **글자가 정확히 2배로 커진다.**
실제로 첫 빌드에서 140px 의도가 254px로 렌더됐다.

즉 **제목의 크기는 항상 래퍼(또는 클래스)에서 지정**하고, 태그에 기대지 않는다.

### ③ `<br>` 파싱

`motion.js` 의 `buildSplitMarkup()` 은 `innerHTML` 을 `<br>` 로 쪼갠다.
Astro가 `<br data-astro-cid-xxx="">` 로 렌더하므로 정규식이
`/<br\b[^>]*>/gi` 여야 한다. `/<br\s*\/?>/` 로 쓰면 속성 때문에 매칭에 실패해
**`data-astro-cid-…=""` 문자열이 화면에 그대로 출력된다.**

### ④ 로컬 포트 충돌

이 맥에서 **4321~4332 대역은 다른 프로젝트가 이미 점유**하고 있다.
`astro preview` 는 조용히 다음 빈 포트로 넘어가므로, 로그를 확인하지 않고
예상 포트에 접속하면 **엉뚱한 사이트를 보며 디버깅하게 된다.** (실제로 겪음)

```bash
npx astro preview --port 4350 > /tmp/preview.log 2>&1 &
sleep 3 && tail -2 /tmp/preview.log   # ← 실제 포트를 반드시 확인
```

### ⑤ 검정 섹션 위의 하드코딩 색

§3에서 말한 것과 같다. `rgba(0,0,0,…)` 이나 `#666` 을 쓰면 반전 시 사라진다.

---

## 7. 확인 절차

빌드가 통과했다고 끝난 게 아니다. **브라우저로 실제 확인**해야 한다.
이번 작업의 버그 3개는 전부 빌드는 통과하고 화면만 깨진 종류였다.

```bash
npm run build
npx astro preview --port 4350 > /tmp/preview.log 2>&1 &
sleep 3 && tail -2 /tmp/preview.log
```

Chrome DevTools MCP 로 1512×950 및 390×844 에서:

1. 각 섹션을 **스크롤로 진입**시킨 뒤 스크린샷 (fullPage는 애니메이션이 안 뜬다)
2. 진입 후 `getComputedStyle(document.body).backgroundColor` 로 배경 반전 확인
3. 콘솔 에러 확인
4. 모바일 폭에서 히어로가 한 화면에 들어오는지, 메뉴 패널이 열리는지

전환 대기는 넉넉히 잡는다 — 색 반전 0.8s + 리빌 1.2s 라 `setTimeout` 1600~2200ms.

---

## 8. 배포 (구 "export 폴더 동기화")

export 사본은 더 이상 없다. 저장소 루트가 원본이고, 배포는 GitHub main push →
Cloudflare Pages 자동 빌드다.

```bash
npm run build          # 먼저 로컬에서 통과하는지 확인
git add -A && git commit && git push    # push 하는 순간 배포된다
```

Pages 설정: Build command `npm run build` · Output `dist` · `NODE_VERSION=20`.

---

## 9. 카피라이팅 규칙

원래 브랜드 원문(`concept.md`)이 출처였지만 그 문서는 아카이브 안에 있고
**열지 않는다**(§1). 지금 카피의 근거는 **저장소에 실제로 배포돼 있는 문장들**이다.
새 카피가 필요하면 아래 세 곳의 어조에 맞춘다.

- `src/pages/index.astro` — 브랜드 화법("기억은 …합니다")
- `src/pages/studio.astro` 의 `story` 배열 — 1인칭 화법("저는 …합니다").
  2026-07-28 추가된 브랜드 스토리이고, 서른 해 뒤(2054년)를 판단 기준으로 삼는다는
  것이 이 브랜드의 중심 문장이다
- `src/data/works.ts` — 작업 설명 화법

- 절제된 평서형. 감탄·과장·최상급 금지
- **쓰면 안 되는 표현**은 `index.astro` 의 `avoided` 배열에 그대로 들어 있다
  (세상을 바꾸는 / 혁신 / 최고의 경험 / 기술 자체를 앞세운 설명). 그 목록은 화면에
  출력되는 카피이자 규칙이다
- 영문은 `Built to be remembered.` 하나만 쓴다. 영문 카피를 늘리지 않는다
- **없는 사실을 만들지 않는다.** 고객사·수상·지표·인원수를 지어내면 안 된다.
  작업물이 2개뿐인 것도 같은 이유다(§10)

---

## 10. 지금 남아 있는 것

### 작업물이 2개 공개 + 3개 draft

소유자가 공개를 승인한 실제 작업은 **Monkey Flash** 와 **KB Inc. 웹사이트** 2건뿐이라
나머지는 지어내지 않았다. 대신 `src/data/works.ts` 에
**03 · 04 · 05 슬롯을 `draft: true` 로 채워 두었다.**

- `draft: true` 인 항목은 홈 · 목록 · 상세 어디에도 나오지 않는다
- 페이지는 전부 `publishedWorks`(= `works.filter(w => !w.draft)`)를 import 한다
- 사용자가 내용을 채우고 `draft: true,` 줄만 지우면 그때 공개된다

**이 구조를 깨지 마라.** 페이지에서 `works` 를 직접 import 하면
자리표시자("세 번째 작업" 등)가 그대로 배포된다.

레이아웃은 2개·5개 양쪽에서 확인했다(§7 방식으로 draft를 임시 해제해 검증).

### 자리표시자 — 2026-07-28 전부 실제 값으로 교체됨

| 파일 | 항목 | 값 |
| --- | --- | --- |
| `src/data/site.ts` | `email` | `devguru.j610@gmail.com` (App Store Connect 등록 주소) |
| `src/data/site.ts` | `url` | `https://bymemory.dev` |
| `src/data/site.ts` | `location` | **삭제됨** — 소재지는 공개하지 않는다 |
| `astro.config.mjs` | `site` | `https://bymemory.dev` |
| `public/robots.txt` | sitemap | `https://bymemory.dev/sitemap-index.xml` |

`location` 을 다시 넣지 마라. 히어로 라벨 행(`index.astro`)과 푸터·연락 페이지에서
해당 칸을 비웠고, 그 자리에는 MonkeyFlash 법적 링크가 들어가 있다.
`astro.config.mjs` 의 `site` 는 canonical · `og:image` 절대경로 · sitemap 의 기준이다.

### 커버 이미지 (2026-07-29 추가)

공개된 2건은 실제 커버가 들어가 있다. draft 03~05 는 여전히 영문 플레이트 폴백이다.

| 파일 | 크기 | 출처 |
| --- | --- | --- |
| `public/work/monkey-flash.webp` | 2560×1600 · 60KB | App Store 스토어 컷 `monkeyflash-web/reference/store-screenshots/01-hero.png` 의 `1470x1210+1200+370` 을 잘라(마케팅 문구 제외) 같은 이미지의 블러 배경 위에 재합성 |
| `public/work/kb-inc.webp` | 2560×1600 · 64KB | `kbinc.kr` 라이브를 1280×800 · DPR 2 로 캡처 → 아래 빈 띠 제거 → 둥근 모서리 + 그림자 → 어두운 캔버스에 인셋 |

**한 장이 두 곳에 쓰인다.** 목록의 커서 추종 썸네일은 `aspect-ratio: 4/3`,
상세 상단 커버는 `16/10`. 양쪽 다 `object-fit: cover` 다.

그래서 규칙은 **16:10 · 2560×1600, 중요한 것은 가운데 78% 폭 안에**.
4:3 쪽에서 좌우가 8.3%씩 잘려나가는데, 여백만 먹으면 아무것도 잃지 않는다.
4:3 마스터로 만들면 반대로 16:10 에서 위아래 17%를 잃는다 — 그쪽이 더 나쁘다.

두 장 모두 "어두운 배경 위에 화면을 여백 두고 얹은" 같은 형식이다.
새 커버를 만들 때도 이 형식을 따르면 목록에서 나란히 놓였을 때 결이 맞는다.

만들 때 실제로 걸린 것 두 가지:

- **여백을 너무 크게 잡으면 썸네일에서 안 읽힌다.** 커서 추종 썸네일은 20vw —
  1440 화면에서 약 288px 다. 처음엔 내용 높이를 1220px(76%)로 잡았는데 앱 UI가
  어두운 덩어리로만 보였다. 1400px(87.5%)까지 키우니 항목 이름이 읽힌다.
  폭 상한은 **2050px** — 4:3 크롭이 남기는 2133px 안에 여유를 두고 들어가야 한다.
- **잘라낸 사각형의 이음매가 보인다.** 알파를 블러해서(`-channel A -blur 0x45`)
  가장자리를 페더링하면 배경으로 녹아든다.

### 손대지 않은 것

- 폰트 서브셋 자체 호스팅 (지금은 jsDelivr CDN dynamic subset)
- 다국어(영문 페이지)
- 블로그/저널
- 애널리틱스

---

## 11. 명령 요약

```bash
cd /Users/tuesdaymorning/Devguru/devguru_website

npm install
npm run dev        # 개발 (포트 로그 확인!)
npm run build      # dist/ 생성
npm run preview    # 빌드 결과 확인

# 배포: Cloudflare Pages
#   Build command  : npm run build
#   Output dir     : dist
#   Env            : NODE_VERSION = 20
```

---

## 12. 이 저장소에서만 적용되는 제약 (2026-07-28 추가)

디자인 폴더를 저장소에 설치하면서 생긴, 디자인 문서에는 없던 규칙들.

### MonkeyFlash 법적 페이지 — 건드리면 앱 심사에 걸린다

| 주소 | 파일 |
| --- | --- |
| `/MonkeyFlash/privacy/` | `src/pages/MonkeyFlash/privacy.astro` |
| `/MonkeyFlash/support/` | `src/pages/MonkeyFlash/support.astro` |

App Store Connect 에 등록된 URL이다. **주소도 본문 텍스트도 바꾸지 않는다.**
두 파일은 이전 디자인에서 **한 글자도 손대지 않고** 그대로 옮겨온 것이고,
각자 자기 `<style is:global>` 블록을 들고 있다. 갈아끼운 것은
`src/components/LegalShell.astro` 껍데기 하나뿐이다.

- 본문 블록이 쓰는 `--color-ink` / `--color-ink-2` / `--color-amber` /
  `--color-container-low` / `--font-mono` 는 LegalShell 이 `currentColor` 기반으로
  별칭 처리한다. 본문을 고치는 대신 별칭을 고쳐라.
- 이 두 페이지는 **색 반전 대상이 아니다.** `data-color-change-*` 를 붙이지 마라.
  읽는 문서라 흰 배경에 고정한다.
- 하나의 URL 안에 EN/KO 가 함께 있고 토글이 보이는 섹션과 `html[lang]` 만 바꾼다.
  `?lang=ko` 파라미터가 저장된 선택보다 우선한다(App Store 로케일별 링크용).
- 푸터와 연락 페이지 하단에서 두 페이지로 가는 링크를 유지한다.

### 주소 규칙

- **한국어 전용 사이트다.** 예전의 `/en/` 영문 페이지와 지오 분기
  Pages Function(`functions/index.js`)은 2026-07-28 에 제거했다.
  다시 만들려면 `_redirects` 의 `/en/*` 301 부터 걷어내야 한다.
- `public/_redirects` 가 예전 주소를 받아준다:
  `/privacy` `/support` (App Store 짧은 주소), `/portfolio/*` → `/work/*`,
  `/en/*` `/ko/*` → `/`. **첫 두 줄은 절대 지우지 마라.**
- KB Inc. 의 slug 가 예전 `kbinc` 에서 `kb-inc` 로 바뀌었다. 301 로 이어져 있다.

### 공개 작업물

지금 공개된 2건(Monkey Flash, KB Inc.)은 소유자가 승인한 범위다.
KB Inc. 는 공개 허가가 확인된 클라이언트 작업이다.
`works.ts` 의 03~05 draft 슬롯은 **소유자가 직접 내용을 줄 때만** 채운다.

---

## 13. 연락 양식 (2026-07-28)

`src/components/ContactForm.astro`. **구성은 도림사(dorimsa.com) 의뢰 폼과 같은
뼈대**다 — 이름 · 회사/팀 · 연락 수단 · 예상 일정 · 필요한 작업 · 예산 범위 · 내용 ·
동의를 한 칼럼으로 세운다. 어휘만 이 브랜드 쪽으로 바꿨다. 빈 칸 하나에
"알아서 써 주세요" 하는 것보다, 무엇을 적어야 하는지 보이면 답이 빨라진다.

선택지 두 개(`필요한 작업` · `예산 범위`)는 `src/data/inquiry.ts` 에 있다.
**둘 다 소유자가 정하는 값이다.** 필요한 작업은 실제로 해온 범위이고
(안 해본 분야를 넣지 않는다), 예산 구간은 정책이라 임의로 바꾸지 않는다.

스타일은 Salient Ascend 폼 사양을 그대로 옮겼고
(§4 표), 색은 고정값 대신 `currentColor` 로 바꿔 배경 반전을 따라가게 했다.
`select` 는 OS 기본 화살표를 지우고 직접 그린다 — 검은 배경에서 안 보이거나
브라우저마다 색이 달라서다. 드롭다운 목록 자체는 OS가 그리므로
`option` 에 배경·글자색을 지정해 둔다.
입력 글자 크기 **16px 는 취향이 아니다** — iOS 는 그보다 작으면 포커스 시 화면을 확대한다.

**받는 곳이 아직 없다.** 지금은 보내기를 누르면 작성한 내용이 채워진 채로 메일 앱이
열린다. 서버(Cloudflare Function 등)가 생기면 컴포넌트 안의 submit 핸들러에서
`window.location.href = mailto:…` 한 블록만 `fetch(POST)` 로 바꾸면 된다.
마크업·스타일·미끼 칸(허니팟)은 그대로 쓴다.

양식이 있는 곳은 **홈 푸터와 `/contact/` 두 곳뿐**이다. 푸터는 모든 페이지에 붙는
컴포넌트라 `<Base footerForm={true}>` 로 홈에서만 켠다. 작업·스튜디오 하단까지
양식이 반복되면 조용한 마무리가 아니라 영업 화면이 된다.

### 상단 고정 요소가 둘이다

헤더(`#top`)와 챕터 목차가 모두 화면 위쪽을 원한다. Salient 에도
`.page-submenu.stuck.header-not-visible` 상태가 따로 있는 이유가 이것이다.
`motion.js` 가 헤더의 `is-hidden` 여부를 보고 목차의 `top` 을 헤더 높이 또는 0 으로
바꾼다. 헤더 높이를 상수로 박아두지 마라 — 화면 폭에 따라 달라진다.
