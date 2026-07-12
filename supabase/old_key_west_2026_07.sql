-- ============================================================
-- Old Key West — add experiences (2026-07)
-- Run in the Supabase SQL Editor.
-- Resort rows use the 9-column shape (no opening_year).
-- ============================================================

INSERT INTO experiences (name, park, category, type, description, duration, is_active, sort_name, location) VALUES
('Turtle Shack Poolside Snacks', 'Resorts', 'Dining', 'Quick Service', 'Poolside counter-service snacks and drinks.', '15 min', true, 'Turtle Shack Poolside Snacks', 'Old Key West'),
('Conch Flats Community Hall', 'Resorts', 'Attractions', 'Recreation', 'Community hall with games, activities, and recreation rentals.', 'Varies', true, 'Conch Flats Community Hall', 'Old Key West');

-- ------------------------------------------------------------
-- VERIFY:
-- ------------------------------------------------------------
-- SELECT category, name, type FROM experiences
--   WHERE park = 'Resorts' AND location = 'Old Key West'
--   ORDER BY category, sort_name;
