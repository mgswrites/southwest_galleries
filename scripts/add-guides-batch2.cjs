const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.NEON_DB_KEY);

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const guides = [
  {
    slug: 'bisbee-arizona-art-guide',
    title: 'Bisbee, Arizona: The Southwest\'s Most Surprising Art Town',
    excerpt: 'From copper mine to creative colony, Bisbee has become one of Arizona\'s most vital arts destinations — and one of the best-kept secrets in the Southwest.',
    hero_image_url: 'https://images.unsplash.com/photo-oNh1WDmbglo?w=800&h=450&fit=crop&q=80',
    content: `Bisbee, Arizona sits in the Mule Mountains at 5,300 feet, tucked into a canyon so steep that the streets climb over each other in tiers, connected by staircases rather than roads. It is, by any measure, an unlikely place for one of the Southwest's most vital arts communities. And yet here it is: a town of fewer than 5,000 people with more galleries per capita than almost anywhere in the region, a thriving community of painters, sculptors, ceramicists, printmakers, and jewelers who have been drawn here for decades by the improbable combination of cheap rent, extraordinary architecture, and a town that takes creativity seriously.

Mining, of course, came first. The Copper Queen Mine, operated by Phelps Dodge from the 1880s until 1975, made Bisbee one of the most productive copper mines in history and one of the largest cities in Arizona — more populous, in its heyday, than either Phoenix or Tucson. The architecture it left behind is extraordinary: Victorian commercial buildings, Romanesque Revival churches, Craftsman bungalows terraced up the hillside, all of it miraculously preserved simply because the town was too poor to tear any of it down. When the mine finally closed and the population collapsed, artists arrived to fill the vacuum.

The Bisbee arts scene today is anchored by two main commercial districts: Old Bisbee, the original Victorian downtown in Tombstone Canyon, and the Warren district, a planned company town about a mile south. Old Bisbee is where most of the galleries are concentrated, many of them occupying storefronts and Victorian-era buildings along Main Street and the side streets that branch off it up the canyon walls.

The Bisbee Arts & Cultural Center is the community's primary nonprofit arts institution, hosting rotating exhibitions, artist talks, and community programs that connect the town's professional arts community with visitors and residents alike. The organization has been instrumental in sustaining Bisbee's creative identity through the economic cycles that have battered similar towns across the rural Southwest.

For visitors exploring the gallery scene, a stroll through Old Bisbee is the essential starting point. The scale is human — nothing is more than a few minutes' walk from anything else — and the density of creative work on display is remarkable. You might find a printmaker's studio next door to a gallery showing landscape paintings, then an artist-run space exhibiting experimental video work. The aesthetic range in Bisbee is wider than most small-town arts districts precisely because the community has never settled into a single style or market niche.

The Copper Queen Hotel, opened in 1902 and the oldest continuously operating hotel in Arizona, has long been a gathering place for artists and writers. Its saloon walls are lined with photographs from the mining era and paintings by local artists, and the hotel regularly hosts events that bring the arts community together with travelers passing through. Staying here puts you at the center of Bisbee's cultural life in a way that a drive-through visit simply cannot replicate.

Bisbee is also notable for its public art. The Grassy Park, the informal open space in the center of Old Bisbee, regularly features sculpture and installations, and murals appear throughout the canyon walls and alley passages that cut through the town's vertical terrain. The city's support for public art creates a gallery-without-walls quality to simply walking through the streets — you are never more than a few steps from something worth stopping for.

The Bisbee Open Studio Tour, held annually in the fall, gives visitors rare access to working studios throughout the town and the surrounding Mule Mountains. The Tour's reach extends beyond the commercial galleries to include the private studios where much of Bisbee's most significant work is actually produced: ceramicists working in mountain clay, painters who have spent decades studying the particular quality of southeastern Arizona light, weavers and fiber artists whose work draws on both Indigenous and European traditions.

The weekly farmers market, held in the Grassy Park on Saturdays, is another point of community convergence where artists regularly sell smaller works alongside vegetables and prepared food. It functions as an informal preview of the broader creative community and is one of the best places to have actual conversations with working artists about their practice and their relationship to this singular place.

The surrounding landscape is part of Bisbee's creative identity. The Mule Mountains and the broader Chiricahua region are among the most ecologically complex and dramatically beautiful landscapes in North America — a convergence of Sonoran desert, grassland, and sky island forest that has attracted nature photographers, landscape painters, and naturalist artists for generations. The light in southeastern Arizona has a quality distinct from northern New Mexico or the Colorado Plateau: warmer and more diffuse, filtered through a sky that sits at the intersection of monsoon moisture and desert clarity.

Collecting in Bisbee tends to be more accessible than in Santa Fe or Scottsdale. Price points are generally lower — not because the quality is lesser, but because the market is more intimate, the overhead costs for galleries are lower, and the artists who have chosen to live here have generally prioritized community over market positioning. Serious collectors who are willing to travel off the main Southwestern art circuit have discovered that Bisbee offers some of the best opportunities to acquire significant work at prices that reflect actual artistic merit rather than gallery prestige.

Getting to Bisbee requires a commitment. The town is 90 miles southeast of Tucson and about 200 miles from Phoenix, with no direct public transportation. But the drive from Tucson through the San Pedro Valley — past historic Tombstone, through the grasslands of the Sulphur Springs Valley — is itself worth making, offering views of mountain ranges stacked against the horizon and an experience of the eastern Arizona landscape that most visitors to the state never see. Bisbee rewards the traveler willing to leave the main routes and discover what the Southwest looks like when a mining-town catastrophe becomes a creative renaissance.`,
  },

  {
    slug: 'palm-springs-art-galleries-guide',
    title: 'Palm Springs Art Galleries: Desert Modernism, Museums, and the Coachella Valley Scene',
    excerpt: 'Palm Springs is more than mid-century architecture — it\'s home to a serious art museum, a thriving gallery district, and a cultural scene that rewards every kind of art lover.',
    hero_image_url: 'https://images.unsplash.com/photo-Uw2hMJSyAyU?w=800&h=450&fit=crop&q=80',
    content: `Palm Springs is best known internationally as the mid-century modern resort town where Hollywood luminaries came to escape the city — and where some of the most significant residential architecture of the 20th century was built against a backdrop of San Jacinto Mountain and desert sky. But Palm Springs is also, and less obviously, a serious art town: home to one of the most significant art museums in California, a gallery district that has grown steadily over two decades, and a cultural identity that weaves together modernist design, Indigenous art, and a contemporary scene that reflects the diversity of the broader Los Angeles creative community.

The Palm Springs Art Museum is the cornerstone of the valley's arts ecosystem. Occupying a building designed in 1974 by E. Stewart Williams — one of the defining architects of desert modernism — the museum has undergone significant expansions and houses a permanent collection that spans pre-Columbian ceramics, 20th-century American art, contemporary photography, and a glass collection of international significance. The museum's architecture department maintains the Palm Springs Art Museum Architecture and Design Center, dedicated specifically to the built environment of the desert region, making it one of the only museums in the United States with a standalone institution devoted to architecture as a collecting discipline.

The Agua Caliente Cultural Museum, recently completed in downtown Palm Springs, represents the most significant investment in Indigenous cultural preservation in the Coachella Valley's history. The museum focuses on the culture, history, and art of the Agua Caliente Cahuilla people — who are the original stewards of this land — and presents their traditional arts, contemporary works, and living culture in a state-of-the-art facility that has itself become an architectural landmark.

The gallery district in downtown Palm Springs is concentrated primarily along North Palm Canyon Drive and the surrounding blocks. Galleries range from established dealers in 20th-century California art to younger spaces showing emerging artists from Los Angeles and the Coachella Valley itself. The Thursday VillageFest, a weekly street fair along Palm Canyon Drive, functions partly as an outdoor gallery with artists selling work alongside vendors and food stalls, and is one of the most accessible entry points to the local creative community for first-time visitors.

The Coachella Valley's art scene extends beyond Palm Springs. Cathedral City, Palm Desert, and Rancho Mirage all have galleries and cultural institutions, with the McCallum Theatre in Palm Desert functioning as the region's primary performing arts venue. The City of Palm Desert's Art in Public Places program has seeded outdoor sculpture throughout the city, making an art encounter possible in almost any public space.

El Paseo, Palm Desert's upscale shopping boulevard, hosts a significant concentration of galleries alongside its retail storefronts. The boulevard's Sculpture Garden, which changes annually, brings large-scale outdoor works to what is otherwise a conventional retail corridor and has attracted increasing attention from collectors and curators looking beyond Palm Springs proper. Some of the most significant purchases made in the Coachella Valley in recent years have begun with a chance encounter along El Paseo.

The Sunnylands Center and Gardens in Rancho Mirage — the former estate of Walter and Leonore Annenberg, which hosted presidents and world leaders for decades — has opened its grounds and arts programming to the public and provides a window into the collecting habits of one of the 20th century's most significant cultural philanthropists. The estate's art collection, which includes significant Impressionist and Post-Impressionist works, is displayed in a domestic setting that illuminates how art functions in the context of a fully realized private life.

The connection between desert modernism and the visual arts is central to Palm Springs' cultural identity. The architects who defined the city's built environment — Albert Frey, Richard Neutra, William Cody, Donald Wexler, John Lautner — were working in close dialogue with the visual arts of their era, and the glass walls, integrated indoor-outdoor spaces, and formal vocabulary of their buildings were influenced by the painting and sculpture being produced simultaneously in New York and Los Angeles. Visiting Palm Springs as an art traveler means engaging with architecture as art, reading the modernist houses as aesthetic statements as much as functional buildings.

Modernism Week, held each February and drawing tens of thousands of visitors to the Coachella Valley, is the region's largest arts and culture event. The ten-day festival includes architectural tours, gallery exhibitions, lectures, and design fairs that collectively celebrate Palm Springs' mid-century heritage while connecting it to contemporary practice. For art travelers, the Modernism Week calendar is an extraordinary opportunity to access private homes, studio visits, and curatorial programming that isn't available at any other time of year.

The desert landscape itself continues to be a generative force for art-making in the Coachella Valley. Joshua Tree National Park, about 45 minutes north of Palm Springs, has attracted artists and musicians since the 1960s — the towns of Joshua Tree and Twentynine Palms have developed a genuine artist-in-residence culture built around the landscape's otherworldly quality. The Hi-Desert Cultural Center anchors a small but serious arts community that is increasingly connected to the Palm Springs scene while maintaining its own distinct identity rooted in the high desert.

Collecting in Palm Springs tends to reflect the city's design heritage. Mid-century furniture, ceramics, and graphic arts from the 1950s and 1960s remain the most consistently traded categories, and the Palm Springs market is one of the better places in the country to acquire significant modernist decorative arts at prices that remain below their New York and Los Angeles equivalents. For collectors interested in California landscape painting — which has its own distinguished history rooted in the region's extraordinary light — the Coachella Valley galleries offer depth and selection that rival more prominent California art markets.`,
  },

  {
    slug: 'collecting-navajo-weaving-guide',
    title: 'Collecting Diné Weaving: A Guide to the Southwest\'s Most Celebrated Textile Tradition',
    excerpt: 'Diné weaving is one of the great art forms of the American Southwest. Here\'s everything a beginning collector needs to know about buying, evaluating, and living with these extraordinary textiles.',
    hero_image_url: 'https://images.unsplash.com/photo-EQE5Aum0lN8?w=800&h=450&fit=crop&q=80',
    content: `Diné weaving — produced by the Navajo people of the Four Corners region — is one of the most significant textile traditions in the world and one of the few Indigenous art forms that has maintained continuous production over more than three centuries while evolving dramatically in response to trade, commerce, and artistic innovation. For collectors, Diné textiles represent an opportunity to engage with a living art form of extraordinary depth: weavings that are simultaneously functional objects, spiritual expressions, historical documents, and works of fine art that command prices from a few hundred dollars to hundreds of thousands at major auction houses.

The history of Diné weaving begins before European contact, but the tradition as we recognize it today took its essential form in the late 17th and 18th centuries, when Diné weavers acquired Spanish churro sheep and incorporated their wool — along with upright loom technology they had observed among Pueblo peoples — into a practice that had previously used other fibers. The resulting textiles were so extraordinary that they became trade goods across a vast network, sought by Spanish colonists, Mexican merchants, and eventually American military officers and early collectors.

The classic period of Diné weaving runs roughly from 1800 to 1863, producing the bold horizontal-striped blankets — worn as garments by both men and women — that are now among the most coveted of all American Indigenous textiles. The designs of this period are deceptively simple: wide bands of red (achieved with raveled bayeta cloth imported from Spain), white, and indigo blue in geometric arrangements that have an almost Minimalist power when encountered in museum galleries or private collections today.

The Transition period, from approximately 1868 to 1895, reflects the profound disruption of the Long Walk — the forced removal of the Diné people to Bosque Redondo and their subsequent return — and the introduction of commercial yarns, new color ranges, and design elements from broader American trade networks. Weavings from this period show experimentation and synthesis: the horizontal striped format gives way to more complex geometric fields, and the palette expands to include the vivid so-called "Germantown" colors made possible by commercially dyed wool.

The trading post era, beginning in the 1890s and lasting through the mid-20th century, transformed Diné weaving from primarily a garment tradition into a rug tradition, reshaped by the commercial interests of Anglo traders who encouraged weavers to adopt formats and designs that would sell to American consumers. Different trading posts became associated with distinct regional styles: the Two Grey Hills rugs of northeastern New Mexico, with their elaborate geometric designs in natural undyed wool; the Ganado rugs from John Lorenzo Hubbell's post in northeastern Arizona, emphasizing bold red backgrounds; the Wide Ruins weavings with their vegetable-dyed pastels and pictorial softness; the Teec Nos Pos style with its intricate border-and-diamond compositions.

Understanding regional styles is the foundation of collecting Diné weaving. Each style reflects not only the aesthetic preferences of individual weavers but the materials available, the influence of the local trading post, and traditions passed down through family lines — weaving is a matrilineal art among the Diné, with daughters learning from mothers and grandmothers in an unbroken chain of transmission that goes back generations.

For beginning collectors, trading post rugs of the 20th century offer an accessible entry point. Excellent examples can be found at auction, through Santa Fe and Scottsdale dealers, and at the major Indigenous art markets — particularly the SWAIA market held each August in Santa Fe, which is the most significant annual marketplace for Diné and other Southwest Indigenous arts. Prices for mid-20th century trading post rugs in good condition typically range from several hundred to several thousand dollars, depending on size, complexity, condition, and regional style.

Buying from living weavers directly is the most meaningful form of collecting, and an increasing number of Diné artists make their work available through their own websites, through galleries that have established direct relationships with weaving families, and at markets on and off the Navajo Nation. Purchasing directly ensures that the artist receives the full value of their work, builds a relationship that can deepen over years, and provides access to context about the weaving's cultural meaning that no secondary market transaction can offer.

Condition is paramount in evaluating both antique and contemporary weavings. Look for evenness of weave — a well-made Diné weaving should be consistent in tension from edge to edge — integrity of warps and wefts without breaks or repairs, clarity of color, and the overall visual coherence of the design. Fading is common in older pieces and does not necessarily diminish value, but repairs and rebinding of damaged edges should always be disclosed and will affect price accordingly.

Provenance — the documented ownership history of a weaving — adds value and scholarly significance, particularly for older pieces. A rug that can be traced to a specific trading post, a documented collection, or a notable exhibition carries additional meaning for researchers and collectors alike. Major auction houses including Sotheby's, Bonhams, and Hindman regularly feature Diné textiles, and their records provide invaluable pricing benchmarks.

The contemporary Diné weaving scene is as vital as it has ever been. Artists like Melissa Cody, Roseann Sandoval, and Roy Kady are producing technically extraordinary work that engages deeply with the tradition's history while pushing its formal possibilities in genuinely new directions. These artists show at major galleries including Shiprock Santa Fe, which has been one of the most consistent champions of contemporary Diné weaving, and their work is acquired by major institutions across the country.

Learning to look closely at weavings — to understand how design vocabulary has evolved, how regional styles differ, how individual weavers have developed personal visual languages within the tradition — is a practice that rewards sustained attention. The Heard Museum in Phoenix, the Wheelwright Museum in Santa Fe, and the Nation's museum in Window Rock all maintain significant textile collections with educational programming that can accelerate a collector's visual education. Take time to study their holdings before you begin buying, and your eye will develop faster than you might expect.`,
  },

  {
    slug: 'jerome-arizona-artist-colony-guide',
    title: 'Jerome, Arizona: Art in the Sky — The Southwest\'s Vertical Artist Colony',
    excerpt: 'Perched impossibly on the side of Cleopatra Hill with views across the Verde Valley, Jerome is one of the most dramatic and creatively vital small towns in the American Southwest.',
    hero_image_url: 'https://images.unsplash.com/photo-33509whKH0g?w=800&h=450&fit=crop&q=80',
    content: `Jerome, Arizona occupies an almost literally vertical position on Cleopatra Hill in the Black Hills of central Arizona, 5,200 feet above sea level and set at a pitch so steep that the town seems to defy gravity. Houses are stacked above each other on terraced lots, streets switchback up the hillside, and the views from almost any point in town extend across the Verde Valley to the red rocks of Sedona in the east and the San Francisco Peaks rising above Flagstaff to the north. It is one of the most dramatic physical settings of any town in the American Southwest, and that drama is inseparable from what makes Jerome a compelling arts destination.

Jerome's history follows the familiar arc of Arizona mining towns: discovery, boom, company dominance, collapse, and creative resurrection. The United Verde Copper Company and its successor Phelps Dodge operated here from the 1880s until 1953, making Jerome at its peak one of the largest cities in Arizona. The mine produced over a billion pounds of copper before the deposits gave out, leaving behind an extraordinary architectural legacy: Victorian commercial buildings, company-built worker housing, a hospital built into the hillside, and the Douglas Mansion, now a state park, which commands a view of the Verde Valley that remains one of the most spectacular in all of Arizona.

After the mine closed, Jerome declined to fewer than 100 residents by the 1960s. The buildings were cheap and the setting was magnificent, and by the early 1970s artists and writers had begun arriving to claim the abandoned storefronts and Victorian houses. Jerome became one of the earliest of the Southwest's mining-town-to-arts-destination transformations, preceding Bisbee's revival by a decade and establishing a template that has since been replicated in towns across the region.

The arts scene that emerged in Jerome has its own distinct character. The town is small enough — perhaps 500 permanent residents — that the arts community is genuinely intimate, with artists knowing each other's work and lives in a way that is impossible in larger markets. Galleries and studios are concentrated primarily along Main Street and Hull Avenue, a short strip that feels, on a busy weekend day, like a concentrated river of creative energy running through the hillside.

The Jerome Artists Cooperative Gallery is the community's central institution, a collective operated by and for Jerome's working artists that represents the full range of the town's creative output: painting, pottery, jewelry, glass, fiber arts, sculpture, and mixed media. The cooperative model means that visitors are typically able to meet the artists directly, with gallery shifts staffed by members themselves. For collectors who want direct engagement with the people behind the work, cooperative galleries like this one are invaluable — the conversation that begins at the desk often deepens into a lasting relationship between collector and artist.

The Raku Gallery is one of Jerome's most distinctive destinations, focused on raku-fired ceramics — a Japanese-derived technique in which pieces are removed from the kiln at peak temperature and subjected to rapid cooling that produces unpredictable but often extraordinary surface effects of smoke, metallic luster, and crackling glaze. The gallery represents several Jerome-based ceramic artists who have made raku their primary medium and developed personal approaches to the technique that reflect the Southwest's particular light, color, and thermal drama.

Jerome's setting in the Black Hills places it within easy reach of several significant natural and archaeological landmarks. Tuzigoot National Monument, in the Verde Valley below Jerome, preserves a large Sinagua pueblo inhabited from roughly 1000 to 1425 CE, and its museum houses significant ceramic and textile artifacts from the Southwest's pre-Columbian period. Montezuma Castle National Monument, about 20 miles south, contains one of the best-preserved cliff dwellings in North America. For artists and collectors interested in the deep history of Southwestern craft traditions, these sites provide essential context for understanding how the region's contemporary art connects to millennia of Indigenous creative practice.

The Jerome Art Walk, held on designated weekends throughout the year, draws visitors who move through the galleries and studios with focused intentionality. During Art Walk events, studios normally closed to the public open their doors, and artists who work primarily in private take on something of a pedagogical role, explaining their process and influences in the context of their own working spaces. These events are among the most revealing experiences available to a visitor interested in understanding how art actually gets made in a small working community.

The views from Jerome deserve sustained attention. The southwest-facing aspect of Cleopatra Hill means that Jerome receives the full force of afternoon light as it rakes across the Verde Valley and catches the faces of the red rock formations near Sedona. Painters working in Jerome have spent careers studying this light — the challenge and reward of painting from Jerome's hillside is a subject that comes up regularly in conversations with the town's landscape artists. Even visitors with no particular interest in painting tend to find themselves standing on Jerome's terraced streets at four in the afternoon, watching the light change, understanding for the first time why artists keep coming here.

Accommodation in Jerome is limited but characterful. The Connor Hotel, a historic property on Main Street, has been operating in some form since 1898 and provides an experience of the town that extends beyond the gallery visit into the texture of Jerome's daily life. Several bed-and-breakfast operations in the Victorian houses scattered up the hillside offer a more intimate alternative, with views from bedroom windows that have been known to inspire collecting decisions that the light of day only confirms.

The distance from Phoenix is manageable — about two hours on Interstate 17 and then the winding climb up State Route 89A from Cottonwood — and the Verde Valley offers enough additional attractions to make a two-day visit the natural format. Sedona is 30 miles south; Prescott, another historic Arizona community with its own growing arts scene, is 35 miles southwest. A Jerome visit pairs naturally with either, and the contrast between Jerome's vertical intensity and Sedona's horizontal grandeur is itself a kind of artistic education in the variety of forms the Southwest contains.`,
  },

  {
    slug: 'women-artists-american-southwest',
    title: 'Women Artists of the American Southwest: Essential Figures and Where to Find Their Work',
    excerpt: 'From María Martínez and Georgia O\'Keeffe to Rose Simpson and Melanie Yazzie, women have been the defining creative force of the American Southwest. Here\'s who to know and where to see their work.',
    hero_image_url: 'https://images.unsplash.com/photo-R7jwm9xtdmU?w=800&h=450&fit=crop&q=80',
    content: `The history of art in the American Southwest cannot be told without centering the women who made it. From the Pueblo women who have been producing extraordinary ceramics for over a thousand years — a tradition that was and remains primarily female — to the 20th-century painters and sculptors who reshaped how the region understood itself, to the contemporary artists who are remaking Southwestern art for the 21st century, women have been a defining creative force of this region in ways that mainstream art history has been slow to fully acknowledge.

Georgia O'Keeffe is the inevitable starting point, not because she was the first or the only, but because she chose to stay. O'Keeffe spent summers in New Mexico beginning in 1929, finally relocating permanently in 1949 following the death of her husband Alfred Stieglitz, and spent the last four decades of her life at Ghost Ranch near Abiquiu producing the work that would come to define both her career and the way the world sees the American desert. Her paintings of bones, flowers, and the landscape of the Piedra Lumbre valley did not merely represent the Southwest — they transformed it into an interior landscape, a terrain of the psyche that happened to be located in northern New Mexico. The Georgia O'Keeffe Museum in Santa Fe, which holds the world's largest collection of her work, remains one of the most important art pilgrimage destinations in the United States.

But O'Keeffe's dominance in the cultural imagination has sometimes obscured the depth of the women's artistic tradition that surrounded and preceded her. María Martínez of San Ildefonso Pueblo is perhaps the most consequential figure. Working in the early 20th century, Martínez — along with her husband Julian, who painted the designs — revived and refined the black-on-black pottery technique that had been practiced by her Pueblo ancestors and largely fallen out of use. The resulting ceramics were recognized almost immediately as among the finest art objects being produced anywhere in North America, and Martínez's international reputation — she received four honorary doctorates and met multiple U.S. presidents — did more to elevate the status of Pueblo pottery within mainstream art institutions than any other single development of the 20th century.

Pablita Velarde, the Tewa artist from Santa Clara Pueblo born in 1918, spent a career painting the ceremonial and daily life of Pueblo peoples in a style that drew on both her Indigenous visual tradition and the formal art education she received in Santa Fe. Her work was radical in its insistence on documenting a living culture from inside it, refusing both the romanticization of Indigenous life that characterized most Anglo-American depictions and the assimilationist pressure that sought to erase it. Velarde's daughter, Helen Hardin, extended this tradition into a more explicitly modernist vocabulary, incorporating geometric abstraction derived from Pueblo pottery and kiva murals into paintings of extraordinary formal sophistication. Hardin's career was cut short by cancer in 1984, when she was only 41, but the body of work she left behind is among the most significant of any Southwestern artist of her generation.

Dorothy Brett, who arrived in Taos in 1924 in the company of D.H. Lawrence and spent the rest of her long life — she died in 1977 at age 94 — painting Pueblo ceremonial subjects, was one of the most committed and skilled artists ever to work in the region. Brett's paintings bring an intimacy to their subjects that reflects decades of sustained relationship with the communities she depicted, and the best of her work holds up alongside the canonical Taos painters with whom she was contemporary.

The contemporary women's art scene in the Southwest is extraordinarily vital. Melanie Yazzie, the Diné artist based in Colorado, works across printmaking, sculpture, and painting to explore issues of identity, Indigenous sovereignty, and the relationship between traditional knowledge and contemporary life. Her prints in particular — technically innovative and visually bold — connect the Southwestern Indigenous art tradition to global conversations about cultural survival and creative resilience.

Rose Simpson, who works in Santa Clara Pueblo, has emerged as one of the most significant sculptors working anywhere in the American Southwest. Her ceramic figures — monumental in scale and psychological intensity, drawing on the Pueblo pottery tradition while pushing it into entirely new formal territory — have been acquired by major museums and exhibited in institutions across the country. Simpson's work refuses the false distinction between craft and fine art that has been used to relegate Indigenous ceramic production to a lesser category than European-derived sculpture, and her critical success has been a significant force in repositioning Pueblo ceramics within the mainstream art world.

Emmi Whitehorse, the Diné painter who divides her time between New Mexico and New York, makes large-scale works on paper that seem to capture the quality of attention rather than specific landscapes — the trace of desert light rather than its description, a visual language developed from decades of living in and moving between radically different environments. Her work has been acquired by the Smithsonian, the Whitney Museum, and the National Gallery of Art, and she represented the United States at the Venice Biennale.

Judy Chicago, who has spent significant time in New Mexico and whose work engages explicitly with the feminist tradition she helped define, represents a different vector of women's art in the Southwest — one rooted in the counter-cultural arts communities that found refuge in the region beginning in the 1960s and continuing through the present. Chicago's presence in Belen, New Mexico has connected the international feminist art movement to the Southwest's own tradition of women-centered creative practice.

Finding the work of women artists in the Southwest requires knowing where to look. The Heard Museum in Phoenix has the most significant institutional collection of Indigenous women's art in the country, with deep holdings in Pueblo ceramics, Diné weaving, and contemporary work. The Georgia O'Keeffe Museum in Santa Fe is obvious but essential. LewAllen Galleries in Santa Fe and Garth Greenan Gallery in New York are among the dealers most committed to representing significant women artists with Southwestern connections.

The SWAIA market in Santa Fe — held each August on the Plaza — remains the single most concentrated marketplace for Indigenous women artists in the country, with hundreds of artists presenting work directly to collectors in a format that collapses the distance between maker and buyer. For any serious collector interested in Pueblo ceramics, Diné weaving, or contemporary Indigenous art by women, this annual market is unmissable.

The historical record of women's art in the Southwest is still being reconstructed. Major museums are actively acquiring and exhibiting work that was excluded from canonical histories, and the market is beginning to reflect a revaluation that recognizes the depth and significance of contributions that mainstream art history spent decades ignoring. For collectors and visitors who engage with the Southwest's art world today, the women's tradition is not a supplement to the main story — it is the main story, and engaging with it seriously is the most important thing a collector or art traveler can do.`,
  },
];

async function run() {
  console.log(`Inserting ${guides.length} guides...`);

  for (const g of guides) {
    const wordCount = g.content.split(/\s+/).length;
    console.log(`  ${g.slug} — ${wordCount} words`);

    const existing = await sql`SELECT id FROM posts WHERE slug = ${g.slug}`;
    if (existing.length) {
      console.log(`    (already exists, skipping)`);
      continue;
    }

    await sql`
      INSERT INTO posts (
        slug, title, excerpt, content, hero_image_url,
        is_published, published_at,
        meta_title, meta_description
      ) VALUES (
        ${g.slug},
        ${g.title},
        ${g.excerpt},
        ${g.content},
        ${g.hero_image_url},
        true,
        NOW(),
        ${g.title + ' | Southwest Galleries'},
        ${g.excerpt.slice(0, 160)}
      )
    `;
    console.log(`    ✓ inserted`);
  }

  console.log('\nDone.');
  process.exit(0);
}

run().catch(e => { console.error(e.message); process.exit(1); });
