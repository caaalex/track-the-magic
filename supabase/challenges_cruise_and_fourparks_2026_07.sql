-- ============================================================
-- Two new challenges (2026-07). Run in the Supabase SQL Editor.
--   1) Sail on every Disney Cruise Line ship
--   2) Visit all 4 theme parks in one day
-- Each inserts the challenge + its checklist items in one statement.
-- ============================================================

-- ── 1) Disney Cruise Line ships ──────────────────────────────
WITH new_challenge AS (
  INSERT INTO challenges (title, description, park, icon, checklist_label, is_active)
  VALUES (
    'Sail on every Disney Cruise Line ship',
    'Disney Cruise Line''s fleet sails the seas with its own distinct ships. Set sail on every one!',
    NULL,
    '🌍',
    'Ships to sail',
    true
  )
  RETURNING id
)
INSERT INTO challenge_items (challenge_id, title, subtitle, sort_order)
SELECT new_challenge.id, t.title, t.subtitle, t.sort_order
FROM new_challenge,
  (VALUES
    ('Disney Magic',     'Sailing since 1998', 1),
    ('Disney Wonder',    'Sailing since 1999', 2),
    ('Disney Dream',     'Sailing since 2011', 3),
    ('Disney Fantasy',   'Sailing since 2012', 4),
    ('Disney Wish',      'Sailing since 2022', 5),
    ('Disney Treasure',  'Sailing since 2024', 6),
    ('Disney Destiny',   'Sailing since 2025', 7),
    ('Disney Adventure', 'Sailing since 2025', 8)
  ) AS t(title, subtitle, sort_order);


-- ── 2) All four theme parks in one day ───────────────────────
WITH new_challenge AS (
  INSERT INTO challenges (title, description, park, icon, checklist_label, is_active)
  VALUES (
    'Visit all 4 theme parks in one day',
    'The ultimate park-hopper feat: set foot in Magic Kingdom, Epcot, Hollywood Studios, and Animal Kingdom all in a single day!',
    NULL,
    '⚡',
    'Parks to visit',
    true
  )
  RETURNING id
)
INSERT INTO challenge_items (challenge_id, title, subtitle, sort_order)
SELECT new_challenge.id, t.title, t.subtitle, t.sort_order
FROM new_challenge,
  (VALUES
    ('Magic Kingdom',    'Where the magic begins', 1),
    ('Epcot',            'Around the world and beyond', 2),
    ('Hollywood Studios', 'Lights, camera, action', 3),
    ('Animal Kingdom',   'Adventure is out there', 4)
  ) AS t(title, subtitle, sort_order);

-- ------------------------------------------------------------
-- VERIFY:
-- ------------------------------------------------------------
-- SELECT c.title, i.sort_order, i.title, i.subtitle
--   FROM challenges c JOIN challenge_items i ON i.challenge_id = c.id
--   WHERE c.title IN ('Sail on every Disney Cruise Line ship',
--                     'Visit all 4 theme parks in one day')
--   ORDER BY c.title, i.sort_order;
