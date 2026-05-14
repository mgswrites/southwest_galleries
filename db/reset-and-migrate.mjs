import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const NEON_DB_KEY = process.env.NEON_DB_KEY;
if (!NEON_DB_KEY) { console.error('NEON_DB_KEY not set'); process.exit(1); }

const sql = neon(NEON_DB_KEY);

console.log('Dropping existing objects…');
const drops = [
  `DROP VIEW IF EXISTS city_gallery_summary CASCADE`,
  `DROP TABLE IF EXISTS listing_views CASCADE`,
  `DROP TABLE IF EXISTS listing_submissions CASCADE`,
  `DROP TABLE IF EXISTS listing_owners CASCADE`,
  `DROP TABLE IF EXISTS post_listings CASCADE`,
  `DROP TABLE IF EXISTS posts CASCADE`,
  `DROP TABLE IF EXISTS events CASCADE`,
  `DROP TABLE IF EXISTS listing_images CASCADE`,
  `DROP TABLE IF EXISTS listing_art_styles CASCADE`,
  `DROP TABLE IF EXISTS art_styles CASCADE`,
  `DROP TABLE IF EXISTS listings CASCADE`,
  `DROP TABLE IF EXISTS cities CASCADE`,
  `DROP TABLE IF EXISTS states CASCADE`,
  `DROP TYPE IF EXISTS listing_type CASCADE`,
  `DROP TYPE IF EXISTS listing_tier CASCADE`,
  `DROP TYPE IF EXISTS submission_status CASCADE`,
  `DROP TYPE IF EXISTS us_state CASCADE`,
];
for (const d of drops) {
  await sql.query(d);
  console.log(`  ✓ ${d}`);
}
console.log();

const migrationSQL = readFileSync(join(__dirname, 'migrate.sql'), 'utf8');

// Dollar-quote-aware statement splitter
function splitStatements(sql) {
  const stmts = [];
  let current = '';
  let inDollarQuote = false;
  let dollarTag = '';
  let i = 0;
  while (i < sql.length) {
    // Check for dollar-quote start/end
    if (!inDollarQuote) {
      const match = sql.slice(i).match(/^\$[A-Za-z0-9_]*\$/);
      if (match) {
        inDollarQuote = true;
        dollarTag = match[0];
        current += dollarTag;
        i += dollarTag.length;
        continue;
      }
    } else {
      if (sql.slice(i).startsWith(dollarTag)) {
        inDollarQuote = false;
        current += dollarTag;
        i += dollarTag.length;
        continue;
      }
    }

    const ch = sql[i];
    current += ch;

    // Statement boundary: semicolon outside dollar-quote
    if (ch === ';' && !inDollarQuote) {
      const trimmed = current.trim().replace(/--[^\n]*/g, '').trim();
      if (trimmed.length > 1) stmts.push(current.trim());
      current = '';
    }
    i++;
  }
  const last = current.trim().replace(/--[^\n]*/g, '').trim();
  if (last.length > 1) stmts.push(current.trim());
  return stmts;
}

const statements = splitStatements(migrationSQL)
  .filter(s => !s.replace(/--[^\n]*/g, '').replace(/\/\*[\s\S]*?\*\//g, '').trim().match(/^$/));

console.log(`Running ${statements.length} statements…`);

let i = 0;
for (const stmt of statements) {
  i++;
  const label = stmt.replace(/--[^\n]*/g, '').trim().split('\n')[0].slice(0, 70);
  try {
    await sql.query(stmt);
    console.log(`  [${String(i).padStart(2)}] ✓  ${label}`);
  } catch (err) {
    console.error(`  [${String(i).padStart(2)}] ✗  ${label}`);
    console.error(`        ${err.message}`);
    process.exit(1);
  }
}

console.log('\n✓ Migration complete.');

// Quick sanity check
const tables = await sql`SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename`;
const stateCount = await sql`SELECT COUNT(*) FROM states`;
const cityCount = await sql`SELECT COUNT(*) FROM cities`;
const styleCount = await sql`SELECT COUNT(*) FROM art_styles`;
console.log(`\nTables: ${tables.map(t => t.tablename).join(', ')}`);
console.log(`States: ${stateCount[0].count}, Cities: ${cityCount[0].count}, Art Styles: ${styleCount[0].count}`);
