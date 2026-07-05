-- ═══════════════════════════════════════════════════════════════════
-- RESORTS — Phase 3, batch 4: remaining resorts (July 2026)
-- Moderates, Values, DVC, and the Marriott (Swan/Dolphin/Swan Reserve).
-- Additive — assumes Phase 1 + Phase 2 already run. Run once.
-- ═══════════════════════════════════════════════════════════════════

INSERT INTO experiences (name, park, category, type, description, duration, is_active, sort_name, location) VALUES

-- ══ MODERATES ══════════════════════════════════════════════════════

-- ── Caribbean Beach ──────────────────────────────────────────────────
('Skyliner to Epcot', 'Resorts', 'Attractions', 'Transportation', 'Glide to Epcot''s International Gateway on the Disney Skyliner from the resort hub.', '15 min', true, 'Skyliner to Epcot', 'Caribbean Beach'),
('Skyliner to Hollywood Studios', 'Resorts', 'Attractions', 'Transportation', 'Soar to Disney''s Hollywood Studios on the Disney Skyliner.', '15 min', true, 'Skyliner to Hollywood Studios', 'Caribbean Beach'),
('Centertown Market', 'Resorts', 'Dining', 'Quick Service', 'Caribbean-inspired food hall with island flavors.', '15 min', true, 'Centertown Market', 'Caribbean Beach'),
('Banana Cabana', 'Resorts', 'Dining', 'Bar & Lounge', 'Poolside bar serving rum drinks and tropical cocktails.', '30 min', true, 'Banana Cabana', 'Caribbean Beach'),
('Barefoot Bay boat & bike rentals', 'Resorts', 'Attractions', 'Recreation', 'Rent boats and bikes to explore Barefoot Bay and the resort villages.', '30 min', true, 'Barefoot Bay boat & bike rentals', 'Caribbean Beach'),

-- ── Coronado Springs ─────────────────────────────────────────────────
('Dahlia Lounge', 'Resorts', 'Dining', 'Bar & Lounge', 'Rooftop lounge atop Gran Destino Tower with skyline views and craft cocktails.', '45 min', true, 'Dahlia Lounge', 'Coronado Springs'),
('Three Bridges Bar & Grill', 'Resorts', 'Dining', 'Bar & Lounge', 'Restaurant and bar on an island in the middle of Lago Dorado.', '60 min', true, 'Three Bridges Bar & Grill', 'Coronado Springs'),
('El Mercado de Coronado', 'Resorts', 'Dining', 'Quick Service', 'Mexican- and American-inspired food hall.', '15 min', true, 'El Mercado de Coronado', 'Coronado Springs'),
('Lago Dorado boat rentals', 'Resorts', 'Attractions', 'Recreation', 'Rent a boat and cruise the resort''s central lake.', '30 min', true, 'Lago Dorado boat rentals', 'Coronado Springs'),

-- ── Port Orleans French Quarter ──────────────────────────────────────
('Boat to Disney Springs', 'Resorts', 'Attractions', 'Boat', 'Cruise the Sassagoula River to Disney Springs.', '25 min', true, 'Boat to Disney Springs', 'Port Orleans French Quarter'),
('Sassagoula Floatworks & Food Factory', 'Resorts', 'Dining', 'Quick Service', 'New Orleans-style food court famous for fresh beignets.', '15 min', true, 'Sassagoula Floatworks & Food Factory', 'Port Orleans French Quarter'),
('Scat Cat''s Club', 'Resorts', 'Dining', 'Bar & Lounge', 'Jazzy lounge with signature cocktails and, some nights, live music.', '45 min', true, 'Scat Cat''s Club', 'Port Orleans French Quarter'),
('Bike & surrey rentals', 'Resorts', 'Attractions', 'Recreation', 'Rent bikes or surreys and ride the riverside paths.', '30 min', true, 'Bike & surrey rentals', 'Port Orleans French Quarter'),

-- ── Port Orleans Riverside ───────────────────────────────────────────
('Boat to Disney Springs', 'Resorts', 'Attractions', 'Boat', 'Cruise the Sassagoula River to Disney Springs.', '25 min', true, 'Boat to Disney Springs', 'Port Orleans Riverside'),
('Boatwright''s Dining Hall', 'Resorts', 'Dining', 'Table Service', 'Cajun and Southern comfort food in a working shipyard setting.', '60 min', true, 'Boatwright''s Dining Hall', 'Port Orleans Riverside'),
('Riverside Mill Food Court', 'Resorts', 'Dining', 'Quick Service', 'Food court set around a working cotton-press water wheel.', '15 min', true, 'Riverside Mill Food Court', 'Port Orleans Riverside'),
('River Roost Lounge', 'Resorts', 'Dining', 'Bar & Lounge', 'Riverside lounge with live entertainment from Yehaa Bob most nights.', '45 min', true, 'River Roost Lounge', 'Port Orleans Riverside'),
('Bike & boat rentals', 'Resorts', 'Attractions', 'Recreation', 'Rent bikes or boats and explore the riverside grounds.', '30 min', true, 'Bike & boat rentals', 'Port Orleans Riverside'),

-- ── Fort Wilderness ──────────────────────────────────────────────────
('Archery experience', 'Resorts', 'Events & Tours', 'Tour', 'Learn to shoot a compound bow at the resort''s archery range.', '90 min', true, 'Archery experience', 'Fort Wilderness'),
('Horseback trail rides', 'Resorts', 'Events & Tours', 'Tour', 'Ride the wooded trails on horseback from the Tri-Circle-D Ranch.', '45 min', true, 'Horseback trail rides', 'Fort Wilderness'),
('Tri-Circle-D Ranch', 'Resorts', 'Attractions', 'Wildlife', 'Meet the horses and ponies at the resort''s working ranch.', 'Varies', true, 'Tri-Circle-D Ranch', 'Fort Wilderness'),
('Bike, boat & canoe rentals', 'Resorts', 'Attractions', 'Recreation', 'Rent bikes, boats, and canoes to explore the campground and Bay Lake.', '30 min', true, 'Bike, boat & canoe rentals', 'Fort Wilderness'),
('Trail''s End Restaurant', 'Resorts', 'Dining', 'Quick Service', 'Hearty home-style meals and grab-and-go near the campground.', '30 min', true, 'Trail''s End Restaurant', 'Fort Wilderness'),
('Crockett''s Tavern', 'Resorts', 'Dining', 'Bar & Lounge', 'Frontier-themed tavern with cocktails and shareable bites.', '45 min', true, 'Crockett''s Tavern', 'Fort Wilderness'),

-- ══ VALUES ═════════════════════════════════════════════════════════

-- ── Pop Century ──────────────────────────────────────────────────────
('Skyliner to Epcot', 'Resorts', 'Attractions', 'Transportation', 'Glide to Epcot''s International Gateway on the Disney Skyliner.', '20 min', true, 'Skyliner to Epcot', 'Pop Century'),
('Skyliner to Hollywood Studios', 'Resorts', 'Attractions', 'Transportation', 'Soar to Disney''s Hollywood Studios on the Disney Skyliner.', '15 min', true, 'Skyliner to Hollywood Studios', 'Pop Century'),
('Everything Pop Food Court', 'Resorts', 'Dining', 'Quick Service', 'Decades-themed food court with build-your-own meals and giant treats.', '15 min', true, 'Everything Pop Food Court', 'Pop Century'),
('Petals Pool Bar', 'Resorts', 'Dining', 'Bar & Lounge', 'Poolside bar by the flower-power Hippy Dippy Pool.', '30 min', true, 'Petals Pool Bar', 'Pop Century'),
('Giant icon photo ops', 'Resorts', 'Attractions', 'Landmark', 'Snap photos with the resort''s four-story pop-culture icons.', 'Varies', true, 'Giant icon photo ops', 'Pop Century'),

-- ── Art of Animation ─────────────────────────────────────────────────
('Skyliner to Epcot', 'Resorts', 'Attractions', 'Transportation', 'Glide to Epcot''s International Gateway on the Disney Skyliner.', '20 min', true, 'Skyliner to Epcot', 'Art of Animation'),
('Skyliner to Hollywood Studios', 'Resorts', 'Attractions', 'Transportation', 'Soar to Disney''s Hollywood Studios on the Disney Skyliner.', '15 min', true, 'Skyliner to Hollywood Studios', 'Art of Animation'),
('Landscape of Flavors', 'Resorts', 'Dining', 'Quick Service', 'Bright food court with made-to-order meals and famous milkshakes.', '15 min', true, 'Landscape of Flavors', 'Art of Animation'),
('Explore the themed courtyards', 'Resorts', 'Attractions', 'Landmark', 'Wander the Cars, Nemo, Lion King, and Little Mermaid courtyards with giant statues.', 'Varies', true, 'Explore the themed courtyards', 'Art of Animation'),
('Drop Off Pool Bar', 'Resorts', 'Dining', 'Bar & Lounge', 'Poolside bar at the Finding Nemo-themed Big Blue Pool.', '30 min', true, 'Drop Off Pool Bar', 'Art of Animation'),

-- ── All-Star Movies ──────────────────────────────────────────────────
('World Premiere Food Court', 'Resorts', 'Dining', 'Quick Service', 'Movie-themed food court with build-your-own meals.', '15 min', true, 'World Premiere Food Court', 'All-Star Movies'),
('Silver Screen Spirits Pool Bar', 'Resorts', 'Dining', 'Bar & Lounge', 'Poolside bar by the Fantasia pool.', '30 min', true, 'Silver Screen Spirits Pool Bar', 'All-Star Movies'),
('Giant movie icon photo ops', 'Resorts', 'Attractions', 'Landmark', 'Pose with towering icons from 101 Dalmatians, Toy Story, and more.', 'Varies', true, 'Giant movie icon photo ops', 'All-Star Movies'),

-- ── All-Star Music ───────────────────────────────────────────────────
('Intermission Food Court', 'Resorts', 'Dining', 'Quick Service', 'Music-themed food court with grab-and-go and hot entrees.', '15 min', true, 'Intermission Food Court', 'All-Star Music'),
('Singing Spirits Pool Bar', 'Resorts', 'Dining', 'Bar & Lounge', 'Poolside bar by the guitar-shaped Calypso Pool.', '30 min', true, 'Singing Spirits Pool Bar', 'All-Star Music'),
('Giant music icon photo ops', 'Resorts', 'Attractions', 'Landmark', 'Snap photos with giant guitars, cowboy boots, and maracas.', 'Varies', true, 'Giant music icon photo ops', 'All-Star Music'),

-- ── All-Star Sports ──────────────────────────────────────────────────
('End Zone Food Court', 'Resorts', 'Dining', 'Quick Service', 'Sports-themed food court with build-your-own meals.', '15 min', true, 'End Zone Food Court', 'All-Star Sports'),
('Grandstand Spirits Pool Bar', 'Resorts', 'Dining', 'Bar & Lounge', 'Poolside bar by the Surfboard Bay Pool.', '30 min', true, 'Grandstand Spirits Pool Bar', 'All-Star Sports'),
('Giant sports icon photo ops', 'Resorts', 'Attractions', 'Landmark', 'Pose with giant football helmets, tennis cans, and surfboards.', 'Varies', true, 'Giant sports icon photo ops', 'All-Star Sports'),

-- ══ DVC ════════════════════════════════════════════════════════════

-- ── Old Key West ─────────────────────────────────────────────────────
('Boat to Disney Springs', 'Resorts', 'Attractions', 'Boat', 'Cruise the Sassagoula River to Disney Springs.', '20 min', true, 'Boat to Disney Springs', 'Old Key West'),
('Olivia''s Cafe', 'Resorts', 'Dining', 'Table Service', 'Key West-style home cooking with island flair.', '60 min', true, 'Olivia''s Cafe', 'Old Key West'),
('Good''s Food to Go', 'Resorts', 'Dining', 'Quick Service', 'Walk-up window with burgers, sandwiches, and conch fritters.', '15 min', true, 'Good''s Food to Go', 'Old Key West'),
('Gurgling Suitcase', 'Resorts', 'Dining', 'Bar & Lounge', 'Tiny, beloved bar serving the potent Rum Runner.', '30 min', true, 'Gurgling Suitcase', 'Old Key West'),
('Bike & boat rentals', 'Resorts', 'Attractions', 'Recreation', 'Rent bikes or boats and explore the waterways and villages.', '30 min', true, 'Bike & boat rentals', 'Old Key West'),

-- ── Saratoga Springs ─────────────────────────────────────────────────
('Boat to Disney Springs', 'Resorts', 'Attractions', 'Boat', 'Cruise across Village Lake to Disney Springs.', '10 min', true, 'Boat to Disney Springs', 'Saratoga Springs'),
('The Turf Club Bar and Grill', 'Resorts', 'Dining', 'Table Service', 'Equestrian-themed grill with steaks, seafood, and a golf-course view.', '60 min', true, 'Turf Club Bar and Grill', 'Saratoga Springs'),
('The Artist''s Palette', 'Resorts', 'Dining', 'Quick Service', 'Quick service with flatbreads, sandwiches, and grab-and-go.', '15 min', true, 'Artist''s Palette', 'Saratoga Springs'),
('Senses Spa', 'Resorts', 'Events & Tours', 'Spa', 'Relax with a treatment at the resort''s full-service spa.', '60 min', true, 'Senses Spa', 'Saratoga Springs'),
('Bike & boat rentals', 'Resorts', 'Attractions', 'Recreation', 'Rent bikes or boats and explore the resort''s waterways.', '30 min', true, 'Bike & boat rentals', 'Saratoga Springs'),

-- ══ MARRIOTT (Swan / Dolphin / Swan Reserve) ═══════════════════════

-- ── Swan ─────────────────────────────────────────────────────────────
('Boat to Epcot', 'Resorts', 'Attractions', 'Boat', 'Take the Friendship boat to Epcot''s International Gateway — or walk over.', '10 min', true, 'Boat to Epcot', 'Swan'),
('Boat to Hollywood Studios', 'Resorts', 'Attractions', 'Boat', 'Cruise across Crescent Lake to Disney''s Hollywood Studios.', '20 min', true, 'Boat to Hollywood Studios', 'Swan'),
('Garden Grove', 'Resorts', 'Dining', 'Table Service', 'Garden-themed restaurant with character dining on select mornings.', '60 min', true, 'Garden Grove', 'Swan'),
('Il Mulino', 'Resorts', 'Dining', 'Table Service', 'New York-style Italian trattoria with rustic Abruzzo dishes.', '75 min', true, 'Il Mulino', 'Swan'),

-- ── Dolphin ──────────────────────────────────────────────────────────
('Boat to Epcot', 'Resorts', 'Attractions', 'Boat', 'Take the Friendship boat to Epcot''s International Gateway — or walk over.', '10 min', true, 'Boat to Epcot', 'Dolphin'),
('Boat to Hollywood Studios', 'Resorts', 'Attractions', 'Boat', 'Cruise across Crescent Lake to Disney''s Hollywood Studios.', '20 min', true, 'Boat to Hollywood Studios', 'Dolphin'),
('Todd English''s bluezoo', 'Resorts', 'Dining', 'Signature Dining', 'Modern coastal seafood in a stylish, upscale setting.', '90 min', true, 'Todd English''s bluezoo', 'Dolphin'),
('Shula''s Steak House', 'Resorts', 'Dining', 'Signature Dining', 'Premium steakhouse with certified Angus beef.', '90 min', true, 'Shula''s Steak House', 'Dolphin'),
('Fuel', 'Resorts', 'Dining', 'Quick Service', 'Grab-and-go market for coffee, sandwiches, and snacks.', '10 min', true, 'Fuel', 'Dolphin'),

-- ── Swan Reserve ─────────────────────────────────────────────────────
('Boat to Epcot', 'Resorts', 'Attractions', 'Boat', 'Walk to the Swan/Dolphin dock and boat to Epcot''s International Gateway.', '15 min', true, 'Boat to Epcot', 'Swan Reserve'),
('Amare', 'Resorts', 'Dining', 'Table Service', 'Mediterranean-inspired dining with a rooftop-view setting.', '75 min', true, 'Amare', 'Swan Reserve'),
('Stir', 'Resorts', 'Dining', 'Bar & Lounge', 'Lobby bar with craft cocktails and light bites.', '30 min', true, 'Stir', 'Swan Reserve');
