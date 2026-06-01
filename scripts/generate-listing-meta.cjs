const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.NEON_DB_KEY);

const typeLabel = {
  gallery: 'Art Gallery',
  museum: 'Museum',
  cultural_center: 'Cultural Center',
  artist_studio: 'Artist Studio',
  art_school: 'Art School',
  sculpture_park: 'Sculpture Park',
  auction_house: 'Auction House',
  art_fair: 'Art Fair',
};

function buildTitle(name, type, city, stateCode) {
  const label = typeLabel[type] || 'Art Venue';
  const base = `${name} | ${label} in ${city}, ${stateCode}`;
  // Keep under 65 chars; if too long, drop "| Southwest Galleries" suffix
  if (base.length <= 55) return `${base} | Southwest Galleries`;
  if (base.length <= 65) return base;
  // Name is very long — shorten to just name + city
  const short = `${name} | ${city}, ${stateCode}`;
  return short.length <= 65 ? short : name.slice(0, 55) + '…';
}

function buildDescription(name, type, shortDesc, city, state) {
  const label = typeLabel[type] || 'art venue';

  if (!shortDesc) {
    return `Visit ${name}, a ${label.toLowerCase()} in ${city}, ${state}. Browse exhibits, hours, and visitor information on Southwest Galleries.`;
  }

  // Check if the description already mentions the city or state
  const descLower = shortDesc.toLowerCase();
  const cityMentioned = descLower.includes(city.toLowerCase());
  const stateMentioned = descLower.includes(state.toLowerCase());

  let desc = shortDesc.trim();
  // Ensure it ends with a period
  if (!/[.!?]$/.test(desc)) desc += '.';

  // If already 140+ chars, just truncate cleanly
  if (desc.length >= 140) {
    // Truncate at last space before 155 chars
    const truncated = desc.slice(0, 155);
    const lastSpace = truncated.lastIndexOf(' ');
    return truncated.slice(0, lastSpace) + '…';
  }

  // Append location context if not already present and room allows
  if (!cityMentioned && !stateMentioned) {
    const suffix = ` Located in ${city}, ${state}.`;
    if ((desc + suffix).length <= 160) {
      return desc + suffix;
    }
  } else if (!cityMentioned && stateMentioned) {
    const suffix = ` Located in ${city}.`;
    if ((desc + suffix).length <= 160) {
      return desc + suffix;
    }
  }

  return desc;
}

async function run() {
  const listings = await sql`
    SELECT l.id, l.slug, l.name, l.listing_type, l.short_description,
           c.name AS city, s.name AS state, s.code AS state_code
    FROM listings l
    LEFT JOIN cities c ON c.id = l.city_id
    LEFT JOIN states s ON s.code = l.state_code
    WHERE l.status = 'approved' AND l.deleted_at IS NULL
    ORDER BY l.name
  `;

  console.log(`Generating meta for ${listings.length} listings...`);

  let updated = 0;
  let tooLong = 0;

  for (const l of listings) {
    const meta_title = buildTitle(l.name, l.listing_type, l.city, l.state_code);
    const meta_description = buildDescription(l.name, l.listing_type, l.short_description, l.city, l.state);

    if (meta_title.length > 70) {
      console.warn(`  ⚠ Long title (${meta_title.length}): ${meta_title}`);
      tooLong++;
    }
    if (meta_description.length > 165) {
      console.warn(`  ⚠ Long desc (${meta_description.length}): ${l.slug}`);
    }

    await sql`
      UPDATE listings SET meta_title = ${meta_title}, meta_description = ${meta_description}
      WHERE id = ${l.id}
    `;
    updated++;
  }

  console.log(`\nDone. Updated ${updated} listings. ${tooLong} titles over 70 chars.`);
  process.exit(0);
}

run().catch(e => { console.error(e.message); process.exit(1); });
