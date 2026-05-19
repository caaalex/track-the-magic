import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useLogVisit } from '../contexts/LogVisitContext'
import { supabase } from '../lib/supabaseClient'
import { PARKS, PARK_EMOJI, PARK_COLORS } from '../lib/constants'
import Onboarding from './Onboarding'

const ONBOARDING_KEY = 'ttm_onboarded'

// ── Circular progress ring ────────────────────────────────────────────────
function ProgressRing({ completed, total }) {
  const size        = 88
  const cx          = size / 2
  const r           = 32
  const stroke      = 7
  const circumference = 2 * Math.PI * r
  const pct         = total > 0 ? completed / total : 0
  const offset      = circumference * (1 - pct)

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1D9E75" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>
        {/* Track */}
        <circle
          cx={cx} cy={cx} r={r}
          fill="none"
          stroke="#E8E5E0"
          strokeWidth={stroke}
          transform={`rotate(-90 ${cx} ${cx})`}
        />
        {/* Progress arc */}
        <circle
          cx={cx} cy={cx} r={r}
          fill="none"
          stroke="url(#ring-grad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${cx} ${cx})`}
          style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.32,0.72,0,1)' }}
        />
      </svg>
      {/* Center label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-lg font-bold text-stone-800 leading-none tabular-nums">{completed}</p>
        <p className="text-[9px] text-stone-400 font-medium leading-tight mt-0.5">of {total}</p>
      </div>
    </div>
  )
}

// ── User initials avatar ──────────────────────────────────────────────────
function Avatar({ user }) {
  const name     = user?.user_metadata?.full_name ?? user?.email ?? ''
  const parts    = name.trim().split(/\s+/)
  const initials = parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : name.slice(0, 2).toUpperCase()

  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
      style={{ background: 'linear-gradient(135deg, #1D9E75, #16a870)' }}
    >
      {initials}
    </div>
  )
}

// ── Section label ─────────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-[0.12em] mb-2.5">
      {children}
    </p>
  )
}

// ── Main screen ───────────────────────────────────────────────────────────
export default function Home() {
  const { user }         = useAuth()
  const { openLogVisit } = useLogVisit()
  const navigate         = useNavigate()

  const [showOnboarding, setShowOnboarding] = useState(() => !localStorage.getItem(ONBOARDING_KEY))
  const [allExps,        setAllExps]        = useState([])
  const [completedIds,   setCompletedIds]   = useState(new Set())
  const [leaderboard,    setLeaderboard]    = useState(null)
  const [loading,        setLoading]        = useState(true)

  const dismissOnboarding = () => {
    localStorage.setItem(ONBOARDING_KEY, '1')
    setShowOnboarding(false)
  }

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const [{ data: exps }, { data: ues }, { data: lb }] = await Promise.all([
        supabase.from('experiences').select('id, park').eq('is_active', true),
        supabase.from('user_experiences').select('experience_id').eq('user_id', user.id).eq('completed', true),
        supabase.rpc('get_home_stats', { p_user_id: user.id }),
      ])
      setAllExps(exps || [])
      setCompletedIds(new Set((ues || []).map(u => u.experience_id)))
      if (lb?.[0]) setLeaderboard(lb[0])
      setLoading(false)
    })()
  }, [user.id])

  // ── Derived stats ─────────────────────────────────────────────────────
  const totalAll     = allExps.length
  const completedAll = completedIds.size
  const pctAll       = totalAll > 0 ? Math.round((completedAll / totalAll) * 100) : 0

  const parkStats = PARKS.map(park => {
    const parkExps      = allExps.filter(e => e.park === park.name)
    const parkTotal     = parkExps.length
    const parkCompleted = parkExps.filter(e => completedIds.has(e.id)).length
    const parkPct       = parkTotal > 0 ? Math.round((parkCompleted / parkTotal) * 100) : 0
    return { ...park, total: parkTotal, completed: parkCompleted, pct: parkPct }
  })

  return (
    <div className="flex flex-col min-h-full">

      {showOnboarding && <Onboarding onDismiss={dismissOnboarding} />}

      {/* ── Top bar ── */}
      <div className="px-4 pt-5 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-[17px] font-bold text-stone-900 tracking-[-0.02em]">
            Track the Magic
          </h1>
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{
              backgroundColor: '#1D9E75',
              boxShadow: '0 0 0 3px rgba(29,158,117,0.18)',
            }}
          />
        </div>
        <button
          onClick={() => navigate('/profile')}
          className="active:opacity-70"
          style={{ transition: 'opacity 0.2s cubic-bezier(0.32,0.72,0,1)' }}
        >
          <Avatar user={user} />
        </button>
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : (
        <div className="px-4 flex flex-col gap-5 pb-4">

          {/* ── Master progress card (double-bezel) ── */}
          <div
            className="rounded-[1.375rem] p-[3px]"
            style={{
              background: 'linear-gradient(135deg, rgba(29,158,117,0.12) 0%, rgba(29,158,117,0.04) 100%)',
              boxShadow: '0 4px 20px rgba(29,158,117,0.10), 0 1px 3px rgba(0,0,0,0.04)',
            }}
          >
            <div
              className="bg-white rounded-[calc(1.375rem-3px)] p-4"
              style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,1)' }}
            >
              <div className="flex items-center gap-4">
                <ProgressRing completed={completedAll} total={totalAll} />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-stone-800 leading-snug">
                    You've done{' '}
                    <span style={{ color: '#1D9E75' }}>{completedAll}</span>{' '}
                    experience{completedAll !== 1 ? 's' : ''} —{' '}
                    <span style={{ color: '#1D9E75' }}>{pctAll}%</span>{' '}
                    of all Disney World
                  </p>
                  {/* Button-in-button CTA */}
                  <button
                    onClick={openLogVisit}
                    className="mt-3 flex items-center gap-2 pl-4 pr-1.5 py-1.5 rounded-full text-white text-xs font-bold active:scale-95"
                    style={{
                      backgroundColor: '#1D9E75',
                      boxShadow: '0 2px 8px rgba(29,158,117,0.30)',
                      transition: 'all 0.3s cubic-bezier(0.32,0.72,0,1)',
                    }}
                  >
                    Log a visit
                    <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── Your ranking ── */}
          <div>
            <SectionLabel>Your ranking</SectionLabel>
            <div
              className="bg-white rounded-2xl px-4 py-3.5"
              style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)' }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ backgroundColor: '#FEF3C7' }}
                >
                  🏆
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-bold text-stone-800">
                    Top {leaderboard?.percentile ?? 1}% of all users
                  </p>
                  <p className="text-[11px] text-stone-400 mt-0.5">
                    {leaderboard
                      ? `${leaderboard.active_trackers} active tracker${leaderboard.active_trackers !== 1 ? 's' : ''} this month`
                      : 'Ranking across all Disney trackers'}
                  </p>
                </div>
                <p
                  className="text-2xl font-bold flex-shrink-0 tabular-nums"
                  style={{ color: '#D97706' }}
                >
                  {leaderboard?.percentile ?? 1}%
                </p>
              </div>
            </div>
          </div>

          {/* ── Parks progress ── */}
          <div>
            <SectionLabel>Parks progress</SectionLabel>
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

// ── Park card ─────────────────────────────────────────────────────────────
function ParkCard({ park, onTap }) {
  const colors = PARK_COLORS[park.name] ?? { bg: '#F5F5F0', color: '#57534e' }
  const emoji  = PARK_EMOJI[park.name] ?? '🏞️'

  return (
    <button
      onClick={onTap}
      className="bg-white rounded-2xl px-4 py-3.5 flex items-center gap-3 text-left w-full active:scale-[0.98]"
      style={{
        boxShadow: '0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
        transition: 'transform 0.25s cubic-bezier(0.32,0.72,0,1)',
      }}
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
        <p className="text-[13px] font-semibold text-stone-800 truncate">{park.name}</p>
        <p className="text-[11px] text-stone-400 mt-0.5">
          {park.completed} of {park.total} experiences
        </p>
        <div className="mt-2 h-1 rounded-full bg-stone-100 overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${park.pct}%`,
              background: 'linear-gradient(90deg, #1D9E75, #34d399)',
              transition: 'width 0.8s cubic-bezier(0.32,0.72,0,1)',
            }}
          />
        </div>
      </div>

      {/* Percentage */}
      <p
        className="text-sm font-bold flex-shrink-0 tabular-nums"
        style={{ color: '#1D9E75' }}
      >
        {park.pct}%
      </p>
    </button>
  )
}

// ── Loading skeleton ──────────────────────────────────────────────────────
function LoadingSkeleton() {
  return (
    <div className="px-4 flex flex-col gap-5 pb-4 animate-pulse">
      {/* Progress card skeleton */}
      <div className="bg-white rounded-[1.375rem] p-4 h-[100px]"
           style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
        <div className="flex gap-4 items-center h-full">
          <div className="w-[88px] h-[88px] rounded-full bg-stone-100 flex-shrink-0" />
          <div className="flex-1 flex flex-col gap-2">
            <div className="h-3 rounded-full bg-stone-100 w-3/4" />
            <div className="h-3 rounded-full bg-stone-100 w-1/2" />
            <div className="h-8 rounded-full bg-stone-100 w-28 mt-1" />
          </div>
        </div>
      </div>
      {/* Ranking skeleton */}
      <div className="bg-white rounded-2xl px-4 py-3.5 h-16"
           style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }} />
      {/* Park cards skeletons */}
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white rounded-2xl px-4 py-3.5 h-[68px]"
             style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }} />
      ))}
    </div>
  )
}
