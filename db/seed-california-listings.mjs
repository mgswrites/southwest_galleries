import { neon } from '@neondatabase/serverless';

const NEON_DB_KEY = process.env.NEON_DB_KEY;
if (!NEON_DB_KEY) { console.error('NEON_DB_KEY not set'); process.exit(1); }
const sql = neon(NEON_DB_KEY);

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// Insert new CA cities and return their IDs
const newCities = [
  { name: 'San Francisco', slug: 'san-francisco', state_code: 'CA' },
  { name: 'San Diego',     slug: 'san-diego',     state_code: 'CA' },
  { name: 'Palm Springs',  slug: 'palm-springs',  state_code: 'CA' },
  { name: 'Carmel',        slug: 'carmel',        state_code: 'CA' },
  { name: 'Santa Barbara', slug: 'santa-barbara', state_code: 'CA' },
  { name: 'Laguna Beach',  slug: 'laguna-beach',  state_code: 'CA' },
  { name: 'Berkeley',      slug: 'berkeley',      state_code: 'CA' },
];

console.log('Inserting new California cities…');
const CITIES = { losangeles: 15 };

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
  const key = city.slug.replace(/-/g, '');
  CITIES[key] = cityId;
}

console.log('\nCITIES map:', CITIES);

const listings = [

  // ─── LOS ANGELES ─────────────────────────────────────────────────────────────
  {
    name: 'The Getty Center',
    listing_type: 'museum',
    state_code: 'CA',
    city_id: CITIES.losangeles,
    neighborhood: 'Brentwood',
    short_description: 'Perched above the city with panoramic views, the Getty houses one of the world\'s finest collections of European paintings, sculpture, and decorative arts alongside landmark architecture by Richard Meier.',
    website_url: 'https://www.getty.edu',
    established_year: 1997,
    styles: ['contemporary', 'figurative', 'photography'],
  },
  {
    name: 'Los Angeles County Museum of Art (LACMA)',
    listing_type: 'museum',
    state_code: 'CA',
    city_id: CITIES.losangeles,
    neighborhood: 'Mid-Wilshire / Miracle Mile',
    short_description: 'The largest art museum in the western United States, with encyclopedic collections spanning 6,000 years and every world culture — including major holdings of Latin American and modern art.',
    website_url: 'https://www.lacma.org',
    established_year: 1961,
    styles: ['contemporary', 'abstract', 'figurative', 'photography'],
  },
  {
    name: 'The Broad',
    listing_type: 'museum',
    state_code: 'CA',
    city_id: CITIES.losangeles,
    neighborhood: 'Downtown Los Angeles',
    short_description: 'A striking contemporary art museum housing Eli and Edythe Broad\'s collection of postwar and contemporary masterworks — including icons by Koons, Basquiat, Cindy Sherman, and Jean-Michel Basquiat.',
    website_url: 'https://www.thebroad.org',
    established_year: 2015,
    styles: ['contemporary', 'abstract', 'figurative', 'photography'],
  },
  {
    name: 'The Museum of Contemporary Art, Los Angeles (MOCA)',
    listing_type: 'museum',
    state_code: 'CA',
    city_id: CITIES.losangeles,
    neighborhood: 'Downtown Los Angeles',
    short_description: 'LA\'s dedicated contemporary art museum with two campuses, presenting postwar art from abstract expressionism through today alongside site-specific commissions.',
    website_url: 'https://www.moca.org',
    established_year: 1979,
    styles: ['contemporary', 'abstract', 'photography'],
  },
  {
    name: 'Hammer Museum',
    listing_type: 'museum',
    state_code: 'CA',
    city_id: CITIES.losangeles,
    neighborhood: 'Westwood',
    short_description: 'Free-admission museum affiliated with UCLA, championing under-recognized artists and presenting experimental contemporary art, film, and public programs.',
    website_url: 'https://hammer.ucla.edu',
    established_year: 1990,
    styles: ['contemporary', 'abstract', 'photography'],
  },
  {
    name: 'Gagosian Los Angeles',
    listing_type: 'gallery',
    state_code: 'CA',
    city_id: CITIES.losangeles,
    neighborhood: 'Beverly Hills',
    short_description: 'The LA outpost of the world\'s most powerful commercial gallery, presenting blue-chip modern and contemporary artists in a refined Beverly Hills setting.',
    website_url: 'https://gagosian.com',
    established_year: 1995,
    styles: ['contemporary', 'abstract', 'photography', 'sculpture'],
  },
  {
    name: 'Hauser & Wirth Los Angeles',
    listing_type: 'gallery',
    state_code: 'CA',
    city_id: CITIES.losangeles,
    neighborhood: 'Arts District',
    short_description: 'Occupying a sprawling former flour mill in the Arts District, Hauser & Wirth LA presents monumental exhibitions by major international artists alongside a celebrated farm-to-table restaurant.',
    website_url: 'https://www.hauserwirth.com',
    established_year: 2016,
    styles: ['contemporary', 'abstract', 'sculpture', 'figurative'],
  },
  {
    name: 'David Kordansky Gallery',
    listing_type: 'gallery',
    state_code: 'CA',
    city_id: CITIES.losangeles,
    neighborhood: 'Mid-City',
    short_description: 'One of LA\'s most influential contemporary galleries, representing a diverse roster of painters, sculptors, and installation artists with an emphasis on materials and process.',
    website_url: 'https://www.davidkordanskygallery.com',
    established_year: 2003,
    styles: ['contemporary', 'abstract', 'sculpture'],
  },
  {
    name: 'Blum & Poe',
    listing_type: 'gallery',
    state_code: 'CA',
    city_id: CITIES.losangeles,
    neighborhood: 'Culver City',
    short_description: 'A globally minded contemporary gallery with deep roots in LA and Tokyo, known for introducing significant Japanese postwar artists to American audiences alongside emerging talents.',
    website_url: 'https://blumandpoe.com',
    established_year: 1994,
    styles: ['contemporary', 'abstract', 'photography'],
  },
  {
    name: 'Craft Contemporary',
    listing_type: 'museum',
    state_code: 'CA',
    city_id: CITIES.losangeles,
    neighborhood: 'Mid-Wilshire / Miracle Mile',
    short_description: 'The only LA museum dedicated exclusively to contemporary craft, celebrating artists who work in fiber, ceramics, glass, wood, and mixed media in an ambitious fine art context.',
    website_url: 'https://www.craftcontemporary.org',
    established_year: 1973,
    styles: ['ceramics-pottery', 'glass-art', 'contemporary'],
  },
  {
    name: 'Regen Projects',
    listing_type: 'gallery',
    state_code: 'CA',
    city_id: CITIES.losangeles,
    neighborhood: 'Hollywood',
    short_description: 'One of the most respected galleries in the country, representing artists like Wolfgang Tillmans, Catherine Opie, and Roni Horn with a commitment to challenging and rigorous contemporary practice.',
    website_url: 'https://www.regenprojects.com',
    established_year: 1989,
    styles: ['contemporary', 'photography', 'abstract'],
  },
  {
    name: 'LA Louver Gallery',
    listing_type: 'gallery',
    state_code: 'CA',
    city_id: CITIES.losangeles,
    neighborhood: 'Venice',
    short_description: 'Venice Beach\'s cornerstone contemporary gallery since 1975, representing major American and British painters and sculptors across a thoughtfully renovated complex of connected exhibition spaces.',
    website_url: 'https://www.lalouver.com',
    established_year: 1975,
    styles: ['contemporary', 'abstract', 'sculpture', 'figurative'],
  },

  // ─── SAN FRANCISCO ───────────────────────────────────────────────────────────
  {
    name: 'San Francisco Museum of Modern Art (SFMOMA)',
    listing_type: 'museum',
    state_code: 'CA',
    city_id: CITIES.sanfrancisco,
    neighborhood: 'SoMa',
    short_description: 'The West Coast\'s premier modern art museum, housing world-class collections of painting, photography, media arts, and design inside Mario Botta\'s landmark building, recently expanded by Snøhetta.',
    website_url: 'https://www.sfmoma.org',
    established_year: 1935,
    styles: ['contemporary', 'abstract', 'photography', 'figurative'],
  },
  {
    name: 'de Young Museum',
    listing_type: 'museum',
    state_code: 'CA',
    city_id: CITIES.sanfrancisco,
    neighborhood: 'Golden Gate Park',
    short_description: 'San Francisco\'s foremost fine arts museum in Golden Gate Park, with exceptional American art from 1670 to today, African art, Oceanic art, and blockbuster temporary exhibitions.',
    website_url: 'https://deyoung.famsf.org',
    established_year: 1895,
    styles: ['contemporary', 'figurative', 'abstract', 'photography'],
  },
  {
    name: 'Legion of Honor',
    listing_type: 'museum',
    state_code: 'CA',
    city_id: CITIES.sanfrancisco,
    neighborhood: 'Lincoln Park',
    short_description: 'Modeled after the Palais de la Légion d\'Honneur in Paris and set on a cliff overlooking the Golden Gate, this museum holds distinguished European art spanning 4,000 years.',
    website_url: 'https://legionofhonor.famsf.org',
    established_year: 1924,
    styles: ['figurative', 'abstract', 'sculpture'],
  },
  {
    name: 'Asian Art Museum of San Francisco',
    listing_type: 'museum',
    state_code: 'CA',
    city_id: CITIES.sanfrancisco,
    neighborhood: 'Civic Center',
    short_description: 'One of the largest museums outside Asia dedicated to Asian art, with 18,000 works spanning 6,000 years from across the Asian continent in Gae Aulenti\'s redesigned Beaux Arts building.',
    website_url: 'https://www.asianart.org',
    established_year: 1966,
    styles: ['contemporary', 'figurative'],
  },
  {
    name: 'Fraenkel Gallery',
    listing_type: 'gallery',
    state_code: 'CA',
    city_id: CITIES.sanfrancisco,
    neighborhood: 'Union Square',
    short_description: 'One of the world\'s leading photography galleries, representing photographers including Diane Arbus, Irving Penn, and Carleton Watkins alongside contemporary artists who use photography conceptually.',
    website_url: 'https://www.fraenkelgallery.com',
    established_year: 1979,
    styles: ['photography', 'contemporary'],
  },
  {
    name: 'Ratio 3',
    listing_type: 'gallery',
    state_code: 'CA',
    city_id: CITIES.sanfrancisco,
    neighborhood: 'Mission District',
    short_description: 'A respected Mission District gallery showcasing ambitious conceptual and experimental work by emerging and mid-career artists across painting, sculpture, and installation.',
    website_url: 'https://www.ratio3.org',
    established_year: 2003,
    styles: ['contemporary', 'abstract'],
  },
  {
    name: 'Gallery Wendi Norris',
    listing_type: 'gallery',
    state_code: 'CA',
    city_id: CITIES.sanfrancisco,
    neighborhood: 'Pacific Heights',
    short_description: 'Presenting internationally significant modern and contemporary art with a focus on female-identifying and Asian artists, offering a thoughtful counterpoint to traditional gallery rosters.',
    website_url: 'https://www.gallerywendinorris.com',
    established_year: 2009,
    styles: ['contemporary', 'abstract', 'figurative'],
  },

  // ─── SAN DIEGO ───────────────────────────────────────────────────────────────
  {
    name: 'San Diego Museum of Art',
    listing_type: 'museum',
    state_code: 'CA',
    city_id: CITIES.sandiego,
    neighborhood: 'Balboa Park',
    short_description: 'San Diego\'s primary fine arts museum in historic Balboa Park, with a permanent collection of Spanish, Italian, and American art and an acclaimed exhibition program.',
    website_url: 'https://www.sdmart.org',
    established_year: 1926,
    styles: ['figurative', 'contemporary', 'abstract'],
  },
  {
    name: 'Museum of Contemporary Art San Diego (MCASD)',
    listing_type: 'museum',
    state_code: 'CA',
    city_id: CITIES.sandiego,
    neighborhood: 'La Jolla',
    short_description: 'With campuses in La Jolla and downtown San Diego, MCASD has a long tradition of presenting cutting-edge art and artists from California and across the Pacific Rim.',
    website_url: 'https://www.mcasd.org',
    established_year: 1941,
    styles: ['contemporary', 'abstract', 'photography'],
  },
  {
    name: 'David Zapf Gallery',
    listing_type: 'gallery',
    state_code: 'CA',
    city_id: CITIES.sandiego,
    neighborhood: 'Little Italy',
    short_description: 'San Diego\'s longest-running contemporary fine art gallery, showcasing paintings, drawings, and sculpture by a tightly curated stable of California artists.',
    established_year: 1990,
    styles: ['contemporary', 'figurative', 'abstract'],
  },

  // ─── PALM SPRINGS ────────────────────────────────────────────────────────────
  {
    name: 'Palm Springs Art Museum',
    listing_type: 'museum',
    state_code: 'CA',
    city_id: CITIES.palmsprings,
    neighborhood: 'Downtown Palm Springs',
    short_description: 'The cultural heart of the Coachella Valley, featuring significant collections of modern and contemporary art, photography, Western American art, and architecture — including masterworks by Sam Francis and Mark di Suvero.',
    website_url: 'https://www.psmuseum.org',
    established_year: 1938,
    styles: ['contemporary', 'abstract', 'western-cowboy', 'photography', 'sculpture'],
  },
  {
    name: 'Melissa Morgan Fine Art',
    listing_type: 'gallery',
    state_code: 'CA',
    city_id: CITIES.palmsprings,
    neighborhood: 'Downtown Palm Springs',
    short_description: 'Specializing in California modernism and postwar work, this gallery is a trusted source for museum-quality paintings and works on paper from the mid-20th century.',
    established_year: 2002,
    styles: ['abstract', 'contemporary', 'figurative'],
  },

  // ─── CARMEL ──────────────────────────────────────────────────────────────────
  {
    name: 'Weston Gallery',
    listing_type: 'gallery',
    state_code: 'CA',
    city_id: CITIES.carmel,
    neighborhood: 'Carmel-by-the-Sea',
    short_description: 'The premier photography gallery on the West Coast, specializing in vintage prints and modern masters — including Edward Weston, Ansel Adams, and Imogen Cunningham — in the art village of Carmel.',
    website_url: 'https://www.westongallery.com',
    established_year: 1975,
    styles: ['photography'],
  },
  {
    name: 'Carmel Art Association',
    listing_type: 'gallery',
    state_code: 'CA',
    city_id: CITIES.carmel,
    neighborhood: 'Carmel-by-the-Sea',
    short_description: 'One of California\'s oldest artist cooperative galleries, presenting rotating exhibitions of painting, sculpture, and printmaking by member artists rooted in the Carmel landscape tradition.',
    website_url: 'https://carmelart.org',
    established_year: 1927,
    styles: ['landscape-plein-air', 'figurative', 'contemporary'],
  },
  {
    name: 'Dolby Chadwick Gallery',
    listing_type: 'gallery',
    state_code: 'CA',
    city_id: CITIES.carmel,
    neighborhood: 'Carmel-by-the-Sea',
    short_description: 'A respected gallery in the heart of Carmel representing established California painters and sculptors, with a particular strength in representational and plein air work.',
    website_url: 'https://www.dolbychadwickgallery.com',
    established_year: 2000,
    styles: ['landscape-plein-air', 'figurative', 'abstract'],
  },

  // ─── LAGUNA BEACH ────────────────────────────────────────────────────────────
  {
    name: 'Laguna Art Museum',
    listing_type: 'museum',
    state_code: 'CA',
    city_id: CITIES.lagunabeach,
    neighborhood: 'Village of Laguna Beach',
    short_description: 'California\'s only museum dedicated exclusively to California art, with a permanent collection tracing plein air painting and modernism from the 1890s to today in a stunning oceanfront village.',
    website_url: 'https://www.lagunaartmuseum.org',
    established_year: 1918,
    styles: ['landscape-plein-air', 'contemporary', 'figurative', 'abstract'],
  },
  {
    name: 'Redfern Gallery',
    listing_type: 'gallery',
    state_code: 'CA',
    city_id: CITIES.lagunabeach,
    neighborhood: 'Village of Laguna Beach',
    short_description: 'One of Laguna Beach\'s most established fine art galleries, showcasing California plein air and impressionist paintings alongside contemporary representational works.',
    styles: ['landscape-plein-air', 'figurative', 'contemporary'],
  },

  // ─── SANTA BARBARA ───────────────────────────────────────────────────────────
  {
    name: 'Santa Barbara Museum of Art',
    listing_type: 'museum',
    state_code: 'CA',
    city_id: CITIES.santabarbara,
    neighborhood: 'Downtown Santa Barbara',
    short_description: 'A distinguished regional museum with strong collections of American, European, and Asian art alongside an active exhibition program bringing international shows to the California coast.',
    website_url: 'https://www.sbma.net',
    established_year: 1941,
    styles: ['contemporary', 'figurative', 'abstract', 'photography'],
  },
  {
    name: 'Sullivan Goss — An American Gallery',
    listing_type: 'gallery',
    state_code: 'CA',
    city_id: CITIES.santabarbara,
    neighborhood: 'Downtown Santa Barbara',
    short_description: 'Focusing on American art from the early 20th century to the present, Sullivan Goss is known for carefully researched exhibitions of California modernism and American realism.',
    website_url: 'https://www.sullivangoss.com',
    established_year: 1994,
    styles: ['landscape-plein-air', 'figurative', 'abstract'],
  },

  // ─── BERKELEY ────────────────────────────────────────────────────────────────
  {
    name: 'University of California Berkeley Art Museum & Pacific Film Archive (BAMPFA)',
    listing_type: 'museum',
    state_code: 'CA',
    city_id: CITIES.berkeley,
    neighborhood: 'Downtown Berkeley',
    short_description: 'UC Berkeley\'s flagship arts institution presenting an encyclopedic permanent collection alongside cutting-edge contemporary exhibitions and one of the world\'s foremost film archives.',
    website_url: 'https://bampfa.org',
    established_year: 1963,
    styles: ['contemporary', 'abstract', 'photography', 'figurative'],
  },
];

console.log(`\nInserting ${listings.length} California listings…\n`);

let inserted = 0;
let skipped = 0;

for (const l of listings) {
  const slug = slugify(l.name);
  const { styles, ...rest } = l;

  try {
    const [existing] = await sql`SELECT id FROM listings WHERE slug = ${slug}`;
    let listingId;
    if (existing) {
      listingId = existing.id;
      skipped++;
    } else {
      const [row] = await sql`
        INSERT INTO listings (
          slug, name, listing_type, state_code, city_id,
          neighborhood, short_description, website_url,
          established_year, status, tier
        ) VALUES (
          ${slug}, ${l.name}, ${l.listing_type}, ${l.state_code}, ${l.city_id},
          ${l.neighborhood ?? null}, ${l.short_description}, ${l.website_url ?? null},
          ${l.established_year ?? null}, 'approved', 'free'
        )
        RETURNING id
      `;
      listingId = row.id;
      inserted++;
    }

    if (styles?.length) {
      for (const styleSlug of styles) {
        await sql`
          INSERT INTO listing_art_styles (listing_id, style_id)
          SELECT ${listingId}, id FROM art_styles WHERE slug = ${styleSlug}
          ON CONFLICT DO NOTHING
        `;
      }
    }

    console.log(`  ✓ ${existing ? 'styles linked' : 'inserted'}  ${l.name}`);
  } catch (err) {
    console.error(`  ✗ ${l.name}: ${err.message}`);
  }
}

// Update California gallery count in states table
const [countRow] = await sql`
  SELECT COUNT(*) AS n FROM listings
  WHERE state_code = 'CA' AND status = 'approved' AND deleted_at IS NULL
`;
await sql`
  UPDATE states SET gallery_count = ${parseInt(countRow.n, 10)}
  WHERE code = 'CA'
`;

console.log(`\nDone. Inserted: ${inserted}, Skipped (already existed): ${skipped}`);
console.log(`California total listings: ${countRow.n}`);
