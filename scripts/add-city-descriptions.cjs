const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.NEON_DB_KEY);

// id, description, meta_title, meta_description
const cities = [
  // ARIZONA
  {
    id: 27, // Bisbee
    description: `Bisbee occupies a narrow canyon in the Mule Mountains of southeastern Arizona, 90 miles from Tucson and a mile above sea level — an old copper mining town that reinvented itself as one of the most authentic artist communities in the American Southwest. The end of mining in the 1970s opened the Victorian-era storefronts of Brewery Gulch and Old Bisbee to artists priced out of Tucson and Santa Fe, and the community that formed around them has endured for decades with a scrappy, unpolished character unlike any other arts town in the region. Galleries here tend to show the work of artists who actually live in town — painters, sculptors, jewelry makers, and photographers drawn by the extreme landscape, the extraordinary light, and a cost of living low enough to sustain a working creative life.`,
    meta_title: 'Bisbee, AZ Art Galleries & Studios | Southwest Galleries',
    meta_description: 'Explore art galleries and studios in Bisbee, Arizona — a historic copper mining town turned artist colony in the Mule Mountains, 90 miles from Tucson.',
  },
  {
    id: 31, // Cave Creek
    description: `Cave Creek is a small desert community north of Scottsdale that has become one of the most concentrated destinations for Western American fine art in Arizona. The town's galleries specialize in bronze sculpture, cowboy and wildlife painting, and the kind of large-format landscape work that defines the Western tradition — art made for collectors who want work that speaks directly to the landscape of the American West. Cave Creek's Western character is genuine rather than staged: the town's history as a ranching and mining community gives its art scene an authenticity that distinguishes it from more polished gallery markets. A half-day visit here pairs naturally with Scottsdale's gallery district, just 20 miles to the south.`,
    meta_title: 'Cave Creek, AZ Art Galleries | Western Art | Southwest Galleries',
    meta_description: 'Discover Western art galleries and bronze sculpture studios in Cave Creek, Arizona — one of the Southwest\'s top destinations for cowboy art and wildlife painting.',
  },
  {
    id: 5, // Flagstaff
    description: `Flagstaff sits at 7,000 feet on the Colorado Plateau, surrounded by ponderosa pine forest and the San Francisco Peaks, and its art scene reflects the particular cultural richness of northern Arizona — a crossroads of Indigenous traditions from the Hopi, Diné, and Pueblo peoples of the surrounding region, and a university city with a lively contemporary arts community anchored by Northern Arizona University. The Museum of Northern Arizona, founded in 1928, holds one of the most important collections of Colorado Plateau Indigenous art and material culture in the world, and its annual Heritage Programs bring Hopi, Diné, and Zuni artists together in summer festivals that are among the best opportunities in the Southwest to acquire work directly from its makers. Downtown Flagstaff's gallery district along San Francisco Street offers a range of contemporary and Southwestern work in a walkable historic district.`,
    meta_title: 'Flagstaff, AZ Art Galleries & Museums | Southwest Galleries',
    meta_description: 'Explore Flagstaff, Arizona\'s art scene — Museum of Northern Arizona, Indigenous art festivals, and a walkable downtown gallery district at 7,000 feet.',
  },
  {
    id: 26, // Jerome
    description: `Jerome clings to the side of Mingus Mountain at nearly 5,000 feet, a former copper mining boomtown that at its peak housed 15,000 people and is now home to fewer than 500 — most of them artists, gallery owners, and the kind of people drawn to extreme places with interesting histories. The town's dramatic decline and near-abandonment in the 1950s left its Victorian-era commercial buildings intact and cheap, attracting the first generation of artists in the 1970s who recognized what Jerome could become. Today the mile-long main street contains an improbable concentration of working studios, fine art galleries, jewelry makers, and ceramic artists, all operating out of buildings with sweeping views across the Verde Valley that extend on clear days to the red rocks of Sedona 25 miles away.`,
    meta_title: 'Jerome, AZ Art Galleries & Artist Studios | Southwest Galleries',
    meta_description: 'Discover art galleries and working studios in Jerome, Arizona — a historic hillside mining town turned thriving artist colony with stunning Verde Valley views.',
  },
  {
    id: 30, // Mesa
    description: `Mesa is the third-largest city in Arizona and anchors the East Valley arts scene with the Mesa Arts Center, one of the largest arts complexes in the American Southwest. The center's five theaters and four galleries present an ambitious program of visual arts exhibitions alongside performing arts, and the surrounding Mesa Arts District has developed a growing cluster of studios and independent galleries. Mesa's geographic position between Phoenix, Scottsdale, and Tempe makes it a natural hub for the broader East Valley creative community, and its cultural institutions draw audiences that extend well beyond the city's own population.`,
    meta_title: 'Mesa, AZ Art Galleries & Mesa Arts Center | Southwest Galleries',
    meta_description: 'Explore art galleries and the Mesa Arts Center in Mesa, Arizona — the East Valley\'s anchor for visual and performing arts in the greater Phoenix area.',
  },
  {
    id: 4, // Phoenix
    description: `Phoenix is home to one of the most important cultural institutions in the American Southwest — the Heard Museum, whose collection of Indigenous art from across North America is unrivaled outside the Smithsonian and whose annual Guild Indian Market is among the most prestigious forums for contemporary Indigenous artists on the continent. The city's art scene extends well beyond the Heard: the Phoenix Art Museum holds a strong permanent collection with particular depth in Western American art, and the First Friday Art Walk in the Roosevelt Row Arts District draws tens of thousands of visitors monthly to a neighborhood of murals, studios, pop-up galleries, and food trucks that has become the most lively street-level art experience in Arizona. The Valley's scale means its arts infrastructure is genuinely metropolitan, supporting auction houses, blue-chip galleries, and contemporary spaces alongside accessible community art.`,
    meta_title: 'Phoenix, AZ Art Galleries & Museums | Southwest Galleries',
    meta_description: 'Discover Phoenix, Arizona\'s art scene — the Heard Museum, Phoenix Art Museum, Roosevelt Row First Friday, and one of the Southwest\'s most dynamic gallery markets.',
  },
  {
    id: 28, // Prescott
    description: `Prescott was Arizona's first territorial capital and retains more 19th-century architecture than any other city in the state — a Victorian streetscape centered on Courthouse Plaza that gives the city's art scene a distinctly historical character. The Phippen Museum of Western Art, named for founding president George Phippen, holds the most focused collection of traditional Western painting and sculpture in Arizona, and its annual Western Art Show and Sale each Memorial Day weekend is one of the premier events in the Western art calendar. Downtown Prescott's Whiskey Row and the streets surrounding the plaza support a growing community of galleries and studios, with particular strength in traditional Western landscapes, wildlife art, and bronze sculpture.`,
    meta_title: 'Prescott, AZ Art Galleries & Phippen Museum | Southwest Galleries',
    meta_description: 'Explore art galleries and the Phippen Museum of Western Art in Prescott, Arizona — a Victorian-era territorial capital with a strong Western art tradition.',
  },
  {
    id: 1, // Scottsdale
    description: `Scottsdale is the premier gallery destination in the American West outside of Los Angeles, with a concentration of fine art galleries along Marshall Way and in Old Town that rivals any gallery district in the country. The city's art market specializes in Western American painting, bronze sculpture, and the work of Indigenous artists from across the Southwest, supported by one of the wealthiest collector bases in the region. The Thursday ArtWalk — held every Thursday evening in the gallery district — is the longest-running weekly gallery event in the Southwest, with more than 80 galleries staying open late for complimentary wine and artist receptions along a walkable mile of art. Scottsdale also anchors the spring art fair season with events that draw dealers and collectors from across the country.`,
    meta_title: 'Scottsdale, AZ Art Galleries | Thursday ArtWalk | Southwest Galleries',
    meta_description: 'Discover Scottsdale, Arizona\'s world-class gallery district — Western art, bronze sculpture, Indigenous art, and the famous Thursday ArtWalk on Marshall Way.',
  },
  {
    id: 2, // Sedona
    description: `Sedona's red rock landscape — cathedral buttes and mesas of Permian sandstone rising 1,000 feet from the desert floor — has made it one of the most painted places in the American West, and the city's art scene has grown around that identity for more than a century. Plein air painting is the defining tradition here: the quality of the light, which filters through the red rock to cast a warm glow across the landscape at dawn and dusk, draws painters from across the country to work outdoors in the canyon country surrounding the city. Tlaquepaque Arts and Shopping Village, modeled on a traditional Mexican village, and the uptown gallery corridor along SR-89A contain more than 40 galleries showing work that ranges from traditional Western landscapes to contemporary painting and jewelry by Indigenous Southwest artists.`,
    meta_title: 'Sedona, AZ Art Galleries | Plein Air Painting | Southwest Galleries',
    meta_description: 'Explore art galleries and plein air painting in Sedona, Arizona — one of the most painted landscapes in the American West, with 40+ galleries among the red rocks.',
  },
  {
    id: 29, // Tempe
    description: `Tempe is home to Arizona State University's main campus, and the creative energy of one of the largest universities in the United States gives the city's art scene a distinctive character — more experimental, more culturally diverse, and more engaged with the contemporary art world than any other city in the East Valley. The ASU Art Museum is one of the most ambitious university art museums in the Southwest, with a strong collection of contemporary American craft and an exhibition program that regularly presents work of national significance. Mill Avenue and the surrounding downtown district support independent galleries, artist studios, and creative businesses that draw from both the university community and the broader Phoenix metropolitan area.`,
    meta_title: 'Tempe, AZ Art Galleries & ASU Art Museum | Southwest Galleries',
    meta_description: 'Explore art galleries and the ASU Art Museum in Tempe, Arizona — a university arts hub with a strong contemporary program in the greater Phoenix area.',
  },
  {
    id: 3, // Tucson
    description: `Tucson is the most culturally complex art city in Arizona — a place where Mexican American, Indigenous, and Anglo artistic traditions intersect in ways that produce work unlike anything made in Phoenix or Scottsdale. The city's position on the border, and its deep connections to the Mexican state of Sonora, shape a visual culture that is simultaneously Southwest and borderlands, and the Fourth Avenue and downtown gallery districts reflect that complexity in their programming. The University of Arizona Museum of Art and the Tucson Museum of Art both hold strong permanent collections, and the annual Tucson Meet Yourself folk arts festival is one of the best opportunities in the Southwest to encounter the living traditions — music, food, craft, and visual art — of the region's many cultural communities.`,
    meta_title: 'Tucson, AZ Art Galleries & Museums | Southwest Galleries',
    meta_description: 'Discover Tucson, Arizona\'s art scene — where Mexican American, Indigenous, and Anglo traditions meet in galleries, museums, and a rich borderlands creative culture.',
  },

  // COLORADO
  {
    id: 10, // Aspen
    description: `Aspen has one of the most sophisticated art markets in the American West, driven by a combination of extraordinary wealth, a serious cultural infrastructure, and the concentration of collectors who arrive each summer for music, ideas, and the outdoors. The Aspen Art Museum, a purpose-built Shigeru Ban building overlooking the mountain, presents an internationally ambitious program of contemporary art that would be notable in any major city. The commercial gallery scene along Hyman Avenue and Mill Street specializes in museum-quality painting, sculpture, and photography — work priced for collectors who come to Aspen with serious intentions. The combination of the summer festival season and the ski season means Aspen's galleries attract a year-round audience of unusually sophisticated buyers.`,
    meta_title: 'Aspen, CO Art Galleries & Aspen Art Museum | Southwest Galleries',
    meta_description: 'Explore Aspen, Colorado\'s world-class art scene — the Aspen Art Museum, fine art galleries along Hyman Avenue, and one of the most sophisticated collector markets in the West.',
  },
  {
    id: 11, // Boulder
    description: `Boulder combines a major research university, a politically progressive culture, and one of the most naturally spectacular settings in Colorado to produce an art scene that is at once intellectually serious and visually adventurous. The CU Art Museum at the University of Colorado presents exhibitions of national scope, and the Pearl Street pedestrian mall is lined with galleries, working studios, and public sculpture that make the downtown a genuinely walkable art experience. Boulder's collector base skews toward contemporary work — painting, sculpture, photography, and mixed media — and the city's arts nonprofit sector is among the most robust in the Mountain West, supporting residencies, public art programs, and alternative exhibition spaces alongside commercial galleries.`,
    meta_title: 'Boulder, CO Art Galleries & Studios | Southwest Galleries',
    meta_description: 'Discover art galleries and studios in Boulder, Colorado — a university arts hub with Pearl Street galleries, CU Art Museum, and a thriving contemporary arts scene.',
  },
  {
    id: 33, // Colorado Springs
    description: `Colorado Springs sits at the foot of Pikes Peak and contains, somewhat improbably, one of the finest art museums in the Mountain West — the Colorado Springs Fine Arts Center at Colorado College, a 1936 Art Deco building that houses a strong permanent collection of American art with particular depth in the work of New Mexican artist Gustave Baumann and early Southwestern modernists. The city's gallery scene extends into the Old Colorado City arts district along West Colorado Avenue, where Victorian-era storefronts house working studios and galleries that draw from the surrounding military and tourist communities as well as serious regional collectors. Manitou Springs, just west of the city, adds another cluster of galleries and studios in a quirky mountain resort town.`,
    meta_title: 'Colorado Springs, CO Art Galleries & Fine Arts Center | Southwest Galleries',
    meta_description: 'Explore art galleries and the Colorado Springs Fine Arts Center in Colorado Springs — including Old Colorado City galleries and the mountain arts community of Manitou Springs.',
  },
  {
    id: 9, // Denver
    description: `Denver is the cultural capital of the Mountain West, home to the Denver Art Museum — whose collection of Indigenous art from across North America is among the finest in the world — alongside a thriving commercial gallery market centered in the RiNo (River North) Arts District. The First Friday Art Walk on Santa Fe Drive, which runs through a dense cluster of galleries and studios in the Lincoln Park neighborhood, is one of the most popular monthly arts events in the Rocky Mountain region, drawing thousands of visitors to a corridor that includes some of the most established contemporary galleries in Colorado. Denver's art scene spans the full range — from blue-chip Western art at the Brown Palace-area galleries to experimental work in converted warehouse studios in Globeville — and its geographic position as the gateway to the Mountain West makes it a natural hub for regional collectors.`,
    meta_title: 'Denver, CO Art Galleries & Denver Art Museum | Southwest Galleries',
    meta_description: 'Discover Denver, Colorado\'s art scene — the Denver Art Museum, RiNo Arts District, First Friday on Santa Fe Drive, and the cultural capital of the Mountain West.',
  },
  {
    id: 36, // Durango
    description: `Durango anchors the Four Corners region of the American Southwest — where Colorado, New Mexico, Arizona, and Utah meet — and its art scene reflects that geographic richness, drawing on the Ancestral Puebloan heritage of the surrounding canyon country, the living traditions of the Diné and Pueblo communities to the south, and the dramatic landscape of the San Juan Mountains to the north. The galleries along Main Avenue specialize in Southwestern and Western art with a strong regional identity, and the Durango Arts Center provides an important platform for contemporary work and community arts programming. The Durango & Silverton Narrow Gauge Railroad, which has operated continuously since 1882, connects the city to the high San Juan Mountains and has long attracted landscape painters drawn by the extraordinary scenery.`,
    meta_title: 'Durango, CO Art Galleries | Four Corners Art | Southwest Galleries',
    meta_description: 'Explore art galleries in Durango, Colorado — a Four Corners arts hub with Southwestern and Western art, the Durango Arts Center, and mountain landscape painting traditions.',
  },
  {
    id: 32, // Fort Collins
    description: `Fort Collins is a university city — home to Colorado State University — with a creative community that punches above its weight relative to its size. The Old Town arts district along Mountain Avenue supports independent galleries, working studios, and public art installations, and the CSU art programs supply a steady stream of emerging artists who choose to stay in the city after graduation. Fort Collins' art scene skews toward the contemporary and experimental, with a particular strength in public art and murals that have transformed several downtown corridors into open-air galleries. The city's thriving craft brewing and food culture supports the kind of creative economy that sustains working artists.`,
    meta_title: 'Fort Collins, CO Art Galleries & Studios | Southwest Galleries',
    meta_description: 'Discover art galleries and studios in Fort Collins, Colorado — a university arts hub with Old Town galleries, public art, and a lively contemporary creative community.',
  },
  {
    id: 34, // Manitou Springs
    description: `Manitou Springs occupies a narrow canyon at the base of Pikes Peak, just west of Colorado Springs, and its compact Victorian main street — lined with mineral springs, eclectic shops, and working galleries — has made it one of the most distinctive small arts communities in Colorado. The Manitou Art Center, housed in a 1909 building, provides studio space for dozens of working artists and serves as the cultural hub of a community that has drawn creatives for more than a century. Manitou's gallery scene reflects its character: idiosyncratic, independent, and resistant to the kind of market pressures that homogenize art communities in wealthier resort towns. The annual Pikes Peak International Hill Climb attracts visitors who discover the gallery district while exploring the town.`,
    meta_title: 'Manitou Springs, CO Art Galleries | Southwest Galleries',
    meta_description: 'Explore art galleries and the Manitou Art Center in Manitou Springs, Colorado — a distinctive Victorian arts community at the base of Pikes Peak near Colorado Springs.',
  },
  {
    id: 61, // Ouray
    description: `Ouray is a small mountain town in a box canyon in the San Juan Mountains, surrounded on three sides by peaks that rise more than 13,000 feet — a setting so dramatically beautiful that it has been called the Switzerland of America since the 19th century. The landscape draws landscape painters and photographers from across the country, and Ouray's compact gallery district reflects that tradition in a concentrated form: studios and galleries operating out of Victorian-era commercial buildings, showing work that takes the San Juan Mountains as its primary subject. Ouray's winter ice climbing festival and summer jeep touring season bring visitors who discover the gallery scene while exploring the surrounding wilderness, making the town's small size surprisingly effective at reaching a diverse art-interested audience.`,
    meta_title: 'Ouray, CO Art Galleries | San Juan Mountain Art | Southwest Galleries',
    meta_description: 'Discover art galleries in Ouray, Colorado — the "Switzerland of America," where dramatic San Juan Mountain scenery inspires landscape painters and photographers.',
  },
  {
    id: 62, // Pagosa Springs
    description: `Pagosa Springs sits in the southern San Juan Mountains along the San Juan River, a small mountain town known for its hot springs and increasingly recognized as an emerging arts destination in southwestern Colorado. The Pagosa Arts Council and the annual Pagosa Springs Plein Air event have helped build a creative community around the extraordinary landscape of the San Juan Basin — high desert, mountain meadows, and the peaks of the Weminuche Wilderness. Galleries along Pagosa Street and in the surrounding Hot Springs Boulevard area show work rooted in the landscape of southwestern Colorado, with a community of working artists who have chosen Pagosa Springs for the same reasons landscape painters have always chosen remote and beautiful places: the light is extraordinary, and the cost of a working life is still manageable.`,
    meta_title: 'Pagosa Springs, CO Art Galleries | Southwest Galleries',
    meta_description: 'Explore art galleries and plein air painting in Pagosa Springs, Colorado — an emerging mountain arts destination in the southern San Juan Mountains.',
  },
  {
    id: 37, // Pueblo
    description: `Pueblo is a former steel city on the Arkansas River, 45 miles south of Colorado Springs, whose arts scene has undergone a genuine revival in recent decades — driven partly by the conversion of industrial buildings into studio space and partly by the energy of the Sangre de Cristo Arts and Conference Center, one of the most ambitious cultural institutions in southern Colorado. The center's permanent collection includes strong holdings in Western American art, and its gallery program serves a regional audience that extends into the San Luis Valley and northern New Mexico. Pueblo's steel-town heritage gives its arts community a grittier character than the mountain resort towns to the north, and the Union Avenue Historic District has developed a growing cluster of galleries and creative businesses in its 19th-century commercial buildings.`,
    meta_title: 'Pueblo, CO Art Galleries & Arts Center | Southwest Galleries',
    meta_description: 'Discover art galleries and the Sangre de Cristo Arts Center in Pueblo, Colorado — a former steel city with a thriving arts revival along the Arkansas River.',
  },
  {
    id: 38, // Steamboat Springs
    description: `Steamboat Springs is a ski resort town in the Yampa Valley of northwestern Colorado, and its art scene reflects the particular culture of a wealthy mountain community whose identity is shaped more by outdoor sport than by collecting. That said, the Steamboat Springs Arts Council and the galleries along Lincoln Avenue support a community of working artists who have chosen the Yampa Valley for its landscape and its quality of life, and the annual Strings Music Festival brings a cultural seriousness to the summer season that elevates the broader creative community. Steamboat's galleries tend to show work rooted in the Rocky Mountain landscape — painting, photography, and sculpture that speaks to the environment of northwestern Colorado.`,
    meta_title: 'Steamboat Springs, CO Art Galleries | Southwest Galleries',
    meta_description: 'Explore art galleries in Steamboat Springs, Colorado — a Yampa Valley mountain community with landscape-rooted painting, photography, and Rocky Mountain art.',
  },
  {
    id: 35, // Telluride
    description: `Telluride occupies one of the most dramatically beautiful locations of any small town in the American West — a box canyon in the San Juan Mountains, accessible until recently only by steep mountain roads or a small airport — and its art scene reflects the kind of cultural ambition that takes root when serious money meets extraordinary scenery. The Telluride Arts District supports fine art galleries along Colorado Avenue that show work of genuine museum quality, and the town's festival culture — film, jazz, bluegrass, and several literary and ideas festivals each year — brings a cosmopolitan audience to a place that might otherwise seem too remote to sustain a serious art market. Summer is the primary gallery season, when the population swells with visitors drawn by the festivals and the incomparable mountain landscape.`,
    meta_title: 'Telluride, CO Art Galleries | Mountain Arts | Southwest Galleries',
    meta_description: 'Discover art galleries in Telluride, Colorado — a dramatic San Juan Mountain box canyon with a serious fine arts market and a world-class summer festival culture.',
  },
  {
    id: 39, // Vail
    description: `Vail is one of the most affluent ski resort communities in the American West, and its art scene reflects that wealth in galleries along Bridge Street and in the surrounding Vail Village that show museum-quality painting, sculpture, and photography for collectors with serious budgets. The Vail Valley Foundation and the Gerald R. Ford Amphitheater give the cultural scene an institutional anchor, and the summer art program — including the Vail Arts Festival each July — draws galleries and collectors from across the Mountain West to a village that is, for a few weeks each year, one of the most active small art markets in Colorado. The combination of winter skiing and summer arts programming makes Vail's galleries viable year-round in a way that few small mountain towns can sustain.`,
    meta_title: 'Vail, CO Art Galleries | Mountain Art & Sculpture | Southwest Galleries',
    meta_description: 'Explore art galleries in Vail, Colorado — a world-class ski resort community with fine art galleries, the Vail Arts Festival, and a sophisticated mountain collector market.',
  },

  // NEW MEXICO
  {
    id: 8, // Albuquerque
    description: `Albuquerque is New Mexico's largest city and an increasingly vital arts destination shaped by the intersection of Indigenous, Hispanic, and contemporary art traditions that define the cultural life of the Rio Grande corridor. Old Town, founded in 1706 and among the oldest continuously inhabited European settlements in the United States, is ringed with galleries selling Southwestern and Indigenous art in adobe buildings around a historic plaza that has functioned as a trading post for centuries. The emerging contemporary scene in Barelas, South Broadway, and the Nob Hill district has developed genuine depth, supported by the University of New Mexico's strong art programs and the institutional anchor of the Albuquerque Museum's permanent collection. The city's proximity to Acoma Pueblo — a mesa-top village continuously inhabited for more than a thousand years — gives Albuquerque's art world a cultural richness that few American cities of its size can match.`,
    meta_title: 'Albuquerque, NM Art Galleries & Museums | Southwest Galleries',
    meta_description: 'Discover art galleries in Albuquerque, New Mexico — Old Town galleries, contemporary art districts, the Albuquerque Museum, and deep Indigenous cultural traditions.',
  },
  {
    id: 48, // Española
    description: `Española sits at the confluence of the Rio Grande and the Chama River in northern New Mexico, surrounded by some of the most historically significant landscape in the American Southwest — the cradle of Spanish colonial settlement in New Mexico, adjacent to Pueblo communities that predate European contact by centuries, and gateway to the high desert country of Georgia O'Keeffe's Ghost Ranch paintings. The city's gallery scene is modest in scale but culturally deep, reflecting the living traditions of Hispanic santero carving and tinwork alongside contemporary work by artists who have settled in the surrounding villages of the Española Valley. Nearby Ohkay Owingeh (San Juan Pueblo) and Santa Clara Pueblo are centers of ceramic and pottery traditions that remain among the most vital Indigenous art forms in the Southwest.`,
    meta_title: 'Española, NM Art Galleries | Rio Grande Valley Art | Southwest Galleries',
    meta_description: 'Explore art galleries in Española, New Mexico — gateway to northern NM\'s Spanish colonial and Pueblo art traditions, O\'Keeffe country, and the Rio Grande Valley.',
  },
  {
    id: 45, // Las Cruces
    description: `Las Cruces is southern New Mexico's largest city, a rapidly growing university community along the Rio Grande with an arts scene that reflects the deep Mexican American cultural heritage of the Mesilla Valley and the contemporary energy of New Mexico State University. Old Mesilla, the historic plaza village annexed by Las Cruces, contains galleries and studios in adobe buildings along a 19th-century plaza that has been a center of trade and culture since the Spanish colonial period. The Las Cruces Museum of Art and NMSU's University Art Gallery present exhibition programs that serve a regional audience extending into El Paso, and the city's growing creative community has taken root in renovated downtown buildings along Main Street.`,
    meta_title: 'Las Cruces, NM Art Galleries & Museums | Southwest Galleries',
    meta_description: 'Discover art galleries in Las Cruces, New Mexico — Old Mesilla galleries, the Las Cruces Museum of Art, and a growing creative community in the Rio Grande Valley.',
  },
  {
    id: 46, // Roswell
    description: `Roswell is best known for its 1947 UFO incident, but the city's serious cultural asset is the Roswell Museum and Art Center — one of the finest regional art museums in the Southwest, with a remarkable permanent collection that includes the world's most significant holding of works by Peter Hurd and Henriette Wyeth, alongside strong collections of New Mexico modernism and Southwestern painting. The Hurd-Wyeth connection gives Roswell's art world a family depth that is unusual: Peter Hurd's tempera landscapes of the Hondo Valley, painted en plein air over decades from his ranch east of the city, defined a way of seeing southeastern New Mexico that continues to influence artists working in the region today. The Anderson Museum of Contemporary Art, founded by collector Don Anderson, adds a serious contemporary program to what might otherwise seem an unlikely arts destination.`,
    meta_title: 'Roswell, NM Art Galleries & Museums | Southwest Galleries',
    meta_description: 'Explore the Roswell Museum, Anderson Museum of Contemporary Art, and the Peter Hurd and Henriette Wyeth legacy in Roswell, New Mexico\'s surprising arts destination.',
  },
  {
    id: 6, // Santa Fe
    description: `Santa Fe is the art capital of the American Southwest and one of the most significant gallery cities in the United States, with Canyon Road alone containing more than 80 galleries within a single walkable mile — a concentration found nowhere else in the country. The city's art market spans centuries and cultures: Spanish colonial devotional art and furniture, Diné weaving and silver jewelry, Pueblo ceramics and kachina carvings, and contemporary painting and sculpture of international significance all coexist in a gallery district that has operated continuously for more than a century. The Georgia O'Keeffe Museum anchors the downtown arts scene, the Palace of the Governors portal hosts Indigenous artists selling directly to the public every day of the year, and the annual August Indigenous art market draws artists from hundreds of nations and collectors from every continent. For serious art travelers, Santa Fe rewards days of unhurried exploration.`,
    meta_title: 'Santa Fe, NM Art Galleries & Canyon Road | Southwest Galleries',
    meta_description: 'Discover Santa Fe, New Mexico\'s world-class art scene — Canyon Road galleries, the Georgia O\'Keeffe Museum, Pueblo pottery, Diné jewelry, and the premier Indigenous art market.',
  },
  {
    id: 47, // Silver City
    description: `Silver City is a small mining town in the Mogollon Mountains of southwestern New Mexico, and it has developed one of the most genuine artist communities in the state — driven not by tourism or a luxury real estate market, but by the attraction of affordable studio space, extreme landscape, and a creative community that sustains itself on its own terms. The Mimbres Valley to the south is one of the most significant archaeological sites in the Southwest, home to the distinctive Mimbres pottery tradition that flourished from AD 1000 to 1130 and whose geometric figurative designs continue to influence contemporary ceramicists. The galleries and studios of downtown Silver City — many occupying 19th-century brick commercial buildings — show work that reflects the particular visual culture of the high desert borderlands: raw, unhurried, and deeply place-specific.`,
    meta_title: 'Silver City, NM Art Galleries & Studios | Southwest Galleries',
    meta_description: 'Explore art galleries and studios in Silver City, New Mexico — an authentic artist community in the Mogollon Mountains with deep connections to the Mimbres pottery tradition.',
  },
  {
    id: 7, // Taos
    description: `Taos has been drawing artists since Ernest Blumenschein and Bert Phillips arrived by wagon in 1898 and decided to stay — a decision that launched one of the most consequential art colonies in American history. The Taos Society of Artists, formed in 1915, established the town as a serious destination for painters working with the extraordinary light of the high desert, and that tradition continues unbroken in galleries, studios, and museums that make Taos one of the most concentrated art experiences in the Southwest. The Millicent Rogers Museum holds one of the finest collections of Southwestern art and craft in the world, with particular depth in Diné and Pueblo textiles, pottery, and jewelry. Taos Pueblo, a UNESCO World Heritage Site continuously inhabited for more than a thousand years, anchors a living Indigenous culture that remains central to the region's artistic identity.`,
    meta_title: 'Taos, NM Art Galleries & Museums | Southwest Galleries',
    meta_description: 'Discover Taos, New Mexico\'s legendary art scene — the Taos Society of Artists legacy, Millicent Rogers Museum, Taos Pueblo, and dozens of galleries in the high desert.',
  },

  // NEVADA
  {
    id: 42, // Carson City
    description: `Carson City is Nevada's state capital, a small city in the Carson Valley at the foot of the Sierra Nevada with a cultural life shaped by its function as the seat of state government and its proximity to Lake Tahoe. The Nevada State Museum and Nevada State Railroad Museum give the city a solid institutional base, and the arts district along Carson Street supports galleries and studios that serve the state government community and the tourist traffic passing through on the way to Reno and Lake Tahoe. Carson City's art scene reflects the Silver State's particular history — mining, ranching, and the infrastructure of the American West — in work that tends toward landscape painting, historical Western art, and the crafts traditions of the Great Basin.`,
    meta_title: 'Carson City, NV Art Galleries | Nevada Capital Arts | Southwest Galleries',
    meta_description: 'Explore art galleries in Carson City, Nevada — the state capital with Nevada State Museum, Western art galleries, and Great Basin cultural traditions.',
  },
  {
    id: 43, // Elko
    description: `Elko is the cultural capital of the Great Basin, a ranching and mining city in northeastern Nevada best known as the home of the National Cowboy Poetry Gathering — an annual January event that draws poets, musicians, and storytellers from across the ranching West and has, since 1985, done more to sustain the living traditions of cowboy culture than any other single institution. The Western Folklife Center, which produces the Gathering and maintains year-round programming, is one of the most important folk arts organizations in the American West, and its gallery space shows work that takes the Great Basin landscape and ranching culture as its subject. Elko's art scene is rooted in working traditions rather than collector culture — this is art made by and for people who actually work the land.`,
    meta_title: 'Elko, NV Art Galleries | Cowboy Poetry & Western Art | Southwest Galleries',
    meta_description: 'Discover Western Folklife Center and art galleries in Elko, Nevada — home of the National Cowboy Poetry Gathering and Great Basin ranching cultural traditions.',
  },
  {
    id: 41, // Henderson
    description: `Henderson is the second-largest city in Nevada, adjacent to Las Vegas, and its arts scene benefits from proximity to the metropolitan area's cultural infrastructure while offering a more community-oriented creative environment. The City of Henderson's cultural programming, centered on the Henderson Pavilion and the DISCOVERY Children's Museum, supports an active public arts program and a growing cluster of galleries and studios in the Water Street District — Henderson's historic downtown corridor that has undergone significant revitalization. The community's relative affordability compared to Las Vegas proper has attracted working artists who supply the gallery district with a consistent stream of new work rooted in the Mojave Desert landscape.`,
    meta_title: 'Henderson, NV Art Galleries | Southwest Galleries',
    meta_description: 'Explore art galleries and the Water Street arts district in Henderson, Nevada — a growing creative community adjacent to Las Vegas in the Mojave Desert.',
  },
  {
    id: 12, // Las Vegas NV
    description: `Las Vegas is simultaneously one of the most and least likely art cities in America — a place whose neon-drenched popular image conceals a surprisingly serious arts infrastructure built on the disposable income of a tourist economy that can afford to take risks. The Arts District on South Main Street has developed over two decades into a genuine gallery and studio community, anchored by First Friday events that draw thousands of visitors monthly to a compact corridor of galleries, restaurants, and performance spaces. The Neon Museum preserves the iconic signage of the Strip's past as artifacts of American commercial art and folk culture, and the Las Vegas Museum of Art brings serious contemporary programming to a city better known for spectacle. Outside the Strip's entertainment context, Las Vegas supports working artists in disciplines from painting and sculpture to neon fabrication.`,
    meta_title: 'Las Vegas, NV Art Galleries & Arts District | Southwest Galleries',
    meta_description: 'Discover Las Vegas, Nevada\'s art scene — the Arts District, First Friday, Neon Museum, and a surprisingly serious gallery community beyond the Strip.',
  },
  {
    id: 40, // Reno
    description: `Reno calls itself the Biggest Little City in the World, and its art scene lives up to that paradox — a metropolitan arts infrastructure of genuine depth in a compact and accessible city that sits in the shadow of Lake Tahoe and the Sierra Nevada. The Nevada Museum of Art is the only accredited art museum in the state and holds a strong permanent collection with particular depth in landscape painting and photography of the American West, alongside a contemporary program that regularly presents work of national significance. Reno's downtown arts district, energized in part by the cultural aftereffects of Burning Man — which draws tens of thousands of participants annually to the Black Rock Desert 100 miles north — has developed a lively community of studios, alternative spaces, and galleries that reflect the city's distinctive mix of casino culture and counterculture creativity.`,
    meta_title: 'Reno, NV Art Galleries & Nevada Museum of Art | Southwest Galleries',
    meta_description: 'Explore art galleries and the Nevada Museum of Art in Reno — the Biggest Little City\'s serious arts scene, Burning Man culture, and Sierra Nevada landscape painting.',
  },
  {
    id: 44, // Virginia City
    description: `Virginia City was the richest city west of the Mississippi in the 1860s and 1870s, built on the silver wealth of the Comstock Lode that funded the Union side of the Civil War and financed San Francisco's Victorian grandeur. The city's remarkably intact 19th-century streetscape — C Street has changed little since Mark Twain walked it as a reporter for the Territorial Enterprise — draws visitors who discover a gallery district occupying original saloon and merchant buildings that have been in continuous use for more than 150 years. The art sold here reflects the heritage of the Comstock era: Western landscapes, historical scenes, and work in the mining-town tradition that gave the American West its visual mythology.`,
    meta_title: 'Virginia City, NV Art Galleries | Comstock Lode Art | Southwest Galleries',
    meta_description: 'Discover art galleries in Virginia City, Nevada — a remarkably intact Comstock Lode silver mining town with galleries in 19th-century buildings on Mark Twain\'s old beat.',
  },

  // TEXAS
  {
    id: 52, // Austin
    description: `Austin has emerged as one of the most dynamic contemporary art cities in the American South, driven by a booming tech economy, a large university population, and a creative culture that has historically attracted artists priced out of coastal markets. The Blanton Museum of Art at the University of Texas holds a strong permanent collection — including an important group of Latin American modernist paintings — and the contemporary scene is anchored by institutions like the Blanton, the Austin Museum of Art (Laguna Gloria), and a growing nonprofit sector of alternative spaces and artist-run galleries. The city's East Austin arts district, centered on East 6th Street and East Cesar Chavez, has developed the kind of studio-to-gallery pipeline that sustains a genuine working art community, and the Mexican American Cultural Center — recently reopened after a $27 million expansion — anchors the city's deep Latino cultural heritage.`,
    meta_title: 'Austin, TX Art Galleries & Museums | Southwest Galleries',
    meta_description: 'Discover Austin, Texas\'s contemporary art scene — Blanton Museum, East Austin galleries, the Mexican American Cultural Center, and one of the South\'s most dynamic creative communities.',
  },
  {
    id: 50, // Dallas
    description: `Dallas has the most ambitious art collecting culture in Texas and one of the most significant concentrations of museum-quality institutions in the American South. The Dallas Museum of Art's permanent collection — with particular strength in European decorative arts and pre-Columbian and Indigenous American art — anchors the Arts District alongside the Nasher Sculpture Center, whose Renzo Piano building and garden contain one of the finest collections of modern and contemporary sculpture in the world. The commercial gallery scene concentrates in the Design District and the Arts District around Harwood Street, where dealers represent artists of international standing. Dallas's collector base has historically been among the most serious in Texas, supporting a market for work that competes with New York and Los Angeles in ambition and price.`,
    meta_title: 'Dallas, TX Art Galleries & Museums | Southwest Galleries',
    meta_description: 'Explore Dallas, Texas\'s world-class art scene — Dallas Museum of Art, Nasher Sculpture Center, Design District galleries, and one of the South\'s top collector markets.',
  },
  {
    id: 54, // El Paso
    description: `El Paso sits at the far western tip of Texas, across the Rio Grande from Ciudad Juárez, Mexico, and its art scene is shaped profoundly by that border position — a bicultural, bilingual creative community whose work cannot be understood apart from the history of the U.S.-Mexico borderlands. The El Paso Museum of Art holds a strong permanent collection with particular depth in Old Masters painting and Mexican colonial art, alongside a contemporary program that reflects the city's unique cultural position. The Chamizal National Memorial, a park commemorating the resolution of a century-long border dispute, contains gallery spaces that regularly present exhibitions exploring the shared heritage of the El Paso-Juárez region. The murals and public art of El Paso's Segundo Barrio neighborhood are among the most significant examples of Chicano public art in the American Southwest.`,
    meta_title: 'El Paso, TX Art Galleries & Museums | Southwest Galleries',
    meta_description: 'Discover El Paso, Texas\'s bicultural art scene — El Paso Museum of Art, border art traditions, Chicano murals, and the unique creative culture of the U.S.-Mexico borderlands.',
  },
  {
    id: 51, // Fort Worth
    description: `Fort Worth has, improbably, assembled one of the finest concentrations of art museums in the United States in its Cultural District — the Kimbell Art Museum, widely regarded as the greatest small art museum in America; the Modern Art Museum of Fort Worth, housed in a Tadao Ando building over a reflective pond; and the Amon Carter Museum of American Art, whose collection of Western American painting and photography is without peer. The Kimbell's collection, small and deliberately chosen, includes works by Velázquez, Caravaggio, Rembrandt, Monet, and Cézanne that would be the crown jewel of any museum in the world. Fort Worth's commercial gallery scene is centered in the West 7th and Near Southside neighborhoods, and the city's Sundance Square arts programming complements the museum district to make Fort Worth one of the most rewarding art destinations in the South.`,
    meta_title: 'Fort Worth, TX Art Galleries & Kimbell Art Museum | Southwest Galleries',
    meta_description: 'Explore Fort Worth, Texas — home to the Kimbell Art Museum, Modern Art Museum, Amon Carter Museum of American Art, and one of America\'s finest museum districts.',
  },
  {
    id: 49, // Houston
    description: `Houston is one of the great art cities of the United States, home to the Museum of Fine Arts Houston — whose permanent collection of more than 70,000 works spans ancient to contemporary across every medium — and the incomparable Menil Collection, assembled by Dominique and John de Menil and housed in a purpose-built Renzo Piano building that is itself a masterwork of museum architecture. The Menil campus extends to include the Rothko Chapel, an ecumenical meditation space containing fourteen large-scale paintings commissioned from Mark Rothko, and the Cy Twombly Gallery, a suite of rooms holding one of the most important concentrations of Twombly's work in the world. Houston's commercial gallery scene, centered in the Montrose and Heights neighborhoods, reflects the ambitions of a metropolitan collecting class that supports work of international significance.`,
    meta_title: 'Houston, TX Art Galleries & Museums | Southwest Galleries',
    meta_description: 'Discover Houston, Texas\'s world-class art scene — MFAH, the Menil Collection, Rothko Chapel, Cy Twombly Gallery, and one of the great American art cities.',
  },
  {
    id: 18, // Marfa
    description: `Marfa is a high desert ranching town of 1,700 people in the Trans-Pecos region of far west Texas, and it is one of the most improbable and celebrated art destinations in the world — a place transformed by Donald Judd's decision in 1971 to move from New York and install his own and others' work permanently in the landscape and buildings of a former U.S. Army fort. The Chinati Foundation, Judd's monument, contains 15 site-specific permanent installations by Judd and 13 other artists across 340 acres, including 100 untitled works in mill aluminum housed in two converted artillery sheds that constitute one of the greatest experiences of minimalist art available anywhere. Marfa's remoteness — it is four hours from any major Texas city — functions as a filter: the people who make the effort to come tend to be serious, and the art scene that has developed around Chinati reflects that seriousness.`,
    meta_title: 'Marfa, TX Art Galleries & Chinati Foundation | Southwest Galleries',
    meta_description: 'Discover Marfa, Texas — Donald Judd\'s minimalist legacy, the Chinati Foundation, and one of the world\'s most celebrated remote art destinations in the Trans-Pecos high desert.',
  },
  {
    id: 53, // San Antonio
    description: `San Antonio is the oldest major city in Texas and one of the most culturally complex, shaped by three centuries of Spanish colonial rule, Mexican governance, and Anglo-American settlement into a city whose artistic identity is inseparable from its Hispanic heritage. The San Antonio Museum of Art occupies a converted 19th-century brewery and holds an exceptional collection of Latin American art — one of the most important in the United States — alongside strong holdings in pre-Columbian art and ancient Mediterranean works. The Blue Star Arts Complex in the Southtown neighborhood, a converted warehouse along the San Antonio River, anchors the contemporary arts scene with studios, galleries, and a satellite space of the Children's Museum of San Antonio, and the surrounding King William Historic District has developed a walkable cluster of galleries reflecting the neighborhood's distinctive Mexican American cultural heritage.`,
    meta_title: 'San Antonio, TX Art Galleries & Museums | Southwest Galleries',
    meta_description: 'Explore San Antonio, Texas\'s art scene — San Antonio Museum of Art, Latin American art, Blue Star Arts Complex, and a rich Hispanic cultural heritage along the River Walk.',
  },

  // UTAH
  {
    id: 60, // Cedar City
    description: `Cedar City sits at the edge of the Colorado Plateau in southwestern Utah, gateway to Bryce Canyon, Zion, and Cedar Breaks National Monument — a landscape of extraordinary drama that has long attracted landscape painters and photographers. The Utah Shakespeare Festival, now in its seventh decade, brings a serious cultural audience to Cedar City each summer and fall, and the community it has built around the festival has sustained a gallery and studio scene that might otherwise be difficult to support in a city of its size. The Southern Utah Museum of Art at Southern Utah University provides institutional support for the visual arts, presenting exhibitions that reflect the extraordinary landscape of the Colorado Plateau and the Indigenous cultural heritage of the surrounding region.`,
    meta_title: 'Cedar City, UT Art Galleries | Southern Utah Art | Southwest Galleries',
    meta_description: 'Discover art galleries and the Southern Utah Museum of Art in Cedar City — gateway to Bryce Canyon and Zion, with a cultural community built around the Utah Shakespeare Festival.',
  },
  {
    id: 14, // Moab
    description: `Moab sits at the heart of the Colorado Plateau canyon country — surrounded by Arches National Park, Canyonlands National Park, and the Colorado and Green Rivers — and its art scene is shaped entirely by the landscape that has made it one of the most photographed places on earth. The galleries along Main Street show work rooted in the red rock desert: landscape painting, photography, and ceramics that take the color and form of the surrounding canyon country as their primary subject. Moab's gallery district is modest in scale relative to the town's tourist traffic, but the quality of the landscape work on offer reflects the fact that working artists have chosen Moab for the same reason landscape photographers have: no place in the American West offers this particular combination of color, form, and geological drama.`,
    meta_title: 'Moab, UT Art Galleries | Canyon Country Art | Southwest Galleries',
    meta_description: 'Explore art galleries in Moab, Utah — canyon country landscape painting, photography, and desert art in the heart of Arches and Canyonlands country.',
  },
  {
    id: 58, // Ogden
    description: `Ogden is northern Utah's largest city, a former railroad hub that has undergone significant creative revitalization in recent years around the 25th Street Historic District and the Weber State University arts community. The Ogden Union Station, the great 1924 railroad depot that anchors the downtown, has been converted to house museums and gallery spaces, and the surrounding historic district has attracted studios and galleries to its late-19th-century commercial buildings. Ogden's arts scene is younger and more experimental than Salt Lake City's, drawing energy from WSU's art programs and from the outdoor recreation culture that sustains the creative economy of the Wasatch Front.`,
    meta_title: 'Ogden, UT Art Galleries & Studios | Southwest Galleries',
    meta_description: 'Discover art galleries in Ogden, Utah — the 25th Street Historic District, Weber State University arts community, and a growing creative scene on the Wasatch Front.',
  },
  {
    id: 55, // Park City
    description: `Park City is Utah's most sophisticated mountain resort, home to the Sundance Film Festival and a gallery district along Historic Main Street that serves a collector base among the wealthiest in the Mountain West. The Kimball Art Center, the city's primary nonprofit arts institution, presents an ambitious year-round program of contemporary exhibitions and the annual Park City Kimball Arts Festival — one of the most attended outdoor art events in the western United States. The galleries along Main Street show work that tends toward the accessible end of contemporary art — strong painting, photography, and sculpture at prices that reflect the resort economy — and the combination of the Sundance audience and the ski season ensures that Park City's galleries reach a consistently sophisticated national and international audience.`,
    meta_title: 'Park City, UT Art Galleries & Kimball Art Center | Southwest Galleries',
    meta_description: 'Explore art galleries and the Kimball Art Center in Park City, Utah — a mountain resort arts scene with Sundance Film Festival culture and Historic Main Street galleries.',
  },
  {
    id: 56, // Provo
    description: `Provo is home to Brigham Young University, one of the largest private universities in the United States, and the BYU Museum of Art is among the most significant university art museums in the American West — holding a collection of more than 17,000 works with particular strength in 19th-century European painting and Mormon and Utah art history. The campus arts programs supply a continuous stream of working artists to the Utah County creative community, and the downtown Provo arts district along Center Street has developed a growing cluster of galleries and studios that draw from both the university audience and the broader community. Provo's proximity to Springville, the "Art City of Utah," makes the two communities complementary destinations for a day of serious gallery-going in Utah County.`,
    meta_title: 'Provo, UT Art Galleries & BYU Museum of Art | Southwest Galleries',
    meta_description: 'Discover art galleries and the BYU Museum of Art in Provo, Utah — a university arts hub in Utah County with one of the Mountain West\'s finest academic art collections.',
  },
  {
    id: 13, // Salt Lake City
    description: `Salt Lake City is the cultural capital of Utah and the Mountain West's most surprising art city — home to the Utah Museum of Fine Arts, whose permanent collection spans ancient Egypt to contemporary Utah artists, and a downtown gallery district centered on the Granary District and Pierpont Avenue that has developed genuine depth over the past two decades. The city's art scene reflects the particular character of a place shaped simultaneously by a dominant religious culture and by a significant countercultural presence: Mormon temple architecture and the Gilgal Sculpture Garden, a private collection of extraordinary folk art sculpture created by a stonemason from 1945 to 1963, coexist in a city that is more culturally complex than its reputation suggests. The Utah Museum of Contemporary Art presents ambitious contemporary programming in a purpose-built downtown facility, and the growing Granary District has become the center of the city's studio culture.`,
    meta_title: 'Salt Lake City, UT Art Galleries & Museums | Southwest Galleries',
    meta_description: 'Explore Salt Lake City\'s art scene — Utah Museum of Fine Arts, Granary District galleries, Utah Museum of Contemporary Art, and the unexpected cultural depth of the Mountain West\'s capital.',
  },
  {
    id: 57, // Springville
    description: `Springville calls itself the "Art City of Utah," and the designation is earned: the Springville Museum of Art, founded in 1903, is one of the oldest and most comprehensive art museums in the American West, holding a permanent collection of more than 2,200 works with unmatched depth in Utah art history — from the 19th-century pioneer painters who documented the Great Basin landscape to the contemporary Utah artists who continue that tradition. The museum's annual Spring Salon, running since 1925, is the oldest continuously operating juried art exhibition west of the Mississippi. Springville's gallery district along Main Street serves collectors who make the 45-minute trip from Salt Lake City specifically for the museum and the associated community of working studios.`,
    meta_title: 'Springville, UT Art Galleries & Springville Museum of Art | Southwest Galleries',
    meta_description: 'Discover Springville, Utah — the "Art City of Utah" with the Springville Museum of Art, the oldest juried art exhibition in the West, and a deep Utah art history collection.',
  },
  {
    id: 59, // St. George
    description: `St. George anchors southwestern Utah's rapidly growing Washington County, a retirement and tourism destination surrounded by the extraordinary landscape of the Colorado Plateau — Zion National Park, Snow Canyon State Park, and the red rock formations of the Virgin River corridor. The Dixie Center for the Arts and the St. George Art Museum provide institutional support for a visual arts community that is growing alongside the city's population, and the downtown gallery district along Tabernacle Street reflects the region's particular landscape painting tradition. St. George's proximity to Zion, just 40 minutes away, means the city's gallery scene benefits from the significant tourist traffic passing through on the way to one of the most visited national parks in the United States.`,
    meta_title: 'St. George, UT Art Galleries | Southwest Utah Art | Southwest Galleries',
    meta_description: 'Explore art galleries in St. George, Utah — gateway to Zion National Park, with landscape painting traditions and a growing arts scene in the red rock Colorado Plateau.',
  },

  // CALIFORNIA
  {
    id: 25, // Berkeley
    description: `Berkeley's art scene is shaped by the University of California and by the political and countercultural history that has made this small East Bay city one of the most intellectually lively places in the American West. The Berkeley Art Museum and Pacific Film Archive (BAMPFA) presents one of the most ambitious university museum programs in the country, with a collection that includes major holdings in 20th-century American painting, Asian art, and the work of the Bay Area Figurative School. The Fourth Street and Elmwood gallery districts offer contemporary work in neighborhoods where serious collectors and working artists have coexisted for decades, and the city's proximity to San Francisco means Berkeley functions as the more accessible, less commercial side of one of America's great metropolitan art markets.`,
    meta_title: 'Berkeley, CA Art Galleries & BAMPFA | Southwest Galleries',
    meta_description: 'Discover art galleries and BAMPFA in Berkeley, California — a university arts hub with Bay Area Figurative tradition and a serious contemporary collector community.',
  },
  {
    id: 22, // Carmel
    description: `Carmel-by-the-Sea is one of the most concentrated gallery destinations on the California coast — a small village of fewer than 4,000 permanent residents with more than 100 galleries within its square mile, making it, by some measures, the highest gallery-to-resident ratio of any community in the United States. The Carmel Art Association, founded in 1927 by a group of painters that included William Ritschel and Paul Whitman, is the oldest cooperative gallery in California and remains one of the most important institutions for plein air and California Impressionist painting in the state. The surrounding Big Sur coastline and the Carmel Valley have been drawing painters since the early 20th century, and the quality of California coastal light has sustained a plein air tradition here that is among the strongest in the American West.`,
    meta_title: 'Carmel, CA Art Galleries | Carmel Art Association | Southwest Galleries',
    meta_description: 'Explore Carmel-by-the-Sea\'s 100+ galleries, the Carmel Art Association, and California plein air painting traditions on the Monterey Peninsula.',
  },
  {
    id: 24, // Laguna Beach
    description: `Laguna Beach is the plein air capital of California and one of the most storied artist communities in the American West — a coastal village south of Los Angeles where the Laguna Beach Art Association, founded in 1918, gave rise to one of the most important regional art movements in California history. The Festival of Arts, held every summer since 1932, is one of the longest-running outdoor art exhibitions in the United States, and the adjacent Sawdust Art Festival draws 200 independent artists to a eucalyptus grove for an eight-week summer run that has no equivalent on the West Coast. The Laguna Art Museum, the only museum in Southern California devoted exclusively to California art, holds a permanent collection that documents the full history of Laguna Beach's extraordinary artistic legacy from the early Impressionists to the present.`,
    meta_title: 'Laguna Beach, CA Art Galleries & Laguna Art Museum | Southwest Galleries',
    meta_description: 'Discover Laguna Beach, California — the plein air capital of the West, Festival of Arts, Laguna Art Museum, and a century-old artist community on the Southern California coast.',
  },
  {
    id: 15, // Los Angeles
    description: `Los Angeles is one of the great art cities of the world, home to the Getty Center, LACMA, MOCA, and the Hammer Museum — a concentration of institutional collecting power that rivals any city outside New York — alongside a commercial gallery market centered in Culver City, West Hollywood, and the Arts District that represents artists of global significance. The city's scale and diversity produce an art world of genuine breadth: the Getty Villa in Malibu holds one of the most important collections of ancient Mediterranean art in the United States, while the Watts Towers stand as one of the most extraordinary works of folk art anywhere in the world. Los Angeles's role as the center of the global film and entertainment industry gives its art scene a particular relationship to celebrity and commercial culture that produces both extraordinary excess and genuine creative ambition.`,
    meta_title: 'Los Angeles, CA Art Galleries & Museums | Southwest Galleries',
    meta_description: 'Explore Los Angeles\'s world-class art scene — Getty Center, LACMA, MOCA, Hammer Museum, and a global gallery market across Culver City, West Hollywood, and the Arts District.',
  },
  {
    id: 21, // Palm Springs
    description: `Palm Springs sits in the Coachella Valley at the foot of the San Jacinto Mountains, and its art scene combines the legacy of Hollywood's mid-century modern culture — when Frank Sinatra, Marilyn Monroe, and the Rat Pack made the desert their retreat — with a serious contemporary art infrastructure that has grown substantially in recent decades. The Palm Springs Art Museum is the most significant cultural institution between Los Angeles and the Arizona border, with a strong permanent collection in mid-20th century American art, California painting, and the work of Agua Caliente Cahuilla artists whose homeland includes the Coachella Valley. The Modernism Week festival, held each February, draws collectors and design enthusiasts from across the world to celebrate the extraordinary concentration of mid-century modern architecture that defines the city's physical character.`,
    meta_title: 'Palm Springs, CA Art Galleries & Palm Springs Art Museum | Southwest Galleries',
    meta_description: 'Discover Palm Springs, California\'s art scene — Palm Springs Art Museum, mid-century modern culture, Agua Caliente art, and the Coachella Valley\'s desert contemporary galleries.',
  },
  {
    id: 20, // San Diego
    description: `San Diego's art scene is shaped by its position as a border city — the busiest land border crossing in the Western Hemisphere separates it from Tijuana, and the bicultural creative energy of the San Diego-Tijuana region produces work that is distinctly of this place and this boundary. The San Diego Museum of Art in Balboa Park holds a strong permanent collection with particular depth in Spanish Old Masters and American Western art, and the Timken Museum of Art, in the same park, holds a jewel-box collection of European masterworks. The North Park and South Park neighborhoods on the city's Hillcrest Mesa have developed a lively contemporary arts scene, and the growing community of cross-border artists — working in both cities and making work about the experience of living in the borderlands — gives San Diego's contemporary art scene an urgency and specificity that distinguishes it from its Los Angeles neighbor.`,
    meta_title: 'San Diego, CA Art Galleries & Museums | Southwest Galleries',
    meta_description: 'Explore San Diego\'s art scene — Balboa Park museums, border culture, contemporary galleries in North Park, and the unique bicultural creativity of the San Diego-Tijuana region.',
  },
  {
    id: 19, // San Francisco
    description: `San Francisco is one of America's great art cities, home to the San Francisco Museum of Modern Art (SFMOMA) — whose collection of 20th-century and contemporary art is one of the most important in the United States — alongside the de Young Museum in Golden Gate Park, whose permanent collection spans American decorative arts, textiles from around the world, and a strong program of contemporary art. The commercial gallery scene concentrates in the Tenderloin-adjacent Geary Boulevard corridor, the Mission District, and the Dogpatch neighborhood in the emerging arts district around Minnesota Street, where several galleries have built a genuine art world community in converted industrial space. San Francisco's cultural identity is inseparable from its history of political radicalism and the Bay Area Figurative School — the movement of painters that emerged in the 1950s as a counterpoint to Abstract Expressionism — and that tradition of principled independence continues to shape the city's art world.`,
    meta_title: 'San Francisco, CA Art Galleries & SFMOMA | Southwest Galleries',
    meta_description: 'Discover San Francisco\'s art scene — SFMOMA, de Young Museum, Bay Area Figurative tradition, Mission District galleries, and one of America\'s most culturally rich art cities.',
  },
  {
    id: 23, // Santa Barbara
    description: `Santa Barbara occupies a coastal strip between the Santa Ynez Mountains and the Pacific, and its art scene reflects the particular quality of Southern California coastal culture — serious money, serious landscape, and a strong institutional infrastructure built by private philanthropy. The Santa Barbara Museum of Art holds a permanent collection of more than 27,000 works with particular strength in American and European 19th and 20th-century painting, Asian art, and antiquities, and its programming consistently presents work of national significance in a building that anchors the State Street arts corridor. The Santa Barbara arts district along State Street and upper Anacapa Street contains galleries that serve a collector base drawn from the city's permanent wealthy community and from the significant tourist traffic that makes Santa Barbara one of the most visited small cities on the California coast.`,
    meta_title: 'Santa Barbara, CA Art Galleries & Museum of Art | Southwest Galleries',
    meta_description: 'Explore art galleries and the Santa Barbara Museum of Art in Santa Barbara, California — a coastal arts hub with a world-class museum and a sophisticated collector community.',
  },
];

async function run() {
  let updated = 0;
  for (const c of cities) {
    await sql`
      UPDATE cities SET
        description = ${c.description},
        meta_title = ${c.meta_title},
        meta_description = ${c.meta_description}
      WHERE id = ${c.id}
    `;
    console.log(`  ✓ ${c.meta_title.split('|')[0].trim()}`);
    updated++;
  }
  console.log(`\nUpdated ${updated} cities.`);
  process.exit(0);
}

run().catch(e => { console.error(e.message); process.exit(1); });
