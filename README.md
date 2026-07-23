# bymemory.dev

Personal site of Devguru-J — independent software builder in Seoul.
Showcases products (Monkey Flash for macOS) and hosts its Privacy Policy / Support pages.

## Stack

- [Astro 5](https://astro.build) — static output
- [Tailwind CSS 4](https://tailwindcss.com) — design tokens in `src/styles/global.css`
- [GSAP](https://gsap.com) + [Lenis](https://lenis.darkroom.engineering) — scroll choreography
- Geist / Geist Mono (self-hosted via Fontsource)

## Develop

```sh
npm install
npm run dev        # localhost:4321
npm run build      # static build → dist/
npm run preview    # serve dist/
```

## Deploy

Cloudflare Pages, connected to this repo:

- Build command: `npm run build`
- Output directory: `dist`
- Production domain: `bymemory.dev`

## Pages

- `/` — landing (work, capabilities, principles, about, contact)
- `/privacy` — Monkey Flash privacy policy (EN/KO) — used as the App Store Connect Privacy Policy URL
- `/support` — Monkey Flash support (EN/KO) — used as the App Store Connect Support URL
