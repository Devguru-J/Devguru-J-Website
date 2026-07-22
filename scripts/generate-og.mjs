import { chromium } from '@playwright/test';
import { readFileSync } from 'node:fs';

const OUT = 'public/assets';

// Warm canvas, brand name, industry descriptor, a single brass rule.
// No small text (§20.3).
const shot = (lang) =>
  readFileSync(`public/assets/work-monkeyflash-product-${lang}.jpg`).toString('base64');

const page = (opts) => `
<!doctype html><html lang="${opts.lang}"><head><meta charset="utf-8">
<style>
  @font-face { font-family: G; src: local('Geist'); }
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    width:1200px; height:630px; background:#FAFAF8; color:#1A1A18;
    font-family: ${opts.lang === 'ko'
      ? "'Pretendard Variable','Apple SD Gothic Neo','Noto Sans KR',sans-serif"
      : "'Geist','Inter',-apple-system,sans-serif"};
    display:flex; flex-direction:column; justify-content:space-between;
    padding:76px 84px; position:relative; overflow:hidden;
  }
  .mark { width:52px; height:52px; }
  /* When a product shot is present it occupies the right third, so the type
     block is held clear of it rather than running underneath. */
  .type { max-width:${opts.art ? '620px' : '100%'}; }
  .name {
    font-size:${opts.art ? '76px' : opts.lang === 'ko' ? '104px' : '108px'};
    font-weight:600; line-height:1;
    letter-spacing:${opts.lang === 'ko' ? '0.01em' : '-0.04em'};
  }
  .desc {
    margin-top:26px; font-size:34px; font-weight:400; color:#555550;
    line-height:1.35; max-width:26ch;
    letter-spacing:${opts.lang === 'ko' ? '-0.01em' : '-0.02em'};
    word-break:keep-all;
  }
  .rule { width:120px; height:3px; background:#945E1B; margin-top:40px; }
  .art {
    position:absolute; right:-56px; bottom:-96px; width:440px;
    border-radius:10px; box-shadow:0 24px 60px -18px rgba(26,26,24,.32);
    ${opts.art ? '' : 'display:none;'}
  }
</style></head><body>
  <svg class="mark" viewBox="0 0 32 32" fill="none" stroke="#1A1A18" stroke-width="4" stroke-linecap="square">
    <path d="M6 18 V6 H18"/><path d="M26 14 V26 H14"/>
  </svg>
  <div class="type">
    <div class="name">${opts.name}</div>
    <div class="desc">${opts.desc}</div>
    <div class="rule"></div>
  </div>
  <img class="art" src="data:image/jpeg;base64,${opts.art ? shot(opts.lang) : ''}">
</body></html>`;

const jobs = [
  {
    file: 'og-home-en.png',
    lang: 'en',
    name: 'Memory',
    desc: 'Independent software engineering studio',
    art: false,
  },
  {
    file: 'og-home-ko.png',
    lang: 'ko',
    name: '기억',
    desc: '독립 소프트웨어 엔지니어링 스튜디오',
    art: false,
  },
  {
    file: 'og-monkeyflash-en.png',
    lang: 'en',
    name: 'Monkey Flash',
    desc: 'macOS focus utility',
    art: true,
  },
  {
    file: 'og-monkeyflash-ko.png',
    lang: 'ko',
    name: 'Monkey Flash',
    desc: 'macOS 집중 도구',
    art: true,
  },
];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });

for (const job of jobs) {
  const p = await ctx.newPage();
  await p.setContent(page(job), { waitUntil: 'load' });
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: `${OUT}/${job.file}` });
  await p.close();
  console.log('wrote', job.file);
}

await browser.close();
