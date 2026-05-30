const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.NEON_DB_KEY);

const updates = [
  // Albuquerque
  {
    id: 69,
    full_description: `<p>516 Arts is one of Albuquerque's most vital contemporary art organizations, presenting ambitious exhibitions and programs that connect artists and communities across the city and beyond. Located on Central Avenue — the historic Route 66 corridor that runs through the heart of Albuquerque — the gallery's program is deliberately engaged with the social and cultural realities of the Southwest, commissioning artists whose work addresses questions of community, environment, and cultural identity. Education and community outreach programs extend the organization's reach well beyond the gallery walls, making 516 Arts one of the most civically engaged art institutions in New Mexico.</p>`
  },
  {
    id: 68,
    full_description: `<p>The Albuquerque Museum is the city's premier art and history museum, housing more than 7,000 works of art and artifacts documenting four centuries of life in the Middle Rio Grande Valley. The collections are particularly strong in the colonial and territorial periods of New Mexico history — Spanish Colonial religious art, frontier-era material culture, and the paintings of the Taos and Santa Fe art colonies — alongside a growing contemporary collection that reflects the diversity of New Mexico's present-day creative community. The museum's sculpture garden, free on Sunday mornings, provides one of the most welcoming public spaces in Old Town Albuquerque.</p>`
  },
  {
    id: 257,
    full_description: `<p>Exhibit/208 is a contemporary gallery in Albuquerque's Nob Hill neighborhood presenting emerging and established New Mexico artists with a genuine commitment to supporting the local creative community through rotating monthly exhibitions. The Nob Hill location — on the eclectic stretch of Central Avenue that has been Albuquerque's bohemian heart for generations — places it within a neighborhood of independent shops, restaurants, and creative businesses that gives it a natural and engaged audience. Exhibit/208 is rooted in the belief that New Mexico's artists deserve professional exhibition opportunities in their own city, without looking to Santa Fe or beyond for recognition.</p>`
  },
  {
    id: 130,
    full_description: `<p>The Harwood Art Center occupies a historic 1921 school building in Albuquerque's Barelas neighborhood — one of the oldest Hispanic communities in the city — bringing gallery exhibitions, studio classes, and arts residencies to an area that has been the creative and spiritual heart of Albuquerque's Hispano culture for centuries. The center's programming reflects the cultural richness of its neighborhood alongside the broader Albuquerque arts community, and its emphasis on community access and arts education gives it a social mission as important as its exhibition program. The Harwood is one of the most deeply rooted arts institutions in the city, inseparable from the community it inhabits.</p>`
  },
  {
    id: 73,
    full_description: `<p>The Indian Pueblo Cultural Center is the only institution in the United States owned and operated by all 19 Pueblos of New Mexico, making it the authoritative voice on Pueblo culture, history, and living art. The permanent exhibition traces the history of the Pueblo peoples from prehistoric times through the 1680 Pueblo Revolt to the present, while rotating galleries present contemporary work by Pueblo artists whose pottery, jewelry, textiles, and painting represent the continuation of traditions thousands of years in the making. The center's restaurant, featuring traditional Pueblo cuisine, and its Indian Pueblo Store — offering authentic arts directly from Pueblo artists — make it an essential destination for anyone visiting New Mexico.</p>`
  },
  {
    id: 131,
    full_description: `<p>The Keshet Center for the Arts is a multidisciplinary Jewish arts and cultural center in Albuquerque presenting visual art exhibitions, performing arts, and community programming that celebrates Jewish culture and creativity in New Mexico. New Mexico's Jewish community — with roots going back to the Sephardic merchants who arrived with the Spanish colonial period — has played a distinctive role in the state's cultural life, and Keshet provides a dedicated home for this tradition alongside programming that reaches across the broader community. Visual art exhibitions rotate throughout the year, presenting work by Jewish artists and artists whose practice engages with themes of identity, memory, and cultural heritage.</p>`
  },
  {
    id: 70,
    full_description: `<p>Mariposa Gallery is one of Albuquerque's most beloved venues for fine American craft and art jewelry, celebrating contemporary ceramics, glass, fiber, and jewelry by artists who work at the boundary between functional craft and pure art. The gallery's Nob Hill location — on Central Avenue in the heart of Albuquerque's most walkable neighborhood — gives it a warmth and accessibility that larger commercial galleries sometimes lack. Mariposa's curated selection favors work of genuine craft excellence: objects whose beauty derives from both the skill of the maker and the vision behind the making, presented in a space that makes experienced collectors and first-time buyers feel equally welcome.</p>`
  },
  {
    id: 72,
    full_description: `<p>The National Hispanic Cultural Center is one of the premier arts institutions in the United States, dedicated to the preservation and promotion of Hispanic culture, history, and art through an extraordinary complex of galleries, a world-class performing arts theater, a genealogy library, and extensive community programming. The center's Torreón — a 4,000-square-foot fresco by Frederico Vigil depicting 3,000 years of Hispanic history — is among the most ambitious works of public art in the American Southwest. Located in Albuquerque's historic Barelas neighborhood along the Río Grande, the NHCC serves as both a local cultural anchor and a national center for the study and celebration of Hispanic artistic heritage.</p>`
  },
  {
    id: 259,
    full_description: `<p>Nob Hill Gallery is a cooperative fine art gallery on Central Avenue in Albuquerque's Nob Hill neighborhood, presenting paintings, ceramics, jewelry, and mixed media works by a rotating collective of New Mexico artists. The cooperative structure ensures that every artist showing at Nob Hill Gallery has a direct stake in its success and is personally engaged with its daily operation — creating a level of care and community that distinguishes it from purely commercial gallery spaces. The Central Avenue location, in the heart of Albuquerque's most creatively active neighborhood, gives the gallery excellent foot traffic and a natural audience of local residents and visitors exploring Nob Hill's eclectic strip.</p>`
  },
  {
    id: 71,
    full_description: `<p>Richard Levy Gallery is one of Albuquerque's most respected venues for contemporary art, representing national and international artists in a program known for its intellectual rigor and curatorial consistency. The gallery's commitment to rigorous, critically engaged work — spanning painting, photography, sculpture, video, and installation — gives it a program that stands comparison with serious galleries in any major city, presented with the intimacy and accessibility that Albuquerque's gallery culture allows. Richard Levy's long-term relationships with its artists and willingness to commit to challenging, non-commercial work make it an essential destination for collectors seeking work with genuine conceptual substance.</p>`
  },
  {
    id: 74,
    full_description: `<p>The Tamarind Institute at the University of New Mexico is the world's foremost center for collaborative lithography, and its public gallery provides a rare opportunity to encounter fine prints produced through one of the most technically demanding and historically significant processes in the visual arts. Since its founding in 1960, Tamarind has trained master printers and collaborated with leading artists — including David Hockney, John Cage, and dozens of other major figures — to produce editions of extraordinary quality. The institute's Albuquerque gallery presents works from these collaborations, offering collectors and visitors an education in the art of the print and access to some of the finest contemporary lithography in the world.</p>`
  },
  {
    id: 258,
    full_description: `<p>Tortuga Gallery is an alternative art space in Albuquerque's Wells Park neighborhood known for experimental and outsider art, zine culture, and a fiercely independent DIY spirit that has made it an institution for the city's underground creative scene. The gallery's programming embraces work that exists outside the mainstream art market — self-taught artists, printmakers, illustrators, muralists, and makers whose practices defy easy categorization — creating a presentation of creative life in Albuquerque that is more diverse and more honest than any conventional gallery could provide. Tortuga is the beating heart of Albuquerque's alternative arts community, and essential for understanding the full range of creative activity in this complex and underestimated city.</p>`
  },
  {
    id: 129,
    full_description: `<p>The University of New Mexico Art Museum is one of the finest university art museums in the American Southwest, with a distinguished collection of more than 32,000 works including major holdings in photography, prints, and New Mexican modernist painting. The photography collection is particularly exceptional — spanning the history of the medium from early daguerreotypes through the documentary masters of the twentieth century — and the prints collection documents the full range of printmaking from Old Master engravings to contemporary screenprints and lithographs. Located at the heart of UNM's beautiful campus, the museum is free and open to the public, making it one of Albuquerque's most accessible cultural resources.</p>`
  },
  // Española
  {
    id: 268,
    full_description: `<p>The Chimayó Museum celebrates the weaving traditions, folk art, and cultural heritage of the historic village of Chimayó — one of the oldest continuously inhabited communities in the United States and the spiritual heart of northern New Mexico's Hispano culture. Chimayó is famous for two things: the Santuario de Chimayó, a pilgrimage church that draws thousands of visitors on Good Friday, and its extraordinary weaving tradition, which has produced some of the finest Río Grande–style textiles in New Mexico for more than two centuries. The museum's collection documents both traditions and places them in the broader context of northern New Mexico's remarkable cultural continuity, from Spanish colonial settlement to the present day.</p>`
  },
  {
    id: 269,
    full_description: `<p>Los Luceros is a 200-acre historic hacienda along the Río Grande north of Española, managed by New Mexico Historic Sites and presenting exhibitions on the living traditions of northern New Mexico's Hispanic and Pueblo communities. The hacienda — one of the oldest properties in New Mexico, with roots in the Spanish colonial period — has served as a trading post, a ranch, and an artist's retreat, and its extraordinary setting along the Río Grande, surrounded by cottonwood groves and apple orchards, remains one of the most beautiful landscapes in the state. The site's programming connects its historic architecture and collections to the living communities of the Española Valley whose traditions of craft, farming, and spiritual practice reach back hundreds of years.</p>`
  },
  // Las Cruces
  {
    id: 262,
    full_description: `<p>The Fountain Theatre is an intimate performing arts and visual art center in Las Cruces anchoring the city's growing creative district with a dual program of live theater and gallery exhibitions. The gallery presents work by local and regional artists alongside visiting exhibitions, providing a professional platform for the creative community of the Mesilla Valley and ensuring that theater-going and gallery-visiting are interconnected activities in downtown Las Cruces. The Fountain Theatre's commitment to the full range of artistic expression — from intimate stage productions to visual art that challenges and provokes — makes it one of the most genuinely multidisciplinary arts venues in southern New Mexico.</p>`
  },
  {
    id: 261,
    full_description: `<p>The Las Cruces Museum of Art is a free civic museum in downtown Las Cruces presenting rotating exhibitions of regional and national artists alongside a growing permanent collection rooted in the art traditions of southern New Mexico. Free admission ensures that the museum functions as a genuine public resource for the full community of Las Cruces — a city of more than 100,000 people that has often been overshadowed by Santa Fe and Albuquerque in New Mexico's arts narrative. The permanent collection's emphasis on southern New Mexico art — reflecting the distinctive landscape, cultures, and communities of the Mesilla Valley and the Chihuahuan Desert — gives it a regional identity that distinguishes it from larger institutions to the north.</p>`
  },
  {
    id: 260,
    full_description: `<p>The NMSU Art Museum in Las Cruces holds more than 7,000 works spanning five centuries, with particular strengths in twentieth-century American prints, Mexican and Latin American photography, and New Mexico art — all free and open to the public. The photography collection, emphasizing Latin American photographers and the documentary traditions of the U.S.–Mexico borderlands, is one of the most significant holdings of its kind in the American Southwest. The museum's NMSU location gives it a naturally diverse audience that reflects the university's position at the crossroads of the Mesilla Valley, the borderlands, and the international cultural exchange that has defined this region for centuries.</p>`
  },
  // Roswell
  {
    id: 264,
    full_description: `<p>The Anderson Museum of Contemporary Art is one of the most surprising cultural institutions in the American Southwest — a museum in the eastern New Mexico desert showcasing work created by artists who participated in the renowned Roswell Artist-in-Residence Program over more than five decades. The collection of more than 200 works spans every medium and style, united by the common thread of having been made in Roswell, in the extraordinary light and silence of the Chihuahuan Desert, during periods of creative immersion made possible by the residency's uniquely generous terms: a year of studio time and living support, with no strings attached. The museum stands as a testament to what artists can produce when given time, space, and freedom.</p>`
  },
  {
    id: 263,
    full_description: `<p>The Roswell Museum and Art Center is New Mexico's oldest art museum, with a wide-ranging collection of Southwestern and American art that includes the most significant holdings of work by Peter Hurd and Henriette Wyeth — the husband-and-wife painting duo who made the southeastern New Mexico landscape their defining subject. The museum's Robert H. Goddard Wing preserves the rockets, equipment, and papers of pioneering rocketry scientist Robert Goddard, who conducted his earliest experiments outside Roswell in the 1930s. The celebrated Roswell Artist-in-Residence Program, founded in 1967, is one of the most generous artist residencies in the United States and continues to produce a body of work that defines the museum's contemporary collection.</p>`
  },
  // Santa Fe
  {
    id: 47,
    full_description: `<p>Andrew Smith Gallery is one of the most important photography galleries in the United States, specializing in nineteenth and twentieth century American photography with an unparalleled inventory of documentary, fine art, and photojournalism masters. The gallery's holdings include works by Ansel Adams, Edward Weston, Dorothea Lange, and scores of other photographers who defined the American visual imagination — presented with the provenance, scholarly rigor, and curatorial depth that only a dealer of Smith's expertise and experience can provide. For collectors serious about historical American photography, Andrew Smith Gallery is an essential resource and one of Santa Fe's most significant contributions to the international art market.</p>`
  },
  {
    id: 42,
    full_description: `<p>Blue Rain Gallery Santa Fe is one of the most celebrated venues in the Southwest for contemporary Native American art, presenting work by Indigenous artists from Pueblo, Navajo, Hopi, and other tribal nations alongside non-Native artists whose work engages deeply with Southwest themes and traditions. The gallery's program bridges ancient artistic traditions and contemporary innovation, honoring the cultural continuity of Native art while celebrating the individual voices of living artists redefining what Indigenous art means in the twenty-first century. Blue Rain's long-term relationships with its artists and commitment to cultural context make it one of the most trusted galleries in the Southwest for collectors and museum institutions alike.</p>`
  },
  {
    id: 44,
    full_description: `<p>Charlotte Jackson Fine Art is internationally recognized as one of the most rigorous galleries in the country for reductive and monochromatic painting and sculpture, representing artists at the leading edge of material exploration and perceptual experience. The gallery's program — encompassing major figures in international reductive abstraction alongside emerging artists pursuing related investigations — has made it one of Santa Fe's most critically respected institutions, consulted by museum curators and serious collectors from around the world. Exhibitions at Charlotte Jackson are experiences of rare visual intensity: galleries where the subtlety of surface, light, and material creates an encounter with painting that demands and deeply rewards sustained attention.</p>`
  },
  {
    id: 136,
    full_description: `<p>El Museo Cultural de Santa Fe is a vibrant community arts and cultural center in the Railyard District celebrating Hispanic and Indigenous art, music, and heritage through exhibitions, markets, and year-round cultural events. The Museo's Railyard location — alongside SITE Santa Fe, Violet Crown Cinema, and the Santa Fe Farmers' Market — places it at the heart of the city's most dynamically mixed cultural district, where contemporary art institutions and traditional community life coexist with unusual vitality. El Museo's annual Día de los Muertos celebration and ongoing support for traditional New Mexican arts — weaving, retablo painting, colcha embroidery — make it an essential cultural anchor for Santa Fe's Hispanic community.</p>`
  },
  {
    id: 49,
    full_description: `<p>The Georgia O'Keeffe Museum is the only museum in the world dedicated to an individual American woman artist, housing the definitive collection of O'Keeffe's paintings, drawings, and sculpture alongside archives, education programs, and research initiatives that continue to expand understanding of her extraordinary life and work. The collection spans the full arc of O'Keeffe's career — from her early charcoal abstractions through the New York skyscraper paintings and the iconic flower close-ups to the transcendent New Mexico landscapes that defined the last four decades of her long creative life. The museum's downtown Santa Fe location makes it one of the most visited cultural destinations in the Southwest, its scholarship having made O'Keeffe one of the most deeply understood artists of the twentieth century.</p>`
  },
  {
    id: 40,
    full_description: `<p>Gerald Peters Gallery is one of America's most distinguished galleries for American and European art, with an exceptional focus on historic American masters and major Southwestern artists that has made it one of Santa Fe's most important cultural institutions. The gallery's inventory spans the full range of American art history — from Hudson River School landscapes through the Taos Society masters and the modernist generation to important contemporary artists — with a depth of scholarship and connoisseurship that attracts museum curators, major collectors, and institutions from across the country. Peters Gallery's Santa Fe location reflects the city's role as one of the most important markets for American art in the world.</p>`
  },
  {
    id: 52,
    full_description: `<p>The Museum of Contemporary Native Arts, operated by the Institute of American Indian Arts in Santa Fe, is the national museum of contemporary Native American and Alaska Native art, presenting the most important collection of this work in the United States. The IAIA's extraordinary training program — which has graduated artists including Allan Houser, Earl Biss, and T.C. Cannon — has been the seedbed of contemporary Native American art since the 1960s, and the museum's collection documents this transformative tradition alongside work by leading Native artists of the present day. Located steps from the Santa Fe Plaza, the museum's prominent position reflects the centrality of Indigenous artistic achievement to New Mexico's cultural identity.</p>`
  },
  {
    id: 58,
    full_description: `<p>James Kelly Contemporary is a leading-edge contemporary art gallery in Santa Fe presenting established and emerging artists working at the intersection of concept and craft — artists for whom the how and why of making are as compelling as the finished object. The gallery's program has consistently favored work that challenges conventional expectations of the art object, presenting painting, sculpture, installation, and works on paper that reward sustained intellectual engagement alongside their immediate visual appeal. James Kelly's curatorial intelligence and long-term commitment to its artists give the gallery a program of genuine depth, and its Santa Fe location connects international contemporary art to the extraordinary cultural context of northern New Mexico.</p>`
  },
  {
    id: 43,
    full_description: `<p>LewAllen Galleries is a leading gallery for contemporary art in Santa Fe, representing nationally significant artists working across painting, sculpture, photography, and ceramics in a program of exceptional range and consistent quality. The gallery's commitment to both established and emerging artists — maintaining long-term relationships with major figures while actively seeking new voices — gives its program the vitality and variety that distinguish the best galleries from those that simply exploit a successful formula. LewAllen's deep integration into Santa Fe's collector community has made it one of the most trusted galleries in the Southwest market for more than three decades.</p>`
  },
  {
    id: 57,
    full_description: `<p>Manitou Galleries presents two centuries of American art under one roof — from nineteenth-century Hudson River School paintings and Western landscapes through the Taos Society of Artists masters to major contemporary Southwestern painters and sculptors. This encyclopedic approach to American art history gives collectors a rare opportunity to understand the full continuity of the tradition, from the founding vision of the American landscape to the diverse and complex contemporary practice that has emerged from it. Manitou's deep inventory and knowledgeable staff make it an exceptional resource for collectors building serious collections of American art rooted in the great Southwest tradition.</p>`
  },
  {
    id: 252,
    full_description: `<p>Monroe Gallery of Photography is a celebrated Santa Fe gallery dedicated to humanist documentary photography, presenting iconic images by the greatest photojournalists of the twentieth and twenty-first centuries. The gallery's program honors the photographers who recorded history as it happened — the civil rights movement, the Vietnam War, the Cold War, and the human dramas of everyday life around the world — treating their work with the seriousness it deserves as both art and document. Monroe Gallery's Santa Fe location gives its program a distinctive context: one of the most sophisticated photography collecting communities in the United States, shaped by the legacy of Ansel Adams and the long tradition of photography scholarship in northern New Mexico.</p>`
  },
  {
    id: 133,
    full_description: `<p>The Museum of Indian Arts and Culture on Museum Hill is one of the world's premier institutions dedicated to the living arts and cultures of Native peoples of the American Southwest. The museum's extraordinary collections of Pueblo pottery, Navajo and Pueblo textiles, Southwest jewelry, and contemporary Native art span thousands of years and dozens of artistic traditions, presented with scholarship and cultural sensitivity that honors the living communities that created them. The landmark exhibition "Here, Now and Always" provides the most comprehensive introduction to Southwest Native cultures available anywhere, while rotating galleries present contemporary Native artists whose work continues and transforms these ancient traditions into the present moment.</p>`
  },
  {
    id: 50,
    full_description: `<p>The Museum of International Folk Art on Museum Hill is home to the world's largest collection of international folk art — more than 135,000 objects from more than 100 countries — presented in a museum that has been one of New Mexico's premier cultural institutions since 1953. The museum's extraordinary breadth encompasses religious art, toys, textiles, ceramics, and carved figures from every inhabited continent, celebrating the creativity of ordinary people across cultures and across time. The Girard Wing's permanent installation — thousands of folk art objects arranged in panoramic dioramas — is one of the most visually overwhelming and delightfully strange museum experiences in the American Southwest, utterly unlike anything else in the region.</p>`
  },
  {
    id: 134,
    full_description: `<p>The Museum of Spanish Colonial Art is the only museum in the country dedicated to the Spanish Colonial art tradition of the Americas, housing an exceptional collection of santos, retablos, bultos, furniture, and textiles spanning 500 years of artistic production across the Spanish colonial world — from sixteenth-century New Spain through the contemporary revival of traditional New Mexican Hispanic art. The collection documents the continuous artistic tradition of New Mexico's Hispano communities, from the earliest colonial settlements through the santero tradition that flourished in the eighteenth and nineteenth centuries to the contemporary artists who continue these practices today. Located on Museum Hill, the museum provides essential context for understanding the deepest roots of New Mexico's visual culture.</p>`
  },
  {
    id: 41,
    full_description: `<p>Nedra Matteucci Galleries is a nationally recognized gallery specializing in Taos and Santa Fe masters, Western American art, and early twentieth-century American paintings and sculpture — one of the most distinguished dealers in this field anywhere in the United States. The gallery's extraordinary inventory encompasses the full range of the Taos Society of Artists — Sharp, Couse, Blumenschein, Phillips, Berninghaus, Dunton, and their peers — alongside major California impressionists, early Santa Fe painters, and important contemporary Western artists. Matteucci's compound on Paseo de Peralta, with its sculpture gardens and gracious setting, is one of the most beautiful gallery environments in Santa Fe and a fitting home for art of this quality and historical importance.</p>`
  },
  {
    id: 48,
    full_description: `<p>The New Mexico Museum of Art is the state's oldest art museum, housed in a landmark 1917 Pueblo Revival building that faces the Santa Fe Plaza and constitutes one of the most important examples of the Spanish Colonial Revival architectural style in the United States. The permanent collection spans more than a century of New Mexico art — from the founding generation of the Taos Society of Artists and Santa Fe art colony through midcentury abstraction to contemporary New Mexican practice — making it the definitive repository for the visual history of art in the state. The museum's St. Francis Auditorium, decorated with murals depicting the history of New Mexico, is itself a landmark of American regionalist mural painting.</p>`
  },
  {
    id: 250,
    full_description: `<p>Nüart Gallery on Canyon Road is a bridge between New Mexico's foundational art movement and its contemporary heirs, presenting master works by the legendary Taos Society of Artists alongside living New Mexico painters who work in the tradition those founding artists established. The gallery's program honors the conviction that the paintings of Blumenschein, Sharp, Couse, and their peers set a standard of landscape painting and figuration that remains vital and challenging for artists working in the Southwest today. Nüart's Canyon Road location places it in the historic heart of Santa Fe's gallery district, where eighteenth-century adobe compounds have housed galleries, studios, and artists' residences for more than a century.</p>`
  },
  {
    id: 251,
    full_description: `<p>Patina Gallery is one of the most acclaimed jewelry and fine craft galleries in the American Southwest, presenting sculptural jewelry, objects, and furniture by leading contemporary studio artists from across the country in an elegant downtown Santa Fe setting. The gallery treats jewelry as fine art — each piece selected for its conceptual ambition and craft excellence rather than its material value alone — and the result is one of the most intellectually engaging and visually compelling craft galleries in the country. Patina's roster includes some of the most significant studio jewelers working today, whose work is collected by major museums and serious collectors of contemporary craft internationally.</p>`
  },
  {
    id: 54,
    full_description: `<p>Peters Projects is a contemporary art gallery in Santa Fe focused on progressive and experimental work, bringing innovative artists from around the world to the Santa Fe art scene and positioning the city as a meaningful node in the international contemporary art conversation. The gallery's program is deliberately international in scope — presenting artists from Europe, Latin America, and Asia alongside American artists — and deliberately ambitious in its curatorial vision, favoring work that challenges and surprises over work that confirms established tastes. Peters Projects has become one of the most important galleries in Santa Fe for collectors interested in the international contemporary market, providing access to artists and perspectives that few Southwest galleries can match.</p>`
  },
  {
    id: 55,
    full_description: `<p>Photo Eye Gallery is the Southwest's premier gallery for fine art photography, representing photographers from around the world with an emphasis on conceptual and documentary work of the highest quality. Since its founding in Santa Fe, Photo Eye has built a reputation as one of the most knowledgeable and committed photography galleries in the country, with a program spanning the full range of contemporary photographic practice — from large-format landscape work and studio portraiture to conceptual image-making and photojournalism elevated to the level of fine art. Photo Eye's bookshop, stocking the most comprehensive selection of photography books in the Southwest, is itself a destination for anyone serious about the medium.</p>`
  },
  {
    id: 253,
    full_description: `<p>Riva Yares Gallery is one of Santa Fe's most established galleries, representing significant modern and contemporary artists in a program spanning painting, sculpture, and works on paper with particular strength in Latin American masters. The gallery's program reflects a deep engagement with the artistic traditions of both the United States and Latin America — presenting artists whose work demonstrates the rich dialogue between these traditions over the past century — and its long-term relationships with artists and estates give it access to works of exceptional quality and historical importance. Riva Yares' presence in Santa Fe is a reminder of the city's role as a meeting point between North American and Latin American artistic culture.</p>`
  },
  {
    id: 132,
    full_description: `<p>SITE Santa Fe is an internationally acclaimed independent contemporary art space in the Railyard District, presenting ambitious large-scale exhibitions by globally significant artists alongside a celebrated biennial that has become one of the most important survey exhibitions of international contemporary art in the United States. Since its founding in 1995, SITE has mounted major exhibitions by artists including Do Ho Suh, Kiki Smith, and Alfredo Jaar, consistently positioning Santa Fe as a city where serious international contemporary art happens. SITE's industrial Railyard building provides the scale needed for ambitious installation work, and its commitment to commissioning new work ensures that exhibitions are genuinely produced in and for Santa Fe rather than simply imported.</p>`
  },
  {
    id: 56,
    full_description: `<p>Santa Fe Clay is a nationally recognized ceramics school and gallery that has made Santa Fe one of the most important centers for studio ceramics in the United States, hosting workshops with leading clay artists from across the country and around the world while maintaining a gallery program dedicated exclusively to contemporary ceramics. The workshop program — bringing major ceramicists to Santa Fe for intensive teaching residencies — has trained generations of studio potters and collectors and established a community of ceramic artists in northern New Mexico that rivals the concentration found in any other region. The gallery presents finished works by workshop faculty and invited artists, giving visitors access to studio ceramics of the highest quality in the world.</p>`
  },
  {
    id: 45,
    full_description: `<p>Turner Carroll Gallery is one of Santa Fe's most celebrated galleries, presenting vibrant, expressive work by leading contemporary artists with deep roots in the Southwest alongside international artists whose work resonates with the color, light, and spiritual intensity of the New Mexico landscape. The gallery's program is marked by its commitment to joy and expressiveness — work that communicates directly through color, gesture, and bold composition — without sacrificing intellectual substance. Turner Carroll's Canyon Road location places it at the historic heart of Santa Fe's gallery district, and its roster of artists includes some of the most sought-after names in the Southwest contemporary market.</p>`
  },
  {
    id: 135,
    full_description: `<p>Vladem Contemporary is a branch of the New Mexico Museum of Art located in the Railyard District, dedicated to modern and contemporary art from 1945 to the present in a striking renovated industrial space that provides a dramatic counterpart to the museum's historic Pueblo Revival building on the Plaza. The Vladem's program draws from the New Mexico Museum of Art's extensive holdings of twentieth and twenty-first century work, supplemented by loans and new acquisitions that position it as a serious institution for contemporary art in the Southwest. Its Railyard location — adjacent to SITE Santa Fe, El Museo Cultural, and the Santa Fe Farmers' Market — makes it part of one of the most culturally rich and walkable districts in the American Southwest.</p>`
  },
  {
    id: 51,
    full_description: `<p>The Wheelwright Museum of the American Indian is dedicated to Native American art and culture, with a particular focus on Navajo ceremonial arts and contemporary Native American artists — a mission that reflects the museum's origins in the 1930s collaboration between trader Mary Cabot Wheelwright and Navajo medicine man Hosteen Klah. The museum's collection of Navajo ceremonial textile reproductions, historic jewelry, and contemporary Native art is extraordinary, and the Case Trading Post in the museum's basement is one of the most respected sources for authentic Native American art in Santa Fe. The museum's commitment to living Native American art — supporting contemporary artists alongside historic objects — gives it a vitality that purely historical institutions cannot match.</p>`
  },
  {
    id: 46,
    full_description: `<p>Zane Bennett Contemporary Art is one of Santa Fe's premier galleries for contemporary art, representing leading national and international artists in a program of painting, photography, and sculpture of exceptional quality and range. The gallery's program spans the full breadth of contemporary practice, from large-scale abstract painting through conceptual photography and site-specific installation, with a consistent commitment to work of intellectual seriousness and visual impact. Zane Bennett's deep integration into the international art market — through art fair participation and relationships with galleries in New York, London, and elsewhere — gives its artists and collectors access to a conversation that extends well beyond the Southwest.</p>`
  },
  {
    id: 53,
    full_description: `<p>Zaplin-Lampert Gallery specializes in historic Taos and Santa Fe masters, presenting rare works by the founding artists of the Taos Society of Artists and the Santa Fe art colony — Sharp, Couse, Blumenschein, Phillips, Berninghaus, Dunton, and their peers — with a depth of expertise and inventory that makes it one of the most important dealers in this material anywhere in the United States. The gallery's focused commitment to the founding era of New Mexico art reflects the conviction that these artists produced some of the finest work in American art history, and that the landscape and peoples they painted deserve the serious scholarly and market attention that Zaplin-Lampert provides. A visit is a concentrated immersion in the golden age of New Mexico painting.</p>`
  },
  // Silver City
  {
    id: 267,
    full_description: `<p>The Mimbres Region Arts Council Gallery is the main exhibition venue for Silver City's vibrant arts community, showcasing works by local and regional artists in a welcoming downtown space and hosting Silver City's beloved First Friday ArtWalk events that bring gallery visitors into the town's growing creative district each month. Silver City — a former copper mining town in the foothills of the Gila Wilderness — has reinvented itself as one of New Mexico's most dynamic arts communities, attracting painters, potters, sculptors, and makers who value the town's affordable rents, extraordinary landscape, and genuine creative community. The Arts Council Gallery is the institutional anchor for this community, providing exhibition opportunities and advocacy for artists across the Mimbres Valley region.</p>`
  },
  {
    id: 266,
    full_description: `<p>The Silver City Museum is housed in a striking Victorian-era home in Silver City's historic district, presenting the history and folk art of southwestern New Mexico through collections that encompass Apache and Mimbres heritage, the copper mining era, frontier life, and the early years of Billy the Kid, who was born in Silver City. The museum's collections document the extraordinary cultural layering of the region — ancient Mimbres pottery, Spanish colonial religious art, Apache material culture, and the vernacular objects of mining-era daily life — placing Silver City's present creative vitality in the context of a remarkably deep and complex history. The Victorian building itself, with its period furnishings and architectural detail, is one of the finest examples of territorial-era architecture in the Southwest.</p>`
  },
  {
    id: 265,
    full_description: `<p>The Western New Mexico University Museum in Silver City is home to the world's largest permanent display of Mimbres pottery — the extraordinary black-on-white vessels produced by the Mimbres people who inhabited the valleys of southwestern New Mexico between approximately 1000 and 1150 CE. Mimbres pottery is recognized as one of the great achievements of prehistoric American art, combining geometric abstraction with naturalistic animal and human figures in compositions of startling visual sophistication. The museum's collection, built over more than a century of careful acquisition, provides the most comprehensive opportunity in the world to study and appreciate this tradition, making Silver City an essential destination for anyone interested in the art of the ancient Southwest.</p>`
  },
  // Taos
  {
    id: 62,
    full_description: `<p>Blue Rain Gallery Taos is the Taos location of one of the Southwest's most celebrated galleries for contemporary Native American art, presenting work by Indigenous artists from Pueblo, Navajo, Hopi, and other tribal nations alongside non-Native artists whose work engages deeply with Southwest themes and traditions. The Taos location gives Blue Rain a presence in one of New Mexico's most historically significant art towns — the same mountain valley where the Taos Pueblo has stood for more than a thousand years and where the founding artists of the Taos Society of Artists established the Southwest's first major art colony. Blue Rain's program honors this extraordinary heritage while presenting contemporary artists redefining what Southwest art means today.</p>`
  },
  {
    id: 60,
    full_description: `<p>The Harwood Museum of Art is the second-oldest art museum in New Mexico, with a permanent collection that spans the full history of art in Taos — from the founding generation of the Taos Society of Artists through the modernist experiments of the 1920s and 1930s to the diverse contemporary artists working in the valley today. The museum's Agnes Martin Gallery, housing seven large paintings donated by the artist who spent the last decades of her life in nearby Taos, is one of the most serene and powerful gallery experiences in the American Southwest. The Harwood's deep integration with the Taos community — through education programs, community exhibitions, and its role as keeper of the town's artistic memory — makes it far more than a repository of historical objects.</p>`
  },
  {
    id: 63,
    full_description: `<p>Inger Jirby Gallery is one of Taos's most beloved art destinations, showcasing the expressive, color-rich paintings of Norwegian-born artist Inger Jirby, whose work draws on both the landscape of northern New Mexico and a lifetime of travel to Mexico, Guatemala, and around the world. Jirby's paintings are distinguished by their bold palette, gestural freedom, and genuine sense of joy — qualities that make them among the most immediately accessible works in the Taos gallery world while concealing significant painterly intelligence. The gallery's intimate adobe space on Ledoux Street, in the heart of Taos's historic arts district, provides an ideal setting for paintings that celebrate the beauty of the world with unashamed directness.</p>`
  },
  {
    id: 61,
    full_description: `<p>The Millicent Rogers Museum is one of the finest collections of Native American and Hispanic art and artifacts from the American Southwest, assembled by the fashion icon and art collector Millicent Rogers who fell in love with Taos in the final years of her short life. The collection's centerpiece is one of the finest assemblages of Pueblo jewelry ever put together — rings, bracelets, necklaces, and ceremonial objects in silver, turquoise, coral, and jet — alongside Navajo and Rio Grande blankets, San Ildefonso pottery by María Martínez, and devotional objects from New Mexico's Hispanic communities. The museum's intimate scale and exceptional quality make it one of the most rewarding experiences on the northern New Mexico museum circuit.</p>`
  },
  {
    id: 65,
    full_description: `<p>The Navajo Gallery is the historic gallery of celebrated Diné artist R.C. Gorman — one of the most acclaimed Native American artists of the twentieth century — whose iconic figurative works celebrating Navajo women have made him both a beloved regional figure and an internationally recognized artist. Gorman's work, which draws on both the Navajo figurative tradition and the influences of Mexican muralism, modernist painting, and printmaking he absorbed through formal training and international travel, is presented alongside a program of other Native American art that honors the tradition Gorman both inherited and transformed. The gallery's Taos location places it in the community where Gorman made his home and developed his mature artistic identity.</p>`
  },
  {
    id: 64,
    full_description: `<p>Parks Gallery is one of Taos's most established venues for landscape and figurative painting, presenting artists with deep connections to the high desert of northern New Mexico whose work reflects the extraordinary quality of light, color, and space that has drawn painters to Taos for more than a century. The gallery's program honors the tradition of direct engagement with the Taos landscape — the Rio Grande Gorge, the Sangre de Cristo Mountains, the high sage mesa — while remaining open to the full range of contemporary approaches to landscape and figure that artists in the valley are actively pursuing today. Parks Gallery's long-standing presence in the Taos art community gives it a deep understanding of the tradition its artists are working within and extending.</p>`
  },
  {
    id: 66,
    full_description: `<p>Six Directions Gallery is a premier destination for authentic Native American jewelry, pottery, and art, sourcing directly from Pueblo artisans and tribal communities across the Southwest to present work of genuine cultural and artistic significance to collectors and visitors. The gallery's name honors the six cardinal directions of Indigenous cosmology — north, south, east, west, above, and below — and its program reflects this holistic worldview, presenting art not as a commodity but as an expression of living cultural identity. Six Directions' direct relationships with Native artists ensure that the work it presents is authentically made and that artists receive fair compensation for work representing their communities' most important creative traditions.</p>`
  },
  {
    id: 67,
    full_description: `<p>Studio Taos is a collaborative gallery and studio space showcasing contemporary fine art by Taos-based artists, with an emphasis on painting, sculpture, and works on paper produced in the extraordinary creative environment of the Taos valley. The gallery's program reflects the diversity of contemporary artistic practice in Taos — a town that has attracted artists for more than a century and continues to draw painters, sculptors, and printmakers who find in the northern New Mexico landscape and community a context for their work available nowhere else. Studio Taos's collaborative approach — presenting multiple artists in an environment that reflects the creative community they constitute — gives visitors an unusually authentic sense of the living art scene in this legendary town.</p>`
  },
  {
    id: 59,
    full_description: `<p>The Taos Art Museum at Fechin House is housed in one of the most extraordinary buildings in the American Southwest — the hand-carved wooden house and studio created by Russian artist Nicolai Fechin after his arrival in Taos in 1927. Fechin's intricate carved woodwork — covering doors, beams, cabinets, and architectural details in a style fusing Russian folk art with the kiva architecture of the Taos Pueblo — is itself a major artwork of unparalleled ambition and craftsmanship. The museum presents paintings by the founders of the Taos Society of Artists alongside works by Fechin himself, whose bold, painterly portraits represent some of the most technically brilliant works produced in New Mexico during the early twentieth century.</p>`
  },
  {
    id: 255,
    full_description: `<p>The Taos Center for the Arts is the cultural hub of one of New Mexico's most historically significant arts communities, presenting visual art exhibitions, film screenings, and performing arts events in a historic building that serves as the gathering place for Taos's creative community year-round. The TCA's programming reflects the full range of artistic activity in the Taos valley — visual art exhibitions featuring established and emerging artists, film series presenting international and independent cinema, and performing arts events ranging from jazz concerts to theatrical productions. The center's role as a meeting place for Taos's diverse creative population gives it a social vitality that complements and sustains its formal programming.</p>`
  },
  {
    id: 256,
    full_description: `<p>The Van Vechten Lineberry Taos Art Museum is devoted to the art of Duane Van Vechten and the broader circle of early Taos artists who shaped the town's legendary art colony during the first half of the twentieth century. The collection, displayed in a serene campus setting surrounded by the landscape that inspired the work, provides an intimate and unhurried encounter with paintings that document both the extraordinary beauty of the Taos environment and the artistic ambitions of the artists who chose to make their lives and careers in this remote mountain valley. For visitors seeking a quieter alternative to the busier museums and galleries of central Taos, the Van Vechten Lineberry offers a genuinely contemplative experience of rare quality.</p>`
  },
];

async function run() {
  console.log(`Updating ${updates.length} New Mexico listings...`);
  for (const { id, full_description } of updates) {
    await sql`UPDATE listings SET full_description = ${full_description} WHERE id = ${id}`;
    process.stdout.write('.');
  }
  console.log('\nDone.');
}

run().catch(console.error);
