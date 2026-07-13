-- ============================================================
-- Remove the "Eat in every World Showcase pavilion" challenge (2026-07)
-- Run in the Supabase SQL Editor.
--
-- Deleting the challenge cascades to its challenge_items and any user
-- progress on them (ON DELETE CASCADE). Permanent.
-- ============================================================

DELETE FROM challenges
WHERE title ILIKE 'eat in every world showcase pavilion';

-- ------------------------------------------------------------
-- VERIFY (should return no rows):
-- ------------------------------------------------------------
-- SELECT title FROM challenges WHERE title ILIKE '%world showcase%';
