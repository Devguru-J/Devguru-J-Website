/** Shared motion gates. One place decides whether an effect may run at all. */

export const DESKTOP_QUERY = '(min-width: 1000px)';
export const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)';
export const REDUCED_QUERY = '(prefers-reduced-motion: reduce)';

export function prefersReducedMotion(): boolean {
  return window.matchMedia(REDUCED_QUERY).matches;
}

export function isDesktop(): boolean {
  return window.matchMedia(DESKTOP_QUERY).matches;
}

export function hasFinePointer(): boolean {
  return window.matchMedia(FINE_POINTER_QUERY).matches;
}

/** Pointer-follow and sticky-desktop gates (06 §5, §6). */
export function desktopPointerMotionAllowed(): boolean {
  return isDesktop() && hasFinePointer() && !prefersReducedMotion();
}

export type Cleanup = () => void;

/**
 * Registers a controller once per element. Returns a cleanup for the caller,
 * and guarantees a second call on the same element is a no-op.
 */
export function once<T extends Element>(
  el: T,
  key: string,
  init: (el: T) => Cleanup | void,
): Cleanup {
  const flag = `motion${key}`;
  const store = el as unknown as Record<string, unknown>;
  if (store[flag]) return () => {};
  store[flag] = true;

  const cleanup = init(el);
  return () => {
    cleanup?.();
    store[flag] = false;
  };
}
