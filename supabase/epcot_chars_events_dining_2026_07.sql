-- ============================================================
-- Epcot — Characters, Events & Tours, Dining  FULL REPLACE (2026-07)
-- Run in the Supabase SQL Editor. All three sections run in one
-- transaction, so it's all-or-nothing.
--
-- WARNING: each section deletes the current Epcot rows for that
-- category and re-creates the list fresh, clearing tracked progress
-- for those items.
--
-- Column order:
--   (name, park, category, type, description, opening_year,
--    duration, is_active, sort_name, location)
-- Category value for Events is 'Events & Tours'.
-- ============================================================

BEGIN;

-- ============================================================
-- CHARACTERS
-- ============================================================
DELETE FROM experiences WHERE park = 'Epcot' AND category = 'Characters';

INSERT INTO experiences (name, park, category, type, description, opening_year, duration, is_active, sort_name, location) VALUES
('Meet a Friend from the Hundred Acre Wood in the United Kingdom', 'Epcot', 'Characters', 'Character Meet', 'Meet Winnie the Pooh or a friend from the Hundred Acre Wood beside the UK pavilion.', NULL, NULL, true, 'Meet a Friend from the Hundred Acre Wood in the United Kingdom', 'United Kingdom'),
('Meet Alice in the United Kingdom', 'Epcot', 'Characters', 'Character Meet', 'Meet Alice from Alice in Wonderland in the United Kingdom pavilion garden.', NULL, NULL, true, 'Meet Alice in the United Kingdom', 'United Kingdom'),
('Meet Anna and Elsa at Royal Sommerhus', 'Epcot', 'Characters', 'Character Meet', 'Meet Anna and Elsa inside the cozy Royal Sommerhus lodge in Norway.', NULL, NULL, true, 'Meet Anna and Elsa at Royal Sommerhus', 'Norway'),
('Meet Asha Near World Showcase Plaza', 'Epcot', 'Characters', 'Character Meet', 'Meet Asha from Wish near World Showcase Plaza.', NULL, NULL, true, 'Meet Asha Near World Showcase Plaza', 'World Showcase'),
('Meet Belle in France', 'Epcot', 'Characters', 'Character Meet', 'Meet Belle from Beauty and the Beast in the France pavilion.', NULL, NULL, true, 'Meet Belle in France', 'France'),
('Meet Beloved Disney Pals at Mickey & Friends', 'Epcot', 'Characters', 'Character Meet', 'Meet Mickey and beloved pals at the Mickey & Friends meet-and-greet.', NULL, NULL, true, 'Meet Beloved Disney Pals at Mickey & Friends', 'World Celebration'),
('Meet Donald Duck in Mexico', 'Epcot', 'Characters', 'Character Meet', 'Meet Donald Duck near the Mexico pavilion pyramid.', NULL, NULL, true, 'Meet Donald Duck in Mexico', 'Mexico'),
('Meet Figment Inside ImageWorks', 'Epcot', 'Characters', 'Character Meet', 'Meet Figment the dragon inside the ImageWorks play space.', NULL, NULL, true, 'Meet Figment Inside ImageWorks', 'World Nature'),
('Meet Mulan in China', 'Epcot', 'Characters', 'Character Meet', 'Meet Mulan in the China pavilion.', NULL, NULL, true, 'Meet Mulan in China', 'China'),
('Meet Pluto Near EPCOT Main Entrance', 'Epcot', 'Characters', 'Character Meet', 'Meet Pluto near the main entrance of EPCOT.', NULL, NULL, true, 'Meet Pluto Near EPCOT Main Entrance', 'World Celebration'),
('Meet Princess Aurora in France', 'Epcot', 'Characters', 'Character Meet', 'Meet Princess Aurora from Sleeping Beauty in the France pavilion.', NULL, NULL, true, 'Meet Princess Aurora in France', 'France'),
('Meet Princess Jasmine in Morocco', 'Epcot', 'Characters', 'Character Meet', 'Meet Princess Jasmine from Aladdin in the Morocco pavilion.', NULL, NULL, true, 'Meet Princess Jasmine in Morocco', 'Morocco'),
('Meet Snow White in Germany', 'Epcot', 'Characters', 'Character Meet', 'Meet Snow White in the Germany pavilion.', NULL, NULL, true, 'Meet Snow White in Germany', 'Germany'),
('Meet Star-Lord near Guardians of the Galaxy: Cosmic Rewind', 'Epcot', 'Characters', 'Character Meet', 'Meet Star-Lord from the Guardians of the Galaxy near Cosmic Rewind.', NULL, NULL, true, 'Meet Star-Lord near Guardians of the Galaxy: Cosmic Rewind', 'World Discovery');


-- ============================================================
-- EVENTS & TOURS
-- ============================================================
DELETE FROM experiences WHERE park = 'Epcot' AND category = 'Events & Tours';

INSERT INTO experiences (name, park, category, type, description, opening_year, duration, is_active, sort_name, location) VALUES
('Behind the Seeds', 'Epcot', 'Events & Tours', 'Tour', 'Walking tour behind the scenes of the Living with the Land greenhouses and fish farm.', NULL, NULL, true, 'Behind the Seeds', 'World Nature'),
('Behind the Seeds: Glimmering Greenhouses', 'Epcot', 'Events & Tours', 'Tour', 'After-hours version of the greenhouse tour with special lighting effects.', NULL, NULL, true, 'Behind the Seeds: Glimmering Greenhouses', 'World Nature'),
('Disney After Hours at EPCOT', 'Epcot', 'Events & Tours', 'Event', 'Separately-ticketed late-night event with low crowds and short waits.', NULL, NULL, true, 'Disney After Hours at EPCOT', NULL),
('Festival of the Arts', 'Epcot', 'Events & Tours', 'Festival', 'Annual celebration of visual, culinary, and performing arts across the park.', NULL, NULL, true, 'Festival of the Arts', NULL),
('Festival of the Holidays presented by AdventHealth', 'Epcot', 'Events & Tours', 'Festival', 'Holiday festival with global traditions, a cookie stroll, and the Candlelight Processional.', NULL, NULL, true, 'Festival of the Holidays presented by AdventHealth', NULL),
('Flower & Garden Festival', 'Epcot', 'Events & Tours', 'Festival', 'Springtime festival of topiaries, gardens, and outdoor kitchens.', NULL, NULL, true, 'Flower & Garden Festival', NULL),
('Food & Wine Festival', 'Epcot', 'Events & Tours', 'Festival', 'Global food-and-drink festival with tasting marketplaces around World Showcase.', NULL, NULL, true, 'Food & Wine Festival', NULL),
('Seas Adventures - DiveQuest', 'Epcot', 'Events & Tours', 'Tour', 'Guided scuba dive in the SeaBase aquarium (certification required).', NULL, NULL, true, 'Seas Adventures - DiveQuest', 'World Nature');


-- ============================================================
-- DINING
-- ============================================================
DELETE FROM experiences WHERE park = 'Epcot' AND category = 'Dining';

INSERT INTO experiences (name, park, category, type, description, opening_year, duration, is_active, sort_name, location) VALUES
('Akershus Royal Banquet Hall', 'Epcot', 'Dining', 'Character Dining', 'Norwegian character dining with visiting Disney princesses in a castle hall.', NULL, NULL, true, 'Akershus Royal Banquet Hall', 'Norway'),
('Biergarten Restaurant', 'Epcot', 'Dining', 'Buffet', 'German buffet with a live oompah band and communal seating.', NULL, NULL, true, 'Biergarten Restaurant', 'Germany'),
('Block & Hans', 'Epcot', 'Dining', 'Snack', 'American Adventure kiosk pouring craft beer and wine.', NULL, NULL, true, 'Block & Hans', 'The American Adventure'),
('Canada Popcorn Cart', 'Epcot', 'Dining', 'Snack', 'Popcorn and snacks outside the Canada pavilion.', NULL, NULL, true, 'Canada Popcorn Cart', 'Canada'),
('Chefs de France', 'Epcot', 'Dining', 'Table Service', 'Classic French table service from celebrated chefs.', NULL, NULL, true, 'Chefs de France', 'France'),
('Choza de Margarita', 'Epcot', 'Dining', 'Bar & Lounge', 'Mexican margaritas and street-food snacks.', NULL, NULL, true, 'Choza de Margarita', 'Mexico'),
('Connections Café', 'Epcot', 'Dining', 'Quick Service', 'Starbucks coffee and pastries in World Celebration.', NULL, NULL, true, 'Connections Café', 'World Celebration'),
('Connections Eatery', 'Epcot', 'Dining', 'Quick Service', 'Global quick-service comfort food in World Celebration.', NULL, NULL, true, 'Connections Eatery', 'World Celebration'),
('Coral Reef Restaurant', 'Epcot', 'Dining', 'Table Service', 'Seafood table service beside the SeaBase aquarium window.', NULL, NULL, true, 'Coral Reef Restaurant', 'World Nature'),
('Crêpes À Emporter by La Crêperie de Paris', 'Epcot', 'Dining', 'Snack', 'Walk-up window for sweet crêpes and Parisian treats.', NULL, NULL, true, 'Crêpes À Emporter by La Crêperie de Paris', 'France'),
('EPCOT International Festival of the Arts - DISNEY ON BROADWAY Concert Series Dining Packages', 'Epcot', 'Dining', 'Dining Package', 'Dining package with reserved seating for the Disney on Broadway Concert Series.', NULL, NULL, true, 'EPCOT International Festival of the Arts - DISNEY ON BROADWAY Concert Series Dining Packages', NULL),
('EPCOT International Festival of the Holidays – Candlelight Processional Dining Package', 'Epcot', 'Dining', 'Dining Package', 'Dining package with reserved seating for the Candlelight Processional.', NULL, NULL, true, 'EPCOT International Festival of the Holidays – Candlelight Processional Dining Package', NULL),
('EPCOT International Flower & Garden Festival – Garden Rocks Dining Packages', 'Epcot', 'Dining', 'Dining Package', 'Dining package with reserved seating for the Garden Rocks Concert Series.', NULL, NULL, true, 'EPCOT International Flower & Garden Festival – Garden Rocks Dining Packages', NULL),
('EPCOT International Food & Wine Festival Concert Series Dining Packages', 'Epcot', 'Dining', 'Dining Package', 'Dining package with reserved seating for the Eat to the Beat Concert Series.', NULL, NULL, true, 'EPCOT International Food & Wine Festival Concert Series Dining Packages', NULL),
('Fife & Drum Tavern', 'Epcot', 'Dining', 'Snack', 'American Adventure stand for turkey legs, popcorn, and frozen drinks.', NULL, NULL, true, 'Fife & Drum Tavern', 'The American Adventure'),
('Funnel Cake', 'Epcot', 'Dining', 'Snack', 'Fresh funnel cakes near the American Adventure.', NULL, NULL, true, 'Funnel Cake', 'The American Adventure'),
('Garden Grill Restaurant', 'Epcot', 'Dining', 'Character Dining', 'Rotating character dining with family-style farm-fresh fare above Living with the Land.', NULL, NULL, true, 'Garden Grill Restaurant', 'World Nature'),
('Gelateria Toscana', 'Epcot', 'Dining', 'Snack', 'Italian gelato and espresso in the Italy pavilion.', NULL, NULL, true, 'Gelateria Toscana', 'Italy'),
('GEO-82', 'Epcot', 'Dining', 'Bar & Lounge', 'Lounge with cocktails and small plates near Spaceship Earth.', NULL, NULL, true, 'GEO-82', 'World Celebration'),
('GEO-82 Fireworks Experience', 'Epcot', 'Dining', 'Bar & Lounge', 'Fireworks-viewing lounge experience with drinks and bites.', NULL, NULL, true, 'GEO-82 Fireworks Experience', 'World Celebration'),
('Grab-N-Goof', 'Epcot', 'Dining', 'Quick Service', 'Quick grab-and-go snacks and treats in World Celebration.', NULL, NULL, true, 'Grab-N-Goof', 'World Celebration'),
('Joy of Tea', 'Epcot', 'Dining', 'Snack', 'Chinese teas, specialty drinks, and quick bites.', NULL, NULL, true, 'Joy of Tea', 'China'),
('Kabuki Cafe', 'Epcot', 'Dining', 'Snack', 'Japanese snacks, sushi, and kakigori shaved ice.', NULL, NULL, true, 'Kabuki Cafe', 'Japan'),
('Katsura Grill', 'Epcot', 'Dining', 'Quick Service', 'Japanese quick service with teriyaki, ramen, and sushi.', NULL, NULL, true, 'Katsura Grill', 'Japan'),
('Kringla Bakeri Og Kafé', 'Epcot', 'Dining', 'Quick Service', 'Norwegian bakery with pastries, sandwiches, and school bread.', NULL, NULL, true, 'Kringla Bakeri Og Kafé', 'Norway'),
('La Cantina de San Angel', 'Epcot', 'Dining', 'Quick Service', 'Mexican quick service with tacos and nachos by the lagoon.', NULL, NULL, true, 'La Cantina de San Angel', 'Mexico'),
('La Cava del Tequila', 'Epcot', 'Dining', 'Bar & Lounge', 'Tequila bar with over 200 tequilas and famous avocado margaritas.', NULL, NULL, true, 'La Cava del Tequila', 'Mexico'),
('La Cava Experience', 'Epcot', 'Dining', 'Bar & Lounge', 'Guided tequila tasting inside the Mexico pavilion.', NULL, NULL, true, 'La Cava Experience', 'Mexico'),
('La Crêperie de Paris', 'Epcot', 'Dining', 'Table Service', 'Table service for savory galettes and sweet crêpes.', NULL, NULL, true, 'La Crêperie de Paris', 'France'),
('La Hacienda de San Angel', 'Epcot', 'Dining', 'Table Service', 'Lagoon-side Mexican table service with fireworks views.', NULL, NULL, true, 'La Hacienda de San Angel', 'Mexico'),
('La Poutinerie', 'Epcot', 'Dining', 'Snack', 'Canadian poutine window with loaded fries.', NULL, NULL, true, 'La Poutinerie', 'Canada'),
('The Land Cart', 'Epcot', 'Dining', 'Snack', 'Snacks and drinks outside The Land pavilion.', NULL, NULL, true, 'The Land Cart', 'World Nature'),
('L''Artisan des Glaces', 'Epcot', 'Dining', 'Snack', 'Artisan French ice cream and sorbet.', NULL, NULL, true, 'L''Artisan des Glaces', 'France'),
('Le Cellier Steakhouse', 'Epcot', 'Dining', 'Signature Dining', 'Canadian signature steakhouse in a wine-cellar setting.', NULL, NULL, true, 'Le Cellier Steakhouse', 'Canada'),
('Les Halles Boulangerie-Patisserie', 'Epcot', 'Dining', 'Quick Service', 'French bakery with sandwiches, quiche, and pastries.', NULL, NULL, true, 'Les Halles Boulangerie-Patisserie', 'France'),
('Les Vins des Chefs de France', 'Epcot', 'Dining', 'Bar & Lounge', 'French wine kiosk in the France pavilion.', NULL, NULL, true, 'Les Vins des Chefs de France', 'France'),
('Lotus Blossom Café', 'Epcot', 'Dining', 'Quick Service', 'Chinese quick service with orange chicken and noodle bowls.', NULL, NULL, true, 'Lotus Blossom Café', 'China'),
('Monsieur Paul', 'Epcot', 'Dining', 'Signature Dining', 'Upscale French signature dining above Chefs de France.', NULL, NULL, true, 'Monsieur Paul', 'France'),
('Nine Dragons Restaurant', 'Epcot', 'Dining', 'Table Service', 'Table service with dishes from across China.', NULL, NULL, true, 'Nine Dragons Restaurant', 'China'),
('Oasis Sweets & Sips', 'Epcot', 'Dining', 'Snack', 'Moroccan pastries, snacks, and specialty drinks.', NULL, NULL, true, 'Oasis Sweets & Sips', 'Morocco'),
('The Odyssey', 'Epcot', 'Dining', 'Quick Service', 'Festival pavilion offering seasonal food and beverages.', NULL, NULL, true, 'The Odyssey', 'World Showcase'),
('Parisian Breakfast at Chefs de France', 'Epcot', 'Dining', 'Table Service', 'Morning pastries and breakfast service at Chefs de France.', NULL, NULL, true, 'Parisian Breakfast at Chefs de France', 'France'),
('Pizza al Taglio', 'Epcot', 'Dining', 'Snack', 'Roman-style pizza by the slice in Italy.', NULL, NULL, true, 'Pizza al Taglio', 'Italy'),
('Refreshment Outpost', 'Epcot', 'Dining', 'Snack', 'Snacks and drinks between Germany and China.', NULL, NULL, true, 'Refreshment Outpost', 'World Showcase'),
('Refreshment Station', 'Epcot', 'Dining', 'Snack', 'Snacks and cold drinks along World Showcase.', NULL, NULL, true, 'Refreshment Station', 'World Showcase'),
('Regal Eagle Smokehouse: Craft Drafts & Barbecue', 'Epcot', 'Dining', 'Quick Service', 'Regional American barbecue and craft beer hosted by the Muppets'' Sam Eagle.', NULL, NULL, true, 'Regal Eagle Smokehouse: Craft Drafts & Barbecue', 'The American Adventure'),
('Rose & Crown Dining Room', 'Epcot', 'Dining', 'Table Service', 'British pub table service with fish and chips and lagoon views.', NULL, NULL, true, 'Rose & Crown Dining Room', 'United Kingdom'),
('Rose & Crown Fireworks Dining Package', 'Epcot', 'Dining', 'Dining Package', 'Dining package with reserved fireworks viewing at Rose & Crown.', NULL, NULL, true, 'Rose & Crown Fireworks Dining Package', 'United Kingdom'),
('Rose & Crown Pub', 'Epcot', 'Dining', 'Bar & Lounge', 'Traditional British pub for pints and pub snacks.', NULL, NULL, true, 'Rose & Crown Pub', 'United Kingdom'),
('San Angel Inn Restaurante', 'Epcot', 'Dining', 'Table Service', 'Mexican table service inside the pyramid overlooking the boat ride.', NULL, NULL, true, 'San Angel Inn Restaurante', 'Mexico'),
('Shiki-Sai: Sushi Izakaya', 'Epcot', 'Dining', 'Table Service', 'Japanese izakaya with sushi and small plates.', NULL, NULL, true, 'Shiki-Sai: Sushi Izakaya', 'Japan'),
('Sommerfest', 'Epcot', 'Dining', 'Quick Service', 'German quick service for bratwurst, pretzels, and beer.', NULL, NULL, true, 'Sommerfest', 'Germany'),
('Space 220 Lounge', 'Epcot', 'Dining', 'Bar & Lounge', 'Space-themed lounge with cocktails and small plates 220 miles up.', NULL, NULL, true, 'Space 220 Lounge', 'World Discovery'),
('Space 220 Restaurant', 'Epcot', 'Dining', 'Signature Dining', 'Space-themed signature dining with panoramic views of Earth.', NULL, NULL, true, 'Space 220 Restaurant', 'World Discovery'),
('Spice Road Table', 'Epcot', 'Dining', 'Table Service', 'Mediterranean small plates with lagoon-side seating in Morocco.', NULL, NULL, true, 'Spice Road Table', 'Morocco'),
('Spice Road Table Bar', 'Epcot', 'Dining', 'Bar & Lounge', 'Moroccan bar for wine, sangria, and small plates.', NULL, NULL, true, 'Spice Road Table Bar', 'Morocco'),
('Spice Road Table Fireworks Dining Package', 'Epcot', 'Dining', 'Dining Package', 'Dining package with reserved fireworks viewing at Spice Road Table.', NULL, NULL, true, 'Spice Road Table Fireworks Dining Package', 'Morocco'),
('Sunshine Seasons', 'Epcot', 'Dining', 'Quick Service', 'Food-court quick service with global stations in The Land.', NULL, NULL, true, 'Sunshine Seasons', 'World Nature'),
('Takumi-Tei', 'Epcot', 'Dining', 'Signature Dining', 'Intimate Japanese signature dining celebrating Japan''s natural elements.', NULL, NULL, true, 'Takumi-Tei', 'Japan'),
('Tangierine Café: Flavors of the Medina', 'Epcot', 'Dining', 'Quick Service', 'Moroccan quick service with shawarma and Mediterranean plates.', NULL, NULL, true, 'Tangierine Café: Flavors of the Medina', 'Morocco'),
('Teppan Edo', 'Epcot', 'Dining', 'Table Service', 'Japanese teppanyaki grilled tableside by skilled chefs.', NULL, NULL, true, 'Teppan Edo', 'Japan'),
('Tutto Gusto Wine Cellar', 'Epcot', 'Dining', 'Bar & Lounge', 'Italian wine cellar lounge with small plates and cheeses.', NULL, NULL, true, 'Tutto Gusto Wine Cellar', 'Italy'),
('Tutto Italia Ristorante', 'Epcot', 'Dining', 'Table Service', 'Classic Italian table service with pasta and regional dishes.', NULL, NULL, true, 'Tutto Italia Ristorante', 'Italy'),
('UK Beer Cart', 'Epcot', 'Dining', 'Snack', 'Cart pouring British and imported beers.', NULL, NULL, true, 'UK Beer Cart', 'United Kingdom'),
('Via Napoli Ristorante e Pizzeria', 'Epcot', 'Dining', 'Table Service', 'Naples-style wood-fired pizza and Italian fare.', NULL, NULL, true, 'Via Napoli Ristorante e Pizzeria', 'Italy'),
('Yorkshire County Fish Shop', 'Epcot', 'Dining', 'Quick Service', 'Walk-up window for classic British fish and chips.', NULL, NULL, true, 'Yorkshire County Fish Shop', 'United Kingdom');

COMMIT;

-- ------------------------------------------------------------
-- VERIFY per category:
-- ------------------------------------------------------------
-- SELECT category, name, type, location FROM experiences
--   WHERE park = 'Epcot' AND category IN ('Characters','Events & Tours','Dining')
--   ORDER BY category, sort_name;
