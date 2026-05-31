const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.NEON_DB_KEY);

const descriptions = {
  'overland-gallery-of-fine-art-scottsdale': `Overland Gallery of Fine Art has been one of Old Town Scottsdale's most respected representational galleries for decades, presenting paintings and sculpture by accomplished American artists working in the realist tradition. The gallery's program spans Western landscape, figurative work, and wildlife art — genres that have deep roots in the Arizona gallery scene — with an emphasis on artists who combine technical rigor with genuine feeling for the land and its subjects.

The roster includes both established names and carefully selected emerging voices, united by a shared commitment to the craft of observation and a love of the physical world. Works range from intimate oil studies of the Sonoran Desert to monumental bronze sculptures of horses, cattle, and the working cowboy. The gallery's Old Town location places it at the center of Scottsdale's historic gallery district, steps from the Thursday evening ArtWalk that draws collectors from across the country.

Overland Gallery hosts regular artist receptions, preview events for major Western art auctions held annually in Scottsdale, and occasional themed exhibitions exploring the evolving tradition of American representational painting. For collectors new to this genre, the staff offers knowledgeable guidance on artists, acquisition strategy, and the current market for fine Western and American realist art.`,

  'cuac-contemporary-utah-art-center-salt-lake-city': `CUAC — the Contemporary Utah Art Center — is Salt Lake City's leading nonprofit exhibition space for experimental and challenging contemporary art, dedicated specifically to supporting the work of Utah-based artists. Founded to fill a gap in Utah's institutional landscape, CUAC operates outside the commercial gallery model, giving artists the freedom to take risks, explore difficult subjects, and present work that might not find a natural home in a sales-driven environment.

The programming spans painting, sculpture, video, performance, and installation, with particular emphasis on work that pushes against expectations — both artistic and social. CUAC has consistently championed artists from underrepresented communities in Utah, including Indigenous artists, immigrant artists, and LGBTQ+ voices, making it one of the most genuinely pluralistic arts institutions in the Mountain West.

Beyond exhibitions, CUAC operates artist residencies, public programs, and educational initiatives that connect working artists with broader Salt Lake City audiences. Its downtown location and nonprofit mission make it a vital anchor for Utah's contemporary art ecosystem — a place where risk-taking is not just tolerated but considered essential to the center's reason for being.`,
};

async function run() {
  for (const [slug, desc] of Object.entries(descriptions)) {
    const result = await sql`UPDATE listings SET full_description = ${desc} WHERE slug = ${slug} RETURNING name`;
    console.log('✓', result[0].name);
  }
  console.log('Done.');
  process.exit(0);
}

run().catch(e => { console.error(e.message); process.exit(1); });
