/**
 * Monkey Flash legal and support copy.
 *
 * ⚠️ This text is the reviewed, confirmed wording referenced by
 * `reference/HANDOFF.md` §4 and submitted to App Store Connect. It is moved
 * here verbatim so the Korean and English routes cannot drift apart.
 *
 * Do not reword, summarise, or "improve" any of it. Only the confirmed
 * contact address (`EMAIL` in `src/config/site.ts`) is injected.
 */

import type { Lang } from '../config/site';

export type Block =
  | { type: 'p'; text: string }
  | { type: 'p'; text: string; strong: true }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ol'; items: string[] }
  | { type: 'ul'; items: string[] }
  | { type: 'contact'; label: string; before: string; after: string };

export interface LegalDoc {
  /** Page <h1>. */
  heading: string;
  /** Effective date or one-line summary shown under the heading. */
  standfirst: string;
  /** Short label above the heading. */
  overline: string;
  /** Meta description. */
  description: string;
  blocks: Block[];
}

export const privacy: Record<Lang, LegalDoc> = {
  en: {
    heading: 'Monkey Flash Privacy Policy',
    standfirst: 'Effective date: July 5, 2026',
    overline: 'Monkey Flash — Privacy Policy',
    description:
      'Monkey Flash does not collect, store, transmit, sell, or share personal data.',
    blocks: [
      { type: 'p', text: 'Monkey Flash does not collect, store, transmit, sell, or share personal data.' },

      { type: 'h2', text: 'Data Collected' },
      { type: 'p', text: 'None.', strong: true },
      {
        type: 'p',
        text: 'Monkey Flash does not require an account and does not include analytics SDKs, advertising SDKs, or remote tracking tools.',
      },

      { type: 'h2', text: 'Screen and Window Information' },
      {
        type: 'p',
        text: 'Monkey Flash uses permission-free macOS window ordering information to place a dimming layer around the active window. It does not collect or transmit screen contents, window titles, document names, web page contents, keyboard input, or mouse input.',
      },

      { type: 'h2', text: 'Local Settings' },
      {
        type: 'p',
        text: 'Settings such as dim intensity, shortcuts, excluded apps, start at login, and Dock icon visibility are stored locally on your Mac. They are not sent to the developer.',
      },

      { type: 'h2', text: 'Third Parties' },
      { type: 'p', text: 'Monkey Flash does not share personal data with third parties.' },

      { type: 'h2', text: 'Contact' },
      { type: 'contact', label: 'Contact', before: 'For privacy questions, email ', after: '.' },
    ],
  },

  ko: {
    heading: 'Monkey Flash 개인정보처리방침',
    standfirst: '시행일: 2026년 7월 5일',
    overline: 'Monkey Flash — 개인정보처리방침',
    description: 'Monkey Flash는 사용자의 개인정보를 수집, 저장, 전송, 판매하지 않습니다.',
    blocks: [
      { type: 'p', text: 'Monkey Flash는 사용자의 개인정보를 수집, 저장, 전송, 판매하지 않습니다.' },

      { type: 'h2', text: '수집하는 데이터' },
      { type: 'p', text: '수집하는 데이터가 없습니다.', strong: true },
      {
        type: 'p',
        text: 'Monkey Flash는 계정을 만들지 않으며, 분석 SDK, 광고 SDK, 원격 추적 도구를 포함하지 않습니다.',
      },

      { type: 'h2', text: '화면 및 창 정보' },
      {
        type: 'p',
        text: 'Monkey Flash는 활성 창 주변을 어둡게 표시하기 위해 macOS의 권한 없는 창 순서 정보를 사용합니다. 앱은 화면 내용, 창 제목, 문서 이름, 웹페이지 내용, 키보드 입력, 마우스 입력을 수집하거나 서버로 전송하지 않습니다.',
      },

      { type: 'h2', text: '로컬 설정' },
      {
        type: 'p',
        text: '딤 강도, 단축키, 제외 앱 목록, 로그인 시 자동 시작 같은 설정은 사용자의 Mac에 로컬로 저장됩니다. 이 정보는 개발자에게 전송되지 않습니다.',
      },

      { type: 'h2', text: '제3자 공유' },
      { type: 'p', text: 'Monkey Flash는 개인정보를 제3자와 공유하지 않습니다.' },

      { type: 'h2', text: '문의' },
      { type: 'contact', label: '문의', before: '개인정보 관련 문의는 ', after: ' 으로 보내 주세요.' },
    ],
  },
};

export const support: Record<Lang, LegalDoc> = {
  en: {
    heading: 'Monkey Flash Support',
    standfirst:
      'Monkey Flash keeps the active window bright and dims the background to help you focus.',
    overline: 'Monkey Flash — Support',
    description:
      'Support, quick start, and FAQ for Monkey Flash, the permission-free macOS focus dimmer.',
    blocks: [
      { type: 'h2', text: 'Quick Start' },
      {
        type: 'ol',
        items: [
          'Launch Monkey Flash.',
          'Click the Monkey Flash menu bar icon to adjust opacity.',
          'Open Settings to configure Fn reveal, multi-display behavior, shortcuts, excluded apps, and startup behavior.',
        ],
      },

      { type: 'h2', text: 'FAQ' },
      { type: 'h3', text: 'Does Monkey Flash need Accessibility permission?' },
      {
        type: 'p',
        text: 'No. Monkey Flash does not require Accessibility, Screen Recording, or Input Monitoring permissions.',
      },
      { type: 'h3', text: 'How do I adjust dim intensity?' },
      {
        type: 'p',
        text: 'Use the Opacity slider in the menu bar dropdown, or scroll over the menu bar icon for quick adjustments. You can also keep separate intensity values for Light Mode and Dark Mode.',
      },
      { type: 'h3', text: 'How do I temporarily reveal everything?' },
      {
        type: 'p',
        text: 'Hold the Fn key. Monkey Flash lifts the dimming while Fn is held. You can turn this behavior on or off in Settings.',
      },
      { type: 'h3', text: 'Can I exclude an app?' },
      {
        type: 'p',
        text: 'Yes. Add apps in Settings under Excluded Apps, or use the menu bar item to exclude the current app.',
      },

      { type: 'h2', text: 'Troubleshooting' },
      {
        type: 'ul',
        items: [
          'If the menu bar icon is hidden, reopen the app and check Show Status Bar Icon in Settings.',
          'If dimming feels too strong, lower Opacity.',
          'To launch automatically after login, enable Start at Login in Settings.',
        ],
      },

      { type: 'contact', label: 'Contact', before: 'Email ', after: '' },
    ],
  },

  ko: {
    heading: 'Monkey Flash 지원',
    standfirst:
      'Monkey Flash는 활성 창만 밝게 남기고 배경을 어둡게 덮어 집중을 돕는 macOS 유틸리티입니다.',
    overline: 'Monkey Flash — 지원',
    description:
      '권한 없이 작동하는 macOS 집중 도구 Monkey Flash의 빠른 시작, FAQ, 문제 해결 안내입니다.',
    blocks: [
      { type: 'h2', text: '빠른 시작' },
      {
        type: 'ol',
        items: [
          'Monkey Flash를 실행합니다.',
          '메뉴바의 Monkey Flash 아이콘을 클릭해 딤 강도를 조정합니다.',
          '필요한 경우 Settings에서 Fn 임시 해제, 멀티 디스플레이, 단축키, 제외 앱을 설정합니다.',
        ],
      },

      { type: 'h2', text: 'FAQ' },
      { type: 'h3', text: 'Accessibility 권한이 필요한가요?' },
      {
        type: 'p',
        text: '아니요. Monkey Flash는 Accessibility, Screen Recording, Input Monitoring 권한을 요구하지 않습니다.',
      },
      { type: 'h3', text: '딤 강도는 어떻게 조절하나요?' },
      {
        type: 'p',
        text: '메뉴바 드롭다운의 슬라이더로 조절하거나, 메뉴바 아이콘 위에서 스크롤해 빠르게 변경할 수 있습니다. 설정에서 라이트 모드와 다크 모드의 강도를 따로 둘 수도 있습니다.',
      },
      { type: 'h3', text: '잠깐 전체 화면을 밝게 보고 싶을 때는 어떻게 하나요?' },
      {
        type: 'p',
        text: 'Fn 키를 누르고 있는 동안 딤이 일시 해제됩니다. 이 동작은 Settings에서 켜거나 끌 수 있습니다.',
      },
      { type: 'h3', text: '특정 앱에서는 끄고 싶습니다.' },
      {
        type: 'p',
        text: 'Settings의 Excluded Apps에서 앱을 제외 목록에 추가하세요. 메뉴바 메뉴에서도 현재 앱을 빠르게 제외할 수 있습니다.',
      },

      { type: 'h2', text: '문제 해결' },
      {
        type: 'ul',
        items: [
          '메뉴바 아이콘이 보이지 않으면 Dock 아이콘으로 앱을 다시 열고 Settings에서 Show Status Bar Icon을 확인하세요.',
          '앱이 너무 강하게 느껴지면 Opacity를 낮추세요.',
          '로그인 후 자동 실행하려면 Settings에서 Start at Login을 켜세요.',
        ],
      },

      { type: 'contact', label: '문의', before: '이메일 ', after: '' },
    ],
  },
};
