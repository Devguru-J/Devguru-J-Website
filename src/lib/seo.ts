import { BRAND } from '../content/brand';
import { localePath, type Locale } from './i18n';

export const SITE_ORIGIN = BRAND.origin;

export interface SeoInput {
  /** Locale-agnostic path, e.g. `/work/`. Used for canonical and alternates. */
  path: string;
  locale: Locale;
  title: string;
  description: string;
  image?: string;
  robots?: string;
  /** Set when the route exists once for both languages (legal pages). */
  singleRoute?: boolean;
  /** Explicit canonical override, e.g. the legacy notice pages. */
  canonical?: string;
}

export interface SeoOutput {
  canonical: string;
  alternates: { hreflang: string; href: string }[];
  ogImage: string;
  robots: string;
}

export function buildSeo(input: SeoInput): SeoOutput {
  // A bilingual single route (privacy, support, 404) has exactly one URL and
  // must never pick up a locale prefix or emit a hreflang pair pointing at
  // itself twice.
  const canonical =
    input.canonical ??
    absolute(
      input.singleRoute ? withSlash(input.path) : localePath(input.locale, input.path),
    );

  const alternates = input.singleRoute
    ? []
    : [
        { hreflang: 'ko', href: absolute(localePath('ko', input.path)) },
        { hreflang: 'en', href: absolute(localePath('en', input.path)) },
        { hreflang: 'x-default', href: absolute(localePath('ko', input.path)) },
      ];

  return {
    canonical,
    alternates,
    ogImage: absolute(input.image ?? defaultOgImage(input.locale)),
    robots: input.robots ?? 'index,follow',
  };
}

export function absolute(path: string): string {
  return new URL(path, SITE_ORIGIN).href;
}

/** Canonical URLs on this site always end in a slash (except file routes). */
function withSlash(path: string): string {
  if (path.endsWith('/') || path.includes('.')) return path;
  return `${path}/`;
}

function defaultOgImage(locale: Locale): string {
  return locale === 'ko' ? '/assets/og-cover-ko.jpg' : '/assets/og-cover-en.jpg';
}
