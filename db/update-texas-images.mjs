import { neon } from '@neondatabase/serverless';

const NEON_DB_KEY = process.env.NEON_DB_KEY;
if (!NEON_DB_KEY) { console.error('NEON_DB_KEY not set'); process.exit(1); }
const sql = neon(NEON_DB_KEY);

function unsplash(photoId) {
  return `https://images.unsplash.com/${photoId}?w=800&h=500&fit=crop&q=80`;
}

// ── Texas city photos (CDN IDs verified) ─────────────────────────────────────
const HOUSTON_NIGHT  = unsplash('photo-1666610278692-51058ed05e9a'); // Houston skyline at night
const HOUSTON_NIGHT2 = unsplash('photo-1667754248024-e1e03e60eb72'); // Houston skyline at night (alt)
const DALLAS_DAY     = unsplash('photo-1621904878414-d4ca4756bd7e'); // Dallas from Reunion Tower, daytime
const DALLAS_NIGHT   = unsplash('photo-1625950019503-cae6a7825762'); // Dallas skyline at night
const DALLAS_UPTOWN  = unsplash('photo-1638396242179-e36a3511210a'); // Dallas Uptown trees + skyline
const FW_NIGHT       = unsplash('photo-1608768456290-a666883849e0'); // Fort Worth skyline at night
const AUSTIN_CAP_1   = unsplash('photo-1635378639008-7880cfd66ea6'); // Texas State Capitol dome
const AUSTIN_CAP_2   = unsplash('photo-1655127881942-46019629ca58'); // Texas Capitol with flag
const SA_RIVERWALK   = unsplash('photo-1692193483739-0e378f2eec45'); // San Antonio River Walk at night
const EP_MOUNTAIN    = unsplash('photo-1520968961445-1d7672701587'); // El Paso Trans Mountain Road aerial
const TX_DESERT      = unsplash('photo-1484501085877-500786457c48'); // West Texas desert road + mountains
const PRADA_MARFA    = unsplash('photo-1542937624-366618ef0e76');    // Prada Marfa art installation
const MARFA_BLDG     = unsplash('photo-1618578907023-4595f150fc9f'); // White building in Marfa desert

// ── Gallery interiors reused from prior state scripts ─────────────────────────
const GALLERY_VISITOR  = unsplash('photo-1766128867459-064fcbfa8781');
const GALLERY_HALLWAY  = unsplash('photo-1771189255285-3bcb030e1f47');
const GALLERY_SKYLIGHTS = unsplash('photo-1774021796059-d5ea30abb3e0');
const GALLERY_FRAMED   = unsplash('photo-1766801848077-31bd1900efcc');
const GALLERY_COLORFUL = unsplash('photo-1578855019520-af8101c056e2');
const WESTERN_ART      = unsplash('photo-1774017005664-bedd45feaa41');

const updates = [

  // ── HOUSTON ───────────────────────────────────────────────────────────────
  // [270] Menil Collection    → has good hero (menil.org CDN), skip
  { id: 271, hero: HOUSTON_NIGHT2,   name: 'Museum of Fine Arts, Houston' },
  { id: 272, hero: HOUSTON_NIGHT,    name: 'Contemporary Arts Museum Houston (override logo)' },
  { id: 273, hero: HOUSTON_NIGHT2,   name: 'Rothko Chapel' },
  { id: 274, hero: HOUSTON_NIGHT,    name: 'Blaffer Art Museum' },
  { id: 275, hero: GALLERY_COLORFUL, name: 'Lawndale Art Center (override site-icon crop)' },
  { id: 276, hero: GALLERY_COLORFUL, name: 'Station Museum of Contemporary Art' },
  { id: 277, hero: GALLERY_VISITOR,  name: 'Art League Houston (override old Squarespace)' },
  { id: 278, hero: GALLERY_SKYLIGHTS, name: 'Houston Center for Contemporary Craft' },
  { id: 279, hero: GALLERY_VISITOR,  name: 'DiverseWorks' },

  // ── DALLAS ────────────────────────────────────────────────────────────────
  { id: 280, hero: DALLAS_DAY,       name: 'Dallas Museum of Art' },
  { id: 281, hero: DALLAS_DAY,       name: 'Nasher Sculpture Center' },
  // [282] Crow Museum → has good hero (crowmuseum.org entrance photo), skip
  // [283] Dallas Contemporary → has Squarespace hero, skip for now
  { id: 284, hero: DALLAS_UPTOWN,    name: 'McKinney Avenue Contemporary' },
  { id: 285, hero: GALLERY_FRAMED,   name: 'Ro2 Art (override Google Drive thumbnail)' },
  { id: 286, hero: GALLERY_FRAMED,   name: 'Barry Whistler Gallery' },
  { id: 287, hero: GALLERY_FRAMED,   name: 'Conduit Gallery' },
  // [288] PDNB Gallery → has Squarespace hero, skip
  // [289] Erin Cluley Gallery → has Cargo.site hero, skip

  // ── FORT WORTH ────────────────────────────────────────────────────────────
  { id: 290, hero: FW_NIGHT,         name: 'Kimbell Art Museum' },
  { id: 291, hero: FW_NIGHT,         name: 'Amon Carter Museum of American Art' },
  { id: 292, hero: FW_NIGHT,         name: 'Modern Art Museum of Fort Worth' },
  { id: 293, hero: WESTERN_ART,      name: 'Sid Richardson Museum' },
  { id: 294, hero: FW_NIGHT,         name: 'Fort Worth Community Arts Center' },

  // ── AUSTIN ────────────────────────────────────────────────────────────────
  { id: 295, hero: AUSTIN_CAP_1,     name: 'Blanton Museum of Art' },
  { id: 296, hero: AUSTIN_CAP_2,     name: 'Contemporary Austin Jones Center' },
  // [297] Laguna Gloria → has good hero (Contemporary Austin site), skip
  // [298] Mexic-Arte → has good hero (mexic-artemuseum.org), skip
  // [299] Umlauf → has good hero (Wix site), skip
  { id: 300, hero: GALLERY_VISITOR,  name: 'Women & Their Work' },
  { id: 301, hero: GALLERY_FRAMED,   name: 'Wally Workman Gallery' },
  { id: 302, hero: GALLERY_COLORFUL, name: 'MASS Gallery (override Squarespace)' },

  // ── SAN ANTONIO ───────────────────────────────────────────────────────────
  { id: 303, hero: SA_RIVERWALK,     name: 'San Antonio Museum of Art' },
  { id: 304, hero: SA_RIVERWALK,     name: 'McNay Art Museum' },
  { id: 305, hero: SA_RIVERWALK,     name: 'Blue Star Contemporary' },
  // [306] Artpace → has good hero (artpace.org, 2026 exhibition image), skip
  { id: 307, hero: GALLERY_SKYLIGHTS, name: 'Southwest School of Art' },
  { id: 308, hero: GALLERY_VISITOR,  name: 'Sala Diaz' },
  // [309] Ruiz Healy Art → has good hero (Artlogic CDN), skip

  // ── EL PASO ───────────────────────────────────────────────────────────────
  // [310] El Paso Museum of Art → has good hero (official S3 bucket), skip
  { id: 311, hero: EP_MOUNTAIN,      name: 'Rubin Center for the Visual Arts' },
  { id: 312, hero: EP_MOUNTAIN,      name: 'El Paso Art Association Gallery' },

  // ── MARFA (existing listings, still missing heroes) ───────────────────────
  { id: 99,  hero: PRADA_MARFA,      name: 'Chinati Foundation' },
  { id: 100, hero: TX_DESERT,        name: 'Ballroom Marfa' },
  { id: 101, hero: MARFA_BLDG,       name: 'Marfa Book Company' },
  // [102] Judd Foundation → has good hero, skip
];

console.log(`Updating ${updates.length} TX listings with hero images…\n`);
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
  WHERE city_id IN (SELECT id FROM cities WHERE state_code = 'TX')
    AND status = 'approved' AND deleted_at IS NULL
    AND hero_image_url IS NOT NULL
`;
const [{ total }] = await sql`
  SELECT COUNT(*) AS total FROM listings
  WHERE city_id IN (SELECT id FROM cities WHERE state_code = 'TX')
    AND status = 'approved' AND deleted_at IS NULL
`;
console.log(`TX listings with hero image: ${n}/${total}`);
