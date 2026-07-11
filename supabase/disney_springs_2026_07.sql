-- ============================================================
-- Disney Springs — Attractions, Entertainment, Dining,
-- Events & Tours  FULL REPLACE (2026-07)
-- Run in the Supabase SQL Editor. One transaction: all-or-nothing.
--
-- WARNING: each section deletes the current Disney Springs rows for
-- that category and re-creates the list fresh, clearing tracked
-- progress for those items.
--
-- `location` = neighborhood (Marketplace / The Landing / Town Center
-- / West Side) where known; NULL where it roams or is uncertain.
-- Column order:
--   (name, park, category, type, description, opening_year,
--    duration, is_active, sort_name, location)
-- ============================================================

BEGIN;

-- ============================================================
-- ATTRACTIONS
-- ============================================================
DELETE FROM experiences WHERE park = 'Disney Springs' AND category = 'Attractions';

INSERT INTO experiences (name, park, category, type, description, opening_year, duration, is_active, sort_name, location) VALUES
('Aerophile – The World Leader in Balloon Flight', 'Disney Springs', 'Attractions', 'Family Ride', 'Tethered helium balloon rising 400 feet for panoramic views.', NULL, NULL, true, 'Aerophile – The World Leader in Balloon Flight', 'West Side'),
('Coca-Cola Polar Bear Photo Op Experience', 'Disney Springs', 'Attractions', 'Interactive Experience', 'Photo opportunity with the Coca-Cola polar bear.', NULL, NULL, true, 'Coca-Cola Polar Bear Photo Op Experience', 'Town Center'),
('Disney Springs Art Walk: A Canvas of Expression', 'Disney Springs', 'Attractions', 'Walkthrough', 'Self-guided walk past art installations around Disney Springs.', NULL, NULL, true, 'Disney Springs Art Walk: A Canvas of Expression', NULL),
('LEVEL99', 'Disney Springs', 'Attractions', 'Interactive Experience', 'Team-based physical and mental challenge rooms.', NULL, NULL, true, 'LEVEL99', 'West Side'),
('Marketplace Carousel', 'Disney Springs', 'Attractions', 'Carousel', 'Classic carousel in the Marketplace.', NULL, NULL, true, 'Marketplace Carousel', 'Marketplace'),
('Marketplace Train Express', 'Disney Springs', 'Attractions', 'Family Ride', 'Miniature train ride for kids in the Marketplace.', NULL, NULL, true, 'Marketplace Train Express', 'Marketplace'),
('Marketplace Fun Fountains', 'Disney Springs', 'Attractions', 'Interactive Experience', 'Interactive splash fountains in the Marketplace.', NULL, NULL, true, 'Marketplace Fun Fountains', 'Marketplace'),
('Splitsville Luxury Lanes™', 'Disney Springs', 'Attractions', 'Recreation', 'Upscale bowling alley with dining and games.', NULL, NULL, true, 'Splitsville Luxury Lanes™', 'West Side'),
('Vintage Amphicar Tours', 'Disney Springs', 'Attractions', 'Boat Ride', 'Guided lagoon tour in a classic amphibious car.', NULL, NULL, true, 'Vintage Amphicar Tours', 'The Landing');


-- ============================================================
-- ENTERTAINMENT
-- ============================================================
DELETE FROM experiences WHERE park = 'Disney Springs' AND category = 'Entertainment';

INSERT INTO experiences (name, park, category, type, description, opening_year, duration, is_active, sort_name, location) VALUES
('AdventHealth Waterside Stage Live Entertainment', 'Disney Springs', 'Entertainment', 'Live Music', 'Live musical acts on the Marketplace Waterside Stage.', NULL, NULL, true, 'AdventHealth Waterside Stage Live Entertainment', 'Marketplace'),
('AMC® Disney Springs 24 Dine-In Theatres', 'Disney Springs', 'Entertainment', 'Film', '24-screen movie theater with dine-in options.', NULL, NULL, true, 'AMC® Disney Springs 24 Dine-In Theatres', 'West Side'),
('Disney Springs Kids Club Presented by Coppertone®', 'Disney Springs', 'Entertainment', 'Street Entertainment', 'Interactive play activities for children.', NULL, NULL, true, 'Disney Springs Kids Club Presented by Coppertone®', NULL),
('Dockside Margaritas Live Entertainment', 'Disney Springs', 'Entertainment', 'Live Music', 'Live music at the Dockside Margaritas bar.', NULL, NULL, true, 'Dockside Margaritas Live Entertainment', 'The Landing'),
('Drawn to Life Presented by Cirque du Soleil & Disney', 'Disney Springs', 'Entertainment', 'Stage Show', 'Cirque du Soleil show blending acrobatics with Disney animation.', NULL, NULL, true, 'Drawn to Life Presented by Cirque du Soleil & Disney', 'West Side'),
('Exposition Park Live Entertainment', 'Disney Springs', 'Entertainment', 'Live Music', 'Live performances at Exposition Park in Town Center.', NULL, NULL, true, 'Exposition Park Live Entertainment', 'Town Center'),
('House of Blues', 'Disney Springs', 'Entertainment', 'Live Music', 'Live music venue hosting concerts and events.', NULL, NULL, true, 'House of Blues', 'West Side'),
('Orange Stage Live Entertainment', 'Disney Springs', 'Entertainment', 'Live Music', 'Live performances on the Orange Stage.', NULL, NULL, true, 'Orange Stage Live Entertainment', 'Town Center'),
('Waterview Park Live Entertainment', 'Disney Springs', 'Entertainment', 'Live Music', 'Live entertainment at Waterview Park.', NULL, NULL, true, 'Waterview Park Live Entertainment', 'The Landing');


-- ============================================================
-- DINING
-- ============================================================
DELETE FROM experiences WHERE park = 'Disney Springs' AND category = 'Dining';

INSERT INTO experiences (name, park, category, type, description, opening_year, duration, is_active, sort_name, location) VALUES
('Jaleo® by José Andrés', 'Disney Springs', 'Dining', 'Signature Dining', 'Spanish tapas and paella from chef José Andrés.', NULL, NULL, true, 'Jaleo® by José Andrés', 'West Side'),
('AMC® Disney Springs 24 Dine-In Theatres', 'Disney Springs', 'Dining', 'Table Service', 'In-theater dining with a full menu at your seat.', NULL, NULL, true, 'AMC® Disney Springs 24 Dine-In Theatres', 'West Side'),
('Amorette''s Patisserie', 'Disney Springs', 'Dining', 'Snack', 'Elegant French-style cakes and pastries.', NULL, NULL, true, 'Amorette''s Patisserie', 'Town Center'),
('B.B. Wolf''s Sausage Co.', 'Disney Springs', 'Dining', 'Quick Service', 'Gourmet hot dogs and sausages.', NULL, NULL, true, 'B.B. Wolf''s Sausage Co.', 'Marketplace'),
('The Basket at Wine Bar George', 'Disney Springs', 'Dining', 'Snack', 'Walk-up window for wine and picnic bites.', NULL, NULL, true, 'The Basket at Wine Bar George', 'Town Center'),
('Blaze Fast-Fire''d Pizza', 'Disney Springs', 'Dining', 'Quick Service', 'Build-your-own fast-fired pizzas.', NULL, NULL, true, 'Blaze Fast-Fire''d Pizza', 'Town Center'),
('The BOATHOUSE®: Great Food, Waterfront Dining, Dream Boats™', 'Disney Springs', 'Dining', 'Signature Dining', 'Waterfront steaks and seafood with vintage dream-boat rides.', NULL, NULL, true, 'The BOATHOUSE®: Great Food, Waterfront Dining, Dream Boats™', 'The Landing'),
('Chef Art Smith''s Homecomin''', 'Disney Springs', 'Dining', 'Table Service', 'Southern comfort food and fried chicken.', NULL, NULL, true, 'Chef Art Smith''s Homecomin''', 'The Landing'),
('Chicken Guy!', 'Disney Springs', 'Dining', 'Quick Service', 'Fried chicken tenders with signature sauces.', NULL, NULL, true, 'Chicken Guy!', 'The Landing'),
('City Works Eatery & Pour House', 'Disney Springs', 'Dining', 'Table Service', 'American gastropub with dozens of beers on tap.', NULL, NULL, true, 'City Works Eatery & Pour House', 'Town Center'),
('Coca-Cola® Store Rooftop Beverage Bar', 'Disney Springs', 'Dining', 'Bar & Lounge', 'Rooftop bar with global Coca-Cola beverages.', NULL, NULL, true, 'Coca-Cola® Store Rooftop Beverage Bar', 'Town Center'),
('Cookes of Dublin', 'Disney Springs', 'Dining', 'Quick Service', 'Irish fish and chips and fried treats.', NULL, NULL, true, 'Cookes of Dublin', 'The Landing'),
('D-Luxe Burger', 'Disney Springs', 'Dining', 'Quick Service', 'Handcrafted burgers and gelato shakes.', NULL, NULL, true, 'D-Luxe Burger', 'Town Center'),
('The Daily Poutine', 'Disney Springs', 'Dining', 'Snack', 'Loaded poutine in global varieties.', NULL, NULL, true, 'The Daily Poutine', 'Town Center'),
('Dockside Margaritas', 'Disney Springs', 'Dining', 'Bar & Lounge', 'Lakeside bar for margaritas and Mexican snacks.', NULL, NULL, true, 'Dockside Margaritas', 'The Landing'),
('EARL OF SANDWICH®', 'Disney Springs', 'Dining', 'Quick Service', 'Hot-pressed artisan sandwiches.', NULL, NULL, true, 'EARL OF SANDWICH®', 'Marketplace'),
('The Edison', 'Disney Springs', 'Dining', 'Table Service', '1920s-themed restaurant and lounge with entertainment.', NULL, NULL, true, 'The Edison', 'The Landing'),
('eet by Maneet Chauhan', 'Disney Springs', 'Dining', 'Table Service', 'Modern Indian street food from chef Maneet Chauhan.', NULL, NULL, true, 'eet by Maneet Chauhan', 'West Side'),
('Enzo''s Hideaway', 'Disney Springs', 'Dining', 'Table Service', 'Roman trattoria and rum bar in a hidden tunnel.', NULL, NULL, true, 'Enzo''s Hideaway', 'The Landing'),
('Erin McKenna''s Bakery NYC', 'Disney Springs', 'Dining', 'Snack', 'Vegan and gluten-free baked goods.', NULL, NULL, true, 'Erin McKenna''s Bakery NYC', 'Marketplace'),
('Everglazed™ Donuts & Cold Brew', 'Disney Springs', 'Dining', 'Snack', 'Handcrafted donuts and cold brew coffee.', NULL, NULL, true, 'Everglazed™ Donuts & Cold Brew', 'Town Center'),
('The Front Porch at House of Blues', 'Disney Springs', 'Dining', 'Bar & Lounge', 'Outdoor bar beside House of Blues.', NULL, NULL, true, 'The Front Porch at House of Blues', 'West Side'),
('Frontera Cocina', 'Disney Springs', 'Dining', 'Table Service', 'Contemporary Mexican from chef Rick Bayless.', NULL, NULL, true, 'Frontera Cocina', 'Town Center'),
('The Ganachery', 'Disney Springs', 'Dining', 'Snack', 'House-made chocolate ganache squares and treats.', NULL, NULL, true, 'The Ganachery', 'The Landing'),
('Ghirardelli® Soda Fountain & Chocolate Shop', 'Disney Springs', 'Dining', 'Snack', 'Classic sundaes and chocolate treats.', NULL, NULL, true, 'Ghirardelli® Soda Fountain & Chocolate Shop', 'Marketplace'),
('Gideon''s Bakehouse', 'Disney Springs', 'Dining', 'Snack', 'Oversized cookies and cakes in a gothic setting.', NULL, NULL, true, 'Gideon''s Bakehouse', 'The Landing'),
('Häagen-Dazs®', 'Disney Springs', 'Dining', 'Snack', 'Ice cream, shakes, and sundaes.', NULL, NULL, true, 'Häagen-Dazs®', 'Marketplace'),
('House of Blues® Restaurant & Bar', 'Disney Springs', 'Dining', 'Table Service', 'Southern cuisine with live music.', NULL, NULL, true, 'House of Blues® Restaurant & Bar', 'West Side'),
('Jock Lindsey''s Hangar Bar', 'Disney Springs', 'Dining', 'Bar & Lounge', 'Indiana Jones-themed bar with adventurous cocktails.', NULL, NULL, true, 'Jock Lindsey''s Hangar Bar', 'The Landing'),
('Joffrey''s Coffee & Tea Company® at The Landing at Disney Springs', 'Disney Springs', 'Dining', 'Snack', 'Specialty coffee and espresso.', NULL, NULL, true, 'Joffrey''s Coffee & Tea Company® at The Landing at Disney Springs', 'The Landing'),
('Joffrey''s™ Handcrafted Smoothies at Disney Springs Marketplace', 'Disney Springs', 'Dining', 'Snack', 'Fresh fruit smoothies.', NULL, NULL, true, 'Joffrey''s™ Handcrafted Smoothies at Disney Springs Marketplace', 'Marketplace'),
('Lava Lounge at Rainforest Café®', 'Disney Springs', 'Dining', 'Bar & Lounge', 'Tropical cocktails beside the Rainforest Cafe.', NULL, NULL, true, 'Lava Lounge at Rainforest Café®', 'Marketplace'),
('Learn How to Taste Wine with Master Sommelier George Miliotes', 'Disney Springs', 'Dining', 'Bar & Lounge', 'Guided wine tasting with a master sommelier.', NULL, NULL, true, 'Learn How to Taste Wine with Master Sommelier George Miliotes', 'Town Center'),
('Level99', 'Disney Springs', 'Dining', 'Bar & Lounge', 'Food and craft drinks alongside the challenge rooms.', NULL, NULL, true, 'Level99', 'West Side'),
('MacGUFFINS', 'Disney Springs', 'Dining', 'Bar & Lounge', 'AMC lobby bar for cocktails and snacks.', NULL, NULL, true, 'MacGUFFINS', 'West Side'),
('Maria & Enzo''s Ristorante', 'Disney Springs', 'Dining', 'Table Service', 'Italian dining in a grand 1930s airport hangar.', NULL, NULL, true, 'Maria & Enzo''s Ristorante', 'The Landing'),
('Marketplace Snacks', 'Disney Springs', 'Dining', 'Snack', 'Grab-and-go snacks in the Marketplace.', NULL, NULL, true, 'Marketplace Snacks', 'Marketplace'),
('Morimoto Asia™', 'Disney Springs', 'Dining', 'Signature Dining', 'Pan-Asian cuisine from chef Masaharu Morimoto.', NULL, NULL, true, 'Morimoto Asia™', 'The Landing'),
('Morimoto Asia™ Street Food', 'Disney Springs', 'Dining', 'Quick Service', 'Quick-service Asian street food and drinks.', NULL, NULL, true, 'Morimoto Asia™ Street Food', 'The Landing'),
('Paddlefish', 'Disney Springs', 'Dining', 'Signature Dining', 'Seafood served aboard a permanently-docked riverboat.', NULL, NULL, true, 'Paddlefish', 'The Landing'),
('Paradiso 37, Taste of the Americas', 'Disney Springs', 'Dining', 'Table Service', 'Dishes from North, Central, and South America.', NULL, NULL, true, 'Paradiso 37, Taste of the Americas', 'The Landing'),
('Pepe by José Andrés', 'Disney Springs', 'Dining', 'Quick Service', 'Spanish sandwiches and small plates.', NULL, NULL, true, 'Pepe by José Andrés', 'West Side'),
('Pizza Ponte', 'Disney Springs', 'Dining', 'Quick Service', 'Roman-style pizza and Italian pastries.', NULL, NULL, true, 'Pizza Ponte', 'The Landing'),
('Planet Hollywood®', 'Disney Springs', 'Dining', 'Table Service', 'Movie-themed American restaurant.', NULL, NULL, true, 'Planet Hollywood®', 'Town Center'),
('The Polite Pig', 'Disney Springs', 'Dining', 'Quick Service', 'Craft barbecue with a bourbon bar.', NULL, NULL, true, 'The Polite Pig', 'Town Center'),
('Raglan Road™ Irish Pub and Restaurant', 'Disney Springs', 'Dining', 'Table Service', 'Authentic Irish pub with live music and dancing.', NULL, NULL, true, 'Raglan Road™ Irish Pub and Restaurant', 'The Landing'),
('Rainforest Cafe® at Disney Springs Marketplace', 'Disney Springs', 'Dining', 'Table Service', 'Jungle-themed restaurant with animatronic wildlife.', NULL, NULL, true, 'Rainforest Cafe® at Disney Springs Marketplace', 'Marketplace'),
('Salt & Straw', 'Disney Springs', 'Dining', 'Snack', 'Small-batch artisan ice cream.', NULL, NULL, true, 'Salt & Straw', 'West Side'),
('Six Ravens', 'Disney Springs', 'Dining', 'Bar & Lounge', 'Cocktail lounge with small plates.', NULL, NULL, true, 'Six Ravens', NULL),
('The Smokehouse at House of Blues®', 'Disney Springs', 'Dining', 'Quick Service', 'Barbecue and craft beer to go.', NULL, NULL, true, 'The Smokehouse at House of Blues®', 'West Side'),
('Splitsville Dining Room', 'Disney Springs', 'Dining', 'Table Service', 'Full-service dining inside the bowling venue.', NULL, NULL, true, 'Splitsville Dining Room', 'West Side'),
('STARBUCKS® at Disney Springs Marketplace', 'Disney Springs', 'Dining', 'Snack', 'Coffee, espresso, and pastries.', NULL, NULL, true, 'STARBUCKS® at Disney Springs Marketplace', 'Marketplace'),
('STARBUCKS® at Disney Springs West Side', 'Disney Springs', 'Dining', 'Snack', 'Coffee, espresso, and pastries.', NULL, NULL, true, 'STARBUCKS® at Disney Springs West Side', 'West Side'),
('Stargazers Bar', 'Disney Springs', 'Dining', 'Bar & Lounge', 'Cocktail bar near Drawn to Life.', NULL, NULL, true, 'Stargazers Bar', 'West Side'),
('STK® Steakhouse', 'Disney Springs', 'Dining', 'Signature Dining', 'Modern steakhouse with a lively lounge vibe.', NULL, NULL, true, 'STK® Steakhouse', 'The Landing'),
('Summer House on the Lake', 'Disney Springs', 'Dining', 'Table Service', 'California-inspired dishes in a bright, beachy setting.', NULL, NULL, true, 'Summer House on the Lake', 'Town Center'),
('Sunshine Churros at Disney Springs Marketplace', 'Disney Springs', 'Dining', 'Snack', 'Fresh churros and dipping sauces.', NULL, NULL, true, 'Sunshine Churros at Disney Springs Marketplace', 'Marketplace'),
('Sunshine Churros at Disney Springs West Side', 'Disney Springs', 'Dining', 'Snack', 'Fresh churros and dipping sauces.', NULL, NULL, true, 'Sunshine Churros at Disney Springs West Side', 'West Side'),
('Swirls on the Water', 'Disney Springs', 'Dining', 'Snack', 'Frozen cocktails and soft serve by the water.', NULL, NULL, true, 'Swirls on the Water', 'The Landing'),
('T-REX™', 'Disney Springs', 'Dining', 'Table Service', 'Prehistoric-themed restaurant with animatronic dinosaurs.', NULL, NULL, true, 'T-REX™', 'Marketplace'),
('Terralina Crafted Italian', 'Disney Springs', 'Dining', 'Table Service', 'Lakeside Italian with wood-fired dishes.', NULL, NULL, true, 'Terralina Crafted Italian', 'The Landing'),
('Vivoli il Gelato', 'Disney Springs', 'Dining', 'Snack', 'Authentic Florentine gelato.', NULL, NULL, true, 'Vivoli il Gelato', 'The Landing'),
('Wetzel''s Pretzels Kiosk at Disney Springs Marketplace', 'Disney Springs', 'Dining', 'Snack', 'Fresh-baked soft pretzels.', NULL, NULL, true, 'Wetzel''s Pretzels Kiosk at Disney Springs Marketplace', 'Marketplace'),
('Wetzel''s Pretzels Kiosk at Disney Springs West Side', 'Disney Springs', 'Dining', 'Snack', 'Fresh-baked soft pretzels.', NULL, NULL, true, 'Wetzel''s Pretzels Kiosk at Disney Springs West Side', 'West Side'),
('Wine Bar George – A Restaurant & Bar', 'Disney Springs', 'Dining', 'Table Service', 'Wines by the glass and bottle with shareable plates.', NULL, NULL, true, 'Wine Bar George – A Restaurant & Bar', 'Town Center'),
('Wolfgang Puck® Bar & Grill', 'Disney Springs', 'Dining', 'Table Service', 'Chef Wolfgang Puck classics in a modern setting.', NULL, NULL, true, 'Wolfgang Puck® Bar & Grill', 'Town Center'),
('YeSake Kiosk', 'Disney Springs', 'Dining', 'Snack', 'Asian-inspired wraps and sake.', NULL, NULL, true, 'YeSake Kiosk', 'West Side');


-- ============================================================
-- EVENTS & TOURS
-- ============================================================
DELETE FROM experiences WHERE park = 'Disney Springs' AND category = 'Events & Tours';

INSERT INTO experiences (name, park, category, type, description, opening_year, duration, is_active, sort_name, location) VALUES
('Amorette''s Patisserie Cake Decorating Experience', 'Disney Springs', 'Events & Tours', 'Event', 'Hands-on cake-decorating class at Amorette''s Patisserie.', NULL, NULL, true, 'Amorette''s Patisserie Cake Decorating Experience', 'Town Center'),
('Holidays at Disney Springs', 'Disney Springs', 'Events & Tours', 'Festival', 'Seasonal holiday decor, tree stroll, and festive entertainment.', NULL, NULL, true, 'Holidays at Disney Springs', NULL);

COMMIT;

-- ------------------------------------------------------------
-- VERIFY per category:
-- ------------------------------------------------------------
-- SELECT category, name, type, location FROM experiences
--   WHERE park = 'Disney Springs'
--   ORDER BY category, sort_name;
