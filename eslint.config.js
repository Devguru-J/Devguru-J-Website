import js from '@eslint/js';
import ts from 'typescript-eslint';
import astro from 'eslint-plugin-astro';

export default [
  {
    ignores: ['dist/**', '.astro/**', 'node_modules/**', 'test-results/**', 'playwright-report/**'],
  },

  js.configs.recommended,
  ...ts.configs.recommended,
  ...astro.configs.recommended,

  {
    rules: {
      // Unused args are allowed when prefixed with an underscore.
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },

  // Cloudflare Pages Functions run on the Workers runtime.
  {
    files: ['functions/**/*.js'],
    languageOptions: {
      globals: { Response: 'readonly', URL: 'readonly', Request: 'readonly' },
    },
  },

  // Build-time asset generators run in Node.
  {
    files: ['scripts/**/*.mjs'],
    languageOptions: {
      globals: {
        console: 'readonly',
        Buffer: 'readonly',
        process: 'readonly',
        // referenced inside Playwright `page.evaluate` callbacks
        document: 'readonly',
      },
    },
  },

  // Inline browser scripts inside .astro files.
  {
    files: ['**/*.astro'],
    languageOptions: {
      globals: {
        document: 'readonly',
        window: 'readonly',
        location: 'readonly',
        localStorage: 'readonly',
        matchMedia: 'readonly',
        URLSearchParams: 'readonly',
        RegExp: 'readonly',
      },
    },
  },
];
