-- ============================================================
-- ENUMS
-- ============================================================

CREATE TYPE listing_type AS ENUM (
  'gallery', 'museum', 'cultural_center', 'artist_studio',
  'art_fair', 'sculpture_park', 'auction_house', 'art_school'
);

CREATE TYPE listing_tier AS ENUM ('free', 'basic', 'featured', 'premium');

CREATE TYPE submission_status AS ENUM ('pending', 'approved', 'rejected', 'needs_info');

CREATE TYPE us_state AS ENUM ('AZ', 'CO', 'NM', 'NV', 'TX', 'UT', 'CA');

-- ============================================================
-- STATES
-- ============================================================

CREATE TABLE states (
  code            us_state    PRIMARY KEY,
  name            TEXT        NOT NULL,
  slug            TEXT        NOT NULL UNIQUE,
  description     TEXT,
  hero_image_url  TEXT,
  meta_title      TEXT,
  meta_description TEXT,
  gallery_count   INT         NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO states (code, name, slug) VALUES
  ('AZ', 'Arizona',    'arizona'),
  ('CO', 'Colorado',   'colorado'),
  ('NM', 'New Mexico', 'new-mexico'),
  ('NV', 'Nevada',     'nevada'),
  ('TX', 'Texas',      'texas'),
  ('UT', 'Utah',       'utah'),
  ('CA', 'California', 'california');

-- ============================================================
-- CITIES
-- ============================================================

CREATE TABLE cities (
  id              SERIAL      PRIMARY KEY,
  state_code      us_state    NOT NULL REFERENCES states(code),
  name            TEXT        NOT NULL,
  slug            TEXT        NOT NULL,
  description     TEXT,
  hero_image_url  TEXT,
  meta_title      TEXT,
  meta_description TEXT,
  latitude        NUMERIC(9,6),
  longitude       NUMERIC(9,6),
  gallery_count   INT         NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (state_code, slug)
);

CREATE INDEX idx_cities_state ON cities(state_code);

INSERT INTO cities (state_code, name, slug, latitude, longitude) VALUES
  ('AZ', 'Scottsdale',   'scottsdale',   33.4942,  -111.9261),
  ('AZ', 'Sedona',       'sedona',       34.8697,  -111.7609),
  ('AZ', 'Tucson',       'tucson',       32.2226,  -110.9747),
  ('AZ', 'Phoenix',      'phoenix',      33.4484,  -112.0740),
  ('AZ', 'Flagstaff',    'flagstaff',    35.1983,  -111.6513),
  ('NM', 'Santa Fe',     'santa-fe',     35.6870,  -105.9378),
  ('NM', 'Taos',         'taos',         36.4072,  -105.5730),
  ('NM', 'Albuquerque',  'albuquerque',  35.0844,  -106.6504),
  ('CO', 'Denver',       'denver',       39.7392,  -104.9903),
  ('CO', 'Aspen',        'aspen',        39.1911,  -106.8175),
  ('CO', 'Boulder',      'boulder',      40.0150,  -105.2705),
  ('NV', 'Las Vegas',    'las-vegas',    36.1699,  -115.1398),
  ('UT', 'Salt Lake City','salt-lake-city',40.7608,-111.8910),
  ('UT', 'Moab',         'moab',         38.5733,  -109.5498),
  ('CA', 'Los Angeles',  'los-angeles',  34.0522,  -118.2437),
  ('CA', 'Santa Fe Springs', 'santa-fe-springs', 33.9442, -118.0709),
  ('TX', 'Santa Fe',     'santa-fe',     29.3778,  -95.1055),
  ('TX', 'Marfa',        'marfa',        30.3085,  -104.0207);

-- ============================================================
-- LISTINGS
-- ============================================================

CREATE TABLE listings (
  id              SERIAL        PRIMARY KEY,
  slug            TEXT          NOT NULL UNIQUE,
  name            TEXT          NOT NULL,
  listing_type    listing_type  NOT NULL,
  tier            listing_tier  NOT NULL DEFAULT 'free',
  city_id         INT           REFERENCES cities(id),
  state_code      us_state      NOT NULL,
  address_line1   TEXT,
  address_line2   TEXT,
  zip_code        TEXT,
  latitude        NUMERIC(9,6),
  longitude       NUMERIC(9,6),
  neighborhood    TEXT,
  short_description TEXT,
  full_description  TEXT,
  established_year  INT,
  website_url       TEXT,
  phone             TEXT,
  email             TEXT,
  hours_json        JSONB,
  hero_image_url    TEXT,
  logo_url          TEXT,
  meta_title        TEXT,
  meta_description  TEXT,
  status          submission_status NOT NULL DEFAULT 'pending',
  is_verified     BOOLEAN       NOT NULL DEFAULT false,
  verified_at     TIMESTAMPTZ,
  verified_by     INT,
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ   NOT NULL DEFAULT now(),
  deleted_at      TIMESTAMPTZ,
  search_vector   TSVECTOR
);

CREATE INDEX idx_listings_search  ON listings USING GIN(search_vector);
CREATE INDEX idx_listings_city    ON listings(city_id);
CREATE INDEX idx_listings_state   ON listings(state_code);
CREATE INDEX idx_listings_type    ON listings(listing_type);
CREATE INDEX idx_listings_tier    ON listings(tier);
CREATE INDEX idx_listings_status  ON listings(status);
CREATE INDEX idx_listings_geo     ON listings(latitude, longitude);

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
-- ART STYLES
-- ============================================================

CREATE TABLE art_styles (
  id              SERIAL  PRIMARY KEY,
  name            TEXT    NOT NULL UNIQUE,
  slug            TEXT    NOT NULL UNIQUE,
  description     TEXT,
  meta_title      TEXT,
  meta_description TEXT
);

INSERT INTO art_styles (name, slug, description) VALUES
  ('Native American',      'native-american',      'Traditional and contemporary work by Indigenous artists of the Southwest'),
  ('Contemporary',         'contemporary',          'Modern works spanning painting, sculpture, and mixed media'),
  ('Western & Cowboy',     'western-cowboy',        'Classic and modern Western American art tradition'),
  ('Adobe & Pueblo',       'adobe-pueblo',          'Art rooted in the Pueblo and adobe architectural traditions of New Mexico'),
  ('Landscape & Plein Air','landscape-plein-air',   'Outdoor painting tradition capturing the Southwest landscape'),
  ('Photography',          'photography',           'Fine art and documentary photography'),
  ('Ceramics & Pottery',   'ceramics-pottery',      'Studio ceramics including traditional pueblo pottery'),
  ('Sculpture',            'sculpture',             'Three-dimensional works in all media'),
  ('Jewelry',              'jewelry',               'Fine art jewelry including turquoise and silverwork'),
  ('Glass Art',            'glass-art',             'Blown and kiln-worked glass'),
  ('Abstract',             'abstract',              'Non-representational and conceptual work'),
  ('Figurative',           'figurative',            'Works focused on the human figure');

CREATE TABLE listing_art_styles (
  listing_id  INT NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  style_id    INT NOT NULL REFERENCES art_styles(id) ON DELETE CASCADE,
  PRIMARY KEY (listing_id, style_id)
);

CREATE INDEX idx_listing_styles_style ON listing_art_styles(style_id);

-- ============================================================
-- LISTING IMAGES
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
-- EVENTS
-- ============================================================

CREATE TABLE events (
  id              SERIAL      PRIMARY KEY,
  listing_id      INT         REFERENCES listings(id) ON DELETE SET NULL,
  city_id         INT         REFERENCES cities(id),
  state_code      us_state,
  title           TEXT        NOT NULL,
  slug            TEXT        NOT NULL UNIQUE,
  description     TEXT,
  event_date      DATE        NOT NULL,
  event_end_date  DATE,
  start_time      TIME,
  end_time        TIME,
  is_recurring    BOOLEAN     NOT NULL DEFAULT false,
  recurrence_rule TEXT,
  website_url     TEXT,
  image_url       TEXT,
  is_free         BOOLEAN,
  ticket_url      TEXT,
  meta_title      TEXT,
  meta_description TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_events_date    ON events(event_date);
CREATE INDEX idx_events_city    ON events(city_id);
CREATE INDEX idx_events_listing ON events(listing_id);

-- ============================================================
-- POSTS (editorial guides)
-- ============================================================

CREATE TABLE posts (
  id              SERIAL      PRIMARY KEY,
  slug            TEXT        NOT NULL UNIQUE,
  title           TEXT        NOT NULL,
  excerpt         TEXT,
  content         TEXT,
  hero_image_url  TEXT,
  author_name     TEXT        NOT NULL DEFAULT 'Southwest Galleries Editorial',
  published_at    TIMESTAMPTZ,
  is_published    BOOLEAN     NOT NULL DEFAULT false,
  state_code      us_state,
  city_id         INT         REFERENCES cities(id),
  meta_title      TEXT,
  meta_description TEXT,
  canonical_url   TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_posts_published ON posts(published_at) WHERE is_published = true;
CREATE INDEX idx_posts_state     ON posts(state_code);

CREATE TABLE post_listings (
  post_id     INT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  listing_id  INT NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  sort_order  INT NOT NULL DEFAULT 0,
  PRIMARY KEY (post_id, listing_id)
);

-- ============================================================
-- LISTING OWNERS (paid tiers)
-- ============================================================

CREATE TABLE listing_owners (
  id                    SERIAL      PRIMARY KEY,
  listing_id            INT         NOT NULL REFERENCES listings(id),
  email                 TEXT        NOT NULL,
  name                  TEXT        NOT NULL,
  tier                  listing_tier NOT NULL DEFAULT 'basic',
  stripe_customer_id    TEXT,
  stripe_subscription_id TEXT,
  subscription_start    TIMESTAMPTZ,
  subscription_end      TIMESTAMPTZ,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_owners_listing ON listing_owners(listing_id);
CREATE INDEX idx_owners_email   ON listing_owners(email);

-- ============================================================
-- LISTING SUBMISSIONS
-- ============================================================

CREATE TABLE listing_submissions (
  id              SERIAL      PRIMARY KEY,
  name            TEXT        NOT NULL,
  listing_type    listing_type NOT NULL,
  state_code      us_state    NOT NULL,
  city_name       TEXT        NOT NULL,
  address         TEXT,
  website_url     TEXT,
  phone           TEXT,
  email           TEXT,
  description     TEXT,
  art_styles      TEXT[],
  submitter_name  TEXT,
  submitter_email TEXT        NOT NULL,
  submitter_note  TEXT,
  status          submission_status NOT NULL DEFAULT 'pending',
  reviewed_at     TIMESTAMPTZ,
  created_listing_id INT      REFERENCES listings(id),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- LISTING VIEWS (analytics)
-- ============================================================

CREATE TABLE listing_views (
  listing_id  INT  NOT NULL REFERENCES listings(id),
  view_date   DATE NOT NULL DEFAULT CURRENT_DATE,
  view_count  INT  NOT NULL DEFAULT 1,
  PRIMARY KEY (listing_id, view_date)
);

-- ============================================================
-- VIEWS
-- ============================================================

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
