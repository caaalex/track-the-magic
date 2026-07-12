-- ============================================================
-- Coronado Springs — add dining + activity experiences (2026-07)
-- Run in the Supabase SQL Editor.
-- No repeats against existing Coronado data.
-- Resort rows use the 9-column shape (no opening_year).
-- ============================================================

BEGIN;

-- ── Dining ───────────────────────────────────────────────────
INSERT INTO experiences (name, park, category, type, description, duration, is_active, sort_name, location) VALUES
('Rix Sports Bar & Grill', 'Resorts', 'Dining', 'Bar & Lounge', 'Sports bar with big screens, drinks, and shareable bites.', '30 min', true, 'Rix Sports Bar & Grill', 'Coronado Springs'),
('Barcelona Lounge', 'Resorts', 'Dining', 'Bar & Lounge', 'Coffee bar by day, wine and cocktail lounge by night at Gran Destino Tower.', '30 min', true, 'Barcelona Lounge', 'Coronado Springs'),
('Siestas Cantina', 'Resorts', 'Dining', 'Bar & Lounge', 'Poolside cantina at the Dig Site with tacos, nachos, and margaritas.', '30 min', true, 'Siestas Cantina', 'Coronado Springs'),
('Maya Grill', 'Resorts', 'Dining', 'Table Service', 'Mexican table-service dining with grilled specialties.', '60 min', true, 'Maya Grill', 'Coronado Springs'),
('Café Rix', 'Resorts', 'Dining', 'Quick Service', 'Grab-and-go café with sandwiches, salads, and pastries.', '15 min', true, 'Café Rix', 'Coronado Springs'),
('Laguna Bar', 'Resorts', 'Dining', 'Bar & Lounge', 'Poolside bar overlooking Lago Dorado.', '30 min', true, 'Laguna Bar', 'Coronado Springs');

-- ── Activities / experiences ─────────────────────────────────
INSERT INTO experiences (name, park, category, type, description, duration, is_active, sort_name, location) VALUES
('Colors of Coronado Painting Experience', 'Resorts', 'Events & Tours', 'Tour', 'Guided painting class creating your own Coronado-inspired artwork.', 'Varies', true, 'Colors of Coronado Painting Experience', 'Coronado Springs'),
('Spanish Mosaic Art', 'Resorts', 'Events & Tours', 'Tour', 'Hands-on class crafting a Spanish-style mosaic to take home.', 'Varies', true, 'Spanish Mosaic Art', 'Coronado Springs'),
('Sangria University', 'Resorts', 'Events & Tours', 'Tour', 'Learn to make signature sangria in a hands-on tasting seminar.', 'Varies', true, 'Sangria University', 'Coronado Springs');

COMMIT;

-- ------------------------------------------------------------
-- VERIFY:
-- ------------------------------------------------------------
-- SELECT category, name, type FROM experiences
--   WHERE park = 'Resorts' AND location = 'Coronado Springs'
--   ORDER BY category, sort_name;
