import {
  Castle,
  Globe,
  Film,
  TreeDeciduous,
  Waves,
  Snowflake,
  Handbag,
  Hotel,
  Volleyball,
} from 'lucide-react'

const PARK_ICONS = {
  'Magic Kingdom':     Castle,
  'Epcot':             Globe,
  'Hollywood Studios': Film,
  'Animal Kingdom':    TreeDeciduous,
  'Typhoon Lagoon':    Waves,
  'Blizzard Beach':    Snowflake,
  'Disney Springs':    Handbag,
  'Resorts':           Hotel,
  'Sports':            Volleyball,
}

export default function ParkIcon({ park, size = 24, color = 'currentColor' }) {
  const Icon = PARK_ICONS[park]
  if (!Icon) return null
  return <Icon size={size} color={color} strokeWidth={1.5} />
}
