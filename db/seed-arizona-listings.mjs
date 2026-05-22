import { neon } from '@neondatabase/serverless';

const NEON_DB_KEY = process.env.NEON_DB_KEY;
if (!NEON_DB_KEY) { console.error('NEON_DB_KEY not set'); process.exit(1); }
const sql = neon(NEON_DB_KEY);

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// Insert new AZ cities
const newCities = [
  { name: 'Jerome',    slug: 'jerome',    state_code: 'AZ' },
  { name: 'Bisbee',   slug: 'bisbee',    state_code: 'AZ' },
  { name: 'Prescott', slug: 'prescott',  state_code: 'AZ' },
  { name: 'Tempe',    slug: 'tempe',     state_code: 'AZ' },
  { name: 'Mesa',     slug: 'mesa',      state_code: 'AZ' },
  { name: 'Cave Creek', slug: 'cave-creek', state_code: 'AZ' },
];

console.log('Inserting new Arizona cities…');
const CITIES = { scottsdale: 1, sedona: 2, tucson: 3, phoenix: 4, flagstaff: 5 };

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

  // ─── JEROME ──────────────────────────────────────────────────────────────────
  {
    name: 'Jerome Artists\' Cooperative Gallery',
    listing_type: 'gallery',
    state_code: 'AZ',
    city_id: CITIES.jerome,
    neighborhood: 'Historic Jerome',
    short_description: 'A vibrant artist-run cooperative perched in Jerome\'s historic mining district, showcasing original paintings, ceramics, jewelry, and sculpture by over 40 local artists.',
    website_url: 'https://www.jeromecoop.com',
    established_year: 2000,
    styles: ['contemporary', 'ceramics-pottery', 'jewelry'],
  },
  {
    name: 'Raku Gallery',
    listing_type: 'gallery',
    state_code: 'AZ',
    city_id: CITIES.jerome,
    neighborhood: 'Historic Jerome',
    short_description: 'Specializing in raku and studio ceramics alongside paintings and mixed media, Raku Gallery is one of Jerome\'s most beloved stops on the art colony\'s gallery trail.',
    established_year: 1998,
    styles: ['ceramics-pottery', 'contemporary', 'abstract'],
  },
  {
    name: 'Jerome Art Walk',
    listing_type: 'cultural_center',
    state_code: 'AZ',
    city_id: CITIES.jerome,
    neighborhood: 'Historic Jerome',
    short_description: 'Monthly gallery walk through Jerome\'s historic art colony, connecting visitors with the town\'s remarkable concentration of working artists, studios, and galleries.',
    website_url: 'https://www.jeromeartwalk.com',
    styles: ['contemporary', 'western-cowboy', 'ceramics-pottery'],
  },
  {
    name: 'Priceless Pieces Fine Art',
    listing_type: 'gallery',
    state_code: 'AZ',
    city_id: CITIES.jerome,
    neighborhood: 'Historic Jerome',
    short_description: 'A fine art gallery offering paintings, sculpture, and photography celebrating the dramatic landscapes and heritage of the Verde Valley and greater Southwest.',
    styles: ['landscape-plein-air', 'western-cowboy', 'photography'],
  },

  // ─── BISBEE ──────────────────────────────────────────────────────────────────
  {
    name: 'Belleza Fine Art',
    listing_type: 'gallery',
    state_code: 'AZ',
    city_id: CITIES.bisbee,
    neighborhood: 'Old Bisbee / Brewery Gulch',
    short_description: 'A standout gallery in Bisbee\'s bohemian Brewery Gulch, presenting original paintings, photography, and mixed-media work by regional artists in a beautifully restored historic space.',
    styles: ['contemporary', 'photography', 'abstract'],
  },
  {
    name: 'Bisbee Arts & Social Club',
    listing_type: 'cultural_center',
    state_code: 'AZ',
    city_id: CITIES.bisbee,
    neighborhood: 'Old Bisbee',
    short_description: 'A community arts hub anchoring Bisbee\'s creative scene with rotating exhibitions, artist talks, live music, and an open studio culture that defines this quirky Arizona art town.',
    styles: ['contemporary', 'abstract', 'photography'],
  },
  {
    name: 'Gallery Bisbee',
    listing_type: 'gallery',
    state_code: 'AZ',
    city_id: CITIES.bisbee,
    neighborhood: 'Old Bisbee',
    short_description: 'One of Bisbee\'s longest-running fine art galleries, featuring paintings and sculpture by established Southwestern artists alongside emerging voices from the border region.',
    established_year: 1994,
    styles: ['contemporary', 'landscape-plein-air', 'figurative'],
  },
  {
    name: 'Copper Queen Hotel Art Gallery',
    listing_type: 'gallery',
    state_code: 'AZ',
    city_id: CITIES.bisbee,
    neighborhood: 'Old Bisbee',
    short_description: 'Housed inside the legendary Copper Queen Hotel, this intimate gallery showcases works inspired by Bisbee\'s storied mining history, desert landscape, and border culture.',
    styles: ['western-cowboy', 'photography', 'contemporary'],
  },

  // ─── PRESCOTT ────────────────────────────────────────────────────────────────
  {
    name: 'Phippen Museum of Western Art',
    listing_type: 'museum',
    state_code: 'AZ',
    city_id: CITIES.prescott,
    neighborhood: 'Prescott',
    short_description: 'Dedicated to the legacy of Arizona artist George Phippen and the ongoing tradition of Western American art, this museum celebrates the cowboy, the landscape, and the spirit of the frontier.',
    website_url: 'https://phippenartmuseum.org',
    established_year: 1984,
    styles: ['western-cowboy', 'landscape-plein-air', 'sculpture'],
  },
  {
    name: 'Mountain Artists Guild Gallery',
    listing_type: 'gallery',
    state_code: 'AZ',
    city_id: CITIES.prescott,
    neighborhood: 'Courthouse Plaza',
    short_description: 'One of Arizona\'s oldest artist cooperatives, offering original work by over 100 member artists in a historic downtown gallery steps from the famous Prescott Courthouse Plaza.',
    website_url: 'https://www.mountainartistsguild.org',
    established_year: 1954,
    styles: ['landscape-plein-air', 'contemporary', 'western-cowboy', 'ceramics-pottery'],
  },
  {
    name: 'Smoki Museum',
    listing_type: 'museum',
    state_code: 'AZ',
    city_id: CITIES.prescott,
    neighborhood: 'Prescott',
    short_description: 'A historic museum preserving and interpreting the art, culture, and material heritage of Native American peoples of the Southwest, with significant collections of pottery, weaving, and ceremonial objects.',
    website_url: 'https://www.smokimuseum.org',
    established_year: 1935,
    styles: ['native-american', 'ceramics-pottery'],
  },
  {
    name: 'Prescott Fine Arts Association',
    listing_type: 'cultural_center',
    state_code: 'AZ',
    city_id: CITIES.prescott,
    neighborhood: 'Downtown Prescott',
    short_description: 'A community arts center presenting exhibitions, theater, and education programs in a renovated historic church — the creative heart of Prescott\'s thriving arts community.',
    website_url: 'https://pfaa.net',
    established_year: 1967,
    styles: ['contemporary', 'figurative', 'abstract'],
  },

  // ─── TEMPE ───────────────────────────────────────────────────────────────────
  {
    name: 'Arizona State University Art Museum',
    listing_type: 'museum',
    state_code: 'AZ',
    city_id: CITIES.tempe,
    neighborhood: 'ASU Campus',
    short_description: 'One of the finest university art museums in the Southwest, with over 5,000 works spanning American art, craft, Latin American art, and groundbreaking contemporary installations.',
    website_url: 'https://asuartmuseum.asu.edu',
    established_year: 1950,
    styles: ['contemporary', 'abstract', 'ceramics-pottery', 'figurative'],
  },
  {
    name: 'Tempe Center for the Arts',
    listing_type: 'cultural_center',
    state_code: 'AZ',
    city_id: CITIES.tempe,
    neighborhood: 'Tempe Town Lake',
    short_description: 'A striking lakeside arts complex presenting visual art exhibitions alongside performing arts, with sweeping views of Tempe Town Lake from its award-winning sustainable building.',
    website_url: 'https://tempe.gov/tca',
    established_year: 2007,
    styles: ['contemporary', 'abstract', 'photography'],
  },
  {
    name: 'Eye Lounge Tempe',
    listing_type: 'gallery',
    state_code: 'AZ',
    city_id: CITIES.tempe,
    neighborhood: 'Tempe',
    short_description: 'An artist-run experimental gallery in the Tempe arts district, presenting boundary-pushing contemporary work from emerging Arizona-based artists across painting, installation, and new media.',
    styles: ['contemporary', 'abstract', 'photography'],
  },

  // ─── MESA ────────────────────────────────────────────────────────────────────
  {
    name: 'Mesa Arts Center',
    listing_type: 'cultural_center',
    state_code: 'AZ',
    city_id: CITIES.mesa,
    neighborhood: 'Downtown Mesa',
    short_description: 'The largest arts complex in the Southwest, with five theaters and four galleries presenting national and regional visual art exhibitions in a stunning desert-inspired campus.',
    website_url: 'https://www.mesaartscenter.com',
    established_year: 2005,
    styles: ['contemporary', 'abstract', 'sculpture', 'photography'],
  },
  {
    name: 'Mesa Contemporary Arts Museum',
    listing_type: 'museum',
    state_code: 'AZ',
    city_id: CITIES.mesa,
    neighborhood: 'Mesa Arts Center Campus',
    short_description: 'Located within Mesa Arts Center, this museum presents dynamic contemporary art exhibitions with a focus on work that reflects the diversity and vitality of the American Southwest.',
    website_url: 'https://www.mesaartscenter.com/index.php/explore/arts-center/galleries',
    established_year: 2005,
    styles: ['contemporary', 'abstract', 'figurative'],
  },
  {
    name: 'Galeria Mesa',
    listing_type: 'gallery',
    state_code: 'AZ',
    city_id: CITIES.mesa,
    neighborhood: 'Downtown Mesa',
    short_description: 'A city-run gallery in the heart of downtown Mesa presenting rotating exhibitions of local, regional, and national artists with a commitment to diverse and accessible contemporary art.',
    website_url: 'https://www.mesaaz.gov/residents/arts-culture/galeria-mesa',
    styles: ['contemporary', 'abstract', 'photography', 'figurative'],
  },

  // ─── CAVE CREEK ──────────────────────────────────────────────────────────────
  {
    name: 'Desert Foothills Art Center',
    listing_type: 'cultural_center',
    state_code: 'AZ',
    city_id: CITIES.cavecreek,
    neighborhood: 'Cave Creek / Carefree',
    short_description: 'Serving the north Phoenix foothills community since 1972, this center offers gallery exhibitions, art education, and cultural events celebrating the art and heritage of the Sonoran Desert.',
    website_url: 'https://www.dfac.org',
    established_year: 1972,
    styles: ['contemporary', 'landscape-plein-air', 'western-cowboy'],
  },
  {
    name: 'Horton Gallery',
    listing_type: 'gallery',
    state_code: 'AZ',
    city_id: CITIES.cavecreek,
    neighborhood: 'Cave Creek',
    short_description: 'A respected Western art gallery in the Cave Creek arts community, featuring bronze sculpture, oil paintings, and limited edition prints celebrating the wildlife and landscapes of the American West.',
    styles: ['western-cowboy', 'sculpture', 'landscape-plein-air'],
  },
  {
    name: 'Buffalo Chip Gallery',
    listing_type: 'gallery',
    state_code: 'AZ',
    city_id: CITIES.cavecreek,
    neighborhood: 'Cave Creek',
    short_description: 'Part of the iconic Buffalo Chip Saloon complex, this gallery displays a remarkable collection of Western American bronzes, paintings, and artifacts evoking the spirit of the frontier.',
    styles: ['western-cowboy', 'sculpture'],
  },

  // ─── ADDITIONAL FLAGSTAFF ─────────────────────────────────────────────────
  {
    name: 'Northern Arizona University Art Museum',
    listing_type: 'museum',
    state_code: 'AZ',
    city_id: CITIES.flagstaff,
    neighborhood: 'NAU Campus',
    short_description: 'A significant university art museum presenting contemporary exhibitions and maintaining a permanent collection with particular strengths in photography and regional Southwest art.',
    website_url: 'https://nau.edu/art-museum',
    established_year: 1970,
    styles: ['contemporary', 'photography', 'abstract'],
  },
  {
    name: 'The Artists Gallery Flagstaff',
    listing_type: 'gallery',
    state_code: 'AZ',
    city_id: CITIES.flagstaff,
    neighborhood: 'Downtown Flagstaff',
    short_description: 'A cooperative gallery in the heart of downtown Flagstaff, run by member artists who show landscape paintings, ceramics, jewelry, and photography inspired by Arizona\'s northern highlands.',
    styles: ['landscape-plein-air', 'ceramics-pottery', 'photography', 'jewelry'],
  },
  {
    name: 'Flagstaff Arts Council',
    listing_type: 'cultural_center',
    state_code: 'AZ',
    city_id: CITIES.flagstaff,
    neighborhood: 'Downtown Flagstaff',
    short_description: 'The primary arts advocacy and presenting organization in Flagstaff, with gallery exhibitions and public programs supporting the city\'s vibrant creative community.',
    website_url: 'https://www.flagartscouncil.org',
    established_year: 1966,
    styles: ['contemporary', 'abstract', 'photography'],
  },

  // ─── ADDITIONAL PHOENIX ───────────────────────────────────────────────────
  {
    name: 'Icehouse Gallery',
    listing_type: 'gallery',
    state_code: 'AZ',
    city_id: CITIES.phoenix,
    neighborhood: 'Roosevelt Row Arts District',
    short_description: 'A cornerstone of Phoenix\'s Roosevelt Row arts district, the Icehouse presents ambitious contemporary exhibitions in a historic industrial space that anchors the city\'s First Friday art walks.',
    styles: ['contemporary', 'abstract', 'photography'],
  },
  {
    name: 'monOrchid',
    listing_type: 'cultural_center',
    state_code: 'AZ',
    city_id: CITIES.phoenix,
    neighborhood: 'Roosevelt Row Arts District',
    short_description: 'An innovative event and gallery space in the Roosevelt Row corridor, hosting rotating art exhibitions, cultural events, and community activations in a beautifully repurposed mid-century building.',
    website_url: 'https://www.monorchid.com',
    styles: ['contemporary', 'abstract', 'photography'],
  },
  {
    name: 'Unexpected Gallery',
    listing_type: 'gallery',
    state_code: 'AZ',
    city_id: CITIES.phoenix,
    neighborhood: 'Downtown Phoenix',
    short_description: 'A curated contemporary gallery showcasing works by nationally collected Arizona-based artists, with a program that emphasizes painting, sculpture, and works on paper.',
    styles: ['contemporary', 'abstract', 'figurative'],
  },
];

console.log(`\nInserting ${listings.length} Arizona listings…\n`);
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

// Update AZ gallery count
const [countRow] = await sql`
  SELECT COUNT(*) AS n FROM listings
  WHERE state_code = 'AZ' AND status = 'approved' AND deleted_at IS NULL
`;
await sql`UPDATE states SET gallery_count = ${parseInt(countRow.n, 10)} WHERE code = 'AZ'`;

console.log(`\nDone. Inserted: ${inserted}, Skipped: ${skipped}`);
console.log(`Arizona total listings: ${countRow.n}`);
