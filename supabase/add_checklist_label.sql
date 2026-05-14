-- Run this in the Supabase SQL editor.
-- Adds the checklist_label column to the challenges table.
-- This label is shown as the section header above the checklist on the Challenge Detail screen.
-- Examples: "Songs to collect", "Parks to visit", "Rides to complete"

ALTER TABLE challenges
  ADD COLUMN IF NOT EXISTS checklist_label text;
