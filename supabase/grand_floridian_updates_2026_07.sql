-- ============================================================
-- Grand Floridian — adds + one rename (2026-07)
-- Run in the Supabase SQL Editor.
-- Resort rows use the 9-column shape (no opening_year).
-- ============================================================

BEGIN;

-- ── Rename ───────────────────────────────────────────────────
UPDATE experiences
SET name = 'The Garden View Lounge – Tea Experience',
    sort_name = 'The Garden View Lounge – Tea Experience'
WHERE park = 'Resorts' AND location = 'Grand Floridian' AND name = 'Garden View Tea Room';

-- ── Dining ───────────────────────────────────────────────────
INSERT INTO experiences (name, park, category, type, description, duration, is_active, sort_name, location) VALUES
('The Perch', 'Resorts', 'Dining', 'Bar & Lounge', 'Rooftop bar with cocktails and small plates atop the Grand Floridian.', '30 min', true, 'The Perch', 'Grand Floridian'),
('Grand Floridian Café', 'Resorts', 'Dining', 'Table Service', 'Casual table-service dining for breakfast, lunch, and dinner.', '60 min', true, 'Grand Floridian Café', 'Grand Floridian'),
('Beaches Pool Bar & Grill', 'Resorts', 'Dining', 'Bar & Lounge', 'Poolside bar and grill by the Beach Pool.', '30 min', true, 'Beaches Pool Bar & Grill', 'Grand Floridian'),
('Courtyard Pool Bar', 'Resorts', 'Dining', 'Bar & Lounge', 'Poolside bar by the Courtyard Pool.', '30 min', true, 'Courtyard Pool Bar', 'Grand Floridian'),
('Cítricos Lounge', 'Resorts', 'Dining', 'Bar & Lounge', 'Lounge beside Cítricos for cocktails and small plates.', '30 min', true, 'Cítricos Lounge', 'Grand Floridian');

-- ── Entertainment ────────────────────────────────────────────
INSERT INTO experiences (name, park, category, type, description, duration, is_active, sort_name, location) VALUES
('Grand Floridian Lobby Pianist', 'Resorts', 'Entertainment', 'Live Music', 'Live piano music in the grand lobby.', 'Varies', true, 'Grand Floridian Lobby Pianist', 'Grand Floridian');

COMMIT;

-- ------------------------------------------------------------
-- VERIFY:
-- ------------------------------------------------------------
-- SELECT category, name, type FROM experiences
--   WHERE park = 'Resorts' AND location = 'Grand Floridian'
--   ORDER BY category, sort_name;
