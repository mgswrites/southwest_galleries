const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.NEON_DB_KEY);

const CITY = {
  name: 'Las Vegas',
  slug: 'las-vegas-nm',
  state_code: 'NM',
  description: 'Las Vegas, New Mexico is a historic city of around 13,000 people set at 6,400 feet in the foothills of the Sangre de Cristo Mountains, 65 miles northeast of Santa Fe. Founded in 1835 along the Santa Fe Trail, it contains one of the largest concentrations of 19th-century architecture in the American Southwest — more than 900 buildings on the National Register of Historic Places. The Old Town Plaza and Bridge Street corridors are home to an active community of working artists, cooperative galleries, and printmakers, and the city\'s New Mexico Highlands University supports two public exhibition spaces. Las Vegas rewards visitors who slow down: this is not a polished tourist destination but a genuine, working art town with deep roots and an increasingly vibrant creative scene.',
  hero_image_url: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800&h=450&fit=crop&q=80',
  meta_title: 'Las Vegas, NM Art Galleries & Studios | Southwest Galleries',
  meta_description: 'Discover art galleries, cooperative studios, and cultural spaces in Las Vegas, New Mexico — a historic Santa Fe Trail city with a thriving creative community.',
  latitude: 35.5939,
  longitude: -105.2225,
};

const GALLERIES = [
  {
    name: 'The Corner Art Gallery',
    slug: 'the-corner-art-gallery-las-vegas-nm',
    listing_type: 'gallery',
    address_line1: '1813 Plaza St',
    zip_code: '87701',
    phone: '(505) 690-3656',
    website_url: 'https://www.thecornerartgallery.com/',
    hero_image_url: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&h=450&fit=crop&q=80',
    short_description: 'Cooperative gallery on the historic Old Town Plaza showing sculpture, photography, ceramics, fiber art, and painting by local New Mexico artists.',
    full_description: `The Corner Art Gallery occupies a pair of 1800s-era buildings on Las Vegas\'s Old Town Plaza, one of the most historically intact town squares in New Mexico. A cooperative-style operation, the gallery brings together a rotating roster of local artists working across sculpture, photography, watercolor, mixed media, pottery, fiber art, and painting.

The gallery is both a showing space and a working community hub: custom framing, portrait photography, and art classes round out what the Corner offers to residents and visitors alike. The work on display reflects the particular creative culture of northeastern New Mexico — grounded in place, unpretentious, and made by artists who live and work in the community.

Notable artists associated with the gallery include bronze sculptor Duke Sundt, photographer Scott Vail, watercolorist Jan Bain, and ceramicists Emma Lujan and Taylor Kuiper, among others. Prints, greeting cards, handmade jewelry, and handcrafted bags round out the inventory for visitors looking to bring something home from Las Vegas.`,
    meta_title: 'The Corner Art Gallery | Las Vegas, NM | Southwest Galleries',
    meta_description: 'Cooperative gallery on Las Vegas\'s historic Old Town Plaza showing sculpture, photography, ceramics, fiber art, and painting by local New Mexico artists.',
  },
  {
    name: 'El Zócalo Cooperative Art Gallery',
    slug: 'el-zocalo-cooperative-art-gallery-las-vegas-nm',
    listing_type: 'gallery',
    address_line1: '1809 Plaza',
    zip_code: '87701',
    phone: '(505) 454-9904',
    website_url: 'https://www.elzocalogallery.com/',
    hero_image_url: 'https://images.unsplash.com/photo-1501862700950-18382cd41497?w=800&h=450&fit=crop&q=80',
    short_description: 'Juried artist cooperative on the Old Town Plaza with 20 member-artists showing paintings, jewelry, fiber art, photography, furniture, and handmade goods.',
    full_description: `El Zócalo Cooperative Art Gallery has been a fixture on Las Vegas\'s Old Town Plaza since approximately 2010, and is now celebrating its 15th year as one of the most community-rooted gallery spaces in northeastern New Mexico. The gallery is jointly owned and operated by roughly 20 member-artists, who apply for membership, pass a jurying process, pay monthly dues, and take turns staffing the gallery — which means that on any given day, the person behind the counter is likely the person who made the work on the walls.

The inventory at El Zócalo is eclectic in the best sense: paintings, jewelry, fiber art, collage, handcrafted furniture, photography, and handmade goods coexist in a space that feels more like a collective studio than a commercial gallery. That\'s the point. The cooperative structure keeps the work authentic and keeps the prices accessible — this is art made for people who live in and around Las Vegas, not for the Santa Fe collector market.

Located steps from the Corner Art Gallery, El Zócalo is part of a small cluster of art spaces that makes a walkable art afternoon possible on the Old Town Plaza.`,
    meta_title: 'El Zócalo Cooperative Art Gallery | Las Vegas, NM | Southwest Galleries',
    meta_description: 'Juried artist cooperative on the Las Vegas NM Old Town Plaza with 20 member-artists showing paintings, jewelry, fiber art, photography, and handmade goods.',
  },
  {
    name: 'Gallery 140 / Las Vegas Arts Council',
    slug: 'gallery-140-las-vegas-arts-council-nm',
    listing_type: 'cultural_center',
    address_line1: '140 Bridge St',
    zip_code: '87701',
    phone: '(505) 451-4388',
    website_url: 'https://lasvegasartscouncil.org/',
    hero_image_url: 'https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?w=800&h=450&fit=crop&q=80',
    short_description: 'The Las Vegas Arts Council\'s exhibition space on Bridge Street, hosting monthly invitational and themed group shows in painting, drawing, photography, and sculpture.',
    full_description: `Gallery 140 is the primary nonprofit exhibition space in Las Vegas, New Mexico, operated by the Las Vegas Arts Council at 140 Bridge St in the city\'s historic downtown corridor. The Arts Council describes itself as "home to visual arts, literary arts, performing arts, artists, and art lovers of Las Vegas, NM" — and Gallery 140 is where those commitments show up in practice.

The gallery hosts rotating invitational and themed group exhibitions with regular meet-the-artist receptions, music salons, and special programming. The ongoing "Gallery Too" benefit show donates 100% of proceeds to support the Arts Council\'s operations and programming. Recent calls for art have centered on themes like "Antepasados" — paintings, drawings, photography, and sculpture depicting or created by ancestors — reflecting the deep sense of cultural history that runs through creative life in northeastern New Mexico.

Gallery 140 is open Friday evenings and Saturday afternoons, making it an easy complement to a weekend visit to the Old Town Plaza galleries a short walk away. Admission is always free.`,
    meta_title: 'Gallery 140 / Las Vegas Arts Council | Las Vegas, NM | Southwest Galleries',
    meta_description: 'Las Vegas Arts Council\'s exhibition space on Bridge Street hosting monthly group shows in painting, drawing, photography, and sculpture. Free admission.',
  },
  {
    name: 'Fat Crow Press Studio and Mercantile',
    slug: 'fat-crow-press-studio-and-mercantile-las-vegas-nm',
    listing_type: 'artist_studio',
    address_line1: '1201 National Ave',
    zip_code: '87701',
    phone: '(505) 470-0404',
    website_url: 'https://www.fatcrowpress.com/',
    hero_image_url: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=450&fit=crop&q=80',
    short_description: 'Printmaking studio and mercantile in a historic 1900-era building, featuring letterpress work by Julie Sola alongside work by fellow artists and regular workshops.',
    full_description: `Fat Crow Press is one of the most distinctive creative spaces in Las Vegas, New Mexico — a printmaking studio and mercantile tucked into a historic building on National Avenue that has served as a saloon, a wool merchant\'s warehouse, and now a working letterpress studio and shop.

The studio belongs to artist Julie Sola, whose work draws on Mexican cultural heritage and childhood memory, centering on whimsical animal imagery printed on a 1964 Vandercook Universal 1 press and a Potter press. The ground floor functions as a gallery and mercantile where Sola\'s prints share space with work by fellow artists in a selection of prints, cards, and handmade goods.

Fat Crow Press hosts letterpress and creative workshops throughout the year, making it a rare opportunity for visitors to learn the process in a fully equipped, historically situated working studio. Open Thursday through Saturday, 11 AM to 4 PM.`,
    meta_title: 'Fat Crow Press Studio and Mercantile | Las Vegas, NM | Southwest Galleries',
    meta_description: 'Working letterpress studio and mercantile in Las Vegas NM featuring prints by Julie Sola, fellow artists, and regular printmaking workshops.',
  },
];

async function run() {
  // 1. Insert city
  const existingCity = await sql`SELECT id FROM cities WHERE slug = ${CITY.slug}`;
  let cityId;
  if (existingCity.length) {
    cityId = existingCity[0].id;
    console.log(`  skip city (exists): ${CITY.name} id=${cityId}`);
  } else {
    const [row] = await sql`
      INSERT INTO cities (name, slug, state_code, description, hero_image_url, meta_title, meta_description, latitude, longitude)
      VALUES (${CITY.name}, ${CITY.slug}, ${CITY.state_code}, ${CITY.description}, ${CITY.hero_image_url}, ${CITY.meta_title}, ${CITY.meta_description}, ${CITY.latitude}, ${CITY.longitude})
      RETURNING id
    `;
    cityId = row.id;
    console.log(`  ✓ City: ${CITY.name} id=${cityId}`);
  }

  // 2. Insert galleries
  for (const g of GALLERIES) {
    const existing = await sql`SELECT id FROM listings WHERE slug = ${g.slug}`;
    if (existing.length) {
      console.log(`  skip (exists): ${g.name}`);
      continue;
    }
    await sql`
      INSERT INTO listings (
        slug, name, listing_type, tier, city_id, state_code,
        address_line1, zip_code, phone, website_url,
        hero_image_url, short_description, full_description,
        meta_title, meta_description,
        status, is_verified
      ) VALUES (
        ${g.slug}, ${g.name}, ${g.listing_type}::listing_type, 'free'::listing_tier,
        ${cityId}, 'NM',
        ${g.address_line1}, ${g.zip_code}, ${g.phone ?? null}, ${g.website_url ?? null},
        ${g.hero_image_url}, ${g.short_description}, ${g.full_description},
        ${g.meta_title}, ${g.meta_description},
        'approved'::submission_status, true
      )
    `;
    console.log(`  ✓ ${g.name}`);
  }

  console.log('Done.');
  process.exit(0);
}

run().catch(e => { console.error(e.message); process.exit(1); });
