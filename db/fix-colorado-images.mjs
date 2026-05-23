import { neon } from '@neondatabase/serverless';

const NEON_DB_KEY = process.env.NEON_DB_KEY;
if (!NEON_DB_KEY) { console.error('NEON_DB_KEY not set'); process.exit(1); }
const sql = neon(NEON_DB_KEY);

function unsplash(photoId) {
  return `https://images.unsplash.com/${photoId}?w=800&h=500&fit=crop&q=80`;
}

// Corrected CDN IDs (real photo-NNNNNN-xxxxxxxx format, fetched from og:image)
const TELLURIDE_STREET   = unsplash('photo-1636488321018-44aff0d83929'); // Telluride main street (confirmed)
const TELLURIDE_AERIAL   = unsplash('photo-1446816478302-649ee5075713'); // Telluride aerial (confirmed)
const GARDEN_GODS_1      = unsplash('photo-1743269112028-53e41856eddf'); // Garden of the Gods red rock
const GARDEN_GODS_2      = unsplash('photo-1517882737735-0da2d51cca47'); // Garden of the Gods road between rocks
const GARDEN_GODS_3      = unsplash('photo-1581552651792-dad512101e44'); // Garden of the Gods brown rock
const DENVER_SKYLINE_1   = unsplash('photo-1648441095877-90406e6ba04d'); // Denver skyline + Rockies
const DENVER_SKYLINE_2   = unsplash('photo-1663289236654-47c18050f4c0'); // Denver city with mountain
const DURANGO_TRAIN      = unsplash('photo-1620136026215-7f129670f025'); // Durango narrow gauge train
const FORT_COLLINS_MTNS  = unsplash('photo-1693756719320-df464e644e22'); // Fort Collins / Rocky Mtn foothills
const ROCKY_MTN          = unsplash('photo-1612626869796-2caca2ec3ec8'); // Garden of Gods Road CO (free alt)
const STEAMBOAT_AERIAL   = unsplash('photo-1691547804655-f8d8493bf054'); // Steamboat Springs aerial
const VAIL_TOWN          = unsplash('photo-1634432939298-d27449da4bf1'); // Vail mountain town
const ASPEN_TOWN         = unsplash('photo-1553406488-baa24daf9b75');    // Aspen CO town, golden hour
const BOULDER_FLATS_1    = unsplash('photo-1597383005212-f795fd8242e9'); // Boulder Flatirons (free)
const BOULDER_FLATS_2    = unsplash('photo-1540967092250-81841896175c'); // Boulder Flatirons alt (free)

const updates = [
  // ── ASPEN ─────────────────────────────────────────────────────────────────
  { id: 198, hero: ASPEN_TOWN,        name: 'Aspen Historical Society Museum' },

  // ── BOULDER ───────────────────────────────────────────────────────────────
  { id: 199, hero: BOULDER_FLATS_1,   name: 'Boulder Arts & Crafts Gallery' },
  { id: 110, hero: BOULDER_FLATS_2,   name: 'CU Art Museum' },
  { id: 201, hero: BOULDER_FLATS_1,   name: 'Macky Auditorium Gallery' },
  { id: 200, hero: BOULDER_FLATS_2,   name: 'Naropa University Art Gallery' },

  // ── COLORADO SPRINGS ──────────────────────────────────────────────────────
  { id: 202, hero: GARDEN_GODS_1,     name: 'Colorado Springs Fine Arts Center' },
  { id: 204, hero: GARDEN_GODS_2,     name: 'Gallery of the Rockies' },
  { id: 203, hero: GARDEN_GODS_3,     name: 'Pikes Peak Arts Council' },

  // ── DENVER ────────────────────────────────────────────────────────────────
  { id: 75,  hero: DENVER_SKYLINE_1,  name: 'Denver Art Museum' },
  { id: 224, hero: DENVER_SKYLINE_2,  name: 'Denver Botanic Gardens' },

  // ── DURANGO ───────────────────────────────────────────────────────────────
  { id: 214, hero: DURANGO_TRAIN,     name: 'Sorrel Sky Gallery' },
  { id: 217, hero: DURANGO_TRAIN,     name: "Maria's Bookshop & Gallery" },

  // ── FORT COLLINS ──────────────────────────────────────────────────────────
  { id: 208, hero: FORT_COLLINS_MTNS, name: 'Fort Collins Museum of Art' },
  { id: 209, hero: FORT_COLLINS_MTNS, name: 'Colorado State University Art Museum' },

  // ── MANITOU SPRINGS ───────────────────────────────────────────────────────
  { id: 206, hero: GARDEN_GODS_2,     name: 'Manitou Art Center' },
  { id: 207, hero: GARDEN_GODS_3,     name: 'Villa Bernina Gallery' },

  // ── PUEBLO ────────────────────────────────────────────────────────────────
  { id: 218, hero: ROCKY_MTN,         name: 'Sangre de Cristo Arts Center' },
  { id: 219, hero: ROCKY_MTN,         name: 'Pueblo Arts Alliance' },

  // ── STEAMBOAT SPRINGS ─────────────────────────────────────────────────────
  { id: 220, hero: STEAMBOAT_AERIAL,  name: 'Steamboat Art Museum' },
  { id: 221, hero: STEAMBOAT_AERIAL,  name: 'Gallery at the White House Ranch' },

  // ── TELLURIDE ─────────────────────────────────────────────────────────────
  { id: 211, hero: TELLURIDE_AERIAL,  name: 'Telluride Gallery of Fine Art' },
  { id: 212, hero: TELLURIDE_STREET,  name: 'Ah Haa School for the Arts' },

  // ── VAIL ──────────────────────────────────────────────────────────────────
  { id: 222, hero: VAIL_TOWN,         name: 'Vail Fine Arts' },
  { id: 223, hero: VAIL_TOWN,         name: 'Gallery 970' },
];

console.log(`Fixing ${updates.length} CO listings with correct CDN photo IDs…\n`);
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

console.log(`\nDone. Fixed: ${ok}, Failed: ${fail}`);
