import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.NEON_DB_KEY);

await sql`
  CREATE TABLE IF NOT EXISTS listing_claims (
    id SERIAL PRIMARY KEY,
    listing_id INTEGER NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    claimant_name TEXT NOT NULL,
    claimant_email TEXT NOT NULL,
    claimant_title TEXT,
    claimant_phone TEXT,
    claimant_note TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )
`;
console.log('created listing_claims table');
console.log('Migration complete.');
