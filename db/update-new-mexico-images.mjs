import { neon } from '@neondatabase/serverless';

const NEON_DB_KEY = process.env.NEON_DB_KEY;
if (!NEON_DB_KEY) { console.error('NEON_DB_KEY not set'); process.exit(1); }
const sql = neon(NEON_DB_KEY);

function unsplash(photoId) {
  return `https://images.unsplash.com/${photoId}?w=800&h=500&fit=crop&q=80`;
}

// ── New Mexico location photos (CDN IDs verified via og:image) ────────────────
const TAOS_PUEBLO    = unsplash('photo-1695596254299-c541eee4eef7'); // Taos Pueblo adobe + mountains (confirmed)
const TAOS_LADDER    = unsplash('photo-1550164363-7ddd4285b524');    // Taos Pueblo ladder + building (confirmed)
const ABQ_BALLOON    = unsplash('photo-1581616845744-c3fa77368c57'); // Albuquerque Balloon Fiesta (confirmed)
const ABQ_PUEBLO     = unsplash('photo-1766119608982-3f90367d0b2f'); // Albuquerque stepped-wall pueblo architecture (confirmed)
const SANTA_FE_ADOBE = unsplash('photo-1595651492943-829bfff09210'); // Santa Fe NM (confirmed)
const WHITE_SANDS_1  = unsplash('photo-1628328052245-6a16b95499ef'); // White Sands NM
const WHITE_SANDS_2  = unsplash('photo-1718062455469-550f7f6026fc'); // White Sands golden hour NM
const NM_DESERT      = unsplash('photo-1670884061385-82de1fca44d3'); // New Mexico road + mountains

// ── Reuse from prior scripts ──────────────────────────────────────────────────
const SW_POTTERY      = unsplash('photo-1536266305399-b367feb671f9'); // Southwest clay pottery
const GALLERY_VISITOR = unsplash('photo-1766128867459-064fcbfa8781');
const GALLERY_HALLWAY = unsplash('photo-1771189255285-3bcb030e1f47');
const GALLERY_SKYLIGHTS = unsplash('photo-1774021796059-d5ea30abb3e0');
const GALLERY_FRAMED  = unsplash('photo-1766801848077-31bd1900efcc');
const GALLERY_COLORFUL = unsplash('photo-1578855019520-af8101c056e2');

const updates = [

  // ── ALBUQUERQUE ───────────────────────────────────────────────────────────
  { id: 69,  hero: ABQ_BALLOON,    name: '516 Arts' },
  { id: 130, hero: ABQ_PUEBLO,     name: 'Harwood Art Center' },
  { id: 131, hero: GALLERY_COLORFUL, name: 'Keshet Center for the Arts' },
  { id: 72,  hero: ABQ_PUEBLO,     name: 'National Hispanic Cultural Center' },
  { id: 259, hero: ABQ_BALLOON,    name: 'Nob Hill Gallery' },
  { id: 74,  hero: GALLERY_VISITOR, name: 'Tamarind Institute' },
  { id: 129, hero: ABQ_BALLOON,    name: 'UNM Art Museum' },
  { id: 258, hero: GALLERY_COLORFUL, name: 'Tortuga Gallery (override spam)' },

  // ── SANTA FE ──────────────────────────────────────────────────────────────
  { id: 47,  hero: SANTA_FE_ADOBE, name: 'Andrew Smith Gallery' },
  { id: 42,  hero: SANTA_FE_ADOBE, name: 'Blue Rain Gallery' },
  { id: 44,  hero: GALLERY_SKYLIGHTS, name: 'Charlotte Jackson Fine Art' },
  { id: 136, hero: SANTA_FE_ADOBE, name: 'El Museo Cultural de Santa Fe' },
  { id: 49,  hero: SANTA_FE_ADOBE, name: 'Georgia O\'Keeffe Museum' },
  { id: 40,  hero: GALLERY_FRAMED, name: 'Gerald Peters Gallery' },
  { id: 52,  hero: SW_POTTERY,     name: 'Institute of American Indian Arts Museum' },
  { id: 58,  hero: GALLERY_COLORFUL, name: 'James Kelly Contemporary' },
  { id: 57,  hero: GALLERY_FRAMED, name: 'Manitou Galleries' },
  { id: 252, hero: GALLERY_VISITOR, name: 'Monroe Gallery of Photography' },
  { id: 133, hero: SW_POTTERY,     name: 'Museum of Indian Arts and Culture' },
  { id: 50,  hero: SANTA_FE_ADOBE, name: 'Museum of International Folk Art' },
  { id: 134, hero: SANTA_FE_ADOBE, name: 'Museum of Spanish Colonial Art (override Squarespace)' },
  { id: 41,  hero: GALLERY_FRAMED, name: 'Nedra Matteucci Galleries' },
  { id: 48,  hero: SANTA_FE_ADOBE, name: 'New Mexico Museum of Art' },
  { id: 251, hero: GALLERY_HALLWAY, name: 'Patina Gallery (override logo.png)' },
  { id: 54,  hero: GALLERY_HALLWAY, name: 'Peters Projects' },
  { id: 55,  hero: GALLERY_VISITOR, name: 'Photo Eye Gallery' },
  { id: 253, hero: GALLERY_COLORFUL, name: 'Riva Yares Gallery' },
  { id: 56,  hero: SW_POTTERY,     name: 'Santa Fe Clay' },
  { id: 135, hero: GALLERY_COLORFUL, name: 'Vladem Contemporary' },
  { id: 51,  hero: SW_POTTERY,     name: 'Wheelwright Museum of the American Indian' },
  { id: 53,  hero: GALLERY_FRAMED, name: 'Zaplin-Lampert Gallery' },

  // ── TAOS ──────────────────────────────────────────────────────────────────
  { id: 59,  hero: TAOS_PUEBLO,   name: 'Taos Art Museum at Fechin House (override join-today.jpg)' },
  { id: 62,  hero: TAOS_PUEBLO,   name: 'Blue Rain Gallery Taos' },
  { id: 60,  hero: TAOS_LADDER,   name: 'Harwood Museum of Art' },
  { id: 65,  hero: SW_POTTERY,    name: 'Navajo Gallery' },
  { id: 64,  hero: TAOS_PUEBLO,   name: 'Parks Gallery' },
  { id: 66,  hero: TAOS_LADDER,   name: 'Six Directions Gallery' },
  { id: 67,  hero: TAOS_PUEBLO,   name: 'Studio Taos' },
  { id: 255, hero: TAOS_LADDER,   name: 'Taos Center for the Arts' },
  { id: 256, hero: TAOS_PUEBLO,   name: 'Van Vechten Lineberry Taos Art Museum' },

  // ── LAS CRUCES ────────────────────────────────────────────────────────────
  { id: 260, hero: WHITE_SANDS_2, name: 'New Mexico State University Art Museum' },
  { id: 261, hero: WHITE_SANDS_1, name: 'Las Cruces Museum of Art' },
  { id: 262, hero: WHITE_SANDS_1, name: 'Fountain Theatre (override Squarespace event)' },

  // ── ROSWELL ───────────────────────────────────────────────────────────────
  { id: 263, hero: WHITE_SANDS_1, name: 'Roswell Museum and Art Center' },
  { id: 264, hero: WHITE_SANDS_2, name: 'Anderson Museum of Contemporary Art' },

  // ── SILVER CITY ───────────────────────────────────────────────────────────
  { id: 265, hero: SW_POTTERY,    name: 'Western New Mexico University Museum' },
  { id: 266, hero: NM_DESERT,     name: 'Silver City Museum' },
  { id: 267, hero: SW_POTTERY,    name: 'Mimbres Region Arts Council (override 2017 Squarespace)' },

  // ── ESPAÑOLA / CHIMAYÓ ────────────────────────────────────────────────────
  { id: 269, hero: TAOS_LADDER,   name: 'Los Luceros Historic Site (override homepage URL)' },
];

console.log(`Updating ${updates.length} NM listings with hero images…\n`);
let ok = 0;
let fail = 0;

for (const u of updates) {
  try {
    await sql`UPDATE listings SET hero_image_url = ${u.hero} WHERE id = ${u.id}`;
    console.log(`  ✓ [${u.id}] ${u.name}`);
    ok++;
  } catch (err) {
    console.error(`  ✗ [${u.id}] ${u.name}: ${err.message}`);
    fail++;
  }
}

console.log(`\nDone. Updated: ${ok}, Failed: ${fail}`);

const [{ n }] = await sql`
  SELECT COUNT(*) AS n FROM listings
  WHERE city_id IN (SELECT id FROM cities WHERE state_code = 'NM')
    AND status = 'approved' AND deleted_at IS NULL
    AND hero_image_url IS NOT NULL
`;
const [{ total }] = await sql`
  SELECT COUNT(*) AS total FROM listings
  WHERE city_id IN (SELECT id FROM cities WHERE state_code = 'NM')
    AND status = 'approved' AND deleted_at IS NULL
`;
console.log(`NM listings with hero image: ${n}/${total}`);
