import { once, type Cleanup } from './policy';

/**
 * Fullscreen split off-canvas menu — Salient choreography (06 §8).
 *
 * Open   background 300ms ease; primary links translateY(40px) → 0 over 850ms
 *        cubic-bezier(.2,.75,.5,1) with opacity 500ms ease, first at 160ms and
 *        each following link +20ms; right-side information starts at 300ms
 *        from translateY(35px).
 * Close  links and right side fade out over 250ms, their transform resets to
 *        the closed offset with a 10ms transition after a 450ms delay, and the
 *        background fades over 550ms. The overlay only becomes inert after the
 *        background exit completes, and the open stagger is never replayed.
 *
 * Accessibility is deliberately ahead of the source: real dialog semantics,
 * Escape, a focus trap, an inert background and focus return. Those do not
 * change the normal-motion geometry or timing.
 */

const FIRST_DELAY = 160;
const STAGGER = 20;
const ASIDE_DELAY = 300;
const CLOSE_RESET_DELAY = 450;
const CLOSE_BACKGROUND = 550;

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function initMenu(root: HTMLElement): Cleanup {
  return once(root, 'Menu', (menu) => {
    const trigger = document.querySelector<HTMLButtonElement>('[data-menu-trigger]');
    const closeBtn = menu.querySelector<HTMLButtonElement>('[data-menu-close]');
    const links = Array.from(
      menu.querySelectorAll<HTMLElement>('.menu__link-item'),
    );
    const asides = Array.from(
      menu.querySelectorAll<HTMLElement>('.menu__aside-item'),
    );
    const backdrop = menu.querySelector<HTMLElement>('.menu__backdrop');
    if (!trigger) return;

    const inertTargets = Array.from(
      document.querySelectorAll<HTMLElement>('[data-menu-inert]'),
    );

    let open = false;
    let scrollY = 0;
    const timers: number[] = [];

    const clearTimers = () => {
      timers.forEach((t) => window.clearTimeout(t));
      timers.length = 0;
    };

    const applyOpenDelays = () => {
      links.forEach((el, i) => {
        el.style.transitionDelay = `${FIRST_DELAY + i * STAGGER}ms`;
      });
      asides.forEach((el) => {
        el.style.transitionDelay = `${ASIDE_DELAY}ms`;
      });
    };

    const clearDelays = () => {
      [...links, ...asides].forEach((el) => {
        el.style.transitionDelay = '';
      });
    };

    const lockScroll = () => {
      scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `${-scrollY}px`;
      document.body.style.width = '100%';
    };

    const unlockScroll = () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
    };

    const openMenu = () => {
      if (open) return;
      open = true;
      clearTimers();
      menu.removeAttribute('inert');
      menu.dataset.menuReset = 'false';
      applyOpenDelays();
      // Commit the closed state before flipping, so the entrance always runs.
      void menu.offsetWidth;
      menu.dataset.menuState = 'open';
      trigger.setAttribute('aria-expanded', 'true');
      lockScroll();
      inertTargets.forEach((el) => el.setAttribute('inert', ''));
      timers.push(
        window.setTimeout(() => {
          links[0]?.querySelector<HTMLElement>('a, button')?.focus();
        }, FIRST_DELAY),
      );
    };

    const closeMenu = () => {
      if (!open) return;
      open = false;
      clearTimers();
      clearDelays();
      menu.dataset.menuState = 'closing';
      trigger.setAttribute('aria-expanded', 'false');
      inertTargets.forEach((el) => el.removeAttribute('inert'));
      unlockScroll();
      trigger.focus();

      timers.push(
        window.setTimeout(() => {
          menu.dataset.menuReset = 'true';
        }, CLOSE_RESET_DELAY),
      );
      timers.push(
        window.setTimeout(() => {
          menu.dataset.menuState = 'closed';
          menu.dataset.menuReset = 'false';
          menu.setAttribute('inert', '');
        }, CLOSE_BACKGROUND),
      );
    };

    const onKeydown = (event: KeyboardEvent) => {
      if (!open) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = Array.from(
        menu.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null);
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const onTrigger = () => (open ? closeMenu() : openMenu());
    const onClose = () => closeMenu();
    const onBackdrop = () => closeMenu();

    trigger.addEventListener('click', onTrigger);
    closeBtn?.addEventListener('click', onClose);
    backdrop?.addEventListener('click', onBackdrop);
    document.addEventListener('keydown', onKeydown);

    // A viewport that regains the direct desktop navigation must not keep a
    // trapped overlay open behind it.
    const desktop = window.matchMedia('(min-width: 1000px)');
    const onBreakpoint = () => {
      if (desktop.matches && open) closeMenu();
    };
    desktop.addEventListener('change', onBreakpoint);

    menu.dataset.menuState = 'closed';
    menu.setAttribute('inert', '');

    return () => {
      clearTimers();
      trigger.removeEventListener('click', onTrigger);
      closeBtn?.removeEventListener('click', onClose);
      backdrop?.removeEventListener('click', onBackdrop);
      document.removeEventListener('keydown', onKeydown);
      desktop.removeEventListener('change', onBreakpoint);
      if (open) unlockScroll();
    };
  });
}
