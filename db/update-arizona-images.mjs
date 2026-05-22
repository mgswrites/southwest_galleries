import { neon } from '@neondatabase/serverless';

const NEON_DB_KEY = process.env.NEON_DB_KEY;
if (!NEON_DB_KEY) { console.error('NEON_DB_KEY not set'); process.exit(1); }
const sql = neon(NEON_DB_KEY);

function unsplash(photoId) {
  return `https://images.unsplash.com/${photoId}?w=800&h=500&fit=crop&q=80`;
}

// Named photo constants for readability
const SEDONA_RED_ROCKS_1    = unsplash('photo-1617771431802-58b6aaf93399'); // Schnebly Road, Sedona AZ
const SEDONA_RED_ROCKS_2    = unsplash('photo-1604908506732-46bf709bf6b1'); // Red rocks Sedona AZ
const BISBEE_COLORFUL       = unsplash('photo-1687792054387-14a441a155de'); // Tombstone Canyon Bisbee AZ
const BISBEE_STREET         = unsplash('photo-1603651825884-4abfd0885155'); // Empty road Bisbee AZ
const WATSON_LAKE           = unsplash('photo-1628876521370-23ed45190a45'); // Watson Lake Prescott AZ
const FLAGSTAFF_PINES       = unsplash('photo-1765742432551-b916687093fa'); // Snowy pines Flagstaff AZ
const TUCSON_CITY_1         = unsplash('photo-1694381303026-ae5cb023e405'); // Tucson city view
const TUCSON_CITY_2         = unsplash('photo-1698273191964-4b20cd4fdea7'); // Tucson aerial view
const TEMPE_LAKE            = unsplash('photo-1552100031-4e22ef4b917a');    // Tempe Town Lake AZ
const SAGUARO_CACTUS        = unsplash('photo-1573689705887-bc0763c82ea2'); // Saguaro desert AZ
const TALIESIN_SCULPTURE_1  = unsplash('photo-1760030427736-0efbd3be1977'); // Sculpture at Taliesin West, Scottsdale
const TALIESIN_SCULPTURE_2  = unsplash('photo-1760030427641-35be6f45c38e'); // Stone statue at Taliesin West
const SW_POTTERY            = unsplash('photo-1536266305399-b367feb671f9'); // Southwest clay pottery
const WESTERN_ART           = unsplash('photo-1774017005664-bedd45feaa41'); // Smithsonian Western watercolor
const JEROME_MURAL          = unsplash('photo-1646621453285-fe4a85096e48'); // Street mural, Cottonwood AZ (near Jerome)
const GALLERY_VISITOR       = unsplash('photo-1766128867459-064fcbfa8781'); // Person in minimalist gallery
const GALLERY_HALLWAY       = unsplash('photo-1771189255285-3bcb030e1f47'); // Modern gallery hallway
const GALLERY_SKYLIGHTS     = unsplash('photo-1774021796059-d5ea30abb3e0'); // White room with skylights
const GALLERY_FRAMED        = unsplash('photo-1766801848077-31bd1900efcc'); // Gallery with framed works
const GALLERY_REFLECTIVE    = unsplash('photo-1774021792172-5f78c2e17ca8'); // White gallery reflective floor
const GALLERY_LIGHTS        = unsplash('photo-1774021793184-056a76f6e6f4'); // Gallery with ceiling lights
const GALLERY_COLORFUL      = unsplash('photo-1578855019520-af8101c056e2'); // Gallery with colorful paintings

const updates = [

  // ── BISBEE ────────────────────────────────────────────────────────────────
  { id: 174, hero: BISBEE_COLORFUL  },  // Belleza Fine Art
  { id: 175, hero: BISBEE_STREET    },  // Bisbee Arts & Social Club
  { id: 176, hero: BISBEE_STREET    },  // Gallery Bisbee
  { id: 177, hero: BISBEE_COLORFUL  },  // Copper Queen Hotel Art Gallery

  // ── CAVE CREEK ────────────────────────────────────────────────────────────
  { id: 188, hero: SAGUARO_CACTUS   },  // Desert Foothills Art Center
  { id: 189, hero: WESTERN_ART      },  // Horton Gallery
  { id: 190, hero: SAGUARO_CACTUS   },  // Buffalo Chip Gallery

  // ── FLAGSTAFF ─────────────────────────────────────────────────────────────
  { id: 115, hero: FLAGSTAFF_PINES  },  // Coconino Center for the Arts
  { id: 191, hero: GALLERY_SKYLIGHTS},  // NAU Art Museum
  { id: 192, hero: FLAGSTAFF_PINES  },  // The Artists Gallery Flagstaff
  { id: 193, hero: GALLERY_VISITOR  },  // Flagstaff Arts Council

  // ── JEROME ────────────────────────────────────────────────────────────────
  { id: 171, hero: SW_POTTERY       },  // Raku Gallery — ceramics
  { id: 172, hero: JEROME_MURAL     },  // Jerome Art Walk — street art nearby
  { id: 173, hero: SEDONA_RED_ROCKS_1 }, // Priceless Pieces Fine Art — Verde Valley

  // ── MESA ──────────────────────────────────────────────────────────────────
  { id: 185, hero: GALLERY_HALLWAY  },  // Mesa Arts Center
  { id: 186, hero: GALLERY_REFLECTIVE}, // Mesa Contemporary Arts Museum
  { id: 187, hero: GALLERY_LIGHTS   },  // Galeria Mesa

  // ── PHOENIX ───────────────────────────────────────────────────────────────
  { id: 34,  hero: SW_POTTERY       },  // Heard Museum — Native American art
  { id: 36,  hero: GALLERY_LIGHTS   },  // Modified Arts
  { id: 37,  hero: GALLERY_HALLWAY  },  // Bentley Gallery Phoenix
  { id: 38,  hero: GALLERY_REFLECTIVE}, // Perihelion Arts
  { id: 39,  hero: SAGUARO_CACTUS   },  // Cattle Track Artists Residency — desert studio
  { id: 125, hero: GALLERY_VISITOR  },  // George Washington Carver Museum
  { id: 126, hero: GALLERY_FRAMED   },  // Arizona Latino Arts and Cultural Center
  { id: 194, hero: GALLERY_COLORFUL },  // Icehouse Gallery — Roosevelt Row
  { id: 195, hero: GALLERY_FRAMED   },  // monOrchid
  { id: 196, hero: GALLERY_SKYLIGHTS},  // Unexpected Gallery

  // ── PRESCOTT ──────────────────────────────────────────────────────────────
  { id: 178, hero: WATSON_LAKE      },  // Phippen Museum — replace logo with Watson Lake
  { id: 179, hero: WATSON_LAKE      },  // Mountain Artists Guild Gallery
  { id: 180, hero: SW_POTTERY       },  // Smoki Museum — Native American artifacts
  { id: 181, hero: GALLERY_LIGHTS   },  // Prescott Fine Arts Association

  // ── SCOTTSDALE ────────────────────────────────────────────────────────────
  { id: 1,   hero: TALIESIN_SCULPTURE_1 }, // Exposures International Fine Art
  { id: 3,   hero: WESTERN_ART          }, // Trailside Galleries — Western art
  { id: 4,   hero: TALIESIN_SCULPTURE_2 }, // Legacy Gallery
  { id: 6,   hero: GALLERY_HALLWAY      }, // Bentley Gallery Scottsdale
  { id: 9,   hero: GALLERY_SKYLIGHTS    }, // Scottsdale Museum of Contemporary Art
  { id: 10,  hero: TALIESIN_SCULPTURE_1 }, // Overland Gallery of Fine Art
  { id: 12,  hero: GALLERY_COLORFUL     }, // Eye Lounge
  { id: 13,  hero: WESTERN_ART          }, // John C. Tanner Fine Art
  { id: 14,  hero: TALIESIN_SCULPTURE_2 }, // Cattle Track Arts Compound
  { id: 15,  hero: TALIESIN_SCULPTURE_1 }, // Scottsdale Arts
  { id: 137, hero: WESTERN_ART          }, // Western Spirit: Scottsdale's Museum of the West

  // ── SEDONA ────────────────────────────────────────────────────────────────
  { id: 16,  hero: SEDONA_RED_ROCKS_1 }, // Exposures International Gallery (Sedona)
  { id: 17,  hero: SEDONA_RED_ROCKS_2 }, // Lanning Gallery
  { id: 18,  hero: SEDONA_RED_ROCKS_1 }, // Mountain Trails Gallery
  { id: 20,  hero: SW_POTTERY          }, // Turquoise Tortoise Gallery — native crafts
  { id: 21,  hero: SEDONA_RED_ROCKS_2 }, // Parks Gallery
  { id: 22,  hero: GALLERY_COLORFUL    }, // Renee Taylor Gallery — abstract/contemporary
  { id: 23,  hero: SEDONA_RED_ROCKS_1 }, // Goldenstein Gallery
  { id: 24,  hero: SEDONA_RED_ROCKS_2 }, // Gallery 527

  // ── TEMPE ─────────────────────────────────────────────────────────────────
  { id: 182, hero: TEMPE_LAKE        },  // ASU Art Museum
  { id: 183, hero: TEMPE_LAKE        },  // Tempe Center for the Arts
  { id: 184, hero: GALLERY_FRAMED    },  // Eye Lounge Tempe

  // ── TUCSON ────────────────────────────────────────────────────────────────
  { id: 26,  hero: GALLERY_VISITOR  },  // Davis Dominguez Gallery
  { id: 27,  hero: TUCSON_CITY_2    },  // Tucson Museum of Art
  { id: 30,  hero: GALLERY_SKYLIGHTS},  // Dinnerware Artspace
  { id: 122, hero: TUCSON_CITY_1    },  // Arizona State Museum
  { id: 123, hero: TUCSON_CITY_1    },  // Ignite Sign Art Museum
  { id: 124, hero: SW_POTTERY       },  // Tucson Clay Co-op — ceramics
];

console.log(`Updating ${updates.length} AZ listings with hero images…\n`);
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
  WHERE state_code = 'AZ' AND status = 'approved' AND deleted_at IS NULL
  AND hero_image_url IS NOT NULL
`;
const [{ total }] = await sql`
  SELECT COUNT(*) AS total FROM listings
  WHERE state_code = 'AZ' AND status = 'approved' AND deleted_at IS NULL
`;
console.log(`AZ listings with hero image: ${n}/${total}`);
