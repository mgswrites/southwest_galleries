const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.NEON_DB_KEY);

const LISTING = {
  slug: 'emma-s-barrientos-mexican-american-cultural-center-austin',
  name: 'Emma S. Barrientos Mexican American Cultural Center',
  listing_type: 'cultural_center',
  city_id: 52, // Austin
  state_code: 'TX',
  address_line1: '600 River Street',
  zip_code: '78701',
  phone: '(512) 974-3772',
  website_url: 'https://www.austintexas.gov/macc',
  is_free: true,
  hero_image_url: 'https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=800&h=450&fit=crop&q=80',
  short_description: "Austin's 55,000-square-foot hub for Mexican American and Latino cultural arts — galleries, performance spaces, dance studios, and community programming — freshly reopened in June 2026 after a $27M expansion.",
  full_description: `The Emma S. Barrientos Mexican American Cultural Center (ESB-MACC) reopened on June 6, 2026 following a nearly three-year, $27 million expansion that transformed it into a 55,000-square-foot landmark on Austin's east waterfront. Named for community leader Emma S. Barrientos, the center has been a cornerstone of Austin's Latino cultural life since its original opening, and the expanded facility cements its place as one of the most significant Mexican American cultural institutions in Texas.

The renovation, funded primarily through a 2018 General Obligation Bond, added music rehearsal rooms, dance studios for ballet folklórico, a teaching kitchen, updated gallery spaces, a redesigned Zócalo Plaza with native plantings, and a healing garden for traditional herbs. The grand reopening — "Juntos de Nuevo" — opened four simultaneous exhibitions across the center's three gallery spaces.

The center's galleries include the Community Gallery on the first floor, the Sam Z. Coronado Gallery on the second floor, and the Auditorium Atrium, all dedicated to local, regional, and national Latino and Chicano artists. Programming runs deep: Casa de la Cultura offers family workshops on Mexican American, Indigenous, and Latino culture; the Caminos Teen Leadership Program provides paid internships in cultural education; and the Latino/a/e Artist Access Program supports working artists throughout the year.

Admission is always free. The ESB-MACC is open Monday through Friday 10 AM to 9 PM and Saturday 10 AM to 4 PM, located on River Street steps from the hike-and-bike trail along Lady Bird Lake.`,
  meta_title: 'Emma S. Barrientos Mexican American Cultural Center | Austin, TX | Southwest Galleries',
  meta_description: "Austin's 55,000 sq ft hub for Mexican American and Latino cultural arts — free galleries, dance studios, and community programming. Reopened June 2026 after $27M expansion.",
};

async function run() {
  const existing = await sql`SELECT id FROM listings WHERE slug = ${LISTING.slug}`;
  if (existing.length) {
    console.log('Already exists — skipping.');
    process.exit(0);
  }

  await sql`
    INSERT INTO listings (
      slug, name, listing_type, tier, city_id, state_code,
      address_line1, zip_code, phone, website_url,
      hero_image_url, short_description, full_description,
      meta_title, meta_description,
      status, is_verified
    ) VALUES (
      ${LISTING.slug}, ${LISTING.name},
      ${LISTING.listing_type}::listing_type, 'free'::listing_tier,
      ${LISTING.city_id}, ${LISTING.state_code},
      ${LISTING.address_line1}, ${LISTING.zip_code},
      ${LISTING.phone}, ${LISTING.website_url},
      ${LISTING.hero_image_url},
      ${LISTING.short_description}, ${LISTING.full_description},
      ${LISTING.meta_title}, ${LISTING.meta_description},
      'approved'::submission_status, true
    )
  `;
  console.log(`✓ ${LISTING.name}`);
  process.exit(0);
}

run().catch(e => { console.error(e.message); process.exit(1); });
