import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabaseClient'
import { PARKS, CATEGORIES, GUARDIANS_EXPERIENCE_ID } from '../lib/constants'

const STATUS_FILTERS = ['All', 'Done', 'Not done', 'Wishlist']

export default function Tracker() {
  const { user } = useAuth()
  const location = useLocation()
  const [selectedPark, setSelectedPark]       = useState(location.state?.park ?? PARKS[0].name)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedStatus, setSelectedStatus]   = useState('All')
  const [experiences, setExperiences]         = useState([])
  const [userExps, setUserExps]               = useState({}) // keyed by experience_id
  const [loading, setLoading]                 = useState(false)

  // ── Data fetching ──────────────────────────────────────────────────────────
  const fetchData = useCallback(async () => {
    setLoading(true)

    const { data: exps, error } = await supabase
      .from('experiences')
      .select('*')
      .eq('park', selectedPark)
      .eq('is_active', true)
      .order('name')

    if (error) {
      console.error('Error fetching experiences:', error)
      setLoading(false)
      return
    }

    setExperiences(exps || [])

    if (exps?.length > 0) {
      const { data: ues, error: ueError } = await supabase
        .from('user_experiences')
        .select('*')
        .eq('user_id', user.id)
        .in('experience_id', exps.map(e => e.id))

      if (!ueError) {
        const map = {}
        ;(ues || []).forEach(ue => { map[ue.experience_id] = ue })
        setUserExps(map)
      }
    } else {
      setUserExps({})
    }

    setLoading(false)
  }, [selectedPark, user.id])

  useEffect(() => { fetchData() }, [fetchData])

  // ── Toggle complete ────────────────────────────────────────────────────────
  const toggleComplete = async (expId) => {
    const current        = userExps[expId]
    const wasCompleted   = current?.completed ?? false
    const newCompleted   = !wasCompleted
    const newVisits      = wasCompleted ? 0 : (current?.times_visited ?? 0) + 1
    const today          = new Date().toISOString().split('T')[0]

    // Optimistic update
    setUserExps(prev => ({
      ...prev,
      [expId]: {
        ...prev[expId],
        user_id:           user.id,
        experience_id:     expId,
        completed:         newCompleted,
        times_visited:     newVisits,
        last_visited_date: newCompleted ? today : null,
      },
    }))

    let error
    if (current?.id) {
      ;({ error } = await supabase
        .from('user_experiences')
        .update({ completed: newCompleted, times_visited: newVisits, last_visited_date: newCompleted ? today : null })
        .eq('id', current.id))
    } else {
      const { data, error: insertError } = await supabase
        .from('user_experiences')
        .insert({ user_id: user.id, experience_id: expId, completed: newCompleted, times_visited: newVisits, last_visited_date: newCompleted ? today : null })
        .select()
        .single()
      error = insertError
      if (!insertError && data) setUserExps(prev => ({ ...prev, [expId]: data }))
    }

    if (error) {
      console.error('Toggle error:', error)
      setUserExps(prev => ({ ...prev, [expId]: current })) // revert
    }
  }

  // ── Derived values ─────────────────────────────────────────────────────────
  const park          = PARKS.find(p => p.name === selectedPark)
  const completedCount = experiences.filter(e => userExps[e.id]?.completed).length
  const progress      = experiences.length > 0 ? (completedCount / experiences.length) * 100 : 0

  const filtered = experiences.filter(exp => {
    const ue = userExps[exp.id]
    if (selectedCategory !== 'All' && exp.category !== selectedCategory) return false
    if (selectedStatus === 'Done'     && !ue?.completed)  return false
    if (selectedStatus === 'Not done' && ue?.completed)   return false
    if (selectedStatus === 'Wishlist' && !ue?.wishlist)   return false
    return true
  })

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col pb-4">

      {/* Title */}
      <div className="px-4 pt-4 pb-3">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Select Destination</h2>
        <div className="relative">
          <select
            value={selectedPark}
            onChange={e => {
              setSelectedPark(e.target.value)
              setSelectedCategory('All')
              setSelectedStatus('All')
            }}
            className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm font-medium text-gray-800 outline-none"
          >
            {PARKS.map(p => (
              <option key={p.name} value={p.name}>{p.emoji}  {p.name}</option>
            ))}
          </select>
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
               fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Hero card */}
      <div className="mx-4 rounded-2xl p-4 mb-4" style={{ backgroundColor: '#1D9E75' }}>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl leading-none">{park?.emoji}</span>
          <div>
            <p className="text-white font-bold text-base leading-tight">{park?.name}</p>
            <p className="text-white/70 text-xs mt-0.5">
              {completedCount} of {experiences.length} experiences done
            </p>
          </div>
        </div>
        <div className="rounded-full h-2 overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.25)' }}>
          <div
            className="h-full bg-white"
            style={{ width: `${progress}%`, transition: 'width 0.5s ease' }}
          />
        </div>
      </div>

      {/* Category pills */}
      <div className="px-4 mb-3 overflow-x-auto no-scrollbar">
        <div className="flex gap-2 w-max pb-0.5">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat ? 'text-white' : 'bg-gray-100 text-gray-500'
              }`}
              style={selectedCategory === cat ? { backgroundColor: '#1D9E75' } : {}}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Status chips */}
      <div className="px-4 mb-3 flex gap-2">
        {STATUS_FILTERS.map(s => (
          <button
            key={s}
            onClick={() => setSelectedStatus(s)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              selectedStatus === s ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-500'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Count */}
      {!loading && (
        <p className="px-4 mb-1 text-xs text-gray-400">
          {filtered.length} {filtered.length === 1 ? 'experience' : 'experiences'}
        </p>
      )}

      {/* List */}
      {loading ? (
        <div className="flex justify-center py-16">
          <p className="text-gray-400 text-sm">Loading…</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center py-16 px-6 gap-3">
          <span className="text-4xl">{experiences.length === 0 ? '🎠' : '🔍'}</span>
          <p className="text-gray-500 text-sm text-center leading-relaxed">
            {experiences.length === 0
              ? `No experiences added for ${selectedPark} yet.`
              : 'No experiences match your filters.'}
          </p>
          {experiences.length > 0 && (
            <button
              onClick={() => { setSelectedCategory('All'); setSelectedStatus('All') }}
              className="text-xs font-semibold mt-1"
              style={{ color: '#1D9E75' }}
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="divide-y divide-gray-100 border-t border-gray-100">
          {filtered.map(exp => (
            <ExperienceRow
              key={exp.id}
              exp={exp}
              userExp={userExps[exp.id]}
              onToggle={toggleComplete}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ── Experience Row ───────────────────────────────────────────────────────────

function ExperienceRow({ exp, userExp, onToggle }) {
  const navigate     = useNavigate()
  const completed    = userExp?.completed ?? false
  const wishlisted   = (userExp?.wishlist ?? false) && !completed
  const timesVisited = userExp?.times_visited ?? 0

  return (
    <div
      className="flex items-center px-4 py-3.5 gap-3 active:bg-gray-50 cursor-pointer"
      onClick={() => navigate(`/tracker/${exp.id}`)}
    >

      {/* Circle toggle */}
      <button
        onMouseDown={e => e.stopPropagation()}
        onClick={e => {
          e.stopPropagation()
          if (exp.id === GUARDIANS_EXPERIENCE_ID) navigate(`/tracker/${exp.id}`)
          else onToggle(exp.id)
        }}
        className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center border-2 transition-all active:scale-90 ${
          completed  ? 'border-transparent' :
          wishlisted ? 'border-transparent' :
                       'border-gray-300 bg-white'
        }`}
        style={
          completed  ? { backgroundColor: '#1D9E75' } :
          wishlisted ? { backgroundColor: '#F59E0B' } :
          {}
        }
      >
        {completed && (
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
        {wishlisted && (
          <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        )}
      </button>

      {/* Name + type */}
      <div className="flex-1 min-w-0 py-0.5">
        <p className={`text-sm font-semibold leading-snug line-clamp-2 ${
          completed ? 'text-gray-400 line-through' : 'text-gray-800'
        }`}>
          {exp.name}
        </p>
        {exp.type && (
          <p className="text-xs text-gray-400 mt-0.5">{exp.type}</p>
        )}
      </div>

      {/* Status badge */}
      <div className="flex-shrink-0">
        {completed ? (
          <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-50 text-green-600">
            {timesVisited}×
          </span>
        ) : wishlisted ? (
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-amber-50 text-amber-500">
            Wishlist
          </span>
        ) : (
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-400">
            Not done
          </span>
        )}
      </div>
    </div>
  )
}
