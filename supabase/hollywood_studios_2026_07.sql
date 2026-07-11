-- ============================================================
-- Hollywood Studios — Attractions, Entertainment, Dining,
-- Characters, Events & Tours  FULL REPLACE (2026-07)
-- Run in the Supabase SQL Editor. One transaction: all-or-nothing.
--
-- WARNING: each section deletes the current Hollywood Studios rows
-- for that category and re-creates the list fresh, clearing tracked
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
DELETE FROM experiences WHERE park = 'Hollywood Studios' AND category = 'Attractions';

INSERT INTO experiences (name, park, category, type, description, opening_year, duration, is_active, sort_name, location) VALUES
('Alien Swirling Saucers', 'Hollywood Studios', 'Attractions', 'Family Ride', 'Toy-rocket spinner where little green aliens whirl you around in Toy Story Land.', NULL, NULL, true, 'Alien Swirling Saucers', 'Toy Story Land'),
('Mickey & Minnie''s Runaway Railway', 'Hollywood Studios', 'Attractions', 'Dark Ride', 'Trackless dark ride tumbling into the wacky world of a Mickey Mouse cartoon.', NULL, NULL, true, 'Mickey & Minnie''s Runaway Railway', 'Hollywood Boulevard'),
('Millennium Falcon: Smugglers Run', 'Hollywood Studios', 'Attractions', 'Simulator', 'Pilot, gun, or engineer the Millennium Falcon on a smuggling mission.', NULL, NULL, true, 'Millennium Falcon: Smugglers Run', 'Star Wars: Galaxy''s Edge'),
('Rock ''n'' Roller Coaster Starring The Muppets', 'Hollywood Studios', 'Attractions', 'Thrill Ride', 'High-speed indoor coaster launching into a Muppets-themed adventure.', NULL, NULL, true, 'Rock ''n'' Roller Coaster Starring The Muppets', 'Sunset Boulevard'),
('Slinky Dog Dash', 'Hollywood Studios', 'Attractions', 'Thrill Ride', 'Family coaster zipping through Andy''s backyard on Slinky Dog.', NULL, NULL, true, 'Slinky Dog Dash', 'Toy Story Land'),
('Star Tours – The Adventures Continue', 'Hollywood Studios', 'Attractions', 'Simulator', '3D motion-simulator flight to destinations across the Star Wars galaxy.', NULL, NULL, true, 'Star Tours – The Adventures Continue', 'Echo Lake'),
('Star Wars: Rise of the Resistance', 'Hollywood Studios', 'Attractions', 'Dark Ride', 'Epic trackless ride putting you in the middle of a battle with the First Order.', NULL, NULL, true, 'Star Wars: Rise of the Resistance', 'Star Wars: Galaxy''s Edge'),
('Toy Story Mania!', 'Hollywood Studios', 'Attractions', 'Dark Ride', '4D interactive shooting game through classic carnival midways.', NULL, NULL, true, 'Toy Story Mania!', 'Toy Story Land'),
('The Twilight Zone™ Tower of Terror', 'Hollywood Studios', 'Attractions', 'Thrill Ride', 'Haunted-elevator free-fall drop ride in the Hollywood Tower Hotel.', NULL, NULL, true, 'The Twilight Zone™ Tower of Terror', 'Sunset Boulevard'),
('Vacation Fun - An Original Animated Short with Mickey & Minnie', 'Hollywood Studios', 'Attractions', 'Film', 'Animated Mickey and Minnie shorts screened in a theater setting.', NULL, NULL, true, 'Vacation Fun - An Original Animated Short with Mickey & Minnie', 'Animation Courtyard'),
('Walt Disney Presents', 'Hollywood Studios', 'Attractions', 'Walkthrough', 'Walk-through gallery of Disney history with models, artifacts, and a film.', NULL, NULL, true, 'Walt Disney Presents', 'Animation Courtyard');


-- ============================================================
-- ENTERTAINMENT
-- ============================================================
DELETE FROM experiences WHERE park = 'Hollywood Studios' AND category = 'Entertainment';

INSERT INTO experiences (name, park, category, type, description, opening_year, duration, is_active, sort_name, location) VALUES
('Beauty and the Beast – Live on Stage', 'Hollywood Studios', 'Entertainment', 'Stage Show', 'Broadway-style live musical retelling of Beauty and the Beast.', NULL, NULL, true, 'Beauty and the Beast – Live on Stage', 'Sunset Boulevard'),
('Disney Jr. Mickey Mouse Clubhouse Live!', 'Hollywood Studios', 'Entertainment', 'Stage Show', 'Interactive live show for young kids with Disney Junior favorites.', NULL, NULL, true, 'Disney Jr. Mickey Mouse Clubhouse Live!', 'Animation Courtyard'),
('Disney Movie Magic', 'Hollywood Studios', 'Entertainment', 'Nighttime Show', 'Nighttime projection show celebrating iconic Disney movie moments.', NULL, NULL, true, 'Disney Movie Magic', 'Hollywood Boulevard'),
('Disney Villains: Unfairly Ever After', 'Hollywood Studios', 'Entertainment', 'Stage Show', 'Stage show spotlighting the greatest Disney villains.', NULL, NULL, true, 'Disney Villains: Unfairly Ever After', 'Sunset Boulevard'),
('Encounter Darth Vader', 'Hollywood Studios', 'Entertainment', 'Character Meet', 'Come face to face with Darth Vader in a character encounter.', NULL, NULL, true, 'Encounter Darth Vader', 'Animation Courtyard'),
('Fantasmic!', 'Hollywood Studios', 'Entertainment', 'Nighttime Show', 'Nighttime spectacular of water, fire, and Disney magic in the amphitheater.', NULL, NULL, true, 'Fantasmic!', 'Sunset Boulevard'),
('First Order Searches for the Resistance', 'Hollywood Studios', 'Entertainment', 'Street Entertainment', 'Stormtroopers patrol and search the streets of Galaxy''s Edge.', NULL, NULL, true, 'First Order Searches for the Resistance', 'Star Wars: Galaxy''s Edge'),
('For the First Time in Forever: A Frozen Sing-Along Celebration', 'Hollywood Studios', 'Entertainment', 'Stage Show', 'Comedic sing-along celebration with the royal sisters of Arendelle.', NULL, NULL, true, 'For the First Time in Forever: A Frozen Sing-Along Celebration', 'Echo Lake'),
('Green Army Drum Corps', 'Hollywood Studios', 'Entertainment', 'Street Entertainment', 'Toy soldiers march and drum through Toy Story Land.', NULL, NULL, true, 'Green Army Drum Corps', 'Toy Story Land'),
('Hollygroove Swingin''', 'Hollywood Studios', 'Entertainment', 'Live Music', 'Swing-era street band performing along Hollywood Boulevard.', NULL, NULL, true, 'Hollygroove Swingin''', 'Hollywood Boulevard'),
('Indiana Jones™ Epic Stunt Spectacular!', 'Hollywood Studios', 'Entertainment', 'Stage Show', 'Live stunt show recreating scenes from Raiders of the Lost Ark.', NULL, NULL, true, 'Indiana Jones™ Epic Stunt Spectacular!', 'Echo Lake'),
('The Little Mermaid – A Musical Adventure', 'Hollywood Studios', 'Entertainment', 'Stage Show', 'Musical stage retelling of The Little Mermaid.', NULL, NULL, true, 'The Little Mermaid – A Musical Adventure', 'Animation Courtyard'),
('The Record Setters', 'Hollywood Studios', 'Entertainment', 'Live Music', 'Live band playing hits along the streets of the park.', NULL, NULL, true, 'The Record Setters', 'Hollywood Boulevard'),
('Wonderful World of Animation', 'Hollywood Studios', 'Entertainment', 'Nighttime Show', 'Projection show celebrating decades of Disney animation on the Chinese Theatre.', NULL, NULL, true, 'Wonderful World of Animation', 'Hollywood Boulevard');


-- ============================================================
-- DINING
-- ============================================================
DELETE FROM experiences WHERE park = 'Hollywood Studios' AND category = 'Dining';

INSERT INTO experiences (name, park, category, type, description, opening_year, duration, is_active, sort_name, location) VALUES
('50''s Prime Time Café', 'Hollywood Studios', 'Dining', 'Table Service', 'Retro comfort food served in a 1950s TV-sitcom kitchen.', NULL, NULL, true, '50''s Prime Time Café', 'Echo Lake'),
('ABC Commissary', 'Hollywood Studios', 'Dining', 'Quick Service', 'Quick-service spot with global comfort food on Commissary Lane.', NULL, NULL, true, 'ABC Commissary', 'Commissary Lane'),
('Anaheim Produce', 'Hollywood Studios', 'Dining', 'Snack', 'Snack and drink stand at the Sunset Ranch Market.', NULL, NULL, true, 'Anaheim Produce', 'Sunset Boulevard'),
('Backlot Express', 'Hollywood Studios', 'Dining', 'Quick Service', 'Quick service with burgers and salads near Star Tours.', NULL, NULL, true, 'Backlot Express', 'Echo Lake'),
('BaseLine Tap House', 'Hollywood Studios', 'Dining', 'Bar & Lounge', 'California craft beers and wine with small bites on Grand Avenue.', NULL, NULL, true, 'BaseLine Tap House', 'Grand Avenue'),
('Catalina Eddie''s', 'Hollywood Studios', 'Dining', 'Quick Service', 'Pizza and salads at the Sunset Ranch Market.', NULL, NULL, true, 'Catalina Eddie''s', 'Sunset Boulevard'),
('Docking Bay 7 Food and Cargo', 'Hollywood Studios', 'Dining', 'Quick Service', 'Galactic quick-service dishes in Galaxy''s Edge.', NULL, NULL, true, 'Docking Bay 7 Food and Cargo', 'Star Wars: Galaxy''s Edge'),
('Dockside Diner', 'Hollywood Studios', 'Dining', 'Quick Service', 'Waterfront stand for hot dogs, nachos, and drinks.', NULL, NULL, true, 'Dockside Diner', 'Echo Lake'),
('Epic Eats', 'Hollywood Studios', 'Dining', 'Snack', 'Sweet treats and drinks at the Sunset Ranch Market.', NULL, NULL, true, 'Epic Eats', 'Sunset Boulevard'),
('Fairfax Fare', 'Hollywood Studios', 'Dining', 'Quick Service', 'Quick service with barbecue and hearty plates on Sunset Boulevard.', NULL, NULL, true, 'Fairfax Fare', 'Sunset Boulevard'),
('Fantasmic! Dining Packages', 'Hollywood Studios', 'Dining', 'Dining Package', 'Dining package with reserved seating for the Fantasmic! show.', NULL, NULL, true, 'Fantasmic! Dining Packages', 'Sunset Boulevard'),
('FØØD by Swedish Chef', 'Hollywood Studios', 'Dining', 'Snack', 'Swedish Chef-themed snack stand on Grand Avenue.', NULL, NULL, true, 'FØØD by Swedish Chef', 'Grand Avenue'),
('Hollywood & Vine', 'Hollywood Studios', 'Dining', 'Character Dining', 'Character buffet dining in an Art Deco Hollywood setting.', NULL, NULL, true, 'Hollywood & Vine', 'Echo Lake'),
('The Hollywood Brown Derby', 'Hollywood Studios', 'Dining', 'Signature Dining', 'Signature dining inspired by the classic Hollywood restaurant.', NULL, NULL, true, 'The Hollywood Brown Derby', 'Hollywood Boulevard'),
('The Hollywood Brown Derby Lounge', 'Hollywood Studios', 'Dining', 'Bar & Lounge', 'Outdoor lounge with cocktails and small plates beside the Brown Derby.', NULL, NULL, true, 'The Hollywood Brown Derby Lounge', 'Hollywood Boulevard'),
('Hollywood Scoops', 'Hollywood Studios', 'Dining', 'Snack', 'Hand-scooped ice cream on Sunset Boulevard.', NULL, NULL, true, 'Hollywood Scoops', 'Sunset Boulevard'),
('Ice Cold Hydraulics', 'Hollywood Studios', 'Dining', 'Snack', 'Frozen drinks and refreshers in Toy Story Land.', NULL, NULL, true, 'Ice Cold Hydraulics', 'Toy Story Land'),
('Kat Saka''s Kettle', 'Hollywood Studios', 'Dining', 'Snack', 'Sweet-and-savory Outpost Mix popcorn in Galaxy''s Edge.', NULL, NULL, true, 'Kat Saka''s Kettle', 'Star Wars: Galaxy''s Edge'),
('Market', 'Hollywood Studios', 'Dining', 'Snack', 'Grab-and-go snacks and drinks.', NULL, NULL, true, 'Market', NULL),
('Milk Stand', 'Hollywood Studios', 'Dining', 'Snack', 'Blue and green milk from a Star Wars refreshment stand.', NULL, NULL, true, 'Milk Stand', 'Star Wars: Galaxy''s Edge'),
('Neighborhood Bakery', 'Hollywood Studios', 'Dining', 'Snack', 'Fresh-baked pastries and treats.', NULL, NULL, true, 'Neighborhood Bakery', NULL),
('Oga''s Cantina', 'Hollywood Studios', 'Dining', 'Bar & Lounge', 'Star Wars cantina serving exotic cocktails and DJ R-3X tunes.', NULL, NULL, true, 'Oga''s Cantina', 'Star Wars: Galaxy''s Edge'),
('Ronto Roasters', 'Hollywood Studios', 'Dining', 'Quick Service', 'Roasted-meat wraps and drinks in Galaxy''s Edge.', NULL, NULL, true, 'Ronto Roasters', 'Star Wars: Galaxy''s Edge'),
('Rosie''s All-American Café', 'Hollywood Studios', 'Dining', 'Quick Service', 'Burgers and comfort food at the Sunset Ranch Market.', NULL, NULL, true, 'Rosie''s All-American Café', 'Sunset Boulevard'),
('Roundup Rodeo BBQ', 'Hollywood Studios', 'Dining', 'Table Service', 'Family-style barbecue in a Toy Story rodeo setting.', NULL, NULL, true, 'Roundup Rodeo BBQ', 'Toy Story Land'),
('Sci-Fi Dine-In Theater Restaurant', 'Hollywood Studios', 'Dining', 'Table Service', 'Dine in a classic car under the stars watching sci-fi B-movie clips.', NULL, NULL, true, 'Sci-Fi Dine-In Theater Restaurant', 'Commissary Lane'),
('Sunshine Day Bar', 'Hollywood Studios', 'Dining', 'Bar & Lounge', 'Rooftop bar with cocktails and views over Sunset Boulevard.', NULL, NULL, true, 'Sunshine Day Bar', 'Sunset Boulevard'),
('The Trolley Car Café', 'Hollywood Studios', 'Dining', 'Quick Service', 'Starbucks coffee and pastries on Hollywood Boulevard.', NULL, NULL, true, 'The Trolley Car Café', 'Hollywood Boulevard'),
('Tune-In Lounge', 'Hollywood Studios', 'Dining', 'Bar & Lounge', 'Living-room-style lounge next to 50''s Prime Time Café.', NULL, NULL, true, 'Tune-In Lounge', 'Echo Lake'),
('Woody''s Lunch Box', 'Hollywood Studios', 'Dining', 'Quick Service', 'Walk-up window for sandwiches and breakfast in Toy Story Land.', NULL, NULL, true, 'Woody''s Lunch Box', 'Toy Story Land');


-- ============================================================
-- CHARACTERS
-- ============================================================
DELETE FROM experiences WHERE park = 'Hollywood Studios' AND category = 'Characters';

INSERT INTO experiences (name, park, category, type, description, opening_year, duration, is_active, sort_name, location) VALUES
('Meet Ariel at Walt Disney Presents', 'Hollywood Studios', 'Characters', 'Character Meet', 'Meet Ariel from The Little Mermaid at Walt Disney Presents.', NULL, NULL, true, 'Meet Ariel at Walt Disney Presents', 'Animation Courtyard'),
('Meet Disney Stars at Red Carpet Dreams', 'Hollywood Studios', 'Characters', 'Character Meet', 'Meet Mickey and Minnie dressed as Hollywood stars.', NULL, NULL, true, 'Meet Disney Stars at Red Carpet Dreams', 'Commissary Lane'),
('Meet Edna Mode at the Edna Mode Experience', 'Hollywood Studios', 'Characters', 'Character Meet', 'Meet Edna Mode from The Incredibles.', NULL, NULL, true, 'Meet Edna Mode at the Edna Mode Experience', 'Pixar Place'),
('Meet Joy at Pixar Plaza', 'Hollywood Studios', 'Characters', 'Character Meet', 'Meet Joy from Inside Out at Pixar Place.', NULL, NULL, true, 'Meet Joy at Pixar Plaza', 'Pixar Place'),
('Meet Olaf at Celebrity Spotlight', 'Hollywood Studios', 'Characters', 'Character Meet', 'Meet Olaf from Frozen at Celebrity Spotlight.', NULL, NULL, true, 'Meet Olaf at Celebrity Spotlight', 'Echo Lake'),
('Meet Pixar Pals at Pixar Plaza', 'Hollywood Studios', 'Characters', 'Character Meet', 'Meet favorite Pixar characters at Pixar Place.', NULL, NULL, true, 'Meet Pixar Pals at Pixar Plaza', 'Pixar Place'),
('Meet the Toys in Toy Story Land', 'Hollywood Studios', 'Characters', 'Character Meet', 'Meet Woody, Buzz, and friends in Toy Story Land.', NULL, NULL, true, 'Meet the Toys in Toy Story Land', 'Toy Story Land');


-- ============================================================
-- EVENTS & TOURS
-- ============================================================
DELETE FROM experiences WHERE park = 'Hollywood Studios' AND category = 'Events & Tours';

INSERT INTO experiences (name, park, category, type, description, opening_year, duration, is_active, sort_name, location) VALUES
('Disney After Hours at Disney''s Hollywood Studios', 'Hollywood Studios', 'Events & Tours', 'Event', 'Separately-ticketed late-night event with low crowds and short waits.', NULL, NULL, true, 'Disney After Hours at Disney''s Hollywood Studios', NULL),
('Disney Jollywood Nights', 'Hollywood Studios', 'Events & Tours', 'Event', 'After-hours holiday party with festive entertainment and treats.', NULL, NULL, true, 'Disney Jollywood Nights', NULL);

COMMIT;

-- ------------------------------------------------------------
-- VERIFY per category:
-- ------------------------------------------------------------
-- SELECT category, name, type, location FROM experiences
--   WHERE park = 'Hollywood Studios'
--   ORDER BY category, sort_name;
