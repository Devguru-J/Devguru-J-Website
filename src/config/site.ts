/**
 * Single source of operational fact.
 *
 * Rules (rebranding plan §0.4, §24.4):
 *  - Nothing in here may be guessed. Every value is either verified or `null`.
 *  - `null` means "not confirmed yet" — consumers must omit the claim from the
 *    page rather than invent a substitute.
 *  - Presentational copy lives in `src/i18n.ts`. Facts live here. They never
 *    duplicate each other.
 */

export type Lang = 'en' | 'ko';

/** Product/work status keys. Rendered via `translations[lang].status[...]` (§13.3). */
export type Status =
  | 'available'
  | 'inDevelopment'
  | 'experimental'
  | 'comingSoon'
  | 'inReview'
  | 'maintained'
  | 'discontinued'
  | 'supportEnded'
  | 'live';

/** Canonical origin. Domain migration is a later phase — the old domain stays canonical. */
export const SITE_ORIGIN = 'https://devguru-j.com';

/** Host normalisation target used by the Cloudflare middleware. */
export const CANONICAL_HOST = 'devguru-j.com';

/** Contact address shown on the site and in the Monkey Flash legal pages. */
export const EMAIL = 'devguru.j610@gmail.com';

/**
 * Verified public profiles only (§20.3 `sameAs`).
 * Empty: the GitHub account is deliberately not published on the site.
 */
export const SAME_AS: readonly string[] = [];

/** Brand name per language. Never shown side-by-side outside brand guidelines (§16.4). */
export const BRAND: Record<Lang, string> = {
  en: 'Memory',
  ko: '기억',
};

/** Copyright holder. Confirmed: the brand name itself is the holder. */
export const LEGAL_ENTITY: Record<Lang, string> = {
  en: 'Memory',
  ko: '기억',
};

export interface ProductPrice {
  /** ISO 4217 code. */
  currency: string;
  /** Pre-formatted, exactly as the App Store displays it. */
  formatted: string;
}

/** Intrinsic dimensions travel with the asset so nothing can shift on load. */
export interface Media {
  src: string;
  width: number;
  height: number;
}

export interface Product {
  id: string;
  /** Product names stay independent of the studio name (§16.4). */
  name: string;
  platform: Record<Lang, string>;
  status: Status;
  /** Verified against the App Store lookup API on 2026-07-22. */
  version: string | null;
  /** ISO date of the current version's release. */
  updated: string | null;
  minimumOs: string | null;
  /** Per-storefront links and prices; `null` where not verified. */
  storeUrl: Record<Lang, string> | null;
  price: Record<Lang, ProductPrice> | null;
  image: Media;
}

export interface ClientWork {
  id: string;
  name: Record<Lang, string>;
  kind: Record<Lang, string>;
  status: Status;
  url: string | null;
  image: Media;
}

/**
 * Monkey Flash — verified 2026-07-22 via
 * https://itunes.apple.com/lookup?id=6790402017&entity=macSoftware
 */
export const MONKEY_FLASH: Product = {
  id: 'monkey-flash',
  name: 'Monkey Flash',
  platform: { en: 'macOS', ko: 'macOS' },
  status: 'available',
  version: '1.0',
  updated: '2026-07-21',
  minimumOs: 'macOS 13.0',
  storeUrl: {
    en: 'https://apps.apple.com/us/app/monkey-flash/id6790402017?mt=12',
    ko: 'https://apps.apple.com/kr/app/monkey-flash/id6790402017?mt=12',
  },
  price: {
    en: { currency: 'USD', formatted: '$1.99' },
    ko: { currency: 'KRW', formatted: '₩3,300' },
  },
  // Cropped from the verified screenshot to remove the baked-in Korean
  // marketing overlay, so one shot is correct on both locales (§24.3).
  image: { src: '/assets/work-monkeyflash-product.jpg', width: 1024, height: 880 },
};

/** KB Inc. — client work, disclosure confirmed by the client. */
export const KB_INC: ClientWork = {
  id: 'kb-inc',
  name: { en: 'KB Inc.', ko: '케이비(주)' },
  kind: { en: 'Corporate website', ko: '기업 웹사이트' },
  status: 'live',
  url: 'https://kbinc.kr',
  image: { src: '/assets/work-kbinc.jpg', width: 1600, height: 900 },
};

export const PRODUCTS = [MONKEY_FLASH] as const;
export const CLIENT_WORK = [KB_INC] as const;

/** Language-neutral cookie key. `devguru-lang` is read once for backwards compatibility (§7.4). */
export const LANG_COOKIE = 'lang';
export const LEGACY_LANG_KEY = 'devguru-lang';

/** Locale-aware home path. */
export const homePath = (lang: Lang): string => (lang === 'ko' ? '/ko/' : '/');

/** Absolute URL for a site-relative path. */
export const absolute = (path: string): string => new URL(path, SITE_ORIGIN).href;
