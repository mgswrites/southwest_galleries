import { neon } from '@neondatabase/serverless';

const NEON_DB_KEY = process.env.NEON_DB_KEY;
if (!NEON_DB_KEY) { console.error('NEON_DB_KEY not set'); process.exit(1); }
const sql = neon(NEON_DB_KEY);

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// Existing CO city IDs
const CITIES = { durango: 36, telluride: 35 };

// New cities to insert
const newCities = [
  { name: 'Ouray',         slug: 'ouray',         state_code: 'CO' },
  { name: 'Pagosa Springs', slug: 'pagosa-springs', state_code: 'CO' },
];

console.log('Inserting new Colorado cities…');
for (const city of newCities) {
  const [existing] = await sql`SELECT id FROM cities WHERE slug = ${city.slug}`;
  let cityId;
  if (existing) {
    cityId = existing.id;
    console.log(`  ${city.name} → id ${cityId} (already exists)`);
  } else {
    const [row] = await sql`
      INSERT INTO cities (name, slug, state_code)
      VALUES (${city.name}, ${city.slug}, ${city.state_code})
      RETURNING id
    `;
    cityId = row.id;
    console.log(`  ${city.name} → id ${cityId} (inserted)`);
  }
  const key = slugify(city.name).replace(/-/g, '');
  CITIES[key] = cityId;
}

console.log('\nCITIES dict:', JSON.stringify(CITIES));

const listings = [

  // ─── DURANGO (additions) ──────────────────────────────────────────────────
  {
    name: 'Blue Rain Gallery',
    listing_type: 'gallery',
    city_id: CITIES.durango,
    neighborhood: 'Main Avenue',
    short_description: 'One of the Four Corners\' most celebrated galleries, Blue Rain showcases contemporary, regional, studio glass, and especially innovative Native American art — representing major Pueblo, Navajo, and Hopi artists alongside rising regional voices on Durango\'s historic Main Avenue.',
    website_url: 'https://blueraingallery.com',
    address: '934 Main Ave',
    styles: ['native-american', 'contemporary', 'glass-art'],
  },
  {
    name: 'A Shared Blanket Gallery',
    listing_type: 'gallery',
    city_id: CITIES.durango,
    neighborhood: 'Downtown',
    short_description: 'A museum-quality gallery devoted entirely to Native American art and material culture — presenting handcrafted jewelry, paintings, sculpture, pottery, Kachinas, baskets, drums, flutes, and textiles made exclusively by Native artists, with an emphasis on education and cultural context.',
    website_url: 'https://www.asharedblanket.com',
    address: '104 East 5th St',
    styles: ['native-american', 'ceramics-pottery', 'jewelry'],
  },
  {
    name: 'Scenic Aperture',
    listing_type: 'gallery',
    city_id: CITIES.durango,
    neighborhood: 'Main Avenue',
    short_description: 'A fine-art photography gallery on Durango\'s historic Main Street devoted to the landscapes and natural wonders of the Four Corners region, featuring the internationally collected work of nature photographer Frank Comisar — dramatic large-format prints of canyon country, mountain wilderness, and desert light.',
    website_url: 'https://www.durangogallery.photography',
    address: '708 Main Ave',
    styles: ['photography', 'landscape-plein-air'],
  },
  {
    name: 'Earthen Vessel Gallery',
    listing_type: 'gallery',
    city_id: CITIES.durango,
    neighborhood: 'Ninth Street District',
    short_description: 'A beloved Durango gallery representing over 100 independent American studio artists — presenting an eclectic range of handcrafted pottery, paintings, jewelry, glass, and functional art objects sourced from small studios across the country, with a strong Southwest aesthetic.',
    website_url: 'https://earthenvessel.com',
    address: '115 W 9th St',
    styles: ['ceramics-pottery', 'contemporary', 'glass-art', 'jewelry'],
  },
  {
    name: 'Museum of Impressionism',
    listing_type: 'museum',
    city_id: CITIES.durango,
    neighborhood: 'Durango',
    short_description: 'A unique private museum displaying over 60 impressionist paintings on permanent exhibit — featuring landscapes of Colorado, New Mexico, and Europe, offering Durango visitors an intimate encounter with the impressionist tradition in a Southwest setting.',
    website_url: 'https://www.museumofimpressionism.com',
    address: '445 Albrecht Lane',
    styles: ['landscape-plein-air', 'figurative'],
  },
  {
    name: 'Paul Folwell Studio',
    listing_type: 'artist_studio',
    city_id: CITIES.durango,
    neighborhood: 'Durango',
    short_description: 'The working studio and gallery of plein air and studio painter Paul Folwell, specializing in oil paintings of the San Juan Mountains, ski culture, musicians, and dancers — commissions welcomed, offering collectors direct access to one of the region\'s most distinctive landscape painters.',
    website_url: 'https://www.paulfolwell.com',
    address: '8199 County Road 203',
    styles: ['landscape-plein-air', 'figurative', 'western-cowboy'],
  },
  {
    name: 'Center of Southwest Studies Museum',
    listing_type: 'museum',
    city_id: CITIES.durango,
    neighborhood: 'Fort Lewis College Campus',
    short_description: 'The research museum and archive of Fort Lewis College, home to the Durango Collection — an extraordinary holding of Navajo, Puebloan, and Hispano textiles, plus baskets, beadwork, pottery, sculpture, and paintings representing the full breadth of Southwest cultural production.',
    website_url: 'https://swcenter.fortlewis.edu',
    styles: ['native-american', 'ceramics-pottery', 'figurative'],
  },

  // ─── TELLURIDE (additions) ────────────────────────────────────────────────
  {
    name: 'Rinkevich Gallery',
    listing_type: 'gallery',
    city_id: CITIES.telluride,
    neighborhood: 'Mountain Village',
    short_description: 'An artist-owned contemporary fine art gallery in Telluride\'s Mountain Village presenting the work of gallery director and painter Rinkevich alongside a distinctive collection of traditional tribal African art — an unexpected and compelling pairing that draws serious collectors to this mountain resort destination.',
    website_url: 'https://www.rinkevichgallery.com',
    address: '618 Mountain Village Blvd',
    styles: ['contemporary', 'abstract', 'figurative'],
  },
  {
    name: 'Tony Newlin Gallery',
    listing_type: 'gallery',
    city_id: CITIES.telluride,
    neighborhood: 'Downtown',
    short_description: 'A Telluride gallery devoted to the wildlife and wilderness photography of Tony Newlin — dramatic large-format images of Colorado, the American West, and Alaska that capture the region\'s megafauna and landscapes with the eye of a seasoned naturalist and fine art photographer.',
    website_url: 'https://tonynewlin.com',
    address: '100 W Colorado Ave',
    styles: ['photography', 'landscape-plein-air'],
  },

  // ─── OURAY (new city) ─────────────────────────────────────────────────────
  {
    name: 'Ago Gallery',
    listing_type: 'gallery',
    city_id: CITIES.ouray,
    neighborhood: 'Main Street',
    short_description: 'Ouray\'s welcoming fine art gallery on historic Main Street, presenting works by Colorado artists alongside custom framing services — a creative anchor for the Switzerland of America and a destination for visitors drawn to this dramatic mountain town\'s thriving arts scene.',
    website_url: null,
    address: '445 Main St',
    styles: ['contemporary', 'landscape-plein-air'],
  },
  {
    name: 'Ouray Glassworks & Pottery',
    listing_type: 'artist_studio',
    city_id: CITIES.ouray,
    neighborhood: 'Downtown',
    short_description: 'A working studio in the heart of Ouray where visitors can watch skilled artisans create handblown glass and handcrafted pottery on-site — combining live demonstrations with a gallery of finished works that make distinctive keepsakes from the Switzerland of America.',
    website_url: 'https://www.ourayglassworksandpottery.com',
    styles: ['glass-art', 'ceramics-pottery'],
  },

  // ─── PAGOSA SPRINGS (new city) ────────────────────────────────────────────
  {
    name: 'Fred Harman Art Museum',
    listing_type: 'museum',
    city_id: CITIES.pagosasprings,
    neighborhood: 'Pagosa Springs',
    short_description: 'The home and studio museum of Fred Harman — creator of the Red Ryder comic strip and co-founder of the Cowboy Artists of America — preserving over 50 original paintings, comic strip originals, and Western memorabilia in the authentic studio where Harman worked, making it one of Colorado\'s most intimate Western art experiences.',
    website_url: 'https://www.harmanartmuseum.com',
    address: '85 Harman Park Drive',
    styles: ['western-cowboy', 'figurative'],
  },
  {
    name: 'Lantern Dancer Gallery',
    listing_type: 'gallery',
    city_id: CITIES.pagosasprings,
    neighborhood: 'Downtown',
    short_description: 'A Pagosa Springs gallery specializing in contemporary Southwestern jewelry and Native American craft — offering handmade one-of-a-kind pieces by Navajo, Hopi, Zuni, and Apache artists alongside local artisan jewelry, pottery, Kachinas, painting, and sculpture in historic downtown.',
    website_url: 'https://www.lanterndancer.com',
    address: '124 East Pagosa Street',
    styles: ['native-american', 'jewelry', 'ceramics-pottery'],
  },
  {
    name: 'Gallery Summer',
    listing_type: 'gallery',
    city_id: CITIES.pagosasprings,
    neighborhood: 'Historic Downtown',
    short_description: 'A Pagosa Springs fine art gallery operated by artist Summer Spitsbergen, featuring original paintings of breathtaking river scenes, wildlife, the Wild West, and Native American subjects — one of the Four Corners\' most distinctive one-artist galleries, located in the heart of historic downtown Pagosa Springs.',
    website_url: 'https://www.gallerysummer.org',
    styles: ['landscape-plein-air', 'native-american', 'western-cowboy'],
  },
  {
    name: 'Chad Haspels Sculpture Studio',
    listing_type: 'artist_studio',
    city_id: CITIES.pagosasprings,
    neighborhood: 'Pagosa Springs',
    short_description: 'The working studio and gallery of sculptor Chad Haspels, whose fine art bronzes and mixed-media works are inspired by the spirit and life of the natural world — offering collectors direct access to a distinctive Colorado sculptor with deep roots in the Southwest landscape.',
    website_url: 'https://www.chadhaspelssculpture.com',
    styles: ['sculpture', 'figurative'],
  },

];

console.log(`\nInserting ${listings.length} SW Colorado listings…\n`);
let inserted = 0;
let skipped = 0;

for (const l of listings) {
  const slug = slugify(l.name);
  const [existing] = await sql`SELECT id FROM listings WHERE slug = ${slug}`;
  if (existing) {
    console.log(`  → skipped  ${l.name} (exists)`);
    skipped++;
    continue;
  }

  const [row] = await sql`
    INSERT INTO listings (
      name, slug, listing_type, state_code, city_id, neighborhood,
      short_description, website_url,
      status, tier, is_verified
    ) VALUES (
      ${l.name}, ${slug}, ${l.listing_type}, 'CO', ${l.city_id},
      ${l.neighborhood ?? null}, ${l.short_description}, ${l.website_url ?? null},
      'approved', 'free', false
    )
    RETURNING id
  `;
  const listingId = row.id;

  for (const styleSlug of (l.styles ?? [])) {
    await sql`
      INSERT INTO listing_art_styles (listing_id, style_id)
      SELECT ${listingId}, id FROM art_styles WHERE slug = ${styleSlug}
      ON CONFLICT DO NOTHING
    `;
  }

  console.log(`  ✓ inserted  [${row.id}] ${l.name}`);
  inserted++;
}

console.log(`\nDone. Inserted: ${inserted}, Skipped: ${skipped}`);

// Update CO gallery_count
const [{ total }] = await sql`
  SELECT COUNT(*) AS total FROM listings
  WHERE city_id IN (SELECT id FROM cities WHERE state_code = 'CO')
    AND status = 'approved' AND deleted_at IS NULL
`;
await sql`UPDATE states SET gallery_count = ${total} WHERE code = 'CO'`;
console.log(`CO gallery_count updated to ${total}`);
