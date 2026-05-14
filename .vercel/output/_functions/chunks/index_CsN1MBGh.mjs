import { c as createComponent } from './astro-component_DO6uffhK.mjs';
import 'piccolore';
import { r as renderTemplate, u as unescapeHTML, h as addAttribute, m as maybeRenderHead, n as renderComponent } from './entrypoint_D_jqxEgy.mjs';
import { a as createSubmission, $ as $$Base } from './queries_DBYA1Jl8.mjs';
import 'clsx';
import { z } from 'zod';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$BreadcrumbNav = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$BreadcrumbNav;
  const { crumbs } = Astro2.props;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...c.href ? { item: new URL(c.href, Astro2.site).toString() } : {}
    }))
  };
  return renderTemplate(_a || (_a = __template(["", '<nav aria-label="Breadcrumb" class="breadcrumb" data-astro-cid-xxae4cpn> <ol data-astro-cid-xxae4cpn> ', ' </ol> </nav> <script type="application/ld+json">', "<\/script>"])), maybeRenderHead(), crumbs.map((c, i) => renderTemplate`<li data-astro-cid-xxae4cpn> ${c.href && i < crumbs.length - 1 ? renderTemplate`<a${addAttribute(c.href, "href")} data-astro-cid-xxae4cpn>${c.label}</a>` : renderTemplate`<span aria-current="page" data-astro-cid-xxae4cpn>${c.label}</span>`} </li>`), unescapeHTML(JSON.stringify(schema)));
}, "/Users/laresistenciapress/southwest-galleries/src/components/BreadcrumbNav.astro", void 0);

const US_STATES = ["AZ", "CO", "NM", "NV", "TX", "UT", "CA"];
const LISTING_TYPES = [
  "gallery",
  "museum",
  "cultural_center",
  "artist_studio",
  "art_fair",
  "sculpture_park",
  "auction_house",
  "art_school"
];
const submissionSchema = z.object({
  name: z.string().min(2).max(200),
  listing_type: z.enum(LISTING_TYPES),
  state_code: z.enum(US_STATES),
  city_name: z.string().min(2).max(100),
  address: z.string().max(300).optional(),
  website_url: z.string().url().optional().or(z.literal("")),
  phone: z.string().max(30).optional(),
  email: z.string().email().optional().or(z.literal("")),
  description: z.string().max(2e3).optional(),
  art_styles: z.array(z.string()).optional(),
  submitter_name: z.string().max(100).optional(),
  submitter_email: z.string().email(),
  submitter_note: z.string().max(500).optional()
});

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  let success = false;
  let errors = {};
  let formData = {};
  if (Astro2.request.method === "POST") {
    const raw = await Astro2.request.formData();
    formData = Object.fromEntries(raw.entries());
    const result = submissionSchema.safeParse({
      ...formData,
      art_styles: raw.getAll("art_styles")
    });
    if (result.success) {
      await createSubmission(result.data);
      success = true;
    } else {
      for (const [field, issues] of Object.entries(result.error.flatten().fieldErrors)) {
        errors[field] = issues?.[0] ?? "Invalid";
      }
    }
  }
  const ART_STYLES = [
    { value: "native-american", label: "Native American" },
    { value: "contemporary", label: "Contemporary" },
    { value: "western-cowboy", label: "Western & Cowboy" },
    { value: "landscape-plein-air", label: "Landscape & Plein Air" },
    { value: "ceramics-pottery", label: "Ceramics & Pottery" },
    { value: "sculpture", label: "Sculpture" },
    { value: "photography", label: "Photography" },
    { value: "jewelry", label: "Jewelry" },
    { value: "glass-art", label: "Glass Art" },
    { value: "abstract", label: "Abstract" },
    { value: "figurative", label: "Figurative" },
    { value: "adobe-pueblo", label: "Adobe & Pueblo" }
  ];
  const STATES = [
    { value: "AZ", label: "Arizona" },
    { value: "CO", label: "Colorado" },
    { value: "NM", label: "New Mexico" },
    { value: "NV", label: "Nevada" },
    { value: "TX", label: "Texas" },
    { value: "UT", label: "Utah" },
    { value: "CA", label: "California" }
  ];
  const TYPES = [
    { value: "gallery", label: "Gallery" },
    { value: "museum", label: "Museum" },
    { value: "cultural_center", label: "Cultural Center" },
    { value: "artist_studio", label: "Artist Studio" },
    { value: "art_fair", label: "Art Fair" },
    { value: "sculpture_park", label: "Sculpture Park" },
    { value: "auction_house", label: "Auction House" },
    { value: "art_school", label: "Art School" }
  ];
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": "Submit a Listing | Southwest Galleries", "description": "Add your gallery, museum, or cultural venue to the Southwest Galleries directory.", "data-astro-cid-t435h5vq": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="page-header" data-astro-cid-t435h5vq> <div class="container" data-astro-cid-t435h5vq> ${renderComponent($$result2, "BreadcrumbNav", $$BreadcrumbNav, { "crumbs": [{ label: "Home", href: "/" }, { label: "Submit a Listing" }], "data-astro-cid-t435h5vq": true })} <h1 data-astro-cid-t435h5vq>Submit a Listing</h1> <p data-astro-cid-t435h5vq>List your gallery, museum, or cultural venue. Free listings are reviewed within 2–3 business days.</p> </div> </div> <div class="container form-container" data-astro-cid-t435h5vq> ${success ? renderTemplate`<div class="success-box" data-astro-cid-t435h5vq> <h2 data-astro-cid-t435h5vq>Submission received!</h2> <p data-astro-cid-t435h5vq>Thank you for submitting your listing. We'll review it and publish it within 2–3 business days.</p> <a href="/" class="btn" data-astro-cid-t435h5vq>Return Home</a> </div>` : renderTemplate`<form method="POST" novalidate data-astro-cid-t435h5vq> <fieldset data-astro-cid-t435h5vq> <legend data-astro-cid-t435h5vq>Venue Information</legend> <div class="field" data-astro-cid-t435h5vq> <label for="name" data-astro-cid-t435h5vq>Venue Name *</label> <input type="text" id="name" name="name"${addAttribute(formData.name ?? "", "value")} required data-astro-cid-t435h5vq> ${errors.name && renderTemplate`<span class="error" data-astro-cid-t435h5vq>${errors.name}</span>`} </div> <div class="field-row" data-astro-cid-t435h5vq> <div class="field" data-astro-cid-t435h5vq> <label for="listing_type" data-astro-cid-t435h5vq>Type *</label> <select id="listing_type" name="listing_type" required data-astro-cid-t435h5vq> <option value="" data-astro-cid-t435h5vq>Select type…</option> ${TYPES.map((t) => renderTemplate`<option${addAttribute(t.value, "value")}${addAttribute(formData.listing_type === t.value, "selected")} data-astro-cid-t435h5vq>${t.label}</option>`)} </select> ${errors.listing_type && renderTemplate`<span class="error" data-astro-cid-t435h5vq>${errors.listing_type}</span>`} </div> <div class="field" data-astro-cid-t435h5vq> <label for="state_code" data-astro-cid-t435h5vq>State *</label> <select id="state_code" name="state_code" required data-astro-cid-t435h5vq> <option value="" data-astro-cid-t435h5vq>Select state…</option> ${STATES.map((s) => renderTemplate`<option${addAttribute(s.value, "value")}${addAttribute(formData.state_code === s.value, "selected")} data-astro-cid-t435h5vq>${s.label}</option>`)} </select> ${errors.state_code && renderTemplate`<span class="error" data-astro-cid-t435h5vq>${errors.state_code}</span>`} </div> </div> <div class="field-row" data-astro-cid-t435h5vq> <div class="field" data-astro-cid-t435h5vq> <label for="city_name" data-astro-cid-t435h5vq>City *</label> <input type="text" id="city_name" name="city_name"${addAttribute(formData.city_name ?? "", "value")} required data-astro-cid-t435h5vq> ${errors.city_name && renderTemplate`<span class="error" data-astro-cid-t435h5vq>${errors.city_name}</span>`} </div> <div class="field" data-astro-cid-t435h5vq> <label for="address" data-astro-cid-t435h5vq>Street Address</label> <input type="text" id="address" name="address"${addAttribute(formData.address ?? "", "value")} data-astro-cid-t435h5vq> </div> </div> <div class="field-row" data-astro-cid-t435h5vq> <div class="field" data-astro-cid-t435h5vq> <label for="website_url" data-astro-cid-t435h5vq>Website URL</label> <input type="url" id="website_url" name="website_url"${addAttribute(formData.website_url ?? "", "value")} placeholder="https://" data-astro-cid-t435h5vq> ${errors.website_url && renderTemplate`<span class="error" data-astro-cid-t435h5vq>${errors.website_url}</span>`} </div> <div class="field" data-astro-cid-t435h5vq> <label for="phone" data-astro-cid-t435h5vq>Phone</label> <input type="tel" id="phone" name="phone"${addAttribute(formData.phone ?? "", "value")} data-astro-cid-t435h5vq> </div> </div> <div class="field" data-astro-cid-t435h5vq> <label for="email" data-astro-cid-t435h5vq>Venue Email</label> <input type="email" id="email" name="email"${addAttribute(formData.email ?? "", "value")} data-astro-cid-t435h5vq> ${errors.email && renderTemplate`<span class="error" data-astro-cid-t435h5vq>${errors.email}</span>`} </div> <div class="field" data-astro-cid-t435h5vq> <label for="description" data-astro-cid-t435h5vq>Description</label> <textarea id="description" name="description"${addAttribute(5, "rows")} data-astro-cid-t435h5vq>${formData.description ?? ""}</textarea> <span class="hint" data-astro-cid-t435h5vq>Tell visitors what makes your venue special. Max 2,000 characters.</span> </div> <div class="field" data-astro-cid-t435h5vq> <label data-astro-cid-t435h5vq>Art Styles (select all that apply)</label> <div class="checkbox-grid" data-astro-cid-t435h5vq> ${ART_STYLES.map((s) => renderTemplate`<label class="checkbox-label" data-astro-cid-t435h5vq> <input type="checkbox" name="art_styles"${addAttribute(s.value, "value")} data-astro-cid-t435h5vq> ${s.label} </label>`)} </div> </div> </fieldset> <fieldset data-astro-cid-t435h5vq> <legend data-astro-cid-t435h5vq>Your Information</legend> <div class="field-row" data-astro-cid-t435h5vq> <div class="field" data-astro-cid-t435h5vq> <label for="submitter_name" data-astro-cid-t435h5vq>Your Name</label> <input type="text" id="submitter_name" name="submitter_name"${addAttribute(formData.submitter_name ?? "", "value")} data-astro-cid-t435h5vq> </div> <div class="field" data-astro-cid-t435h5vq> <label for="submitter_email" data-astro-cid-t435h5vq>Your Email *</label> <input type="email" id="submitter_email" name="submitter_email"${addAttribute(formData.submitter_email ?? "", "value")} required data-astro-cid-t435h5vq> ${errors.submitter_email && renderTemplate`<span class="error" data-astro-cid-t435h5vq>${errors.submitter_email}</span>`} </div> </div> <div class="field" data-astro-cid-t435h5vq> <label for="submitter_note" data-astro-cid-t435h5vq>Anything else we should know?</label> <textarea id="submitter_note" name="submitter_note"${addAttribute(3, "rows")} data-astro-cid-t435h5vq>${formData.submitter_note ?? ""}</textarea> </div> </fieldset> <button type="submit" class="submit-btn" data-astro-cid-t435h5vq>Submit Listing</button> </form>`} </div> ` })}`;
}, "/Users/laresistenciapress/southwest-galleries/src/pages/submit/index.astro", void 0);

const $$file = "/Users/laresistenciapress/southwest-galleries/src/pages/submit/index.astro";
const $$url = "/submit";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
