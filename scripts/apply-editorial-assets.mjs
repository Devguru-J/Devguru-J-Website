import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const rawRoot = path.join(root, 'src/raw');
const files = [
  'ko/body.html',
  'en/body.html',
  'ko/work-body.html',
  'en/work-body.html',
  'ko/monkey-flash-body.html',
  'en/monkey-flash-body.html',
  'ko/kbinc-body.html',
  'en/kbinc-body.html',
  'ko/next-product-body.html',
  'en/next-product-body.html',
];

const replacements = [
  // Homepage cursor trail.
  [/\/wp-content\/uploads\/sites\/45\/2025\/09\/desert\.jpg/g, '/assets/editorial/product-direction-trail.jpg'],
  [/\/wp-content\/uploads\/sites\/45\/2025\/09\/sky\.jpg/g, '/assets/editorial/interface-design-trail.jpg'],
  [/\/wp-content\/uploads\/sites\/45\/2025\/09\/office\.jpg/g, '/assets/editorial/cloud-infrastructure-trail.jpg'],
  [/\/wp-content\/uploads\/sites\/45\/2025\/09\/orange-shirt\.jpg/g, '/assets/editorial/studio-process-trail.jpg'],
  [/\/wp-content\/uploads\/sites\/45\/2025\/09\/eye-769x1024\.jpg/g, '/assets/editorial/next-product-trail.jpg'],

  // Capability cards.
  [/\/assets\/menu-popover\.png/g, '/assets/editorial/product-direction-card.jpg'],
  [/\/assets\/settings-visual\.png/g, '/assets/editorial/interface-design-card.jpg'],
  [/\/wp-content\/uploads\/sites\/45\/2025\/10\/flower-field\.jpg/g, '/assets/editorial/cloud-infrastructure-card.jpg'],
  [/\/wp-content\/uploads\/sites\/45\/2025\/10\/lamp\.jpg/g, '/assets/editorial/studio-process-card.jpg'],

  // Manifesto inline images.
  [/\/wp-content\/uploads\/sites\/45\/2025\/11\/good-faces-xmSWVeGEnJw-unsplash-6-1-1024x789\.jpg/g, '/assets/editorial/product-direction-inline.jpg'],
  [/\/wp-content\/uploads\/sites\/45\/2025\/11\/dale-alejandro-pmLFJlorrN4-unsplash-1\.jpg/g, '/assets/editorial/interface-design-inline.jpg'],
  [/\/wp-content\/uploads\/sites\/45\/2025\/11\/levi-stute-ic8AIr02-7g-unsplash-1\.jpg/g, '/assets/editorial/cloud-infrastructure-inline.jpg'],
  [/\/wp-content\/uploads\/sites\/45\/2025\/11\/orange-bg-minimal-1\.jpg/g, '/assets/editorial/studio-process-inline.jpg'],

  // Principles.
  [/\/wp-content\/uploads\/sites\/45\/2025\/11\/king-alexander-grey-r4e9l7_ouQU-unsplash-240x300\.jpg/g, '/assets/editorial/principle-direction.jpg'],
  [/\/wp-content\/uploads\/sites\/45\/2025\/09\/testimonial-1-296x300\.jpg/g, '/assets/editorial/principle-interface.jpg'],
  [/\/wp-content\/uploads\/sites\/45\/2025\/10\/testimonial-2-1\.jpg/g, '/assets/editorial/principle-operations.jpg'],

  // Monkey Flash project details and legacy featured image.
  [/\/wp-content\/uploads\/sites\/45\/2025\/02\/braxton-apana-2Y4KrTv1kvU-unsplash-1(?:-\d+x\d+)?\.jpg/g, '/assets/work-monkeyflash.jpg'],
  [/\/wp-content\/uploads\/sites\/45\/2025\/09\/eye-(?:800x800|350x350|150x150|140x140|100x100)\.jpg/g, '/assets/editorial/monkeyflash-detail-menu.jpg'],
  [/\/wp-content\/uploads\/sites\/45\/2025\/10\/vibes-(?:800x800|350x350|150x150|140x140|100x100)\.jpg/g, '/assets/editorial/monkeyflash-detail-settings.jpg'],

  // KB Inc. project details and legacy featured image.
  [/\/wp-content\/uploads\/sites\/45\/2025\/04\/yordan-stoyanov-IKy3Rqo3SBx4-unsplash-1(?:-\d+x\d+)?\.jpg/g, '/assets/work-kbinc.jpg'],
  [/\/wp-content\/uploads\/sites\/45\/2025\/04\/2(?:-\d+x\d+)?\.jpg/g, '/assets/editorial/kbinc-panel-detail.jpg'],
  [/\/wp-content\/uploads\/sites\/45\/2025\/04\/4(?:-\d+x\d+)?\.jpg/g, '/assets/editorial/kbinc-panel-mobile.jpg'],

  // Next product family. Specific square variants come before the broader family.
  [/\/wp-content\/uploads\/sites\/45\/2025\/09\/vale-PDmBDyN8llo-unsplash-(?:800x800|350x350|150x150|140x140|100x100)\.jpg/g, '/assets/editorial/next-product-square-a.jpg'],
  [/\/wp-content\/uploads\/sites\/45\/2025\/06\/christian-agbede-aohV_aatqQw-unsplash-1-1-800x800\.jpg/g, '/assets/editorial/next-product-square-b.jpg'],
  [/\/wp-content\/uploads\/sites\/45\/2025\/09\/vale-lVtNDwz1ggc-unsplash(?:-\d+x\d+)?\.jpg/g, '/assets/editorial/next-product-hero.jpg'],
  [/\/wp-content\/uploads\/sites\/45\/2025\/06\/vale-aDznCxY3Er8-unsplash-1(?:-\d+x\d+)?\.jpg/g, '/assets/editorial/next-product-wide.jpg'],
  [/\/wp-content\/uploads\/sites\/45\/2025\/06\/christian-agbede-aohV_aatqQw-unsplash-1-1(?:-\d+x\d+)?\.jpg/g, '/assets/editorial/next-product-hero.jpg'],
];

const videoKo = `<div class="nectar-video-wrap row-bg-layer" data-bg-alignment="">
\t\t\t\t<div class="nectar-video-inner">
\t\t\t\t<img class="nectar-video-bg" src="/assets/editorial/studio-process-wide.jpg" width="1800" height="700" alt="독립 소프트웨어 스튜디오의 제품 설계 작업 공간" style="width:100%;height:100%;object-fit:cover;" />
\t\t\t\t</div>
\t\t\t </div>`;

const videoEn = `<div class="nectar-video-wrap row-bg-layer" data-bg-alignment="">
\t\t\t\t<div class="nectar-video-inner">
\t\t\t\t<img class="nectar-video-bg" src="/assets/editorial/studio-process-wide.jpg" width="1800" height="700" alt="Independent software studio product design workspace" style="width:100%;height:100%;object-fit:cover;" />
\t\t\t\t</div>
\t\t\t </div>`;

function setRelatedImage(html, postId, asset) {
  const itemImage = new RegExp(
    `(<div class="nectar-post-grid-item" data-post-id="${postId}"[\\s\\S]*?data-nectar-img-src=")[^"]+`,
  );
  return html.replace(itemImage, `$1${asset}`);
}

for (const relative of files) {
  const file = path.join(rawRoot, relative);
  let html = await fs.readFile(file, 'utf8');

  for (const [pattern, replacement] of replacements) {
    html = html.replace(pattern, replacement);
  }

  // The legacy demo's related-work markup reuses post IDs with mismatched
  // image families, so fix those cards using their page context.
  if (relative.endsWith('monkey-flash-body.html')) {
    html = setRelatedImage(html, '85', '/assets/work-kbinc.jpg');
    html = setRelatedImage(html, '80', '/assets/editorial/next-product-hero.jpg');
  }

  if (relative.endsWith('kbinc-body.html')) {
    html = setRelatedImage(html, '80', '/assets/work-monkeyflash.jpg');
    html = setRelatedImage(html, '85', '/assets/editorial/next-product-hero.jpg');
  }

  // Project assets are single exact crops, so legacy responsive stock-image
  // sets must not override them at wider breakpoints.
  html = html.replace(/<img\b[^>]*>/g, (tag) => {
    if (!/data-nectar-img-src="\/assets\//.test(tag)) return tag;
    return tag.replace(
      /\sdata-nectar-img-srcset="[^"]*"\s*sizes="[^"]*"/,
      '',
    );
  });

  if (relative === 'ko/body.html' || relative === 'en/body.html') {
    const replacement = relative.startsWith('ko/') ? videoKo : videoEn;
    let principleImageIndex = 0;
    html = html.replace(
      /data-nectar-img-src="\/assets\/editorial\/principle-operations\.jpg"/g,
      (match) => {
        principleImageIndex += 1;
        return principleImageIndex === 2
          ? 'data-nectar-img-src="/assets/editorial/principle-support.jpg"'
          : match;
      },
    );
    html = html.replace(
      /<div class="nectar-video-wrap row-bg-layer" data-bg-alignment="">\s*<div class="nectar-video-inner">\s*<video class="nectar-video-bg nectar-lazy-video"[^>]*><source[^>]*><\/video>\s*<\/div>\s*<\/div>/,
      replacement,
    );

    if (relative.startsWith('ko/')) {
      html = html
        .replace(/class="link_text pp nectar_video_lightbox" role="button" href="https:\/\/www\.youtube\.com\/watch\?v=5Fv4WQ-e-0E"/, 'class="link_text" role="button" href="#contact"')
        .replace(/data-text="Play Video">Play Video</, 'data-text="프로젝트 문의">프로젝트 문의<');
    } else {
      html = html
        .replace(/class="link_text pp nectar_video_lightbox" role="button" href="https:\/\/www\.youtube\.com\/watch\?v=5Fv4WQ-e-0E"/, 'class="link_text" role="button" href="#contact"')
        .replace(/data-text="Play Video">Play Video</, 'data-text="Start a project">Start a project<');
    }
  }

  if (relative.endsWith('kbinc-body.html')) {
    const alt = relative.startsWith('ko/')
      ? '케이비 공식 웹사이트 메인 화면'
      : 'KB Inc. corporate website overview';
    html = html.replace(
      'src="/assets/work-kbinc.jpg" alt=""',
      `src="/assets/editorial/kbinc-panel-overview.jpg" alt="${alt}"`,
    );
  }

  await fs.writeFile(file, html);
}

console.log(`Applied editorial assets to ${files.length} localized page bodies`);
