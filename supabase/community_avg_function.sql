-- ============================================================
-- Community Average Rating Function
-- Run this in the Supabase SQL Editor to enable the
-- "Community avg" row on the Experience Detail screen.
--
-- SECURITY DEFINER lets it read all user_experiences rows
-- without exposing individual user data to the client.
-- ============================================================

CREATE OR REPLACE FUNCTION get_experience_avg_rating(exp_id uuid)
RETURNS TABLE (avg_rating numeric, total_ratings bigint)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    ROUND(AVG(personal_rating)::numeric, 1) AS avg_rating,
    COUNT(*)                                AS total_ratings
  FROM user_experiences
  WHERE experience_id = exp_id
    AND personal_rating IS NOT NULL;
$$;

-- Allow any authenticated user to call this function
GRANT EXECUTE ON FUNCTION get_experience_avg_rating(uuid) TO authenticated;
