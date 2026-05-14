# SouthwestGalleries.com — Action Plan

Tasks are marked `[x]` when complete. Work through phases in order; items within a phase can run in parallel where noted.

---

## Phase 1 — MVP (Weeks 1–6)

### 1.1 Infrastructure Setup

- [x] Create Neon DB project and note connection strings (pooled + direct)
- [ ] Create Vercel project and link to GitHub repo
- [ ] Set all required environment variables in Vercel (see `Spec.md → Environment Variables`)
- [ ] Configure custom domain `southwestgalleries.com` on Vercel
- [ ] Confirm Astro project builds and deploys cleanly to Vercel

### 1.2 Database Migrations

- [x] Run ENUM definitions (`listing_type`, `listing_tier`, `submission_status`, `us_state`)
- [x] Create `states` table and seed with 7 state rows (AZ, CO, NM, NV, TX, UT, CA)
- [x] Create `cities` table
- [x] Create `listings` table with all columns
- [x] Add GIN index on `listings.search_vector`
- [x] Add all standard indexes on `listings`
- [x] Create and test `update_listing_search_vector` trigger
- [x] Create and test `set_updated_at` trigger
- [x] Create `art_styles` table and seed with 12 initial styles
- [x] Create `listing_art_styles` junction table
- [x] Create `listing_images` table
- [x] Create `events` table
- [x] Create `posts` table
- [x] Create `post_listings` junction table
- [x] Create `listing_owners` table
- [x] Create `listing_submissions` table
- [x] Create `listing_views` table
- [x] Create `city_gallery_summary` view
- [x] Seed priority cities (Scottsdale, Santa Fe, Denver, Sedona, Tucson, Aspen, Las Vegas, Taos, Phoenix, Albuquerque)

### 1.3 Astro Project Configuration

- [x] Configure `astro.config.mjs` — enable `@astrojs/sitemap`, set site URL, configure SSR adapter for Vercel
- [x] Set up `src/lib/db.ts` — Neon DB client using `@neondatabase/serverless`
- [x] Create `src/lib/queries.ts` — typed query functions for all major data fetches
- [x] Create `src/lib/schema.ts` — Zod validation schemas for form inputs
- [x] Set up base layout (`src/layouts/Base.astro`) with `<html lang="en">`, canonical tag, and meta slots
- [x] Configure `public/robots.txt` (block `/submit/`, `/admin/`, `/search/`)

### 1.4 Core Page Templates

- [x] Build homepage (`src/pages/index.astro`) — hero, featured cities, featured listings CTAs
- [x] Build state hub page (`src/pages/galleries/[state].astro`) — static, lists cities with gallery counts
- [x] Build city index page (`src/pages/galleries/[state]/[city].astro`) — static, lists approved listings
- [x] Build listing detail page (`src/pages/listing/[slug].astro`) — static, full venue profile
- [x] Build museums state hub (`src/pages/museums/[state].astro`)
- [x] Build museums city page (`src/pages/museums/[state]/[city].astro`)
- [x] Build all-listings index (`src/pages/galleries/index.astro`)

### 1.5 Components

- [x] `ListingCard.astro` — used on city and state pages; shows name, type, tier badge, short description, hero image
- [x] `ListingDetail.astro` — full listing view built inline in `listing/[slug].astro`
- [x] `BreadcrumbNav.astro` — renders breadcrumb trail and injects `BreadcrumbList` JSON-LD
- [x] `SchemaMarkup.astro` — JSON-LD rendering handled via `Base.astro` schema prop
- [x] `MapView.astro` — Leaflet map for city pages and listing pages

### 1.6 Submit Form (SSR)

- [x] Build `/submit/` page with form fields matching `listing_submissions` table
- [x] Implement server-side validation with Zod
- [x] On valid submission, insert into `listing_submissions` with `status = 'pending'`
- [x] Show confirmation message on success; surface validation errors on failure

### 1.7 Admin UI (SSR, Password-Protected)

- [x] Build `/admin/` dashboard — lists pending submissions with approve/reject controls
- [x] Implement simple password gate (env var `ADMIN_PASSWORD`; replace with proper auth in Phase 2)
- [x] Approve action: insert into `listings`, set `submission.status = 'approved'`, set `created_listing_id`
- [x] Reject/needs-info actions: update `submission.status` accordingly

### 1.8 SEO Foundations

- [x] Add unique `<title>` and `<meta name="description">` to every page template
- [x] Inject `BreadcrumbList` JSON-LD on all pages via `BreadcrumbNav.astro`
- [x] Inject `LocalBusiness` + `ArtGallery` JSON-LD on listing detail pages
- [x] Configure `@astrojs/sitemap` — include listings, cities, states, posts, events; exclude admin/submit/search
- [ ] Submit sitemap to Google Search Console on launch day
- [x] Verify `robots.txt` is served correctly at `southwestgalleries.com/robots.txt`

### 1.9 Initial Data Seeding

- [x] Source and seed 150–200 high-quality listings across Scottsdale, Santa Fe, Denver, Sedona, Tucson (108 seeded across 7 states)
- [x] Ensure each listing has: name, slug, listing_type, state_code, city_id, short_description, status='approved'
- [x] Verify `gallery_count` on `states` and `cities` reflects seeded data

### 1.10 Ads Setup

- [ ] Create Google AdSense account and get publisher ID
- [ ] Add AdSense script to `Base.astro` layout
- [ ] Place ad units: sidebar on listing pages (desktop), between cards on city pages, in-article on guides

### 1.11 Launch Checklist

- [x] Confirm all static pages build without errors (`astro build`)
- [ ] Verify Core Web Vitals on 3 representative pages (listing, city, homepage) using PageSpeed Insights
- [ ] Test `/submit/` form end-to-end
- [ ] Test `/admin/` approve flow end-to-end
- [x] Confirm sitemap.xml is generated and accessible
- [x] Confirm robots.txt is correct
- [ ] Set up Google Search Console and submit sitemap
- [ ] Deploy to production

---

## Phase 2 — Content & SEO (Weeks 7–16)

### 2.1 Art Style Taxonomy Pages

- [x] Build art style hub (`src/pages/art-styles/index.astro`)
- [x] Build art style detail page (`src/pages/art-styles/[style].astro`) — lists associated listings
- [x] Add art style links to listing detail pages (2–3 per listing)

### 2.2 Editorial Guides

- [x] Build guides hub (`src/pages/guides/index.astro`)
- [x] Build guide detail page (`src/pages/guides/[slug].astro`) — renders post content + embedded listing cards
- [x] Inject `Article` JSON-LD on guide pages
- [ ] Write and publish first 20+ editorial guides targeting priority keywords (see `Spec.md → Keyword Targets`)

### 2.3 Structured Data Completion

- [ ] Add `FAQPage` JSON-LD to all city and state hub pages
- [ ] Add `Event` JSON-LD to event pages
- [ ] Verify all structured data with Google's Rich Results Test

### 2.4 Search & Filtering (SSR)

- [ ] Build `/search/` SSR page with query input
- [ ] Implement full-text search using `plainto_tsquery` on `listings.search_vector`
- [ ] Add filter controls: listing type, state, city, art style, tier
- [ ] Add `ts_rank` ordering for relevance

### 2.5 Listing View Tracking

- [ ] On each listing page request (SSR) or via API route, upsert `listing_views` using `ON CONFLICT DO UPDATE SET view_count = view_count + 1`
- [ ] Build basic view count display on listing pages for Premium tier owners

### 2.6 Stripe Billing for Paid Tiers

- [ ] Create Stripe products and prices for Basic ($99/yr), Featured ($199/yr), Premium ($349/yr)
- [ ] Build upgrade flow: listing owner initiates from their claimed listing page
- [ ] Implement Stripe Checkout session creation (API route)
- [ ] Implement Stripe webhook handler: update `listing_owners` and `listings.tier` on subscription events
- [ ] Handle subscription cancellation and expiry (downgrade tier back to free)

### 2.7 Internal Linking Audit

- [ ] Confirm listing pages link to city page, state page, 2–3 art style pages, 1–2 guides
- [ ] Confirm guide pages link to featured listings and city index
- [ ] Confirm city pages link to top 5 featured/premium listings + upcoming events + 1–2 guides

### 2.8 Link Outreach — Phase 1 Targets

- [ ] Submit directory to AZ Commission on the Arts
- [ ] Submit directory to Colorado Creative Industries
- [ ] Submit directory to New Mexico Arts
- [ ] Pitch VisitArizona "Arts & Culture" resource page
- [ ] Pitch New Mexico Tourism arts resources
- [ ] Pitch Colorado Tourism arts resources

---

## Phase 3 — Monetization & Scale (Months 5–12)

### 3.1 Events Section

- [ ] Build events index page (`src/pages/events/index.astro`) — filterable by state/city/date
- [ ] Build event detail pages (`src/pages/events/[slug].astro`)
- [ ] Inject `Event` JSON-LD on all event pages
- [ ] Add events submission flow (via `/submit/` or separate `/submit-event/` form)

### 3.2 Gallery Outreach for Paid Tiers

- [ ] Build "Claim Your Listing" flow: form where gallery owners claim an existing listing
- [ ] Email outreach to 300+ listed galleries with upgrade offer
- [ ] Target: 5% conversion = 15 paying customers at average $175/yr

### 3.3 Affiliate Integration

- [ ] Register for GetYourGuide affiliate program and get tracking links
- [ ] Register for Tiqets affiliate program
- [ ] Register for Viator affiliate program
- [ ] Register for Amazon Associates
- [ ] Register for Bookshop.org affiliate program
- [ ] Embed contextual affiliate links in published editorial guides
- [ ] Add affiliate tour/ticket links to relevant museum listing pages

### 3.4 Email Newsletter

- [ ] Set up Resend or ConvertKit account
- [ ] Add email capture widget to homepage, city pages, and guide footers
- [ ] Create welcome sequence (3 emails): intro to the directory, top galleries by region, collecting guide teaser
- [ ] Send first monthly newsletter once list hits 500 subscribers

### 3.5 Map Integration (Competitive Differentiator)

- [ ] Integrate Mapbox or Leaflet on city index pages — pin all approved listings
- [ ] Add individual listing map on each listing detail page
- [ ] Implement "Open Today" filter using `hours_json` data

### 3.6 Mediavine Preparation

- [ ] Monitor Google Analytics / Search Console for session growth monthly
- [ ] Apply to Mediavine when site reaches 50K monthly sessions
- [ ] Swap AdSense ad units for Mediavine ad units after approval

### 3.7 Artist Profiles (Phase 3 Feature)

- [ ] Design `artists` table schema (name, slug, bio, state, associated listings, art styles)
- [ ] Build artist profile pages (`/artists/[slug]/`)
- [ ] Build artist index (`/artists/`)
- [ ] Link artists to their associated gallery listings

### 3.8 Authority Building

- [ ] Reach out to Southwest Art magazine for partnership or guest post
- [ ] Contact ASU, UNM, and University of Colorado art departments about listing their galleries
- [ ] Pitch Phoenix New Times, Albuquerque Journal, Denver Post arts sections as a resource
- [ ] Create Google Business Profile for the directory in Scottsdale, Santa Fe, and Denver
- [ ] Begin "claim your listing" email campaign asking galleries to add a backlink to their SouthwestGalleries.com profile

---

## Ongoing / Recurring

- [ ] Weekly: review pending listing submissions in `/admin/` and approve or reject
- [ ] Weekly: check Google Search Console for crawl errors and new keyword impressions
- [ ] Monthly: publish 2–4 new editorial guides targeting priority keywords
- [ ] Monthly: update `gallery_count` on states/cities if not automated via trigger
- [ ] Monthly: review affiliate link performance and add new placements
- [ ] Quarterly: audit internal linking across all new pages
- [ ] Quarterly: run PageSpeed Insights on top 5 traffic pages; address any regressions
