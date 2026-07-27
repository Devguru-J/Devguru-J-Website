import { initAssetReveal } from './asset-reveal';
import { initHero } from './hero';
import { initMenu } from './menu';
import { initProjectFollowImage } from './project-follow-image';
import { initRouteTransition } from './route-transition';
import { initStickyStory } from './sticky-story';
import type { Cleanup } from './policy';

/**
 * Boot. Each module owns one behaviour, queries only its own data hook and
 * returns a cleanup. There is no shared global init and no unthrottled scroll
 * handler. Enhancement failure never hides content: the hidden states are
 * applied by the controllers themselves, after `js-motion` is set.
 */

const cleanups: Cleanup[] = [];

function boot() {
  document.documentElement.classList.add('js-motion');

  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (hero) cleanups.push(initHero(hero));

  const menu = document.querySelector<HTMLElement>('[data-menu]');
  if (menu) cleanups.push(initMenu(menu));

  const index = document.querySelector<HTMLElement>('[data-project-index]');
  if (index) cleanups.push(initProjectFollowImage(index));

  document
    .querySelectorAll<HTMLElement>('[data-sticky-story]')
    .forEach((el) => cleanups.push(initStickyStory(el)));

  cleanups.push(initAssetReveal());
  cleanups.push(initRouteTransition());
}

function destroy() {
  while (cleanups.length) cleanups.pop()?.();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}

window.addEventListener('pagehide', destroy);
