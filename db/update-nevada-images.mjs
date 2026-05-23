import { neon } from '@neondatabase/serverless';

const NEON_DB_KEY = process.env.NEON_DB_KEY;
if (!NEON_DB_KEY) { console.error('NEON_DB_KEY not set'); process.exit(1); }
const sql = neon(NEON_DB_KEY);

function unsplash(photoId) {
  return `https://images.unsplash.com/${photoId}?w=800&h=500&fit=crop&q=80`;
}

// ── Nevada location photos (all CDN IDs fetched from og:image) ───────────────
const LV_STRIP      = unsplash('photo-1600616366660-ba86bf0b3dfc'); // Las Vegas Strip time-lapse at night
const LV_BELLAGIO   = unsplash('photo-1581351721010-8cf859cb14a4'); // Bellagio fountains + Cosmopolitan
const LV_AERIAL     = unsplash('photo-1575540616469-cc6185554e1c'); // Las Vegas aerial / Mirage
const RENO_ARCH     = unsplash('photo-1673144962130-d104d60776fa'); // Reno "Biggest Little City" arch sign
const RENO_CITY     = unsplash('photo-1645237448975-68f57e840a03'); // Reno cityscape + Sierra Nevada
const NEVADA_DESERT = unsplash('photo-1669142902625-71b5b06839ab'); // Nevada desert hills, Reno area
const VC_TRAIN      = unsplash('photo-1696203752662-302d46ed2530'); // Virginia & Truckee Railroad, Virginia City NV

// ── Reuse Western / gallery interiors from prior state scripts ────────────────
const WESTERN_ART        = unsplash('photo-1774017005664-bedd45feaa41'); // Smithsonian Western watercolor
const GALLERY_VISITOR    = unsplash('photo-1766128867459-064fcbfa8781');
const GALLERY_HALLWAY    = unsplash('photo-1771189255285-3bcb030e1f47');
const GALLERY_FRAMED     = unsplash('photo-1766801848077-31bd1900efcc');
const GALLERY_COLORFUL   = unsplash('photo-1578855019520-af8101c056e2');

const updates = [

  // ── LAS VEGAS ─────────────────────────────────────────────────────────────
  { id: 91,  hero: LV_BELLAGIO,    name: 'Bellagio Gallery of Fine Art' },
  { id: 93,  hero: LV_STRIP,       name: 'Art Encounter' },
  { id: 94,  hero: GALLERY_COLORFUL, name: 'Contemporary Arts Center Las Vegas' },
  { id: 229, hero: LV_AERIAL,      name: 'Marjorie Barrick Museum of Art' },
  { id: 230, hero: LV_STRIP,       name: 'The Arts Factory' },
  { id: 231, hero: GALLERY_COLORFUL, name: 'Traction Gallery' },
  { id: 232, hero: LV_STRIP,       name: 'Art Square Las Vegas' },
  { id: 233, hero: LV_AERIAL,      name: 'Nevada State Museum Las Vegas' },
  { id: 234, hero: GALLERY_VISITOR, name: 'Donna Beam Fine Art Gallery' },
  // 92 The Neon Museum — keeping official site hero

  // ── RENO ──────────────────────────────────────────────────────────────────
  // 235 Nevada Museum of Art — keeping official site hero
  { id: 236, hero: GALLERY_FRAMED,  name: 'Stremmel Gallery' },
  { id: 237, hero: RENO_CITY,       name: 'Sierra Arts Foundation' },
  { id: 238, hero: RENO_ARCH,       name: 'The Holland Project' },
  { id: 239, hero: RENO_CITY,       name: 'Sheppard Fine Arts Gallery' },
  { id: 240, hero: RENO_ARCH,       name: 'Artown' },

  // ── HENDERSON ─────────────────────────────────────────────────────────────
  { id: 241, hero: LV_AERIAL,      name: 'City of Henderson Art Gallery' },
  { id: 242, hero: GALLERY_VISITOR, name: 'Henderson Civic Arts Foundation' },

  // ── CARSON CITY ───────────────────────────────────────────────────────────
  { id: 243, hero: GALLERY_COLORFUL, name: 'Brewery Arts Center' },  // override Levitt promo banner
  { id: 244, hero: NEVADA_DESERT,  name: 'Nevada State Museum Carson City' },
  { id: 245, hero: GALLERY_HALLWAY, name: 'Artists at Work Gallery' },

  // ── ELKO ──────────────────────────────────────────────────────────────────
  { id: 246, hero: WESTERN_ART,    name: 'Western Folklife Center' },
  { id: 247, hero: WESTERN_ART,    name: 'Northeastern Nevada Museum' },

  // ── VIRGINIA CITY ─────────────────────────────────────────────────────────
  { id: 248, hero: VC_TRAIN,       name: 'The Way It Was Museum' },
  { id: 249, hero: VC_TRAIN,       name: 'Virginia City Arts' },    // override header-scroll.png banner
];

console.log(`Updating ${updates.length} NV listings with hero images…\n`);
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
  WHERE city_id IN (SELECT id FROM cities WHERE state_code = 'NV')
    AND status = 'approved' AND deleted_at IS NULL
    AND hero_image_url IS NOT NULL
`;
const [{ total }] = await sql`
  SELECT COUNT(*) AS total FROM listings
  WHERE city_id IN (SELECT id FROM cities WHERE state_code = 'NV')
    AND status = 'approved' AND deleted_at IS NULL
`;
console.log(`NV listings with hero image: ${n}/${total}`);
