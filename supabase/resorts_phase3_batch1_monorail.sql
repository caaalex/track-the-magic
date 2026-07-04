-- ═══════════════════════════════════════════════════════════════════
-- RESORTS — Phase 3, batch 1: monorail deluxe resorts (July 2026)
-- Resort-specific extras for Grand Floridian, Polynesian, Contemporary.
-- Additive — assumes Phase 1 + Phase 2 already run. Run once.
-- ═══════════════════════════════════════════════════════════════════

INSERT INTO experiences (name, park, category, type, description, duration, is_active, sort_name, location) VALUES

-- ── Grand Floridian ──────────────────────────────────────────────────
('Monorail ride', 'Resorts', 'Attractions', 'Transportation', 'Ride the resort monorail to Magic Kingdom and around the Seven Seas Lagoon loop.', '15 min', true, 'Monorail ride', 'Grand Floridian'),
('Boat to Magic Kingdom', 'Resorts', 'Attractions', 'Boat', 'Take the water launch across the Seven Seas Lagoon to Magic Kingdom.', '15 min', true, 'Boat to Magic Kingdom', 'Grand Floridian'),
('Resort beach', 'Resorts', 'Attractions', 'Beach', 'Relax on the white-sand beach with a view across the lagoon to Cinderella Castle.', 'Varies', true, 'Resort beach', 'Grand Floridian'),
('Senses Spa', 'Resorts', 'Events & Tours', 'Spa', 'Unwind with a treatment at the resort''s full-service spa.', '60 min', true, 'Senses Spa', 'Grand Floridian'),
('Grand Floridian Society Orchestra', 'Resorts', 'Entertainment', 'Live Music', 'Listen to the live band and pianist perform in the grand lobby.', '30 min', true, 'Grand Floridian Society Orchestra', 'Grand Floridian'),
('Garden View Tea Room', 'Resorts', 'Dining', 'Table Service', 'Enjoy a proper afternoon tea with sandwiches, scones, and pastries.', '90 min', true, 'Garden View Tea Room', 'Grand Floridian'),
('Gasparilla Island Grill', 'Resorts', 'Dining', 'Quick Service', 'Grab a bite around the clock at the resort''s waterfront quick service.', '15 min', true, 'Gasparilla Island Grill', 'Grand Floridian'),

-- ── Polynesian ───────────────────────────────────────────────────────
('Monorail ride', 'Resorts', 'Attractions', 'Transportation', 'Ride the resort monorail to Magic Kingdom and around the Seven Seas Lagoon loop.', '15 min', true, 'Monorail ride', 'Polynesian'),
('Boat to Magic Kingdom', 'Resorts', 'Attractions', 'Boat', 'Take the water launch across the Seven Seas Lagoon to Magic Kingdom.', '15 min', true, 'Boat to Magic Kingdom', 'Polynesian'),
('Resort beach', 'Resorts', 'Attractions', 'Beach', 'Watch the fireworks and Electrical Water Pageant from the white-sand beach.', 'Varies', true, 'Resort beach', 'Polynesian'),
('Capt. Cook''s', 'Resorts', 'Dining', 'Quick Service', 'Island-inspired quick service open around the clock — home of the Tonga Toast.', '15 min', true, 'Capt. Cook''s', 'Polynesian'),
('Pineapple Lanai', 'Resorts', 'Dining', 'Snack', 'Get a Dole Whip at this walk-up window near the Great Ceremonial House.', '5 min', true, 'Pineapple Lanai', 'Polynesian'),

-- ── Contemporary ─────────────────────────────────────────────────────
('Monorail ride', 'Resorts', 'Attractions', 'Transportation', 'Ride the monorail as it glides right through the resort''s soaring atrium.', '15 min', true, 'Monorail ride', 'Contemporary'),
('Bay Lake beach', 'Resorts', 'Attractions', 'Beach', 'Relax on the beach along Bay Lake with a view toward Magic Kingdom.', 'Varies', true, 'Bay Lake beach', 'Contemporary'),
('Marina boat rentals', 'Resorts', 'Attractions', 'Recreation', 'Rent a boat and cruise Bay Lake from the resort marina.', '30 min', true, 'Marina boat rentals', 'Contemporary'),
('Contempo Café', 'Resorts', 'Dining', 'Quick Service', 'Grab-and-go quick service in the fourth-floor Grand Canyon Concourse.', '15 min', true, 'Contempo Café', 'Contemporary'),
('The Sand Bar', 'Resorts', 'Dining', 'Bar & Lounge', 'Poolside bar serving cocktails, beer, and light bites by the feature pool.', '30 min', true, 'The Sand Bar', 'Contemporary');
