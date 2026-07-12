-- ============================================================
-- Sports — add runDisney Race (2026-07)
-- Run in the Supabase SQL Editor.
--
-- Added under Events & Tours (a recurring race event, not a fixed
-- attraction). "runDisney" keeps its brand lowercase styling.
-- ============================================================

INSERT INTO experiences (name, park, category, type, description, opening_year, duration, is_active, sort_name, location) VALUES
('runDisney Race', 'Sports', 'Events & Tours', 'Event', 'Participate in a runDisney race weekend — marathons, half marathons, and themed runs through the parks.', NULL, NULL, true, 'runDisney Race', NULL);

-- ------------------------------------------------------------
-- VERIFY:
-- ------------------------------------------------------------
-- SELECT name, category, type FROM experiences
--   WHERE park = 'Sports' AND name = 'runDisney Race';
