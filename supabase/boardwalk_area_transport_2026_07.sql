-- ============================================================
-- BoardWalk-area (EPCOT-area) resorts — transport updates (2026-07)
-- Run in the Supabase SQL Editor.
--
-- Resorts: BoardWalk, Beach Club, Yacht Club, Swan, Dolphin, Swan Reserve.
--   1) Add a single "Skyliner Ride" to each.
--   2) Collapse the boat(s)/walk to Epcot & Hollywood Studios into a
--      single "Friendship Boat" per resort.
--
-- Note: these resorts don't have Skyliner access in reality; added per
-- request. Row shapes match existing Skyliner Ride / Boat rows.
-- ============================================================

BEGIN;

-- ── 1) Add Skyliner Ride to all six resorts ──────────────────
INSERT INTO experiences (name, park, category, type, description, duration, is_active, sort_name, location) VALUES
('Skyliner Ride', 'Resorts', 'Attractions', 'Transportation', 'Glide above the resort on the Disney Skyliner gondolas toward Epcot and Hollywood Studios.', '15 min', true, 'Skyliner Ride', 'BoardWalk'),
('Skyliner Ride', 'Resorts', 'Attractions', 'Transportation', 'Glide above the resort on the Disney Skyliner gondolas toward Epcot and Hollywood Studios.', '15 min', true, 'Skyliner Ride', 'Beach Club'),
('Skyliner Ride', 'Resorts', 'Attractions', 'Transportation', 'Glide above the resort on the Disney Skyliner gondolas toward Epcot and Hollywood Studios.', '15 min', true, 'Skyliner Ride', 'Yacht Club'),
('Skyliner Ride', 'Resorts', 'Attractions', 'Transportation', 'Glide above the resort on the Disney Skyliner gondolas toward Epcot and Hollywood Studios.', '15 min', true, 'Skyliner Ride', 'Swan'),
('Skyliner Ride', 'Resorts', 'Attractions', 'Transportation', 'Glide above the resort on the Disney Skyliner gondolas toward Epcot and Hollywood Studios.', '15 min', true, 'Skyliner Ride', 'Dolphin'),
('Skyliner Ride', 'Resorts', 'Attractions', 'Transportation', 'Glide above the resort on the Disney Skyliner gondolas toward Epcot and Hollywood Studios.', '15 min', true, 'Skyliner Ride', 'Swan Reserve');

-- ── 2) Collapse boats/walk into one "Friendship Boat" ────────
-- (a) Resorts that have a "Boat to Epcot" → rename it in place.
UPDATE experiences
SET name = 'Friendship Boat', sort_name = 'Friendship Boat',
    description = 'Hop a Friendship boat across Crescent Lake to Epcot and Hollywood Studios.'
WHERE park = 'Resorts' AND name = 'Boat to Epcot'
  AND location IN ('Beach Club', 'Yacht Club', 'Swan', 'Dolphin', 'Swan Reserve');

-- (b) BoardWalk has no "Boat to Epcot" (it has a walk) — rename its
--     "Boat to Hollywood Studios" to the combined Friendship Boat.
UPDATE experiences
SET name = 'Friendship Boat', sort_name = 'Friendship Boat',
    description = 'Hop a Friendship boat across Crescent Lake to Epcot and Hollywood Studios.'
WHERE park = 'Resorts' AND name = 'Boat to Hollywood Studios' AND location = 'BoardWalk';

-- (c) Fold BoardWalk's "Walk to Epcot" into the boat (delete it).
DELETE FROM experiences
WHERE park = 'Resorts' AND name = 'Walk to Epcot' AND location = 'BoardWalk';

-- (d) Delete the now-redundant "Boat to Hollywood Studios" at the
--     four resorts whose "Boat to Epcot" became the Friendship Boat.
DELETE FROM experiences
WHERE park = 'Resorts' AND name = 'Boat to Hollywood Studios'
  AND location IN ('Beach Club', 'Yacht Club', 'Swan', 'Dolphin');

COMMIT;

-- ------------------------------------------------------------
-- VERIFY (each resort: one Skyliner Ride + one Friendship Boat):
-- ------------------------------------------------------------
-- SELECT location, name FROM experiences
--   WHERE park = 'Resorts'
--     AND location IN ('BoardWalk','Beach Club','Yacht Club','Swan','Dolphin','Swan Reserve')
--     AND (name = 'Skyliner Ride' OR name = 'Friendship Boat'
--          OR name ILIKE '%boat to%' OR name = 'Walk to Epcot')
--   ORDER BY location, name;
