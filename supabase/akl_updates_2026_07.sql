-- ============================================================
-- Animal Kingdom Lodge — resort updates (2026-07)
-- Run in the Supabase SQL Editor.
-- Resort rows use the 9-column shape (no opening_year).
-- ============================================================

BEGIN;

-- ── Attractions ──────────────────────────────────────────────
-- Replace "Night-Vision Savanna Viewing" with "Starlight Safari"
-- (renamed in place so any tracked progress carries over).
UPDATE experiences
SET name = 'Starlight Safari',
    sort_name = 'Starlight Safari',
    description = 'Guided open-air night safari across the savanna using night-vision goggles.'
WHERE park = 'Resorts'
  AND location = 'Animal Kingdom Lodge'
  AND name ILIKE '%night-vision savanna%';

-- Add "Wild About Painting"
INSERT INTO experiences (name, park, category, type, description, duration, is_active, sort_name, location) VALUES
('Wild About Painting', 'Resorts', 'Attractions', 'Recreation', 'Create your own animal-inspired artwork in a hands-on painting activity.', 'Varies', true, 'Wild About Painting', 'Animal Kingdom Lodge');

-- ── Dining ───────────────────────────────────────────────────
INSERT INTO experiences (name, park, category, type, description, duration, is_active, sort_name, location) VALUES
('Cape Town Lounge and Wine Bar', 'Resorts', 'Dining', 'Bar & Lounge', 'South African wine bar beside Jiko at Jambo House.', '30 min', true, 'Cape Town Lounge and Wine Bar', 'Animal Kingdom Lodge'),
('Uzima Springs Pool Bar', 'Resorts', 'Dining', 'Bar & Lounge', 'Poolside bar by the Uzima Pool at Jambo House.', '30 min', true, 'Uzima Springs Pool Bar', 'Animal Kingdom Lodge'),
('Sanaa Lounge', 'Resorts', 'Dining', 'Bar & Lounge', 'Lounge serving African-Indian cocktails and small plates at Kidani Village.', '30 min', true, 'Sanaa Lounge', 'Animal Kingdom Lodge'),
('Maji Pool Bar', 'Resorts', 'Dining', 'Bar & Lounge', 'Poolside bar by the Samawati Springs Pool at Kidani Village.', '30 min', true, 'Maji Pool Bar', 'Animal Kingdom Lodge');

COMMIT;

-- ------------------------------------------------------------
-- VERIFY:
-- ------------------------------------------------------------
-- SELECT category, name, type FROM experiences
--   WHERE park = 'Resorts' AND location = 'Animal Kingdom Lodge'
--   ORDER BY category, sort_name;
