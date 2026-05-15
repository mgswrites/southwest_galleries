import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.NEON_DB_KEY);

// listing IDs for association
// AZ: Medicine Man Gallery=8, Cosanti=11, Lisa Sette=5
// NM: Georgia O'Keeffe Museum=49, Andrew Smith Gallery=47, Blue Rain Gallery=42
// CO: Aspen Art Museum=87

const artists = [
  {
    name: 'R.C. Gorman',
    slug: 'rc-gorman',
    bio: `Rudolph Carl Gorman (1931–2005) was a Navajo artist born in Chinle, Arizona, celebrated as "the Picasso of American Indian artists" by The New York Times. Working primarily from his studio and gallery in Taos, New Mexico, Gorman developed a distinctive figurative style featuring full, flowing forms of Pueblo women rendered in lithography, silkscreen, and oil. His works are held in the permanent collections of the Smithsonian, the Museum of Modern Art, and dozens of other major institutions. Gorman's warm, rounded forms drew on both his Navajo heritage and his studies in Mexico City under Diego Rivera's influence, creating a signature aesthetic immediately recognizable across the Southwest.`,
    state_code: 'NM',
    city_id: 7, // Taos
    website_url: 'https://rcgormanart.com',
    meta_title: 'R.C. Gorman — Navajo Artist | Southwest Galleries',
    meta_description: 'R.C. Gorman, the Navajo artist known as the Picasso of American Indian art, worked from Taos, NM. Explore his legacy and associated Southwest galleries.',
  },
  {
    name: 'Georgia O\'Keeffe',
    slug: 'georgia-okeeffe',
    bio: `Georgia O'Keeffe (1887–1986) is one of the most significant American artists of the twentieth century. After decades in New York, she settled permanently in New Mexico — first in Abiquiú, then Ghost Ranch — where the red and ochre cliffs, bleached animal skulls, and high desert light became the defining subjects of her mature work. Her large-format flower paintings, New York skyscrapers, and Southwestern landscapes transformed American modernism. The Georgia O'Keeffe Museum in Santa Fe, New Mexico, holds the largest collection of her work in the world and continues her legacy through exhibitions, research, and educational programs.`,
    state_code: 'NM',
    city_id: 6, // Santa Fe
    website_url: 'https://www.okeeffemuseum.org',
    meta_title: "Georgia O'Keeffe — American Modernist | Southwest Galleries",
    meta_description: "Georgia O'Keeffe shaped American modernism from her New Mexico home. Explore her legacy, the O'Keeffe Museum in Santa Fe, and her Southwestern inspiration.",
  },
  {
    name: 'Fritz Scholder',
    slug: 'fritz-scholder',
    bio: `Fritz Scholder (1937–2005) was a Luiseño artist who radically challenged the conventions of Native American art. Born in Breckenridge, Minnesota, he studied under Wayne Thiebaud and later taught at the Institute of American Indian Arts in Santa Fe. His paintings — vivid, expressionistic, often unsettling — depicted Native Americans in ways that broke from both romanticized tradition and assimilationist art. His "Indian" series caused significant controversy and significant acclaim simultaneously, earning him a place among the most influential American artists of the latter twentieth century. Scholder maintained studios in Scottsdale and Taos throughout his career.`,
    state_code: 'AZ',
    city_id: 1, // Scottsdale
    meta_title: 'Fritz Scholder — Native American Expressionist | Southwest Galleries',
    meta_description: 'Fritz Scholder broke the mold of Native American art with bold expressionist paintings. Explore his legacy in Scottsdale, Santa Fe, and beyond.',
  },
  {
    name: 'Allan Houser',
    slug: 'allan-houser',
    bio: `Allan Houser (1914–1994), born Haozous, was a Warm Springs Chiricahua Apache sculptor and painter regarded as the father of modern Native American sculpture. Born in Apache, Oklahoma, he spent much of his life and career in Santa Fe and the surrounding New Mexico high desert. His monumental bronze sculptures — many depicting Apache women, warriors, and ceremonial figures in elegant, abstracted forms — appear in the collections of the Smithsonian Institution, the Metropolitan Museum of Art, and the White House. The Houser Foundation preserves his estate outside Santa Fe and continues to promote his work and the work of emerging Native artists.`,
    state_code: 'NM',
    city_id: 6, // Santa Fe
    meta_title: 'Allan Houser — Father of Modern Native American Sculpture | Southwest Galleries',
    meta_description: 'Allan Houser shaped modern Native American sculpture from his Santa Fe studio. His bronzes are held in the Smithsonian, the Met, and the White House.',
  },
  {
    name: 'Ed Mell',
    slug: 'ed-mell',
    bio: `Ed Mell (born 1942) is an Arizona artist whose angular, almost cubist landscapes have defined a visual language for the Southwestern desert. Born in Phoenix and trained at the Art Center College of Design in Los Angeles, Mell worked as a commercial illustrator in New York before returning to Arizona in the 1970s to paint full-time. His paintings — with their dramatic cloudbursts, cactus silhouettes, and blocky mesa formations — fuse art deco geometry with the palette of the Sonoran Desert. His work has been exhibited widely in Scottsdale galleries and is held in private and corporate collections throughout the country.`,
    state_code: 'AZ',
    city_id: 4, // Phoenix
    meta_title: 'Ed Mell — Arizona Desert Painter | Southwest Galleries',
    meta_description: 'Ed Mell paints the Sonoran Desert in bold, angular forms. His iconic Arizona landscapes are shown in Scottsdale and collected worldwide.',
  },
  {
    name: 'Elias Rivera',
    slug: 'elias-rivera',
    bio: `Elias Rivera is a New Mexico–based painter known for luminous depictions of New Mexican village life, santos, and the everyday ceremonies of Hispanic Catholic culture. Rivera's work draws on the New Mexican santos tradition — the carved and painted devotional figures that have been produced in the region for over three centuries — while translating it into contemporary oil painting. His figures, bathed in soft, interior light, occupy humble adobe spaces that feel both timeless and deeply particular to northern New Mexico. His work is shown in Santa Fe galleries and collected widely in the Southwest.`,
    state_code: 'NM',
    city_id: 6, // Santa Fe
    meta_title: 'Elias Rivera — New Mexico Painter | Southwest Galleries',
    meta_description: 'Elias Rivera captures New Mexican village life and santos tradition in luminous oil paintings shown in Santa Fe galleries.',
  },
  {
    name: 'John Coleman',
    slug: 'john-coleman',
    bio: `John Coleman (born 1949) is a Colorado sculptor and painter whose bronze works celebrate the American West — particularly the era of mountain men, Plains Indians, and the fur trade. Working from his studio in Loveland, Colorado, Coleman creates figures of remarkable narrative detail: trappers in heavy buffalo robes, warriors at rest, frontier women with children. His sculptures have earned more awards from the Prix de West Exhibition and Invitational at the National Cowboy & Western Heritage Museum than those of any other living artist. Coleman's work is represented by leading Western art galleries in Scottsdale, Denver, and Jackson Hole.`,
    state_code: 'CO',
    city_id: 9, // Denver
    meta_title: 'John Coleman — Western Bronze Sculptor | Southwest Galleries',
    meta_description: 'John Coleman sculpts the American West in richly detailed bronzes. The Prix de West–winning artist is represented by top Western art galleries in Scottsdale and Denver.',
  },
  {
    name: 'Kevin Red Star',
    slug: 'kevin-red-star',
    bio: `Kevin Red Star (born 1943) is a Crow artist from Lodge Grass, Montana, whose vivid paintings and prints celebrate Crow life and ceremony with bold colors and graphic intensity. He attended the Institute of American Indian Arts in Santa Fe — one of its first students — before going on to earn a fine arts degree from the San Francisco Art Institute. Red Star's paintings draw on photographic documentation of nineteenth-century Crow culture, animating historic dress, regalia, and ceremony in contemporary compositions of striking visual power. His work is collected internationally and shown in Scottsdale and Santa Fe galleries.`,
    state_code: 'NM',
    city_id: 6, // Santa Fe
    meta_title: 'Kevin Red Star — Crow Artist | Southwest Galleries',
    meta_description: 'Kevin Red Star paints Crow culture with bold graphic power. A founding student of the IAIA in Santa Fe, his work is collected internationally.',
  },
];

console.log(`Seeding ${artists.length} artists...`);

for (const artist of artists) {
  const rows = await sql`
    INSERT INTO artists (name, slug, bio, state_code, city_id, website_url, meta_title, meta_description)
    VALUES (
      ${artist.name}, ${artist.slug}, ${artist.bio},
      ${artist.state_code}, ${artist.city_id ?? null},
      ${artist.website_url ?? null}, ${artist.meta_title}, ${artist.meta_description}
    )
    ON CONFLICT (slug) DO NOTHING
    RETURNING id
  `;
  if (rows[0]) {
    console.log(`  ✓ ${artist.name} (id: ${rows[0].id})`);
  } else {
    console.log(`  - ${artist.name} (already exists)`);
  }
}

// Associate Georgia O'Keeffe with O'Keeffe Museum (listing_id=49)
const okeeffe = await sql`SELECT id FROM artists WHERE slug = 'georgia-okeeffe'`;
if (okeeffe[0]) {
  await sql`
    INSERT INTO artist_listings (artist_id, listing_id)
    VALUES (${okeeffe[0].id}, 49)
    ON CONFLICT DO NOTHING
  `;
  console.log("  → linked O'Keeffe to O'Keeffe Museum");
}

// Associate R.C. Gorman with Blue Rain Gallery (42) which shows Native art
const gorman = await sql`SELECT id FROM artists WHERE slug = 'rc-gorman'`;
if (gorman[0]) {
  await sql`
    INSERT INTO artist_listings (artist_id, listing_id)
    VALUES (${gorman[0].id}, 42)
    ON CONFLICT DO NOTHING
  `;
  console.log('  → linked R.C. Gorman to Blue Rain Gallery');
}

console.log('\nDone.');
