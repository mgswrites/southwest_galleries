import { c as createComponent } from './astro-component_DO6uffhK.mjs';
import 'piccolore';
import { h as addAttribute, r as renderTemplate, u as unescapeHTML, o as renderSlot, p as renderHead } from './entrypoint_D_jqxEgy.mjs';
import 'clsx';
import { neon } from '@neondatabase/serverless';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Base = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Base;
  const {
    title,
    description = "The definitive art and cultural directory for the American Southwest. Find galleries, museums, and cultural centers across Arizona, New Mexico, Colorado, and beyond.",
    canonical = new URL(Astro2.url.pathname, Astro2.site).toString(),
    ogImage = "/og-default.jpg",
    schema
  } = Astro2.props;
  const schemaBlocks = schema ? Array.isArray(schema) ? schema : [schema] : [];
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title><meta name="description"${addAttribute(description, "content")}><link rel="canonical"${addAttribute(canonical, "href")}><!-- Open Graph --><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:url"${addAttribute(canonical, "content")}><meta property="og:image"${addAttribute(new URL(ogImage, Astro2.site).toString(), "content")}><meta property="og:type" content="website"><meta property="og:site_name" content="Southwest Galleries"><!-- Twitter Card --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(title, "content")}><meta name="twitter:description"${addAttribute(description, "content")}><meta name="twitter:image"${addAttribute(new URL(ogImage, Astro2.site).toString(), "content")}><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" href="/favicon.ico"><!-- JSON-LD -->${schemaBlocks.map((s) => renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(s))))}${renderSlot($$result, $$slots["head"])}${renderHead()}</head> <body> <header> <nav> <a href="/" class="logo">Southwest Galleries</a> <ul> <li><a href="/galleries/">Galleries</a></li> <li><a href="/museums/arizona/">Museums</a></li> <li><a href="/art-styles/">Art Styles</a></li> <li><a href="/guides/">Guides</a></li> <li><a href="/events/">Events</a></li> <li><a href="/submit/" class="cta">Submit Listing</a></li> </ul> </nav> </header> <main> ${renderSlot($$result, $$slots["default"])} </main> <footer> <div class="footer-inner"> <div> <strong>Southwest Galleries</strong> <p>The definitive art directory for the American Southwest.</p> </div> <div> <strong>Browse</strong> <ul> <li><a href="/galleries/arizona/">Arizona</a></li> <li><a href="/galleries/new-mexico/">New Mexico</a></li> <li><a href="/galleries/colorado/">Colorado</a></li> <li><a href="/galleries/nevada/">Nevada</a></li> <li><a href="/galleries/utah/">Utah</a></li> </ul> </div> <div> <strong>Discover</strong> <ul> <li><a href="/art-styles/">Art Styles</a></li> <li><a href="/guides/">Guides</a></li> <li><a href="/events/">Events</a></li> </ul> </div> <div> <strong>List Your Venue</strong> <ul> <li><a href="/submit/">Submit a Listing</a></li> </ul> </div> </div> <p class="footer-copy">&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} SouthwestGalleries.com. All rights reserved.</p> </footer></body></html>`;
}, "/Users/laresistenciapress/southwest-galleries/src/layouts/Base.astro", void 0);

const sql = neon("postgresql://neondb_owner:npg_YJOgM37SCsez@ep-old-meadow-akb0unyr-pooler.c-3.us-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require");

async function getPendingSubmissions() {
  return sql`
    SELECT * FROM listing_submissions WHERE status = 'pending' ORDER BY created_at DESC
  `;
}
async function updateSubmissionStatus(id, status, createdListingId) {
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
async function createListing(data) {
  const rows = await sql`
    INSERT INTO listings (
      slug, name, listing_type, state_code, city_id, address_line1,
      website_url, phone, email, short_description, status
    ) VALUES (
      ${data.slug}, ${data.name}, ${data.listing_type},
      ${data.state_code}, ${data.city_id ?? null},
      ${data.address ?? null}, ${data.website_url ?? null},
      ${data.phone ?? null}, ${data.email ?? null},
      ${data.description ?? null}, 'approved'
    )
    RETURNING id
  `;
  return rows[0];
}
async function createSubmission(data) {
  await sql`
    INSERT INTO listing_submissions (
      name, listing_type, state_code, city_name, address,
      website_url, phone, email, description, art_styles,
      submitter_name, submitter_email, submitter_note, status
    ) VALUES (
      ${data.name}, ${data.listing_type}, ${data.state_code},
      ${data.city_name}, ${data.address ?? null},
      ${data.website_url ?? null}, ${data.phone ?? null},
      ${data.email ?? null}, ${data.description ?? null},
      ${data.art_styles ?? []}, ${data.submitter_name ?? null},
      ${data.submitter_email}, ${data.submitter_note ?? null},
      'pending'
    )
  `;
}

export { $$Base as $, createSubmission as a, createListing as c, getPendingSubmissions as g, sql as s, updateSubmissionStatus as u };
