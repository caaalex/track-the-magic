-- ============================================================
-- BoardWalk — add dining + other experiences (2026-07)
-- Run in the Supabase SQL Editor.
--
-- No repeats against existing BoardWalk data. "Belle Vue Lounge"
-- appeared twice in the request — added once here.
-- Resort rows use the 9-column shape (no opening_year).
-- ============================================================

BEGIN;

-- ── Dining ───────────────────────────────────────────────────
INSERT INTO experiences (name, park, category, type, description, duration, is_active, sort_name, location) VALUES
('Flying Fish', 'Resorts', 'Dining', 'Signature Dining', 'Upscale seafood and steaks on the BoardWalk.', '60 min', true, 'Flying Fish', 'BoardWalk'),
('BoardWalk Deli', 'Resorts', 'Dining', 'Quick Service', 'Sandwiches, baked goods, and grab-and-go items.', '15 min', true, 'BoardWalk Deli', 'BoardWalk'),
('BoardWalk Ice Cream', 'Resorts', 'Dining', 'Snack', 'Hand-scooped ice cream and sundaes.', '10 min', true, 'BoardWalk Ice Cream', 'BoardWalk'),
('Carousel Coffee', 'Resorts', 'Dining', 'Snack', 'Coffee, espresso, and pastries.', '10 min', true, 'Carousel Coffee', 'BoardWalk'),
('Pizza Window', 'Resorts', 'Dining', 'Quick Service', 'Walk-up window for pizza by the slice.', '10 min', true, 'Pizza Window', 'BoardWalk'),
('Leaping Horse Libations', 'Resorts', 'Dining', 'Bar & Lounge', 'Poolside bar at the Luna Park Pool.', '30 min', true, 'Leaping Horse Libations', 'BoardWalk'),
('BoardWalk Joe''s Marvelous Margaritas', 'Resorts', 'Dining', 'Bar & Lounge', 'Frozen margarita kiosk along the BoardWalk.', '15 min', true, 'BoardWalk Joe''s Marvelous Margaritas', 'BoardWalk'),
('Belle Vue Lounge', 'Resorts', 'Dining', 'Bar & Lounge', 'Cozy lounge with vintage radios and classic cocktails.', '30 min', true, 'Belle Vue Lounge', 'BoardWalk'),
('Funnel Cake Cart', 'Resorts', 'Dining', 'Snack', 'Fresh funnel cakes on the BoardWalk.', '10 min', true, 'Funnel Cake Cart', 'BoardWalk'),
('The Cake Bake Shop Restaurant', 'Resorts', 'Dining', 'Table Service', 'Elegant dining and desserts from The Cake Bake Shop.', '60 min', true, 'The Cake Bake Shop Restaurant', 'BoardWalk'),
('The Cake Bake Shop Bakery', 'Resorts', 'Dining', 'Snack', 'Signature cakes, pastries, and sweets to go.', '10 min', true, 'The Cake Bake Shop Bakery', 'BoardWalk'),
('Blue Ribbon Corn Dogs', 'Resorts', 'Dining', 'Snack', 'Hand-dipped corn dogs on the BoardWalk.', '10 min', true, 'Blue Ribbon Corn Dogs', 'BoardWalk');

-- ── Other experiences ────────────────────────────────────────
INSERT INTO experiences (name, park, category, type, description, duration, is_active, sort_name, location) VALUES
('BoardWalk Boys Quartet', 'Resorts', 'Entertainment', 'Live Music', 'Barbershop-style quartet performing along the BoardWalk.', 'Varies', true, 'BoardWalk Boys Quartet', 'BoardWalk'),
('Atlantic Dance Hall', 'Resorts', 'Entertainment', 'Live Music', 'Retro dance hall with music and dancing.', 'Varies', true, 'Atlantic Dance Hall', 'BoardWalk'),
('Midway Games', 'Resorts', 'Attractions', 'Recreation', 'Classic boardwalk carnival games along the promenade.', 'Varies', true, 'Midway Games', 'BoardWalk'),
('Street Performers', 'Resorts', 'Entertainment', 'Street Entertainment', 'Magicians, musicians, and performers along the BoardWalk.', 'Varies', true, 'Street Performers', 'BoardWalk');

COMMIT;

-- ------------------------------------------------------------
-- VERIFY:
-- ------------------------------------------------------------
-- SELECT category, name, type FROM experiences
--   WHERE park = 'Resorts' AND location = 'BoardWalk'
--   ORDER BY category, sort_name;
