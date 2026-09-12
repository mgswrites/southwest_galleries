import { neon } from '@neondatabase/serverless';
import fs from 'fs';

if (!process.env.NEON_DB_KEY) {
  const env = fs.readFileSync(new URL('../.env', import.meta.url), 'utf8');
  for (const line of env.split('\n')) {
    const m = line.match(/^([A-Z_]+)=(.*)$/);
    if (m) process.env[m[1]] = m[2];
  }
}

const sql = neon(process.env.NEON_DB_KEY);

// city_id map: Santa Barbara=23, San Diego=20, Laguna Beach=24, Fort Worth=51,
//              Houston=49, Telluride=35, Durango=36
const events = [
  {
    title: 'Santa Barbara Arts & Crafts Show',
    slug: 'santa-barbara-arts-crafts-show',
    description: 'Every Sunday, weather permitting, artists and craftspeople line the waterfront along Cabrillo Boulevard for the Santa Barbara Arts & Crafts Show — a juried, city-sanctioned open-air market that has run continuously since 1965, making it one of the longest-running outdoor art shows in the country. Every piece on display must be handmade by the artist selling it, and the show has served for decades as an accessible entry point into buying original work directly from Central Coast painters, potters, jewelers, and photographers.',
    event_date: '2026-09-13',
    city_id: 23, state_code: 'CA', is_recurring: true,
    recurrence_rule: 'FREQ=WEEKLY;BYDAY=SU',
    is_free: true,
    meta_title: 'Santa Barbara Arts & Crafts Show | Cabrillo Blvd Waterfront | Southwest Galleries',
    meta_description: 'The Santa Barbara Arts & Crafts Show happens every Sunday on the waterfront — a juried, all-handmade open-air market running since 1965.',
  },
  {
    title: 'Little Italy ArtWalk',
    slug: 'little-italy-artwalk-san-diego',
    description: 'The Little Italy ArtWalk transforms San Diego\'s Little Italy neighborhood into one of the largest outdoor art exhibitions on the West Coast, with hundreds of artists exhibiting paintings, sculpture, photography, and mixed media across multiple city blocks alongside live music and food from the neighborhood\'s restaurant scene. Organized by the Little Italy Association, it has grown into one of the signature spring events on the San Diego arts calendar and a major draw for collectors and casual visitors alike.',
    event_date: '2027-05-01',
    city_id: 20, state_code: 'CA', is_recurring: true,
    recurrence_rule: 'FREQ=YEARLY',
    is_free: true,
    website_url: 'https://littleitalysd.com',
    meta_title: 'Little Italy ArtWalk 2027 | San Diego | Southwest Galleries',
    meta_description: 'The Little Italy ArtWalk (spring 2027) fills San Diego\'s Little Italy with hundreds of exhibiting artists across multiple city blocks — free and open to all.',
  },
  {
    title: 'Laguna Beach Festival of Arts',
    slug: 'laguna-beach-festival-of-arts-2027',
    description: 'The Laguna Beach Festival of Arts, running each summer since 1932, is a juried fine art exhibition on landscaped grounds in the hills above Laguna Beach, showcasing roughly 140 painters, sculptors, ceramicists, and photographers selected through a rigorous jury process. The festival grounds are also home to the Pageant of the Masters, the "living pictures" tableaux vivants performance staged nightly in the adjoining amphitheater, making a single visit a chance to see both museum-caliber original art and one of the most unusual live performances in the country.',
    event_date: '2027-07-09',
    event_end_date: '2027-08-29',
    city_id: 24, state_code: 'CA', is_recurring: true,
    recurrence_rule: 'FREQ=YEARLY',
    is_free: false,
    ticket_url: 'https://www.foapom.com',
    website_url: 'https://www.foapom.com',
    meta_title: 'Laguna Beach Festival of Arts 2027 | Pageant of the Masters | Southwest Galleries',
    meta_description: 'The Laguna Beach Festival of Arts (summer 2027) is a juried fine-art exhibition running since 1932, staged alongside the famed Pageant of the Masters.',
  },
  {
    title: 'Sawdust Art Festival',
    slug: 'sawdust-art-festival-laguna-beach-2027',
    description: 'Founded in 1965 by artists priced out of the neighboring Festival of Arts, the Sawdust Art Festival has become a summer institution of its own in Laguna Beach — a rustic, sawdust-covered village of working studios where roughly 200 local artists sell directly to visitors amid live glassblowing and pottery demonstrations, artist talks, and music. Its founding as an artist-run alternative gives it a looser, more hands-on character than its more formal neighbor across the road.',
    event_date: '2027-06-25',
    event_end_date: '2027-09-06',
    city_id: 24, state_code: 'CA', is_recurring: true,
    recurrence_rule: 'FREQ=YEARLY',
    is_free: false,
    ticket_url: 'https://www.sawdustartfestival.org',
    website_url: 'https://www.sawdustartfestival.org',
    meta_title: 'Sawdust Art Festival 2027 | Laguna Beach | Southwest Galleries',
    meta_description: 'The Sawdust Art Festival (summer 2027) is Laguna Beach\'s artist-run summer market — 200 working studios, live demonstrations, and direct sales since 1965.',
  },
  {
    title: 'Bayou City Art Festival',
    slug: 'bayou-city-art-festival-houston-2027',
    description: 'The Bayou City Art Festival, held each spring in Houston\'s Memorial Park (with a companion fall edition downtown), is one of the longest-running juried art festivals in the country, dating to 1971. Roughly 300 artists working in painting, sculpture, glass, ceramics, jewelry, and photography exhibit under a strict jury process, with a significant share of proceeds historically supporting local park and arts nonprofits — giving the festival a civic dimension beyond the art market itself.',
    event_date: '2027-04-10',
    event_end_date: '2027-04-11',
    city_id: 49, state_code: 'TX', is_recurring: true,
    recurrence_rule: 'FREQ=YEARLY',
    is_free: false,
    ticket_url: 'https://www.bayoucityartfestival.com',
    website_url: 'https://www.bayoucityartfestival.com',
    meta_title: 'Bayou City Art Festival 2027 | Memorial Park, Houston | Southwest Galleries',
    meta_description: 'The Bayou City Art Festival (spring 2027) brings 300 juried artists to Houston\'s Memorial Park — one of the longest-running art festivals in the country, since 1971.',
  },
  {
    title: 'Fort Worth Gallery Night',
    slug: 'fort-worth-gallery-night',
    description: 'Fort Worth Gallery Night, organized by the Fort Worth Art Dealers Association, opens the city\'s galleries and museums simultaneously each spring for an evening of new exhibitions, artist receptions, and free shuttle service connecting the Cultural District, downtown, and near-Southside gallery clusters. It is the single biggest night of the year for gallery-going in Fort Worth, drawing a citywide crowd that might otherwise visit only one or two spaces at a time.',
    event_date: '2027-04-16',
    city_id: 51, state_code: 'TX', is_recurring: true,
    recurrence_rule: 'FREQ=YEARLY',
    is_free: true,
    website_url: 'https://www.fwada.com',
    meta_title: 'Fort Worth Gallery Night 2027 | Southwest Galleries',
    meta_description: 'Fort Worth Gallery Night (spring 2027) opens every participating gallery and museum in the city simultaneously, with free shuttles between arts districts.',
  },
  {
    title: 'Telluride Art Walk',
    slug: 'telluride-art-walk',
    description: 'On summer Thursday evenings, Telluride Arts coordinates an art walk through the town\'s compact downtown gallery district, with participating galleries hosting simultaneous opening receptions against the backdrop of the San Juan Mountains. The scale is intimate compared to larger regional art walks, but the setting — a National Historic Landmark district ringed by 13,000-foot peaks — makes it one of the most scenic gallery walks anywhere in the Southwest.',
    event_date: '2026-09-17',
    start_time: '18:00',
    end_time: '20:00',
    city_id: 35, state_code: 'CO', is_recurring: true,
    recurrence_rule: 'FREQ=WEEKLY;BYDAY=TH;MONTHS=6,7,8,9',
    is_free: true,
    website_url: 'https://telluridearts.org',
    meta_title: 'Telluride Art Walk | Summer Gallery Night | Southwest Galleries',
    meta_description: 'The Telluride Art Walk happens summer Thursday evenings — downtown galleries host simultaneous openings against the backdrop of the San Juan Mountains.',
  },
  {
    title: 'Durango First Friday ArtWalk',
    slug: 'durango-first-friday-artwalk',
    description: 'On the first Friday of each month, the Durango Arts Center coordinates an art walk through the historic downtown gallery district, with participating galleries and studios staying open late for opening receptions. Durango\'s downtown, listed on the National Register of Historic Places, gives the walk a distinctive backdrop of restored Victorian-era storefronts along Main Avenue.',
    event_date: '2026-10-02',
    start_time: '17:00',
    end_time: '19:00',
    city_id: 36, state_code: 'CO', is_recurring: true,
    recurrence_rule: 'FREQ=MONTHLY;BYDAY=1FR',
    is_free: true,
    website_url: 'https://durangoarts.org',
    meta_title: 'Durango First Friday ArtWalk | Southwest Galleries',
    meta_description: 'Durango\'s First Friday ArtWalk happens monthly in the historic downtown gallery district, coordinated by the Durango Arts Center.',
  },
];

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

async function run() {
  console.log(`Seeding ${events.length} new events...`);
  for (const ev of events) {
    const [row] = await sql`
      INSERT INTO events (
        title, slug, description, event_date, event_end_date,
        start_time, end_time, city_id, state_code,
        is_recurring, recurrence_rule, is_free, ticket_url,
        website_url, meta_title, meta_description
      ) VALUES (
        ${ev.title}, ${ev.slug}, ${ev.description},
        ${ev.event_date}, ${ev.event_end_date ?? null},
        ${ev.start_time ?? null}, ${ev.end_time ?? null},
        ${ev.city_id}, ${ev.state_code}::us_state,
        ${ev.is_recurring ?? false}, ${ev.recurrence_rule ?? null},
        ${ev.is_free ?? true}, ${ev.ticket_url ?? null},
        ${ev.website_url ?? null}, ${ev.meta_title ?? null}, ${ev.meta_description ?? null}
      )
      ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        event_date = EXCLUDED.event_date,
        event_end_date = EXCLUDED.event_end_date,
        meta_title = EXCLUDED.meta_title,
        meta_description = EXCLUDED.meta_description
      RETURNING id
    `;
    console.log(`  ✓ ${ev.title} (id: ${row.id})`);
  }

  const [count] = await sql`SELECT COUNT(*) FROM events`;
  console.log(`\nDone. ${count.count} events in DB.`);
}

run().catch((err) => { console.error(err); process.exit(1); });
