-- ============================================================
-- Add "Campfire Activities" to EVERY resort (2026-07)
-- Run in the Supabase SQL Editor.
--
-- Data-driven: inserts one Campfire Activities row for each resort
-- location that doesn't already have it, so the three All-Star
-- resorts (added earlier) are skipped — no duplicates.
-- Resort rows use the 9-column shape (no opening_year).
-- ============================================================

INSERT INTO experiences (name, park, category, type, description, duration, is_active, sort_name, location)
SELECT
  'Campfire Activities', 'Resorts', 'Attractions', 'Recreation',
  'Evening campfire with s''mores, sing-alongs, and family activities.',
  'Varies', true, 'Campfire Activities', r.location
FROM (SELECT DISTINCT location FROM experiences WHERE park = 'Resorts' AND location IS NOT NULL) r
WHERE NOT EXISTS (
  SELECT 1 FROM experiences e
  WHERE e.park = 'Resorts' AND e.location = r.location AND e.name = 'Campfire Activities'
);

-- ------------------------------------------------------------
-- VERIFY (should list every resort exactly once):
-- ------------------------------------------------------------
-- SELECT location FROM experiences
--   WHERE park = 'Resorts' AND name = 'Campfire Activities'
--   ORDER BY location;
