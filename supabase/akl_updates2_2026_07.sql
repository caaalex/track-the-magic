-- ============================================================
-- Animal Kingdom Lodge — follow-up updates (2026-07)
-- Run in the Supabase SQL Editor.
-- ============================================================

BEGIN;

-- Delete "Cultural Safari Programs" (ILIKE handles either casing).
DELETE FROM experiences
WHERE park = 'Resorts'
  AND location = 'Animal Kingdom Lodge'
  AND name ILIKE 'cultural safari programs';

-- Move "Starlight Safari" from Attractions to Events & Tours.
UPDATE experiences
SET category = 'Events & Tours'
WHERE park = 'Resorts'
  AND location = 'Animal Kingdom Lodge'
  AND name = 'Starlight Safari';

COMMIT;

-- ------------------------------------------------------------
-- VERIFY:
-- ------------------------------------------------------------
-- SELECT category, name FROM experiences
--   WHERE park = 'Resorts' AND location = 'Animal Kingdom Lodge'
--   ORDER BY category, sort_name;
