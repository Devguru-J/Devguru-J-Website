import type { Bilingual } from '../lib/i18n';

export interface NavItem {
  label: Bilingual;
  /** Locale-agnostic path; the locale prefix is applied at render time. */
  path: string;
  /** Home-page section anchor. Reached as `{home}#{anchor}` from other routes. */
  anchor?: string;
}

/* 03-information-architecture.md §3. Four links, no more. */
export const PRIMARY_NAV: NavItem[] = [
  { label: { ko: '작업', en: 'Work' }, path: '/work/' },
  { label: { ko: '만드는 방식', en: 'Approach' }, path: '/', anchor: 'approach' },
  { label: { ko: '스튜디오', en: 'Studio' }, path: '/', anchor: 'studio' },
  { label: { ko: '문의', en: 'Contact' }, path: '/', anchor: 'contact' },
];

/** Footer directory — capped at four by 07 §3.6. */
export const FOOTER_DIRECTORY: NavItem[] = [
  { label: { ko: '홈', en: 'Home' }, path: '/' },
  { label: { ko: '작업', en: 'Work' }, path: '/work/' },
  { label: { ko: '만드는 방식', en: 'Approach' }, path: '/', anchor: 'approach' },
  { label: { ko: '문의', en: 'Contact' }, path: '/', anchor: 'contact' },
];
