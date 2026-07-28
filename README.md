# 기억 — Memory

독립 소프트웨어 스튜디오 **기억**의 브랜드 사이트.
Astro 정적 사이트, Cloudflare Pages 배포용.

---

## 실행

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/ 생성
npm run preview  # 빌드 결과 미리보기
```

Node 18 이상이 필요합니다.

---

## Cloudflare Pages 배포

기존 사이트를 대체하는 경우, Pages 프로젝트 설정에서 빌드 설정만 아래로 맞추면 됩니다.

| 항목 | 값 |
| --- | --- |
| Framework preset | `Astro` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | 비워둠 (저장소 루트가 곧 이 프로젝트) |
| Node version | `NODE_VERSION = 20` (환경 변수) |

`public/_headers` 에 캐시·보안 헤더, `public/_redirects` 에 이전 주소 301 이
들어 있고 Pages가 자동으로 적용합니다. main 에 push 하면 자동 배포됩니다.

도메인은 **bymemory.dev** 이고 `astro.config.mjs` · `src/data/site.ts` ·
`public/robots.txt` 세 곳에 이미 반영돼 있습니다.

### 지켜야 하는 것

- `/MonkeyFlash/privacy/` · `/MonkeyFlash/support/` 는 App Store Connect 에
  등록된 주소입니다. 주소도 본문도 바꾸지 않습니다. `/privacy` `/support` 짧은
  주소도 `_redirects` 로 살아 있어야 합니다. 자세한 내용은 `docs/HANDOFF.md` §12.
- 한국어 전용 사이트입니다. 예전 `/en/` 경로는 홈으로 301 됩니다.
- 소재지는 공개하지 않습니다. 연락처는 `devguru.j610@gmail.com` 하나뿐입니다.
- 공개 작업물은 Monkey Flash · KB Inc. 2건입니다. 없는 작업을 만들어 넣지 않습니다.

---

## 작업물 추가 (3~5개 기준)

`src/data/works.ts` 에 **03 · 04 · 05 슬롯이 `draft: true` 상태로 준비**돼 있습니다.

1. 슬롯의 내용을 채운다 (각 필드 위에 무엇을 쓰면 되는지 주석이 있습니다)
2. `draft: true,` 줄을 지운다
3. 홈의 작업 섹션 · `/work/` · `/work/{slug}/` 가 자동으로 생성됩니다

`draft: true` 인 동안에는 사이트 어디에도 나타나지 않습니다.
자리표시자가 실수로 배포되는 것을 막기 위한 장치입니다.
페이지는 전부 `publishedWorks`(= draft 제외)를 참조합니다.

- 이미지는 `public/work/` 에 넣고 `cover: '/work/파일명.jpg'` 로 연결합니다.
  권장 비율 **4:3**, 가로 1600px 이상 — 커서 추종 이미지가 4:3 으로 잘립니다.
- `cover` 가 없으면 영문 이름이 들어간 검정 플레이트가 대신 뜹니다. 비워둬도 어색하지 않습니다.
- 6번째 이상이 필요하면 슬롯 하나를 복사해 `no` 만 이어서 적으세요.
- 현재 공개된 작업은 컨셉 문서에 실제로 기술된 **Monkey Flash**, **KB Inc. 웹사이트** 2건입니다.

### 작업 목록 레이아웃

Salient 의 `nectar_post_grid[data-style="vertical_list"]` +
`vertical_list_hover_effect = featured_image_follow` 를 이식한 것입니다.
번호 원 + 큰 제목 + 메타 + 우측 링크가 헤어라인으로 구분된 세로 리스트이고,
행에 커서를 올리면 그 작업의 이미지가 커서를 따라 떠다닙니다.
**3~5개일 때 가장 좋게 보이도록 설계된 레이아웃**입니다.

---

## 구조

```
src/
├─ data/
│  ├─ site.ts          브랜드 상수 (이름·메일·도메인)
│  └─ works.ts         작업 목록 — 여기만 고치면 페이지가 따라옵니다
├─ layouts/Base.astro  head / 메타 / 폰트 / 모션 부트스트랩
├─ components/
│  ├─ Header.astro     고정 헤더 + 모바일 패널
│  ├─ Footer.astro     연락 CTA (검정)
│  ├─ SplitHeading.astro  Salient split_line_heading
│  ├─ Reveal.astro        Salient 컬럼 애니메이션 래퍼
│  ├─ Cta.astro           Salient nectar_cta (화살표 / 밑줄)
│  └─ WorkList.astro      작업 목록 — vertical_list + 커서 추종 이미지
├─ pages/
│  ├─ index.astro      홈 (히어로 → 이름 → 작업 → 방식 → 태도)
│  ├─ work/index.astro 작업 목록
│  ├─ work/[slug].astro 작업 상세
│  ├─ studio.astro     스튜디오
│  ├─ contact.astro    연락
│  └─ 404.astro
├─ styles/global.css   디자인 토큰 + Salient 모션 프리미티브
└─ scripts/motion.js   Salient 모션 엔진 포팅 (의존성 없음)
```

---

## 모션 — Salient 원본 대조표

`src/styles/global.css` §5 와 `src/scripts/motion.js` 는 Salient 테마 원본에서
duration / easing / transform 값을 그대로 가져온 것입니다.

| 동작 | Salient 원본 | 사양 |
| --- | --- | --- |
| 문장 라인 리빌 | `split_line_heading` | `translateY(1.3em) → 0`, `1.2s cubic-bezier(0.25,1,0.5,1)`, stagger `clamp(500/n, 15, 50)ms` |
| 스크롤 연동 문장 | `NectarSplitHeadingTimeline` | 단어 opacity `0.2 → 1`, word delay 150/250ms, speed·topCushion 계산식 동일 |
| 컬럼·이미지 등장 | `colAndImgAnimations()` | `650ms` / `easeOutCubic`, waypoint `88%`, `translateY(75px)` |
| 미디어 등장 | `zoom-out-reveal` | frame `scale(0.7)→1`, inner `scale(1.75)→1`, `1.3s cubic-bezier(0.12,0.75,0.4,1)` |
| 배경 반전 | `nectar-color-change-bg` | IntersectionObserver + rAF 재스캔, 가시성 임계 `0.4`, 전환 `0.8s` |
| 화살표 CTA | `nectar_cta[data-style="arrow-animation"]` | 키프레임 6종 전부 이식, `0.45s cubic-bezier(0.23,0.46,0.4,1)` |
| 링크 밑줄 | `.nectar-underline` | `background-size 0% → 100%`, `0.55s cubic-bezier(.2,.75,.5,1)` |
| 스크롤 인디케이터 | `nudgeMouse` / `trackBallSlide` | `2.4s` 무한 반복 |
| 작업 목록 | `vertical_list` | 헤어라인 `scaleX(0)→1` `1s ease`, 번호 원 40px |
| 커서 추종 이미지 | `featured_image_follow` + `NectarIconMouseFollow` | 20vw / 4:3 `position:fixed`, lerp `0.1`, X를 화면 우측 절반으로 매핑, `clip-path inset(20%)→0%` `0.6s` |
| 제목 쓸림 | `nectar_reveal_fade_in` | mask 그라데이션 `0.85s cubic-bezier(0.4,0,0.3,1)` |

`prefers-reduced-motion: reduce` 에서는 모든 등장 연출이 즉시 완료 상태로 렌더링됩니다.

---

## 톤앤매너

- 색: 검정 `#000` / 흰색 `#fff` 두 가지. 중간 톤은 전부 현재 글자색의 투명도로 만듭니다.
- 폰트: Pretendard Variable (dynamic subset, jsDelivr CDN).
- 섹션마다 `data-color-change-section-bg-color` 로 배경이 반전됩니다.
  새 섹션을 추가할 때 이 속성을 빠뜨리면 이전 섹션 색을 그대로 유지합니다.
