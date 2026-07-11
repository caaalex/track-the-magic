-- ============================================================
-- Rename resort: "BoardWalk Inn" → "BoardWalk" (2026-07)
-- Run in the Supabase SQL Editor.
--
-- Resorts are stored as the `location` on Resorts experiences.
-- This must match the RESORTS constant in the app (already updated
-- to 'BoardWalk'), so the resort list and its experiences line up.
-- ============================================================

UPDATE experiences
SET location = 'BoardWalk'
WHERE park = 'Resorts' AND location = 'BoardWalk Inn';

-- ------------------------------------------------------------
-- VERIFY (should return rows, all now labeled 'BoardWalk'):
-- ------------------------------------------------------------
-- SELECT name, location FROM experiences
--   WHERE park = 'Resorts' AND location = 'BoardWalk';
