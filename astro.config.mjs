import { defineConfig } from 'astro/config';

const rawBase = process.env.BASE_PATH || '/';
const base = rawBase === '/' ? '/' : `/${rawBase.replace(/^\/+|\/+$/g, '')}`;

export default defineConfig({
  site: process.env.SITE || 'https://ojaashampiholi.github.io',
  base,
  output: 'static',
  trailingSlash: 'always',
});
