import type { Bilingual } from '../lib/i18n';

/* Verified brand facts — 12-content-assets-decisions.md §1/§2.
   Nothing in this file may be softened, embellished or extended without an
   entry in that document's approval register. */

export const BRAND = {
  name: { ko: '기억', en: 'Memory' } satisfies Bilingual,
  wordmark: 'Memory',
  descriptor: {
    ko: '독립 소프트웨어 스튜디오',
    en: 'Independent software studio',
  } satisfies Bilingual,
  line: 'Built to be remembered.',
  explanation: {
    ko: '계속 사용할 이유가 남는 제품을 만듭니다.',
    en: 'We make products people keep using.',
  } satisfies Bilingual,
  origin: 'https://bymemory.dev',
};

export const CONTACT = {
  email: 'devguru.j610@gmail.com',
  github: 'https://github.com/Devguru-J',
  appStore:
    'https://apps.apple.com/kr/app/monkey-flash/id6790402017?mt=12',
};

/* ---------------------------------------------------------------- Home --- */

export const HERO = {
  eyebrow: BRAND.descriptor,
  line: BRAND.line,
  statement: {
    ko: ['계속 사용할 이유가 남는', '제품을 만듭니다.'],
    en: ['Products people', 'keep using.'],
  } satisfies Bilingual<string[]>,
  body: {
    ko: '기억은 작지만 반복되는 불편을 발견하고, 필요한 만큼 만들고, 오래 사용할 수 있도록 끝까지 다듬습니다.',
    en: 'Memory finds small, persistent friction, builds only what the problem needs, and refines the result until it earns a place in everyday use.',
  } satisfies Bilingual,
  primaryCta: { ko: '작업 보기', en: 'View the work' } satisfies Bilingual,
  secondaryCta: {
    ko: '만드는 방식',
    en: 'How Memory works',
  } satisfies Bilingual,
  scrollHint: { ko: '아래로', en: 'Scroll' } satisfies Bilingual,
};

export const SELECTED_WORK = {
  eyebrow: { ko: 'Selected Work', en: 'Selected Work' } satisfies Bilingual,
  heading: {
    ko: ['말보다 먼저,', '제품이 설명합니다.'],
    en: ['The work speaks', 'before we do.'],
  } satisfies Bilingual<string[]>,
  intro: {
    ko: '공개할 수 있는 작업만 보여 줍니다. 수를 채우기보다, 만들 이유와 판단을 끝까지 설명합니다.',
    en: 'Only work that can be shown publicly appears here. Each case explains why it needed to exist and how it was brought to completion.',
  } satisfies Bilingual,
  projectCta: {
    ko: '작업 자세히 보기',
    en: 'Read the case',
  } satisfies Bilingual,
  allCta: { ko: '전체 작업 보기', en: 'View all work' } satisfies Bilingual,
};

export const INTERLUDE = {
  label: { ko: 'Memory / Principle', en: 'Memory / Principle' } satisfies Bilingual,
  lines: {
    ko: ['기억에 남기 위해 과장하지 않습니다.', '계속 쓸 만하기 때문에 남는 제품을 만듭니다.'],
    en: ['Not made to demand attention.', 'Made to remain useful.'],
  } satisfies Bilingual<string[]>,
};

export const APPROACH = {
  id: 'approach',
  eyebrow: { ko: '만드는 방식', en: 'Approach' } satisfies Bilingual,
  heading: {
    ko: '다섯 가지 판단으로 남길 것을 정합니다.',
    en: 'Five decisions shape what remains.',
  } satisfies Bilingual,
  intro: {
    ko: '기능의 수가 아니라 이 다섯 가지 판단이 제품에 남는 것을 결정합니다.',
    en: 'What remains in a product is decided by these five judgments, not by the number of features.',
  } satisfies Bilingual,
  steps: [
    {
      number: '01',
      title: { ko: '불편을 봅니다.', en: 'Notice the friction.' } satisfies Bilingual,
      body: {
        ko: '반복해서 흐름을 끊는 일과, 익숙해져서 그냥 지나친 불편을 살핍니다.',
        en: 'Look for the small interruption people have learned to tolerate.',
      } satisfies Bilingual,
      media: {
        src: '/assets/monkey-flash/frame-01-hero.jpg',
        width: 2000,
        height: 1250,
        alt: {
          ko: 'Monkey Flash가 활성 창만 밝게 두고 뒤쪽 창을 낮춘 macOS 화면. 한국어 프로모션 문구가 함께 있습니다.',
          en: 'Korean Monkey Flash promotional frame showing the active window bright and the surrounding windows dimmed.',
        } satisfies Bilingual,
      },
    },
    {
      number: '02',
      title: { ko: '이유를 묻습니다.', en: 'Clarify the reason.' } satisfies Bilingual,
      body: {
        ko: '누가 언제 사용하는지, 기존 방식보다 무엇이 나아져야 하는지를 먼저 정합니다.',
        en: 'Define who needs it, when, and what should work better than it does now.',
      } satisfies Bilingual,
      media: {
        src: '/assets/monkey-flash/frame-02-permissions.jpg',
        width: 2000,
        height: 1250,
        alt: {
          ko: '손쉬운 사용, 화면 기록, 입력 모니터링 권한이 모두 필요 없음을 보여 주는 Monkey Flash 화면. 한국어 프로모션 문구가 함께 있습니다.',
          en: 'Korean Monkey Flash frame showing Accessibility, Screen Recording and Input Monitoring all marked as not required.',
        } satisfies Bilingual,
      },
    },
    {
      number: '03',
      title: {
        ko: '필요한 만큼 만듭니다.',
        en: 'Build what is needed.',
      } satisfies Bilingual,
      body: {
        ko: '핵심 문제를 해결하는 기능만 남기고, 목적을 흐리는 요소는 덜어냅니다.',
        en: 'Keep the parts that solve the essential problem and remove the rest.',
      } satisfies Bilingual,
      media: {
        src: '/assets/monkey-flash/frame-03-dimming.jpg',
        width: 2000,
        height: 1250,
        alt: {
          ko: 'Monkey Flash에서 딤 강도를 1% 단위로 조절하는 화면. 한국어 프로모션 문구가 함께 있습니다.',
          en: 'Korean Monkey Flash frame showing dim strength adjusted in one-percent steps.',
        } satisfies Bilingual,
      },
    },
    {
      number: '04',
      title: {
        ko: '사용에 맞춰 다듬습니다.',
        en: 'Refine through use.',
      } satisfies Bilingual,
      body: {
        ko: '속도, 안정성, 예외 상황, 문장과 인터랙션을 실제 사용 기준으로 고칩니다.',
        en: 'Improve speed, reliability, edge cases, language and interaction against real use.',
      } satisfies Bilingual,
      media: {
        src: '/assets/monkey-flash/frame-04-scope.jpg',
        width: 2000,
        height: 1250,
        alt: {
          ko: '활성 창, 활성 앱, 디스플레이별 하이라이트 범위를 고르는 Monkey Flash 화면 설정. 한국어 프로모션 문구가 함께 있습니다.',
          en: 'Korean Monkey Flash frame showing highlight scope options for the active window, the active app and each display.',
        } satisfies Bilingual,
      },
    },
    {
      number: '05',
      title: { ko: '오래 쓰이게 합니다.', en: 'Keep it useful.' } satisfies Bilingual,
      body: {
        ko: '처음의 인상보다, 시간이 지난 뒤에도 다시 사용할 이유가 남았는지를 확인합니다.',
        en: 'Judge the result by whether there is still a reason to return to it.',
      } satisfies Bilingual,
      media: {
        src: '/assets/work-kbinc.jpg',
        width: 1600,
        height: 900,
        alt: {
          ko: '지금도 운영 중인 케이비(주) 홈페이지 첫 화면. 특장차 부품 공급 헤드라인과 제품 이미지가 보입니다.',
          en: 'The KB Inc. homepage hero, still in service, with its special-vehicle parts message and a product image.',
        } satisfies Bilingual,
      },
    },
  ],
};

export const STUDIO = {
  id: 'studio',
  eyebrow: { ko: 'Studio', en: 'Studio' } satisfies Bilingual,
  heading: {
    ko: ['작은 규모.', '깊은 관여.'],
    en: ['Small in scale.', 'Deeply involved.'],
  } satisfies Bilingual<string[]>,
  body: {
    ko: '기억은 한 사람이 운영하는 독립 스튜디오입니다. 처음 문제를 듣는 일부터 제품의 방향을 정하고, 화면을 설계하고, 코드를 작성해 출시하는 일까지 같은 판단의 흐름 안에서 이어 갑니다.',
    en: 'Memory is an independent studio run by one person, guided by the same judgment from first conversation to release: setting direction, designing the interface, and writing the code.',
  } satisfies Bilingual,
  support: {
    ko: '새로운 기술을 썼다는 사실보다, 사용자가 체감할 차이를 만드는지 먼저 봅니다.',
    en: 'A technology matters only when it creates a difference the user can feel.',
  } satisfies Bilingual,
  media: {
    src: '/assets/monkey-flash/frame-03-dimming.jpg',
    width: 2000,
    height: 1250,
    alt: {
      ko: 'Monkey Flash에서 딤 강도를 1% 단위로 조절하는 화면. 한국어 프로모션 문구가 함께 있습니다.',
      en: 'Korean Monkey Flash frame showing dim strength adjusted in one-percent steps.',
    } satisfies Bilingual,
    caption: {
      ko: '조절 단위 하나까지 실제 사용 기준으로 정한 Monkey Flash 화면 설정.',
      en: 'Monkey Flash screen settings, where even the adjustment step was decided against real use.',
    } satisfies Bilingual,
  },
};

export const CONTACT_SCENE = {
  id: 'contact',
  eyebrow: { ko: '프로젝트 문의', en: 'Start a project' } satisfies Bilingual,
  heading: {
    ko: ['함께 만들 이유가', '분명하다면.'],
    en: ['If there is a clear', 'reason to make it.'],
  } satisfies Bilingual<string[]>,
  body: {
    ko: '아직 작고 설명하기 어려운 불편이라도 좋습니다. 무엇을 만들어야 할지보다, 무엇이 더 나아져야 하는지부터 이야기합니다.',
    en: 'The problem can still be small or difficult to explain. Start with what should work better, not with what should be built.',
  } satisfies Bilingual,
  cta: {
    ko: '프로젝트 이야기하기',
    en: 'Start a conversation',
  } satisfies Bilingual,
};

export const WORK_INDEX = {
  eyebrow: { ko: 'Work', en: 'Work' } satisfies Bilingual,
  heading: {
    ko: ['공개할 수 있는 작업을,', '끝까지 보여 줍니다.'],
    en: ['Every public project,', 'shown in full.'],
  } satisfies Bilingual<string[]>,
  intro: {
    ko: '제품의 수보다, 각 작업이 어디에서 시작했고 무엇을 남겼는지가 중요합니다.',
    en: 'The count matters less than where each piece of work began and what continues to matter.',
  } satisfies Bilingual,
};

/* ------------------------------------------------------------- Utility --- */

export const UI = {
  skip: { ko: '본문으로 건너뛰기', en: 'Skip to content' } satisfies Bilingual,
  menu: { ko: '메뉴', en: 'Menu' } satisfies Bilingual,
  close: { ko: '닫기', en: 'Close' } satisfies Bilingual,
  nextProject: { ko: '다음 작업', en: 'Next project' } satisfies Bilingual,
  backToWork: { ko: '전체 작업으로', en: 'Back to work' } satisfies Bilingual,
  externalNote: { ko: '새 창에서 열기', en: 'Opens in a new tab' } satisfies Bilingual,
  languageGroup: { ko: '언어', en: 'Language' } satisfies Bilingual,
  projectCount: { ko: '공개 작업', en: 'Public projects' } satisfies Bilingual,
  directory: { ko: '둘러보기', en: 'Directory' } satisfies Bilingual,
  elsewhere: { ko: '다른 곳에서', en: 'Elsewhere' } satisfies Bilingual,
  legal: { ko: 'Monkey Flash', en: 'Monkey Flash' } satisfies Bilingual,
  privacy: { ko: '개인정보처리방침', en: 'Privacy' } satisfies Bilingual,
  support: { ko: '지원', en: 'Support' } satisfies Bilingual,
  rights: {
    ko: '기억 · 독립 소프트웨어 스튜디오',
    en: 'Memory · Independent software studio',
  } satisfies Bilingual,
};

export const NOT_FOUND = {
  heading: {
    ko: '이 주소에는 아무것도 없습니다.',
    en: 'There is nothing at this address.',
  } satisfies Bilingual,
  body: {
    ko: '주소가 바뀌었거나 아직 만들어지지 않은 페이지입니다.',
    en: 'The address may have changed, or the page may not exist yet.',
  } satisfies Bilingual,
  home: { ko: '홈으로 돌아가기', en: 'Return home' } satisfies Bilingual,
  work: { ko: '작업 보기', en: 'View work' } satisfies Bilingual,
};

export const NEXT_PRODUCT_NOTICE = {
  eyebrow: { ko: 'Work', en: 'Work' } satisfies Bilingual,
  heading: {
    ko: ['다음 작업을', '준비하고 있습니다.'],
    en: ['What comes next', 'is taking shape.'],
  } satisfies Bilingual<string[]>,
  body: {
    ko: '지금 공개할 수 있는 작업은 Work에서 확인해 주세요.',
    en: 'See the work Memory can share today in the Work index.',
  } satisfies Bilingual,
  cta: { ko: '전체 작업 보기', en: 'View all work' } satisfies Bilingual,
  title: {
    ko: '다음 작업 — 기억',
    en: 'What comes next — Memory',
  } satisfies Bilingual,
  description: {
    ko: '기억의 공개 작업은 Work에서 확인할 수 있습니다.',
    en: 'See Memory’s currently published work in the Work index.',
  } satisfies Bilingual,
};

export const META = {
  home: {
    title: {
      ko: '기억 — 독립 소프트웨어 스튜디오',
      en: 'Memory — Independent Software Studio',
    } satisfies Bilingual,
    description: {
      ko: '기억은 작은 불편을 발견하고, 필요한 만큼 만들고, 오래 사용할 수 있도록 끝까지 다듬는 독립 소프트웨어 스튜디오입니다.',
      en: 'Memory is an independent software studio that turns small, persistent friction into products built to remain useful.',
    } satisfies Bilingual,
  },
  work: {
    title: {
      ko: '작업 — 기억',
      en: 'Work — Memory',
    } satisfies Bilingual,
    description: {
      ko: '기억이 공개할 수 있는 작업과, 각 작업이 어디에서 시작해 무엇을 남겼는지를 정리했습니다.',
      en: 'The projects Memory can show publicly, and what each one began from and left behind.',
    } satisfies Bilingual,
  },
  notFound: {
    title: {
      ko: '페이지를 찾을 수 없습니다 — 기억',
      en: 'Page not found — Memory',
    } satisfies Bilingual,
  },
};
