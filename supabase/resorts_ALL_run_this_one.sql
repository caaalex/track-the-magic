-- ═══════════════════════════════════════════════════════════════════
-- RESORTS — Phase 1 data normalization (July 2026)
-- Run once in the Supabase SQL editor. Makes every resort experience's
-- `location` match the canonical short resort names the app groups by.
-- ═══════════════════════════════════════════════════════════════════

-- ── Shorten existing (audit) locations to canonical names ──────────────
UPDATE experiences SET location = 'Animal Kingdom Lodge' WHERE park = 'Resorts' AND location = 'Animal Kingdom Lodge — Kidani';
UPDATE experiences SET location = 'Beach Club'           WHERE park = 'Resorts' AND location = 'Beach Club Resort';
UPDATE experiences SET location = 'Caribbean Beach'      WHERE park = 'Resorts' AND location = 'Caribbean Beach Resort';
UPDATE experiences SET location = 'Contemporary'         WHERE park = 'Resorts' AND location = 'Contemporary Resort';
UPDATE experiences SET location = 'Polynesian'           WHERE park = 'Resorts' AND location = 'Polynesian Resort';
UPDATE experiences SET location = 'Riviera'              WHERE park = 'Resorts' AND location = 'Riviera Resort';
-- 'Coronado Springs', 'Fort Wilderness', 'Grand Floridian', 'Wilderness Lodge' are already canonical.

-- ── Fix legacy entries that baked the resort into the name ─────────────
UPDATE experiences SET name = '1900 Park Fare',       sort_name = '1900 Park Fare',       location = 'Grand Floridian'  WHERE park = 'Resorts' AND name = '1900 Park Fare — Grand Floridian';
UPDATE experiences SET name = 'Artist Point',         sort_name = 'Artist Point',         location = 'Wilderness Lodge' WHERE park = 'Resorts' AND name = 'Artist Point — Wilderness Lodge';
UPDATE experiences SET location = 'Animal Kingdom Lodge'                                                                WHERE park = 'Resorts' AND name = 'Boma — Flavors of Africa';
UPDATE experiences SET name = 'California Grill',      sort_name = 'California Grill',      location = 'Contemporary'     WHERE park = 'Resorts' AND name = 'California Grill — Contemporary Resort';
UPDATE experiences SET name = 'Carriage Rides',        sort_name = 'Carriage Rides',        location = 'Fort Wilderness'  WHERE park = 'Resorts' AND name = 'Carriage Rides — Fort Wilderness';
UPDATE experiences SET location = 'Fort Wilderness'                                                                     WHERE park = 'Resorts' AND name = 'Chip ''n'' Dale''s Campfire Singalong';
UPDATE experiences SET location = 'Animal Kingdom Lodge'                                                                WHERE park = 'Resorts' AND name = 'Jiko — The Cooking Place';
UPDATE experiences SET name = 'Narcoossee''s',         sort_name = 'Narcoossee''s',         location = 'Grand Floridian'  WHERE park = 'Resorts' AND name = 'Narcoossee''s — Grand Floridian';
UPDATE experiences SET name = '''Ohana',               sort_name = 'Ohana',                 location = 'Polynesian'       WHERE park = 'Resorts' AND name = 'Ohana — Polynesian Resort';
UPDATE experiences SET location = 'Polynesian'                                                                          WHERE park = 'Resorts' AND name = 'Trader Sam''s Grog Grotto';
UPDATE experiences SET name = 'Victoria & Albert''s',  sort_name = 'Victoria & Albert''s',  location = 'Grand Floridian'  WHERE park = 'Resorts' AND name = 'Victoria & Albert''s — Grand Floridian';

-- ── Relocate Electrical Water Pageant to Magic Kingdom entertainment ───
UPDATE experiences SET park = 'Magic Kingdom', category = 'Entertainment', location = NULL WHERE name = 'Electrical Water Pageant';

-- ── Drop the generic property-wide entry (returns later as per-resort) ─
DELETE FROM experiences WHERE park = 'Resorts' AND name = 'Movies Under the Stars';
-- ═══════════════════════════════════════════════════════════════════
-- RESORTS — Phase 2 activities (July 2026)
-- Seeds every resort with standard trackable activities. Run once.
-- Run AFTER resorts_phase1_2026_07.sql.
-- ═══════════════════════════════════════════════════════════════════

INSERT INTO experiences (name, park, category, type, description, duration, is_active, sort_name, location) VALUES
('Overnight stay', 'Resorts', 'Events & Tours', 'Stay', 'Book a stay and spend the night at this resort, surrounded by its theming.', '1 night', true, 'Overnight stay', 'Grand Floridian'),
('Resort pool', 'Resorts', 'Attractions', 'Pool', 'Take a dip in the resort''s themed feature pool.', 'Varies', true, 'Resort pool', 'Grand Floridian'),
('Arcade', 'Resorts', 'Attractions', 'Arcade', 'Play games at the resort''s arcade.', 'Varies', true, 'Arcade', 'Grand Floridian'),
('Movie under the stars', 'Resorts', 'Entertainment', 'Outdoor Movie', 'Watch a Disney film outdoors under the stars at the resort.', '90 min', true, 'Movie under the stars', 'Grand Floridian'),
('Overnight stay', 'Resorts', 'Events & Tours', 'Stay', 'Book a stay and spend the night at this resort, surrounded by its theming.', '1 night', true, 'Overnight stay', 'Polynesian'),
('Resort pool', 'Resorts', 'Attractions', 'Pool', 'Take a dip in the resort''s themed feature pool.', 'Varies', true, 'Resort pool', 'Polynesian'),
('Arcade', 'Resorts', 'Attractions', 'Arcade', 'Play games at the resort''s arcade.', 'Varies', true, 'Arcade', 'Polynesian'),
('Movie under the stars', 'Resorts', 'Entertainment', 'Outdoor Movie', 'Watch a Disney film outdoors under the stars at the resort.', '90 min', true, 'Movie under the stars', 'Polynesian'),
('Overnight stay', 'Resorts', 'Events & Tours', 'Stay', 'Book a stay and spend the night at this resort, surrounded by its theming.', '1 night', true, 'Overnight stay', 'Contemporary'),
('Resort pool', 'Resorts', 'Attractions', 'Pool', 'Take a dip in the resort''s themed feature pool.', 'Varies', true, 'Resort pool', 'Contemporary'),
('Arcade', 'Resorts', 'Attractions', 'Arcade', 'Play games at the resort''s arcade.', 'Varies', true, 'Arcade', 'Contemporary'),
('Movie under the stars', 'Resorts', 'Entertainment', 'Outdoor Movie', 'Watch a Disney film outdoors under the stars at the resort.', '90 min', true, 'Movie under the stars', 'Contemporary'),
('Overnight stay', 'Resorts', 'Events & Tours', 'Stay', 'Book a stay and spend the night at this resort, surrounded by its theming.', '1 night', true, 'Overnight stay', 'Wilderness Lodge'),
('Resort pool', 'Resorts', 'Attractions', 'Pool', 'Take a dip in the resort''s themed feature pool.', 'Varies', true, 'Resort pool', 'Wilderness Lodge'),
('Arcade', 'Resorts', 'Attractions', 'Arcade', 'Play games at the resort''s arcade.', 'Varies', true, 'Arcade', 'Wilderness Lodge'),
('Movie under the stars', 'Resorts', 'Entertainment', 'Outdoor Movie', 'Watch a Disney film outdoors under the stars at the resort.', '90 min', true, 'Movie under the stars', 'Wilderness Lodge'),
('Overnight stay', 'Resorts', 'Events & Tours', 'Stay', 'Book a stay and spend the night at this resort, surrounded by its theming.', '1 night', true, 'Overnight stay', 'Animal Kingdom Lodge'),
('Resort pool', 'Resorts', 'Attractions', 'Pool', 'Take a dip in the resort''s themed feature pool.', 'Varies', true, 'Resort pool', 'Animal Kingdom Lodge'),
('Arcade', 'Resorts', 'Attractions', 'Arcade', 'Play games at the resort''s arcade.', 'Varies', true, 'Arcade', 'Animal Kingdom Lodge'),
('Movie under the stars', 'Resorts', 'Entertainment', 'Outdoor Movie', 'Watch a Disney film outdoors under the stars at the resort.', '90 min', true, 'Movie under the stars', 'Animal Kingdom Lodge'),
('Overnight stay', 'Resorts', 'Events & Tours', 'Stay', 'Book a stay and spend the night at this resort, surrounded by its theming.', '1 night', true, 'Overnight stay', 'Beach Club'),
('Resort pool', 'Resorts', 'Attractions', 'Pool', 'Take a dip in the resort''s themed feature pool.', 'Varies', true, 'Resort pool', 'Beach Club'),
('Arcade', 'Resorts', 'Attractions', 'Arcade', 'Play games at the resort''s arcade.', 'Varies', true, 'Arcade', 'Beach Club'),
('Movie under the stars', 'Resorts', 'Entertainment', 'Outdoor Movie', 'Watch a Disney film outdoors under the stars at the resort.', '90 min', true, 'Movie under the stars', 'Beach Club'),
('Overnight stay', 'Resorts', 'Events & Tours', 'Stay', 'Book a stay and spend the night at this resort, surrounded by its theming.', '1 night', true, 'Overnight stay', 'Yacht Club'),
('Resort pool', 'Resorts', 'Attractions', 'Pool', 'Take a dip in the resort''s themed feature pool.', 'Varies', true, 'Resort pool', 'Yacht Club'),
('Arcade', 'Resorts', 'Attractions', 'Arcade', 'Play games at the resort''s arcade.', 'Varies', true, 'Arcade', 'Yacht Club'),
('Movie under the stars', 'Resorts', 'Entertainment', 'Outdoor Movie', 'Watch a Disney film outdoors under the stars at the resort.', '90 min', true, 'Movie under the stars', 'Yacht Club'),
('Overnight stay', 'Resorts', 'Events & Tours', 'Stay', 'Book a stay and spend the night at this resort, surrounded by its theming.', '1 night', true, 'Overnight stay', 'BoardWalk Inn'),
('Resort pool', 'Resorts', 'Attractions', 'Pool', 'Take a dip in the resort''s themed feature pool.', 'Varies', true, 'Resort pool', 'BoardWalk Inn'),
('Arcade', 'Resorts', 'Attractions', 'Arcade', 'Play games at the resort''s arcade.', 'Varies', true, 'Arcade', 'BoardWalk Inn'),
('Movie under the stars', 'Resorts', 'Entertainment', 'Outdoor Movie', 'Watch a Disney film outdoors under the stars at the resort.', '90 min', true, 'Movie under the stars', 'BoardWalk Inn'),
('Overnight stay', 'Resorts', 'Events & Tours', 'Stay', 'Book a stay and spend the night at this resort, surrounded by its theming.', '1 night', true, 'Overnight stay', 'Riviera'),
('Resort pool', 'Resorts', 'Attractions', 'Pool', 'Take a dip in the resort''s themed feature pool.', 'Varies', true, 'Resort pool', 'Riviera'),
('Arcade', 'Resorts', 'Attractions', 'Arcade', 'Play games at the resort''s arcade.', 'Varies', true, 'Arcade', 'Riviera'),
('Movie under the stars', 'Resorts', 'Entertainment', 'Outdoor Movie', 'Watch a Disney film outdoors under the stars at the resort.', '90 min', true, 'Movie under the stars', 'Riviera'),
('Overnight stay', 'Resorts', 'Events & Tours', 'Stay', 'Book a stay and spend the night at this resort, surrounded by its theming.', '1 night', true, 'Overnight stay', 'Caribbean Beach'),
('Resort pool', 'Resorts', 'Attractions', 'Pool', 'Take a dip in the resort''s themed feature pool.', 'Varies', true, 'Resort pool', 'Caribbean Beach'),
('Arcade', 'Resorts', 'Attractions', 'Arcade', 'Play games at the resort''s arcade.', 'Varies', true, 'Arcade', 'Caribbean Beach'),
('Movie under the stars', 'Resorts', 'Entertainment', 'Outdoor Movie', 'Watch a Disney film outdoors under the stars at the resort.', '90 min', true, 'Movie under the stars', 'Caribbean Beach'),
('Overnight stay', 'Resorts', 'Events & Tours', 'Stay', 'Book a stay and spend the night at this resort, surrounded by its theming.', '1 night', true, 'Overnight stay', 'Coronado Springs'),
('Resort pool', 'Resorts', 'Attractions', 'Pool', 'Take a dip in the resort''s themed feature pool.', 'Varies', true, 'Resort pool', 'Coronado Springs'),
('Arcade', 'Resorts', 'Attractions', 'Arcade', 'Play games at the resort''s arcade.', 'Varies', true, 'Arcade', 'Coronado Springs'),
('Movie under the stars', 'Resorts', 'Entertainment', 'Outdoor Movie', 'Watch a Disney film outdoors under the stars at the resort.', '90 min', true, 'Movie under the stars', 'Coronado Springs'),
('Overnight stay', 'Resorts', 'Events & Tours', 'Stay', 'Book a stay and spend the night at this resort, surrounded by its theming.', '1 night', true, 'Overnight stay', 'Port Orleans French Quarter'),
('Resort pool', 'Resorts', 'Attractions', 'Pool', 'Take a dip in the resort''s themed feature pool.', 'Varies', true, 'Resort pool', 'Port Orleans French Quarter'),
('Arcade', 'Resorts', 'Attractions', 'Arcade', 'Play games at the resort''s arcade.', 'Varies', true, 'Arcade', 'Port Orleans French Quarter'),
('Movie under the stars', 'Resorts', 'Entertainment', 'Outdoor Movie', 'Watch a Disney film outdoors under the stars at the resort.', '90 min', true, 'Movie under the stars', 'Port Orleans French Quarter'),
('Overnight stay', 'Resorts', 'Events & Tours', 'Stay', 'Book a stay and spend the night at this resort, surrounded by its theming.', '1 night', true, 'Overnight stay', 'Port Orleans Riverside'),
('Resort pool', 'Resorts', 'Attractions', 'Pool', 'Take a dip in the resort''s themed feature pool.', 'Varies', true, 'Resort pool', 'Port Orleans Riverside'),
('Arcade', 'Resorts', 'Attractions', 'Arcade', 'Play games at the resort''s arcade.', 'Varies', true, 'Arcade', 'Port Orleans Riverside'),
('Movie under the stars', 'Resorts', 'Entertainment', 'Outdoor Movie', 'Watch a Disney film outdoors under the stars at the resort.', '90 min', true, 'Movie under the stars', 'Port Orleans Riverside'),
('Overnight stay', 'Resorts', 'Events & Tours', 'Stay', 'Book a stay and spend the night at this resort, surrounded by its theming.', '1 night', true, 'Overnight stay', 'Fort Wilderness'),
('Resort pool', 'Resorts', 'Attractions', 'Pool', 'Take a dip in the resort''s themed feature pool.', 'Varies', true, 'Resort pool', 'Fort Wilderness'),
('Arcade', 'Resorts', 'Attractions', 'Arcade', 'Play games at the resort''s arcade.', 'Varies', true, 'Arcade', 'Fort Wilderness'),
('Movie under the stars', 'Resorts', 'Entertainment', 'Outdoor Movie', 'Watch a Disney film outdoors under the stars at the resort.', '90 min', true, 'Movie under the stars', 'Fort Wilderness'),
('Overnight stay', 'Resorts', 'Events & Tours', 'Stay', 'Book a stay and spend the night at this resort, surrounded by its theming.', '1 night', true, 'Overnight stay', 'Pop Century'),
('Resort pool', 'Resorts', 'Attractions', 'Pool', 'Take a dip in the resort''s themed feature pool.', 'Varies', true, 'Resort pool', 'Pop Century'),
('Arcade', 'Resorts', 'Attractions', 'Arcade', 'Play games at the resort''s arcade.', 'Varies', true, 'Arcade', 'Pop Century'),
('Movie under the stars', 'Resorts', 'Entertainment', 'Outdoor Movie', 'Watch a Disney film outdoors under the stars at the resort.', '90 min', true, 'Movie under the stars', 'Pop Century'),
('Overnight stay', 'Resorts', 'Events & Tours', 'Stay', 'Book a stay and spend the night at this resort, surrounded by its theming.', '1 night', true, 'Overnight stay', 'Art of Animation'),
('Resort pool', 'Resorts', 'Attractions', 'Pool', 'Take a dip in the resort''s themed feature pool.', 'Varies', true, 'Resort pool', 'Art of Animation'),
('Arcade', 'Resorts', 'Attractions', 'Arcade', 'Play games at the resort''s arcade.', 'Varies', true, 'Arcade', 'Art of Animation'),
('Movie under the stars', 'Resorts', 'Entertainment', 'Outdoor Movie', 'Watch a Disney film outdoors under the stars at the resort.', '90 min', true, 'Movie under the stars', 'Art of Animation'),
('Overnight stay', 'Resorts', 'Events & Tours', 'Stay', 'Book a stay and spend the night at this resort, surrounded by its theming.', '1 night', true, 'Overnight stay', 'All-Star Movies'),
('Resort pool', 'Resorts', 'Attractions', 'Pool', 'Take a dip in the resort''s themed feature pool.', 'Varies', true, 'Resort pool', 'All-Star Movies'),
('Arcade', 'Resorts', 'Attractions', 'Arcade', 'Play games at the resort''s arcade.', 'Varies', true, 'Arcade', 'All-Star Movies'),
('Movie under the stars', 'Resorts', 'Entertainment', 'Outdoor Movie', 'Watch a Disney film outdoors under the stars at the resort.', '90 min', true, 'Movie under the stars', 'All-Star Movies'),
('Overnight stay', 'Resorts', 'Events & Tours', 'Stay', 'Book a stay and spend the night at this resort, surrounded by its theming.', '1 night', true, 'Overnight stay', 'All-Star Music'),
('Resort pool', 'Resorts', 'Attractions', 'Pool', 'Take a dip in the resort''s themed feature pool.', 'Varies', true, 'Resort pool', 'All-Star Music'),
('Arcade', 'Resorts', 'Attractions', 'Arcade', 'Play games at the resort''s arcade.', 'Varies', true, 'Arcade', 'All-Star Music'),
('Movie under the stars', 'Resorts', 'Entertainment', 'Outdoor Movie', 'Watch a Disney film outdoors under the stars at the resort.', '90 min', true, 'Movie under the stars', 'All-Star Music'),
('Overnight stay', 'Resorts', 'Events & Tours', 'Stay', 'Book a stay and spend the night at this resort, surrounded by its theming.', '1 night', true, 'Overnight stay', 'All-Star Sports'),
('Resort pool', 'Resorts', 'Attractions', 'Pool', 'Take a dip in the resort''s themed feature pool.', 'Varies', true, 'Resort pool', 'All-Star Sports'),
('Arcade', 'Resorts', 'Attractions', 'Arcade', 'Play games at the resort''s arcade.', 'Varies', true, 'Arcade', 'All-Star Sports'),
('Movie under the stars', 'Resorts', 'Entertainment', 'Outdoor Movie', 'Watch a Disney film outdoors under the stars at the resort.', '90 min', true, 'Movie under the stars', 'All-Star Sports'),
('Overnight stay', 'Resorts', 'Events & Tours', 'Stay', 'Book a stay and spend the night at this resort, surrounded by its theming.', '1 night', true, 'Overnight stay', 'Old Key West'),
('Resort pool', 'Resorts', 'Attractions', 'Pool', 'Take a dip in the resort''s themed feature pool.', 'Varies', true, 'Resort pool', 'Old Key West'),
('Arcade', 'Resorts', 'Attractions', 'Arcade', 'Play games at the resort''s arcade.', 'Varies', true, 'Arcade', 'Old Key West'),
('Movie under the stars', 'Resorts', 'Entertainment', 'Outdoor Movie', 'Watch a Disney film outdoors under the stars at the resort.', '90 min', true, 'Movie under the stars', 'Old Key West'),
('Overnight stay', 'Resorts', 'Events & Tours', 'Stay', 'Book a stay and spend the night at this resort, surrounded by its theming.', '1 night', true, 'Overnight stay', 'Saratoga Springs'),
('Resort pool', 'Resorts', 'Attractions', 'Pool', 'Take a dip in the resort''s themed feature pool.', 'Varies', true, 'Resort pool', 'Saratoga Springs'),
('Arcade', 'Resorts', 'Attractions', 'Arcade', 'Play games at the resort''s arcade.', 'Varies', true, 'Arcade', 'Saratoga Springs'),
('Movie under the stars', 'Resorts', 'Entertainment', 'Outdoor Movie', 'Watch a Disney film outdoors under the stars at the resort.', '90 min', true, 'Movie under the stars', 'Saratoga Springs'),
('Overnight stay', 'Resorts', 'Events & Tours', 'Stay', 'Book a stay and spend the night at this resort, surrounded by its theming.', '1 night', true, 'Overnight stay', 'Swan'),
('Resort pool', 'Resorts', 'Attractions', 'Pool', 'Take a dip in the resort''s themed feature pool.', 'Varies', true, 'Resort pool', 'Swan'),
('Overnight stay', 'Resorts', 'Events & Tours', 'Stay', 'Book a stay and spend the night at this resort, surrounded by its theming.', '1 night', true, 'Overnight stay', 'Dolphin'),
('Resort pool', 'Resorts', 'Attractions', 'Pool', 'Take a dip in the resort''s themed feature pool.', 'Varies', true, 'Resort pool', 'Dolphin'),
('Overnight stay', 'Resorts', 'Events & Tours', 'Stay', 'Book a stay and spend the night at this resort, surrounded by its theming.', '1 night', true, 'Overnight stay', 'Swan Reserve'),
('Resort pool', 'Resorts', 'Attractions', 'Pool', 'Take a dip in the resort''s themed feature pool.', 'Varies', true, 'Resort pool', 'Swan Reserve');

-- 90 activities across 24 resorts
-- ═══════════════════════════════════════════════════════════════════
-- RESORTS — Phase 3, batch 1: monorail deluxe resorts (July 2026)
-- Resort-specific extras for Grand Floridian, Polynesian, Contemporary.
-- Additive — assumes Phase 1 + Phase 2 already run. Run once.
-- ═══════════════════════════════════════════════════════════════════

INSERT INTO experiences (name, park, category, type, description, duration, is_active, sort_name, location) VALUES

-- ── Grand Floridian ──────────────────────────────────────────────────
('Monorail ride', 'Resorts', 'Attractions', 'Transportation', 'Ride the resort monorail to Magic Kingdom and around the Seven Seas Lagoon loop.', '15 min', true, 'Monorail ride', 'Grand Floridian'),
('Boat to Magic Kingdom', 'Resorts', 'Attractions', 'Boat', 'Take the water launch across the Seven Seas Lagoon to Magic Kingdom.', '15 min', true, 'Boat to Magic Kingdom', 'Grand Floridian'),
('Resort beach', 'Resorts', 'Attractions', 'Beach', 'Relax on the white-sand beach with a view across the lagoon to Cinderella Castle.', 'Varies', true, 'Resort beach', 'Grand Floridian'),
('Senses Spa', 'Resorts', 'Events & Tours', 'Spa', 'Unwind with a treatment at the resort''s full-service spa.', '60 min', true, 'Senses Spa', 'Grand Floridian'),
('Grand Floridian Society Orchestra', 'Resorts', 'Entertainment', 'Live Music', 'Listen to the live band and pianist perform in the grand lobby.', '30 min', true, 'Grand Floridian Society Orchestra', 'Grand Floridian'),
('Garden View Tea Room', 'Resorts', 'Dining', 'Table Service', 'Enjoy a proper afternoon tea with sandwiches, scones, and pastries.', '90 min', true, 'Garden View Tea Room', 'Grand Floridian'),
('Gasparilla Island Grill', 'Resorts', 'Dining', 'Quick Service', 'Grab a bite around the clock at the resort''s waterfront quick service.', '15 min', true, 'Gasparilla Island Grill', 'Grand Floridian'),

-- ── Polynesian ───────────────────────────────────────────────────────
('Monorail ride', 'Resorts', 'Attractions', 'Transportation', 'Ride the resort monorail to Magic Kingdom and around the Seven Seas Lagoon loop.', '15 min', true, 'Monorail ride', 'Polynesian'),
('Boat to Magic Kingdom', 'Resorts', 'Attractions', 'Boat', 'Take the water launch across the Seven Seas Lagoon to Magic Kingdom.', '15 min', true, 'Boat to Magic Kingdom', 'Polynesian'),
('Resort beach', 'Resorts', 'Attractions', 'Beach', 'Watch the fireworks and Electrical Water Pageant from the white-sand beach.', 'Varies', true, 'Resort beach', 'Polynesian'),
('Capt. Cook''s', 'Resorts', 'Dining', 'Quick Service', 'Island-inspired quick service open around the clock — home of the Tonga Toast.', '15 min', true, 'Capt. Cook''s', 'Polynesian'),
('Pineapple Lanai', 'Resorts', 'Dining', 'Snack', 'Get a Dole Whip at this walk-up window near the Great Ceremonial House.', '5 min', true, 'Pineapple Lanai', 'Polynesian'),

-- ── Contemporary ─────────────────────────────────────────────────────
('Monorail ride', 'Resorts', 'Attractions', 'Transportation', 'Ride the monorail as it glides right through the resort''s soaring atrium.', '15 min', true, 'Monorail ride', 'Contemporary'),
('Bay Lake beach', 'Resorts', 'Attractions', 'Beach', 'Relax on the beach along Bay Lake with a view toward Magic Kingdom.', 'Varies', true, 'Bay Lake beach', 'Contemporary'),
('Marina boat rentals', 'Resorts', 'Attractions', 'Recreation', 'Rent a boat and cruise Bay Lake from the resort marina.', '30 min', true, 'Marina boat rentals', 'Contemporary'),
('Contempo Café', 'Resorts', 'Dining', 'Quick Service', 'Grab-and-go quick service in the fourth-floor Grand Canyon Concourse.', '15 min', true, 'Contempo Café', 'Contemporary'),
('The Sand Bar', 'Resorts', 'Dining', 'Bar & Lounge', 'Poolside bar serving cocktails, beer, and light bites by the feature pool.', '30 min', true, 'The Sand Bar', 'Contemporary');
-- ═══════════════════════════════════════════════════════════════════
-- RESORTS — Phase 3, batch 2: Epcot-area deluxe resorts (July 2026)
-- Beach Club, Yacht Club, BoardWalk Inn, Riviera.
-- Additive — assumes Phase 1 + Phase 2 already run. Run once.
-- ═══════════════════════════════════════════════════════════════════

INSERT INTO experiences (name, park, category, type, description, duration, is_active, sort_name, location) VALUES

-- ── Beach Club ───────────────────────────────────────────────────────
('Boat to Epcot', 'Resorts', 'Attractions', 'Boat', 'Take the Friendship boat to Epcot''s International Gateway — or just walk over.', '10 min', true, 'Boat to Epcot', 'Beach Club'),
('Boat to Hollywood Studios', 'Resorts', 'Attractions', 'Boat', 'Cruise across Crescent Lake to Disney''s Hollywood Studios.', '20 min', true, 'Boat to Hollywood Studios', 'Beach Club'),
('Resort beach', 'Resorts', 'Attractions', 'Beach', 'Relax on the white-sand beach along Crescent Lake.', 'Varies', true, 'Resort beach', 'Beach Club'),
('Bayside Marina boat rentals', 'Resorts', 'Attractions', 'Recreation', 'Rent a boat and cruise Crescent Lake from the marina.', '30 min', true, 'Bayside Marina boat rentals', 'Beach Club'),
('Cape May Cafe', 'Resorts', 'Dining', 'Character Dining', 'Character breakfast with Minnie and pals, plus a New England seafood dinner buffet.', '75 min', true, 'Cape May Cafe', 'Beach Club'),
('Beach Club Marketplace', 'Resorts', 'Dining', 'Quick Service', 'Grab sandwiches, flatbreads, and pastries at the resort''s quick service.', '15 min', true, 'Beach Club Marketplace', 'Beach Club'),

-- ── Yacht Club ───────────────────────────────────────────────────────
('Boat to Epcot', 'Resorts', 'Attractions', 'Boat', 'Take the Friendship boat to Epcot''s International Gateway — or just walk over.', '10 min', true, 'Boat to Epcot', 'Yacht Club'),
('Boat to Hollywood Studios', 'Resorts', 'Attractions', 'Boat', 'Cruise across Crescent Lake to Disney''s Hollywood Studios.', '20 min', true, 'Boat to Hollywood Studios', 'Yacht Club'),
('The Yachtsman Steakhouse', 'Resorts', 'Dining', 'Signature Dining', 'Hand-cut steaks and chops in a nautical-themed signature restaurant.', '90 min', true, 'Yachtsman Steakhouse', 'Yacht Club'),
('Ale & Compass Restaurant', 'Resorts', 'Dining', 'Table Service', 'New England comfort food for breakfast, lunch, and dinner.', '60 min', true, 'Ale & Compass Restaurant', 'Yacht Club'),
('Crew''s Cup Lounge', 'Resorts', 'Dining', 'Bar & Lounge', 'Cozy nautical pub with regional beers and shareable bites.', '45 min', true, 'Crew''s Cup Lounge', 'Yacht Club'),

-- ── BoardWalk Inn ────────────────────────────────────────────────────
('Walk to Epcot', 'Resorts', 'Attractions', 'Walkway', 'Stroll the lakeside path to Epcot''s International Gateway.', '10 min', true, 'Walk to Epcot', 'BoardWalk Inn'),
('Boat to Hollywood Studios', 'Resorts', 'Attractions', 'Boat', 'Cruise across Crescent Lake to Disney''s Hollywood Studios.', '20 min', true, 'Boat to Hollywood Studios', 'BoardWalk Inn'),
('Stroll the BoardWalk', 'Resorts', 'Entertainment', 'Street Entertainment', 'Walk the 1930s-style lakeside promenade with street performers, snacks, and games.', 'Varies', true, 'Stroll the BoardWalk', 'BoardWalk Inn'),
('Surrey bike rentals', 'Resorts', 'Attractions', 'Recreation', 'Pedal a surrey bike along the BoardWalk promenade.', '30 min', true, 'Surrey bike rentals', 'BoardWalk Inn'),
('Trattoria al Forno', 'Resorts', 'Dining', 'Table Service', 'Rustic Italian dishes and wood-fired specialties on the BoardWalk.', '60 min', true, 'Trattoria al Forno', 'BoardWalk Inn'),
('AbracadaBar', 'Resorts', 'Dining', 'Bar & Lounge', 'Magic-themed cocktail lounge full of vintage illusionist charm.', '45 min', true, 'AbracadaBar', 'BoardWalk Inn'),

-- ── Riviera ──────────────────────────────────────────────────────────
('Skyliner to Epcot', 'Resorts', 'Attractions', 'Transportation', 'Glide over to Epcot''s International Gateway on the Disney Skyliner.', '15 min', true, 'Skyliner to Epcot', 'Riviera'),
('Skyliner to Hollywood Studios', 'Resorts', 'Attractions', 'Transportation', 'Soar to Disney''s Hollywood Studios on the Disney Skyliner.', '15 min', true, 'Skyliner to Hollywood Studios', 'Riviera'),
('Primo Piatto', 'Resorts', 'Dining', 'Quick Service', 'French- and Italian-inspired quick service — a local favorite for breakfast.', '15 min', true, 'Primo Piatto', 'Riviera'),
('Bar Riva', 'Resorts', 'Dining', 'Bar & Lounge', 'Poolside bar with Mediterranean-inspired cocktails and bites.', '30 min', true, 'Bar Riva', 'Riviera'),
('Le Petit Cafe', 'Resorts', 'Dining', 'Bar & Lounge', 'Lobby cafe serving coffee by day and cocktails by night.', '30 min', true, 'Le Petit Cafe', 'Riviera');
-- ═══════════════════════════════════════════════════════════════════
-- RESORTS — Phase 3, batch 3: nature deluxe resorts (July 2026)
-- Wilderness Lodge, Animal Kingdom Lodge.
-- Additive — assumes Phase 1 + Phase 2 already run. Run once.
-- ═══════════════════════════════════════════════════════════════════

INSERT INTO experiences (name, park, category, type, description, duration, is_active, sort_name, location) VALUES

-- ── Wilderness Lodge ─────────────────────────────────────────────────
('Boat to Magic Kingdom', 'Resorts', 'Attractions', 'Boat', 'Take the water launch across Bay Lake to Magic Kingdom.', '15 min', true, 'Boat to Magic Kingdom', 'Wilderness Lodge'),
('Fire Rock Geyser', 'Resorts', 'Attractions', 'Landmark', 'Watch the resort''s geyser erupt on the hour, Old Faithful style.', '5 min', true, 'Fire Rock Geyser', 'Wilderness Lodge'),
('Explore the grand lobby', 'Resorts', 'Attractions', 'Landmark', 'Take in the towering fireplace, totem poles, and log-cabin grandeur of the lobby.', 'Varies', true, 'Explore the grand lobby', 'Wilderness Lodge'),
('Bike & boat rentals', 'Resorts', 'Attractions', 'Recreation', 'Rent bikes or boats and explore the shoreline of Bay Lake.', '30 min', true, 'Bike & boat rentals', 'Wilderness Lodge'),
('Roaring Fork', 'Resorts', 'Dining', 'Quick Service', 'Woodsy quick service with hearty breakfasts and grab-and-go meals.', '15 min', true, 'Roaring Fork', 'Wilderness Lodge'),
('Territory Lounge', 'Resorts', 'Dining', 'Bar & Lounge', 'Explorer-themed lounge with craft beers, wines, and small plates.', '45 min', true, 'Territory Lounge', 'Wilderness Lodge'),

-- ── Animal Kingdom Lodge ─────────────────────────────────────────────
('Savanna animal viewing', 'Resorts', 'Attractions', 'Wildlife', 'Watch giraffes, zebras, and more roam the savannas from the resort overlooks.', 'Varies', true, 'Savanna animal viewing', 'Animal Kingdom Lodge'),
('Night-vision savanna viewing', 'Resorts', 'Attractions', 'Wildlife', 'Spot nocturnal animals on the savanna with the resort''s night-vision goggles.', 'Varies', true, 'Night-vision savanna viewing', 'Animal Kingdom Lodge'),
('Cultural safari programs', 'Resorts', 'Events & Tours', 'Tour', 'Join complimentary cultural activities and animal programs led by resort cast.', '30 min', true, 'Cultural safari programs', 'Animal Kingdom Lodge'),
('Wanyama Safari & Dinner', 'Resorts', 'Events & Tours', 'Tour', 'Take a private savanna safari followed by a multi-course dinner at Jiko.', '3 hours', true, 'Wanyama Safari & Dinner', 'Animal Kingdom Lodge'),
('The Mara', 'Resorts', 'Dining', 'Quick Service', 'African-inspired quick service open around the clock.', '15 min', true, 'The Mara', 'Animal Kingdom Lodge'),
('Victoria Falls Lounge', 'Resorts', 'Dining', 'Bar & Lounge', 'Mezzanine lounge overlooking Boma with African wines and cocktails.', '45 min', true, 'Victoria Falls Lounge', 'Animal Kingdom Lodge');
-- ═══════════════════════════════════════════════════════════════════
-- RESORTS — Phase 3, batch 4: remaining resorts (July 2026)
-- Moderates, Values, DVC, and the Marriott (Swan/Dolphin/Swan Reserve).
-- Additive — assumes Phase 1 + Phase 2 already run. Run once.
-- ═══════════════════════════════════════════════════════════════════

INSERT INTO experiences (name, park, category, type, description, duration, is_active, sort_name, location) VALUES

-- ══ MODERATES ══════════════════════════════════════════════════════

-- ── Caribbean Beach ──────────────────────────────────────────────────
('Skyliner to Epcot', 'Resorts', 'Attractions', 'Transportation', 'Glide to Epcot''s International Gateway on the Disney Skyliner from the resort hub.', '15 min', true, 'Skyliner to Epcot', 'Caribbean Beach'),
('Skyliner to Hollywood Studios', 'Resorts', 'Attractions', 'Transportation', 'Soar to Disney''s Hollywood Studios on the Disney Skyliner.', '15 min', true, 'Skyliner to Hollywood Studios', 'Caribbean Beach'),
('Centertown Market', 'Resorts', 'Dining', 'Quick Service', 'Caribbean-inspired food hall with island flavors.', '15 min', true, 'Centertown Market', 'Caribbean Beach'),
('Banana Cabana', 'Resorts', 'Dining', 'Bar & Lounge', 'Poolside bar serving rum drinks and tropical cocktails.', '30 min', true, 'Banana Cabana', 'Caribbean Beach'),
('Barefoot Bay boat & bike rentals', 'Resorts', 'Attractions', 'Recreation', 'Rent boats and bikes to explore Barefoot Bay and the resort villages.', '30 min', true, 'Barefoot Bay boat & bike rentals', 'Caribbean Beach'),

-- ── Coronado Springs ─────────────────────────────────────────────────
('Dahlia Lounge', 'Resorts', 'Dining', 'Bar & Lounge', 'Rooftop lounge atop Gran Destino Tower with skyline views and craft cocktails.', '45 min', true, 'Dahlia Lounge', 'Coronado Springs'),
('Three Bridges Bar & Grill', 'Resorts', 'Dining', 'Bar & Lounge', 'Restaurant and bar on an island in the middle of Lago Dorado.', '60 min', true, 'Three Bridges Bar & Grill', 'Coronado Springs'),
('El Mercado de Coronado', 'Resorts', 'Dining', 'Quick Service', 'Mexican- and American-inspired food hall.', '15 min', true, 'El Mercado de Coronado', 'Coronado Springs'),
('Lago Dorado boat rentals', 'Resorts', 'Attractions', 'Recreation', 'Rent a boat and cruise the resort''s central lake.', '30 min', true, 'Lago Dorado boat rentals', 'Coronado Springs'),

-- ── Port Orleans French Quarter ──────────────────────────────────────
('Boat to Disney Springs', 'Resorts', 'Attractions', 'Boat', 'Cruise the Sassagoula River to Disney Springs.', '25 min', true, 'Boat to Disney Springs', 'Port Orleans French Quarter'),
('Sassagoula Floatworks & Food Factory', 'Resorts', 'Dining', 'Quick Service', 'New Orleans-style food court famous for fresh beignets.', '15 min', true, 'Sassagoula Floatworks & Food Factory', 'Port Orleans French Quarter'),
('Scat Cat''s Club', 'Resorts', 'Dining', 'Bar & Lounge', 'Jazzy lounge with signature cocktails and, some nights, live music.', '45 min', true, 'Scat Cat''s Club', 'Port Orleans French Quarter'),
('Bike & surrey rentals', 'Resorts', 'Attractions', 'Recreation', 'Rent bikes or surreys and ride the riverside paths.', '30 min', true, 'Bike & surrey rentals', 'Port Orleans French Quarter'),

-- ── Port Orleans Riverside ───────────────────────────────────────────
('Boat to Disney Springs', 'Resorts', 'Attractions', 'Boat', 'Cruise the Sassagoula River to Disney Springs.', '25 min', true, 'Boat to Disney Springs', 'Port Orleans Riverside'),
('Boatwright''s Dining Hall', 'Resorts', 'Dining', 'Table Service', 'Cajun and Southern comfort food in a working shipyard setting.', '60 min', true, 'Boatwright''s Dining Hall', 'Port Orleans Riverside'),
('Riverside Mill Food Court', 'Resorts', 'Dining', 'Quick Service', 'Food court set around a working cotton-press water wheel.', '15 min', true, 'Riverside Mill Food Court', 'Port Orleans Riverside'),
('River Roost Lounge', 'Resorts', 'Dining', 'Bar & Lounge', 'Riverside lounge with live entertainment from Yehaa Bob most nights.', '45 min', true, 'River Roost Lounge', 'Port Orleans Riverside'),
('Bike & boat rentals', 'Resorts', 'Attractions', 'Recreation', 'Rent bikes or boats and explore the riverside grounds.', '30 min', true, 'Bike & boat rentals', 'Port Orleans Riverside'),

-- ── Fort Wilderness ──────────────────────────────────────────────────
('Archery experience', 'Resorts', 'Events & Tours', 'Tour', 'Learn to shoot a compound bow at the resort''s archery range.', '90 min', true, 'Archery experience', 'Fort Wilderness'),
('Horseback trail rides', 'Resorts', 'Events & Tours', 'Tour', 'Ride the wooded trails on horseback from the Tri-Circle-D Ranch.', '45 min', true, 'Horseback trail rides', 'Fort Wilderness'),
('Tri-Circle-D Ranch', 'Resorts', 'Attractions', 'Wildlife', 'Meet the horses and ponies at the resort''s working ranch.', 'Varies', true, 'Tri-Circle-D Ranch', 'Fort Wilderness'),
('Bike, boat & canoe rentals', 'Resorts', 'Attractions', 'Recreation', 'Rent bikes, boats, and canoes to explore the campground and Bay Lake.', '30 min', true, 'Bike, boat & canoe rentals', 'Fort Wilderness'),
('Trail''s End Restaurant', 'Resorts', 'Dining', 'Quick Service', 'Hearty home-style meals and grab-and-go near the campground.', '30 min', true, 'Trail''s End Restaurant', 'Fort Wilderness'),
('Crockett''s Tavern', 'Resorts', 'Dining', 'Bar & Lounge', 'Frontier-themed tavern with cocktails and shareable bites.', '45 min', true, 'Crockett''s Tavern', 'Fort Wilderness'),

-- ══ VALUES ═════════════════════════════════════════════════════════

-- ── Pop Century ──────────────────────────────────────────────────────
('Skyliner to Epcot', 'Resorts', 'Attractions', 'Transportation', 'Glide to Epcot''s International Gateway on the Disney Skyliner.', '20 min', true, 'Skyliner to Epcot', 'Pop Century'),
('Skyliner to Hollywood Studios', 'Resorts', 'Attractions', 'Transportation', 'Soar to Disney''s Hollywood Studios on the Disney Skyliner.', '15 min', true, 'Skyliner to Hollywood Studios', 'Pop Century'),
('Everything Pop Food Court', 'Resorts', 'Dining', 'Quick Service', 'Decades-themed food court with build-your-own meals and giant treats.', '15 min', true, 'Everything Pop Food Court', 'Pop Century'),
('Petals Pool Bar', 'Resorts', 'Dining', 'Bar & Lounge', 'Poolside bar by the flower-power Hippy Dippy Pool.', '30 min', true, 'Petals Pool Bar', 'Pop Century'),
('Giant icon photo ops', 'Resorts', 'Attractions', 'Landmark', 'Snap photos with the resort''s four-story pop-culture icons.', 'Varies', true, 'Giant icon photo ops', 'Pop Century'),

-- ── Art of Animation ─────────────────────────────────────────────────
('Skyliner to Epcot', 'Resorts', 'Attractions', 'Transportation', 'Glide to Epcot''s International Gateway on the Disney Skyliner.', '20 min', true, 'Skyliner to Epcot', 'Art of Animation'),
('Skyliner to Hollywood Studios', 'Resorts', 'Attractions', 'Transportation', 'Soar to Disney''s Hollywood Studios on the Disney Skyliner.', '15 min', true, 'Skyliner to Hollywood Studios', 'Art of Animation'),
('Landscape of Flavors', 'Resorts', 'Dining', 'Quick Service', 'Bright food court with made-to-order meals and famous milkshakes.', '15 min', true, 'Landscape of Flavors', 'Art of Animation'),
('Explore the themed courtyards', 'Resorts', 'Attractions', 'Landmark', 'Wander the Cars, Nemo, Lion King, and Little Mermaid courtyards with giant statues.', 'Varies', true, 'Explore the themed courtyards', 'Art of Animation'),
('Drop Off Pool Bar', 'Resorts', 'Dining', 'Bar & Lounge', 'Poolside bar at the Finding Nemo-themed Big Blue Pool.', '30 min', true, 'Drop Off Pool Bar', 'Art of Animation'),

-- ── All-Star Movies ──────────────────────────────────────────────────
('World Premiere Food Court', 'Resorts', 'Dining', 'Quick Service', 'Movie-themed food court with build-your-own meals.', '15 min', true, 'World Premiere Food Court', 'All-Star Movies'),
('Silver Screen Spirits Pool Bar', 'Resorts', 'Dining', 'Bar & Lounge', 'Poolside bar by the Fantasia pool.', '30 min', true, 'Silver Screen Spirits Pool Bar', 'All-Star Movies'),
('Giant movie icon photo ops', 'Resorts', 'Attractions', 'Landmark', 'Pose with towering icons from 101 Dalmatians, Toy Story, and more.', 'Varies', true, 'Giant movie icon photo ops', 'All-Star Movies'),

-- ── All-Star Music ───────────────────────────────────────────────────
('Intermission Food Court', 'Resorts', 'Dining', 'Quick Service', 'Music-themed food court with grab-and-go and hot entrees.', '15 min', true, 'Intermission Food Court', 'All-Star Music'),
('Singing Spirits Pool Bar', 'Resorts', 'Dining', 'Bar & Lounge', 'Poolside bar by the guitar-shaped Calypso Pool.', '30 min', true, 'Singing Spirits Pool Bar', 'All-Star Music'),
('Giant music icon photo ops', 'Resorts', 'Attractions', 'Landmark', 'Snap photos with giant guitars, cowboy boots, and maracas.', 'Varies', true, 'Giant music icon photo ops', 'All-Star Music'),

-- ── All-Star Sports ──────────────────────────────────────────────────
('End Zone Food Court', 'Resorts', 'Dining', 'Quick Service', 'Sports-themed food court with build-your-own meals.', '15 min', true, 'End Zone Food Court', 'All-Star Sports'),
('Grandstand Spirits Pool Bar', 'Resorts', 'Dining', 'Bar & Lounge', 'Poolside bar by the Surfboard Bay Pool.', '30 min', true, 'Grandstand Spirits Pool Bar', 'All-Star Sports'),
('Giant sports icon photo ops', 'Resorts', 'Attractions', 'Landmark', 'Pose with giant football helmets, tennis cans, and surfboards.', 'Varies', true, 'Giant sports icon photo ops', 'All-Star Sports'),

-- ══ DVC ════════════════════════════════════════════════════════════

-- ── Old Key West ─────────────────────────────────────────────────────
('Boat to Disney Springs', 'Resorts', 'Attractions', 'Boat', 'Cruise the Sassagoula River to Disney Springs.', '20 min', true, 'Boat to Disney Springs', 'Old Key West'),
('Olivia''s Cafe', 'Resorts', 'Dining', 'Table Service', 'Key West-style home cooking with island flair.', '60 min', true, 'Olivia''s Cafe', 'Old Key West'),
('Good''s Food to Go', 'Resorts', 'Dining', 'Quick Service', 'Walk-up window with burgers, sandwiches, and conch fritters.', '15 min', true, 'Good''s Food to Go', 'Old Key West'),
('Gurgling Suitcase', 'Resorts', 'Dining', 'Bar & Lounge', 'Tiny, beloved bar serving the potent Rum Runner.', '30 min', true, 'Gurgling Suitcase', 'Old Key West'),
('Bike & boat rentals', 'Resorts', 'Attractions', 'Recreation', 'Rent bikes or boats and explore the waterways and villages.', '30 min', true, 'Bike & boat rentals', 'Old Key West'),

-- ── Saratoga Springs ─────────────────────────────────────────────────
('Boat to Disney Springs', 'Resorts', 'Attractions', 'Boat', 'Cruise across Village Lake to Disney Springs.', '10 min', true, 'Boat to Disney Springs', 'Saratoga Springs'),
('The Turf Club Bar and Grill', 'Resorts', 'Dining', 'Table Service', 'Equestrian-themed grill with steaks, seafood, and a golf-course view.', '60 min', true, 'Turf Club Bar and Grill', 'Saratoga Springs'),
('The Artist''s Palette', 'Resorts', 'Dining', 'Quick Service', 'Quick service with flatbreads, sandwiches, and grab-and-go.', '15 min', true, 'Artist''s Palette', 'Saratoga Springs'),
('Senses Spa', 'Resorts', 'Events & Tours', 'Spa', 'Relax with a treatment at the resort''s full-service spa.', '60 min', true, 'Senses Spa', 'Saratoga Springs'),
('Bike & boat rentals', 'Resorts', 'Attractions', 'Recreation', 'Rent bikes or boats and explore the resort''s waterways.', '30 min', true, 'Bike & boat rentals', 'Saratoga Springs'),

-- ══ MARRIOTT (Swan / Dolphin / Swan Reserve) ═══════════════════════

-- ── Swan ─────────────────────────────────────────────────────────────
('Boat to Epcot', 'Resorts', 'Attractions', 'Boat', 'Take the Friendship boat to Epcot''s International Gateway — or walk over.', '10 min', true, 'Boat to Epcot', 'Swan'),
('Boat to Hollywood Studios', 'Resorts', 'Attractions', 'Boat', 'Cruise across Crescent Lake to Disney''s Hollywood Studios.', '20 min', true, 'Boat to Hollywood Studios', 'Swan'),
('Garden Grove', 'Resorts', 'Dining', 'Table Service', 'Garden-themed restaurant with character dining on select mornings.', '60 min', true, 'Garden Grove', 'Swan'),
('Il Mulino', 'Resorts', 'Dining', 'Table Service', 'New York-style Italian trattoria with rustic Abruzzo dishes.', '75 min', true, 'Il Mulino', 'Swan'),

-- ── Dolphin ──────────────────────────────────────────────────────────
('Boat to Epcot', 'Resorts', 'Attractions', 'Boat', 'Take the Friendship boat to Epcot''s International Gateway — or walk over.', '10 min', true, 'Boat to Epcot', 'Dolphin'),
('Boat to Hollywood Studios', 'Resorts', 'Attractions', 'Boat', 'Cruise across Crescent Lake to Disney''s Hollywood Studios.', '20 min', true, 'Boat to Hollywood Studios', 'Dolphin'),
('Todd English''s bluezoo', 'Resorts', 'Dining', 'Signature Dining', 'Modern coastal seafood in a stylish, upscale setting.', '90 min', true, 'Todd English''s bluezoo', 'Dolphin'),
('Shula''s Steak House', 'Resorts', 'Dining', 'Signature Dining', 'Premium steakhouse with certified Angus beef.', '90 min', true, 'Shula''s Steak House', 'Dolphin'),
('Fuel', 'Resorts', 'Dining', 'Quick Service', 'Grab-and-go market for coffee, sandwiches, and snacks.', '10 min', true, 'Fuel', 'Dolphin'),

-- ── Swan Reserve ─────────────────────────────────────────────────────
('Boat to Epcot', 'Resorts', 'Attractions', 'Boat', 'Walk to the Swan/Dolphin dock and boat to Epcot''s International Gateway.', '15 min', true, 'Boat to Epcot', 'Swan Reserve'),
('Amare', 'Resorts', 'Dining', 'Table Service', 'Mediterranean-inspired dining with a rooftop-view setting.', '75 min', true, 'Amare', 'Swan Reserve'),
('Stir', 'Resorts', 'Dining', 'Bar & Lounge', 'Lobby bar with craft cocktails and light bites.', '30 min', true, 'Stir', 'Swan Reserve');
