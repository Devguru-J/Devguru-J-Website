# 백링크 메모 (허브)

bymemory.dev는 백링크 그래프의 허브다. 구조는 방사형 — 스튜디오 ↔ 만든 것들. 2026-08-23 작업.

## 나가는 링크 (works.ts의 `link` 필드)

| 작업 항목 | 외부 링크 |
|---|---|
| kb-inc | https://kbinc.kr |
| dl-auto-solution | https://dlas.co.kr |
| garimi | https://blinder.kr/ |

## 들어오는 링크 (각 사이트 푸터 크레딧)

| 사이트 | 위치 | 링크 대상 |
|---|---|---|
| kbinc.kr | `src/components/Footer.astro` | /work/kb-inc/ |
| dlas.co.kr | `src/raw/*-body.html` ×31 메인 푸터 | /work/dl-auto-solution/ |
| blinder.kr | `src/layouts/BaseLayout.astro` 푸터 | /work/garimi/ |
| dorimsa.com | `SiteFooter.astro` 법적 표기 줄 | / (홈 — 작업 페이지 없음) |

각 저장소의 `docs/backlinks.md`에 상세 기록이 있다.

## 원칙

- 허브 중심 방사형만. 제품 사이트끼리 서로 링크하는 풀메시는 만들지 않는다 (링크 스킴으로 보인다).
- 사이트당 푸터 크레딧 1곳. 앵커는 브랜드명("기억", "Memory"), 키워드 앵커 금지.
- 크레딧은 홈이 아니라 해당 작업 상세 페이지로 건다 (페이지 단위 연관성).
- 새 사이트/제품 추가 시: ① works.ts에 작업 항목 + `link` 필드 → ② 그 사이트 푸터에 크레딧 → 작업 상세 페이지로.
