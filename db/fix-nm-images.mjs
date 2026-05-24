import { neon } from '@neondatabase/serverless';

const NEON_DB_KEY = process.env.NEON_DB_KEY;
if (!NEON_DB_KEY) { console.error('NEON_DB_KEY not set'); process.exit(1); }
const sql = neon(NEON_DB_KEY);

function u(id) {
  return `https://images.unsplash.com/${id}?w=800&h=500&fit=crop&q=80`;
}

const updates = [
  // ── Previously confirmed (from audit session) ─────────────────────────────
  { id:  65, img: u('photo-1494783367193-149034c05e8f'), name: 'Navajo Gallery' },
  { id:  52, img: u('photo-1541367777708-7905fe3296c0'), name: 'IAIA Museum' },
  { id:  62, img: u('photo-1508108712903-49b7ef9b1df8'), name: 'Blue Rain Gallery Taos' },
  { id: 264, img: u('photo-1541512416146-3cf58d6b27cc'), name: 'Anderson Museum of Contemporary Art' },
  { id: 130, img: u('photo-1503454537195-1dcabb73ffb9'), name: 'Harwood Art Center' },
  { id: 131, img: u('photo-1518834107812-67b0b7c58434'), name: 'Keshet Center for the Arts' },
  { id:  50, img: u('photo-1603228254119-e6a4d095dc59'), name: 'Museum of International Folk Art' },
  { id:  41, img: u('photo-1474044159687-1ee9f3a51722'), name: 'Nedra Matteucci Galleries' },
  { id: 259, img: u('photo-1481026469463-66327c86e544'), name: 'Nob Hill Gallery' },
  { id: 251, img: u('photo-1611591437281-460bfbe1220a'), name: 'Patina Gallery' },
  { id:  54, img: u('photo-1579541814924-49fef17c5be5'), name: 'Peters Projects' },
  { id: 263, img: u('photo-1566054757965-8c4085344c96'), name: 'Roswell Museum and Art Center' },
  { id: 255, img: u('photo-1507676184212-d03ab07a01bf'), name: 'Taos Center for the Arts' },
  { id: 258, img: u('photo-1554907984-15263bfd63bd'), name: 'Tortuga Gallery' },
  { id: 129, img: u('photo-1501167786227-4cba60f6d58f'), name: 'UNM Art Museum' },
  { id: 135, img: u('photo-1535016120720-40c646be5580'), name: 'Vladem Contemporary' },
  { id:  53, img: u('photo-1579965342575-16428a7c8881'), name: 'Zaplin-Lampert Gallery' },
  { id: 252, img: u('photo-1516035069371-29a1b244cc32'), name: 'Monroe Gallery of Photography' },

  // ── Found this session ────────────────────────────────────────────────────
  { id:  48, img: u('photo-1582555172866-f73bb12a2ab3'), name: 'New Mexico Museum of Art' },
  { id:  57, img: u('photo-1509316785289-025f5b846b35'), name: 'Manitou Galleries' },
  { id:  67, img: u('photo-1547826039-bfc35e0f1ea8'), name: 'Studio Taos' },
  { id:  49, img: u('photo-1455582916367-25f75bfc6710'), name: 'Georgia O\'Keeffe Museum' },
  { id: 269, img: u('photo-1502082553048-f009c37129b9'), name: 'Los Luceros Historic Site' },
];

// Duplicate check within batch
const imgCounts = new Map();
for (const row of updates) {
  imgCounts.set(row.img, (imgCounts.get(row.img) ?? 0) + 1);
}
const batchDupes = [...imgCounts.entries()].filter(([, n]) => n > 1);
if (batchDupes.length) {
  console.error('\n✗ DUPLICATE IMAGES IN BATCH:');
  batchDupes.forEach(([img, n]) =>
    console.error(`  ${n}× ${img.replace('https://images.unsplash.com/', '').split('?')[0]}`)
  );
  process.exit(1);
}

console.log(`Updating ${updates.length} NM listings…\n`);
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

// Verify no dupes remain among NM listings
const [{ n }] = await sql`
  SELECT COUNT(*) AS n FROM (
    SELECT l.hero_image_url
    FROM listings l
    JOIN cities c ON c.id = l.city_id
    WHERE c.state_code = 'NM' AND l.status = 'approved' AND l.deleted_at IS NULL
      AND l.hero_image_url IS NOT NULL
    GROUP BY l.hero_image_url HAVING COUNT(*) > 1
  ) sub
`;
console.log(`\n${parseInt(n) === 0 ? '✓' : '⚠'} NM duplicate image groups remaining: ${n}`);
