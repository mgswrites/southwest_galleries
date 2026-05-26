import { neon } from '@neondatabase/serverless';
import { writeFileSync } from 'fs';

const sql = neon(process.env.NEON_DB_KEY);

const listings = await sql`
  SELECT l.id, l.name, l.slug, l.state_code, c.name AS city_name, l.website_url
  FROM listings l
  LEFT JOIN cities c ON c.id = l.city_id
  WHERE l.status = 'approved' AND l.deleted_at IS NULL
  ORDER BY l.state_code, c.name, l.name
`;

const byState = {};
for (const l of listings) {
  if (!byState[l.state_code]) byState[l.state_code] = [];
  byState[l.state_code].push(l);
}

for (const [state, rows] of Object.entries(byState)) {
  writeFileSync(`db/listings-${state.toLowerCase()}.json`, JSON.stringify(rows, null, 2));
  console.log(`${state}: ${rows.length} listings → db/listings-${state.toLowerCase()}.json`);
}
