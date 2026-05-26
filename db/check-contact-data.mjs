import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.NEON_DB_KEY);

const totals = await sql`
  SELECT 
    COUNT(*) AS total,
    COUNT(address_line1) AS has_address,
    COUNT(phone) AS has_phone,
    COUNT(website_url) AS has_website,
    COUNT(*) FILTER (WHERE address_line1 IS NULL AND phone IS NULL) AS missing_both
  FROM listings 
  WHERE status = 'approved' AND deleted_at IS NULL
`;

console.log('Overall:', JSON.stringify(totals[0]));

const byState = await sql`
  SELECT 
    state_code,
    COUNT(*) AS total,
    COUNT(address_line1) AS has_address,
    COUNT(phone) AS has_phone,
    COUNT(*) FILTER (WHERE address_line1 IS NULL) AS missing_address,
    COUNT(*) FILTER (WHERE phone IS NULL) AS missing_phone
  FROM listings 
  WHERE status = 'approved' AND deleted_at IS NULL
  GROUP BY state_code
  ORDER BY state_code
`;

console.log('\nBy state:');
byState.forEach(r => console.log(JSON.stringify(r)));

const sample = await sql`
  SELECT id, name, state_code, address_line1, phone, website_url
  FROM listings
  WHERE status = 'approved' AND deleted_at IS NULL
  ORDER BY state_code, name
  LIMIT 10
`;
console.log('\nSample rows:');
sample.forEach(r => console.log(JSON.stringify(r)));
