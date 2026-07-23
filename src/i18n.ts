export type Lang = 'en' | 'ko';

export const translations = {
  en: {
    meta: {
      title: 'Memory — Independent Software Studio',
      description:
        'Memory is an independent software studio run by one person. It designs and builds desktop and web products.',
    },
    hero: {
      overline: 'INDEPENDENT SOFTWARE STUDIO',
      lines: ['Memory designs and builds', 'software around', 'what people need to do.'],
      para: 'Desktop and web are the core platforms. Product direction, interface design, and engineering stay connected from the first decision through release. When needed, a project can extend to cloud services or another platform.',
      ctaPrimary: 'EXPLORE THE WORK',
      ctaSecondary: 'ABOUT MEMORY',
    },
    work: {
      heading: 'Selected Work',
      mf: {
        meta: 'macOS · FOCUS UTILITY',
        desc: 'A macOS utility that keeps the active window bright and dims the rest of the desktop. It does not require Screen Recording, Accessibility, or Input Monitoring permissions.',
        badges: ['No system permissions', '1% dimming increments', 'Hold Fn to pause dimming'],
        status: 'VIEW ON THE APP STORE ↗',
        alt: 'Monkey Flash on macOS with the active window bright and the rest of the desktop dimmed.',
        url: 'https://apps.apple.com/kr/app/monkey-flash/id6790402017?mt=12',
      },
      ops: {
        meta: 'WEB · CORPORATE SITE',
        title: 'KB INC.',
        desc: 'A bilingual corporate website redesigned to make three tasks easier: finding products, viewing catalogs, and contacting the sales team.',
        badges: ['Astro static site', 'Korean & English', 'Catalogs & inquiries'],
        status: 'VISIT KBINC.KR ↗',
        alt: 'The KB Inc. homepage showing an industrial vehicle part and the site navigation.',
        url: 'https://kbinc.kr',
      },
    },
    pipeline: {
      overline: 'AT A GLANCE',
      rows: [
        { idx: '01 / PRODUCT', name: 'Monkey Flash — macOS', status: 'macOS 13+ · APPLE SILICON' },
        { idx: '02 / CLIENT WORK', name: 'KB Inc. — Corporate Website', status: 'BILINGUAL STATIC SITE' },
        { idx: '03 / SCOPE', name: 'Desktop · Web · Cloud', status: 'DESIGN & ENGINEERING' },
      ],
    },
    capabilities: {
      heading: 'Scope',
      intro: 'The work spans product direction, interface design, engineering, and post-launch support.',
      groups: [
        { label: 'Product', items: ['Product Direction', 'Information Architecture', 'Interface Design', 'Prototyping'] },
        { label: 'Engineering', items: ['macOS Applications', 'Web Interfaces', 'Static Site Architecture', 'Performance & Accessibility'] },
        { label: 'Delivery', items: ['Direct Collaboration', 'Korean & English Versions', 'Technical SEO', 'Post-launch Support'] },
      ],
    },
    interstitial: {
      line1: 'Get the essential path working first.',
      line2: 'Let real use shape the rest.',
    },
    principles: {
      heading: 'Working Principles',
      items: [
        { title: 'Purpose before features', body: 'Decide what the product needs to do before choosing features. Keep only the features needed to do that job well.' },
        { title: 'Design and engineering together', body: 'Treat interface, data, performance, and accessibility as parts of the same product.' },
        { title: 'The core comes first', body: 'Get the core workflow working first, then refine it based on real use.' },
        { title: 'Responsibility after launch', body: 'Updates and support are part of the product. So is a clear plan for when maintenance must end.' },
      ],
    },
    about: {
      tileTop: 'One-person software studio',
      overline: 'The Studio',
      name: 'Memory',
      paras: [
        'Memory is an independent studio run by one person who designs and builds software for desktop and web.',
        'A project starts by defining the problem and deciding whether software is the right answer. The same person then carries it through interface design, engineering, and release.',
        'Current public work includes a macOS utility and a bilingual corporate website. New products will be released under the Memory name as they are ready.',
      ],
    },
    footer: {
      overline: 'PLANNING OR IMPROVING A PRODUCT?',
      headline1: 'Start with what needs',
      headline2: 'to work better.',
      cta: 'EMAIL MEMORY',
      tagline: 'Independent software design and engineering for desktop and web.',
    },
  },

  ko: {
    meta: {
      title: '기억 — 독립 소프트웨어 스튜디오',
      description:
        '기억은 한 사람이 데스크톱과 웹용 소프트웨어를 설계하고 개발하는 독립 스튜디오입니다. 제품에 필요하면 클라우드와 그 밖의 플랫폼도 다룹니다.',
    },
    hero: {
      overline: '독립 소프트웨어 스튜디오',
      lines: ['무엇이 필요한지 살피고,', '꼭 필요한 만큼 만들고,', '쓰임에 맞게 다듬습니다.'],
      para: '데스크톱과 웹을 중심으로 제품을 설계하고 개발합니다. 클라우드와 그 밖의 플랫폼은 제품에 필요할 때 다룹니다.',
      ctaPrimary: '작업 살펴보기',
      ctaSecondary: '스튜디오 소개',
    },
    work: {
      heading: '주요 작업',
      mf: {
        meta: 'macOS · 집중 도구',
        desc: '지금 사용하는 창만 밝게 두고 나머지 화면을 어둡게 표시하는 macOS 집중 도구입니다. 화면 기록, 손쉬운 사용, 입력 모니터링 권한 없이 작동합니다.',
        badges: ['시스템 권한 없음', '1% 단위 조절', 'Fn 키로 잠시 해제'],
        status: 'App Store에서 보기 ↗',
        alt: 'macOS에서 실행 중인 Monkey Flash. 활성 창은 밝고 나머지 데스크톱은 어둡게 표시되어 있습니다.',
        url: 'https://apps.apple.com/kr/app/monkey-flash/id6790402017?mt=12',
      },
      ops: {
        meta: 'WEB · 기업 웹사이트',
        title: '케이비(주)',
        desc: '제품을 찾고, 카탈로그를 열람하고, 영업팀에 문의하기 쉽도록 다시 설계한 한·영 기업 웹사이트입니다.',
        badges: ['Astro 정적 사이트', '한국어·영어', '카탈로그·문의'],
        status: '웹사이트 보기 ↗',
        alt: '산업용 차량 부품과 탐색 메뉴를 보여 주는 케이비(주) 홈페이지 첫 화면입니다.',
        url: 'https://kbinc.kr',
      },
    },
    pipeline: {
      overline: '한눈에 보기',
      rows: [
        { idx: '01 / 제품', name: 'Monkey Flash — macOS', status: 'macOS 13+ · APPLE SILICON' },
        { idx: '02 / 의뢰 작업', name: '케이비(주) — 기업 웹사이트', status: '한·영 정적 사이트' },
        { idx: '03 / 작업 범위', name: '데스크톱 · 웹 · 클라우드', status: '설계 및 개발' },
      ],
    },
    capabilities: {
      heading: '작업 범위',
      intro: '제품의 방향을 정하는 일부터 인터페이스 설계와 개발까지 한 흐름으로 이어 갑니다.',
      groups: [
        { label: '제품', items: ['제품 방향 설정', '정보 구조 설계', '인터페이스 설계', '프로토타이핑'] },
        { label: '개발', items: ['macOS 애플리케이션', '웹 인터페이스', '정적 사이트 구조 설계', '성능 및 접근성'] },
        { label: '협업과 운영', items: ['제작자와 직접 협업', '한·영 버전 제작', '기술 SEO', '출시 후 지원'] },
      ],
    },
    interstitial: {
      line1: '가장 중요한 사용 흐름부터 구현합니다.',
      line2: '나머지는 실제 쓰임에 맞춰 다듬습니다.',
    },
    principles: {
      heading: '일하는 원칙',
      items: [
        { title: '기능보다 쓰임', body: '기능을 늘리기 전에 제품이 해야 할 일을 정합니다. 그 쓰임에 필요한 기능만 남깁니다.' },
        { title: '설계와 개발을 함께', body: '인터페이스와 데이터, 성능, 접근성을 따로 떼지 않고 한 제품 안에서 함께 판단합니다.' },
        { title: '핵심 흐름부터', body: '가장 중요한 흐름을 먼저 구현하고, 실제 사용에서 확인한 내용을 바탕으로 다듬습니다.' },
        { title: '출시 이후도 제품의 일부', body: '업데이트와 지원은 물론, 유지보수를 마칠 때의 안내까지 운영에 포함합니다.' },
      ],
    },
    about: {
      tileTop: '제품을 직접 설계하고 개발하는 1인 스튜디오',
      overline: '스튜디오',
      name: '기억',
      paras: [
        '제품 설계와 개발을 한 사람이 직접 맡는 독립 소프트웨어 스튜디오입니다.',
        '제품을 만들기 전, 누가 어떤 불편을 겪는지, 소프트웨어로 푸는 것이 맞는지 먼저 살핍니다. 방향이 정해지면 인터페이스 설계와 개발을 한 흐름으로 이어 갑니다.',
        '현재 공개한 작업은 macOS 유틸리티와 한·영 기업 웹사이트입니다. 새 제품도 준비되는 대로 ‘기억’이라는 이름으로 하나씩 공개합니다.',
      ],
    },
    footer: {
      overline: '제품을 새로 만들거나 개선하고 있다면',
      headline1: '해결하려는 문제를',
      headline2: '구체적으로 알려 주세요.',
      cta: '이메일로 문의하기',
      tagline: '데스크톱과 웹용 소프트웨어를 설계하고 개발합니다.',
    },
  },
} as const;
