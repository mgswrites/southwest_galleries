import { neon } from '@neondatabase/serverless';

const NEON_DB_KEY = process.env.NEON_DB_KEY;
if (!NEON_DB_KEY) { console.error('NEON_DB_KEY not set'); process.exit(1); }
const sql = neon(NEON_DB_KEY);

function extractMeta(html, rawUrl) {
  const base = new URL(rawUrl);

  // og:image — handle both attribute orderings
  const ogImg =
    html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)?.[1] ||
    html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i)?.[1];

  // twitter:image as fallback
  const twImg =
    html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i)?.[1] ||
    html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i)?.[1];

  // best icon: apple-touch-icon > icon with size > any icon > /favicon.ico
  const touchIcon = html.match(/<link[^>]+rel=["'][^"']*apple-touch-icon[^"']*["'][^>]+href=["']([^"']+)["']/i)?.[1];
  const sizedIcon = html.match(/<link[^>]+rel=["'][^"']*icon[^"']*["'][^>]+sizes=["'][^"']*["'][^>]+href=["']([^"']+)["']/i)?.[1];
  const anyIcon  = html.match(/<link[^>]+rel=["'][^"']*(?:shortcut )?icon[^"']*["'][^>]+href=["']([^"']+)["']/i)?.[1];

  function toAbs(href) {
    if (!href) return null;
    try { return new URL(href, base).href; } catch { return null; }
  }

  return {
    heroImage: toAbs(ogImg) || toAbs(twImg),
    logoUrl:   toAbs(touchIcon) || toAbs(sizedIcon) || toAbs(anyIcon) || `${base.origin}/favicon.ico`,
  };
}

async function fetchHtml(url, timeoutMs = 10000) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SouthwestGalleriesBot/1.0)',
        'Accept': 'text/html',
      },
      redirect: 'follow',
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}

const listings = await sql`
  SELECT id, name, website_url
  FROM listings
  WHERE website_url IS NOT NULL
    AND (hero_image_url IS NULL OR logo_url IS NULL)
    AND status = 'approved'
    AND deleted_at IS NULL
  ORDER BY id
`;

console.log(`Enriching ${listings.length} listings…\n`);

let updated = 0;
let skipped = 0;
let failed  = 0;

for (const listing of listings) {
  try {
    const html = await fetchHtml(listing.website_url);
    const { heroImage, logoUrl } = extractMeta(html, listing.website_url);

    await sql`
      UPDATE listings SET
        hero_image_url = COALESCE(hero_image_url, ${heroImage}),
        logo_url       = COALESCE(logo_url,       ${logoUrl})
      WHERE id = ${listing.id}
    `;

    const got = [heroImage && 'hero', logoUrl && 'logo'].filter(Boolean).join(' + ');
    console.log(`  ✓ ${listing.name}  [${got}]`);
    if (heroImage) console.log(`      hero → ${heroImage.slice(0, 90)}`);
    if (logoUrl)   console.log(`      logo → ${logoUrl.slice(0, 90)}`);
    updated++;
  } catch (err) {
    console.log(`  ✗ ${listing.name}: ${err.message}`);
    failed++;
  }

  // polite delay between requests
  await new Promise(r => setTimeout(r, 600));
}

const result = await sql`
  SELECT
    COUNT(*) FILTER (WHERE hero_image_url IS NOT NULL) AS with_hero,
    COUNT(*) FILTER (WHERE logo_url IS NOT NULL)       AS with_logo,
    COUNT(*)                                           AS total
  FROM listings WHERE status = 'approved'
`;
const { with_hero, with_logo, total } = result[0];

console.log(`\n✓ Done. Updated: ${updated}, Failed: ${failed}, Skipped: ${skipped}`);
console.log(`  hero_image_url filled: ${with_hero}/${total}`);
console.log(`  logo_url filled:       ${with_logo}/${total}`);
