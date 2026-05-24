import { neon } from '@neondatabase/serverless';

const NEON_DB_KEY = process.env.NEON_DB_KEY;
if (!NEON_DB_KEY) { console.error('NEON_DB_KEY not set'); process.exit(1); }
const sql = neon(NEON_DB_KEY);

function unsplash(id) {
  return `https://images.unsplash.com/${id}?w=800&h=500&fit=crop&q=80`;
}

// ── All IDs verified 200 ───────────────────────────────────────────────────────
const updates = [

  // ── Missing images (new CO listings) ─────────────────────────────────────
  { id: 332, img: unsplash('photo-1765073795371-015d05a943d7'), name: 'A Shared Blanket Gallery' },        // Native American pottery near window
  { id: 337, img: unsplash('photo-1651509244538-af2ed3b7dd46'), name: 'Center of Southwest Studies Museum' }, // colorful traditional design vases
  { id: 334, img: unsplash('photo-1597696929644-a2157a251a43'), name: 'Earthen Vessel Gallery' },          // colorful ceramic mugs (eclectic craft gallery)
  { id: 341, img: unsplash('photo-1636057121810-238b5217bbd4'), name: 'Ouray Glassworks & Pottery' },      // kiln/raku firing with gloves (studio ceramics)
  { id: 343, img: unsplash('photo-1604352358299-c4d6098937bd'), name: 'Lantern Dancer Gallery' },          // earthenware vessel on wood

  // ── Replacing overused photo-1536266305399 ────────────────────────────────
  { id: 171, img: unsplash('photo-1636057121029-87e1b273b015'), name: 'Raku Gallery' },                    // raku pottery firing scene
  { id:  34, img: unsplash('photo-1773992579743-653bf504c17f'), name: 'Heard Museum' },                    // five gray ceramic face vases
  { id: 180, img: unsplash('photo-1609881582722-4a8ab7cd54d8'), name: 'Smoki Museum' },                    // person holding round hand-built clay pot
  { id:  20, img: unsplash('photo-1620140036708-455ed5c0426a'), name: 'Turquoise Tortoise Gallery' },      // hands holding glazed ceramic vessel
  { id: 124, img: unsplash('photo-1607556672044-6110fc499247'), name: 'Tucson Clay Co-op' },               // close-up hands shaping clay on wheel
  { id: 215, img: unsplash('photo-1590605095243-072811dbe64c'), name: 'Toh-Atin Gallery' },                // person holding clay pot
  { id: 133, img: unsplash('photo-1597696929736-6d13bed8e6a8'), name: 'Museum of Indian Arts and Culture' }, // ceramic vase close-up
  { id:  56, img: unsplash('photo-1622691078858-58f9eb8825e0'), name: 'Santa Fe Clay' },                   // artist trimming pottery on wheel
  { id: 267, img: unsplash('photo-1520408222757-6f9f95d87d5d'), name: 'Mimbres Region Arts Council Gallery' }, // white clay vases arranged on table
  { id: 265, img: unsplash('photo-1481401908818-600b7a676c0d'), name: 'Western New Mexico University Museum' }, // stacked stoneware jugs

  // ── Fixing other duplicate pairs ──────────────────────────────────────────
  { id: 134, img: unsplash('photo-1478234170285-53301bcf2461'), name: 'Museum of Spanish Colonial Art' },  // white ceramic pitcher (colonial crafts)
  { id: 307, img: unsplash('photo-1607556671927-78a6605e290b'), name: 'Southwest School of Art' },        // person making clay pot on pottery wheel
  { id: 107, img: unsplash('photo-1604095616439-216735abec0c'), name: 'Craft Contemporary' },              // white ceramic cups on table

];

console.log(`Updating ${updates.length} ceramics-pottery listings…\n`);
let ok = 0, fail = 0;

for (const u of updates) {
  try {
    await sql`UPDATE listings SET hero_image_url = ${u.img} WHERE id = ${u.id}`;
    console.log(`  ✓ [${u.id}] ${u.name}`);
    ok++;
  } catch (err) {
    console.error(`  ✗ [${u.id}] ${u.name}: ${err.message}`);
    fail++;
  }
}

console.log(`\nDone. Updated: ${ok}, Failed: ${fail}`);

// Sanity check — count any remaining duplicates on the ceramics-pottery page
const dupes = await sql`
  SELECT hero_image_url, COUNT(*) AS n
  FROM listings l
  JOIN listing_art_styles las ON las.listing_id = l.id
  JOIN art_styles s ON s.id = las.style_id
  WHERE s.slug = 'ceramics-pottery'
    AND l.status = 'approved' AND l.deleted_at IS NULL
    AND hero_image_url IS NOT NULL
  GROUP BY hero_image_url
  HAVING COUNT(*) > 1
  ORDER BY n DESC
`;

if (dupes.length === 0) {
  console.log('\n✓ No duplicate hero images remaining on ceramics-pottery page.');
} else {
  console.log('\n⚠ Still-duplicate images:');
  dupes.forEach(d => console.log(`  ${d.n}× ${d.hero_image_url}`));
}
