import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const NEON_DB_KEY = process.env.NEON_DB_KEY;
if (!NEON_DB_KEY) { console.error('NEON_DB_KEY not set'); process.exit(1); }
const sql = neon(NEON_DB_KEY);

const __dirname = dirname(fileURLToPath(import.meta.url));

const files = [
  'contacts-az.json',
  'contacts-ca.json',
  'contacts-co.json',
  'contacts-nm.json',
  'contacts-NV.json',
  'contacts-tx.json',
  'contacts-UT.json',
];

let totalUpdated = 0;
let totalSkipped = 0;

for (const file of files) {
  const path = join(__dirname, file);
  const contacts = JSON.parse(readFileSync(path, 'utf-8'));
  let fileUpdated = 0;

  for (const { id, address_line1, zip_code, phone } of contacts) {
    // neon returns [] for UPDATE; use RETURNING to confirm the row existed
    const result = await sql`
      UPDATE listings
      SET address_line1 = ${address_line1},
          zip_code = ${zip_code},
          phone = ${phone}
      WHERE id = ${id}
      RETURNING id
    `;
    if (result.length > 0) {
      fileUpdated++;
    } else {
      console.warn(`  No row found for id=${id}`);
      totalSkipped++;
    }
  }

  console.log(`${file}: updated ${fileUpdated} rows`);
  totalUpdated += fileUpdated;
}

console.log(`\nDone. Total updated: ${totalUpdated}, skipped (no row): ${totalSkipped}`);
