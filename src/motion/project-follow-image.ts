import {
  desktopPointerMotionAllowed,
  once,
  type Cleanup,
} from './policy';

/**
 * Project index pointer-follow preview — Salient post-grid
 * `mouse_follow_image` (06 §5).
 *
 *   geometry     250 × 250px, fixed, aligned to pointer + 10px / +10px
 *                with no viewport edge clamp, matching the source
 *   entrance     outer scale .3 → 1, inner scale 1.8 → 1, opacity 0 → 1, 800ms
 *   exit         outer 1 → .3, inner 1 → 1.8, opacity 1 → 0, 300ms ease
 *   follow       current += (target - current) × 0.18
 *   row switch   outgoing image fades over 200ms after a 170ms delay while the
 *                incoming image fades in over 200ms, so there is no blank frame
 *
 * The wrapper is never removed from the DOM; it is reused on the next entry.
 * Every row already carries its title, summary and link without hover, and the
 * inline row media is what tablet and touch see instead.
 */

const LERP = 0.18;
const POINTER_OFFSET = 10;
const SWAP_DELAY = 170;

export function initProjectFollowImage(root: HTMLElement): Cleanup {
  return once(root, 'FollowImage', (index) => {
    if (!desktopPointerMotionAllowed()) return;

    const preview = index.querySelector<HTMLElement>('[data-follow-preview]');
    if (!preview) return;

    const images = new Map<string, HTMLImageElement>();
    preview
      .querySelectorAll<HTMLImageElement>('[data-follow-slug]')
      .forEach((img) => images.set(img.dataset.followSlug!, img));

    const rows = Array.from(
      index.querySelectorAll<HTMLElement>('[data-project-row]'),
    );
    if (!rows.length) return;

    let target = { x: 0, y: 0 };
    let current = { x: 0, y: 0 };
    let raf = 0;
    let running = false;
    let inView = true;
    let activeSlug: string | null = null;
    let swapTimer = 0;

    const frame = () => {
      current.x += (target.x - current.x) * LERP;
      current.y += (target.y - current.y) * LERP;
      preview.style.translate = `${current.x}px ${current.y}px`;
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || !inView) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };

    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(raf);
    };

    const setActiveImage = (slug: string) => {
      if (activeSlug === slug) return;
      const incoming = images.get(slug);
      if (!incoming) return;
      const outgoing = activeSlug ? images.get(activeSlug) : undefined;
      activeSlug = slug;

      incoming.dataset.active = 'true';
      if (outgoing && outgoing !== incoming) {
        window.clearTimeout(swapTimer);
        swapTimer = window.setTimeout(() => {
          outgoing.dataset.active = 'false';
        }, SWAP_DELAY);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      target = {
        x: event.clientX + POINTER_OFFSET,
        y: event.clientY + POINTER_OFFSET,
      };
    };

    const onRowEnter = (event: PointerEvent) => {
      const row = event.currentTarget as HTMLElement;
      const slug = row.dataset.projectRow!;
      // Jump straight to the pointer on first entry so the reveal does not
      // sweep in from the previous position.
      if (preview.dataset.previewState !== 'active') {
        current = {
          x: event.clientX + POINTER_OFFSET,
          y: event.clientY + POINTER_OFFSET,
        };
        preview.style.translate = `${current.x}px ${current.y}px`;
      }
      target = {
        x: event.clientX + POINTER_OFFSET,
        y: event.clientY + POINTER_OFFSET,
      };
      setActiveImage(slug);
      preview.dataset.previewState = 'active';
      index.dataset.rowActive = slug;
      start();
    };

    const onRowLeave = () => {
      preview.dataset.previewState = 'hidden';
      delete index.dataset.rowActive;
      stop();
    };

    rows.forEach((row) => {
      row.addEventListener('pointerenter', onRowEnter);
      row.addEventListener('pointerleave', onRowLeave);
    });
    index.addEventListener('pointermove', onPointerMove);

    // The loop only runs while the index is on screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (!inView) {
          preview.dataset.previewState = 'hidden';
          stop();
        }
      },
      { threshold: 0 },
    );
    observer.observe(index);

    return () => {
      stop();
      window.clearTimeout(swapTimer);
      observer.disconnect();
      index.removeEventListener('pointermove', onPointerMove);
      rows.forEach((row) => {
        row.removeEventListener('pointerenter', onRowEnter);
        row.removeEventListener('pointerleave', onRowLeave);
      });
    };
  });
}
