-- ============================================================
-- Beach Club — add two dining experiences (2026-07)
-- Run in the Supabase SQL Editor.
-- Resort rows use the 9-column shape (no opening_year).
-- ============================================================

INSERT INTO experiences (name, park, category, type, description, duration, is_active, sort_name, location) VALUES
('Martha''s Vineyard', 'Resorts', 'Dining', 'Bar & Lounge', 'Wine and cocktail lounge at the Beach Club.', '30 min', true, 'Martha''s Vineyard', 'Beach Club'),
('Hurricane Hanna''s Waterside Bar and Grill', 'Resorts', 'Dining', 'Bar & Lounge', 'Poolside bar and grill by Stormalong Bay.', '30 min', true, 'Hurricane Hanna''s Waterside Bar and Grill', 'Beach Club');

-- ------------------------------------------------------------
-- VERIFY:
-- ------------------------------------------------------------
-- SELECT name, type FROM experiences
--   WHERE park = 'Resorts' AND location = 'Beach Club' AND category = 'Dining'
--   ORDER BY sort_name;
