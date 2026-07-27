/**
 * Layered work chapters (Salient "Portfolio-Layered" parity).
 *
 * Contract (05-salient-component-map.md §4):
 *   each chapter sticks below the header · the next chapter overlaps at a
 *   fixed 20px step · the previous chapter scales to ~.96 and loses a little
 *   contrast · transition 700–900ms · no blur on a large scrolling container ·
 *   mobile drops the overlap for a clean vertical sequence.
 *
 * CSS sticky does the layout; this module only carries the behind/front state.
 */

export function initLayeredCases() {
  const stack = document.querySelector<HTMLElement>('[data-layered]');
  if (!stack) return;
  if (!matchMedia('(min-width: 768px)').matches) return;

  const chapters = [...stack.querySelectorAll<HTMLElement>('[data-chapter]')];
  if (chapters.length < 2) return;

  const header = document.querySelector<HTMLElement>('[data-header]');
  const headerHeight = header?.offsetHeight ?? 84;
  stack.style.setProperty('--sticky-top', `${headerHeight + 20}px`);

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const index = chapters.indexOf(entry.target as HTMLElement);
        // a chapter is "behind" once the following chapter has covered it
        if (index > 0) {
          chapters[index - 1].classList.toggle('is-behind', entry.isIntersecting);
        }
      }
    },
    { rootMargin: `-${headerHeight + 80}px 0px 0px 0px`, threshold: 0.08 },
  );

  chapters.slice(1).forEach((chapter) => observer.observe(chapter));
}
