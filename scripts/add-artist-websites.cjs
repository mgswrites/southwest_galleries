const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.NEON_DB_KEY);

const websites = [
  { slug: 'melanie-yazzie',   url: 'https://yazziestudio.com/' },
  { slug: 'shonto-begay',     url: 'https://shontobegay.net/' },
  { slug: 'tom-lea',          url: 'https://www.tomlea.com/' },
  { slug: 'peter-hurd',       url: 'https://www.hurdgallery.com/peter-hurd' },
  { slug: 'bruce-nauman',     url: 'https://gagosian.com/artists/bruce-nauman/' },
  { slug: 'emmi-whitehorse',  url: 'https://www.garthgreenan.com/artists/emmi-whitehorse' },
  { slug: 'howard-terpning',  url: 'https://cowboyartistsofamerica.com/caa-artists/howard-terpning/' },
];

async function run() {
  for (const { slug, url } of websites) {
    const result = await sql`
      UPDATE artists SET website_url = ${url} WHERE slug = ${slug} RETURNING name
    `;
    if (result.length) {
      console.log(`  ✓ ${result[0].name} → ${url}`);
    } else {
      console.log(`  ✗ not found: ${slug}`);
    }
  }
  console.log('Done.');
  process.exit(0);
}

run().catch(e => { console.error(e.message); process.exit(1); });
