export const prerender = false;

import type { APIRoute } from 'astro';
import sql from '../lib/db';

const SITE = 'https://southwestgalleries.com';
const TODAY = new Date().toISOString().slice(0, 10);

function entry(path: string, priority: string, changefreq: string, lastmod?: string) {
  const mod = lastmod ?? TODAY;
  return `  <url>\n    <loc>${SITE}${path}</loc>\n    <lastmod>${mod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

export const GET: APIRoute = async () => {
  const [listings, posts, artists, states, galleryCities, museumCities, artStyles, events] =
    await Promise.all([
      sql`SELECT slug, updated_at FROM listings WHERE status = 'approved' AND deleted_at IS NULL`,
      sql`SELECT slug, updated_at FROM posts WHERE is_published = true`,
      sql`SELECT slug, updated_at FROM artists`,
      sql`SELECT slug FROM states ORDER BY name`,
      sql`
        SELECT DISTINCT c.slug AS city_slug, s.slug AS state_slug
        FROM cities c
        JOIN states s ON s.code = c.state_code
        JOIN listings l ON l.city_id = c.id
        WHERE l.listing_type = 'gallery' AND l.status = 'approved' AND l.deleted_at IS NULL
      `,
      sql`
        SELECT DISTINCT c.slug AS city_slug, s.slug AS state_slug
        FROM cities c
        JOIN states s ON s.code = c.state_code
        JOIN listings l ON l.city_id = c.id
        WHERE l.listing_type = 'museum' AND l.status = 'approved' AND l.deleted_at IS NULL
      `,
      sql`SELECT slug FROM art_styles ORDER BY name`,
      sql`SELECT slug FROM events WHERE is_recurring = true OR event_date >= CURRENT_DATE`,
    ]);

  const urls = [
    entry('/', '1.0', 'daily'),
    entry('/galleries/', '0.9', 'daily'),
    entry('/museums/', '0.9', 'daily'),
    entry('/art-styles/', '0.8', 'weekly'),
    entry('/guides/', '0.8', 'weekly'),
    entry('/artists/', '0.7', 'weekly'),
    entry('/events/', '0.7', 'daily'),
    entry('/about/', '0.5', 'monthly'),
    entry('/privacy/', '0.3', 'yearly'),
    entry('/terms/', '0.3', 'yearly'),
    ...states.map((s: { slug: string }) => entry(`/galleries/${s.slug}/`, '0.8', 'weekly')),
    ...states.map((s: { slug: string }) => entry(`/museums/${s.slug}/`, '0.8', 'weekly')),
    ...galleryCities.map((c: { state_slug: string; city_slug: string }) =>
      entry(`/galleries/${c.state_slug}/${c.city_slug}/`, '0.7', 'weekly')),
    ...museumCities.map((c: { state_slug: string; city_slug: string }) =>
      entry(`/museums/${c.state_slug}/${c.city_slug}/`, '0.7', 'weekly')),
    ...artStyles.map((s: { slug: string }) => entry(`/art-styles/${s.slug}/`, '0.7', 'monthly')),
    ...listings.map((l: { slug: string; updated_at: string }) =>
      entry(`/listing/${l.slug}/`, '0.8', 'monthly', l.updated_at?.slice(0, 10))),
    ...posts.map((p: { slug: string; updated_at: string }) =>
      entry(`/guides/${p.slug}/`, '0.7', 'monthly', p.updated_at?.slice(0, 10))),
    ...artists.map((a: { slug: string; updated_at: string }) =>
      entry(`/artists/${a.slug}/`, '0.6', 'monthly', a.updated_at?.slice(0, 10))),
    ...events.map((e: { slug: string }) => entry(`/events/${e.slug}/`, '0.6', 'weekly')),
  ];

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.join('\n') +
    `\n</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
};
