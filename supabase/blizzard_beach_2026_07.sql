-- ============================================================
-- Blizzard Beach — Attractions, Dining  FULL REPLACE (2026-07)
-- Run in the Supabase SQL Editor. One transaction: all-or-nothing.
--
-- WARNING: deletes current Blizzard Beach rows per category and
-- re-creates them fresh, clearing tracked progress for those items.
--
-- Water park — no themed lands, so location is NULL throughout.
-- Column order:
--   (name, park, category, type, description, opening_year,
--    duration, is_active, sort_name, location)
-- ============================================================

BEGIN;

-- ============================================================
-- ATTRACTIONS
-- ============================================================
DELETE FROM experiences WHERE park = 'Blizzard Beach' AND category = 'Attractions';

INSERT INTO experiences (name, park, category, type, description, opening_year, duration, is_active, sort_name, location) VALUES
('Chairlift', 'Blizzard Beach', 'Attractions', 'Transportation', 'Ski-lift ride carrying guests up Mount Gushmore.', NULL, NULL, true, 'Chairlift', NULL),
('Cross Country Creek', 'Blizzard Beach', 'Attractions', 'Lazy River', 'Lazy river circling the park past caves and icy surprises.', NULL, NULL, true, 'Cross Country Creek', NULL),
('Downhill Double Dipper', 'Blizzard Beach', 'Attractions', 'Racing Slide', 'Side-by-side racing tube slides with a timed finish.', NULL, NULL, true, 'Downhill Double Dipper', NULL),
('Melt-Away Bay', 'Blizzard Beach', 'Attractions', 'Pool', 'Wave pool fed by melting-snow waterfalls.', NULL, NULL, true, 'Melt-Away Bay', NULL),
('Runoff Rapids', 'Blizzard Beach', 'Attractions', 'Water Slide', 'Three winding tube slides down the mountain.', NULL, NULL, true, 'Runoff Rapids', NULL),
('Ski Patrol Training Camp', 'Blizzard Beach', 'Attractions', 'Kids Area', 'Water-play area with slides and a floating iceberg walk for older kids.', NULL, NULL, true, 'Ski Patrol Training Camp', NULL),
('Slush Gusher', 'Blizzard Beach', 'Attractions', 'Water Slide', 'Fast double-hump speed slide down a snowy gully.', NULL, NULL, true, 'Slush Gusher', NULL),
('Snow Stormers', 'Blizzard Beach', 'Attractions', 'Water Slide', 'Mat slides weaving through slalom gates.', NULL, NULL, true, 'Snow Stormers', NULL),
('Summit Plummet', 'Blizzard Beach', 'Attractions', 'Water Slide', 'One of the tallest, fastest speed slides in the world.', NULL, NULL, true, 'Summit Plummet', NULL),
('Teamboat Springs', 'Blizzard Beach', 'Attractions', 'Family Raft Ride', 'Long family white-water raft ride down the mountain.', NULL, NULL, true, 'Teamboat Springs', NULL),
('Tike''s Peak', 'Blizzard Beach', 'Attractions', 'Kids Area', 'Snow-themed water-play area with mini slides for little ones.', NULL, NULL, true, 'Tike''s Peak', NULL),
('Toboggan Racers', 'Blizzard Beach', 'Attractions', 'Racing Slide', 'Eight-lane mat racing slide down the slopes.', NULL, NULL, true, 'Toboggan Racers', NULL);


-- ============================================================
-- DINING
-- ============================================================
DELETE FROM experiences WHERE park = 'Blizzard Beach' AND category = 'Dining';

INSERT INTO experiences (name, park, category, type, description, opening_year, duration, is_active, sort_name, location) VALUES
('Arctic Expeditions', 'Blizzard Beach', 'Dining', 'Snack', 'Snacks and cold drinks stand.', NULL, NULL, true, 'Arctic Expeditions', NULL),
('Avalunch', 'Blizzard Beach', 'Dining', 'Snack', 'Hot dogs, nachos, and quick bites.', NULL, NULL, true, 'Avalunch', NULL),
('Cooling Hut', 'Blizzard Beach', 'Dining', 'Snack', 'Frozen drinks, pretzels, and snacks.', NULL, NULL, true, 'Cooling Hut', NULL),
('Frostbite Freddy''s Frozen Freshments', 'Blizzard Beach', 'Dining', 'Snack', 'Frozen cocktails and cold beverages.', NULL, NULL, true, 'Frostbite Freddy''s Frozen Freshments', NULL),
('I.C. Expeditions', 'Blizzard Beach', 'Dining', 'Snack', 'Ice cream and frozen treats.', NULL, NULL, true, 'I.C. Expeditions', NULL),
('Lottawatta Lodge', 'Blizzard Beach', 'Dining', 'Quick Service', 'Main quick-service spot for burgers, pizza, and salads.', NULL, NULL, true, 'Lottawatta Lodge', NULL),
('Polar Pub', 'Blizzard Beach', 'Dining', 'Bar & Lounge', 'Beachside bar for cocktails and cold beer.', NULL, NULL, true, 'Polar Pub', NULL),
('Warming Hut', 'Blizzard Beach', 'Dining', 'Snack', 'Wraps, sandwiches, and snacks.', NULL, NULL, true, 'Warming Hut', NULL);

COMMIT;

-- ------------------------------------------------------------
-- VERIFY per category:
-- ------------------------------------------------------------
-- SELECT category, name, type FROM experiences
--   WHERE park = 'Blizzard Beach'
--   ORDER BY category, sort_name;
