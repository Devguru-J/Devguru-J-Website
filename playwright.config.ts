import { defineConfig, devices } from '@playwright/test';

/**
 * `astro preview` verifies static rendering only.
 *
 * Cloudflare Functions, `_redirects`, and the real 404 status are NOT covered
 * here — they must be checked against a Cloudflare Preview deployment (§26).
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'list',

  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
  },

  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    // Chromium-based mobile emulation, so CI only needs one browser download.
    { name: 'mobile', use: { ...devices['Pixel 5'] } },
  ],

  webServer: {
    command: 'npm run build && npm run preview',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
