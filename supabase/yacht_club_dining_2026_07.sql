-- ============================================================
-- Yacht Club — add dining (2026-07)
-- Run in the Supabase SQL Editor.
-- Resort rows use the 9-column shape (no opening_year).
-- ============================================================

INSERT INTO experiences (name, park, category, type, description, duration, is_active, sort_name, location) VALUES
('Ale & Compass Lounge', 'Resorts', 'Dining', 'Bar & Lounge', 'Nautical lounge with craft cocktails and small plates.', '30 min', true, 'Ale & Compass Lounge', 'Yacht Club'),
('The Market at Ale & Compass', 'Resorts', 'Dining', 'Quick Service', 'Grab-and-go market with coffee, pastries, and snacks.', '15 min', true, 'The Market at Ale & Compass', 'Yacht Club');

-- ------------------------------------------------------------
-- VERIFY:
-- ------------------------------------------------------------
-- SELECT name, type FROM experiences
--   WHERE park = 'Resorts' AND location = 'Yacht Club' AND category = 'Dining'
--   ORDER BY sort_name;
