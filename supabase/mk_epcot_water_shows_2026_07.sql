-- ============================================================
-- Add Electrical Water Pageant (Magic Kingdom) and Fireworks
-- Cruises (Magic Kingdom + Epcot). Run in the Supabase SQL Editor.
-- Theme-park rows use the 10-column shape (with opening_year).
-- ============================================================

INSERT INTO experiences (name, park, category, type, description, opening_year, duration, is_active, sort_name, location) VALUES
-- Magic Kingdom
('Electrical Water Pageant', 'Magic Kingdom', 'Entertainment', 'Nighttime Show', 'Floating nighttime parade of illuminated sea creatures gliding across Seven Seas Lagoon, visible from Magic Kingdom and the surrounding resorts.', '1971', '15 min', true, 'Electrical Water Pageant', NULL),
('Fireworks Cruises', 'Magic Kingdom', 'Events & Tours', 'Tour', 'Private pontoon-boat cruise on the Seven Seas Lagoon to watch the Magic Kingdom fireworks from the water.', NULL, 'Varies', true, 'Fireworks Cruises', NULL),
-- Epcot
('Fireworks Cruises', 'Epcot', 'Events & Tours', 'Tour', 'Private pontoon-boat cruise on Crescent Lake to watch Epcot''s nighttime fireworks from the water.', NULL, 'Varies', true, 'Fireworks Cruises', NULL);

-- ------------------------------------------------------------
-- VERIFY:
-- ------------------------------------------------------------
-- SELECT park, category, name FROM experiences
--   WHERE name IN ('Electrical Water Pageant', 'Fireworks Cruises')
--   ORDER BY park, name;
