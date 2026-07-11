-- ============================================================
-- Epcot — Characters, Events & Tours, Dining  FULL REPLACE (2026-07)
-- Run in the Supabase SQL Editor. All three sections run in one
-- transaction, so it's all-or-nothing.
--
-- WARNING: each section deletes the current Epcot rows for that
-- category and re-creates the list fresh, clearing tracked progress
-- (and any old descriptions) for those items.
--
-- Column order:
--   (name, park, category, type, description, opening_year,
--    duration, is_active, sort_name, location)
-- `description` is left NULL — type + location (pavilion) are set.
-- Category value for Events is 'Events & Tours'.
-- ============================================================

BEGIN;

-- ============================================================
-- CHARACTERS
-- ============================================================
DELETE FROM experiences WHERE park = 'Epcot' AND category = 'Characters';

INSERT INTO experiences (name, park, category, type, description, opening_year, duration, is_active, sort_name, location) VALUES
('Meet a Friend from the Hundred Acre Wood in the United Kingdom', 'Epcot', 'Characters', 'Character Meet', NULL, NULL, NULL, true, 'Meet a Friend from the Hundred Acre Wood in the United Kingdom', 'United Kingdom'),
('Meet Alice in the United Kingdom', 'Epcot', 'Characters', 'Character Meet', NULL, NULL, NULL, true, 'Meet Alice in the United Kingdom', 'United Kingdom'),
('Meet Anna and Elsa at Royal Sommerhus', 'Epcot', 'Characters', 'Character Meet', NULL, NULL, NULL, true, 'Meet Anna and Elsa at Royal Sommerhus', 'Norway'),
('Meet Asha Near World Showcase Plaza', 'Epcot', 'Characters', 'Character Meet', NULL, NULL, NULL, true, 'Meet Asha Near World Showcase Plaza', 'World Showcase'),
('Meet Belle in France', 'Epcot', 'Characters', 'Character Meet', NULL, NULL, NULL, true, 'Meet Belle in France', 'France'),
('Meet Beloved Disney Pals at Mickey & Friends', 'Epcot', 'Characters', 'Character Meet', NULL, NULL, NULL, true, 'Meet Beloved Disney Pals at Mickey & Friends', 'World Celebration'),
('Meet Donald Duck in Mexico', 'Epcot', 'Characters', 'Character Meet', NULL, NULL, NULL, true, 'Meet Donald Duck in Mexico', 'Mexico'),
('Meet Figment Inside ImageWorks', 'Epcot', 'Characters', 'Character Meet', NULL, NULL, NULL, true, 'Meet Figment Inside ImageWorks', 'World Nature'),
('Meet Mulan in China', 'Epcot', 'Characters', 'Character Meet', NULL, NULL, NULL, true, 'Meet Mulan in China', 'China'),
('Meet Pluto Near EPCOT Main Entrance', 'Epcot', 'Characters', 'Character Meet', NULL, NULL, NULL, true, 'Meet Pluto Near EPCOT Main Entrance', 'World Celebration'),
('Meet Princess Aurora in France', 'Epcot', 'Characters', 'Character Meet', NULL, NULL, NULL, true, 'Meet Princess Aurora in France', 'France'),
('Meet Princess Jasmine in Morocco', 'Epcot', 'Characters', 'Character Meet', NULL, NULL, NULL, true, 'Meet Princess Jasmine in Morocco', 'Morocco'),
('Meet Snow White in Germany', 'Epcot', 'Characters', 'Character Meet', NULL, NULL, NULL, true, 'Meet Snow White in Germany', 'Germany'),
('Meet Star-Lord near Guardians of the Galaxy: Cosmic Rewind', 'Epcot', 'Characters', 'Character Meet', NULL, NULL, NULL, true, 'Meet Star-Lord near Guardians of the Galaxy: Cosmic Rewind', 'World Discovery');


-- ============================================================
-- EVENTS & TOURS
-- ============================================================
DELETE FROM experiences WHERE park = 'Epcot' AND category = 'Events & Tours';

INSERT INTO experiences (name, park, category, type, description, opening_year, duration, is_active, sort_name, location) VALUES
('Behind the Seeds', 'Epcot', 'Events & Tours', 'Tour', NULL, NULL, NULL, true, 'Behind the Seeds', 'World Nature'),
('Behind the Seeds: Glimmering Greenhouses', 'Epcot', 'Events & Tours', 'Tour', NULL, NULL, NULL, true, 'Behind the Seeds: Glimmering Greenhouses', 'World Nature'),
('Disney After Hours at EPCOT', 'Epcot', 'Events & Tours', 'Event', NULL, NULL, NULL, true, 'Disney After Hours at EPCOT', NULL),
('Festival of the Arts', 'Epcot', 'Events & Tours', 'Festival', NULL, NULL, NULL, true, 'Festival of the Arts', NULL),
('Festival of the Holidays presented by AdventHealth', 'Epcot', 'Events & Tours', 'Festival', NULL, NULL, NULL, true, 'Festival of the Holidays presented by AdventHealth', NULL),
('Flower & Garden Festival', 'Epcot', 'Events & Tours', 'Festival', NULL, NULL, NULL, true, 'Flower & Garden Festival', NULL),
('Food & Wine Festival', 'Epcot', 'Events & Tours', 'Festival', NULL, NULL, NULL, true, 'Food & Wine Festival', NULL),
('Seas Adventures - DiveQuest', 'Epcot', 'Events & Tours', 'Tour', NULL, NULL, NULL, true, 'Seas Adventures - DiveQuest', 'World Nature');


-- ============================================================
-- DINING
-- ============================================================
DELETE FROM experiences WHERE park = 'Epcot' AND category = 'Dining';

INSERT INTO experiences (name, park, category, type, description, opening_year, duration, is_active, sort_name, location) VALUES
('Akershus Royal Banquet Hall', 'Epcot', 'Dining', 'Character Dining', NULL, NULL, NULL, true, 'Akershus Royal Banquet Hall', 'Norway'),
('Biergarten Restaurant', 'Epcot', 'Dining', 'Buffet', NULL, NULL, NULL, true, 'Biergarten Restaurant', 'Germany'),
('Block & Hans', 'Epcot', 'Dining', 'Snack', NULL, NULL, NULL, true, 'Block & Hans', 'The American Adventure'),
('Canada Popcorn Cart', 'Epcot', 'Dining', 'Snack', NULL, NULL, NULL, true, 'Canada Popcorn Cart', 'Canada'),
('Chefs de France', 'Epcot', 'Dining', 'Table Service', NULL, NULL, NULL, true, 'Chefs de France', 'France'),
('Choza de Margarita', 'Epcot', 'Dining', 'Bar & Lounge', NULL, NULL, NULL, true, 'Choza de Margarita', 'Mexico'),
('Connections Café', 'Epcot', 'Dining', 'Quick Service', NULL, NULL, NULL, true, 'Connections Café', 'World Celebration'),
('Connections Eatery', 'Epcot', 'Dining', 'Quick Service', NULL, NULL, NULL, true, 'Connections Eatery', 'World Celebration'),
('Coral Reef Restaurant', 'Epcot', 'Dining', 'Table Service', NULL, NULL, NULL, true, 'Coral Reef Restaurant', 'World Nature'),
('Crêpes À Emporter by La Crêperie de Paris', 'Epcot', 'Dining', 'Snack', NULL, NULL, NULL, true, 'Crêpes À Emporter by La Crêperie de Paris', 'France'),
('EPCOT International Festival of the Arts - DISNEY ON BROADWAY Concert Series Dining Packages', 'Epcot', 'Dining', 'Dining Package', NULL, NULL, NULL, true, 'EPCOT International Festival of the Arts - DISNEY ON BROADWAY Concert Series Dining Packages', NULL),
('EPCOT International Festival of the Holidays – Candlelight Processional Dining Package', 'Epcot', 'Dining', 'Dining Package', NULL, NULL, NULL, true, 'EPCOT International Festival of the Holidays – Candlelight Processional Dining Package', NULL),
('EPCOT International Flower & Garden Festival – Garden Rocks Dining Packages', 'Epcot', 'Dining', 'Dining Package', NULL, NULL, NULL, true, 'EPCOT International Flower & Garden Festival – Garden Rocks Dining Packages', NULL),
('EPCOT International Food & Wine Festival Concert Series Dining Packages', 'Epcot', 'Dining', 'Dining Package', NULL, NULL, NULL, true, 'EPCOT International Food & Wine Festival Concert Series Dining Packages', NULL),
('Fife & Drum Tavern', 'Epcot', 'Dining', 'Snack', NULL, NULL, NULL, true, 'Fife & Drum Tavern', 'The American Adventure'),
('Funnel Cake', 'Epcot', 'Dining', 'Snack', NULL, NULL, NULL, true, 'Funnel Cake', 'The American Adventure'),
('Garden Grill Restaurant', 'Epcot', 'Dining', 'Character Dining', NULL, NULL, NULL, true, 'Garden Grill Restaurant', 'World Nature'),
('Gelateria Toscana', 'Epcot', 'Dining', 'Snack', NULL, NULL, NULL, true, 'Gelateria Toscana', 'Italy'),
('GEO-82', 'Epcot', 'Dining', 'Bar & Lounge', NULL, NULL, NULL, true, 'GEO-82', 'World Celebration'),
('GEO-82 Fireworks Experience', 'Epcot', 'Dining', 'Bar & Lounge', NULL, NULL, NULL, true, 'GEO-82 Fireworks Experience', 'World Celebration'),
('Grab-N-Goof', 'Epcot', 'Dining', 'Quick Service', NULL, NULL, NULL, true, 'Grab-N-Goof', 'World Celebration'),
('Joy of Tea', 'Epcot', 'Dining', 'Snack', NULL, NULL, NULL, true, 'Joy of Tea', 'China'),
('Kabuki Cafe', 'Epcot', 'Dining', 'Snack', NULL, NULL, NULL, true, 'Kabuki Cafe', 'Japan'),
('Katsura Grill', 'Epcot', 'Dining', 'Quick Service', NULL, NULL, NULL, true, 'Katsura Grill', 'Japan'),
('Kringla Bakeri Og Kafé', 'Epcot', 'Dining', 'Quick Service', NULL, NULL, NULL, true, 'Kringla Bakeri Og Kafé', 'Norway'),
('La Cantina de San Angel', 'Epcot', 'Dining', 'Quick Service', NULL, NULL, NULL, true, 'La Cantina de San Angel', 'Mexico'),
('La Cava del Tequila', 'Epcot', 'Dining', 'Bar & Lounge', NULL, NULL, NULL, true, 'La Cava del Tequila', 'Mexico'),
('La Cava Experience', 'Epcot', 'Dining', 'Bar & Lounge', NULL, NULL, NULL, true, 'La Cava Experience', 'Mexico'),
('La Crêperie de Paris', 'Epcot', 'Dining', 'Table Service', NULL, NULL, NULL, true, 'La Crêperie de Paris', 'France'),
('La Hacienda de San Angel', 'Epcot', 'Dining', 'Table Service', NULL, NULL, NULL, true, 'La Hacienda de San Angel', 'Mexico'),
('La Poutinerie', 'Epcot', 'Dining', 'Snack', NULL, NULL, NULL, true, 'La Poutinerie', 'Canada'),
('The Land Cart', 'Epcot', 'Dining', 'Snack', NULL, NULL, NULL, true, 'The Land Cart', 'World Nature'),
('L''Artisan des Glaces', 'Epcot', 'Dining', 'Snack', NULL, NULL, NULL, true, 'L''Artisan des Glaces', 'France'),
('Le Cellier Steakhouse', 'Epcot', 'Dining', 'Signature Dining', NULL, NULL, NULL, true, 'Le Cellier Steakhouse', 'Canada'),
('Les Halles Boulangerie-Patisserie', 'Epcot', 'Dining', 'Quick Service', NULL, NULL, NULL, true, 'Les Halles Boulangerie-Patisserie', 'France'),
('Les Vins des Chefs de France', 'Epcot', 'Dining', 'Bar & Lounge', NULL, NULL, NULL, true, 'Les Vins des Chefs de France', 'France'),
('Lotus Blossom Café', 'Epcot', 'Dining', 'Quick Service', NULL, NULL, NULL, true, 'Lotus Blossom Café', 'China'),
('Monsieur Paul', 'Epcot', 'Dining', 'Signature Dining', NULL, NULL, NULL, true, 'Monsieur Paul', 'France'),
('Nine Dragons Restaurant', 'Epcot', 'Dining', 'Table Service', NULL, NULL, NULL, true, 'Nine Dragons Restaurant', 'China'),
('Oasis Sweets & Sips', 'Epcot', 'Dining', 'Snack', NULL, NULL, NULL, true, 'Oasis Sweets & Sips', 'Morocco'),
('The Odyssey', 'Epcot', 'Dining', 'Quick Service', NULL, NULL, NULL, true, 'The Odyssey', 'World Showcase'),
('Parisian Breakfast at Chefs de France', 'Epcot', 'Dining', 'Table Service', NULL, NULL, NULL, true, 'Parisian Breakfast at Chefs de France', 'France'),
('Pizza al Taglio', 'Epcot', 'Dining', 'Snack', NULL, NULL, NULL, true, 'Pizza al Taglio', 'Italy'),
('Refreshment Outpost', 'Epcot', 'Dining', 'Snack', NULL, NULL, NULL, true, 'Refreshment Outpost', 'World Showcase'),
('Refreshment Station', 'Epcot', 'Dining', 'Snack', NULL, NULL, NULL, true, 'Refreshment Station', 'World Showcase'),
('Regal Eagle Smokehouse: Craft Drafts & Barbecue', 'Epcot', 'Dining', 'Quick Service', NULL, NULL, NULL, true, 'Regal Eagle Smokehouse: Craft Drafts & Barbecue', 'The American Adventure'),
('Rose & Crown Dining Room', 'Epcot', 'Dining', 'Table Service', NULL, NULL, NULL, true, 'Rose & Crown Dining Room', 'United Kingdom'),
('Rose & Crown Fireworks Dining Package', 'Epcot', 'Dining', 'Dining Package', NULL, NULL, NULL, true, 'Rose & Crown Fireworks Dining Package', 'United Kingdom'),
('Rose & Crown Pub', 'Epcot', 'Dining', 'Bar & Lounge', NULL, NULL, NULL, true, 'Rose & Crown Pub', 'United Kingdom'),
('San Angel Inn Restaurante', 'Epcot', 'Dining', 'Table Service', NULL, NULL, NULL, true, 'San Angel Inn Restaurante', 'Mexico'),
('Shiki-Sai: Sushi Izakaya', 'Epcot', 'Dining', 'Table Service', NULL, NULL, NULL, true, 'Shiki-Sai: Sushi Izakaya', 'Japan'),
('Sommerfest', 'Epcot', 'Dining', 'Quick Service', NULL, NULL, NULL, true, 'Sommerfest', 'Germany'),
('Space 220 Lounge', 'Epcot', 'Dining', 'Bar & Lounge', NULL, NULL, NULL, true, 'Space 220 Lounge', 'World Discovery'),
('Space 220 Restaurant', 'Epcot', 'Dining', 'Signature Dining', NULL, NULL, NULL, true, 'Space 220 Restaurant', 'World Discovery'),
('Spice Road Table', 'Epcot', 'Dining', 'Table Service', NULL, NULL, NULL, true, 'Spice Road Table', 'Morocco'),
('Spice Road Table Bar', 'Epcot', 'Dining', 'Bar & Lounge', NULL, NULL, NULL, true, 'Spice Road Table Bar', 'Morocco'),
('Spice Road Table Fireworks Dining Package', 'Epcot', 'Dining', 'Dining Package', NULL, NULL, NULL, true, 'Spice Road Table Fireworks Dining Package', 'Morocco'),
('Sunshine Seasons', 'Epcot', 'Dining', 'Quick Service', NULL, NULL, NULL, true, 'Sunshine Seasons', 'World Nature'),
('Takumi-Tei', 'Epcot', 'Dining', 'Signature Dining', NULL, NULL, NULL, true, 'Takumi-Tei', 'Japan'),
('Tangierine Café: Flavors of the Medina', 'Epcot', 'Dining', 'Quick Service', NULL, NULL, NULL, true, 'Tangierine Café: Flavors of the Medina', 'Morocco'),
('Teppan Edo', 'Epcot', 'Dining', 'Table Service', NULL, NULL, NULL, true, 'Teppan Edo', 'Japan'),
('Tutto Gusto Wine Cellar', 'Epcot', 'Dining', 'Bar & Lounge', NULL, NULL, NULL, true, 'Tutto Gusto Wine Cellar', 'Italy'),
('Tutto Italia Ristorante', 'Epcot', 'Dining', 'Table Service', NULL, NULL, NULL, true, 'Tutto Italia Ristorante', 'Italy'),
('UK Beer Cart', 'Epcot', 'Dining', 'Snack', NULL, NULL, NULL, true, 'UK Beer Cart', 'United Kingdom'),
('Via Napoli Ristorante e Pizzeria', 'Epcot', 'Dining', 'Table Service', NULL, NULL, NULL, true, 'Via Napoli Ristorante e Pizzeria', 'Italy'),
('Yorkshire County Fish Shop', 'Epcot', 'Dining', 'Quick Service', NULL, NULL, NULL, true, 'Yorkshire County Fish Shop', 'United Kingdom');

COMMIT;

-- ------------------------------------------------------------
-- VERIFY per category:
-- ------------------------------------------------------------
-- SELECT category, name, type, location FROM experiences
--   WHERE park = 'Epcot' AND category IN ('Characters','Events & Tours','Dining')
--   ORDER BY category, sort_name;
