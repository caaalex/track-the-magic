import {
  Popcorn, Rocket, Mountain, Globe, Trophy,
  Zap, Star, Flame, Target, Crown, Compass,
  Map, Shield, Sword,
} from 'lucide-react'

// ── Emoji → Lucide icon map ────────────────────────────────────────────────
// Challenge icons are stored as emoji strings in the DB; this maps them to
// the app's Lucide icon system.
const EMOJI_ICON_MAP = {
  '🍿': Popcorn,
  '🚀': Rocket,
  '🏔️': Mountain,
  '⛰️': Mountain,
  '🌍': Globe,
  '🌎': Globe,
  '🌏': Globe,
  '🏆': Trophy,
  '⚡': Zap,
  '⭐': Star,
  '🌟': Star,
  '🔥': Flame,
  '🎯': Target,
  '👑': Crown,
  '🧭': Compass,
  '🗺️': Map,
  '🛡️': Shield,
  '⚔️': Sword,
}

export default function ChallengeIcon({ icon, color, size = 22 }) {
  const LucideIcon = EMOJI_ICON_MAP[icon] ?? Trophy
  return <LucideIcon size={size} color={color} strokeWidth={1.5} />
}
