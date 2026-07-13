import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduced) {
  gsap.registerPlugin(ScrollTrigger);

  // ---- smooth scroll ----
  const lenis = new Lenis({ lerp: 0.12 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // anchor links: route through Lenis so smooth scroll owns the jump
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"], a[href^="/#"]').forEach((a) => {
    const hash = a.getAttribute('href')!.replace('/', '');
    const target = document.querySelector(hash);
    if (target) {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        lenis.scrollTo(target as HTMLElement, { offset: -72 });
      });
    }
  });

  const ease = 'power4.out';

  // ---- hero: masked line reveal, then cascade ----
  const heroTl = gsap.timeline({ defaults: { ease } });
  heroTl
    .to('[data-hero="overline"]', { opacity: 1, y: 0, duration: 0.8 }, 0.1)
    .to('.hero-line-inner', { y: 0, duration: 1.1, stagger: 0.12 }, 0.2)
    .to('[data-hero="para"]', { opacity: 1, y: 0, duration: 0.9 }, 0.7)
    .to('[data-hero="cta"]', { opacity: 1, y: 0, duration: 0.9 }, 0.85);

  // ---- generic reveals on scroll ----
  document.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
    if (el.dataset.hero) return; // hero elements are driven by the intro timeline
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease,
      scrollTrigger: { trigger: el, start: 'top 88%' },
    });
  });

  // ---- horizontal hairlines draw in ----
  document.querySelectorAll<HTMLElement>('.hline').forEach((el) => {
    gsap.to(el, {
      scaleX: 1,
      duration: 1.2,
      ease: 'power3.inOut',
      scrollTrigger: { trigger: el, start: 'top 92%' },
    });
  });

  // ---- work images: scrubbed parallax ----
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((img) => {
    gsap.fromTo(
      img,
      { yPercent: -6 },
      {
        yPercent: 6,
        ease: 'none',
        scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: true },
      }
    );
  });

  // ---- dark pipeline section: curtain sweep ----
  document.querySelectorAll<HTMLElement>('.curtain').forEach((el) => {
    gsap.fromTo(
      el,
      { clipPath: 'inset(0% 0% 100% 0%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.2,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: el, start: 'top 78%' },
      }
    );
  });

  // ---- magnetic buttons ----
  const fine = window.matchMedia('(pointer: fine)').matches;
  if (fine) {
    document.querySelectorAll<HTMLElement>('.magnetic').forEach((el) => {
      const strength = 18;
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - 0.5) * strength;
        const y = ((e.clientY - r.top) / r.height - 0.5) * strength;
        gsap.to(el, { x, y, duration: 0.4, ease: 'power3.out' });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      });
    });
  }

  // ---- tactile press on buttons/links ----
  document.querySelectorAll<HTMLElement>('a, button').forEach((el) => {
    el.addEventListener('mousedown', () => gsap.to(el, { scale: 0.97, duration: 0.15 }));
    el.addEventListener('mouseup', () => gsap.to(el, { scale: 1, duration: 0.2 }));
    el.addEventListener('mouseleave', () => gsap.to(el, { scale: 1, duration: 0.2 }));
  });
}
