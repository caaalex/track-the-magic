import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Ticket, Search, ChevronRight } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabaseClient'
import { PARKS, CATEGORIES, PARK_COLORS, GUARDIANS_EXPERIENCE_ID } from '../lib/constants'
import ParkIcon from '../lib/ParkIcon'
import Avatar from '../components/Avatar'

const STATUS_FILTERS = ['All', 'Done', 'Not done', 'Favorites']

export default function Tracker() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [selectedPark, setSelectedPark]       = useState(location.state?.park ?? PARKS[0].name)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedStatus, setSelectedStatus]   = useState('All')
  const [experiences, setExperiences]         = useState([])
  const [userExps, setUserExps]               = useState({}) // keyed by experience_id
  const [loading, setLoading]                 = useState(false)
  const pillsRef                              = useRef(null)
  const [pillsAtEnd, setPillsAtEnd]           = useState(false)

  const handlePillsScroll = () => {
    const el = pillsRef.current
    if (!el) return
    setPillsAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4)
  }

  // ── Data fetching ──────────────────────────────────────────────────────────
  const fetchData = useCallback(async () => {
    setLoading(true)

    const { data: exps, error } = await supabase
      .from('experiences')
      .select('*')
      .eq('park', selectedPark)
      .eq('is_active', true)
      .order('sort_name')

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
      return
    }

    // ── Sync linked challenge items ────────────────────────────────────────
    const { data: linkedItems } = await supabase
      .from('challenge_items')
      .select('id')
      .eq('experience_id', expId)

    if (linkedItems?.length > 0) {
      await supabase
        .from('user_challenge_items')
        .upsert(
          linkedItems.map(item => ({
            user_id:           user.id,
            challenge_item_id: item.id,
            completed:         newCompleted,
          })),
          { onConflict: 'user_id,challenge_item_id' }
        )
    }
  }

  // ── Derived values ─────────────────────────────────────────────────────────
  const park = PARKS.find(p => p.name === selectedPark)

  // Hero card follows category filter only (not status filter)
  const heroExperiences  = selectedCategory === 'All'
    ? experiences
    : experiences.filter(e => e.category === selectedCategory)
  const heroCompleted    = heroExperiences.filter(e => userExps[e.id]?.completed).length
  const heroProgress     = heroExperiences.length > 0 ? (heroCompleted / heroExperiences.length) * 100 : 0

  const filtered = experiences.filter(exp => {
    const ue = userExps[exp.id]
    if (selectedCategory !== 'All' && exp.category !== selectedCategory) return false
    if (selectedStatus === 'Done'     && !ue?.completed)  return false
    if (selectedStatus === 'Not done' && ue?.completed)   return false
    if (selectedStatus === 'Favorites' && !ue?.wishlist)   return false
    return true
  })

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col pb-4">

      {/* Title */}
      <div className="px-4 pt-5 pb-3">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-gray-900">Tracker</h2>
          <button onClick={() => navigate('/profile')} className="active:opacity-70">
            <Avatar user={user} />
          </button>
        </div>
        <ParkDropdown
          value={selectedPark}
          onChange={name => { setSelectedPark(name); setSelectedCategory('All'); setSelectedStatus('All') }}
        />
      </div>

      {/* Hero card */}
      <div className="mx-4 rounded-2xl p-4 mb-4" style={{ backgroundColor: '#1D9E75' }}>
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: 'rgba(255,255,255,0.18)' }}
          >
            <ParkIcon park={park?.name} size={22} color="white" />
          </div>
          <div>
            <p className="text-white font-bold text-base leading-tight">{park?.name}</p>
            <p className="text-white/70 text-xs mt-0.5">
              {heroCompleted} of {heroExperiences.length} {selectedCategory !== 'All' ? selectedCategory.toLowerCase() : 'experiences'} done
            </p>
          </div>
        </div>
        <div className="rounded-full h-2 overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.25)' }}>
          <div
            className="h-full bg-white"
            style={{ width: `${heroProgress}%`, transition: 'width 0.5s ease' }}
          />
        </div>
      </div>

      {/* Category pills */}
      <div className="relative mb-3">
        <div ref={pillsRef} onScroll={handlePillsScroll} className="pl-4 overflow-x-auto no-scrollbar">
          <div className="flex gap-2 w-max pb-0.5 pr-10">
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
        {/* Fade + chevron — hidden once scrolled to end */}
        {!pillsAtEnd && (
          <>
            <div
              className="absolute top-0 right-0 h-full w-14 pointer-events-none"
              style={{ background: 'linear-gradient(to right, transparent, white)' }}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
              <ChevronRight size={18} color="#9CA3AF" strokeWidth={2.5} />
            </div>
          </>
        )}
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
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#F3F4F6' }}>
            {experiences.length === 0
              ? <Ticket size={22} color="#9CA3AF" strokeWidth={1.5} />
              : <Search size={22} color="#9CA3AF" strokeWidth={1.5} />}
          </div>
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

      {/* Name + location · type */}
      <div className="flex-1 min-w-0 py-0.5">
        <p className={`text-sm font-semibold leading-snug line-clamp-2 ${
          completed ? 'text-gray-400 line-through' : 'text-gray-800'
        }`}>
          {exp.name}
        </p>
        {(exp.location || exp.type) && (
          <p className="text-xs mt-0.5 flex items-center gap-1">
            {exp.location && <span className="text-gray-500 font-medium">{exp.location}</span>}
            {exp.location && exp.type && <span className="text-gray-300">|</span>}
            {exp.type && <span className="text-gray-400">{exp.type}</span>}
          </p>
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
            Favorites
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

// ── Custom park dropdown ───────────────────────────────────────────────────
function ParkDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const selected = PARKS.find(p => p.name === value) ?? PARKS[0]
  const colors = PARK_COLORS[selected.name] ?? { bg: '#F5F5F0', color: '#555' }

  useEffect(() => {
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-left"
      >
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
             style={{ backgroundColor: colors.bg }}>
          <ParkIcon park={selected.name} size={16} color={colors.color} />
        </div>
        <span className="flex-1 text-sm font-medium text-gray-800">{selected.name}</span>
        <svg className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
             fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown list */}
      {open && (
        <div className="absolute z-30 mt-1.5 w-full bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
             style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.10)' }}>
          {PARKS.map(park => {
            const pc = PARK_COLORS[park.name] ?? { bg: '#F5F5F0', color: '#555' }
            const active = park.name === value
            return (
              <button
                key={park.name}
                onClick={() => { onChange(park.name); setOpen(false) }}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-left active:bg-gray-50 transition-colors"
                style={{ backgroundColor: active ? '#F9FAFB' : 'transparent' }}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                     style={{ backgroundColor: pc.bg }}>
                  <ParkIcon park={park.name} size={16} color={pc.color} />
                </div>
                <span className={`flex-1 text-sm ${active ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
                  {park.name}
                </span>
                {active && (
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="#1D9E75" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
