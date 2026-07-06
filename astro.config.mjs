// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://southwestgalleries.com',
  output: 'static',
  adapter: vercel(),
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/admin/') &&
        !page.includes('/upgrade/') &&
        !page.includes('/claim/') &&
        !page.includes('/search/') &&
        !page.includes('/submit/') &&
        !page.includes('/submit-event/'),
    }),
  ],
});
