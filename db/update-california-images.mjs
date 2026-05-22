import { neon } from '@neondatabase/serverless';

const NEON_DB_KEY = process.env.NEON_DB_KEY;
if (!NEON_DB_KEY) { console.error('NEON_DB_KEY not set'); process.exit(1); }
const sql = neon(NEON_DB_KEY);

// Base Unsplash CDN format — same pattern used by seed-guide-images.mjs
function unsplash(photoId) {
  return `https://images.unsplash.com/${photoId}?w=800&h=500&fit=crop&q=80`;
}

const updates = [
  // ── LOS ANGELES ──────────────────────────────────────────────────────────────
  // LACMA — replace logo.svg with Urban Light sculpture
  { id: 139, hero: unsplash('photo-1716728014668-d2aece7c5056') },
  // The Broad — confirmed Broad exterior (angular/glass panels)
  { id: 140, hero: unsplash('photo-1771505085792-952f1d924953') },
  // MOCA — replace logo.png with gallery interior + colorful paintings
  { id: 141, hero: unsplash('photo-1578855019520-af8101c056e2') },
  // Hammer Museum — visitor in minimalist gallery
  { id: 142, hero: unsplash('photo-1766128867459-064fcbfa8781') },
  // Hauser & Wirth — modern gallery hallway
  { id: 144, hero: unsplash('photo-1771189255285-3bcb030e1f47') },
  // David Kordansky — white room with skylights + concrete floor
  { id: 145, hero: unsplash('photo-1774021796059-d5ea30abb3e0') },
  // Blum & Poe — empty white gallery with reflective floor
  { id: 146, hero: unsplash('photo-1774021792172-5f78c2e17ca8') },
  // Regen Projects — gallery wall with framed works
  { id: 148, hero: unsplash('photo-1766801848077-31bd1900efcc') },
  // Cal State LA Fine Arts Gallery — clean white room with ceiling lights
  { id: 108, hero: unsplash('photo-1774021793184-056a76f6e6f4') },

  // ── SAN FRANCISCO ────────────────────────────────────────────────────────────
  // de Young Museum — dark/copper minimalist building (tagged de Young SF)
  { id: 151, hero: unsplash('photo-1516975557698-71ba6bdc4407') },
  // Legion of Honor — classical columns (location tagged: Legion of Honor SF)
  { id: 152, hero: unsplash('photo-1596388292528-963a324709f0') },
  // Fraenkel Gallery — visitor in minimalist gallery
  { id: 154, hero: unsplash('photo-1766128867459-064fcbfa8781') },
  // Ratio 3 — modern gallery hallway
  { id: 155, hero: unsplash('photo-1771189255285-3bcb030e1f47') },

  // ── SAN DIEGO ────────────────────────────────────────────────────────────────
  // San Diego Museum of Art — building entrance in Balboa Park (confirmed SDMA)
  { id: 157, hero: unsplash('photo-1668315809042-1d114aed7e2f') },
  // MCASD — replace logo.gif with gallery interior
  { id: 158, hero: unsplash('photo-1766801848077-31bd1900efcc') },
  // David Zapf Gallery — white gallery with reflective floor
  { id: 159, hero: unsplash('photo-1774021792172-5f78c2e17ca8') },

  // ── PALM SPRINGS ─────────────────────────────────────────────────────────────
  // Melissa Morgan Fine Art — mid-century structure beside palm trees
  { id: 161, hero: unsplash('photo-1574876999742-a8be3a43f151') },

  // ── CARMEL ───────────────────────────────────────────────────────────────────
  // Carmel Art Association — rocky Carmel/Monterey coastline
  { id: 163, hero: unsplash('photo-1591164115502-09f4edf9f005') },
  // Dolby Chadwick Gallery — replace SVG with gallery framed works
  { id: 164, hero: unsplash('photo-1766801848077-31bd1900efcc') },

  // ── LAGUNA BEACH ─────────────────────────────────────────────────────────────
  // Redfern Gallery — Laguna Beach palm trees + Pacific
  { id: 166, hero: unsplash('photo-1647152548885-4881b06bfdd3') },

  // ── SANTA BARBARA ────────────────────────────────────────────────────────────
  // Santa Barbara Museum of Art — gallery white room with skylights
  { id: 167, hero: unsplash('photo-1774021796059-d5ea30abb3e0') },
  // Sullivan Goss — California coastal meadow (Monterey/central coast)
  { id: 168, hero: unsplash('photo-1597105116282-4c33ec6b367d') },

  // ── BERKELEY ─────────────────────────────────────────────────────────────────
  // BAMPFA — clean white gallery with ceiling lights
  { id: 169, hero: unsplash('photo-1774021793184-056a76f6e6f4') },
];

console.log(`Updating ${updates.length} CA listings with hero images…\n`);
let ok = 0;
let fail = 0;

for (const u of updates) {
  try {
    await sql`UPDATE listings SET hero_image_url = ${u.hero} WHERE id = ${u.id}`;
    console.log(`  ✓ id ${u.id}`);
    ok++;
  } catch (err) {
    console.error(`  ✗ id ${u.id}: ${err.message}`);
    fail++;
  }
}

console.log(`\nDone. Updated: ${ok}, Failed: ${fail}`);

// Verify
const rows = await sql`
  SELECT id, name, hero_image_url
  FROM listings
  WHERE state_code = 'CA' AND status = 'approved' AND deleted_at IS NULL
  ORDER BY id
`;
const withImage = rows.filter(r => r.hero_image_url);
console.log(`\nCA listings with hero image: ${withImage.length}/${rows.length}`);
