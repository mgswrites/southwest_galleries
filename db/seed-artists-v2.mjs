import { neon } from '@neondatabase/serverless';

const NEON_DB_KEY = process.env.NEON_DB_KEY;
if (!NEON_DB_KEY) { console.error('NEON_DB_KEY not set'); process.exit(1); }
const sql = neon(NEON_DB_KEY);

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// City IDs (verified)
// NM: Santa Fe=6, Taos=7, Albuquerque=8, Española=48
// AZ: Scottsdale=1, Tucson=3, Phoenix=4
// CO: Boulder=11, Denver=9
// TX: Austin=52, El Paso=54

const artists = [

  // ── NATIVE AMERICAN / INDIGENOUS ─────────────────────────────────────────

  {
    name: 'Pablita Velarde',
    slug: 'pablita-velarde',
    state_code: 'NM',
    city_id: 6, // Santa Fe
    bio: `Pablita Velarde (1918–2006) was born at Santa Clara Pueblo and educated at the Santa Fe Indian School, where she studied under Dorothy Dunn. She became one of the first Native American women to achieve national recognition as a fine arts painter, and the first woman of the Santa Clara Pueblo to earn a living as a professional artist. Working in egg tempera and casein, Velarde spent decades researching and documenting Pueblo ceremonies, cosmology, and daily life, producing paintings of both anthropological precision and genuine artistic beauty. She ground her own mineral pigments and mixed her own paints, a practice she connected explicitly to Pueblo tradition. Her daughter Helen Hardin became a celebrated artist in her own right, and R.C. Gorman's early development was shaped by his time at the Indian School under her influence. Velarde received the New Mexico Governor's Award for Excellence in the Arts and the Lifetime Achievement Award from the Heard Museum.`,
    meta_title: 'Pablita Velarde — Santa Clara Pueblo Painter | Southwest Galleries',
    meta_description: 'Pablita Velarde was among the first Native American women to achieve national recognition as a painter, documenting Pueblo life in egg tempera from her Santa Fe studio.',
  },
  {
    name: 'Helen Hardin',
    slug: 'helen-hardin',
    state_code: 'NM',
    city_id: 8, // Albuquerque
    bio: `Helen Hardin (1943–1984), born Tsa-sah-wee-eh ("Little Standing Spruce") at Albuquerque, was the daughter of the celebrated Santa Clara Pueblo painter Pablita Velarde. Rather than continuing in her mother's representational tradition, Hardin developed a radically geometric abstract style — working with compass, T-square, and ruling pen alongside acrylic paints to produce crystalline compositions that fuse Pueblo ceremonial imagery with the precision of technical draftsmanship. Her paintings depict kachina figures, ceremonial masks, and Pueblo cosmological symbols organized into mandala-like arrangements of extraordinary optical complexity. She died of cancer at 41, her brief career leaving a body of work that significantly influenced subsequent generations of Native American painters. Her paintings are among the most recognized and collected in Southwest Native art, held in the Smithsonian, the Heard Museum, and major private collections.`,
    meta_title: 'Helen Hardin — Santa Clara Pueblo Abstract Painter | Southwest Galleries',
    meta_description: 'Helen Hardin fused Pueblo ceremonial imagery with geometric abstraction in paintings of crystalline precision. Her work is held in the Smithsonian and the Heard Museum.',
  },
  {
    name: 'T.C. Cannon',
    slug: 'tc-cannon',
    state_code: 'NM',
    city_id: 6, // Santa Fe
    bio: `T.C. Cannon (1946–1978), born Tommy Wayne Cannon in Lawton, Oklahoma, of Caddo/Kiowa heritage, became one of the defining figures of the Native American art renaissance of the 1970s during a career cut tragically short. He attended the Institute of American Indian Arts in Santa Fe, where he studied under Fritz Scholder, and later trained at the San Francisco Art Institute. Like Scholder, Cannon subverted romantic stereotypes of Native Americans with confrontational paintings of astonishing originality: a Crow chief poses in front of Van Gogh prints; a warrior wears platform shoes; a collector reads in an armchair surrounded by Plains-culture objects. His large, flat canvases draw equally on Pop Art, expressionism, and Plains Indian pictorial traditions. In fewer than fifteen years of production he left behind a body of work that challenged and expanded what Native American art could be. He died in a car accident in Santa Fe at 31. His work is held in the Smithsonian, the Heard Museum, and major institutions across the country.`,
    meta_title: 'T.C. Cannon — Native American Pop Art Pioneer | Southwest Galleries',
    meta_description: 'T.C. Cannon subverted stereotypes of Native Americans in bold Pop-influenced paintings from his Santa Fe years. He died at 31, leaving an outsized legacy.',
  },
  {
    name: 'Dan Namingha',
    slug: 'dan-namingha',
    state_code: 'NM',
    city_id: 6, // Santa Fe
    website_url: 'https://namingha.com',
    bio: `Dan Namingha (born 1950) is a Hopi-Tewa painter and sculptor born in Polacca, at Tewa Village on First Mesa in the Hopi reservation. He attended the Institute of American Indian Arts in Santa Fe before earning a fine arts degree from the American Academy of Art in Chicago, and later studied at the University of Kansas. Namingha's paintings and bronzes translate the abstract geometric patterns of ancient Hopi pottery and the iconography of kachina figures into a personal, contemporary visual language — one that moves between pure abstraction and encoded cultural symbol. His large-scale canvases are built from layers of pigment and mark-making that recall both Hopi pottery design and Abstract Expressionism without being reducible to either. His work is held in the collections of the Smithsonian Institution's National Museum of the American Indian, the Heard Museum, and major museums internationally. His sons Michael and Arlo Namingha are also accomplished artists with international exhibition careers.`,
    meta_title: 'Dan Namingha — Hopi-Tewa Painter & Sculptor | Southwest Galleries',
    meta_description: 'Dan Namingha translates Hopi pottery geometry and kachina imagery into contemporary abstraction. His work is held in the Smithsonian and shown in Santa Fe galleries.',
  },
  {
    name: 'Tony Abeyta',
    slug: 'tony-abeyta',
    state_code: 'NM',
    city_id: 6, // Santa Fe
    bio: `Tony Abeyta (born 1965 in Gallup, New Mexico) is a Diné (Navajo) painter whose large-scale works have established him as one of the most significant contemporary Native American artists working today. He studied at the Rhode Island School of Design and later in Rome on a scholarship, returning to the Southwest where he built a studio practice in Santa Fe. Abeyta's paintings are luminous, layered, and emotionally expansive — combining abstract expressionist gesture with the visual languages of Navajo sand painting, textile geometry, and the vast space of the Diné homeland. His canvases often feel like landscapes seen from altitude, their surfaces built up through accumulation of pigment and mark. He has exhibited internationally and is represented by leading Santa Fe galleries. His work is in the collections of the Smithsonian Institution, the Heard Museum, and major private collections worldwide.`,
    meta_title: 'Tony Abeyta — Navajo Contemporary Painter | Southwest Galleries',
    meta_description: 'Tony Abeyta combines abstract expressionism with Navajo visual traditions in luminous large-scale paintings shown in Santa Fe and collected internationally.',
  },
  {
    name: 'Roxanne Swentzell',
    slug: 'roxanne-swentzell',
    state_code: 'NM',
    city_id: 6, // Santa Fe (Santa Clara Pueblo nearby)
    bio: `Roxanne Swentzell (born 1962) is a Santa Clara Pueblo ceramic sculptor whose clay figures are among the most psychologically complex works produced in the Pueblo ceramic tradition. Where much Pueblo pottery emphasizes decorative geometric precision, Swentzell's figures wrestle with humor, grief, joy, and confusion — creating a cast of characters that feel genuinely alive. Her work moves beyond craft tradition to interrogate what it means to be Pueblo and human simultaneously: children playing, elders resting, figures caught in moments of vulnerability and delight. She co-founded the Flowering Tree Permaculture Institute at Santa Clara Pueblo, connecting her art practice to Indigenous agriculture, seed saving, and food sovereignty. Her work is held in the collections of the Smithsonian Institution's National Museum of the American Indian, the Heard Museum, and other major institutions. She is a daughter of Rina Swentzell, a prominent scholar of Pueblo architecture.`,
    meta_title: 'Roxanne Swentzell — Santa Clara Pueblo Ceramic Sculptor | Southwest Galleries',
    meta_description: 'Roxanne Swentzell creates psychologically complex clay figures that explore Pueblo life with humor and depth. Her work is held in the Smithsonian NMAI.',
  },
  {
    name: 'Nora Naranjo-Morse',
    slug: 'nora-naranjo-morse',
    state_code: 'NM',
    city_id: 6, // Santa Fe
    bio: `Nora Naranjo-Morse (born 1953) is a Santa Clara Pueblo poet, ceramicist, and filmmaker whose work spans the domestic and the cosmic, the everyday and the ceremonial. Her clay figures — particularly the recurring character Pearlene, a contemporary Pueblo woman navigating modern life with wit and resilience — and her poetry explore the pleasures and pressures of Indigenous identity in the late twentieth and early twenty-first centuries. Her 1992 poetry collection "Mud Woman: Poems from the Clay" is considered a landmark of Native American literature, weaving together verses and photographic documentation of her ceramic figures. She was commissioned to create "Always Becoming," a monumental outdoor installation of clay and stone at the National Museum of the American Indian on the National Mall in Washington, D.C. She has also directed documentary films about Pueblo life and culture.`,
    meta_title: 'Nora Naranjo-Morse — Santa Clara Pueblo Artist & Poet | Southwest Galleries',
    meta_description: 'Nora Naranjo-Morse is a Santa Clara Pueblo ceramicist and poet whose "Mud Woman" is a landmark of Native American literature. Her sculptures are at the National Mall.',
  },
  {
    name: 'Virgil Ortiz',
    slug: 'virgil-ortiz',
    state_code: 'NM',
    city_id: 8, // Albuquerque (Cochiti Pueblo area)
    website_url: 'https://virgilortiz.com',
    bio: `Virgil Ortiz (born 1969) is a Cochiti Pueblo ceramicist, fashion designer, and performance artist whose work fuses the distinctive black-and-white pottery tradition of Cochiti Pueblo with futurist mythology and personal narrative. His ongoing multimedia project "Revolt 1680/2180" imagines a science fiction sequel to the Pueblo Revolt of 1680 — in which Pueblo warriors travel to the year 2180 to face new threats to their sovereignty — realized across ceramics, textile, performance, and video. His figurative vessels, decorated with warriors, space travelers, and supernatural beings in bold Cochiti geometric motifs, have earned him international recognition in both the fine arts world and the fashion industry. Ortiz has shown at the Victoria and Albert Museum in London, collaborated with international fashion houses, and been the subject of a feature-length documentary. His work is held in the collections of the Smithsonian Institution and major private collections worldwide.`,
    meta_title: 'Virgil Ortiz — Cochiti Pueblo Ceramicist & Artist | Southwest Galleries',
    meta_description: 'Virgil Ortiz fuses Cochiti Pueblo pottery tradition with futurist mythology in ceramics, fashion, and performance. His "Revolt 1680/2180" project has earned global recognition.',
  },
  {
    name: 'Jaune Quick-to-See Smith',
    slug: 'jaune-quick-to-see-smith',
    state_code: 'NM',
    city_id: 8, // Albuquerque
    bio: `Jaune Quick-to-See Smith (born 1940) is a Salish-Kootenai artist from the Flathead Reservation in Montana who became one of the founding figures of the contemporary Native American art movement and a major force in American art more broadly. She has had deep ties to New Mexico throughout her career, exhibiting in Albuquerque and Santa Fe and maintaining close relationships with the artists and institutions of the Southwest. Her mixed-media paintings combine gestural abstraction, stenciled text, found imagery, and political commentary to address land rights, Native sovereignty, environmental destruction, and the ongoing legacies of colonialism — often with dark wit. She has also served as a crucial curator and organizer, founding the Coup Marks artist group and working for decades to bring Native American artists to national attention. Her work is held in the collections of the Smithsonian, the Museum of Modern Art, the Metropolitan Museum of Art, and dozens of other major institutions.`,
    meta_title: 'Jaune Quick-to-See Smith — Native American Abstract Painter | Southwest Galleries',
    meta_description: 'Jaune Quick-to-See Smith is a founding figure of the contemporary Native American art movement. Her mixed-media paintings are in MoMA, the Met, and the Smithsonian.',
  },
  {
    name: 'Cannupa Hanska Luger',
    slug: 'cannupa-hanska-luger',
    state_code: 'NM',
    city_id: 48, // Española (northern NM)
    website_url: 'https://cannupahanskaluger.com',
    bio: `Cannupa Hanska Luger (born 1979) is a Mandan/Hidatsa/Arikara/Lakota artist born at Standing Rock and now based in the Alcalde valley of northern New Mexico. Working across ceramics, video, performance, and large-scale installation, Luger makes art that functions simultaneously as aesthetic object and political act. His 2016 "Mirror Shield Project" — in which he organized the collective production of reflective shields for water protectors at Standing Rock, allowing them to return the gaze of riot police and media — brought him international recognition as both an artist and a community organizer. His ceramic work extends the vessel tradition into futurist and political territory, and his large-scale installations address themes of Indigenous futurism, environmental justice, and the creative possibilities of collective action. He has received fellowships from United States Artists and the Sundance Institute, and his work has been shown at major museums and international biennials.`,
    meta_title: 'Cannupa Hanska Luger — Mandan/Hidatsa/Arikara/Lakota Artist | Southwest Galleries',
    meta_description: 'Based in northern New Mexico, Cannupa Hanska Luger makes ceramics, installations, and community-engaged art addressing Indigenous futurism and environmental justice.',
  },
  {
    name: 'Cara Romero',
    slug: 'cara-romero',
    state_code: 'NM',
    city_id: 6, // Santa Fe
    website_url: 'https://cararomero.com',
    bio: `Cara Romero (born 1977) is a Chemehuevi photographer based in Santa Fe whose work reclaims and reimagines Indigenous identity through large-format, conceptually rigorous images. Her photographs stage Native subjects in environments that challenge received assumptions — figures in traditional dress in contemporary landscapes, Indigenous ceremony meeting desert light, historical imagery reanimated in present-day contexts. Her series "Chemehuevi Portraits," "Jackrabbit and Pronghorn," and others document and celebrate Chemehuevi culture while resisting ethnographic reduction. She is among the most significant Indigenous photographers working today, with work in the collections of the National Museum of the American Indian, the Smithsonian American Art Museum, the Denver Art Museum, and other major institutions. Her work was featured in the 2022 documentary "Gather" about Indigenous food sovereignty.`,
    meta_title: 'Cara Romero — Chemehuevi Photographer | Southwest Galleries',
    meta_description: 'Cara Romero photographs Indigenous life and identity with conceptual force from her Santa Fe base. Her work is in the Smithsonian and Denver Art Museum.',
  },
  {
    name: 'Ramona Sakiestewa',
    slug: 'ramona-sakiestewa',
    state_code: 'NM',
    city_id: 6, // Santa Fe
    website_url: 'https://ramonasakiestewa.com',
    bio: `Ramona Sakiestewa (born 1949) is a Hopi tapestry artist and designer based in Santa Fe who has spent fifty years translating ancient Pueblo textile traditions into contemporary art objects of refined beauty. Her woven tapestries draw on Hopi textile patterns, kachina imagery, and the geometric logic of Pueblo ceremonial design, producing works that are simultaneously deeply rooted in tradition and unmistakably contemporary. Her tapestries are held in the collections of the Smithsonian Institution, the Denver Art Museum, the Museum of Fine Arts Boston, and the White House. Beyond her fine arts practice, Sakiestewa has designed fabric collections for the design firm Knoll, served on the design team for the National Museum of the American Indian, and brought Hopi visual sensibility into a wide range of public and commercial contexts, consistently widening the audience for Indigenous design.`,
    meta_title: 'Ramona Sakiestewa — Hopi Tapestry Artist | Southwest Galleries',
    meta_description: 'Ramona Sakiestewa weaves Hopi textile traditions into contemporary tapestries held in the Smithsonian, Denver Art Museum, and the White House.',
  },
  {
    name: 'Melanie Yazzie',
    slug: 'melanie-yazzie',
    state_code: 'CO',
    city_id: 11, // Boulder
    bio: `Melanie Yazzie (born 1966 on the Navajo Nation in Arizona) is a Navajo printmaker, sculptor, and professor of art at the University of Colorado Boulder, where she has taught since 1993. Working in monotype, etching, linocut, and cast aluminum, Yazzie creates densely layered works filled with Navajo women, horses, dogs, birds, and the texture of everyday domestic and ceremonial life. Her work has an intimate, personal quality — rooted in specific cultural knowledge and lived experience — that gives it emotional warmth alongside its conceptual substance. She has exhibited internationally, with work in the collections of the Smithsonian Institution's National Museum of the American Indian, the Denver Art Museum, and major private and public collections. She has been recognized with fellowships from the Rockefeller Foundation and other major arts organizations.`,
    meta_title: 'Melanie Yazzie — Navajo Printmaker & Sculptor | Southwest Galleries',
    meta_description: 'Melanie Yazzie creates layered monotypes and cast aluminum sculptures rooted in Navajo life and culture. She is a professor at the University of Colorado Boulder.',
  },

  // ── CONTEMPORARY SOUTHWEST ───────────────────────────────────────────────

  {
    name: 'Glenna Goodacre',
    slug: 'glenna-goodacre',
    state_code: 'NM',
    city_id: 6, // Santa Fe
    bio: `Glenna Goodacre (1939–2020) worked for over four decades from her studio in Santa Fe, establishing herself as one of the foremost figurative sculptors of the American West. She is best known for two works of national significance: the Vietnam Women's Memorial (1993), which stands on the National Mall in Washington, D.C., and has become a place of pilgrimage for veterans and their families; and the obverse of the Sacagawea dollar coin (2000), for which she received a $5,000 payment she donated entirely to the Vietnam Women's Memorial Foundation. Her bronzes range from intimate portrait busts and playful figures of children to monumental public commissions, consistently demonstrating a deep sensitivity to the human figure and an ability to convey the full range of human emotion through pose and gesture. She was a defining presence in the Santa Fe fine arts community and in Western figurative sculpture.`,
    meta_title: 'Glenna Goodacre — Santa Fe Figurative Sculptor | Southwest Galleries',
    meta_description: 'Glenna Goodacre sculpted the Vietnam Women\'s Memorial and the Sacagawea dollar coin from her Santa Fe studio. Her bronzes span intimate portraits to national monuments.',
  },
  {
    name: 'Amado Peña',
    slug: 'amado-pena',
    state_code: 'TX',
    city_id: 52, // Austin
    bio: `Amado Peña Jr. (born 1943 in Laredo, Texas) is a painter and master serigraph printmaker of Chicano and Yaqui heritage whose images of Native American and mestizo figures have become among the most widely recognized works in Southwestern popular culture. Working in bold graphic silhouettes against backgrounds in the warm earth tones of the desert — rust, ochre, turquoise, and bone — Peña creates images of quiet dignity and visual power that celebrate Indigenous and Chicano identity without sentimentality. He taught school in Laredo for many years before establishing himself fully as a studio artist. His prints have appeared in homes, offices, and galleries from Texas to California, and he has maintained studios in Santa Fe and Austin. A dedicated teacher and community figure, Peña has mentored generations of younger artists in the Southwest.`,
    meta_title: 'Amado Peña — Chicano/Yaqui Painter & Printmaker | Southwest Galleries',
    meta_description: 'Amado Peña\'s bold serigraphs of Native American and Chicano figures are among the most widely collected images in the Southwest. He works from studios in Austin and Santa Fe.',
  },
  {
    name: 'Luis Jiménez',
    slug: 'luis-jimenez',
    state_code: 'TX',
    city_id: 54, // El Paso
    bio: `Luis Jiménez (1940–2006) was born in El Paso, Texas, and became the most prominent sculptor of the Chicano art movement. Working in fiberglass reinforced with epoxy and finished in vivid automotive urethane enamels, Jiménez created large-scale public sculptures that combined Pop Art vernacular with Chicano identity, Mexican muralist ambition, and the iconography of the American West. His "Vaquero" (1980), installed at the Smithsonian American Art Museum, depicts a pistol-waving cowboy on a rearing horse — a monument to the Mexican vaquero tradition erased from Anglo cowboy mythology. "Cruzando el Rio Bravo" depicts border crossers with the dignity of sacred figures, confronting viewers with the human cost of immigration policy. Jiménez died in his studio in Hondo, New Mexico, when a portion of a large blue mustang sculpture fell on him during production; the "Blue Mustang" was installed posthumously at Denver International Airport in 2008. His work is held in the collections of the Smithsonian, the Albuquerque Museum, and museums throughout the country.`,
    meta_title: 'Luis Jiménez — Chicano Sculptor from El Paso | Southwest Galleries',
    meta_description: 'Luis Jiménez made monumental fiberglass sculptures of cowboys, border crossers, and Chicano mythology from El Paso. His Blue Mustang stands at Denver International Airport.',
  },
  {
    name: 'Maynard Dixon',
    slug: 'maynard-dixon',
    state_code: 'AZ',
    city_id: 3, // Tucson
    bio: `Maynard Dixon (1875–1946) was born in Fresno, California, but spent his life and career traveling and painting the American Southwest — its mesas, storms, and solitary figures — and is among the most important painters of the region in the first half of the twentieth century. Rejecting the picturesque romanticism that characterized much Western painting, Dixon developed an austere, modernist vision: flat planes of color, monumental cloud formations, and indigenous figures rendered with economy and weight. He spent years in Arizona, New Mexico, and Utah, absorbing the geological drama of the Colorado Plateau. He lived his final years in Tucson, where he continued to paint the desert until his death. His work is held in the collections of the Oakland Museum of California, the Smithsonian American Art Museum, the Phoenix Art Museum, and other major institutions, and is considered essential to any understanding of the American Southwest in twentieth-century painting.`,
    meta_title: 'Maynard Dixon — Southwest Desert Painter | Southwest Galleries',
    meta_description: 'Maynard Dixon painted the American Southwest with modernist austerity from Arizona to Utah. His work is in the Smithsonian and the Phoenix Art Museum.',
  },
  {
    name: 'Howard Terpning',
    slug: 'howard-terpning',
    state_code: 'AZ',
    city_id: 1, // Scottsdale
    bio: `Howard Terpning (born 1927 in Oak Park, Illinois) spent the first half of his career as one of Hollywood's most sought-after movie poster artists — with commissions for "Cleopatra," "The Sound of Music," and "Camelot" among his credits — before turning in the early 1980s to painting the Native cultures of the American West. Settling in Scottsdale, Arizona, he devoted himself to rigorous historical research and studio painting, producing works that focus with particular depth on the cultures of the Northern Plains — Lakota, Crow, and Blackfoot peoples — depicted in trade, ceremony, and daily life. His paintings combine academic realism with genuine cultural respect and a concern for historical accuracy that distinguishes them from more romanticized Western art. He has won more Prix de West awards at the National Cowboy & Western Heritage Museum than any other artist and has been inducted into the Cowboy Artists of America. His work is shown at the Scottsdale Art Auction and represented by leading Western art galleries.`,
    meta_title: 'Howard Terpning — Western Figurative Painter | Southwest Galleries',
    meta_description: 'Howard Terpning left Hollywood illustration to paint the Native cultures of the Plains with historical depth from his Scottsdale studio. He holds more Prix de West awards than any other artist.',
  },
  {
    name: 'Bruce Nauman',
    slug: 'bruce-nauman',
    state_code: 'NM',
    city_id: 6, // Santa Fe (Galisteo is nearby)
    bio: `Bruce Nauman (born 1941 in Fort Wayne, Indiana) is one of the most influential American artists of the past sixty years, and has lived and worked on a cattle ranch outside Galisteo, New Mexico, since the early 1980s. His varied practice — spanning neon sculpture, video, performance, drawing, sound installation, and cast work — consistently interrogates the limits of language, the body, and the premise of art-making itself. Works like "One Hundred Live and Die" (1984), "Clown Torture" (1987), and "Mapping the Studio" (2001) are as likely to be unsettling as they are illuminating, drawing on Wittgenstein's philosophy of language, physical comedy, and the expansive silences of ranch life. Though largely invisible in the Galisteo community, his presence has shaped the New Mexico art world's sense of what it means to work seriously at the periphery. His 2009 retrospective at the Museum of Modern Art was a landmark event in American art. He was awarded the Praemium Imperiale in 2004 and the Nasher Prize in 2018.`,
    meta_title: 'Bruce Nauman — Conceptual Artist in New Mexico | Southwest Galleries',
    meta_description: 'Bruce Nauman, one of America\'s most influential artists, has lived and worked on a ranch near Galisteo, NM, since the early 1980s. His neon and video works are in MoMA and major collections worldwide.',
  },
  {
    name: 'Billy Schenck',
    slug: 'billy-schenck',
    state_code: 'AZ',
    city_id: 1, // Scottsdale
    bio: `Billy Schenck (born 1947) is the originator of what critics and galleries have called "Western Pop Art" — a genre he created by fusing the hard-edged graphic language of American Pop Art with cowboy iconography, lone sheriff silhouettes, and the lurid sunset palette of the Hollywood Western. Trained as a fine artist and deeply immersed in the New York art world of the 1970s — his studio was near Warhol's Factory — Schenck brought the formal strategies of Lichtenstein and Warhol back to the imagery of the Western frontier, creating paintings that are simultaneously a celebration and a critique of the cowboy myth. The results are works of considerable formal beauty and genuine wit. He exhibits regularly in Scottsdale and has shown widely in the United States and Europe. His work hangs in the collections of the Eiteljorg Museum of American Indians and Western Art and major private collections.`,
    meta_title: 'Billy Schenck — Western Pop Art Pioneer | Southwest Galleries',
    meta_description: 'Billy Schenck created Western Pop Art by fusing Pop Art aesthetics with cowboy imagery. His work is shown in Scottsdale and held in the Eiteljorg Museum.',
  },
  {
    name: 'Forrest Moses',
    slug: 'forrest-moses',
    state_code: 'NM',
    city_id: 6, // Santa Fe
    bio: `Forrest Moses (1934–2016) was an abstract painter who made Santa Fe his home for over four decades and became one of the defining figures of its contemporary art scene. Working in large-scale oil on canvas, Moses developed a distinctive approach to abstraction grounded in the sensory experience of the New Mexico landscape — not as representation but as emotional and atmospheric encounter. His paintings shift between dense, luminous fields of color and gestural passages of light and dark, creating works of quiet intensity that reward sustained attention. He was a central presence in the Santa Fe contemporary art community, showing consistently with leading galleries and influencing a generation of painters who came to work in the city. His work is held in the collections of the Harwood Museum of Art, the Museum of Fine Arts New Mexico, and major private collections throughout the Southwest.`,
    meta_title: 'Forrest Moses — Abstract Painter in Santa Fe | Southwest Galleries',
    meta_description: 'Forrest Moses spent four decades as a leading abstract painter in Santa Fe, building large canvases of atmospheric color rooted in the New Mexico landscape.',
  },
];

console.log(`Seeding ${artists.length} new artists…\n`);
let inserted = 0;
let skipped = 0;

for (const a of artists) {
  const slug = a.slug ?? slugify(a.name);
  const [existing] = await sql`SELECT id FROM artists WHERE slug = ${slug}`;
  if (existing) {
    console.log(`  → skipped  ${a.name} (exists)`);
    skipped++;
    continue;
  }

  const [row] = await sql`
    INSERT INTO artists (
      name, slug, bio, state_code, city_id, website_url,
      meta_title, meta_description
    ) VALUES (
      ${a.name}, ${slug}, ${a.bio}, ${a.state_code},
      ${a.city_id ?? null}, ${a.website_url ?? null},
      ${a.meta_title}, ${a.meta_description}
    )
    RETURNING id
  `;
  console.log(`  ✓ [${row.id}] ${a.name}`);
  inserted++;
}

console.log(`\nDone. Inserted: ${inserted}, Skipped: ${skipped}`);
const [{ total }] = await sql`SELECT COUNT(*) AS total FROM artists`;
console.log(`Total artists: ${total}`);
