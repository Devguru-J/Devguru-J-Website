# 기억 (Memory) — 시각 스냅샷

스타일을 건드린 뒤 **화면이 안 바뀌었다는 것을 증거로 보이기 위한** 기준 이미지다.
리팩터·토큰 정리처럼 "렌더 결과 불변" 이 성공 조건인 작업에서 쓴다.

```
docs/snapshots/
  baseline/   ← 기준. 의도적으로 디자인을 바꿨을 때만 갱신한다
  current/    ← 방금 캡처한 것 (git 에 넣지 않는다)
  control/    ← 대조군 (git 에 넣지 않는다) — 아래 참조
```

**baseline 기준 시점: 2026-08-02, 토큰화·접두사 정리 직후** (기억 `--memory-*` 통일,
죽은 컬러 토큰 7개 제거). 이 시점에서 이전 상태와 12장 전부 바이트 단위 동일했다.

---

## 쓰는 법

### 1. dev 서버를 띄운다

```
npm run dev
```

포트는 신경 쓰지 않아도 된다. 캡처 스크립트가 4321~4335 를 훑어서 제목에 '기억'이
있는 서버를 찾는다.

### 2. 캡처한다

`scripts/snapshot.js` 를 Playwright MCP 의 `browser_run_code_unsafe` 에 **`filename`**
으로 넘긴다 (`code` 가 아니다). 절대 경로여야 한다.

파일 첫머리의 `LABEL` 로 어디에 쌓을지 정한다 — `current` / `control` / `baseline`.

> MCP 는 저장소 밖 파일을 로드하지 못한다. 스크립트가 `scripts/` 안에 있는 이유다.
> 그리고 이 파일은 모듈이 아니라 `async (page) => {...}` 함수 하나여야 한다.

### 3. 비교한다

```
python3 scripts/snapshot-diff.py baseline current
```

---

## ⚠ 대조군 없이는 판정하지 마라

동영상·캔버스·랜덤이 있는 페이지는 **코드를 안 바꿔도** 캡처마다 다르다.
그래서 두 벌만으로는 "내 수정 때문인지" 를 가릴 수 없다.

세 벌을 찍어라.

1. `baseline` — 기준 (이미 있다)
2. 수정 → `current`
3. **수정 없이 한 번 더** → `control`

```
python3 scripts/snapshot-diff.py baseline current control
```

`baseline→current` 와 `current→control` 의 다른 픽셀 수를 나란히 놓고 본다.

| 상황 | 판정 |
|---|---|
| 둘 다 0 | 변화 없음 |
| 대조군도 비슷한 규모로 흔들림 | 캡처 노이즈 (영상 프레임 등) |
| 대조군은 0인데 차이가 남 | **실제 회귀** |
| 몇 픽셀, 채널차 1~2단계 | 안티에일리어싱 잔차 — 무시 |

이 사이트는 현재 동영상이 없어서 12장 모두 결정적으로 찍힌다. 대조군 없이도 대체로
맞지만, 미디어를 추가하면 바로 필요해진다.

---

## 캡처 조건 (바꾸면 과거 스냅샷과 비교 불가)

- `deviceScaleFactor: 1` — 레티나 2배로 찍으면 기준과 크기가 안 맞는다
- `reducedMotion: 'reduce'` + `animations: 'disabled'` — 등장 애니메이션을 완료 상태로 고정
- `fullPage: true`
- 폭 1440 / 390
- 캡처 전 페이지를 끝까지 스크롤했다가 맨 위로 — 스크롤 리빌을 전부 발화시키려고

## 페이지 목록

`/` · `/studio/` · `/work/` · `/contact/` · `/MonkeyFlash/privacy/` · `/404`

새 페이지를 만들면 `scripts/snapshot.js` 의 `PATHS` 에 넣고 baseline 을 다시 찍는다.

---

## baseline 을 언제 갱신하나

**디자인을 의도적으로 바꿨을 때만.** 갱신할 때는 커밋 메시지에 무엇을 왜 바꿨는지
남긴다. 리팩터하다 화면이 바뀌었는데 baseline 을 덮어쓰는 것은 증거를 지우는 것이다.

관련: `docs/DESIGN.md` (부록 — 검증 방법)
