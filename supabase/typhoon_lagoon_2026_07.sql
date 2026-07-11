-- ============================================================
-- Typhoon Lagoon — Attractions, Dining, Events & Tours
-- FULL REPLACE (2026-07). Run in the Supabase SQL Editor.
-- One transaction: all-or-nothing.
--
-- WARNING: deletes current Typhoon Lagoon rows per category and
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
DELETE FROM experiences WHERE park = 'Typhoon Lagoon' AND category = 'Attractions';

INSERT INTO experiences (name, park, category, type, description, opening_year, duration, is_active, sort_name, location) VALUES
('Bay Slides', 'Typhoon Lagoon', 'Attractions', 'Water Slide', 'Gentle kid-sized slides beside the surf pool.', NULL, NULL, true, 'Bay Slides', NULL),
('Castaway Creek', 'Typhoon Lagoon', 'Attractions', 'Lazy River', 'Lazy river circling the park past caves and waterfalls.', NULL, NULL, true, 'Castaway Creek', NULL),
('Crush ''n'' Gusher', 'Typhoon Lagoon', 'Attractions', 'Water Coaster', 'Water coaster blasting you uphill through a fruit-factory flume.', NULL, NULL, true, 'Crush ''n'' Gusher', NULL),
('Gangplank Falls', 'Typhoon Lagoon', 'Attractions', 'Family Raft Ride', 'Family white-water raft ride down a tropical mountain.', NULL, NULL, true, 'Gangplank Falls', NULL),
('Humunga Kowabunga', 'Typhoon Lagoon', 'Attractions', 'Water Slide', 'Steep, high-speed body slides through Mount Mayday.', NULL, NULL, true, 'Humunga Kowabunga', NULL),
('Keelhaul Falls', 'Typhoon Lagoon', 'Attractions', 'Water Slide', 'Winding single-tube slide down the mountain.', NULL, NULL, true, 'Keelhaul Falls', NULL),
('Ketchakiddee Creek', 'Typhoon Lagoon', 'Attractions', 'Kids Area', 'Water-play area with mini slides and fountains for little ones.', NULL, NULL, true, 'Ketchakiddee Creek', NULL),
('Mayday Falls', 'Typhoon Lagoon', 'Attractions', 'Water Slide', 'The park''s longest tube slide down rocky rapids.', NULL, NULL, true, 'Mayday Falls', NULL),
('Miss Adventure Falls', 'Typhoon Lagoon', 'Attractions', 'Family Raft Ride', 'Family raft ride following a treasure-hunting tale.', NULL, NULL, true, 'Miss Adventure Falls', NULL),
('Storm Slides', 'Typhoon Lagoon', 'Attractions', 'Water Slide', 'Three twisting body slides through caves and waterfalls.', NULL, NULL, true, 'Storm Slides', NULL),
('Typhoon Lagoon Surf Pool', 'Typhoon Lagoon', 'Attractions', 'Pool', 'Giant wave pool generating six-foot swells.', NULL, NULL, true, 'Typhoon Lagoon Surf Pool', NULL);


-- ============================================================
-- DINING
-- ============================================================
DELETE FROM experiences WHERE park = 'Typhoon Lagoon' AND category = 'Dining';

INSERT INTO experiences (name, park, category, type, description, opening_year, duration, is_active, sort_name, location) VALUES
('Arctic Dots Ice Cream', 'Typhoon Lagoon', 'Dining', 'Snack', 'Beaded ice cream and frozen treats.', NULL, NULL, true, 'Arctic Dots Ice Cream', NULL),
('Funnel Cakes', 'Typhoon Lagoon', 'Dining', 'Snack', 'Fresh funnel cakes and sweet toppings.', NULL, NULL, true, 'Funnel Cakes', NULL),
('Happy Landings Ice Cream', 'Typhoon Lagoon', 'Dining', 'Snack', 'Ice cream and cold treats stand.', NULL, NULL, true, 'Happy Landings Ice Cream', NULL),
('Leaning Palms', 'Typhoon Lagoon', 'Dining', 'Quick Service', 'Quick-service burgers, pizza, and salads.', NULL, NULL, true, 'Leaning Palms', NULL),
('Let''s Go Slurpin''', 'Typhoon Lagoon', 'Dining', 'Bar & Lounge', 'Beachside bar for cocktails and cold beer.', NULL, NULL, true, 'Let''s Go Slurpin''', NULL),
('Lowtide Lou''s', 'Typhoon Lagoon', 'Dining', 'Quick Service', 'Sandwiches, tacos, and snacks near the surf pool.', NULL, NULL, true, 'Lowtide Lou''s', NULL),
('Snack Shack', 'Typhoon Lagoon', 'Dining', 'Snack', 'Quick snacks and drinks.', NULL, NULL, true, 'Snack Shack', NULL),
('Surf Doggies', 'Typhoon Lagoon', 'Dining', 'Quick Service', 'Hot dogs and quick bites.', NULL, NULL, true, 'Surf Doggies', NULL),
('Typhoon Tilly''s', 'Typhoon Lagoon', 'Dining', 'Quick Service', 'Fish baskets, wraps, and snacks.', NULL, NULL, true, 'Typhoon Tilly''s', NULL);


-- ============================================================
-- EVENTS & TOURS
-- ============================================================
DELETE FROM experiences WHERE park = 'Typhoon Lagoon' AND category = 'Events & Tours';

INSERT INTO experiences (name, park, category, type, description, opening_year, duration, is_active, sort_name, location) VALUES
('Disney H2O Glow After Hours at Disney''s Typhoon Lagoon', 'Typhoon Lagoon', 'Events & Tours', 'Event', 'Separately-ticketed nighttime water-park party with slides and a glow theme.', NULL, NULL, true, 'Disney H2O Glow After Hours at Disney''s Typhoon Lagoon', NULL);

COMMIT;

-- ------------------------------------------------------------
-- VERIFY per category:
-- ------------------------------------------------------------
-- SELECT category, name, type FROM experiences
--   WHERE park = 'Typhoon Lagoon'
--   ORDER BY category, sort_name;
