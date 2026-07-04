-- ═══════════════════════════════════════════════════════════════════
-- RESORTS — Phase 1 data normalization (July 2026)
-- Run once in the Supabase SQL editor. Makes every resort experience's
-- `location` match the canonical short resort names the app groups by.
-- ═══════════════════════════════════════════════════════════════════

-- ── Shorten existing (audit) locations to canonical names ──────────────
UPDATE experiences SET location = 'Animal Kingdom Lodge' WHERE park = 'Resorts' AND location = 'Animal Kingdom Lodge — Kidani';
UPDATE experiences SET location = 'Beach Club'           WHERE park = 'Resorts' AND location = 'Beach Club Resort';
UPDATE experiences SET location = 'Caribbean Beach'      WHERE park = 'Resorts' AND location = 'Caribbean Beach Resort';
UPDATE experiences SET location = 'Contemporary'         WHERE park = 'Resorts' AND location = 'Contemporary Resort';
UPDATE experiences SET location = 'Polynesian'           WHERE park = 'Resorts' AND location = 'Polynesian Resort';
UPDATE experiences SET location = 'Riviera'              WHERE park = 'Resorts' AND location = 'Riviera Resort';
-- 'Coronado Springs', 'Fort Wilderness', 'Grand Floridian', 'Wilderness Lodge' are already canonical.

-- ── Fix legacy entries that baked the resort into the name ─────────────
UPDATE experiences SET name = '1900 Park Fare',       sort_name = '1900 Park Fare',       location = 'Grand Floridian'  WHERE park = 'Resorts' AND name = '1900 Park Fare — Grand Floridian';
UPDATE experiences SET name = 'Artist Point',         sort_name = 'Artist Point',         location = 'Wilderness Lodge' WHERE park = 'Resorts' AND name = 'Artist Point — Wilderness Lodge';
UPDATE experiences SET location = 'Animal Kingdom Lodge'                                                                WHERE park = 'Resorts' AND name = 'Boma — Flavors of Africa';
UPDATE experiences SET name = 'California Grill',      sort_name = 'California Grill',      location = 'Contemporary'     WHERE park = 'Resorts' AND name = 'California Grill — Contemporary Resort';
UPDATE experiences SET name = 'Carriage Rides',        sort_name = 'Carriage Rides',        location = 'Fort Wilderness'  WHERE park = 'Resorts' AND name = 'Carriage Rides — Fort Wilderness';
UPDATE experiences SET location = 'Fort Wilderness'                                                                     WHERE park = 'Resorts' AND name = 'Chip ''n'' Dale''s Campfire Singalong';
UPDATE experiences SET location = 'Animal Kingdom Lodge'                                                                WHERE park = 'Resorts' AND name = 'Jiko — The Cooking Place';
UPDATE experiences SET name = 'Narcoossee''s',         sort_name = 'Narcoossee''s',         location = 'Grand Floridian'  WHERE park = 'Resorts' AND name = 'Narcoossee''s — Grand Floridian';
UPDATE experiences SET name = '''Ohana',               sort_name = 'Ohana',                 location = 'Polynesian'       WHERE park = 'Resorts' AND name = 'Ohana — Polynesian Resort';
UPDATE experiences SET location = 'Polynesian'                                                                          WHERE park = 'Resorts' AND name = 'Trader Sam''s Grog Grotto';
UPDATE experiences SET name = 'Victoria & Albert''s',  sort_name = 'Victoria & Albert''s',  location = 'Grand Floridian'  WHERE park = 'Resorts' AND name = 'Victoria & Albert''s — Grand Floridian';

-- ── Relocate Electrical Water Pageant to Magic Kingdom entertainment ───
UPDATE experiences SET park = 'Magic Kingdom', category = 'Entertainment', location = NULL WHERE name = 'Electrical Water Pageant';

-- ── Drop the generic property-wide entry (returns later as per-resort) ─
DELETE FROM experiences WHERE park = 'Resorts' AND name = 'Movies Under the Stars';
