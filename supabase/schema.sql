-- ============================================================
-- Track the Magic — Database Schema
-- Run this in the Supabase SQL Editor (Project > SQL Editor)
-- ============================================================

-- ============================================================
-- 1. EXPERIENCES
--    Master list of all rides, dining, entertainment, etc.
--    Readable by everyone. Only admins can modify.
-- ============================================================

CREATE TABLE experiences (
  id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name           text        NOT NULL,
  park           text        NOT NULL,
  category       text        NOT NULL CHECK (category IN ('Attractions', 'Entertainment', 'Dining', 'Characters', 'Events & Tours')),
  type           text,
  description    text,
  opening_year   text,
  duration       text,
  menu_link      text,
  notes          text,
  is_active      boolean     NOT NULL DEFAULT true,
  created_at     timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "experiences_select_all"
  ON experiences FOR SELECT USING (true);

CREATE POLICY "experiences_insert_admin"
  ON experiences FOR INSERT
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "experiences_update_admin"
  ON experiences FOR UPDATE
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "experiences_delete_admin"
  ON experiences FOR DELETE
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');


-- ============================================================
-- 2. USER_EXPERIENCES
--    Each user's personal data for a given experience.
--    Private — users can only access their own rows.
-- ============================================================

CREATE TABLE user_experiences (
  id                 uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id            uuid    NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  experience_id      uuid    NOT NULL REFERENCES experiences(id) ON DELETE CASCADE,
  completed          boolean NOT NULL DEFAULT false,
  times_visited      integer NOT NULL DEFAULT 0,
  personal_rating    integer CHECK (personal_rating BETWEEN 0 AND 5),
  personal_notes     text,
  wishlist           boolean NOT NULL DEFAULT false,
  last_visited_date  date,
  created_at         timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, experience_id)
);

ALTER TABLE user_experiences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_experiences_select_own"
  ON user_experiences FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "user_experiences_insert_own"
  ON user_experiences FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "user_experiences_update_own"
  ON user_experiences FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "user_experiences_delete_own"
  ON user_experiences FOR DELETE USING (auth.uid() = user_id);


-- ============================================================
-- 3. TRIPS
--    A user's individual park visit.
-- ============================================================

CREATE TABLE trips (
  id          uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid    NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  park        text    NOT NULL,
  visit_date  date    NOT NULL,
  notes       text,
  created_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE trips ENABLE ROW LEVEL SECURITY;

CREATE POLICY "trips_select_own"
  ON trips FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "trips_insert_own"
  ON trips FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "trips_update_own"
  ON trips FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "trips_delete_own"
  ON trips FOR DELETE USING (auth.uid() = user_id);


-- ============================================================
-- 4. TRIP_EXPERIENCES
--    Experiences logged during a specific trip.
--    Access is granted when the user owns the parent trip.
-- ============================================================

CREATE TABLE trip_experiences (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id        uuid NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  experience_id  uuid NOT NULL REFERENCES experiences(id) ON DELETE CASCADE,
  created_at     timestamptz NOT NULL DEFAULT now(),
  UNIQUE (trip_id, experience_id)
);

ALTER TABLE trip_experiences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "trip_experiences_select_own"
  ON trip_experiences FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM trips
    WHERE trips.id = trip_experiences.trip_id
      AND trips.user_id = auth.uid()
  ));

CREATE POLICY "trip_experiences_insert_own"
  ON trip_experiences FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM trips
    WHERE trips.id = trip_experiences.trip_id
      AND trips.user_id = auth.uid()
  ));

CREATE POLICY "trip_experiences_delete_own"
  ON trip_experiences FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM trips
    WHERE trips.id = trip_experiences.trip_id
      AND trips.user_id = auth.uid()
  ));


-- ============================================================
-- 5. CHALLENGES
--    Admin-defined challenges (e.g. "Ride every coaster").
--    Readable by everyone. Only admins can modify.
-- ============================================================

CREATE TABLE challenges (
  id          uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  title       text    NOT NULL,
  description text,
  park        text,
  icon        text,
  is_active   boolean NOT NULL DEFAULT true,
  created_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "challenges_select_all"
  ON challenges FOR SELECT USING (true);

CREATE POLICY "challenges_insert_admin"
  ON challenges FOR INSERT
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "challenges_update_admin"
  ON challenges FOR UPDATE
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "challenges_delete_admin"
  ON challenges FOR DELETE
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');


-- ============================================================
-- 6. CHALLENGE_ITEMS
--    Individual checklist items within a challenge.
--    Readable by everyone. Only admins can modify.
-- ============================================================

CREATE TABLE challenge_items (
  id            uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_id  uuid    NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
  title         text    NOT NULL,
  subtitle      text,
  sort_order    integer,
  created_at    timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE challenge_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "challenge_items_select_all"
  ON challenge_items FOR SELECT USING (true);

CREATE POLICY "challenge_items_insert_admin"
  ON challenge_items FOR INSERT
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "challenge_items_update_admin"
  ON challenge_items FOR UPDATE
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "challenge_items_delete_admin"
  ON challenge_items FOR DELETE
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');


-- ============================================================
-- 7. USER_CHALLENGE_ITEMS
--    Tracks which challenge items each user has completed.
-- ============================================================

CREATE TABLE user_challenge_items (
  id                uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           uuid    NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  challenge_item_id uuid    NOT NULL REFERENCES challenge_items(id) ON DELETE CASCADE,
  completed         boolean NOT NULL DEFAULT false,
  created_at        timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, challenge_item_id)
);

ALTER TABLE user_challenge_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_challenge_items_select_own"
  ON user_challenge_items FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "user_challenge_items_insert_own"
  ON user_challenge_items FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "user_challenge_items_update_own"
  ON user_challenge_items FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "user_challenge_items_delete_own"
  ON user_challenge_items FOR DELETE USING (auth.uid() = user_id);


-- ============================================================
-- INDEXES — speeds up common lookups
-- ============================================================

CREATE INDEX ON user_experiences (user_id);
CREATE INDEX ON user_experiences (experience_id);
CREATE INDEX ON trips (user_id);
CREATE INDEX ON trip_experiences (trip_id);
CREATE INDEX ON trip_experiences (experience_id);
CREATE INDEX ON challenge_items (challenge_id);
CREATE INDEX ON user_challenge_items (user_id);
CREATE INDEX ON user_challenge_items (challenge_item_id);
