-- ============================================================
-- Fort Wilderness — recreation rentals reframed as experiences (2026-07)
-- Run in the Supabase SQL Editor.
--
-- Replaces the combined "Bike, Boat & Canoe Rentals" row with
-- experience-named activities. Golf cart stays a rental (a utility,
-- not an experience).
-- Resort rows use the 9-column shape (no opening_year).
-- ============================================================

BEGIN;

-- Remove the old combined rentals row.
DELETE FROM experiences
WHERE park = 'Resorts' AND location = 'Fort Wilderness'
  AND name = 'Bike, Boat & Canoe Rentals';

-- Add the activities as experiences (+ golf cart as a rental utility).
INSERT INTO experiences (name, park, category, type, description, duration, is_active, sort_name, location) VALUES
('Canoeing',         'Resorts', 'Attractions', 'Recreation',     'Paddle a canoe along the canals and waterways of the campground.', 'Varies', true, 'Canoeing', 'Fort Wilderness'),
('Kayaking',         'Resorts', 'Attractions', 'Recreation',     'Explore the resort waterways by kayak.', 'Varies', true, 'Kayaking', 'Fort Wilderness'),
('Boating',          'Resorts', 'Attractions', 'Recreation',     'Take a motorized boat out on Bay Lake.', 'Varies', true, 'Boating', 'Fort Wilderness'),
('Biking',           'Resorts', 'Attractions', 'Recreation',     'Cruise the wooded trails and roads on a bike.', 'Varies', true, 'Biking', 'Fort Wilderness'),
('Golf Cart Rental', 'Resorts', 'Attractions', 'Transportation', 'Rent a golf cart to get around the sprawling campground.', 'Varies', true, 'Golf Cart Rental', 'Fort Wilderness');

COMMIT;

-- ------------------------------------------------------------
-- VERIFY:
-- ------------------------------------------------------------
-- SELECT name, type FROM experiences
--   WHERE park = 'Resorts' AND location = 'Fort Wilderness' AND category = 'Attractions'
--   ORDER BY sort_name;
