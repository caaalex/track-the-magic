import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Ticket, Search, ChevronRight, X } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabaseClient'
import { PARKS, CATEGORIES, RESORTS, GUARDIANS_EXPERIENCE_ID } from '../lib/constants'
import ParkIcon from '../lib/ParkIcon'
import Avatar from '../components/Avatar'

const STATUS_FILTERS = ['All', 'Done', 'Not done', 'Favorites']

export default function Tracker() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [selectedPark, setSelectedPark]       = useState(() => {
    if (location.state?.park) return location.state.park
    const saved = sessionStorage.getItem('ttm_selected_park')
    return PARKS.some(p => p.name === saved) ? saved : PARKS[0].name
  })
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedStatus, setSelectedStatus]   = useState('All')
  const [searchQuery, setSearchQuery]         = useState('')
  const [selectedResort, setSelectedResort]   = useState(null) // Resorts second level
  const [experiences, setExperiences]         = useState([])
  const [userExps, setUserExps]               = useState({}) // keyed by experience_id
  const [loading, setLoading]                 = useState(false)
  const pillsRef                              = useRef(null)
  const [pillsAtEnd, setPillsAtEnd]           = useState(false)

  // Remember park selection across tab switches (session only)
  useEffect(() => {
    sessionStorage.setItem('ttm_selected_park', selectedPark)
  }, [selectedPark])

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

  const isResorts       = selectedPark === 'Resorts'
  const showResortList  = isResorts && !selectedResort

  // Per-resort progress for the resort-selection list
  const resortStats = RESORTS.map(name => {
    const exps = experiences.filter(e => e.location === name)
    const done = exps.filter(e => userExps[e.id]?.completed).length
    return { name, total: exps.length, done }
  })

  // Experiences in scope for the current view — a single resort when drilled in
  const viewExps = selectedResort
    ? experiences.filter(e => e.location === selectedResort)
    : experiences

  // Hero card follows category filter only (not status filter)
  const heroExperiences  = selectedCategory === 'All'
    ? viewExps
    : viewExps.filter(e => e.category === selectedCategory)
  const heroCompleted    = heroExperiences.filter(e => userExps[e.id]?.completed).length
  const heroProgress     = heroExperiences.length > 0 ? (heroCompleted / heroExperiences.length) * 100 : 0

  const query = searchQuery.trim().toLowerCase()
  const filtered = viewExps.filter(exp => {
    const ue = userExps[exp.id]
    if (query && !exp.name.toLowerCase().includes(query)) return false
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
          onChange={name => { setSelectedPark(name); setSelectedCategory('All'); setSelectedStatus('All'); setSearchQuery(''); setSelectedResort(null) }}
        />

        {/* Resort detail: back to resort list */}
        {selectedResort && (
          <button
            onClick={() => { setSelectedResort(null); setSelectedCategory('All'); setSelectedStatus('All'); setSearchQuery('') }}
            className="mt-3 flex items-center gap-1 text-[13px] font-medium text-gray-500 active:opacity-60"
          >
            <ChevronRight size={15} strokeWidth={2} className="rotate-180" />
            All resorts
          </button>
        )}
      </div>

      {/* Hero */}
      <div className="px-4 pt-1 mb-4">
        <p className="text-sm text-gray-400">{selectedResort ?? (isResorts ? 'All resorts' : 'Completed')}</p>
        <p
          className="text-gray-900 tabular-nums leading-tight"
          style={{ fontSize: 40, fontWeight: 300, letterSpacing: '-0.02em' }}
        >
          {heroCompleted}{' '}
          <span className="text-base font-normal text-gray-300">/ {heroExperiences.length}</span>
        </p>
        <div className="mt-3 rounded-full overflow-hidden" style={{ height: 2, backgroundColor: '#ECEAE5' }}>
          <div
            className="h-full rounded-full"
            style={{
              width: `${heroProgress}%`,
              backgroundColor: '#1D9E75',
              transition: 'width 0.5s cubic-bezier(0.32,0.72,0,1)',
            }}
          />
        </div>
        <p className="text-sm text-gray-400 mt-2">
          {Math.round(heroProgress)}% of {selectedCategory !== 'All' ? selectedCategory.toLowerCase() : 'experiences'} done
        </p>
      </div>

      {showResortList ? (
        loading ? (
          <div className="divide-y divide-gray-100 border-t border-gray-100 animate-pulse">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex items-center px-4 py-3.5 gap-3">
                <div className="flex-1 h-3 rounded-full bg-gray-100 w-1/2" />
                <div className="w-10 h-3 rounded-full bg-gray-100 flex-shrink-0" />
              </div>
            ))}
          </div>
        ) : (
          <div className="divide-y divide-gray-100 border-t border-gray-100">
            {resortStats.map(resort => (
              <button
                key={resort.name}
                onClick={() => { setSelectedResort(resort.name); setSelectedCategory('All'); setSelectedStatus('All'); setSearchQuery('') }}
                className="w-full flex items-center gap-3 px-4 py-3.5 text-left active:bg-gray-50"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] text-gray-900">{resort.name}</p>
                  {resort.total > 0 ? (
                    <div className="mt-2 overflow-hidden" style={{ height: 1.5, backgroundColor: '#ECEAE5' }}>
                      <div
                        className="h-full"
                        style={{
                          width: `${(resort.done / resort.total) * 100}%`,
                          backgroundColor: '#1D9E75',
                          transition: 'width 0.5s cubic-bezier(0.32,0.72,0,1)',
                        }}
                      />
                    </div>
                  ) : (
                    <p className="text-[11px] text-gray-300 mt-0.5">No experiences yet</p>
                  )}
                </div>
                {resort.total > 0 && (
                  <span className="text-xs text-gray-400 tabular-nums flex-shrink-0">
                    {resort.done}/{resort.total}
                  </span>
                )}
                <ChevronRight size={15} color="#D6D3D1" strokeWidth={2} className="flex-shrink-0" />
              </button>
            ))}
          </div>
        )
      ) : (
      <>
      {/* Search */}
      <div className="px-4 mb-3">
        <div className="relative">
          <Search size={16} color="#9CA3AF" strokeWidth={2}
                  className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search experiences…"
            className="w-full rounded-xl pl-9 pr-9 py-2.5 text-sm outline-none bg-transparent text-gray-800 placeholder-gray-400"
            style={{ border: '1px solid #E7E5E0', transition: 'border-color 0.2s ease' }}
            onFocus={e => (e.target.style.borderColor = '#1D9E75')}
            onBlur={e  => (e.target.style.borderColor = '#E7E5E0')}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full active:opacity-60"
              aria-label="Clear search"
            >
              <X size={15} color="#9CA3AF" strokeWidth={2} />
            </button>
          )}
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
                className={`px-3.5 py-1.5 rounded-full text-xs whitespace-nowrap transition-colors ${
                  selectedCategory === cat ? 'font-semibold' : 'text-gray-500'
                }`}
                style={{
                  border: `1px solid ${selectedCategory === cat ? '#1D9E75' : '#E7E5E0'}`,
                  color: selectedCategory === cat ? '#1D9E75' : undefined,
                }}
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
              style={{ background: 'linear-gradient(to right, rgba(250,250,249,0), #FAFAF9)' }}
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
            className={`px-3.5 py-1.5 rounded-full text-xs transition-colors ${
              selectedStatus === s ? 'font-semibold' : 'text-gray-500'
            }`}
            style={{
              border: `1px solid ${selectedStatus === s ? '#1D9E75' : '#E7E5E0'}`,
              color: selectedStatus === s ? '#1D9E75' : undefined,
            }}
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
        <div className="divide-y divide-gray-100 border-t border-gray-100 animate-pulse">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="flex items-center px-4 py-3.5 gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex-shrink-0" />
              <div className="flex-1 flex flex-col gap-1.5">
                <div className="h-3 rounded-full bg-gray-100 w-3/4" />
                <div className="h-2.5 rounded-full bg-gray-100 w-2/5" />
              </div>
              <div className="w-14 h-6 rounded-full bg-gray-100 flex-shrink-0" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center py-16 px-6 gap-3">
          {viewExps.length === 0
            ? <Ticket size={26} color="#C5C1BB" strokeWidth={1.5} />
            : <Search size={26} color="#C5C1BB" strokeWidth={1.5} />}
          <p className="text-gray-500 text-sm text-center leading-relaxed">
            {viewExps.length === 0
              ? `No experiences added for ${selectedResort ?? selectedPark} yet.`
              : query
                ? `No experiences match “${searchQuery.trim()}”.`
                : 'No experiences match your filters.'}
          </p>
          {viewExps.length > 0 && (
            <button
              onClick={() => { setSelectedCategory('All'); setSelectedStatus('All'); setSearchQuery('') }}
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
              hideLocation={!!selectedResort}
            />
          ))}
        </div>
      )}
      </>
      )}
    </div>
  )
}

// ── Experience Row ───────────────────────────────────────────────────────────

function ExperienceRow({ exp, userExp, onToggle, hideLocation = false }) {
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
        className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center transition-all active:scale-90 ${
          completed || wishlisted ? '' : 'bg-white'
        }`}
        style={
          completed  ? { backgroundColor: '#1D9E75' } :
          wishlisted ? { backgroundColor: '#F59E0B' } :
          { border: '1.5px solid #D6D3D1' }
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
        <p className={`text-[14px] leading-snug line-clamp-2 ${
          completed ? 'text-gray-400 line-through' : 'text-gray-900'
        }`}>
          {exp.name}
        </p>
        {((!hideLocation && exp.location) || exp.type) && (
          <p className="text-[11px] mt-0.5 flex items-center gap-1">
            {!hideLocation && exp.location && <span className="text-gray-500">{exp.location}</span>}
            {!hideLocation && exp.location && exp.type && <span className="text-gray-300">|</span>}
            {exp.type && <span className="text-gray-400">{exp.type}</span>}
          </p>
        )}
      </div>

      {/* Status */}
      <div className="flex-shrink-0">
        {completed ? (
          <span className="text-xs font-semibold tabular-nums" style={{ color: '#1D9E75' }}>
            {timesVisited}×
          </span>
        ) : wishlisted ? (
          <span className="text-xs font-semibold text-amber-500">Favorite</span>
        ) : (
          <span className="text-xs text-gray-300">Not done</span>
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
        className="w-full flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-left"
        style={{ border: '1px solid #E7E5E0' }}
      >
        <ParkIcon park={selected.name} size={18} color="#78716C" />
        <span className="flex-1 text-sm text-gray-800">{selected.name}</span>
        <svg className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
             fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown list */}
      {open && (
        <div className="absolute z-30 mt-1.5 w-full bg-white rounded-xl overflow-hidden"
             style={{ border: '1px solid #E7E5E0', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
          {PARKS.map((park, i) => {
            const active = park.name === value
            return (
              <button
                key={park.name}
                onClick={() => { onChange(park.name); setOpen(false) }}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 text-left active:bg-gray-50 transition-colors"
                style={{ borderBottom: i < PARKS.length - 1 ? '1px solid #F1EFEA' : 'none' }}
              >
                <ParkIcon park={park.name} size={18} color="#78716C" />
                <span className={`flex-1 text-sm ${active ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
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
