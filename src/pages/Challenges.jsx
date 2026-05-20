import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabaseClient'
import { PARK_COLORS } from '../lib/constants'
import {
  Popcorn, Rocket, Mountain, Globe, Trophy,
  Zap, Star, Flame, Target, Crown, Compass,
  Map, Shield, Sword,
} from 'lucide-react'

// ── Emoji → Lucide icon map ────────────────────────────────────────────────
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

function ChallengeIcon({ icon, color, size = 22 }) {
  const LucideIcon = EMOJI_ICON_MAP[icon] ?? Trophy
  return <LucideIcon size={size} color={color} strokeWidth={1.5} />
}

// ── Small progress ring ────────────────────────────────────────────────────
function MiniRing({ pct, size = 56 }) {
  const cx  = size / 2
  const r   = size / 2 - 6
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - pct / 100)
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={cx} cy={cx} r={r} fill="none" stroke="#E5E7EB" strokeWidth={5} />
        <circle cx={cx} cy={cx} r={r} fill="none" stroke="#1D9E75" strokeWidth={5}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-xs font-bold text-gray-800">{pct}%</p>
      </div>
    </div>
  )
}

export default function Challenges() {
  const { user }  = useAuth()
  const navigate  = useNavigate()
  const [challenges, setChallenges] = useState([])
  const [loading,    setLoading]    = useState(true)

  useEffect(() => {
    ;(async () => {
      setLoading(true)

      const [{ data: chs }, { data: allItems }, { data: userItems }] = await Promise.all([
        supabase.from('challenges').select('*').eq('is_active', true).order('created_at'),
        supabase.from('challenge_items').select('id, challenge_id'),
        supabase.from('user_challenge_items').select('challenge_item_id')
          .eq('user_id', user.id).eq('completed', true),
      ])

      const completedSet = new Set((userItems || []).map(u => u.challenge_item_id))

      // Group items by challenge
      const byChallenge = {}
      ;(allItems || []).forEach(item => {
        if (!byChallenge[item.challenge_id]) byChallenge[item.challenge_id] = []
        byChallenge[item.challenge_id].push(item.id)
      })

      const enriched = (chs || []).map(ch => {
        const ids   = byChallenge[ch.id] || []
        const total = ids.length
        const done  = ids.filter(id => completedSet.has(id)).length
        return { ...ch, total, done, isComplete: total > 0 && done === total }
      })

      setChallenges(enriched)
      setLoading(false)
    })()
  }, [user.id])

  const inProgress = challenges.filter(c => !c.isComplete)
  const completed  = challenges.filter(c =>  c.isComplete)

  // Overall stats
  const totalChAll = challenges.reduce((s, c) => s + c.total, 0)
  const doneChAll  = challenges.reduce((s, c) => s + c.done,  0)
  const overallPct = totalChAll > 0 ? Math.round((doneChAll / totalChAll) * 100) : 0
  const completedChallenges = completed.length

  return (
    <div className="flex flex-col min-h-full">

      {/* ── Top bar ── */}
      <div className="px-4 pt-4 pb-3">
        <h2 className="text-xl font-bold text-gray-900">Challenges</h2>
        <p className="text-xs text-gray-400 mt-0.5">
          {completedChallenges} of {challenges.length} completed
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <p className="text-gray-400 text-sm">Loading…</p>
        </div>
      ) : challenges.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="px-4 flex flex-col gap-4 pb-8">

          {/* ── Progress summary card ── */}
          <div className="bg-white rounded-2xl px-4 py-3.5 shadow-sm border border-gray-100 flex items-center gap-4">
            <MiniRing pct={overallPct} />
            <div>
              <p className="text-sm font-bold text-gray-800">
                <span style={{ color: '#1D9E75' }}>{overallPct}%</span> of challenges done
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {challenges.length - completedChallenges > 0
                  ? `${challenges.length - completedChallenges} more to go — keep going!`
                  : 'All challenges complete! 🎉'}
              </p>
            </div>
          </div>

          {/* ── In progress ── */}
          {inProgress.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">In progress</p>
              <div className="flex flex-col gap-2.5">
                {inProgress.map(ch => (
                  <ChallengeCard key={ch.id} challenge={ch} onTap={() => navigate(`/challenges/${ch.id}`)} />
                ))}
              </div>
            </div>
          )}

          {/* ── Completed ── */}
          {completed.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Completed</p>
              <div className="flex flex-col gap-2.5">
                {completed.map(ch => (
                  <ChallengeCard key={ch.id} challenge={ch} onTap={() => navigate(`/challenges/${ch.id}`)} />
                ))}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  )
}

function ChallengeCard({ challenge, onTap }) {
  const { icon, title, park, total, done, isComplete } = challenge
  const pct    = total > 0 ? Math.round((done / total) * 100) : 0
  const colors = park ? (PARK_COLORS[park] ?? { bg: '#FEF3C7', color: '#D97706' })
                      :                      { bg: '#FEF3C7', color: '#D97706' }

  return (
    <button
      onClick={onTap}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden text-left w-full active:scale-[0.98] transition-transform"
    >
      {/* Completed banner */}
      {isComplete && (
        <div className="w-full py-1.5 flex items-center justify-center gap-1.5"
             style={{ backgroundColor: '#D1FAE5' }}>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="#059669" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          <p className="text-xs font-bold" style={{ color: '#059669' }}>Completed</p>
        </div>
      )}

      <div className="px-4 py-3.5 flex items-center gap-3">
        {/* Icon */}
        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
             style={{ backgroundColor: colors.bg }}>
          <ChallengeIcon icon={icon} color={colors.color} />
        </div>

        {/* Title + bar */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-gray-800 leading-snug">{title}</p>
          {park && <p className="text-xs text-gray-400 mt-0.5">{park}</p>}
          {total > 0 && (
            <div className="mt-2 h-1.5 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${pct}%`,
                  backgroundColor: isComplete ? '#1D9E75' : '#F59E0B',
                }}
              />
            </div>
          )}
        </div>

        {/* Fraction */}
        {total > 0 && (
          <div className="flex-shrink-0 text-right">
            <p className="text-sm font-bold" style={{ color: isComplete ? '#1D9E75' : '#F59E0B' }}>
              {done}/{total}
            </p>
          </div>
        )}
      </div>
    </button>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-4 px-6 py-16">
      <span className="text-5xl">🏆</span>
      <div className="text-center">
        <p className="text-gray-700 font-semibold text-base">No challenges yet</p>
        <p className="text-gray-400 text-sm mt-1 leading-relaxed">Check back soon!</p>
      </div>
    </div>
  )
}
