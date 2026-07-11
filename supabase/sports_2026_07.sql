-- ============================================================
-- Sports — Attractions FULL REPLACE (2026-07)
-- Run in the Supabase SQL Editor.
--
-- The Tracker orders experiences by sort_name, so sort_name = name
-- makes this list display in alphabetical order automatically.
--
-- WARNING: deletes current Sports attractions and re-creates them
-- fresh, clearing tracked progress for those items.
-- Column order:
--   (name, park, category, type, description, opening_year,
--    duration, is_active, sort_name, location)
-- ============================================================

BEGIN;

DELETE FROM experiences WHERE park = 'Sports' AND category = 'Attractions';

INSERT INTO experiences (name, park, category, type, description, opening_year, duration, is_active, sort_name, location) VALUES
('Disney''s Fantasia Gardens Miniature Golf Course', 'Sports', 'Attractions', 'Miniature Golf', 'Whimsical miniature golf inspired by the film Fantasia.', NULL, NULL, true, 'Disney''s Fantasia Gardens Miniature Golf Course', NULL),
('Disney''s Lake Buena Vista Golf Course', 'Sports', 'Attractions', 'Golf', '18-hole course winding through the Disney Springs resort area.', NULL, NULL, true, 'Disney''s Lake Buena Vista Golf Course', NULL),
('Disney''s Magnolia Golf Course', 'Sports', 'Attractions', 'Golf', '18-hole championship course lined with magnolia trees.', NULL, NULL, true, 'Disney''s Magnolia Golf Course', NULL),
('Disney''s Oak Trail Golf Course', 'Sports', 'Attractions', 'Golf', '9-hole walking course designed for family play.', NULL, NULL, true, 'Disney''s Oak Trail Golf Course', NULL),
('Disney''s Palm Golf Course', 'Sports', 'Attractions', 'Golf', '18-hole championship course near the Magic Kingdom resorts.', NULL, NULL, true, 'Disney''s Palm Golf Course', NULL),
('Disney''s Winter Summerland Miniature Golf Course', 'Sports', 'Attractions', 'Miniature Golf', 'Holiday-themed miniature golf with two 18-hole courses.', NULL, NULL, true, 'Disney''s Winter Summerland Miniature Golf Course', NULL),
('ESPN Wide World of Sports Complex', 'Sports', 'Attractions', 'Sports Complex', 'Sprawling venue hosting professional and amateur sporting events.', NULL, NULL, true, 'ESPN Wide World of Sports Complex', NULL);

COMMIT;

-- ------------------------------------------------------------
-- VERIFY (should list alphabetically):
-- ------------------------------------------------------------
-- SELECT name, type FROM experiences
--   WHERE park = 'Sports' AND category = 'Attractions'
--   ORDER BY sort_name;
