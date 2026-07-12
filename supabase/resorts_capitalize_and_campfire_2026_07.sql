-- ============================================================
-- Resorts — capitalize generic experiences + add Campfire Activities
-- to the three All-Star resorts (2026-07). Run in the SQL Editor.
--
-- 1) Title-cases the shared, sentence-case activity names across ALL
--    resorts (named venues were already capitalized, so untouched).
--    Both name and sort_name are updated so sorting stays aligned.
-- 2) Adds "Campfire Activities" to All-Star Movies/Music/Sports.
-- ============================================================

BEGIN;

-- ── 1) Capitalize generic experiences (all resorts) ──────────
UPDATE experiences SET name = 'Resort Pool',                     sort_name = 'Resort Pool'                     WHERE park = 'Resorts' AND name = 'Resort pool';
UPDATE experiences SET name = 'Resort Beach',                    sort_name = 'Resort Beach'                    WHERE park = 'Resorts' AND name = 'Resort beach';
UPDATE experiences SET name = 'Overnight Stay',                  sort_name = 'Overnight Stay'                  WHERE park = 'Resorts' AND name = 'Overnight stay';
UPDATE experiences SET name = 'Movie Under the Stars',           sort_name = 'Movie Under the Stars'           WHERE park = 'Resorts' AND name = 'Movie under the stars';
UPDATE experiences SET name = 'Monorail Ride',                   sort_name = 'Monorail Ride'                   WHERE park = 'Resorts' AND name = 'Monorail ride';
UPDATE experiences SET name = 'Archery Experience',              sort_name = 'Archery Experience'              WHERE park = 'Resorts' AND name = 'Archery experience';
UPDATE experiences SET name = 'Bay Lake Beach',                  sort_name = 'Bay Lake Beach'                  WHERE park = 'Resorts' AND name = 'Bay Lake beach';
UPDATE experiences SET name = 'Horseback Trail Rides',           sort_name = 'Horseback Trail Rides'           WHERE park = 'Resorts' AND name = 'Horseback trail rides';
UPDATE experiences SET name = 'Cultural Safari Programs',        sort_name = 'Cultural Safari Programs'        WHERE park = 'Resorts' AND name = 'Cultural safari programs';
UPDATE experiences SET name = 'Explore the Grand Lobby',         sort_name = 'Explore the Grand Lobby'         WHERE park = 'Resorts' AND name = 'Explore the grand lobby';
UPDATE experiences SET name = 'Explore the Themed Courtyards',   sort_name = 'Explore the Themed Courtyards'   WHERE park = 'Resorts' AND name = 'Explore the themed courtyards';
UPDATE experiences SET name = 'Giant Icon Photo Ops',           sort_name = 'Giant Icon Photo Ops'           WHERE park = 'Resorts' AND name = 'Giant icon photo ops';
UPDATE experiences SET name = 'Giant Movie Icon Photo Ops',     sort_name = 'Giant Movie Icon Photo Ops'     WHERE park = 'Resorts' AND name = 'Giant movie icon photo ops';
UPDATE experiences SET name = 'Giant Music Icon Photo Ops',     sort_name = 'Giant Music Icon Photo Ops'     WHERE park = 'Resorts' AND name = 'Giant music icon photo ops';
UPDATE experiences SET name = 'Giant Sports Icon Photo Ops',    sort_name = 'Giant Sports Icon Photo Ops'    WHERE park = 'Resorts' AND name = 'Giant sports icon photo ops';
UPDATE experiences SET name = 'Night-Vision Savanna Viewing',   sort_name = 'Night-Vision Savanna Viewing'   WHERE park = 'Resorts' AND name = 'Night-vision savanna viewing';
UPDATE experiences SET name = 'Savanna Animal Viewing',         sort_name = 'Savanna Animal Viewing'         WHERE park = 'Resorts' AND name = 'Savanna animal viewing';
UPDATE experiences SET name = 'Barefoot Bay Boat & Bike Rentals', sort_name = 'Barefoot Bay Boat & Bike Rentals' WHERE park = 'Resorts' AND name = 'Barefoot Bay boat & bike rentals';
UPDATE experiences SET name = 'Bayside Marina Boat Rentals',    sort_name = 'Bayside Marina Boat Rentals'    WHERE park = 'Resorts' AND name = 'Bayside Marina boat rentals';
UPDATE experiences SET name = 'Bike & Boat Rentals',            sort_name = 'Bike & Boat Rentals'            WHERE park = 'Resorts' AND name = 'Bike & boat rentals';
UPDATE experiences SET name = 'Bike & Surrey Rentals',          sort_name = 'Bike & Surrey Rentals'          WHERE park = 'Resorts' AND name = 'Bike & surrey rentals';
UPDATE experiences SET name = 'Bike, Boat & Canoe Rentals',     sort_name = 'Bike, Boat & Canoe Rentals'     WHERE park = 'Resorts' AND name = 'Bike, boat & canoe rentals';
UPDATE experiences SET name = 'Lago Dorado Boat Rentals',       sort_name = 'Lago Dorado Boat Rentals'       WHERE park = 'Resorts' AND name = 'Lago Dorado boat rentals';
UPDATE experiences SET name = 'Marina Boat Rentals',            sort_name = 'Marina Boat Rentals'            WHERE park = 'Resorts' AND name = 'Marina boat rentals';
UPDATE experiences SET name = 'Surrey Bike Rentals',            sort_name = 'Surrey Bike Rentals'            WHERE park = 'Resorts' AND name = 'Surrey bike rentals';

-- ── 2) Add Campfire Activities to the three All-Star resorts ──
-- (Resort rows use a 9-column shape: no opening_year, duration set.)
INSERT INTO experiences (name, park, category, type, description, duration, is_active, sort_name, location) VALUES
('Campfire Activities', 'Resorts', 'Attractions', 'Recreation', 'Evening campfire with s''mores, sing-alongs, and family activities.', 'Varies', true, 'Campfire Activities', 'All-Star Movies'),
('Campfire Activities', 'Resorts', 'Attractions', 'Recreation', 'Evening campfire with s''mores, sing-alongs, and family activities.', 'Varies', true, 'Campfire Activities', 'All-Star Music'),
('Campfire Activities', 'Resorts', 'Attractions', 'Recreation', 'Evening campfire with s''mores, sing-alongs, and family activities.', 'Varies', true, 'Campfire Activities', 'All-Star Sports');

COMMIT;

-- ------------------------------------------------------------
-- VERIFY:
--   -- capitalized names (should show Title Case):
-- SELECT DISTINCT name FROM experiences WHERE park = 'Resorts' ORDER BY name;
--   -- campfire added to all three All-Stars:
-- SELECT location FROM experiences WHERE park = 'Resorts' AND name = 'Campfire Activities';
-- ------------------------------------------------------------
