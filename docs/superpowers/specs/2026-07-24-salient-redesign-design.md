# 기억(bymemory.dev) 디자인 v3 — Salient(Signal 데모) 전면 교체 설계

날짜: 2026-07-24
상태: 사용자 승인 (대화에서 방식 A + 하위 페이지 전부 유지로 확정)

## 목표

현재 라이브 사이트(v2, SIGNAL 재현 템플릿)를 `salient_dirty_rat_complete_edition`
(구매한 Salient 테마 Signal 데모의 원본 그대로 Astro 포팅본) 디자인으로 전면 교체하고,
기존 기억/Memory 콘텐츠(KO/EN)를 적용해 bymemory.dev 에 배포한다.

## 구현 방식 (확정: 방식 A)

원본 마크업 유지 + 콘텐츠 치환.

- 포팅본의 raw HTML(`src/raw/*.html`)을 언어별(KO/EN)로 복제한다.
- 텍스트 노드, 이미지 경로, 링크, 메타 태그만 치환하고 마크업 구조는 건드리지 않는다.
  Salient의 CSS/JS(js-composer 클래스, OCM 메뉴, 슬라이더, 앵커 애니메이션)가
  기계 생성 마크업에 강결합돼 있으므로 구조 변경 금지.
- 테마 에셋(`public/wp-content`, `public/wp-includes`)은 그대로 복사.

기각한 대안: (B) Astro 컴포넌트화 — 테마 JS 파손 위험·작업량 과대,
(C) 빌드 스크립트 치환 — 치환 지점이 적어 오버엔지니어링.

## 페이지 구조

| 경로 | 내용 |
| --- | --- |
| `/` | KO 메인 (Salient 메인 디자인) |
| `/en/` | EN 메인 |
| `/work/`, `/en/work/` | 기억 작업물 3개 목록으로 재구성 |
| `/portfolio/monkey-flash/` (+ EN 미러) | Monkey Flash 상세 |
| `/portfolio/kbinc/` (+ EN 미러) | 케이비(주) 상세 |
| `/portfolio/next-product/` (+ EN 미러) | 다음 제품(준비 중) 상세 |
| `/MonkeyFlash/privacy`, `/MonkeyFlash/support` | 기존 legacy 레이아웃 체인 그대로 유지 (App Store 등록용) |

- 데모 포트폴리오 상세 5개(balanced, crystal-vibes, framework, into-the-heat, radiant)
  중 기억 작업물에 잘 맞는 레이아웃 3개를 골라 슬러그·콘텐츠를 재작성하고,
  남는 2개는 배포에서 제외한다.
- EN 미러는 `/en/work/`, `/en/portfolio/<slug>/` 로 동일 구조.
- `public/_redirects` 와 `functions/index.js`(geo 언어 라우팅, lang 쿠키 우선)는 그대로 유지.

## 콘텐츠 매핑 (출처: 기존 `src/i18n.ts`)

- 히어로: "WE CREATE THE HYPE" → KO "필요한 것을 만듭니다" / EN "We build what's needed"
  (+ 태그라인, 메타 행: 대한민국 기반 · 데스크톱/웹/클라우드)
- 서비스 티커 6종: 제품 방향 설정 / 인터페이스 설계 / macOS 애플리케이션 /
  웹 인터페이스 / 클라우드·플랫폼 / 협업과 운영 (EN 대응 동일)
- 작업물: Monkey Flash(App Store 링크), 케이비(주)(kbinc.kr), 다음 제품 — 준비 중
- 일하는 원칙 4개: 데모의 인용/슬라이더 자리에 배치
- 연락처: devguru.j610@gmail.com, GitHub(Devguru-J), App Store. 실명·위치 비공개 원칙 유지
- 로고/워드마크: SIGNAL 로고 이미지 → 기억(KO)/Memory(EN) 워드마크로 교체
- 거대 푸터 워드마크: "기억" / "Memory"
- 헤더에 KO↔EN 언어 전환 링크 추가 (기존 lang 쿠키 동작과 연동)

## 이미지 방침

- 기억 실제 에셋이 맞는 자리: `work-monkeyflash.jpg`, `work-kbinc.jpg`,
  `menu-popover.png`, `settings-visual.png` 로 교체
- 나머지 데모 사진: 테마 원본 유지 (소유자가 이미지 공급할 때까지 목업 유지 — 기존 방침)

## 한글 폰트

테마 폰트는 한글 미지원. Pretendard(woff2)를 `public` 에 추가하고
override CSS를 raw head에 주입해 font-family 폴백으로 사용.

## 메타 / SEO

- 페이지별 `<title>`/description: 기존 i18n 값 기반
- OG: `og-cover-ko.jpg` / `og-cover-en.jpg`, favicon·apple-touch-icon 유지
- canonical + hreflang(ko/en) 유지, 원본 데모 도메인 흔적(themenectar 등) 제거

## 마이그레이션 / 정리

- 루트 `src/`의 v2 파일(components, layouts/Layout.astro, scripts, styles, i18n.ts,
  pages/index.astro, pages/en/) 삭제 — 단 `Base.astro`/`LegalShell.astro` 등
  MonkeyFlash 법적 페이지가 의존하는 체인은 유지
- `salient_dirty_rat_complete_edition/` 의 src/raw, pages, public/wp-* 를 루트로 통합
- 불필요 의존성(tailwind, gsap, fontsource, lenis 등 v2 전용) 정리 — 법적 페이지가
  쓰는 것은 유지
- `salient_dirty_rat_complete_edition/`, `memory_site_export/` 폴더는 저장소에
  커밋하지 않는다(참고용 로컬 폴더)

## 검증 / 배포

1. 현재 v2를 태그 `design-v2-final` 로 백업
2. `npm run build` 성공 확인
3. 로컬 preview + 브라우저(playwright) 스크린샷으로 KO/EN 메인, work, 포트폴리오 3종,
   MonkeyFlash 법적 페이지, 언어 전환, 리다이렉트 확인
4. main 커밋·푸시 → Cloudflare Pages 자동 배포 → bymemory.dev 확인
