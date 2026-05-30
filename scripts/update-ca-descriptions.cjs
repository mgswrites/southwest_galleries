const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.NEON_DB_KEY);

const updates = [
  // Berkeley
  {
    id: 169,
    full_description: `<p>The Berkeley Art Museum and Pacific Film Archive is one of the largest university art museums in the United States, anchoring UC Berkeley's arts district in a striking 2016 building designed by Diller Scofidio + Renfro. The permanent collection spans ancient Chinese art, the Bay Area Figurative Movement, and international contemporary work, while the Pacific Film Archive — one of the world's most important film repositories — hosts regular screenings of classic, independent, and international cinema. BAMPFA brings together visual art, film scholarship, and ambitious public programming on a single dynamic campus, making it essential for anyone serious about California art and its global connections.</p>`
  },
  // Carmel
  {
    id: 163,
    full_description: `<p>Founded in 1927, the Carmel Art Association is one of the oldest continuously operating artist cooperatives on the West Coast. Nestled in the village of Carmel-by-the-Sea, the gallery represents working artists from the Monterey Peninsula in oil and watercolor painting, sculpture, printmaking, and photography. Exhibitions rotate monthly in the historic Dolores Street building, ensuring fresh work with every visit. The cooperative tradition means every sale directly supports a working artist. With roots in the original Carmel Art Colony, this is an essential stop for collectors seeking authentic California plein air and representational painting in a setting that has inspired artists for a century.</p>`
  },
  {
    id: 164,
    full_description: `<p>Dolby Chadwick Gallery brings a San Francisco–caliber program to the village of Carmel-by-the-Sea, representing accomplished contemporary painters and sculptors from across the United States. The gallery is known for its commitment to representational and figurative work executed at the highest level — luminous oil paintings, richly layered pastels, and expressive bronze sculpture. Dolby Chadwick's Carmel location complements its flagship San Francisco space, offering Peninsula visitors access to gallery-quality contemporary art in an intimate, unhurried setting. Artists shown here regularly exhibit at major art fairs including Art Miami, The Armory Show, and EXPO Chicago.</p>`
  },
  {
    id: 162,
    full_description: `<p>The Weston Gallery in Carmel-by-the-Sea is one of the premier fine art photography galleries on the West Coast, with a particularly deep focus on the masters of the medium. Named in the tradition of the Weston family — Edward Weston made Carmel his home and studio — the gallery holds significant works by Ansel Adams, Henri Cartier-Bresson, Alfred Stieglitz, Edward Weston himself, and a strong roster of contemporary photographers. Visiting Weston Gallery is an education in the history of photography as fine art, presented in an elegant space that lets each image breathe without distraction.</p>`
  },
  // Laguna Beach
  {
    id: 165,
    full_description: `<p>The Laguna Art Museum is the oldest cultural institution in Orange County, with a mission uniquely focused on the art of California from the late nineteenth century to the present. Its permanent collection documents the full arc of California art history — from the tonalist landscapes of the Eucalyptus school through the plein air painters of the early twentieth century to the conceptual experiments of the 1970s and the diverse voices of contemporary practice. Special exhibitions frequently foreground overlooked chapters of California art history. The museum anchors Laguna Beach's vibrant gallery row, just steps from the Pacific Ocean.</p>`
  },
  {
    id: 166,
    full_description: `<p>Redfern Gallery is one of Laguna Beach's most respected fine art galleries, presenting California contemporary and plein air painting in a gracious space steps from the waterfront. The gallery champions the ongoing vitality of the California landscape tradition — warm afternoon light over the hills of Laguna Canyon, coastal fog at Dana Point, the scrub-covered slopes of the Cleveland National Forest — while also showing figurative and abstract work by artists with strong regional followings. Redfern's knowledgeable staff and approachable program make it a welcoming destination for both new collectors and those building serious California art holdings.</p>`
  },
  // Los Angeles
  {
    id: 146,
    full_description: `<p>Blum & Poe is one of Los Angeles's most internationally significant contemporary art galleries, with locations in New York and Tokyo in addition to its Culver City flagship. Founded in 1994, the gallery played a central role in establishing Los Angeles as a global art capital, introducing American audiences to major artists including Takashi Murakami. Today the roster spans generations and continents, with a strong emphasis on artists from Japan, Korea, and the broader Pacific Rim. Blum & Poe's vast Culver City space — a repurposed industrial building — provides an ideal setting for ambitious, large-scale installations and major survey exhibitions.</p>`
  },
  {
    id: 108,
    full_description: `<p>The Luckman Fine Arts Complex at California State University, Los Angeles brings professional-caliber contemporary art exhibitions to the eastside of the city, serving both the university community and the broader neighborhoods of East LA. The Luckman Gallery has a strong tradition of showcasing Chicanx and Latinx artists, reflecting the demographics and cultural heritage of its surrounding community. Programming combines emerging artists with established names, consistently emphasizing work that engages with social justice, identity, and the lived experience of Los Angeles. The complex also hosts performing arts events, making it a comprehensive cultural hub in one of the city's most culturally rich corridors.</p>`
  },
  {
    id: 107,
    full_description: `<p>Craft Contemporary — formerly the Craft and Folk Art Museum — occupies a beloved position on the Miracle Mile adjacent to LACMA, celebrating the full range of human making from traditional craft to cutting-edge contemporary art. Exhibitions consistently challenge the hierarchy between fine art and functional craft, presenting ceramics, fiber, glass, wood, and mixed-media work with the seriousness afforded painting and sculpture. Craft Contemporary also operates a gift shop stocking an exceptional selection of artist-made objects at accessible prices, making it a destination for design-minded visitors seeking something beyond the typical museum store and a champion of makers often overlooked by the mainstream art world.</p>`
  },
  {
    id: 145,
    full_description: `<p>David Kordansky Gallery has become one of the most talked-about galleries in contemporary art, with a roster blending established international names and breakthrough younger artists. Located in a repurposed auto dealership in Mid-City Los Angeles, the gallery's massive spaces accommodate ambitious painting, sculpture, and installation at a scale few galleries can match. Artists represented include Jonas Wood, Rashid Johnson, and Jennie C. Jones — a program notable for its range, from abstraction to social practice. With an additional New York location, Kordansky increasingly shapes the international art conversation from its Los Angeles base.</p>`
  },
  {
    id: 143,
    full_description: `<p>Gagosian's Beverly Hills location brings the world's most powerful commercial gallery to Los Angeles, presenting exhibitions of international blue-chip artists in a sleek space on North Camden Drive. The gallery has mounted major shows of works by Damien Hirst, Richard Serra, Jeff Koons, and Ed Ruscha, drawing serious collectors from across Southern California and beyond. Gagosian Beverly Hills functions as a West Coast anchor for the global network, organizing museum-quality exhibitions that frequently travel to the gallery's other locations in New York, London, Paris, and Hong Kong — a one-stop destination for the highest tier of contemporary collecting.</p>`
  },
  {
    id: 142,
    full_description: `<p>The Hammer Museum, affiliated with UCLA and located in Westwood, is one of the most dynamic and intellectually engaged art museums in Los Angeles. Free admission ensures genuine accessibility, and its programming — embracing performance, film, public talks, and ambitious temporary exhibitions — positions it as a civic institution as much as an art space. The Hammer's "Made in LA" biennial surveys the most compelling work produced by artists working in Los Angeles, functioning as an indispensable map of the city's creative moment every two years. Its courtyard café and bookstore make it a neighborhood destination worth visiting independent of what's on the walls.</p>`
  },
  {
    id: 144,
    full_description: `<p>Hauser & Wirth Los Angeles, in the Arts District east of downtown, is one of the most spectacular gallery spaces in the world. The two-acre campus combines renovated industrial spaces with a restaurant and garden designed by landscape architect Piet Oudolf — the same designer behind New York's High Line plantings. Exhibitions span the full Hauser & Wirth roster of blue-chip international artists, from Louise Bourgeois and Philip Guston to Rashid Johnson and Christina Quarles. The campus has anchored the Arts District's transformation into a major cultural destination, drawing visitors from around the world to a neighborhood once known primarily for warehouses.</p>`
  },
  {
    id: 106,
    full_description: `<p>LA Louver has represented some of the most significant artists in contemporary art since its founding in Venice Beach in 1975, making it one of the longest-running galleries in Los Angeles. The gallery's Venice location — a distinctive building designed by Frederick Fisher — suits a roster that combines established international figures like David Hockney and Leon Kossoff with accomplished mid-career artists. LA Louver's consistent commitment to craft, figure, and painting gives it a distinctive identity in a city prone to chasing trends, and its beachside Venice location adds a relaxed, creative character that distinguishes it from the more institutional gallery districts further east.</p>`
  },
  {
    id: 139,
    full_description: `<p>The Los Angeles County Museum of Art is the largest art museum in the western United States, with a collection spanning more than 142,000 objects and 6,000 years of history. From ancient Egyptian antiquities and pre-Columbian ceramics to modernist masterpieces and ambitious contemporary acquisitions, LACMA's encyclopedic collection reflects the extraordinary cultural diversity of Los Angeles itself. Chris Burden's "Urban Light" — 202 restored cast-iron street lamps — has become one of the most photographed public artworks in the world. The museum's ongoing transformation under director Michael Govan continues to shape the future of art in the American West.</p>`
  },
  {
    id: 148,
    full_description: `<p>Regen Projects is one of Los Angeles's most respected contemporary art galleries, with a career-defining roster that includes Cindy Sherman, Matthew Barney, Wolfgang Tillmans, and Glenn Ligon. Located in Hollywood, the gallery has shaped contemporary art collecting in Los Angeles for more than three decades. Regen Projects is known for taking on artists early and maintaining long-term commitments to their development — a model increasingly rare in an era of speculative collecting. The program spans photography, video, painting, and sculpture, with exhibitions that consistently earn critical attention well beyond Southern California.</p>`
  },
  {
    id: 140,
    full_description: `<p>The Broad is one of the most visited contemporary art museums in the United States, housing Eli and Edythe Broad's collection of more than 2,000 postwar and contemporary works in a striking downtown Los Angeles building by Diller Scofidio + Renfro. The collection is strongest in Neo-Expressionism, Pop Art, and the conceptual movements of the 1980s and 1990s, with iconic works by Jeff Koons, Cindy Sherman, Jean-Michel Basquiat, Kara Walker, and Roy Lichtenstein. A dramatic honeycomb oculus floods the galleries with natural light, and free on-demand ticketing ensures that this extraordinary collection remains accessible to the full range of the city's population.</p>`
  },
  {
    id: 138,
    full_description: `<p>Perched above the 405 Freeway in Brentwood, the Getty Center is among the most visited art museums in the world, drawing more than 1.7 million visitors annually. Richard Meier's travertine-clad complex houses one of the most distinguished art collections in the United States — Impressionist and Post-Impressionist paintings, illuminated manuscripts, European decorative arts, and antiquities — alongside spectacular gardens designed by Robert Irwin. The panoramic view of Los Angeles from the hilltop terraces is itself a reason to visit. Free admission with paid parking ensures that the Getty's treasures remain available to all of Los Angeles.</p>`
  },
  {
    id: 141,
    full_description: `<p>The Museum of Contemporary Art, Los Angeles was the first institution in the city dedicated exclusively to art created after 1940, and it remains the anchor of LA's downtown cultural district. MOCA's collection traces the full arc of postwar art from Abstract Expressionism through Minimalism, Arte Povera, and the conceptual experiments of the 1970s to the present moment. The main Grand Avenue building, designed by Arata Isozaki, is complemented by the Geffen Contemporary — a vast converted warehouse in Little Tokyo ideal for large-scale installation art. Together the two spaces constitute one of the essential contemporary art experiences in the United States.</p>`
  },
  // Palm Springs
  {
    id: 161,
    full_description: `<p>Melissa Morgan Fine Art is Palm Springs's premier gallery for California and Southwest plein air and representational painting, presenting work that reflects the dramatic desert landscapes, mountain vistas, and luminous light of the Coachella Valley. The gallery champions both historical California painters and contemporary artists working directly in the plein air tradition, offering collectors an exceptional range of work that captures the living quality of the desert environment. Located in the heart of Palm Springs's gallery district, Melissa Morgan is a gathering point for collectors who appreciate painting grounded in direct observation, technical mastery, and a deep love of the Western American landscape.</p>`
  },
  {
    id: 160,
    full_description: `<p>The Palm Springs Art Museum occupies a central place in the cultural life of the Coachella Valley, with a collection and programming that reflect the desert Southwest's unique mix of Native American traditions, mid-century modernism, and the international contemporary art world. The permanent collection is particularly strong in glass art, photography, and California modernism, with recent acquisitions expanding representation from Latin America. The museum's Architecture and Design Center, housed in a restored 1961 bank building downtown, celebrates Palm Springs's extraordinary mid-century architectural heritage. Major traveling exhibitions supplement a year-round program of lectures, films, and community events.</p>`
  },
  // San Diego
  {
    id: 159,
    full_description: `<p>David Zapf Gallery is one of San Diego's most respected venues for contemporary fine art, with a particular focus on painting and works on paper by artists with established national careers. Located in the Kettner Arts District, the gallery has represented serious painters since the 1980s, maintaining a program that prizes technical skill and sustained artistic vision over trend. Zapf's commitment to his artists is evident in the depth of work shown — major bodies of painting rather than sampling exhibitions — and in the long relationships he maintains with artists who have shown with him for decades. A reliable destination for discerning collectors throughout the San Diego region.</p>`
  },
  {
    id: 158,
    full_description: `<p>The Museum of Contemporary Art San Diego presents art made since 1950, with a permanent collection of more than 5,000 works and a dynamic program of temporary exhibitions exploring the cutting edge of contemporary practice. MCASD operates two locations — in La Jolla and in the downtown Little Italy neighborhood — with the La Jolla building dramatically situated on a bluff above the Pacific, offering views that uniquely complement the art inside. The museum's location on the U.S.–Mexico border gives its programming a distinctive perspective on Latin American art and the transnational conversations that define the borderland experience.</p>`
  },
  {
    id: 157,
    full_description: `<p>The San Diego Museum of Art, housed in a magnificent Spanish Colonial Revival building at the heart of Balboa Park, is the largest fine art museum in San Diego. The permanent collection spans more than five millennia and encompasses Old Masters paintings from Spain, Italy, and Northern Europe, South and Southeast Asian art, and a growing collection of American and European modernism. The museum's setting within Balboa Park — one of the finest urban parks in the United States — and its landmark building make a visit an experience that extends well beyond the galleries into the park's extraordinary landscape, architecture, and outdoor sculpture.</p>`
  },
  // San Francisco
  {
    id: 153,
    full_description: `<p>The Asian Art Museum of San Francisco is one of the largest museums in the United States devoted exclusively to Asian art, with a collection of more than 18,000 objects spanning six millennia and dozens of cultures across China, Japan, Korea, India, Southeast Asia, and the Himalayan world. Housed in the former Main Public Library building in Civic Center — itself a Beaux-Arts landmark — the museum's galleries allow close engagement with extraordinary objects: Tang dynasty bronzes, Indian miniature paintings, Japanese lacquerware, and rotating selections from an unparalleled collection of Chinese ceramics. Public programs bridge ancient traditions and contemporary Asian and Asian American experience.</p>`
  },
  {
    id: 154,
    full_description: `<p>Fraenkel Gallery has been the preeminent venue for fine art photography in San Francisco since 1979, representing artists who have defined the medium across four decades. The roster reads as a who's who of photography's major voices: Diane Arbus, Garry Winogrand, Nicholas Nixon, Richard Misrach, and a strong contingent of contemporary artists pushing the boundaries of lens-based work. Located in SoMa, Fraenkel's exhibitions are consistently among the most thoughtful and visually compelling in the city. It is the essential destination for photography collectors in the Bay Area and attracts serious attention from curators and institutions worldwide.</p>`
  },
  {
    id: 156,
    full_description: `<p>Gallery Wendi Norris brings a global perspective to the San Francisco contemporary art scene, with a program that emphasizes work by women artists and international artists historically underrepresented in the mainstream market. The gallery's roster includes significant artists from Latin America, Asia, and Europe alongside Bay Area voices, creating an exhibition program that consistently challenges collectors to look beyond the canonical Euro-American narrative. Located in Pacific Heights, Gallery Wendi Norris is known for its in-depth scholarship — published catalogs, artist interviews, and rigorous curatorial research accompany every major exhibition, distinguishing it from galleries that move inventory rather than build understanding.</p>`
  },
  {
    id: 152,
    full_description: `<p>The Legion of Honor is one of San Francisco's most beloved cultural institutions — a Beaux-Arts palace perched on a bluff above the Golden Gate, housing a distinguished collection of European art spanning 4,000 years. The museum's strengths include an extraordinary collection of Rodin sculptures, French decorative arts, Flemish and Dutch Old Masters, and ancient Mediterranean antiquities. The building itself, a replica of the Palais de la Légion d'Honneur in Paris, was built as a memorial to Californians who died in World War I. The view of the Bay and the Marin headlands from the forecourt is among the finest in San Francisco.</p>`
  },
  {
    id: 155,
    full_description: `<p>Ratio 3 is one of San Francisco's most critically regarded contemporary art galleries, operating from a Mission District space that belies its international reach. The gallery represents a focused roster of artists whose work engages rigorously with conceptual questions of image, material, and the conditions of contemporary life. Strong relationships with galleries in New York, Berlin, and Mexico City mean co-represented artists and exhibitions that travel internationally. For collectors tracking the leading edge of contemporary practice in the Bay Area, Ratio 3 is essential — a small gallery with an outsized influence on the conversation around what contemporary art can do and mean in the present moment.</p>`
  },
  {
    id: 150,
    full_description: `<p>The San Francisco Museum of Modern Art is the largest modern art museum in the United States, following a major 2016 expansion that nearly tripled its exhibition space to 170,000 square feet. The permanent collection spans more than 35,000 works, with particular strengths in photography — one of the finest museum photography collections in the world — Abstract Expressionism, Bay Area Figuration, and contemporary work across all media. The Snøhetta-designed expansion introduced a dramatic nine-story atrium flooded with natural light, housing Olafur Eliasson's immersive waterfall installation. A visit to SFMOMA is essential for understanding the full arc of twentieth and twenty-first century art.</p>`
  },
  {
    id: 151,
    full_description: `<p>The de Young Museum in Golden Gate Park is San Francisco's premier fine arts museum, with a collection spanning American art from the seventeenth century to the present, textile arts from around the world, and art from Africa, Oceania, and the Americas. Herzog & de Meuron's striking copper-clad building, opened in 2005, has aged to a warm patina that blends naturally with the park's redwood groves. The museum tower observation deck offers a panoramic view of Golden Gate Park and the city skyline, included with admission. The de Young is also San Francisco's primary venue for major traveling blockbuster exhibitions that draw visitors from across Northern California.</p>`
  },
  // Santa Barbara
  {
    id: 167,
    full_description: `<p>The Santa Barbara Museum of Art is the largest art museum on the Central Coast, with a collection of approximately 27,000 works spanning ancient Mediterranean art through contemporary California artists. The permanent collection is particularly distinguished in twentieth-century American painting — with works by Georgia O'Keeffe, Edward Hopper, and the California modernists — and in Asian art, including a superb collection of Japanese screens. The museum's downtown location on State Street places it at the heart of Santa Barbara's civic and cultural life, and its programming consistently punches above its size with ambitious traveling exhibitions and a lively schedule of lectures and performances.</p>`
  },
  {
    id: 168,
    full_description: `<p>Sullivan Goss — An American Gallery is the premier venue in Santa Barbara for American fine art, with a focus on historical and contemporary work rooted in the rich tradition of California and American painting. The program bridges museum-quality historical works — California impressionism, early twentieth-century landscape, mid-century abstraction — with accomplished living painters who engage seriously with that legacy. Located in downtown Santa Barbara's historic Fithian Building, Sullivan Goss serves both seasoned collectors and those new to acquiring art, with knowledgeable staff who can provide context and guidance across the gallery's diverse inventory of American paintings, works on paper, and sculpture.</p>`
  },
];

async function run() {
  console.log(`Updating ${updates.length} California listings...`);
  for (const { id, full_description } of updates) {
    await sql`UPDATE listings SET full_description = ${full_description} WHERE id = ${id}`;
    process.stdout.write('.');
  }
  console.log('\nDone.');
}

run().catch(console.error);
