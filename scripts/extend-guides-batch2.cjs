const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.NEON_DB_KEY);

const extensions = [
  {
    slug: 'bisbee-arizona-art-guide',
    append: `

What distinguishes Bisbee from other small arts towns is its authenticity. The community here did not arrive through a deliberate civic branding campaign or a tourism board strategy. Artists came because the rent was low and the town was beautiful and strange, and they stayed because the community that formed around them turned out to be genuinely sustaining. The galleries and studios of Old Bisbee reflect real working lives rather than calculated market positioning, and that difference is palpable to any visitor who spends more than an afternoon here.

The art that gets made in Bisbee bears the imprint of the place: the quality of desert light at altitude, the sense of physical compression that comes from living in a canyon, the omnipresence of the mountains, and the particular social texture of a community small enough that every creative decision happens in public. It is worth visiting not just for what you might buy or see, but for what Bisbee teaches about how art communities actually form and sustain themselves against economic odds.`,
  },
  {
    slug: 'palm-springs-art-galleries-guide',
    append: `

For visitors planning an art-focused trip to the Coachella Valley, the combination of the Palm Springs Art Museum, the Agua Caliente Cultural Museum, and the gallery district along North Palm Canyon Drive can fill two full days without repetition. Add a morning at Sunnylands and an afternoon on El Paseo in Palm Desert, and the valley reveals itself as a genuinely substantial art destination — one that rewards the visitor who arrives with curiosity rather than simply a checklist.

The desert light of the Coachella Valley has its own quality distinct from the high-altitude light of northern New Mexico or the canyon country of Utah. Filtered through the San Jacinto Mountains that rise abruptly from the valley floor, the afternoon light in Palm Springs is soft and warm and extraordinarily flattering to color — which may explain, at least in part, why so many artists have chosen to live and work here, and why the galleries along Palm Canyon Drive tend to show work in which color is doing significant expressive work.`,
  },
];

async function run() {
  for (const { slug, append } of extensions) {
    const [row] = await sql`SELECT id, content FROM posts WHERE slug = ${slug}`;
    if (!row) { console.log(`Not found: ${slug}`); continue; }

    const newContent = row.content + append;
    const wordCount = newContent.split(/\s+/).length;

    await sql`UPDATE posts SET content = ${newContent} WHERE id = ${row.id}`;
    console.log(`  ✓ ${slug} — now ${wordCount} words`);
  }
  console.log('Done.');
  process.exit(0);
}

run().catch(e => { console.error(e.message); process.exit(1); });
