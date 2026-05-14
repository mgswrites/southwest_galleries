# SouthwestGalleries.com — Full Build & SEO Blueprint

> **Stack:** Astro (static site + SSR where needed) · Neon DB (PostgreSQL) · Vercel (hosting + edge functions)  
> **Domain:** southwestgalleries.com  
> **Goal:** Become the definitive art and cultural directory for the American Southwest, monetized through premium listings, display advertising, and affiliate commissions.

---

## Part 1: Site Architecture

### URL Structure (SEO-first hierarchy)

```
southwestgalleries.com/
├── /galleries/                         ← All listings index
│   ├── /galleries/[state]/             ← /galleries/arizona/
│   │   └── /galleries/[state]/[city]/  ← /galleries/arizona/scottsdale/
├── /museums/
│   ├── /museums/[state]/
│   │   └── /museums/[state]/[city]/
├── /listing/[slug]/                    ← Individual venue page
├── /art-styles/                        ← Taxonomy hub
│   └── /art-styles/[style]/            ← /art-styles/native-american/
├── /guides/                            ← Blog/editorial content hub
│   └── /guides/[slug]/
├── /events/                            ← Art walks, fairs, openings
├── /artists/                           ← Artist profiles (Phase 2)
└── /submit/                            ← Paid listing submission
```

**Why this structure matters:** Each state and city page becomes an independently rankable document. `/galleries/new-mexico/santa-fe/` targets "art galleries Santa Fe" (high intent, medium difficulty). Nesting under `/galleries/` preserves topical authority while keeping URL depth manageable.

---

### Page Types and Their Purpose

| Page Type | SEO Target | Volume Est. | Monetization |
|---|---|---|---|
| State gallery index | "art galleries Arizona" | 8,100/mo | Display ads + lead gen |
| City gallery index | "art galleries Scottsdale" | 6,600/mo | Display ads + premium listings |
| Individual listing | "[gallery name] Scottsdale" | Branded | Premium upgrade upsell |
| Art style page | "Native American art Southwest" | 4,400/mo | Display ads + affiliate |
| Editorial guide | "best art galleries Santa Fe" | 5,400/mo | Display ads + affiliate |
| Events page | "Scottsdale art walk" | 1,900/mo | Sponsor slots |

---

## Part 2: Neon DB Schema

### Design Principles
- Use `TEXT` over `VARCHAR` in Postgres — no performance difference and no arbitrary length limits
- Use `TIMESTAMPTZ` everywhere for future timezone flexibility
- Use `tsvector` + GIN index for full-text search on listing pages (critical for search UX)
- Use `NUMERIC` not `FLOAT` for any currency/pricing data
- Soft deletes via `deleted_at` column instead of hard deletes
- All junction tables use composite PKs, no surrogate keys on the join table itself

---

### Core Schema (SQL)

```sql
-- ============================================================
-- ENUMS
-- ============================================================

CREATE TYPE listing_type AS ENUM (
  'gallery',
  'museum',
  'cultural_center',
  'artist_studio',
  'art_fair',
  'sculpture_park',
  'auction_house',
  'art_school'
);

CREATE TYPE listing_tier AS ENUM (
  'free',
  'basic',    -- $100/yr: enhanced profile
  'featured', -- $200/yr: homepage + category featuring
  'premium'   -- $300/yr: featured + editorial spotlight
);

CREATE TYPE submission_status AS ENUM (
  'pending',
  'approved',
  'rejected',
  'needs_info'
);

CREATE TYPE us_state AS ENUM (
  'AZ', 'CO', 'NM', 'NV', 'TX', 'UT', 'CA'
);

-- ============================================================
-- GEOGRAPHY
-- ============================================================

CREATE TABLE states (
  code          us_state    PRIMARY KEY,
  name          TEXT        NOT NULL,
  slug          TEXT        NOT NULL UNIQUE,
  description   TEXT,
  hero_image_url TEXT,
  meta_title    TEXT,
  meta_description TEXT,
  gallery_count INT         NOT NULL DEFAULT 0, -- denormalized for perf
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE cities (
  id            SERIAL      PRIMARY KEY,
  state_code    us_state    NOT NULL REFERENCES states(code),
  name          TEXT        NOT NULL,
  slug          TEXT        NOT NULL,
  description   TEXT,
  hero_image_url TEXT,
  meta_title    TEXT,
  meta_description TEXT,
  latitude      NUMERIC(9,6),
  longitude     NUMERIC(9,6),
  gallery_count INT         NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (state_code, slug)
);

CREATE INDEX idx_cities_state ON cities(state_code);

-- ============================================================
-- LISTINGS (core table)
-- ============================================================

CREATE TABLE listings (
  id              SERIAL        PRIMARY KEY,
  slug            TEXT          NOT NULL UNIQUE,
  name            TEXT          NOT NULL,
  listing_type    listing_type  NOT NULL,
  tier            listing_tier  NOT NULL DEFAULT 'free',

  -- Location
  city_id         INT           REFERENCES cities(id),
  state_code      us_state      NOT NULL,
  address_line1   TEXT,
  address_line2   TEXT,
  zip_code        TEXT,
  latitude        NUMERIC(9,6),
  longitude       NUMERIC(9,6),
  neighborhood    TEXT,         -- e.g. "Canyon Road", "Old Town Scottsdale"

  -- Content
  short_description TEXT,       -- 160 chars max, used in cards + meta desc
  full_description  TEXT,       -- Rich content for listing page
  established_year  INT,
  website_url       TEXT,
  phone             TEXT,
  email             TEXT,

  -- Hours (stored as JSON for flexibility)
  -- Format: {"mon":"10:00-17:00","tue":"10:00-17:00",...,"sun":"closed"}
  hours_json      JSONB,

  -- Media
  hero_image_url  TEXT,
  logo_url        TEXT,

  -- SEO
  meta_title      TEXT,
  meta_description TEXT,

  -- Verification & moderation
  status          submission_status NOT NULL DEFAULT 'pending',
  is_verified     BOOLEAN       NOT NULL DEFAULT false,
  verified_at     TIMESTAMPTZ,
  verified_by     INT,          -- FK to admin users (add later)

  -- Timestamps & soft delete
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ   NOT NULL DEFAULT now(),
  deleted_at      TIMESTAMPTZ,

  -- Full-text search vector (auto-updated via trigger)
  search_vector   TSVECTOR
);

-- GIN index for full-text search
CREATE INDEX idx_listings_search ON listings USING GIN(search_vector);

-- Standard lookup indexes
CREATE INDEX idx_listings_city    ON listings(city_id);
CREATE INDEX idx_listings_state   ON listings(state_code);
CREATE INDEX idx_listings_type    ON listings(listing_type);
CREATE INDEX idx_listings_tier    ON listings(tier);
CREATE INDEX idx_listings_status  ON listings(status);
CREATE INDEX idx_listings_geo     ON listings(latitude, longitude);

-- Trigger to keep search_vector updated
CREATE OR REPLACE FUNCTION update_listing_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', coalesce(NEW.name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(NEW.short_description, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(NEW.full_description, '')), 'C') ||
    setweight(to_tsvector('english', coalesce(NEW.neighborhood, '')), 'B');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trig_listing_search_vector
  BEFORE INSERT OR UPDATE ON listings
  FOR EACH ROW EXECUTE FUNCTION update_listing_search_vector();

-- Trigger to keep updated_at current
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trig_listings_updated_at
  BEFORE UPDATE ON listings
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ============================================================
-- ART STYLES / SPECIALTIES (taxonomy)
-- ============================================================

CREATE TABLE art_styles (
  id          SERIAL  PRIMARY KEY,
  name        TEXT    NOT NULL UNIQUE,
  slug        TEXT    NOT NULL UNIQUE,
  description TEXT,
  meta_title  TEXT,
  meta_description TEXT
);

-- Many-to-many: listings <-> art_styles
CREATE TABLE listing_art_styles (
  listing_id  INT NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  style_id    INT NOT NULL REFERENCES art_styles(id) ON DELETE CASCADE,
  PRIMARY KEY (listing_id, style_id)
);

CREATE INDEX idx_listing_styles_style ON listing_art_styles(style_id);

-- Seed data for art_styles (run after table creation)
/*
INSERT INTO art_styles (name, slug, description) VALUES
  ('Native American', 'native-american', 'Traditional and contemporary work by Indigenous artists of the Southwest'),
  ('Contemporary', 'contemporary', 'Modern works spanning painting, sculpture, and mixed media'),
  ('Western & Cowboy', 'western-cowboy', 'Classic and modern Western American art tradition'),
  ('Adobe & Pueblo', 'adobe-pueblo', 'Art rooted in the Pueblo and adobe architectural traditions of New Mexico'),
  ('Landscape & Plein Air', 'landscape-plein-air', 'Outdoor painting tradition capturing the Southwest landscape'),
  ('Photography', 'photography', 'Fine art and documentary photography'),
  ('Ceramics & Pottery', 'ceramics-pottery', 'Studio ceramics including traditional pueblo pottery'),
  ('Sculpture', 'sculpture', 'Three-dimensional works in all media'),
  ('Jewelry', 'jewelry', 'Fine art jewelry including turquoise and silverwork'),
  ('Glass Art', 'glass-art', 'Blown and kiln-worked glass'),
  ('Abstract', 'abstract', 'Non-representational and conceptual work'),
  ('Figurative', 'figurative', 'Works focused on the human figure');
*/

-- ============================================================
-- GALLERY IMAGES
-- ============================================================

CREATE TABLE listing_images (
  id          SERIAL  PRIMARY KEY,
  listing_id  INT     NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  url         TEXT    NOT NULL,
  alt_text    TEXT,
  caption     TEXT,
  sort_order  INT     NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_listing_images_listing ON listing_images(listing_id);

-- ============================================================
-- EVENTS (art walks, fairs, openings)
-- ============================================================

CREATE TABLE events (
  id            SERIAL      PRIMARY KEY,
  listing_id    INT         REFERENCES listings(id) ON DELETE SET NULL,
  city_id       INT         REFERENCES cities(id),
  state_code    us_state,
  title         TEXT        NOT NULL,
  slug          TEXT        NOT NULL UNIQUE,
  description   TEXT,
  event_date    DATE        NOT NULL,
  event_end_date DATE,
  start_time    TIME,
  end_time      TIME,
  is_recurring  BOOLEAN     NOT NULL DEFAULT false,
  recurrence_rule TEXT,     -- RRULE string if recurring
  website_url   TEXT,
  image_url     TEXT,
  is_free       BOOLEAN,
  ticket_url    TEXT,
  meta_title    TEXT,
  meta_description TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_events_date     ON events(event_date);
CREATE INDEX idx_events_city     ON events(city_id);
CREATE INDEX idx_events_listing  ON events(listing_id);

-- ============================================================
-- EDITORIAL CONTENT (guides, blog posts)
-- ============================================================

CREATE TABLE posts (
  id            SERIAL      PRIMARY KEY,
  slug          TEXT        NOT NULL UNIQUE,
  title         TEXT        NOT NULL,
  excerpt       TEXT,
  content       TEXT,       -- Markdown or HTML
  hero_image_url TEXT,
  author_name   TEXT        NOT NULL DEFAULT 'Southwest Galleries Editorial',
  published_at  TIMESTAMPTZ,
  is_published  BOOLEAN     NOT NULL DEFAULT false,

  -- Taxonomy associations
  state_code    us_state,   -- if state-specific
  city_id       INT         REFERENCES cities(id),

  -- SEO
  meta_title    TEXT,
  meta_description TEXT,
  canonical_url TEXT,

  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_posts_published   ON posts(published_at) WHERE is_published = true;
CREATE INDEX idx_posts_state       ON posts(state_code);

-- Many-to-many: posts <-> listings (for "featured in this guide" associations)
CREATE TABLE post_listings (
  post_id     INT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  listing_id  INT NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  sort_order  INT NOT NULL DEFAULT 0,
  PRIMARY KEY (post_id, listing_id)
);

-- ============================================================
-- LISTING CLAIMS & OWNERSHIP (for paid tier management)
-- ============================================================

CREATE TABLE listing_owners (
  id            SERIAL      PRIMARY KEY,
  listing_id    INT         NOT NULL REFERENCES listings(id),
  email         TEXT        NOT NULL,
  name          TEXT        NOT NULL,
  tier          listing_tier NOT NULL DEFAULT 'basic',
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  subscription_start TIMESTAMPTZ,
  subscription_end   TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_owners_listing ON listing_owners(listing_id);
CREATE INDEX idx_owners_email   ON listing_owners(email);

-- ============================================================
-- SUBMISSION QUEUE (public listing submissions)
-- ============================================================

CREATE TABLE listing_submissions (
  id            SERIAL      PRIMARY KEY,
  -- Submitted data (mirrors listings table)
  name          TEXT        NOT NULL,
  listing_type  listing_type NOT NULL,
  state_code    us_state    NOT NULL,
  city_name     TEXT        NOT NULL,
  address       TEXT,
  website_url   TEXT,
  phone         TEXT,
  email         TEXT,
  description   TEXT,
  art_styles    TEXT[],     -- free-form array before normalizing

  -- Submitter info
  submitter_name  TEXT,
  submitter_email TEXT      NOT NULL,
  submitter_note  TEXT,

  status        submission_status NOT NULL DEFAULT 'pending',
  reviewed_at   TIMESTAMPTZ,
  created_listing_id INT    REFERENCES listings(id),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- ANALYTICS / TRAFFIC TRACKING (lightweight, no third-party)
-- ============================================================

CREATE TABLE listing_views (
  listing_id    INT         NOT NULL REFERENCES listings(id),
  view_date     DATE        NOT NULL DEFAULT CURRENT_DATE,
  view_count    INT         NOT NULL DEFAULT 1,
  PRIMARY KEY (listing_id, view_date)
);

-- Upsert pattern: INSERT ... ON CONFLICT DO UPDATE SET view_count = view_count + 1

-- ============================================================
-- USEFUL VIEWS
-- ============================================================

-- City summary for directory index pages
CREATE VIEW city_gallery_summary AS
SELECT
  c.id,
  c.name,
  c.slug,
  c.state_code,
  s.name AS state_name,
  s.slug AS state_slug,
  COUNT(l.id) AS total_listings,
  COUNT(l.id) FILTER (WHERE l.tier IN ('featured','premium')) AS featured_count
FROM cities c
JOIN states s ON s.code = c.state_code
LEFT JOIN listings l ON l.city_id = c.id
  AND l.status = 'approved'
  AND l.deleted_at IS NULL
GROUP BY c.id, c.name, c.slug, c.state_code, s.name, s.slug;
```

---

## Part 3: SEO Strategy

### Phase 1: Foundation (Months 1–3)

**Goal:** Get indexed and establish topical authority in the core Southwest art niche.

#### Technical SEO Checklist

- **Static generation by default.** Every gallery listing, city page, and state page should be statically generated at build time in Astro. Use SSR only for the search/filter functionality. Static pages = instant load times = better Core Web Vitals.
- **Sitemap.xml** auto-generated and submitted to Google Search Console on day one. Include all listings, city pages, state pages, editorial posts, and event pages.
- **Robots.txt** — block `/submit/`, `/admin/`, and any search result pages with query params (prevent duplicate content indexing).
- **Canonical tags** on all paginated pages and filter variations.
- **Schema markup** — this niche is perfect for structured data:
  - `LocalBusiness` + `ArtGallery` schema on every listing page
  - `Event` schema on all event pages
  - `BreadcrumbList` on all pages
  - `FAQPage` schema on city/state hub pages (adds rich snippets)
  - `Article` schema on editorial guides
- **Image optimization** — Astro's `<Image />` component for WebP conversion, lazy loading, and proper `alt` text. Gallery hero images need descriptive alt text: *"Exposures International Gallery of Fine Art exterior, Sedona Arizona"* not *"gallery photo"*.
- **Core Web Vitals target** — LCP under 2.5s, CLS under 0.1. With Astro's near-zero JS output, this is achievable out of the box.
- **hreflang** — not needed (English only), but add `<html lang="en">` on every page.

#### URL Slug Strategy

Slugs should be clean and keyword-bearing:

```
/galleries/arizona/scottsdale/
/galleries/new-mexico/santa-fe/
/listing/medicine-man-gallery-tucson/
/art-styles/native-american-art/
/guides/best-art-galleries-santa-fe/
```

No IDs in URLs. Slugs are derived from names at submission time and should never change after indexing (301 redirects if they must change).

---

### Keyword Targets by Page Type

#### State Hub Pages (High Priority)

| URL | Primary Keyword | Vol | Difficulty |
|---|---|---|---|
| /galleries/arizona/ | art galleries Arizona | 8,100 | Medium |
| /galleries/new-mexico/ | art galleries New Mexico | 4,400 | Low-Med |
| /galleries/colorado/ | art galleries Colorado | 5,400 | Medium |
| /galleries/nevada/ | art galleries Las Vegas | 6,600 | Medium |
| /galleries/utah/ | art galleries Utah | 2,900 | Low |
| /museums/arizona/ | museums Arizona | 12,100 | Medium |

#### City Pages (Highest Commercial Intent)

| URL | Primary Keyword | Vol | Difficulty |
|---|---|---|---|
| /galleries/arizona/scottsdale/ | art galleries Scottsdale | 6,600 | Low-Med |
| /galleries/new-mexico/santa-fe/ | art galleries Santa Fe | 5,400 | Low |
| /galleries/arizona/sedona/ | art galleries Sedona | 4,400 | Low |
| /galleries/colorado/denver/ | art galleries Denver | 5,400 | Medium |
| /galleries/colorado/aspen/ | art galleries Aspen | 2,400 | Low |
| /galleries/nevada/las-vegas/ | art galleries Las Vegas | 4,400 | Medium |
| /galleries/arizona/tucson/ | art galleries Tucson | 2,900 | Low |

#### Art Style Pages (Topical Authority Building)

| URL | Primary Keyword | Vol | Notes |
|---|---|---|---|
| /art-styles/native-american/ | Native American art Southwest | 4,400 | Very low competition |
| /art-styles/western-cowboy/ | Western art galleries | 2,900 | Underserved niche |
| /art-styles/landscape-plein-air/ | plein air galleries Southwest | 880 | Low vol, low comp |
| /art-styles/ceramics-pottery/ | Southwest pottery galleries | 1,300 | Low competition |
| /art-styles/contemporary/ | contemporary art galleries AZ/NM | 2,400 | Medium comp |

#### Editorial Content (Traffic + Authority)

These are longer-form posts in `/guides/` that rank for informational queries and feed authority back to listing pages:

| Target Keyword | Vol | Content Type |
|---|---|---|
| best art galleries Santa Fe | 5,400 | Curated guide with embedded listings |
| Scottsdale art walk | 1,900 | Event guide |
| Canyon Road galleries Santa Fe | 2,900 | Neighborhood guide |
| Southwest Native American art | 3,600 | Educational explainer |
| art galleries Sedona Arizona | 4,400 | City guide |
| First Friday art walk Phoenix | 1,300 | Event/culture guide |
| how to collect Southwest art | 720 | Collector guide (high-value audience) |
| Taos art scene | 1,600 | Destination guide |

---

### Phase 2: Content Velocity (Months 4–9)

**Goal:** Reach 20,000+ monthly organic sessions and qualify for Mediavine (50K sessions required now, though confirm current threshold).

#### Content Pillars

1. **City Guides** — "The [City] Art Scene: Your Complete Gallery Guide" for every major city in the directory. ~2,000 words. Targets location + art queries together.

2. **Neighborhood Spotlights** — Canyon Road (Santa Fe), Old Town Scottsdale, RiNo (Denver), Pearl District (San Antonio). These rank for hyper-local queries that TripAdvisor and Yelp handle poorly.

3. **Art Style Deep Dives** — "A Collector's Guide to Native American Pottery of the Southwest" — these are the highest-value pages for affiliate link placement (Tiqets, GetYourGuide museum tours).

4. **Seasonal Roundups** — "Best Art Events in the Southwest This Fall/Winter/Spring" — recurring content that ranks year-round and drives event page traffic.

5. **How-To Content for Collectors** — "How to Buy Original Art in Santa Fe," "What to Expect at Your First Gallery Opening" — this targets high-income searchers with commercial intent.

#### Internal Linking Strategy

Every listing page should link to:
- Its city index page
- Its state index page
- 2–3 relevant art style pages
- 1–2 related editorial guides

Every editorial guide should link to:
- The featured listing pages (directly)
- The city index page
- Related guides

City pages should link to:
- Featured listings (top 5 featured/premium tier)
- Upcoming events in that city
- 1–2 relevant guides

This creates a dense internal link graph that concentrates authority on the commercial listing pages.

---

### Phase 3: Authority Building (Months 6–18)

#### Link Building Targets

- **State arts councils** — AZ Commission on the Arts, Colorado Creative Industries, New Mexico Arts. These have high DA and frequently link to art resources.
- **Tourism boards** — VisitArizona, New Mexico Tourism, Colorado Tourism. Pitch SouthwestGalleries as a resource for the "Arts & Culture" sections of their sites.
- **Southwest Art magazine** — already ranked for many target keywords. Pitch a guest post, directory listing, or editorial partnership.
- **University arts programs** — ASU, UNM, University of Colorado. Reach out to art department chairs about listing their galleries and studios.
- **Gallery outreach** — when a gallery claims their listing (even free tier), the natural ask is a backlink from their website: "Link to your SouthwestGalleries.com profile."
- **Local press** — Phoenix New Times, Albuquerque Journal, Denver Post arts sections. Pitch the directory as a resource when they write gallery roundup pieces.

#### Google Business Profile

Create a GBP for the directory itself as a "cultural organization" or "directory service" in the cities with the highest listing density (Scottsdale, Santa Fe, Denver). This helps the brand appear in local packs for broad queries.

---

## Part 4: Monetization Roadmap

### Tier 1: Display Advertising (immediate, low-friction)

Launch with **Google AdSense** from day one. Art/culture content typically yields $8–15 RPM. Place ads in:
- Sidebar on listing pages (desktop)
- Between listing cards on city pages
- In-article on editorial guides

Once the site reaches **50K monthly sessions**, apply to Mediavine. Art and travel content is a historically strong category for Mediavine RPMs ($15–35). This transition alone often 3–5x ad revenue vs. AdSense.

### Tier 2: Premium Listing Tiers (Month 3+)

After 300+ approved listings are live, begin outreach to galleries for paid tiers:

| Tier | Price | Features |
|---|---|---|
| Free | $0 | Basic profile, listed in city/state index |
| Basic | $99/yr | Featured image gallery, hours, website link, enhanced profile |
| Featured | $199/yr | Everything in Basic + "Featured" badge, city page spotlight position |
| Premium | $349/yr | Everything in Featured + editorial spotlight in a guide, newsletter mention |

**Target:** 5% paid adoption of 300 listings = 15 paying customers at average $175/yr = **$2,625/yr at launch**, scaling as listings grow.

### Tier 3: Affiliate Revenue (Month 4+)

Integrate affiliate links contextually throughout editorial content:

- **GetYourGuide** (8% commission) — link to guided art tours in Santa Fe, Scottsdale, Sedona
- **Tiqets** (variable, ~6%) — museum ticket sales for major Southwest museums (Phoenix Art Museum, Denver Art Museum, Getty adjacent tours)
- **Viator** (8%) — "Art & Culture Tours" in all major cities
- **Amazon** (3–4%) — Art books, Southwest art collecting guides, framing supplies
- **Bookshop.org** (10%) — Curated reading lists: "Books on Southwest Native American Art"

### Tier 4: Sponsored Content / Events (Month 9+)

- **Event sponsorships** — "Presented by SouthwestGalleries.com" for First Friday coverage
- **Featured gallery spotlights** — paid editorial pieces ($200–500/piece) in the guides section
- **Newsletter sponsorships** — once an email list reaches 2,000+ subscribers

---

## Part 5: Build Phases

### Phase 1 — MVP (Weeks 1–6)
- [ ] Set up Neon DB and run schema migrations
- [ ] Build Astro project with Vercel deployment pipeline
- [ ] Implement state and city index pages (static, pre-generated)
- [ ] Build listing detail page template
- [ ] Build admin UI for reviewing/approving submissions (simple, can be a password-protected Astro page or a separate admin tool)
- [ ] Seed database with 150–200 high-quality listings (Scottsdale, Santa Fe, Denver, Sedona, Tucson)
- [ ] Launch with /submit/ form for new listings
- [ ] Connect Google AdSense

### Phase 2 — Content & SEO (Weeks 7–16)
- [ ] Publish 20+ editorial guides targeting priority city keywords
- [ ] Build art style taxonomy pages
- [ ] Implement structured data (Schema.org) on all page types
- [ ] Submit sitemap to Google Search Console
- [ ] Begin link outreach to state arts councils and tourism boards
- [ ] Implement listing view tracking
- [ ] Launch Stripe-based listing payment for paid tiers

### Phase 3 — Monetization & Scale (Months 5–12)
- [ ] Begin gallery outreach for paid listing upgrades
- [ ] Add events section with structured data
- [ ] Integrate affiliate links into guide content
- [ ] Set up email newsletter (ConvertKit or Resend)
- [ ] Apply for Mediavine at 50K sessions threshold
- [ ] Add artist profile pages (Phase 2 feature)
- [ ] Explore Google Places API for automated listing enrichment

---

## Part 6: Competitive Moat

The single biggest advantage SouthwestGalleries.com has over Art-Collecting.com (the closest incumbent) is **being built in 2026 with modern tooling**. Specifically:

- **Map-based search** — Art-Collecting.com has zero mapping. A Mapbox or Leaflet integration on city pages that lets users browse galleries spatially is a massive UX differentiator.
- **Mobile-first design** — Art-Collecting.com is not mobile-optimized. Over 60% of local search traffic comes from mobile.
- **Rich filtering** — Filter by art style, listing type, open today, verified, featured. No incumbent does this.
- **Events integration** — Tie gallery listings to their events. Art-Collecting.com is purely static profiles.
- **Photography** — High-quality hero images on every listing page. Art-Collecting.com uses tiny, low-quality thumbnails. Visual appeal directly affects bounce rate.

---

## Quick Reference: Key Stats for the Pitch Deck

- Santa Fe = #3 US art market (behind NYC and LA)
- 200+ galleries on Canyon Road alone
- Southwest outdoor/culture tourism: $70B+ annual economic impact
- Art/culture CPM: $8–20 (programmatic display)
- Art collector avg. household income: $150K+
- Main competitor (Art-Collecting.com): ~1998 vintage static HTML site
- Target: 50K monthly sessions by Month 12 → Mediavine eligibility
