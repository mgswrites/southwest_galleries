import { neon } from '@neondatabase/serverless';
import { execSync } from 'child_process';
import { mkdirSync, copyFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const EVENTS_DIR = join(ROOT, 'public', 'events');
const GUIDES_DIR = join(ROOT, 'public', 'guides');
const STATES_DIR = join(ROOT, 'public', 'states');

const NEON_DB_KEY = process.env.NEON_DB_KEY;
if (!NEON_DB_KEY) { console.error('NEON_DB_KEY not set'); process.exit(1); }
const sql = neon(NEON_DB_KEY);

mkdirSync(EVENTS_DIR, { recursive: true });

// City → best existing local image fallback
const CITY_FALLBACKS = {
  'Phoenix':      join(GUIDES_DIR, 'phoenix-art-galleries-first-friday-guide.jpg'),
  'Scottsdale':   join(GUIDES_DIR, 'scottsdale-art-galleries-guide.jpg'),
  'Tucson':       join(GUIDES_DIR, 'tucson-art-galleries-guide.jpg'),
  'Sedona':       join(GUIDES_DIR, 'sedona-art-galleries-guide.jpg'),
  'Flagstaff':    join(GUIDES_DIR, 'art-galleries-flagstaff-arizona.jpg'),
  'Santa Fe':     join(GUIDES_DIR, 'best-art-galleries-santa-fe-new-mexico.jpg'),
  'Albuquerque':  join(GUIDES_DIR, 'albuquerque-art-galleries-guide.jpg'),
  'Taos':         join(GUIDES_DIR, 'taos-art-scene-galleries-guide.jpg'),
  'Denver':       join(GUIDES_DIR, 'denver-art-galleries-guide.jpg'),
  'Boulder':      join(GUIDES_DIR, 'denver-art-galleries-guide.jpg'),
  'Aspen':        join(GUIDES_DIR, 'aspen-art-galleries-guide.jpg'),
  'Marfa':        join(GUIDES_DIR, 'marfa-texas-art-guide.jpg'),
  'Moab':         join(GUIDES_DIR, 'utah-art-galleries-salt-lake-city-moab.jpg'),
  'Las Vegas':    join(GUIDES_DIR, 'las-vegas-art-galleries-guide.jpg'),
};

const STATE_FALLBACKS = {
  'AZ': join(STATES_DIR, 'arizona.jpg'),
  'NM': join(STATES_DIR, 'new-mexico.jpg'),
  'CO': join(STATES_DIR, 'colorado.jpg'),
  'TX': join(STATES_DIR, 'texas.jpg'),
  'UT': join(STATES_DIR, 'utah.jpg'),
  'NV': join(STATES_DIR, 'nevada.jpg'),
};

function extractOgImage(html) {
  const m =
    html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)?.[1] ||
    html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i)?.[1] ||
    html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i)?.[1] ||
    html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i)?.[1];
  return m || null;
}

async function fetchHtml(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 12000);
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

function downloadImage(imageUrl, destPath) {
  execSync(
    `curl -sL --max-time 20 -A "Mozilla/5.0" -o "${destPath}" "${imageUrl}"`,
    { stdio: 'pipe' }
  );
  // Check the file is a real image (>5KB)
  const size = parseInt(execSync(`wc -c < "${destPath}"`).toString().trim(), 10);
  if (size < 5000) throw new Error(`File too small (${size} bytes) — probably not a real image`);
}

function useFallback(cityName, stateCode, destPath) {
  const src = CITY_FALLBACKS[cityName] || STATE_FALLBACKS[stateCode];
  if (src && existsSync(src)) {
    copyFileSync(src, destPath);
    return true;
  }
  return false;
}

const events = await sql`
  SELECT e.id, e.slug, e.title, e.website_url, e.state_code,
         c.name AS city_name
  FROM events e
  LEFT JOIN cities c ON c.id = e.city_id
  WHERE e.event_date >= CURRENT_DATE
    AND e.image_url IS NULL
  ORDER BY e.id
`;

console.log(`Processing ${events.length} events…\n`);

let succeeded = 0;
let usedFallback = 0;
let failed = 0;

for (const ev of events) {
  const destPath = join(EVENTS_DIR, `${ev.slug}.jpg`);
  const localPath = `/events/${ev.slug}.jpg`;
  let source = 'web';

  try {
    // 1. Try to get og:image from the event website
    let imageUrl = null;
    if (ev.website_url) {
      try {
        const html = await fetchHtml(ev.website_url);
        const raw = extractOgImage(html);
        if (raw) {
          imageUrl = new URL(raw, ev.website_url).href;
        }
      } catch (e) {
        // site fetch failed — fall through to fallback
      }
    }

    if (imageUrl) {
      try {
        downloadImage(imageUrl, destPath);
      } catch {
        imageUrl = null; // download failed, use fallback
      }
    }

    // 2. Fallback to city/state image
    if (!imageUrl) {
      const ok = useFallback(ev.city_name, ev.state_code, destPath);
      if (!ok) throw new Error('No fallback available');
      source = 'fallback';
      usedFallback++;
    } else {
      succeeded++;
    }

    await sql`UPDATE events SET image_url = ${localPath} WHERE id = ${ev.id}`;
    console.log(`  ✓ [${source.padEnd(8)}] ${ev.title}`);
  } catch (err) {
    console.error(`  ✗ ${ev.title}: ${err.message}`);
    failed++;
  }

  await new Promise(r => setTimeout(r, 400));
}

console.log(`\nDone. Web scraped: ${succeeded}, Fallback used: ${usedFallback}, Failed: ${failed}`);
