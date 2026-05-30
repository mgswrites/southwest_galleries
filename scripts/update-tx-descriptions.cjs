const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.NEON_DB_KEY);

const updates = [
  // Austin
  {
    id: 295,
    full_description: `<p>The Blanton Museum of Art is the flagship art museum of The University of Texas at Austin, with a collection of 18,000 works that stands as one of the finest university art museums in the United States. The collection's greatest strengths lie in its survey of Latin American art — one of the most comprehensive in the country — its exemplary collection of Italian Renaissance paintings, and Ellsworth Kelly's monumental final work, "Austin," a freestanding building of colored glass and white marble that functions as both architecture and total work of art. Free to UT students and affordably priced for the public, the Blanton is one of Austin's most essential cultural institutions.</p>`
  },
  {
    id: 296,
    full_description: `<p>The Contemporary Austin's Jones Center is the downtown flagship of one of Austin's most ambitious contemporary art institutions, presenting rotating exhibitions — including significant site-specific commissions and large-scale installations — in a beautifully renovated historic building on Congress Avenue. The Jones Center's central location makes it genuinely accessible to the full Austin community, and its programming consistently reflects the full range of contemporary artistic practice, from painting and sculpture to video, performance, and works that defy easy categorization. The Contemporary Austin also operates Laguna Gloria, an outdoor sculpture campus on Lake Austin, giving the institution an extraordinary range of presentation contexts.</p>`
  },
  {
    id: 297,
    full_description: `<p>Laguna Gloria is Contemporary Austin's lushly landscaped outdoor campus on Lake Austin, presenting site-specific sculpture and rotating outdoor installations in the gardens of a historic 1916 Mediterranean Revival villa. The property — a gift to the city that became one of Austin's most beloved cultural venues — combines the beauty of the natural landscape with ambitious contemporary sculpture that responds to its setting, creating an experience of art in the environment that no indoor gallery can replicate. Laguna Gloria also houses the acclaimed Rebekah Baines Johnson Art School, which has offered children's art education in this extraordinary setting for decades, making it as important to Austin's creative future as to its present.</p>`
  },
  {
    id: 302,
    full_description: `<p>MASS Gallery is an artist-run, member-supported gallery in East Austin presenting experimental and emerging contemporary art with a commitment to curatorial risk-taking, community access, and supporting the artists who make Austin's independent creative scene thrive. The gallery's collective model ensures that programming reflects the genuine interests of working artists rather than the demands of the commercial market, resulting in exhibitions of unusual variety and authenticity — work that takes chances and trusts its audience to engage seriously. MASS Gallery's East Austin location places it at the heart of the city's most dynamically evolving creative neighborhood, where it serves as a gathering place for Austin's younger and more independent artistic community.</p>`
  },
  {
    id: 298,
    full_description: `<p>Mexic-Arte Museum is Austin's official Mexican and Mexican-American cultural and fine arts museum, presenting exhibitions spanning pre-Columbian to contemporary art alongside the Mexican Festival — the oldest and largest free annual outdoor festival in Austin. The museum's program reflects the deep roots of Mexican and Mexican-American culture in Texas, from the ancient civilizations of Mesoamerica through the colonial period and the border culture that has shaped the state's identity to the contemporary artists redefining what Mexican-American art means today. Mexic-Arte is one of the most important Latino cultural institutions in Texas and a vital resource for understanding the Mexican heritage inseparable from Austin's identity.</p>`
  },
  {
    id: 299,
    full_description: `<p>The Umlauf Sculpture Garden & Museum is a beloved South Austin institution dedicated to the work of Charles Umlauf — one of the most important American figurative sculptors of the twentieth century and a beloved UT Austin professor for forty years. The museum's four lush acres present more than 130 bronze, stone, and wood works in a serene garden setting that allows visitors to encounter sculpture in natural light and open air, as Umlauf intended. The garden's combination of towering live oaks, reflecting pools, and Umlauf's expressive figuration — nymphs, athletes, and religious subjects — creates one of the most intimate and accessible sculpture experiences in Texas.</p>`
  },
  {
    id: 301,
    full_description: `<p>Wally Workman Gallery is one of Austin's most respected commercial galleries, presenting the work of Texas painters, printmakers, and sculptors with a longstanding commitment to the state's artistic community and a particular eye for lush, expressive figurative and landscape painting. The gallery's program reflects Workman's deep personal relationships with her artists — many of whom she has represented for decades — and a curatorial sensibility that prizes emotional directness and painterly skill alongside contemporary relevance. Wally Workman Gallery has been a consistent and vocal advocate for Texas artists at a time when the state's gallery scene has grown rapidly and competition for visibility has intensified.</p>`
  },
  {
    id: 300,
    full_description: `<p>Women & Their Work is a pioneering Austin nonprofit dedicated exclusively to women artists in Texas, with four decades of exhibitions, fellowships, and programming that have launched careers and permanently reshaped the Texas art world. Founded in 1978, the organization's commitment to women artists predates the mainstream art world's belated recognition of gender equity as a curatorial and professional issue, and its long history gives it a depth of artist relationships and institutional knowledge that few newer organizations can match. Women & Their Work's gallery exhibitions present Texas women artists at every career stage, and fellowship programs provide crucial financial and professional support at moments when it matters most.</p>`
  },
  // Dallas
  {
    id: 286,
    full_description: `<p>Barry Whistler Gallery is one of Dallas's most respected and long-running galleries, presenting the work of significant Texas artists alongside national contemporary painters and sculptors for nearly four decades. Whistler's deep commitment to his artists — many of whom he has represented throughout their careers — gives the gallery a program of unusual continuity and depth, allowing collectors to understand artists' development over time rather than encountering isolated individual works. The gallery's consistent curatorial standards and its advocacy for Texas artists on the national and international stage have made it one of the most trusted galleries in the Dallas contemporary market and an important institution in the broader Texas art world.</p>`
  },
  {
    id: 287,
    full_description: `<p>Conduit Gallery is a Dallas gallery with a distinguished history of presenting internationally recognized contemporary art alongside significant Texas artists, with particular strength in abstract, conceptual, and process-based work. The gallery's rigorous program — developed over more than two decades of curatorial commitment — has made it one of the most critically respected galleries in Texas, consulted by museum curators and serious collectors who value intellectual substance alongside visual impact. Conduit's consistent presentation of work that challenges conventional expectations of the art object has given it an identity distinct from the more commercially oriented galleries in the Dallas market and helped extend its artists' careers well beyond Texas.</p>`
  },
  {
    id: 282,
    full_description: `<p>The Crow Museum of Asian Art is a free-admission museum in the heart of downtown Dallas presenting one of the finest collections of Asian art in the American Southwest, spanning 5,000 years across South Asia, Southeast Asia, China, Japan, and Korea. The collection — assembled by real estate developer Trammell Crow and his wife Margaret — encompasses Buddhist sculpture, Chinese bronzes and ceramics, Japanese screens and lacquerware, and Indian religious imagery of exceptional quality, presented with the scholarly care of a major institution. The museum's free admission and serene garden setting make it one of Dallas's most welcoming cultural destinations and a genuine refuge from the intensity of the surrounding Arts District.</p>`
  },
  {
    id: 283,
    full_description: `<p>Dallas Contemporary is a kunsthalle-style contemporary art space with no permanent collection, dedicated entirely to presenting ambitious solo and group exhibitions of cutting-edge national and international artists — prioritizing the art of the present moment over the institutional demands of collection maintenance and historical survey. Dallas Contemporary's programming is deliberately provocative and forward-looking, embracing emerging artists and experimental practices alongside established figures whose latest work continues to push boundaries, and its spacious warehouse setting provides the scale needed for ambitious installation work. For collectors and curators tracking the leading edge of contemporary practice, Dallas Contemporary is the essential Dallas destination.</p>`
  },
  {
    id: 280,
    full_description: `<p>The Dallas Museum of Art is the cultural anchor of the Dallas Arts District and one of the largest art museums in the United States, with an encyclopedic collection of 24,000 works spanning 5,000 years of world art and cultures across every inhabited continent. The collection's strengths include exceptional pre-Columbian holdings, significant European paintings, decorative arts from across the globe, and a growing contemporary collection reflecting Dallas's increasingly international cultural ambitions. Free general admission — a policy that distinguishes the DMA from most major American art museums — ensures that this extraordinary collection remains genuinely accessible to the full diversity of Dallas's population.</p>`
  },
  {
    id: 289,
    full_description: `<p>Erin Cluley Gallery is a prominent Dallas gallery known for supporting Texas-based artists and presenting smartly curated exhibitions of contemporary painting, sculpture, video, and installation art with a commitment to curatorial substance over commercial predictability. The gallery's roster reflects genuine curatorial intelligence — work that engages with contemporary ideas and conditions, presented with the care and context needed to communicate its ambitions fully. Erin Cluley's presence in the Dallas market has been an important counterweight to purely decorative or investment-oriented collecting, advocating consistently for work that challenges its audience and rewards sustained engagement over time.</p>`
  },
  {
    id: 284,
    full_description: `<p>McKinney Avenue Contemporary — known as The MAC — is a nonprofit arts center in Uptown Dallas presenting group exhibitions, performance, and community programming that bridges the city's diverse cultural communities in a welcoming, unpretentious space. The MAC's multi-use facility — combining gallery spaces, a black-box theater, and flexible event areas — makes it one of the most genuinely multidisciplinary arts venues in Dallas, supporting a wide range of artistic practice and community activity under one roof. The MAC's commitment to accessibility and community engagement distinguishes it from the more commercially oriented galleries of the Arts District, providing a platform where the full diversity of Dallas's creative community can find an audience.</p>`
  },
  {
    id: 281,
    full_description: `<p>The Nasher Sculpture Center is one of the finest sculpture museums in the world, housing the landmark Raymond and Patsy Nasher collection — among the greatest private sculpture collections ever assembled — in a purpose-built building designed by Renzo Piano that is itself a masterpiece of museum architecture. The collection spans the full history of modern sculpture from Rodin through Picasso, Giacometti, Henry Moore, and Matisse to the postwar giants — Calder, Noguchi, Serra, and Judd — presented in Piano's luminous galleries and an acclaimed outdoor garden that provides the ideal setting for large-scale works in natural light. The Nasher is the crown jewel of the Dallas Arts District and one of the essential cultural experiences in the entire Southwest.</p>`
  },
  {
    id: 288,
    full_description: `<p>Photographs Do Not Bend Gallery is Dallas's preeminent photography gallery, representing established and emerging photographers working across documentary, fine art, and conceptual traditions with a depth of program that distinguishes it from generalist galleries that treat photography as one medium among many. The gallery's annual juried exhibition has launched numerous careers and attracted submissions from photographers across the country, establishing it as a significant national platform for photography despite — or because of — its Dallas location. PDNB's commitment to the full history and practice of photography, from classic documentary work to the most experimental contemporary practice, makes it an essential destination for photography collectors in the Southwest.</p>`
  },
  {
    id: 285,
    full_description: `<p>Ro2 Art is one of Dallas's leading contemporary galleries, representing a roster of established and emerging artists across painting, sculpture, and works on paper in a program known for curatorial rigor and sustained commitment to artists at pivotal career moments. The gallery's approach — building long-term relationships with artists rather than pursuing the speculative collecting market — has made it one of the most trusted galleries in the Dallas contemporary scene, valued by collectors who are building serious collections rather than chasing trends. Ro2's program spans a wide range of contemporary approaches, united by a consistent demand for quality and a genuine belief in the power of art to communicate across differences.</p>`
  },
  // El Paso
  {
    id: 312,
    full_description: `<p>The El Paso Art Association Gallery is one of the oldest arts nonprofits in Texas, presenting group exhibitions by local and regional artists and maintaining one of the city's most welcoming community gallery spaces — a cornerstone of El Paso's creative life for nearly a century. The association's long history reflects the deep roots of artistic practice in the Paso del Norte region, where the cultural traditions of the United States and Mexico converge in a city that is simultaneously one of the most distinctively American and one of the most deeply Mexican cities in the Southwest. The gallery's commitment to local artists and community access makes it an indispensable institution for El Paso's working creative community.</p>`
  },
  {
    id: 310,
    full_description: `<p>The El Paso Museum of Art is the primary fine arts museum of the Paso del Norte region, with collections spanning European Old Masters, pre-Columbian art, Mexican Colonial paintings, and twentieth-century American art — a program that reflects El Paso's extraordinary position at the crossroads of the cultural traditions of the United States and Mexico. The museum's Mexican Colonial collection is particularly distinguished, encompassing religious paintings, furniture, and decorative arts that document three centuries of artistic achievement in New Spain. Located in the heart of downtown El Paso, adjacent to the international border, the museum embodies the bicultural identity that makes El Paso one of the most culturally distinctive cities in the American Southwest.</p>`
  },
  {
    id: 311,
    full_description: `<p>The Rubin Center for the Visual Arts at The University of Texas at El Paso is one of the most intellectually vital contemporary art spaces in the American Southwest, presenting innovative exhibitions with a sustained focus on border culture, Latinx art, and the diverse creative communities of the US-Mexico frontera. The Rubin's location on the UTEP campus — distinctive buildings featuring Bhutanese-inspired architecture unique in North America — gives it both an engaged community of students and faculty and a connection to the international border that shapes its curatorial vision. Exhibitions at the Rubin consistently address questions of cultural identity, migration, and transnational artistic practice that are central to the experience of life in the borderlands.</p>`
  },
  // Fort Worth
  {
    id: 291,
    full_description: `<p>The Amon Carter Museum of American Art is Fort Worth's premier institution for the study and presentation of American art, with one of the finest photography collections in the country alongside extraordinary nineteenth-century Western American paintings and sculpture — all housed in a Philip Johnson building overlooking downtown Fort Worth with commanding presence. The photography collection, spanning the history of the medium from its invention through the present, is one of the most significant holdings of its kind in the United States, and the Western art — Frederic Remington, Charles Russell, Thomas Moran, Albert Bierstadt — is among the finest anywhere. Free admission and exceptional scholarship make the Amon Carter one of the great public art resources in all of Texas.</p>`
  },
  {
    id: 294,
    full_description: `<p>The Fort Worth Community Arts Center is a vibrant hub for working artists in Fort Worth, operated by the Arts Council of Fort Worth and providing gallery space, studio rentals, and community programming across visual art, music, and theater for more than 75 years. The center's long history and direct relationship with the working artist community give it an authenticity that institutional art venues sometimes lack — it is genuinely built by and for artists rather than managed for them by administrators. The gallery program rotates regularly with exhibitions by Fort Worth and regional artists, providing a professional platform for the creative community of one of Texas's most culturally rich cities.</p>`
  },
  {
    id: 290,
    full_description: `<p>The Kimbell Art Museum is widely regarded as one of the finest small museums in the world, holding a carefully selected collection of European Old Masters and world art presented in Louis Kahn's architectural masterpiece — a sequence of luminous cycloid vaults that bathe the paintings in natural light through a sophisticated diffusion system Kahn spent years perfecting. The collection spans art from antiquity through the early twentieth century, with exceptional works by Rembrandt, Velázquez, Michelangelo, El Greco, Monet, and Cézanne — masterpieces in which every work was chosen with the seriousness of a museum that aspires to present only the best. The Kimbell's combination of extraordinary art and extraordinary architecture makes it one of the most complete museum experiences in the United States.</p>`
  },
  {
    id: 292,
    full_description: `<p>The Modern Art Museum of Fort Worth is the oldest art museum in Texas, presenting an exemplary collection of post-World War II modern and contemporary art — Picasso, Warhol, Anselm Kiefer, Gerhard Richter, Susan Rothenberg, and many others — in Tadao Ando's spectacular building, one of the great museum structures of the twenty-first century. Ando's concrete-and-glass structure, which extends into a reflecting pool that mirrors both the building and the Texas sky, creates an architectural experience that complements the ambitious scale of the postwar works inside. The Modern's collection is particularly strong in Abstract Expressionism, Pop, Minimalism, and the conceptual and neo-expressionist movements that followed — an essential survey of the art of our era.</p>`
  },
  {
    id: 293,
    full_description: `<p>The Sid Richardson Museum in Fort Worth's historic Sundance Square presents the finest focused collection of Western American art by Frederic Remington and Charles Russell available for public view anywhere in the Southwest — a concentration of masterworks by the two canonical painters of the American West that gives visitors an unparalleled opportunity to understand the full range and achievement of these foundational artists. The museum's intimate scale — a single focused collection in a beautifully appointed downtown space — allows for close engagement with individual paintings and bronzes that would be difficult to achieve in a larger encyclopedic institution. Admission is free, making the Sid Richardson Museum one of Fort Worth's most accessible cultural treasures.</p>`
  },
  // Houston
  {
    id: 277,
    full_description: `<p>Art League Houston is one of Houston's oldest arts nonprofits, providing gallery space, studio residencies, and educational programming that supports working artists at every stage of their careers — from student to established professional. The organization's longstanding commitment to Houston's creative community has made it one of the most trusted institutions in the city's art ecosystem, providing infrastructure and opportunity that commercial galleries cannot or will not offer. Art League Houston's gallery exhibitions rotate regularly, presenting Houston artists in a professional context that amplifies their work and connects them with collectors and curators who might not otherwise encounter their practice.</p>`
  },
  {
    id: 274,
    full_description: `<p>The Blaffer Art Museum is the contemporary art museum of the University of Houston, presenting rotating exhibitions and ambitious new commissions by emerging and mid-career artists with a particular commitment to underrepresented voices and international perspectives. The Blaffer's university context gives it both a built-in audience of engaged students and faculty and a freedom to take curatorial risks that strictly commercial institutions cannot afford. The museum's commissioning program has produced significant new works that have entered important public and private collections, establishing the Blaffer as a genuine force in the production and circulation of contemporary art rather than merely a venue for presenting it.</p>`
  },
  {
    id: 272,
    full_description: `<p>The Contemporary Arts Museum Houston is a kunsthalle with no permanent collection, dedicated entirely to presenting ambitious rotating exhibitions of contemporary art from local, national, and international artists — functioning as a laboratory for the urgent, the experimental, and the newly made rather than a repository for established masterworks. CAMH's program is consistently at the forefront of contemporary art, embracing emerging artists and experimental practices alongside established figures whose latest work continues to push boundaries. The museum's distinctive parallelogram building, designed by Gunnar Birkerts, has been a Houston landmark since 1972, and free admission ensures that the most challenging contemporary art remains available to anyone curious enough to walk through the door.</p>`
  },
  {
    id: 279,
    full_description: `<p>DiverseWorks is Houston's leading presenter of experimental and interdisciplinary art, commissioning boundary-pushing work across visual art, performance, music, and theater by Texas artists and their national collaborators since 1982. The organization's commitment to commissioning new work — rather than simply presenting existing work in new contexts — makes it one of the most genuinely generative arts organizations in Texas, investing in the creation of art that would not exist without DiverseWorks' support and platform. The resulting work, rooted in Houston's extraordinary cultural diversity, frequently addresses questions of identity, community, and the transformative potential of art that are central to the experience of one of the most ethnically complex cities in the United States.</p>`
  },
  {
    id: 278,
    full_description: `<p>The Houston Center for Contemporary Craft is a museum and residency program dedicated to the art of craft — fiber, glass, metal, ceramics, and wood — with working resident artists visible throughout the building and a consistent commitment to elevating craft to its rightful place in the fine art conversation. The center's innovative model, combining gallery exhibitions with a working residency, allows visitors to encounter art in the process of being made alongside finished works in gallery settings, creating a uniquely transparent and educational experience of the creative process. Houston's extraordinary cultural diversity gives the center's program a particular richness, drawing on craft traditions from across the globe alongside the work of American studio artists.</p>`
  },
  {
    id: 275,
    full_description: `<p>Lawndale Art Center is Houston's beloved alternative art space championing emerging Texas artists through exhibitions, the annual Big Show open call, and studio residencies — scrappy, inclusive, and essential to the city's creative ecosystem for four decades. The Big Show — an annual open-call exhibition that accepts submissions from any Texas artist — is one of the most democratic and beloved events in the Texas art calendar, providing a genuine platform for emerging artists and a reliable survey of the full range of artistic practice in the state. Lawndale's commitment to accessibility and its embrace of artists at the earliest stages of their careers give it a role in Houston's art world that no other institution fills.</p>`
  },
  {
    id: 270,
    full_description: `<p>The Menil Collection is one of the great art museums of the world — a sprawling Renzo Piano campus in the heart of Houston presenting one of the largest private art collections ever opened to the public, spanning antiquity through the twentieth century with unparalleled depth in Surrealism, Byzantine art, and tribal objects from Africa, Oceania, and the Americas. John and Dominique de Menil assembled their collection with passionate connoisseurship that privileged quality and personal conviction over market consensus, and the result is a museum of extraordinary intimacy and depth — small enough to feel personal, large enough to be genuinely surprising on every visit. Free admission since its founding in 1987 makes the Menil one of the great democratic institutions of American cultural life.</p>`
  },
  {
    id: 271,
    full_description: `<p>The Museum of Fine Arts, Houston is the largest art museum in the American South, with a collection of more than 70,000 works spanning 6,000 years across all cultures, periods, and media — presented in a campus that includes two landmark buildings by Mies van der Rohe and the Glassell School of Art, one of the leading art schools in Texas. The collection's strengths include exceptional European paintings, one of the finest collections of Impressionist and Post-Impressionist art in the South, a distinguished collection of African art, and a growing contemporary wing reflecting Houston's increasingly international cultural ambitions. The museum's Isadora Duncan sculpture garden and Bayou Bend Collection of American decorative arts make it one of the most comprehensive art experiences in the Southwest.</p>`
  },
  {
    id: 273,
    full_description: `<p>The Rothko Chapel is Mark Rothko's final major commission — fourteen monumental paintings in a non-denominational meditation space at the heart of Houston's Menil campus, creating an environment of profound stillness and spiritual intensity that has welcomed visitors of all faiths since 1971. Rothko designed both the paintings and the octagonal chapel building in close collaboration with the de Menils, creating a total work of art in which the architecture, the natural light, and the paintings form a single indissoluble experience. Beyond its role as a work of art, the Chapel serves as a center for human rights advocacy and interfaith dialogue, honoring Rothko's conviction that art has the power to transform the conditions of human life.</p>`
  },
  {
    id: 276,
    full_description: `<p>The Station Museum of Contemporary Art is an independent museum in a converted Houston warehouse presenting politically engaged contemporary art with a consistent focus on social justice, environmental issues, and artists whose work challenges the structures of power — with free admission always. Founded in 2001 by James Harithas, the Station has been one of the most consistently politically committed art institutions in Texas, presenting work by artists from the United States and internationally whose practice engages directly with the urgent social and political questions of our time. The museum's independence from corporate or institutional funding gives its programming an integrity and directness that more establishment-oriented institutions sometimes cannot achieve.</p>`
  },
  // Marfa
  {
    id: 100,
    full_description: `<p>Ballroom Marfa is a nonprofit arts and culture space in a restored 1927 Presidio County building presenting cutting-edge contemporary art, music, and film in the Chihuahuan Desert — one of the most unexpected and consistently rewarding cultural destinations in the American West. Founded in 2003 in the cultural wake of the Chinati Foundation's transformation of Marfa, Ballroom has developed its own distinct identity, commissioning new work and presenting exhibitions that engage with the landscape, history, and cultural complexity of far west Texas alongside international contemporary practice. Ballroom's residency program, public art commissions — including the celebrated "Prada Marfa" collaboration — and programming across art, music, and film make it one of the most multidisciplinary arts organizations in Texas.</p>`
  },
  {
    id: 99,
    full_description: `<p>The Chinati Foundation is one of the most significant works of art in the world — a total artistic environment created by Donald Judd across a former U.S. Army base in the Chihuahuan Desert, constituting the fullest realization of Judd's vision of art permanently installed in spaces designed for it. The foundation's permanent collection encompasses 100 untitled works in mill aluminum by Judd, 15 works in concrete in the surrounding desert, major installations by Dan Flavin and John Chamberlain, and permanent works by Claes Oldenburg, Ilya Kabakov, Roni Horn, and others — a concentration of major art at a scale no urban institution could achieve. Visiting Chinati is an experience unlike any other in the art world: art encountered across vast distances, in the silence and light of the high desert, at exactly the scale the work demands.</p>`
  },
  {
    id: 102,
    full_description: `<p>The Judd Foundation preserves and presents the studios, residences, and permanent art installations of Donald Judd in Marfa and New York, maintaining his vision of art integrated into daily life in the spaces where he actually lived and worked. In Marfa, the Foundation oversees Judd's renovated building blocks — including La Mansana de Chinati, two city blocks of buildings transformed into permanent installations of his furniture, art, and the work of artists he admired — as functioning homes and studios that allow visitors to experience Judd's ideas about the relationship between art, architecture, and everyday life in their most direct form. The Judd Foundation's stewardship is essential to understanding Judd's work in its fullest dimension, beyond any gallery or museum context.</p>`
  },
  {
    id: 101,
    full_description: `<p>The Marfa Book Company is a beloved independent bookstore and gallery in the heart of Marfa, combining a carefully curated selection of rare and new art books with rotating exhibitions of contemporary art, photography, and design in one of the most intellectually rich small-town cultural spaces in the American West. The bookshop's selection — particularly strong in artist monographs, art theory, photography books, and publications by small art presses — reflects the extraordinary concentration of artistic intelligence that has gathered in Marfa since the late 1970s, and the gallery's exhibitions draw from the extended Marfa creative community and beyond. A visit to the Marfa Book Company is an essential part of any serious trip to this singular cultural destination.</p>`
  },
  // San Antonio
  {
    id: 306,
    full_description: `<p>Artpace San Antonio is an internationally recognized contemporary art foundation commissioning new work by Texas, national, and international artists through a unique residency-to-exhibition program that has made it one of the most respected and generously supported artist residency programs in the world. Three artists — one from Texas, one from the United States, and one from anywhere in the world — are brought to San Antonio each cycle to create new work in response to the city and to each other, with the resulting works presented in Artpace's downtown galleries. The program's international scope and its commitment to commissioning rather than simply presenting work have made Artpace one of the most important sites for the production of contemporary art in the American Southwest.</p>`
  },
  {
    id: 305,
    full_description: `<p>Blue Star Contemporary is San Antonio's leading contemporary art center, presenting rotating exhibitions and maintaining artist studio residencies in the historic Blue Star Arts Complex — a converted warehouse complex in the city's creative Southtown neighborhood that has become one of San Antonio's most vibrant cultural destinations. Exhibitions range from emerging Texas artists to established national and international figures, united by a commitment to ambitious, intellectually serious contemporary practice. Blue Star's studio residency program, providing working space to a cohort of San Antonio-area artists, ensures that the center remains connected to the working creative community rather than existing as a purely institutional venue detached from the artists it serves.</p>`
  },
  {
    id: 304,
    full_description: `<p>The McNay Art Museum is Texas's first modern art museum, set in a sprawling 1929 Spanish Colonial Revival mansion surrounded by sculpture gardens and commanding one of the most beautiful museum settings in the American Southwest. The collection is particularly distinguished in Post-Impressionist painting — with works by Cézanne, Gauguin, van Gogh, and their contemporaries — alongside exceptional holdings of medieval and Renaissance art, twentieth-century American painting, and one of the finest collections of theater arts and costume design in the United States. The McNay's combination of extraordinary art, exceptional architecture, and gracious grounds makes a visit one of the most satisfying cultural experiences in all of Texas.</p>`
  },
  {
    id: 309,
    full_description: `<p>Ruiz Healy Art is a respected San Antonio gallery representing a strong roster of contemporary artists across painting, photography, and mixed media, with particular depth in Latin American and Latino artists and a longstanding commitment to the San Antonio creative community. The gallery's program reflects the cultural richness of San Antonio — a city where Mexican and American traditions have been in continuous dialogue for centuries — while also engaging with the international contemporary art market through art fair participation and relationships with collectors and institutions across the country. Ruiz Healy's sustained advocacy for Latin American artists in a city that is itself a monument to the depth and vitality of Latin American culture makes it one of the most important galleries in Texas.</p>`
  },
  {
    id: 308,
    full_description: `<p>Sala Diaz is a fiercely independent artist-run gallery in San Antonio's King William neighborhood, presenting challenging and experimental contemporary art in a domestic space that resists institutional norms and champions the city's most adventurous artists. The gallery's intimate scale and unconventional setting — a renovated house rather than a commercial gallery space — creates an environment of unusual informality that suits the experimental work it presents, giving artists and visitors a context for encounter that larger institutions cannot provide. Sala Diaz has been an essential counterweight to San Antonio's more establishment-oriented arts institutions, providing a platform for work that might otherwise lack visibility in a city with a strong but sometimes conservative arts culture.</p>`
  },
  {
    id: 303,
    full_description: `<p>The San Antonio Museum of Art occupies a magnificent converted nineteenth-century brewery complex that is itself one of the finest examples of industrial adaptive reuse in Texas, housing an encyclopedic collection spanning 5,000 years of world art with a particular distinction in Latin American art — the largest collection of Latin American art in any United States museum. The Latin American holdings encompass pre-Columbian objects, Spanish Colonial painting and decorative arts, folk art, and twentieth-century modern and contemporary art from across the hemisphere, reflecting San Antonio's position as one of the most deeply bicultural cities in North America. The adjacent Nelson A. Rockefeller Center for Latin American Art provides dedicated space for this extraordinary collection and makes SAMA one of the most important institutions in the world for the study and enjoyment of Latin American cultural heritage.</p>`
  },
  {
    id: 307,
    full_description: `<p>The Southwest School of Art is a historic arts institution offering studio arts education alongside gallery exhibitions in a beautifully preserved nineteenth-century French Quarter convent complex that is one of the most architecturally significant sites in downtown San Antonio. The school's program — combining rigorous studio education in ceramics, fiber, metals, and drawing with a public gallery program that brings professional-quality exhibitions to the surrounding community — makes it one of the most genuinely multifaceted arts institutions in Texas. The convent complex, with its tranquil gardens and historic stone buildings, provides an extraordinary setting for both art-making and art-viewing, and the school's long history as a community institution gives it deep roots in San Antonio's cultural life.</p>`
  },
];

async function run() {
  console.log(`Updating ${updates.length} Texas listings...`);
  for (const { id, full_description } of updates) {
    await sql`UPDATE listings SET full_description = ${full_description} WHERE id = ${id}`;
    process.stdout.write('.');
  }
  console.log('\nDone.');
}

run().catch(console.error);
