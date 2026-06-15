const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.NEON_DB_KEY);

// Art style slug → id map (from DB)
const STYLE_IDS = {
  'native-american': 1, 'contemporary': 2, 'western-cowboy': 3, 'adobe-pueblo': 4,
  'landscape-plein-air': 5, 'photography': 6, 'ceramics-pottery': 7, 'sculpture': 8,
  'jewelry': 9, 'glass-art': 10, 'abstract': 11, 'figurative': 12,
};

const CITIES = [
  {
    name: 'Raton',
    slug: 'raton',
    state_code: 'NM',
    description: `Raton is a small city in Colfax County in northeastern New Mexico, situated at the foot of Raton Pass — the historic gateway through the Sangre de Cristo Mountains that the Santa Fe Trail used for more than a century. The city's 19th-century brick commercial district, laid down during the coal mining and railroad booms of the 1880s and 1890s, gives Raton one of the most intact historic Main Streets in New Mexico. The Raton Arts and Humanities Council, operating out of the former Wells Fargo building, has sustained a genuine arts community here for decades, and the surrounding Cimarron Canyon country — home to the Philmont Scout Ranch, the Vermejo Park Ranch, and some of the most dramatic landscape in the southern Rockies — has long attracted painters and photographers drawn by the quality of the high-altitude light and the scale of the terrain.`,
    meta_title: 'Raton, NM Art Galleries | Southwest Galleries',
    meta_description: 'Discover art galleries and cultural venues in Raton, New Mexico — a historic Santa Fe Trail city at the foot of Raton Pass with a thriving arts community.',
    latitude: 36.9034,
    longitude: -104.4391,
  },
  {
    name: 'Angel Fire',
    slug: 'angel-fire',
    state_code: 'NM',
    description: `Angel Fire sits in the Moreno Valley of the Sangre de Cristo Mountains at around 8,380 feet, about 25 miles east of Taos — a mountain resort community whose clear high-altitude light and dramatic surrounding peaks have made it a quiet refuge for artists, writers, and craftspeople who want the creative environment of the Taos area without the tourist crowds. The valley's history spans Jicarilla Apache and Ute seasonal use, Spanish land grant settlement, and late-20th-century ski resort development, and the landscape — open meadows ringed by forested mountains — carries that layered past in its light and its silence. The community supports a small but distinctive arts scene, most notably the extraordinary outdoor installation space What?Ville, and the Vietnam Veterans Memorial State Park, whose striking chapel designed by Victor Westphall is one of the most moving pieces of memorial architecture in the American West.`,
    meta_title: 'Angel Fire, NM Art & Outdoor Sculpture | Southwest Galleries',
    meta_description: 'Explore art and outdoor sculpture in Angel Fire, New Mexico — a high-altitude Sangre de Cristo mountain community near Taos with a distinctive creative scene.',
    latitude: 36.3945,
    longitude: -105.2891,
  },
];

const LISTINGS = [
  {
    submission_id: 3,
    slug: 'old-pass-gallery-raton-nm',
    name: 'Old Pass Gallery',
    listing_type: 'gallery',
    city_slug: 'raton',
    state_code: 'NM',
    address_line1: '145 S 1st St',
    zip_code: '87740',
    phone: '(575) 445-2052',
    email: 'director@ratonarts.org',
    website_url: 'https://www.ratonarts.org',
    hero_image_url: 'https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?w=800&h=450&fit=crop&q=80',
    art_styles: ['native-american','contemporary','western-cowboy','landscape-plein-air','ceramics-pottery','sculpture','photography','jewelry','glass-art','abstract','figurative','adobe-pueblo'],
    short_description: 'The Raton Arts & Humanities Council\'s gallery in a landmark 1910 Wells Fargo building, showing work by 200+ local and regional New Mexico artists across every medium.',
    full_description: `The Old Pass Gallery occupies one of the most historically significant buildings in Raton — the former Wells Fargo building on South First Street, built around 1910 during the height of Raton's railroad and coal mining prosperity, when this stretch of northeastern New Mexico was one of the most economically active corridors in the Territory. The building's solid brick construction and street-level storefront have survived more than a century of the Sangre de Cristo Mountain winters, and today they house one of the most community-rooted galleries in New Mexico.

The gallery is operated by the Raton Arts and Humanities Council, whose mission is to encourage and strengthen the cultural life of the area — providing residents of all backgrounds and levels of artistic training with opportunities for participation, self-expression, education, and enjoyment. That mission is visible in the breadth of the Old Pass Gallery's programming: more than 200 local and regional artists are represented throughout the year, working in painting, drawing, photography, ceramics, sculpture, jewelry, fiber art, glass, and mixed media. This is not a gallery that curates to a single aesthetic or collector market — it is a genuine community arts space that reflects the full range of creative life in Colfax County and the surrounding region.

The gallery's location at the foot of Raton Pass gives it a particular historical resonance. The Santa Fe Trail passed through this very corridor for more than half a century, and the high desert and mountain landscape of northeastern New Mexico — the Cimarron Canyon, the Vermejo River valley, the forests of Philmont — has drawn painters and photographers for as long as artists have been working in the Southwest. The work shown at the Old Pass Gallery carries that geographic heritage: this is art made by people who live in and love this specific stretch of the world, and that rootedness gives the gallery its character.

Visitors to Raton making the drive on I-25 between Santa Fe and Denver are well advised to exit and spend an afternoon with the gallery and the intact 19th-century commercial architecture of the downtown. The Old Pass Gallery is among the most authentic and unhurried gallery experiences in northern New Mexico.`,
    meta_title: 'Old Pass Gallery | Raton, NM | Southwest Galleries',
    meta_description: 'The Raton Arts & Humanities Council\'s Old Pass Gallery in a landmark 1910 Wells Fargo building, showing 200+ local and regional New Mexico artists year-round.',
  },
  {
    submission_id: 4,
    slug: 'whatville-angel-fire-nm',
    name: 'What?Ville',
    listing_type: 'sculpture_park',
    city_slug: 'angel-fire',
    state_code: 'NM',
    address_line1: '18 Trujillo Road',
    zip_code: '87710',
    phone: '(505) 250-5632',
    email: 'cheyennerenfroe@yahoo.com',
    website_url: 'https://www.whatvillenm.com/',
    hero_image_url: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&h=450&fit=crop&q=80',
    art_styles: ['sculpture'],
    short_description: 'A ten-acre outdoor sculpture environment in Angel Fire built from reclaimed wood, driftwood, antique vehicles, and found objects — created by builder and artist Ray Renfroe as an act of love, grief, and celebration.',
    full_description: `What?Ville is one of the most singular art environments in New Mexico — a ten-acre outdoor installation on Trujillo Road in Angel Fire, built over more than two decades by Ray Renfroe, a builder and artist who moved to the Moreno Valley in 1990 and found in this high-altitude landscape the space and the silence to make something entirely his own.

The story of What?Ville is inseparable from the story of loss and what can be made from it. Ray began building in earnest after the death of his son, Cody Blue Renfroe, in 2001 — channeling love and grief and resilience into a space that speaks in color, in light, in reclaimed wood, and in the patient accumulation of objects that carry their own histories. Driftwood collected over years, burned pitchwood, antique vehicles, forest trimmings, and found objects from across the region are woven together into installations that are playful and symbolic and sometimes spiritual, and sometimes all three at once. It is the kind of place that resists simple description — a visitor might feel calm, or inspired, or amused, or awed, and perhaps all of those in the course of a single afternoon.

The ten acres have grown gradually, the way a garden grows: with intention and patience and the willingness to let the place become what it wants to become. What was once an open property is now a vibrant outdoor canvas, with installations that change with the seasons and with Ray's ongoing creative practice. The combination of natural materials — the textures of weathered wood, rusted metal, and stone against the sky and the mountains — and the human-scale intimacy of the individual pieces gives What?Ville an atmosphere that is unlike any conventional gallery or sculpture park.

Angel Fire sits at nearly 8,400 feet in the Sangre de Cristo Mountains, and the quality of the light here — clear and cool and high — transforms the installations through the course of a day in ways that no interior space could replicate. What?Ville is best experienced slowly, over several hours, with the kind of attention that outdoor art spaces reward. It is worth the trip from Taos, 25 miles west, and it is worth understanding that what Ray Renfroe has built here is not a tourist attraction but a life's work — one of the most genuine and moving art environments in the American Southwest.`,
    meta_title: 'What?Ville Sculpture Park | Angel Fire, NM | Southwest Galleries',
    meta_description: 'A ten-acre outdoor sculpture environment in Angel Fire, NM — built from reclaimed wood, found objects, and antique vehicles by artist Ray Renfroe over two decades.',
  },
];

async function run() {
  // 1. Create cities
  const cityIds = {};
  for (const c of CITIES) {
    const existing = await sql`SELECT id FROM cities WHERE slug = ${c.slug}`;
    if (existing.length) {
      cityIds[c.slug] = existing[0].id;
      console.log(`  city exists: ${c.name} id=${existing[0].id}`);
    } else {
      const [row] = await sql`
        INSERT INTO cities (name, slug, state_code, description, meta_title, meta_description, latitude, longitude)
        VALUES (${c.name}, ${c.slug}, ${c.state_code}, ${c.description}, ${c.meta_title}, ${c.meta_description}, ${c.latitude}, ${c.longitude})
        RETURNING id
      `;
      cityIds[c.slug] = row.id;
      console.log(`  ✓ City: ${c.name} id=${row.id}`);
    }
  }

  // 2. Create listings
  for (const l of LISTINGS) {
    const existing = await sql`SELECT id FROM listings WHERE slug = ${l.slug}`;
    if (existing.length) {
      console.log(`  listing exists: ${l.name}`);
      continue;
    }

    const cityId = cityIds[l.city_slug];
    const [row] = await sql`
      INSERT INTO listings (
        slug, name, listing_type, tier, city_id, state_code,
        address_line1, zip_code, phone, email, website_url,
        hero_image_url, short_description, full_description,
        meta_title, meta_description,
        status, is_verified
      ) VALUES (
        ${l.slug}, ${l.name}, ${l.listing_type}::listing_type, 'free'::listing_tier,
        ${cityId}, ${l.state_code},
        ${l.address_line1}, ${l.zip_code}, ${l.phone}, ${l.email ?? null}, ${l.website_url ?? null},
        ${l.hero_image_url}, ${l.short_description}, ${l.full_description},
        ${l.meta_title}, ${l.meta_description},
        'approved'::submission_status, false
      )
      RETURNING id
    `;

    // Link art styles
    for (const styleSlug of l.art_styles) {
      const styleId = STYLE_IDS[styleSlug];
      if (styleId) {
        await sql`INSERT INTO listing_art_styles (listing_id, style_id) VALUES (${row.id}, ${styleId}) ON CONFLICT DO NOTHING`;
      }
    }

    // Mark submission approved and link
    await sql`
      UPDATE listing_submissions SET status = 'approved', reviewed_at = NOW(), created_listing_id = ${row.id}
      WHERE id = ${l.submission_id}
    `;

    console.log(`  ✓ ${l.name} (listing id=${row.id})`);
  }

  // 3. Mark test submissions as rejected
  await sql`UPDATE listing_submissions SET status = 'rejected', reviewed_at = NOW() WHERE id IN (1, 2)`;
  console.log('  ✓ Test submissions (1, 2) marked rejected');

  console.log('\nDone.');
  process.exit(0);
}

run().catch(e => { console.error(e.message); process.exit(1); });
