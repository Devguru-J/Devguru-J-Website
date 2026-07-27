import sharp from 'sharp';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const editorial = path.join(root, 'public/assets/editorial');

async function crop(input, output, width, height, position = 'centre', quality = 86) {
  await sharp(path.join(root, input))
    .resize(width, height, {
      fit: 'cover',
      position,
      withoutEnlargement: false,
    })
    .jpeg({ quality, mozjpeg: true })
    .toFile(path.join(root, output));
}

async function framed(input, output, background, width, height, insetWidth, insetHeight) {
  const inset = await sharp(path.join(root, input))
    .resize(insetWidth, insetHeight, {
      fit: 'contain',
      background,
      withoutEnlargement: false,
    })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width,
      height,
      channels: 3,
      background,
    },
  })
    .composite([
      {
        input: inset,
        left: Math.round((width - insetWidth) / 2),
        top: Math.round((height - insetHeight) / 2),
      },
    ])
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(path.join(root, output));
}

const direction = 'source-assets/editorial/product-direction-master.png';
const interfaceDesign = 'source-assets/editorial/interface-design-woman-master.png';
const cloud = 'source-assets/editorial/cloud-infrastructure-master.png';
const studio = 'source-assets/editorial/studio-process-woman-master.png';
const nextProduct = 'source-assets/editorial/next-product-master.png';

await Promise.all([
  crop(direction, 'public/assets/editorial/product-direction-trail.jpg', 1000, 667, 'centre'),
  crop(interfaceDesign, 'public/assets/editorial/interface-design-trail.jpg', 1000, 667, 'centre'),
  crop(cloud, 'public/assets/editorial/cloud-infrastructure-trail.jpg', 1000, 667, 'centre'),
  crop(studio, 'public/assets/editorial/studio-process-trail.jpg', 1000, 667, 'centre'),
  crop(nextProduct, 'public/assets/editorial/next-product-trail.jpg', 1000, 667, 'centre'),

  crop(direction, 'public/assets/editorial/product-direction-card.jpg', 1200, 1500, 'centre'),
  crop(interfaceDesign, 'public/assets/editorial/interface-design-card.jpg', 1200, 1500, 'centre'),
  crop(cloud, 'public/assets/editorial/cloud-infrastructure-card.jpg', 1200, 1500, 'centre'),
  crop(studio, 'public/assets/editorial/studio-process-card.jpg', 1200, 1500, 'right'),
  crop(nextProduct, 'public/assets/editorial/next-product-card.jpg', 1200, 1500, 'centre'),

  crop(direction, 'public/assets/editorial/product-direction-inline.jpg', 1024, 789, 'centre'),
  crop(interfaceDesign, 'public/assets/editorial/interface-design-inline.jpg', 800, 520, 'centre'),
  crop(cloud, 'public/assets/editorial/cloud-infrastructure-inline.jpg', 800, 587, 'centre'),
  crop(studio, 'public/assets/editorial/studio-process-inline.jpg', 700, 482, 'right'),

  crop(direction, 'public/assets/editorial/principle-direction.jpg', 300, 300, 'centre'),
  crop(interfaceDesign, 'public/assets/editorial/principle-interface.jpg', 300, 300, 'centre'),
  crop(cloud, 'public/assets/editorial/principle-operations.jpg', 300, 300, 'centre'),
  crop(studio, 'public/assets/editorial/principle-support.jpg', 300, 300, 'right'),

  crop(studio, 'public/assets/editorial/studio-process-wide.jpg', 1800, 700, 'north', 89),

  crop(nextProduct, 'public/assets/editorial/next-product-hero.jpg', 1800, 1193, 'centre', 89),
  crop(nextProduct, 'public/assets/editorial/next-product-square-a.jpg', 800, 800, 'left'),
  crop(nextProduct, 'public/assets/editorial/next-product-square-b.jpg', 800, 800, 'right'),
  crop(nextProduct, 'public/assets/editorial/next-product-wide.jpg', 2075, 1338, 'centre', 89),

  crop('public/assets/work-kbinc.jpg', 'public/assets/editorial/kbinc-panel-overview.jpg', 1000, 1250, 'left', 90),
  crop('public/assets/work-kbinc.jpg', 'public/assets/editorial/kbinc-panel-detail.jpg', 1000, 1250, 'centre', 90),
  crop('public/assets/work-kbinc.jpg', 'public/assets/editorial/kbinc-panel-mobile.jpg', 1000, 1250, 'right', 90),

  framed(
    'public/assets/menu-popover.png',
    'public/assets/editorial/monkeyflash-detail-menu.jpg',
    '#ff4b24',
    800,
    800,
    690,
    610,
  ),
  framed(
    'public/assets/settings-visual.png',
    'public/assets/editorial/monkeyflash-detail-settings.jpg',
    '#121213',
    800,
    800,
    700,
    700,
  ),
]);

console.log(`Built editorial assets in ${editorial}`);
