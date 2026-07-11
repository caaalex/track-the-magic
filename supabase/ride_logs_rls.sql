-- ============================================================
-- ride_logs — Row Level Security
--
-- The app reads/writes `ride_logs` (Guardians song logging), but this
-- table was created outside the versioned schema, so its RLS was never
-- captured here. Run this in the Supabase SQL Editor to GUARANTEE that
-- users can only ever see and modify their OWN ride logs.
--
-- Safe to run repeatedly: it enables RLS and (re)creates the policies.
-- If the table shape differs from the assumptions below, adjust the
-- column names — but do NOT leave RLS disabled.
-- ============================================================

-- 1. Make sure RLS is ON (this is the whole ballgame — without it,
--    the public anon key could read every user's rows).
ALTER TABLE ride_logs ENABLE ROW LEVEL SECURITY;

-- 2. Drop any older/looser policies so we start from a known-good state.
DROP POLICY IF EXISTS "ride_logs_select_own" ON ride_logs;
DROP POLICY IF EXISTS "ride_logs_insert_own" ON ride_logs;
DROP POLICY IF EXISTS "ride_logs_update_own" ON ride_logs;
DROP POLICY IF EXISTS "ride_logs_delete_own" ON ride_logs;

-- 3. Own-row policies — identical pattern to user_experiences / trips.
CREATE POLICY "ride_logs_select_own"
  ON ride_logs FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "ride_logs_insert_own"
  ON ride_logs FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "ride_logs_update_own"
  ON ride_logs FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "ride_logs_delete_own"
  ON ride_logs FOR DELETE USING (auth.uid() = user_id);

-- ------------------------------------------------------------
-- VERIFY: after running, this should show rowsecurity = true
-- and four policies. If rowsecurity is false, STOP — the table
-- is exposed.
-- ------------------------------------------------------------
-- SELECT relname, relrowsecurity FROM pg_class WHERE relname = 'ride_logs';
-- SELECT policyname, cmd FROM pg_policies WHERE tablename = 'ride_logs';
