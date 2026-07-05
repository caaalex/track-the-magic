-- ═══════════════════════════════════════════════════════════════════
-- RESORTS — Phase 3, batch 3: nature deluxe resorts (July 2026)
-- Wilderness Lodge, Animal Kingdom Lodge.
-- Additive — assumes Phase 1 + Phase 2 already run. Run once.
-- ═══════════════════════════════════════════════════════════════════

INSERT INTO experiences (name, park, category, type, description, duration, is_active, sort_name, location) VALUES

-- ── Wilderness Lodge ─────────────────────────────────────────────────
('Boat to Magic Kingdom', 'Resorts', 'Attractions', 'Boat', 'Take the water launch across Bay Lake to Magic Kingdom.', '15 min', true, 'Boat to Magic Kingdom', 'Wilderness Lodge'),
('Fire Rock Geyser', 'Resorts', 'Attractions', 'Landmark', 'Watch the resort''s geyser erupt on the hour, Old Faithful style.', '5 min', true, 'Fire Rock Geyser', 'Wilderness Lodge'),
('Explore the grand lobby', 'Resorts', 'Attractions', 'Landmark', 'Take in the towering fireplace, totem poles, and log-cabin grandeur of the lobby.', 'Varies', true, 'Explore the grand lobby', 'Wilderness Lodge'),
('Bike & boat rentals', 'Resorts', 'Attractions', 'Recreation', 'Rent bikes or boats and explore the shoreline of Bay Lake.', '30 min', true, 'Bike & boat rentals', 'Wilderness Lodge'),
('Roaring Fork', 'Resorts', 'Dining', 'Quick Service', 'Woodsy quick service with hearty breakfasts and grab-and-go meals.', '15 min', true, 'Roaring Fork', 'Wilderness Lodge'),
('Territory Lounge', 'Resorts', 'Dining', 'Bar & Lounge', 'Explorer-themed lounge with craft beers, wines, and small plates.', '45 min', true, 'Territory Lounge', 'Wilderness Lodge'),

-- ── Animal Kingdom Lodge ─────────────────────────────────────────────
('Savanna animal viewing', 'Resorts', 'Attractions', 'Wildlife', 'Watch giraffes, zebras, and more roam the savannas from the resort overlooks.', 'Varies', true, 'Savanna animal viewing', 'Animal Kingdom Lodge'),
('Night-vision savanna viewing', 'Resorts', 'Attractions', 'Wildlife', 'Spot nocturnal animals on the savanna with the resort''s night-vision goggles.', 'Varies', true, 'Night-vision savanna viewing', 'Animal Kingdom Lodge'),
('Cultural safari programs', 'Resorts', 'Events & Tours', 'Tour', 'Join complimentary cultural activities and animal programs led by resort cast.', '30 min', true, 'Cultural safari programs', 'Animal Kingdom Lodge'),
('Wanyama Safari & Dinner', 'Resorts', 'Events & Tours', 'Tour', 'Take a private savanna safari followed by a multi-course dinner at Jiko.', '3 hours', true, 'Wanyama Safari & Dinner', 'Animal Kingdom Lodge'),
('The Mara', 'Resorts', 'Dining', 'Quick Service', 'African-inspired quick service open around the clock.', '15 min', true, 'The Mara', 'Animal Kingdom Lodge'),
('Victoria Falls Lounge', 'Resorts', 'Dining', 'Bar & Lounge', 'Mezzanine lounge overlooking Boma with African wines and cocktails.', '45 min', true, 'Victoria Falls Lounge', 'Animal Kingdom Lodge');
