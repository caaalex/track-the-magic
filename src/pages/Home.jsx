import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useLogVisit } from '../contexts/LogVisitContext'
import { supabase } from '../lib/supabaseClient'
import { PARKS } from '../lib/constants'
import ParkIcon from '../lib/ParkIcon'
import { Trophy, ArrowRight } from 'lucide-react'
import Avatar from '../components/Avatar'
import Onboarding from './Onboarding'

const ONBOARDING_KEY = 'ttm_onboarded'

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
        <h1 className="text-xl font-bold text-gray-900">
          Track the Magic
        </h1>
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
        <div className="px-4 pb-4">

          {/* ── Hero: experiences completed ── */}
          <div className="pt-4">
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-400">Experiences completed</p>
              <button
                onClick={openLogVisit}
                className="flex items-center gap-1.5 text-[13px] font-semibold active:opacity-60"
                style={{ color: '#1D9E75', transition: 'opacity 0.2s ease' }}
              >
                Log a visit
                <ArrowRight size={14} strokeWidth={2} />
              </button>
            </div>
            <p
              className="text-gray-900 tabular-nums leading-tight"
              style={{ fontSize: 48, fontWeight: 300, letterSpacing: '-0.02em' }}
            >
              {completedAll}{' '}
              <span className="text-base font-normal text-gray-300">/ {totalAll}</span>
            </p>
            <div className="mt-3 rounded-full overflow-hidden" style={{ height: 2, backgroundColor: '#ECEAE5' }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${pctAll}%`,
                  backgroundColor: '#1D9E75',
                  transition: 'width 0.8s cubic-bezier(0.32,0.72,0,1)',
                }}
              />
            </div>
            <p className="mt-2 text-xs text-gray-400">{pctAll}% of all Disney World</p>
          </div>

          {/* ── Ranking row ── */}
          <div className="mt-6 pt-4 flex items-center gap-3" style={{ borderTop: '1px solid #E7E5E0' }}>
            <Trophy size={16} color="#A8A29E" strokeWidth={1.5} />
            <p className="flex-1 text-[13px] text-gray-500">
              Top {leaderboard?.percentile ?? 1}% of all users
            </p>
            <p className="text-[13px] font-semibold text-gray-900 tabular-nums">
              {leaderboard?.percentile ?? 1}%
            </p>
          </div>

          {/* ── Parks ── */}
          <div className="mt-5 pt-4" style={{ borderTop: '1px solid #E7E5E0' }}>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.12em]">
              Parks
            </p>
            <div>
              {parkStats.map((park, i) => (
                <button
                  key={park.name}
                  onClick={() => navigate('/tracker', { state: { park: park.name } })}
                  className="w-full flex items-center gap-3 py-3.5 text-left active:opacity-60"
                  style={{
                    borderBottom: i < parkStats.length - 1 ? '1px solid #EDEBE6' : 'none',
                    transition: 'opacity 0.2s ease',
                  }}
                >
                  <ParkIcon park={park.name} size={18} color="#78716C" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] text-gray-900">{park.name}</p>
                    <div className="mt-2 overflow-hidden" style={{ height: 1.5, backgroundColor: '#ECEAE5' }}>
                      <div
                        className="h-full"
                        style={{
                          width: `${park.pct}%`,
                          backgroundColor: '#1D9E75',
                          transition: 'width 0.8s cubic-bezier(0.32,0.72,0,1)',
                        }}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 tabular-nums flex-shrink-0">{park.pct}%</p>
                </button>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  )
}

// ── Loading skeleton ──────────────────────────────────────────────────────
function LoadingSkeleton() {
  return (
    <div className="px-4 pt-4 pb-4 animate-pulse">
      <div className="h-3 rounded-full bg-gray-100 w-36" />
      <div className="h-12 rounded-lg bg-gray-100 w-40 mt-3" />
      <div className="h-0.5 bg-gray-100 w-full mt-4" />
      <div className="h-3 rounded-full bg-gray-100 w-32 mt-3" />
      <div className="h-4 rounded-full bg-gray-100 w-24 mt-6" />
      <div className="mt-8 flex flex-col gap-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-md bg-gray-100 flex-shrink-0" />
            <div className="flex-1 flex flex-col gap-2">
              <div className="h-3 rounded-full bg-gray-100 w-1/2" />
              <div className="h-0.5 bg-gray-100 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
