-- Run this in the Supabase SQL editor to enable the Home screen leaderboard stats.
--
-- get_home_stats(p_user_id)
-- Returns:
--   percentile      integer  — "Top X% of all users" (e.g. 15 = top 15%, lower = better)
--   active_trackers bigint   — users who logged a trip in the last 30 days
--
-- Percentile formula:
--   rank = number of users with strictly MORE completions than this user + 1
--   top_pct = CEIL(rank / total_users * 100), minimum 1
--   Edge case: if there is only 1 user in the system, always returns 1%.

CREATE OR REPLACE FUNCTION get_home_stats(p_user_id uuid)
RETURNS TABLE (percentile integer, active_trackers bigint)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  WITH
  -- How many experiences has this user completed?
  my_count AS (
    SELECT COUNT(DISTINCT experience_id) AS n
    FROM user_experiences
    WHERE user_id = p_user_id AND completed = true
  ),
  -- Completed count per user across all users
  per_user AS (
    SELECT user_id, COUNT(DISTINCT experience_id) AS n
    FROM user_experiences
    WHERE completed = true
    GROUP BY user_id
  ),
  total_users AS (
    SELECT GREATEST(COUNT(*), 1) AS total FROM per_user
  ),
  -- Number of users with strictly MORE completions (i.e. ranked above this user)
  users_above AS (
    SELECT COUNT(*) AS cnt
    FROM per_user
    WHERE n > (SELECT n FROM my_count)
  )
  SELECT
    CASE
      -- Only 1 user in the system → always Top 1%
      WHEN (SELECT total FROM total_users) = 1 THEN 1
      ELSE GREATEST(
        1,
        CEIL(
          100.0 * ((SELECT cnt FROM users_above) + 1)
               / (SELECT total FROM total_users)
        )::integer
      )
    END AS percentile,

    -- Active trackers: distinct users who logged at least one trip in the last 30 days
    (
      SELECT COUNT(DISTINCT user_id)
      FROM trips
      WHERE created_at >= NOW() - INTERVAL '30 days'
    ) AS active_trackers
$$;

GRANT EXECUTE ON FUNCTION get_home_stats(uuid) TO authenticated;
