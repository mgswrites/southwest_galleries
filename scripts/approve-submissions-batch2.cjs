const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.NEON_DB_KEY);

const STYLE_IDS = {
  'native-american': 1, 'contemporary': 2, 'western-cowboy': 3, 'adobe-pueblo': 4,
  'landscape-plein-air': 5, 'photography': 6, 'ceramics-pottery': 7, 'sculpture': 8,
  'jewelry': 9, 'glass-art': 10, 'abstract': 11, 'figurative': 12,
};

const CITY_IDS = { scottsdale: 1, taos: 7 };

const LISTINGS = [
  {
    submission_id: 5,
    slug: 'marshall-gallery-scottsdale-az',
    name: 'The Marshall Gallery',
    listing_type: 'gallery',
    city_slug: 'scottsdale',
    state_code: 'AZ',
    address_line1: '7106 E Main Street',
    zip_code: '85251',
    phone: '(480) 970-3111',
    email: 'jen@themarshallgallery.com',
    website_url: 'https://themarshallgallery.com',
    hero_image_url: 'https://images.unsplash.com/photo-1577720580479-7d839d829c73?w=800&h=450&fit=crop&q=80',
    art_styles: ['contemporary', 'western-cowboy', 'sculpture', 'glass-art', 'abstract', 'figurative'],
    short_description: 'One of the anchor galleries on Scottsdale\'s Main Street Arts District, showing contemporary painting, sculpture, and glass for more than 27 years.',
    full_description: `The Marshall Gallery of Fine Art sits at the center of Scottsdale's Main Street galleries, one of the longest-running contemporary galleries in the Old Town Scottsdale arts district and a fixture of the neighborhood for more than 27 years. The gallery occupies an open, relaxed space built for browsing an ever-changing collection, with expert art consultants on hand to offer guidance to collectors without the pressure that can define higher-end gallery experiences elsewhere.

The gallery's program centers on contemporary painting, sculpture, and glass, with a range that extends into Western and cowboy subject matter, abstraction, and figurative work — a breadth that reflects Scottsdale's position as a market where traditional Western collecting and contemporary taste coexist more comfortably than in almost any other American city. Main Street itself, a few blocks of galleries anchored by the Scottsdale Arts District, has functioned as the commercial heart of the city's gallery scene for decades, and the Marshall Gallery's longevity here says something about the durability of that market.

For collectors visiting Scottsdale — whether during the Thursday ArtWalk that animates Main Street and the surrounding district weekly, or simply passing through Old Town — the Marshall Gallery is one of the reliable stops: a program that changes regularly enough to reward repeat visits, in a space designed to make looking at art comfortable rather than intimidating.`,
    meta_title: 'The Marshall Gallery | Scottsdale, AZ | Southwest Galleries',
    meta_description: 'The Marshall Gallery of Fine Art on Scottsdale\'s Main Street — contemporary painting, sculpture, and glass, showing for more than 27 years.',
  },
  {
    submission_id: 7,
    slug: 'moonsparks-ceramics-gallery-taos-nm',
    name: 'moonsparks Ceramics & Gallery',
    listing_type: 'artist_studio',
    city_slug: 'taos',
    state_code: 'NM',
    address_line1: '204 Paseo del Canon E.',
    zip_code: '87571',
    phone: '(575) 613-2270',
    email: 'Lisa@moonsparks.art',
    website_url: 'https://moonsparks.art',
    hero_image_url: 'https://nz8jsbdzvgqzfz6l.public.blob.vercel-storage.com/submissions/1785520798509-ffa2ueljk1.png',
    art_styles: ['ceramics-pottery'],
    short_description: 'A ceramics studio and gallery in Taos offering memberships, classes, and contract kiln firings for working potters, opened in 2026.',
    full_description: `moonsparks Ceramics & Gallery opened in Taos in June 2026, bringing a dedicated space for experienced ceramicists to a town whose adobe-and-clay building tradition has always had an intimate relationship with the medium. The studio is built around the idea that working in clay is as much about community as it is about the material itself — a place where shared kiln time and shared workspace create the kind of connection that a solitary home studio can't.

The studio offers memberships for potters who need regular access to equipment and firing, along with classes and workshops for those building skills from scratch. A Skutt 1027 kiln handles contract firings for ceramicists working elsewhere in the Taos area, filling a practical need in a region with a deep working-potter community but limited firing infrastructure. Additional programming — a recurring Clay Club and paint-your-own-pottery sessions — is in development and expected to be running by early 2027, broadening the studio's reach beyond serious practitioners to include more casual visitors and families.

Taos has drawn ceramicists for generations, from the historic pottery traditions of Taos Pueblo to the wave of studio potters who followed the town's early-20th-century painters into the area. moonsparks joins that lineage with a distinctly contemporary, community-oriented model — less a traditional retail gallery than a working studio that happens to sell what it makes.`,
    meta_title: 'moonsparks Ceramics & Gallery | Taos, NM | Southwest Galleries',
    meta_description: 'moonsparks Ceramics & Gallery in Taos, NM — memberships, classes, and contract kiln firings for working ceramicists, opened June 2026.',
  },
];

async function run() {
  for (const l of LISTINGS) {
    const existing = await sql`SELECT id FROM listings WHERE slug = ${l.slug}`;
    if (existing.length) {
      console.log(`  listing exists: ${l.name}`);
      continue;
    }

    const cityId = CITY_IDS[l.city_slug];
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

    for (const styleSlug of l.art_styles) {
      const styleId = STYLE_IDS[styleSlug];
      if (styleId) {
        await sql`INSERT INTO listing_art_styles (listing_id, style_id) VALUES (${row.id}, ${styleId}) ON CONFLICT DO NOTHING`;
      }
    }

    await sql`
      UPDATE listing_submissions SET status = 'approved', reviewed_at = NOW(), created_listing_id = ${row.id}
      WHERE id = ${l.submission_id}
    `;

    console.log(`  ✓ ${l.name} (listing id=${row.id})`);
  }

  // Submission 6 is an exact duplicate of submission 7 (same everything, submitted seconds apart) —
  // reject it as a duplicate rather than creating a second identical listing.
  await sql`UPDATE listing_submissions SET status = 'rejected', reviewed_at = NOW() WHERE id = 6`;
  console.log('  ✓ Submission 6 marked rejected (duplicate of 7)');

  console.log('\nDone.');
}

run().catch((e) => { console.error(e.message); process.exit(1); });
