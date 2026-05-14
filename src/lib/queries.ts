import sql from './db';

export async function getStates() {
  return sql`
    SELECT code, name, slug, description, hero_image_url, meta_title, meta_description, gallery_count
    FROM states
    ORDER BY name
  `;
}

export async function getState(slug: string) {
  const rows = await sql`
    SELECT code, name, slug, description, hero_image_url, meta_title, meta_description, gallery_count
    FROM states WHERE slug = ${slug}
  `;
  return rows[0] ?? null;
}

export async function getCitiesByState(stateCode: string) {
  return sql`
    SELECT id, name, slug, description, hero_image_url, meta_title, meta_description, gallery_count, latitude, longitude
    FROM cities
    WHERE state_code = ${stateCode}
    ORDER BY gallery_count DESC, name
  `;
}

export async function getCity(stateCode: string, citySlug: string) {
  const rows = await sql`
    SELECT id, name, slug, description, hero_image_url, meta_title, meta_description, gallery_count, latitude, longitude, state_code
    FROM cities
    WHERE state_code = ${stateCode} AND slug = ${citySlug}
  `;
  return rows[0] ?? null;
}

export async function getListingsByCity(cityId: number) {
  return sql`
    SELECT l.id, l.slug, l.name, l.listing_type, l.tier, l.short_description,
           l.hero_image_url, l.address_line1, l.neighborhood, l.website_url, l.phone,
           l.latitude, l.longitude
    FROM listings l
    WHERE l.city_id = ${cityId}
      AND l.status = 'approved'
      AND l.deleted_at IS NULL
    ORDER BY
      CASE l.tier WHEN 'premium' THEN 1 WHEN 'featured' THEN 2 WHEN 'basic' THEN 3 ELSE 4 END,
      l.name
  `;
}

export async function getListingsByState(stateCode: string) {
  return sql`
    SELECT l.id, l.slug, l.name, l.listing_type, l.tier, l.short_description,
           l.hero_image_url, l.address_line1, l.neighborhood, l.website_url,
           c.name AS city_name, c.slug AS city_slug
    FROM listings l
    LEFT JOIN cities c ON c.id = l.city_id
    WHERE l.state_code = ${stateCode}
      AND l.status = 'approved'
      AND l.deleted_at IS NULL
    ORDER BY
      CASE l.tier WHEN 'premium' THEN 1 WHEN 'featured' THEN 2 WHEN 'basic' THEN 3 ELSE 4 END,
      l.name
  `;
}

export async function getListing(slug: string) {
  const rows = await sql`
    SELECT l.*,
           c.name AS city_name, c.slug AS city_slug,
           s.name AS state_name, s.slug AS state_slug
    FROM listings l
    LEFT JOIN cities c ON c.id = l.city_id
    LEFT JOIN states s ON s.code = l.state_code
    WHERE l.slug = ${slug}
      AND l.status = 'approved'
      AND l.deleted_at IS NULL
  `;
  return rows[0] ?? null;
}

export async function getListingArtStyles(listingId: number) {
  return sql`
    SELECT a.id, a.name, a.slug
    FROM art_styles a
    JOIN listing_art_styles las ON las.style_id = a.id
    WHERE las.listing_id = ${listingId}
    ORDER BY a.name
  `;
}

export async function getListingImages(listingId: number) {
  return sql`
    SELECT id, url, alt_text, caption, sort_order
    FROM listing_images
    WHERE listing_id = ${listingId}
    ORDER BY sort_order, id
  `;
}

export async function getAllApprovedListingSlugs() {
  return sql`SELECT slug FROM listings WHERE status = 'approved' AND deleted_at IS NULL`;
}

export async function getArtStyles() {
  return sql`SELECT id, name, slug, description, meta_title, meta_description FROM art_styles ORDER BY name`;
}

export async function getArtStyle(slug: string) {
  const rows = await sql`SELECT * FROM art_styles WHERE slug = ${slug}`;
  return rows[0] ?? null;
}

export async function getListingsByArtStyle(styleId: number) {
  return sql`
    SELECT l.id, l.slug, l.name, l.listing_type, l.tier, l.short_description,
           l.hero_image_url, l.neighborhood,
           c.name AS city_name, c.slug AS city_slug,
           s.name AS state_name, s.slug AS state_slug
    FROM listings l
    JOIN listing_art_styles las ON las.listing_id = l.id
    LEFT JOIN cities c ON c.id = l.city_id
    LEFT JOIN states s ON s.code = l.state_code
    WHERE las.style_id = ${styleId}
      AND l.status = 'approved'
      AND l.deleted_at IS NULL
    ORDER BY CASE l.tier WHEN 'premium' THEN 1 WHEN 'featured' THEN 2 WHEN 'basic' THEN 3 ELSE 4 END, l.name
  `;
}

export async function getPublishedPosts() {
  return sql`
    SELECT id, slug, title, excerpt, hero_image_url, author_name, published_at, state_code
    FROM posts
    WHERE is_published = true
    ORDER BY published_at DESC
  `;
}

export async function getPost(slug: string) {
  const rows = await sql`SELECT * FROM posts WHERE slug = ${slug} AND is_published = true`;
  return rows[0] ?? null;
}

export async function getPostListings(postId: number) {
  return sql`
    SELECT l.id, l.slug, l.name, l.listing_type, l.tier, l.short_description,
           l.hero_image_url, c.name AS city_name, c.slug AS city_slug,
           s.name AS state_name, s.slug AS state_slug
    FROM listings l
    JOIN post_listings pl ON pl.listing_id = l.id
    LEFT JOIN cities c ON c.id = l.city_id
    LEFT JOIN states s ON s.code = l.state_code
    WHERE pl.post_id = ${postId}
      AND l.status = 'approved'
      AND l.deleted_at IS NULL
    ORDER BY pl.sort_order, l.name
  `;
}

export async function recordListingView(listingId: number) {
  await sql`
    INSERT INTO listing_views (listing_id, view_date, view_count)
    VALUES (${listingId}, CURRENT_DATE, 1)
    ON CONFLICT (listing_id, view_date)
    DO UPDATE SET view_count = listing_views.view_count + 1
  `;
}

export async function getPendingSubmissions() {
  return sql`
    SELECT * FROM listing_submissions WHERE status = 'pending' ORDER BY created_at DESC
  `;
}

export async function updateSubmissionStatus(id: number, status: string, createdListingId?: number) {
  if (createdListingId) {
    await sql`
      UPDATE listing_submissions
      SET status = ${status}, reviewed_at = now(), created_listing_id = ${createdListingId}
      WHERE id = ${id}
    `;
  } else {
    await sql`
      UPDATE listing_submissions SET status = ${status}, reviewed_at = now() WHERE id = ${id}
    `;
  }
}

export async function createListing(data: Record<string, unknown>) {
  const rows = await sql`
    INSERT INTO listings (
      slug, name, listing_type, state_code, city_id, address_line1,
      website_url, phone, email, short_description, status
    ) VALUES (
      ${data.slug as string}, ${data.name as string}, ${data.listing_type as string},
      ${data.state_code as string}, ${data.city_id as number ?? null},
      ${data.address as string ?? null}, ${data.website_url as string ?? null},
      ${data.phone as string ?? null}, ${data.email as string ?? null},
      ${data.description as string ?? null}, 'approved'
    )
    RETURNING id
  `;
  return rows[0];
}

export async function createSubmission(data: Record<string, unknown>) {
  await sql`
    INSERT INTO listing_submissions (
      name, listing_type, state_code, city_name, address,
      website_url, phone, email, description, art_styles,
      submitter_name, submitter_email, submitter_note, status
    ) VALUES (
      ${data.name as string}, ${data.listing_type as string}, ${data.state_code as string},
      ${data.city_name as string}, ${data.address as string ?? null},
      ${data.website_url as string ?? null}, ${data.phone as string ?? null},
      ${data.email as string ?? null}, ${data.description as string ?? null},
      ${data.art_styles as string[] ?? []}, ${data.submitter_name as string ?? null},
      ${data.submitter_email as string}, ${data.submitter_note as string ?? null},
      'pending'
    )
  `;
}
