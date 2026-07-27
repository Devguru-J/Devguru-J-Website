export const LOCALES = ['ko', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'ko';

/** Korean lives at the root; English is prefixed. */
export function localePath(locale: Locale, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return locale === 'ko' ? clean : `/en${clean === '/' ? '/' : clean}`;
}

/** The same page in the other language. */
export function alternatePath(locale: Locale, path: string): string {
  return localePath(locale === 'ko' ? 'en' : 'ko', path);
}

export const HTML_LANG: Record<Locale, string> = {
  ko: 'ko',
  en: 'en',
};

/** A `t.ko` / `t.en` pair. Every user-facing string on the site is one. */
export type Bilingual<T = string> = Record<Locale, T>;

export function pick<T>(value: Bilingual<T>, locale: Locale): T {
  return value[locale];
}
