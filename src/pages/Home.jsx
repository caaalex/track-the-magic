import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useLogVisit } from '../contexts/LogVisitContext'
import { supabase } from '../lib/supabaseClient'
import { PARKS, PARK_EMOJI, PARK_COLORS } from '../lib/constants'

// ── Circular progress ring ─────────────────────────────────────────────────
function ProgressRing({ completed, total }) {
  const size   = 80
  const cx     = size / 2
  const r      = 28
  const stroke = 6
  const circumference = 2 * Math.PI * r
  const pct    = total > 0 ? completed / total : 0
  const offset = circumference * (1 - pct)

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        {/* Track */}
        <circle
          cx={cx} cy={cx} r={r}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={stroke}
        />
        {/* Progress */}
        <circle
          cx={cx} cy={cx} r={r}
          fill="none"
          stroke="#1D9E75"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center rotate-0">
        <p className="text-base font-bold text-gray-900 leading-none">{completed}</p>
        <p className="text-[10px] text-gray-400 leading-tight">of {total}</p>
      </div>
    </div>
  )
}

// ── User initials avatar ───────────────────────────────────────────────────
function Avatar({ user }) {
  const name    = user?.user_metadata?.full_name ?? user?.email ?? ''
  const parts   = name.trim().split(/\s+/)
  const initials = parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : name.slice(0, 2).toUpperCase()

  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
      style={{ backgroundColor: '#5B21B6' }}
    >
      {initials}
    </div>
  )
}

// ── Main screen ────────────────────────────────────────────────────────────
export default function Home() {
  const { user }         = useAuth()
  const { openLogVisit } = useLogVisit()
  const navigate         = useNavigate()

  const [allExps,       setAllExps]       = useState([])   // { id, park }
  const [completedIds,  setCompletedIds]  = useState(new Set())
  const [leaderboard,   setLeaderboard]   = useState(null) // { percentile, active_trackers }
  const [loading,       setLoading]       = useState(true)

  useEffect(() => {
    ;(async () => {
      setLoading(true)

      const [{ data: exps }, { data: ues }, { data: lb }] = await Promise.all([
        supabase
          .from('experiences')
          .select('id, park')
          .eq('is_active', true),
        supabase
          .from('user_experiences')
          .select('experience_id')
          .eq('user_id', user.id)
          .eq('completed', true),
        supabase.rpc('get_home_stats', { p_user_id: user.id }),
      ])

      setAllExps(exps || [])
      setCompletedIds(new Set((ues || []).map(u => u.experience_id)))
      if (lb?.[0]) setLeaderboard(lb[0])

      setLoading(false)
    })()
  }, [user.id])

  // ── Derived stats ──────────────────────────────────────────────────────
  const totalAll     = allExps.length
  const completedAll = completedIds.size
  const pctAll       = totalAll > 0 ? Math.round((completedAll / totalAll) * 100) : 0

  // Per-park
  const parkStats = PARKS.map(park => {
    const parkExps      = allExps.filter(e => e.park === park.name)
    const parkTotal     = parkExps.length
    const parkCompleted = parkExps.filter(e => completedIds.has(e.id)).length
    const parkPct       = parkTotal > 0 ? Math.round((parkCompleted / parkTotal) * 100) : 0
    return { ...park, total: parkTotal, completed: parkCompleted, pct: parkPct }
  })

  return (
    <div className="flex flex-col min-h-full">

      {/* ── Top bar ── */}
      <div className="px-4 pt-4 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <h1 className="text-lg font-bold text-gray-900 tracking-tight">track the magic</h1>
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#1D9E75' }} />
        </div>
        <button onClick={() => navigate('/profile')} className="active:opacity-70 transition-opacity">
          <Avatar user={user} />
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <p className="text-gray-400 text-sm">Loading…</p>
        </div>
      ) : (
        <div className="px-4 flex flex-col gap-5 pb-8">

          {/* ── Master progress card ── */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <ProgressRing completed={completedAll} total={totalAll} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 leading-snug">
                  You've done{' '}
                  <span style={{ color: '#1D9E75' }}>{completedAll}</span>{' '}
                  experience{completedAll !== 1 ? 's' : ''} —{' '}
                  <span style={{ color: '#1D9E75' }}>{pctAll}%</span>{' '}
                  of all Disney World!
                </p>
                <button
                  onClick={openLogVisit}
                  className="mt-3 flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-xs font-bold active:scale-95 transition-transform"
                  style={{ backgroundColor: '#1D9E75' }}
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Log a visit
                </button>
              </div>
            </div>
          </div>

          {/* ── Your ranking ── */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Your ranking</p>
            <div className="bg-white rounded-2xl px-4 py-3.5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                {/* Trophy icon */}
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                     style={{ backgroundColor: '#FEF3C7' }}>
                  🏆
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-800">
                    Top {leaderboard?.percentile ?? 1}% of all users
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {leaderboard
                      ? `${leaderboard.active_trackers} active tracker${leaderboard.active_trackers !== 1 ? 's' : ''} this month`
                      : 'Ranking across all Disney trackers'}
                  </p>
                </div>
                <p className="text-2xl font-bold flex-shrink-0" style={{ color: '#D97706' }}>
                  {leaderboard?.percentile ?? 1}%
                </p>
              </div>
            </div>
          </div>

          {/* ── Parks progress ── */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Parks progress</p>
            <div className="flex flex-col gap-2.5">
              {parkStats.map(park => (
                <ParkCard
                  key={park.name}
                  park={park}
                  onTap={() => navigate('/tracker', { state: { park: park.name } })}
                />
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  )
}

function ParkCard({ park, onTap }) {
  const colors = PARK_COLORS[park.name] ?? { bg: '#F3F4F6', color: '#374151' }
  const emoji  = PARK_EMOJI[park.name] ?? '🏞️'

  return (
    <button
      onClick={onTap}
      className="bg-white rounded-2xl px-4 py-3.5 shadow-sm border border-gray-100 flex items-center gap-3 text-left w-full active:scale-[0.98] transition-transform"
    >
      {/* Park icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
        style={{ backgroundColor: colors.bg }}
      >
        {emoji}
      </div>

      {/* Name + progress bar */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800 truncate">{park.name}</p>
        <p className="text-xs text-gray-400 mt-0.5">{park.completed} of {park.total} experiences</p>
        <div className="mt-1.5 h-1.5 rounded-full bg-gray-100 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${park.pct}%`, backgroundColor: '#1D9E75' }}
          />
        </div>
      </div>

      {/* Percentage */}
      <p className="text-sm font-bold flex-shrink-0" style={{ color: '#1D9E75' }}>
        {park.pct}%
      </p>
    </button>
  )
}
