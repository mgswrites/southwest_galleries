const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.NEON_DB_KEY);

const websites = {
  'allan-houser':          'https://allanhouser.com',
  'amado-pena':            'https://penagallery.com',
  'billy-schenck':         'https://www.billyschenck.com',
  'ed-mell':               'https://www.edmellpaintings.com',
  'fritz-scholder':        'https://www.fritzscholder.com',
  'glenna-goodacre':       'https://glennagoodacre.com',
  'jaune-quick-to-see-smith': 'https://jaunequick-to-seesmith.com',
  'john-coleman':          'https://colemanstudios.com',
  'kevin-red-star':        'https://kevinredstar.com',
  'maynard-dixon':         'https://www.maynarddixon.org',
  'nora-naranjo-morse':    'https://noranaranjomorse.squarespace.com',
  'roxanne-swentzell':     'https://www.roxanneswentzell.net',
  'tony-abeyta':           'https://www.tonyabeyta.com',
};

async function run() {
  const slugs = Object.keys(websites);
  console.log(`Updating ${slugs.length} artist websites...`);
  for (const slug of slugs) {
    const url = websites[slug];
    const result = await sql`
      UPDATE artists SET website_url = ${url} WHERE slug = ${slug} RETURNING name
    `;
    const name = result[0]?.name ?? slug;
    console.log(`  ${name} → ${url}`);
  }
  console.log('Done.');
}

run().catch(console.error);
