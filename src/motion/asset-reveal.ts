import { once, prefersReducedMotion, type Cleanup } from './policy';

/**
 * Salient asset reveal — `ro-reveal-from-bottom` (06 §7).
 *
 * Three transform layers are preserved from the source structure:
 *   outer wrapper   translate3d(0, 250px, 0) → identity   2300ms
 *   inner wrapper   rotate(25deg) → 0, opacity 0 → 1      2300ms / 250ms
 *   media           rotate(-25deg) → 0                    2300ms
 *
 * The selected common image wrapper has no initial opacity on the outer or the
 * media layer, so the only visible fade is the inner wrapper's. Triggers once.
 */

export function initAssetReveal(root: ParentNode = document): Cleanup {
  const targets = Array.from(
    root.querySelectorAll<HTMLElement>(
      '.img-with-aniamtion-wrap[data-animation="ro-reveal-from-bottom"]',
    ),
  );
  if (!targets.length) return () => {};

  if (prefersReducedMotion()) {
    targets.forEach((el) => {
      el.dataset.reveal = 'complete';
    });
    return () => {};
  }

  const cleanups: Cleanup[] = [];

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        el.dataset.reveal = 'entering';
        observer.unobserve(el);
      }
    },
    { threshold: 0.15 },
  );

  targets.forEach((el) => {
    cleanups.push(
      once(el, 'AssetReveal', (node) => {
        // The hidden state is applied only now, so a failed enhancement can
        // never leave the media invisible.
        node.dataset.reveal = 'primed';
        observer.observe(node);
        return () => observer.unobserve(node);
      }),
    );
  });

  return () => {
    cleanups.forEach((fn) => fn());
    observer.disconnect();
  };
}
