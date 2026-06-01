const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.NEON_DB_KEY);

async function run() {
  // Get post IDs for the 5 new guides
  const posts = await sql`
    SELECT id, slug FROM posts
    WHERE slug IN (
      'taos-art-galleries-guide',
      'southwest-art-collecting-guide',
      'durango-cortez-colorado-art-guide',
      'santa-fe-museum-hill-guide',
      'austin-art-galleries-guide'
    )
  `;
  const postMap = Object.fromEntries(posts.map(p => [p.slug, p.id]));
  console.log('Found posts:', Object.keys(postMap));

  // Get relevant listings per guide
  const [taosListings, santaFeMuseums, austinListings, durangoListings] = await Promise.all([
    sql`SELECT id FROM listings WHERE city_id IN (SELECT id FROM cities WHERE slug='taos') AND status='approved' AND deleted_at IS NULL ORDER BY CASE tier WHEN 'premium' THEN 1 WHEN 'featured' THEN 2 ELSE 3 END, name LIMIT 6`,
    sql`SELECT id FROM listings WHERE city_id IN (SELECT id FROM cities WHERE slug='santa-fe') AND listing_type IN ('museum','cultural_center') AND status='approved' AND deleted_at IS NULL ORDER BY CASE tier WHEN 'premium' THEN 1 WHEN 'featured' THEN 2 ELSE 3 END, name LIMIT 6`,
    sql`SELECT id FROM listings WHERE city_id IN (SELECT id FROM cities WHERE slug='austin') AND status='approved' AND deleted_at IS NULL ORDER BY CASE tier WHEN 'premium' THEN 1 WHEN 'featured' THEN 2 ELSE 3 END, name LIMIT 6`,
    sql`SELECT id FROM listings WHERE city_id IN (SELECT id FROM cities WHERE slug='durango') AND status='approved' AND deleted_at IS NULL ORDER BY CASE tier WHEN 'premium' THEN 1 WHEN 'featured' THEN 2 ELSE 3 END, name LIMIT 6`,
  ]);

  // Check post_listings columns
  const cols = await sql`SELECT column_name FROM information_schema.columns WHERE table_name='post_listings' ORDER BY ordinal_position`;
  console.log('post_listings columns:', cols.map(r => r.column_name).join(', '));

  const links = [
    { slug: 'taos-art-galleries-guide', listings: taosListings },
    { slug: 'santa-fe-museum-hill-guide', listings: santaFeMuseums },
    { slug: 'austin-art-galleries-guide', listings: austinListings },
    { slug: 'durango-cortez-colorado-art-guide', listings: durangoListings },
  ];

  for (const { slug, listings } of links) {
    const postId = postMap[slug];
    if (!postId) { console.log('  ✗ post not found:', slug); continue; }
    let count = 0;
    for (const l of listings) {
      try {
        await sql`INSERT INTO post_listings (post_id, listing_id) VALUES (${postId}, ${l.id}) ON CONFLICT DO NOTHING`;
        count++;
      } catch (e) {
        console.log('  insert error:', e.message);
      }
    }
    console.log(`  ✓ ${slug}: linked ${count} listings`);
  }

  console.log('Done.');
  process.exit(0);
}

run().catch(e => { console.error(e.message); process.exit(1); });
