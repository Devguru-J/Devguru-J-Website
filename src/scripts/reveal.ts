/**
 * Masked heading reveal and section entrance.
 *
 * Parity contract (05-salient-component-map.md §4):
 *   mask / transform / opacity only, easing cubic-bezier(.16,1,.3,1),
 *   hero lines 850–1100ms with 90ms stagger, section content 700–900ms,
 *   reduced motion shows everything immediately.
 */

const EASE = 'cubic-bezier(.16,1,.3,1)';
const reduce = matchMedia('(prefers-reduced-motion: reduce)');

export function initReveal() {
  if (reduce.matches) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        play(entry.target as HTMLElement);
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.15 },
  );

  document.querySelectorAll<HTMLElement>('.reveal-lines, [data-reveal]').forEach((el) => {
    observer.observe(el);
  });
}

function play(el: HTMLElement) {
  if (el.classList.contains('reveal-lines')) {
    const hero = el.dataset.reveal === 'hero';
    const lines = el.querySelectorAll<HTMLElement>('.line > span');
    lines.forEach((line, i) => {
      line.animate(
        { transform: ['translateY(105%)', 'translateY(0)'] },
        {
          duration: hero ? 980 : 820,
          delay: i * 90,
          easing: EASE,
          fill: 'both',
        },
      );
    });
    return;
  }

  el.animate(
    { opacity: [0, 1], transform: ['translateY(22px)', 'translateY(0)'] },
    { duration: 780, delay: Number(el.dataset.revealDelay ?? 0), easing: EASE, fill: 'both' },
  );
}
