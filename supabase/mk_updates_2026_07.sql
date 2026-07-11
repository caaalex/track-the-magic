-- ============================================================
-- Magic Kingdom — batch updates (2026-07)
-- Run in the Supabase SQL Editor. Review the flagged NOTES first.
--
-- Column order everywhere:
--   (name, park, category, type, description, opening_year,
--    duration, is_active, sort_name, location)
--
-- NOTE: `location` = the land. Confirm these strings match your
-- existing land labels (e.g. 'Main Street, U.S.A.', 'Fantasyland',
-- 'Adventureland', 'Tomorrowland'). Adjust type/description freely.
-- ============================================================


-- ============================================================
-- ATTRACTIONS
-- ============================================================

-- Remove Liberty Square Riverboat (permanent, cascades)
DELETE FROM experiences
WHERE park = 'Magic Kingdom' AND category = 'Attractions'
  AND name ILIKE '%liberty square river%';

-- Rename People Mover → Tomorrowland Transit Authority PeopleMover
UPDATE experiences
SET name = 'Tomorrowland Transit Authority PeopleMover',
    sort_name = 'Tomorrowland Transit Authority PeopleMover'
WHERE park = 'Magic Kingdom' AND name ILIKE '%people mover%';

-- Move Mickey's PhilharMagic from Entertainment → Attractions
-- (preserves any existing user tracking). If this reports "0 rows",
-- it wasn't found — run the fallback INSERT commented below instead.
UPDATE experiences
SET category = 'Attractions', type = 'Show', location = 'Fantasyland'
WHERE park = 'Magic Kingdom' AND name = 'Mickey''s PhilharMagic';
--   Fallback if the UPDATE affected 0 rows:
-- INSERT INTO experiences (name, park, category, type, description, opening_year, duration, is_active, sort_name, location) VALUES
-- ('Mickey''s PhilharMagic', 'Magic Kingdom', 'Attractions', 'Show', '3D musical film journey through classic Disney songs with Donald Duck.', '2003', '12 min', true, 'Mickey''s PhilharMagic', 'Fantasyland');

-- New attractions
INSERT INTO experiences (name, park, category, type, description, opening_year, duration, is_active, sort_name, location) VALUES
('Casey Jr. Splash ''N'' Soak Station', 'Magic Kingdom', 'Attractions', 'Kids Area', 'Circus-train water play area where kids cool off among the animals of Storybook Circus.', '2012', NULL, true, 'Casey Jr. Splash ''N'' Soak Station', 'Fantasyland'),
('Cinderella Castle', 'Magic Kingdom', 'Attractions', 'Landmark', 'The iconic centerpiece of Magic Kingdom and its most photographed landmark.', '1971', NULL, true, 'Cinderella Castle', 'Fantasyland'),
('A Pirate''s Adventure: Treasures of the Seven Seas', 'Magic Kingdom', 'Attractions', 'Interactive Experience', 'Interactive treasure-hunt game through Adventureland using an enchanted pirate map.', '2013', '20 min', true, 'A Pirate''s Adventure: Treasures of the Seven Seas', 'Adventureland'),
('Smellephants on Parade', 'Magic Kingdom', 'Attractions', 'Interactive Experience', 'Whimsical scent-based interactive trail in Storybook Circus.', '2025', NULL, true, 'Smellephants on Parade', 'Fantasyland');


-- ============================================================
-- ENTERTAINMENT
-- ============================================================

-- Removals (permanent, cascade). Mickey's PhilharMagic is NOT deleted
-- here — it was moved to Attractions above.
DELETE FROM experiences
WHERE park = 'Magic Kingdom' AND category = 'Entertainment'
  AND (
       name ILIKE '%electrical water pageant%'
    OR name = 'Mickey''s Once Upon a Christmastime Parade'
    OR name ILIKE '%mousekedance%'
  );

-- New entertainment
INSERT INTO experiences (name, park, category, type, description, opening_year, duration, is_active, sort_name, location) VALUES
('Casey''s Corner Pianist', 'Magic Kingdom', 'Entertainment', 'Live Music', 'Ragtime piano performances outside Casey''s Corner on Main Street.', NULL, NULL, true, 'Casey''s Corner Pianist', 'Main Street, U.S.A.'),
('The Dapper Dans', 'Magic Kingdom', 'Entertainment', 'Live Music', 'Classic barbershop quartet harmonizing up and down Main Street.', NULL, NULL, true, 'The Dapper Dans', 'Main Street, U.S.A.'),
('Disney Adventure Friends Cavalcade', 'Magic Kingdom', 'Entertainment', 'Parade', 'Mini-parade of Disney adventurers making their way along the parade route.', NULL, NULL, true, 'Disney Adventure Friends Cavalcade', NULL),
('Disney Starlight: Dream the Night Away', 'Magic Kingdom', 'Entertainment', 'Parade', 'Nighttime parade lighting up the streets of Magic Kingdom.', '2025', NULL, true, 'Disney Starlight: Dream the Night Away', NULL),
('Flag Retreat', 'Magic Kingdom', 'Entertainment', 'Street Entertainment', 'Daily patriotic flag-lowering ceremony in Town Square.', NULL, NULL, true, 'Flag Retreat', 'Main Street, U.S.A.'),
('Main Street Philharmonic', 'Magic Kingdom', 'Entertainment', 'Live Music', 'Brass-and-percussion marching band performing along Main Street, U.S.A.', NULL, NULL, true, 'Main Street Philharmonic', 'Main Street, U.S.A.');


-- ============================================================
-- CHARACTERS  — delete all Magic Kingdom characters, then re-add
-- (permanent; wipes user tracking for old character meets)
-- ============================================================

DELETE FROM experiences
WHERE park = 'Magic Kingdom' AND category = 'Characters';

INSERT INTO experiences (name, park, category, type, description, opening_year, duration, is_active, sort_name, location) VALUES
('Meet Ariel at Her Grotto', 'Magic Kingdom', 'Characters', 'Character Meet', 'Meet Ariel in her seaside grotto in Fantasyland.', NULL, NULL, true, 'Meet Ariel at Her Grotto', 'Fantasyland'),
('Meet Characters from Aladdin in Adventureland', 'Magic Kingdom', 'Characters', 'Character Meet', 'Meet characters from Aladdin in Adventureland.', NULL, NULL, true, 'Meet Characters from Aladdin in Adventureland', 'Adventureland'),
('Meet Cinderella and a Visiting Princess at Princess Fairytale Hall', 'Magic Kingdom', 'Characters', 'Character Meet', 'Meet Cinderella and a visiting princess at Princess Fairytale Hall.', NULL, NULL, true, 'Meet Cinderella and a Visiting Princess at Princess Fairytale Hall', 'Fantasyland'),
('Meet Daring Disney Pals (Donald Duck and Goofy) as Circus Stars at Pete''s Silly Sideshow', 'Magic Kingdom', 'Characters', 'Character Meet', 'Meet Donald Duck and Goofy in their circus best at Pete''s Silly Sideshow.', NULL, NULL, true, 'Meet Daring Disney Pals (Donald Duck and Goofy) as Circus Stars at Pete''s Silly Sideshow', 'Fantasyland'),
('Meet Mickey at Town Square Theater', 'Magic Kingdom', 'Characters', 'Character Meet', 'Meet Mickey Mouse at Town Square Theater on Main Street.', NULL, NULL, true, 'Meet Mickey at Town Square Theater', 'Main Street, U.S.A.'),
('Meet Dashing Disney Pals (Minnie and Daisy) as Circus Stars at Pete''s Silly Sideshow', 'Magic Kingdom', 'Characters', 'Character Meet', 'Meet Minnie and Daisy in their circus best at Pete''s Silly Sideshow.', NULL, NULL, true, 'Meet Dashing Disney Pals (Minnie and Daisy) as Circus Stars at Pete''s Silly Sideshow', 'Fantasyland'),
('Meet Mirabel at Fairytale Garden', 'Magic Kingdom', 'Characters', 'Character Meet', 'Meet Mirabel from Encanto at Fairytale Garden.', NULL, NULL, true, 'Meet Mirabel at Fairytale Garden', 'Fantasyland'),
('Meet Peter Pan in Fantasyland', 'Magic Kingdom', 'Characters', 'Character Meet', 'Meet Peter Pan in Fantasyland.', NULL, NULL, true, 'Meet Peter Pan in Fantasyland', 'Fantasyland'),
('Meet Winnie the Pooh and Tigger at The Thotful Spot', 'Magic Kingdom', 'Characters', 'Character Meet', 'Meet Winnie the Pooh and Tigger at The Thotful Spot near The Many Adventures of Winnie the Pooh.', NULL, NULL, true, 'Meet Winnie the Pooh and Tigger at The Thotful Spot', 'Fantasyland'),
('Meet Princess Tiana and a Visiting Princess at Princess Fairytale Hall', 'Magic Kingdom', 'Characters', 'Character Meet', 'Meet Princess Tiana and a visiting princess at Princess Fairytale Hall.', NULL, NULL, true, 'Meet Princess Tiana and a Visiting Princess at Princess Fairytale Hall', 'Fantasyland');


-- ============================================================
-- EVENTS & TOURS   (category value is 'Events & Tours')
-- ============================================================

-- Rename Keys to the Kingdom Tour → Disney's Keys to the Kingdom Tour
UPDATE experiences
SET name = 'Disney''s Keys to the Kingdom Tour',
    sort_name = 'Disney''s Keys to the Kingdom Tour'
WHERE park = 'Magic Kingdom' AND name ILIKE '%keys to the kingdom%';

-- Remove Disney's Family Magic Tour (permanent)
DELETE FROM experiences
WHERE park = 'Magic Kingdom' AND name ILIKE '%family magic tour%';

-- Add Disney After Hours at Magic Kingdom Park
INSERT INTO experiences (name, park, category, type, description, opening_year, duration, is_active, sort_name, location) VALUES
('Disney After Hours at Magic Kingdom Park', 'Magic Kingdom', 'Events & Tours', 'Event', 'Separately-ticketed late-night event with low crowds and short waits on popular attractions.', NULL, NULL, true, 'Disney After Hours at Magic Kingdom Park', NULL);


-- ============================================================
-- VERIFY — uncomment to review results per category
-- ============================================================
-- SELECT category, name, type, location FROM experiences
--   WHERE park = 'Magic Kingdom'
--   ORDER BY category, sort_name;
