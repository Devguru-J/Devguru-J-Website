# 기억 v3 — Salient(Signal 데모) 전면 교체 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** bymemory.dev를 Salient Signal 데모 포팅본 디자인 + 기억(KO/EN) 콘텐츠로 전면 교체하고 배포한다.

**Architecture:** 포팅본의 raw HTML(`src/raw/*.html`)을 언어별로 복제(`src/raw/ko/`, `src/raw/en/`)한 뒤 텍스트·링크·이미지·메타만 치환한다. 마크업 구조(태그·클래스·데이터 속성)는 절대 변경하지 않는다. Astro 페이지는 raw를 `set:html`로 주입하는 얇은 래퍼다. MonkeyFlash 법적 페이지는 기존 legacy 체인 그대로 유지한다.

**Tech Stack:** Astro 5 (정적 빌드), Salient 테마 원본 에셋(public/wp-content, wp-includes), Pretendard(한글 폴백), Cloudflare Pages(+ functions/index.js geo 라우팅), tailwind v4(법적 페이지 전용).

## Global Constraints

- 스펙: `docs/superpowers/specs/2026-07-24-salient-redesign-design.md`
- 템플릿 원본: `salient_dirty_rat_complete_edition/` — **읽기 전용, 수정·커밋 금지**
- raw HTML은 텍스트 노드, `href`/`src`/`srcset`/`alt`, `<title>`/메타 태그만 수정. 태그 구조·클래스·data 속성 변경 금지
- 이메일은 `devguru.j610@gmail.com`만 사용. 실명·구체적 위치 비공개 ("대한민국 기반"까지만)
- 기억 실제 에셋이 없는 자리는 테마 데모 사진 그대로 유지 (기존 목업 유지 방침)
- `src/pages/MonkeyFlash/`, `src/layouts/Base.astro`, `src/components/LegalShell.astro`, `src/components/LogoMorph.astro`, `src/styles/legacy.css`, `public/_redirects`, `functions/index.js` — 수정 금지
- `<img>` src를 교체할 때는 기존 `srcset`/`sizes` 속성 제거 (잘못된 원본 해상도 참조 방지)
- 커밋 메시지 끝에 `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`

## 파일 구조 (완료 시점)

```
src/
  raw/ko/{head,body,work-head,work-body,monkey-flash-head,monkey-flash-body,
          kbinc-head,kbinc-body,next-product-head,next-product-body}.html
  raw/en/  (동일 10개)
  pages/
    index.astro                 # KO 메인 (raw/ko/head+body)
    en/index.astro              # EN 메인
    work/index.astro            # KO work
    en/work/index.astro
    portfolio/monkey-flash/index.astro
    portfolio/kbinc/index.astro
    portfolio/next-product/index.astro
    en/portfolio/{monkey-flash,kbinc,next-product}/index.astro
    MonkeyFlash/{privacy,support}.astro   # 불변
  layouts/Base.astro            # 불변 (법적 페이지용)
  components/{LegalShell,LogoMorph}.astro  # 불변
  styles/legacy.css             # 불변
public/
  wp-content/ wp-includes/      # 테마 에셋 (템플릿에서 복사)
  assets/                       # 기존 + memory-fonts.css + PretendardVariable.woff2
  _redirects                    # 불변
functions/index.js              # 불변
```

---

### Task 1: 백업 태그 + .gitignore 정리

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: v2 최종 상태 태그**

```bash
git tag design-v2-final
git push origin design-v2-final
```
Expected: 태그 푸시 성공.

- [ ] **Step 2: .gitignore에 추가**

`.gitignore` 끝에 추가:

```
# design v3 source template (local reference only)
salient_dirty_rat_complete_edition/

# playwright artifacts
.playwright-mcp/
```

- [ ] **Step 3: 커밋**

```bash
git add .gitignore && git commit -m "Ignore v3 template source and playwright artifacts"
```

---

### Task 2: 템플릿 통합 + v2 제거 + 의존성 정리

**Files:**
- Create: `public/wp-content/`, `public/wp-includes/` (템플릿에서 복사)
- Create: `src/raw/ko/*.html`, `src/raw/en/*.html` (템플릿 raw에서 복제)
- Create: Astro 래퍼 10개 (위 파일 구조 참조)
- Delete: v2 전용 파일 (아래 목록)
- Modify: `package.json`

**Interfaces:**
- Produces: raw 파일 명명 규칙 `src/raw/<lang>/<page>-{head,body}.html` (메인은 `head.html`/`body.html`). 이후 Task 3~8이 이 파일들을 편집한다.

- [ ] **Step 1: 테마 에셋 복사**

```bash
cp -R salient_dirty_rat_complete_edition/public/wp-content public/wp-content
cp -R salient_dirty_rat_complete_edition/public/wp-includes public/wp-includes
find public/wp-content public/wp-includes -name .DS_Store -delete
find public/wp-content -size +20M
```
Expected: 마지막 find 출력 없음 (Cloudflare Pages 25MB 파일 제한).

- [ ] **Step 2: raw 복제 (KO/EN 동일 원본에서 시작)**

```bash
mkdir -p src/raw/ko src/raw/en
T=salient_dirty_rat_complete_edition/src/raw
for L in ko en; do
  cp $T/head.html src/raw/$L/head.html
  cp $T/body.html src/raw/$L/body.html
  cp $T/work-head.html src/raw/$L/work-head.html
  cp $T/work-body.html src/raw/$L/work-body.html
  cp $T/portfolio-balanced-head.html src/raw/$L/monkey-flash-head.html
  cp $T/portfolio-balanced-body.html src/raw/$L/monkey-flash-body.html
  cp $T/portfolio-framework-head.html src/raw/$L/kbinc-head.html
  cp $T/portfolio-framework-body.html src/raw/$L/kbinc-body.html
  cp $T/portfolio-radiant-head.html src/raw/$L/next-product-head.html
  cp $T/portfolio-radiant-body.html src/raw/$L/next-product-body.html
done
```

포트폴리오 레이아웃 매핑(확정): balanced→monkey-flash, framework→kbinc, radiant→next-product. (crystal-vibes, into-the-heat는 미사용.)

- [ ] **Step 3: v2 파일 삭제**

먼저 잔존 참조 확인:

```bash
grep -rl "LogoWordmark\|components/Header\|components/Hero\|i18n" src/pages/MonkeyFlash src/layouts/Base.astro src/components/LegalShell.astro src/components/LogoMorph.astro
```
Expected: 출력 없음. 그 후 삭제:

```bash
git rm -q src/components/{ContactFooter,Header,Hero,LogoWordmark,MenuPanel,Services,Statement,Testimonials,VideoFeature,Work}.astro \
  src/layouts/Layout.astro src/scripts/main.js src/styles/global.css src/i18n.ts \
  src/pages/index.astro src/pages/en/index.astro
```

- [ ] **Step 4: Astro 래퍼 10개 생성**

템플릿의 래퍼를 기준으로 만든다. 메인: `salient_dirty_rat_complete_edition/src/pages/index.astro`의 `<body>` 속성 전체를 그대로 복사하고, import만 언어별 raw로 바꾼다. `src/pages/index.astro` (KO):

```astro
---
import head from '../raw/ko/head.html?raw';
import body from '../raw/ko/body.html?raw';
---

<html lang="ko" class="no-js">
  <head set:html={head} />
  <body class="(템플릿 index.astro의 class 그대로)" (data-* 속성 전부 그대로) set:html={body} />
</html>
```

- `src/pages/en/index.astro`: 동일하되 `lang="en"`, `../../raw/en/...`
- work 래퍼 2개: 템플릿 `pages/work/index.astro`의 body 속성 사용, import는 `raw/<lang>/work-*.html`
- 포트폴리오 래퍼 6개: 템플릿 `pages/portfolio/balanced/index.astro` → `portfolio/monkey-flash/index.astro`, `framework` → `kbinc`, `radiant` → `next-product` (KO/EN 각각). body 속성은 각 원본 래퍼의 것을 그대로 복사.

- [ ] **Step 5: package.json 정리**

`gsap`, `lenis` 의존성 제거 (v2 전용 — `grep -r "gsap\|lenis" src/` 로 잔존 import 없음 확인 후). `@fontsource-variable/*`, `pretendard`, `tailwindcss`, `@tailwindcss/vite`는 legacy.css가 사용하므로 유지.

```bash
npm uninstall gsap lenis
```

- [ ] **Step 6: 빌드 스모크 테스트**

```bash
npm run build
```
Expected: exit 0, `dist/index.html`, `dist/en/index.html`, `dist/work/index.html`, `dist/portfolio/monkey-flash/index.html`, `dist/en/portfolio/next-product/index.html`, `dist/MonkeyFlash/privacy/index.html` 모두 존재.

- [ ] **Step 7: 커밋**

```bash
git add -A && git commit -m "Integrate Salient template scaffold, remove v2 design files"
```

---

### Task 3: 한글 폰트 폴백 (Pretendard)

**Files:**
- Create: `public/assets/PretendardVariable.woff2`
- Create: `public/assets/memory-fonts.css`
- Modify: `src/raw/{ko,en}/*-head.html`, `src/raw/{ko,en}/head.html` (link 1줄 주입)

원리: 테마 폰트는 'Zalando Sans'/'Source Serif Pro'(한글 미지원). 동일한 font-family 이름으로 한글 unicode-range만 커버하는 @font-face를 테마 CSS **뒤에** 선언하면, 한글 글리프만 Pretendard로 렌더링되고 라틴·아이콘 폰트는 영향 없다.

- [ ] **Step 1: 폰트 파일 복사**

```bash
cp node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2 public/assets/
```

- [ ] **Step 2: memory-fonts.css 작성**

```css
/* Hangul-range fallback: theme fonts lack Korean glyphs. */
@font-face {
  font-family: 'Zalando Sans';
  font-style: normal;
  font-weight: 45 920;
  font-display: swap;
  src: url('/assets/PretendardVariable.woff2') format('woff2-variations');
  unicode-range: U+1100-11FF, U+3130-318F, U+A960-A97F, U+AC00-D7A3, U+D7B0-D7FF;
}
@font-face {
  font-family: 'Source Serif Pro';
  font-style: normal;
  font-weight: 45 920;
  font-display: swap;
  src: url('/assets/PretendardVariable.woff2') format('woff2-variations');
  unicode-range: U+1100-11FF, U+3130-318F, U+A960-A97F, U+AC00-D7A3, U+D7B0-D7FF;
}
html[lang='ko'] body { word-break: keep-all; }
```

- [ ] **Step 3: 20개 head 파일 전부에 link 주입**

각 head 파일 **맨 끝**에 추가 (테마 CSS보다 뒤여야 함):

```bash
for f in src/raw/ko/*head*.html src/raw/en/*head*.html; do
  printf '\n<link rel="stylesheet" href="/assets/memory-fonts.css" />\n' >> "$f"
done
grep -L "memory-fonts.css" src/raw/ko/*head*.html src/raw/en/*head*.html
```
Expected: grep -L 출력 없음 (전부 포함).

주의: `head.html`(메인)도 `*head*` 글롭에 걸리는지 확인 — 안 걸리므로 명시적으로:

```bash
printf '\n<link rel="stylesheet" href="/assets/memory-fonts.css" />\n' >> src/raw/ko/head.html
printf '\n<link rel="stylesheet" href="/assets/memory-fonts.css" />\n' >> src/raw/en/head.html
```

- [ ] **Step 4: 커밋**

```bash
git add -A && git commit -m "Add Pretendard Hangul fallback for theme fonts"
```

---

### Task 4: 전역 공통 치환 (모든 raw 파일)

**Files:**
- Modify: `src/raw/ko/*.html`, `src/raw/en/*.html` (20개 전부)

**Interfaces:**
- Produces: 이후 태스크는 이메일·로고·소셜·언어 토글이 끝난 상태를 전제.

- [ ] **Step 1: 이메일 전역 치환**

```bash
grep -rl "info@themenectar.com" src/raw | xargs perl -pi -e 's/info\@themenectar\.com/devguru.j610\@gmail.com/g'
grep -r "themenectar" src/raw | wc -l
```
Expected: 마지막 wc 0. (0이 아니면 남은 참조를 개별 확인 후 제거/치환.)

- [ ] **Step 2: 로고 교체**

각 body 파일의 `<a id="logo" ...>` 내부 텍스트(데모 워드마크)를 찾아 내부 콘텐츠만 교체: KO 파일 → `기억`, EN 파일 → `Memory`. `<a>` 속성과 감싸는 구조는 유지. 로고가 이미지(`<img>`)면 img를 텍스트 노드로 대체하지 말고 alt/src만 보고 판단하지 말 것 — 실제 마크업을 열어 텍스트 로고인지 확인 후 텍스트만 교체.

검증: `grep -c 'id="logo"' src/raw/ko/body.html` 결과와 동일한 수의 `기억` 로고 존재.

- [ ] **Step 3: Get Social 링크 교체**

각 body의 "Get Social" 블록 앵커들을 다음 2개로 교체 (남는 데모 앵커는 `<li>`/래퍼 단위로 삭제하되 목록 구조 유지):

- `GitHub` → `https://github.com/Devguru-J`
- `App Store` → `https://apps.apple.com/kr/app/monkey-flash/id6790402017?mt=12`

KO 파일에서는 라벨 "Say Hello"→"이메일", "Get Social"→"소셜".

- [ ] **Step 4: 메뉴 현지화 + 언어 토글**

각 body의 메뉴(OCM + 일반 메뉴 두 벌 모두):

| 데모 | KO | EN | href |
| --- | --- | --- | --- |
| Index | 처음 | Index | `/` (EN: `/en/`) |
| Services | 작업 범위 | Services | `/#services` (EN: `/en/#services`) |
| Testimonials | 원칙 | Principles | `/#testimonials` (EN: `/en/#testimonials`) |
| Work | 작업 | Work | `/work/` (EN: `/en/work/`) |
| (contact 버튼) | 문의 | Contact | `#contact` (메인 외 페이지는 `/#contact`, EN은 `/en/#contact`) |

언어 토글: 마지막 일반 메뉴 `<li>` 를 복제해 KO 파일엔 `<a class="lang-link" href="/en/">EN</a>`, EN 파일엔 `<a class="lang-link" href="/">KO</a>` 추가 (OCM 메뉴에도 동일).

- [ ] **Step 5: lang 쿠키 + 문의 폼 mailto 스크립트 주입**

각 body 파일 **맨 끝**에 추가. KO 파일용:

```html
<script>
(function(){
  document.querySelectorAll('a.lang-link').forEach(function(a){
    a.addEventListener('click',function(){
      var lang=a.getAttribute('href').indexOf('/en')===0?'en':'ko';
      document.cookie='lang='+lang+'; path=/; max-age=31536000; samesite=lax';
    });
  });
  var f=document.querySelector('form.frm-fluent-form');
  if(f){f.addEventListener('submit',function(e){
    e.preventDefault();
    var v=function(sel){var el=f.querySelector(sel);return el&&el.value?el.value:''};
    var checked=Array.prototype.map.call(f.querySelectorAll('input[type=checkbox]:checked'),function(c){return c.value}).join(', ');
    var lines=['이름: '+v('[name="names[first_name]"]')+' '+v('[name="names[last_name]"]'),'이메일: '+v('[name="email"]'),'전화: '+v('[name="input_text"]'),'관심 분야: '+checked,'',v('textarea')];
    location.href='mailto:devguru.j610@gmail.com?subject='+encodeURIComponent('프로젝트 문의')+'&body='+encodeURIComponent(lines.join('\n'));
  });}
})();
</script>
```

EN 파일용: 동일 코드에서 라벨만 `Name:/Email:/Phone:/Interested in:`, subject `Project Inquiry`.

- [ ] **Step 6: WP 잔재 제거**

모든 head 파일에서 `https://api.w.org` rel 링크 라인 제거:

```bash
grep -rl "api.w.org" src/raw && perl -pi -e 's/<link[^>]*api\.w\.org[^>]*>//g' src/raw/*/*.html
grep -r "api.w.org" src/raw | wc -l
```
Expected: 0.

- [ ] **Step 7: 빌드 + 커밋**

```bash
npm run build && git add -A && git commit -m "Localize global chrome: logo, menus, socials, contact mailto"
```

---

### Task 5: 메인 페이지 콘텐츠 치환 (KO + EN)

**Files:**
- Modify: `src/raw/ko/head.html`, `src/raw/ko/body.html`, `src/raw/en/head.html`, `src/raw/en/body.html`

치환 원칙: 아래 표의 데모 텍스트를 앵커로 검색해 텍스트 노드만 교체. split-heading 등으로 글자가 span 분해돼 있으면 감싸는 요소 단위로 내부 텍스트를 교체하되 마크업 패턴(글자당 span 등)을 동일하게 재현한다.

- [ ] **Step 1: 히어로 + 섹션 헤딩 (body)**

| 데모 앵커 | KO | EN |
| --- | --- | --- |
| `WE CREATE` (h1) | `필요한 것을` | `WE BUILD` |
| `THE HYPE` (h1) | `만듭니다` | `WHAT'S NEEDED` |
| `From strategy to spotlight, we make brands shine` (h2) | `처음 결정부터 출시까지, 한 흐름으로 이어 갑니다` | `From the first decision to release, everything stays connected` |
| `In a ...` (중앙 h2, 스크롤 리빌 문장 전체) | `가장 중요한 사용 흐름부터 구현하고, 나머지는 실제 쓰임에 맞춰 제품을 다듬습니다.` | `Get the essential path working first, then let real use shape the rest of the product.` |

히어로 주변 메타 텍스트(존재 시): KO `대한민국 기반` / `제품을 직접 설계하고 개발하는 1인 독립 스튜디오` / `데스크톱 · 웹 · 클라우드`, EN `Based in Korea` / `An independent one-person software studio` / `Desktop · Web · Cloud`.

- [ ] **Step 2: 서비스 티커 6종 (h3)**

| 데모 | KO | EN |
| --- | --- | --- |
| Content Creation | 제품 방향 설정 | Product Direction |
| Web Design | 인터페이스 설계 | Interface Design |
| Branding | macOS 애플리케이션 | macOS Applications |
| Videos | 웹 인터페이스 | Web Interfaces |
| Social Media | 클라우드 · 플랫폼 | Cloud & Platforms |
| Marketing | 협업과 운영 | Delivery & Support |

티커가 동일 목록을 2회 반복하면 두 벌 모두 교체. 각 카드에 이미지가 있으면: 제품 방향 설정→`/assets/menu-popover.png`, 인터페이스 설계→`/assets/settings-visual.png`, macOS→`/assets/work-monkeyflash.jpg`, 웹→`/assets/work-kbinc.jpg`, 나머지 2개는 데모 이미지 유지 (src 교체 시 srcset/sizes 제거).

- [ ] **Step 3: 작업물 섹션**

데모의 프로젝트 리스트를 3개로: `Monkey Flash`→`/portfolio/monkey-flash/`, KO `케이비(주)` EN `KB Inc.`→`/portfolio/kbinc/`, KO `다음 제품 — 준비 중` EN `Next Product — In the Works`→`/portfolio/next-product/`. (EN은 `/en/portfolio/...`.) 데모 항목이 3개 초과면 초과분은 반복 단위(li/div) 통째로 삭제. 이미지 슬롯: monkey-flash→`/assets/work-monkeyflash.jpg`, kbinc→`/assets/work-kbinc.jpg`, next-product→데모 이미지 유지.

- [ ] **Step 4: 테스티모니얼 → 일하는 원칙 4개**

데모 인용 슬라이드를 원칙으로 교체 (슬라이드 수가 4개 미만이면 마지막 슬라이드 반복 단위를 복제해 4개로, 초과면 삭제):

KO: (1) "기능을 늘리기 전에 제품이 해야 할 일을 정합니다. 그 쓰임에 필요한 기능만 남깁니다." — 일하는 원칙 / 01 · 기능보다 쓰임 (2) "인터페이스와 데이터, 성능, 접근성을 따로 떼지 않고 한 제품 안에서 함께 판단합니다." — 일하는 원칙 / 02 · 설계와 개발을 함께 (3) "가장 중요한 흐름을 먼저 구현하고, 실제 사용에서 확인한 내용을 바탕으로 다듬습니다." — 일하는 원칙 / 03 · 핵심 흐름부터 (4) "업데이트와 지원은 물론, 유지보수를 마칠 때의 안내까지 운영에 포함합니다." — 일하는 원칙 / 04 · 출시 이후도 제품의 일부

EN: i18n.ts의 principles 4개 원문 사용 (Working Principle / 01 Purpose before features, 02 Design and engineering together, 03 The core comes first, 04 Responsibility after launch).

- [ ] **Step 5: 문의 폼 현지화 (KO만)**

placeholder: First Name→이름, Last Name→성, Email Address→이메일 주소, Phone Number→전화번호. 체크박스 라벨(관심 분야): 제품 방향 / 인터페이스 설계 / macOS 앱 / 웹 인터페이스. 제출 버튼: KO `이메일로 문의하기`, EN `Email Memory`. 폼 섹션 주변 데모 문구가 있으면 자연스러운 KO/EN 문구로 교체.

- [ ] **Step 6: 거대 푸터 워드마크**

`SIGNAL` (푸터 h1) → KO `기억`, EN `Memory`.

- [ ] **Step 7: head 메타 교체 (양 언어)**

KO `head.html`:
- `<title>Signal</title>` → `<title>기억 — 독립 소프트웨어 스튜디오</title>`
- meta description 추가/교체: `기억은 한 사람이 데스크톱과 웹용 소프트웨어를 설계하고 개발하는 독립 스튜디오입니다.`
- canonical `https://bymemory.dev/`, hreflang: ko=`/`, en=`/en/`, x-default=`/`
- og:title/og:description 동일 카피, og:image `https://bymemory.dev/assets/og-cover-ko.jpg`, og:url, twitter:card `summary_large_image`
- favicon 링크가 데모 것을 가리키면 `/assets/favicon.png`, apple-touch-icon `/assets/apple-touch-icon.png` 로 교체

EN `head.html`: title `Memory — Independent Software Studio`, description `Memory is an independent software studio run by one person. It designs and builds desktop and web products.`, canonical `/en/`, og-cover-en.jpg. 나머지 동일.

- [ ] **Step 8: 검증 + 커밋**

```bash
grep -c "SIGNAL\|WE CREATE\|THE HYPE" src/raw/ko/body.html src/raw/en/body.html   # each: 0
npm run build
git add -A && git commit -m "Apply Memory content to main pages (ko/en)"
```

---

### Task 6: Work 페이지 (KO + EN)

**Files:**
- Modify: `src/raw/{ko,en}/work-head.html`, `src/raw/{ko,en}/work-body.html`

- [ ] **Step 1: 목록을 3개 항목으로 재구성**

데모 5개 항목 중 3개를 남기고 (반복 단위 통째로 삭제) 다음으로 교체:

| 항목 | 링크(KO / EN) | 제목(KO / EN) | 이미지 |
| --- | --- | --- | --- |
| 1 | `/portfolio/monkey-flash/` · `/en/portfolio/monkey-flash/` | Monkey Flash | `/assets/work-monkeyflash.jpg` |
| 2 | `/portfolio/kbinc/` · `/en/portfolio/kbinc/` | 케이비(주) / KB Inc. | `/assets/work-kbinc.jpg` |
| 3 | `/portfolio/next-product/` · `/en/portfolio/next-product/` | 다음 제품 — 준비 중 / Next Product — In the Works | 데모 이미지 유지 |

페이지 상단 헤딩(데모 "Signal Work" 류) → KO `작업`, EN `Work`. 카테고리/태그 라벨이 있으면: monkey-flash `macOS 앱`/`macOS App`, kbinc `웹 인터페이스`/`Web Interface`, next-product `준비 중`/`In Progress`.

- [ ] **Step 2: head 메타**

KO: title `작업 — 기억`, canonical `/work/`, hreflang ko=`/work/` en=`/en/work/`, og:image og-cover-ko.jpg. EN: title `Work — Memory`, canonical `/en/work/`. description: KO `기억이 설계하고 개발한 제품들.` EN `Products designed and built by Memory.`

- [ ] **Step 3: 검증 + 커밋**

```bash
grep -c "portfolio/balanced\|portfolio/crystal-vibes\|portfolio/into-the-heat\|portfolio/framework\|portfolio/radiant" src/raw/ko/work-body.html src/raw/en/work-body.html   # each: 0
npm run build && git add -A && git commit -m "Rebuild work index with Memory projects (ko/en)"
```

---

### Task 7: 포트폴리오 상세 — Monkey Flash (KO + EN)

**Files:**
- Modify: `src/raw/{ko,en}/monkey-flash-{head,body}.html`

- [ ] **Step 1: body 콘텐츠 교체**

| 슬롯 (balanced 데모) | KO | EN |
| --- | --- | --- |
| h1 `Balanced` | `Monkey Flash` | `Monkey Flash` |
| 태그라인 `A Life in Motion` | `화면은 어둡게, 집중은 밝게` | `Dim the noise, keep the focus` |
| 소개 문단 (`Balance embodies...`) | `Monkey Flash는 활성 창은 밝게 유지하고 배경을 어둡게 낮춰 집중을 돕는 macOS 메뉴 막대 앱입니다. 접근성·화면 기록 권한 없이 동작하고, 개인정보를 일절 수집하지 않습니다. App Store에서 만나볼 수 있습니다.` | `Monkey Flash is a macOS menu bar app that keeps the active window bright and dims everything behind it. It runs without accessibility or screen-recording permissions and collects no personal data. Available on the App Store.` |
| Expertises 목록 | `macOS 앱` / `메뉴 막대 유틸리티` | `macOS App` / `Menu Bar Utility` |
| Services 목록 | `Swift` / `Apple Silicon` / `App Store 배포` | `Swift` / `Apple Silicon` / `App Store Release` |

- CTA/외부 링크 자리(있으면): `https://apps.apple.com/kr/app/monkey-flash/id6790402017?mt=12`
- 히어로/본문 이미지 중 첫 슬롯을 `/assets/work-monkeyflash.jpg`로 (srcset 제거), 나머지는 데모 유지
- Other Work: 2개 항목을 `케이비(주)`→`/portfolio/kbinc/`, `다음 제품`→`/portfolio/next-product/` (EN 제목·경로 대응). `View All`→`/work/` (EN `/en/work/`)

- [ ] **Step 2: head 메타**

KO: title `Monkey Flash — 기억`, description `배경을 어둡게 낮춰 집중을 돕는 macOS 메뉴 막대 앱.`, canonical `/portfolio/monkey-flash/`, hreflang 쌍, og-cover-ko.jpg. EN: title `Monkey Flash — Memory`, description `A macOS menu bar app that dims the background to help you focus.`, canonical `/en/portfolio/monkey-flash/`.

- [ ] **Step 3: 검증 + 커밋**

```bash
grep -ci "Balanced\|A Life in Motion" src/raw/ko/monkey-flash-body.html src/raw/en/monkey-flash-body.html   # each: 0 (클래스명 제외 — 텍스트 앵커 기준 확인)
npm run build && git add -A && git commit -m "Add Monkey Flash portfolio detail (ko/en)"
```

---

### Task 8: 포트폴리오 상세 — 케이비(주) + 다음 제품 (KO + EN)

**Files:**
- Modify: `src/raw/{ko,en}/kbinc-{head,body}.html`, `src/raw/{ko,en}/next-product-{head,body}.html`

- [ ] **Step 1: kbinc body (framework 데모 기반)**

| 슬롯 | KO | EN |
| --- | --- | --- |
| h1 `Framework` | `케이비(주)` | `KB Inc.` |
| 태그라인 `Shaped by the Art We Make` | `회사의 얼굴이 되는 웹사이트` | `A website that speaks for the company` |
| 소개 문단 | `케이비(주)의 공식 웹사이트를 설계하고 구축했습니다. 빠르고 가벼운 정적 사이트로, 회사 소개와 사업 영역을 명확한 구조로 전달합니다.` | `Designed and built the official website for KB Inc. — a fast, lightweight static site that presents the company and its business areas in a clear structure.` |
| Expertises | `웹 인터페이스` / `정적 사이트` | `Web Interface` / `Static Site` |
| Services | `Astro` / `성능 최적화` / `기술 SEO` | `Astro` / `Performance` / `Technical SEO` |

CTA/외부 링크: `https://kbinc.kr`. 첫 이미지 슬롯 `/assets/work-kbinc.jpg`. Other Work: Monkey Flash + 다음 제품.

- [ ] **Step 2: next-product body (radiant 데모 기반)**

| 슬롯 | KO | EN |
| --- | --- | --- |
| h1 `Radiant` | `다음 제품` | `Next Product` |
| h2 `Life in Full Color` | `준비 중입니다` | `In the works` |
| 소개 문단 | `다음 제품을 준비하고 있습니다. 가장 중요한 사용 흐름부터 구현하고, 실제 쓰임에 맞춰 다듬는 원칙 그대로 만들고 있습니다. 소식이 궁금하시면 이메일로 알려 주세요.` | `The next product is in the works — built the same way as everything else here: essential path first, refined by real use. Get in touch if you'd like to hear when it ships.` |
| Expertises | `데스크톱` / `클라우드` | `Desktop` / `Cloud` |
| Services | `설계` / `개발` | `Design` / `Engineering` |

CTA: `/#contact` (EN `/en/#contact`). 이미지는 데모 유지. Other Work: Monkey Flash + 케이비(주).

- [ ] **Step 3: head 메타 4파일**

- kbinc KO: title `케이비(주) — 기억`, description `케이비(주) 공식 웹사이트 설계와 구축.`, canonical `/portfolio/kbinc/` (+hreflang, og-cover-ko)
- kbinc EN: title `KB Inc. — Memory`, description `Design and build of the official KB Inc. website.`, canonical `/en/portfolio/kbinc/`
- next-product KO: title `다음 제품 — 기억`, description `기억의 다음 제품, 준비 중.`, canonical `/portfolio/next-product/`
- next-product EN: title `Next Product — Memory`, description `Memory's next product, in the works.`, canonical `/en/portfolio/next-product/`

- [ ] **Step 4: 검증 + 커밋**

```bash
grep -ci ">Framework<\|Shaped by the Art\|>Radiant<\|Life in Full Color" src/raw/*/kbinc-body.html src/raw/*/next-product-body.html   # each: 0
npm run build && git add -A && git commit -m "Add KB Inc. and next-product portfolio details (ko/en)"
```

---

### Task 9: 전체 검증 (빌드 + 브라우저)

- [ ] **Step 1: 데모 잔재 전수 스윕**

```bash
grep -rn ">Signal<\|>SIGNAL<\|themenectar\|WE CREATE\|THE HYPE\|Content Creation\|In the Flow\|Into the Heat\|Crystal Vibes" src/raw/ | grep -v "wp-content" ; echo "exit=$?"
```
Expected: 매치 없음(exit=1). alt 속성 내 "Signal" 도 검색해 정리: `grep -rn 'alt="[^"]*Signal' src/raw/` → 없음.

- [ ] **Step 2: 빌드 + 라우트 존재 확인**

```bash
npm run build
for p in index.html en/index.html work/index.html en/work/index.html \
  portfolio/monkey-flash/index.html portfolio/kbinc/index.html portfolio/next-product/index.html \
  en/portfolio/monkey-flash/index.html en/portfolio/kbinc/index.html en/portfolio/next-product/index.html \
  MonkeyFlash/privacy/index.html MonkeyFlash/support/index.html; do test -f "dist/$p" && echo "OK $p" || echo "MISSING $p"; done
```
Expected: 12개 전부 OK.

- [ ] **Step 3: 로컬 프리뷰 + 브라우저 확인 (playwright MCP)**

`npm run preview` (백그라운드, http://localhost:4321) 후 각 페이지 확인:

- `/` : 히어로 "필요한 것을 만듭니다" 렌더, 한글이 Pretendard로 렌더(시스템 세리프/두꺼운 라틴 폴백 아님), 콘솔 404 없음(wp-content 에셋 로드 확인)
- 메뉴 열기 → 처음/작업 범위/원칙/작업/EN 항목 확인, EN 클릭 → `/en/` 이동 + `document.cookie`에 `lang=en`
- `/en/`, `/work/`, `/portfolio/monkey-flash/`, `/portfolio/kbinc/`, `/portfolio/next-product/` + EN 미러 스크린샷
- `/MonkeyFlash/privacy`, `/MonkeyFlash/support` — v2와 동일하게 렌더
- 문의 폼 제출 → mailto: 로 이동 시도 확인 (네트워크 POST 발생 안 함)

Expected: 콘솔 에러 0, 깨진 이미지 0. 발견된 문제는 이 단계에서 수정 후 재확인.

- [ ] **Step 4: 커밋**

```bash
git add -A && git commit -m "Fix issues found in v3 visual verification"   # 수정이 있었던 경우만
```

---

### Task 10: 배포 + 라이브 확인

- [ ] **Step 1: 푸시**

```bash
git push origin main
```

- [ ] **Step 2: Cloudflare Pages 배포 대기 + 라이브 검증**

빌드 완료까지 폴링 (2~4분):

```bash
for i in $(seq 1 20); do curl -s https://bymemory.dev/ | grep -q "기억" && echo LIVE && break; sleep 20; done
```

라이브 확인 항목:

```bash
curl -s -o /dev/null -w "%{http_code} " https://bymemory.dev/ https://bymemory.dev/en/ https://bymemory.dev/work/ https://bymemory.dev/portfolio/monkey-flash/ https://bymemory.dev/portfolio/kbinc/ https://bymemory.dev/portfolio/next-product/ https://bymemory.dev/MonkeyFlash/privacy https://bymemory.dev/MonkeyFlash/support; echo
curl -s -o /dev/null -w "%{http_code}\n" -H "cf-ipcountry: US" https://bymemory.dev/   # 302 or 200 (geo function)
curl -s https://bymemory.dev/ | grep -o "og-cover-ko.jpg" | head -1
```
Expected: 전부 200 (privacy/support는 301→200 허용), og-cover-ko.jpg 존재.

- [ ] **Step 3: 메모리 갱신**

`~/.claude/.../memory/devguru-website-project.md` 를 v3 반영해 업데이트 (Salient 포팅 디자인, raw/ko·raw/en 구조, 포트폴리오 3종, design-v2-final 태그).

---

## Self-Review 결과

- 스펙 커버리지: 페이지 구조(T2), 콘텐츠 매핑(T4–T8), 이미지 방침(T5–T8), 한글 폰트(T3), 메타/SEO(T5–T8), 마이그레이션/정리(T1–T2), 검증/배포(T9–T10) — 전부 태스크에 대응됨
- 데모 상세 5개 중 2개 제외: 복사하지 않으므로 자동 제외(T2 Step 2)
- 타입/명명 일관성: raw 파일명 규칙과 래퍼 import 경로 T2에서 정의, 이후 태스크 동일 사용
