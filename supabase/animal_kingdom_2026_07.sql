-- ============================================================
-- Animal Kingdom — Attractions, Entertainment, Dining,
-- Characters, Events & Tours  FULL REPLACE (2026-07)
-- Run in the Supabase SQL Editor. One transaction: all-or-nothing.
--
-- WARNING: each section deletes the current Animal Kingdom rows for
-- that category and re-creates the list fresh, clearing tracked
-- progress for those items.
--
-- Column order:
--   (name, park, category, type, description, opening_year,
--    duration, is_active, sort_name, location)
-- `type`/`location` (land) are best-effort — adjust freely.
-- ============================================================

BEGIN;

-- ============================================================
-- ATTRACTIONS
-- ============================================================
DELETE FROM experiences WHERE park = 'Animal Kingdom' AND category = 'Attractions';

INSERT INTO experiences (name, park, category, type, description, opening_year, duration, is_active, sort_name, location) VALUES
('African Birds - Disney Animals', 'Animal Kingdom', 'Attractions', 'Wildlife', 'Aviary of African bird species.', NULL, NULL, true, 'African Birds - Disney Animals', 'Africa'),
('African Elephants - Disney Animals', 'Animal Kingdom', 'Attractions', 'Wildlife', 'African elephants roaming the savanna.', NULL, NULL, true, 'African Elephants - Disney Animals', 'Africa'),
('African Hogs - Disney Animals', 'Animal Kingdom', 'Attractions', 'Wildlife', 'Warthogs and African hogs on exhibit.', NULL, NULL, true, 'African Hogs - Disney Animals', 'Africa'),
('African Lions - Disney Animals', 'Animal Kingdom', 'Attractions', 'Wildlife', 'African lions viewed from the safari.', NULL, NULL, true, 'African Lions - Disney Animals', 'Africa'),
('Animal Care at Conservation Station', 'Animal Kingdom', 'Attractions', 'Wildlife', 'Behind-the-scenes look at animal care and veterinary work.', NULL, NULL, true, 'Animal Care at Conservation Station', 'Rafiki''s Planet Watch'),
('Ankole Cattle - Disney Animals', 'Animal Kingdom', 'Attractions', 'Wildlife', 'Long-horned Ankole cattle on the savanna.', NULL, NULL, true, 'Ankole Cattle - Disney Animals', 'Africa'),
('Anteaters - Disney Animals', 'Animal Kingdom', 'Attractions', 'Wildlife', 'Giant anteater exhibit.', NULL, NULL, true, 'Anteaters - Disney Animals', 'Discovery Island'),
('Asian Birds - Disney Animals', 'Animal Kingdom', 'Attractions', 'Wildlife', 'Aviary of Asian bird species.', NULL, NULL, true, 'Asian Birds - Disney Animals', 'Asia'),
('Asian Small-Clawed Otters - Disney Animals', 'Animal Kingdom', 'Attractions', 'Wildlife', 'Playful small-clawed otters on exhibit.', NULL, NULL, true, 'Asian Small-Clawed Otters - Disney Animals', 'Asia'),
('Avatar Flight of Passage', 'Animal Kingdom', 'Attractions', 'Simulator', 'Soar on a mountain banshee over Pandora in this flight simulator.', NULL, NULL, true, 'Avatar Flight of Passage', 'Pandora – The World of Avatar'),
('Babirusas - Disney Animals', 'Animal Kingdom', 'Attractions', 'Wildlife', 'Babirusa wild pig exhibit.', NULL, NULL, true, 'Babirusas - Disney Animals', 'Asia'),
('Bats - Disney Animals', 'Animal Kingdom', 'Attractions', 'Wildlife', 'Giant fruit bat exhibit on the Maharajah Jungle Trek.', NULL, NULL, true, 'Bats - Disney Animals', 'Asia'),
('Black Rhinos - Disney Animals', 'Animal Kingdom', 'Attractions', 'Wildlife', 'Black rhinoceros on the savanna.', NULL, NULL, true, 'Black Rhinos - Disney Animals', 'Africa'),
('Butterflies at Conservation Station - Disney Animals', 'Animal Kingdom', 'Attractions', 'Wildlife', 'Butterfly garden at Conservation Station.', NULL, NULL, true, 'Butterflies at Conservation Station - Disney Animals', 'Rafiki''s Planet Watch'),
('Cotton-Top Tamarins - Disney Animals', 'Animal Kingdom', 'Attractions', 'Wildlife', 'Cotton-top tamarin monkey exhibit.', NULL, NULL, true, 'Cotton-Top Tamarins - Disney Animals', 'Discovery Island'),
('Discovery Island Trails', 'Animal Kingdom', 'Attractions', 'Walkthrough', 'Walking trails with animal exhibits around the Tree of Life.', NULL, NULL, true, 'Discovery Island Trails', 'Discovery Island'),
('Expedition Everest - Legend of the Forbidden Mountain', 'Animal Kingdom', 'Attractions', 'Thrill Ride', 'High-speed coaster racing the Yeti through the Himalayas.', NULL, NULL, true, 'Expedition Everest - Legend of the Forbidden Mountain', 'Asia'),
('Flamingos at Discovery Island - Disney Animals', 'Animal Kingdom', 'Attractions', 'Wildlife', 'Flamingo flock on Discovery Island.', NULL, NULL, true, 'Flamingos at Discovery Island - Disney Animals', 'Discovery Island'),
('Gibbons - Disney Animals', 'Animal Kingdom', 'Attractions', 'Wildlife', 'Gibbon primate exhibit.', NULL, NULL, true, 'Gibbons - Disney Animals', 'Asia'),
('Giraffes - Disney Animals', 'Animal Kingdom', 'Attractions', 'Wildlife', 'Giraffes roaming the savanna.', NULL, NULL, true, 'Giraffes - Disney Animals', 'Africa'),
('Gorilla Falls Exploration Trail', 'Animal Kingdom', 'Attractions', 'Walkthrough', 'Walking trail through gorilla and African wildlife habitats.', NULL, NULL, true, 'Gorilla Falls Exploration Trail', 'Africa'),
('Gorillas - Disney Animals', 'Animal Kingdom', 'Attractions', 'Wildlife', 'Western lowland gorilla exhibit.', NULL, NULL, true, 'Gorillas - Disney Animals', 'Africa'),
('Hippopotamuses - Disney Animals', 'Animal Kingdom', 'Attractions', 'Wildlife', 'Hippos viewed above and below the water.', NULL, NULL, true, 'Hippopotamuses - Disney Animals', 'Africa'),
('Invertebrates at Conservation Station - Disney Animals', 'Animal Kingdom', 'Attractions', 'Wildlife', 'Invertebrate exhibits at Conservation Station.', NULL, NULL, true, 'Invertebrates at Conservation Station - Disney Animals', 'Rafiki''s Planet Watch'),
('Jumping Junction', 'Animal Kingdom', 'Attractions', 'Kids Area', 'Interactive water-play area for kids.', NULL, NULL, true, 'Jumping Junction', NULL),
('Kali River Rapids', 'Animal Kingdom', 'Attractions', 'Family Raft Ride', 'White-water raft ride through an Asian rainforest.', NULL, NULL, true, 'Kali River Rapids', 'Asia'),
('Kangaroos - Disney Animals', 'Animal Kingdom', 'Attractions', 'Wildlife', 'Kangaroo exhibit.', NULL, NULL, true, 'Kangaroos - Disney Animals', 'Discovery Island'),
('Kilimanjaro Safaris', 'Animal Kingdom', 'Attractions', 'Safari', 'Open-air safari through an African savanna full of live animals.', NULL, NULL, true, 'Kilimanjaro Safaris', 'Africa'),
('Komodo Dragons - Disney Animals', 'Animal Kingdom', 'Attractions', 'Wildlife', 'Komodo dragon exhibit.', NULL, NULL, true, 'Komodo Dragons - Disney Animals', 'Asia'),
('Lemurs - Disney Animals', 'Animal Kingdom', 'Attractions', 'Wildlife', 'Ring-tailed lemur exhibit.', NULL, NULL, true, 'Lemurs - Disney Animals', 'Discovery Island'),
('Maharajah Jungle Trek', 'Animal Kingdom', 'Attractions', 'Walkthrough', 'Walking trek past tigers, bats, and Asian wildlife.', NULL, NULL, true, 'Maharajah Jungle Trek', 'Asia'),
('Meerkats - Disney Animals', 'Animal Kingdom', 'Attractions', 'Wildlife', 'Meerkat colony on exhibit.', NULL, NULL, true, 'Meerkats - Disney Animals', 'Africa'),
('Migratory Birds - Disney Animals', 'Animal Kingdom', 'Attractions', 'Wildlife', 'Migratory bird exhibit.', NULL, NULL, true, 'Migratory Birds - Disney Animals', 'Discovery Island'),
('Na''vi River Journey', 'Animal Kingdom', 'Attractions', 'Boat Ride', 'Gentle boat ride through the bioluminescent forests of Pandora.', NULL, NULL, true, 'Na''vi River Journey', 'Pandora – The World of Avatar'),
('The Oasis Exhibits', 'Animal Kingdom', 'Attractions', 'Walkthrough', 'Lush entry garden with small animal habitats.', NULL, NULL, true, 'The Oasis Exhibits', 'The Oasis'),
('Okapis - Disney Animals', 'Animal Kingdom', 'Attractions', 'Wildlife', 'Okapi exhibit.', NULL, NULL, true, 'Okapis - Disney Animals', 'Africa'),
('Tigers - Disney Animals', 'Animal Kingdom', 'Attractions', 'Wildlife', 'Bengal tiger exhibit on the Maharajah Jungle Trek.', NULL, NULL, true, 'Tigers - Disney Animals', 'Asia'),
('Tree of Life', 'Animal Kingdom', 'Attractions', 'Landmark', 'The 145-foot hand-carved tree that is the icon of the park.', NULL, NULL, true, 'Tree of Life', 'Discovery Island'),
('Vultures - Disney Animals', 'Animal Kingdom', 'Attractions', 'Wildlife', 'Vulture exhibit.', NULL, NULL, true, 'Vultures - Disney Animals', 'Africa'),
('White Rhinos - Disney Animals', 'Animal Kingdom', 'Attractions', 'Wildlife', 'White rhinoceros on the savanna.', NULL, NULL, true, 'White Rhinos - Disney Animals', 'Africa'),
('Wilderness Explorers', 'Animal Kingdom', 'Attractions', 'Interactive Experience', 'Park-wide badge-collecting game inspired by the movie Up.', NULL, NULL, true, 'Wilderness Explorers', 'Discovery Island'),
('Wildlife Express Train', 'Animal Kingdom', 'Attractions', 'Transportation', 'Train to Rafiki''s Planet Watch and Conservation Station.', NULL, NULL, true, 'Wildlife Express Train', 'Africa'),
('Zebras at Africa - Disney Animals', 'Animal Kingdom', 'Attractions', 'Wildlife', 'Zebra herd on the African savanna.', NULL, NULL, true, 'Zebras at Africa - Disney Animals', 'Africa'),
('Zootopia: Better Zoogether!', 'Animal Kingdom', 'Attractions', 'Show', 'Animated show celebrating the world of Zootopia.', NULL, NULL, true, 'Zootopia: Better Zoogether!', 'Discovery Island');


-- ============================================================
-- ENTERTAINMENT
-- ============================================================
DELETE FROM experiences WHERE park = 'Animal Kingdom' AND category = 'Entertainment';

INSERT INTO experiences (name, park, category, type, description, opening_year, duration, is_active, sort_name, location) VALUES
('Adventures with Kevin on Discovery Island', 'Animal Kingdom', 'Entertainment', 'Street Entertainment', 'Roaming appearances by Kevin the bird from Up.', NULL, NULL, true, 'Adventures with Kevin on Discovery Island', 'Discovery Island'),
('Animal Encounters: Winged Encounters – The Kingdom Takes Flight', 'Animal Kingdom', 'Entertainment', 'Show', 'Macaws take flight in front of the Tree of Life.', NULL, NULL, true, 'Animal Encounters: Winged Encounters – The Kingdom Takes Flight', 'Discovery Island'),
('Beats and Strings', 'Animal Kingdom', 'Entertainment', 'Live Music', 'Live musical performance in the park.', NULL, NULL, true, 'Beats and Strings', NULL),
('Bluey''s Wild World at Conservation Station', 'Animal Kingdom', 'Entertainment', 'Show', 'Bluey-themed play experience at Conservation Station.', NULL, NULL, true, 'Bluey''s Wild World at Conservation Station', 'Rafiki''s Planet Watch'),
('DiVine', 'Animal Kingdom', 'Entertainment', 'Street Entertainment', 'Vine-covered stilt performer blending into the foliage.', NULL, NULL, true, 'DiVine', 'Asia'),
('Eco-Rhythmics', 'Animal Kingdom', 'Entertainment', 'Street Entertainment', 'Rhythmic movement and music performance.', NULL, NULL, true, 'Eco-Rhythmics', NULL),
('Feathered Friends in Flight!', 'Animal Kingdom', 'Entertainment', 'Show', 'Free-flying bird show in Asia.', NULL, NULL, true, 'Feathered Friends in Flight!', 'Asia'),
('Festival of the Lion King', 'Animal Kingdom', 'Entertainment', 'Stage Show', 'Broadway-style celebration of The Lion King with song and acrobatics.', NULL, NULL, true, 'Festival of the Lion King', 'Africa'),
('Finding Nemo: The Big Blue... and Beyond!', 'Animal Kingdom', 'Entertainment', 'Stage Show', 'Musical stage show retelling Finding Nemo.', NULL, NULL, true, 'Finding Nemo: The Big Blue... and Beyond!', 'DinoLand U.S.A.'),
('Harambe Village Street Band – Burudika', 'Animal Kingdom', 'Entertainment', 'Live Music', 'Afro-pop street band performing in Harambe.', NULL, NULL, true, 'Harambe Village Street Band – Burudika', 'Africa'),
('Kora Tinga Tinga', 'Animal Kingdom', 'Entertainment', 'Live Music', 'African percussion and dance performance.', NULL, NULL, true, 'Kora Tinga Tinga', 'Africa'),
('Tam Tam Drummers of Harambe', 'Animal Kingdom', 'Entertainment', 'Live Music', 'Energetic African drum troupe in Harambe.', NULL, NULL, true, 'Tam Tam Drummers of Harambe', 'Africa'),
('Tree of Life Awakenings', 'Animal Kingdom', 'Entertainment', 'Nighttime Show', 'Nighttime projection show bringing the Tree of Life to life.', NULL, NULL, true, 'Tree of Life Awakenings', 'Discovery Island'),
('Viva Gaia Street Band!', 'Animal Kingdom', 'Entertainment', 'Live Music', 'Upbeat world-music street band on Discovery Island.', NULL, NULL, true, 'Viva Gaia Street Band!', 'Discovery Island'),
('Zoogether Day Gathering Spot', 'Animal Kingdom', 'Entertainment', 'Street Entertainment', 'Gathering spot for Zootopia-themed fun.', NULL, NULL, true, 'Zoogether Day Gathering Spot', NULL);


-- ============================================================
-- DINING
-- ============================================================
DELETE FROM experiences WHERE park = 'Animal Kingdom' AND category = 'Dining';

INSERT INTO experiences (name, park, category, type, description, opening_year, duration, is_active, sort_name, location) VALUES
('Anandapur Ice Cream Truck', 'Animal Kingdom', 'Dining', 'Snack', 'Soft-serve and ice cream treats in Asia.', NULL, NULL, true, 'Anandapur Ice Cream Truck', 'Asia'),
('Caravan Road', 'Animal Kingdom', 'Dining', 'Quick Service', 'Asian quick-service bowls and snacks.', NULL, NULL, true, 'Caravan Road', 'Asia'),
('Creature Comforts', 'Animal Kingdom', 'Dining', 'Snack', 'Starbucks coffee and pastries on Discovery Island.', NULL, NULL, true, 'Creature Comforts', 'Discovery Island'),
('Dawa Bar', 'Animal Kingdom', 'Dining', 'Bar & Lounge', 'African-inspired cocktails and beer in Harambe.', NULL, NULL, true, 'Dawa Bar', 'Africa'),
('Drinkwallah', 'Animal Kingdom', 'Dining', 'Snack', 'Drinks and snacks along the road to Everest.', NULL, NULL, true, 'Drinkwallah', 'Asia'),
('Eight Spoon Café', 'Animal Kingdom', 'Dining', 'Snack', 'Mac-and-cheese and snacks on Discovery Island.', NULL, NULL, true, 'Eight Spoon Café', 'Discovery Island'),
('Flame Tree Barbecue', 'Animal Kingdom', 'Dining', 'Quick Service', 'Smoked ribs and barbecue with waterfront seating.', NULL, NULL, true, 'Flame Tree Barbecue', 'Discovery Island'),
('Harambe Fruit Market', 'Animal Kingdom', 'Dining', 'Snack', 'Fresh fruit and grab-and-go snacks in Africa.', NULL, NULL, true, 'Harambe Fruit Market', 'Africa'),
('Harambe Market', 'Animal Kingdom', 'Dining', 'Quick Service', 'African street-food stalls in Harambe.', NULL, NULL, true, 'Harambe Market', 'Africa'),
('Isle of Java', 'Animal Kingdom', 'Dining', 'Snack', 'Coffee, espresso, and pastries on Discovery Island.', NULL, NULL, true, 'Isle of Java', 'Discovery Island'),
('Kusafiri Coffee Shop & Bakery', 'Animal Kingdom', 'Dining', 'Snack', 'Coffee and baked goods in Harambe.', NULL, NULL, true, 'Kusafiri Coffee Shop & Bakery', 'Africa'),
('Mahindi', 'Animal Kingdom', 'Dining', 'Snack', 'Kettle corn and snacks in Africa.', NULL, NULL, true, 'Mahindi', 'Africa'),
('Mr. Kamal''s', 'Animal Kingdom', 'Dining', 'Snack', 'Falafel and fries snack stand in Asia.', NULL, NULL, true, 'Mr. Kamal''s', 'Asia'),
('Nomad Lounge', 'Animal Kingdom', 'Dining', 'Bar & Lounge', 'Craft cocktails and small plates beside Tiffins.', NULL, NULL, true, 'Nomad Lounge', 'Discovery Island'),
('Pizzafari', 'Animal Kingdom', 'Dining', 'Quick Service', 'Counter-service pizza and pasta on Discovery Island.', NULL, NULL, true, 'Pizzafari', 'Discovery Island'),
('Pongu Pongu', 'Animal Kingdom', 'Dining', 'Snack', 'Specialty drinks and snacks in Pandora.', NULL, NULL, true, 'Pongu Pongu', 'Pandora – The World of Avatar'),
('Rainforest Cafe® at Disney''s Animal Kingdom', 'Animal Kingdom', 'Dining', 'Table Service', 'Jungle-themed restaurant at the park entrance.', NULL, NULL, true, 'Rainforest Cafe® at Disney''s Animal Kingdom', 'The Oasis'),
('Satu''li Canteen', 'Animal Kingdom', 'Dining', 'Quick Service', 'Healthy build-your-own bowls in Pandora.', NULL, NULL, true, 'Satu''li Canteen', 'Pandora – The World of Avatar'),
('The Smiling Crocodile', 'Animal Kingdom', 'Dining', 'Snack', 'Grab-and-go snacks and drinks.', NULL, NULL, true, 'The Smiling Crocodile', NULL),
('Tamu Tamu Refreshments', 'Animal Kingdom', 'Dining', 'Snack', 'Ice cream and snacks in Harambe.', NULL, NULL, true, 'Tamu Tamu Refreshments', 'Africa'),
('Terra Treats', 'Animal Kingdom', 'Dining', 'Snack', 'Plant-forward snacks on Discovery Island.', NULL, NULL, true, 'Terra Treats', 'Discovery Island'),
('Thirsty River Bar', 'Animal Kingdom', 'Dining', 'Bar & Lounge', 'Beer, wine, and cocktails near Everest.', NULL, NULL, true, 'Thirsty River Bar', 'Asia'),
('Tiffins Restaurant', 'Animal Kingdom', 'Dining', 'Signature Dining', 'Globally-inspired signature dining celebrating the park''s artists.', NULL, NULL, true, 'Tiffins Restaurant', 'Discovery Island'),
('Trek Snacks', 'Animal Kingdom', 'Dining', 'Snack', 'Snacks and drinks along the trail in Asia.', NULL, NULL, true, 'Trek Snacks', 'Asia'),
('Tusker House Restaurant', 'Animal Kingdom', 'Dining', 'Character Dining', 'African buffet with character dining in Harambe.', NULL, NULL, true, 'Tusker House Restaurant', 'Africa'),
('Warung Outpost', 'Animal Kingdom', 'Dining', 'Snack', 'Drinks and snacks in Asia.', NULL, NULL, true, 'Warung Outpost', 'Asia'),
('Yak & Yeti™ Local Food Cafes', 'Animal Kingdom', 'Dining', 'Quick Service', 'Asian quick-service bowls near Everest.', NULL, NULL, true, 'Yak & Yeti™ Local Food Cafes', 'Asia'),
('Yak & Yeti™ Quality Beverages', 'Animal Kingdom', 'Dining', 'Snack', 'Beer and cocktails in Asia.', NULL, NULL, true, 'Yak & Yeti™ Quality Beverages', 'Asia'),
('Yak & Yeti™ Restaurant', 'Animal Kingdom', 'Dining', 'Table Service', 'Sit-down pan-Asian restaurant in Anandapur.', NULL, NULL, true, 'Yak & Yeti™ Restaurant', 'Asia'),
('Zuri''s Sweet Shop', 'Animal Kingdom', 'Dining', 'Snack', 'Candy and sweets in Harambe.', NULL, NULL, true, 'Zuri''s Sweet Shop', 'Africa');


-- ============================================================
-- CHARACTERS
-- ============================================================
DELETE FROM experiences WHERE park = 'Animal Kingdom' AND category = 'Characters';

INSERT INTO experiences (name, park, category, type, description, opening_year, duration, is_active, sort_name, location) VALUES
('Meet Favorite Disney Pals at Adventurers Outpost', 'Animal Kingdom', 'Characters', 'Character Meet', 'Meet Mickey, Minnie, and pals at Adventurers Outpost.', NULL, NULL, true, 'Meet Favorite Disney Pals at Adventurers Outpost', 'Discovery Island'),
('Meet Moana at Character Landing', 'Animal Kingdom', 'Characters', 'Character Meet', 'Meet Moana at Character Landing on Discovery Island.', NULL, NULL, true, 'Meet Moana at Character Landing', 'Discovery Island');


-- ============================================================
-- EVENTS & TOURS
-- ============================================================
DELETE FROM experiences WHERE park = 'Animal Kingdom' AND category = 'Events & Tours';

INSERT INTO experiences (name, park, category, type, description, opening_year, duration, is_active, sort_name, location) VALUES
('Caring for Giants', 'Animal Kingdom', 'Events & Tours', 'Tour', 'Up-close elephant tour with animal-care experts.', NULL, NULL, true, 'Caring for Giants', 'Africa'),
('Savor the Savanna', 'Animal Kingdom', 'Events & Tours', 'Tour', 'Safari tour with tastings and animal encounters.', NULL, NULL, true, 'Savor the Savanna', 'Africa'),
('Up Close with Rhinos', 'Animal Kingdom', 'Events & Tours', 'Tour', 'Behind-the-scenes rhino encounter tour.', NULL, NULL, true, 'Up Close with Rhinos', 'Africa'),
('Wild Africa Trek', 'Animal Kingdom', 'Events & Tours', 'Tour', 'Guided VIP trek across the savanna with rope bridges.', NULL, NULL, true, 'Wild Africa Trek', 'Africa');

COMMIT;

-- ------------------------------------------------------------
-- VERIFY per category:
-- ------------------------------------------------------------
-- SELECT category, name, type, location FROM experiences
--   WHERE park = 'Animal Kingdom'
--   ORDER BY category, sort_name;
