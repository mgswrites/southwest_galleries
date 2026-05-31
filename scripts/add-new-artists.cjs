const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.NEON_DB_KEY);

// city_id references: 6=Santa Fe, 7=Taos, 8=Albuquerque, 9=Denver, 3=Tucson, 15=Los Angeles, 52=Austin
const artists = [
  {
    name: 'Rose Simpson',
    slug: 'rose-simpson',
    state_code: 'NM',
    city_id: 6,
    website_url: 'https://rosesimpson.com',
    bio: `Rose Simpson (born 1983) is a Santa Clara Pueblo artist, sculptor, musician, and performer whose work challenges every assumption about what Pueblo art is supposed to look like and do. Born into one of Santa Clara Pueblo's most celebrated artistic families — she is the daughter of the ceramicist Roxanne Swentzell — Simpson grew up surrounded by clay and by the deep Pueblo ceramic tradition, but she has built a practice that extends far beyond any single medium or inherited expectation.

Her ceramic sculpture combines the technical mastery of the Pueblo tradition with a conceptual ambition and physical scale that push the form into new territory. Her figures are often imposing and armor-clad, carrying weapons or regalia that suggest both ancient ceremony and contemporary defiance. They are not passive or decorative; they are confrontational, self-possessed, and powerful — images of Indigenous womanhood on its own terms, not filtered through anyone else's expectations or desires.

Simpson is also a musician and performer, incorporating sound, music, and live performance into her broader artistic practice in ways that reflect her interest in the connections between visual art, ceremony, and communal experience. She builds custom motorcycles and has incorporated them into her performance work, creating a body of practice that is genuinely interdisciplinary and impossible to categorize simply.

Her work has been shown at the Heard Museum, the Museum of Arts and Design in New York, the Denver Art Museum, and internationally. She was included in the Venice Biennale and has received fellowships and awards from major arts organizations including the Smithsonian Institution. She is widely regarded as one of the most important young Indigenous artists working anywhere in the world today, and her influence on a new generation of Pueblo artists is already substantial.`,
  },
  {
    name: 'Emmi Whitehorse',
    slug: 'emmi-whitehorse',
    state_code: 'NM',
    city_id: 6,
    website_url: null,
    bio: `Emmi Whitehorse (born 1957) is a Diné (Navajo) abstract painter based in Santa Fe whose mixed-media works on paper and canvas have earned her a devoted collector following and a significant place in the history of contemporary Indigenous abstraction. Her paintings are layered, atmospheric, and deeply personal — fields of pigment and mark that evoke the landscape and spiritual world of the Navajo homeland without ever resolving into illustration or representation.

Born in Sheep Springs, New Mexico, on the Navajo Nation, Whitehorse received her MFA from the University of New Mexico. Her early exposure to Navajo weaving, sand painting, and the geometric visual logic of Diné ceremony gave her a foundation in abstraction that is culturally specific and formally sophisticated. Her mature paintings translate this inheritance into a personal pictorial language: layered washes of color, delicate marks and erasures, surfaces that accumulate history and texture over weeks of sustained work.

The work is intimate in scale but vast in feeling. Looking at a Whitehorse painting is like looking at a landscape from a great height, or reading a language that you can feel the meaning of without being able to translate it exactly. The paintings resist easy consumption; they require time and sustained attention, and they reward it with a kind of visual and emotional depth that is rare in contemporary painting.

Whitehorse has exhibited nationally and internationally, with work in the collections of the Smithsonian Institution's National Museum of the American Indian, the Heard Museum, the Denver Art Museum, and major private collections throughout the country. She is represented by leading Santa Fe galleries and is considered one of the most significant Diné artists of her generation.`,
  },
  {
    name: 'Shonto Begay',
    slug: 'shonto-begay',
    state_code: 'AZ',
    city_id: null,
    website_url: null,
    bio: `Shonto Begay (born 1954) is a Diné (Navajo) painter, author, and storyteller born in Shonto, Arizona, on the Navajo Nation, whose work celebrates Navajo life and landscape with a luminosity and emotional warmth that have made him one of the most beloved Indigenous artists in the American Southwest. His paintings — vivid, richly colored, often depicting figures in ceremony or daily life against the extraordinary landscape of the Navajo homeland — carry the affection of deep cultural knowledge and the skill of an artist who has spent decades perfecting his craft.

Begay grew up as one of sixteen children in a traditional Navajo family, speaking only Diné until he was sent to federal boarding schools — an experience that shaped his understanding of what cultural knowledge is worth preserving and how art can function as an act of cultural continuity. He attended the Institute of American Indian Arts in Santa Fe and later the California College of Arts and Crafts in Oakland, building a formal technical foundation for a practice that remained deeply rooted in his Navajo heritage.

Alongside his painting, Begay has written and illustrated numerous children's books that bring Diné culture, language, and values to young readers — a body of work that has earned him recognition as both a fine artist and a cultural educator. His books have won awards from the American Library Association and other organizations, reaching audiences far beyond the Southwest gallery world.

His paintings are exhibited in leading galleries in Scottsdale and Santa Fe and held in major public and private collections throughout the country. He continues to work from his studio in the Southwest, his dual practice as visual artist and storyteller reflecting a consistent belief that art and cultural memory are inseparable.`,
  },
  {
    name: 'Ted DeGrazia',
    slug: 'ted-degrazia',
    state_code: 'AZ',
    city_id: 3,
    website_url: 'https://degrazia.org',
    bio: `Ettore "Ted" DeGrazia (1909–1982) is the most beloved and widely collected artist in the history of Arizona, a Tucson original whose paintings of Indigenous children, desert landscapes, and Southwestern religious scenes achieved a popular reach that few fine artists ever approach. Born in Morenci, Arizona, to Italian immigrant parents, he spent virtually his entire life in the state he considered home, and his work is inseparable from his deep love of its landscape, its people, and its spiritual character.

DeGrazia studied at the University of Arizona and later in Mexico City, where he formed a friendship with Diego Rivera and José Clemente Orozco that confirmed his interest in a vibrant, accessible figuration rooted in the culture of ordinary people. His most iconic images — round-faced Diné (Navajo) and Tohono O'odham children rendered in warm, luminous color — have been reproduced on greeting cards, Christmas ornaments, and collector plates, making him one of the most widely distributed American artists of the twentieth century. Critics who dismissed this popularity as sentimentality missed the genuine warmth and technical accomplishment in his best work.

In 1952, DeGrazia built his own museum, Gallery in the Sun, in the foothills northeast of Tucson — a complex of adobe structures containing his studio, living space, and gallery that he constructed largely by himself and donated to the University of Arizona Foundation before his death. In 1976, in a dramatic protest against estate taxes on art, he burned a series of his own paintings in the Arizona desert, an act that generated national headlines and contributed to changes in federal tax law affecting artists.

Gallery in the Sun remains one of the most visited art destinations in Tucson, drawing collectors and admirers of DeGrazia's work from around the world. His paintings are among the most sought-after in the market for twentieth-century Arizona art.`,
  },
  {
    name: 'Vance Kirkland',
    slug: 'vance-kirkland',
    state_code: 'CO',
    city_id: 9,
    website_url: 'https://kirklandmuseum.org',
    bio: `Vance Kirkland (1904–1981) was the most significant Colorado-born abstract painter of the twentieth century, a Denver original whose decades of artistic development produced one of the most distinctive bodies of work in American art — though his international reputation lagged far behind his artistic achievement during his lifetime. Today, with his studio preserved as the Kirkland Museum of Fine & Decorative Art in Denver, his legacy is finally receiving the full attention it deserves.

Kirkland came to abstraction through a rigorous classical training. He founded the Denver School of Art in 1929 and directed it for decades, making him the central figure in Colorado art education for an entire generation. His early work was representational — skilled watercolors of the Colorado landscape — but in the 1960s he underwent a radical transformation, developing a working method as eccentric as it was effective: lying on his back above his horizontal canvas on a custom-built platform, he would drop and drag paint across the surface using hypodermic syringes, ropes, and other unconventional tools, producing large-scale canvases of swirling, cosmic abstraction that feel genuinely like images of the universe at scales beyond human perception.

The resulting paintings — his "dot" series and his later cosmic abstractions — are among the most original works produced in the American West. They draw comparisons to the work of Clyfford Still, Mark Rothko, and other Abstract Expressionists, but they are distinctly Kirkland's own, rooted in his Colorado sensibility and his idiosyncratic working method.

The Kirkland Museum of Fine & Decorative Art in Denver preserves his studio and holds the largest collection of his work anywhere, alongside an extraordinary collection of mid-century decorative arts. It is one of the most rewarding museum experiences in the Mountain West.`,
  },
  {
    name: 'Tom Lea',
    slug: 'tom-lea',
    state_code: 'TX',
    city_id: null,
    website_url: null,
    bio: `Tom Lea (1907–2001) was an El Paso painter, muralist, illustrator, and novelist whose long career placed him at the intersection of Texas art, American literature, and twentieth-century history. Born in El Paso and educated partly in Chicago and abroad, he returned to his border city and made it the base of a creative life of extraordinary breadth and ambition, producing work that documented the human experience of the American Southwest and the Second World War with equal skill and moral seriousness.

His murals — produced for the U.S. Treasury Department's Section of Fine Arts during the New Deal era — can be found in post offices and federal buildings across the Southwest and beyond, making him one of the most visible public artists of his generation. His border landscapes, portraits of El Paso life, and studies of the cattle trade captured the distinct character of the Trans-Pecos region with a naturalism and affection that still feel fresh.

During World War II, Lea served as a war correspondent for LIFE magazine, producing paintings of combat in the Pacific theater that are considered among the most honest and harrowing visual documents of the war. His painting "The Price" — depicting a Marine in shock at the battle of Peleliu — is one of the most famous American war images of the twentieth century. His novel "The Brave Bulls" (1949) became a bestseller and was adapted into a film.

Lea spent the last decades of his long life in El Paso, painting the landscape he loved and receiving the many honors that accumulated around his extraordinary body of work. The Tom Lea Institute in El Paso preserves his legacy and archives, and his murals in the federal building there remain among the finest examples of New Deal public art in Texas.`,
  },
  {
    name: 'Carlos Almaraz',
    slug: 'carlos-almaraz',
    state_code: 'CA',
    city_id: 15,
    website_url: null,
    bio: `Carlos Almaraz (1941–1989) was a Chicano painter from East Los Angeles whose explosive, expressionistic canvases made him one of the most important artists of the Chicano art movement and a significant figure in American painting more broadly. Born in Mexico City and raised in Chicago and Los Angeles, Almaraz came of age in the political and cultural ferment of 1960s East LA, where the Chicano civil rights movement was creating the conditions for a new visual culture rooted in Mexican muralism, pre-Columbian imagery, and the lived experience of the barrio.

He was a co-founder of Los Four — along with Frank Romero, Roberto de la Rocha, and Gilbert "Magu" Luján — the collective whose 1974 exhibition at the Los Angeles County Museum of Art marked one of the first major museum shows devoted to Chicano art. The exhibition and the artists behind it shifted the conversation about who belonged in American art institutions and whose visual culture counted as art worth institutionalizing.

Almaraz's paintings are immediate, sensual, and often psychologically intense — crowded freeways at night, crashing cars, passionate figures in lurid color, the burning landscape of the Los Angeles basin. He drew equally on the Mexican muralist tradition, the gestural energy of Abstract Expressionism, and the raw visual life of the city around him. His palette was saturated and his touch was urgent, producing work that feels perpetually on the edge of explosion or ecstasy.

He died of AIDS-related complications in 1989 at 48, his career cut short at a moment of increasing recognition. His work is held in the Los Angeles County Museum of Art, the Smithsonian American Art Museum, the Cheech Marin collection, and major private collections focused on Chicano and Latino art. He is considered one of the essential figures of California and Chicano art.`,
  },
  {
    name: 'Peter Hurd',
    slug: 'peter-hurd',
    state_code: 'NM',
    city_id: null,
    website_url: null,
    bio: `Peter Hurd (1904–1984) was a New Mexico painter and illustrator whose luminous egg tempera paintings of the Hondo Valley and the Ruidoso country of southeastern New Mexico have defined the visual identity of that landscape for generations of admirers. Born in Roswell, New Mexico, he studied at West Point before following his artistic ambitions to the Pennsylvania Academy and then to the studio of N.C. Wyeth in Chadds Ford, Pennsylvania — where he met and married the painter Henriette Wyeth, daughter of N.C. and sister of Andrew Wyeth.

The Wyeth connection shaped Hurd's technique and his understanding of egg tempera — the medium that the elder Wyeth championed and that Hurd would make entirely his own in the New Mexico landscape. His paintings of the rolling grasslands of Lincoln County, the adobe villages of the Hondo Valley, and the daily life of the ranchers and farm workers who populated the region have a clarity and luminosity that is specific to tempera, and a sense of place that could only have come from decades of devoted looking at a particular landscape.

He was commissioned by Life magazine to paint President Lyndon Johnson's official portrait — a commission that ended awkwardly when Johnson famously called the portrait "the ugliest thing I ever saw," generating national headlines and considerable amusement. The incident did nothing to diminish Hurd's reputation in New Mexico, where he remained a beloved figure until his death.

His paintings are held in the Smithsonian American Art Museum, the Museum of Fine Arts New Mexico in Santa Fe, the Roswell Museum and Art Center, and major private collections throughout the Southwest. His home and studio in San Patricio, New Mexico, operated for years as a working studio and remains an important site in New Mexico art history.`,
  },
  {
    name: 'Earl Biss',
    slug: 'earl-biss',
    state_code: 'NM',
    city_id: 7,
    website_url: null,
    bio: `Earl Biss (1947–1998) was a Crow artist born in Renton, Washington, who spent much of his career in Taos, New Mexico, and became one of the most celebrated Indigenous painters of the American West. His large-scale canvases — dense with color, movement, and Crow ceremonial imagery — occupied a space between abstraction and cultural representation that was entirely his own, drawing on both the gestural energy of postwar American painting and the deep visual tradition of his Crow heritage.

Biss attended the Institute of American Indian Arts in Santa Fe, where he was part of the generation of Indigenous artists who studied under Allan Houser and Fritz Scholder and absorbed the lesson that Native artists had the right — and the obligation — to engage the full range of contemporary painting on their own terms. His early work showed the influence of this training, but he quickly developed an approach that was unmistakably personal: thick, impastoed pigment, swirling forms that suggest horses and warriors and ceremony, a palette of bold primaries and rich earth tones that gave his work an almost visceral physical presence.

The paintings celebrate Crow culture without romanticizing or freezing it — they feel alive, in motion, filled with the energy of ceremony and the vitality of a living cultural tradition. Biss was deeply connected to the Crow Nation throughout his life, and his work reflects that connection with both pride and intimacy.

He exhibited regularly in Taos, Santa Fe, and Scottsdale galleries and achieved significant prices at Western art auctions during his lifetime. His work is held in the collections of the Smithsonian Institution, the Heard Museum, and major private collections focused on Indigenous and Western American art. He is remembered as one of the most distinctive painterly voices in the history of Crow art.`,
  },
  {
    name: 'Judy Chicago',
    slug: 'judy-chicago',
    state_code: 'NM',
    city_id: null,
    website_url: 'https://judychicago.com',
    bio: `Judy Chicago (born 1939 in Chicago, Illinois) is one of the most influential feminist artists of the twentieth century, and has lived and worked in Belen, New Mexico, since 1996 — making the Land of Enchantment the home base for one of the most significant ongoing practices in American contemporary art. Her connection to the Southwest is both geographic and spiritual: she has spoken often about the way the New Mexico landscape, its scale and its light, has shaped her understanding of what art can do and what it is for.

Chicago is best known for "The Dinner Party" (1974–1979), a monumental triangular installation featuring thirty-nine place settings for important women from history and mythology, with an additional 999 names inscribed on the heritage floor. Created with the help of hundreds of volunteers over five years, "The Dinner Party" was one of the first major works of feminist art to enter the permanent collection of a major museum — it is now housed at the Brooklyn Museum of Art, where it has been on permanent display since 2007. The work is considered a landmark of both feminist art and collaborative practice.

Her New Mexico practice has continued to be prolific and wide-ranging, encompassing painting, sculpture, needlework, and large-scale installation. She has completed major public commissions and continued to make work that addresses gender, power, history, and the possibilities of collective creative action. Her recent retrospectives at major museums have brought new attention to the full scope of her career.

Chicago is also a committed educator and has taught at institutions across the country, establishing the Feminist Art Program at CalArts in 1970 — the first program of its kind in the United States. Her writing, including "Through the Flower: My Struggle as a Woman Artist," remains essential reading for anyone interested in the history of feminist art and the conditions under which women artists have worked.`,
  },
];

async function run() {
  console.log(`Adding ${artists.length} new artists...`);
  for (const a of artists) {
    try {
      const existing = await sql`SELECT id FROM artists WHERE slug = ${a.slug}`;
      if (existing.length > 0) {
        console.log(`  ~ ${a.name} (already exists, skipping)`);
        continue;
      }
      await sql`
        INSERT INTO artists (name, slug, state_code, city_id, website_url, bio)
        VALUES (${a.name}, ${a.slug}, ${a.state_code}, ${a.city_id}, ${a.website_url}, ${a.bio})
      `;
      console.log(`  ✓ ${a.name}`);
    } catch (e) {
      console.log(`  ✗ ${a.name}: ${e.message}`);
    }
  }
  console.log('Done.');
  process.exit(0);
}

run().catch(e => { console.error(e.message); process.exit(1); });
