const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.NEON_DB_KEY);

const descriptions = {
  // Cedar City
  'braithwaite-fine-arts-gallery': `<p>The Braithwaite Fine Arts Gallery serves as the art museum of Southern Utah University, presenting rotating exhibitions of regional and national contemporary art in the heart of Cedar City. Its permanent collection and visiting shows bring serious contemporary work to an area best known as home to the Utah Shakespeare Festival, making it an unexpected and rewarding stop for travelers exploring the Colorado Plateau. The gallery functions as a true cultural anchor for the communities of southern Utah, connecting local audiences to a broader art world.</p>`,

  // Moab
  'desert-thread-gallery-moab': `<p>Desert Thread Gallery in Moab celebrates fiber arts, weaving, and textile work rooted in the landscape and cultures of the Colorado Plateau. Showcasing both Native American master weavers and contemporary fiber artists, the gallery offers visitors a tactile, intimate counterpoint to the monumental canyon scenery just outside its doors. It occupies a distinctive niche in Utah's gallery scene — one where craft tradition and contemporary practice meet in work that feels genuinely of this place.</p>`,

  'gallery-moab-moab': `<p>Gallery Moab presents fine art photography, painting, and sculpture inspired by the dramatic canyon country of southeastern Utah. Artists represented here work with the crimson walls of Arches, the serpentine Colorado River, and the vast sky overhead as their primary subjects, producing work that captures the emotional intensity of one of America's most striking landscapes. For visitors spending time in Moab, the gallery offers a way to bring that landscape home in permanent form.</p>`,

  'moab-arts-and-recreation-center-moab': `<p>The Moab Arts and Recreation Center serves as the creative heart of Moab's arts community, functioning as gallery, studio, and performance venue in one. Rotating exhibitions showcase regional artists working across disciplines, while workshops and community events draw locals and visitors alike into active participation. It is the kind of community arts institution that sustains creative life in small Western towns — unpretentious, welcoming, and essential to the fabric of the place.</p>`,

  // Ogden
  'eccles-community-art-center': `<p>The Eccles Community Art Center occupies one of Ogden's most beautiful buildings — a magnificent 1893 Victorian mansion that once belonged to the prominent Eccles family and now serves northern Utah as its premier arts institution. Gallery spaces across multiple rooms present rotating exhibitions spanning painting, sculpture, photography, and craft, with an annual juried show that draws entries from across the region. The center functions as the cultural anchor of Ogden's arts community and a must-visit for anyone passing through the northern Wasatch Front.</p>`,

  'weber-state-university-galleries': `<p>Weber State University's gallery program encompasses the Shaw Gallery and the Kimball Visual Arts Center, together presenting rotating exhibitions of contemporary art alongside displays from the university's permanent collection. The galleries bring significant regional and national work to Ogden's university community while remaining open to the broader public — fulfilling the civic role that university art museums play best. Faculty and student shows are balanced with visiting exhibitions that place WSU's program in conversation with the wider art world.</p>`,

  // Park City
  'coda-gallery': `<p>Coda Gallery specializes in abstract and contemporary painting, sculpture, and fine art glass by nationally recognized artists, presenting work of genuine quality in Park City's competitive gallery landscape. Its focus on abstraction and studio glass distinguishes it from neighboring Western-themed galleries, attracting collectors who come to Park City's Main Street looking for something beyond the expected. The gallery has built a reputation over years for intelligent programming and relationships with artists working at the edge of their disciplines.</p>`,

  'kimball-art-center': `<p>The Kimball Art Center is Park City's flagship contemporary art institution, presenting ambitious rotating exhibitions, commissioning public art, and producing the acclaimed Park City Kimball Arts Festival each August — one of the most prestigious outdoor art events in the Mountain West. The center functions as the cultural counterpart to the Sundance Film Festival, positioning Park City as a serious destination for the arts year-round rather than only during ski season. Its programming brings nationally significant work to a community with the collector base and cultural appetite to support it.</p>`,

  'meyer-gallery': `<p>Meyer Gallery is one of Park City's most established commercial galleries, presenting Western contemporary painting and sculpture by a roster of regional and national artists. With a focus on work that captures the spirit and landscape of the American West, Meyer has built decades of relationships with serious collectors who return each season — during both the ski and summer festival circuits — trusting the gallery's eye and access to significant artists. It is a cornerstone of Park City's Main Street gallery scene.</p>`,

  'terzian-galleries': `<p>Terzian Galleries brings a distinct emphasis on works on paper, sculpture, and painting rooted in American realism and the plein air tradition to Park City's Main Street. With more than two decades of operation, the gallery has established deep relationships with collectors who prize draftsmanship and the direct study of light and landscape. Its inventory runs from intimate drawings to large-scale canvases, offering serious collectors access to work across price points while maintaining a consistently high standard of quality and presentation.</p>`,

  'winn-slavin-fine-art': `<p>Winn Slavin Fine Art represents contemporary painters and sculptors working in realist and impressionist traditions, presenting work with warmth and curatorial precision in one of Park City's most welcoming gallery spaces. The gallery has cultivated a loyal following among collectors who appreciate both the quality of the work and the personal relationships fostered by its proprietors over many years. It offers a grounded, human-scaled alternative to the larger commercial operations on Main Street.</p>`,

  // Provo
  'byu-museum-of-art': `<p>The BYU Museum of Art is one of the largest and most significant art museums in the American West, with a permanent collection of over 17,000 works spanning the full breadth of world art history. It holds an internationally recognized collection of paintings by Danish-American religious artist Carl Bloch, significant Rembrandt etchings, and a strong survey of 19th-century European masters — all presented free of charge to the public. The museum's scale and quality consistently surprise first-time visitors, making it one of the great under-visited cultural destinations in the entire region.</p>`,

  'covey-center-for-the-arts': `<p>The Covey Center for the Arts serves as Provo's primary multipurpose arts venue, presenting visual art exhibitions in its gallery spaces alongside a full calendar of performing arts programming. As the creative and civic hub of Utah County, it connects the university community with the broader public through exhibitions, classes, and events that reflect the full range of artistic practice. The center represents a genuine investment by Provo in the cultural life of its citizens and the surrounding communities of the Wasatch Front.</p>`,

  // Salt Lake City
  'art-access-gallery': `<p>Art Access Gallery is one of the country's most distinctive nonprofit arts organizations, dedicated since 1989 to artists with disabilities and artists whose work addresses the experience of disability. Among the longest-running disability arts organizations in the United States, it presents exhibitions of genuine artistic ambition alongside community residencies and accessible programming that challenges the mainstream art world's assumptions about who makes art and whose work deserves serious attention. Its location in Salt Lake City positions it within a state arts scene that has benefited from its presence and advocacy for decades.</p>`,

  'finch-lane-gallery-salt-lake-city': `<p>Finch Lane Gallery is Salt Lake City's nonprofit municipal gallery, presenting rotating contemporary exhibitions by local and regional artists in a welcoming, community-oriented setting within Liberty Park. Operated by Salt Lake City Arts Council, it provides a vital platform for Utah artists at all career stages, offering accessible exhibition opportunities and bringing free programming to one of the city's most beloved public green spaces. It is the kind of institution that quietly sustains a regional art scene across generations.</p>`,

  'gilgal-sculpture-garden': `<p>Gilgal Sculpture Garden is one of the most singular and strange outdoor art environments in the American West — a free public garden created over two decades by Salt Lake City stonemason Thomas Child, who carved twelve major granite works charged with Latter-day Saint symbolism and personal vision. The centerpiece is an Egyptian sphinx bearing the face of Joseph Smith, but the entire garden pulses with an outsider intensity that defies easy categorization. Designated a Salt Lake City landmark and maintained by a preservation foundation, it is essential viewing for anyone interested in American folk art, vernacular religion, or the unclassifiable.</p>`,

  'granary-arts': `<p>Granary Arts anchors Salt Lake City's emerging Granary District, presenting experimental and emerging contemporary art in the kind of raw industrial space that has historically nurtured avant-garde scenes in cities across the country. As both an exhibition venue and an organizational force, it actively nurtures the creative neighborhood developing on the city's south side — attracting artists, studios, and cultural energy to a district undergoing genuine transformation. It represents the leading edge of Salt Lake City's contemporary art scene.</p>`,

  'phillips-gallery-salt-lake-city': `<p>Phillips Gallery is Utah's oldest continuously operating commercial gallery, presenting contemporary art and actively supporting Utah artists since its founding in 1965. More than six decades of operation have made it an institution of genuine cultural significance — a place where multiple generations of Utah artists have had formative exhibitions and where collectors have built relationships and collections over lifetimes. Its longevity is itself a form of service to Utah's creative community, providing continuity and institutional memory that newer galleries cannot replicate.</p>`,

  'rio-gallery': `<p>The Rio Gallery occupies one of Salt Lake City's most spectacular settings: the grand waiting hall of the 1910 Rio Grande Depot, a Beaux-Arts landmark whose soaring ceilings and ornate detailing provide an extraordinary backdrop for rotating exhibitions of work by Utah artists. Operated by the Utah Division of Arts and Museums, it offers free admission and a programming mandate that spans the full range of media and career stages represented in Utah's creative community. It is among the most memorable gallery experiences in the state, as much for the building as for what hangs within it.</p>`,

  'utah-museum-of-contemporary-art': `<p>The Utah Museum of Contemporary Art — known as UMOCA — traces its roots to the Salt Lake Art Center founded in 1931, making it one of the oldest contemporary art institutions in the Mountain West. Today it serves as Utah's flagship museum dedicated exclusively to modern and contemporary art, presenting rotating exhibitions, public programs, and artist residencies free of charge in the heart of downtown Salt Lake City. UMOCA's programming consistently brings nationally significant contemporary work to Utah while platforming regional voices within a broader art world context.</p>`,

  'utah-museum-of-fine-arts-salt-lake-city': `<p>The Utah Museum of Fine Arts on the University of Utah campus is the state's comprehensive encyclopedic art museum, with a collection spanning more than 5,000 years of world art history — from ancient Egyptian artifacts through contemporary American work. It is Utah's primary resource for art education at every level, offering free admission to all Utah K-12 students and maintaining active outreach programs across the state. The permanent collection's breadth, from European old masters to significant works by Utah artists, makes it an indispensable cultural institution for the region.</p>`,

  // Springville
  'springville-museum-of-art': `<p>The Springville Museum of Art functions as Utah's de facto state art museum, holding a collection of over 2,000 works that constitutes the finest survey of Utah's artistic heritage anywhere in existence — spanning pioneer-era painters through the contemporary moment and housed free in a beloved 1937 Spanish Colonial Revival building. Its annual National Art Exhibition is one of the oldest juried shows in the West, and its holdings of work by Utah modernists including LeConte Stewart, Lee Greene Richards, and Donald Beauregard are unmatched. For anyone seeking to understand the full arc of art-making in Utah, Springville is the essential starting point.</p>`,

  // St. George
  'sears-art-museum': `<p>The Sears Art Museum at Utah Tech University presents rotating exhibitions with a distinctive focus on the art of the American West and the landscapes, cultures, and light of the Colorado Plateau. As one of the most geographically and culturally specific small university museums in the Southwest, it brings serious curatorial attention to the visual traditions of a region that mainstream art institutions have often overlooked. Located in St. George at the gateway to Zion and Bryce Canyon country, it rewards visitors who take time from the national parks to engage with the human artistic response to this extraordinary landscape.</p>`,

  'st-george-art-museum': `<p>The St. George Art Museum serves as the primary fine arts museum of southern Utah, presenting rotating exhibitions of regional and national art in a purpose-built downtown facility that anchors the cultural life of Washington County. As the region around St. George has grown into one of the fastest-expanding metropolitan areas in the United States, the museum has emerged as an increasingly important institution — providing cultural infrastructure for a community building its civic identity and serving as a gateway to the art of the broader Colorado Plateau region.</p>`,
};

async function run() {
  const slugs = Object.keys(descriptions);
  console.log(`Updating ${slugs.length} Utah listings...`);
  for (const slug of slugs) {
    await sql`
      UPDATE listings
      SET full_description = ${descriptions[slug]}
      WHERE slug = ${slug}
    `;
    process.stdout.write('.');
  }
  console.log('\nDone.');
}

run().catch(console.error);
