-- ============================================================
-- Three "lucky feat" challenges (2026-07). Run in the SQL Editor.
-- Each inserts a challenge + a single checklist item so it can be
-- marked complete.
-- ============================================================

-- 1) Monsters, Inc. Laugh Floor — "That Guy"
WITH c AS (
  INSERT INTO challenges (title, description, park, icon, checklist_label, is_active)
  VALUES (
    'Be "That Guy" at Monsters, Inc. Laugh Floor',
    'During Monsters, Inc. Laugh Floor, one lucky guest gets singled out on screen as "That Guy." Get picked and join the show!',
    'Magic Kingdom',
    '🎯',
    'To complete',
    true
  )
  RETURNING id
)
INSERT INTO challenge_items (challenge_id, title, sort_order)
SELECT id, 'Get picked as "That Guy"', 1 FROM c;

-- 2) Star Tours — the Rebel Spy
WITH c AS (
  INSERT INTO challenges (title, description, park, icon, checklist_label, is_active)
  VALUES (
    'Be the Rebel Spy on Star Tours',
    'Every Star Tours flight hides a Rebel Spy among the passengers, chosen at random. Get picked as the spy!',
    'Hollywood Studios',
    '🚀',
    'To complete',
    true
  )
  RETURNING id
)
INSERT INTO challenge_items (challenge_id, title, sort_order)
SELECT id, 'Get chosen as the Rebel Spy', 1 FROM c;

-- 3) The Sword in the Stone
WITH c AS (
  INSERT INTO challenges (title, description, park, icon, checklist_label, is_active)
  VALUES (
    'Pull the sword from the stone',
    'At the Sword in the Stone ceremony, Merlin selects a guest to try to free Excalibur. Be the one who pulls the sword!',
    'Magic Kingdom',
    '⚔️',
    'To complete',
    true
  )
  RETURNING id
)
INSERT INTO challenge_items (challenge_id, title, sort_order)
SELECT id, 'Pull the sword from the stone', 1 FROM c;

-- ------------------------------------------------------------
-- VERIFY:
-- ------------------------------------------------------------
-- SELECT c.title, c.park, i.title AS item
--   FROM challenges c JOIN challenge_items i ON i.challenge_id = c.id
--   WHERE c.title IN (
--     'Be "That Guy" at Monsters, Inc. Laugh Floor',
--     'Be the Rebel Spy on Star Tours',
--     'Pull the sword from the stone')
--   ORDER BY c.title;
