-- ═══════════════════════════════════════════════════════════════════
-- RESORTS — Phase 3, batch 2: Epcot-area deluxe resorts (July 2026)
-- Beach Club, Yacht Club, BoardWalk Inn, Riviera.
-- Additive — assumes Phase 1 + Phase 2 already run. Run once.
-- ═══════════════════════════════════════════════════════════════════

INSERT INTO experiences (name, park, category, type, description, duration, is_active, sort_name, location) VALUES

-- ── Beach Club ───────────────────────────────────────────────────────
('Boat to Epcot', 'Resorts', 'Attractions', 'Boat', 'Take the Friendship boat to Epcot''s International Gateway — or just walk over.', '10 min', true, 'Boat to Epcot', 'Beach Club'),
('Boat to Hollywood Studios', 'Resorts', 'Attractions', 'Boat', 'Cruise across Crescent Lake to Disney''s Hollywood Studios.', '20 min', true, 'Boat to Hollywood Studios', 'Beach Club'),
('Resort beach', 'Resorts', 'Attractions', 'Beach', 'Relax on the white-sand beach along Crescent Lake.', 'Varies', true, 'Resort beach', 'Beach Club'),
('Bayside Marina boat rentals', 'Resorts', 'Attractions', 'Recreation', 'Rent a boat and cruise Crescent Lake from the marina.', '30 min', true, 'Bayside Marina boat rentals', 'Beach Club'),
('Cape May Cafe', 'Resorts', 'Dining', 'Character Dining', 'Character breakfast with Minnie and pals, plus a New England seafood dinner buffet.', '75 min', true, 'Cape May Cafe', 'Beach Club'),
('Beach Club Marketplace', 'Resorts', 'Dining', 'Quick Service', 'Grab sandwiches, flatbreads, and pastries at the resort''s quick service.', '15 min', true, 'Beach Club Marketplace', 'Beach Club'),

-- ── Yacht Club ───────────────────────────────────────────────────────
('Boat to Epcot', 'Resorts', 'Attractions', 'Boat', 'Take the Friendship boat to Epcot''s International Gateway — or just walk over.', '10 min', true, 'Boat to Epcot', 'Yacht Club'),
('Boat to Hollywood Studios', 'Resorts', 'Attractions', 'Boat', 'Cruise across Crescent Lake to Disney''s Hollywood Studios.', '20 min', true, 'Boat to Hollywood Studios', 'Yacht Club'),
('The Yachtsman Steakhouse', 'Resorts', 'Dining', 'Signature Dining', 'Hand-cut steaks and chops in a nautical-themed signature restaurant.', '90 min', true, 'Yachtsman Steakhouse', 'Yacht Club'),
('Ale & Compass Restaurant', 'Resorts', 'Dining', 'Table Service', 'New England comfort food for breakfast, lunch, and dinner.', '60 min', true, 'Ale & Compass Restaurant', 'Yacht Club'),
('Crew''s Cup Lounge', 'Resorts', 'Dining', 'Bar & Lounge', 'Cozy nautical pub with regional beers and shareable bites.', '45 min', true, 'Crew''s Cup Lounge', 'Yacht Club'),

-- ── BoardWalk Inn ────────────────────────────────────────────────────
('Walk to Epcot', 'Resorts', 'Attractions', 'Walkway', 'Stroll the lakeside path to Epcot''s International Gateway.', '10 min', true, 'Walk to Epcot', 'BoardWalk Inn'),
('Boat to Hollywood Studios', 'Resorts', 'Attractions', 'Boat', 'Cruise across Crescent Lake to Disney''s Hollywood Studios.', '20 min', true, 'Boat to Hollywood Studios', 'BoardWalk Inn'),
('Stroll the BoardWalk', 'Resorts', 'Entertainment', 'Street Entertainment', 'Walk the 1930s-style lakeside promenade with street performers, snacks, and games.', 'Varies', true, 'Stroll the BoardWalk', 'BoardWalk Inn'),
('Surrey bike rentals', 'Resorts', 'Attractions', 'Recreation', 'Pedal a surrey bike along the BoardWalk promenade.', '30 min', true, 'Surrey bike rentals', 'BoardWalk Inn'),
('Trattoria al Forno', 'Resorts', 'Dining', 'Table Service', 'Rustic Italian dishes and wood-fired specialties on the BoardWalk.', '60 min', true, 'Trattoria al Forno', 'BoardWalk Inn'),
('AbracadaBar', 'Resorts', 'Dining', 'Bar & Lounge', 'Magic-themed cocktail lounge full of vintage illusionist charm.', '45 min', true, 'AbracadaBar', 'BoardWalk Inn'),

-- ── Riviera ──────────────────────────────────────────────────────────
('Skyliner to Epcot', 'Resorts', 'Attractions', 'Transportation', 'Glide over to Epcot''s International Gateway on the Disney Skyliner.', '15 min', true, 'Skyliner to Epcot', 'Riviera'),
('Skyliner to Hollywood Studios', 'Resorts', 'Attractions', 'Transportation', 'Soar to Disney''s Hollywood Studios on the Disney Skyliner.', '15 min', true, 'Skyliner to Hollywood Studios', 'Riviera'),
('Primo Piatto', 'Resorts', 'Dining', 'Quick Service', 'French- and Italian-inspired quick service — a local favorite for breakfast.', '15 min', true, 'Primo Piatto', 'Riviera'),
('Bar Riva', 'Resorts', 'Dining', 'Bar & Lounge', 'Poolside bar with Mediterranean-inspired cocktails and bites.', '30 min', true, 'Bar Riva', 'Riviera'),
('Le Petit Cafe', 'Resorts', 'Dining', 'Bar & Lounge', 'Lobby cafe serving coffee by day and cocktails by night.', '30 min', true, 'Le Petit Cafe', 'Riviera');
