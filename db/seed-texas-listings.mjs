import { neon } from '@neondatabase/serverless';

const NEON_DB_KEY = process.env.NEON_DB_KEY;
if (!NEON_DB_KEY) { console.error('NEON_DB_KEY not set'); process.exit(1); }
const sql = neon(NEON_DB_KEY);

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const CITIES = { marfa: 18 }; // existing

const newCities = [
  { name: 'Houston',       slug: 'houston',       state_code: 'TX' },
  { name: 'Dallas',        slug: 'dallas',        state_code: 'TX' },
  { name: 'Fort Worth',    slug: 'fort-worth',    state_code: 'TX' },
  { name: 'Austin',        slug: 'austin',        state_code: 'TX' },
  { name: 'San Antonio',   slug: 'san-antonio',   state_code: 'TX' },
  { name: 'El Paso',       slug: 'el-paso',       state_code: 'TX' },
];

console.log('Inserting new Texas cities…');
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
  // Build dict key: slugify(name) then strip all hyphens
  const key = slugify(city.name).replace(/-/g, '');
  CITIES[key] = cityId;
}

// Verify keys
console.log('\nCITIES dict:', JSON.stringify(CITIES));

const listings = [

  // ─── HOUSTON ─────────────────────────────────────────────────────────────
  {
    name: 'Menil Collection',
    listing_type: 'museum',
    state_code: 'TX',
    city_id: CITIES.houston,
    neighborhood: 'Montrose',
    short_description: 'Founded by John and Dominique de Menil, this is one of the largest private art collections open to the public in the world — spanning antiquity through the 20th century with unparalleled depth in Surrealism and tribal art, all presented free of charge in a Renzo Piano campus.',
    website_url: 'https://www.menil.org',
    established_year: 1987,
    styles: ['contemporary', 'abstract', 'figurative'],
  },
  {
    name: 'Museum of Fine Arts, Houston',
    listing_type: 'museum',
    state_code: 'TX',
    city_id: CITIES.houston,
    neighborhood: 'Museum District',
    short_description: 'The largest art museum in the American South, with a collection of more than 70,000 works spanning 6,000 years across all cultures and media, housed in a campus that includes two landmark buildings by Mies van der Rohe.',
    website_url: 'https://www.mfah.org',
    established_year: 1900,
    styles: ['figurative', 'contemporary', 'photography', 'sculpture'],
  },
  {
    name: 'Contemporary Arts Museum Houston',
    listing_type: 'museum',
    state_code: 'TX',
    city_id: CITIES.houston,
    neighborhood: 'Museum District',
    short_description: 'A kunsthalle with no permanent collection, CAMH presents ambitious rotating exhibitions of contemporary art from local, national, and international artists — a laboratory for the urgent, the experimental, and the newly made.',
    website_url: 'https://camh.org',
    established_year: 1948,
    styles: ['contemporary', 'abstract', 'photography'],
  },
  {
    name: 'Rothko Chapel',
    listing_type: 'cultural_center',
    state_code: 'TX',
    city_id: CITIES.houston,
    neighborhood: 'Montrose',
    short_description: 'Mark Rothko\'s final major commission: fourteen monumental paintings in a non-denominational meditation space at the heart of the Menil campus, welcoming all faiths and serving as a center for human rights advocacy since 1971.',
    website_url: 'https://www.rothkochapel.org',
    established_year: 1971,
    styles: ['abstract', 'contemporary'],
  },
  {
    name: 'Blaffer Art Museum',
    listing_type: 'museum',
    state_code: 'TX',
    city_id: CITIES.houston,
    neighborhood: 'University of Houston',
    short_description: 'The contemporary art museum of the University of Houston, presenting rotating exhibitions and ambitious new commissions by emerging and mid-career artists, with a particular commitment to underrepresented voices and international perspectives.',
    website_url: 'https://blafferartmuseum.org',
    established_year: 1973,
    styles: ['contemporary', 'abstract', 'photography'],
  },
  {
    name: 'Lawndale Art Center',
    listing_type: 'cultural_center',
    state_code: 'TX',
    city_id: CITIES.houston,
    neighborhood: 'Midtown',
    short_description: 'Houston\'s beloved alternative art space championing emerging Texas artists through exhibitions, the annual Big Show open call, and studio residencies — scrappy, inclusive, and essential to the city\'s creative ecosystem for four decades.',
    website_url: 'https://lawndaleartcenter.org',
    established_year: 1979,
    styles: ['contemporary', 'abstract', 'figurative'],
  },
  {
    name: 'Station Museum of Contemporary Art',
    listing_type: 'museum',
    state_code: 'TX',
    city_id: CITIES.houston,
    neighborhood: 'Midtown',
    short_description: 'An independent museum in a converted warehouse presenting politically engaged contemporary art, with a consistent focus on social justice, environmental issues, and artists whose work challenges power — admission always free.',
    website_url: 'https://stationmuseum.com',
    established_year: 2001,
    styles: ['contemporary', 'photography', 'abstract'],
  },
  {
    name: 'Art League Houston',
    listing_type: 'cultural_center',
    state_code: 'TX',
    city_id: CITIES.houston,
    neighborhood: 'Museum District',
    short_description: 'One of Houston\'s oldest arts nonprofits, providing gallery space, studio residencies, and educational programming that supports working artists at every stage — from student to established professional.',
    website_url: 'https://artleaguehouston.org',
    established_year: 1948,
    styles: ['contemporary', 'figurative', 'abstract'],
  },
  {
    name: 'Houston Center for Contemporary Craft',
    listing_type: 'museum',
    state_code: 'TX',
    city_id: CITIES.houston,
    neighborhood: 'Midtown',
    short_description: 'A museum and residency program dedicated to the art of craft — fiber, glass, metal, ceramics, and wood — with working resident artists visible throughout the building and a commitment to elevating craft to its rightful place in the fine art conversation.',
    website_url: 'https://crafthouston.org',
    established_year: 2001,
    styles: ['ceramics-pottery', 'glass-art', 'jewelry', 'sculpture'],
  },
  {
    name: 'DiverseWorks',
    listing_type: 'cultural_center',
    state_code: 'TX',
    city_id: CITIES.houston,
    neighborhood: 'East Downtown',
    short_description: 'Houston\'s leading presenter of experimental and interdisciplinary art, commissioning boundary-pushing work across visual art, performance, music, and theater by Texas artists and their national collaborators since 1982.',
    website_url: 'https://diverseworks.org',
    established_year: 1982,
    styles: ['contemporary', 'abstract', 'photography'],
  },

  // ─── DALLAS ──────────────────────────────────────────────────────────────
  {
    name: 'Dallas Museum of Art',
    listing_type: 'museum',
    state_code: 'TX',
    city_id: CITIES.dallas,
    neighborhood: 'Arts District',
    short_description: 'The cultural anchor of the Dallas Arts District and one of the largest art museums in the United States, with an encyclopedic collection of 24,000 works spanning 5,000 years of world art — including exceptional pre-Columbian holdings and free general admission.',
    website_url: 'https://dma.org',
    established_year: 1903,
    styles: ['figurative', 'contemporary', 'sculpture', 'photography'],
  },
  {
    name: 'Nasher Sculpture Center',
    listing_type: 'museum',
    state_code: 'TX',
    city_id: CITIES.dallas,
    neighborhood: 'Arts District',
    short_description: 'A purpose-built sculpture museum in the Dallas Arts District housing the landmark Raymond Nasher collection of modern and contemporary sculpture — from Rodin through Richard Serra — in a Renzo Piano building with an acclaimed outdoor garden.',
    website_url: 'https://www.nashersculpturecenter.org',
    established_year: 2003,
    styles: ['sculpture', 'contemporary', 'abstract'],
  },
  {
    name: 'Crow Museum of Asian Art',
    listing_type: 'museum',
    state_code: 'TX',
    city_id: CITIES.dallas,
    neighborhood: 'Arts District',
    short_description: 'A free-admission museum presenting one of the finest collections of Asian art in the Southwest, spanning 5,000 years across South Asia, Southeast Asia, China, Japan, and Korea — a serene refuge of beauty in the heart of downtown Dallas.',
    website_url: 'https://www.crowmuseum.org',
    established_year: 1998,
    styles: ['figurative', 'sculpture', 'ceramics-pottery'],
  },
  {
    name: 'Dallas Contemporary',
    listing_type: 'museum',
    state_code: 'TX',
    city_id: CITIES.dallas,
    neighborhood: 'Design District',
    short_description: 'A kunsthalle-style contemporary art space presenting ambitious solo and group exhibitions of cutting-edge national and international artists — no permanent collection, just a relentless focus on the art of the present.',
    website_url: 'https://dallascontemporary.org',
    established_year: 1979,
    styles: ['contemporary', 'abstract', 'photography'],
  },
  {
    name: 'McKinney Avenue Contemporary',
    listing_type: 'cultural_center',
    state_code: 'TX',
    city_id: CITIES.dallas,
    neighborhood: 'Uptown',
    short_description: 'Known as The MAC, this nonprofit arts center in Uptown Dallas presents group exhibitions, performance, and community programming that bridges the city\'s diverse cultural communities in a welcoming, unpretentious space.',
    website_url: 'https://www.the-mac.org',
    established_year: 1991,
    styles: ['contemporary', 'figurative', 'abstract'],
  },
  {
    name: 'Ro2 Art',
    listing_type: 'gallery',
    state_code: 'TX',
    city_id: CITIES.dallas,
    neighborhood: 'Design District',
    short_description: 'One of Dallas\'s leading contemporary galleries, representing a roster of established and emerging artists across painting, sculpture, and works on paper — known for curatorial rigor and sustained support for artists at pivotal career moments.',
    website_url: 'https://ro2art.com',
    established_year: 2008,
    styles: ['contemporary', 'abstract', 'figurative'],
  },
  {
    name: 'Barry Whistler Gallery',
    listing_type: 'gallery',
    state_code: 'TX',
    city_id: CITIES.dallas,
    neighborhood: 'Design District',
    short_description: 'One of Dallas\'s most respected long-running galleries, presenting the work of significant Texas artists alongside national contemporary painters and sculptors for nearly four decades.',
    website_url: 'https://barrywhistlergallery.com',
    established_year: 1986,
    styles: ['contemporary', 'abstract', 'figurative'],
  },
  {
    name: 'Conduit Gallery',
    listing_type: 'gallery',
    state_code: 'TX',
    city_id: CITIES.dallas,
    neighborhood: 'Design District',
    short_description: 'A Dallas gallery with a distinguished 25-year history of presenting internationally recognized contemporary art alongside significant Texas artists, with particular strength in abstract, conceptual, and process-based work.',
    website_url: 'https://conduitgallery.com',
    established_year: 1997,
    styles: ['contemporary', 'abstract'],
  },
  {
    name: 'Photographs Do Not Bend Gallery',
    listing_type: 'gallery',
    state_code: 'TX',
    city_id: CITIES.dallas,
    neighborhood: 'Design District',
    short_description: 'Dallas\'s preeminent photography gallery, representing established and emerging photographers working across documentary, fine art, and conceptual traditions — and hosting an annual juried exhibition that has launched numerous careers.',
    website_url: 'https://pdnbgallery.com',
    established_year: 1995,
    styles: ['photography', 'contemporary'],
  },
  {
    name: 'Erin Cluley Gallery',
    listing_type: 'gallery',
    state_code: 'TX',
    city_id: CITIES.dallas,
    neighborhood: 'Design District',
    short_description: 'A prominent Dallas gallery known for supporting Texas-based artists and presenting smartly curated exhibitions of contemporary painting, sculpture, video, and installation art with a commitment to curatorial substance.',
    website_url: 'https://erincluley.com',
    established_year: 2012,
    styles: ['contemporary', 'abstract', 'figurative'],
  },

  // ─── FORT WORTH ──────────────────────────────────────────────────────────
  {
    name: 'Kimbell Art Museum',
    listing_type: 'museum',
    state_code: 'TX',
    city_id: CITIES.fortworth,
    neighborhood: 'Cultural District',
    short_description: 'Widely regarded as one of the finest small museums in the world, the Kimbell holds a carefully selected collection of European Old Masters and world art presented in Louis Kahn\'s architectural masterpiece — luminous cycloid vaults that bathe the paintings in natural light.',
    website_url: 'https://www.kimbellart.org',
    established_year: 1972,
    styles: ['figurative', 'sculpture', 'landscape-plein-air'],
  },
  {
    name: 'Amon Carter Museum of American Art',
    listing_type: 'museum',
    state_code: 'TX',
    city_id: CITIES.fortworth,
    neighborhood: 'Cultural District',
    short_description: 'Fort Worth\'s premier institution for American art, with one of the finest photography collections in the country alongside extraordinary 19th-century Western American paintings and sculpture — all in a Philip Johnson building overlooking downtown.',
    website_url: 'https://www.cartermuseum.org',
    established_year: 1961,
    styles: ['photography', 'landscape-plein-air', 'western-cowboy', 'figurative'],
  },
  {
    name: 'Modern Art Museum of Fort Worth',
    listing_type: 'museum',
    state_code: 'TX',
    city_id: CITIES.fortworth,
    neighborhood: 'Cultural District',
    short_description: 'The oldest art museum in Texas, presenting an exemplary collection of post-World War II modern and contemporary art — Picasso, Warhol, Kiefer, Richter, and more — in Tadao Ando\'s spectacular reflecting-pool building, one of the great museum buildings of our era.',
    website_url: 'https://themodern.org',
    established_year: 1892,
    styles: ['contemporary', 'abstract', 'sculpture'],
  },
  {
    name: 'Sid Richardson Museum',
    listing_type: 'museum',
    state_code: 'TX',
    city_id: CITIES.fortworth,
    neighborhood: 'Sundance Square',
    short_description: 'A focused collection of Western American art by Frederic Remington and Charles Russell, presented in an intimate museum in Fort Worth\'s Sundance Square — the finest public showing of these two canonical Western artists in the American Southwest.',
    website_url: 'https://www.sidrichardsonmuseum.org',
    established_year: 1982,
    styles: ['western-cowboy', 'figurative', 'landscape-plein-air'],
  },
  {
    name: 'Fort Worth Community Arts Center',
    listing_type: 'cultural_center',
    state_code: 'TX',
    city_id: CITIES.fortworth,
    neighborhood: 'Cultural District',
    short_description: 'A vibrant hub for working artists in Fort Worth, operated by the Arts Council, providing gallery space, studio rentals, and community programming across visual art, music, and theater for over 75 years.',
    website_url: 'https://artscouncilfw.org/fwcac',
    established_year: 1945,
    styles: ['contemporary', 'figurative', 'abstract'],
  },

  // ─── AUSTIN ──────────────────────────────────────────────────────────────
  {
    name: 'Blanton Museum of Art',
    listing_type: 'museum',
    state_code: 'TX',
    city_id: CITIES.austin,
    neighborhood: 'UT Campus',
    short_description: 'The flagship art museum of The University of Texas at Austin, with a collection of 18,000 works anchored by an outstanding survey of Latin American art, an exemplary collection of Italian Renaissance paintings, and Ellsworth Kelly\'s monumental final work, "Austin."',
    website_url: 'https://blantonmuseum.org',
    established_year: 1963,
    styles: ['figurative', 'contemporary', 'abstract', 'photography'],
  },
  {
    name: 'Contemporary Austin Jones Center',
    listing_type: 'museum',
    state_code: 'TX',
    city_id: CITIES.austin,
    neighborhood: 'Downtown',
    short_description: 'The downtown flagship of Contemporary Austin, presenting ambitious rotating exhibitions of contemporary art — including significant site-specific commissions and large-scale installations — in a beautifully renovated building on Congress Avenue.',
    website_url: 'https://www.thecontemporaryaustin.org',
    established_year: 1961,
    styles: ['contemporary', 'abstract', 'photography', 'sculpture'],
  },
  {
    name: 'Laguna Gloria',
    listing_type: 'museum',
    state_code: 'TX',
    city_id: CITIES.austin,
    neighborhood: 'West Austin',
    short_description: 'Contemporary Austin\'s lushly landscaped outdoor campus on Lake Austin, presenting site-specific sculpture and rotating outdoor installations in the gardens of a historic 1916 Mediterranean Revival villa — also home to the acclaimed Rebekah Baines Johnson Art School for children.',
    website_url: 'https://www.thecontemporaryaustin.org/laguna-gloria',
    established_year: 1943,
    styles: ['sculpture', 'contemporary', 'landscape-plein-air'],
  },
  {
    name: 'Mexic-Arte Museum',
    listing_type: 'museum',
    state_code: 'TX',
    city_id: CITIES.austin,
    neighborhood: 'Downtown',
    short_description: 'Austin\'s official Mexican and Mexican-American cultural and fine arts museum, presenting exhibitions spanning pre-Columbian to contemporary art alongside the Mexican Festival — the oldest and largest free annual outdoor festival in Austin.',
    website_url: 'https://www.mexic-artemuseum.org',
    established_year: 1984,
    styles: ['figurative', 'contemporary', 'native-american'],
  },
  {
    name: 'Umlauf Sculpture Garden & Museum',
    listing_type: 'museum',
    state_code: 'TX',
    city_id: CITIES.austin,
    neighborhood: 'Barton Springs',
    short_description: 'A beloved outdoor museum on four lush South Austin acres dedicated to the work of Charles Umlauf, an important American figurative sculptor who taught at UT for 40 years — over 130 bronze, stone, and wood works in a serene garden setting.',
    website_url: 'https://umlaufsculpture.org',
    established_year: 1991,
    styles: ['sculpture', 'figurative'],
  },
  {
    name: 'Women & Their Work',
    listing_type: 'gallery',
    state_code: 'TX',
    city_id: CITIES.austin,
    neighborhood: 'Downtown',
    short_description: 'A pioneering Austin nonprofit dedicated exclusively to women artists in Texas, with four decades of exhibitions, fellowships, and programming that have launched careers and permanently reshaped the Texas art world.',
    website_url: 'https://www.womenandtheirwork.org',
    established_year: 1978,
    styles: ['contemporary', 'abstract', 'photography'],
  },
  {
    name: 'Wally Workman Gallery',
    listing_type: 'gallery',
    state_code: 'TX',
    city_id: CITIES.austin,
    neighborhood: 'Hyde Park',
    short_description: 'A respected Austin gallery presenting the work of Texas painters, printmakers, and sculptors with a longstanding commitment to the state\'s artistic community and a particular eye for lush, expressive figurative and landscape painting.',
    website_url: 'https://wallyworkmangallery.com',
    established_year: 2000,
    styles: ['figurative', 'landscape-plein-air', 'abstract'],
  },
  {
    name: 'MASS Gallery',
    listing_type: 'gallery',
    state_code: 'TX',
    city_id: CITIES.austin,
    neighborhood: 'East Austin',
    short_description: 'An artist-run, member-supported gallery in East Austin presenting experimental and emerging contemporary art with a commitment to curatorial risk-taking, community access, and supporting the artists who make Austin\'s independent art scene thrive.',
    website_url: 'https://massgallery.org',
    established_year: 2002,
    styles: ['contemporary', 'abstract', 'photography'],
  },

  // ─── SAN ANTONIO ─────────────────────────────────────────────────────────
  {
    name: 'San Antonio Museum of Art',
    listing_type: 'museum',
    state_code: 'TX',
    city_id: CITIES.sanantonio,
    neighborhood: 'Museum Reach',
    short_description: 'An encyclopedic art museum in a magnificent converted 19th-century brewery complex, with a world-class collection of Latin American art — the largest of any US museum — alongside strong holdings in ancient Mediterranean, Asian, and American art.',
    website_url: 'https://samuseum.org',
    established_year: 1981,
    styles: ['figurative', 'contemporary', 'sculpture', 'ceramics-pottery'],
  },
  {
    name: 'McNay Art Museum',
    listing_type: 'museum',
    state_code: 'TX',
    city_id: CITIES.sanantonio,
    neighborhood: 'Alamo Heights',
    short_description: 'Texas\'s first modern art museum, set in a sprawling Spanish Colonial Revival mansion surrounded by sculpture gardens — with exceptional collections of early modern painting, post-Impressionism, prints, and theater arts in a setting of rare serenity.',
    website_url: 'https://www.mcnayart.org',
    established_year: 1954,
    styles: ['figurative', 'contemporary', 'abstract', 'sculpture'],
  },
  {
    name: 'Blue Star Contemporary',
    listing_type: 'cultural_center',
    state_code: 'TX',
    city_id: CITIES.sanantonio,
    neighborhood: 'Southtown',
    short_description: 'San Antonio\'s leading contemporary art center, presenting rotating exhibitions and maintaining artist studio residencies in the historic Blue Star Arts Complex — the anchor of the city\'s creative Southtown neighborhood.',
    website_url: 'https://www.bluestarcontemporary.org',
    established_year: 1986,
    styles: ['contemporary', 'abstract', 'photography'],
  },
  {
    name: 'Artpace San Antonio',
    listing_type: 'cultural_center',
    state_code: 'TX',
    city_id: CITIES.sanantonio,
    neighborhood: 'Downtown',
    short_description: 'An internationally recognized contemporary art foundation commissioning new work by Texas, national, and international artists through a residency-to-exhibition program — one of the most respected and generously funded artist residency programs in the world.',
    website_url: 'https://www.artpace.org',
    established_year: 1995,
    styles: ['contemporary', 'abstract', 'photography'],
  },
  {
    name: 'Southwest School of Art',
    listing_type: 'cultural_center',
    state_code: 'TX',
    city_id: CITIES.sanantonio,
    neighborhood: 'Downtown',
    short_description: 'A historic arts institution offering studio arts education alongside gallery exhibitions in a beautifully preserved 19th-century French Quarter convent complex — combining fine craft education with a public art program in the heart of downtown San Antonio.',
    website_url: 'https://www.swschool.org',
    established_year: 1971,
    styles: ['ceramics-pottery', 'glass-art', 'contemporary', 'jewelry'],
  },
  {
    name: 'Sala Diaz',
    listing_type: 'gallery',
    state_code: 'TX',
    city_id: CITIES.sanantonio,
    neighborhood: 'King William',
    short_description: 'A fiercely independent artist-run gallery in San Antonio\'s King William neighborhood, presenting challenging and experimental contemporary art in a domestic space that resists institutional norms and champions the city\'s most adventurous artists.',
    website_url: 'https://saladiaz.com',
    established_year: 1994,
    styles: ['contemporary', 'abstract', 'photography'],
  },
  {
    name: 'Ruiz Healy Art',
    listing_type: 'gallery',
    state_code: 'TX',
    city_id: CITIES.sanantonio,
    neighborhood: 'Downtown',
    short_description: 'A respected San Antonio gallery representing a strong roster of contemporary artists across painting, photography, and mixed media, with particular depth in Latin American and Latino artists and a longstanding commitment to the San Antonio creative community.',
    website_url: 'https://ruizhealyart.com',
    established_year: 2010,
    styles: ['contemporary', 'figurative', 'photography'],
  },

  // ─── EL PASO ─────────────────────────────────────────────────────────────
  {
    name: 'El Paso Museum of Art',
    listing_type: 'museum',
    state_code: 'TX',
    city_id: CITIES.elpaso,
    neighborhood: 'Downtown El Paso',
    short_description: 'The primary fine arts museum of the Paso del Norte region, with collections spanning European Old Masters, pre-Columbian art, Mexican Colonial paintings, and 20th-century American art — a bridge between the cultural traditions of the United States and Mexico.',
    website_url: 'https://epma.art',
    established_year: 1947,
    styles: ['figurative', 'contemporary', 'sculpture'],
  },
  {
    name: 'Rubin Center for the Visual Arts',
    listing_type: 'cultural_center',
    state_code: 'TX',
    city_id: CITIES.elpaso,
    neighborhood: 'UTEP Campus',
    short_description: 'The contemporary art center of The University of Texas at El Paso, presenting innovative exhibitions with a focus on border culture, Latinx art, and the diverse creative communities of the US-Mexico frontera — one of the most intellectually vital art spaces in the Southwest.',
    website_url: 'https://rubincenter.org',
    established_year: 2001,
    styles: ['contemporary', 'photography', 'abstract'],
  },
  {
    name: 'El Paso Art Association Gallery',
    listing_type: 'gallery',
    state_code: 'TX',
    city_id: CITIES.elpaso,
    neighborhood: 'Downtown El Paso',
    short_description: 'One of the oldest arts nonprofits in Texas, presenting group exhibitions by local and regional artists and maintaining one of the city\'s most welcoming community gallery spaces — a cornerstone of El Paso\'s creative life for nearly a century.',
    website_url: 'https://www.elpaso-art-association.com',
    established_year: 1936,
    styles: ['figurative', 'landscape-plein-air', 'contemporary'],
  },

];

console.log(`\nInserting ${listings.length} Texas listings…\n`);
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
  WHERE city_id IN (SELECT id FROM cities WHERE state_code = 'TX')
    AND status = 'approved' AND deleted_at IS NULL
`;
console.log(`Texas total listings: ${total}`);
