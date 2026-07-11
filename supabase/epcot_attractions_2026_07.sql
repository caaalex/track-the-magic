-- ============================================================
-- Epcot — Attractions FULL REPLACE (2026-07)
-- Run in the Supabase SQL Editor.
--
-- Full replace, with ONE deliberate exception:
--   "Guardians of the Galaxy: Cosmic Rewind" is NOT deleted or
--   re-inserted. Its row id is hardcoded in the app
--   (GUARDIANS_EXPERIENCE_ID) and the song-logging feature +
--   ride_logs depend on it. Deleting it would break that feature
--   and erase every user's Cosmic Rewind ride logs. It stays as-is
--   and is already part of the intended list.
--
-- WARNING: this deletes all OTHER Epcot attractions and re-creates
-- them fresh, which clears tracked progress for those attractions.
--
-- Column order:
--   (name, park, category, type, description, opening_year,
--    duration, is_active, sort_name, location)
-- NOTE: `type` and `location` (World Celebration/Discovery/Nature or
-- the World Showcase country) are best-effort — adjust as needed.
-- ============================================================

BEGIN;

-- 1. Wipe existing Epcot attractions EXCEPT Cosmic Rewind.
DELETE FROM experiences
WHERE park = 'Epcot' AND category = 'Attractions'
  AND name NOT ILIKE '%cosmic rewind%';

-- 2. Re-insert the full list (Cosmic Rewind omitted — it's preserved).
INSERT INTO experiences (name, park, category, type, description, opening_year, duration, is_active, sort_name, location) VALUES
('Advanced Training Lab', 'Epcot', 'Attractions', 'Interactive Experience', 'Hands-on play area and post-show for Mission: SPACE.', NULL, NULL, true, 'Advanced Training Lab', 'World Discovery'),
('The American Adventure', 'Epcot', 'Attractions', 'Show', 'Audio-Animatronics stage show celebrating American history.', NULL, NULL, true, 'The American Adventure', 'The American Adventure'),
('American Heritage Gallery', 'Epcot', 'Attractions', 'Gallery', 'Rotating cultural exhibit inside the American Adventure pavilion.', NULL, NULL, true, 'American Heritage Gallery', 'The American Adventure'),
('Awesome Planet', 'Epcot', 'Attractions', 'Film', 'Short film about Earth''s beauty and ecosystems in The Land.', NULL, NULL, true, 'Awesome Planet', 'World Nature'),
('Beauty and the Beast Sing-Along', 'Epcot', 'Attractions', 'Show', 'Sing-along retelling of Beauty and the Beast in the France pavilion.', NULL, NULL, true, 'Beauty and the Beast Sing-Along', 'France'),
('Bijutsu-kan Gallery', 'Epcot', 'Attractions', 'Gallery', 'Japanese art gallery in the Japan pavilion.', NULL, NULL, true, 'Bijutsu-kan Gallery', 'Japan'),
('Bruce''s Shark World', 'Epcot', 'Attractions', 'Interactive Experience', 'Kid-friendly shark facts and photo spot in The Seas pavilion.', NULL, NULL, true, 'Bruce''s Shark World', 'World Nature'),
('Canada Far and Wide in Circle-Vision 360', 'Epcot', 'Attractions', 'Film', 'Circle-Vision 360° film touring the landscapes of Canada.', NULL, NULL, true, 'Canada Far and Wide in Circle-Vision 360', 'Canada'),
('Coral Reefs - Disney Animals', 'Epcot', 'Attractions', 'Wildlife', 'Coral reef exhibit in The Seas aquarium.', NULL, NULL, true, 'Coral Reefs - Disney Animals', 'World Nature'),
('Disney and Pixar Short Film Festival', 'Epcot', 'Attractions', 'Film', 'Trio of Disney and Pixar animated shorts in the Imagination pavilion.', NULL, NULL, true, 'Disney and Pixar Short Film Festival', 'World Nature'),
('Disney''s DuckTales World Showcase Adventure', 'Epcot', 'Attractions', 'Interactive Experience', 'Interactive scavenger-hunt game across World Showcase.', NULL, NULL, true, 'Disney''s DuckTales World Showcase Adventure', 'World Showcase'),
('Dreamers Point', 'Epcot', 'Attractions', 'Landmark', 'Garden viewpoint with a Walt Disney statue in World Celebration.', NULL, NULL, true, 'Dreamers Point', 'World Celebration'),
('Frozen Ever After', 'Epcot', 'Attractions', 'Boat Ride', 'Boat ride through Arendelle with the characters of Frozen.', NULL, NULL, true, 'Frozen Ever After', 'Norway'),
('Gallery of Arts and History', 'Epcot', 'Attractions', 'Gallery', 'Moroccan art and history gallery in the Morocco pavilion.', NULL, NULL, true, 'Gallery of Arts and History', 'Morocco'),
('Gran Fiesta Tour Starring The Three Caballeros', 'Epcot', 'Attractions', 'Boat Ride', 'Gentle boat cruise through Mexico with the Three Caballeros.', NULL, NULL, true, 'Gran Fiesta Tour Starring The Three Caballeros', 'Mexico'),
('House of the Whispering Willows', 'Epcot', 'Attractions', 'Gallery', 'Art gallery in the China pavilion.', NULL, NULL, true, 'House of the Whispering Willows', 'China'),
('ImageWorks - The "What If" Labs', 'Epcot', 'Attractions', 'Interactive Experience', 'Interactive play space at the end of Journey Into Imagination.', NULL, NULL, true, 'ImageWorks - The "What If" Labs', 'World Nature'),
('Impressions de France', 'Epcot', 'Attractions', 'Film', 'Panoramic film celebrating the sights of France.', NULL, NULL, true, 'Impressions de France', 'France'),
('Invertebrates at Epcot - Disney Animals', 'Epcot', 'Attractions', 'Wildlife', 'Invertebrate exhibits in The Seas aquarium.', NULL, NULL, true, 'Invertebrates at Epcot - Disney Animals', 'World Nature'),
('Journey Into Imagination With Figment', 'Epcot', 'Attractions', 'Dark Ride', 'Dark ride through the senses with Figment the dragon.', NULL, NULL, true, 'Journey Into Imagination With Figment', 'World Nature'),
('Journey of Water, Inspired by Moana', 'Epcot', 'Attractions', 'Walkthrough', 'Interactive outdoor trail where water responds to your touch.', NULL, NULL, true, 'Journey of Water, Inspired by Moana', 'World Nature'),
('Kidcot Fun Stops', 'Epcot', 'Attractions', 'Kids Area', 'Craft and activity stops for kids around World Showcase.', NULL, NULL, true, 'Kidcot Fun Stops', 'World Showcase'),
('Living with the Land', 'Epcot', 'Attractions', 'Boat Ride', 'Boat tour through greenhouses and living farms in The Land.', NULL, NULL, true, 'Living with the Land', 'World Nature'),
('Manatees - Disney Animals', 'Epcot', 'Attractions', 'Wildlife', 'Manatee exhibit in The Seas aquarium.', NULL, NULL, true, 'Manatees - Disney Animals', 'World Nature'),
('Mexico Folk Art Gallery', 'Epcot', 'Attractions', 'Gallery', 'Mexican folk art gallery inside the Mexico pyramid.', NULL, NULL, true, 'Mexico Folk Art Gallery', 'Mexico'),
('Mission: SPACE', 'Epcot', 'Attractions', 'Simulator', 'Space-flight simulator with green (mild) and orange (intense) missions.', NULL, NULL, true, 'Mission: SPACE', 'World Discovery'),
('Project Tomorrow: Inventing the Wonders of the Future', 'Epcot', 'Attractions', 'Interactive Experience', 'Interactive tech play area after Spaceship Earth.', NULL, NULL, true, 'Project Tomorrow: Inventing the Wonders of the Future', 'World Celebration'),
('Reef Fish - Disney Animals', 'Epcot', 'Attractions', 'Wildlife', 'Reef fish exhibits in The Seas aquarium.', NULL, NULL, true, 'Reef Fish - Disney Animals', 'World Nature'),
('Reflections of China', 'Epcot', 'Attractions', 'Film', 'Circle-Vision 360° film touring the landscapes of China.', NULL, NULL, true, 'Reflections of China', 'China'),
('Remy''s Ratatouille Adventure', 'Epcot', 'Attractions', 'Dark Ride', 'Trackless ride shrinking you to Remy''s size through Gusteau''s.', NULL, NULL, true, 'Remy''s Ratatouille Adventure', 'France'),
('Sea Turtles - Disney Animals', 'Epcot', 'Attractions', 'Wildlife', 'Sea turtle exhibit in The Seas aquarium.', NULL, NULL, true, 'Sea Turtles - Disney Animals', 'World Nature'),
('SeaBase Aquarium', 'Epcot', 'Attractions', 'Aquarium', 'One of the largest saltwater aquariums, home to The Seas.', NULL, NULL, true, 'SeaBase Aquarium', 'World Nature'),
('The Seas with Nemo & Friends', 'Epcot', 'Attractions', 'Dark Ride', 'Clammobile dark ride searching for Nemo through the reef.', NULL, NULL, true, 'The Seas with Nemo & Friends', 'World Nature'),
('Sharks and Rays - Disney Animals', 'Epcot', 'Attractions', 'Wildlife', 'Shark and ray exhibits in The Seas aquarium.', NULL, NULL, true, 'Sharks and Rays - Disney Animals', 'World Nature'),
('Soarin'' Across America — New!', 'Epcot', 'Attractions', 'Simulator', 'Hang-glider flight simulator soaring over American landmarks.', NULL, NULL, true, 'Soarin'' Across America — New!', 'World Nature'),
('Soarin'' Around the World', 'Epcot', 'Attractions', 'Simulator', 'Hang-glider flight simulator soaring over global landmarks.', NULL, NULL, true, 'Soarin'' Around the World', 'World Nature'),
('Spaceship Earth', 'Epcot', 'Attractions', 'Dark Ride', 'Time-travel dark ride through the history of communication inside the geodesic sphere.', NULL, NULL, true, 'Spaceship Earth', 'World Celebration'),
('Stave Church Gallery', 'Epcot', 'Attractions', 'Gallery', 'Norse mythology gallery inside the Norway pavilion''s stave church.', NULL, NULL, true, 'Stave Church Gallery', 'Norway'),
('Test Track', 'Epcot', 'Attractions', 'Thrill Ride', 'Design a virtual vehicle, then test it at high speed.', NULL, NULL, true, 'Test Track', 'World Discovery'),
('Turtle Talk With Crush', 'Epcot', 'Attractions', 'Show', 'Interactive real-time chat with Crush the sea turtle.', NULL, NULL, true, 'Turtle Talk With Crush', 'World Nature');

COMMIT;

-- ------------------------------------------------------------
-- VERIFY (should list all attractions incl. Cosmic Rewind):
-- ------------------------------------------------------------
-- SELECT name, type, location FROM experiences
--   WHERE park = 'Epcot' AND category = 'Attractions'
--   ORDER BY sort_name;
