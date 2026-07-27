// Derivatives for the 2026 monochrome rebuild.
// Ratios come from reference/remodelling/memory-business-site-2026/04-visual-direction.md §5.
// Run: node scripts/build-site-media.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = (p) => path.join(root, 'source-assets/editorial', p);
const out = (p) => path.join(root, 'public/assets/media', p);

async function crop(input, output, width, height, position = 'centre', quality = 84) {
  await sharp(input)
    .resize(width, height, { fit: 'cover', position })
    .jpeg({ quality, mozjpeg: true })
    .toFile(output);
  console.log(`${path.relative(root, output)}  ${width}×${height}`);
}

// Letterbox a real product screenshot onto an ink surface, so engineering
// media stays an actual shipped screen instead of a stock hardware photo.
async function framed(input, output, width, height, insetWidth) {
  const inset = await sharp(input)
    .resize(insetWidth, null, { fit: 'inside' })
    .toBuffer();
  const meta = await sharp(inset).metadata();
  await sharp({
    create: { width, height, channels: 3, background: '#11110f' },
  })
    .composite([
      {
        input: inset,
        left: Math.round((width - meta.width) / 2),
        top: Math.round((height - meta.height) / 2),
      },
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(output);
  console.log(`${path.relative(root, output)}  ${width}×${height} (framed)`);
}

const studio = src('studio-process-master.png');
const iface = src('interface-design-master.png');
const direction = src('product-direction-master.png');
const work = (p) => path.join(root, 'public/assets', p);

await Promise.all([
  // Studio feature media — desktop 16:7, mobile 4:5
  crop(studio, out('studio-wide.jpg'), 1760, 770, 'centre'),
  crop(studio, out('studio-portrait.jpg'), 1000, 1250, 'east'),

  // Capabilities sticky media — 4:5
  crop(direction, out('capability-direction.jpg'), 1000, 1250, 'centre'),
  crop(iface, out('capability-interface.jpg'), 1000, 1250, 'west'),
  framed(
    work('editorial/monkeyflash-detail-settings.jpg'),
    out('capability-engineering.jpg'),
    1000,
    1250,
    860,
  ),

  // Pointer-follow work preview — 4:3, max 420px wide on screen
  crop(work('work-monkeyflash.jpg'), out('preview-monkey-flash.jpg'), 840, 630, 'centre'),
  crop(work('work-kbinc.jpg'), out('preview-kbinc.jpg'), 840, 630, 'centre'),
]);
