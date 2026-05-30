const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.NEON_DB_KEY);

const updates = [
  // Aspen
  {
    id: 197,
    full_description: `<p>Anderson Ranch Arts Center is one of the premier artist residency and education programs in the United States, set on a historic working ranch in Snowmass Village just outside Aspen. The Ranch brings hundreds of artists to the Roaring Fork Valley each year for intensive workshops taught by faculty including some of the most celebrated artists working today. Its on-site galleries present work by visiting artists and residents throughout the summer season, offering a rare look at art in the process of being made. The combination of mountain setting, creative intensity, and international faculty makes Anderson Ranch a transformative experience for artists and visitors alike.</p>`
  },
  {
    id: 89,
    full_description: `<p>Ann Korologos Gallery is one of the most respected contemporary galleries in the Rocky Mountain region, presenting established and carefully selected emerging artists in a program of exceptional range and quality. Located in Basalt in the Roaring Fork Valley, the gallery draws serious collectors from Aspen and beyond with exhibitions that rotate regularly and engage with the full breadth of contemporary practice — from ambitious painting and sculpture to works on paper and photography. Korologos's deep relationships with artists and curators give the gallery a curatorial intelligence that stands comparison with the best galleries in any major American city.</p>`
  },
  {
    id: 87,
    full_description: `<p>The Aspen Art Museum is one of the most distinctive non-collecting contemporary art museums in the United States, occupying a stunning building designed by Shigeru Ban that opened in 2014. Ban's signature woven basket exterior and rooftop restaurant have made the building as talked-about as the art inside, which draws from the international contemporary scene for a program of ambitious rotating exhibitions. Free admission ensures that the museum functions as a genuine civic institution in a town defined by economic extremes, and its location at the center of Aspen's pedestrian core makes it both unavoidable and unforgettable.</p>`
  },
  {
    id: 198,
    full_description: `<p>The Aspen Historical Society Museum preserves and presents the visual and cultural history of the Roaring Fork Valley, from its origins as a Ute homeland through the silver mining boom of the 1880s to the town's postwar reinvention as a world-class arts and cultural destination. Rotating exhibitions draw on a collection of historical photography, mining-era artifacts, maps, and personal archives documenting the transformation of a remote mountain silver camp into one of the most culturally significant small towns in America. For visitors seeking context for Aspen's remarkable identity, the Historical Society Museum provides essential and often surprising grounding.</p>`
  },
  {
    id: 88,
    full_description: `<p>Baldwin Gallery is one of the premier contemporary art galleries in the Rocky Mountain region, representing artists of national and international stature in a program that brings the quality of a major urban gallery to Aspen's rarified mountain setting. The gallery has deep relationships with artists working at the highest levels of contemporary practice, and its exhibitions — often accompanied by catalogues and critical texts — function more like museum presentations than typical commercial shows. Baldwin's Aspen location draws an unusually sophisticated collector base, and the gallery's sustained engagement with its artists over time gives the program a depth and continuity that serious collectors value.</p>`
  },
  {
    id: 90,
    full_description: `<p>Galerie Maximillian is a distinguished gallery dealing in twentieth-century and contemporary masters, with an outstanding inventory of prints, drawings, and sculpture by celebrated international artists. The gallery's Aspen location places it among the most storied in the Rocky Mountain region, serving a collector clientele drawn to works by Picasso, Miró, Chagall, and their contemporaries alongside major names from postwar and contemporary art. Galerie Maximillian's expertise in prints and works on paper makes it a destination for collectors seeking important works at a range of price points, with the assurance of provenance and scholarship that distinguishes a serious dealer from a decorator.</p>`
  },
  // Boulder
  {
    id: 199,
    full_description: `<p>Boulder Arts & Crafts Gallery has been a fixture on the beloved Pearl Street Mall since 1971, making it one of Colorado's longest-running artist cooperatives. The gallery showcases handcrafted jewelry, ceramics, fiber, glass, and mixed-media work by Colorado artisans, with an emphasis on quality craftsmanship and direct artist relationships. Every piece sold comes from a member artist, ensuring that purchases directly support working makers in the community. The Pearl Street Mall location — at the heart of Boulder's outdoor pedestrian corridor — gives the gallery exceptional visibility and makes it a natural first stop for visitors discovering Boulder's vibrant creative community.</p>`
  },
  {
    id: 109,
    full_description: `<p>The Boulder Museum of Contemporary Art is a dynamic nonprofit institution on Pearl Street presenting rotating exhibitions by regional, national, and international artists across all media. BMoCA's program is deliberately adventurous — embracing performance, video, installation, and emerging practices alongside painting and sculpture — and its education programs, artist talks, and community events make it a genuine hub for Boulder's creative community. The museum's accessible price point and Pearl Street location ensure it reaches a broad public, while the ambition of its program keeps it firmly in conversation with contemporary practice on the national and international stage.</p>`
  },
  {
    id: 110,
    full_description: `<p>The CU Art Museum at the University of Colorado Boulder offers free public access to a permanent collection of more than 5,000 works spanning photography, prints, drawings, and contemporary art, alongside an active program of rotating exhibitions. The collection is particularly strong in photography and works on paper, with significant holdings that document twentieth-century American culture and landscape. Located on the CU campus, the museum serves both the university community and Boulder residents seeking serious engagement with art and ideas. Regular programming — artist talks, film screenings, and community events — animates the collection and extends its reach well beyond the campus.</p>`
  },
  {
    id: 111,
    full_description: `<p>The Dairy Arts Center is Boulder's flagship multidisciplinary arts institution, housed in a converted 1930s dairy building transformed into a dynamic hub for visual art, film, performing arts, and artist residencies. Three cinema screens, two galleries, and flexible performance spaces operate year-round, hosting a program that makes the Dairy the most comprehensive arts venue in Boulder outside the university. Visiting the Dairy means encountering art at every turn — the building itself, with its original milk-processing infrastructure now threaded through with creative activity, is an artwork of adaptive reuse as compelling as anything on the walls.</p>`
  },
  {
    id: 113,
    full_description: `<p>Groundworks Art Lab is a community ceramics and fine arts studio at the heart of Boulder, offering classes, open studio time, and gallery exhibitions welcoming artists of all skill levels and backgrounds. The studio's kiln facilities, hand-building and wheel-throwing spaces, and supportive teaching staff make it one of Boulder's most active creative communities, drawing beginners alongside serious practitioners who appreciate the quality of the facility and the collegial atmosphere. Regular exhibitions in the gallery space showcase finished works by studio members, giving the broader Boulder community an ongoing window into the creative process unfolding daily in the studio.</p>`
  },
  {
    id: 201,
    full_description: `<p>The Macky Auditorium Gallery is housed within CU Boulder's landmark Macky Auditorium — a 1922 Romanesque Revival building at the heart of the university's historic campus — and presents rotating exhibitions of contemporary and historical art that serve both the campus community and the broader Boulder arts scene. The gallery's location within one of the university's most architecturally significant buildings gives exhibitions a distinctive setting that amplifies the work on view. Programming draws from CU's extended community of artists, scholars, and alumni, as well as visiting artists whose practice engages with the university's interdisciplinary research culture.</p>`
  },
  {
    id: 200,
    full_description: `<p>The Naropa University Art Gallery is the exhibition space of Naropa University — the contemplative arts university founded by Tibetan meditation master Chögyam Trungpa Rinpoche in 1974 — presenting work at the intersection of spiritual practice and contemporary visual art. Naropa's extraordinary lineage, connecting Beat poetics, Buddhist philosophy, and American experimental arts, gives the gallery a unique conceptual frame. Artists shown here engage with questions of perception, presence, and creativity that go beyond the concerns of most contemporary galleries, and the Naropa community — students, faculty, and visiting artists — brings unusual intentionality to every exhibition and event.</p>`
  },
  {
    id: 112,
    full_description: `<p>Swoon Art House is a curated contemporary gallery and creative studio space in Boulder, presenting works by emerging and established artists in a relaxed, collector-friendly environment that prioritizes genuine engagement over the sometimes intimidating atmosphere of commercial galleries. The program favors work with strong visual presence and conceptual depth, drawing from Colorado's creative community while also presenting artists from across the country. Swoon's dual identity as gallery and working studio gives it a productive energy — visitors encounter art being made as well as art on display, reflecting a genuine commitment to supporting the full creative process rather than just its finished results.</p>`
  },
  // Colorado Springs
  {
    id: 202,
    full_description: `<p>The Colorado Springs Fine Arts Center at Colorado College is one of the finest arts institutions in the American Southwest, housed in a stunning 1936 Art Deco building that is itself a landmark of American regional modernism. The permanent collection — spanning Native American and Hispanic art, the Taos and Santa Fe art colonies, Mexican modernism, and twentieth-century American painting — ranks among the most significant holdings in the region. Major traveling exhibitions complement the permanent galleries, while the resident theater company presents professional productions in the building's original stage. Free admission for Colorado College students and community pricing make this a genuine civic treasure.</p>`
  },
  {
    id: 204,
    full_description: `<p>Gallery of the Rockies celebrates the majestic landscapes of the Rocky Mountain region through plein air paintings, photography, and sculpture inspired by Pikes Peak, the Great Plains, and the Colorado high country. The gallery presents artists who work directly from the landscape — the tradition of painting en plein air that has been central to Colorado art since the late nineteenth century — alongside studio artists whose work is informed by deep engagement with the region's extraordinary terrain. For visitors drawn to Colorado by its natural grandeur, Gallery of the Rockies offers a means of taking that landscape home in the form of a painting or photograph.</p>`
  },
  {
    id: 203,
    full_description: `<p>The Pikes Peak Arts Council is the primary arts advocacy and programming organization for the Pikes Peak region, supporting local artists through grants, exhibitions, and public programming that celebrates the creative heritage of southern Colorado. The Council's gallery exhibitions provide exposure for regional artists who might otherwise lack access to professional exhibition venues, while its advocacy work ensures that arts funding and cultural programming remain priorities in the civic life of Colorado Springs. Annual events and community initiatives reinforce the Pikes Peak region's identity as a place where the arts are valued, supported, and genuinely woven into the fabric of daily life.</p>`
  },
  // Denver
  {
    id: 119,
    full_description: `<p>The American Museum of Western Art — The Anschutz Collection — brings one of the finest private collections of Western American art in the world to public view in downtown Denver. Spanning more than 600 works by Frederic Remington, Charles Russell, Thomas Moran, Albert Bierstadt, and a century of successors, the collection documents the full visual history of art made about the American West. Housed in the historic Navarre building — a Denver landmark — the museum presents these works with the seriousness and scholarly apparatus of a major institution, offering visitors an unparalleled encounter with the mythology and reality of the West as painters have seen it.</p>`
  },
  {
    id: 227,
    full_description: `<p>CORE New Art Space is a dynamic artist-run gallery at the heart of Denver's Santa Fe Arts District, presenting challenging contemporary work from an emerging roster with a First Friday presence at the center of Denver's gallery community. The cooperative model — sustained by its member artists — ensures that programming reflects the genuine interests of working artists rather than the demands of the commercial market, resulting in a program of exceptional variety and authenticity. CORE's commitment to emerging voices and experimental practices makes it one of Denver's most reliably exciting exhibition venues, and its Santa Fe location places it at the epicenter of Denver's monthly gallery culture.</p>`
  },
  {
    id: 116,
    full_description: `<p>The Clyfford Still Museum is one of the most remarkable single-artist museums in the world, holding 94 percent of Still's lifetime artistic output — an extraordinary condition stipulated by the artist in his will, which required his estate to remain intact until an American city would build a dedicated museum. Denver won that honor, and Brad Cloepfil's purpose-built museum, opened in 2011, presents Still's monumental Abstract Expressionist canvases in galleries designed specifically for them. The collection traces the full arc of Still's career from early figurative work through the mature paintings that made him one of the most radical voices in American modernism.</p>`
  },
  {
    id: 120,
    full_description: `<p>The Colorado Photographic Arts Center is Denver's dedicated fine art photography gallery and education center, presenting rotating exhibitions by local, national, and international photographers alongside workshops, lectures, and community programming. CPAC's program reflects the full range of contemporary photography — from documentary and street photography to conceptual and fine art practice — giving it a breadth that few photography-dedicated galleries achieve. Education programs draw photographers at every level, from beginners to professionals deepening their practice, and the gallery exhibitions provide context for understanding photography as a serious art form with a rich and continuously evolving history.</p>`
  },
  {
    id: 228,
    full_description: `<p>David Cook Fine American Art is Denver's foremost dealer in historical American paintings, with particular expertise in the Taos and Santa Fe art colonies of the early twentieth century. The gallery's inventory spans the late nineteenth through mid-twentieth centuries, encompassing the luminous landscapes and genre scenes of the masters who first painted the American West for eastern audiences — artists like Joseph Henry Sharp, E. Irving Couse, and Walter Ufer. Cook's deep knowledge of provenance, attribution, and the historical record of American art makes the gallery an essential resource for serious collectors and a fascinating destination for anyone drawn to the golden age of American regional painting.</p>`
  },
  {
    id: 75,
    full_description: `<p>The Denver Art Museum is one of the largest art museums between Chicago and Los Angeles, with a collection of more than 70,000 works spanning a remarkable range of cultures, periods, and media. The museum is particularly celebrated for its American Indian art collection — one of the finest in the world — and for its Western American art holdings, which document the full history of art made in and about the American West. Daniel Libeskind's angular Frederic C. Hamilton Building provides dramatic spaces for contemporary work, while a major renovation of the North Building, completed in 2021, significantly expanded public access to the encyclopedic permanent collection.</p>`
  },
  {
    id: 224,
    full_description: `<p>The Freyer–Newman Center at Denver Botanic Gardens is the art and education center within one of the most acclaimed botanic gardens in the United States, presenting exhibitions where art meets natural science. Programming draws on the botanical world for inspiration — from historical botanical illustration to contemporary artists whose work engages with the plant kingdom, ecology, and our shifting relationship to the natural world. The center's location within the Gardens means exhibitions exist in productive dialogue with the living collection surrounding them, giving visitors a layered experience that combines horticultural wonder with artistic reflection throughout the year.</p>`
  },
  {
    id: 121,
    full_description: `<p>The Dikeou Collection is one of Denver's most distinctive cultural offerings — a privately held contemporary art collection spread across multiple downtown Denver storefronts, presenting surprising installations and works in unexpected urban spaces. Devon and Pappa Dikeou have assembled a collection spanning video, sculpture, photography, and installation by artists from across the United States and internationally, with a particular interest in work that engages critically with popular culture and mass media. The storefront format, modeled on the Dikeou family's entrepreneurial history in Denver, democratizes access to serious contemporary art in an informal setting that rewards exploration and multiple visits.</p>`
  },
  {
    id: 86,
    full_description: `<p>The Emanuel Gallery at the University of Colorado Denver occupies an important position in the city's cultural landscape, presenting contemporary art with an educational mission that serves both the university community and Denver's broader arts public. The gallery's program draws from the national and international contemporary scene while maintaining a particular commitment to Denver and Colorado artists, providing exhibition opportunities that can be difficult to access outside the university context. Regular programming — artist talks, panel discussions, community events — connects the work on view to broader questions in contemporary art, making Emanuel Gallery a genuine meeting point for artists, students, and the Denver arts community.</p>`
  },
  {
    id: 226,
    full_description: `<p>Gildar Gallery is a project-based contemporary gallery on Denver's South Broadway corridor, presenting ambitious exhibitions with a commitment to rigorous curatorial vision, community engagement, and the support of Denver's independent art scene. Programming is deliberately thoughtful — fewer shows than many commercial galleries, but more developed — giving each exhibition the space and attention it needs to register fully. Gildar's South Broadway location places it among record shops, vintage stores, and other artist-run spaces that constitute an alternative to the more institutional gallery districts. The gallery is a trusted resource for Denver collectors seeking work with genuine intellectual substance.</p>`
  },
  {
    id: 225,
    full_description: `<p>Goodwin Fine Art is a respected Cherry Creek gallery specializing in American representational art — Colorado landscapes, still lifes, and figurative work by a curated stable of accomplished painters who work in the long tradition of direct observation and technical mastery. The Cherry Creek location places it at the heart of Denver's most established arts district, where it has served collectors for years with a program that prizes quality of execution over trendiness. Artists represented by Goodwin work in oil, watercolor, and pastel, sharing a commitment to craft that gives the gallery's program a coherence and warmth distinguishing it from galleries chasing the contemporary market.</p>`
  },
  {
    id: 117,
    full_description: `<p>The Kirkland Museum of Fine & Decorative Art is one of the most distinctive art museums in the United States, presenting a world-class collection of international Art Nouveau, Arts and Crafts, Deco, Bauhaus, and mid-century decorative art alongside the paintings of Colorado modernist Vance Kirkland. The decorative art collection — encompassing furniture, ceramics, glass, metalwork, and textiles from virtually every major design movement of the period 1875–1990 — provides a comprehensive survey of modern design extraordinary for its size and depth. The purpose-built museum in Denver's Golden Triangle neighborhood provides an ideal setting for the layered visual experience Kirkland intended.</p>`
  },
  {
    id: 118,
    full_description: `<p>The Museo de las Américas is the first Latino art museum in the Rocky Mountain region, celebrating the diversity and vitality of Latin American and Latino art and culture through permanent collections and rotating exhibitions that span pre-Columbian artifacts through contemporary work by living artists. Located in Denver's Santa Fe Arts District, the Museo draws from across the hemisphere to present a program of unusual breadth, honoring both the ancient artistic traditions of Latin America and the contemporary voices reshaping the field. The museum's education programs serve Denver's substantial Latino community and broader public, making it an indispensable institution in Colorado's cultural landscape.</p>`
  },
  {
    id: 76,
    full_description: `<p>MCA Denver presents boundary-pushing contemporary art in a purpose-built building designed by Renzo Piano Building Workshop in the heart of lower downtown Denver. The museum's program is deliberately experimental — embracing performance, video, new media, and installation alongside painting and sculpture — and its public programs extend exhibitions into the community through talks, workshops, and events. MCA Denver's rooftop café and flexible event spaces have made it a gathering place for Denver's creative class, and free Thursday evenings ensure that cost is never a barrier to engaging with some of the most challenging art being made in the world today.</p>`
  },
  {
    id: 85,
    full_description: `<p>Pirate: Contemporary Art is an artist-run gallery and collective in Denver's River North Arts District, presenting boundary-pushing work with an emphasis on community, experimentation, and accessibility. The collective model means programming is driven by artists' own interests and enthusiasms rather than commercial logic, resulting in a program of unusual variety and genuine creative risk — exhibitions you wouldn't see in a conventional gallery, by artists whose practices resist easy categorization. Pirate's RiNo location places it at the center of Denver's most dynamically evolving creative neighborhood, where murals, studios, and maker spaces have transformed a warehouse district into one of the country's most visited street art destinations.</p>`
  },
  {
    id: 82,
    full_description: `<p>Plus Gallery is one of Denver's most active contemporary art galleries, presenting a dynamic program of solo and group exhibitions championing emerging and mid-career artists from Colorado and beyond. The program is broad in media and approach, encompassing painting, photography, sculpture, and mixed media, with an emphasis on artists building serious careers and expanding their practice. Plus Gallery's consistent presence in Denver's gallery scene — including regular participation in First Friday and other community events — has made it a reliable resource for collectors seeking work by artists on the rise, presented with the professional care that supports both artists and long-term collector relationships.</p>`
  },
  {
    id: 81,
    full_description: `<p>RedLine Contemporary Art Center is a nonprofit contemporary art center with artist residencies, community programming, and gallery exhibitions that prioritize social engagement and cultural equity. Located at the edge of Denver's Curtis Park neighborhood, RedLine provides studio space to a rotating cohort of resident artists working at the intersection of art and community practice — whose work often engages directly with the neighborhoods and communities surrounding the center. Gallery exhibitions extend the residency program to the public, while community initiatives from youth art education to neighborhood-based projects make RedLine one of the most socially grounded art institutions in Colorado.</p>`
  },
  {
    id: 77,
    full_description: `<p>Robischon Gallery is one of Denver's most respected and long-standing contemporary art galleries, representing nationally and internationally recognized artists across painting, sculpture, photography, and new media. Founded in 1990, the gallery has played a central role in the development of Denver's contemporary art scene, bringing major artists to the city and developing the careers of Colorado artists who have gone on to national prominence. Robischon's Cherry Creek location gives it visibility among Denver's most engaged collector community, and the gallery's consistent curatorial quality — built over more than three decades — makes it the essential reference point for contemporary art collecting in Colorado.</p>`
  },
  {
    id: 83,
    full_description: `<p>Rule Gallery presents critically engaged contemporary art that challenges conventions across painting, installation, performance, and conceptual practice. The program is marked by intellectual rigor and curatorial ambition, representing artists whose work demands sustained attention and rewards it with genuine ideas. Rule operates from Denver's Golden Triangle neighborhood — the heart of the city's museum district — in productive proximity to the Denver Art Museum and Kirkland Museum. Participation in major art fairs and relationships with galleries in other cities give Rule's artists exposure beyond the Colorado market, making it an important platform for serious artists working in Denver.</p>`
  },
  {
    id: 84,
    full_description: `<p>Space Gallery is a dynamic contemporary art space in Denver known for adventurous programming and consistent support of emerging artists across disciplines. The gallery's commitment to experimental and cross-disciplinary work — embracing performance, video, installation, and hybrid practices alongside painting and sculpture — makes it one of Denver's most reliably surprising exhibition venues. Space's programming reflects genuine curatorial curiosity, driven by a desire to support artists pushing the boundaries of their practice rather than those comfortably working within established modes. For collectors seeking work that represents the leading edge of contemporary practice in Colorado, Space Gallery is an essential stop.</p>`
  },
  {
    id: 80,
    full_description: `<p>Visions West Contemporary is a Colorado-rooted gallery celebrating narrative painting and sculpture with a Western perspective — art that honors the heritage of the American West while engaging honestly with the complexities of the present. The gallery's roster shares a deep connection to the land, the people, and the mythologies of the West, producing work that is accessible without being simple and regional without being provincial. Visions West's presence in Denver — with additional locations in Bozeman and Scottsdale — reflects the national scope of the Western art market and the gallery's ambition to connect collectors across the full geography of the American West.</p>`
  },
  {
    id: 79,
    full_description: `<p>Walker Fine Art is a respected contemporary gallery in Denver's Golden Triangle presenting adventurous and engaging work by mid-career and emerging artists, with particular strength in painting and photography. The program favors artists whose work is grounded in strong formal foundations while engaging with contemporary ideas and conditions — a combination that appeals to collectors seeking work that is challenging without being alienating. Walker's consistent curatorial voice and long-term relationships with its artists give the gallery a depth of program that rewards return visits, and its Golden Triangle location places it at the heart of Denver's museum and gallery district.</p>`
  },
  {
    id: 78,
    full_description: `<p>William Havu Gallery is a leading contemporary gallery in Denver's Golden Triangle, representing both established and emerging artists in a distinctive program spanning painting, works on paper, and sculpture with a consistent emphasis on formal quality and visual intelligence. Havu's curatorial eye — developed over decades of working with artists and collectors — gives the gallery a program of real distinction, presenting work that is visually compelling and intellectually grounded. The gallery's regular participation in the wider Denver arts community makes it one of the most widely respected venues in the city, trusted by collectors who value curatorial integrity over commercial trends.</p>`
  },
  // Durango
  {
    id: 332,
    full_description: `<p>A Shared Blanket Gallery is a museum-quality venue in Durango devoted entirely to Native American art and material culture, presenting handcrafted jewelry, paintings, sculpture, pottery, Kachinas, baskets, drums, flutes, and textiles made exclusively by Native artists. The gallery's founders bring an exceptional commitment to education and cultural context, ensuring that visitors understand not just the beauty of the objects on display but the traditions, communities, and individual artists behind them. In a region with deep Indigenous roots — the Four Corners was home to Ancestral Puebloan culture for centuries — A Shared Blanket provides a respectful and rigorous introduction to living Native art.</p>`
  },
  {
    id: 331,
    full_description: `<p>Blue Rain Gallery is one of the Four Corners' most celebrated venues for contemporary and Native American art, representing major Pueblo, Navajo, and Hopi artists alongside rising regional voices on Durango's historic Main Avenue. The program bridges ancient traditions of Southwest Indigenous art with the innovative work being produced by Native artists today, creating a presentation that honors cultural continuity while embracing artistic evolution. Blue Rain is particularly known for its studio glass program, representing some of the most accomplished glass artists in the Southwest. A visit to Blue Rain is an education in the living vitality of the Southwest's art traditions.</p>`
  },
  {
    id: 337,
    full_description: `<p>The Center of Southwest Studies Museum at Fort Lewis College is the research museum and archive for an extraordinary collection of Navajo, Puebloan, and Hispano textiles, plus baskets, beadwork, pottery, sculpture, and paintings representing the full breadth of Southwest cultural production. The collection's depth — built over more than a century of collecting, research, and community collaboration — makes it one of the most significant repositories of Southwest material culture in the region. The Center's dual mission of scholarship and public education means visitors can engage with objects that might otherwise be accessible only to academic researchers, placed in the cultural and historical context they require to be fully understood.</p>`
  },
  {
    id: 216,
    full_description: `<p>The Durango Arts Center is the cultural heart of southwest Colorado, presenting contemporary art exhibitions, performing arts, and community education programs that reflect the diverse creative energy of the Four Corners region. The center's galleries rotate exhibitions regularly, providing exposure for local, regional, and national artists, while education programs serve students from across the Durango community and surrounding region. The DAC's role as a community hub — hosting events, workshops, and performances that bring together artists and audiences from Durango's diverse population — makes it more than a gallery: it is a genuine gathering place for the creative life of the entire Four Corners region.</p>`
  },
  {
    id: 334,
    full_description: `<p>Earthen Vessel Gallery is a beloved Durango gallery representing more than 100 independent American studio artists, presenting an eclectic range of handcrafted pottery, paintings, jewelry, glass, and functional art objects sourced from small studios across the country. The gallery's strong Southwest aesthetic — warm earth tones, natural materials, indigenous-influenced forms — reflects its Four Corners location, while its national reach ensures the work represents the best of American studio craft from coast to coast. Earthen Vessel is a destination for visitors seeking handmade objects of genuine quality, made by individual artists rather than produced in factories and mass-marketed to tourists.</p>`
  },
  {
    id: 217,
    full_description: `<p>Maria's Bookshop is one of Colorado's most beloved independent bookstores, and its gallery space has long provided a platform for Durango's artistic community alongside an exceptional selection of art books, Southwest literature, and regional history. The gallery rotates exhibitions of local artists throughout the year, integrating visual art into the intellectual and social life of one of the most community-centered bookstores in the Mountain West. Maria's long history as a Durango institution — serving the community since 1974 — gives it a warm, trusted presence that makes every visit feel like a return to something enduring in an era of rapid cultural change.</p>`
  },
  {
    id: 335,
    full_description: `<p>The Museum of Impressionism is a unique private museum in Durango displaying more than 60 impressionist paintings on permanent exhibition — landscapes of Colorado, New Mexico, and Europe that offer visitors an intimate encounter with the impressionist tradition in an unexpected Southwest setting. The collection traces the evolution of impressionist technique across different landscapes and national traditions, from the light-saturated canvases of French painting to the distinctive quality of light that defines the Colorado high country. For visitors drawn to Durango by its natural landscapes, the museum provides a compelling argument that painting, at its best, captures something about a place that photographs cannot.</p>`
  },
  {
    id: 336,
    full_description: `<p>The Paul Folwell Studio in Durango offers collectors direct access to one of the Four Corners region's most distinctive landscape painters, specializing in oil paintings of the San Juan Mountains, ski culture, musicians, and dancers rendered with expressive brushwork and a keen sense of color. Folwell's studio setting — where visitors can see works in progress alongside finished paintings — provides an unusually intimate window into the creative process, and the artist's willingness to discuss commissions makes a studio visit feel genuinely collaborative. Few experiences in the Southwest art world are as direct or as satisfying as purchasing a painting directly from the artist in his working studio.</p>`
  },
  {
    id: 333,
    full_description: `<p>Scenic Aperture is a fine art photography gallery on Durango's historic Main Street devoted to the landscapes and natural wonders of the Four Corners region, featuring the internationally collected work of nature photographer Frank Comisar. Comisar's dramatic large-format prints capture canyon country, mountain wilderness, and desert light with technical mastery and an eye for the transcendent moment — images that convey the scale and silence of the Southwest landscape in ways that command attention on any wall. The gallery's Main Street location makes it easily accessible to Durango visitors, and the quality of Comisar's work makes it one of the region's most distinctive photography destinations.</p>`
  },
  {
    id: 214,
    full_description: `<p>Sorrel Sky Gallery is one of the Southwest's finest venues for contemporary Western and plein air art, representing nationally recognized painters and sculptors with a deep connection to the Four Corners landscape. The gallery's program bridges the grand tradition of Western landscape painting — the golden light of the San Juan Mountains, the dramatic mesas of the Colorado Plateau — with a contemporary sensibility that keeps the work from feeling nostalgic. Artists represented by Sorrel Sky exhibit at major Western art fairs and maintain strong collector followings across the country, and the Durango location makes it a destination stop for collectors visiting the Four Corners.</p>`
  },
  {
    id: 215,
    full_description: `<p>Toh-Atin Gallery has been a destination for authentic Native American art in Durango since 1957 — one of the longest-running galleries of its kind in the entire Southwest. The gallery holds one of the finest collections of Navajo rugs, Pueblo pottery, Hopi kachinas, and Southwest jewelry in the region, assembled over more than six decades of direct relationships with Native artists and communities. Toh-Atin's deep expertise — passed down through generations of ownership — ensures that every piece is correctly attributed and authentically made, giving collectors the confidence that the work they are acquiring represents genuine Native artistic traditions and not commercial imitation.</p>`
  },
  // Fort Collins
  {
    id: 209,
    full_description: `<p>The Colorado State University Art Museum serves as CSU's primary venue for art and ideas, with a program of rotating contemporary exhibitions and a permanent collection that emphasizes American art and works on paper. Located at the heart of the CSU campus, the museum serves both the university community and Fort Collins residents seeking engagement with art beyond the commercial gallery circuit. The collection's strength in works on paper — prints, drawings, photographs, and artists' books — reflects a curatorial commitment to the full range of artists' graphic practice, from historical etching to contemporary digital printing, making it a distinctive resource in northern Colorado.</p>`
  },
  {
    id: 208,
    full_description: `<p>The Fort Collins Museum of Art is northern Colorado's premier fine arts museum, presenting ambitious contemporary exhibitions in a beautifully renovated Old Town building that has become a civic landmark. The museum's program draws from national and international contemporary art while maintaining a strong commitment to regional artists, providing a platform for Colorado's creative community that extends well beyond Denver. Education programs serve students across northern Colorado, while community events and public programming — including the annual Holiday Sale and summer garden events — make FCMOA a year-round destination for Fort Collins residents and visitors from across the region.</p>`
  },
  {
    id: 210,
    full_description: `<p>Patina Gallery in Old Town Fort Collins brings an inviting and accessible approach to contemporary art collecting, showcasing paintings, sculpture, and jewelry by emerging and established regional artists in a warm, approachable space that welcomes visitors at every level of experience with art. The gallery's strong jewelry selection — from delicate sterling work to bold statement pieces — makes it a destination for those seeking wearable art alongside the paintings and sculpture that fill the main galleries. Patina's Old Town location, in the heart of Fort Collins' pedestrian shopping district, gives it excellent foot traffic and makes it a natural addition to any day exploring the city.</p>`
  },
  // Manitou Springs
  {
    id: 205,
    full_description: `<p>Commonwheel Artists Co-op is one of Colorado's oldest and most beloved artist cooperatives, housed in a charming historic building in the bohemian mountain resort town of Manitou Springs. Founded in 1975, the cooperative showcases paintings, ceramics, jewelry, and fiber work by more than 30 member artists who live and work in the Pikes Peak region. Every purchase directly supports a working Colorado artist, and the cooperative's juried membership ensures that all work on display meets a consistent standard of quality. Manitou Springs' unique character — quirky, creative, mineral-spring-fed — makes Commonwheel an essential stop for anyone exploring the area at the foot of Pikes Peak.</p>`
  },
  {
    id: 206,
    full_description: `<p>The Manitou Art Center is a thriving community arts hub at the heart of Manitou Springs, Colorado's most creatively distinctive mountain town. The center provides studio spaces for working artists alongside gallery exhibitions and public programs that connect artists with the community. Regular exhibitions showcase work by MAC studio artists and invited guests, while workshops, events, and open studio programs make the center an accessible entry point for anyone curious about the creative process. The MAC's role in the Manitou Springs arts community is difficult to overstate — it provides the infrastructure and collegial spirit that allow individual artists to sustain their practices in one of Colorado's most creatively fertile communities.</p>`
  },
  {
    id: 207,
    full_description: `<p>Villa Bernina Gallery occupies an intimate space in a Victorian-era building in Manitou Springs, presenting Colorado landscape paintings, watercolors, and prints alongside handcrafted jewelry by regional artists. The gallery's selection reflects the distinctive light and scenery of the Pikes Peak region — dramatic red rock formations, aspen groves, and alpine meadows that have attracted artists to this corner of Colorado for more than a century. Villa Bernina's manageable scale and welcoming atmosphere make it an ideal destination for visitors new to art collecting, offering work at accessible price points in a setting that feels more like a discovery than a commercial transaction.</p>`
  },
  // Ouray
  {
    id: 340,
    full_description: `<p>Ago Gallery is Ouray's fine art anchor on the town's historic Main Street, presenting works by Colorado artists alongside custom framing services that serve both the local community and the visitors drawn to this dramatic mountain town. The gallery's warm character suits Ouray itself — a Victorian mining town nestled in a box canyon of the San Juan Mountains, known as the Switzerland of America for its Alpine scenery. Ago's program celebrates the spectacular landscape surrounding Ouray, offering paintings, prints, and photographs that let visitors take a piece of the mountains home with them, properly framed and ready to display.</p>`
  },
  {
    id: 341,
    full_description: `<p>Ouray Glassworks & Pottery is a working studio in the heart of Ouray where skilled artisans create handblown glass and handcrafted pottery on-site, combining live demonstrations with a gallery of finished works that make distinctive keepsakes from one of Colorado's most scenic mountain towns. Watching a glassblower at work — transforming molten material into luminous vessels and sculptural forms — is one of the most compelling craft demonstrations available, and the Ouray setting, surrounded by fourteen-thousand-foot peaks, makes the experience uniquely memorable. Finished pieces range from functional tableware to purely decorative art objects, offering something for every visitor and every budget.</p>`
  },
  // Pagosa Springs
  {
    id: 345,
    full_description: `<p>The Chad Haspels Sculpture Studio offers collectors direct access to one of the Four Corners region's most distinctive sculptors, whose fine art bronzes and mixed-media works are inspired by the spirit and life of the natural world. Haspels draws on the landscapes, wildlife, and human communities of the American Southwest for imagery rendered with precision and emotional depth, producing sculpture that sits comfortably in both traditional Western collections and contemporary settings. The studio format means collectors can see work in progress alongside finished pieces, discuss commissions directly with the artist, and gain an understanding of the creative process that enriches the ownership of any acquired work.</p>`
  },
  {
    id: 342,
    full_description: `<p>The Fred Harman Art Museum preserves the home and working studio of Fred Harman — creator of the beloved Red Ryder comic strip and co-founder of the Cowboy Artists of America — in the authentic space where Harman created his most beloved work. The museum's collection includes more than 50 original paintings, comic strip originals, movie memorabilia, and Western artifacts that document both Harman's career and the broader history of Western popular culture in America. Pagosa Springs' location in Colorado's scenic southwest, near the New Mexico border and the San Juan Mountains, gives this intimate museum a setting that perfectly evokes the landscape Harman spent his life depicting.</p>`
  },
  {
    id: 344,
    full_description: `<p>Gallery Summer is operated by artist Summer Spitsbergen and devoted exclusively to her original paintings of the Four Corners region — river scenes, wildlife, Wild West subjects, and Native American imagery rendered with a rich palette and expressive brushwork that has earned her a devoted collector following throughout the Southwest. The one-artist gallery format offers visitors the rare experience of encountering a fully realized artistic vision in a dedicated space, understanding the range and development of a single painter's work in depth. Located in historic downtown Pagosa Springs, Gallery Summer is one of the Four Corners' most distinctive gallery destinations for collectors drawn to regional painting with strong roots in place and observation.</p>`
  },
  {
    id: 343,
    full_description: `<p>Lantern Dancer Gallery in Pagosa Springs specializes in contemporary Southwestern jewelry and Native American craft, offering handmade one-of-a-kind pieces by Navajo, Hopi, Zuni, and Apache artists alongside local artisan jewelry, pottery, Kachinas, paintings, and sculpture. The gallery's focus on authentic, artist-made objects — sourced through direct relationships with Native artists and communities — ensures that visitors acquire work of genuine cultural and artistic value rather than commercial imitations. Lantern Dancer's historic downtown Pagosa Springs location gives it a natural audience of visitors drawn to the Four Corners region by its remarkable concentration of Indigenous art traditions and landscape.</p>`
  },
  // Pueblo
  {
    id: 219,
    full_description: `<p>The Pueblo Arts Alliance supports and promotes the creative community of Pueblo's historic Union Avenue district through gallery exhibitions, studio tours, and cultural events that celebrate the city's rich artistic heritage. Pueblo's industrial history — it was the steel capital of the American West for much of the twentieth century — has left a legacy of working-class creativity and community solidarity that shapes its arts culture in distinctive ways. The Alliance's programming reflects this heritage, championing local artists and making art accessible to the full community rather than an elite subset. The Union Avenue location places the Alliance at the heart of Pueblo's historic commercial district, which has become a hub of creative activity in recent years.</p>`
  },
  {
    id: 218,
    full_description: `<p>The Sangre de Cristo Arts Center is southern Colorado's foremost arts institution, with four galleries, a children's museum, and a performing arts theater that make it the most comprehensive cultural facility between Colorado Springs and New Mexico. Named for the mountain range that defines the horizon south of Pueblo, the Arts Center reflects the deep cultural heritage of its region — a blend of Indigenous, Hispanic, and Anglo traditions that gives southern Colorado a distinctive identity. The center's permanent collection, which includes Southwestern Hispanic art and works by regional artists, complements an active program of traveling exhibitions and year-round community events.</p>`
  },
  // Steamboat Springs
  {
    id: 221,
    full_description: `<p>The Gallery at the White House Ranch presents Western paintings, bronze sculpture, and photography in a historic working ranch setting outside Steamboat Springs — a destination that embodies the spirit of the Colorado Rockies more fully than any urban gallery could. The ranch setting, with its working cattle operation and views of the Yampa Valley, provides a context for Western art that transforms the experience of viewing a painting into something fully immersive. Artists shown here are connected to the working landscape of the American West, and the gallery's ranch atmosphere reinforces the authenticity of the work it presents to collectors who value the real over the merely commercial.</p>`
  },
  {
    id: 220,
    full_description: `<p>The Steamboat Art Museum is a year-round museum in the heart of Steamboat Springs presenting rotating contemporary art exhibitions alongside permanent works celebrating the mountain landscapes and cowboy culture of northwest Colorado. The museum's dual commitment — to the broader world of contemporary art and to the distinctive heritage of its region — gives it a program of unusual range, presenting everything from international contemporary exhibitions to retrospectives of the painters and photographers who have documented the Yampa Valley and the surrounding wilderness. Steamboat Springs' identity as both a world-class ski destination and an authentic Western ranching community is perfectly reflected in the museum's eclectic and engaging program.</p>`
  },
  // Telluride
  {
    id: 212,
    full_description: `<p>The Ah Haa School for the Arts is a beloved community arts school in the San Juan Mountains of Telluride, offering workshops, classes, and exhibitions in a setting that attracts artists from around the world to one of Colorado's most storied cultural landscapes. Workshops taught by visiting master artists give students at every level an opportunity to work intensively in the mountains, with the extraordinary landscape of Telluride's box canyon providing both inspiration and context. The school's gallery exhibitions showcase work by instructors and students, giving the broader Telluride community a window into the creative activity unfolding in its studios year-round.</p>`
  },
  {
    id: 338,
    full_description: `<p>Rinkevich Gallery is an artist-owned contemporary fine art gallery in Telluride's Mountain Village presenting the paintings of gallery director Rinkevich alongside a distinctive collection of traditional tribal African art — an unexpected and compelling pairing that draws serious collectors to this mountain resort destination. Rinkevich's paintings engage with landscape, figure, and abstraction in a program that is personal and deeply considered, while the African art collection introduces visitors to artistic traditions rarely encountered in the Rocky Mountain region. The Mountain Village location, accessible via the free gondola connecting Telluride's historic town with its ski resort, gives the gallery a distinctive setting high above the valley floor.</p>`
  },
  {
    id: 213,
    full_description: `<p>The Telluride Arts District is the organizing body behind Telluride's vibrant arts scene, curating public art installations, coordinating gallery openings, and producing year-round cultural programming in one of the world's most scenically spectacular mountain settings. The District's work ensures that Telluride's extraordinary landscape — a box canyon ringed by fourteen-thousand-foot peaks — is matched by an equally extraordinary cultural life, with programming that draws artists and art lovers from around the world alongside the town's devoted year-round community. The District's stewardship of public art has transformed Telluride's streets and open spaces into an extended gallery that visitors encounter throughout their time in town.</p>`
  },
  {
    id: 211,
    full_description: `<p>The Telluride Gallery of Fine Art is the premier gallery in one of Colorado's most dramatically beautiful mountain settings, representing painting, sculpture, and photography by leading artists who draw inspiration from the San Juan Mountains and the broader landscape of the American West. The program spans the tradition of Western landscape painting — luminous plein air canvases, dramatic mountain photography — while also presenting artists whose work engages with contemporary ideas and approaches. The combination of serious artistic program and spectacular mountain location makes a visit to the Telluride Gallery an experience that is genuinely difficult to replicate anywhere else in the Rocky Mountain art world.</p>`
  },
  {
    id: 339,
    full_description: `<p>The Tony Newlin Gallery in Telluride is devoted to the wildlife and wilderness photography of Tony Newlin — dramatic large-format images of Colorado, the American West, and Alaska that capture the region's megafauna and landscapes with the eye of a seasoned naturalist and fine art photographer. Newlin's prints — elk in autumn meadows, bears in Alaskan salmon streams, the golden light of the San Juan Mountains at dusk — combine technical mastery with genuine feeling for the natural world, producing work that reads equally as art and as document. For visitors drawn to Telluride by its extraordinary natural setting, the Tony Newlin Gallery offers a means of taking the wilderness home.</p>`
  },
  // Vail
  {
    id: 223,
    full_description: `<p>Gallery 970 is a sophisticated contemporary gallery in Vail Village showcasing emerging and mid-career artists alongside destination-quality landscape paintings inspired by the Rocky Mountain high country. The gallery's program bridges the broad world of contemporary art with the specific visual interests of Vail's international visitor community — people drawn to the mountains by their beauty and inclined to take something of that beauty home with them. Gallery 970's Vail Village location gives it access to one of the most internationally diverse gallery audiences in the Mountain West, and the quality of the program meets that audience's elevated expectations.</p>`
  },
  {
    id: 222,
    full_description: `<p>Vail Fine Arts is a premier gallery in the heart of Vail Village representing nationally recognized contemporary artists in a program of paintings, sculpture, and photography that complements the village's alpine grandeur. The gallery's collection is curated with an eye for work that holds its own against the spectacular natural backdrop of the Vail Valley — ambitious paintings and sculpture that speak to collectors accustomed to beauty at the largest scale. Vail Fine Arts participates in the broader national art market through art fairs and collector events, ensuring that the artists it represents receive attention and recognition well beyond their Vail gallery exhibitions.</p>`
  },
];

async function run() {
  console.log(`Updating ${updates.length} Colorado listings...`);
  for (const { id, full_description } of updates) {
    await sql`UPDATE listings SET full_description = ${full_description} WHERE id = ${id}`;
    process.stdout.write('.');
  }
  console.log('\nDone.');
}

run().catch(console.error);
