import { neon } from '@neondatabase/serverless';

const NEON_DB_KEY = process.env.NEON_DB_KEY;
if (!NEON_DB_KEY) { console.error('NEON_DB_KEY not set'); process.exit(1); }
const sql = neon(NEON_DB_KEY);

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const newCities = [
  { name: 'Las Cruces',  slug: 'las-cruces',  state_code: 'NM' },
  { name: 'Roswell',     slug: 'roswell-nm',  state_code: 'NM' },
  { name: 'Silver City', slug: 'silver-city', state_code: 'NM' },
  { name: 'Española',    slug: 'espanola',    state_code: 'NM' },
];

console.log('Inserting new New Mexico cities…');
const CITIES = { santafe: 6, taos: 7, albuquerque: 8 }; // existing

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
  CITIES[slugify(city.name).replace(/-/g, '')] = cityId;
}

const listings = [

  // ─── SANTA FE (additions) ─────────────────────────────────────────────────
  {
    name: 'Nüart Gallery',
    listing_type: 'gallery',
    state_code: 'NM',
    city_id: CITIES.santafe,
    neighborhood: 'Canyon Road',
    short_description: 'A Canyon Road gallery presenting master works by the legendary Taos Society of Artists alongside living New Mexico painters — a bridge between the state\'s foundational art movement and its contemporary heirs.',
    website_url: 'https://www.nuartgallery.com',
    established_year: 1980,
    styles: ['landscape-plein-air', 'figurative', 'western-cowboy'],
  },
  {
    name: 'Patina Gallery',
    listing_type: 'gallery',
    state_code: 'NM',
    city_id: CITIES.santafe,
    neighborhood: 'Downtown Santa Fe',
    short_description: 'An acclaimed jewelry and fine craft gallery in downtown Santa Fe showcasing sculptural jewelry, objects, and furniture by leading contemporary studio artists from across the country.',
    website_url: 'https://www.patina-gallery.com',
    established_year: 1999,
    styles: ['jewelry', 'sculpture', 'contemporary'],
  },
  {
    name: 'Monroe Gallery of Photography',
    listing_type: 'gallery',
    state_code: 'NM',
    city_id: CITIES.santafe,
    neighborhood: 'Downtown Santa Fe',
    short_description: 'A celebrated photography gallery dedicated to humanist documentary photography, presenting iconic images by the greatest photojournalists of the 20th and 21st centuries.',
    website_url: 'https://www.monroegallery.com',
    established_year: 2001,
    styles: ['photography', 'figurative'],
  },
  {
    name: 'Riva Yares Gallery',
    listing_type: 'gallery',
    state_code: 'NM',
    city_id: CITIES.santafe,
    neighborhood: 'Downtown Santa Fe',
    short_description: 'A longstanding gallery representing significant modern and contemporary artists with works spanning painting, sculpture, and works on paper, with a particular strength in Latin American masters.',
    website_url: 'https://www.rivayaresgallery.com',
    established_year: 1963,
    styles: ['contemporary', 'abstract', 'figurative'],
  },

  // ─── TAOS (additions) ────────────────────────────────────────────────────
  {
    name: 'Taos Art Museum at Fechin House',
    listing_type: 'museum',
    state_code: 'NM',
    city_id: CITIES.taos,
    neighborhood: 'Kit Carson Road',
    short_description: 'Housed in the intricately hand-carved home of Russian-American artist Nicolai Fechin, this intimate museum presents works by the Taos Society of Artists in an architectural masterpiece that is itself a work of art.',
    website_url: 'https://www.taosartmuseum.org',
    established_year: 2003,
    styles: ['figurative', 'landscape-plein-air', 'western-cowboy'],
  },
  {
    name: 'Taos Center for the Arts',
    listing_type: 'cultural_center',
    state_code: 'NM',
    city_id: CITIES.taos,
    neighborhood: 'Downtown Taos',
    short_description: 'The cultural hub of Taos, presenting visual art exhibitions, film screenings, and performing arts in a historic building — a gathering place for the creative community of this legendary arts town.',
    website_url: 'https://www.tcataos.org',
    established_year: 1994,
    styles: ['contemporary', 'photography', 'abstract'],
  },
  {
    name: 'Van Vechten Lineberry Taos Art Museum',
    listing_type: 'museum',
    state_code: 'NM',
    city_id: CITIES.taos,
    neighborhood: 'South Taos',
    short_description: 'A museum devoted to the art of Duane Van Vechten and the broader circle of early Taos artists, with a collection spanning the founding era of the Taos art colony in a serene campus setting.',
    website_url: 'https://www.taosartmuseum.org/van-vechten',
    established_year: 1994,
    styles: ['figurative', 'landscape-plein-air'],
  },

  // ─── ALBUQUERQUE (additions) ──────────────────────────────────────────────
  {
    name: 'Exhibit/208',
    listing_type: 'gallery',
    state_code: 'NM',
    city_id: CITIES.albuquerque,
    neighborhood: 'Nob Hill',
    short_description: 'A contemporary gallery in Albuquerque\'s Nob Hill neighborhood presenting emerging and established New Mexico artists, with a commitment to supporting the local creative community through rotating monthly exhibitions.',
    website_url: 'https://www.exhibit208.com',
    established_year: 2012,
    styles: ['contemporary', 'abstract', 'photography'],
  },
  {
    name: 'Tortuga Gallery',
    listing_type: 'gallery',
    state_code: 'NM',
    city_id: CITIES.albuquerque,
    neighborhood: 'Wells Park',
    short_description: 'An alternative art space in Albuquerque\'s Wells Park neighborhood known for experimental and outsider art, zine culture, and a fiercely independent DIY spirit that has made it an institution for the city\'s underground creative scene.',
    website_url: 'https://www.tortugagallery.org',
    established_year: 2006,
    styles: ['contemporary', 'abstract', 'figurative'],
  },
  {
    name: 'Nob Hill Gallery',
    listing_type: 'gallery',
    state_code: 'NM',
    city_id: CITIES.albuquerque,
    neighborhood: 'Nob Hill',
    short_description: 'A cooperative fine art gallery on Albuquerque\'s Central Avenue presenting paintings, ceramics, jewelry, and mixed media works by a rotating collective of New Mexico artists.',
    website_url: 'https://www.nobhillgallery.com',
    established_year: 2004,
    styles: ['contemporary', 'ceramics-pottery', 'jewelry', 'landscape-plein-air'],
  },

  // ─── LAS CRUCES ──────────────────────────────────────────────────────────
  {
    name: 'New Mexico State University Art Museum',
    listing_type: 'museum',
    state_code: 'NM',
    city_id: CITIES.lascruces,
    neighborhood: 'NMSU Campus',
    short_description: 'The NMSU Art Museum houses over 7,000 works spanning five centuries, with particular strengths in 20th-century American prints, Mexican and Latin American photography, and New Mexico art — all free and open to the public.',
    website_url: 'https://artmuseum.nmsu.edu',
    established_year: 1935,
    styles: ['photography', 'figurative', 'contemporary'],
  },
  {
    name: 'Las Cruces Museum of Art',
    listing_type: 'museum',
    state_code: 'NM',
    city_id: CITIES.lascruces,
    neighborhood: 'Downtown Las Cruces',
    short_description: 'A free civic museum in downtown Las Cruces presenting rotating exhibitions of regional and national artists alongside a growing permanent collection rooted in the art traditions of southern New Mexico.',
    website_url: 'https://museum.las-cruces.org/museums/art-museum',
    established_year: 1957,
    styles: ['contemporary', 'figurative', 'landscape-plein-air'],
  },
  {
    name: 'Fountain Theatre',
    listing_type: 'cultural_center',
    state_code: 'NM',
    city_id: CITIES.lascruces,
    neighborhood: 'Mesilla Valley',
    short_description: 'An intimate performing arts and visual art center in Las Cruces presenting local theater productions and gallery exhibitions, anchoring the city\'s growing creative district.',
    website_url: 'https://www.fountaintheatre.com',
    established_year: 1993,
    styles: ['contemporary', 'figurative'],
  },

  // ─── ROSWELL ─────────────────────────────────────────────────────────────
  {
    name: 'Roswell Museum and Art Center',
    listing_type: 'museum',
    state_code: 'NM',
    city_id: CITIES.roswellnm,
    neighborhood: 'Downtown Roswell',
    short_description: 'New Mexico\'s oldest art museum, with a wide-ranging collection of Southwestern and American art, notable holdings of Peter Hurd and Henriette Wyeth paintings, and a celebrated artist-in-residence program founded in 1967.',
    website_url: 'https://www.roswellmuseum.org',
    established_year: 1937,
    styles: ['landscape-plein-air', 'figurative', 'contemporary'],
  },
  {
    name: 'Anderson Museum of Contemporary Art',
    listing_type: 'museum',
    state_code: 'NM',
    city_id: CITIES.roswellnm,
    neighborhood: 'Downtown Roswell',
    short_description: 'A surprising gem in the eastern New Mexico desert: a museum showcasing work created by artists who participated in the Roswell Artist-in-Residence Program, with over 200 works spanning five decades of residency.',
    website_url: 'https://www.roswellanderson.org',
    established_year: 1994,
    styles: ['contemporary', 'abstract', 'sculpture'],
  },

  // ─── SILVER CITY ─────────────────────────────────────────────────────────
  {
    name: 'Western New Mexico University Museum',
    listing_type: 'museum',
    state_code: 'NM',
    city_id: CITIES.silvercity,
    neighborhood: 'WNMU Campus',
    short_description: 'Home to the world\'s largest permanent display of Mimbres pottery, this university museum in the Gila Wilderness foothills offers an unparalleled window into the art of the ancient Mimbres people of southwestern New Mexico.',
    website_url: 'https://www.wnmu.edu/museum',
    established_year: 1974,
    styles: ['ceramics-pottery', 'native-american'],
  },
  {
    name: 'Silver City Museum',
    listing_type: 'museum',
    state_code: 'NM',
    city_id: CITIES.silvercity,
    neighborhood: 'Historic Downtown',
    short_description: 'Housed in a Victorian-era home in Silver City\'s historic district, this museum presents the history and folk art of southwestern New Mexico, including Apache and Mimbres heritage, the copper mining era, and the life of Billy the Kid.',
    website_url: 'https://www.silvercitymuseum.org',
    established_year: 1967,
    styles: ['native-american', 'figurative', 'western-cowboy'],
  },
  {
    name: 'Mimbres Region Arts Council Gallery',
    listing_type: 'gallery',
    state_code: 'NM',
    city_id: CITIES.silvercity,
    neighborhood: 'Historic Downtown Silver City',
    short_description: 'The main gallery arm of the Mimbres Region Arts Council, showcasing works by local and regional artists in a welcoming downtown space and hosting Silver City\'s vibrant First Friday ArtWalk events.',
    website_url: 'https://www.mimbresarts.org',
    established_year: 1990,
    styles: ['contemporary', 'ceramics-pottery', 'landscape-plein-air'],
  },

  // ─── ESPAÑOLA ────────────────────────────────────────────────────────────
  {
    name: 'Chimayó Museum',
    listing_type: 'museum',
    state_code: 'NM',
    city_id: CITIES.espanola,
    neighborhood: 'El Potrero, Chimayó',
    short_description: 'A small but significant museum in the historic village of Chimayó celebrating the weaving traditions, folk art, and cultural heritage of the Río Arriba region — one of the oldest continuously inhabited communities in the United States.',
    website_url: 'https://www.chimayomuseum.org',
    established_year: 2000,
    styles: ['native-american', 'figurative', 'adobe-pueblo'],
  },
  {
    name: 'Los Luceros Historic Site',
    listing_type: 'museum',
    state_code: 'NM',
    city_id: CITIES.espanola,
    neighborhood: 'Alcalde',
    short_description: 'A 200-acre historic hacienda along the Río Grande north of Española, managed by New Mexico Historic Sites and presenting exhibitions on the living traditions of northern New Mexico\'s Hispanic and Pueblo communities.',
    website_url: 'https://www.nmhistoricsites.org/los-luceros',
    established_year: 2010,
    styles: ['adobe-pueblo', 'native-american', 'figurative'],
  },

];

console.log(`\nInserting ${listings.length} New Mexico listings…\n`);
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
  WHERE city_id IN (SELECT id FROM cities WHERE state_code = 'NM')
    AND status = 'approved' AND deleted_at IS NULL
`;
console.log(`New Mexico total listings: ${total}`);
