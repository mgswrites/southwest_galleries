const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.NEON_DB_KEY);

async function run() {
  // 1. Posts: content, title, meta_title, meta_description
  const postResult = await sql`
    UPDATE posts SET
      content       = replace(content,       'Navajo', 'Diné'),
      title         = replace(title,         'Navajo', 'Diné'),
      meta_title    = replace(meta_title,    'Navajo', 'Diné'),
      meta_description = replace(meta_description, 'Navajo', 'Diné')
    WHERE content       ILIKE '%navajo%'
       OR title         ILIKE '%navajo%'
       OR meta_title    ILIKE '%navajo%'
       OR meta_description ILIKE '%navajo%'
    RETURNING slug
  `;
  console.log(`Posts updated (${postResult.length}):`, postResult.map(r => r.slug));

  // 2. Artists: bio, meta_title, meta_description
  const artistResult = await sql`
    UPDATE artists SET
      bio           = replace(bio,           'Navajo', 'Diné'),
      meta_title    = replace(meta_title,    'Navajo', 'Diné'),
      meta_description = replace(meta_description, 'Navajo', 'Diné')
    WHERE bio ILIKE '%navajo%'
       OR meta_title ILIKE '%navajo%'
       OR meta_description ILIKE '%navajo%'
    RETURNING name
  `;
  console.log(`Artists updated (${artistResult.length}):`, artistResult.map(r => r.name));

  // 3. Listings: descriptions only — NOT the name column
  //    Skip listing id=65 (Navajo Gallery) for the name; descriptions still get fixed.
  const listingResult = await sql`
    UPDATE listings SET
      short_description = replace(short_description, 'Navajo', 'Diné'),
      full_description  = replace(full_description,  'Navajo', 'Diné'),
      meta_title        = replace(meta_title,        'Navajo', 'Diné'),
      meta_description  = replace(meta_description,  'Navajo', 'Diné')
    WHERE deleted_at IS NULL
      AND (
        short_description ILIKE '%navajo%'
        OR full_description ILIKE '%navajo%'
        OR meta_title ILIKE '%navajo%'
        OR meta_description ILIKE '%navajo%'
      )
    RETURNING name
  `;
  console.log(`Listings updated (${listingResult.length}):`, listingResult.map(r => r.name));

  // 4. Verify nothing left (excluding the listing *name* "Navajo Gallery" which is a proper noun)
  const remaining = await sql`
    SELECT 'post' as type, slug as id FROM posts WHERE content ILIKE '%navajo%' OR title ILIKE '%navajo%'
    UNION ALL
    SELECT 'artist', name FROM artists WHERE bio ILIKE '%navajo%'
    UNION ALL
    SELECT 'listing_desc', name FROM listings WHERE deleted_at IS NULL AND (full_description ILIKE '%navajo%' OR short_description ILIKE '%navajo%')
  `;
  if (remaining.length) {
    console.log('REMAINING (needs manual review):', remaining);
  } else {
    console.log('✓ No remaining Navajo in content fields.');
  }

  process.exit(0);
}

run().catch(e => { console.error(e.message); process.exit(1); });
