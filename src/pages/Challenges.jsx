import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabaseClient'
import Avatar from '../components/Avatar'
import ChallengeIcon from '../lib/ChallengeIcon'
import { Trophy } from 'lucide-react'

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
  const completedChallenges = completed.length
  const challengesPct = challenges.length > 0 ? Math.round((completedChallenges / challenges.length) * 100) : 0

  return (
    <div className="flex flex-col min-h-full">

      {/* ── Top bar ── */}
      <div className="px-4 pt-5 pb-3 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Challenges</h2>
        <button onClick={() => navigate('/profile')} className="active:opacity-70">
          <Avatar user={user} />
        </button>
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : challenges.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="px-4 pb-8">

          {/* ── Hero ── */}
          <div className="pt-1">
            <p className="text-sm text-gray-400">Challenges completed</p>
            <p
              className="text-gray-900 tabular-nums leading-tight"
              style={{ fontSize: 40, fontWeight: 300, letterSpacing: '-0.02em' }}
            >
              {completedChallenges}{' '}
              <span className="text-base font-normal text-gray-300">/ {challenges.length}</span>
            </p>
            <div className="mt-3 rounded-full overflow-hidden" style={{ height: 2, backgroundColor: '#ECEAE5' }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${challengesPct}%`,
                  backgroundColor: '#1D9E75',
                  transition: 'width 0.8s cubic-bezier(0.32,0.72,0,1)',
                }}
              />
            </div>
            <p className="mt-2 text-sm text-gray-400">{challengesPct}% of all challenges</p>
          </div>

          {/* ── In progress ── */}
          {inProgress.length > 0 && (
            <div className="mt-6 pt-4" style={{ borderTop: '1px solid #E7E5E0' }}>
              <p className="text-[12px] font-semibold text-gray-400 uppercase tracking-[0.12em]">
                In progress
              </p>
              <div>
                {inProgress.map((ch, i) => (
                  <ChallengeRow
                    key={ch.id}
                    challenge={ch}
                    last={i === inProgress.length - 1}
                    onTap={() => navigate(`/challenges/${ch.id}`)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ── Completed ── */}
          {completed.length > 0 && (
            <div className="mt-5 pt-4" style={{ borderTop: '1px solid #E7E5E0' }}>
              <p className="text-[12px] font-semibold text-gray-400 uppercase tracking-[0.12em]">
                Completed
              </p>
              <div>
                {completed.map((ch, i) => (
                  <ChallengeRow
                    key={ch.id}
                    challenge={ch}
                    last={i === completed.length - 1}
                    onTap={() => navigate(`/challenges/${ch.id}`)}
                  />
                ))}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  )
}

function ChallengeRow({ challenge, onTap, last }) {
  const { icon, title, park, total, done, isComplete } = challenge
  const pct = total > 0 ? Math.round((done / total) * 100) : 0

  return (
    <button
      onClick={onTap}
      className="w-full flex items-center gap-3 py-3.5 text-left active:opacity-60"
      style={{
        borderBottom: last ? 'none' : '1px solid #EDEBE6',
        transition: 'opacity 0.2s ease',
      }}
    >
      <ChallengeIcon icon={icon} color="#78716C" size={18} />
      <div className="flex-1 min-w-0">
        <p className="text-[14px] text-gray-900 leading-snug">{title}</p>
        {park && <p className="text-[11px] text-gray-400 mt-0.5">{park}</p>}
        {total > 0 && (
          <div className="mt-2 overflow-hidden" style={{ height: 1.5, backgroundColor: '#ECEAE5' }}>
            <div
              className="h-full"
              style={{
                width: `${pct}%`,
                backgroundColor: '#1D9E75',
                transition: 'width 0.5s cubic-bezier(0.32,0.72,0,1)',
              }}
            />
          </div>
        )}
      </div>
      {isComplete ? (
        <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="#1D9E75" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      ) : total > 0 ? (
        <span className="text-xs text-gray-400 tabular-nums flex-shrink-0">{done}/{total}</span>
      ) : null}
    </button>
  )
}

function LoadingSkeleton() {
  return (
    <div className="px-4 pt-2 pb-8 animate-pulse">
      <div className="h-3 rounded-full bg-gray-100 w-40" />
      <div className="h-10 rounded-lg bg-gray-100 w-32 mt-3" />
      <div className="h-0.5 bg-gray-100 w-full mt-4" />
      <div className="mt-10 flex flex-col gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-md bg-gray-100 flex-shrink-0" />
            <div className="flex-1 flex flex-col gap-2">
              <div className="h-3 rounded-full bg-gray-100 w-2/3" />
              <div className="h-0.5 bg-gray-100 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-3 px-6 py-16">
      <Trophy size={26} color="#C5C1BB" strokeWidth={1.5} />
      <div className="text-center">
        <p className="text-gray-700 font-semibold text-base">No challenges yet</p>
        <p className="text-gray-400 text-[13px] mt-1 leading-relaxed">Check back soon!</p>
      </div>
    </div>
  )
}
