const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.NEON_DB_KEY);

const images = [
  { slug: 'taos-art-galleries-guide',          url: '/guides/taos-art-scene-galleries-guide.jpg' },
  { slug: 'southwest-art-collecting-guide',     url: '/guides/how-to-start-collecting-southwest-art.jpg' },
  { slug: 'durango-cortez-colorado-art-guide',  url: '/guides/denver-art-galleries-guide.jpg' },
  { slug: 'santa-fe-museum-hill-guide',         url: '/guides/canyon-road-gallery-walk-santa-fe.jpg' },
  { slug: 'austin-art-galleries-guide',         url: 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=800&h=450&fit=crop&q=80' },
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
