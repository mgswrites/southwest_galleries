import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const NEON_DB_KEY = process.env.NEON_DB_KEY;
if (!NEON_DB_KEY) {
  console.error('NEON_DB_KEY not set');
  process.exit(1);
}

const sql = neon(NEON_DB_KEY);
const migrationSQL = readFileSync(join(__dirname, 'migrate.sql'), 'utf8');

// Split on statement-ending semicolons (skip empty)
const statements = migrationSQL
  .split(/;\s*\n/)
  .map(s => s.trim())
  .filter(s => s.length > 0 && !s.startsWith('--'));

console.log(`Running ${statements.length} statements…`);

let i = 0;
for (const stmt of statements) {
  i++;
  try {
    await sql.query(stmt);
    const label = stmt.split('\n')[0].slice(0, 60);
    console.log(`  [${i}] ✓ ${label}`);
  } catch (err) {
    const label = stmt.split('\n')[0].slice(0, 60);
    if (err.message?.includes('already exists') || err.message?.includes('duplicate')) {
      console.log(`  [${i}] ~ skipped (already exists): ${label}`);
    } else {
      console.error(`  [${i}] ✗ FAILED: ${label}`);
      console.error(`       ${err.message}`);
      process.exit(1);
    }
  }
}

console.log('\nMigration complete.');
