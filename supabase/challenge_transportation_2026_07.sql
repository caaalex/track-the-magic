-- ============================================================
-- New challenge: ride every mode of Disney transportation (2026-07)
-- Run in the Supabase SQL Editor.
--
-- Inserts the challenge and its checklist items in one statement.
-- Items are manually checkable (not linked to experiences).
-- Requires the checklist_label column (add_checklist_label.sql).
-- ============================================================

WITH new_challenge AS (
  INSERT INTO challenges (title, description, park, icon, checklist_label, is_active)
  VALUES (
    'All Aboard',
    'Get around the World the Disney way — ride every mode of Disney transportation.',
    NULL,
    '🧭',
    'Transportation to ride',
    true
  )
  RETURNING id
)
INSERT INTO challenge_items (challenge_id, title, subtitle, sort_order)
SELECT new_challenge.id, t.title, t.subtitle, t.sort_order
FROM new_challenge,
  (VALUES
    ('Ride the Monorail',                'Resort, Express, or Epcot line',                          1),
    ('Ride the Disney Skyliner',         'Gondolas linking Epcot, Hollywood Studios, and resorts',  2),
    ('Ride a Friendship Boat',           'Water launches around Epcot, the resorts, and Disney Springs', 3),
    ('Ride the Magic Kingdom Ferryboat', 'The large ferry across Seven Seas Lagoon',                4),
    ('Ride a Disney Bus',                'The complimentary bus network',                           5),
    ('Ride a Minnie Van',                'Disney''s Lyft-operated minivan service',                 6)
  ) AS t(title, subtitle, sort_order);

-- ------------------------------------------------------------
-- VERIFY:
-- ------------------------------------------------------------
-- SELECT c.title, i.sort_order, i.title, i.subtitle
--   FROM challenges c JOIN challenge_items i ON i.challenge_id = c.id
--   WHERE c.title = 'All Aboard'
--   ORDER BY i.sort_order;
