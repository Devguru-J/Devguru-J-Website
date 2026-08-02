# 기억 (Memory) — 디자인 시스템

이 사이트의 시각 언어를 한 곳에 적어 둔 문서다. 목적은 두 가지다.

1. 이 저장소에서 무언가를 고칠 때 **어떤 값을 어디서 가져다 쓰는지** 헷갈리지 않게 한다.
2. 다른 프로젝트를 시작할 때 **여기서 무엇을 떼어 갈 수 있고 무엇은 못 가져가는지** 구분한다.

관련 문서: `HANDOFF.md`(사이트 전반의 인수인계). 도림사 사이트에는 같은 구조의
`docs/DESIGN.md` 가 따로 있고, 토큰 접두사만 `--dorimsa-*` 로 다르다.

---

## 1. 이름 규칙

CSS 커스텀 프로퍼티는 **출처에 따라 네 종류**로 나뉜다. 이 구분이 이 문서에서 가장 중요하다.

| 접두사 | 뜻 | 이름을 바꿔도 되나 |
|---|---|---|
| `--memory-*` | 이 사이트가 정한 값 | 된다 |
| `--nectar-*`, `--page-color-change-section-transition-time` | 구매한 Salient(Nectar) 테마의 **원본 이름 그대로** | **안 된다** |
| 컴포넌트 로컬 (`--memory-hover-easing` 등) | 한 컴포넌트 안에서만 쓰는 값 | 된다 |
| `--color-ink`, `--color-ink-2`, `--color-amber`, `--color-container-low`, `--font-mono` | App Store 심사용 본문 HTML이 **참조하는 이름** | **안 된다** |

### `--nectar-*` 를 안 바꾸는 이유

이 사이트의 모션은 Salient 테마 소스에서 값을 1:1로 옮겨 온 것이다(§5). 원본과 같은
이름을 쓰는 것이 "이 값이 원본에서 왔다"는 유일한 증거다. 이름을 갈아엎으면 나중에
원본과 다시 대조할 수 없다. 그래서 `--nectar-*` 는 그대로 둔다.

### 마지막 줄의 이름들

`src/components/LegalShell.astro` 가 `--color-ink` 같은 이름들을 `currentColor` 기반으로
정의한다. 이 이름들은 **`src/pages/MonkeyFlash/privacy.astro` · `support.astro` 의 본문
HTML이 직접 참조**한다. 그 본문은 App Store 인프라라서 한 바이트도 건드리지 않는다.
껍데기(LegalShell)만 다시 칠하는 구조이고, 그래서 이름이 우리 규칙 밖에 있다.

---

## 2. 색 — **이 사이트에는 컬러 토큰이 없다**

의도된 것이다. 헷갈리기 쉬운 부분이라 먼저 적는다.

- 모든 글자·선·아이콘 색은 `currentColor` 다.
- 페이지 전체의 흑↔백 반전은 Salient 의 **colour-change section** 이 만든다.
  섹션 마크업의 `data-color-change-section-bg-color` / `-text-color` 속성을
  `src/scripts/motion.js` 가 읽어서 `--nectar-page-background-color` /
  `--nectar-page-text-color` 를 런타임에 갈아끼운다. `body` 는 그 두 값을
  `0.8s`(`--page-color-change-section-transition-time`) 동안 크로스페이드한다.
- 농담은 색이 아니라 **`opacity`** 로 만든다. (`.muted { opacity: .55 }`,
  `.rule { opacity: .14 }`, 본문 보조선 `color-mix(in srgb, currentColor N%, transparent)`)

그래서 `--ink: #000` 같은 **고정 컬러 토큰을 만들면 안 된다.** 검정 섹션 안에서
검정 글자가 되어 버린다. 실제로 그런 토큰 7개(`--ink`, `--paper`, `--ink-70/55/40/14/08`)가
아무 데서도 쓰이지 않은 채 남아 있었고, 2026-08-02 정리에서 걷어냈다.

`data-color-change-section-*` 속성값의 `#ffffff` / `#000000` 은 CSS 가 아니라
JS가 읽는 **문자열**이다. 토큰화 대상이 아니다.

---

## 3. 타이포

**폰트는 Pretendard Variable 하나다.** jsDelivr 의 dynamic subset CSS 를 `<head>` 에서
불러온다(`src/layouts/Base.astro`). 자체 호스팅 폰트도, 세리프도, 모노스페이스도 없다.

```
'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui,
Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR',
'Malgun Gothic', sans-serif
```

### 눈금

| 토큰 | 값 | 실크기 |
|---|---|---|
| `--memory-fs-display` | `clamp(2.5rem, 1.5rem + 3.35vw, 5rem)` | 40 → 80px |
| `--memory-fs-h1` | `clamp(2.5rem, 1.55rem + 3.05vw, 4.75rem)` | 40 → 76px |
| `--memory-fs-h2` | `clamp(2rem, 1.55rem + 1.9vw, 3.5rem)` | 32 → 56px |
| `--memory-fs-subhead` | `clamp(1.5rem, 0.97rem + 1.77vw, 2.75rem)` | 24 → 44px |
| `--memory-fs-h3` | `clamp(1.5rem, 1.3rem + 0.75vw, 2.25rem)` | 24 → 36px |
| `--memory-fs-lead` | `clamp(1.125rem, 1.03rem + 0.42vw, 1.5rem)` | 18 → 24px |
| `--memory-fs-h4` | `clamp(1.125rem, 1.06rem + 0.22vw, 1.375rem)` | 18 → 22px |
| `--memory-fs-body` | `clamp(1rem, 0.965rem + 0.12vw, 1.0625rem)` | 16 → 17px |
| `--memory-fs-meta` | `clamp(0.8125rem, 0.79rem + 0.08vw, 0.875rem)` | 13 → 14px |

### ⚠ clamp 규칙 — 어기지 말 것

모든 단계가 **`clamp(최소rem, rem + vw, 최대rem)`** 꼴이다. 가운데 항에 `rem` 절편이
반드시 있어야 한다.

- `rem` 항이 눈금 전체를 루트 글자 크기에 묶어 둔다 → 브라우저 확대와 사용자
  글자 크기 설정이 그대로 먹는다.
- `vw` 는 **기울기만** 담당한다.

`clamp(2.5rem, 5vw, 4.75rem)` 처럼 **가운데가 `vw` 뿐이면 안 된다.** 그러면 제목만
화면 폭을 따라가고 본문은 16px 에 묶여서, 1440px 에서 h1:본문 비율이 5.4:1,
1728px 에서 6.1:1 까지 벌어진다(맥북에서 헤드라인만 혼자 커 보이던 증상).
지금 눈금은 1440px 에서 4.2:1 이다.

### 본문 기본값

`line-height: 1.75` · `letter-spacing: -0.015em` · 제목은 `-0.045em` / `1.18`.
한국어 줄바꿈은 전역으로 `word-break: keep-all` + `text-wrap: pretty`.

---

## 4. 리듬 / 레이아웃

| 토큰 | 값 | 쓰임 |
|---|---|---|
| `--memory-page-max` | `1560px` | `.container` 최대폭 |
| `--memory-gutter` | `clamp(24px, 5.2vw, 96px)` | `.container` 좌우 여백 |
| `--memory-section-y` | `clamp(120px, 15vw, 260px)` | `.section` 상하 |
| `--memory-section-y-tight` | `clamp(88px, 10vw, 168px)` | `.section--tight` |
| `--memory-grid-gap` | `clamp(16px, 2vw, 40px)` | `.grid` column-gap |
| `--memory-space-sm` | `clamp(1.5rem, 3vw, 2.5rem)` | 24 → 40px |
| `--memory-space-md` | `clamp(2rem, 4vw, 3.5rem)` | 32 → 56px |
| `--memory-space-lg` | `clamp(2.5rem, 5vw, 4.5rem)` | 40 → 72px |
| `--memory-space-xl` | `clamp(3.5rem, 6vw, 6rem)` | 56 → 96px |
| `--memory-space-2xl` | `clamp(5rem, 9vw, 9rem)` | 80 → 144px |
| `--memory-gap-wide` | `clamp(1.5rem, 5vw, 5rem)` | 넓은 2열 column gap 전용 (기울기가 가파르다) |

`space-*` 는 역할이 정해진 값이 아니라 **순수 리듬 눈금**이다. `margin-top` ·
`padding` · `gap` 어디에나 쓴다.

### 전역 클래스

`.container` · `.section` / `.section--tight` · `.grid`(12열) · `.rule` ·
`.eyebrow` + `.eyebrow__index` · `.lead` · `.muted`

이 이름들은 접두사가 없다 → **다른 프로젝트에 그대로 붙이면 충돌한다.** §8 참고.

---

## 5. 모션

### Salient 원본에서 옮겨 온 값 — 함부로 바꾸지 말 것

`src/styles/global.css` §5 전체가 verbatim 포트다. 값을 바꾸면 원본과 어긋난다.

| 무엇 | 값 | 이징 토큰 | 원본 |
|---|---|---|---|
| 컬럼/이미지 등장 | `650ms`, waypoint 88% | `--memory-ease-out-cubic` `cubic-bezier(.215,.61,.355,1)` | `css/src/style.css` §9.19 |
| 분할 제목 리빌 | `translateY(1.3em)→0`, `1.2s`, stagger `clamp(500/n,15,50)ms` | `--memory-ease-reveal` `cubic-bezier(.25,1,.5,1)` | `class-nectar-element-styles.php` + `init.js` |
| 밑줄 sweep | `background-size 0%→100% 1px`, `0.55s` | `--memory-ease-underline` `cubic-bezier(.2,.75,.5,1)` | `.nectar-underline` |
| CTA 화살표 | `0.45s` (키프레임 8개) | `--memory-ease-arrow` `cubic-bezier(.23,.46,.4,1)` | `style.css` + `style-non-critical.css` |
| CTA 밑줄 | `0.4s` | `--memory-ease-arrow` | `.nectar-cta[data-style="underline"]` |
| zoom-out-reveal | frame `.7→1` / inner `1.75→1`, `1.3s`, opacity `0.4s` | `--memory-ease-zoom` `cubic-bezier(.12,.75,.4,1)` | `.row-bg-wrap[data-bg-animation]` |
| 페이지 로드 페이드 | `0.6s ease` | — | `#ajax-content-wrap` |
| fancy ul | `0.65s`, `left -20px→0` | `--memory-ease-out-cubic` | `element-fancy-unordered-list.css` |
| 섹션 색 전환 | `0.8s` | `--page-color-change-section-transition-time` | `css/colors.php` |
| Salient 코어 | `--nectar-cubic-bezier-out` `(.3,1,.3,1)`, `-in-out` `(.76,0,.24,1)`, 헤더 호버 `0.65s` | — | `style.css :root` |

### 이 사이트가 직접 정한 값

- `--memory-ease-ui: cubic-bezier(0.25, 1, 0.33, 1)` — 폼 필드·테두리·불투명도 전환.
  Salient 원본에 없는 값이라 자유롭게 바꿔도 parity 가 안 깨진다.
- 지속시간은 토큰화하지 않았다. 같은 이징에 `0.35s` 와 `0.45s` 가 섞여 쓰이고,
  하나로 묶으면 오히려 거짓말이 된다.

### JS

`src/scripts/motion.js` 하나가 전부 담당한다. IntersectionObserver 가 아니라 Salient 와
같은 **waypoint(스크롤 오프셋 %)** 방식이다. 담당: 컬럼 등장 · 분할 제목 ·
scroll-opacity-reveal · 섹션 색 전환 · 마우스 팔로우 · 헤더 · 모바일 내비 ·
fancy list · 챕터 인덱스.

### 접근성

`prefers-reduced-motion: reduce` 에서 모든 등장 상태를 `opacity:1 / transform:none`
으로 강제하고 duration 을 `0.001ms` 로 만든다(§5.9). 새 모션을 추가하면 여기에도
반드시 한 줄 넣는다.

---

## 6. 컴포넌트

| 파일 | 역할 | 다른 프로젝트로 |
|---|---|---|
| `Reveal.astro` | 스크롤 등장 래퍼 | ◎ 그대로 |
| `SplitHeading.astro` | 행/단어 단위 제목 리빌 | ◎ 그대로 |
| `Cta.astro` | Salient 화살표/밑줄 CTA | ◎ 그대로 |
| `Header.astro` | 스크롤 시 frost(블러만, 틴트 없음) | ○ 구조 참고 |
| `Footer.astro` | 반전 섹션 + 연락 | ○ 구조 참고 |
| `ChapterIndex.astro` | 긴 페이지의 챕터 내비 | ○ 구조 참고 |
| `WorkList.astro` | 작업 목록 + 마우스 팔로우 미디어 | ○ 구조 참고 |
| `ContactForm.astro` | Salient 폼 스타일 재현 | ○ 구조 참고 |
| `LegalShell.astro` | App Store 본문 껍데기 | ✕ 이 사이트 전용 |

`Reveal` · `SplitHeading` · `Cta` 세 개가 실제 재사용 단위다. 셋 다 `motion.js` 의
해당 함수와 §5 의 CSS 블록이 **함께** 있어야 동작한다.

---

## 7. 콘텐츠 규칙

디자인은 아니지만 화면을 바꾸는 제약이라 같이 적는다.

- 사이트는 **한국어 전용**이다.
- 공개 작업물은 **정확히 2개** — Monkey Flash, KB Inc. 늘리지 않는다.
- 연락처는 `devguru.j610@gmail.com` 하나. 실명·소재지는 공개하지 않는다.

---

## 8. 다른 프로젝트로 가져갈 때

**가져갈 수 있는 것**

- `global.css` §1 Reset — 그대로 복사.
- `global.css` §2 Tokens — 구조를 복사하고 값만 교체. 단 §2의 "컬러 토큰이 없다"는
  이 사이트 고유의 판단이다. 새 사이트가 색을 고정한다면 컬러 토큰을 만들어야 한다.
- `global.css` §5 모션 + `motion.js` — **가장 값어치 있는 부분.** 단 §5 CSS 와
  `motion.js` 의 함수는 짝이다. 한쪽만 가져가면 안 움직인다.
- `Reveal` / `SplitHeading` / `Cta`.

**가져가면 안 되는 것**

- `LegalShell` 과 `--color-*` 이름들 — App Store 본문 전용.
- `.container` / `.section` / `.grid` / `.rule` / `.lead` / `.muted` 전역 클래스 —
  **이름이 너무 흔해서 붙이는 순간 충돌한다.** 접두사(`u-` 또는 `memory-`)를 붙이는
  작업이 아직 남아 있다(§9).

**옮길 때 순서**

1. `global.css` §2 의 `--memory-*` 블록을 통째로 복사하고 접두사를 새 사이트 이름으로 바꾼다.
2. §5 와 `motion.js` 를 복사한다. `--nectar-*` 이름은 **바꾸지 않는다** — 그게 원본 대조의 근거다.
3. 필요한 컴포넌트를 가져오고, 각 컴포넌트가 요구하는 토큰이 있는지 확인한다.

---

## 9. 남은 부채

2026-08-02 기준. 지금 당장 깨진 것은 없지만 알고는 있어야 하는 것들.

1. **전역 클래스에 접두사가 없다.** `.container` · `.section` · `.grid` · `.rule` ·
   `.eyebrow` · `.lead` · `.muted`. 토큰은 이번에 `--memory-*` 로 정리했지만 클래스는
   손대지 않았다(마크업 전체를 건드리는 작업이라 별건으로 뺐다).
2. **`global.css` 가 단일 파일 791줄이다.** 합의된 다음 단계는
   `@layer reset, tokens, base, layout, motion, overrides` 선언 → 5분할
   (`reset.css` / `tokens.css` / `motion.css` / `site.css` / `global.css`) →
   컴포넌트 콜로케이션이다. 도림사 사이트는 이미 5분할되어 있으니 그쪽 구조를 따르면 된다.
3. **컴포넌트에 `vw`-only clamp 가 남아 있다.** §3 의 규칙을 어긴 자리들이다.
   예: `Header.astro` `clamp(2.25rem, 11vw, 3.5rem)`,
   `studio.astro` `clamp(1.25rem, 2.2vw, 1.875rem)` / `clamp(1.0625rem, 1.7vw, 1.4375rem)`,
   `WorkList.astro` `clamp(1rem, 1.5vw, 1.5rem)` / `clamp(1rem, 1.6vw, 1.25rem)`.
   **이걸 고치면 화면이 바뀐다.** 그래서 이번 토큰화(렌더 결과 불변이 조건)에서는
   손대지 않았다. 고칠 때는 폭별 before/after 를 따로 확인해야 한다.
4. **`--memory-fs-h3` / `--memory-fs-h4` 가 정의만 되고 안 쓰인다.** 지웠던 컬러 토큰과
   달리 이건 남겨 뒀다. 타이포는 사다리라서 중간 칸이 비어 있는 편이 안 쓰이는 칸보다
   나쁘다. 컴포넌트의 `vw`-only clamp 를 눈금에 붙일 때(3번) 흡수될 자리다.
5. **`--nectar-icon-gap` 은 정의 없이 `var(--nectar-icon-gap, 10px)` 로만 쓰인다.**
   Salient 원본이 그렇다. 의도된 것이다.

---

## 부록 — 검증 방법

토큰/스타일을 건드린 뒤에는 **렌더 결과가 안 바뀌었는지**를 증거로 보여야 한다.

```
npx astro dev --port 4323
```

Playwright 로 `/`, `/studio/`, `/work/`, `/contact/`, `/MonkeyFlash/privacy/`, `/404`
를 1440 / 390 폭에서 `reducedMotion: 'reduce'`, `fullPage`, `deviceScaleFactor: 1`
로 캡처해 변경 전후를 픽셀 비교한다.

동영상·캔버스가 있는 페이지는 캡처마다 프레임이 달라 차이가 난다. 그럴 때는
**변경 없이 한 번 더 캡처한 대조군**을 만들어, 같은 규모로 흔들리면 캡처 노이즈로
판정한다. 이 사이트는 현재 미디어가 없어 12장이 결정적으로 찍힌다
(2026-08-02 토큰화 전후 12장 전부 바이트 단위 동일).

도구는 `scripts/snapshot.js` + `scripts/snapshot-diff.py` 로 저장소에 들어 있다.
기준 이미지는 `docs/snapshots/baseline/`. 쓰는 법은 `docs/snapshots/README.md`.
