import type { APIRoute } from 'astro';
import { PROJECTS } from '../content/projects';
import { LOCALES, localePath } from '../lib/i18n';

/**
 * Static route inventory, maintained alongside src/pages rather than crawled.
 * The `next-product` legacy notice is deliberately absent: it is noindex,
 * canonicalised to Work, and is not counted as public work.
 */
const bilingualRoutes = [
  '/',
  '/work/',
  ...PROJECTS.map((project) => `/portfolio/${project.slug}/`),
];

/** Bilingual single routes — one URL, self-canonical, no hreflang pair. */
const sharedRoutes = ['/MonkeyFlash/privacy/', '/MonkeyFlash/support/'];

export const GET: APIRoute = ({ site }) => {
  const urls: { loc: string; alternates?: { hreflang: string; href: string }[] }[] =
    [];

  for (const route of bilingualRoutes) {
    for (const locale of LOCALES) {
      urls.push({
        loc: new URL(localePath(locale, route), site).toString(),
        alternates: [
          { hreflang: 'ko', href: new URL(localePath('ko', route), site).toString() },
          { hreflang: 'en', href: new URL(localePath('en', route), site).toString() },
          {
            hreflang: 'x-default',
            href: new URL(localePath('ko', route), site).toString(),
          },
        ],
      });
    }
  }

  for (const route of sharedRoutes) {
    urls.push({ loc: new URL(route, site).toString() });
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
${(url.alternates ?? [])
  .map(
    (a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}"/>`,
  )
  .join('\n')}
  </url>`,
  )
  .join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
