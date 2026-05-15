import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabaseClient'
import { PARK_COLORS, GUARDIANS_CHALLENGE_ID } from '../lib/constants'

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

    // Optimistic update
    setUserItemMap(prev => ({ ...prev, [itemId]: { ...(prev[itemId] ?? {}), completed: next } }))

    const { error } = await supabase
      .from('user_challenge_items')
      .upsert(
        { user_id: user.id, challenge_item_id: itemId, completed: next },
        { onConflict: 'user_id,challenge_item_id' }
      )

    if (error) {
      // Revert on failure
      setUserItemMap(prev => ({ ...prev, [itemId]: { ...(prev[itemId] ?? {}), completed: current } }))
      console.error('Save error:', error)
    }
  }

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

  const colors = challenge.park
    ? (PARK_COLORS[challenge.park] ?? { bg: '#FEF3C7', color: '#D97706' })
    : { bg: '#FEF3C7', color: '#D97706' }

  const checklistLabel = challenge.checklist_label || 'Checklist'

  return (
    <div className="flex flex-col bg-gray-50 min-h-full">

      {/* ── Top bar ── */}
      <div className="flex items-center px-3 pt-3 pb-2 bg-white border-b border-gray-100 sticky top-0 z-10">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 flex items-center justify-center rounded-full active:bg-gray-100 transition-colors"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <p className="ml-1 text-base font-bold text-gray-900 truncate flex-1">{challenge.title}</p>
      </div>

      <div className="flex flex-col gap-4 px-4 py-4 pb-8">

        {/* ── Hero card ── */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">

          {/* Completed banner */}
          {isComplete && (
            <div className="-mx-4 -mt-4 mb-4 py-2 flex items-center justify-center gap-1.5 rounded-t-2xl"
                 style={{ backgroundColor: '#D1FAE5' }}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="#059669" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <p className="text-sm font-bold" style={{ color: '#059669' }}>Challenge Complete!</p>
            </div>
          )}

          {/* Icon + title */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                 style={{ backgroundColor: colors.bg }}>
              {challenge.icon || '🏆'}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-bold text-gray-900 leading-tight">{challenge.title}</h1>
              {challenge.park && (
                <p className="text-xs text-gray-400 mt-0.5">{challenge.park}</p>
              )}
            </div>
          </div>

          {/* Progress bar */}
          {totalCount > 0 && (
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-xs text-gray-400">{doneCount} of {totalCount} completed</p>
                <p className="text-xs font-bold" style={{ color: isComplete ? '#1D9E75' : '#F59E0B' }}>
                  {pct}%
                </p>
              </div>
              <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: isComplete ? '#1D9E75' : '#F59E0B',
                  }}
                />
              </div>
            </div>
          )}

          {/* Description */}
          {challenge.description && (
            <>
              <div className="border-t border-gray-100 my-3" />
              <p className="text-sm text-gray-500 leading-relaxed">{challenge.description}</p>
            </>
          )}
        </div>

        {/* ── Checklist ── */}
        {items.length > 0 && (
          <>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
              {checklistLabel}
            </p>

            {isTrackerDriven && (
              <p className="text-xs text-gray-400 px-1 -mt-2">
                Collected automatically when you log rides in the Tracker.
              </p>
            )}

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {items.map((item, idx) => {
                const done = userItemMap[item.id]?.completed ?? false
                return (
                  <div key={item.id}>
                    {idx > 0 && <div className="h-px bg-gray-100 mx-4" />}
                    <button
                      onClick={() => !isTrackerDriven && toggleItem(item.id)}
                      disabled={isTrackerDriven}
                      className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors ${isTrackerDriven ? 'cursor-default' : 'active:bg-gray-50'}`}
                    >
                      {/* Circle toggle */}
                      <div
                        className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center transition-colors"
                        style={{
                          backgroundColor: done ? '#1D9E75' : 'transparent',
                          border: done ? 'none' : '2px solid #D1D5DB',
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
                        <p className={`text-sm font-medium leading-tight transition-colors ${
                          done ? 'line-through text-gray-400' : 'text-gray-800'
                        }`}>
                          {item.title}
                        </p>
                        {item.subtitle && (
                          <p className={`text-xs mt-0.5 ${done ? 'text-gray-300' : 'text-gray-400'}`}>
                            {item.subtitle}
                          </p>
                        )}
                      </div>
                    </button>
                  </div>
                )
              })}
            </div>
          </>
        )}

      </div>
    </div>
  )
}
