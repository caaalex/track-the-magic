-- ============================================================
-- Polynesian — add dining (2026-07)
-- Run in the Supabase SQL Editor.
--
-- Skipped as already present: 'Ohana, Trader Sam's Grog Grotto.
-- Resort rows use the 9-column shape (no opening_year).
-- ============================================================

INSERT INTO experiences (name, park, category, type, description, duration, is_active, sort_name, location) VALUES
('Barefoot Pool Bar', 'Resorts', 'Dining', 'Bar & Lounge', 'Poolside bar with tropical drinks.', '30 min', true, 'Barefoot Pool Bar', 'Polynesian'),
('Tambu Lounge', 'Resorts', 'Dining', 'Bar & Lounge', 'Polynesian lounge with tropical cocktails and appetizers.', '30 min', true, 'Tambu Lounge', 'Polynesian'),
('Oasis Bar & Grill', 'Resorts', 'Dining', 'Bar & Lounge', 'Poolside bar and grill by the Oasis Pool.', '30 min', true, 'Oasis Bar & Grill', 'Polynesian'),
('Trader Sam''s Tiki Terrace', 'Resorts', 'Dining', 'Bar & Lounge', 'Outdoor tiki terrace with tropical drinks and live music.', '30 min', true, 'Trader Sam''s Tiki Terrace', 'Polynesian'),
('Kona Island', 'Resorts', 'Dining', 'Quick Service', 'Coffee bar by day and sushi counter by night.', '15 min', true, 'Kona Island', 'Polynesian'),
('Wailulu Bar & Grill', 'Resorts', 'Dining', 'Bar & Lounge', 'Casual bar and grill with island fare.', '30 min', true, 'Wailulu Bar & Grill', 'Polynesian');

-- ------------------------------------------------------------
-- VERIFY:
-- ------------------------------------------------------------
-- SELECT name, type FROM experiences
--   WHERE park = 'Resorts' AND location = 'Polynesian' AND category = 'Dining'
--   ORDER BY sort_name;
