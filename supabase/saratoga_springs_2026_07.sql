-- ============================================================
-- Saratoga Springs — add dining + remove Senses Spa (2026-07)
-- Run in the Supabase SQL Editor.
-- Resort rows use the 9-column shape (no opening_year).
-- ============================================================

BEGIN;

-- ── Add dining ───────────────────────────────────────────────
INSERT INTO experiences (name, park, category, type, description, duration, is_active, sort_name, location) VALUES
('The Paddock Grill', 'Resorts', 'Dining', 'Quick Service', 'Quick-service grill by the main pool.', '15 min', true, 'The Paddock Grill', 'Saratoga Springs'),
('The Turf Club Lounge', 'Resorts', 'Dining', 'Bar & Lounge', 'Lounge beside the Turf Club Bar and Grill.', '30 min', true, 'The Turf Club Lounge', 'Saratoga Springs'),
('On the Rocks', 'Resorts', 'Dining', 'Bar & Lounge', 'Poolside bar at the High Rock Spring pool.', '30 min', true, 'On the Rocks', 'Saratoga Springs'),
('Backstretch Pool Bar', 'Resorts', 'Dining', 'Bar & Lounge', 'Poolside bar at the Paddock pool.', '30 min', true, 'Backstretch Pool Bar', 'Saratoga Springs'),
('Chip ''n Dale''s Café', 'Resorts', 'Dining', 'Quick Service', 'Poolside snacks and quick bites.', '15 min', true, 'Chip ''n Dale''s Café', 'Saratoga Springs');

-- ── Remove Senses Spa ────────────────────────────────────────
DELETE FROM experiences
WHERE park = 'Resorts' AND location = 'Saratoga Springs' AND name = 'Senses Spa';

COMMIT;

-- ------------------------------------------------------------
-- VERIFY:
-- ------------------------------------------------------------
-- SELECT category, name, type FROM experiences
--   WHERE park = 'Resorts' AND location = 'Saratoga Springs'
--   ORDER BY category, sort_name;
