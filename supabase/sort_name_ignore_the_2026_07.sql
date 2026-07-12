-- ============================================================
-- Alphabetical sorting should ignore a leading "The " (2026-07)
-- Run in the Supabase SQL Editor.
--
-- The app orders experiences by `sort_name`. This makes sort_name equal
-- the name with a leading "The " removed, so "The Garden View Lounge"
-- sorts under G (Garden), not T. Applies to the whole table and is
-- enforced going forward by a trigger.
--
-- Only "The " (any casing, with the trailing space) is stripped —
-- names like "Theater..." or "Toledo" are unaffected.
-- ============================================================

-- 1) Backfill every existing row.
UPDATE experiences
SET sort_name = regexp_replace(name, '^the ', '', 'i')
WHERE sort_name IS DISTINCT FROM regexp_replace(name, '^the ', '', 'i');

-- 2) Keep it enforced on every future INSERT / name change.
CREATE OR REPLACE FUNCTION experiences_set_sort_name()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.sort_name := regexp_replace(NEW.name, '^the ', '', 'i');
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_experiences_sort_name ON experiences;
CREATE TRIGGER trg_experiences_sort_name
  BEFORE INSERT OR UPDATE OF name ON experiences
  FOR EACH ROW
  EXECUTE FUNCTION experiences_set_sort_name();

-- ------------------------------------------------------------
-- VERIFY (these should now sort by the word after "The"):
-- ------------------------------------------------------------
-- SELECT name, sort_name FROM experiences
--   WHERE name ILIKE 'the %'
--   ORDER BY sort_name;
