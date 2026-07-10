-- Run this in the Supabase SQL editor to (re)create the Home screen leaderboard stats.
--
-- get_home_stats(p_user_id)
-- Returns:
--   percentile      integer  — "Top X% of trackers" (e.g. 15 = top 15%, lower = better).
--                              NULL when the user can't be ranked yet (see below).
--   active_trackers bigint   — users who logged a trip in the last 30 days.
--
-- Ranking rules:
--   Pool  = users who have completed at least 1 experience ("trackers"), so the
--           comparison is doer-vs-doer and the "of trackers" label is honest.
--   rank  = number of trackers with strictly MORE completions + 1 (ties share the best rank).
--   pct   = CEIL(100 * rank / pool), clamped to 1..99 (never "Top 100%").
--   NULL  = returned when the user has 0 completions (nothing to rank), or when there
--           are fewer than MIN_TRACKERS trackers total (too few for a meaningful number).
--           The UI shows a friendly "rank unlocks" state for NULL.
--
-- Adjust MIN_TRACKERS (currently 20) to change how early ranks start showing.

CREATE OR REPLACE FUNCTION get_home_stats(p_user_id uuid)
RETURNS TABLE (percentile integer, active_trackers bigint)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  WITH per_user AS (
    SELECT user_id, COUNT(DISTINCT experience_id) AS n
    FROM user_experiences
    WHERE completed = true
    GROUP BY user_id
  ),
  me  AS (SELECT n FROM per_user WHERE user_id = p_user_id),
  tot AS (SELECT COUNT(*) AS c FROM per_user)
  SELECT
    CASE
      WHEN (SELECT n FROM me) IS NULL THEN NULL   -- user has completed nothing yet
      WHEN (SELECT c FROM tot) < 20   THEN NULL   -- MIN_TRACKERS: too few to rank meaningfully
      ELSE LEAST(99, GREATEST(1,
        CEIL(
          100.0 * (
            (SELECT COUNT(*) FROM per_user WHERE n > (SELECT n FROM me)) + 1
          ) / (SELECT c FROM tot)
        )::integer
      ))
    END AS percentile,

    (
      SELECT COUNT(DISTINCT user_id)
      FROM trips
      WHERE created_at >= NOW() - INTERVAL '30 days'
    ) AS active_trackers
$$;

GRANT EXECUTE ON FUNCTION get_home_stats(uuid) TO authenticated;
