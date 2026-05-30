// Submit all site URLs to IndexNow
// Usage: node scripts/indexnow-submit.cjs
// Optionally pass --sitemap to pull URLs from the live sitemap instead of the DB

const { neon } = require('@neondatabase/serverless');

const HOST = 'southwestgalleries.com';
const KEY = '5bb48cce8c0a424ca2c2953b8416008e';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const BASE = `https://${HOST}`;
const BATCH_SIZE = 100; // IndexNow max per request is 10,000; 100 is safe

const sql = neon(process.env.NEON_DB_KEY);

async function getUrls() {
  const urls = new Set();

  // Static pages
  const staticPages = [
    '/', '/galleries/', '/museums/', '/art-styles/', '/guides/', '/events/',
    '/about/', '/artists/',
    '/galleries/arizona/', '/galleries/california/', '/galleries/colorado/',
    '/galleries/nevada/', '/galleries/new-mexico/', '/galleries/texas/',
    '/galleries/utah/',
  ];
  staticPages.forEach((p) => urls.add(`${BASE}${p}`));

  // All published listings
  const listings = await sql`SELECT slug FROM listings WHERE status = 'approved' AND deleted_at IS NULL`;
  for (const l of listings) {
    urls.add(`${BASE}/listings/${l.slug}/`);
  }

  // Cities with listings
  const cities = await sql`
    SELECT DISTINCT c.slug as city_slug, s.slug as state_slug
    FROM listings l
    JOIN cities c ON l.city_id = c.id
    JOIN states s ON c.state_code = s.code
    WHERE l.status = 'approved' AND l.deleted_at IS NULL`;
  for (const c of cities) {
    urls.add(`${BASE}/galleries/${c.state_slug}/${c.city_slug}/`);
  }

  // States
  const states = await sql`SELECT slug FROM states`;
  for (const s of states) {
    urls.add(`${BASE}/galleries/${s.slug}/`);
  }

  // Art styles
  const styles = await sql`SELECT slug FROM art_styles`;
  for (const s of styles) {
    urls.add(`${BASE}/art-styles/${s.slug}/`);
  }

  // Artists
  const artists = await sql`SELECT slug FROM artists`;
  for (const a of artists) {
    urls.add(`${BASE}/artists/${a.slug}/`);
  }

  // Events
  const events = await sql`SELECT slug FROM events`;
  for (const e of events) {
    urls.add(`${BASE}/events/${e.slug}/`);
  }

  return [...urls];
}

async function submitBatch(urlList) {
  const body = JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  });

  const res = await fetch('https://api.indexnow.org/IndexNow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body,
  });

  return res.status;
}

async function run() {
  console.log('Collecting URLs...');
  const urls = await getUrls();
  console.log(`Found ${urls.length} URLs to submit.`);

  let submitted = 0;
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE);
    const status = await submitBatch(batch);
    submitted += batch.length;
    console.log(`  Batch ${Math.ceil((i + 1) / BATCH_SIZE)}: ${batch.length} URLs → HTTP ${status}`);
  }

  console.log(`\nDone. Submitted ${submitted} URLs to IndexNow.`);
}

run().catch(console.error);
