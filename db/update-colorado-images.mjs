import { neon } from '@neondatabase/serverless';

const NEON_DB_KEY = process.env.NEON_DB_KEY;
if (!NEON_DB_KEY) { console.error('NEON_DB_KEY not set'); process.exit(1); }
const sql = neon(NEON_DB_KEY);

function unsplash(photoId) {
  return `https://images.unsplash.com/${photoId}?w=800&h=500&fit=crop&q=80`;
}

// ── Location-specific photo constants ─────────────────────────────────────────
const ASPEN_TOWN         = unsplash('photo--9BRFlOi1LI');  // Aspen CO town in mountains (golden hour)
const BOULDER_FLATS_1    = unsplash('photo-CkL2keStfIk');  // green grass + Flatirons, Boulder
const BOULDER_FLATS_2    = unsplash('photo-FKvF4s_66sI');  // dirt road + Flatirons, Boulder
const GARDEN_GODS_1      = unsplash('photo-cBrJVVxNF30');  // red rock formation, Garden of the Gods CO Springs
const GARDEN_GODS_2      = unsplash('photo-5O7ICdzPlww');  // road between rock formations, Garden of Gods
const GARDEN_GODS_3      = unsplash('photo-xzC7bUTO5rw');  // brown rock formation, Garden of Gods
const DENVER_SKYLINE_1   = unsplash('photo-Q9X_p5dDq_8');  // Denver skyline + Rockies backdrop (confirmed)
const DENVER_SKYLINE_2   = unsplash('photo-3ZpDWziy4Jk');  // Denver city with mountain in background
const DURANGO_TRAIN      = unsplash('photo-t_-X3OIQVkA');  // Durango narrow gauge railroad (confirmed)
const FRONT_RANGE_MTNS   = unsplash('photo-v2do9FswXwk');  // grassy field + mountains, Fort Collins area
const ROCKY_MTN          = unsplash('photo-WhoW9cO0-VA');  // mountain range + trees, CO Rockies
const STEAMBOAT_AERIAL   = unsplash('photo-fuRuidzW1zc');  // Steamboat Springs aerial (confirmed)
const TELLURIDE_STREET   = unsplash('photo-ODvgdXxGhzQ');  // Telluride main street + Trico Peak (confirmed)
const TELLURIDE_AERIAL   = unsplash('photo-Momc9B6BmZ8');  // Telluride aerial between mountains (confirmed)
const VAIL_TOWN          = unsplash('photo-hKx908CfoHA');  // Vail mountain town scenic (confirmed)
const SW_POTTERY         = unsplash('photo-1536266305399-b367feb671f9'); // Southwest clay pottery
const WESTERN_ART        = unsplash('photo-1774017005664-bedd45feaa41'); // Smithsonian Western watercolor

// ── Gallery interior constants (reused from AZ script) ───────────────────────
const GALLERY_VISITOR    = unsplash('photo-1766128867459-064fcbfa8781'); // person in minimalist gallery
const GALLERY_HALLWAY    = unsplash('photo-1771189255285-3bcb030e1f47'); // modern gallery hallway
const GALLERY_SKYLIGHTS  = unsplash('photo-1774021796059-d5ea30abb3e0'); // white room with skylights
const GALLERY_FRAMED     = unsplash('photo-1766801848077-31bd1900efcc'); // gallery with framed works
const GALLERY_REFLECTIVE = unsplash('photo-1774021792172-5f78c2e17ca8'); // white gallery reflective floor
const GALLERY_LIGHTS     = unsplash('photo-1774021793184-056a76f6e6f4'); // gallery with ceiling lights
const GALLERY_COLORFUL   = unsplash('photo-1578855019520-af8101c056e2'); // gallery with colorful paintings

const updates = [

  // ── ASPEN ─────────────────────────────────────────────────────────────────
  { id: 89,  hero: GALLERY_FRAMED    },  // Ann Korologos Gallery
  { id: 198, hero: ASPEN_TOWN        },  // Aspen Historical Society Museum
  { id: 88,  hero: GALLERY_VISITOR   },  // Baldwin Gallery
  { id: 90,  hero: GALLERY_COLORFUL  },  // Galerie Maximillian

  // ── BOULDER ───────────────────────────────────────────────────────────────
  { id: 199, hero: BOULDER_FLATS_1   },  // Boulder Arts & Crafts Gallery
  { id: 110, hero: BOULDER_FLATS_2   },  // CU Art Museum
  { id: 111, hero: GALLERY_LIGHTS    },  // Dairy Arts Center
  { id: 201, hero: BOULDER_FLATS_1   },  // Macky Auditorium Gallery
  { id: 200, hero: BOULDER_FLATS_2   },  // Naropa University Art Gallery
  { id: 112, hero: GALLERY_VISITOR   },  // Swoon Art House

  // ── COLORADO SPRINGS ──────────────────────────────────────────────────────
  { id: 202, hero: GARDEN_GODS_1     },  // Colorado Springs Fine Arts Center
  { id: 204, hero: GARDEN_GODS_2     },  // Gallery of the Rockies
  { id: 203, hero: GARDEN_GODS_3     },  // Pikes Peak Arts Council

  // ── DENVER ────────────────────────────────────────────────────────────────
  { id: 75,  hero: DENVER_SKYLINE_1  },  // Denver Art Museum
  { id: 224, hero: DENVER_SKYLINE_2  },  // Denver Botanic Gardens — Freyer–Newman Center
  { id: 121, hero: GALLERY_REFLECTIVE},  // Dikeou Collection
  { id: 86,  hero: GALLERY_HALLWAY   },  // Emanuel Gallery
  { id: 226, hero: GALLERY_LIGHTS    },  // Gildar Gallery
  { id: 225, hero: GALLERY_FRAMED    },  // Goodwin Fine Art
  { id: 85,  hero: GALLERY_COLORFUL  },  // Pirate: Contemporary Art
  { id: 82,  hero: GALLERY_SKYLIGHTS },  // Plus Gallery
  { id: 83,  hero: GALLERY_HALLWAY   },  // Rule Gallery
  { id: 80,  hero: GALLERY_HALLWAY   },  // Visions West Contemporary
  { id: 79,  hero: GALLERY_FRAMED    },  // Walker Fine Art
  { id: 120, hero: GALLERY_VISITOR   },  // Colorado Photographic Arts Center
  { id: 228, hero: WESTERN_ART       },  // David Cook Fine American Art
  { id: 227, hero: GALLERY_COLORFUL  },  // CORE New Art Space

  // ── DURANGO ───────────────────────────────────────────────────────────────
  { id: 214, hero: DURANGO_TRAIN     },  // Sorrel Sky Gallery — replace missing hero
  { id: 215, hero: SW_POTTERY        },  // Toh-Atin Gallery — fix broken CDN URL
  { id: 217, hero: DURANGO_TRAIN     },  // Maria's Bookshop & Gallery — was logo banner

  // ── FORT COLLINS ──────────────────────────────────────────────────────────
  { id: 208, hero: FRONT_RANGE_MTNS  },  // Fort Collins Museum of Art
  { id: 209, hero: FRONT_RANGE_MTNS  },  // Colorado State University Art Museum
  { id: 210, hero: GALLERY_VISITOR   },  // Patina Gallery Fort Collins

  // ── MANITOU SPRINGS ───────────────────────────────────────────────────────
  { id: 206, hero: GARDEN_GODS_2     },  // Manitou Art Center — near Garden of Gods
  { id: 207, hero: GARDEN_GODS_3     },  // Villa Bernina Gallery

  // ── PUEBLO ────────────────────────────────────────────────────────────────
  { id: 218, hero: ROCKY_MTN         },  // Sangre de Cristo Arts Center
  { id: 219, hero: ROCKY_MTN         },  // Pueblo Arts Alliance

  // ── STEAMBOAT SPRINGS ─────────────────────────────────────────────────────
  { id: 220, hero: STEAMBOAT_AERIAL  },  // Steamboat Art Museum
  { id: 221, hero: STEAMBOAT_AERIAL  },  // Gallery at the White House Ranch

  // ── TELLURIDE ─────────────────────────────────────────────────────────────
  { id: 211, hero: TELLURIDE_AERIAL  },  // Telluride Gallery of Fine Art
  { id: 212, hero: TELLURIDE_STREET  },  // Ah Haa School for the Arts

  // ── VAIL ──────────────────────────────────────────────────────────────────
  { id: 222, hero: VAIL_TOWN         },  // Vail Fine Arts
  { id: 223, hero: VAIL_TOWN         },  // Gallery 970
];

console.log(`Updating ${updates.length} CO listings with hero images…\n`);
let ok = 0;
let fail = 0;

for (const u of updates) {
  try {
    await sql`UPDATE listings SET hero_image_url = ${u.hero} WHERE id = ${u.id}`;
    ok++;
  } catch (err) {
    console.error(`  ✗ id ${u.id}: ${err.message}`);
    fail++;
  }
}

console.log(`Done. Updated: ${ok}, Failed: ${fail}`);

const [{ n }] = await sql`
  SELECT COUNT(*) AS n FROM listings
  WHERE city_id IN (SELECT id FROM cities WHERE state_code = 'CO')
    AND status = 'approved' AND deleted_at IS NULL
    AND hero_image_url IS NOT NULL
`;
const [{ total }] = await sql`
  SELECT COUNT(*) AS total FROM listings
  WHERE city_id IN (SELECT id FROM cities WHERE state_code = 'CO')
    AND status = 'approved' AND deleted_at IS NULL
`;
console.log(`CO listings with hero image: ${n}/${total}`);
