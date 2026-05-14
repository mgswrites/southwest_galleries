# SouthwestGalleries.com — Technical Specification

## Stack

| Layer | Technology | Notes |
|---|---|---|
| Framework | Astro (latest) | Static generation by default; SSR only for search/filter routes |
| Database | Neon DB (PostgreSQL) | Serverless Postgres; connect via `@neondatabase/serverless` |
| Hosting | Vercel | Edge functions for SSR routes; static assets on CDN |
| Payments | Stripe | Subscription billing for paid listing tiers |
| Maps | Mapbox or Leaflet | City pages and listing pages; lat/lng stored in DB |
| Email | Resend or ConvertKit | Transactional + newsletter |
| Analytics | Custom (DB-backed) | `listing_views` table; no third-party trackers required for basic tracking |
| Ads | Google AdSense → Mediavine | AdSense at launch; migrate when 50K sessions/month is reached |

---

## Project Structure

```
southwest-galleries/
├── src/
│   ├── pages/
│   │   ├── index.astro
│   │   ├── galleries/
│   │   │   ├── index.astro                  ← All listings index
│   │   │   ├── [state].astro                ← State hub (static)
│   │   │   └── [state]/[city].astro         ← City index (static)
│   │   ├── museums/
│   │   │   ├── [state].astro
│   │   │   └── [state]/[city].astro
│   │   ├── listing/
│   │   │   └── [slug].astro                 ← Individual venue page (static)
│   │   ├── art-styles/
│   │   │   ├── index.astro
│   │   │   └── [style].astro
│   │   ├── guides/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── events/
│   │   │   └── index.astro
│   │   ├── submit/
│   │   │   └── index.astro                  ← SSR: form submission
│   │   ├── search/
│   │   │   └── index.astro                  ← SSR: search/filter
│   │   └── admin/                           ← Password-protected admin UI
│   │       ├── index.astro
│   │       └── submissions.astro
│   ├── components/
│   │   ├── ListingCard.astro
│   │   ├── ListingDetail.astro
│   │   ├── CityIndex.astro
│   │   ├── StateIndex.astro
│   │   ├── EventCard.astro
│   │   ├── MapView.astro
│   │   ├── SearchFilters.astro
│   │   ├── BreadcrumbNav.astro
│   │   └── SchemaMarkup.astro
│   ├── layouts/
│   │   ├── Base.astro
│   │   ├── Listing.astro
│   │   └── Editorial.astro
│   └── lib/
│       ├── db.ts                            ← Neon DB client
│       ├── queries.ts                       ← Typed DB query functions
│       └── schema.ts                        ← Zod validation schemas
├── public/
│   ├── robots.txt
│   └── sitemap.xml                          ← Auto-generated
└── astro.config.mjs
```

---

## URL Structure

All URLs are lowercase, hyphen-separated, no trailing slash on individual pages (configure consistently in Astro).

```
/                                            ← Homepage
/galleries/                                  ← All listings index
/galleries/[state]/                          ← e.g. /galleries/arizona/
/galleries/[state]/[city]/                   ← e.g. /galleries/arizona/scottsdale/
/museums/[state]/                            ← e.g. /museums/arizona/
/museums/[state]/[city]/                     ← e.g. /museums/arizona/phoenix/
/listing/[slug]/                             ← e.g. /listing/medicine-man-gallery-tucson/
/art-styles/                                 ← Taxonomy hub
/art-styles/[style]/                         ← e.g. /art-styles/native-american/
/guides/                                     ← Editorial hub
/guides/[slug]/                              ← e.g. /guides/best-art-galleries-santa-fe/
/events/                                     ← Events index
/submit/                                     ← Paid listing submission (SSR)
/search/                                     ← Search results (SSR)
/admin/                                      ← Admin dashboard (password-protected, SSR)
```

**Slug rules:**
- Derived from the entity name at creation time using a standard `slugify()` function
- Never change a slug after a page is indexed (use 301 redirects if unavoidable)
- No numeric IDs in any public URL

---

## Database Schema

### Enums

```sql
listing_type: gallery | museum | cultural_center | artist_studio | art_fair | sculpture_park | auction_house | art_school
listing_tier: free | basic | featured | premium
submission_status: pending | approved | rejected | needs_info
us_state: AZ | CO | NM | NV | TX | UT | CA
```

### Tables

#### `states`
| Column | Type | Notes |
|---|---|---|
| code | us_state PK | |
| name | TEXT NOT NULL | |
| slug | TEXT UNIQUE | |
| description | TEXT | |
| hero_image_url | TEXT | |
| meta_title | TEXT | |
| meta_description | TEXT | |
| gallery_count | INT DEFAULT 0 | Denormalized for perf |
| created_at | TIMESTAMPTZ | |

#### `cities`
| Column | Type | Notes |
|---|---|---|
| id | SERIAL PK | |
| state_code | us_state FK | |
| name | TEXT NOT NULL | |
| slug | TEXT | UNIQUE on (state_code, slug) |
| description | TEXT | |
| hero_image_url | TEXT | |
| meta_title | TEXT | |
| meta_description | TEXT | |
| latitude | NUMERIC(9,6) | |
| longitude | NUMERIC(9,6) | |
| gallery_count | INT DEFAULT 0 | |
| created_at | TIMESTAMPTZ | |

#### `listings` (core table)
| Column | Type | Notes |
|---|---|---|
| id | SERIAL PK | |
| slug | TEXT UNIQUE | |
| name | TEXT NOT NULL | |
| listing_type | listing_type | |
| tier | listing_tier DEFAULT 'free' | |
| city_id | INT FK → cities | |
| state_code | us_state | |
| address_line1 | TEXT | |
| address_line2 | TEXT | |
| zip_code | TEXT | |
| latitude | NUMERIC(9,6) | |
| longitude | NUMERIC(9,6) | |
| neighborhood | TEXT | e.g. "Canyon Road" |
| short_description | TEXT | 160 chars max; used in cards + meta |
| full_description | TEXT | Rich content |
| established_year | INT | |
| website_url | TEXT | |
| phone | TEXT | |
| email | TEXT | |
| hours_json | JSONB | `{"mon":"10:00-17:00",...,"sun":"closed"}` |
| hero_image_url | TEXT | |
| logo_url | TEXT | |
| meta_title | TEXT | |
| meta_description | TEXT | |
| status | submission_status DEFAULT 'pending' | |
| is_verified | BOOLEAN DEFAULT false | |
| verified_at | TIMESTAMPTZ | |
| verified_by | INT | FK to admin users (future) |
| created_at | TIMESTAMPTZ | |
| updated_at | TIMESTAMPTZ | Auto-updated via trigger |
| deleted_at | TIMESTAMPTZ | Soft delete |
| search_vector | TSVECTOR | Auto-updated via trigger |

**Indexes on `listings`:** `search_vector` (GIN), `city_id`, `state_code`, `listing_type`, `tier`, `status`, `(latitude, longitude)`

**Triggers on `listings`:**
- `trig_listing_search_vector` — updates `search_vector` before insert/update using weighted `tsvector` (name=A, short_description+neighborhood=B, full_description=C)
- `trig_listings_updated_at` — sets `updated_at = now()` before update

#### `art_styles`
| Column | Type |
|---|---|
| id | SERIAL PK |
| name | TEXT UNIQUE |
| slug | TEXT UNIQUE |
| description | TEXT |
| meta_title | TEXT |
| meta_description | TEXT |

#### `listing_art_styles` (junction)
Composite PK: `(listing_id, style_id)`. Cascades on delete.

#### `listing_images`
| Column | Type | Notes |
|---|---|---|
| id | SERIAL PK | |
| listing_id | INT FK | Cascades on delete |
| url | TEXT NOT NULL | |
| alt_text | TEXT | Required for SEO |
| caption | TEXT | |
| sort_order | INT DEFAULT 0 | |
| created_at | TIMESTAMPTZ | |

#### `events`
| Column | Type | Notes |
|---|---|---|
| id | SERIAL PK | |
| listing_id | INT FK | SET NULL on delete |
| city_id | INT FK | |
| state_code | us_state | |
| title | TEXT NOT NULL | |
| slug | TEXT UNIQUE | |
| description | TEXT | |
| event_date | DATE NOT NULL | |
| event_end_date | DATE | |
| start_time | TIME | |
| end_time | TIME | |
| is_recurring | BOOLEAN DEFAULT false | |
| recurrence_rule | TEXT | RRULE string |
| website_url | TEXT | |
| image_url | TEXT | |
| is_free | BOOLEAN | |
| ticket_url | TEXT | |
| meta_title | TEXT | |
| meta_description | TEXT | |
| created_at / updated_at | TIMESTAMPTZ | |

#### `posts` (editorial guides)
| Column | Type | Notes |
|---|---|---|
| id | SERIAL PK | |
| slug | TEXT UNIQUE | |
| title | TEXT NOT NULL | |
| excerpt | TEXT | |
| content | TEXT | Markdown or HTML |
| hero_image_url | TEXT | |
| author_name | TEXT DEFAULT 'Southwest Galleries Editorial' | |
| published_at | TIMESTAMPTZ | |
| is_published | BOOLEAN DEFAULT false | |
| state_code | us_state | Optional |
| city_id | INT FK | Optional |
| meta_title | TEXT | |
| meta_description | TEXT | |
| canonical_url | TEXT | |
| created_at / updated_at | TIMESTAMPTZ | |

#### `post_listings` (junction)
Composite PK: `(post_id, listing_id)`. Has `sort_order`.

#### `listing_owners`
Stores Stripe `customer_id`, `subscription_id`, and subscription date range for paid-tier management.

#### `listing_submissions`
Public submission queue. Mirrors `listings` structure. Includes `submitter_name`, `submitter_email`, `status`, and `created_listing_id` (FK set when approved and promoted to `listings`).

#### `listing_views`
| Column | Type | Notes |
|---|---|---|
| listing_id | INT | Composite PK with view_date |
| view_date | DATE DEFAULT CURRENT_DATE | |
| view_count | INT DEFAULT 1 | Upserted with `ON CONFLICT DO UPDATE SET view_count = view_count + 1` |

#### View: `city_gallery_summary`
Joins `cities`, `states`, and `listings` to surface `total_listings` and `featured_count` per city. Used on state hub pages.

---

## Rendering Strategy

| Route | Render Mode | Reason |
|---|---|---|
| `/galleries/[state]` | Static (SSG) | Fully cacheable; changes only when new listings approved |
| `/galleries/[state]/[city]` | Static (SSG) | Same as above |
| `/listing/[slug]` | Static (SSG) | Listing content rarely changes |
| `/art-styles/[style]` | Static (SSG) | |
| `/guides/[slug]` | Static (SSG) | |
| `/events/` | Static (SSG) + ISR | Rebuild nightly |
| `/search/` | SSR | Query-driven, non-cacheable |
| `/submit/` | SSR | Form POST handling |
| `/admin/` | SSR | Auth-gated, real-time data |

---

## SEO Technical Requirements

### Meta Tags (all pages)
- `<title>` — unique per page, ≤60 chars, keyword-bearing
- `<meta name="description">` — unique, ≤160 chars
- `<link rel="canonical">` — self-referential on all pages; required on paginated variants
- `<html lang="en">` on every page

### Structured Data (Schema.org JSON-LD)

| Page Type | Schema Types |
|---|---|
| Listing page | `LocalBusiness` + `ArtGallery`, `BreadcrumbList` |
| Event page | `Event`, `BreadcrumbList` |
| City/State hub | `BreadcrumbList`, `FAQPage` |
| Editorial guide | `Article`, `BreadcrumbList` |
| All pages | `WebSite` (homepage only), `Organization` |

### Sitemap
- Auto-generated at build time by `@astrojs/sitemap`
- Include: all listings (status=approved), city pages, state pages, published posts, events
- Exclude: `/submit/`, `/admin/`, `/search/` and any URL with query params
- Submit to Google Search Console on launch day

### robots.txt
```
User-agent: *
Disallow: /submit/
Disallow: /admin/
Disallow: /search/
Allow: /
Sitemap: https://southwestgalleries.com/sitemap.xml
```

### Image Requirements
- Use Astro's `<Image />` component for all listing hero images
- Output format: WebP with JPEG fallback
- Lazy load all images below the fold
- `alt` text required on all images; descriptive, not generic (e.g., "Exposures International Gallery exterior, Sedona Arizona")
- Hero images: minimum 1200×630px for Open Graph

### Core Web Vitals Targets
- LCP: < 2.5s
- CLS: < 0.1
- INP: < 200ms

---

## Listing Tiers & Pricing

| Tier | Price | Features |
|---|---|---|
| Free | $0 | Basic profile, listed in city/state index |
| Basic | $99/yr | Image gallery, hours, website link, enhanced profile |
| Featured | $199/yr | Basic + "Featured" badge + city page spotlight position |
| Premium | $349/yr | Featured + editorial spotlight in a guide + newsletter mention |

Billing managed via Stripe subscriptions. Subscription metadata stored in `listing_owners`.

---

## Full-Text Search

- Powered by PostgreSQL `tsvector` + GIN index on `listings.search_vector`
- Weighted: name (A) > short_description + neighborhood (B) > full_description (C)
- Query pattern: `plainto_tsquery('english', $1)` with `ts_rank` for relevance ordering
- Filter support: `listing_type`, `state_code`, `city_id`, `tier`, `art_style` (via join)
- Search route is SSR (`/search/`)

---

## Internal Linking Rules

Every **listing page** links to:
- Its city index page
- Its state index page
- 2–3 relevant art style pages
- 1–2 related editorial guides

Every **editorial guide** links to:
- All featured listing pages (directly)
- The relevant city index page
- 1–2 related guides

Every **city page** links to:
- Top 5 featured/premium listings
- Upcoming events in that city
- 1–2 relevant guides

---

## Affiliate Integration (Phase 2)

| Partner | Commission | Placement |
|---|---|---|
| GetYourGuide | 8% | Art tour links in city guides |
| Tiqets | ~6% | Museum ticket links on museum listing pages |
| Viator | 8% | "Art & Culture Tours" in city guides |
| Amazon Associates | 3–4% | Art books, collecting guides |
| Bookshop.org | 10% | Curated reading lists in editorial content |

---

## Environment Variables

```
DATABASE_URL=           # Neon DB connection string (pooled)
DATABASE_URL_UNPOOLED=  # Neon DB direct connection (for migrations)
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
ADMIN_PASSWORD=         # Simple password for /admin/ (replace with proper auth later)
MAPBOX_TOKEN=           # or LEAFLET (no token required)
RESEND_API_KEY=
PUBLIC_SITE_URL=        # https://southwestgalleries.com
```

---

## Key Seed Data

Art styles to seed at launch:
`native-american`, `contemporary`, `western-cowboy`, `adobe-pueblo`, `landscape-plein-air`, `photography`, `ceramics-pottery`, `sculpture`, `jewelry`, `glass-art`, `abstract`, `figurative`

States to seed:
`AZ` (Arizona), `CO` (Colorado), `NM` (New Mexico), `NV` (Nevada), `TX` (Texas), `UT` (Utah), `CA` (California)

Priority cities for initial listing seeding:
Scottsdale AZ, Santa Fe NM, Denver CO, Sedona AZ, Tucson AZ, Aspen CO, Las Vegas NV, Taos NM, Phoenix AZ, Albuquerque NM
