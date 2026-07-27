import { once, prefersReducedMotion, type Cleanup } from './policy';

/**
 * Sticky media sections — Salient `nectar_sticky_media_sections`, standard
 * crossfade mode only (06 §6).
 *
 *   activation   viewport width ≥ 1000px
 *   sticky top   (viewportHeight − renderedMediaHeight) / 2 + headerSpace / 2,
 *                written to --nectar-sticky-media-sections-vert-y
 *   observer     rootMargin -40% 0 -40% 0, i.e. the middle 20% of the viewport
 *   commit       the candidate step's class state commits 100ms after it is
 *                identified; a faster scroll cancels the pending timer and
 *                only the last candidate is applied
 *   crossfade    incoming 200ms ease at the commit, outgoing 200ms ease after
 *                an extra 100ms delay (declared in motion.css)
 *
 * Below the breakpoint the sticky positioning, the crossfade, the hidden
 * duplicates and the scroll padding are all removed; each media simply sits in
 * front of the text it belongs to.
 */

const COMMIT_DELAY = 100;
const BREAKPOINT = '(min-width: 1000px)';

export function initStickyStory(root: HTMLElement): Cleanup {
  return once(root, 'StickyStory', (section) => {
    const mediaWrap = section.querySelector<HTMLElement>('[data-sticky-media]');
    const items = Array.from(
      section.querySelectorAll<HTMLElement>('[data-sticky-item]'),
    );
    const steps = Array.from(
      section.querySelectorAll<HTMLElement>('[data-sticky-step]'),
    );
    if (!mediaWrap || !items.length || !steps.length) return;

    const desktop = window.matchMedia(BREAKPOINT);
    let observer: IntersectionObserver | null = null;
    let pending = 0;
    let activeIndex = 0;

    const setActive = (index: number) => {
      if (index === activeIndex) return;
      activeIndex = index;
      items.forEach((item, i) => {
        item.dataset.active = String(i === index);
      });
      steps.forEach((step, i) => {
        step.dataset.active = String(i === index);
      });
    };

    const measure = () => {
      const headerSpace = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--header-h'),
      ) || 0;
      const mediaHeight = mediaWrap.getBoundingClientRect().height;
      const y = (window.innerHeight - mediaHeight) / 2 + headerSpace / 2;
      section.style.setProperty(
        '--nectar-sticky-media-sections-vert-y',
        `${Math.max(headerSpace, Math.round(y))}px`,
      );
    };

    const connect = () => {
      if (observer) return;
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const index = steps.indexOf(entry.target as HTMLElement);
            if (index < 0) continue;
            window.clearTimeout(pending);
            pending = window.setTimeout(() => setActive(index), COMMIT_DELAY);
          }
        },
        { rootMargin: '-40% 0px -40% 0px', threshold: 0 },
      );
      steps.forEach((step) => observer!.observe(step));
    };

    const disconnect = () => {
      window.clearTimeout(pending);
      observer?.disconnect();
      observer = null;
    };

    const sync = () => {
      if (desktop.matches && !prefersReducedMotion()) {
        section.dataset.stickyMode = 'desktop';
        measure();
        connect();
      } else {
        section.dataset.stickyMode = 'flow';
        disconnect();
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      if (desktop.matches) measure();
    });
    resizeObserver.observe(mediaWrap);

    desktop.addEventListener('change', sync);
    window.addEventListener('resize', measure, { passive: true });

    setActive(0);
    items[0].dataset.active = 'true';
    steps[0].dataset.active = 'true';
    sync();

    return () => {
      disconnect();
      resizeObserver.disconnect();
      desktop.removeEventListener('change', sync);
      window.removeEventListener('resize', measure);
      section.removeAttribute('data-sticky-mode');
    };
  });
}
