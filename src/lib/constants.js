export const PARKS = [
  { name: 'Magic Kingdom',     emoji: '🏰' },
  { name: 'Epcot',             emoji: '🌍' },
  { name: 'Hollywood Studios', emoji: '🎬' },
  { name: 'Animal Kingdom',    emoji: '🦁' },
  { name: 'Typhoon Lagoon',    emoji: '🌊' },
  { name: 'Blizzard Beach',    emoji: '⛷️' },
  { name: 'Disney Springs',    emoji: '🛍️' },
  { name: 'Resorts',           emoji: '🏨' },
  { name: 'Sports',            emoji: '🏅' },
]

export const PARK_EMOJI = Object.fromEntries(PARKS.map(p => [p.name, p.emoji]))

export const PARK_COLORS = {
  'Magic Kingdom':     { bg: '#EBF5FF', color: '#1A6FAB' },
  'Epcot':             { bg: '#E8F5E9', color: '#2E7D32' },
  'Hollywood Studios': { bg: '#FFF3E0', color: '#E65100' },
  'Animal Kingdom':    { bg: '#F3E5F5', color: '#6A1B9A' },
  'Typhoon Lagoon':    { bg: '#E0F7FA', color: '#00838F' },
  'Blizzard Beach':    { bg: '#E8EAF6', color: '#283593' },
  'Disney Springs':    { bg: '#FCE4EC', color: '#AD1457' },
  'Resorts':           { bg: '#FFF8E1', color: '#F57F17' },
  'Sports':            { bg: '#F1F8E9', color: '#33691E' },
}

// ── Guardians of the Galaxy: Cosmic Rewind ────────────────────────────────
export const GUARDIANS_EXPERIENCE_ID = '546764b8-1d69-416c-81f4-93db335a851e'
export const GUARDIANS_CHALLENGE_ID  = 'ac79e3ac-df2a-44db-b001-351d72e4bd78'

export const CATEGORIES = [
  'All',
  'Attractions',
  'Dining',
  'Entertainment',
  'Characters',
  'Events & Tours',
]
