#!/usr/bin/env python3
"""스냅샷 두 벌(또는 세 벌)을 픽셀 단위로 비교한다.

  python3 scripts/snapshot-diff.py baseline current
  python3 scripts/snapshot-diff.py baseline current control

세 번째 인자(대조군)를 주면 판정이 훨씬 정확해진다. 동영상·캔버스가 있는 페이지는
코드를 안 바꿔도 캡처마다 다르기 때문에, "수정 없이 한 번 더 찍은" 대조군과
같은 규모로 흔들리는지 봐야 진짜 회귀와 구별된다.

의존성: Pillow (`pip3 install pillow`).
"""
import sys
import pathlib

try:
    from PIL import Image, ImageChops
except ImportError:
    sys.exit("Pillow 가 필요하다:  pip3 install pillow")

ROOT = pathlib.Path(__file__).resolve().parent.parent / "docs" / "snapshots"


def compare(p1, p2):
    """(다른 픽셀 수, 최대 채널차) 또는 크기가 다르면 None."""
    a = Image.open(p1).convert("RGB")
    b = Image.open(p2).convert("RGB")
    if a.size != b.size:
        return None, (a.size, b.size)
    d = ImageChops.difference(a, b)
    h = d.histogram()
    # 채널별 히스토그램 3개. 0번 칸(차이 0)이 가장 적은 채널 기준으로 다른 픽셀 수를 잡는다.
    nonzero = a.size[0] * a.size[1] - min(h[0], h[256], h[512])
    worst = max([i % 256 for i, v in enumerate(h) if v and i % 256 != 0] or [0])
    return (nonzero, worst), None


def main():
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    names = sys.argv[1:4]
    dirs = [ROOT / n for n in names]
    for d in dirs:
        if not d.is_dir():
            sys.exit(f"폴더가 없다: {d}")

    base, new = dirs[0], dirs[1]
    control = dirs[2] if len(dirs) > 2 else None

    files = sorted(p.name for p in base.glob("*.png"))
    if not files:
        sys.exit(f"{base} 에 png 가 없다")

    width = max(len(f) for f in files)
    header = f"{'파일':<{width}} {names[0][:6]}→{names[1][:7]:>10}"
    if control:
        header += f" {names[1][:6]}→{names[2][:7]:>10}"
    print(header + "  판정")

    regressions = 0
    for f in files:
        if not (new / f).exists():
            print(f"{f:<{width}}  {names[1]} 에 없음")
            regressions += 1
            continue
        r1, size_err = compare(base / f, new / f)
        if size_err:
            print(f"{f:<{width}}  크기 다름 {size_err[0]} vs {size_err[1]}  ⚠ 레이아웃 변화")
            regressions += 1
            continue
        d1, m1 = r1
        d2 = m2 = None
        if control and (control / f).exists():
            r2, _ = compare(new / f, control / f)
            if r2:
                d2, m2 = r2

        if d1 == 0:
            verdict = "변화 없음"
        elif d2 is None:
            verdict = f"차이 {d1}px (최대 채널차 {m1}) — 대조군 없이는 판정 불가"
        elif d2 >= d1 * 0.3:
            verdict = f"캡처 비결정성 (대조군도 {d2}px 흔들림)"
        elif d1 <= 4 and m1 <= 2:
            verdict = f"안티에일리어싱 잔차 ({d1}px, 최대 {m1}단계)"
        else:
            verdict = f"⚠ 재현되는 실제 차이 ({d1}px, 최대 채널차 {m1})"
            regressions += 1

        cols = f"{f:<{width}} {d1:>17}"
        if control:
            cols += f" {('-' if d2 is None else d2):>17}"
        print(cols + "  " + verdict)

    print()
    if regressions:
        print(f"확인이 필요한 항목 {regressions}건.")
    else:
        print("렌더 결과 불변으로 판정.")
    return 1 if regressions else 0


if __name__ == "__main__":
    sys.exit(main())
