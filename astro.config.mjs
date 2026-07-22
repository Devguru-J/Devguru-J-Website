// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Canonical origin. The domain migration is a later phase, so the existing
// domain stays canonical (rebranding plan §21.2, §29).
const SITE = 'https://devguru-j.com';

export default defineConfig({
  site: SITE,

  // One canonical URL shape site-wide, so canonical links and `_redirects`
  // targets never trigger a second hop (§21.3).
  trailingSlash: 'always',

  integrations: [
    sitemap({
      // The 404 is noindex and must not be advertised.
      filter: (page) => !page.includes('/404'),
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', ko: 'ko-KR' },
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
