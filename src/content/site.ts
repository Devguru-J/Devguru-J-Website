/**
 * Single source of truth for every fact and string on the marketing site.
 *
 * Every claim here traces to reference/remodelling/memory-business-site-2026/
 * 01-content-audit.md. Nothing is added that the audit does not support:
 * no metrics, no team size, no client results, no locations, no years that
 * were never verified.
 */

export type Locale = 'ko' | 'en';

export const LOCALES = ['ko', 'en'] as const;

/** Korean lives at the root; English is prefixed. */
export function localeHref(locale: Locale, path: string): string {
  return locale === 'ko' ? path : `/en${path}`;
}

/** The same page in the other language. */
export function alternateHref(locale: Locale, path: string): string {
  return localeHref(locale === 'ko' ? 'en' : 'ko', path);
}

export const EMAIL = 'devguru.j610@gmail.com';
export const GITHUB = 'https://github.com/Devguru-J';
export const APP_STORE = 'https://apps.apple.com/kr/app/monkey-flash/id6790402017?mt=12';
export const KBINC = 'https://kbinc.kr';

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

type ProjectCopy = {
  title: string;
  category: string;
  /** one line, used on the home and work index */
  summary: string;
  /** case-study lead, kept under 42ch per line-length rule */
  lead: string;
  /** metadata rows: label + value */
  facts: { label: string; value: string }[];
  context: { heading: string; body: string[] };
  decisions: { title: string; body: string }[];
  scope: { heading: string; items: string[] };
  cta: string;
  mediaAlt: string;
  galleryAlt: string[];
  meta: { title: string; description: string };
};

export type Project = {
  slug: string;
  index: string;
  href: string;
  external: string;
  /** overview media + intrinsic size, ratio per 04-visual-direction §5 */
  media: { src: string; width: number; height: number };
  preview: string;
  gallery: { src: string; width: number; height: number }[];
  ko: ProjectCopy;
  en: ProjectCopy;
};

export const projects: Project[] = [
  {
    slug: 'monkey-flash',
    index: '01',
    href: '/portfolio/monkey-flash/',
    external: APP_STORE,
    media: { src: '/assets/work-monkeyflash.jpg', width: 1600, height: 1000 },
    preview: '/assets/media/preview-monkey-flash.jpg',
    gallery: [
      { src: '/assets/settings-visual.png', width: 794, height: 754 },
      { src: '/assets/editorial/monkeyflash-detail-settings.jpg', width: 800, height: 800 },
      { src: '/assets/menu-popover.png', width: 322, height: 260 },
    ],
    ko: {
      title: 'Monkey Flash',
      category: '제품 · macOS',
      summary: '활성 창만 밝게 두고 나머지 화면을 조용히 낮추는 macOS 집중 도구.',
      lead: '활성 창만 밝게 두고 나머지 화면을 조용히 낮춰, 지금 하는 일에 시선을 모으는 macOS 집중 도구입니다.',
      facts: [
        { label: '분류', value: '자체 제품' },
        { label: '플랫폼', value: 'macOS 13 이상 · Apple Silicon' },
        { label: '역할', value: '제품 방향 · 인터페이스 · 개발 · 출시' },
        { label: '상태', value: 'App Store 공개' },
      ],
      context: {
        heading: '권한을 요구하지 않는 집중 도구',
        body: [
          '창이 쌓일수록 지금 보고 있는 창이 어디인지 흐려집니다. 화면을 어둡게 하는 도구는 이미 있지만, 대부분 화면 기록이나 손쉬운 사용, 입력 모니터링 권한을 먼저 요구합니다.',
          'Monkey Flash는 그 권한을 하나도 요구하지 않고 같은 결과를 만드는 것을 첫 번째 조건으로 두고 시작했습니다. 무엇을 더 넣을지보다, 무엇을 요구하지 않을지를 먼저 정한 제품입니다.',
        ],
      },
      decisions: [
        {
          title: '권한 없이 동작하는 구조',
          body: '딤 레이어가 활성 창을 쫓아다니는 대신 창 순서 아래에 놓이도록 만들었습니다. 창 좌표를 추적할 필요가 없어져 화면 기록·손쉬운 사용·입력 모니터링 권한이 모두 불필요해졌습니다.',
        },
        {
          title: '밝기처럼 다루는 조절',
          body: '딤 강도는 1% 단위로 조절하고, 라이트와 다크 모드의 강도를 따로 저장합니다. 메뉴바에서 바로 조절할 수 있어 설정 창을 열지 않아도 됩니다.',
        },
        {
          title: '작업 방식에 맞춘 범위',
          body: '활성 창만, 활성 앱의 모든 창, 화면마다 하이라이트 중에서 고를 수 있습니다. Fn 키로 잠시 해제하고, 특정 앱은 제외하고, 멀티 디스플레이에서 어떤 화면을 낮출지 정합니다.',
        },
      ],
      scope: {
        heading: '전달 범위',
        items: [
          '제품 방향과 기능 기준 설정',
          '인터페이스 설계와 설정 구조',
          'macOS 애플리케이션 개발',
          'App Store 출시와 심사 대응',
          '한국어·영어 지원, 개인정보처리방침·지원 페이지 운영',
        ],
      },
      cta: 'App Store에서 보기',
      mediaAlt:
        'macOS에서 실행 중인 Monkey Flash. 활성 창은 밝고 나머지 화면은 어둡게 표시되어 있습니다.',
      galleryAlt: [
        'Monkey Flash 화면 설정. 딤 강도와 디밍 속도를 조절하는 슬라이더가 보입니다.',
        'Monkey Flash 화면 설정의 하이라이트 모드와 다중 디스플레이 옵션.',
        'Monkey Flash 메뉴바 팝오버. 인라인 슬라이더로 강도를 조절합니다.',
      ],
      meta: {
        title: 'Monkey Flash — 기억',
        description:
          '활성 창만 밝게 두고 나머지 화면을 낮추는 macOS 집중 도구. 화면 기록·손쉬운 사용·입력 모니터링 권한 없이 작동합니다.',
      },
    },
    en: {
      title: 'Monkey Flash',
      category: 'Product · macOS',
      summary: 'A macOS focus tool that keeps the active window bright and quietly lowers the rest.',
      lead: 'A macOS focus tool that keeps the active window bright and quietly lowers the rest of the screen, so attention stays where the work is.',
      facts: [
        { label: 'Type', value: 'Own product' },
        { label: 'Platform', value: 'macOS 13+ · Apple Silicon' },
        { label: 'Role', value: 'Direction · Interface · Engineering · Release' },
        { label: 'Status', value: 'Published on the App Store' },
      ],
      context: {
        heading: 'A focus tool that asks for nothing',
        body: [
          'The more windows stack up, the harder it is to tell which one you are actually working in. Tools that dim the desktop already exist, but most of them begin by asking for Screen Recording, Accessibility, or Input Monitoring.',
          'Monkey Flash started from the opposite condition: reach the same result while requesting none of them. Deciding what the product would never ask for came before deciding what it would add.',
        ],
      },
      decisions: [
        {
          title: 'Permission-free by construction',
          body: 'Instead of chasing the active window, the dimming layer sits beneath it in window order. Nothing needs to track window coordinates, which removes the Screen Recording, Accessibility, and Input Monitoring requirements entirely.',
        },
        {
          title: 'Adjusted like brightness',
          body: 'Dim strength moves in 1% steps and light and dark mode keep separate values. The menu bar carries the same control, so the settings window is optional.',
        },
        {
          title: 'Scoped to how people work',
          body: 'Highlight the active window, every window of the active app, or one window per display. Hold Fn to pause, exclude specific apps, and decide which displays get dimmed.',
        },
      ],
      scope: {
        heading: 'Delivered',
        items: [
          'Product direction and feature criteria',
          'Interface design and settings structure',
          'macOS application engineering',
          'App Store submission and review',
          'Korean and English, plus the privacy and support pages',
        ],
      },
      cta: 'View on the App Store',
      mediaAlt:
        'Monkey Flash running on macOS with the active window bright and the rest of the screen dimmed.',
      galleryAlt: [
        'Monkey Flash display settings with sliders for dim strength and fade speed.',
        'Monkey Flash highlight modes and multi-display options.',
        'The Monkey Flash menu bar popover with an inline strength slider.',
      ],
      meta: {
        title: 'Monkey Flash — Memory',
        description:
          'A macOS focus tool that keeps the active window bright and dims the rest. Works without Screen Recording, Accessibility, or Input Monitoring permissions.',
      },
    },
  },
  {
    slug: 'kbinc',
    index: '02',
    href: '/portfolio/kbinc/',
    external: KBINC,
    media: { src: '/assets/work-kbinc.jpg', width: 1600, height: 900 },
    preview: '/assets/media/preview-kbinc.jpg',
    gallery: [
      { src: '/assets/editorial/kbinc-panel-overview.jpg', width: 1000, height: 1250 },
      { src: '/assets/editorial/kbinc-panel-detail.jpg', width: 1000, height: 1000 },
      { src: '/assets/editorial/kbinc-panel-mobile.jpg', width: 1000, height: 1000 },
    ],
    ko: {
      title: '케이비(주)',
      category: '의뢰 작업 · 웹',
      summary: '제품 탐색부터 카탈로그와 문의까지, 핵심 흐름을 한·영으로 정리한 기업 웹사이트.',
      lead: '제품 탐색, 카탈로그 열람, 문의까지 핵심 흐름을 한국어와 영어로 정리한 케이비(주)의 기업 웹사이트입니다.',
      facts: [
        { label: '분류', value: '의뢰 작업' },
        { label: '플랫폼', value: '웹 · Astro 정적 사이트' },
        { label: '역할', value: '정보 구조 · 화면 설계 · 개발 · 배포' },
        { label: '상태', value: 'kbinc.kr 공개 운영' },
      ],
      context: {
        heading: '찾고, 확인하고, 묻는 순서',
        body: [
          '산업용·특장차 부품은 제품군이 넓고, 문의로 넘어가기 전에 카탈로그를 먼저 확인하는 일이 많습니다. 방문자가 실제로 밟는 순서는 제품을 찾고, 자료를 확인하고, 담당자에게 묻는 세 단계였습니다.',
          '그래서 회사 소개를 앞세우는 대신 이 세 흐름을 사이트의 뼈대로 두고, 한국어와 영어를 같은 구조 위에서 제공했습니다.',
        ],
      },
      decisions: [
        {
          title: '세 흐름을 뼈대로',
          body: '제품 탐색, 카탈로그 열람과 다운로드, 문의를 사이트의 기본 축으로 두었습니다. 그 밖의 내용은 이 세 흐름을 방해하지 않는 위치에 배치했습니다.',
        },
        {
          title: '언어가 바뀌어도 같은 길',
          body: '한국어와 영어가 같은 정보 구조와 같은 경로를 공유합니다. 언어를 바꾼다고 해서 찾던 자료의 위치가 달라지지 않습니다.',
        },
        {
          title: '정적 사이트로 유지',
          body: 'Astro 정적 출력으로 만들어 서버 런타임 없이 배포합니다. 페이지가 빠르게 열리고, 이후 자료를 갱신하는 부담이 작습니다.',
        },
      ],
      scope: {
        heading: '전달 범위',
        items: [
          '정보 구조와 탐색 설계',
          '화면 설계와 프런트엔드 개발',
          '제품·카탈로그·문의 흐름 구현',
          '한국어·영어 콘텐츠 구조',
          '정적 사이트 빌드와 배포',
        ],
      },
      cta: 'kbinc.kr 방문하기',
      mediaAlt:
        '산업용 차량 부품과 탐색 메뉴를 보여 주는 케이비(주) 홈페이지 첫 화면입니다.',
      galleryAlt: [
        '케이비(주) 홈페이지 첫 화면의 제품 소개 영역.',
        '케이비(주) 웹사이트의 제품 상세 화면.',
        '케이비(주) 웹사이트의 모바일 화면.',
      ],
      meta: {
        title: '케이비(주) — 기억',
        description:
          '제품 탐색, 카탈로그 열람, 문의 흐름을 한국어와 영어로 정리한 케이비(주) 기업 웹사이트 작업.',
      },
    },
    en: {
      title: 'KB Inc.',
      category: 'Client work · Web',
      summary:
        'A bilingual corporate site built around finding products, reading catalogs, and getting in touch.',
      lead: 'A corporate website for KB Inc. that organises product browsing, catalog access, and enquiries in Korean and English.',
      facts: [
        { label: 'Type', value: 'Client work' },
        { label: 'Platform', value: 'Web · Astro static site' },
        { label: 'Role', value: 'IA · Interface · Engineering · Deployment' },
        { label: 'Status', value: 'Live at kbinc.kr' },
      ],
      context: {
        heading: 'Find it, check it, ask about it',
        body: [
          'Industrial and special-purpose vehicle parts cover a wide catalog, and buyers usually read the documents before they contact anyone. The real sequence visitors follow is finding a product, checking the material, then asking a question.',
          'So the site is built on those three moves rather than on a company introduction, with Korean and English sharing one structure.',
        ],
      },
      decisions: [
        {
          title: 'Three flows as the frame',
          body: 'Product browsing, catalog viewing and download, and enquiry became the primary axes of the site. Everything else sits where it cannot interrupt them.',
        },
        {
          title: 'One path in both languages',
          body: 'Korean and English share the same information architecture and the same routes, so switching language never moves the document someone was looking for.',
        },
        {
          title: 'Static by default',
          body: 'The site ships as Astro static output with no server runtime. Pages open quickly and updating material later stays inexpensive.',
        },
      ],
      scope: {
        heading: 'Delivered',
        items: [
          'Information architecture and navigation',
          'Interface design and front-end engineering',
          'Product, catalog, and enquiry flows',
          'Korean and English content structure',
          'Static build and deployment',
        ],
      },
      cta: 'Visit kbinc.kr',
      mediaAlt:
        'The KB Inc. homepage showing an industrial vehicle part and the site navigation.',
      galleryAlt: [
        'The product introduction area of the KB Inc. homepage.',
        'A product detail screen from the KB Inc. website.',
        'The KB Inc. website on a mobile screen.',
      ],
      meta: {
        title: 'KB Inc. — Memory',
        description:
          'A bilingual corporate website for KB Inc. organised around product browsing, catalog access, and enquiries.',
      },
    },
  },
];

export function projectFor(slug: string): Project {
  const project = projects.find((p) => p.slug === slug);
  if (!project) throw new Error(`Unknown project: ${slug}`);
  return project;
}

/* ------------------------------------------------------------------ */
/* Site copy                                                           */
/* ------------------------------------------------------------------ */

const ko = {
  brand: { wordmark: 'Memory', name: '기억', descriptor: '독립 소프트웨어 스튜디오' },
  skip: '본문으로 건너뛰기',
  nav: {
    work: '작업',
    capabilities: '만드는 영역',
    approach: '방식',
    studio: '스튜디오',
    contact: '문의',
    menu: '메뉴',
    close: '닫기',
    language: '언어',
  },
  meta: {
    title: '기억 — 독립 소프트웨어 스튜디오',
    description:
      '기억은 한 사람이 제품 방향, 인터페이스, 엔지니어링을 한 흐름으로 잇는 독립 소프트웨어 스튜디오입니다. 데스크톱과 웹을 중심으로 작업합니다.',
  },
  hero: {
    eyebrow: '독립 소프트웨어 스튜디오',
    lines: ['필요를 읽고,', '오래 쓰일 것을 만듭니다.'],
    body: '기억은 한 사람이 제품의 방향, 인터페이스, 엔지니어링을 한 흐름으로 잇는 독립 소프트웨어 스튜디오입니다. 데스크톱과 웹을 중심으로, 실제로 필요한 만큼 정확하게 만듭니다.',
    primary: '작업 보기',
    secondary: '만드는 방식',
  },
  work: {
    eyebrow: '공개 작업',
    heading: '적은 수의 작업을 깊게.',
    intro: '지금 공개할 수 있는 작업은 두 개입니다. 수를 채우는 대신 각각을 끝까지 설명합니다.',
    all: '작업 전체 보기',
    view: '자세히 보기',
  },
  manifesto: {
    eyebrow: '일하는 원칙',
    lines: ['가장 중요한 흐름부터 작동하게.', '나머지는 실제 쓰임을 따라.'],
    mark: 'Memory / Method',
  },
  capabilities: {
    eyebrow: '만드는 영역',
    heading: '방향과 화면과 코드를 한 사람이 잇습니다.',
    rows: [
      {
        index: '01',
        title: '제품 방향',
        body: '누구의 어떤 일이 더 나아져야 하는지 정리하고, 기능보다 먼저 제품의 기준을 세웁니다.',
        media: '/assets/media/capability-direction.jpg',
        alt: '책상 위에 화면 구성 카드를 늘어놓고 순서를 정리하는 작업 장면.',
      },
      {
        index: '02',
        title: '인터페이스와 경험',
        body: '정보 구조, 화면 흐름, 프로토타입을 함께 다루며 생각을 사용할 수 있는 형태로 바꿉니다.',
        media: '/assets/media/capability-interface.jpg',
        alt: '화면 설계 시안이 열린 모니터와 자료가 놓인 작업 책상.',
      },
      {
        index: '03',
        title: '개발과 전달',
        body: 'macOS와 웹을 중심으로 성능, 접근성, 배포와 운영까지 실제로 작동하는 제품을 만듭니다.',
        media: '/assets/media/capability-engineering.jpg',
        alt: 'Monkey Flash 설정 화면. 실제로 출시된 제품의 인터페이스입니다.',
      },
    ],
  },
  approach: {
    eyebrow: '방식',
    heading: '네 번의 판단으로 좁혀 갑니다.',
    steps: [
      { index: '01', title: '정의', body: '무엇이 더 나아져야 하는지, 소프트웨어로 푸는 것이 맞는지 먼저 정합니다.' },
      { index: '02', title: '구조', body: '정보와 화면의 순서를 정해 제품이 설명 없이 이해되도록 만듭니다.' },
      { index: '03', title: '구현', body: '가장 중요한 흐름을 먼저 작동시키고, 성능과 접근성을 같은 자리에서 다룹니다.' },
      { index: '04', title: '다듬기', body: '실제 사용에서 확인한 것만 반영합니다. 남길 것과 덜어 낼 것을 같이 정합니다.' },
    ],
  },
  studio: {
    eyebrow: '스튜디오',
    heading: '대화하는 사람과 만드는 사람이 같습니다.',
    body: [
      '기억은 한 사람이 운영하는 독립 스튜디오입니다. 처음 문제를 듣는 일부터 제품의 방향을 정하고, 화면을 설계하고, 코드를 작성해 출시하는 일까지 같은 판단의 흐름 안에서 이어 갑니다.',
      '데스크톱과 웹이 중심이고, 제품에 필요할 때 클라우드와 다른 플랫폼으로 넓힙니다. 공개할 수 있는 작업만 사이트에 올립니다.',
    ],
    caption: '에디토리얼 작업 장면',
    alt: '모니터와 종이 스케치를 함께 두고 화면을 설계하는 작업 책상 장면.',
  },
  contact: {
    eyebrow: '프로젝트 문의',
    lines: ['무엇을 만들어야 할지보다,', '무엇이 더 나아져야 하는지부터.'],
    body: '아직 해답이 선명하지 않아도 괜찮습니다. 지금 불편한 일과 바꾸고 싶은 흐름을 알려 주세요.',
    cta: '이메일로 이야기 시작하기',
  },
  footer: {
    directory: '둘러보기',
    elsewhere: '바깥',
    legal: '문서',
    tagline: '데스크톱과 웹을 위한 소프트웨어 설계와 개발.',
    rights: '기억 / Memory',
  },
  workPage: {
    eyebrow: '작업',
    heading: '지금까지 공개한 작업.',
    intro: '공개할 수 있는 작업만 올립니다. 수가 늘어나기 전까지 각 작업을 한 화면에 하나씩 보여 줍니다.',
    meta: {
      title: '작업 — 기억',
      description: '기억이 공개한 작업. macOS 집중 도구 Monkey Flash와 케이비(주) 기업 웹사이트.',
    },
  },
  project: {
    context: '맥락',
    decisions: '판단',
    gallery: '화면',
    next: '다음 작업',
    back: '작업 전체',
  },
  nextProduct: {
    eyebrow: '준비 중',
    heading: '다음 작업은 아직 공개 전입니다.',
    body: '공개할 수 있는 작업만 사이트에 올립니다. 새 작업은 준비되는 대로 이곳에 올라갑니다.',
    meta: {
      title: '준비 중 — 기억',
      description: '기억의 다음 작업은 공개 준비 중입니다.',
    },
  },
  notFound: {
    eyebrow: '404',
    heading: '이 주소에는 아무것도 없습니다.',
    body: '주소가 바뀌었거나, 아직 만들어지지 않은 페이지입니다.',
    meta: { title: '페이지를 찾을 수 없습니다 — 기억', description: '요청한 페이지를 찾을 수 없습니다.' },
  },
} as const;

const en = {
  brand: { wordmark: 'Memory', name: 'Memory', descriptor: 'Independent software studio' },
  skip: 'Skip to content',
  nav: {
    work: 'Work',
    capabilities: 'Capabilities',
    approach: 'Approach',
    studio: 'Studio',
    contact: 'Contact',
    menu: 'Menu',
    close: 'Close',
    language: 'Language',
  },
  meta: {
    title: 'Memory — Independent Software Studio',
    description:
      'Memory is an independent software studio where one person connects product direction, interface design, and engineering. The work centers on desktop and web.',
  },
  hero: {
    eyebrow: 'Independent software studio',
    lines: ['Built from need.', 'Made to stay useful.'],
    body: 'Memory is an independent software studio where one person connects product direction, interface design, and engineering. The work centers on desktop and web, built only as far as the real need requires.',
    primary: 'View the work',
    secondary: 'How Memory works',
  },
  work: {
    eyebrow: 'Public work',
    heading: 'Few projects, told properly.',
    intro: 'Two projects are public right now. Rather than padding the count, each one is explained to the end.',
    all: 'See all work',
    view: 'Read the case',
  },
  manifesto: {
    eyebrow: 'Working principle',
    lines: ['Make the essential path work first.', 'Let real use shape the rest.'],
    mark: 'Memory / Method',
  },
  capabilities: {
    eyebrow: 'Capabilities',
    heading: 'Direction, interface, and code stay in one pair of hands.',
    rows: [
      {
        index: '01',
        title: 'Product direction',
        body: 'Define whose work should improve and set the product criteria before choosing features.',
        media: '/assets/media/capability-direction.jpg',
        alt: 'Screen layout cards laid out on a desk and arranged into an order.',
      },
      {
        index: '02',
        title: 'Interface and experience',
        body: 'Turn an idea into something usable through information architecture, interaction flows, and prototypes.',
        media: '/assets/media/capability-interface.jpg',
        alt: 'A working desk with interface drafts open on a monitor.',
      },
      {
        index: '03',
        title: 'Engineering and delivery',
        body: 'Build working products for macOS and the web, including performance, accessibility, deployment, and operation.',
        media: '/assets/media/capability-engineering.jpg',
        alt: 'The Monkey Flash settings window, an interface from a released product.',
      },
    ],
  },
  approach: {
    eyebrow: 'Approach',
    heading: 'Four decisions, each one narrowing the work.',
    steps: [
      { index: '01', title: 'Define', body: 'Agree on what should work better, and whether software is the right answer at all.' },
      { index: '02', title: 'Structure', body: 'Order the information and the screens so the product reads without explanation.' },
      { index: '03', title: 'Build', body: 'Get the essential path working first, treating performance and accessibility as part of it.' },
      { index: '04', title: 'Refine', body: 'Change only what real use asks for, and decide what to remove as deliberately as what to keep.' },
    ],
  },
  studio: {
    eyebrow: 'Studio',
    heading: 'The person you talk to is the person making it.',
    body: [
      'Memory is a one-person independent studio. Listening to the problem, setting direction, designing the interface, writing the code, and taking the product to release all stay in the same line of judgment.',
      'Desktop and web are the center of the work, extending to cloud and other platforms when a product calls for it. Only work that can be shown publicly appears here.',
    ],
    caption: 'Editorial working scene',
    alt: 'A working desk where a screen and paper sketches sit side by side during interface design.',
  },
  contact: {
    eyebrow: 'Start a project',
    lines: ['Start with what should work better,', 'not with what should be built.'],
    body: 'The answer does not need to be clear yet. Tell Memory what feels difficult now and which part of the work should change.',
    cta: 'Start with an email',
  },
  footer: {
    directory: 'Directory',
    elsewhere: 'Elsewhere',
    legal: 'Legal',
    tagline: 'Software design and engineering for desktop and web.',
    rights: 'Memory',
  },
  workPage: {
    eyebrow: 'Work',
    heading: 'Everything public so far.',
    intro: 'Only work that can be shown publicly appears here. Until the count grows, each project gets a screen of its own.',
    meta: {
      title: 'Work — Memory',
      description: 'Public work by Memory: the macOS focus tool Monkey Flash and the KB Inc. corporate website.',
    },
  },
  project: {
    context: 'Context',
    decisions: 'Decisions',
    gallery: 'Screens',
    next: 'Next project',
    back: 'All work',
  },
  nextProduct: {
    eyebrow: 'In preparation',
    heading: 'The next project is not public yet.',
    body: 'Only work that can be shown publicly goes on this site. New work appears here once it is ready.',
    meta: {
      title: 'In preparation — Memory',
      description: 'The next project from Memory is being prepared.',
    },
  },
  notFound: {
    eyebrow: '404',
    heading: 'There is nothing at this address.',
    body: 'The address may have changed, or the page may not exist yet.',
    meta: { title: 'Page not found — Memory', description: 'The requested page could not be found.' },
  },
} as const;

export const copy = { ko, en } as const;

export type Copy = typeof ko;

export function t(locale: Locale): Copy {
  return copy[locale] as unknown as Copy;
}

/* ------------------------------------------------------------------ */
/* Footer links — Directory ≤4, Elsewhere ≤3, Legal ≤2                 */
/* ------------------------------------------------------------------ */

export function footerLinks(locale: Locale) {
  const c = t(locale);
  return {
    directory: [
      { label: c.nav.work, href: localeHref(locale, '/work/') },
      { label: projects[0][locale].title, href: localeHref(locale, projects[0].href) },
      { label: projects[1][locale].title, href: localeHref(locale, projects[1].href) },
    ],
    elsewhere: [
      { label: 'App Store', href: APP_STORE },
      { label: 'kbinc.kr', href: KBINC },
      { label: 'GitHub', href: GITHUB },
    ],
    legal: [
      { label: locale === 'ko' ? '개인정보처리방침' : 'Privacy', href: '/MonkeyFlash/privacy' },
      { label: locale === 'ko' ? '지원' : 'Support', href: '/MonkeyFlash/support' },
    ],
  };
}
