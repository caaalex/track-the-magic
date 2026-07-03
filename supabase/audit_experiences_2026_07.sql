-- ═══════════════════════════════════════════════════════════════════
-- EXPERIENCES AUDIT — July 2026
-- Run this entire file once in the Supabase SQL editor.
-- Adds ~92 missing experiences across all parks, removes closed/
-- duplicate entries. Safe to run once; re-running would duplicate rows.
-- ═══════════════════════════════════════════════════════════════════

-- ─── CLEANUP: closed / duplicate entries ────────────────────────────
DELETE FROM experiences WHERE park = 'Magic Kingdom'     AND name IN ('Disney Enchantment', 'Enchantment');
DELETE FROM experiences WHERE park = 'Hollywood Studios' AND name = 'Muppet*Vision 3D';
DELETE FROM experiences WHERE park = 'Typhoon Lagoon'    AND name = 'Shark Reef';
DELETE FROM experiences WHERE park = 'Resorts'           AND name = 'Mickey''s Backyard BBQ';
DELETE FROM experiences WHERE park = 'Epcot'             AND name = 'Character Spot — World Discovery';

-- ─── EPCOT: attractions ─────────────────────────────────────────────
INSERT INTO experiences (name, park, category, type, description, opening_year, duration, is_active, sort_name, location) VALUES
('Journey of Water, Inspired by Moana', 'Epcot', 'Attractions', 'Walkthrough', 'Interactive outdoor trail where you play with living water that responds to your touch, inspired by Moana', '2023', '20 min', true, 'Journey of Water, Inspired by Moana', 'World Nature'),
('Gran Fiesta Tour Starring The Three Caballeros', 'Epcot', 'Attractions', 'Boat Ride', 'Gentle boat cruise through Mexico chasing Donald Duck with José Carioca and Panchito', '2007', '8 min', true, 'Gran Fiesta Tour Starring The Three Caballeros', 'Mexico'),
('The American Adventure', 'Epcot', 'Attractions', 'Show', 'Audio-Animatronic stage show hosted by Ben Franklin and Mark Twain telling the story of America', '1982', '30 min', true, 'American Adventure', 'American Adventure'),
('Impressions de France', 'Epcot', 'Attractions', 'Film', 'Sweeping 200-degree film tour of the French countryside set to classical music', '1982', '18 min', true, 'Impressions de France', 'France'),
('Beauty and the Beast Sing-Along', 'Epcot', 'Attractions', 'Film', 'Animated sing-along retelling of Beauty and the Beast narrated by Angela Lansbury', '2020', '15 min', true, 'Beauty and the Beast Sing-Along', 'France'),
('Canada Far and Wide', 'Epcot', 'Attractions', 'Film', 'CircleVision 360 journey across Canada narrated by Catherine O''Hara and Eugene Levy', '2020', '12 min', true, 'Canada Far and Wide', 'Canada'),
('Reflections of China', 'Epcot', 'Attractions', 'Film', 'CircleVision 360 film exploring China''s landscapes and cities', '2003', '14 min', true, 'Reflections of China', 'China'),
('Awesome Planet', 'Epcot', 'Attractions', 'Film', 'Environmental film celebrating the beauty of Earth in The Land pavilion', '2020', '10 min', true, 'Awesome Planet', 'World Nature');

-- ─── EPCOT: dining ──────────────────────────────────────────────────
INSERT INTO experiences (name, park, category, type, description, opening_year, duration, is_active, sort_name, location) VALUES
('San Angel Inn Restaurante', 'Epcot', 'Dining', 'Table Service', 'Mexican dining inside the pyramid overlooking the Gran Fiesta Tour boats under a twilight sky', '1982', '60 min', true, 'San Angel Inn Restaurante', 'Mexico'),
('La Hacienda de San Angel', 'Epcot', 'Dining', 'Table Service', 'Lagoon-side Mexican restaurant with prime views of the nighttime spectacular', '2010', '60 min', true, 'La Hacienda de San Angel', 'Mexico'),
('La Cava del Tequila', 'Epcot', 'Dining', 'Bar & Lounge', 'Cozy tequila bar inside the Mexico pyramid with over 200 tequilas and famous avocado margaritas', '2009', '30 min', true, 'La Cava del Tequila', 'Mexico'),
('Biergarten Restaurant', 'Epcot', 'Dining', 'Buffet', 'German buffet in a Bavarian village square with live oompah band and communal seating', '1982', '90 min', true, 'Biergarten Restaurant', 'Germany'),
('Sommerfest', 'Epcot', 'Dining', 'Quick Service', 'German quick service serving bratwurst, pretzels, and beer', '1982', '15 min', true, 'Sommerfest', 'Germany'),
('Karamell-Küche', 'Epcot', 'Dining', 'Snack', 'Werther''s caramel kitchen with fresh handmade caramel corn, apples, and treats', '2010', '5 min', true, 'Karamell-Küche', 'Germany'),
('Nine Dragons Restaurant', 'Epcot', 'Dining', 'Table Service', 'Traditional Chinese dining with dishes from multiple regional cuisines', '1982', '60 min', true, 'Nine Dragons Restaurant', 'China'),
('Lotus Blossom Café', 'Epcot', 'Dining', 'Quick Service', 'Chinese quick service with orange chicken, egg rolls, and noodle bowls', '1982', '15 min', true, 'Lotus Blossom Café', 'China'),
('Rose & Crown Dining Room', 'Epcot', 'Dining', 'Table Service', 'British pub with fish and chips, bangers and mash, and lagoon-view fireworks seating', '1982', '60 min', true, 'Rose & Crown Dining Room', 'United Kingdom'),
('Yorkshire County Fish Shop', 'Epcot', 'Dining', 'Quick Service', 'Walk-up window serving classic fish and chips beside the UK pavilion', '1982', '10 min', true, 'Yorkshire County Fish Shop', 'United Kingdom'),
('Chefs de France', 'Epcot', 'Dining', 'Table Service', 'Classic French brasserie serving escargot, French onion soup, and crème brûlée', '1982', '60 min', true, 'Chefs de France', 'France'),
('Les Halles Boulangerie-Patisserie', 'Epcot', 'Dining', 'Quick Service', 'French bakery with baguette sandwiches, quiche, and a full pastry case', '1982', '15 min', true, 'Les Halles Boulangerie-Patisserie', 'France'),
('L''Artisan des Glaces', 'Epcot', 'Dining', 'Snack', 'Artisan French ice cream and sorbet shop — try the macaron ice cream sandwich', '2013', '5 min', true, 'L''Artisan des Glaces', 'France'),
('Spice Road Table', 'Epcot', 'Dining', 'Table Service', 'Mediterranean small plates on the lagoon with front-row fireworks views', '2014', '60 min', true, 'Spice Road Table', 'Morocco'),
('Tangierine Café', 'Epcot', 'Dining', 'Quick Service', 'Moroccan quick service with shawarma, hummus, and couscous', '1984', '15 min', true, 'Tangierine Café', 'Morocco'),
('Tutto Italia Ristorante', 'Epcot', 'Dining', 'Table Service', 'Elegant Italian dining with fresh pasta and regional specialties', '2007', '60 min', true, 'Tutto Italia Ristorante', 'Italy'),
('Tutto Gusto Wine Cellar', 'Epcot', 'Dining', 'Bar & Lounge', 'Intimate Italian wine cellar with over 200 wines and small plates', '2012', '45 min', true, 'Tutto Gusto Wine Cellar', 'Italy'),
('Katsura Grill', 'Epcot', 'Dining', 'Quick Service', 'Japanese quick service with teriyaki, sushi, and udon in a tranquil garden setting', '1982', '15 min', true, 'Katsura Grill', 'Japan'),
('Takumi-Tei', 'Epcot', 'Dining', 'Signature Dining', 'Intimate signature Japanese dining honoring the artistry of nature and craft', '2019', '90 min', true, 'Takumi-Tei', 'Japan'),
('Regal Eagle Smokehouse', 'Epcot', 'Dining', 'Quick Service', 'American barbecue hosted by Sam Eagle with regional BBQ styles from across the country', '2020', '15 min', true, 'Regal Eagle Smokehouse', 'American Adventure'),
('Connections Café & Eatery', 'Epcot', 'Dining', 'Quick Service', 'EPCOT''s flagship quick service and Starbucks café in World Celebration', '2022', '15 min', true, 'Connections Café & Eatery', 'World Celebration'),
('Sunshine Seasons', 'Epcot', 'Dining', 'Quick Service', 'Food court in The Land pavilion with fresh dishes made from greenhouse-grown produce', '2005', '15 min', true, 'Sunshine Seasons', 'World Nature');

-- ─── EPCOT: entertainment & characters ──────────────────────────────
INSERT INTO experiences (name, park, category, type, description, opening_year, duration, is_active, sort_name, location) VALUES
('Voices of Liberty', 'Epcot', 'Entertainment', 'Live Music', 'A cappella ensemble performing American folk songs under the American Adventure rotunda', '1982', '15 min', true, 'Voices of Liberty', 'American Adventure'),
('Mariachi Cobre', 'Epcot', 'Entertainment', 'Live Music', 'Authentic mariachi band performing daily at the Mexico pavilion since opening day', '1982', '20 min', true, 'Mariachi Cobre', 'Mexico'),
('JAMMitors', 'Epcot', 'Entertainment', 'Live Music', 'Percussion trio turning trash cans into a high-energy drum show', '1997', '15 min', true, 'JAMMitors', 'World Celebration'),
('Matsuriza', 'Epcot', 'Entertainment', 'Live Music', 'Traditional taiko drummers performing at the base of the Japan pavilion pagoda', '1982', '15 min', true, 'Matsuriza', 'Japan'),
('Mickey & Friends at CommuniCore Hall', 'Epcot', 'Characters', 'Character Meet', 'Meet Mickey and pals at the CommuniCore Hall meet-and-greet in World Celebration', '2024', '20 min', true, 'Mickey & Friends at CommuniCore Hall', 'World Celebration');

-- ─── HOLLYWOOD STUDIOS: attractions ─────────────────────────────────
INSERT INTO experiences (name, park, category, type, description, opening_year, duration, is_active, sort_name, location) VALUES
('Mickey & Minnie''s Runaway Railway', 'Hollywood Studios', 'Attractions', 'Dark Ride', 'Trackless dark ride through a zany Mickey Mouse cartoon where anything can happen', '2020', '5 min', true, 'Mickey & Minnie''s Runaway Railway', 'Hollywood Boulevard'),
('Star Tours – The Adventures Continue', 'Hollywood Studios', 'Attractions', 'Simulator', '3D motion simulator flight across the Star Wars galaxy with randomized destinations', '2011', '7 min', true, 'Star Tours – The Adventures Continue', 'Echo Lake'),
('Walt Disney Presents', 'Hollywood Studios', 'Attractions', 'Walkthrough', 'Gallery of Walt Disney''s life and legacy with models, artifacts, and a short film', '2001', '25 min', true, 'Walt Disney Presents', 'Animation Courtyard'),
('Mickey Shorts Theater', 'Hollywood Studios', 'Attractions', 'Film', 'Original Mickey Mouse cartoon short "Vacation Fun" in a whimsical theater', '2020', '15 min', true, 'Mickey Shorts Theater', 'Echo Lake');

-- ─── HOLLYWOOD STUDIOS: dining ──────────────────────────────────────
INSERT INTO experiences (name, park, category, type, description, opening_year, duration, is_active, sort_name, location) VALUES
('Ronto Roasters', 'Hollywood Studios', 'Dining', 'Quick Service', 'Batuu street food stand serving the famous Ronto Wrap under a podracer engine spit', '2019', '10 min', true, 'Ronto Roasters', 'Star Wars: Galaxy''s Edge'),
('Kat Saka''s Kettle', 'Hollywood Studios', 'Dining', 'Snack', 'Sweet-and-spicy Outpost Mix popcorn stand in the Galaxy''s Edge market', '2019', '5 min', true, 'Kat Saka''s Kettle', 'Star Wars: Galaxy''s Edge'),
('Mama Melrose''s Ristorante Italiano', 'Hollywood Studios', 'Dining', 'Table Service', 'California-Italian trattoria with brick-oven flatbreads and pasta', '1991', '60 min', true, 'Mama Melrose''s Ristorante Italiano', 'Grand Avenue'),
('Hollywood & Vine', 'Hollywood Studios', 'Dining', 'Character Dining', 'Buffet with Disney Junior pals at breakfast and Minnie''s seasonal dine at lunch and dinner', '1989', '60 min', true, 'Hollywood & Vine', 'Echo Lake'),
('ABC Commissary', 'Hollywood Studios', 'Dining', 'Quick Service', 'Studio commissary serving burgers, bowls, and international favorites', '1989', '15 min', true, 'ABC Commissary', 'Commissary Lane'),
('Backlot Express', 'Hollywood Studios', 'Dining', 'Quick Service', 'Prop-filled backlot warehouse serving burgers, chicken, and salads', '1989', '15 min', true, 'Backlot Express', 'Echo Lake'),
('BaseLine Tap House', 'Hollywood Studios', 'Dining', 'Bar & Lounge', 'California craft beer and wine pub on Grand Avenue with small bites', '2017', '30 min', true, 'BaseLine Tap House', 'Grand Avenue'),
('Rosie''s All-American Café', 'Hollywood Studios', 'Dining', 'Quick Service', 'Sunset Ranch Market stand with burgers, chicken nuggets, and fries', '1994', '10 min', true, 'Rosie''s All-American Café', 'Sunset Boulevard'),
('Catalina Eddie''s', 'Hollywood Studios', 'Dining', 'Quick Service', 'Sunset Ranch Market pizza and hot Italian sandwiches', '1994', '10 min', true, 'Catalina Eddie''s', 'Sunset Boulevard'),
('Fairfax Fare', 'Hollywood Studios', 'Dining', 'Quick Service', 'Sunset Ranch Market stand serving loaded baked potatoes and hot dogs', '1994', '10 min', true, 'Fairfax Fare', 'Sunset Boulevard'),
('Hollywood Scoops', 'Hollywood Studios', 'Dining', 'Snack', 'Hand-scooped ice cream and sundaes at Sunset Ranch Market', '1994', '5 min', true, 'Hollywood Scoops', 'Sunset Boulevard'),
('Dockside Diner', 'Hollywood Studios', 'Dining', 'Quick Service', 'Waterfront tramp-steamer stand on Echo Lake serving loaded fries and shakes', '1989', '10 min', true, 'Dockside Diner', 'Echo Lake'),
('Tune-In Lounge', 'Hollywood Studios', 'Dining', 'Bar & Lounge', 'Retro TV-land cocktail lounge attached to 50''s Prime Time Café — Dad''s drinks included', '1989', '30 min', true, 'Tune-In Lounge', 'Echo Lake'),
('The Hollywood Brown Derby Lounge', 'Hollywood Studios', 'Dining', 'Bar & Lounge', 'Outdoor lounge with cocktails, small plates, and the famous grapefruit cake', '2010', '30 min', true, 'Hollywood Brown Derby Lounge', 'Hollywood Boulevard');

-- ─── HOLLYWOOD STUDIOS: entertainment & characters ──────────────────
INSERT INTO experiences (name, park, category, type, description, opening_year, duration, is_active, sort_name, location) VALUES
('Beauty and the Beast Live on Stage', 'Hollywood Studios', 'Entertainment', 'Stage Show', 'Broadway-style condensed retelling of Beauty and the Beast at the Theater of the Stars', '1991', '25 min', true, 'Beauty and the Beast Live on Stage', 'Sunset Boulevard'),
('Frozen Sing-Along Celebration', 'Hollywood Studios', 'Entertainment', 'Stage Show', 'Hilarious retelling of Frozen by the royal historians of Arendelle with full audience sing-along', '2014', '30 min', true, 'Frozen Sing-Along Celebration', 'Echo Lake'),
('The Little Mermaid – A Musical Adventure', 'Hollywood Studios', 'Entertainment', 'Stage Show', 'Reimagined stage show bringing Ariel''s story to life with puppetry and projection', '2024', '30 min', true, 'Little Mermaid – A Musical Adventure', 'Animation Courtyard'),
('Wonderful World of Animation', 'Hollywood Studios', 'Entertainment', 'Nighttime Show', 'Nighttime projection show celebrating 90+ years of Disney animation on the Chinese Theatre', '2019', '12 min', true, 'Wonderful World of Animation', 'Hollywood Boulevard'),
('Olaf Meet & Greet — Celebrity Spotlight', 'Hollywood Studios', 'Characters', 'Character Meet', 'Meet Olaf celebrating summer at his own Echo Lake photo spot', '2016', '20 min', true, 'Olaf Meet & Greet — Celebrity Spotlight', 'Echo Lake'),
('Mickey & Minnie Starring in Red Carpet Dreams', 'Hollywood Studios', 'Characters', 'Character Meet', 'Meet Mickey as the Sorcerer''s Apprentice and Minnie in her red-carpet gown', '2016', '20 min', true, 'Mickey & Minnie Starring in Red Carpet Dreams', 'Commissary Lane'),
('Disney Junior Pals — Animation Courtyard', 'Hollywood Studios', 'Characters', 'Character Meet', 'Meet Disney Junior favorites near the Disney Junior theater', '2021', '20 min', true, 'Disney Junior Pals — Animation Courtyard', 'Animation Courtyard');

-- ─── ANIMAL KINGDOM ─────────────────────────────────────────────────
INSERT INTO experiences (name, park, category, type, description, opening_year, duration, is_active, sort_name, location) VALUES
('Wilderness Explorers', 'Animal Kingdom', 'Attractions', 'Interactive Experience', 'Park-wide badge-collecting adventure program inspired by UP — earn up to 25 badges at stations across the park', '2014', 'Self-paced', true, 'Wilderness Explorers', 'Discovery Island'),
('The Boneyard', 'Animal Kingdom', 'Attractions', 'Playground', 'Dig-site playground where kids can excavate fossils, climb, and slide', '1998', 'Self-paced', true, 'Boneyard', 'DinoLand U.S.A.'),
('Nomad Lounge', 'Animal Kingdom', 'Dining', 'Bar & Lounge', 'Serene waterfront lounge attached to Tiffins with globally inspired cocktails and small plates', '2016', '45 min', true, 'Nomad Lounge', 'Discovery Island'),
('Creature Comforts', 'Animal Kingdom', 'Dining', 'Snack', 'Starbucks location on Discovery Island with specialty coffee and pastries', '2015', '5 min', true, 'Creature Comforts', 'Discovery Island'),
('Pizzafari', 'Animal Kingdom', 'Dining', 'Quick Service', 'Colorful animal-mural dining rooms serving pizza, pasta, and salads', '1998', '15 min', true, 'Pizzafari', 'Discovery Island'),
('Yak & Yeti Local Food Cafes', 'Animal Kingdom', 'Dining', 'Quick Service', 'Walk-up window with Asian bowls, honey chicken, and egg rolls next to the table-service restaurant', '2007', '10 min', true, 'Yak & Yeti Local Food Cafes', 'Asia'),
('Tamu Tamu Refreshments', 'Animal Kingdom', 'Dining', 'Snack', 'Harambe snack window famous for Dole Whip — with or without a rum float', '1998', '5 min', true, 'Tamu Tamu Refreshments', 'Africa'),
('Kusafiri Coffee Shop & Bakery', 'Animal Kingdom', 'Dining', 'Snack', 'Harambe bakery with coffee, pastries, and the colossal cinnamon roll', '1998', '5 min', true, 'Kusafiri Coffee Shop & Bakery', 'Africa'),
('Dawa Bar', 'Animal Kingdom', 'Dining', 'Bar & Lounge', 'Open-air Harambe bar with African-inspired cocktails and beer', '1998', '30 min', true, 'Dawa Bar', 'Africa'),
('Tam Tam Drummers of Harambe', 'Animal Kingdom', 'Entertainment', 'Live Music', 'High-energy drum troupe performing in Harambe village square', '1998', '15 min', true, 'Tam Tam Drummers of Harambe', 'Africa'),
('Viva Gaia Street Band', 'Animal Kingdom', 'Entertainment', 'Live Music', 'Caribbean-flavored street band bringing dance parties to Discovery Island', '2016', '15 min', true, 'Viva Gaia Street Band', 'Discovery Island'),
('Mickey & Minnie at Adventurers Outpost', 'Animal Kingdom', 'Characters', 'Character Meet', 'Meet safari-outfitted Mickey and Minnie together at their expedition headquarters', '2013', '20 min', true, 'Mickey & Minnie at Adventurers Outpost', 'Discovery Island'),
('Moana Meet & Greet — Character Landing', 'Animal Kingdom', 'Characters', 'Character Meet', 'Meet Moana at her waterfront spot on Discovery Island', '2019', '20 min', true, 'Moana Meet & Greet — Character Landing', 'Discovery Island'),
('Savor the Savanna', 'Animal Kingdom', 'Events & Tours', 'Tour', 'Private evening safari with regional food and drink at an exclusive savanna overlook', '2016', '2 hours', true, 'Savor the Savanna', 'Africa'),
('Up Close with Rhinos', 'Animal Kingdom', 'Events & Tours', 'Tour', 'Backstage encounter with the park''s white rhinos and their keepers', '2020', '60 min', true, 'Up Close with Rhinos', 'Africa');

-- ─── WATER PARKS ────────────────────────────────────────────────────
INSERT INTO experiences (name, park, category, type, description, opening_year, duration, is_active, sort_name) VALUES
('Miss Adventure Falls', 'Typhoon Lagoon', 'Attractions', 'Family Raft Ride', 'Family raft adventure past treasure-hunting heroine Captain Mary Oceaneer''s shipwrecked finds', '2017', '2 min', true, 'Miss Adventure Falls'),
('Happy Landings Ice Cream', 'Typhoon Lagoon', 'Dining', 'Snack', 'Ice cream stand serving the famous sand pail sundae', '1989', '5 min', true, 'Happy Landings Ice Cream'),
('Snack Shack', 'Typhoon Lagoon', 'Dining', 'Quick Service', 'Poolside stand with sandwiches, snacks, and cold drinks', '1989', '10 min', true, 'Snack Shack'),
('Downhill Double Dipper', 'Blizzard Beach', 'Attractions', 'Racing Slide', 'Side-by-side racing tube slides with speeds up to 25 mph — race a friend to the bottom', '1995', '1 min', true, 'Downhill Double Dipper'),
('Chairlift', 'Blizzard Beach', 'Attractions', 'Transport', 'Scenic ski-resort chairlift ride to the summit of Mount Gushmore', '1995', '5 min', true, 'Chairlift'),
('Ski Patrol Training Camp', 'Blizzard Beach', 'Attractions', 'Kids Area', 'Pre-teen zone with rope drops, slides, and the Thin Ice Training Course', '1995', 'Self-paced', true, 'Ski Patrol Training Camp'),
('Avalunch', 'Blizzard Beach', 'Dining', 'Quick Service', 'Hot dogs, nachos, and snacks near the base of Mount Gushmore', '1995', '10 min', true, 'Avalunch'),
('Cooling Hut', 'Blizzard Beach', 'Dining', 'Snack', 'Grab-and-go snacks, sandwiches, and frozen drinks', '1995', '5 min', true, 'Cooling Hut'),
('Polar Pub', 'Blizzard Beach', 'Dining', 'Bar & Lounge', 'Poolside bar serving frozen cocktails and beer by Melt-Away Bay', '1995', '15 min', true, 'Polar Pub');

-- Likely-misnamed entry: rename to the real I.C. Expeditions
UPDATE experiences SET name = 'I.C. Expeditions', sort_name = 'I.C. Expeditions'
WHERE park = 'Blizzard Beach' AND name = 'Arctic Expeditions';

-- ─── DISNEY SPRINGS ─────────────────────────────────────────────────
INSERT INTO experiences (name, park, category, type, description, opening_year, duration, is_active, sort_name, location) VALUES
('Marketplace Carousel', 'Disney Springs', 'Attractions', 'Carousel', 'Classic carousel ride in the heart of the Marketplace', '1997', '3 min', true, 'Marketplace Carousel', 'Marketplace'),
('Drawn to Life — Cirque du Soleil', 'Disney Springs', 'Entertainment', 'Stage Show', 'Cirque du Soleil and Disney Animation collaboration following an animator''s daughter through living sketches', '2021', '90 min', true, 'Drawn to Life — Cirque du Soleil', 'West Side'),
('Splitsville Luxury Lanes', 'Disney Springs', 'Entertainment', 'Bowling', 'Two-story retro bowling alley with dining and live music', '2012', '90 min', true, 'Splitsville Luxury Lanes', 'West Side'),
('Chef Art Smith''s Homecomin''', 'Disney Springs', 'Dining', 'Table Service', 'Southern comfort food from chef Art Smith — famous fried chicken and moonshine cocktails', '2016', '60 min', true, 'Chef Art Smith''s Homecomin''', 'The Landing'),
('Gideon''s Bakehouse', 'Disney Springs', 'Dining', 'Snack', 'Gothic Victorian bakery famous for nearly half-pound cookies and long lines', '2021', '10 min', true, 'Gideon''s Bakehouse', 'The Landing'),
('Raglan Road Irish Pub', 'Disney Springs', 'Dining', 'Table Service', 'Authentic Irish pub with live music and Irish step dancers nightly', '2005', '90 min', true, 'Raglan Road Irish Pub', 'The Landing'),
('The Edison', 'Disney Springs', 'Dining', 'Table Service', 'Industrial-gothic power plant themed restaurant with craft cocktails and cabaret entertainment', '2018', '90 min', true, 'Edison', 'The Landing'),
('Paddlefish', 'Disney Springs', 'Dining', 'Table Service', 'Seafood restaurant aboard a modern riverboat with rooftop lounge views', '2017', '90 min', true, 'Paddlefish', 'The Landing'),
('Frontera Cocina', 'Disney Springs', 'Dining', 'Table Service', 'Modern Mexican from chef Rick Bayless with hand-crafted margaritas', '2016', '60 min', true, 'Frontera Cocina', 'Town Center'),
('Wolfgang Puck Bar & Grill', 'Disney Springs', 'Dining', 'Table Service', 'California cuisine and wood-fired pizzas from the celebrity chef', '2018', '60 min', true, 'Wolfgang Puck Bar & Grill', 'Town Center'),
('City Works Eatery & Pour House', 'Disney Springs', 'Dining', 'Table Service', 'Sports bar with 80+ beers on tap and elevated pub fare', '2020', '60 min', true, 'City Works Eatery & Pour House', 'Town Center'),
('D-Luxe Burger', 'Disney Springs', 'Dining', 'Quick Service', 'Gourmet burgers, hand-cut fries, and artisanal shakes', '2016', '15 min', true, 'D-Luxe Burger', 'Town Center'),
('The Polite Pig', 'Disney Springs', 'Dining', 'Quick Service', 'Modern barbecue with smoked meats and craft beer from the Cask & Larder team', '2017', '20 min', true, 'Polite Pig', 'Town Center'),
('Earl of Sandwich', 'Disney Springs', 'Dining', 'Quick Service', 'Hot sandwiches from the family that invented them — the Holiday Turkey is a legend', '2004', '15 min', true, 'Earl of Sandwich', 'Marketplace'),
('Ghirardelli Soda Fountain', 'Disney Springs', 'Dining', 'Snack', 'San Francisco chocolatier serving legendary hot fudge sundaes', '1997', '15 min', true, 'Ghirardelli Soda Fountain', 'Marketplace'),
('Amorette''s Patisserie', 'Disney Springs', 'Dining', 'Snack', 'High-end pastry shop with signature dome cakes and champagne', '2016', '10 min', true, 'Amorette''s Patisserie', 'Town Center'),
('Salt & Straw', 'Disney Springs', 'Dining', 'Snack', 'Portland-born scoop shop with inventive small-batch ice cream flavors', '2019', '10 min', true, 'Salt & Straw', 'West Side'),
('Summer House on the Lake', 'Disney Springs', 'Dining', 'Table Service', 'Bright California-style lakefront dining with an in-house cookie bar', '2023', '60 min', true, 'Summer House on the Lake', 'Town Center'),
('Everglazed Donuts & Cold Brew', 'Disney Springs', 'Dining', 'Snack', 'Over-the-top donuts and loaded cold brews', '2021', '10 min', true, 'Everglazed Donuts & Cold Brew', 'West Side');

-- ─── RESORTS ────────────────────────────────────────────────────────
INSERT INTO experiences (name, park, category, type, description, opening_year, duration, is_active, sort_name, location) VALUES
('Chef Mickey''s', 'Resorts', 'Dining', 'Character Dining', 'Legendary character buffet with Mickey and pals as the monorail glides overhead', '1995', '90 min', true, 'Chef Mickey''s', 'Contemporary Resort'),
('Topolino''s Terrace', 'Resorts', 'Dining', 'Character Dining', 'Rooftop signature dining with character breakfast and fireworks views at dinner', '2019', '90 min', true, 'Topolino''s Terrace', 'Riviera Resort'),
('Sanaa', 'Resorts', 'Dining', 'Table Service', 'African-Indian cuisine with savanna views — bread service is a must', '2009', '60 min', true, 'Sanaa', 'Animal Kingdom Lodge — Kidani'),
('Beaches & Cream Soda Shop', 'Resorts', 'Dining', 'Table Service', 'Retro soda fountain home of the giant Kitchen Sink sundae', '1990', '45 min', true, 'Beaches & Cream Soda Shop', 'Beach Club Resort'),
('Whispering Canyon Café', 'Resorts', 'Dining', 'Table Service', 'Rowdy western-style dining with all-you-can-eat skillets and ketchup antics', '1994', '60 min', true, 'Whispering Canyon Café', 'Wilderness Lodge'),
('Geyser Point Bar & Grill', 'Resorts', 'Dining', 'Bar & Lounge', 'Open-air waterfront lounge with bison burgers and craft brews', '2017', '45 min', true, 'Geyser Point Bar & Grill', 'Wilderness Lodge'),
('Kona Café', 'Resorts', 'Dining', 'Table Service', 'Pacific-inspired dining famous for Tonga Toast at breakfast', '1998', '60 min', true, 'Kona Café', 'Polynesian Resort'),
('Steakhouse 71', 'Resorts', 'Dining', 'Table Service', 'Retro-inspired steakhouse honoring the resort''s 1971 opening', '2021', '90 min', true, 'Steakhouse 71', 'Contemporary Resort'),
('Citricos', 'Resorts', 'Dining', 'Signature Dining', 'Mary Poppins Returns-inspired signature dining with Mediterranean flavors', '1997', '90 min', true, 'Citricos', 'Grand Floridian'),
('Enchanted Rose', 'Resorts', 'Dining', 'Bar & Lounge', 'Beauty and the Beast-inspired lounge with elegant cocktails', '2019', '45 min', true, 'Enchanted Rose', 'Grand Floridian'),
('Sebastian''s Bistro', 'Resorts', 'Dining', 'Table Service', 'Caribbean-Latin waterfront dining with a Little Mermaid touch', '2018', '60 min', true, 'Sebastian''s Bistro', 'Caribbean Beach Resort'),
('Toledo — Tapas, Steak & Seafood', 'Resorts', 'Dining', 'Table Service', 'Rooftop Spanish-inspired dining atop Gran Destino Tower', '2019', '90 min', true, 'Toledo — Tapas, Steak & Seafood', 'Coronado Springs'),
('Hoop-Dee-Doo Musical Revue', 'Resorts', 'Entertainment', 'Dinner Show', 'Disney''s longest-running dinner show — vaudeville comedy with fried chicken and ribs since 1974', '1974', '2 hours', true, 'Hoop-Dee-Doo Musical Revue', 'Fort Wilderness'),
('Movies Under the Stars', 'Resorts', 'Entertainment', 'Outdoor Movie', 'Nightly outdoor Disney movie screenings at resorts across property', '1997', '2 hours', true, 'Movies Under the Stars', 'Various Resorts');
