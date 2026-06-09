const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.NEON_DB_KEY);

// Fixes 5 guides seeded with broken Unsplash slug-based URLs.
// The CDN requires numeric photo IDs, not the short page slugs.
const images = [
  {
    slug: 'bisbee-arizona-art-guide',
    url: 'https://images.unsplash.com/photo-1687792054387-14a441a155de?w=800&h=450&fit=crop&q=80',
  },
  {
    slug: 'palm-springs-art-galleries-guide',
    url: 'https://images.unsplash.com/photo-1621881806763-1b8128f374a7?w=800&h=450&fit=crop&q=80',
  },
  {
    slug: 'collecting-navajo-weaving-guide',
    url: 'https://images.unsplash.com/photo-1569909115134-a0426936c879?w=800&h=450&fit=crop&q=80',
  },
  {
    slug: 'jerome-arizona-artist-colony-guide',
    url: 'https://images.unsplash.com/photo-1722900747098-e5a60d2e814f?w=800&h=450&fit=crop&q=80',
  },
  {
    slug: 'women-artists-american-southwest',
    url: 'https://images.unsplash.com/photo-1551180452-45cc5da51c3a?w=800&h=450&fit=crop&q=80',
  },
];

async function run() {
  for (const { slug, url } of images) {
    const result = await sql`
      UPDATE posts SET hero_image_url = ${url} WHERE slug = ${slug} RETURNING title
    `;
    if (result.length) {
      console.log(`  ✓ ${result[0].title}`);
    } else {
      console.log(`  ✗ not found: ${slug}`);
    }
  }
  console.log('Done.');
  process.exit(0);
}

run().catch(e => { console.error(e.message); process.exit(1); });
