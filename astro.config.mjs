// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://bymemory.dev',
  output: 'static',
  build: {
    // Cloudflare Pages serves /work/monkey-flash cleanly from work/monkey-flash/index.html
    format: 'directory',
  },
  integrations: [sitemap()],
  compressHTML: true,
});
