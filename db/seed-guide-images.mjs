import { neon } from '@neondatabase/serverless';
import { execSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const GUIDES_DIR = join(__dirname, '..', 'public', 'guides');

const NEON_DB_KEY = process.env.NEON_DB_KEY;
if (!NEON_DB_KEY) { console.error('NEON_DB_KEY not set'); process.exit(1); }
const sql = neon(NEON_DB_KEY);

mkdirSync(GUIDES_DIR, { recursive: true });

const IMAGES = [
  { slug: 'best-art-galleries-santa-fe-new-mexico',          photo: 'photo-1704069447221-f4a1d910026d' },
  { slug: 'canyon-road-gallery-walk-santa-fe',               photo: 'photo-1660758858398-c24ef8c2ad61' },
  { slug: 'scottsdale-art-galleries-guide',                  photo: 'photo-1760030427736-0efbd3be1977' },
  { slug: 'sedona-art-galleries-guide',                      photo: 'photo-1583729476095-82e61108a043' },
  { slug: 'taos-art-scene-galleries-guide',                  photo: 'photo-1695596254299-c541eee4eef7' },
  { slug: 'denver-art-galleries-guide',                      photo: 'photo-1709689702529-6fa1f343e108' },
  { slug: 'native-american-art-collectors-guide-southwest',  photo: 'photo-1536266305399-b367feb671f9' },
  { slug: 'how-to-start-collecting-southwest-art',           photo: 'photo-1765135605193-7f272bbf3474' },
  { slug: 'tucson-art-galleries-guide',                      photo: 'photo-1532295039064-229629db1073' },
  { slug: 'aspen-art-galleries-guide',                       photo: 'photo-1524429656589-6633a470097c' },
  { slug: 'marfa-texas-art-guide',                           photo: 'photo-1618578907023-4595f150fc9f' },
  { slug: 'phoenix-art-galleries-first-friday-guide',        photo: 'photo-1706403222567-06fe8d8dc93e' },
  { slug: 'georgia-okeeffe-country-new-mexico-art-pilgrimage', photo: 'photo-1670884061517-644a13c0ee73' },
  { slug: 'las-vegas-art-galleries-guide',                   photo: 'photo-1581351721010-8cf859cb14a4' },
  { slug: 'contemporary-art-southwest-essential-spaces',     photo: 'photo-1518998053901-5348d3961a04' },
  { slug: 'southwest-photography-galleries-guide',           photo: 'photo-1513519245088-0e12902e5a38' },
  { slug: 'southwest-folk-art-craft-galleries-guide',        photo: 'photo-1651509244538-af2ed3b7dd46' },
  { slug: 'utah-art-galleries-salt-lake-city-moab',          photo: 'photo-1543682388-4b46a14c91db'  },
  { slug: 'albuquerque-art-galleries-guide',                 photo: 'photo-1612225468547-80ec4aa6b98c' },
  { slug: 'best-art-museums-american-southwest',             photo: 'photo-1697257378991-b57497dddc69' },
  { slug: 'santa-fe-taos-art-corridor-road-trip',            photo: 'photo-1634271350369-fb73e6cbe802' },
  { slug: 'western-art-galleries-cowboy-tradition-southwest', photo: 'photo-1779372928165-8b1b02efa6ea' },
  { slug: 'art-galleries-flagstaff-arizona',                 photo: 'photo-1669269474009-7187441c003f' },
  { slug: 'southwest-art-road-trip-phoenix-to-denver',       photo: 'photo-1509316785289-025f5b846b35' },
  { slug: 'scottsdale-thursday-art-walk-guide',              photo: 'photo-1749410351764-660ebd165f63' },
];

let downloaded = 0;
let dbUpdated = 0;
let failed = 0;

for (const { slug, photo } of IMAGES) {
  const destFile = join(GUIDES_DIR, `${slug}.jpg`);
  const cdnUrl = `https://images.unsplash.com/${photo}?w=800&h=500&fit=crop&q=80`;
  const localPath = `/guides/${slug}.jpg`;

  try {
    execSync(
      `curl -sL --max-time 30 -A "Mozilla/5.0" -o "${destFile}" "${cdnUrl}"`,
      { stdio: 'pipe' }
    );
    downloaded++;
    console.log(`  ✓ downloaded → ${slug}.jpg`);
  } catch (err) {
    console.error(`  ✗ download failed for ${slug}: ${err.message}`);
    failed++;
    continue;
  }

  try {
    await sql`
      UPDATE posts
      SET hero_image_url = ${localPath}
      WHERE slug = ${slug}
    `;
    dbUpdated++;
  } catch (err) {
    console.error(`  ✗ DB update failed for ${slug}: ${err.message}`);
  }
}

console.log(`\nDone. Downloaded: ${downloaded}, DB updated: ${dbUpdated}, Failed: ${failed}`);
