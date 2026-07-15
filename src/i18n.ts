export type Lang = 'en' | 'ko';

export const translations = {
  en: {
    meta: {
      title: 'Devguru-J — Independent Software Studio',
      description:
        'Devguru is the independent workspace of Devguru-J, a Seoul-based engineer building precise software across desktop, web, and cloud — including Monkey Flash for macOS.',
    },
    hero: {
      overline: 'INDEPENDENT DEVELOPER — INCHEON, Korea',
      lines: ['Building what should exist.', 'Nothing is impossible.', 'Just engineering.'],
      para: 'I design and build software across desktop, web, cloud, and emerging platforms—turning everyday friction and complex business problems into clear, useful products.',
      ctaPrimary: 'EXPLORE THE WORK',
      ctaSecondary: 'ABOUT DEVGURU',
    },
    work: {
      heading: 'Selected Work',
      mf: {
        meta: 'MACOS · FOCUS UTILITY',
        desc: 'A dimmer switch for your attention. Keeps the active window bright and quietly lowers everything else—no Accessibility, Screen Recording, or any system permission required.',
        badges: ['Zero permissions', '1% dim control', 'Fn reveal'],
        status: 'COMING TO THE MAC APP STORE',
        alt: 'Monkey Flash on macOS: the active window stays bright while the rest of the desktop is dimmed.',
      },
      ops: {
        meta: 'WEB · BUSINESS OPS',
        title: 'OPERATIONS PLATFORMS',
        desc: 'Complex operations, made clear. Bespoke web platforms that turn spreadsheet-grade business logic into fast, dependable tools people use every day.',
        status: 'PRIVATE ENGAGEMENTS · DETAILS ON REQUEST',
        alt: 'Editorial-style business operations workspace with dense but organized tables and timelines.',
      },
    },
    pipeline: {
      overline: 'NEXT — PIPELINE',
      rows: [
        { idx: '01 / RELEASE', name: 'Monkey Flash 1.0 — Mac App Store', status: 'IN REVIEW' },
        { idx: '02 / WIP', name: 'Productivity utility', status: 'IN DEVELOPMENT' },
        { idx: '03 / R&D', name: 'Automation toolkit', status: 'RESEARCH PHASE' },
      ],
    },
    capabilities: {
      heading: 'Capabilities',
      intro: 'A multidisciplinary approach to building technical products from zero to one.',
      groups: [
        { label: 'Product', items: ['Strategy & Vision', 'UI/UX Design', 'Prototyping', 'Systems Design'] },
        { label: 'Engineering', items: ['macOS Native Apps', 'Frontend Architectures', 'Cloud Infrastructure', 'Performance Audit'] },
        { label: 'Delivery', items: ['Agile Execution', 'Direct Collaboration', 'Technical SEO', 'Post-launch Support'] },
      ],
    },
    interstitial: {
      line1: 'No fixed platform. No fixed category.',
      line2: 'Just the right product for the problem.',
    },
    principles: {
      heading: 'Guiding Principles',
      items: [
        { title: 'Precision over speed', body: 'I build correctly once, rather than fast twice. Every line of code is intentional.' },
        { title: 'Functional beauty', body: 'Design is not what it looks like, but how it works. Clarity is the highest aesthetic goal.' },
        { title: 'Technical depth', body: 'Powerful tools shouldn’t be hidden behind dumbed-down interfaces. I embrace the command line.' },
        { title: 'Digital craft', body: 'Software as an artisanal craft. Attention to detail is the competitive advantage.' },
      ],
    },
    about: {
      tileTop: 'The independent workspace of',
      overline: 'The Builder',
      name: 'Devguru-J',
      paras: [
        'Devguru is the independent workspace of Devguru-J, a Seoul-based engineer and designer obsessed with building high-performance digital tools.',
        'With a background spanning distributed systems and editorial design, I bridge the gap between heavy engineering and human-centric interfaces. I don’t just write code; I design systems that solve problems for the long term.',
        'Currently focused on macOS productivity utilities and specialized web applications for complex business operations.',
      ],
    },
    footer: {
      overline: 'HAVE A PROJECT IN MIND?',
      headline1: 'Let’s build the thing',
      headline2: 'that should exist.',
      cta: 'START A CONVERSATION',
      tagline: 'Precision engineering and editorial design for modern software.',
    },
  },

  ko: {
    meta: {
      title: 'Devguru-J — 독립 소프트웨어 스튜디오',
      description:
        'Devguru는 서울에서 활동하는 엔지니어 Devguru-J의 독립 작업실입니다. 데스크톱·웹·클라우드를 넘나들며 정밀한 소프트웨어를 만듭니다 — macOS용 Monkey Flash 포함.',
    },
    hero: {
      overline: 'INDEPENDENT DEVELOPER — INCHEON, KOREA',
      lines: ['있어야 할 것을 만듭니다.', '불가능한 건 없습니다.', '엔지니어링이 있을 뿐.'],
      para: '데스크톱, 웹, 클라우드, 그리고 새로운 플랫폼까지 — 일상의 불편함과 복잡한 비즈니스 문제를 명쾌하고 쓸모 있는 제품으로 바꿉니다.',
      ctaPrimary: '작업 살펴보기',
      ctaSecondary: 'DEVGURU 소개',
    },
    work: {
      heading: '주요 작업',
      mf: {
        meta: 'MACOS · FOCUS UTILITY',
        desc: '주의력을 위한 조광 스위치. 활성 창만 밝게 남기고 나머지는 조용히 낮춥니다 — Accessibility, 화면 기록 등 어떤 시스템 권한도 요구하지 않습니다.',
        badges: ['권한 제로', '1% 딤 조절', 'Fn 임시 해제'],
        status: 'MAC APP STORE 출시 예정',
        alt: 'macOS에서 실행 중인 Monkey Flash: 활성 창만 밝게 유지되고 나머지 데스크톱은 어둡게 처리된 모습.',
      },
      ops: {
        meta: 'WEB · BUSINESS OPS',
        title: '오퍼레이션 플랫폼',
        desc: '복잡한 운영 업무를 명쾌하게. 스프레드시트 수준의 정밀한 비즈니스 로직을, 매일 쓰게 되는 빠르고 믿을 수 있는 웹 도구로 바꿉니다.',
        status: '클라이언트 비공개 작업 · 문의 시 소개 가능',
        alt: '정돈된 표와 타임라인으로 구성된 에디토리얼 스타일의 비즈니스 운영 워크스페이스.',
      },
    },
    pipeline: {
      overline: 'NEXT — PIPELINE',
      rows: [
        { idx: '01 / RELEASE', name: 'Monkey Flash 1.0 — Mac App Store', status: 'IN REVIEW' },
        { idx: '02 / WIP', name: '생산성 유틸리티', status: 'IN DEVELOPMENT' },
        { idx: '03 / R&D', name: '자동화 툴킷', status: 'RESEARCH PHASE' },
      ],
    },
    capabilities: {
      heading: '할 수 있는 것',
      intro: '0에서 1까지, 기술 제품을 완성하는 다학제적 접근.',
      groups: [
        { label: 'Product', items: ['전략 & 비전', 'UI/UX 디자인', '프로토타이핑', '시스템 설계'] },
        { label: 'Engineering', items: ['macOS 네이티브 앱', '프론트엔드 아키텍처', '클라우드 인프라', '성능 최적화'] },
        { label: 'Delivery', items: ['애자일 실행', '1:1 직접 협업', '테크니컬 SEO', '출시 후 지원'] },
      ],
    },
    interstitial: {
      line1: '정해진 플랫폼도, 정해진 카테고리도 없습니다.',
      line2: '문제에 꼭 맞는 제품이 있을 뿐.',
    },
    principles: {
      heading: '일하는 원칙',
      items: [
        { title: '속도보다 정확함', body: '빠르게 두 번 만드는 대신, 한 번에 제대로 만듭니다. 모든 코드 한 줄에 의도가 있습니다.' },
        { title: '기능이 곧 아름다움', body: '디자인은 어떻게 보이느냐가 아니라 어떻게 작동하느냐의 문제입니다. 명료함이 최고의 미학입니다.' },
        { title: '기술적 깊이', body: '강력한 도구가 단순화라는 이름 뒤에 숨을 필요는 없습니다. 커맨드라인을 기꺼이 끌어안습니다.' },
        { title: '디지털 크래프트', body: '소프트웨어를 공예처럼 다룹니다. 디테일에 대한 집착이 곧 경쟁력입니다.' },
      ],
    },
    about: {
      tileTop: 'The independent workspace of',
      overline: 'The Builder',
      name: 'Devguru-J',
      paras: [
        'Devguru는 서울에서 활동하는 엔지니어이자 디자이너 Devguru-J의 독립 작업실입니다. 고성능 디지털 도구를 만드는 일에 몰두합니다.',
        '분산 시스템부터 에디토리얼 디자인까지 — 무거운 엔지니어링과 사람 중심 인터페이스 사이의 간극을 잇습니다. 코드를 쓰는 데서 멈추지 않고, 오래 가는 문제 해결 시스템을 설계합니다.',
        '지금은 macOS 생산성 유틸리티와 복잡한 비즈니스 운영을 위한 맞춤형 웹 애플리케이션에 집중하고 있습니다.',
      ],
    },
    footer: {
      overline: 'HAVE A PROJECT IN MIND?',
      headline1: '있어야 할 것을,',
      headline2: '함께 만들어요.',
      cta: '대화 시작하기',
      tagline: '현대 소프트웨어를 위한 정밀한 엔지니어링과 에디토리얼 디자인.',
    },
  },
} as const;
