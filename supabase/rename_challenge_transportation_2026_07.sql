-- ============================================================
-- Rename the transportation challenge to match the descriptive
-- style of the other challenges (2026-07). Run in the SQL Editor.
--
-- The challenge was already inserted as "All Aboard", so this
-- UPDATES the existing row rather than inserting a new one.
-- ============================================================

UPDATE challenges
SET title = 'Ride all 6 types of Disney transportation',
    description = 'Disney World gets you around by monorail, Skyliner, boat, ferry, bus, and Minnie Van. Ride every one!'
WHERE title = 'All Aboard';

-- ------------------------------------------------------------
-- VERIFY:
-- ------------------------------------------------------------
-- SELECT title, description FROM challenges
--   WHERE title = 'Ride all 6 types of Disney transportation';
