import type { Lang } from './config/site';

export type { Lang };

/**
 * Presentational copy only.
 *
 * Operational facts (domain, email, prices, store URLs, product status) live in
 * `src/config/site.ts` and are never duplicated here (§13.1, §24.4).
 *
 * Korean and English keys are symmetric by construction: `ko` is typed against
 * the shape of `en`, so a missing or extra key is a type error.
 */
const en = {
  meta: {
    siteName: 'Memory',
    title: 'Memory — Independent Software Engineering Studio',
    description:
      'Memory is an independent engineering studio building useful, well-made software for desktop, web, cloud, and emerging platforms.',
    ogTitle: 'Memory — Software that earns its place',
    ogImageAlt: 'Memory — independent software engineering studio',
    /** Page title suffix rule (§20.2): `[Page] — Memory`. */
    titleSuffix: 'Memory',
  },

  nav: {
    links: [
      { href: '#work', label: 'Work' },
      { href: '#studio', label: 'Studio' },
      { href: '#contact', label: 'Contact' },
    ],
    langLabel: '한국어',
    langAria: 'View in Korean',
    currentLang: 'Current language: English',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    home: 'Memory home',
    skip: 'Skip to content',
  },

  hero: {
    label: 'INDEPENDENT SOFTWARE ENGINEERING STUDIO',
    headline: 'Software that earns its place.',
    para: 'Memory designs and builds products for desktop, web, cloud, and emerging platforms. We choose the right features, then make them work as they should.',
    ctaPrimary: 'View the work',
    ctaSecondary: 'About the studio',
  },

  work: {
    heading: 'Selected work',
    intro: 'Products and selected client work, shaped around real use.',
    kindProduct: 'Product',
    kindClient: 'Client work',
    monkeyFlash: {
      kind: 'Product · macOS focus utility',
      desc: 'A macOS utility that keeps the active window bright and dims the rest of the desktop, without Screen Recording or Accessibility access.',
      evidence: ['No system permissions', '1% dimming control', 'Hold Fn to reveal'],
      cta: 'View on the App Store',
      alt: 'Monkey Flash on macOS, with the active window bright and the rest of the desktop dimmed.',
    },
    kbInc: {
      kind: 'Client work · Corporate website',
      desc: 'A bilingual industrial website redesigned around three essential tasks: finding products, reading catalogues, and reaching the sales team.',
      evidence: ['Static Astro build', 'Korean & English', 'Catalogues & enquiries'],
      cta: 'Visit site ↗',
      alt: 'KB Inc. homepage introducing its air-suspension products.',
    },
  },

  capabilities: {
    heading: 'Capabilities',
    intro: 'Current work centers on desktop and web. The scope extends to cloud systems, automation, and new platforms when the product calls for it.',
    currentLabel: 'Current focus',
    extendedLabel: 'Extended scope',
    items: [
      {
        title: 'Desktop apps',
        body: 'Fast, dependable applications that feel at home on the operating system, from first launch to everyday use.',
        current: true,
      },
      {
        title: 'Web products',
        body: 'Fast, accessible web products—from focused sites to applications for complex operational work.',
        current: true,
      },
      {
        title: 'Focused tools',
        body: 'Focused utilities for repetitive or technical work, with a narrow scope and an interface designed to become familiar quickly.',
        current: true,
      },
      {
        title: 'Cloud systems',
        body: 'APIs, data flows, and deployment designed as one operational system, with observability and recovery built in.',
        current: false,
      },
      {
        title: 'Automation',
        body: 'Repeatable workflows that remove manual handoffs, make failures visible, and recover cleanly.',
        current: false,
      },
      {
        title: 'New platforms',
        body: 'Early product work for new devices and interaction models, built around what the platform makes possible.',
        current: false,
      },
    ],
  },

  process: {
    heading: 'How we work',
    steps: [
      {
        title: 'Define the job first.',
        body: 'Before features, identify where the work breaks down and what the user needs to finish.',
      },
      {
        title: 'Keep design and engineering together.',
        body: 'Interface, data, performance, and accessibility are decisions about the same product.',
      },
      {
        title: 'Prove the core early.',
        body: 'Get the essential path working, then refine it with evidence from real use.',
      },
      {
        title: 'Plan for life after launch.',
        body: 'Updates, support, and a clear end-of-life path are part of the product.',
      },
    ],
  },

  philosophy: 'The product steps back. The work moves forward.',

  studio: {
    heading: 'The studio',
    paras: [
      'Memory is an independent software studio for useful, well-made products. Design and engineering move together, from the first decision to the last detail.',
      'Feature count is not the measure. Performance, reliability, accessibility, and interaction are designed together from the outset, because each one changes how the product works.',
      'The name has two roots: the human instinct to return to what works, and computer memory—the working space behind every operation. It is not a storage-service promise.',
      'Memory began as a one-person studio, stated plainly. Its scope can grow; its standard should not: useful software that stays out of the user’s way.',
    ],
  },

  closing: 'The next product starts with a clear job.',

  contact: {
    label: 'CONTACT',
    heading: 'Have a problem worth solving?',
    body: 'For product collaborations, technical challenges, or questions about the work, send a note.',
    cta: 'Send an email',
  },

  footer: {
    brandLine: 'Memory — Independent Software Studio',
    desc: 'Software for desktop, web, cloud, and emerging platforms.',
    exploreLabel: 'Explore',
    elsewhereLabel: 'Elsewhere',
    explore: [
      { href: '#work', label: 'Work' },
      { href: '#capabilities', label: 'Capabilities' },
      { href: '#how-we-work', label: 'How we work' },
      { href: '#studio', label: 'Studio' },
    ],
    emailLabel: 'Email',
    legalLabel: 'Legal',
    privacy: 'Monkey Flash Privacy',
    support: 'Monkey Flash Support',
    rights: 'All rights reserved.',
  },

  /** Product/work status labels (§13.3). Always read as text, never colour alone. */
  status: {
    available: 'Available',
    inDevelopment: 'In development',
    experimental: 'Experimental',
    comingSoon: 'Coming soon',
    inReview: 'In review',
    maintained: 'Maintained',
    discontinued: 'Discontinued',
    supportEnded: 'Support ended',
    live: 'Live',
  },

  a11y: {
    statusPrefix: 'Status:',
    newTab: 'Opens in a new tab',
    updated: 'Updated {date}',
    version: 'Version {version}',
    requires: 'Requires {os} or later',
  },

  notFound: {
    title: 'This page isn’t here.',
    body: 'It may have moved, or the address may be incorrect. Start again from the homepage.',
    cta: 'Back to home',
    metaTitle: 'Page not found — Memory',
  },

  legal: {
    privacyTitle: 'Monkey Flash Privacy Policy — Memory',
    supportTitle: 'Monkey Flash Support — Memory',
    backHome: 'Back to home',
  },
} as const;

/** Korean copy. Typed against `en` so both languages stay structurally identical. */
const ko: Structural<typeof en> = {
  meta: {
    siteName: '기억',
    title: '기억 — 소프트웨어 엔지니어링 스튜디오',
    description:
      '기억은 데스크톱, 웹, 클라우드와 새로운 플랫폼을 위한 쓸모 있는 소프트웨어를 설계하고 만드는 독립 스튜디오입니다.',
    ogTitle: '기억 — 제 몫을 다하는 소프트웨어',
    ogImageAlt: '기억 — 독립 소프트웨어 엔지니어링 스튜디오',
    titleSuffix: '기억',
  },

  nav: {
    links: [
      { href: '#work', label: '작업' },
      { href: '#studio', label: '스튜디오' },
      { href: '#contact', label: '문의' },
    ],
    langLabel: 'English',
    langAria: '영어로 보기',
    currentLang: '현재 언어: 한국어',
    openMenu: '메뉴 열기',
    closeMenu: '메뉴 닫기',
    home: '기억 홈',
    skip: '본문으로 건너뛰기',
  },

  hero: {
    label: '독립 소프트웨어 엔지니어링 스튜디오',
    headline: '제 몫을 다하는 소프트웨어.',
    para: '기억은 데스크톱, 웹, 클라우드와 새로운 플랫폼을 위한 제품을 설계하고 개발합니다. 기능을 늘리기보다, 필요한 기능이 정확히 작동하도록 끝까지 다듬습니다.',
    ctaPrimary: '제품과 작업 보기',
    ctaSecondary: '스튜디오 소개',
  },

  work: {
    heading: '제품과 작업',
    intro: '직접 만드는 제품과 실제 사용 환경에 맞춰 설계한 작업을 소개합니다.',
    kindProduct: '제품',
    kindClient: '프로젝트',
    monkeyFlash: {
      kind: '제품 · macOS 집중 도구',
      desc: '활성 창은 밝게 두고 나머지 화면만 어둡게 해, 한 가지 일에 집중하도록 돕는 macOS 앱입니다. 화면 기록이나 손쉬운 사용 권한 없이 작동합니다.',
      evidence: ['시스템 권한 없음', '1% 단위 조절', 'Fn으로 잠시 해제'],
      cta: 'App Store에서 보기',
      alt: 'Monkey Flash를 실행한 macOS 화면. 활성 창은 밝고 나머지 영역은 어둡게 표시되어 있다.',
    },
    kbInc: {
      kind: '프로젝트 · 기업 웹사이트',
      desc: '제품을 찾고, 카탈로그를 읽고, 영업팀에 문의하는 흐름을 한국어와 영어로 다시 설계했습니다.',
      evidence: ['Astro 정적 빌드', '한국어·영어', '카탈로그·문의'],
      cta: '사이트 방문 ↗',
      alt: '케이비 홈페이지에서 에어서스펜션 제품을 소개하는 첫 화면.',
    },
  },

  capabilities: {
    heading: '만드는 영역',
    intro: '현재는 데스크톱 앱과 웹 제품을 중심으로 만듭니다. 문제에 따라 클라우드, 자동화, 새로운 플랫폼까지 범위를 넓힙니다.',
    currentLabel: '현재 중심',
    extendedLabel: '확장 범위',
    items: [
      {
        title: '데스크톱 앱',
        body: '운영체제의 흐름을 존중하는 빠르고 안정적인 앱을 만듭니다. 설치, 설정, 업데이트까지 사용 경험 전체를 다룹니다.',
        current: true,
      },
      {
        title: '웹 제품',
        body: '정보를 보여주는 사이트부터 복잡한 업무를 다루는 웹 앱까지, 빠르고 접근하기 쉽게 설계하고 개발합니다.',
        current: true,
      },
      {
        title: '도구',
        body: '반복해서 쓰는 작은 유틸리티와 개발자 도구를 만듭니다. 기능은 좁게 잡고, 자주 쓸수록 더 빠르게 손에 익도록 다듬습니다.',
        current: true,
      },
      {
        title: '클라우드 시스템',
        body: 'API, 데이터 흐름, 배포 환경을 하나의 운영 체계로 설계합니다. 장애를 알아차리고 복구하기 쉬운 구조를 우선합니다.',
        current: false,
      },
      {
        title: '자동화',
        body: '사람이 매번 옮기고 확인하던 일을 정확한 흐름으로 바꿉니다. 실패를 알아차리고 다시 이어 갈 방법까지 설계합니다.',
        current: false,
      },
      {
        title: '새로운 플랫폼',
        body: '새로운 기기와 입력 방식에서는 익숙한 화면을 옮기기보다, 그 환경에서만 가능한 쓰임부터 찾습니다.',
        current: false,
      },
    ],
  },

  process: {
    heading: '일하는 방식',
    steps: [
      {
        title: '할 일을 먼저 정합니다.',
        body: '기능 목록보다 먼저 누가 어디에서 막히고, 무엇을 끝내야 하는지 살핍니다.',
      },
      {
        title: '설계와 개발을 나누지 않습니다.',
        body: '화면, 데이터, 성능, 접근성을 한 제품의 결정으로 다룹니다.',
      },
      {
        title: '핵심부터 작동시킵니다.',
        body: '가장 중요한 흐름을 먼저 만들고, 실제 사용에서 얻은 근거로 다듬습니다.',
      },
      {
        title: '출시 뒤까지 생각합니다.',
        body: '업데이트, 지원, 종료 방식까지 제품의 일부로 설계합니다.',
      },
    ],
  },

  philosophy: '제품은 눈에 띄기보다, 일이 잘 끝나게 해야 합니다.',

  studio: {
    heading: '스튜디오',
    paras: [
      '기억은 데스크톱, 웹, 클라우드와 새로운 플랫폼을 위한 소프트웨어를 만드는 독립 스튜디오입니다. 디자인과 엔지니어링을 한 흐름으로 다루며, 필요한 기능이 정확히 작동할 때까지 다듬습니다.',
      '기능의 수보다 필요한 기능이 정확히 작동하는지를 중요하게 봅니다. 성능, 안정성, 접근성, 인터랙션은 마지막에 보태는 마감이 아니라 처음부터 설계해야 할 제품의 일부입니다.',
      '이름은 저장 서비스를 뜻하지 않습니다. 사람에게는 다시 찾게 되는 경험을, 컴퓨터에는 모든 동작을 받치는 작업 공간을 가리킵니다. 두 의미는 쓰는 동안 방해하지 않고, 시간이 지나도 다시 선택할 만한 제품이라는 하나의 기준으로 이어집니다.',
      '기억은 한 사람의 독립 스튜디오에서 시작했습니다. 규모를 부풀리지 않고 맡은 범위를 끝까지 책임집니다. 앞으로 제품과 협업의 범위가 넓어져도 이 기준은 바뀌지 않습니다.',
    ],
  },

  closing: '필요한 일을 더 분명하게 만드는 제품을 찾습니다.',

  contact: {
    label: '문의',
    heading: '함께 풀 문제가 있나요?',
    body: '제품 협업이나 기술적인 문제, 작업에 관한 질문이라면 메일을 보내 주세요.',
    cta: '이메일 보내기',
  },

  footer: {
    brandLine: '기억 — 독립 소프트웨어 스튜디오',
    desc: '데스크톱, 웹, 클라우드와 새로운 플랫폼을 위한 소프트웨어를 만듭니다.',
    exploreLabel: '둘러보기',
    elsewhereLabel: '연결',
    explore: [
      { href: '#work', label: '작업' },
      { href: '#capabilities', label: '만드는 영역' },
      { href: '#how-we-work', label: '일하는 방식' },
      { href: '#studio', label: '스튜디오' },
    ],
    emailLabel: '이메일',
    legalLabel: '법적 고지',
    privacy: 'Monkey Flash 개인정보처리방침',
    support: 'Monkey Flash 지원',
    rights: '모든 권리 보유.',
  },

  status: {
    available: '이용 가능',
    inDevelopment: '개발 중',
    experimental: '실험 단계',
    comingSoon: '출시 예정',
    inReview: '심사 중',
    maintained: '유지보수 중',
    discontinued: '제공 종료',
    supportEnded: '지원 종료',
    live: '운영 중',
  },

  a11y: {
    statusPrefix: '상태:',
    newTab: '새 탭에서 열림',
    updated: '{date} 업데이트',
    version: '버전 {version}',
    requires: '{os} 이상 필요',
  },

  notFound: {
    title: '찾으시는 페이지가 없습니다.',
    body: '주소가 바뀌었거나 페이지가 사라졌을 수 있습니다. 홈페이지에서 다시 찾아보세요.',
    cta: '홈으로 돌아가기',
    metaTitle: '페이지를 찾을 수 없습니다 — 기억',
  },

  legal: {
    privacyTitle: 'Monkey Flash 개인정보처리방침 — 기억',
    supportTitle: 'Monkey Flash 지원 — 기억',
    backHome: '홈으로 돌아가기',
  },
};

/**
 * Mirrors a copy tree's shape while letting every leaf string differ.
 * Guarantees Korean and English stay key-for-key symmetric (§26 phase 2).
 */
type Structural<T> = T extends readonly (infer E)[]
  ? Structural<E>[]
  : T extends string
    ? string
    : T extends boolean
      ? boolean
      : { -readonly [K in keyof T]: Structural<T[K]> };

export const translations = { en, ko } as const;

/** Fill `{token}` placeholders in an a11y/microcopy string. */
export const format = (template: string, values: Record<string, string>): string =>
  template.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
