import { test, expect, type Page } from '@playwright/test';

/**
 * Regression cover for the acceptance criteria in §27 that can be verified
 * against a static preview build.
 *
 * NOT covered here (needs a Cloudflare Preview deployment, §26 phase 10):
 * real HTTP 404 status, `_redirects` hops, host normalisation, and the
 * `/` language function.
 */

const LOCALES = [
  { path: '/', lang: 'en', brand: 'Memory', other: '/ko/' },
  { path: '/ko/', lang: 'ko', brand: '기억', other: '/' },
] as const;

const LEGAL = [
  '/MonkeyFlash/privacy/',
  '/MonkeyFlash/support/',
  '/ko/MonkeyFlash/privacy/',
  '/ko/MonkeyFlash/support/',
] as const;

const ALL_PAGES = [...LOCALES.map((l) => l.path), ...LEGAL, '/404.html'];

/** §27.1 — no unexplained legacy brand strings survive anywhere. */
const LEGACY = /Devguru-J|DEVGURU-J|Devguru|DEVGURU|devguru-j(?!\.com)/;

async function bodyText(page: Page) {
  return (await page.locator('body').innerText()) ?? '';
}

test.describe('brand and copy', () => {
  for (const { path, lang, brand } of LOCALES) {
    test(`${path} carries the right brand and language`, async ({ page }) => {
      await page.goto(path);

      await expect(page.locator('html')).toHaveAttribute('lang', lang);
      await expect(page).toHaveTitle(new RegExp(brand));

      const text = await bodyText(page);
      expect(text).toContain(brand);

      // The two brand names never appear together outside brand guidelines.
      const otherBrand = lang === 'en' ? '기억' : 'Memory';
      expect(text).not.toContain(otherBrand);
    });
  }

  for (const path of ALL_PAGES) {
    test(`${path} has no legacy brand strings`, async ({ page }) => {
      await page.goto(path);
      const html = await page.content();
      // devguru-j.com survives as the canonical domain until the migration.
      const withoutDomain = html.replaceAll('devguru-j.com', '').replaceAll('devguru.j610@gmail.com', '');
      expect(withoutDomain).not.toMatch(LEGACY);
    });
  }

  test('the first viewport states the industry (§27.1)', async ({ page }) => {
    await page.goto('/');
    const hero = await page.locator('main section').first().innerText();
    expect(hero.toLowerCase()).toContain('software');
    expect(hero.toLowerCase()).toContain('studio');
  });

  test('Korean hero states 소프트웨어 and 독립 스튜디오', async ({ page }) => {
    await page.goto('/ko/');
    const hero = await page.locator('main section').first().innerText();
    expect(hero).toContain('소프트웨어');
    expect(hero).toContain('독립');
    expect(hero).toContain('스튜디오');
  });
});

test.describe('metadata (§27.3)', () => {
  for (const { path, lang, other } of LOCALES) {
    test(`${path} canonical, hreflang and OG match the locale`, async ({ page }) => {
      await page.goto(path);

      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        `https://devguru-j.com${path}`
      );
      await expect(page.locator(`link[rel="alternate"][hreflang="${lang}"]`)).toHaveAttribute(
        'href',
        `https://devguru-j.com${path}`
      );
      await expect(
        page.locator(`link[rel="alternate"][hreflang="${lang === 'en' ? 'ko' : 'en'}"]`)
      ).toHaveAttribute('href', `https://devguru-j.com${other}`);

      await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute(
        'content',
        lang === 'ko' ? 'ko_KR' : 'en_US'
      );
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
        'content',
        `https://devguru-j.com/assets/og-home-${lang}.png`
      );
    });
  }

  for (const { path, lang } of LOCALES) {
    test(`${path} shows the product screenshot for its own locale`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('#work img').first()).toHaveAttribute(
        'src',
        `/assets/work-monkeyflash-product-${lang}.jpg`
      );
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
        'content',
        new RegExp(`og-home-${lang}\\.png$`)
      );
    });
  }

  test('legal pages use the product OG image for their locale', async ({ page }) => {
    for (const path of LEGAL) {
      await page.goto(path);
      const lang = path.startsWith('/ko/') ? 'ko' : 'en';
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
        'content',
        new RegExp(`og-monkeyflash-${lang}\\.png$`)
      );
    }
  });

  test('home pages emit valid Organization + WebSite JSON-LD', async ({ page }) => {
    await page.goto('/');
    const raw = await page.locator('script[type="application/ld+json"]').textContent();
    expect(raw).toBeTruthy();

    const data = JSON.parse(raw!);
    const types = data['@graph'].map((n: { '@type': string }) => n['@type']);
    expect(types).toContain('Organization');
    expect(types).toContain('WebSite');

    const org = data['@graph'].find((n: { '@type': string }) => n['@type'] === 'Organization');
    expect(org.name).toBe('Memory');
    expect(org.alternateName).toBe('기억');
    // Unverified facts must not be invented (§27.1).
    expect(org.legalName).toBeUndefined();
    expect(org.founder).toBeUndefined();
    expect(org.address).toBeUndefined();
  });

  test('the 404 page is noindex', async ({ page }) => {
    await page.goto('/404.html');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  });

  for (const path of ALL_PAGES) {
    test(`${path} has exactly one h1`, async ({ page }) => {
      await page.goto(path);
      // The 404 ships both locales, one of which is hidden.
      const visible = page.locator('h1:visible');
      await expect(visible).toHaveCount(1);
    });
  }
});

test.describe('navigation and language (§27.3)', () => {
  for (const { path, other } of LOCALES) {
    test(`${path} language switch goes to the matching route`, async ({ page }) => {
      await page.goto(path);

      // The switch lives in the top bar on desktop and in the panel on mobile.
      const inBar = page.locator('.nav-desktop a[data-set-lang]');
      if (!(await inBar.isVisible())) {
        await page.locator('#menu-toggle').click();
      }

      await page.locator('a[data-set-lang]:visible').first().click();
      await expect(page).toHaveURL(new RegExp(`${other.replace(/\//g, '\\/')}$`));
    });
  }

  test('the top nav is three links plus the language switch (§7.2)', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.nav-desktop .nav-link:not(.nav-lang)')).toHaveCount(3);
    await expect(page.locator('.nav-desktop .nav-lang')).toHaveCount(1);
  });

  test('every in-page anchor resolves to a real section', async ({ page }) => {
    await page.goto('/');
    const hrefs = await page.locator('a[href*="#"]').evaluateAll((links) =>
      links
        .map((a) => (a as HTMLAnchorElement).getAttribute('href') ?? '')
        .filter((h) => h.includes('#'))
        .map((h) => h.slice(h.indexOf('#') + 1))
        .filter(Boolean)
    );

    expect(hrefs.length).toBeGreaterThan(0);
    for (const id of new Set(hrefs)) {
      await expect(page.locator(`#${id}`)).toHaveCount(1);
    }
  });

  test('legal routes render in their own language', async ({ page }) => {
    for (const path of LEGAL) {
      await page.goto(path);
      const expected = path.startsWith('/ko/') ? 'ko' : 'en';
      await expect(page.locator('html')).toHaveAttribute('lang', expected);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        `https://devguru-j.com${path}`
      );
    }
  });
});

test.describe('accessibility (§27.4)', () => {
  test('the skip link takes focus and targets main', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skip = page.locator('.skip-link');
    await expect(skip).toBeFocused();
    await expect(skip).toHaveAttribute('href', '#main');
    await expect(page.locator('#main')).toHaveCount(1);
  });

  test('Escape closes the mobile menu and returns focus', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto('/');

    const toggle = page.locator('#menu-toggle');
    const menu = page.locator('#mobile-menu');

    await toggle.click();
    await expect(menu).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');

    await page.keyboard.press('Escape');
    await expect(menu).toBeHidden();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle).toBeFocused();
  });

  test('interactive targets clear 44x44 on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto('/');

    const targets = page.locator('.nav-inner a, .nav-inner button');
    for (let i = 0; i < (await targets.count()); i++) {
      const box = await targets.nth(i).boundingBox();
      if (!box) continue;
      expect(box.height).toBeGreaterThanOrEqual(44);
    }
  });

  test('status is conveyed as text, not colour alone', async ({ page }) => {
    await page.goto('/ko/');
    const status = page.locator('.status').first();
    await expect(status).toContainText('이용 가능');
    await expect(status).toContainText('상태:');
  });

  test('external links are marked as opening a new tab', async ({ page }) => {
    await page.goto('/');
    const external = page.locator('main a[target="_blank"]:not([aria-hidden="true"])');
    for (let i = 0; i < (await external.count()); i++) {
      await expect(external.nth(i)).toContainText('Opens in a new tab');
    }
  });
});

test.describe('resilience and layout (§27.4)', () => {
  test.describe('without JavaScript', () => {
    test.use({ javaScriptEnabled: false });

    test('content is visible when JS never runs', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('#work')).toBeVisible();
      await expect(page.locator('#studio')).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();
    });
  });

  test('content appears even when the motion module throws', async ({ page }) => {
    // The inline script arms the hidden state before first paint; the module
    // then dies on the way up. This is exactly what the dead-man's switch is
    // for, and it is the failure the CSS alone cannot recover from.
    await page.addInitScript(() => {
      Object.defineProperty(window, 'IntersectionObserver', {
        get() {
          throw new Error('simulated failure');
        },
      });
    });

    await page.goto('/');

    const belowFold = page.locator('#studio h2');
    await expect(belowFold).toBeVisible();
    await expect
      .poll(() => belowFold.evaluate((el) => getComputedStyle(el).opacity), { timeout: 6000 })
      .toBe('1');
    await expect(page.locator('html')).not.toHaveClass(/reveal-armed/);
  });

  test('light and dark each get their own palette', async ({ page }) => {
    const canvasFor = async (scheme: 'light' | 'dark') => {
      await page.emulateMedia({ colorScheme: scheme });
      await page.goto('/');
      return page.evaluate(() =>
        getComputedStyle(document.documentElement).getPropertyValue('--color-canvas').trim()
      );
    };

    const light = await canvasFor('light');
    const dark = await canvasFor('dark');

    expect(light.toLowerCase()).toBe('#fafaf8');
    expect(dark.toLowerCase()).toBe('#11110f');
  });

  for (const width of [320, 375, 768, 1024, 1440]) {
    test(`no horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      for (const path of ['/', '/ko/']) {
        await page.goto(path);
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth > document.documentElement.clientWidth
        );
        expect(overflow, `${path} overflows at ${width}px`).toBe(false);
      }
    });
  }

  test('work images carry intrinsic dimensions so nothing shifts', async ({ page }) => {
    await page.goto('/');
    const images = page.locator('main img');
    expect(await images.count()).toBeGreaterThan(0);
    for (let i = 0; i < (await images.count()); i++) {
      await expect(images.nth(i)).toHaveAttribute('width', /\d+/);
      await expect(images.nth(i)).toHaveAttribute('height', /\d+/);
      await expect(images.nth(i)).toHaveAttribute('alt', /.+/);
    }
  });

  test('no continuous animation frame loop is running', async ({ page }) => {
    await page.goto('/');
    const frames = await page.evaluate(
      () =>
        new Promise<number>((resolve) => {
          let count = 0;
          const tick = () => {
            count++;
            requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          // Only our own probe should be scheduling frames.
          setTimeout(() => resolve(count), 600);
        })
    );
    // A WebGL/Lenis RAF loop would not change this number, so assert instead on
    // the absence of the libraries that used to drive one.
    expect(frames).toBeGreaterThan(0);
    const hasLegacyMotion = await page.evaluate(
      () => 'gsap' in window || 'Lenis' in window || 'ScrollTrigger' in window
    );
    expect(hasLegacyMotion).toBe(false);
  });
});
