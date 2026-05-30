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
  'Magic Kingdom':     { bg: '#F0EEFF', color: '#7C6FCD' },
  'Epcot':             { bg: '#E6F7F4', color: '#2A9D8F' },
  'Hollywood Studios': { bg: '#FFF0E6', color: '#E76F51' },
  'Animal Kingdom':    { bg: '#EDFAF0', color: '#57A773' },
  'Typhoon Lagoon':    { bg: '#E6F4FF', color: '#4A90D9' },
  'Blizzard Beach':    { bg: '#F0EEFF', color: '#9B8EC4' },
  'Disney Springs':    { bg: '#FFF0F5', color: '#D4688A' },
  'Resorts':           { bg: '#FFF8E6', color: '#D4A017' },
  'Sports':            { bg: '#FFF0EC', color: '#E8845A' },
}

// ── Guardians of the Galaxy: Cosmic Rewind ────────────────────────────────
export const GUARDIANS_EXPERIENCE_ID = '546764b8-1d69-416c-81f4-93db335a851e'
export const GUARDIANS_CHALLENGE_ID  = 'ac79e3ac-df2a-44db-b001-351d72e4bd78'

export const CATEGORIES = [
  'All',
  'Attractions',
  'Entertainment',
  'Dining',
  'Characters',
  'Events & Tours',
]
