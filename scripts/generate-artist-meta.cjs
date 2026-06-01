const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.NEON_DB_KEY);

function buildTitle(name, stateCode) {
  const base = `${name} | Southwest Artist`;
  if (base.length <= 55) return `${base} | Southwest Galleries`;
  if (base.length <= 65) return base;
  return name.slice(0, 55) + '…';
}

function buildDescription(name, bio, stateName) {
  if (!bio) {
    return `Learn about ${name}, a notable artist from the American Southwest. View biography, medium, and gallery representation on Southwest Galleries.`;
  }

  // Use first ~160 chars of bio
  const clean = bio.trim().replace(/\s+/g, ' ');
  if (clean.length <= 160) {
    return clean.endsWith('.') || clean.endsWith('!') || clean.endsWith('?')
      ? clean
      : clean + '.';
  }

  const truncated = clean.slice(0, 157);
  const lastSpace = truncated.lastIndexOf(' ');
  return truncated.slice(0, lastSpace) + '…';
}

async function run() {
  const artists = await sql`
    SELECT a.id, a.slug, a.name, a.bio, a.state_code,
           s.name AS state_name
    FROM artists a
    LEFT JOIN states s ON s.code = a.state_code
    WHERE a.meta_title IS NULL OR a.meta_description IS NULL
    ORDER BY a.name
  `;

  console.log(`Generating meta for ${artists.length} artists...`);

  let updated = 0;
  for (const a of artists) {
    const meta_title = buildTitle(a.name, a.state_code);
    const meta_description = buildDescription(a.name, a.bio, a.state_name);

    if (meta_title.length > 70) {
      console.warn(`  ⚠ Long title (${meta_title.length}): ${meta_title}`);
    }
    if (meta_description.length > 165) {
      console.warn(`  ⚠ Long desc (${meta_description.length}): ${a.slug}`);
    }

    await sql`
      UPDATE artists SET meta_title = ${meta_title}, meta_description = ${meta_description}
      WHERE id = ${a.id}
    `;
    updated++;
  }

  console.log(`Done. Updated ${updated} artists.`);
  process.exit(0);
}

run().catch(e => { console.error(e.message); process.exit(1); });
