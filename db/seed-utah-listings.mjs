import { neon } from '@neondatabase/serverless';

const NEON_DB_KEY = process.env.NEON_DB_KEY;
if (!NEON_DB_KEY) { console.error('NEON_DB_KEY not set'); process.exit(1); }
const sql = neon(NEON_DB_KEY);

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// Existing UT cities
const CITIES = { saltlakecity: 13, moab: 14 };

const newCities = [
  { name: 'Park City',   slug: 'park-city',   state_code: 'UT' },
  { name: 'Provo',       slug: 'provo',        state_code: 'UT' },
  { name: 'Springville', slug: 'springville',  state_code: 'UT' },
  { name: 'Ogden',       slug: 'ogden',        state_code: 'UT' },
  { name: 'St. George',  slug: 'st-george',    state_code: 'UT' },
  { name: 'Cedar City',  slug: 'cedar-city',   state_code: 'UT' },
];

console.log('Inserting new Utah cities…');
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

  // ─── SALT LAKE CITY (additions) ──────────────────────────────────────────
  {
    name: 'Utah Museum of Contemporary Art',
    listing_type: 'museum',
    state_code: 'UT',
    city_id: CITIES.saltlakecity,
    neighborhood: 'Downtown',
    short_description: 'Founded in 1931 as the Salt Lake Art Center, UMOCA is Utah\'s flagship museum dedicated exclusively to contemporary and modern art — presenting rotating exhibitions, public programs, and artist residencies free of charge in the heart of downtown Salt Lake City.',
    website_url: 'https://utahmoca.org',
    established_year: 1931,
    styles: ['contemporary', 'abstract', 'photography'],
  },
  {
    name: 'Gilgal Sculpture Garden',
    listing_type: 'museum',
    state_code: 'UT',
    city_id: CITIES.saltlakecity,
    neighborhood: 'Sugar House',
    short_description: 'A singular and strange free outdoor garden created over two decades by stone mason Thomas Child, featuring 12 sculptural works carved in granite — including an Egyptian sphinx with the face of Joseph Smith — charged with folk symbolism unique in American art.',
    website_url: 'https://gilgalgarden.org',
    established_year: 1945,
    styles: ['sculpture', 'figurative'],
  },
  {
    name: 'Rio Gallery',
    listing_type: 'gallery',
    state_code: 'UT',
    city_id: CITIES.saltlakecity,
    neighborhood: 'Downtown',
    short_description: 'Operated by the Utah Division of Arts & Museums inside the magnificent 1910 Rio Grande Depot, this free gallery presents rotating exhibitions of work by Utah artists in one of Salt Lake City\'s most beautiful historic landmarks.',
    website_url: 'https://arts.utah.gov/gallery',
    established_year: 1995,
    styles: ['contemporary', 'figurative', 'landscape-plein-air'],
  },
  {
    name: 'Granary Arts',
    listing_type: 'cultural_center',
    state_code: 'UT',
    city_id: CITIES.saltlakecity,
    neighborhood: 'Granary District',
    short_description: 'An alternative arts organization anchoring Salt Lake City\'s emerging Granary District, presenting experimental and emerging contemporary art in industrial space while nurturing a new creative neighborhood on the city\'s south side.',
    website_url: 'https://granaryarts.org',
    established_year: 2012,
    styles: ['contemporary', 'abstract', 'photography'],
  },
  {
    name: 'Art Access Gallery',
    listing_type: 'gallery',
    state_code: 'UT',
    city_id: CITIES.saltlakecity,
    neighborhood: 'Downtown',
    short_description: 'A pioneering Salt Lake City gallery and nonprofit dedicated to artists with disabilities and artists addressing disability in their work — one of the country\'s longest-running disability arts organizations, with an inclusive exhibition program and community residencies.',
    website_url: 'https://accessarts.org',
    established_year: 1985,
    styles: ['contemporary', 'figurative', 'abstract'],
  },

  // ─── PARK CITY ────────────────────────────────────────────────────────────
  {
    name: 'Kimball Art Center',
    listing_type: 'cultural_center',
    state_code: 'UT',
    city_id: CITIES.parkcity,
    neighborhood: 'Old Town',
    short_description: 'Park City\'s premier contemporary art institution, presenting rotating exhibitions, public art commissions, and an acclaimed annual art festival that draws artists and collectors from across the country to this world-class mountain arts hub.',
    website_url: 'https://kimballartcenter.org',
    established_year: 1976,
    styles: ['contemporary', 'abstract', 'photography', 'sculpture'],
  },
  {
    name: 'Meyer Gallery',
    listing_type: 'gallery',
    state_code: 'UT',
    city_id: CITIES.parkcity,
    neighborhood: 'Main Street',
    short_description: 'One of Park City\'s most established galleries, presenting Western contemporary painting and sculpture by regional and national artists — a trusted destination for collectors visiting during ski season and the summer arts festival circuit.',
    website_url: 'https://meyergalleryparkcity.com',
    established_year: 1984,
    styles: ['landscape-plein-air', 'western-cowboy', 'figurative'],
  },
  {
    name: 'Coda Gallery',
    listing_type: 'gallery',
    state_code: 'UT',
    city_id: CITIES.parkcity,
    neighborhood: 'Main Street',
    short_description: 'A Park City gallery specializing in abstract and contemporary painting, sculpture, and fine art glass — presenting nationally recognized artists alongside emerging regional talents in a sophisticated mountain town setting.',
    website_url: 'https://codagallery.com',
    established_year: 2001,
    styles: ['abstract', 'contemporary', 'glass-art', 'sculpture'],
  },
  {
    name: 'Winn Slavin Fine Art',
    listing_type: 'gallery',
    state_code: 'UT',
    city_id: CITIES.parkcity,
    neighborhood: 'Main Street',
    short_description: 'A respected Park City gallery representing contemporary painters and sculptors working in realist and impressionist traditions, with a loyal following among collectors drawn to the Park City art scene for its quality and warmth of presentation.',
    website_url: 'https://winnslavin.com',
    established_year: 2004,
    styles: ['figurative', 'landscape-plein-air', 'contemporary'],
  },
  {
    name: 'Terzian Galleries',
    listing_type: 'gallery',
    state_code: 'UT',
    city_id: CITIES.parkcity,
    neighborhood: 'Main Street',
    short_description: 'A distinguished Park City gallery presenting works on paper, sculpture, and painting with particular depth in American realism and plein air tradition — a sophisticated presence on Main Street serving serious collectors for over two decades.',
    website_url: 'https://terziangalleries.com',
    established_year: 1999,
    styles: ['figurative', 'landscape-plein-air', 'sculpture'],
  },

  // ─── PROVO ────────────────────────────────────────────────────────────────
  {
    name: 'BYU Museum of Art',
    listing_type: 'museum',
    state_code: 'UT',
    city_id: CITIES.provo,
    neighborhood: 'BYU Campus',
    short_description: 'One of the largest and most significant art museums in the American West, with a collection of over 17,000 works spanning world art history — including a celebrated collection of Carl Bloch paintings, Rembrandt etchings, and a strong survey of 19th-century European art, all free and open to the public.',
    website_url: 'https://moa.byu.edu',
    established_year: 1965,
    styles: ['figurative', 'landscape-plein-air', 'sculpture', 'contemporary'],
  },
  {
    name: 'Covey Center for the Arts',
    listing_type: 'cultural_center',
    state_code: 'UT',
    city_id: CITIES.provo,
    neighborhood: 'Downtown Provo',
    short_description: 'Provo\'s primary arts venue, presenting visual art exhibitions alongside performing arts programming in a purpose-built community arts center — the creative and civic hub of Utah County\'s arts ecosystem.',
    website_url: 'https://www.provo.org/departments/arts-culture/covey-center',
    established_year: 2004,
    styles: ['contemporary', 'figurative', 'photography'],
  },

  // ─── SPRINGVILLE ──────────────────────────────────────────────────────────
  {
    name: 'Springville Museum of Art',
    listing_type: 'museum',
    state_code: 'UT',
    city_id: CITIES.springville,
    neighborhood: 'Downtown Springville',
    short_description: 'Utah\'s de facto state art museum, with a collection of over 2,000 works spanning the entire history of Utah art — from 19th-century pioneer painters through the contemporary moment — housed free in a beloved Beaux-Arts building and presenting the finest survey of Utah\'s artistic heritage anywhere.',
    website_url: 'https://www.smofa.org',
    established_year: 1903,
    styles: ['figurative', 'landscape-plein-air', 'western-cowboy', 'contemporary'],
  },

  // ─── OGDEN ────────────────────────────────────────────────────────────────
  {
    name: 'Eccles Community Art Center',
    listing_type: 'cultural_center',
    state_code: 'UT',
    city_id: CITIES.ogden,
    neighborhood: 'Downtown Ogden',
    short_description: 'Northern Utah\'s premier arts institution, housed in a magnificent 1893 Victorian mansion, with gallery spaces presenting rotating exhibitions and a celebrated annual juried show — the cultural heart of Ogden\'s arts community and a gateway to the northern Utah gallery scene.',
    website_url: 'https://www.ogdenarts.org',
    established_year: 1976,
    styles: ['contemporary', 'figurative', 'landscape-plein-air'],
  },
  {
    name: 'Weber State University Galleries',
    listing_type: 'museum',
    state_code: 'UT',
    city_id: CITIES.ogden,
    neighborhood: 'WSU Campus',
    short_description: 'The Shaw Gallery and Kimball Visual Arts Center at Weber State University present rotating exhibitions of contemporary art alongside permanent collection displays — bringing significant regional and national work to Ogden\'s university community and the broader public.',
    website_url: 'https://www.weber.edu/finearts/galleries',
    established_year: 1978,
    styles: ['contemporary', 'abstract', 'photography'],
  },

  // ─── ST. GEORGE ───────────────────────────────────────────────────────────
  {
    name: 'St. George Art Museum',
    listing_type: 'museum',
    state_code: 'UT',
    city_id: CITIES.stgeorge,
    neighborhood: 'Downtown St. George',
    short_description: 'The primary fine arts museum of southern Utah, presenting rotating exhibitions of regional and national art in a purpose-built facility in downtown St. George — the cultural anchor of the rapidly growing Washington County arts scene and a gateway to the art of the Colorado Plateau.',
    website_url: 'https://www.sgcity.org/artmuseum',
    established_year: 1997,
    styles: ['contemporary', 'figurative', 'landscape-plein-air'],
  },
  {
    name: 'Sears Art Museum',
    listing_type: 'museum',
    state_code: 'UT',
    city_id: CITIES.stgeorge,
    neighborhood: 'Utah Tech University',
    short_description: 'The contemporary art museum of Utah Tech University, presenting rotating exhibitions with a particular focus on the art of the American West and the landscapes and cultures of the Colorado Plateau — one of the most distinctive small university museums in the Southwest.',
    website_url: 'https://www.utahtech.edu/searsartmuseum',
    established_year: 2003,
    styles: ['contemporary', 'landscape-plein-air', 'photography'],
  },

  // ─── CEDAR CITY ───────────────────────────────────────────────────────────
  {
    name: 'Braithwaite Fine Arts Gallery',
    listing_type: 'museum',
    state_code: 'UT',
    city_id: CITIES.cedarcity,
    neighborhood: 'SUU Campus',
    short_description: 'The art museum of Southern Utah University, presenting rotating exhibitions of regional and national contemporary art alongside a permanent collection — a vital cultural resource in the heart of Utah\'s Shakespeare Festival country and a gateway to the art of the Colorado Plateau.',
    website_url: 'https://www.suu.edu/pva/artgallery',
    established_year: 1976,
    styles: ['contemporary', 'figurative', 'landscape-plein-air', 'photography'],
  },

];

console.log(`\nInserting ${listings.length} Utah listings…\n`);
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

  console.log(`  ✓ inserted  [${row.id}] ${l.name}`);
  inserted++;
}

console.log(`\nDone. Inserted: ${inserted}, Skipped: ${skipped}`);
const [{ total }] = await sql`
  SELECT COUNT(*) AS total FROM listings
  WHERE city_id IN (SELECT id FROM cities WHERE state_code = 'UT')
    AND status = 'approved' AND deleted_at IS NULL
`;
console.log(`Utah total listings: ${total}`);
