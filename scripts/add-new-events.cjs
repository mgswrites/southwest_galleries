const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.NEON_DB_KEY);

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const events = [
  {
    title: 'Art Santa Fe',
    slug: 'art-santa-fe-2026',
    description: 'Art Santa Fe is one of the premier art fairs in the American Southwest, bringing together galleries and collectors for a three-day showcase of contemporary and modern art at the Santa Fe Convention Center. The fair features painting, sculpture, photography, and works on paper from galleries across the United States and internationally, making it one of the most concentrated opportunities to acquire significant contemporary work in the region.',
    event_date: '2026-07-09',
    event_end_date: '2026-07-11',
    state_code: 'NM',
    city_slug: 'santa-fe',
    is_free: false,
    is_recurring: false,
    website_url: 'https://www.artfairsantafe.com/',
  },
  {
    title: 'Taos Artist Organization Studio Tour',
    slug: 'taos-artist-organization-studio-tour-2026',
    description: 'The Taos Artist Organization (TAO) Annual Studio Tour opens more than 30 working studios across Taos and the surrounding area to the public over Labor Day weekend. The tour gives visitors rare direct access to artists in their creative environments — painting studios, ceramics workshops, jewelry studios, and sculpture yards — and the opportunity to purchase work directly from the artists who made it. One of the most authentic art experiences the region offers.',
    event_date: '2026-09-05',
    event_end_date: '2026-09-07',
    state_code: 'NM',
    city_slug: 'taos',
    is_free: true,
    is_recurring: false,
    website_url: 'https://taosartistorganization.org/',
  },
  {
    title: 'Scottsdale ArtWalk',
    slug: 'scottsdale-artwalk',
    description: 'Every Thursday evening from 6:30 to 9:00 PM, Old Town Scottsdale transforms into one of the most active gallery walks in the American West. More than 80 galleries stay open late along Marshall Way and the surrounding arts district, offering complimentary wine, artist receptions, and the chance to browse an extraordinary concentration of Western, contemporary, and Indigenous art in a single evening. Free, walkable, and one of the best recurring art events in the Southwest.',
    event_date: '2026-06-11',
    event_end_date: null,
    start_time: '18:30',
    end_time: '21:00',
    state_code: 'AZ',
    city_slug: 'scottsdale',
    is_free: true,
    is_recurring: true,
    website_url: 'https://www.scottsdalegalleries.com/artwalk/',
  },
];

async function run() {
  for (const e of events) {
    const existing = await sql`SELECT id FROM events WHERE slug = ${e.slug}`;
    if (existing.length) {
      console.log(`  skip (exists): ${e.title}`);
      continue;
    }

    // Look up city_id
    let cityId = null;
    if (e.city_slug) {
      const [city] = await sql`SELECT id FROM cities WHERE slug = ${e.city_slug}`;
      cityId = city?.id ?? null;
    }

    await sql`
      INSERT INTO events (
        title, slug, description, event_date, event_end_date,
        start_time, end_time, city_id, state_code,
        website_url, is_free, is_recurring,
        meta_title, meta_description
      ) VALUES (
        ${e.title},
        ${e.slug},
        ${e.description},
        ${e.event_date},
        ${e.event_end_date ?? null},
        ${e.start_time ?? null},
        ${e.end_time ?? null},
        ${cityId},
        ${e.state_code},
        ${e.website_url ?? null},
        ${e.is_free},
        ${e.is_recurring},
        ${e.title + ' | Southwest Galleries'},
        ${e.description.slice(0, 160)}
      )
    `;
    console.log(`  ✓ ${e.title}`);
  }
  console.log('Done.');
  process.exit(0);
}

run().catch(e => { console.error(e.message); process.exit(1); });
