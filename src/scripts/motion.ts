/**
 * Scroll reveal — the only motion script on the site (§9).
 *
 * No smooth-scroll hijacking, no parallax, no continuous RAF loop, no WebGL.
 * Anchor scrolling is left to the browser.
 *
 * `Base.astro` arms the hidden state before first paint and holds a dead-man's
 * switch. Setting `__revealReady` here is what cancels it, so this module can
 * only ever *reveal* content — never be the reason it stays hidden.
 */

declare global {
  interface Window {
    __revealReady?: boolean;
  }
}

const root = document.documentElement;
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

/** Disarm: removing the class can never lose a specificity contest. */
function release() {
  root.classList.remove('reveal-armed');
}

if (reduced.matches || !('IntersectionObserver' in window)) {
  release();
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        // 60–90ms stagger between siblings within one group (§9)
        const delay = Number(el.dataset.revealDelay ?? 0);
        el.style.transitionDelay = `${delay}ms`;
        el.classList.add('is-revealed');
        observer.unobserve(el);
      }
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.01 }
  );

  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => observer.observe(el));

  // The observer is live — cancel the fallback in Base.astro.
  window.__revealReady = true;

  // Turning reduced-motion on mid-session must show everything immediately.
  reduced.addEventListener('change', (e) => {
    if (e.matches) release();
  });
}

export {};
