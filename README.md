# 기억 / Memory — website

Site for **기억 / Memory**, an independent software engineering studio.
Hosts the studio homepage in Korean and English, and the Monkey Flash privacy
policy and support pages used by App Store Connect.

The brand name is language-specific: Korean pages say **기억**, English pages say
**Memory**. The two are never shown together outside brand documentation.

## Stack

- [Astro 5](https://astro.build) — static output, `trailingSlash: 'always'`
- [Tailwind CSS 4](https://tailwindcss.com) — reset and `@utility` layer only
- Design tokens — plain CSS custom properties in `src/styles/global.css`
- Geist / Geist Mono / Pretendard, self-hosted
- Cloudflare Pages + Pages Functions

## Commands

```sh
npm install
npm run dev        # localhost:4321
npm run build      # static build → dist/
npm run preview    # serve dist/

npm run check      # astro check (types)
npm run lint       # eslint
npm test           # playwright e2e against a preview build
npm run verify     # check + lint + build + test
```

Asset regeneration (only needed when the brand mark or OG design changes):

```sh
npm run generate:icons   # favicon.png, apple-touch-icon.png, icon-brand-512.png
npm run generate:og      # og-home-{en,ko}.png, og-monkeyflash-{en,ko}.png
```

The Monkey Flash product shots (`work-monkeyflash-product-{en,ko}.jpg`) are crops
of the App Store screenshots in the app repo, taken to remove the baked-in
marketing overlay. Both crops share one framing and aspect so the two locales'
cards lay out identically. Re-crop from the same sources if the app UI changes.

## Routes

| URL | Contents |
| --- | --- |
| `/` | English homepage |
| `/ko/` | Korean homepage |
| `/MonkeyFlash/privacy/` | Monkey Flash privacy policy (EN) — App Store Connect Privacy URL |
| `/MonkeyFlash/support/` | Monkey Flash support (EN) — App Store Connect Support URL |
| `/ko/MonkeyFlash/privacy/` | Monkey Flash privacy policy (KO) |
| `/ko/MonkeyFlash/support/` | Monkey Flash support (KO) |
| `/404.html` | Real 404 |

Homepage anchors: `#work`, `#capabilities`, `#how-we-work`, `#studio`, `#contact`.

Legacy aliases `/privacy` and `/support` 301 to the English canonical paths in a
single hop. Old `?lang=` links on the legal pages redirect once to the matching
locale route.

## Where things live

| Concern | File |
| --- | --- |
| **Operational facts** — domain, email, prices, store URLs, product status | `src/config/site.ts` |
| **Presentational copy**, Korean and English | `src/i18n.ts` |
| **Confirmed legal wording** | `src/content/legal.ts` |
| Colour, type scale, layout, motion | `src/styles/global.css` |
| Language routing at the edge | `functions/index.js` |
| Host normalisation at the edge | `functions/_middleware.js` |

Facts and copy are deliberately separate. Anything unverified is `null` in
`site.ts` and is then omitted from the page rather than guessed.

## Language rules

- The URL is the single source of language state.
- An explicit choice is stored in the neutral `lang` cookie and always beats
  detection. The old `devguru-lang` key is read once and migrated.
- With no cookie, `Accept-Language` may suggest Korean on `/` via a 302.
- Location alone never forces a language; `cf-ipcountry` is not consulted.
- `html lang`, `canonical`, and `hreflang` always match the URL's language.

## Deploy

Cloudflare Pages, connected to this repo:

- Build command: `npm run build`
- Output directory: `dist`
- Production domain: `devguru-j.com`

`astro preview` cannot exercise Pages Functions, `_redirects`, or real HTTP
status codes. Before promoting a build, check these on a Cloudflare Preview
deployment:

- an unknown URL returns a real `404`
- `/privacy` and `/support` redirect exactly once
- `www` and `*.pages.dev` normalise to the canonical host, preserving path and query
- `/` language routing honours the cookie over `Accept-Language`

## Deliberate compatibility exceptions

These are current, verified, and intentionally unchanged:

- `devguru-j.com` remains the canonical domain. The rebrand ships on the
  existing domain first; the domain move is a later, separate phase.
- `devguru.j610@gmail.com` remains the published contact address, because it is
  the address registered with App Store Connect.
- `/MonkeyFlash/...` keeps its capitalisation — those exact URLs are already
  submitted to Apple.

## Not yet resolved

- No GitHub or social profile is published, so `sameAs` is omitted from the
  `Organization` JSON-LD.

Internal planning material lives in `reference/` and is git-ignored.
