export type Lang = 'en' | 'ko';

export const translations = {
  en: {
    meta: {
      title: 'Memory — Independent Software Studio',
      description:
        'Memory is an independent software studio designing and building useful products for desktop and web, with scope to extend into cloud and emerging platforms.',
    },
    hero: {
      overline: 'INDEPENDENT SOFTWARE STUDIO',
      lines: ['Software with a clear job.', 'Carefully designed.', 'Built to work.'],
      para: 'Memory designs and builds software for desktop and web, extending into cloud and new platforms when the work calls for it. Each product begins with a clear job and is refined around how it is actually used.',
      ctaPrimary: 'EXPLORE THE WORK',
      ctaSecondary: 'ABOUT MEMORY',
    },
    work: {
      heading: 'Selected Work',
      mf: {
        meta: 'MACOS · FOCUS UTILITY',
        desc: 'A macOS utility that keeps the active window bright and dims the rest of the desktop. It works without Screen Recording, Accessibility, or Input Monitoring access.',
        badges: ['No system permissions', '1% dimming control', 'Hold Fn to reveal'],
        status: 'VIEW ON THE APP STORE ↗',
        alt: 'Monkey Flash on macOS, with the active window bright and the rest of the desktop dimmed.',
        url: 'https://apps.apple.com/kr/app/monkey-flash/id6790402017?mt=12',
      },
      ops: {
        meta: 'WEB · CORPORATE SITE',
        title: 'KB INC.',
        desc: 'A bilingual corporate website redesigned around three essential tasks: finding products, reading catalogues, and reaching the sales team.',
        badges: ['Astro static site', 'Korean & English', 'Catalogues & inquiries'],
        status: 'VISIT KBINC.KR ↗',
        alt: 'The KB Inc. website homepage showing an industrial vehicle-parts product and site navigation.',
        url: 'https://kbinc.kr',
      },
    },
    pipeline: {
      overline: 'AT A GLANCE',
      rows: [
        { idx: '01 / PRODUCT', name: 'Monkey Flash — macOS', status: 'MACOS 13+ · APPLE SILICON' },
        { idx: '02 / CLIENT WORK', name: 'KB Inc. — Corporate Website', status: 'BILINGUAL STATIC SITE' },
        { idx: '03 / SCOPE', name: 'Desktop · Web · Cloud', status: 'DESIGN & ENGINEERING' },
      ],
    },
    capabilities: {
      heading: 'Capabilities',
      intro: 'Product direction, interface design, and engineering handled as one continuous process.',
      groups: [
        { label: 'Product', items: ['Product Direction', 'Information Architecture', 'Interface Design', 'Prototyping'] },
        { label: 'Engineering', items: ['macOS Applications', 'Web Interfaces', 'Static Architecture', 'Performance & Accessibility'] },
        { label: 'Delivery', items: ['Direct Collaboration', 'Bilingual Delivery', 'Technical SEO', 'Post-launch Support'] },
      ],
    },
    interstitial: {
      line1: 'Start with the work that matters.',
      line2: 'Build the product around it.',
    },
    principles: {
      heading: 'Working Principles',
      items: [
        { title: 'Purpose before features', body: 'Start with the job the product must do. Features follow only when they make that work clearer or easier.' },
        { title: 'Design and engineering together', body: 'Interface, data, performance, and accessibility are treated as decisions about the same product.' },
        { title: 'The core comes first', body: 'Get the essential path working first, then refine it with evidence from real use.' },
        { title: 'Responsibility after launch', body: 'Updates, support, and a clear end-of-life path are part of the product.' },
      ],
    },
    about: {
      tileTop: 'The independent studio behind',
      overline: 'The Studio',
      name: 'Memory',
      paras: [
        'Memory is a one-person independent studio designing and building software for desktop and web.',
        'Product direction, interface design, and engineering stay in one process, keeping decisions clear from the first sketch to the working product.',
        'Current public work includes a macOS utility and a bilingual corporate website. Future work may extend into cloud systems and new platforms when the problem calls for it.',
      ],
    },
    footer: {
      overline: 'HAVE A PROBLEM WORTH SOLVING?',
      headline1: 'Good products start',
      headline2: 'with a clear problem.',
      cta: 'START A CONVERSATION',
      tagline: 'Independent software design and engineering for desktop, web, and what comes next.',
    },
  },

  ko: {
    meta: {
      title: '기억 — 독립 소프트웨어 스튜디오',
      description:
        '기억은 데스크톱과 웹을 중심으로 쓸모 있는 제품을 설계하고 만드는 독립 소프트웨어 스튜디오입니다. 필요에 따라 클라우드와 새로운 플랫폼까지 다룹니다.',
    },
    hero: {
      overline: '독립 소프트웨어 스튜디오',
      lines: ['할 일이 분명한 제품.', '세심하게 설계하고,', '끝까지 다듬습니다.'],
      para: '기억은 데스크톱과 웹을 중심으로 소프트웨어를 설계하고 개발합니다. 필요한 경우 클라우드와 새로운 플랫폼까지 범위를 넓히며, 실제 사용에서 자연스럽게 작동할 때까지 제품을 다듬습니다.',
      ctaPrimary: '작업 살펴보기',
      ctaSecondary: '기억 소개',
    },
    work: {
      heading: '주요 작업',
      mf: {
        meta: 'MACOS · 집중 도구',
        desc: '활성 창은 밝게 두고 나머지 화면을 어둡게 해, 한 가지 일에 집중하도록 돕는 macOS 앱입니다. 화면 기록, 손쉬운 사용, 입력 모니터링 권한 없이 작동합니다.',
        badges: ['시스템 권한 없음', '1% 단위 조절', 'Fn으로 잠시 보기'],
        status: 'APP STORE에서 보기 ↗',
        alt: 'macOS에서 실행 중인 Monkey Flash. 활성 창은 밝고 나머지 데스크톱은 어둡게 표시되어 있다.',
        url: 'https://apps.apple.com/kr/app/monkey-flash/id6790402017?mt=12',
      },
      ops: {
        meta: 'WEB · 기업 웹사이트',
        title: '케이비(주)',
        desc: '제품을 찾고, 카탈로그를 읽고, 영업팀에 문의하는 세 가지 핵심 흐름을 한국어와 영어로 다시 설계한 기업 웹사이트입니다.',
        badges: ['Astro 정적 사이트', '한국어·영어', '카탈로그·문의'],
        status: 'KBINC.KR 방문 ↗',
        alt: '산업용 차량 부품과 사이트 탐색 메뉴를 보여 주는 케이비(주) 홈페이지 첫 화면.',
        url: 'https://kbinc.kr',
      },
    },
    pipeline: {
      overline: '한눈에 보기',
      rows: [
        { idx: '01 / 제품', name: 'Monkey Flash — macOS', status: 'MACOS 13+ · APPLE SILICON' },
        { idx: '02 / 고객 작업', name: '케이비(주) — 기업 웹사이트', status: '한·영 정적 사이트' },
        { idx: '03 / 작업 범위', name: '데스크톱 · 웹 · 클라우드', status: '설계 및 개발' },
      ],
    },
    capabilities: {
      heading: '만드는 영역',
      intro: '제품 방향, 인터페이스 설계, 개발을 하나의 흐름으로 다룹니다.',
      groups: [
        { label: '제품', items: ['제품 방향', '정보 구조', '인터페이스 디자인', '프로토타이핑'] },
        { label: '개발', items: ['macOS 애플리케이션', '웹 인터페이스', '정적 사이트 아키텍처', '성능 및 접근성'] },
        { label: '전달 및 운영', items: ['직접 협업', '한국어·영어', '테크니컬 SEO', '출시 후 지원'] },
      ],
    },
    interstitial: {
      line1: '먼저, 해야 할 일을 분명히 합니다.',
      line2: '그 일에 맞는 제품을 만듭니다.',
    },
    principles: {
      heading: '일하는 원칙',
      items: [
        { title: '기능보다 쓰임', body: '기능 목록보다 먼저 제품이 해야 할 일을 정합니다. 그 일을 더 분명하고 쉽게 만드는 기능만 남깁니다.' },
        { title: '설계와 개발을 함께', body: '인터페이스, 데이터, 성능, 접근성을 하나의 제품에 대한 결정으로 함께 다룹니다.' },
        { title: '핵심부터 작동하게', body: '가장 중요한 흐름을 먼저 작동시키고, 실제 사용에서 얻은 근거로 다듬습니다.' },
        { title: '출시 이후까지 책임 있게', body: '업데이트와 지원, 명확한 종료 방식까지 제품의 일부로 생각합니다.' },
      ],
    },
    about: {
      tileTop: '기억을 만드는 독립 스튜디오',
      overline: '스튜디오',
      name: '기억',
      paras: [
        '기억은 한 사람이 제품 설계와 개발을 직접 맡는 독립 소프트웨어 스튜디오입니다.',
        '제품 방향, 인터페이스, 엔지니어링을 하나의 흐름으로 다뤄 첫 구상부터 실제로 작동하는 제품까지 판단의 기준을 분명하게 유지합니다.',
        '현재 공개된 작업은 macOS 유틸리티와 한국어·영어 기업 웹사이트입니다. 앞으로는 문제에 따라 클라우드 시스템과 새로운 플랫폼까지 범위를 넓힙니다.',
      ],
    },
    footer: {
      overline: '함께 풀 문제가 있나요?',
      headline1: '좋은 제품은',
      headline2: '분명한 문제에서 시작합니다.',
      cta: '이메일 보내기',
      tagline: '데스크톱과 웹을 중심으로 쓸모 있는 소프트웨어를 설계하고 만듭니다.',
    },
  },
} as const;
