/* =========================================================================
   기억 — Memory :: motion engine
   A dependency-free port of the Salient (Nectar) animation system.

   Ported behaviours, with their Salient sources:
     · Waypoint            — third-party/waypoints.js (offset as % of viewport)
     · colAndImgAnimations — js/src/init.js  (offset 88%, 650ms, easeOutCubic)
     · splitLineHeadings   — js/src/init.js  (stagger clamp(500/n, 15, 50))
     · NectarSplitHeading-
       Timeline            — js/src/init.js  (scroll-seeked opacity 0.2 → 1)
     · ColorChangeBG       — js/build/elements/nectar-color-change-bg.js
     · nectar-cta loaded   — adds .loaded so resting keyframes don't fire early
   ========================================================================= */

const ROOT = document.documentElement;
const PREFERS_REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Salient defaults — body[data-cad] / body[data-cae] */
const ANIMATION_DURATION = 650;
const COL_IMG_OFFSET = 88; // % of viewport height
const CASCADING_OFFSET = 70;

/* ------------------------------------------------------------------ */
/* Waypoint — matches Waypoints' "offset: 'NN%'" semantics:            */
/* fires when the element's top crosses NN% of the viewport height.    */
/* ------------------------------------------------------------------ */

const waypointEntries = [];
let waypointTicking = false;

function addWaypoint(el, offsetPercent, handler) {
  waypointEntries.push({ el, offsetPercent, handler, done: false });
}

function runWaypoints() {
  waypointTicking = false;
  const winH = window.innerHeight;
  let remaining = false;

  for (let i = 0; i < waypointEntries.length; i++) {
    const wp = waypointEntries[i];
    if (wp.done) continue;
    const rect = wp.el.getBoundingClientRect();
    if (rect.top <= winH * (wp.offsetPercent / 100)) {
      wp.done = true;
      wp.handler(wp.el);
    } else {
      remaining = true;
    }
  }

  if (!remaining && waypointEntries.length) {
    window.removeEventListener('scroll', scheduleWaypoints);
    window.removeEventListener('resize', scheduleWaypoints);
  }
}

function scheduleWaypoints() {
  if (waypointTicking) return;
  waypointTicking = true;
  requestAnimationFrame(runWaypoints);
}

/* ------------------------------------------------------------------ */
/* 1. Column & media animations — Salient colAndImgAnimations()        */
/*    650ms easeOutCubic, per-element data-delay, waypoint at 88%.     */
/* ------------------------------------------------------------------ */

function initColAnimations() {
  const els = document.querySelectorAll(
    '.col.has-animation, .img-with-aniamtion-wrap, .nectar-media[data-bg-animation]'
  );

  els.forEach((el) => {
    // Salient bumps the offset for reveal-style animations.
    const anim = el.getAttribute('data-animation') || el.getAttribute('data-bg-animation');
    let offset = COL_IMG_OFFSET;
    if (anim && anim.indexOf('reveal') !== -1) offset = CASCADING_OFFSET;

    addWaypoint(el, offset, (node) => {
      const delay = parseInt(node.getAttribute('data-delay') || '0', 10);
      if (delay > 0) {
        setTimeout(() => node.classList.add('animated-in'), delay);
      } else {
        node.classList.add('animated-in');
      }
    });
  });
}

/* ------------------------------------------------------------------ */
/* 2. Split-line heading markup                                        */
/*    Salient wraps each whitespace-delimited word:                    */
/*      <span><span class="inner">word</span></span>                   */
/*    Explicit line breaks are honoured via data-line attributes.      */
/* ------------------------------------------------------------------ */

function buildSplitMarkup(heading) {
  const target = heading.firstElementChild;
  if (!target || heading.classList.contains('markup-generated')) return [];

  // `<br>` may carry Astro's scope attribute (`<br data-astro-cid-x="">`),
  // so match the whole tag rather than just `<br>`.
  const lines = target.innerHTML.split(/<br\b[^>]*>/gi);
  const inners = [];
  const out = [];

  lines.forEach((line, lineIndex) => {
    const words = line.trim().split(/\s+/).filter(Boolean);
    const rendered = words
      .map((w) => `<span><span class="inner">${w}</span></span>`)
      .join(' ');
    out.push(rendered);
    if (lineIndex < lines.length - 1) out.push('<br>');
  });

  target.innerHTML = out.join('');
  target.querySelectorAll('.inner').forEach((n) => inners.push(n));
  heading.classList.add('markup-generated');
  return inners;
}

/* ------------------------------------------------------------------ */
/* 3. splitLineHeadings() — staggered line reveal                      */
/*    stagger = clamp(500 / wordCount, 15, 50) ms  (Salient exact)     */
/*    inner: translateY(1.3em) → none over 1.2s cubic-bezier(.25,1,.5,1)*/
/*    Waypoint offset: 'bottom-in-view' → element top < viewport bottom */
/* ------------------------------------------------------------------ */

function initSplitHeadings() {
  const headings = document.querySelectorAll(
    '.nectar-split-heading:not([data-text-effect="scroll-opacity-reveal"])'
  );

  headings.forEach((heading) => {
    const inners = buildSplitMarkup(heading);
    if (!inners.length) return;

    const delay = parseInt(heading.getAttribute('data-animation-delay') || '0', 10);
    const staggered = heading.getAttribute('data-stagger') !== 'false';

    // Salient: stagger = Math.min(Math.max(500 / n, 15), 50)
    const stagger = staggered
      ? Math.min(Math.max(500 / inners.length, 15), 50)
      : 0;

    addWaypoint(heading, 100, () => {
      setTimeout(() => {
        heading.classList.add('animated-in');
        inners.forEach((inner, i) => {
          setTimeout(() => {
            inner.style.transform = 'translateY(0em)';
            inner.style.opacity = '1';
            inner.style.filter = 'none';
          }, i * stagger);
        });
      }, delay);
    });
  });
}

/* ------------------------------------------------------------------ */
/* 4. NectarSplitHeadingTimeline — scroll-seeked opacity reveal        */
/*    Salient drives an anime.js timeline with timeline.seek(progress) */
/*    duration 450ms per word, wordDelay 150ms (250ms when slow),      */
/*    opacity [0.2, 1], easing linear, speed & topCushion computed     */
/*    from element height vs viewport height.                          */
/* ------------------------------------------------------------------ */

function initScrollOpacityHeadings() {
  const headings = document.querySelectorAll(
    '.nectar-split-heading[data-text-effect="scroll-opacity-reveal"]'
  );
  if (!headings.length) return;

  const timelines = [];

  headings.forEach((heading) => {
    const inners = buildSplitMarkup(heading);
    if (!inners.length) return;
    heading.classList.add('animated-in');

    const tl = {
      el: heading,
      inners,
      duration: 450,
      speed: 1.9,
      wordDelay: 150,
      topCushion: 0,
      offsetTop: 0,
      elHeight: 0,
      inView: false,
      topLevel: false,
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          tl.inView = entry.isIntersecting;
          if (entry.isIntersecting) calc(tl);
        });
      },
      { root: null, rootMargin: '100px 0px 100px 0px', threshold: 0 }
    );
    io.observe(heading);

    const rect = heading.getBoundingClientRect();
    if (rect.top + window.scrollY + rect.height < window.innerHeight) {
      tl.topLevel = true;
    }

    calc(tl);
    timelines.push(tl);
  });

  function calc(tl) {
    const winH = window.innerHeight;
    const rect = tl.el.getBoundingClientRect();
    tl.offsetTop = rect.top + window.scrollY;
    tl.elHeight = rect.height;
    tl.topCushion = winH * 0.05;
    tl.wordDelay = 150;

    const wordCount = tl.inners.length;

    if (tl.elHeight / winH < 0.25 && wordCount < 40) {
      tl.speed = 2.5;
    } else {
      tl.speed = Math.max(2 - Math.min(tl.elHeight / winH, 1.45), 0.66);
      if (tl.speed < 1.2 || (wordCount < 30 && tl.speed < 1.5)) {
        tl.topCushion = winH * 0.25;
        tl.wordDelay = 250;
      }
    }

    const custom = parseInt(tl.el.getAttribute('data-animation-offset') || '0', 10);
    if (custom > 0 && custom < 100) {
      tl.topCushion = winH * 0.05 + winH * 0.05 * (1 - custom / 100) * 6;
    }

    tl.totalDuration = (wordCount - 1) * tl.wordDelay + tl.duration;
  }

  window.addEventListener('resize', () => timelines.forEach(calc), { passive: true });

  function seek(tl, time) {
    for (let i = 0; i < tl.inners.length; i++) {
      const start = i * tl.wordDelay;
      let p = (time - start) / tl.duration;
      if (p < 0) p = 0;
      else if (p > 1) p = 1;
      // opacity [0.2, 1], linear easing
      tl.inners[i].style.opacity = (0.2 + 0.8 * p).toFixed(3);
    }
  }

  function raf() {
    const scrollTop = window.scrollY;
    const winH = window.innerHeight;

    for (let i = 0; i < timelines.length; i++) {
      const tl = timelines[i];
      if (!tl.inView) continue;

      let progress;
      if (!tl.topLevel) {
        progress = 1 + (scrollTop - (tl.offsetTop + tl.topCushion)) / winH;
      } else {
        progress = (scrollTop / winH) * 1.5;
      }

      seek(tl, progress * tl.totalDuration * tl.speed);
    }

    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}

/* ------------------------------------------------------------------ */
/* 5. ColorChangeBG — verbatim port of                                 */
/*    js/build/elements/nectar-color-change-bg.js                      */
/*    VISIBILITY_THRESHOLD 0.4, DESCENDANT_THRESHOLD 0.05,             */
/*    TRANSPARENCY_DELAY 60ms, ENABLE_DELAY 100ms, RESIZE_DEBOUNCE 120 */
/* ------------------------------------------------------------------ */

const VISIBILITY_THRESHOLD = 0.4;
const DESCENDANT_THRESHOLD = 0.05;
const TRANSPARENCY_DELAY = 60;
const ENABLE_DELAY = 100;
const RESIZE_DEBOUNCE = 120;

class ColorChangeBG {
  constructor() {
    this.sections = Array.from(
      document.querySelectorAll(
        'div[data-color-change-section-bg-color], section[data-color-change-section-bg-color]'
      )
    );
    if (!this.sections.length) return;

    this.currentSection = null;
    this.lastScrollY = window.scrollY;
    this.scrollDirection = 'down';
    this.isRescanScheduled = false;
    this.rafId = null;
    this.resizeDebounceId = null;

    this.onScroll = this.onScroll.bind(this);
    this.onResize = this.onResize.bind(this);

    this.init();
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('resize', this.onResize, { passive: true });
  }

  init() {
    ROOT.style.setProperty('--page-color-change-section-transition-time', '0s');

    this.observer = new IntersectionObserver(
      () => {
        this.updateScrollDirection(window.scrollY);
        this.scheduleRescan();
      },
      { root: null, rootMargin: '0px', threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] }
    );
    this.sections.forEach((s) => this.observer.observe(s));

    this.scheduleRescan();

    setTimeout(() => {
      this.sections.forEach((s) => {
        s.style.backgroundColor = 'transparent';
      });
    }, TRANSPARENCY_DELAY);

    setTimeout(() => {
      ROOT.style.setProperty('--page-color-change-section-transition-time', '0.8s');
      document.body.classList.add('has-color-change-section-bg-color');
    }, ENABLE_DELAY);
  }

  isInViewport(el) {
    const r = el.getBoundingClientRect();
    return Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0) > 0;
  }

  calculateVisibility(el) {
    const r = el.getBoundingClientRect();
    const winH = window.innerHeight;
    const visible = Math.min(r.bottom, winH) - Math.max(r.top, 0);
    return r.height > winH ? visible / winH : visible / r.height;
  }

  hasVisibleDescendantSection(el) {
    for (let i = 0; i < this.sections.length; i++) {
      const s = this.sections[i];
      if (s === el || !el.contains(s)) continue;
      const r = s.getBoundingClientRect();
      if (Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0) <= 0) continue;
      if (this.calculateVisibility(s) > DESCENDANT_THRESHOLD) return true;
    }
    return false;
  }

  shouldConsiderSection(el) {
    if (!this.currentSection) return true;
    const cur = this.currentSection.getBoundingClientRect();
    const next = el.getBoundingClientRect();
    return this.scrollDirection === 'down' ? next.top >= cur.top : next.top <= cur.top;
  }

  rescanVisibleSections() {
    let best = null;
    let bestVis = 0;
    let anyInViewport = false;
    let fallback = null;
    let fallbackVis = 0;

    for (let i = 0; i < this.sections.length; i++) {
      const s = this.sections[i];
      if (!this.isInViewport(s)) continue;
      anyInViewport = true;
      if (this.hasVisibleDescendantSection(s)) continue;

      const vis = this.calculateVisibility(s);
      if (vis > fallbackVis) {
        fallbackVis = vis;
        fallback = s;
      }
      if (vis >= VISIBILITY_THRESHOLD && vis > bestVis && this.shouldConsiderSection(s)) {
        best = s;
        bestVis = vis;
      }
    }

    if (best && best !== this.currentSection) this.applySectionColors(best);
    if (!best && !this.currentSection && fallback) this.applySectionColors(fallback);
    if (!best && !this.currentSection && !anyInViewport) {
      const near = this.findNearestSectionToScrollPosition();
      if (near) this.applySectionColors(near);
    }

    this.isRescanScheduled = false;
    this.rafId = null;
  }

  findNearestSectionToScrollPosition() {
    const scrollTop = window.scrollY || 0;
    const mid = scrollTop + window.innerHeight / 2;
    let nearest = null;
    let nearestDist = Infinity;

    for (let i = 0; i < this.sections.length; i++) {
      const s = this.sections[i];
      const r = s.getBoundingClientRect();
      const top = r.top + scrollTop;
      const bottom = top + r.height;
      const dist = mid < top ? top - mid : mid > bottom ? mid - bottom : 0;
      if (dist < nearestDist) {
        nearestDist = dist;
        nearest = s;
      }
    }
    return nearest;
  }

  scheduleRescan() {
    if (this.isRescanScheduled) return;
    this.isRescanScheduled = true;
    this.rafId = requestAnimationFrame(() => this.rescanVisibleSections());
  }

  onScroll() {
    this.updateScrollDirection(window.scrollY);
    this.scheduleRescan();
  }

  onResize() {
    if (this.resizeDebounceId) clearTimeout(this.resizeDebounceId);
    this.resizeDebounceId = setTimeout(() => {
      this.scheduleRescan();
      this.resizeDebounceId = null;
    }, RESIZE_DEBOUNCE);
  }

  applySectionColors(el) {
    const bg = el.getAttribute('data-color-change-section-bg-color');
    const text = el.getAttribute('data-color-change-section-text-color');
    ROOT.style.setProperty('--nectar-page-background-color', bg);
    ROOT.style.setProperty('--nectar-page-text-color', text);
    this.currentSection = el;
    document.body.setAttribute('data-page-tone', bg === '#000000' ? 'dark' : 'light');
  }

  updateScrollDirection(y) {
    const dir = y > this.lastScrollY ? 'down' : 'up';
    if (Math.abs(y - this.lastScrollY) > 5) {
      this.scrollDirection = dir;
      this.lastScrollY = y;
    }
  }
}

/* ------------------------------------------------------------------ */
/* 6. NectarIconMouseFollow — iconType 'post-grid-images'              */
/*    Verbatim port of js/src/init.js.                                 */
/*                                                                     */
/*    lerpDamp 0.1 for the vertical-list variant, and the pointer X is */
/*    remapped into the right half of the viewport so the image never  */
/*    covers the row text:                                             */
/*      mappedX = (1/2)*winW + (clientX / winW) * (winW / 2)           */
/*    Y tracks the pointer directly. Both are eased each frame with    */
/*      linearInterpolate(a, b, n) => (1 - n) * a + n * b              */
/* ------------------------------------------------------------------ */

function linearInterpolate(a, b, n) {
  return (1 - n) * a + n * b;
}

function initMouseFollow() {
  // Salient skips this entirely on mobile browsers.
  if (window.matchMedia('(hover: none)').matches || window.innerWidth < 1000) return;

  const grids = document.querySelectorAll(
    '.nectar-post-grid.vert_list_hover_effect_featured_image_follow'
  );

  grids.forEach((grid) => {
    const media = grid.querySelectorAll('.nectar-post-grid-item-bg__media');
    if (!media.length) return;

    const state = {
      lastX: window.innerWidth / 2,
      lastY: window.innerHeight / 2,
      lerpDamp: 0.1,
      active: false,
      running: false,
    };

    // Only run the rAF while the grid is on screen (Salient: viewportTracking).
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            grid.classList.add('active', 'el-in-view');
            media.forEach((m) => (m.style.visibility = 'visible'));
            state.active = true;
            if (!state.running) {
              state.running = true;
              requestAnimationFrame(raf);
            }
          } else {
            grid.classList.remove('el-in-view');
            media.forEach((m) => (m.style.visibility = 'hidden'));
            state.active = false;
          }
        });
      },
      { rootMargin: '0px', threshold: 0 }
    );
    io.observe(grid);

    grid.addEventListener('mouseenter', () => {
      grid.classList.add('mouse-over');
      state.active = true;
      if (!state.running) {
        state.running = true;
        requestAnimationFrame(raf);
      }
    });

    grid.addEventListener('mouseleave', () => {
      grid.classList.remove('mouse-over');
    });

    function raf() {
      if (!state.active) {
        state.running = false;
        return;
      }

      const winW = window.innerWidth;
      const mappedX = 0.5 * winW + (pointer.x / winW) * (winW / 2);

      state.lastX = linearInterpolate(state.lastX, mappedX, state.lerpDamp);
      state.lastY = linearInterpolate(state.lastY, pointer.y, state.lerpDamp);

      const transform =
        'translateX(' + state.lastX + 'px) translateY(' + state.lastY + 'px)';
      for (let i = 0; i < media.length; i++) {
        media[i].style.transform = transform;
      }

      requestAnimationFrame(raf);
    }
  });
}

/* Salient keeps pointer position on nectarDOMInfo; a module-level object here. */
const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

window.addEventListener(
  'mousemove',
  (e) => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
  },
  { passive: true }
);

/* ------------------------------------------------------------------ */
/* 7. Sticky header — Salient's scroll-direction hide / reveal         */
/* ------------------------------------------------------------------ */

function initHeader() {
  const header = document.getElementById('top');
  if (!header) return;

  let last = window.scrollY;
  let ticking = false;

  function update() {
    ticking = false;
    const y = window.scrollY;

    header.classList.toggle('is-scrolled', y > 24);

    if (y > 220 && y > last + 4) {
      header.classList.add('is-hidden');
    } else if (y < last - 4 || y <= 220) {
      header.classList.remove('is-hidden');
    }
    last = y;
  }

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true }
  );

  update();
}

/* ------------------------------------------------------------------ */
/* 8. Mobile navigation                                                */
/* ------------------------------------------------------------------ */

function initMobileNav() {
  const toggle = document.querySelector('[data-nav-toggle]');
  const panel = document.getElementById('nav-panel');
  if (!toggle || !panel) return;

  const close = () => {
    document.body.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const open = document.body.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  panel.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}

/* ------------------------------------------------------------------ */
/* 9. Bootstrap                                                        */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/*  Fancy unordered list                                                */
/*  Salient element-fancy-unordered-list — items rest at opacity 0 /    */
/*  left -20px and settle on the same 88% waypoint the columns use.     */
/* ------------------------------------------------------------------ */

function initFancyLists() {
  document.querySelectorAll('.nectar-fancy-ul[data-animation="true"]').forEach((list) => {
    const items = list.querySelectorAll('li');
    addWaypoint(list, COL_IMG_OFFSET, () => {
      list.classList.add('animated-in');
      // Salient staggers list children the same way it staggers columns.
      items.forEach((li, i) => {
        li.style.transitionDelay = `${i * 70}ms`;
      });
    });
  });
}

/* ------------------------------------------------------------------ */
/*  Page submenu (chapter index)                                        */
/*  Salient uses a Bootstrap ScrollSpy 3.2.0 fork (js/src/init.js       */
/*  ~3955). Ported rules:                                               */
/*    · offset 10 plus the submenu's own height                         */
/*    · active = last target whose top <= scrollTop + offset            */
/*    · scrolled to the bottom → last target wins                       */
/*    · above the first target → nothing is active                      */
/* ------------------------------------------------------------------ */

const SCROLLSPY_OFFSET = 10;

function initChapterIndex() {
  const bar = document.querySelector('.page-submenu');
  if (!bar) return;

  const links = Array.from(bar.querySelectorAll('ul li > a'));
  if (!links.length) return;

  let targets = [];
  let activeTarget = null;
  let barHeight = 0;

  const refresh = () => {
    barHeight = bar.getBoundingClientRect().height;
    targets = links
      .map((a) => {
        const href = a.getAttribute('href') || '';
        const el = href.length > 1 ? document.querySelector(href) : null;
        if (!el) return null;
        return { href, li: a.parentElement, top: el.getBoundingClientRect().top + window.scrollY };
      })
      .filter(Boolean)
      .sort((a, b) => a.top - b.top);
  };

  const activate = (target) => {
    if (activeTarget === target) return;
    activeTarget = target;
    links.forEach((a) => a.parentElement.classList.remove('current-menu-item'));
    if (target) target.li.classList.add('current-menu-item');
  };

  const process = () => {
    if (!targets.length) return;
    const scroll = window.scrollY + SCROLLSPY_OFFSET + barHeight;
    const max = document.documentElement.scrollHeight - window.innerHeight - SCROLLSPY_OFFSET;

    if (scroll >= max) return activate(targets[targets.length - 1]);
    if (scroll < targets[0].top) return activate(null);

    for (let i = targets.length - 1; i >= 0; i--) {
      const next = targets[i + 1];
      if (scroll >= targets[i].top && (!next || scroll <= next.top)) {
        return activate(targets[i]);
      }
    }
    return undefined;
  };

  // Salient toggles `.stuck` instead of using position: sticky — the theme's
  // html/body overflow-x rules kill sticky. The wrapper keeps the height so
  // the page doesn't jump the moment the bar goes fixed.
  const wrapper = bar.parentElement;
  let stuckAt = 0;

  const measure = () => {
    const wasStuck = bar.classList.contains('stuck');
    if (wasStuck) bar.classList.remove('stuck');
    stuckAt = wrapper.getBoundingClientRect().top + window.scrollY;
    wrapper.style.height = `${bar.getBoundingClientRect().height}px`;
    if (wasStuck) bar.classList.add('stuck');
  };

  const stick = () => {
    bar.classList.toggle('stuck', window.scrollY >= stuckAt);
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      stick();
      process();
    });
  };

  measure();
  refresh();
  stick();
  process();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    measure();
    refresh();
    stick();
    process();
  }, { passive: true });
}

function boot() {
  ROOT.classList.add('js');

  initHeader();
  initMobileNav();
  initMouseFollow();
  initChapterIndex();

  if (PREFERS_REDUCED) {
    document
      .querySelectorAll('.col.has-animation, .img-with-aniamtion-wrap, .nectar-media[data-bg-animation]')
      .forEach((el) => el.classList.add('animated-in'));
    document.querySelectorAll('.nectar-split-heading').forEach((el) => {
      el.classList.add('animated-in');
      buildSplitMarkup(el).forEach((inner) => {
        inner.style.transform = 'none';
        inner.style.opacity = '1';
      });
    });
  } else {
    initColAnimations();
    initSplitHeadings();
    initScrollOpacityHeadings();
    initFancyLists();

    window.addEventListener('scroll', scheduleWaypoints, { passive: true });
    window.addEventListener('resize', scheduleWaypoints, { passive: true });
    runWaypoints();
  }

  // eslint-disable-next-line no-new
  new ColorChangeBG();

  // Salient adds `.loaded` after paint so resting keyframes don't flash.
  requestAnimationFrame(() => {
    ROOT.classList.add('loaded');
    document.querySelectorAll('.nectar-cta').forEach((el) => el.classList.add('loaded'));
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
