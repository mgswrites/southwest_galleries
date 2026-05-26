import { neon } from '@neondatabase/serverless';

const NEON_DB_KEY = process.env.NEON_DB_KEY;
if (!NEON_DB_KEY) { console.error('NEON_DB_KEY not set'); process.exit(1); }
const sql = neon(NEON_DB_KEY);

function extractOgImage(html, rawUrl) {
  const base = new URL(rawUrl);
  const ogImg =
    html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)?.[1] ||
    html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i)?.[1] ||
    html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i)?.[1] ||
    html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i)?.[1];
  if (!ogImg) return null;
  try { return new URL(ogImg, base).href; } catch { return null; }
}

async function fetchHtml(url, timeoutMs = 10000) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
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

// Skip images that look like logos (small square images, icons, SVGs)
function isLikelyLogo(url) {
  if (!url) return true;
  const u = url.toLowerCase();
  return (
    u.includes('favicon') ||
    u.includes('logo') ||
    u.includes('icon') ||
    u.includes('.svg') ||
    u.includes('apple-touch') ||
    // artcld.com logos
    u.includes('cdn.artcld.com') ||
    // squarespace favicon pattern
    (u.includes('squarespace') && u.includes('favicon'))
  );
}

const listings = await sql`
  SELECT id, name, website_url, hero_image_url
  FROM listings
  WHERE website_url IS NOT NULL
    AND hero_image_url LIKE '%unsplash%'
    AND status = 'approved'
    AND deleted_at IS NULL
  ORDER BY id
`;

console.log(`Replacing Unsplash heroes for ${listings.length} listings…\n`);

let updated = 0;
let kept = 0;
let failed = 0;

for (const listing of listings) {
  try {
    const html = await fetchHtml(listing.website_url);
    const ogImage = extractOgImage(html, listing.website_url);

    if (!ogImage || isLikelyLogo(ogImage)) {
      console.log(`  – ${listing.name}: no suitable og:image found, keeping Unsplash`);
      kept++;
    } else {
      await sql`UPDATE listings SET hero_image_url = ${ogImage} WHERE id = ${listing.id}`;
      console.log(`  ✓ ${listing.name}`);
      console.log(`      ${ogImage.slice(0, 100)}`);
      updated++;
    }
  } catch (err) {
    console.log(`  ✗ ${listing.name}: ${err.message}`);
    failed++;
  }

  await new Promise(r => setTimeout(r, 400));
}

console.log(`\nDone. Replaced: ${updated}, kept Unsplash: ${kept}, failed: ${failed}`);
