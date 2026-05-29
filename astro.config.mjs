// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://southwestgalleries.com',
  output: 'static',
  adapter: vercel(),
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/admin/') &&
        !page.includes('/submit/') &&
        !page.includes('/search/'),
    }),
  ],
});
