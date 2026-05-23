import { neon } from '@neondatabase/serverless';

const NEON_DB_KEY = process.env.NEON_DB_KEY;
if (!NEON_DB_KEY) { console.error('NEON_DB_KEY not set'); process.exit(1); }
const sql = neon(NEON_DB_KEY);

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const newCities = [
  { name: 'Reno',         slug: 'reno',         state_code: 'NV' },
  { name: 'Henderson',    slug: 'henderson-nv',  state_code: 'NV' },
  { name: 'Carson City',  slug: 'carson-city',   state_code: 'NV' },
  { name: 'Elko',         slug: 'elko',          state_code: 'NV' },
  { name: 'Virginia City', slug: 'virginia-city-nv', state_code: 'NV' },
];

console.log('Inserting new Nevada cities…');
const CITIES = { lasvegas: 12 }; // existing

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
  CITIES[city.slug.replace(/[-]/g, '')] = cityId;
}

const listings = [

  // ─── LAS VEGAS ────────────────────────────────────────────────────────────
  {
    name: 'Marjorie Barrick Museum of Art',
    listing_type: 'museum',
    state_code: 'NV',
    city_id: CITIES.lasvegas,
    neighborhood: 'UNLV Campus',
    short_description: 'The main art museum at the University of Nevada Las Vegas, presenting rotating exhibitions of contemporary art alongside its permanent collection of Latin American and Mesoamerican works.',
    website_url: 'https://barrickmuseum.unlv.edu',
    established_year: 1967,
    styles: ['contemporary', 'native-american', 'figurative'],
  },
  {
    name: 'The Arts Factory',
    listing_type: 'gallery',
    state_code: 'NV',
    city_id: CITIES.lasvegas,
    neighborhood: 'Arts District',
    short_description: 'A multi-tenant creative complex in the heart of the Las Vegas Arts District housing galleries, studios, and creative businesses, anchoring the city\'s 18b Arts District monthly gallery walks.',
    website_url: 'https://www.theartsfactory.com',
    established_year: 1997,
    styles: ['contemporary', 'abstract', 'photography'],
  },
  {
    name: 'Traction Gallery',
    listing_type: 'gallery',
    state_code: 'NV',
    city_id: CITIES.lasvegas,
    neighborhood: 'Arts District',
    short_description: 'A contemporary fine art gallery in the 18b Arts District presenting works by regional and national artists across painting, sculpture, and mixed media, with a focus on bold visual narratives.',
    website_url: 'https://www.traction.gallery',
    established_year: 2013,
    styles: ['contemporary', 'abstract', 'sculpture'],
  },
  {
    name: 'Art Square Las Vegas',
    listing_type: 'cultural_center',
    state_code: 'NV',
    city_id: CITIES.lasvegas,
    neighborhood: 'Arts District',
    short_description: 'A live-work creative campus in the Las Vegas Arts District with gallery spaces, artist studios, performance venues, and a community garden — a hub for the city\'s working artists.',
    website_url: 'https://www.artsquarelv.com',
    established_year: 2012,
    styles: ['contemporary', 'abstract', 'photography'],
  },
  {
    name: 'Nevada State Museum Las Vegas',
    listing_type: 'museum',
    state_code: 'NV',
    city_id: CITIES.lasvegas,
    neighborhood: 'Springs Preserve',
    short_description: 'Located within the Springs Preserve, this Smithsonian-affiliated museum explores Nevada\'s natural and cultural history through immersive exhibits including Indigenous artifacts and decorative arts.',
    website_url: 'https://springs.nevadaculture.org',
    established_year: 2011,
    styles: ['native-american', 'figurative'],
  },
  {
    name: 'Donna Beam Fine Art Gallery',
    listing_type: 'gallery',
    state_code: 'NV',
    city_id: CITIES.lasvegas,
    neighborhood: 'UNLV Campus',
    short_description: 'A student and faculty exhibition space at UNLV\'s Department of Art presenting cutting-edge contemporary work by emerging artists and national invitees in an intimate university gallery setting.',
    website_url: 'https://www.unlv.edu/art/donna-beam-gallery',
    established_year: 1975,
    styles: ['contemporary', 'photography', 'ceramics-pottery'],
  },

  // ─── RENO ────────────────────────────────────────────────────────────────
  {
    name: 'Nevada Museum of Art',
    listing_type: 'museum',
    state_code: 'NV',
    city_id: CITIES.reno,
    neighborhood: 'Downtown Reno',
    short_description: 'The only accredited art museum in Nevada, housed in a striking zinc-clad building designed by Will Bruder. The collection focuses on art of the American West and the Great Basin, with an innovative Center for Art + Environment.',
    website_url: 'https://www.nevadaart.org',
    established_year: 1931,
    styles: ['contemporary', 'landscape-plein-air', 'photography', 'abstract'],
  },
  {
    name: 'Stremmel Gallery',
    listing_type: 'gallery',
    state_code: 'NV',
    city_id: CITIES.reno,
    neighborhood: 'South Meadows',
    short_description: 'One of the most respected fine art galleries in the Mountain West, representing nationally recognized painters and sculptors with a focus on contemporary realism, abstraction, and Western American art.',
    website_url: 'https://www.stremmelgallery.com',
    established_year: 1970,
    styles: ['contemporary', 'abstract', 'landscape-plein-air', 'sculpture'],
  },
  {
    name: 'Sierra Arts Foundation',
    listing_type: 'cultural_center',
    state_code: 'NV',
    city_id: CITIES.reno,
    neighborhood: 'Downtown Reno',
    short_description: 'A nonprofit arts organization supporting Northern Nevada artists through grants, residencies, gallery exhibitions, and public programming, with a gallery space presenting rotating community exhibitions.',
    website_url: 'https://www.sierra-arts.org',
    established_year: 1971,
    styles: ['contemporary', 'photography', 'abstract'],
  },
  {
    name: 'The Holland Project',
    listing_type: 'cultural_center',
    state_code: 'NV',
    city_id: CITIES.reno,
    neighborhood: 'Midtown Reno',
    short_description: 'Reno\'s essential DIY arts and music venue, running a gallery, recording studio, and event space for independent artists and musicians — the cultural heartbeat of the city\'s alternative creative community.',
    website_url: 'https://www.hollandproject.org',
    established_year: 2006,
    styles: ['contemporary', 'photography', 'abstract'],
  },
  {
    name: 'Sheppard Fine Arts Gallery',
    listing_type: 'gallery',
    state_code: 'NV',
    city_id: CITIES.reno,
    neighborhood: 'University of Nevada Reno',
    short_description: 'The primary exhibition space for the University of Nevada Reno\'s Department of Art, presenting work by students, faculty, and invited national artists across all media in a purpose-built gallery on campus.',
    website_url: 'https://www.unr.edu/art/sheppard-gallery',
    established_year: 1966,
    styles: ['contemporary', 'photography', 'ceramics-pottery', 'sculpture'],
  },
  {
    name: 'Artown',
    listing_type: 'cultural_center',
    state_code: 'NV',
    city_id: CITIES.reno,
    neighborhood: 'Citywide',
    short_description: 'Reno\'s beloved month-long July arts festival bringing hundreds of free performances, exhibitions, and studio tours to parks, galleries, and public spaces across the city since 1996.',
    website_url: 'https://www.renoisartown.com',
    established_year: 1996,
    styles: ['contemporary', 'abstract', 'photography', 'sculpture'],
  },

  // ─── HENDERSON ──────────────────────────────────────────────────────────
  {
    name: 'City of Henderson Art Gallery',
    listing_type: 'gallery',
    state_code: 'NV',
    city_id: CITIES.hendersonnv,
    neighborhood: 'Water Street District',
    short_description: 'The City of Henderson\'s public gallery presenting rotating exhibitions by local and regional artists in the heart of the historic Water Street District, with free admission year-round.',
    website_url: 'https://www.cityofhenderson.com/residents/arts-culture',
    established_year: 2005,
    styles: ['contemporary', 'landscape-plein-air', 'photography'],
  },
  {
    name: 'Henderson Civic Arts Foundation',
    listing_type: 'cultural_center',
    state_code: 'NV',
    city_id: CITIES.hendersonnv,
    neighborhood: 'Green Valley',
    short_description: 'A nonprofit supporting arts education and exhibition programming in Henderson, connecting Southern Nevada artists with community audiences through gallery shows, workshops, and public installations.',
    website_url: 'https://www.hendersonarts.org',
    established_year: 1999,
    styles: ['contemporary', 'figurative', 'photography'],
  },

  // ─── CARSON CITY ─────────────────────────────────────────────────────────
  {
    name: 'Brewery Arts Center',
    listing_type: 'cultural_center',
    state_code: 'NV',
    city_id: CITIES.carsoncity,
    neighborhood: 'Historic District',
    short_description: 'Housed in a restored 1864 brewery, this beloved Northern Nevada arts center runs galleries, a theater, studio art classes, and a vibrant calendar of exhibitions celebrating regional artists and craftspeople.',
    website_url: 'https://www.breweryarts.org',
    established_year: 1975,
    styles: ['contemporary', 'ceramics-pottery', 'abstract', 'sculpture'],
  },
  {
    name: 'Nevada State Museum Carson City',
    listing_type: 'museum',
    state_code: 'NV',
    city_id: CITIES.carsoncity,
    neighborhood: 'Historic District',
    short_description: 'Housed in the original U.S. Mint building, this Smithsonian-affiliated museum chronicles Nevada\'s history from prehistoric times through statehood, with significant collections of Nevada Native American art and artifacts.',
    website_url: 'https://museums.nevadaculture.org/nevada-state-museum-carson-city',
    established_year: 1941,
    styles: ['native-american', 'figurative'],
  },
  {
    name: 'Artists at Work Gallery',
    listing_type: 'gallery',
    state_code: 'NV',
    city_id: CITIES.carsoncity,
    neighborhood: 'Carson City Arts District',
    short_description: 'A cooperative gallery run by Northern Nevada artists showcasing original paintings, sculpture, jewelry, and crafts — a cornerstone of Carson City\'s growing arts district.',
    website_url: 'https://www.artistsatworkgallery.com',
    established_year: 2003,
    styles: ['landscape-plein-air', 'contemporary', 'jewelry', 'sculpture'],
  },

  // ─── ELKO ────────────────────────────────────────────────────────────────
  {
    name: 'Western Folklife Center',
    listing_type: 'cultural_center',
    state_code: 'NV',
    city_id: CITIES.elko,
    neighborhood: 'Downtown Elko',
    short_description: 'Home to the world-famous National Cowboy Poetry Gathering, this center celebrates the living traditions of the American West through exhibitions, performances, and education programs devoted to ranching culture and folk art.',
    website_url: 'https://www.westernfolklife.org',
    established_year: 1985,
    styles: ['western-cowboy', 'figurative', 'landscape-plein-air'],
  },
  {
    name: 'Northeastern Nevada Museum',
    listing_type: 'museum',
    state_code: 'NV',
    city_id: CITIES.elko,
    neighborhood: 'Downtown Elko',
    short_description: 'A wide-ranging regional museum covering Northeastern Nevada\'s natural and cultural history, with galleries dedicated to Shoshone and Paiute heritage, ranching life, and Western American art and photography.',
    website_url: 'https://www.museumelko.org',
    established_year: 1968,
    styles: ['western-cowboy', 'native-american', 'photography'],
  },

  // ─── VIRGINIA CITY ───────────────────────────────────────────────────────
  {
    name: 'The Way It Was Museum',
    listing_type: 'museum',
    state_code: 'NV',
    city_id: CITIES.virginicitynv,
    neighborhood: 'Historic C Street',
    short_description: 'A mining-history museum in the heart of the Comstock Lode\'s legendary boomtown, displaying authentic 19th-century mining equipment, historic photographs, and artifacts from Virginia City\'s silver-rush heyday.',
    website_url: 'https://www.thewayitwasmuseum.com',
    established_year: 1964,
    styles: ['photography', 'figurative'],
  },
  {
    name: 'Virginia City Arts',
    listing_type: 'gallery',
    state_code: 'NV',
    city_id: CITIES.virginicitynv,
    neighborhood: 'Historic C Street',
    short_description: 'A gallery celebrating the art and history of the legendary Comstock Lode mining district, showing works inspired by Nevada\'s rugged frontier landscape, mining heritage, and the Silver State\'s enduring Western spirit.',
    website_url: 'https://www.visitvirginiacitynv.com',
    established_year: 2000,
    styles: ['western-cowboy', 'landscape-plein-air', 'figurative'],
  },

];

console.log(`\nInserting ${listings.length} Nevada listings…\n`);
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
      short_description, website_url, established_year,
      status, tier, is_verified
    ) VALUES (
      ${l.name}, ${slug}, ${l.listing_type}, ${l.state_code}, ${l.city_id},
      ${l.neighborhood ?? null}, ${l.short_description}, ${l.website_url ?? null},
      ${l.established_year ?? null}, 'approved', 'free', false
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

  console.log(`  ✓ inserted  ${l.name}`);
  inserted++;
}

console.log(`\nDone. Inserted: ${inserted}, Skipped: ${skipped}`);
const [{ total }] = await sql`
  SELECT COUNT(*) AS total FROM listings
  WHERE city_id IN (SELECT id FROM cities WHERE state_code = 'NV')
    AND status = 'approved' AND deleted_at IS NULL
`;
console.log(`Nevada total listings: ${total}`);
