const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.NEON_DB_KEY);

const updates = [
  // Carson City
  {
    id: 245,
    full_description: `<p>Artists at Work Gallery is a cooperative run by Northern Nevada artists at the heart of Carson City's growing arts district, showcasing original paintings, sculpture, jewelry, and crafts by a juried membership of working artists from across the region. The cooperative model ensures that every purchase directly supports a working artist, and rotating membership keeps the gallery's offerings fresh and the creative community actively engaged. Carson City's historic downtown setting — the state capital sits at the foot of the Sierra Nevada, flanked by the Great Basin desert — gives the gallery a distinctive regional character that sets it apart from the gallery scenes of Reno and Las Vegas.</p>`
  },
  {
    id: 243,
    full_description: `<p>The Brewery Arts Center is one of Northern Nevada's most beloved cultural institutions, housed in a restored 1864 stone brewery that ranks among Carson City's most handsome historic buildings. The center runs galleries, a theater, studio art classes, and a vibrant calendar of exhibitions celebrating regional artists and craftspeople — making it the most comprehensive arts venue between Reno and Sacramento. The historic building itself, with its thick stone walls and industrial bones transformed into intimate creative spaces, creates an atmosphere unlike any other gallery in Nevada, and the center's deep community roots give its programming a warmth and accessibility that welcomes everyone from seasoned collectors to first-time gallery visitors.</p>`
  },
  {
    id: 244,
    full_description: `<p>The Nevada State Museum in Carson City occupies the original U.S. Mint building, a magnificent mid-Victorian structure where Nevada silver was struck into coins for two decades after statehood. As a Smithsonian-affiliated institution, the museum maintains exceptional collections of Nevada Native American art and artifacts alongside natural history and mining exhibits documenting the Comstock Lode silver rush. The building's original coining press — still operable — is the centerpiece of an experience that connects the visual arts of Nevada's Indigenous peoples with the state's extraordinary history of geological wealth and the cultural transformations that followed the discovery of silver in 1859.</p>`
  },
  // Elko
  {
    id: 247,
    full_description: `<p>The Northeastern Nevada Museum in Elko is a wide-ranging regional museum covering the natural and cultural history of one of the most remote and self-sufficient corners of the American West. Galleries are dedicated to Shoshone and Paiute heritage — the Indigenous nations who have inhabited the Great Basin for thousands of years — alongside exhibits on ranching life, the transcontinental railroad, and Western American art and photography. The museum's Western art collection reflects the deep cowboy culture of Elko County, where working ranches still operate at a scale that makes the traditions of the open range living practice rather than historical memory.</p>`
  },
  {
    id: 246,
    full_description: `<p>The Western Folklife Center in Elko is internationally known as the home of the National Cowboy Poetry Gathering — the annual winter festival that since 1985 has drawn cowboy poets, musicians, and ranch hands from across the American West to celebrate the living traditions of ranching culture. The Center's gallery and exhibition program extends this mission year-round, presenting folk art, craft, photography, and material culture from the working landscapes of the West — saddles, spurs, quilts, and paintings made by and for people who work the land. In an era of rapid cultural change, the Western Folklife Center performs an essential function: keeping the living arts of the American West alive and connected to the communities that created them.</p>`
  },
  // Henderson
  {
    id: 241,
    full_description: `<p>The City of Henderson Art Gallery presents rotating exhibitions by local and regional artists in the heart of Henderson's historic Water Street District, with free admission ensuring that art is genuinely accessible to the full community. The gallery's civic mission — presenting work that reflects and celebrates the creative life of Henderson's rapidly growing population — gives it a warmth and openness that distinguish it from more commercially oriented spaces in the Las Vegas metropolitan area. The Water Street District location, in Henderson's original downtown neighborhood, provides a historic and pedestrian-friendly setting that complements the gallery's community-centered mission and encourages visitors to linger with the work on view.</p>`
  },
  {
    id: 242,
    full_description: `<p>The Henderson Civic Arts Foundation is a nonprofit supporting arts education and exhibition programming in Nevada's second-largest city, connecting Southern Nevada artists with community audiences through gallery shows, workshops, and public installations. The Foundation's work reflects Henderson's growth from a World War II–era industrial town into a thriving city approaching 350,000 residents — a community large enough to support serious arts programming and ambitious enough to invest in its cultural future. Exhibition programming provides exposure for artists who might otherwise struggle to reach Southern Nevada's collector community, while education initiatives build the arts audience of the next generation.</p>`
  },
  // Las Vegas
  {
    id: 93,
    full_description: `<p>Art Encounter is Nevada's largest fine art gallery, presenting original works by hundreds of artists across all styles and media in an accessible, no-pressure environment that has been welcoming collectors of every level since 1989. Located near the Las Vegas Strip, the gallery's vast floor space accommodates an inventory ranging from affordable works on paper to significant paintings and sculpture, ensuring there is genuinely something for everyone regardless of budget or taste. Art Encounter's non-commission sales model removes the pressure that often intimidates first-time gallery visitors, making it one of the most genuinely welcoming gallery experiences in the entire Southwest.</p>`
  },
  {
    id: 232,
    full_description: `<p>Art Square is a live-work creative campus in Las Vegas's Arts District offering gallery spaces, artist studios, performance venues, and a community garden in a concentrated creative environment designed to support working artists at every career stage. The campus model — where artists live, work, and exhibit in the same complex — generates the kind of spontaneous creative community that tends to emerge in cities where cost-of-living allows artists to take root. Art Square's programming, including monthly First Friday events, brings the broader Las Vegas community into direct contact with working artists in their studios, offering an experience of art-making that no finished gallery show can fully replicate.</p>`
  },
  {
    id: 91,
    full_description: `<p>The Bellagio Gallery of Fine Art is one of the most unexpected cultural treasures in the American West, presenting major traveling exhibitions from top museums — works by Monet, Picasso, Warhol, and their contemporaries — in an intimate, world-class exhibition space within one of the Las Vegas Strip's most celebrated resorts. Programming developed in partnership with major American and international museum institutions brings artwork of genuine museum quality to the millions of visitors who pass through the Bellagio each year. For collectors and art enthusiasts visiting Las Vegas, the Bellagio Gallery offers a genuinely serious exhibition experience in a setting unlike any other in the art world.</p>`
  },
  {
    id: 94,
    full_description: `<p>The Contemporary Arts Center Las Vegas is a nonprofit organization supporting contemporary artists through exhibitions, residencies, and public programming in downtown Las Vegas, providing infrastructure for artists working in one of America's fastest-growing and most culturally complex cities. The CAC's programming is deliberately forward-looking — embracing emerging practices, experimental media, and socially engaged work alongside established contemporary painting and sculpture. Its residency program brings artists to Las Vegas from across the country and internationally, generating productive exchanges between visiting and local creative communities and anchoring Las Vegas's growing downtown arts district in a broader national conversation.</p>`
  },
  {
    id: 234,
    full_description: `<p>The Donna Beam Fine Art Gallery at UNLV's Department of Art is the primary exhibition space for one of the American Southwest's most dynamic university art programs, presenting cutting-edge contemporary work by emerging students, faculty, and national invitees in an intimate purpose-built setting. The gallery's programming reflects UNLV's position at the intersection of Las Vegas's extraordinary cultural mix — immigrant communities from dozens of nations, a performing arts tradition unlike any other American city, and a landscape defined by desert and neon — and the international contemporary art world. Exhibitions frequently challenge conventional gallery expectations, making Donna Beam one of Las Vegas's most reliably surprising venues.</p>`
  },
  {
    id: 229,
    full_description: `<p>The Marjorie Barrick Museum of Art is the main art museum at the University of Nevada Las Vegas, presenting rotating exhibitions of contemporary art alongside a permanent collection with particular strengths in Latin American and Mesoamerican works. The museum's UNLV location gives it a naturally diverse audience that reflects the university's extraordinary student body — one of the most ethnically diverse in the United States — and its programming consistently honors that diversity by presenting work from a wide range of cultural traditions and contemporary practices. The Barrick's holdings in Mesoamerican art provide a distinctive perspective on the deep history of the Americas that few Nevada institutions can match.</p>`
  },
  {
    id: 233,
    full_description: `<p>The Nevada State Museum Las Vegas, located within the Springs Preserve — a 180-acre desert park preserving the natural springs that made Las Vegas possible as a settlement — explores Nevada's natural and cultural history through immersive exhibits including Indigenous artifacts, decorative arts, and natural history specimens. The Springs Preserve setting gives the museum a unique context: visitors encounter Nevada's deep geological and human history in the very landscape where that history began, at the springs that sustained Indigenous communities for centuries before becoming a railroad watering stop and, eventually, the site of the world's most visited city. The museum's collections of Native Nevada art and material culture are among the most significant in Southern Nevada.</p>`
  },
  {
    id: 230,
    full_description: `<p>The Arts Factory is a multi-tenant creative complex in the heart of Las Vegas's 18b Arts District — a nine-block neighborhood of galleries, studios, and creative businesses that constitutes the city's most concentrated and walkable arts destination. The complex houses galleries, studios, and creative businesses that anchor the monthly First Friday gallery walk, drawing thousands of Las Vegas residents and visitors into direct contact with the city's working art community. The Arts Factory's role as the district's anchor reflects a broader ambition for Las Vegas's cultural identity: the conviction that a world-class city deserves a world-class arts community built on the work of its own residents, not only the spectacular entertainment of the Strip.</p>`
  },
  {
    id: 92,
    full_description: `<p>The Neon Museum is one of the most singular cultural institutions in the American West, dedicated to collecting, preserving, and exhibiting the iconic neon signs that defined Las Vegas's visual identity across seven decades of commercial spectacle. The outdoor Neon Boneyard — a two-acre collection of unrestored signs from demolished casinos, motels, and restaurants — provides one of the most visually extraordinary gallery experiences in the country, an accidental archive of American popular culture, design history, and the mythology of Las Vegas itself. Restored signs illuminate the covered outdoor space at night, making the museum's after-dark tour one of the most memorable art experiences in the entire Southwest.</p>`
  },
  {
    id: 231,
    full_description: `<p>Traction Gallery is a contemporary fine art gallery in Las Vegas's 18b Arts District presenting works by regional and national artists across painting, sculpture, and mixed media, with a focus on bold visual narratives and strong formal presence. The gallery's location at the heart of the Arts District places it within Las Vegas's most walkable arts neighborhood, where it participates in the monthly First Friday gallery walk that draws thousands of visitors into direct contact with the city's working art scene. Traction's program is ambitious without being inaccessible — work with genuine visual impact presented in a professional context that welcomes serious collectors and curious first-time visitors with equal warmth.</p>`
  },
  // Reno
  {
    id: 240,
    full_description: `<p>Artown is Reno's beloved month-long arts festival, running throughout July with hundreds of free performances, exhibitions, and studio tours in parks, galleries, and public spaces across the city since 1996. The festival's scope is extraordinary for a city of Reno's size — visual art, music, dance, theater, film, and family programming presented simultaneously across dozens of venues, with free admission to the vast majority of events. Artown has played a central role in transforming Reno's cultural identity over the past three decades, establishing the city as a genuine arts destination and creating an annual civic celebration of creativity that draws visitors from across Northern Nevada and the broader Mountain West.</p>`
  },
  {
    id: 235,
    full_description: `<p>The Nevada Museum of Art is the only fully accredited art museum in the state, housed in a striking zinc-clad building in downtown Reno designed by architect Will Bruder that opened in 2003. The collection focuses on art of the American West and the Great Basin, with an innovative Center for Art + Environment presenting interdisciplinary exhibitions exploring the human relationship to landscape, ecology, and the natural world. The museum's distinctive institutional focus — Western American art understood in the broadest possible sense, from nineteenth-century landscape painting to contemporary installation and land art — gives it a curatorial identity unlike any other museum in the country. Its downtown Reno location anchors the city's growing arts district.</p>`
  },
  {
    id: 239,
    full_description: `<p>The Sheppard Fine Arts Gallery at the University of Nevada Reno presents work by students, faculty, and invited national artists across all media in a purpose-built campus gallery, serving as the primary professional exhibition venue for one of the Mountain West's most active university art programs. The gallery's programming frequently draws on the landscapes, histories, and communities of Northern Nevada — the Sierra Nevada to the west, the vast Great Basin desert to the east — for its curatorial themes. Regular exhibition openings, artist talks, and educational events connect the gallery's activities to the broader Reno arts community and give the university's creative work public visibility and context.</p>`
  },
  {
    id: 237,
    full_description: `<p>The Sierra Arts Foundation is a nonprofit organization supporting Northern Nevada artists through grants, residencies, gallery exhibitions, and public programming, with a gallery space presenting rotating community exhibitions that reflect the diversity and vitality of Reno's creative scene. The Foundation's grant programs provide critical support to artists who might otherwise struggle to sustain their practices in a region where commercial gallery representation is limited, making it an essential infrastructure organization for Northern Nevada's creative community. The gallery exhibitions give grant recipients and other regional artists professional exposure in a context that reinforces the Foundation's core belief: Nevada's artists are producing work of genuine quality and national significance.</p>`
  },
  {
    id: 236,
    full_description: `<p>Stremmel Gallery is one of the most respected fine art galleries in the Mountain West, representing nationally recognized painters and sculptors in a program that has earned it a reputation far beyond Reno since its founding in 1970. The gallery's program focuses on contemporary realism, abstraction, and Western American art — a range that reflects both the gallery's deep regional roots and its serious engagement with the national contemporary art market. Stremmel participates in major art fairs, publishes serious exhibition catalogs, and maintains long-term relationships with artists who show in significant galleries across the country. For collectors visiting Northern Nevada, Stremmel is an essential destination that rewards the detour.</p>`
  },
  {
    id: 238,
    full_description: `<p>The Holland Project is Reno's essential DIY arts and music venue, running a gallery, recording studio, and event space that serves as the cultural heartbeat of the city's alternative creative community. The Holland's model — accessible, anti-hierarchical, and driven by the creative interests of Reno's younger artists and musicians — provides infrastructure that the commercial art market cannot or will not offer: exhibition space for experimental work, recording resources for independent musicians, and a gathering place for the community of artists building Reno's creative future. Gallery exhibitions span visual art, installation, and cross-disciplinary work, with an emphasis on artists whose practices resist easy categorization and thrive in the Holland's uniquely open and supportive context.</p>`
  },
  // Virginia City
  {
    id: 248,
    full_description: `<p>The Way It Was Museum preserves authentic nineteenth-century mining equipment, historic photographs, and artifacts from the Comstock Lode silver rush that built Nevada and helped finance the Union cause in the Civil War. The museum's collection documents the extraordinary human drama of the Comstock — the fortunes won and lost, the immigrant labor that drove the mines, the underground world where men worked by candlelight at depths of a thousand feet — through objects and images that bring the story to visceral life. Virginia City's position as a National Historic Landmark, its Victorian commercial district largely intact, gives the museum a context that few American historic sites can match and makes every visit feel like genuine time travel.</p>`
  },
  {
    id: 249,
    full_description: `<p>Virginia City Arts is a gallery celebrating the art and history of the legendary Comstock Lode mining district, showing work inspired by Nevada's rugged frontier landscape, mining heritage, and the Silver State's enduring Western spirit. Virginia City itself — a National Historic Landmark perched on the steep eastern slope of Mount Davidson, its Victorian commercial district largely intact after more than 150 years — provides an extraordinary context for art rooted in the history and landscape of the American West. The gallery's program honors both the historical artistic traditions of the Comstock era and the contemporary artists who continue to find inspiration in this singular landscape of sagebrush desert, silver mines, and frontier grandeur.</p>`
  },
];

async function run() {
  console.log(`Updating ${updates.length} Nevada listings...`);
  for (const { id, full_description } of updates) {
    await sql`UPDATE listings SET full_description = ${full_description} WHERE id = ${id}`;
    process.stdout.write('.');
  }
  console.log('\nDone.');
}

run().catch(console.error);
