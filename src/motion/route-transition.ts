import { isDesktop, prefersReducedMotion, type Cleanup } from './policy';

/**
 * Cross-document route wipe — Salient View Transition `gradient-wipe`
 * (06 §9).
 *
 * The animation itself is declared in motion.css: the old root stays in place
 * and the new root is revealed above it through a 270deg linear gradient mask
 * driven by --salient-view-transition-gradient-wipe-progress over 1200ms
 * cubic-bezier(.45,0,.35,1).
 *
 * This module only decides when the document opts in. External links, hash
 * navigation, the 404 document, viewports below 1000px, unsupported browsers
 * and reduced motion all navigate normally.
 */

export function initRouteTransition(): Cleanup {
  const root = document.documentElement;

  if (root.dataset.routeWipeOptOut === 'true') return () => {};
  if (!('startViewTransition' in document)) return () => {};
  if (!CSS.supports('view-transition-name', 'none')) return () => {};

  const sync = () => {
    const allowed = isDesktop() && !prefersReducedMotion();
    if (allowed) {
      root.dataset.routeWipe = 'on';
    } else {
      delete root.dataset.routeWipe;
    }
  };

  const desktop = window.matchMedia('(min-width: 1000px)');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  desktop.addEventListener('change', sync);
  reduced.addEventListener('change', sync);
  sync();

  // A back/forward restore must never leave a wipe layer on screen.
  const onPageShow = (event: PageTransitionEvent) => {
    if (event.persisted) sync();
  };
  window.addEventListener('pageshow', onPageShow);

  return () => {
    desktop.removeEventListener('change', sync);
    reduced.removeEventListener('change', sync);
    window.removeEventListener('pageshow', onPageShow);
    delete root.dataset.routeWipe;
  };
}
