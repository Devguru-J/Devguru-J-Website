export type Lang = 'en' | 'ko';

export const content = {
  en: {
    meta: {
      title: 'Memory — Independent Software Studio',
      description:
        'Memory is an independent software studio run by one person. It designs and builds desktop and web products.',
    },
    header: { cta: 'Email Memory', langLabel: 'KO', langHref: '/' },
    menu: [
      { label: 'Index', href: '#top' },
      { label: 'Scope', href: '#services' },
      { label: 'Work', href: '#work' },
      { label: 'About', href: '#about' },
      { label: 'Contact', href: '#contact' },
    ],
    hero: {
      title: "We build what's needed",
      metaLeft: 'Based in Korea',
      tagline: 'An independent one-person software studio',
      metaRight: 'Desktop · Web · Cloud',
    },
    services: {
      heading: 'From the first decision to release, everything stays connected',
      link: 'Start a Project',
      cards: [
        {
          title: 'Product Direction',
          img: '/assets/menu-popover.png',
          tags: ['Purpose First', 'Problem Definition', 'Information Architecture', 'Scope'],
        },
        {
          title: 'Interface Design',
          img: '/assets/settings-visual.png',
          tags: ['Prototyping', 'Interaction', 'Typography', 'Design Systems'],
        },
        {
          title: 'macOS Applications',
          img: '/assets/work-monkeyflash.jpg',
          tags: ['Swift', 'Apple Silicon', 'App Store', 'macOS 13+'],
        },
        {
          title: 'Web Interfaces',
          img: '/assets/work-kbinc.jpg',
          tags: ['Astro', 'Static Sites', 'Performance', 'Accessibility'],
        },
        {
          title: 'Cloud & Platforms',
          img: 'https://picsum.photos/seed/memory-cloud/720/980',
          tags: ['When Needed', 'APIs', 'Deployment', 'Automation'],
        },
        {
          title: 'Delivery & Support',
          img: 'https://picsum.photos/seed/memory-delivery/720/980',
          tags: ['Direct Collaboration', 'Korean & English', 'Technical SEO', 'Post-launch Support'],
        },
      ],
    },
    statement: [
      'Get', 'the', 0, 'essential', 'path', 'working', 'first,', 'then', 1, 'let',
      'real', 'use', 'shape', 2, 'the', 'rest', 'of', 'the', 3, 'product.',
    ] as Array<string | number>,
    work: {
      label: 'Selected Work',
      projects: [
        {
          title: 'Monkey Flash',
          key: 'p1',
          img: '/assets/work-monkeyflash.jpg',
          href: 'https://apps.apple.com/kr/app/monkey-flash/id6790402017?mt=12',
        },
        { title: 'KB Inc.', key: 'p2', img: '/assets/work-kbinc.jpg', href: 'https://kbinc.kr' },
        {
          title: 'Next Product — In the Works',
          key: 'p3',
          img: 'https://picsum.photos/seed/memory-next/900/600',
          href: '#contact',
        },
      ],
    },
    principles: [
      {
        text: '“Purpose before features — decide what the product needs to do before choosing features, and keep only the features needed to do that job well.”',
        name: 'Working Principle',
        role: '01 / Purpose before features',
      },
      {
        text: '“Design and engineering together — interface, data, performance, and accessibility are parts of the same product, judged in one flow.”',
        name: 'Working Principle',
        role: '02 / Design and engineering together',
      },
      {
        text: '“The core comes first — get the core workflow working first, then refine it based on real use.”',
        name: 'Working Principle',
        role: '03 / The core comes first',
      },
      {
        text: '“Responsibility after launch — updates and support are part of the product, and so is a clear plan for when maintenance must end.”',
        name: 'Working Principle',
        role: '04 / Responsibility after launch',
      },
    ],
    video: { pill: 'Play Video' },
    contact: {
      placeholders: { first: 'First Name', last: 'Last Name', email: 'Email Address', phone: 'Phone Number' },
      interests: ['Product Direction', 'Interface Design', 'macOS App', 'Web Interface'],
      submit: 'Email Memory',
      sayHello: 'Say Hello',
      getSocial: 'Get Social',
      email: 'devguru.j610@gmail.com',
      socials: [
        { label: 'GitHub', href: 'https://github.com/Devguru-J' },
        { label: 'App Store', href: 'https://apps.apple.com/kr/app/monkey-flash/id6790402017?mt=12' },
      ],
    },
    footerGiant: 'Memory',
  },

  ko: {
    meta: {
      title: '기억 — 독립 소프트웨어 스튜디오',
      description:
        '기억은 한 사람이 데스크톱과 웹용 소프트웨어를 설계하고 개발하는 독립 스튜디오입니다.',
    },
    header: { cta: '이메일 문의', langLabel: 'EN', langHref: '/en/' },
    menu: [
      { label: '처음', href: '#top' },
      { label: '작업 범위', href: '#services' },
      { label: '작업', href: '#work' },
      { label: '소개', href: '#about' },
      { label: '문의', href: '#contact' },
    ],
    hero: {
      title: '필요한 것을 만듭니다',
      metaLeft: '대한민국 기반',
      tagline: '제품을 직접 설계하고 개발하는 1인 독립 스튜디오',
      metaRight: '데스크톱 · 웹 · 클라우드',
    },
    services: {
      heading: '처음 결정부터 출시까지, 한 흐름으로 이어 갑니다',
      link: '프로젝트 시작하기',
      cards: [
        {
          title: '제품 방향 설정',
          img: '/assets/menu-popover.png',
          tags: ['쓰임 먼저', '문제 정의', '정보 구조 설계', '범위 설정'],
        },
        {
          title: '인터페이스 설계',
          img: '/assets/settings-visual.png',
          tags: ['프로토타이핑', '인터랙션', '타이포그래피', '디자인 시스템'],
        },
        {
          title: 'macOS 애플리케이션',
          img: '/assets/work-monkeyflash.jpg',
          tags: ['Swift', 'Apple Silicon', 'App Store', 'macOS 13+'],
        },
        {
          title: '웹 인터페이스',
          img: '/assets/work-kbinc.jpg',
          tags: ['Astro', '정적 사이트', '성능', '접근성'],
        },
        {
          title: '클라우드 · 플랫폼',
          img: 'https://picsum.photos/seed/memory-cloud/720/980',
          tags: ['필요할 때', 'API', '배포', '자동화'],
        },
        {
          title: '협업과 운영',
          img: 'https://picsum.photos/seed/memory-delivery/720/980',
          tags: ['직접 협업', '한·영 버전', '기술 SEO', '출시 후 지원'],
        },
      ],
    },
    statement: [
      '가장', '중요한', 0, '사용', '흐름부터', '구현하고,', '나머지는', 1, '실제',
      '쓰임에', '맞춰', 2, '제품을', 3, '다듬습니다.',
    ] as Array<string | number>,
    work: {
      label: '주요 작업',
      projects: [
        {
          title: 'Monkey Flash',
          key: 'p1',
          img: '/assets/work-monkeyflash.jpg',
          href: 'https://apps.apple.com/kr/app/monkey-flash/id6790402017?mt=12',
        },
        { title: '케이비(주)', key: 'p2', img: '/assets/work-kbinc.jpg', href: 'https://kbinc.kr' },
        {
          title: '다음 제품 — 준비 중',
          key: 'p3',
          img: 'https://picsum.photos/seed/memory-next/900/600',
          href: '#contact',
        },
      ],
    },
    principles: [
      {
        text: '“기능을 늘리기 전에 제품이 해야 할 일을 정합니다. 그 쓰임에 필요한 기능만 남깁니다.”',
        name: '일하는 원칙',
        role: '01 / 기능보다 쓰임',
      },
      {
        text: '“인터페이스와 데이터, 성능, 접근성을 따로 떼지 않고 한 제품 안에서 함께 판단합니다.”',
        name: '일하는 원칙',
        role: '02 / 설계와 개발을 함께',
      },
      {
        text: '“가장 중요한 흐름을 먼저 구현하고, 실제 사용에서 확인한 내용을 바탕으로 다듬습니다.”',
        name: '일하는 원칙',
        role: '03 / 핵심 흐름부터',
      },
      {
        text: '“업데이트와 지원은 물론, 유지보수를 마칠 때의 안내까지 운영에 포함합니다.”',
        name: '일하는 원칙',
        role: '04 / 출시 이후도 제품의 일부',
      },
    ],
    video: { pill: '영상 보기' },
    contact: {
      placeholders: { first: '이름', last: '성', email: '이메일 주소', phone: '전화번호' },
      interests: ['제품 방향', '인터페이스 설계', 'macOS 앱', '웹 인터페이스'],
      submit: '이메일로 문의하기',
      sayHello: '이메일',
      getSocial: '소셜',
      email: 'devguru.j610@gmail.com',
      socials: [
        { label: 'GitHub', href: 'https://github.com/Devguru-J' },
        { label: 'App Store', href: 'https://apps.apple.com/kr/app/monkey-flash/id6790402017?mt=12' },
      ],
    },
    footerGiant: '기억',
  },
} as const;
