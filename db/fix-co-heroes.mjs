import { neon } from '@neondatabase/serverless';

const NEON_DB_KEY = process.env.NEON_DB_KEY;
if (!NEON_DB_KEY) { console.error('NEON_DB_KEY not set'); process.exit(1); }
const sql = neon(NEON_DB_KEY);

function unsplash(photoId) {
  return `https://images.unsplash.com/${photoId}?w=800&h=500&fit=crop&q=80`;
}

const GALLERY_COLORFUL  = unsplash('photo-1578855019520-af8101c056e2'); // colorful paintings gallery
const GALLERY_HALLWAY   = unsplash('photo-1771189255285-3bcb030e1f47'); // modern gallery hallway
const GALLERY_SKYLIGHTS = unsplash('photo-1774021796059-d5ea30abb3e0'); // white cube skylights
const GALLERY_FRAMED    = unsplash('photo-1766801848077-31bd1900efcc'); // gallery with framed works
const GALLERY_LIGHTS    = unsplash('photo-1774021793184-056a76f6e6f4'); // gallery ceiling lights
const WESTERN_ART       = unsplash('photo-1774017005664-bedd45feaa41'); // Smithsonian Western watercolor
const FRONT_RANGE_MTNS  = unsplash('photo-v2do9FswXwk');                // Front Range mountains, Fort Collins
const ROCKY_MTN         = unsplash('photo-WhoW9cO0-VA');                 // Colorado Rockies
const STEAMBOAT_AERIAL  = unsplash('photo-fuRuidzW1zc');                 // Steamboat Springs aerial
const DURANGO_TRAIN     = unsplash('photo-t_-X3OIQVkA');                 // Durango narrow gauge railroad
const GARDEN_GODS_3     = unsplash('photo-xzC7bUTO5rw');                 // Garden of the Gods rock formation
const TELLURIDE_STREET  = unsplash('photo-ODvgdXxGhzQ');                 // Telluride main street + Trico Peak
const BOTANIC_POND      = unsplash('photo-1779253139946-ec7810dd20eb');  // tranquil garden pond, lush green

const heroUpdates = [
  // Denver galleries
  { id: 227, hero: GALLERY_COLORFUL,  name: 'CORE New Art Space' },
  { id: 228, hero: WESTERN_ART,       name: 'David Cook Fine American Art' },
  { id: 224, hero: BOTANIC_POND,      name: 'Denver Botanic Gardens — Freyer–Newman Center' },
  { id: 86,  hero: GALLERY_HALLWAY,   name: 'Emanuel Gallery' },
  { id: 225, hero: GALLERY_FRAMED,    name: 'Goodwin Fine Art' },
  { id: 82,  hero: GALLERY_SKYLIGHTS, name: 'Plus Gallery' },

  // Walker Fine Art — real gallery image from their actual site (walkerfineart.com)
  { id: 79,  hero: 'https://images.squarespace-cdn.com/content/v1/5296d40fe4b0a5b6da04660b/f1641301-9b37-460b-ab93-ad4e233cf445/51_July+23%2C+2025.jpg',
    name: 'Walker Fine Art' },

  // Fort Collins
  { id: 209, hero: FRONT_RANGE_MTNS,  name: 'Colorado State University Art Museum' },

  // Boulder
  { id: 111, hero: GALLERY_LIGHTS,    name: 'Dairy Arts Center' },

  // Steamboat Springs
  { id: 221, hero: STEAMBOAT_AERIAL,  name: 'Gallery at the White House Ranch' },

  // Durango
  { id: 217, hero: DURANGO_TRAIN,     name: "Maria's Bookshop & Gallery" },

  // Lantern Dancer — their own homepage hero image (Native American Jewelry hero image)
  { id: 343, hero: 'https://lanterndancer.com/cdn/shop/files/63105A5B-2B27-4AF5-B1C5-24219C871DCF.png?v=1776307983&width=800',
    name: 'Lantern Dancer Gallery' },

  // Pueblo
  { id: 219, hero: ROCKY_MTN,         name: 'Pueblo Arts Alliance' },

  // Manitou Springs / Colorado Springs area
  { id: 207, hero: GARDEN_GODS_3,     name: 'Villa Bernina Gallery' },

  // Telluride
  { id: 338, hero: TELLURIDE_STREET,  name: 'Rinkevich Gallery' },

  // Denver — Museo (replace 2024 image with newer 2026 gallery exhibition photo)
  { id: 118, hero: 'https://museo.org/wp-content/uploads/2026/03/DSC07830-Large.jpeg',
    name: 'Museo de las Américas' },
];

// Walker Fine Art also needs their website_url corrected
const urlFixes = [
  { id: 79, website_url: 'https://www.walkerfineart.com', name: 'Walker Fine Art' },
];

console.log(`Updating ${heroUpdates.length} hero images and ${urlFixes.length} website URLs…\n`);

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
  try {
    const r = await sql`UPDATE listings SET website_url = ${u.website_url} WHERE id = ${u.id} RETURNING id`;
    if (r.length) console.log(`  ✓ [${u.id}] ${u.name} website_url → ${u.website_url}`);
  } catch (err) {
    console.error(`  ✗ website_url [${u.id}]: ${err.message}`);
  }
}

console.log(`\nDone. Hero images: ${ok} updated, ${fail} failed.`);
