import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const OUT = 'public/assets';

// Company mark, rendered onto a warm canvas tile for the raster icons.
const mark = (size, fg, bg, pad) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="${pad}" fill="${bg}"/>
  <g fill="none" stroke="${fg}" stroke-width="4" stroke-linecap="square">
    <path d="M6 18 V6 H18"/>
    <path d="M26 14 V26 H14"/>
  </g>
</svg>`;

const jobs = [
  // 32px favicon fallback — ink on warm canvas
  { file: 'favicon.png', size: 32, fg: '#1A1A18', bg: '#FAFAF8', pad: 0 },
  // iOS touch icon — inverted so it holds up on any home screen wallpaper
  { file: 'apple-touch-icon.png', size: 180, fg: '#FAFAF8', bg: '#1A1A18', pad: 6 },
  // square brand logo referenced by Organization JSON-LD
  { file: 'icon-brand-512.png', size: 512, fg: '#FAFAF8', bg: '#1A1A18', pad: 6 },
];

for (const j of jobs) {
  const buf = await sharp(Buffer.from(mark(j.size, j.fg, j.bg, j.pad)))
    .resize(j.size, j.size)
    .png()
    .toBuffer();
  writeFileSync(`${OUT}/${j.file}`, buf);
  console.log('wrote', j.file, buf.length, 'bytes');
}
