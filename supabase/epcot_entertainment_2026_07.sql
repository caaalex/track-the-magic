-- ============================================================
-- Epcot — Entertainment FULL REPLACE (2026-07)
-- Run in the Supabase SQL Editor.
--
-- WARNING: deletes all current Epcot entertainment and re-creates
-- this list fresh, clearing tracked progress for those items.
--
-- Column order:
--   (name, park, category, type, description, opening_year,
--    duration, is_active, sort_name, location)
-- NOTE: `type` and `location` are best-effort — adjust freely.
-- A few acts roam / have no fixed pavilion, so location is NULL.
-- ============================================================

BEGIN;

DELETE FROM experiences
WHERE park = 'Epcot' AND category = 'Entertainment';

INSERT INTO experiences (name, park, category, type, description, opening_year, duration, is_active, sort_name, location) VALUES
('Acrobatico', 'Epcot', 'Entertainment', 'Street Entertainment', 'Acrobatic performance in the Italy pavilion.', NULL, NULL, true, 'Acrobatico', 'Italy'),
('Atlas Fusion', 'Epcot', 'Entertainment', 'Street Entertainment', 'Acrobatic and martial-arts fusion act in the China pavilion.', NULL, NULL, true, 'Atlas Fusion', 'China'),
('Celebration Encanto', 'Epcot', 'Entertainment', 'Stage Show', 'Musical celebration inspired by Encanto in the Mexico pavilion.', NULL, NULL, true, 'Celebration Encanto', 'Mexico'),
('Command Performance', 'Epcot', 'Entertainment', 'Live Music', 'British-style musical act in the United Kingdom pavilion.', NULL, NULL, true, 'Command Performance', 'United Kingdom'),
('Disney Fab 50 Character Collection Opportunity at EPCOT', 'Epcot', 'Entertainment', 'Character Meet', 'Photo opportunity with the Disney Fab 50 golden character statues.', NULL, NULL, true, 'Disney Fab 50 Character Collection Opportunity at EPCOT', NULL),
('Disney® Visa® Cardmember Photo', 'Epcot', 'Entertainment', 'Character Meet', 'Special character photo opportunity for Disney Visa cardmembers.', NULL, NULL, true, 'Disney® Visa® Cardmember Photo', NULL),
('Entertainment at Canada Mill Stage', 'Epcot', 'Entertainment', 'Live Music', 'Live performances on the Mill Stage in the Canada pavilion.', NULL, NULL, true, 'Entertainment at Canada Mill Stage', 'Canada'),
('Entertainment at CommuniCore Plaza Stage', 'Epcot', 'Entertainment', 'Live Music', 'Live performances at the CommuniCore Plaza stage.', NULL, NULL, true, 'Entertainment at CommuniCore Plaza Stage', 'World Celebration'),
('Entertainment at Germany Gazebo', 'Epcot', 'Entertainment', 'Live Music', 'Live performances at the Germany pavilion gazebo.', NULL, NULL, true, 'Entertainment at Germany Gazebo', 'Germany'),
('JAMMitors', 'Epcot', 'Entertainment', 'Street Entertainment', 'Janitor-themed drumline banging out rhythms on trash cans and tools.', NULL, NULL, true, 'JAMMitors', 'World Celebration'),
('Leave A Legacy', 'Epcot', 'Entertainment', 'Street Entertainment', 'The Leave a Legacy monuments near the park entrance.', NULL, NULL, true, 'Leave A Legacy', 'World Celebration'),
('Luminous The Symphony of Us', 'Epcot', 'Entertainment', 'Nighttime Show', 'Nighttime fireworks and fountain spectacular over World Showcase Lagoon.', NULL, NULL, true, 'Luminous The Symphony of Us', 'World Showcase'),
('Mariachi Cobre', 'Epcot', 'Entertainment', 'Live Music', 'Traditional mariachi band performing in the Mexico pavilion.', NULL, NULL, true, 'Mariachi Cobre', 'Mexico'),
('Matsuriza', 'Epcot', 'Entertainment', 'Live Music', 'Taiko drummers performing in the Japan pavilion.', NULL, NULL, true, 'Matsuriza', 'Japan'),
('Max & Aydar', 'Epcot', 'Entertainment', 'Live Music', 'Live musical duo performing in the Morocco pavilion.', NULL, NULL, true, 'Max & Aydar', 'Morocco'),
('Rose & Crown Pub Musician', 'Epcot', 'Entertainment', 'Live Music', 'Pub entertainer taking requests in the United Kingdom pavilion.', NULL, NULL, true, 'Rose & Crown Pub Musician', 'United Kingdom'),
('Sergio', 'Epcot', 'Entertainment', 'Street Entertainment', 'Comedic juggler performing in the Italy pavilion.', NULL, NULL, true, 'Sergio', 'Italy'),
('Voices of Liberty', 'Epcot', 'Entertainment', 'Live Music', 'A cappella ensemble performing patriotic songs in the American Adventure rotunda.', NULL, NULL, true, 'Voices of Liberty', 'The American Adventure');

COMMIT;

-- ------------------------------------------------------------
-- VERIFY:
-- ------------------------------------------------------------
-- SELECT name, type, location FROM experiences
--   WHERE park = 'Epcot' AND category = 'Entertainment'
--   ORDER BY sort_name;
