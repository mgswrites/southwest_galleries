import { neon } from '@neondatabase/serverless';

const NEON_DB_KEY = process.env.NEON_DB_KEY;
if (!NEON_DB_KEY) { console.error('NEON_DB_KEY not set'); process.exit(1); }
const sql = neon(NEON_DB_KEY);

function unsplash(photoId) {
  return `https://images.unsplash.com/${photoId}?w=800&h=500&fit=crop&q=80`;
}

const SEDONA_RED_ROCKS_1 = unsplash('photo-1617771431802-58b6aaf93399');
const SEDONA_RED_ROCKS_2 = unsplash('photo-1604908506732-46bf709bf6b1');
const FLAGSTAFF_PINES    = unsplash('photo-1765742432551-b916687093fa');
const BISBEE_COLORFUL    = unsplash('photo-1687792054387-14a441a155de');
const BISBEE_STREET      = unsplash('photo-1603651825884-4abfd0885155');
const TAOS_PUEBLO        = unsplash('photo-1695596254299-c541eee4eef7');

const updates = [
  // Bentley Gallery Phoenix — real gallery interior photo
  { id: 37,  hero: 'https://bentleygallery.com/ClutchPhotos-0859.jpg?v=1.0.0',
    name: 'Bentley Gallery Phoenix' },

  // Coconino Center for the Arts — Flagstaff pines (no og:image available)
  { id: 115, hero: FLAGSTAFF_PINES,
    name: 'Coconino Center for the Arts' },

  // Copper Queen Hotel Art Gallery — Bisbee colorful street
  { id: 177, hero: BISBEE_COLORFUL,
    name: 'Copper Queen Hotel Art Gallery' },

  // Gallery Bisbee — Bisbee street scene
  { id: 176, hero: BISBEE_STREET,
    name: 'Gallery Bisbee' },

  // Horton Gallery — real artlogic artwork image
  { id: 189, hero: 'https://static-assets.artlogic.net/w_1200,h_630,c_fill,f_auto,fl_lossy,q_auto/ws-artlogicwebsite2338/usr/library/images/main/pages/1/nancy-brooks-brody-wild-combination-2006-enamel-on-metal-embedded-into-wall-5x7in-nancy-brooks-brody-estate.jpg',
    name: 'Horton Gallery' },

  // Goldenstein Gallery — Sedona red rocks
  { id: 23,  hero: SEDONA_RED_ROCKS_1,
    name: 'Goldenstein Gallery' },

  // Mountain Trails Gallery — Sedona red rocks
  { id: 18,  hero: SEDONA_RED_ROCKS_1,
    name: 'Mountain Trails Gallery' },

  // NAU Art Museum — real NAU campus image
  { id: 191, hero: 'https://nau.edu/assets/images/11ty/JHVxwWcyZu-1600.jpeg',
    name: 'Northern Arizona University Art Museum' },

  // Parks Gallery Sedona — Sedona red rocks 2
  { id: 21,  hero: SEDONA_RED_ROCKS_2,
    name: 'Parks Gallery (Sedona)' },

  // Parks Gallery Taos — Taos Pueblo
  { id: 64,  hero: TAOS_PUEBLO,
    name: 'Parks Gallery (Taos)' },

  // S'edav Va'aki Museum — fix &amp; encoding in existing URL
  { id: 128, hero: 'https://www.phoenix.gov/adobe/dynamicmedia/deliver/dm-aid--20c90e9c-3437-47ab-b2c1-846e9c17474a/dsc-0881.jpg?quality=85&preferwebp=true',
    name: "S'edav Va'aki Museum" },

  // Artists Gallery Flagstaff — real gallery image from Squarespace
  { id: 192, hero: 'https://images.squarespace-cdn.com/content/v1/5d55733f1cec280001437294/8e104ad9-7db4-4f04-8ad0-d27014e21792/Sunflower+Field+Sunrise.print+copy-Edit.jpg?format=1500w',
    name: 'Artists Gallery Flagstaff' },
];

console.log(`Fixing ${updates.length} bad hero images…\n`);
let ok = 0;
let fail = 0;

for (const u of updates) {
  try {
    const result = await sql`
      UPDATE listings SET hero_image_url = ${u.hero}
      WHERE id = ${u.id}
      RETURNING id
    `;
    if (result.length > 0) {
      console.log(`  ✓ [${u.id}] ${u.name}`);
      ok++;
    } else {
      console.log(`  ✗ [${u.id}] ${u.name}: no row found`);
      fail++;
    }
  } catch (err) {
    console.error(`  ✗ [${u.id}] ${u.name}: ${err.message}`);
    fail++;
  }
}

console.log(`\nDone. Updated: ${ok}, Failed: ${fail}`);
