-- ============================================================
-- Dolphin — add dining + one activity venue (2026-07)
-- Run in the Supabase SQL Editor.
--
-- Skipped as already present at the Dolphin: "Todd English's bluezoo",
-- "Fuel". "Lagoon" was listed twice — added once as
-- "Lagoon: Games, Lanes & Eats".
-- Resort rows use the 9-column shape (no opening_year).
-- ============================================================

BEGIN;

-- ── Dining ───────────────────────────────────────────────────
INSERT INTO experiences (name, park, category, type, description, duration, is_active, sort_name, location) VALUES
('Bourbon Steak', 'Resorts', 'Dining', 'Signature Dining', 'Upscale steakhouse from chef Michael Mina.', '60 min', true, 'Bourbon Steak', 'Dolphin'),
('Bourbon Steak Lounge', 'Resorts', 'Dining', 'Bar & Lounge', 'Cocktails and small plates beside Bourbon Steak.', '30 min', true, 'Bourbon Steak Lounge', 'Dolphin'),
('Rosa Mexicano', 'Resorts', 'Dining', 'Table Service', 'Modern Mexican dining with tableside guacamole.', '60 min', true, 'Rosa Mexicano', 'Dolphin'),
('Rosa Mexicano Lounge', 'Resorts', 'Dining', 'Bar & Lounge', 'Margaritas and Mexican small plates.', '30 min', true, 'Rosa Mexicano Lounge', 'Dolphin'),
('Amare', 'Resorts', 'Dining', 'Table Service', 'Mediterranean-inspired dining.', '60 min', true, 'Amare', 'Dolphin'),
('Grounds', 'Resorts', 'Dining', 'Snack', 'Coffee, espresso, and grab-and-go breakfast.', '10 min', true, 'Grounds', 'Dolphin'),
('Stir', 'Resorts', 'Dining', 'Bar & Lounge', 'Lobby cocktail lounge.', '30 min', true, 'Stir', 'Dolphin'),
('Tangerine', 'Resorts', 'Dining', 'Snack', 'Café for coffee, pastries, and light bites.', '10 min', true, 'Tangerine', 'Dolphin'),
('Chill', 'Resorts', 'Dining', 'Snack', 'Ice cream, gelato, and frozen treats.', '10 min', true, 'Chill', 'Dolphin'),
('Todd English''s bluezoo Lounge', 'Resorts', 'Dining', 'Bar & Lounge', 'Cocktail lounge beside the bluezoo restaurant.', '30 min', true, 'Todd English''s bluezoo Lounge', 'Dolphin'),
('Cabana Bar and Beach Club', 'Resorts', 'Dining', 'Bar & Lounge', 'Poolside bar and grill by the Grotto Pool.', '30 min', true, 'Cabana Bar and Beach Club', 'Dolphin'),
('The Fountain', 'Resorts', 'Dining', 'Quick Service', 'Casual diner for burgers, shakes, and ice cream.', '15 min', true, 'The Fountain', 'Dolphin'),
('Phins', 'Resorts', 'Dining', 'Bar & Lounge', 'Lobby lounge with cocktails and light bites.', '30 min', true, 'Phins', 'Dolphin'),
('Garden Grove', 'Resorts', 'Dining', 'Character Dining', 'Casual dining with character breakfasts and dinners.', '60 min', true, 'Garden Grove', 'Dolphin'),
('Il Mulino New York Trattoria', 'Resorts', 'Dining', 'Table Service', 'Rustic New York-style Italian cuisine.', '60 min', true, 'Il Mulino New York Trattoria', 'Dolphin'),
('Il Mulino Lounge', 'Resorts', 'Dining', 'Bar & Lounge', 'Italian wine and cocktail lounge.', '30 min', true, 'Il Mulino Lounge', 'Dolphin'),
('Java', 'Resorts', 'Dining', 'Snack', 'Coffee bar with espresso and pastries.', '10 min', true, 'Java', 'Dolphin'),
('Kimonos', 'Resorts', 'Dining', 'Table Service', 'Sushi and Japanese specialties with karaoke.', '60 min', true, 'Kimonos', 'Dolphin'),
('Kimonos Lounge', 'Resorts', 'Dining', 'Bar & Lounge', 'Sake and cocktails at the sushi bar.', '30 min', true, 'Kimonos Lounge', 'Dolphin'),
('Splash Pool Bar and Grill', 'Resorts', 'Dining', 'Bar & Lounge', 'Poolside bar and grill.', '30 min', true, 'Splash Pool Bar and Grill', 'Dolphin');

-- ── Activity venue ───────────────────────────────────────────
INSERT INTO experiences (name, park, category, type, description, duration, is_active, sort_name, location) VALUES
('Lagoon: Games, Lanes & Eats', 'Resorts', 'Attractions', 'Recreation', 'Family entertainment center with bowling, arcade games, and dining.', 'Varies', true, 'Lagoon: Games, Lanes & Eats', 'Dolphin');

COMMIT;

-- ------------------------------------------------------------
-- VERIFY:
-- ------------------------------------------------------------
-- SELECT category, name, type FROM experiences
--   WHERE park = 'Resorts' AND location = 'Dolphin'
--   ORDER BY category, sort_name;
