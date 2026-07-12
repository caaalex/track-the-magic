-- ============================================================
-- Swan / Dolphin / Swan Reserve dining — placed by BUILDING (2026-07)
-- Run in the Supabase SQL Editor. Supersedes dolphin_experiences_2026_07.sql.
--
-- The three connected hotels share dining, but each venue physically
-- lives in ONE building. Placing each once (by building) avoids repeats.
-- Building assignments verified against Disney Food Blog / swandolphin.com.
--
-- Idempotent & self-correcting:
--   1) Removes venues mistakenly added to the Dolphin (if the earlier
--      Dolphin file was run) that actually belong to Swan / Swan Reserve.
--   2) Guarded inserts each venue at its correct building (skips any that
--      already exist there — e.g. Garden Grove/Il Mulino at Swan,
--      Amare/Stir at Swan Reserve).
--   3) Renames existing 'Il Mulino' → 'Il Mulino New York Trattoria'.
-- Resort rows use the 9-column shape (no opening_year).
-- ============================================================

BEGIN;

-- 1) Undo any Swan / Swan Reserve venues wrongly placed at the Dolphin.
DELETE FROM experiences
WHERE park = 'Resorts' AND location = 'Dolphin' AND name IN (
  'Amare','Stir','Grounds','Tangerine','Chill','Garden Grove',
  'Il Mulino New York Trattoria','Il Mulino Lounge','Java',
  'Kimonos','Kimonos Lounge','Splash Pool Bar and Grill',
  'Bourbon Steak','Bourbon Steak Lounge'
);

-- 2) Insert each venue at its correct building (guarded — no dupes).
WITH v(name, loc, cat, typ, descr, dur) AS (VALUES
  -- ── Dolphin ──
  ('Rosa Mexicano',                'Dolphin',      'Dining',      'Table Service', 'Modern Mexican dining with tableside guacamole.', '60 min'),
  ('Rosa Mexicano Lounge',         'Dolphin',      'Dining',      'Bar & Lounge',  'Margaritas and Mexican small plates.', '30 min'),
  ('The Fountain',                 'Dolphin',      'Dining',      'Quick Service', 'Casual diner for burgers, shakes, and ice cream.', '15 min'),
  ('Cabana Bar and Beach Club',    'Dolphin',      'Dining',      'Bar & Lounge',  'South Beach-style poolside bar and grill by the Grotto Pool.', '30 min'),
  ('Phins',                        'Dolphin',      'Dining',      'Bar & Lounge',  'Lobby lounge with craft cocktails and global small plates.', '30 min'),
  ('Todd English''s bluezoo Lounge','Dolphin',     'Dining',      'Bar & Lounge',  'Cocktail lounge beside the bluezoo restaurant.', '30 min'),
  ('Lagoon: Games, Lanes & Eats',  'Dolphin',      'Attractions', 'Recreation',    'Family entertainment center with bowling, arcade games, and dining.', 'Varies'),
  -- ── Swan ──
  ('Il Mulino Lounge',             'Swan',         'Dining',      'Bar & Lounge',  'Italian wine and cocktail lounge.', '30 min'),
  ('Java',                         'Swan',         'Dining',      'Snack',         'Grab-and-go coffee bar with pastries and sandwiches.', '10 min'),
  ('Kimonos',                      'Swan',         'Dining',      'Table Service', 'Japanese sushi bar with karaoke.', '60 min'),
  ('Kimonos Lounge',               'Swan',         'Dining',      'Bar & Lounge',  'Sake and cocktails at the sushi bar.', '30 min'),
  ('Splash Pool Bar and Grill',    'Swan',         'Dining',      'Bar & Lounge',  'Poolside sandwiches and cocktails.', '30 min'),
  -- ── Swan Reserve ──
  ('Bourbon Steak',                'Swan Reserve', 'Dining',      'Signature Dining','Modern American steakhouse from chef Michael Mina.', '60 min'),
  ('Bourbon Steak Lounge',         'Swan Reserve', 'Dining',      'Bar & Lounge',  'Cocktails and small plates beside Bourbon Steak.', '30 min'),
  ('Grounds',                      'Swan Reserve', 'Dining',      'Snack',         'Grab-and-go coffee, breakfast, and deli sandwiches.', '10 min'),
  ('Tangerine',                    'Swan Reserve', 'Dining',      'Bar & Lounge',  'Poolside flatbreads, salads, and signature drinks.', '30 min'),
  ('Chill',                        'Swan Reserve', 'Dining',      'Snack',         'Ice cream and frozen treats.', '10 min')
)
INSERT INTO experiences (name, park, category, type, description, duration, is_active, sort_name, location)
SELECT v.name, 'Resorts', v.cat, v.typ, v.descr, v.dur, true, v.name, v.loc
FROM v
WHERE NOT EXISTS (
  SELECT 1 FROM experiences e
  WHERE e.park = 'Resorts' AND e.location = v.loc AND e.name = v.name
);

-- 3) Give the existing Swan "Il Mulino" its full name.
UPDATE experiences
SET name = 'Il Mulino New York Trattoria', sort_name = 'Il Mulino New York Trattoria'
WHERE park = 'Resorts' AND location = 'Swan' AND name = 'Il Mulino';

COMMIT;

-- ------------------------------------------------------------
-- VERIFY per building:
-- ------------------------------------------------------------
-- SELECT location, name FROM experiences
--   WHERE park = 'Resorts' AND location IN ('Swan','Dolphin','Swan Reserve')
--     AND category IN ('Dining','Attractions')
--   ORDER BY location, sort_name;
