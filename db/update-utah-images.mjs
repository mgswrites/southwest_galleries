import { neon } from '@neondatabase/serverless';

const NEON_DB_KEY = process.env.NEON_DB_KEY;
if (!NEON_DB_KEY) { console.error('NEON_DB_KEY not set'); process.exit(1); }
const sql = neon(NEON_DB_KEY);

function unsplash(photoId) {
  return `https://images.unsplash.com/${photoId}?w=800&h=500&fit=crop&q=80`;
}

// ── Utah location photos (CDN IDs verified) ───────────────────────────────────
const SLC_DAY        = unsplash('photo-1621603933126-6c216db10045'); // SLC skyline + Wasatch daytime
const SLC_DAY2       = unsplash('photo-1761582253950-1b970a4579d5'); // SLC skyline + mountains (newer)
const SLC_NIGHT      = unsplash('photo-1594227289369-475b26f3ed11'); // SLC skyline at night
const PARK_CITY      = unsplash('photo-1592428067555-fbaaa69df4b2'); // Park City winter mountain bridge
const MOAB_ARCH_1    = unsplash('photo-1756993399574-2fa126269ce7'); // Delicate Arch at sunset
const MOAB_ARCH_2    = unsplash('photo-1572670820893-4a786f928de3'); // Delicate Arch daytime
const OGDEN          = unsplash('photo-1574215676436-91d8855c0d3f'); // Ogden LDS Temple
const ZION           = unsplash('photo-1558836809-c94f6e3dfbaa');    // Zion NP / Angels Landing (St. George / Cedar City)
const UTAH_VALLEY_1  = unsplash('photo-1508193638397-1c4234db14d8'); // Utah Valley / Provo area
const UTAH_VALLEY_2  = unsplash('photo-1563089145-599997674d42');    // Utah Valley mountains

// ── Gallery interiors reused from prior state scripts ─────────────────────────
const GALLERY_VISITOR   = unsplash('photo-1766128867459-064fcbfa8781');
const GALLERY_HALLWAY   = unsplash('photo-1771189255285-3bcb030e1f47');
const GALLERY_SKYLIGHTS = unsplash('photo-1774021796059-d5ea30abb3e0');
const GALLERY_FRAMED    = unsplash('photo-1766801848077-31bd1900efcc');
const GALLERY_COLORFUL  = unsplash('photo-1578855019520-af8101c056e2');

const updates = [

  // ── SALT LAKE CITY (existing listings without hero) ───────────────────────
  { id: 96,  hero: GALLERY_FRAMED,    name: 'Phillips Gallery' },
  { id: 97,  hero: GALLERY_HALLWAY,   name: 'Finch Lane Gallery' },
  { id: 98,  hero: GALLERY_COLORFUL,  name: 'CUAC Contemporary Utah Art Center' },

  // ── SALT LAKE CITY (new listings) ─────────────────────────────────────────
  { id: 313, hero: SLC_NIGHT,         name: 'Utah Museum of Contemporary Art' },
  { id: 314, hero: SLC_DAY,           name: 'Gilgal Sculpture Garden' },
  { id: 315, hero: SLC_DAY2,          name: 'Rio Gallery' },
  { id: 316, hero: GALLERY_COLORFUL,  name: 'Granary Arts' },
  { id: 317, hero: GALLERY_VISITOR,   name: 'Art Access Gallery' },

  // ── MOAB ─────────────────────────────────────────────────────────────────
  { id: 103, hero: MOAB_ARCH_1,       name: 'Moab Arts and Recreation Center' },
  { id: 104, hero: MOAB_ARCH_2,       name: 'Gallery Moab' },
  { id: 105, hero: MOAB_ARCH_1,       name: 'Desert Thread Gallery' },

  // ── PARK CITY ─────────────────────────────────────────────────────────────
  { id: 318, hero: PARK_CITY,         name: 'Kimball Art Center' },
  { id: 319, hero: PARK_CITY,         name: 'Meyer Gallery' },
  { id: 320, hero: GALLERY_SKYLIGHTS, name: 'Coda Gallery' },
  { id: 321, hero: GALLERY_FRAMED,    name: 'Winn Slavin Fine Art' },
  { id: 322, hero: GALLERY_HALLWAY,   name: 'Terzian Galleries' },

  // ── PROVO ─────────────────────────────────────────────────────────────────
  { id: 323, hero: UTAH_VALLEY_1,     name: 'BYU Museum of Art' },
  { id: 324, hero: UTAH_VALLEY_2,     name: 'Covey Center for the Arts' },

  // ── SPRINGVILLE ───────────────────────────────────────────────────────────
  { id: 325, hero: UTAH_VALLEY_1,     name: 'Springville Museum of Art' },

  // ── OGDEN ─────────────────────────────────────────────────────────────────
  { id: 326, hero: OGDEN,             name: 'Eccles Community Art Center' },
  { id: 327, hero: OGDEN,             name: 'Weber State University Galleries' },

  // ── ST. GEORGE ────────────────────────────────────────────────────────────
  { id: 328, hero: ZION,              name: 'St. George Art Museum' },
  { id: 329, hero: ZION,              name: 'Sears Art Museum' },

  // ── CEDAR CITY ────────────────────────────────────────────────────────────
  { id: 330, hero: ZION,              name: 'Braithwaite Fine Arts Gallery' },

];

console.log(`Updating ${updates.length} UT listings with hero images…\n`);
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

// Update gallery_count in states table
const [{ total }] = await sql`
  SELECT COUNT(*) AS total FROM listings
  WHERE city_id IN (SELECT id FROM cities WHERE state_code = 'UT')
    AND status = 'approved' AND deleted_at IS NULL
`;
await sql`UPDATE states SET gallery_count = ${total} WHERE code = 'UT'`;
console.log(`\nUT gallery_count updated to ${total}`);

const [{ n }] = await sql`
  SELECT COUNT(*) AS n FROM listings
  WHERE city_id IN (SELECT id FROM cities WHERE state_code = 'UT')
    AND status = 'approved' AND deleted_at IS NULL
    AND hero_image_url IS NOT NULL
`;
console.log(`UT listings with hero image: ${n}/${total}`);
