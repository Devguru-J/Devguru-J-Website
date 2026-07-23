/* ------------------------------------------------------------------
   SIGNAL template — interactions
   All motion is written from scratch: split-letter reveals, scroll
   background transitions, ticker carousel, cursor-follow effects.
------------------------------------------------------------------- */

import Lenis from 'lenis';

const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

/* ---------------------------------------------------------------
   0. Smooth scrolling (Lenis) — same library/feel as the reference
      site. Anchor jumps use a 1.3s easeOutCubic glide.
---------------------------------------------------------------- */
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

function initSmoothScroll() {
  const lenis = new Lenis({ autoRaf: true });

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const target = a.getAttribute('href');
      if (!target || target === '#') return;
      const el = document.querySelector(target);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { duration: 1.3, easing: easeOutCubic });
    });
  });
  return lenis;
}

/* ---------------------------------------------------------------
   1. Split headings — wrap each word in a masked line, each letter
      in a staggered span, reveal on load (hero) or on scroll.
---------------------------------------------------------------- */
function initSplitHeadings() {
  const els = document.querySelectorAll('.split-heading');
  els.forEach((el) => {
    const words = el.textContent.trim().split(/\s+/);
    el.textContent = '';
    let i = 0;
    words.forEach((word) => {
      const line = document.createElement('span');
      line.className = 'sh-line';
      for (const ch of word) {
        const s = document.createElement('span');
        s.className = 'sh-ch';
        s.style.setProperty('--i', i++);
        s.textContent = ch;
        line.appendChild(s);
      }
      el.appendChild(line);
      el.appendChild(document.createTextNode(' '));
    });
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.35 }
  );

  document.fonts.ready.then(() => {
    els.forEach((el) => {
      if (el.dataset.reveal === 'load') {
        setTimeout(() => el.classList.add('in'), 150);
      } else {
        io.observe(el);
      }
    });
  });
}

/* ---------------------------------------------------------------
   2. Generic fade-in-from-bottom for [data-anim] elements
---------------------------------------------------------------- */
function initFadeIns() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.18 }
  );
  document.querySelectorAll('[data-anim]').forEach((el) => {
    if (el.dataset.delay) el.style.setProperty('--delay', el.dataset.delay + 'ms');
    io.observe(el);
  });
}

/* ---------------------------------------------------------------
   3. Scroll-driven body background color (per-section data-bg)
---------------------------------------------------------------- */
function initBgSwitcher() {
  const sections = [...document.querySelectorAll('[data-bg]')];
  if (!sections.length) return;
  const wrap = document.querySelector('.ocm-wrap');
  let current = '';
  const update = () => {
    const mid = window.innerHeight * 0.5;
    let color = sections[0].dataset.bg;
    for (const s of sections) {
      if (s.getBoundingClientRect().top < mid) color = s.dataset.bg;
    }
    if (color !== current) {
      current = color;
      document.body.style.backgroundColor = color;
      if (wrap) wrap.style.backgroundColor = color;
    }
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ---------------------------------------------------------------
   4. Statement — words + inline images reveal with scroll progress
---------------------------------------------------------------- */
function initStatement() {
  const stmt = document.querySelector('.statement h2');
  if (!stmt) return;
  const items = [...stmt.querySelectorAll('.w, .imk')];
  const update = () => {
    const rect = stmt.getBoundingClientRect();
    const vh = window.innerHeight;
    const progress = clamp((vh * 0.9 - rect.top) / (rect.height + vh * 0.35), 0, 1);
    const count = Math.floor(progress * (items.length + 1));
    items.forEach((el, i) => el.classList.toggle('visible', i < count));
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ---------------------------------------------------------------
   5. Services ticker — infinite auto-drifting, draggable carousel
---------------------------------------------------------------- */
function initTicker() {
  const ticker = document.querySelector('.ticker');
  const track = document.querySelector('.ticker-track');
  if (!ticker || !track) return;

  // duplicate content for seamless wrap
  track.innerHTML += track.innerHTML;
  let half = 0;
  const measure = () => {
    half = track.scrollWidth / 2;
  };
  measure();
  window.addEventListener('resize', measure);

  let x = 0;
  let velocity = 0; // px per second
  const DRIFT = 37.4; // px per second — matched to the reference site's ticker
  let dragging = false;
  let lastX = 0;
  let lastMoveT = 0;

  ticker.addEventListener('pointerdown', (e) => {
    dragging = true;
    ticker.classList.add('dragging');
    lastX = e.clientX;
    lastMoveT = performance.now();
    velocity = 0;
    ticker.setPointerCapture(e.pointerId);
  });
  ticker.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const now = performance.now();
    const dx = e.clientX - lastX;
    const dt = Math.max((now - lastMoveT) / 1000, 0.001);
    lastX = e.clientX;
    lastMoveT = now;
    x -= dx;
    velocity = clamp(-dx / dt, -3000, 3000);
  });
  const endDrag = () => {
    dragging = false;
    ticker.classList.remove('dragging');
  };
  ticker.addEventListener('pointerup', endDrag);
  ticker.addEventListener('pointercancel', endDrag);
  // prevent link/image native drag
  ticker.addEventListener('dragstart', (e) => e.preventDefault());

  let lastT = performance.now();
  const loop = (now) => {
    const dt = Math.min((now - lastT) / 1000, 0.05);
    lastT = now;
    if (!dragging) {
      // ease released momentum back to the constant drift speed
      const blend = 1 - Math.pow(0.96, dt * 60);
      velocity = lerp(velocity, DRIFT, blend);
      x += velocity * dt;
    }
    if (half > 0) {
      x = ((x % half) + half) % half;
    }
    track.style.transform = `translateX(${-x}px)`;
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}

/* ---------------------------------------------------------------
   6. Featured work — cursor-following image preview
---------------------------------------------------------------- */
function initWorkList() {
  const list = document.querySelector('.work-list');
  const follow = document.querySelector('.work-follow');
  if (!list || !follow) return;
  const imgs = [...follow.querySelectorAll('img')];

  let targetX = 0;
  let targetY = 0;
  let curX = 0;
  let curY = 0;
  let active = false;

  list.addEventListener('pointermove', (e) => {
    const rect = list.getBoundingClientRect();
    targetX = e.clientX - rect.left - follow.offsetWidth / 2;
    targetY = e.clientY - rect.top - follow.offsetHeight / 2;
    if (!active) {
      curX = targetX;
      curY = targetY;
    }
  });

  list.querySelectorAll('.work-item').forEach((item) => {
    item.addEventListener('pointerenter', () => {
      const key = item.dataset.img;
      imgs.forEach((im) => im.classList.toggle('on', im.dataset.key === key));
      follow.classList.add('on');
      active = true;
    });
  });
  list.addEventListener('pointerleave', () => {
    follow.classList.remove('on');
    active = false;
  });

  const loop = () => {
    curX = lerp(curX, targetX, 0.12);
    curY = lerp(curY, targetY, 0.12);
    follow.style.transform = `translate(${curX}px, ${curY}px) scale(${
      follow.classList.contains('on') ? 1 : 0.85
    })`;
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}

/* ---------------------------------------------------------------
   7. Testimonial slider
---------------------------------------------------------------- */
function initTestimonials() {
  const root = document.querySelector('.testimonials');
  if (!root) return;
  const slides = [...root.querySelectorAll('.t-slide')];
  const counter = root.querySelector('.t-counter .cur');
  let idx = 0;

  const show = (n) => {
    idx = (n + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle('active', i === idx));
    if (counter) counter.textContent = idx + 1;
  };
  root.querySelector('.t-nav.prev')?.addEventListener('click', () => show(idx - 1));
  root.querySelector('.t-nav.next')?.addEventListener('click', () => show(idx + 1));
  show(0);
}

/* ---------------------------------------------------------------
   8. Video — cursor-follow PLAY pill + lightbox
---------------------------------------------------------------- */
function initVideo() {
  const frame = document.querySelector('.video-frame');
  const pill = document.querySelector('.play-pill');
  const lightbox = document.querySelector('.lightbox');
  if (!frame || !pill) return;

  let tx = 24;
  let ty = 24;
  let cx = 24;
  let cy = 24;
  let inside = false;

  frame.addEventListener('pointermove', (e) => {
    const rect = frame.getBoundingClientRect();
    tx = clamp(e.clientX - rect.left - pill.offsetWidth / 2, 10, rect.width - pill.offsetWidth - 10);
    ty = clamp(e.clientY - rect.top - pill.offsetHeight / 2, 10, rect.height - pill.offsetHeight - 10);
    inside = true;
  });
  frame.addEventListener('pointerleave', () => {
    inside = false;
    const rect = frame.getBoundingClientRect();
    tx = 24;
    ty = rect.height / 2 - pill.offsetHeight / 2;
  });
  // initial: vertically centered at left, like the original
  const initPos = () => {
    ty = frame.getBoundingClientRect().height / 2 - pill.offsetHeight / 2;
    cy = ty;
  };
  initPos();
  window.addEventListener('resize', initPos);

  const loop = () => {
    cx = lerp(cx, tx, inside ? 0.14 : 0.06);
    cy = lerp(cy, ty, inside ? 0.14 : 0.06);
    pill.style.transform = `translate(${cx}px, ${cy}px)`;
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);

  if (lightbox) {
    const lbVideo = lightbox.querySelector('video');
    const open = () => {
      lightbox.classList.add('open');
      document.body.classList.add('no-scroll');
      lbVideo.currentTime = 0;
      lbVideo.muted = false;
      lbVideo.play().catch(() => {});
    };
    const close = () => {
      lightbox.classList.remove('open');
      document.body.classList.remove('no-scroll');
      lbVideo.pause();
    };
    frame.addEventListener('click', open);
    lightbox.querySelector('.lightbox-close')?.addEventListener('click', close);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) close();
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  }
}

/* ---------------------------------------------------------------
   9. Header — hide on scroll down, show on scroll up
---------------------------------------------------------------- */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  let lastY = window.scrollY;
  window.addEventListener(
    'scroll',
    () => {
      const y = window.scrollY;
      header.classList.toggle('scrolled', y > 80);
      if (y > lastY && y > 200) header.classList.add('hidden');
      else header.classList.remove('hidden');
      lastY = y;
    },
    { passive: true }
  );
}

/* ---------------------------------------------------------------
   10. Off-canvas menu — "material" style. The whole page wrapper
       shrinks (scale 0.8) and slides left (-25.28vw) over 0.8s with
       cubic-bezier(0.15, 0.2, 0.1, 1), revealing the fixed panel on
       the right. Clicking the minimized page (or Esc) closes it.
---------------------------------------------------------------- */
function initMenu(lenis) {
  const wrap = document.querySelector('.ocm-wrap');
  const inner = document.querySelector('.ocm-wrap-inner');
  const header = document.querySelector('.site-header');
  const burger = document.querySelector('.burger');
  if (!wrap || !burger) return;

  let restoreTimer = null;
  const isOpen = () => document.body.classList.contains('ocm-open');

  // Scroll locking never touches overflow, so the scrollbar stays put and
  // the layout can't jump. Wheel is already owned by Lenis (stopped while
  // open); these guards cover touch and keyboard scrolling.
  const blockEvent = (e) => e.preventDefault();
  const blockKeys = (e) => {
    const keys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '];
    if (keys.includes(e.key)) e.preventDefault();
  };
  const lockScroll = () => {
    window.addEventListener('wheel', blockEvent, { passive: false });
    window.addEventListener('touchmove', blockEvent, { passive: false });
    window.addEventListener('keydown', blockKeys);
    lenis?.stop();
  };
  const unlockScroll = () => {
    window.removeEventListener('wheel', blockEvent);
    window.removeEventListener('touchmove', blockEvent);
    window.removeEventListener('keydown', blockKeys);
    lenis?.start();
  };

  const open = () => {
    clearTimeout(restoreTimer);
    // scale around the center of the currently visible viewport region
    const origin = `50% ${window.scrollY + window.innerHeight / 2}px`;
    wrap.style.transformOrigin = origin;
    if (inner) inner.style.transformOrigin = origin;
    // fixed elements inside a transformed ancestor lose viewport anchoring,
    // so pin the header to its current on-screen position
    if (header) {
      header.style.position = 'absolute';
      header.style.top = `${window.scrollY}px`;
    }
    document.body.classList.add('ocm-open');
    burger.setAttribute('aria-expanded', 'true');
    lockScroll();
  };

  const restore = () => {
    if (header) {
      header.style.position = '';
      header.style.top = '';
    }
    unlockScroll();
  };

  const close = () => {
    document.body.classList.remove('ocm-open');
    burger.setAttribute('aria-expanded', 'false');
    restoreTimer = setTimeout(restore, 800);
  };

  burger.addEventListener('click', (e) => {
    e.stopPropagation();
    isOpen() ? close() : open();
  });

  // clicking the minimized page closes the menu without following links
  wrap.addEventListener(
    'click',
    (e) => {
      if (!isOpen()) return;
      e.preventDefault();
      e.stopPropagation();
      close();
    },
    { capture: true }
  );

  // panel links: close first (restarting Lenis) so the smooth anchor
  // glide added in initSmoothScroll can take over
  document.querySelectorAll('.ocm-panel nav a').forEach((a) => {
    a.addEventListener(
      'click',
      () => {
        if (!isOpen()) return;
        clearTimeout(restoreTimer);
        document.body.classList.remove('ocm-open');
        burger.setAttribute('aria-expanded', 'false');
        restore();
      },
      { capture: true }
    );
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) close();
  });
}

/* ---------------------------------------------------------------
   11. Language preference — record the visitor's explicit EN/KO
       choice so the Cloudflare Pages function ("/" geo redirect)
       respects it instead of bouncing them back by IP country.
---------------------------------------------------------------- */
function initLangPref() {
  document.querySelectorAll('a.lang-link').forEach((a) => {
    a.addEventListener('click', () => {
      const href = a.getAttribute('href') || '/';
      const lang = href.startsWith('/en') ? 'en' : 'ko';
      document.cookie = `lang=${lang}; path=/; max-age=31536000; samesite=lax`;
    });
  });
}

/* --------------------------------------------------------------- */
const lenis = initSmoothScroll();
initSplitHeadings();
initFadeIns();
initBgSwitcher();
initStatement();
initTicker();
initWorkList();
initTestimonials();
initVideo();
initHeader();
initMenu(lenis);
initLangPref();
