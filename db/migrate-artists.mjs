import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.NEON_DB_KEY);

await sql`
  CREATE TABLE IF NOT EXISTS artists (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    bio TEXT,
    state_code us_state,
    city_id INTEGER REFERENCES cities(id),
    website_url TEXT,
    hero_image_url TEXT,
    meta_title TEXT,
    meta_description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )
`;
console.log('created artists table');

await sql`
  CREATE TABLE IF NOT EXISTS artist_listings (
    artist_id INTEGER NOT NULL REFERENCES artists(id) ON DELETE CASCADE,
    listing_id INTEGER NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    PRIMARY KEY (artist_id, listing_id)
  )
`;
console.log('created artist_listings table');
console.log('Migration complete.');
