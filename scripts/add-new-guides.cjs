const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.NEON_DB_KEY);

const guides = [
  {
    slug: 'taos-art-galleries-guide',
    title: 'Taos Art Galleries: A Complete Guide to the Historic Art Capital',
    excerpt: 'From the Taos Society of Artists to the thriving contemporary scene, Taos has been one of America\'s most important art destinations for over a century. Here\'s how to experience it.',
    state_code: 'NM',
    content: `<p>Taos, New Mexico, has been drawing artists since the late nineteenth century, when a group of painters — including Ernest Blumenschein, Bert Geer Phillips, and Joseph Henry Sharp — arrived and found a landscape and a community that transformed everything they thought they knew about American art. More than a century later, Taos is still one of the most concentrated and vital art communities in the country, a small mountain town where galleries outnumber gas stations and serious art is taken as seriously as anywhere on earth.</p>

<h2>The Taos Society of Artists and the Historic Foundation</h2>

<p>The Taos Society of Artists, founded in 1915, established the town's reputation as a place where American painters could find subject matter — the land, the Pueblo people, the Spanish colonial culture — that had no equivalent anywhere else in the country. The six founding members and their successors produced work that changed American painting, bringing a new palette and a new set of subjects into a tradition that had been looking almost entirely to Europe for its standards and inspiration.</p>

<p>The legacy of the Society is alive throughout Taos today. The Harwood Museum of Art, operated by the University of New Mexico, holds a significant collection of Taos Society paintings alongside contemporary work by artists who have continued the tradition of making Taos their home. The Taos Art Museum at Fechin House preserves the extraordinary adobe home and studio of the Russian-born painter Nicolai Fechin, a masterpiece of carved woodwork that is as much a work of art as anything hanging on its walls.</p>

<h2>The Galleries of Taos Today</h2>

<p>Taos has roughly eighty galleries for a town of fewer than six thousand residents — a concentration of art space that reflects the extraordinary number of working artists who have made this mountain community their home. The galleries cluster in a few distinct areas: the historic Plaza and its immediate surroundings, the Ledoux Street corridor leading south from the Plaza, and the sprawling Ranchos de Taos district anchored by the famous church whose adobe bulk has been painted by Georgia O'Keeffe and photographed by Ansel Adams.</p>

<p>The range of work available in Taos spans the full breadth of Southwest art: traditional landscapes in the plein air tradition, Pueblo pottery and jewelry from Indigenous artists, cutting-edge contemporary installation, and everything in between. The town's long history of welcoming artists from diverse backgrounds has produced a gallery scene that is genuinely eclectic — you can find work by established names with national reputations in the same block as emerging artists selling directly from their studios.</p>

<h2>Taos Pueblo and Indigenous Art</h2>

<p>Taos Pueblo, the UNESCO World Heritage Site that has been continuously inhabited for over a thousand years, is a few miles north of the town center and is both a living community and one of the most significant cultural sites in the Western Hemisphere. The Pueblo artists who live and work there — producing pottery, jewelry, drums, and paintings rooted in Pueblo tradition — are part of a living cultural continuum that predates the Taos Society by many centuries.</p>

<p>When visiting Taos, engaging respectfully with Pueblo art and artists is essential. Several galleries in the town specialize in work by Taos Pueblo and other Pueblo artists, and the Taos Pueblo itself periodically opens its studio spaces to visitors. The distinction between work made by Pueblo artists and work made about or inspired by Pueblo culture is important to understand: genuine Pueblo art carries a cultural weight and authenticity that imitations and appropriations cannot match.</p>

<h2>The Taos Art Walk and Annual Events</h2>

<p>Taos hosts a gallery walk on the second Friday of each month, when galleries stay open late and many artists are present in their spaces — an excellent opportunity to meet the people behind the work and understand the community that produces it. The summer and fall seasons are particularly active, with the Taos Fall Arts Festival drawing collectors and visitors from around the country and many galleries mounting their most ambitious exhibitions of the year.</p>

<p>The Taos Wool Festival in October celebrates the weaving traditions of the region, with work by Indigenous, Hispanic, and non-Indigenous weavers displayed and sold alongside demonstrations of traditional techniques. The Fiestas de Taos in July mark the town's Spanish colonial heritage with music, dance, and art, creating a cultural event that connects the present to centuries of history.</p>

<h2>Planning Your Visit</h2>

<p>Taos is about an hour and a half north of Santa Fe and about three hours north of Albuquerque, making it an easy day trip from either city or a destination in its own right. The most comfortable seasons to visit are late spring, summer, and early fall; the winters are beautiful but cold, and some galleries reduce their hours. The altitude — Taos sits at about 6,969 feet — is worth keeping in mind for visitors from lower elevations.</p>

<p>A thorough visit to the galleries of Taos takes at least two days. The Plaza galleries, the Harwood Museum, the Fechin House, and the galleries along Ledoux Street can occupy a full day; the Taos Pueblo, the galleries of the Ranchos de Taos district, and the studio visits possible with some advance arrangement fill another. For serious collectors or students of American art, Taos rewards a longer stay.</p>`,
    meta_title: 'Taos Art Galleries: A Complete Guide | Southwest Galleries',
    meta_description: 'Explore the galleries, museums, and art community of Taos, New Mexico — one of America\'s most historic and vital art destinations, from the Taos Society of Artists to today.',
  },
  {
    slug: 'southwest-art-collecting-guide',
    title: 'How to Collect Southwest Art: A Practical Buyer\'s Guide',
    excerpt: 'Whether you\'re buying your first piece or building a serious collection, Southwest art offers extraordinary range and depth. Here\'s what experienced collectors know.',
    state_code: null,
    content: `<p>Southwest art encompasses one of the most diverse and historically rich collecting categories in American art — spanning centuries of Indigenous artistic tradition, the Spanish colonial heritage of New Mexico and Texas, the modernist revolution of the Taos and Santa Fe schools, and a vibrant contemporary scene that continues to produce work of international significance. For the new collector, this breadth can feel overwhelming. For the experienced collector, it is endlessly rewarding.</p>

<h2>Know the Territory Before You Buy</h2>

<p>The single most important thing any collector can do before purchasing Southwest art is to look at a lot of it — in galleries, in museums, at auctions, and in other collectors' homes. The Southwest has extraordinary institutional resources for this kind of looking. The Heard Museum in Phoenix, the Museum of Fine Arts New Mexico in Santa Fe, the Denver Art Museum, the Amon Carter Museum in Fort Worth, and the Smithsonian's National Museum of the American Indian all hold major collections that span the history of the region's art. Spending time with these collections gives you the visual education that no book or article can provide.</p>

<p>Gallery owners and directors are generally happy to talk with serious potential collectors, and the galleries of Santa Fe, Scottsdale, and Taos represent generations of curatorial knowledge about the artists they represent. Don't be shy about asking questions — about an artist's background, their market history, what distinguishes their best work from their average work, and what the gallery thinks will hold or increase in value.</p>

<h2>Collecting Indigenous Art: Responsibilities and Resources</h2>

<p>Collecting Indigenous Southwest art carries specific responsibilities that are worth understanding before you begin. The Indian Arts and Crafts Act of 1990 makes it illegal to misrepresent work as produced by a Native American artist if it was not, meaning that labels and certifications from reputable galleries carry legal weight. When buying from a gallery, ask about the artist's tribal enrollment and ensure the gallery can document the work's authenticity.</p>

<p>Building relationships with Indigenous artists directly — through studio visits, cultural events, and the galleries that represent them — is both the most ethically sound and the most personally rewarding way to collect this category of work. The Santa Fe Indigenous art market held annually on the Plaza in August is one of the most significant opportunities for direct engagement with artists from across the country, with hundreds of juried artists selling work of certified authenticity in a community context.</p>

<p>Approach this area of collecting with humility and genuine curiosity. Learn about the cultural context of the work you're considering — what a Hopi kachina carving means within Hopi ceremonial life, what distinguishes Diné (Navajo) weaving traditions by region and period, what the Pueblo pottery traditions of different villages produce and how they differ. This knowledge will make you a better collector and a more respectful participant in a living cultural tradition.</p>

<h2>Understanding the Market</h2>

<p>Southwest art has distinct market segments that operate differently from one another. The market for historic work by Taos Society of Artists painters, early twentieth-century Pueblo pottery, and classic Diné weaving is well-established, with auction records going back decades and significant institutional scholarship supporting valuations. Work at this level requires careful provenance research and, for major purchases, independent appraisal.</p>

<p>The contemporary market — work by living artists represented by galleries in Santa Fe, Scottsdale, and other Southwest centers — operates through gallery pricing rather than auction, with values established by the gallery's relationships, the artist's exhibition history, and the collector community's assessment of the work's significance. Here, the relationships you build with galleries and artists are themselves a form of market knowledge.</p>

<p>The Western art auction market — centered on annual sales in Scottsdale, Denver, and other cities — offers another entry point, particularly for representational work in the cowboy, wildlife, and landscape traditions. Major auction houses hold dedicated Western art sales that can offer both opportunities for acquisition and useful data on current market values.</p>

<h2>Caring for Your Collection</h2>

<p>Southwest art encompasses an unusually wide range of media, each with specific care requirements. Pueblo pottery should be handled with clean hands, kept out of direct sunlight, and never washed with soap. Historic textiles — Diné weavings, Pueblo blankets, Hispanic colchas — require careful storage away from light and moisture, and should never be hung in direct sunlight. Oil paintings on canvas require stable temperature and humidity, while works on paper need UV-filtering glazing and archival matting. When in doubt, consult a conservator.</p>

<p>Documentation is essential. Keep records of purchase receipts, provenance information, exhibition history, and any written materials the gallery or artist provided with the work. This documentation supports both insurance valuation and future resale, and it becomes increasingly important as your collection grows.</p>

<h2>Building Relationships, Not Just a Collection</h2>

<p>The most satisfying Southwest art collections are built over time through relationships — with galleries, artists, curators, and other collectors. The Southwest art world is smaller and more intimate than the major urban contemporary art scenes, and it rewards sustained engagement. Attending openings, supporting the institutions that preserve and promote the region's art, and treating the artists and galleries you work with as genuine partners rather than vendors will make both your collecting experience and your collection richer than any single transaction can.</p>`,
    meta_title: 'How to Collect Southwest Art: A Buyer\'s Guide | Southwest Galleries',
    meta_description: 'A practical guide to collecting Southwest art — from Indigenous pottery and weaving to contemporary painting and sculpture. What experienced collectors know.',
  },
  {
    slug: 'durango-cortez-colorado-art-guide',
    title: 'Southwest Colorado Art: Galleries in Durango, Cortez, and Mesa Verde Country',
    excerpt: 'The Four Corners region anchored by Durango and Cortez is home to a vibrant gallery scene, extraordinary Indigenous cultural sites, and some of the most dramatic landscape art in the Southwest.',
    state_code: 'CO',
    content: `<p>Southwest Colorado — the Four Corners region anchored by Durango and spreading west toward Cortez and the Utah border — is one of the most visually extraordinary and culturally significant areas in the American Southwest. It is also, for many visitors, a revelation: a gallery scene and arts community of genuine depth and ambition, set against the backdrop of Mesa Verde, the San Juan Mountains, and the ancient archaeological landscape of the Colorado Plateau.</p>

<h2>Durango: The Gallery Hub of Southwest Colorado</h2>

<p>Durango, the largest city in southwest Colorado with a population of just over eighteen thousand, punches well above its weight in galleries and cultural institutions. Its historic Main Avenue corridor is lined with galleries ranging from traditional Western and wildlife art to contemporary abstraction, and the city's combination of university culture (Fort Lewis College), outdoor recreation, and proximity to dramatic landscape has attracted a significant population of working artists.</p>

<p>The galleries of Durango reflect the full range of Southwest art: plein air landscape paintings capturing the San Juan Mountains in all seasons, bronze sculpture in the Western figurative tradition, contemporary mixed-media work that engages the Indigenous cultural heritage of the region, and ceramics rooted in both the Pueblo tradition and contemporary studio practice. Several galleries specialize specifically in work by Indigenous artists from the Four Corners region, providing an important market and platform for Diné (Navajo), Pueblo, and Ute artists.</p>

<p>The Durango Arts Center presents contemporary exhibitions and operates community arts programs that keep the city's creative culture connected to its broader population. The Center of Southwest Studies at Fort Lewis College houses one of the most significant research collections on the history and culture of the Four Corners region, including a substantial collection of Indigenous art and artifacts.</p>

<h2>Cortez and the Mesa Verde Gateway</h2>

<p>Cortez, a smaller community about forty-five miles west of Durango, serves as the primary gateway to Mesa Verde National Park — the most significant archaeological site in the United States, preserving the cliff dwellings and cultural heritage of the Ancestral Pueblo people who inhabited the area for over seven hundred years. The Cortez Cultural Center presents rotating exhibitions of Indigenous and regional art alongside cultural programming that connects the living traditions of the Pueblo, Navajo, and Ute peoples to the deep archaeological heritage of the region.</p>

<p>The Ute Mountain Ute Tribal Park, adjacent to Mesa Verde, offers guided tours of archaeological sites accessible only with a tribal guide — an experience that brings visitors into direct relationship with the descendants of the people who built and inhabited these extraordinary structures. The Ute Mountain Casino and Resort features significant Indigenous art throughout its public spaces, and the tribe operates art programs that support contemporary Ute artists.</p>

<h2>Mesa Verde and the Ancient Artistic Tradition</h2>

<p>Mesa Verde National Park itself contains one of the world's great collections of ancient art — the pottery, petroglyphs, pictographs, and architectural design of the Ancestral Pueblo people who built Cliff Palace, Balcony House, and hundreds of other structures across the mesa. The Chapin Mesa Archeological Museum within the park presents this material with clarity and depth, and the experience of standing before Cliff Palace at dawn or dusk, watching the light change on the sandstone, is as profound an aesthetic experience as any gallery can offer.</p>

<p>The influence of Ancestral Pueblo design — its geometric patterns, its color relationships, its integration of structure with landscape — runs through the entire tradition of Southwest art, from the pottery of the historic Pueblos to the paintings of contemporary Indigenous artists like Dan Namingha. Understanding Mesa Verde is understanding one of the deep sources of the region's visual culture.</p>

<h2>Telluride and the Mountain Art Scene</h2>

<p>An hour north of Cortez through some of the most spectacular mountain scenery in Colorado, Telluride has developed a cultural life that belies its small size. The Telluride Arts District supports a year-round gallery program, and the Telluride Film Festival, Bluegrass Festival, and other major annual events create an audience for contemporary art that sustains a genuinely ambitious gallery scene. Several galleries in Telluride focus specifically on contemporary work by regional artists, and the town's combination of wealth and sophistication supports prices and quality that rival any major urban market.</p>

<h2>Planning Your Visit to Southwest Colorado</h2>

<p>The best seasons to visit Southwest Colorado for art and culture are late spring through early fall, when the mountain passes are open, the weather is warm, and the galleries are fully staffed. The fall color season — typically mid-September through mid-October — is one of the most spectacular in North America, and many galleries and artists gear their programming around this peak visitor period. Durango's Main Avenue is walkable and can be covered thoroughly on foot; visits to Cortez, Mesa Verde, and Telluride require a car.</p>

<p>Combining a visit to the galleries of Durango with Mesa Verde and Cortez makes for one of the most culturally rich two-or-three-day itineraries in the Southwest — one that connects the living art of the present to one of the most extraordinary artistic and architectural legacies in human history.</p>`,
    meta_title: 'Southwest Colorado Art: Durango, Cortez & Mesa Verde Country | Southwest Galleries',
    meta_description: 'Discover the galleries of Durango and Cortez, Colorado, and the ancient artistic heritage of Mesa Verde. Southwest Colorado\'s art scene is deeper than you might expect.',
  },
  {
    slug: 'santa-fe-museum-hill-guide',
    title: 'Santa Fe Museum Hill: The Complete Visitor\'s Guide',
    excerpt: 'Four world-class museums within easy walking distance of each other — Museum Hill is the greatest concentration of cultural institutions in the Southwest. Here\'s how to make the most of a visit.',
    state_code: 'NM',
    content: `<p>Museum Hill in Santa Fe is one of the great cultural concentrations in the American Southwest — four world-class institutions within easy walking distance of each other, set on a ridge southeast of the historic Plaza with views across the city to the Jémez Mountains in the west and the Sangre de Cristo range to the north and east. For anyone interested in the art, culture, and history of the Southwest, a day on Museum Hill is essential. For the serious collector or student of art, it deserves multiple visits.</p>

<h2>The Museum of International Folk Art</h2>

<p>The Museum of International Folk Art holds the largest collection of folk art in the world — more than 130,000 objects spanning every inhabited continent — and its main gallery, the Girard Wing, is one of the most exhilarating and disorienting exhibition spaces in American museum culture. Alexander Girard, the celebrated architect and designer, donated his personal collection to the museum in 1978 on the condition that it be displayed in his own idiosyncratic way: thousands of objects arranged in dense, theatrical dioramas that pack an overwhelming amount of visual information into a single room.</p>

<p>The effect is unlike anything else in museum culture — simultaneously a storage facility, a toy store, an encyclopedia, and a work of art in its own right. The collection spans Mexican Día de los Muertos altars, Indian textiles, European carved wooden figures, African masks, Japanese toys, and hundreds of categories in between. The museum's permanent collection of Hispanic New Mexico folk art — santos, retablos, colchas, and tinwork — is among the finest anywhere, providing essential context for understanding the living Spanish colonial artistic tradition of northern New Mexico.</p>

<h2>The Museum of Indian Arts and Culture</h2>

<p>The Museum of Indian Arts and Culture presents the arts and cultures of the Indigenous peoples of the Southwest — Pueblo, Diné (Navajo), Apache, Ute, and other nations — with a depth, respect, and curatorial sophistication that reflects decades of engagement with the communities whose heritage it holds. The permanent exhibition "Here, Now and Always" traces the presence of Indigenous peoples in the Southwest from ancient times to the present, refusing the common museum tendency to treat Indigenous culture as historical rather than living.</p>

<p>The collections include extraordinary examples of historic Pueblo pottery from all the major villages, Diné weaving spanning centuries of design evolution, Apache beadwork and basketry, and a significant collection of twentieth and twenty-first century painting and sculpture by Indigenous artists. The Laboratory of Anthropology, which shares the campus, holds one of the most important research collections of Southwest Indigenous material culture in the world, supporting ongoing scholarship and working closely with the tribal communities whose heritage it holds.</p>

<h2>The Wheelwright Museum of the American Indian</h2>

<p>The Wheelwright Museum of the American Indian was founded in 1937 by the Bostonian collector Mary Cabot Wheelwright in collaboration with the Diné (Navajo) medicine man and singer Hastiin Klah, whose ceremonial knowledge and the sacred objects associated with it form the core of the museum's original collection. Today the Wheelwright focuses primarily on contemporary Indigenous art, with an ambitious exhibition program that brings significant new work to Santa Fe regularly.</p>

<p>The museum's Case Trading Post, in the basement, is one of the best shops for authentic Indigenous art and jewelry in the Southwest — operated with the same commitment to quality and authenticity that characterizes the museum's curatorial program. The building itself, designed to echo the octagonal form of a Diné hogan, is worth experiencing for its architecture alone.</p>

<h2>The Museum of Spanish Colonial Art</h2>

<p>The Museum of Spanish Colonial Art is the only museum in the United States dedicated exclusively to the Spanish colonial artistic tradition — the painting, sculpture, furniture, textiles, metalwork, and devotional objects produced in the Spanish colonial world from the sixteenth century through the nineteenth, with particular depth in the arts of New Mexico. Its collection spans everything from large-format oil paintings produced for New Mexico missions to the intimate retablos and bultos of village santeros, providing an unparalleled introduction to the artistic heritage of Hispanic New Mexico.</p>

<p>The museum is operated by the Spanish Colonial Arts Society, which also organizes the annual Spanish Market held on the Santa Fe Plaza each July — the most significant juried market for traditional Hispanic colonial arts in the country, with hundreds of artists selling authenticated work directly to collectors. A visit to the museum provides essential context for understanding what you'll see at Spanish Market.</p>

<h2>Practical Information for Museum Hill Visitors</h2>

<p>Museum Hill is about a mile from the Santa Fe Plaza — a pleasant walk through the historic neighborhoods of the city, or a short drive. A free shuttle runs between the Plaza and Museum Hill on weekends. The four museums share a parking lot and are within easy walking distance of each other; a committed visitor can see all four in a long day, though each deserves more time than that implies.</p>

<p>New Mexico residents get free admission to all four museums; out-of-state visitors pay admission at each institution. The Museum of New Mexico Foundation operates a café on Museum Hill that provides lunch and snacks during museum hours. The best strategy for a first visit is to choose one or two museums for deep engagement rather than trying to see all four superficially — Museum Hill rewards return visits, and the collections are rich enough to sustain many days of looking.</p>`,
    meta_title: 'Santa Fe Museum Hill: Complete Visitor\'s Guide | Southwest Galleries',
    meta_description: 'Four world-class museums in one walkable location. Our complete guide to Santa Fe\'s Museum Hill — folk art, Indigenous art, Spanish colonial art, and more.',
  },
  {
    slug: 'austin-art-galleries-guide',
    title: 'Austin Art Galleries: From East Austin Studios to the Blanton Museum',
    excerpt: 'Austin\'s art scene has grown with the city itself — from the university collections of the Blanton to a sprawling East Austin gallery district that reflects the city\'s creative energy.',
    state_code: 'TX',
    content: `<p>Austin has always been a city that takes its creative life seriously, but in the past decade the visual arts scene has expanded dramatically alongside the city's explosive growth — from the established institutional anchors of the University of Texas campus to the sprawling gallery and studio district that has colonized East Austin. Whether you're interested in major museum collections, cutting-edge contemporary work, or finding something directly from a working artist's studio, Austin's art scene rewards exploration.</p>

<h2>The Blanton Museum of Art</h2>

<p>The Blanton Museum of Art at the University of Texas holds the largest university art collection in the American South and Southwest, with more than 18,000 works spanning ancient through contemporary, with particular strength in European paintings from the fifteenth through eighteenth centuries, American art, and modern and contemporary Latin American art — one of the finest such collections in the country.</p>

<p>The Blanton's Latin American holdings reflect both the geographic position of Texas and the university's long commitment to scholarship on Latin American culture. The collection includes major works by Mexican muralists, constructivist painters from Brazil and Argentina, and contemporary figures from across the hemisphere — making Austin one of the best places in the United States to understand the breadth of Latin American visual culture.</p>

<p>The museum's most spectacular recent addition is "Austin" (2018) by Ellsworth Kelly — a freestanding building Kelly designed specifically for UT's campus in the last years of his life. The structure contains seventeen colored glass windows and a large black-and-white marble sculpture in a space designed to function as a secular chapel, suffused with changing colored light throughout the day. It is one of the most extraordinary site-specific art works in the United States, and alone justifies a visit to the Blanton.</p>

<h2>East Austin: The Studio and Gallery District</h2>

<p>East Austin — the neighborhoods east of downtown, historically the city's African American and Latino communities and now rapidly gentrifying — has become the center of Austin's commercial and alternative gallery scene. The area's relatively affordable rents attracted artists and galleries over the past decade, and while rising real estate prices have begun to push some studios further east, the district remains the most concentrated zone for contemporary art in the city.</p>

<p>The galleries of East Austin range from established commercial spaces showing work by mid-career and established artists to artist-run project spaces operating on shoestring budgets, scrappy and ambitious and often doing the most interesting work in the city. First Thursday on East 6th Street brings galleries open late on the first Thursday of each month, creating a gallery walk atmosphere that draws collectors, artists, and the merely curious in significant numbers.</p>

<p>Several of Austin's most interesting galleries focus specifically on Texas-based artists, building a platform for the state's creative community that complements the larger national and international galleries. For collectors interested in building a collection with a specifically Texas identity, these galleries are invaluable resources.</p>

<h2>The Contemporary Austin</h2>

<p>The Contemporary Austin operates two venues: the Jones Center in downtown, which presents ambitious contemporary exhibitions in a compact urban space, and Laguna Gloria, a historic estate on Lake Austin that functions as an outdoor sculpture park and experimental exhibition site. Together they give the Contemporary Austin a physical and programmatic range that few institutions its size can match.</p>

<p>Laguna Gloria in particular is one of Austin's hidden gems — a beautiful historic property where major sculptures are installed in the landscape alongside a historic villa that serves as a community arts center and school. The combination of art, architecture, and natural landscape makes it an exceptional destination, especially in the spring and fall when the grounds are at their best.</p>

<h2>The Harry Ransom Center</h2>

<p>The Harry Ransom Center at UT is not primarily an art museum — it is a research library of literary and cultural history — but it holds one of the greatest collections of cultural artifacts in the world, including the Gutenberg Bible, one of the world's first photographs (the "View from the Window at Le Gras," c. 1826-1827), and extraordinary archives of major twentieth-century writers, photographers, and filmmakers. For anyone interested in the intersections of art, literature, and photography, the Ransom Center's rotating exhibitions are not to be missed.</p>

<h2>Studio Visits and the Artist Community</h2>

<p>Austin's Open Studio Tour, held each November, gives the public access to hundreds of working artists' studios across the city — one of the best opportunities in any American city to buy directly from working artists and to understand the creative community that produces the work you see in galleries year-round. The Austin Studio Tour has been running for decades and continues to grow, reflecting both the size of Austin's artist community and the appetite of its collector base.</p>

<p>The best strategy for exploring Austin's art scene is to combine the institutional anchors — the Blanton, the Contemporary Austin, the Ransom Center — with time spent in East Austin's galleries and studios. The city's sprawl means a car is helpful for getting between venues, but the East Austin gallery district is walkable once you're in it. Austin rewards the collector willing to look beyond the obvious destinations and engage with the city's genuinely diverse and ambitious creative community.</p>`,
    meta_title: 'Austin Art Galleries: From East Austin to the Blanton | Southwest Galleries',
    meta_description: 'Explore Austin\'s art scene — from the Blanton Museum\'s 18,000-work collection to the East Austin gallery district and the Contemporary Austin\'s two venues.',
  },
];

async function run() {
  console.log(`Adding ${guides.length} new guides...`);
  for (const g of guides) {
    try {
      const existing = await sql`SELECT id FROM posts WHERE slug = ${g.slug}`;
      if (existing.length > 0) {
        console.log(`  ~ ${g.title} (already exists, skipping)`);
        continue;
      }
      const wordCount = g.content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
      await sql`
        INSERT INTO posts (slug, title, excerpt, content, state_code, meta_title, meta_description, is_published, published_at)
        VALUES (${g.slug}, ${g.title}, ${g.excerpt}, ${g.content}, ${g.state_code}, ${g.meta_title}, ${g.meta_description}, true, NOW())
      `;
      console.log(`  ✓ ${g.title} (~${wordCount} words)`);
    } catch (e) {
      console.log(`  ✗ ${g.title}: ${e.message}`);
    }
  }
  console.log('Done.');
  process.exit(0);
}

run().catch(e => { console.error(e.message); process.exit(1); });
