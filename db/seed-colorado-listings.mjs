import { neon } from '@neondatabase/serverless';

const NEON_DB_KEY = process.env.NEON_DB_KEY;
if (!NEON_DB_KEY) { console.error('NEON_DB_KEY not set'); process.exit(1); }
const sql = neon(NEON_DB_KEY);

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const newCities = [
  { name: 'Fort Collins',        slug: 'fort-collins',        state_code: 'CO' },
  { name: 'Colorado Springs',    slug: 'colorado-springs',    state_code: 'CO' },
  { name: 'Manitou Springs',     slug: 'manitou-springs',     state_code: 'CO' },
  { name: 'Telluride',           slug: 'telluride',           state_code: 'CO' },
  { name: 'Durango',             slug: 'durango',             state_code: 'CO' },
  { name: 'Pueblo',              slug: 'pueblo',              state_code: 'CO' },
  { name: 'Steamboat Springs',   slug: 'steamboat-springs',   state_code: 'CO' },
  { name: 'Vail',                slug: 'vail',                state_code: 'CO' },
];

console.log('Inserting new Colorado cities…');
const CITIES = { denver: 9, aspen: 10, boulder: 11 };

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
  CITIES[city.slug.replace(/-/g, '')] = cityId;
}

const listings = [

  // ─── ASPEN ───────────────────────────────────────────────────────────────────
  {
    name: 'Anderson Ranch Arts Center',
    listing_type: 'cultural_center',
    state_code: 'CO',
    city_id: CITIES.aspen,
    neighborhood: 'Snowmass Village',
    short_description: 'A world-renowned artist residency and education center in the mountains outside Aspen, offering workshops with celebrated artists and a vibrant gallery program in a bucolic ranch setting.',
    website_url: 'https://www.andersonranch.org',
    established_year: 1966,
    styles: ['contemporary', 'ceramics-pottery', 'photography', 'sculpture'],
  },
  {
    name: 'Aspen Historical Society Museum',
    listing_type: 'museum',
    state_code: 'CO',
    city_id: CITIES.aspen,
    neighborhood: 'Aspen',
    short_description: 'Preserving the visual and cultural history of the Roaring Fork Valley, with rotating exhibitions of historical photography, mining-era artifacts, and art documenting Aspen\'s transformation into a world-class arts destination.',
    website_url: 'https://www.aspenhistory.org',
    established_year: 1962,
    styles: ['photography', 'contemporary'],
  },

  // ─── BOULDER ─────────────────────────────────────────────────────────────────
  {
    name: 'Boulder Arts & Crafts Gallery',
    listing_type: 'gallery',
    state_code: 'CO',
    city_id: CITIES.boulder,
    neighborhood: 'Pearl Street Mall',
    short_description: 'A cooperative gallery on Boulder\'s beloved Pearl Street Mall, showcasing handcrafted jewelry, ceramics, fiber, glass, and mixed-media work by Colorado artisans since 1971.',
    website_url: 'https://www.boulderartsandcrafts.com',
    established_year: 1971,
    styles: ['ceramics-pottery', 'glass-art', 'jewelry', 'contemporary'],
  },
  {
    name: 'Naropa University Art Gallery',
    listing_type: 'gallery',
    state_code: 'CO',
    city_id: CITIES.boulder,
    neighborhood: 'Boulder',
    short_description: 'The exhibition space of Naropa University — the contemplative arts university founded by Chögyam Trungpa Rinpoche — presenting work that sits at the intersection of spiritual practice and contemporary visual art.',
    styles: ['contemporary', 'abstract', 'photography'],
  },
  {
    name: 'Macky Auditorium Gallery',
    listing_type: 'gallery',
    state_code: 'CO',
    city_id: CITIES.boulder,
    neighborhood: 'CU Boulder Campus',
    short_description: 'Housed within CU Boulder\'s landmark Macky Auditorium, this gallery presents rotating exhibitions of contemporary and historical art, serving the campus community and broader Boulder arts scene.',
    styles: ['contemporary', 'abstract', 'photography'],
  },

  // ─── COLORADO SPRINGS ────────────────────────────────────────────────────────
  {
    name: 'Colorado Springs Fine Arts Center at Colorado College',
    listing_type: 'museum',
    state_code: 'CO',
    city_id: CITIES.coloradosprings,
    neighborhood: 'Colorado Springs',
    short_description: 'A stunning Art Deco museum at Colorado College with one of the Southwest\'s finest permanent collections, including Native American and Hispanic art, alongside major traveling exhibitions and performing arts.',
    website_url: 'https://fac.coloradocollege.edu',
    established_year: 1936,
    styles: ['contemporary', 'native-american', 'figurative', 'abstract'],
  },
  {
    name: 'Pikes Peak Arts Council',
    listing_type: 'cultural_center',
    state_code: 'CO',
    city_id: CITIES.coloradosprings,
    neighborhood: 'Colorado Springs',
    short_description: 'The primary arts advocacy organization for the Pikes Peak region, supporting local artists through grants, exhibitions, and public programming that celebrate the creative heritage of southern Colorado.',
    website_url: 'https://pikespeakarts.org',
    styles: ['contemporary', 'abstract', 'photography'],
  },
  {
    name: 'Gallery of the Rockies',
    listing_type: 'gallery',
    state_code: 'CO',
    city_id: CITIES.coloradosprings,
    neighborhood: 'Colorado Springs',
    short_description: 'Celebrating the majestic landscapes of the Rocky Mountain region, this gallery presents plein air paintings, photography, and sculpture inspired by Pikes Peak, the Great Plains, and the Colorado high country.',
    styles: ['landscape-plein-air', 'photography', 'western-cowboy'],
  },

  // ─── MANITOU SPRINGS ─────────────────────────────────────────────────────────
  {
    name: 'Commonwheel Artists Co-op',
    listing_type: 'gallery',
    state_code: 'CO',
    city_id: CITIES.manitousprings,
    neighborhood: 'Downtown Manitou Springs',
    short_description: 'One of Colorado\'s oldest artist cooperatives, housed in a charming historic building in bohemian Manitou Springs and showcasing paintings, ceramics, jewelry, and fiber work by over 30 member artists.',
    website_url: 'https://commonwheel.com',
    established_year: 1974,
    styles: ['contemporary', 'ceramics-pottery', 'jewelry', 'landscape-plein-air'],
  },
  {
    name: 'Manitou Art Center',
    listing_type: 'cultural_center',
    state_code: 'CO',
    city_id: CITIES.manitousprings,
    neighborhood: 'Manitou Springs',
    short_description: 'A thriving community arts hub in the quirky mountain resort town of Manitou Springs, with studio spaces, gallery exhibitions, and public programs connecting artists and the community.',
    website_url: 'https://www.manitouartcenter.org',
    established_year: 1988,
    styles: ['contemporary', 'abstract', 'ceramics-pottery'],
  },
  {
    name: 'Villa Bernina Gallery',
    listing_type: 'gallery',
    state_code: 'CO',
    city_id: CITIES.manitousprings,
    neighborhood: 'Manitou Springs',
    short_description: 'An intimate gallery in a Victorian-era building in Manitou Springs, presenting Colorado landscape paintings, watercolors, and prints alongside handcrafted jewelry by regional artists.',
    styles: ['landscape-plein-air', 'jewelry', 'contemporary'],
  },

  // ─── FORT COLLINS ────────────────────────────────────────────────────────────
  {
    name: 'Fort Collins Museum of Art',
    listing_type: 'museum',
    state_code: 'CO',
    city_id: CITIES.fortcollins,
    neighborhood: 'Old Town Fort Collins',
    short_description: 'Northern Colorado\'s premier fine arts museum, presenting ambitious contemporary exhibitions alongside educational programs in a beautifully renovated Old Town building.',
    website_url: 'https://www.fcmoa.org',
    established_year: 1936,
    styles: ['contemporary', 'abstract', 'photography', 'figurative'],
  },
  {
    name: 'Colorado State University Art Museum',
    listing_type: 'museum',
    state_code: 'CO',
    city_id: CITIES.fortcollins,
    neighborhood: 'CSU Campus',
    short_description: 'The university art museum for Colorado State University, with rotating contemporary exhibitions and a permanent collection that emphasizes American art and works on paper.',
    website_url: 'https://artmuseum.colostate.edu',
    established_year: 1941,
    styles: ['contemporary', 'abstract', 'photography'],
  },
  {
    name: 'Patina Gallery Fort Collins',
    listing_type: 'gallery',
    state_code: 'CO',
    city_id: CITIES.fortcollins,
    neighborhood: 'Old Town Fort Collins',
    short_description: 'A vibrant contemporary gallery in Old Town Fort Collins showcasing paintings, sculpture, and jewelry by emerging and established regional artists in an inviting, accessible space.',
    styles: ['contemporary', 'abstract', 'jewelry', 'sculpture'],
  },

  // ─── TELLURIDE ───────────────────────────────────────────────────────────────
  {
    name: 'Telluride Gallery of Fine Art',
    listing_type: 'gallery',
    state_code: 'CO',
    city_id: CITIES.telluride,
    neighborhood: 'Downtown Telluride',
    short_description: 'The premier fine art gallery in one of Colorado\'s most dramatic mountain settings, representing painting, sculpture, and photography by leading artists who draw inspiration from the San Juan Mountains.',
    website_url: 'https://www.telluridegallery.com',
    established_year: 1986,
    styles: ['landscape-plein-air', 'contemporary', 'photography', 'sculpture'],
  },
  {
    name: 'Ah Haa School for the Arts',
    listing_type: 'art_school',
    state_code: 'CO',
    city_id: CITIES.telluride,
    neighborhood: 'Telluride',
    short_description: 'A beloved community arts school in the San Juan Mountains offering workshops, classes, and exhibitions in a setting that attracts artists from around the world to Telluride\'s storied cultural landscape.',
    website_url: 'https://www.ahhaa.org',
    established_year: 1989,
    styles: ['contemporary', 'ceramics-pottery', 'abstract'],
  },
  {
    name: 'Telluride Arts District',
    listing_type: 'cultural_center',
    state_code: 'CO',
    city_id: CITIES.telluride,
    neighborhood: 'Downtown Telluride',
    short_description: 'The organizing body behind Telluride\'s vibrant arts scene, curating public art, gallery openings, and year-round cultural programming in one of the world\'s most scenically spectacular mountain towns.',
    website_url: 'https://www.telluridearts.org',
    styles: ['contemporary', 'abstract', 'photography'],
  },

  // ─── DURANGO ─────────────────────────────────────────────────────────────────
  {
    name: 'Sorrel Sky Gallery',
    listing_type: 'gallery',
    state_code: 'CO',
    city_id: CITIES.durango,
    neighborhood: 'Downtown Durango',
    short_description: 'One of the Southwest\'s finest galleries for contemporary Western and plein air art, representing nationally recognized painters and sculptors with a deep connection to the four-corners landscape.',
    website_url: 'https://www.sorrelsky.com',
    established_year: 2002,
    styles: ['landscape-plein-air', 'western-cowboy', 'sculpture', 'contemporary'],
  },
  {
    name: 'Toh-Atin Gallery',
    listing_type: 'gallery',
    state_code: 'CO',
    city_id: CITIES.durango,
    neighborhood: 'Downtown Durango',
    short_description: 'A destination gallery for authentic Native American art in Durango since 1957, with one of the finest collections of Navajo rugs, Pueblo pottery, Hopi kachinas, and Southwest jewelry in the region.',
    website_url: 'https://www.toh-atin.com',
    established_year: 1957,
    styles: ['native-american', 'ceramics-pottery', 'jewelry'],
  },
  {
    name: 'Durango Arts Center',
    listing_type: 'cultural_center',
    state_code: 'CO',
    city_id: CITIES.durango,
    neighborhood: 'Downtown Durango',
    short_description: 'The cultural heart of southwest Colorado, presenting contemporary art exhibitions, performing arts, and community education programs that reflect the diverse creative energy of the Four Corners region.',
    website_url: 'https://www.durangoarts.org',
    established_year: 1966,
    styles: ['contemporary', 'abstract', 'photography'],
  },
  {
    name: 'Maria\'s Bookshop & Gallery',
    listing_type: 'gallery',
    state_code: 'CO',
    city_id: CITIES.durango,
    neighborhood: 'Downtown Durango',
    short_description: 'An acclaimed independent bookshop and gallery in the heart of Durango, rotating exhibitions of local artists alongside an exceptional selection of art books and Southwest literature.',
    website_url: 'https://www.mariasbookshop.com',
    established_year: 1973,
    styles: ['contemporary', 'landscape-plein-air', 'photography'],
  },

  // ─── PUEBLO ──────────────────────────────────────────────────────────────────
  {
    name: 'Sangre de Cristo Arts Center',
    listing_type: 'cultural_center',
    state_code: 'CO',
    city_id: CITIES.pueblo,
    neighborhood: 'Downtown Pueblo',
    short_description: 'Southern Colorado\'s foremost arts institution, with four galleries, a children\'s museum, and performing arts theater — a cultural anchor for Pueblo presenting regional and national exhibitions.',
    website_url: 'https://www.sdc-arts.org',
    established_year: 1972,
    styles: ['contemporary', 'abstract', 'figurative', 'photography'],
  },
  {
    name: 'Pueblo Arts Alliance',
    listing_type: 'cultural_center',
    state_code: 'CO',
    city_id: CITIES.pueblo,
    neighborhood: 'Union Avenue Historic District',
    short_description: 'Supporting and promoting the creative community of Pueblo\'s historic Union Avenue district with gallery exhibitions, studio tours, and cultural events celebrating the city\'s rich artistic heritage.',
    styles: ['contemporary', 'abstract', 'photography'],
  },

  // ─── STEAMBOAT SPRINGS ───────────────────────────────────────────────────────
  {
    name: 'Steamboat Art Museum',
    listing_type: 'museum',
    state_code: 'CO',
    city_id: CITIES.steamboatsprings,
    neighborhood: 'Downtown Steamboat Springs',
    short_description: 'A year-round museum in the heart of Steamboat Springs presenting rotating exhibitions of contemporary art alongside permanent works celebrating the mountain landscapes and cowboy culture of northwest Colorado.',
    website_url: 'https://www.steamboatartmuseum.org',
    established_year: 2004,
    styles: ['contemporary', 'landscape-plein-air', 'western-cowboy', 'photography'],
  },
  {
    name: 'Gallery at the White House Ranch',
    listing_type: 'gallery',
    state_code: 'CO',
    city_id: CITIES.steamboatsprings,
    neighborhood: 'Steamboat Springs',
    short_description: 'A unique gallery set on a historic working ranch outside Steamboat Springs, featuring Western paintings, bronze sculpture, and photography in a setting that embodies the spirit of the Colorado Rockies.',
    styles: ['western-cowboy', 'sculpture', 'landscape-plein-air'],
  },

  // ─── VAIL ────────────────────────────────────────────────────────────────────
  {
    name: 'Vail Fine Arts',
    listing_type: 'gallery',
    state_code: 'CO',
    city_id: CITIES.vail,
    neighborhood: 'Vail Village',
    short_description: 'A premier gallery in the heart of Vail Village representing nationally recognized contemporary artists with a program of paintings, sculpture, and photography that complements the village\'s alpine grandeur.',
    styles: ['contemporary', 'landscape-plein-air', 'sculpture', 'photography'],
  },
  {
    name: 'Gallery 970',
    listing_type: 'gallery',
    state_code: 'CO',
    city_id: CITIES.vail,
    neighborhood: 'Vail Village',
    short_description: 'A sophisticated contemporary gallery in Vail Village showcasing emerging and mid-career artists alongside destination-quality landscape paintings inspired by the Rocky Mountain high country.',
    styles: ['contemporary', 'landscape-plein-air', 'abstract'],
  },

  // ─── MORE DENVER ─────────────────────────────────────────────────────────────
  {
    name: 'Denver Botanic Gardens — Freyer–Newman Center',
    listing_type: 'cultural_center',
    state_code: 'CO',
    city_id: CITIES.denver,
    neighborhood: 'City Park',
    short_description: 'The art and education center within Denver\'s acclaimed Botanic Gardens, presenting exhibitions where art meets natural science — from botanical illustration to contemporary work inspired by the plant world.',
    website_url: 'https://www.botanicgardens.org',
    established_year: 2017,
    styles: ['contemporary', 'photography', 'figurative'],
  },
  {
    name: 'Goodwin Fine Art',
    listing_type: 'gallery',
    state_code: 'CO',
    city_id: CITIES.denver,
    neighborhood: 'Cherry Creek',
    short_description: 'A respected Cherry Creek gallery specializing in American representational art — from Colorado landscapes and still lifes to figurative work — by a curated stable of accomplished painters.',
    established_year: 2001,
    styles: ['landscape-plein-air', 'figurative', 'contemporary'],
  },
  {
    name: 'Gildar Gallery',
    listing_type: 'gallery',
    state_code: 'CO',
    city_id: CITIES.denver,
    neighborhood: 'South Broadway Arts District',
    short_description: 'A project-based gallery on South Broadway presenting ambitious contemporary art with a commitment to rigorous curatorial vision, community engagement, and supporting Denver\'s independent art scene.',
    established_year: 2014,
    styles: ['contemporary', 'abstract', 'photography'],
  },
  {
    name: 'CORE New Art Space',
    listing_type: 'gallery',
    state_code: 'CO',
    city_id: CITIES.denver,
    neighborhood: 'Santa Fe Arts District',
    short_description: 'A dynamic artist-run gallery in Denver\'s Santa Fe Arts District presenting challenging contemporary work from an emerging roster, with a First Friday presence at the heart of Denver\'s gallery community.',
    website_url: 'https://www.corenewartspace.com',
    established_year: 1997,
    styles: ['contemporary', 'abstract', 'photography'],
  },
  {
    name: 'David Cook Fine American Art',
    listing_type: 'gallery',
    state_code: 'CO',
    city_id: CITIES.denver,
    neighborhood: 'Cherry Creek',
    short_description: 'Specializing in American art from the late 19th through mid-20th centuries, David Cook is Denver\'s foremost dealer in historical paintings, with particular expertise in the Taos and Santa Fe art colonies.',
    website_url: 'https://davidcookfineart.com',
    established_year: 1985,
    styles: ['landscape-plein-air', 'figurative', 'western-cowboy'],
  },
];

console.log(`\nInserting ${listings.length} Colorado listings…\n`);
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
      for (const s of styles) {
        await sql`
          INSERT INTO listing_art_styles (listing_id, style_id)
          SELECT ${listingId}, id FROM art_styles WHERE slug = ${s}
          ON CONFLICT DO NOTHING
        `;
      }
    }
    console.log(`  ✓ ${existing ? 'styles' : 'inserted'}  ${l.name}`);
  } catch (err) {
    console.error(`  ✗ ${l.name}: ${err.message}`);
  }
}

const [{ n }] = await sql`
  SELECT COUNT(*) AS n FROM listings
  WHERE state_code = 'CO' AND status = 'approved' AND deleted_at IS NULL
`;
await sql`UPDATE states SET gallery_count = ${parseInt(n)} WHERE code = 'CO'`;
console.log(`\nDone. Inserted: ${inserted}, Skipped: ${skipped}`);
console.log(`Colorado total listings: ${n}`);
