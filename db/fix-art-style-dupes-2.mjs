import { neon } from '@neondatabase/serverless';

const NEON_DB_KEY = process.env.NEON_DB_KEY;
if (!NEON_DB_KEY) { console.error('NEON_DB_KEY not set'); process.exit(1); }
const sql = neon(NEON_DB_KEY);

function u(id) {
  return `https://images.unsplash.com/${id}?w=800&h=500&fit=crop&q=80`;
}

const updates = [
  // ── Contemporary remaining dupes (from og:image scraping collisions) ──────
  { id: 129, img: u('photo-1509631179647-0177331693ae'), name: 'UNM Art Museum' },
  { id: 259, img: u('photo-1607082349566-187342175e2f'), name: 'Nob Hill Gallery' },
  { id: 230, img: u('photo-1614730321146-b6fa6a46bcb4'), name: 'The Arts Factory' },
  { id: 232, img: u('photo-1617042375876-a13e36732a04'), name: 'Art Square Las Vegas' },
  { id: 255, img: u('photo-1613145997970-db84a7975fbb'), name: 'Taos Center for the Arts' },
  { id: 183, img: u('photo-1605289355680-75fb41239154'), name: 'Tempe Center for the Arts' },
  { id: 188, img: u('photo-1576867757603-05b134ebc379'), name: 'Desert Foothills Art Center' },
  { id: 327, img: u('photo-1611244419377-b0a760c19719'), name: 'Weber State University Galleries' },
  { id: 241, img: u('photo-1602910344008-22f323cc1817'), name: 'City of Henderson Art Gallery' },
  { id: 207, img: u('photo-1550745165-9bc0b252726f'), name: 'Villa Bernina Gallery' },
  { id: 201, img: u('photo-1574180566232-aaad1b5b8450'), name: 'Macky Auditorium Gallery' },
  { id: 176, img: u('photo-1523905330026-b8bd1f5f320e'), name: 'Gallery Bisbee' },
  { id:  24, img: u('photo-1567359781514-3b964e2b04d6'), name: 'Gallery 527' },
  { id: 219, img: u('photo-1504711434969-e33886168f5c'), name: 'Pueblo Arts Alliance' },
  { id: 217, img: u('photo-1545173168-9f1947eebb7f'), name: "Maria's Bookshop & Gallery" },
  { id: 239, img: u('photo-1528360983277-13d401cdc186'), name: 'Sheppard Fine Arts Gallery' },
  { id: 274, img: u('photo-1553272725-086100aecf5e'), name: 'Blaffer Art Museum' },
  { id: 273, img: u('photo-1599707367072-cd6ada2bc375'), name: 'Rothko Chapel' },
  { id: 240, img: u('photo-1552664688-cf412ec27db2'), name: 'Artown' },
  { id: 177, img: u('photo-1603791440384-56cd371ee9a7'), name: 'Copper Queen Hotel Art Gallery' },
  { id: 305, img: u('photo-1586348943529-beaae6c28db9'), name: 'Blue Star Contemporary' },
  { id: 209, img: u('photo-1554224155-6726b3ff858f'), name: 'Colorado State University Art Museum' },
  { id: 264, img: u('photo-1576097449798-7c7f90e1248a'), name: 'Anderson Museum of Contemporary Art' },
  { id: 105, img: u('photo-1579762593175-20226054cad0'), name: 'Desert Thread Gallery' },
  { id:  15, img: u('photo-1586023492125-27b2c045efd7'), name: 'Scottsdale Arts' },
  { id: 130, img: u('photo-1547700055-b61cacebece9'), name: 'Harwood Art Center' },
  { id: 312, img: u('photo-1521898284481-a5ec348cb555'), name: 'El Paso Art Association Gallery' },
  { id:  35, img: u('photo-1530435460869-d13625c69bbf'), name: 'Wilde Meyer Gallery Phoenix' },

  // ── Landscape remaining dupes ──────────────────────────────────────────────
  { id:  21, img: u('photo-1501250987900-211872d97eaa'), name: 'Parks Gallery' },
  { id: 291, img: u('photo-1529156069898-49953e39b3ac'), name: 'Amon Carter Museum' },

  // ── Sculpture remaining dupe ──────────────────────────────────────────────
  { id: 190, img: u('photo-1533073526757-2c8ca1df9f1c'), name: 'Buffalo Chip Gallery' },
];

const imgCounts = new Map();
for (const row of updates) {
  imgCounts.set(row.img, (imgCounts.get(row.img) ?? 0) + 1);
}
const batchImgDupes = [...imgCounts.entries()].filter(([, n]) => n > 1);
if (batchImgDupes.length) {
  console.error('\n✗ DUPLICATE IMAGES IN BATCH:');
  batchImgDupes.forEach(([img, n]) =>
    console.error(`  ${n}× ${img.replace('https://images.unsplash.com/', '').split('?')[0]}`)
  );
  process.exit(1);
}

console.log(`Updating ${updates.length} listings…\n`);
let ok = 0, fail = 0;

for (const row of updates) {
  try {
    await sql`UPDATE listings SET hero_image_url = ${row.img} WHERE id = ${row.id}`;
    console.log(`  ✓ [${row.id}] ${row.name}`);
    ok++;
  } catch (err) {
    console.error(`  ✗ [${row.id}] ${row.name}: ${err.message}`);
    fail++;
  }
}

console.log(`\nDone. Updated: ${ok}, Failed: ${fail}`);

for (const style of ['contemporary', 'landscape-plein-air', 'native-american', 'sculpture']) {
  const [{ n }] = await sql`
    SELECT COUNT(*) AS n FROM (
      SELECT hero_image_url
      FROM listings l
      JOIN listing_art_styles las ON las.listing_id = l.id
      JOIN art_styles s ON s.id = las.style_id
      WHERE s.slug = ${style} AND l.status = 'approved' AND l.deleted_at IS NULL
        AND l.hero_image_url IS NOT NULL
      GROUP BY l.hero_image_url HAVING COUNT(*) > 1
    ) sub
  `;
  console.log(`  ${parseInt(n) === 0 ? '✓' : '⚠'} ${style}: ${n} dupe group(s) remaining`);
}
