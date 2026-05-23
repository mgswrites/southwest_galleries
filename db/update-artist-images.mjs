import { neon } from '@neondatabase/serverless';

const NEON_DB_KEY = process.env.NEON_DB_KEY;
if (!NEON_DB_KEY) { console.error('NEON_DB_KEY not set'); process.exit(1); }
const sql = neon(NEON_DB_KEY);

function unsplash(photoId) {
  return `https://images.unsplash.com/${photoId}?w=800&h=500&fit=crop&q=80`;
}

// ── Image pool (all CDN IDs verified 200) ─────────────────────────────────────
const SW_POTTERY        = unsplash('photo-1536266305399-b367feb671f9'); // Southwest pottery on display
const ABSTRACT_COLORS   = unsplash('photo-1716914583238-d868c6fde7e9'); // abstract, many vibrant colors
const ABSTRACT_VIBRANT  = unsplash('photo-1755085381840-572a27fb0735'); // abstract bold vibrant strokes
const ABSTRACT_CLASSIC  = unsplash('photo-1704132134791-40ca4f65fe39'); // abstract colorful canvas
const ABSTRACT_RAINBOW  = unsplash('photo-1605721911519-3dfeb3be25e7'); // large canvas rainbow brushstrokes
const ABSTRACT_MOODY    = unsplash('photo-1618331833071-ce81bd50d300'); // dark gestural abstract
const COLLAGE_SW        = unsplash('photo-1562448079-b5631888445f');    // mixed media collage w/ SW rug
const CLAY_HANDS        = unsplash('photo-1422246358533-95dcd3d48961'); // hands kneading raw clay
const CLAY_POT          = unsplash('photo-1590605095243-072811dbe64c'); // person holding clay pot
const CERAMIC_VASE      = unsplash('photo-1597696929736-6d13bed8e6a8'); // ceramic vase close-up
const SCULPTURE_COLOR   = unsplash('photo-1631293294072-84c0879484ef'); // colorful animal sculpture
const SCULPTURE_BRONZE  = unsplash('photo-1680501536309-4b25e218a875'); // bronze statue two figures
const SCULPTURE_FIGURE  = unsplash('photo-1639741503633-6d13959a5739'); // bronze figure sculpture
const FILM_CAMERA       = unsplash('photo-1495121553079-4c61bcce1894'); // Rolleiflex film camera
const WEAVING           = unsplash('photo-1759738096144-b43206226765'); // woman weaving on loom
const PRINTMAKING       = unsplash('photo-1730134426941-1def6b725da3'); // person working on linocut/woodcut
const SCREEN_PRINT      = unsplash('photo-1456456496250-d5e7c0a9b44d'); // silkscreen printing
const DESERT_PAINTING   = unsplash('photo-1695842585219-c59d73519571'); // painted desert landscape
const COWBOY_DESERT     = unsplash('photo-1744791588287-6660d83418b3'); // cowboy on horse in desert
const NEON_SIGNS        = unsplash('photo-1558273246-57d22047406d');    // multicolored neon signs
const HORSE_DESERT      = unsplash('photo-1536190510100-3ce0d7ee16ab'); // man riding horse in desert

const updates = [

  // ── Native American / Indigenous artists ─────────────────────────────────
  { id: 9,  hero: SW_POTTERY,       name: 'Pablita Velarde' },         // Pueblo muralist / painter
  { id: 10, hero: ABSTRACT_COLORS,  name: 'Helen Hardin' },            // abstract geometric Native iconography
  { id: 11, hero: ABSTRACT_VIBRANT, name: 'T.C. Cannon' },             // bold Pop-influenced portraiture
  { id: 12, hero: ABSTRACT_CLASSIC, name: 'Dan Namingha' },            // abstract expressionism + Hopi
  { id: 13, hero: ABSTRACT_RAINBOW, name: 'Tony Abeyta' },             // large-scale abstract + Navajo
  { id: 14, hero: CLAY_HANDS,       name: 'Roxanne Swentzell' },       // figurative clay sculpture
  { id: 15, hero: CLAY_POT,         name: 'Nora Naranjo-Morse' },      // clay / poetry / installation
  { id: 16, hero: CERAMIC_VASE,     name: 'Virgil Ortiz' },            // Cochiti ceramic + fashion
  { id: 17, hero: COLLAGE_SW,       name: 'Jaune Quick-to-See Smith' },// mixed media / activist
  { id: 18, hero: SCULPTURE_COLOR,  name: 'Cannupa Hanska Luger' },    // large-scale installation
  { id: 19, hero: FILM_CAMERA,      name: 'Cara Romero' },             // large-format photography
  { id: 20, hero: WEAVING,          name: 'Ramona Sakiestewa' },       // master weaver / tapestry
  { id: 21, hero: PRINTMAKING,      name: 'Melanie Yazzie' },          // printmaking / painting

  // ── Contemporary Southwest artists ────────────────────────────────────────
  { id: 22, hero: SCULPTURE_BRONZE, name: 'Glenna Goodacre' },         // bronze figurative sculpture
  { id: 23, hero: SCREEN_PRINT,     name: 'Amado Peña' },              // silkscreen prints
  { id: 24, hero: SCULPTURE_FIGURE, name: 'Luis Jiménez' },            // fiberglass / pop sculpture
  { id: 25, hero: DESERT_PAINTING,  name: 'Maynard Dixon' },           // desert landscape painting
  { id: 26, hero: COWBOY_DESERT,    name: 'Howard Terpning' },         // Western / Native American painting
  { id: 27, hero: NEON_SIGNS,       name: 'Bruce Nauman' },            // neon / video / conceptual
  { id: 28, hero: HORSE_DESERT,     name: 'Billy Schenck' },           // Pop Art + Western
  { id: 29, hero: ABSTRACT_MOODY,   name: 'Forrest Moses' },           // gestural abstract expressionist

];

console.log(`Updating ${updates.length} artist hero images…\n`);
let ok = 0;
let fail = 0;

for (const u of updates) {
  try {
    const result = await sql`UPDATE artists SET hero_image_url = ${u.hero} WHERE id = ${u.id}`;
    console.log(`  ✓ [${u.id}] ${u.name}`);
    ok++;
  } catch (err) {
    console.error(`  ✗ [${u.id}] ${u.name}: ${err.message}`);
    fail++;
  }
}

console.log(`\nDone. Updated: ${ok}, Failed: ${fail}`);

const [{ n }] = await sql`SELECT COUNT(*) AS n FROM artists WHERE hero_image_url IS NOT NULL`;
const [{ total }] = await sql`SELECT COUNT(*) AS total FROM artists`;
console.log(`Artists with hero image: ${n}/${total}`);
