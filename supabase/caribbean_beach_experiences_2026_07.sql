-- ============================================================
-- Caribbean Beach — add experiences (2026-07)
-- Run in the Supabase SQL Editor.
-- Resort rows use the 9-column shape (no opening_year).
-- ============================================================

-- Note: the Fishing Excursion for Caribbean Beach is handled in
-- resorts_fishing_2026_07.sql (all fishing resorts, personalized).
INSERT INTO experiences (name, park, category, type, description, duration, is_active, sort_name, location) VALUES
('Spyglass Grill', 'Resorts', 'Dining', 'Quick Service', 'Waterfront quick-service spot for Caribbean and Latin-inspired dishes.', '15 min', true, 'Spyglass Grill', 'Caribbean Beach');

-- ------------------------------------------------------------
-- VERIFY:
-- ------------------------------------------------------------
-- SELECT category, name, type FROM experiences
--   WHERE park = 'Resorts' AND location = 'Caribbean Beach'
--   ORDER BY category, sort_name;
