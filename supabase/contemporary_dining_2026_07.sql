-- ============================================================
-- Contemporary Resort — add dining (2026-07)
-- Run in the Supabase SQL Editor.
--
-- "Contempo Café" already exists at the Contemporary, so it is
-- skipped here (repeat). The Lounge entries are distinct from the
-- existing Steakhouse 71 / California Grill restaurants.
-- Resort rows use the 9-column shape (no opening_year).
-- ============================================================

INSERT INTO experiences (name, park, category, type, description, duration, is_active, sort_name, location) VALUES
('Steakhouse 71 Lounge', 'Resorts', 'Dining', 'Bar & Lounge', 'Lounge beside Steakhouse 71 for cocktails and small plates.', '30 min', true, 'Steakhouse 71 Lounge', 'Contemporary'),
('California Grill Lounge', 'Resorts', 'Dining', 'Bar & Lounge', '15th-floor lounge with cocktails and views of the Magic Kingdom fireworks.', '30 min', true, 'California Grill Lounge', 'Contemporary'),
('Contemporary Grounds', 'Resorts', 'Dining', 'Snack', 'Coffee, espresso, and pastries.', '10 min', true, 'Contemporary Grounds', 'Contemporary'),
('Cove Bar', 'Resorts', 'Dining', 'Bar & Lounge', 'Poolside bar by Bay Lake.', '30 min', true, 'Cove Bar', 'Contemporary'),
('Outer Rim', 'Resorts', 'Dining', 'Bar & Lounge', 'Lounge on the Grand Canyon Concourse with cocktails and small plates.', '30 min', true, 'Outer Rim', 'Contemporary'),
('Sip, Savor, Sparkle', 'Resorts', 'Dining', 'Bar & Lounge', 'Wine, cocktails, and sparkling beverages.', '30 min', true, 'Sip, Savor, Sparkle', 'Contemporary');

-- ------------------------------------------------------------
-- VERIFY:
-- ------------------------------------------------------------
-- SELECT name, type FROM experiences
--   WHERE park = 'Resorts' AND location = 'Contemporary' AND category = 'Dining'
--   ORDER BY sort_name;
