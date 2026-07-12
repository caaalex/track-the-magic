-- ============================================================
-- Collapse the two Skyliner experiences into one "Skyliner Ride"
-- for every resort with Skyliner access (2026-07).
-- Run in the Supabase SQL Editor.
--
-- Applies to Art of Animation, Caribbean Beach, Pop Century, and
-- Riviera (any resort that had the Skyliner rows). Renames the
-- "to Epcot" row in place (keeps tracked progress) and removes the
-- now-redundant "to Hollywood Studios" row.
-- ============================================================

BEGIN;

UPDATE experiences
SET name = 'Skyliner Ride',
    sort_name = 'Skyliner Ride',
    description = 'Glide above the resort on the Disney Skyliner gondolas toward Epcot and Hollywood Studios.'
WHERE park = 'Resorts' AND name = 'Skyliner to Epcot';

DELETE FROM experiences
WHERE park = 'Resorts' AND name = 'Skyliner to Hollywood Studios';

COMMIT;

-- ------------------------------------------------------------
-- VERIFY (each Skyliner resort should show exactly one row):
-- ------------------------------------------------------------
-- SELECT location, name FROM experiences
--   WHERE park = 'Resorts' AND name ILIKE '%skyliner%'
--   ORDER BY location;
