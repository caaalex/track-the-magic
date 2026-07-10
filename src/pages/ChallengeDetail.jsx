import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabaseClient'
import { GUARDIANS_CHALLENGE_ID } from '../lib/constants'
import ChallengeIcon from '../lib/ChallengeIcon'
import { useReveal } from '../lib/useReveal'
import { celebrate } from '../lib/celebrate'

export default function ChallengeDetail() {
  const { id }   = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [challenge,    setChallenge]    = useState(null)
  const [items,        setItems]        = useState([])
  const [userItemMap,  setUserItemMap]  = useState({}) // challenge_item_id → { completed }
  const [loading,      setLoading]      = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)

      const [{ data: ch, error: chErr }, { data: rawItems }] = await Promise.all([
        supabase.from('challenges').select('*').eq('id', id).single(),
        supabase.from('challenge_items').select('*').eq('challenge_id', id).order('sort_order'),
      ])

      if (cancelled) return
      if (chErr || !ch) { navigate('/challenges'); return }

      setChallenge(ch)

      const sortedItems = rawItems || []
      setItems(sortedItems)

      if (sortedItems.length > 0) {
        const { data: userItems } = await supabase
          .from('user_challenge_items')
          .select('challenge_item_id, completed')
          .eq('user_id', user.id)
          .in('challenge_item_id', sortedItems.map(i => i.id))

        if (!cancelled) {
          const map = {}
          ;(userItems || []).forEach(u => { map[u.challenge_item_id] = u })
          setUserItemMap(map)
        }
      }

      if (!cancelled) setLoading(false)
    })()
    return () => { cancelled = true }
  }, [id, user.id, navigate])

  const toggleItem = async (itemId) => {
    const current  = userItemMap[itemId]?.completed ?? false
    const next     = !current

    // Would checking this item complete the whole challenge?
    const doneBefore = items.filter(i => userItemMap[i.id]?.completed).length
    const justCompleted = next && items.length > 0 && doneBefore + 1 === items.length

    // Optimistic update
    setUserItemMap(prev => ({ ...prev, [itemId]: { ...(prev[itemId] ?? {}), completed: next } }))

    const { error } = await supabase
      .from('user_challenge_items')
      .upsert(
        { user_id: user.id, challenge_item_id: itemId, completed: next },
        { onConflict: 'user_id,challenge_item_id' }
      )

    if (error) {
      setUserItemMap(prev => ({ ...prev, [itemId]: { ...(prev[itemId] ?? {}), completed: current } }))
      console.error('Save error:', error)
      return
    }

    // 🎉 Celebrate when the final item completes the challenge
    if (justCompleted) celebrate()

    // ── Sync linked experience if any ──────────────────────────────────────
    const expId = items.find(i => i.id === itemId)?.experience_id
    if (expId) {
      const today = new Date().toISOString().split('T')[0]

      if (next) {
        // Fetch existing record to preserve / increment times_visited
        const { data: existing } = await supabase
          .from('user_experiences')
          .select('completed, times_visited')
          .eq('user_id', user.id)
          .eq('experience_id', expId)
          .maybeSingle()

        const alreadyDone = existing?.completed ?? false
        const visits = alreadyDone
          ? (existing?.times_visited ?? 1)
          : (existing?.times_visited ?? 0) + 1

        await supabase
          .from('user_experiences')
          .upsert(
            { user_id: user.id, experience_id: expId, completed: true, times_visited: visits, last_visited_date: today },
            { onConflict: 'user_id,experience_id' }
          )
      } else {
        await supabase
          .from('user_experiences')
          .upsert(
            { user_id: user.id, experience_id: expId, completed: false, times_visited: 0, last_visited_date: null },
            { onConflict: 'user_id,experience_id' }
          )
      }
    }
  }

  const reveal = useReveal(!loading)

  if (loading) return (
    <div className="flex items-center justify-center flex-1 py-20">
      <p className="text-gray-400 text-sm">Loading…</p>
    </div>
  )
  if (!challenge) return null

  const isTrackerDriven = id === GUARDIANS_CHALLENGE_ID

  const doneCount  = items.filter(i => userItemMap[i.id]?.completed).length
  const totalCount = items.length
  const pct        = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0
  const isComplete = totalCount > 0 && doneCount === totalCount

  const checklistLabel = challenge.checklist_label || 'Checklist'

  return (
    <div className="flex flex-col min-h-full">

      {/* ── Top bar ── */}
      <div
        className="flex items-center px-4 pt-4 pb-3 sticky top-0 z-10"
        style={{
          background: 'rgba(250,250,249,0.92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid #E7E5E0',
        }}
      >
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 -ml-2 flex items-center justify-center rounded-full active:opacity-60 transition-opacity"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <p className="ml-1 text-base font-bold text-gray-900 truncate flex-1">{challenge.title}</p>
      </div>

      <div className="px-4 pt-4 pb-8">

        {/* ── Hero ── */}
        <div className="flex items-center gap-2">
          <ChallengeIcon icon={challenge.icon} color="#78716C" size={16} />
          <p className="text-sm text-gray-400">{challenge.park ?? 'All parks'}</p>
        </div>
        <p
          className="text-gray-900 tabular-nums leading-tight"
          style={{ fontSize: 40, fontWeight: 300, letterSpacing: '-0.02em' }}
        >
          {Math.round(doneCount * reveal)}{' '}
          <span className="text-base font-normal text-gray-300">/ {totalCount}</span>
        </p>
        <div className="mt-3 rounded-full overflow-hidden" style={{ height: 2, backgroundColor: '#ECEAE5' }}>
          <div
            className="h-full rounded-full"
            style={{
              width: `${pct * reveal}%`,
              backgroundColor: '#1D9E75',
            }}
          />
        </div>
        <p className="text-sm mt-2" style={{ color: (reveal >= 1 && isComplete) ? '#1D9E75' : '#A8A29E' }}>
          {reveal >= 1 && isComplete ? 'Challenge complete' : `${Math.round(pct * reveal)}% done`}
        </p>

        {/* ── Description ── */}
        {challenge.description && (
          <div className="mt-5 pt-4" style={{ borderTop: '1px solid #E7E5E0' }}>
            <p className="text-sm text-gray-500 leading-relaxed">{challenge.description}</p>
          </div>
        )}

        {/* ── Checklist ── */}
        {items.length > 0 && (
          <div className="mt-5 pt-4" style={{ borderTop: '1px solid #E7E5E0' }}>
            <p className="text-[12px] font-semibold text-gray-400 uppercase tracking-[0.12em]">
              {checklistLabel}
            </p>

            {isTrackerDriven && (
              <p className="text-xs text-gray-400 mt-1.5">
                Collected automatically when you log rides in the Tracker.
              </p>
            )}

            <div>
              {items.map((item, idx) => {
                const done = userItemMap[item.id]?.completed ?? false
                return (
                  <button
                    key={item.id}
                    onClick={() => !isTrackerDriven && toggleItem(item.id)}
                    disabled={isTrackerDriven}
                    className={`w-full flex items-center gap-3 py-3.5 text-left ${isTrackerDriven ? 'cursor-default' : 'active:opacity-60'}`}
                    style={{
                      borderBottom: idx < items.length - 1 ? '1px solid #EDEBE6' : 'none',
                      transition: 'opacity 0.2s ease',
                    }}
                  >
                    {/* Circle toggle */}
                    <div
                      className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center transition-colors"
                      style={{
                        backgroundColor: done ? '#1D9E75' : 'transparent',
                        border: done ? 'none' : '1.5px solid #D6D3D1',
                      }}
                    >
                      {done && (
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      )}
                    </div>

                    {/* Title + subtitle */}
                    <div className="flex-1 min-w-0">
                      <p className={`text-[14px] leading-tight transition-colors ${
                        done ? 'line-through text-gray-400' : 'text-gray-900'
                      }`}>
                        {item.title}
                      </p>
                      {item.subtitle && (
                        <p className={`text-[12px] mt-0.5 ${done ? 'text-gray-300' : 'text-gray-400'}`}>
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
