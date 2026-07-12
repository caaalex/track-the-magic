-- ============================================================
-- Port Orleans Riverside — add experiences (2026-07)
-- Run in the Supabase SQL Editor.
-- Resort rows use the 9-column shape (no opening_year).
-- ============================================================

BEGIN;

-- Dining
INSERT INTO experiences (name, park, category, type, description, duration, is_active, sort_name, location) VALUES
('Muddy Rivers', 'Resorts', 'Dining', 'Bar & Lounge', 'Poolside bar at the Ol'' Man Island pool.', '30 min', true, 'Muddy Rivers', 'Port Orleans Riverside');

-- Entertainment
INSERT INTO experiences (name, park, category, type, description, duration, is_active, sort_name, location) VALUES
('Yehaa Bob Jackson at River Roost Lounge', 'Resorts', 'Entertainment', 'Live Music', 'High-energy piano and comedy performer at the River Roost Lounge.', 'Varies', true, 'Yehaa Bob Jackson at River Roost Lounge', 'Port Orleans Riverside');

-- Activities
INSERT INTO experiences (name, park, category, type, description, duration, is_active, sort_name, location) VALUES
('Mosaic Classes', 'Resorts', 'Events & Tours', 'Tour', 'Hands-on class crafting a mosaic to take home.', 'Varies', true, 'Mosaic Classes', 'Port Orleans Riverside'),
('Horse Drawn Carriage Rides', 'Resorts', 'Events & Tours', 'Tour', 'Evening horse-drawn carriage ride along the Sassagoula River.', 'Varies', true, 'Horse Drawn Carriage Rides', 'Port Orleans Riverside');

COMMIT;

-- ------------------------------------------------------------
-- VERIFY:
-- ------------------------------------------------------------
-- SELECT category, name, type FROM experiences
--   WHERE park = 'Resorts' AND location = 'Port Orleans Riverside'
--   ORDER BY category, sort_name;
