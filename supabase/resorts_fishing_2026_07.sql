-- ============================================================
-- Fishing Excursions for all fishing resorts (2026-07)
-- Run in the Supabase SQL Editor.
--
-- Single source of truth for resort fishing excursions. Personalized,
-- fact-checked descriptions (water body + launch point per Disney's
-- official recreation info). Idempotent: updates the description on any
-- existing Fishing Excursion row and inserts it where missing, so it's
-- safe to re-run and won't create duplicates.
--
-- Verified water bodies:
--   Bay Lake        → Fort Wilderness, Contemporary, Wilderness Lodge
--   Seven Seas Lagoon → Grand Floridian, Polynesian
--   Village Lake    → Old Key West
--   Crescent Lake   → Yacht Club (Bayside Marina)
--   Sassagoula River→ Port Orleans Riverside (+ Ol' Man Island)
--   Barefoot Bay    → Caribbean Beach (near Caribbean Cay)
-- ============================================================

WITH fishing(loc, descr) AS (VALUES
  ('Fort Wilderness',        'Cast for largemouth bass on a guided catch-and-release excursion across Bay Lake, launching from the Fort Wilderness Marina.'),
  ('Contemporary',           'Cast for largemouth bass on a guided catch-and-release excursion across Bay Lake, launching from the Contemporary marina.'),
  ('Grand Floridian',        'Cast for largemouth bass on a guided catch-and-release excursion across the Seven Seas Lagoon, launching from the Grand Floridian marina.'),
  ('Old Key West',           'Cast for largemouth bass on a guided catch-and-release excursion across Village Lake, launching from the Old Key West marina.'),
  ('Polynesian',             'Cast for largemouth bass on a guided catch-and-release excursion across the Seven Seas Lagoon, launching from the Polynesian marina.'),
  ('Port Orleans Riverside', 'Cast for largemouth bass on a guided catch-and-release excursion down the Sassagoula River, launching from the Riverside marina — or drop a cane pole at the Ol'' Man Island fishin'' hole.'),
  ('Wilderness Lodge',       'Cast for largemouth bass on a guided catch-and-release excursion across Bay Lake, launching from the Wilderness Lodge marina.'),
  ('Yacht Club',             'Cast for largemouth bass on a guided catch-and-release excursion across Crescent Lake, launching from Bayside Marina.'),
  ('Caribbean Beach',        'Cast for largemouth bass on a guided catch-and-release excursion across Barefoot Bay, launching from the marina near Caribbean Cay.')
)
-- 1) Personalize the description on any Fishing Excursion that exists.
UPDATE experiences e
SET description = f.descr
FROM fishing f
WHERE e.park = 'Resorts' AND e.name = 'Fishing Excursion' AND e.location = f.loc;

WITH fishing(loc, descr) AS (VALUES
  ('Fort Wilderness',        'Cast for largemouth bass on a guided catch-and-release excursion across Bay Lake, launching from the Fort Wilderness Marina.'),
  ('Contemporary',           'Cast for largemouth bass on a guided catch-and-release excursion across Bay Lake, launching from the Contemporary marina.'),
  ('Grand Floridian',        'Cast for largemouth bass on a guided catch-and-release excursion across the Seven Seas Lagoon, launching from the Grand Floridian marina.'),
  ('Old Key West',           'Cast for largemouth bass on a guided catch-and-release excursion across Village Lake, launching from the Old Key West marina.'),
  ('Polynesian',             'Cast for largemouth bass on a guided catch-and-release excursion across the Seven Seas Lagoon, launching from the Polynesian marina.'),
  ('Port Orleans Riverside', 'Cast for largemouth bass on a guided catch-and-release excursion down the Sassagoula River, launching from the Riverside marina — or drop a cane pole at the Ol'' Man Island fishin'' hole.'),
  ('Wilderness Lodge',       'Cast for largemouth bass on a guided catch-and-release excursion across Bay Lake, launching from the Wilderness Lodge marina.'),
  ('Yacht Club',             'Cast for largemouth bass on a guided catch-and-release excursion across Crescent Lake, launching from Bayside Marina.'),
  ('Caribbean Beach',        'Cast for largemouth bass on a guided catch-and-release excursion across Barefoot Bay, launching from the marina near Caribbean Cay.')
)
-- 2) Insert Fishing Excursion for resorts that don't have it yet.
INSERT INTO experiences (name, park, category, type, description, duration, is_active, sort_name, location)
SELECT 'Fishing Excursion', 'Resorts', 'Events & Tours', 'Tour', f.descr, 'Varies', true, 'Fishing Excursion', f.loc
FROM fishing f
WHERE NOT EXISTS (
  SELECT 1 FROM experiences e
  WHERE e.park = 'Resorts' AND e.name = 'Fishing Excursion' AND e.location = f.loc
);

-- ------------------------------------------------------------
-- VERIFY (9 resorts, each with a personalized description):
-- ------------------------------------------------------------
-- SELECT location, description FROM experiences
--   WHERE park = 'Resorts' AND name = 'Fishing Excursion'
--   ORDER BY location;
