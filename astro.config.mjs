// @ts-check
import { defineConfig } from 'astro/config';

// Static output, no adapter. Cloudflare Pages runs `npm run build` → `dist`.
export default defineConfig({
  site: 'https://bymemory.dev',
});
