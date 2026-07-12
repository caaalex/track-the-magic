-- ============================================================
-- Add "Fishing Excursion" to resorts that offer fishing (2026-07)
-- Run in the Supabase SQL Editor.
--
-- Guarded insert: only adds the row where the resort doesn't already
-- have a "Fishing Excursion", so re-running is safe and nothing dupes.
--
-- Caribbean Beach is intentionally omitted here — it already has a
-- Fishing Excursion from its own file (caribbean_beach_experiences).
-- Matches that row's shape: Events & Tours / Tour.
-- ============================================================

INSERT INTO experiences (name, park, category, type, description, duration, is_active, sort_name, location)
SELECT
  'Fishing Excursion', 'Resorts', 'Events & Tours', 'Tour',
  'Catch-and-release fishing at its finest on a guided excursion from the resort''s waters.',
  'Varies', true, 'Fishing Excursion', r.loc
FROM (VALUES
  ('Fort Wilderness'),
  ('Contemporary'),
  ('Grand Floridian'),
  ('Old Key West'),
  ('Polynesian'),
  ('Port Orleans Riverside'),
  ('Wilderness Lodge'),
  ('Yacht Club')
) AS r(loc)
WHERE NOT EXISTS (
  SELECT 1 FROM experiences e
  WHERE e.park = 'Resorts' AND e.location = r.loc AND e.name = 'Fishing Excursion'
);

-- ------------------------------------------------------------
-- VERIFY (should list each resort with a Fishing Excursion):
-- ------------------------------------------------------------
-- SELECT location FROM experiences
--   WHERE park = 'Resorts' AND name = 'Fishing Excursion'
--   ORDER BY location;
