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

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function toHtml(raw) {
  return raw
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p>${escapeHtml(p)}</p>`)
    .join('\n\n');
}

async function run() {
  const rows = await sql`SELECT id, slug, content FROM posts`;
  const targets = rows.filter((r) => !r.content.includes('<p'));

  console.log(`Found ${targets.length} unformatted post(s).`);
  for (const r of targets) {
    const html = toHtml(r.content);
    await sql`UPDATE posts SET content = ${html} WHERE id = ${r.id}`;
    console.log(`  ✓ ${r.slug} (${r.content.split(/\n\n+/).length} paragraphs wrapped)`);
  }
  console.log('Done.');
}

run().catch((e) => { console.error(e); process.exit(1); });
