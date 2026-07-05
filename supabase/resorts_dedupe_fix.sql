-- ═══════════════════════════════════════════════════════════════════
-- RESORTS — de-duplicate fix (July 2026)
-- The universal Phase 2 activities got inserted twice. This removes the
-- extra copies, keeping the earliest of each (name, location). Run once.
-- ═══════════════════════════════════════════════════════════════════

DELETE FROM experiences
WHERE id IN (
  SELECT id FROM (
    SELECT id,
           row_number() OVER (PARTITION BY name, location ORDER BY created_at) AS rn
    FROM experiences
    WHERE park = 'Resorts'
  ) ranked
  WHERE ranked.rn > 1
);
