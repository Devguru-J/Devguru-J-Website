import type { Bilingual } from '../lib/i18n';
import { CONTACT } from './brand';

/* ==========================================================================
   Public project records
   Approval register state at implementation time (12 §18):
     B01 launch inventory  — APPROVED, explicit two-project MVP
     B02 bilingual content — APPROVED, bodies below
     B03 client permission — APPROVED, KB Inc. is the owner's family company
                             and the site was built by Memory
     B04 media rights      — APPROVED, all media is Memory's own work
     B06 work order        — APPROVED, Monkey Flash leads
   A record without every required field must not be added here. Empty strings
   and placeholders are not a way to satisfy the type.
   ========================================================================== */

export interface ProjectMedia {
  src: string;
  width: number;
  height: number;
  alt: Bilingual;
  caption?: Bilingual;
  ratio?: '16-10' | '16-9' | '4-5' | '1-1';
}

export interface Decision {
  title: Bilingual;
  body: Bilingual;
}

export interface ProjectCopy {
  /** One line: whose friction, changed how. */
  statement: string[];
  summary: string;
  lead: string;
  context: string;
  reason: string;
  decisions: { title: string; body: string }[];
  refinement: string;
  delivered: string[];
  status: string;
}

export interface Project {
  slug: string;
  featuredOrder: number;
  indexOrder: number;
  title: string;
  type: Bilingual;
  platform: Bilingual;
  role: Bilingual;
  statusLabel: Bilingual;
  externalUrl: string;
  externalCta: Bilingual;
  media: {
    hero: ProjectMedia;
    /** Square-cropped pointer preview, shown at 250 × 250px. */
    preview: ProjectMedia;
    gallery: ProjectMedia[];
  };
  seo: { title: Bilingual; description: Bilingual; image: string };
  copy: Record<'ko' | 'en', ProjectCopy>;
}

const MONKEY_FLASH: Project = {
  slug: 'monkey-flash',
  featuredOrder: 1,
  indexOrder: 1,
  title: 'Monkey Flash',
  type: { ko: '자체 제품', en: 'Own product' },
  platform: { ko: 'macOS 13 이상 · Apple Silicon', en: 'macOS 13+ · Apple Silicon' },
  role: {
    ko: '제품 방향 · 인터페이스 · macOS 개발 · 출시',
    en: 'Product direction · Interface · macOS engineering · Release',
  },
  statusLabel: { ko: 'Mac App Store 공개', en: 'On the Mac App Store' },
  externalUrl: CONTACT.appStore,
  externalCta: { ko: 'App Store에서 보기', en: 'View on the App Store' },
  media: {
    hero: {
      src: '/assets/monkey-flash/frame-01-hero.jpg',
      width: 2000,
      height: 1250,
      ratio: '16-10',
      alt: {
        ko: '활성 창은 밝고 뒤쪽 창은 어둡게 표시된 Monkey Flash 화면. 한국어 프로모션 문구와 설정 창이 함께 있습니다.',
        en: 'Korean Monkey Flash promotional frame with a bright active window, dimmed background windows and the settings interface.',
      },
    },
    preview: {
      src: '/assets/media/preview-monkey-flash.jpg',
      width: 840,
      height: 630,
      ratio: '1-1',
      alt: {
        ko: 'Monkey Flash 인터페이스 미리보기.',
        en: 'Monkey Flash interface preview.',
      },
    },
    gallery: [
      {
        src: '/assets/monkey-flash/frame-03-dimming.jpg',
        width: 2000,
        height: 1250,
        ratio: '16-10',
        alt: {
          ko: 'Monkey Flash에서 딤 강도를 1% 단위로 조절하는 화면. 한국어 프로모션 문구가 함께 있습니다.',
          en: 'Korean Monkey Flash frame showing dim strength adjusted in one-percent steps.',
        },
        caption: {
          ko: '딤 강도는 밝기처럼 다루도록 1% 단위로 조절합니다.',
          en: 'Dim strength is adjusted in one-percent steps, handled like screen brightness.',
        },
      },
      {
        src: '/assets/settings-visual.png',
        width: 794,
        height: 754,
        ratio: '1-1',
        alt: {
          ko: 'Monkey Flash에서 딤 강도와 디밍 속도를 조절하는 화면 설정 창.',
          en: 'The Monkey Flash screen settings window for dim strength and fade speed.',
        },
        caption: {
          ko: '강도와 페이드 속도, 라이트·다크 모드 값을 나눠 둔 설정.',
          en: 'Strength, fade speed and separate Light and Dark Mode values.',
        },
      },
      {
        src: '/assets/monkey-flash/frame-05-menubar.jpg',
        width: 2000,
        height: 1250,
        ratio: '16-10',
        alt: {
          ko: '딤 강도를 바로 조절할 수 있는 Monkey Flash 메뉴 막대 화면. 한국어 프로모션 문구가 함께 있습니다.',
          en: 'Korean Monkey Flash frame showing the menu bar control for adjusting dim strength directly.',
        },
        caption: {
          ko: '설정 창을 열지 않고 메뉴 막대에서 바로 조절합니다.',
          en: 'Adjusted straight from the menu bar, without opening the settings window.',
        },
      },
    ],
  },
  seo: {
    title: {
      ko: 'Monkey Flash — 기억',
      en: 'Monkey Flash — Memory',
    },
    description: {
      ko: '활성 창만 밝게 두고 나머지 화면을 낮추는 macOS 유틸리티. 권한 요청 없이 동작하며 Mac App Store에 공개되어 있습니다.',
      en: 'A macOS utility that keeps the active window bright and lowers the rest. It runs without permission prompts and is published on the Mac App Store.',
    },
    image: '/assets/monkey-flash/frame-01-hero.jpg',
  },
  copy: {
    ko: {
      statement: ['시각적 소음을 덜어,', '지금의 작업을 선명하게.'],
      summary:
        '활성 창만 밝게 두고 나머지 화면을 차분하게 낮춰, 원래 하던 일을 바꾸지 않고 집중을 돕는 macOS 유틸리티입니다.',
      lead: '존재감을 드러내는 도구보다, 사용한 뒤에는 없는 상태가 더 불편하게 느껴지는 도구를 만들었습니다.',
      context:
        '여러 창이 겹친 작업 화면에서는 지금 하는 일과 뒤쪽 정보가 같은 무게로 시선을 끕니다. Monkey Flash는 활성 창만 밝게 남기고 나머지 화면을 낮춰 시각적 우선순위를 정리합니다.',
      reason:
        '화면 내용이나 입력에 접근하지 않고도 같은 집중 효과를 만드는 것을 첫 번째 조건으로 삼았습니다. 무엇을 더 넣을지보다, 제품이 무엇을 요구하지 않을지를 먼저 정했습니다.',
      decisions: [
        {
          title: '권한 없이 동작하는 구조',
          body: 'macOS의 창 순서와 z-order를 이용해 딤 레이어를 활성 창 아래에 배치했습니다. 손쉬운 사용, 화면 기록, 입력 모니터링 권한을 요구하지 않습니다.',
        },
        {
          title: '밝기처럼 다루는 조절',
          body: '딤 강도와 페이드 속도, 라이트·다크 모드 값을 나누고 메뉴 막대에서도 바로 조절할 수 있게 했습니다.',
        },
        {
          title: '작업 방식에 맞춘 범위',
          body: '활성 창, 활성 앱, 디스플레이별 범위를 고르고 Fn 키로 잠시 해제하거나 특정 앱을 제외할 수 있습니다.',
        },
        {
          title: '로컬에 남는 설정',
          body: '계정, 분석, 광고, 추적, 클라우드 동기화를 넣지 않고 설정을 Mac에 저장합니다.',
        },
      ],
      refinement:
        '다중 디스플레이, 여러 창을 쓰는 앱, 임시 해제, 제외 앱, 라이트·다크 모드를 부가 옵션이 아니라 실제 사용의 경계로 다뤘습니다.',
      delivered: [
        '제품 방향과 기능 기준',
        '인터페이스와 설정 구조',
        'Swift / macOS 개발',
        'App Store 제출과 출시',
        '한국어·영어, 개인정보처리방침과 지원 페이지',
      ],
      status:
        'Mac App Store에 공개되어 있습니다. macOS 13 이상, Apple Silicon Mac에서 동작합니다.',
    },
    en: {
      statement: ['Less visual noise,', 'a clearer task at hand.'],
      summary:
        'A macOS utility that keeps the active window bright and quietly lowers the rest, helping attention settle without changing the way the user already works.',
      lead: 'It was designed to disappear into the way people already work, becoming more noticeable in its absence than in its use.',
      context:
        'In a workspace full of overlapping windows, the current task and everything behind it compete at the same visual weight. Monkey Flash keeps the active window bright and lowers the rest.',
      reason:
        'The starting condition was to create the same focus effect without access to screen contents or input. What the product would never ask for came before what it would add.',
      decisions: [
        {
          title: 'Permission-free by construction',
          body: 'macOS window ordering and z-ordering place the dimming layer beneath the active window, removing the need for Screen Recording, Accessibility or Input Monitoring.',
        },
        {
          title: 'Adjusted like brightness',
          body: 'Dim strength, fade speed and separate Light and Dark Mode values can also be adjusted straight from the menu bar.',
        },
        {
          title: 'Scoped to the way people work',
          body: 'Choose active-window, active-app or per-display behaviour, hold Fn to reveal everything temporarily, and exclude specific apps.',
        },
        {
          title: 'Settings stay local',
          body: 'There is no account, analytics, advertising, tracking or cloud sync. Settings are stored on the Mac.',
        },
      ],
      refinement:
        'Multiple displays, multi-window apps, temporary reveal, exclusions and appearance-specific values were treated as first-class boundaries rather than extra options.',
      delivered: [
        'Product direction and feature criteria',
        'Interface and settings architecture',
        'Swift / macOS engineering',
        'App Store submission and release',
        'Korean and English, privacy and support pages',
      ],
      status:
        'Published on the Mac App Store. It runs on macOS 13 and later, on Apple Silicon.',
    },
  },
};

const KB_INC: Project = {
  slug: 'kbinc',
  featuredOrder: 2,
  indexOrder: 2,
  title: 'KB Inc.',
  type: { ko: '의뢰 작업', en: 'Client work' },
  platform: { ko: '웹 · Astro 정적 콘텐츠', en: 'Web · Astro static content' },
  role: {
    ko: '정보 구조 · 화면 설계 · 구현',
    en: 'Information architecture · Interface · Build',
  },
  statusLabel: { ko: 'kbinc.kr 운영 중', en: 'Live at kbinc.kr' },
  externalUrl: 'https://kbinc.kr',
  externalCta: { ko: 'kbinc.kr 방문하기', en: 'Visit kbinc.kr' },
  media: {
    hero: {
      src: '/assets/work-kbinc.jpg',
      width: 1600,
      height: 900,
      ratio: '16-9',
      alt: {
        ko: '케이비(주) 홈페이지 첫 화면. 특장차 부품 공급 헤드라인과 에어서스펜션 제품 이미지가 보입니다.',
        en: 'The KB Inc. homepage hero with its special-vehicle parts message and an air-suspension product image.',
      },
    },
    preview: {
      src: '/assets/media/preview-kbinc.jpg',
      width: 840,
      height: 630,
      ratio: '1-1',
      alt: {
        ko: '케이비(주) 웹사이트 미리보기.',
        en: 'KB Inc. website preview.',
      },
    },
    gallery: [
      {
        src: '/assets/editorial/kbinc-panel-overview.jpg',
        width: 1000,
        height: 1250,
        ratio: '4-5',
        alt: {
          ko: '케이비(주) 홈페이지 첫 화면 왼쪽 영역. 로고, 헤드라인, 제품 보기 버튼이 보입니다.',
          en: 'The left area of the KB Inc. homepage hero, showing the logo, headline and product browsing button.',
        },
        caption: {
          ko: '첫 화면 왼쪽: 회사 소개보다 제품으로 가는 경로를 먼저 둡니다.',
          en: 'Left of the hero: the route to the products comes before the company narrative.',
        },
      },
      {
        src: '/assets/editorial/kbinc-panel-detail.jpg',
        width: 1000,
        height: 1250,
        ratio: '4-5',
        alt: {
          ko: '케이비(주) 홈페이지 첫 화면 오른쪽 영역. 상단 메뉴와 특장차 부품 제품 이미지가 보입니다.',
          en: 'The right area of the KB Inc. homepage hero, showing the top navigation and a special-vehicle parts product image.',
        },
        caption: {
          ko: '첫 화면 오른쪽: 제품 이미지와 상단 메뉴가 같은 화면에서 읽힙니다.',
          en: 'Right of the hero: the product image and the top navigation are read in the same view.',
        },
      },
      {
        src: '/assets/editorial/kbinc-panel-mobile.jpg',
        width: 1000,
        height: 1250,
        ratio: '4-5',
        alt: {
          ko: '케이비(주) 홈페이지 첫 화면 가운데 영역.',
          en: 'The centre area of the KB Inc. homepage hero.',
        },
        caption: {
          ko: '첫 화면 가운데: 헤드라인과 제품 이미지 사이의 여백.',
          en: 'Centre of the hero: the space held between the headline and the product image.',
        },
      },
    ],
  },
  seo: {
    title: {
      ko: '케이비(주) — 기억',
      en: 'KB Inc. — Memory',
    },
    description: {
      ko: '제품 탐색, 카탈로그 확인, 문의까지의 흐름을 한국어와 영어로 정리한 특장차 부품 기업의 공식 웹사이트입니다.',
      en: 'The official bilingual website of a special-vehicle parts supplier, organised around finding products, reading catalogs and getting in touch.',
    },
    image: '/assets/work-kbinc.jpg',
  },
  copy: {
    ko: {
      statement: ['정보의 순서를 바로잡아,', '기업의 인상을 분명하게.'],
      summary:
        '제품 탐색, 카탈로그 확인, 문의까지 방문자가 실제로 밟는 흐름을 한국어와 영어로 정리한 기업 웹사이트입니다.',
      lead: '시각적인 장식보다, 무엇을 먼저 이해해야 하고 어디로 이동해야 하는지를 정리했습니다.',
      context:
        '케이비(주)는 산업용·특장차 부품을 다룹니다. 방문자는 구매 담당자일 수도, 정비 현장일 수도, 해외 거래처일 수도 있습니다. 사이트는 제품 탐색, 카탈로그 열람과 다운로드, 문의를 한 흐름 안에 정리합니다.',
      reason:
        '서로 다른 목적으로 들어온 방문자가 같은 정보 구조 안에서 필요한 제품과 자료, 문의 경로를 찾도록 만드는 일이 필요했습니다.',
      decisions: [
        {
          title: '세 가지 과업을 먼저',
          body: '회사 소개보다 제품 탐색, 카탈로그 확인, 문의를 기본 축으로 두었습니다.',
        },
        {
          title: '언어가 바뀌어도 같은 길',
          body: '한국어와 영어가 같은 정보 구조를 공유해, 언어를 바꿔도 보던 맥락이 이어집니다.',
        },
        {
          title: '정적 콘텐츠와 문의 기능의 분리',
          body: '콘텐츠 페이지는 Astro 정적 출력으로 전달하고, 문의 처리는 별도의 serverless 범위로 두었습니다.',
        },
      ],
      refinement:
        '언어 선택 유지와 문의 실패 시의 대체 경로를 포함해, 방문자가 자료를 찾고 연락하는 흐름이 중간에서 끊기지 않도록 다듬었습니다.',
      delivered: [
        '공식 사이트 정보 구조와 화면 설계',
        'Astro 구현',
        '한국어·영어 콘텐츠 구조',
        '제품, 카탈로그, 문의 흐름',
        '정적 콘텐츠 배포와 문의 처리 연결',
      ],
      status:
        'kbinc.kr에서 운영 중입니다. 성과 수치나 고객 추천사는 확인 가능한 자료가 생기기 전까지 적지 않습니다.',
    },
    en: {
      statement: ['Order the information,', 'and the company reads clearly.'],
      summary:
        'A bilingual corporate website organised around the path visitors actually follow: find a product, read the catalog, and get in touch.',
      lead: 'The work began by deciding what visitors needed to understand first and where they needed to go next.',
      context:
        'KB Inc. supplies industrial and special-purpose vehicle parts. A visitor may be a buyer, a service floor, or an overseas partner. The site brings product browsing, catalog viewing and downloads, and enquiries into one clear flow.',
      reason:
        'Visitors arriving with different goals needed one information structure for reaching the right product, the right document, and the right way to make contact.',
      decisions: [
        {
          title: 'Three tasks come first',
          body: 'Product browsing, catalog access and enquiry form the primary axes, ahead of the company narrative.',
        },
        {
          title: 'One path in both languages',
          body: 'Korean and English share the same information architecture, so changing language preserves the context a visitor was reading in.',
        },
        {
          title: 'Static content, separate enquiry handling',
          body: 'Astro ships the content pages as static output while enquiries remain a separate serverless scope.',
        },
      ],
      refinement:
        'A persisted language choice and an enquiry fallback keep the path to information and contact from ending unexpectedly.',
      delivered: [
        'Official-site information architecture and interface',
        'Astro implementation',
        'Korean and English content structure',
        'Product, catalog and enquiry flows',
        'Static-content deployment and enquiry handling',
      ],
      status:
        'Live at kbinc.kr. Performance, lead and sales claims are left out until there is evidence to support them.',
    },
  },
};

export const PROJECTS: Project[] = [MONKEY_FLASH, KB_INC];

export const INDEX_PROJECTS = [...PROJECTS].sort(
  (a, b) => a.indexOrder - b.indexOrder,
);

export const FEATURED_PROJECTS = [...PROJECTS].sort(
  (a, b) => a.featuredOrder - b.featuredOrder,
);

export function getProject(slug: string): Project {
  const found = PROJECTS.find((p) => p.slug === slug);
  if (!found) throw new Error(`Unknown project slug: ${slug}`);
  return found;
}

export function nextProject(slug: string): Project {
  const i = INDEX_PROJECTS.findIndex((p) => p.slug === slug);
  return INDEX_PROJECTS[(i + 1) % INDEX_PROJECTS.length];
}

/* Case-study section labels — shared by both locales. */
export const CASE_LABELS = {
  context: { ko: '맥락', en: 'Context' },
  reason: { ko: '필요한 이유', en: 'Reason' },
  decisions: { ko: '판단', en: 'Decisions' },
  refinement: { ko: '다듬기', en: 'Refinement' },
  delivered: { ko: '전달 범위', en: 'Delivered' },
  status: { ko: '현재 상태', en: 'Status' },
  gallery: { ko: '화면', en: 'Gallery' },
  role: { ko: '역할', en: 'Role' },
  platform: { ko: '플랫폼', en: 'Platform' },
  type: { ko: '분류', en: 'Type' },
};
