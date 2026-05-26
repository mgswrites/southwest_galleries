import { neon } from '@neondatabase/serverless';

const NEON_DB_KEY = process.env.NEON_DB_KEY;
if (!NEON_DB_KEY) { console.error('NEON_DB_KEY not set'); process.exit(1); }
const sql = neon(NEON_DB_KEY);

function unsplash(id) { return `https://images.unsplash.com/${id}?w=800&h=500&fit=crop&q=80`; }

const heroUpdates = [
  // Ballroom Marfa — current exhibition hero from their WordPress (Raven Halfmoon, Haudenosaunee artist)
  { id: 100, hero: 'https://www.ballroommarfa.org/wp-content/uploads/Raven_Announcement_Website_HeroImage_1350x900-1.jpg',
    name: 'Ballroom Marfa' },

  // Marfa Book Company — Prada Marfa installation (iconic Marfa art landmark; gallery closed 2026)
  { id: 101, hero: unsplash('photo-1542937624-366618ef0e76'),
    name: 'Marfa Book Company' },

  // Blaffer Art Museum — real museum entrance photo, Jan 2026
  { id: 274, hero: 'https://blafferartmuseum.org/wp-content/uploads/2026/01/blaffer_entrance_JAN_22_1080x720.webp',
    name: 'Blaffer Art Museum' },

  // Rothko Chapel — Broken Obelisk sculpture (iconic exterior piece, 252KB real photo)
  { id: 273, hero: 'https://www.rothkochapel.org/assets/video/poster/obelisk2.jpg',
    name: 'Rothko Chapel' },

  // Houston Center for Contemporary Craft — membership image from their site
  { id: 278, hero: 'https://crafthouston.org/wp-content/uploads/2023/08/Houston-Center-for-contemporary-craft-Membership-Widget-2023-v3-scaled-scaled-scaled-1024x539.jpg',
    name: 'Houston Center for Contemporary Craft' },

  // Barry Whistler Gallery (Dallas) — gallery with framed works
  { id: 286, hero: unsplash('photo-1766801848077-31bd1900efcc'), name: 'Barry Whistler Gallery' },

  // Conduit Gallery (Dallas) — real artwork from current Dynamatic exhibition
  { id: 287, hero: 'https://conduitgallery.com/imager/galleries/Exhibitions/29555-dynamatic/29641/Quasar_20-3-4_2026-04-11-183917_khfn_38e2c3a19f835ac7942dce6f8d478ce1.JPG',
    name: 'Conduit Gallery' },

  // Sid Richardson Museum (Fort Worth) — real Western art exhibition photo (TCW series, 2025)
  { id: 293, hero: 'https://sidrichardsonmuseum.org/wp-content/uploads/2025/07/TCW-1.jpg',
    name: 'Sid Richardson Museum' },

  // Southwest School of Art (San Antonio, now part of UTSA) — San Antonio River Walk
  { id: 307, hero: unsplash('photo-1692193483739-0e378f2eec45'), name: 'Southwest School of Art' },

  // Sala Diaz (San Antonio) — gallery visitor in minimalist space
  { id: 308, hero: unsplash('photo-1766128867459-064fcbfa8781'), name: 'Sala Diaz' },

  // El Paso Art Association Gallery — El Paso Trans Mountain Road aerial
  { id: 312, hero: unsplash('photo-1520968961445-1d7672701587'), name: 'El Paso Art Association Gallery' },
];

// Fix website URLs
const urlFixes = [
  // Southwest School of Art merged into UTSA
  { id: 307, website_url: 'https://colfa.utsa.edu/art', name: 'Southwest School of Art → UTSA' },
  // Sid Richardson: www has bad cert, non-www works
  { id: 293, website_url: 'https://sidrichardsonmuseum.org', name: 'Sid Richardson Museum' },
];

console.log(`Updating ${heroUpdates.length} hero images…\n`);
let ok = 0, fail = 0;

for (const u of heroUpdates) {
  try {
    const r = await sql`UPDATE listings SET hero_image_url = ${u.hero} WHERE id = ${u.id} RETURNING id`;
    if (r.length) { console.log(`  ✓ [${u.id}] ${u.name}`); ok++; }
    else { console.log(`  ✗ [${u.id}] ${u.name}: no row`); fail++; }
  } catch (err) {
    console.error(`  ✗ [${u.id}] ${u.name}: ${err.message}`); fail++;
  }
}

for (const u of urlFixes) {
  await sql`UPDATE listings SET website_url = ${u.website_url} WHERE id = ${u.id}`;
  console.log(`  ✓ [${u.id}] ${u.name} website_url updated`);
}

console.log(`\nDone. Heroes: ${ok} updated, ${fail} failed.`);
