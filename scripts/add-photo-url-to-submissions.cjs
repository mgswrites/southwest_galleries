const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.NEON_DB_KEY);

async function run() {
  await sql`ALTER TABLE listing_submissions ADD COLUMN IF NOT EXISTS photo_url TEXT`;
  console.log('✓ Added photo_url column to listing_submissions');
  process.exit(0);
}

run().catch(e => { console.error(e.message); process.exit(1); });
