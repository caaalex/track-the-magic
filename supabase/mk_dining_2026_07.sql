-- ============================================================
-- Magic Kingdom — Dining edits (2026-07)
-- Run in the Supabase SQL Editor.
-- ============================================================

-- 1. ADD: Tomorrowland Terrace Restaurant
--    (Quick-service in Tomorrowland. Adjust type/description/
--     opening_year/location below if you want different details.)
INSERT INTO experiences
  (name, park, category, type, description, opening_year, duration, is_active, sort_name, location)
VALUES
  ('Tomorrowland Terrace Restaurant', 'Magic Kingdom', 'Dining', 'Quick Service',
   'Counter-service spot in Tomorrowland serving burgers, chicken, and other quick bites, often open seasonally.',
   '1971', '15 min', true, 'Tomorrowland Terrace Restaurant', 'Tomorrowland');

-- 2. REMOVE (permanent): Westward Ho Refreshments
--    Hard delete. Cascades to any user_experiences / trip_experiences
--    rows that referenced it.
DELETE FROM experiences
WHERE park = 'Magic Kingdom'
  AND category = 'Dining'
  AND name = 'Westward Ho Refreshments';

-- ------------------------------------------------------------
-- VERIFY: confirm the add landed and the removal is gone.
-- ------------------------------------------------------------
-- SELECT name, type, location FROM experiences
--   WHERE park = 'Magic Kingdom' AND category = 'Dining'
--     AND name IN ('Tomorrowland Terrace Restaurant', 'Westward Ho Refreshments');
