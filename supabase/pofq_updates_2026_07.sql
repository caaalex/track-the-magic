-- ============================================================
-- Port Orleans French Quarter — updates (2026-07)
-- Run in the Supabase SQL Editor.
-- (Mardy Gross intentionally omitted pending clarification.)
-- Resort rows use the 9-column shape (no opening_year).
-- ============================================================

BEGIN;

-- ── Replace "Scat Cat's Club" with Café + Lounge ─────────────
-- Rename the existing row to the Lounge (keeps any tracking)...
UPDATE experiences
SET name = 'Scat Cat''s Club - Lounge',
    sort_name = 'Scat Cat''s Club - Lounge',
    type = 'Bar & Lounge',
    description = 'New Orleans-style lounge with cocktails and live jazz.'
WHERE park = 'Resorts' AND location = 'Port Orleans French Quarter' AND name = 'Scat Cat''s Club';

-- ...and add the Café.
INSERT INTO experiences (name, park, category, type, description, duration, is_active, sort_name, location) VALUES
('Scat Cat''s Club - Café', 'Resorts', 'Dining', 'Quick Service', 'Coffee, beignets, and grab-and-go treats.', '15 min', true, 'Scat Cat''s Club - Café', 'Port Orleans French Quarter');

-- ── Activities ───────────────────────────────────────────────
INSERT INTO experiences (name, park, category, type, description, duration, is_active, sort_name, location) VALUES
('Horse Drawn Carriage Rides', 'Resorts', 'Events & Tours', 'Tour', 'Evening horse-drawn carriage ride along the Sassagoula River.', 'Varies', true, 'Horse Drawn Carriage Rides', 'Port Orleans French Quarter'),
('Painting on De''Bayou', 'Resorts', 'Events & Tours', 'Tour', 'Guided painting class creating your own bayou-inspired artwork.', 'Varies', true, 'Painting on De''Bayou', 'Port Orleans French Quarter'),
('Mosaic Classes', 'Resorts', 'Events & Tours', 'Tour', 'Hands-on class crafting a New Orleans-style mosaic to take home.', 'Varies', true, 'Mosaic Classes', 'Port Orleans French Quarter');

-- ── Entertainment ────────────────────────────────────────────
INSERT INTO experiences (name, park, category, type, description, duration, is_active, sort_name, location) VALUES
('Live music at Scat Cat''s Club', 'Resorts', 'Entertainment', 'Live Music', 'Live jazz and music at Scat Cat''s Club.', 'Varies', true, 'Live music at Scat Cat''s Club', 'Port Orleans French Quarter');

COMMIT;

-- ------------------------------------------------------------
-- VERIFY:
-- ------------------------------------------------------------
-- SELECT category, name, type FROM experiences
--   WHERE park = 'Resorts' AND location = 'Port Orleans French Quarter'
--   ORDER BY category, sort_name;
