import { once, prefersReducedMotion, type Cleanup } from './policy';

/**
 * Page-header hero — Salient `data-text-effect="rotate_in"` with
 * `data-animate-in-effect="zoom-out"`, reference body state
 * `data-ajax-transitions="false"` and the legacy loading screen off, so the
 * source's optional 800ms loading offset is not applied.
 *
 * Timeline (06 §4):
 *   0ms                    ink canvas visible
 *   0 – 2500ms             media plane scale 1.2 → 1
 *   n × 370ms              word n begins, each running 400ms easeOutQuad
 *   wordCount × 370ms      support begins, running 650ms
 */

const WORD_STAGGER = 370;
const SUPPORT_DURATION = 650;

export function initHero(root: HTMLElement): Cleanup {
  return once(root, 'Hero', (hero) => {
    if (prefersReducedMotion()) {
      hero.dataset.heroState = 'complete';
      return;
    }

    const words = Array.from(
      hero.querySelectorAll<HTMLElement>('.hero-word > span'),
    );
    const supports = Array.from(
      hero.querySelectorAll<HTMLElement>('.hero-support'),
    );

    words.forEach((word, index) => {
      word.style.transitionDelay = `${index * WORD_STAGGER}ms`;
    });

    // Support content waits out the full word sequence, exactly as the source
    // computes it from the group count rather than from a fixed offset.
    const supportStart = words.length * WORD_STAGGER;
    supports.forEach((el, index) => {
      el.style.transitionDelay = `${supportStart + index * 90}ms`;
    });

    hero.dataset.heroState = 'primed';

    let raf = 0;
    let done = 0;

    raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame(() => {
        hero.dataset.heroState = 'entering';
      });
    });

    const total =
      Math.max(supportStart + SUPPORT_DURATION, 2500) + 100;
    done = window.setTimeout(() => {
      hero.dataset.heroState = 'complete';
      words.forEach((w) => {
        w.style.transitionDelay = '';
      });
      supports.forEach((s) => {
        s.style.transitionDelay = '';
      });
    }, total);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(done);
    };
  });
}
