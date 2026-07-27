/**
 * Pointer-follow work preview (Salient "Signal" parity).
 *
 * Contract (05-salient-component-map.md §4):
 *   fine pointer only · 4:3 · clamp(280px,27vw,420px) · ~24/28px offset with
 *   edge flip · enter opacity 0→1 scale .94→1 in 420–520ms · exit 260–340ms ·
 *   damped follow that never covers the cursor · row inversion is one state ·
 *   rAF runs only while the preview is active · touch and reduced motion get
 *   the inline image instead.
 */

const EASE = 'cubic-bezier(.16,1,.3,1)';
const OFFSET_X = 24;
const OFFSET_Y = 28;
const DAMPING = 0.16;

export function initPointerPreview() {
  const list = document.querySelector<HTMLElement>('[data-preview-list]');
  if (!list) return;

  const fine = matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1000px)');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  if (!fine.matches || reduce.matches) return;

  const rows = [...list.querySelectorAll<HTMLElement>('[data-preview]')];
  if (!rows.length) return;

  const layer = document.createElement('div');
  layer.className = 'pointer-preview';
  layer.setAttribute('aria-hidden', 'true');
  const img = document.createElement('img');
  img.decoding = 'async';
  layer.append(img);
  document.body.append(layer);

  let raf = 0;
  let visible = false;
  let targetX = 0;
  let targetY = 0;
  let x = 0;
  let y = 0;

  const place = () => {
    const w = layer.offsetWidth;
    const h = layer.offsetHeight;
    // flip inward near the viewport edges so the preview is never clipped
    const flipX = targetX + OFFSET_X + w > innerWidth - 16;
    const flipY = targetY + OFFSET_Y + h > innerHeight - 16;
    const destX = flipX ? targetX - OFFSET_X - w : targetX + OFFSET_X;
    const destY = flipY ? targetY - OFFSET_Y - h : targetY + OFFSET_Y;

    x += (destX - x) * DAMPING;
    y += (destY - y) * DAMPING;
    layer.style.translate = `${Math.round(x)}px ${Math.round(y)}px`;

    raf = visible ? requestAnimationFrame(place) : 0;
  };

  const show = (row: HTMLElement) => {
    const src = row.dataset.preview;
    if (!src) return;
    img.src = src;
    img.alt = '';
    list.classList.add('is-previewing');
    rows.forEach((r) => r.classList.toggle('is-active', r === row));

    if (!visible) {
      visible = true;
      // start where the pointer is, not where the last preview stopped
      x = targetX + OFFSET_X;
      y = targetY + OFFSET_Y;
      layer.style.translate = `${Math.round(x)}px ${Math.round(y)}px`;
      layer.animate(
        { opacity: [0, 1], scale: [0.94, 1] },
        { duration: 470, easing: EASE, fill: 'both' },
      );
      raf = requestAnimationFrame(place);
    }
  };

  const hide = () => {
    if (!visible) return;
    visible = false;
    cancelAnimationFrame(raf);
    raf = 0;
    list.classList.remove('is-previewing');
    rows.forEach((r) => r.classList.remove('is-active'));
    layer.animate({ opacity: [1, 0], scale: [1, 0.97] }, { duration: 300, easing: EASE, fill: 'both' });
  };

  list.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    targetX = e.clientX;
    targetY = e.clientY;
  });

  rows.forEach((row) => {
    row.addEventListener('pointerenter', (e) => {
      if ((e as PointerEvent).pointerType !== 'mouse') return;
      targetX = (e as PointerEvent).clientX;
      targetY = (e as PointerEvent).clientY;
      show(row);
    });
  });

  list.addEventListener('pointerleave', hide);
  addEventListener('blur', hide);
}
