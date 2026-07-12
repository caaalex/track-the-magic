-- ============================================================
-- Fort Wilderness — adds + renames (2026-07)
-- Run in the Supabase SQL Editor.
-- (Hoop-Dee-Doo Musical Revue already exists — not re-added.)
-- Resort rows use the 9-column shape (no opening_year).
-- ============================================================

BEGIN;

-- ── Renames ──────────────────────────────────────────────────
UPDATE experiences
SET name = 'Horse Drawn Carriage Rides', sort_name = 'Horse Drawn Carriage Rides'
WHERE park = 'Resorts' AND location = 'Fort Wilderness' AND name = 'Carriage Rides';

UPDATE experiences
SET name = 'Horseback Riding', sort_name = 'Horseback Riding'
WHERE park = 'Resorts' AND location = 'Fort Wilderness' AND name = 'Horseback Trail Rides';

-- ── Adds ─────────────────────────────────────────────────────
-- Dining
INSERT INTO experiences (name, park, category, type, description, duration, is_active, sort_name, location) VALUES
('Meadow Snack Bar', 'Resorts', 'Dining', 'Quick Service', 'Poolside quick-service snacks and meals near the Meadow pool.', '15 min', true, 'Meadow Snack Bar', 'Fort Wilderness'),
('The Chuck Wagon', 'Resorts', 'Dining', 'Snack', 'Snack and drink wagon near the nightly campfire.', '10 min', true, 'The Chuck Wagon', 'Fort Wilderness');

-- Activities / experiences
INSERT INTO experiences (name, park, category, type, description, duration, is_active, sort_name, location) VALUES
('Wilderness Back Trail Adventure', 'Resorts', 'Events & Tours', 'Tour', 'Guided Segway tour along the wooded backwoods trails of the resort.', 'Varies', true, 'Wilderness Back Trail Adventure', 'Fort Wilderness'),
('Pony Rides', 'Resorts', 'Attractions', 'Recreation', 'Gentle pony rides for kids at the Tri-Circle-D Ranch.', 'Varies', true, 'Pony Rides', 'Fort Wilderness'),
('Horse Drawn Wagon Ride', 'Resorts', 'Events & Tours', 'Tour', 'Evening horse-drawn wagon ride through the campground.', 'Varies', true, 'Horse Drawn Wagon Ride', 'Fort Wilderness');

COMMIT;

-- ------------------------------------------------------------
-- VERIFY:
-- ------------------------------------------------------------
-- SELECT category, name, type FROM experiences
--   WHERE park = 'Resorts' AND location = 'Fort Wilderness'
--   ORDER BY category, sort_name;
