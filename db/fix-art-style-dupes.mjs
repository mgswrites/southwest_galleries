import { neon } from '@neondatabase/serverless';

const NEON_DB_KEY = process.env.NEON_DB_KEY;
if (!NEON_DB_KEY) { console.error('NEON_DB_KEY not set'); process.exit(1); }
const sql = neon(NEON_DB_KEY);

function u(id) {
  return `https://images.unsplash.com/${id}?w=800&h=500&fit=crop&q=80`;
}

// Each listing_id appears at most once. Each image URL unique within this batch.
const updates = [

  // ── CO listings: new images (currently null) ──────────────────────────────
  { id: 331, img: u('photo-1533158326339-7f3cf2404354'), name: 'Blue Rain Gallery' },
  { id: 333, img: u('photo-1469854523086-cc02fe5d8800'), name: 'Scenic Aperture' },
  { id: 335, img: u('photo-1541961017774-22349e4a1262'), name: 'Museum of Impressionism' },
  { id: 336, img: u('photo-1506905925346-21bda4d32df4'), name: 'Paul Folwell Studio' },
  { id: 338, img: u('photo-1553361371-9b22f78e8b1d'), name: 'Rinkevich Gallery' },
  { id: 339, img: u('photo-1441974231531-c6227db76b6e'), name: 'Tony Newlin Gallery' },
  { id: 340, img: u('photo-1501854140801-50d01698950b'), name: 'Ago Gallery' },
  { id: 342, img: u('photo-1531913764164-f85c52e6e654'), name: 'Fred Harman Art Museum' },
  { id: 344, img: u('photo-1471623320832-752e8bbf8413'), name: 'Gallery Summer' },
  { id: 345, img: u('photo-1493246507139-91e8fad9978e'), name: 'Chad Haspels Sculpture Studio' },

  // ── Contemporary 20× dup (photo-1578855019520) ────────────────────────────
  { id:  22, img: u('photo-1567306226416-28f0efdc88ce'), name: 'Renee Taylor Gallery' },
  { id:  58, img: u('photo-1500534314209-a25ddb2bd429'), name: 'James Kelly Contemporary' },
  { id:  85, img: u('photo-1579783902614-a3fb3927b6a5'), name: 'Pirate: Contemporary Art' },
  { id:  90, img: u('photo-1518998053901-5348d3961a04'), name: 'Galerie Maximillian' },
  { id:  94, img: u('photo-1464822759023-fed622ff2c3b'), name: 'Contemporary Arts Center Las Vegas' },
  { id:  98, img: u('photo-1565299585323-38d6b0865b47'), name: 'CUAC Contemporary Utah Art Center' },
  { id: 131, img: u('photo-1558618666-fcd25c85cd64'), name: 'Keshet Center for the Arts' },
  { id: 135, img: u('photo-1562654501-a0ccc0fc3fb1'), name: 'Vladem Contemporary' },
  { id: 141, img: u('photo-1564419320461-6870880221ad'), name: 'MOCA Los Angeles' },
  { id: 194, img: u('photo-1518105779142-d975f22f1b0a'), name: 'Icehouse Gallery' },
  { id: 227, img: u('photo-1560717845-968823efbee1'), name: 'CORE New Art Space' },
  { id: 231, img: u('photo-1536924430914-91f9e2041b83'), name: 'Traction Gallery' },
  { id: 243, img: u('photo-1574182245530-967d9b3831af'), name: 'Brewery Arts Center' },
  { id: 253, img: u('photo-1510906594845-bc082582c8cc'), name: 'Riva Yares Gallery' },
  { id: 258, img: u('photo-1519682337058-a94d519337bc'), name: 'Tortuga Gallery' },
  { id: 275, img: u('photo-1460661419201-fd4cecdf8a8b'), name: 'Lawndale Art Center' },
  { id: 276, img: u('photo-1529335764857-3f1164d1cb24'), name: 'Station Museum of Contemporary Art' },
  { id: 302, img: u('photo-1472396961693-142e6e269027'), name: 'MASS Gallery' },
  { id: 316, img: u('photo-1488866022504-f2584929ca5f'), name: 'Granary Arts' },

  // ── Contemporary 16× dup (photo-1766128867459) ────────────────────────────
  { id:  74, img: u('photo-1580060839134-75a5edca2e99'), name: 'Tamarind Institute' },
  { id:  88, img: u('photo-1578662996442-48f60103fc96'), name: 'Baldwin Gallery' },
  { id: 112, img: u('photo-1579783901586-d88db74b4fe4'), name: 'Swoon Art House' },
  { id: 125, img: u('photo-1547891654-e66ed7ebb968'), name: 'George Washington Carver Museum' },
  { id: 142, img: u('photo-1516280440614-37939bbacd81'), name: 'Hammer Museum' },
  { id: 154, img: u('photo-1526779259212-939e64788e3c'), name: 'Fraenkel Gallery' },
  { id: 193, img: u('photo-1558021212-51b6ecfa0db9'), name: 'Flagstaff Arts Council' },
  { id: 210, img: u('photo-1479839672679-a46483c0e7c8'), name: 'Patina Gallery Fort Collins' },
  { id: 234, img: u('photo-1618556450994-a6a128ef0d9d'), name: 'Donna Beam Fine Art Gallery' },
  { id: 242, img: u('photo-1531315630201-bb15abeb1653'), name: 'Henderson Civic Arts Foundation' },
  { id: 277, img: u('photo-1626785774573-4b799315345d'), name: 'Art League Houston' },
  { id: 279, img: u('photo-1634017839464-5c339ebe3cb4'), name: 'DiverseWorks' },
  { id: 300, img: u('photo-1552084117-56a987666449'), name: 'Women & Their Work' },
  { id: 308, img: u('photo-1573495627361-d9b87960b12d'), name: 'Sala Diaz' },
  { id: 317, img: u('photo-1578321272176-b7bbc0679853'), name: 'Art Access Gallery' },

  // ── Contemporary 14× / landscape 10× dup (photo-1766801848077) ───────────
  { id:  89, img: u('photo-1608501078713-8e445a709b39'), name: 'Ann Korologos Gallery' },
  { id:  96, img: u('photo-1504805572947-34fad45aed93'), name: 'Phillips Gallery' },
  { id: 126, img: u('photo-1513542789411-b6a5d4f31634'), name: 'Arizona Latino Arts and Cultural Center' },
  { id: 148, img: u('photo-1506619216599-9d16d0903dfd'), name: 'Regen Projects' },
  { id: 158, img: u('photo-1461696114087-397271a7aedc'), name: 'MCASD' },
  { id: 184, img: u('photo-1545987796-200677ee1011'), name: 'Eye Lounge Tempe' },
  { id: 195, img: u('photo-1487260211189-670c54da558d'), name: 'monOrchid' },
  { id: 225, img: u('photo-1493225457124-a3eb161ffa5f'), name: 'Goodwin Fine Art' },
  { id: 236, img: u('photo-1614728894747-a83421e2b9c9'), name: 'Stremmel Gallery' },
  { id: 285, img: u('photo-1582653291997-079a1c04e5a1'), name: 'Ro2 Art' },
  { id: 286, img: u('photo-1618005182384-a83a8bd57fbe'), name: 'Barry Whistler Gallery' },
  { id: 287, img: u('photo-1553531384-411a247ccd73'), name: 'Conduit Gallery' },
  { id: 321, img: u('photo-1578926375605-eaf7559b1458'), name: 'Winn Slavin Fine Art' },
  // Landscape-only 10× extras not in contemporary list
  { id:  41, img: u('photo-1584551246679-0daf3d275d0f'), name: 'Nedra Matteucci Galleries' },
  { id:  53, img: u('photo-1560179707-f14e90ef3623'), name: 'Zaplin-Lampert Gallery' },
  { id:  57, img: u('photo-1559827260-dc66d52bef19'), name: 'Manitou Galleries' },
  { id: 164, img: u('photo-1633356122102-3fe601e05bd2'), name: 'Dolby Chadwick Gallery' },
  { id: 301, img: u('photo-1600585154340-be6161a56a0c'), name: 'Wally Workman Gallery' },

  // ── Contemporary 12× dup (photo-1771189255285) ────────────────────────────
  { id:  37, img: u('photo-1541123437800-1bb1317badc2'), name: 'Bentley Gallery Phoenix' },
  { id:  54, img: u('photo-1602940659805-770d1b3b9911'), name: 'Peters Projects' },
  { id:  80, img: u('photo-1581992652564-44c42f5ad3ad'), name: 'Visions West Contemporary' },
  { id:  83, img: u('photo-1557804506-669a67965ba0'), name: 'Rule Gallery' },
  { id:  86, img: u('photo-1568584711075-3d021a7c3ca3'), name: 'Emanuel Gallery' },
  { id:  97, img: u('photo-1554232456-8727aae0cfa4'), name: 'Finch Lane Gallery' },
  { id: 144, img: u('photo-1561912774-79769a0a0a7a'), name: 'Hauser & Wirth Los Angeles' },
  { id: 155, img: u('photo-1568602471122-7832951cc4c5'), name: 'Ratio 3' },
  { id: 185, img: u('photo-1561998338-13ad7883b20f'), name: 'Mesa Arts Center' },
  { id: 245, img: u('photo-1516450360452-9312f5e86fc7'), name: 'Artists at Work Gallery' },
  { id: 251, img: u('photo-1591115765373-5207764f72e7'), name: 'Patina Gallery' },

  // ── Contemporary 9× dup (photo-1774021796059) ─────────────────────────────
  { id:  30, img: u('photo-1622737133809-d95047b9e673'), name: 'Dinnerware Artspace' },
  { id:  44, img: u('photo-1599508704512-2f19efd1e35f'), name: 'Charlotte Jackson Fine Art' },
  { id:  82, img: u('photo-1592861956120-e524fc739696'), name: 'Plus Gallery' },
  { id: 145, img: u('photo-1546961342-ea5f71b193f3'), name: 'David Kordansky Gallery' },
  { id: 167, img: u('photo-1540575467063-178a50c2df87'), name: 'Santa Barbara Museum of Art' },
  { id: 191, img: u('photo-1544551763-46a013bb70d5'), name: 'Northern Arizona University Art Museum' },
  { id: 196, img: u('photo-1513364776144-60967b0f800f'), name: 'Unexpected Gallery' },
  { id: 320, img: u('photo-1569163139599-0f4517e36f51'), name: 'Coda Gallery' },

  // ── Contemporary 7× dup (photo-1774021793184) ─────────────────────────────
  { id: 108, img: u('photo-1587825140708-dfaf72ae4b04'), name: 'Cal State LA Fine Arts Gallery' },
  { id: 111, img: u('photo-1542744173-8e7e53415bb0'), name: 'Dairy Arts Center' },
  { id: 169, img: u('photo-1531058020387-3be344556be6'), name: 'BAMPFA' },
  { id: 181, img: u('photo-1490730141103-6cac27aaab94'), name: 'Prescott Fine Arts Association' },
  { id: 187, img: u('photo-1498408040764-ab6eb772a145'), name: 'Galeria Mesa' },
  { id: 226, img: u('photo-1465146344425-f00d5f5c8f07'), name: 'Gildar Gallery' },

  // ── Contemporary 5× dup (photo-1774021792172) ─────────────────────────────
  { id: 121, img: u('photo-1490578474895-699cd4e2cf59'), name: 'Dikeou Collection' },
  { id: 146, img: u('photo-1506439773649-6e0eb8cfb237'), name: 'Blum & Poe' },
  { id: 159, img: u('photo-1530610476181-d83430b64dcd'), name: 'David Zapf Gallery' },
  { id: 186, img: u('photo-1508739773434-c26b3d09e071'), name: 'Mesa Contemporary Arts Museum' },

  // ── Contemporary 3× / landscape (photo-1558836809) ───────────────────────
  { id: 329, img: u('photo-1517816428104-797678c7cf0c'), name: 'Sears Art Museum' },
  { id: 330, img: u('photo-1495020689067-958852a7765e'), name: 'Braithwaite Fine Arts Gallery' },

  // ── Contemporary 3× (photo-1628328052245) ────────────────────────────────
  { id: 262, img: u('photo-1497366754035-f200968a6e72'), name: 'Fountain Theatre' },
  { id: 263, img: u('photo-1524813686514-a57563d77965'), name: 'Roswell Museum and Art Center' },

  // ── Contemporary + native-american 3× (photo-1595651492943) ──────────────
  { id:  48, img: u('photo-1551361415-69c87624334f'), name: 'New Mexico Museum of Art' },
  { id: 136, img: u('photo-1527525443983-6e60c75fff46'), name: 'El Museo Cultural de Santa Fe' },

  // ── Landscape 6× dup (photo-1774017005664) ───────────────────────────────
  { id: 137, img: u('photo-1545324418-cc1a3fa10c00'), name: 'Western Spirit Museum' },
  { id: 189, img: u('photo-1494522855154-9297ac14b55f'), name: 'Horton Gallery' },
  { id: 228, img: u('photo-1521747116042-5a810fda9664'), name: 'David Cook Fine American Art' },
  { id: 246, img: u('photo-1452802447250-470a88ac82bc'), name: 'Western Folklife Center' },
  { id: 293, img: u('photo-1445991842772-097fea258e7b'), name: 'Sid Richardson Museum' },

  // ── Landscape 4× dup (photo-1695596254299) ───────────────────────────────
  { id:  64, img: u('photo-1631377819268-d716cd610cd2'), name: 'Parks Gallery' },
  { id:  67, img: u('photo-1617802690992-15d93263d3a9'), name: 'Studio Taos' },
  { id: 256, img: u('photo-1620503374956-c942862f0372'), name: 'Van Vechten Lineberry Taos Art Museum' },

  // ── Landscape 3× dup (photo-1617771431802) ───────────────────────────────
  { id:  23, img: u('photo-1583394838336-acd977736f90'), name: 'Goldenstein Gallery' },
  { id: 173, img: u('photo-1518281420975-50db6e5d0a97'), name: 'Priceless Pieces Fine Art' },

  // ── Landscape 2× fixes ────────────────────────────────────────────────────
  { id: 325, img: u('photo-1552673597-e3cd6747a996'), name: 'Springville Museum of Art' },
  { id: 179, img: u('photo-1578301978018-3005759f48f7'), name: 'Mountain Artists Guild Gallery' },
  { id: 223, img: u('photo-1581803118522-7b72a50f7e9f'), name: 'Gallery 970' },
  { id: 221, img: u('photo-1618354691373-d851c5c3a990'), name: 'Gallery at the White House Ranch' },
  { id: 322, img: u('photo-1555099962-4199c345e5dd'), name: 'Terzian Galleries' },

  // ── Native-american dupes ─────────────────────────────────────────────────
  { id:  52, img: u('photo-1606471191009-63994c53433b'), name: 'Institute of American Indian Arts Museum' },
  { id:  65, img: u('photo-1593113598332-cd288d649433'), name: 'Navajo Gallery' },
  { id:  50, img: u('photo-1558478551-1a378f63328e'), name: 'Museum of International Folk Art' },
  { id: 269, img: u('photo-1549924231-f129b911e442'), name: 'Los Luceros Historic Site' },
  { id: 233, img: u('photo-1556742049-0cfed4f6a45d'), name: 'Nevada State Museum Las Vegas' },

  // ── Sculpture-only dupes not covered by contemporary/landscape fixes ───────
  { id: 278, img: u('photo-1568495248636-6432b97bd949'), name: 'Houston Center for Contemporary Craft' },
  { id:  18, img: u('photo-1551009175-15bdf9dcb580'),  name: 'Mountain Trails Gallery' },
  { id:  14, img: u('photo-1582213782179-e0d53f98f2ca'), name: 'Cattle Track Arts Compound' },
  { id: 281, img: u('photo-1588345921523-c2dcdb7f1dcd'), name: 'Nasher Sculpture Center' },
  { id: 292, img: u('photo-1578946956088-940c3b502864'), name: 'Modern Art Museum of Fort Worth' },
  { id: 304, img: u('photo-1596464716127-f2a82984de30'), name: 'McNay Art Museum' },

];

// Self-check: catch any accidental duplicate images in this batch
const imgCounts = new Map();
for (const row of updates) {
  imgCounts.set(row.img, (imgCounts.get(row.img) ?? 0) + 1);
}
const batchImgDupes = [...imgCounts.entries()].filter(([, n]) => n > 1);
if (batchImgDupes.length) {
  console.error('\n✗ DUPLICATE IMAGES IN BATCH — fix before running:');
  batchImgDupes.forEach(([img, n]) =>
    console.error(`  ${n}× ${img.replace('https://images.unsplash.com/', '').split('?')[0]}`)
  );
  process.exit(1);
}

console.log(`Updating ${updates.length} listings…\n`);
let ok = 0, fail = 0;

for (const row of updates) {
  try {
    await sql`UPDATE listings SET hero_image_url = ${row.img} WHERE id = ${row.id}`;
    console.log(`  ✓ [${row.id}] ${row.name}`);
    ok++;
  } catch (err) {
    console.error(`  ✗ [${row.id}] ${row.name}: ${err.message}`);
    fail++;
  }
}

console.log(`\nDone. Updated: ${ok}, Failed: ${fail}`);

// Sanity check — remaining dupes on the four critical style pages
for (const style of ['contemporary', 'landscape-plein-air', 'native-american', 'sculpture']) {
  const dupes = await sql`
    SELECT COUNT(*) AS dupe_groups
    FROM (
      SELECT hero_image_url
      FROM listings l
      JOIN listing_art_styles las ON las.listing_id = l.id
      JOIN art_styles s ON s.id = las.style_id
      WHERE s.slug = ${style} AND l.status = 'approved' AND l.deleted_at IS NULL
        AND l.hero_image_url IS NOT NULL
      GROUP BY l.hero_image_url
      HAVING COUNT(*) > 1
    ) sub
  `;
  const n = parseInt(dupes[0].dupe_groups);
  console.log(`  ${n === 0 ? '✓' : '⚠'} ${style}: ${n} dupe group(s) remaining`);
}
