/**
 * Sticky capability story (Salient "Tether" parity).
 *
 * Contract (05-salient-component-map.md §4):
 *   media column sticks below the header · a row becomes active when its
 *   center enters the middle 35% of the viewport · media crossfades with
 *   opacity and scale only, 520–700ms · active text differs by contrast and
 *   weight, never by an accent color · tablet and mobile render each media
 *   item inline before its text, so this module simply does nothing there.
 */

const EASE = 'cubic-bezier(.16,1,.3,1)';

export function initStickyCapabilities() {
  const section = document.querySelector<HTMLElement>('[data-capabilities]');
  if (!section) return;
  if (!matchMedia('(min-width: 1000px)').matches) return;

  const rows = [...section.querySelectorAll<HTMLElement>('[data-capability-row]')];
  const media = [...section.querySelectorAll<HTMLElement>('[data-capability-media]')];
  if (rows.length !== media.length || !rows.length) return;

  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  let current = -1;

  const activate = (index: number) => {
    if (index === current) return;
    current = index;

    rows.forEach((row, i) => row.classList.toggle('is-active', i === index));
    media.forEach((el, i) => {
      const on = i === index;
      el.classList.toggle('is-active', on);
      if (reduce.matches) return;
      el.animate(
        { opacity: on ? [Number(getComputedStyle(el).opacity), 1] : [Number(getComputedStyle(el).opacity), 0],
          scale: on ? [1.03, 1] : [1, 1.02] },
        { duration: 600, easing: EASE, fill: 'both' },
      );
    });
  };

  // middle 35% band of the viewport
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        activate(rows.indexOf(entry.target as HTMLElement));
      }
    },
    { rootMargin: '-32.5% 0px -32.5% 0px', threshold: 0 },
  );

  rows.forEach((row) => observer.observe(row));
  activate(0);
}
