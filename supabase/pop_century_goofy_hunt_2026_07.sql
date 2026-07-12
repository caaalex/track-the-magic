-- ============================================================
-- Pop Century — add Goofy Hunt (2026-07)
-- Run in the Supabase SQL Editor.
-- Resort rows use the 9-column shape (no opening_year).
-- ============================================================

INSERT INTO experiences (name, park, category, type, description, duration, is_active, sort_name, location) VALUES
('Goofy Hunt', 'Resorts', 'Attractions', 'Interactive Experience', 'Search for the hidden Goofy among the giant pop-culture icons around the resort.', 'Varies', true, 'Goofy Hunt', 'Pop Century');

-- ------------------------------------------------------------
-- VERIFY:
-- ------------------------------------------------------------
-- SELECT category, name, type FROM experiences
--   WHERE park = 'Resorts' AND location = 'Pop Century' AND name = 'Goofy Hunt';
