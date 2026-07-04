import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import confetti from 'canvas-confetti'
import { Search } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabaseClient'
import { PARKS, CATEGORIES, GUARDIANS_EXPERIENCE_ID } from '../lib/constants'
import ParkIcon from '../lib/ParkIcon'

const todayStr = () => new Date().toISOString().split('T')[0]

const formatDateDisplay = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  })
}

export default function LogVisitModal({
  onClose,
  onSave,
  initialPark    = '',   // pre-fill park (skips to step 2)
  initialDate    = null, // pre-fill date
  existingTripId = null, // add to existing trip instead of creating new one
}) {
  const { user }   = useAuth()
  const navigate   = useNavigate()

  const addingToExisting = Boolean(existingTripId)

  // ── Step + shared ──
  const [step, setStep]                 = useState(addingToExisting ? 2 : 1)
  const [selectedDate, setSelectedDate] = useState(initialDate || todayStr())
  const [selectedPark, setSelectedPark] = useState(initialPark)

  // ── Step 2 ──
  const [experiences, setExperiences]         = useState([])
  const [loadingExps, setLoadingExps]         = useState(false)
  const [checkedExpIds, setCheckedExpIds]     = useState(new Set())
  const [searchQuery, setSearchQuery]         = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [tripNotes, setTripNotes]             = useState('')

  // ── Save ──
  const [saving,    setSaving]    = useState(false)
  const [saveError, setSaveError] = useState('')

  const dateInputRef = useRef(null)

  // If opened with a pre-filled park, load experiences immediately
  useEffect(() => {
    if (initialPark) {
      setLoadingExps(true)
      supabase
        .from('experiences')
        .select('id, name, type, category, location')
        .eq('park', initialPark)
        .eq('is_active', true)
        .order('sort_name')
        .then(({ data }) => {
          setExperiences(data || [])
          setLoadingExps(false)
        })
    }
  }, [initialPark])

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleContinue = async () => {
    setLoadingExps(true)
    setStep(2)
    const { data } = await supabase
      .from('experiences')
      .select('id, name, type, category, location')
      .eq('park', selectedPark)
      .eq('is_active', true)
      .order('sort_name')
    setExperiences(data || [])
    setLoadingExps(false)
  }

  const handleBack = () => {
    setStep(1)
    setCheckedExpIds(new Set())
    setSearchQuery('')
    setSelectedCategory('All')
  }

  const toggleExp = (expId) => {
    setCheckedExpIds(prev => {
      const next = new Set(prev)
      if (next.has(expId)) next.delete(expId)
      else next.add(expId)
      return next
    })
  }

  const handleSave = async () => {
    setSaving(true)
    setSaveError('')

    try {
      let tripId = existingTripId

      if (!addingToExisting) {
        // ── New trip: create the trip record ──
        const { data: trip, error: tripErr } = await supabase
          .from('trips')
          .insert({ user_id: user.id, park: selectedPark, visit_date: selectedDate, notes: tripNotes || null })
          .select()
          .single()
        if (tripErr) throw tripErr
        tripId = trip.id
      }

      const checkedIds = Array.from(checkedExpIds)

      if (checkedIds.length > 0) {
        // When adding to existing trip, skip experience_ids already logged
        let newExpIds = checkedIds
        if (addingToExisting) {
          const { data: already } = await supabase
            .from('trip_experiences')
            .select('experience_id')
            .eq('trip_id', existingTripId)
          const alreadySet = new Set((already || []).map(e => e.experience_id))
          newExpIds = checkedIds.filter(id => !alreadySet.has(id))
        }

        if (newExpIds.length > 0) {
          // Insert trip_experiences
          await supabase
            .from('trip_experiences')
            .insert(newExpIds.map(expId => ({ trip_id: tripId, experience_id: expId })))

          // Fetch existing user_experiences to increment accurately
          const { data: existingUEs } = await supabase
            .from('user_experiences')
            .select('experience_id, times_visited, wishlist, personal_rating, personal_notes')
            .eq('user_id', user.id)
            .in('experience_id', newExpIds)

          const ueMap = Object.fromEntries((existingUEs || []).map(ue => [ue.experience_id, ue]))

          await supabase
            .from('user_experiences')
            .upsert(
              newExpIds.map(expId => ({
                user_id:           user.id,
                experience_id:     expId,
                completed:         true,
                times_visited:     (ueMap[expId]?.times_visited ?? 0) + 1,
                last_visited_date: selectedDate,
                wishlist:          ueMap[expId]?.wishlist         ?? false,
                personal_rating:   ueMap[expId]?.personal_rating  ?? null,
                personal_notes:    ueMap[expId]?.personal_notes   ?? null,
              })),
              { onConflict: 'user_id,experience_id' }
            )

          // ── Sync linked challenge items ──────────────────────────────────
          const { data: linkedItems } = await supabase
            .from('challenge_items')
            .select('id')
            .in('experience_id', newExpIds)

          if (linkedItems?.length > 0) {
            await supabase
              .from('user_challenge_items')
              .upsert(
                linkedItems.map(item => ({
                  user_id:           user.id,
                  challenge_item_id: item.id,
                  completed:         true,
                })),
                { onConflict: 'user_id,challenge_item_id' }
              )
          }
        }
      }

      // Confetti 🎉
      confetti({
        particleCount: 160,
        spread: 100,
        origin: { y: 0.55 },
        colors: ['#1D9E75', '#FFD700', '#FF6B6B', '#4FC3F7', '#CE93D8'],
      })
      setTimeout(() => {
        confetti({ particleCount: 60, spread: 60, origin: { x: 0.1, y: 0.6 }, colors: ['#FFD700', '#1D9E75'] })
        confetti({ particleCount: 60, spread: 60, origin: { x: 0.9, y: 0.6 }, colors: ['#FF6B6B', '#4FC3F7'] })
      }, 250)

      // If Guardians was selected, go straight to its song picker
      const guardiansPicked = checkedIds.includes(GUARDIANS_EXPERIENCE_ID)
      const finalTripId     = tripId // captured above

      setTimeout(() => {
        if (guardiansPicked) {
          navigate(`/tracker/${GUARDIANS_EXPERIENCE_ID}`, {
            state: { tripId: finalTripId, openSongPicker: true },
          })
        } else {
          navigate(addingToExisting ? `/trips/${existingTripId}` : '/trips')
        }
        onSave ? onSave() : onClose()
      }, 1400)

    } catch (err) {
      console.error('Save trip error:', err)
      setSaveError('Something went wrong. Please try again.')
      setSaving(false)
    }
  }

  // ── Derived ───────────────────────────────────────────────────────────────
  const parkData = PARKS.find(p => p.name === selectedPark)
  const filtered = experiences.filter(exp => {
    if (selectedCategory !== 'All' && exp.category !== selectedCategory) return false
    if (searchQuery && !exp.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/40">
      <div className="w-full max-w-[375px] bg-white flex flex-col h-full">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className="flex-shrink-0 px-4 pt-4 pb-3 border-b border-gray-100">
          <div className="flex items-center justify-between mb-3">
            {/* Back: only show on step 2 of a NEW trip (not when adding to existing) */}
            {step === 2 && !addingToExisting ? (
              <button onClick={handleBack} className="w-9 h-9 flex items-center justify-center rounded-full active:bg-gray-100">
                <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            ) : (
              <div className="w-9" />
            )}

            <p className="text-base font-bold text-gray-900">
              {addingToExisting ? 'Add experiences' : step === 1 ? 'Log a visit' : 'Log experiences'}
            </p>

            <button onClick={onClose} disabled={saving}
                    className="w-9 h-9 flex items-center justify-center rounded-full active:bg-gray-100">
              <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Step indicator — only show for new trips */}
          {!addingToExisting && (
            <div className="flex gap-1.5 w-20 mx-auto">
              {[1, 2].map(s => (
                <div key={s} className="h-1 flex-1 rounded-full transition-colors duration-300"
                     style={{ backgroundColor: step >= s ? '#1D9E75' : '#E5E7EB' }} />
              ))}
            </div>
          )}
        </div>

        {/* ── Content (scrollable) ────────────────────────────────────── */}
        {step === 1 ? (
          <Step1Content
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedPark={selectedPark}
            setSelectedPark={setSelectedPark}
            dateInputRef={dateInputRef}
          />
        ) : (
          <Step2Content
            parkData={parkData}
            selectedDate={selectedDate}
            filtered={filtered}
            loadingExps={loadingExps}
            checkedExpIds={checkedExpIds}
            toggleExp={toggleExp}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            tripNotes={tripNotes}
            setTripNotes={setTripNotes}
            addingToExisting={addingToExisting}
          />
        )}

        {/* ── Footer ──────────────────────────────────────────────────── */}
        <div className="flex-shrink-0 px-4 pb-8 pt-3 border-t border-gray-100 bg-white">
          {saveError && <p className="text-red-500 text-xs text-center mb-2">{saveError}</p>}

          {step === 1 ? (
            <button
              onClick={handleContinue}
              disabled={!selectedPark}
              className="w-full py-3.5 rounded-xl text-white font-bold text-sm disabled:opacity-40 active:scale-[0.98] transition-all"
              style={{ backgroundColor: '#1D9E75' }}
            >
              Continue
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full py-3.5 rounded-xl text-white font-bold text-sm disabled:opacity-60 active:scale-[0.98] transition-all"
                style={{ backgroundColor: '#1D9E75' }}
              >
                {saving
                  ? 'Saving…'
                  : addingToExisting
                    ? `Add${checkedExpIds.size > 0 ? ` ${checkedExpIds.size} experience${checkedExpIds.size !== 1 ? 's' : ''}` : ' experiences'}`
                    : `Save trip${checkedExpIds.size > 0 ? ` · ${checkedExpIds.size} experience${checkedExpIds.size !== 1 ? 's' : ''}` : ''}`
                }
              </button>
              <p className="text-xs text-gray-400 text-center mt-2">
                Your progress will update automatically
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Step 1 ────────────────────────────────────────────────────────────────────

function Step1Content({ selectedDate, setSelectedDate, selectedPark, setSelectedPark, dateInputRef }) {
  return (
    <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-4 flex flex-col gap-5">

      {/* Date */}
      <div>
        <SectionLabel>When did you visit?</SectionLabel>
        <div className="relative mt-2">
          <button
            type="button"
            onClick={() => {
              const el = dateInputRef.current
              if (!el) return
              if (typeof el.showPicker === 'function') {
                try { el.showPicker() } catch { el.focus(); el.click() }
              } else {
                el.focus()
                el.click()
              }
            }}
            className="w-full rounded-xl px-4 py-3.5 flex items-center justify-between text-left active:opacity-60"
            style={{ border: '1px solid #E7E5E0', transition: 'opacity 0.2s ease' }}
          >
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Visit date</p>
              <p className="text-sm font-semibold text-gray-800">{formatDateDisplay(selectedDate)}</p>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
          </button>
          <input
            ref={dateInputRef}
            type="date"
            value={selectedDate}
            max={todayStr()}
            onChange={e => e.target.value && setSelectedDate(e.target.value)}
            className="absolute opacity-0 pointer-events-none"
            style={{ bottom: 0, left: 0, width: 1, height: 1 }}
            tabIndex={-1}
          />
        </div>
      </div>

      {/* Park grid */}
      <div>
        <SectionLabel>Which park did you visit?</SectionLabel>
        <div className="grid grid-cols-2 gap-2.5 mt-2">
          {PARKS.map(park => {
            const active = selectedPark === park.name
            return (
              <button
                key={park.name}
                onClick={() => setSelectedPark(park.name)}
                className="flex flex-col items-center justify-center py-4 px-2 rounded-2xl transition-all active:scale-95"
                style={{
                  border: `1px solid ${active ? '#1D9E75' : '#E7E5E0'}`,
                }}
              >
                <div className="mb-2 flex-shrink-0">
                  <ParkIcon park={park.name} size={20} color={active ? '#1D9E75' : '#78716C'} />
                </div>
                <span className={`text-xs text-center leading-tight ${active ? 'font-semibold' : 'text-gray-600'}`}
                      style={active ? { color: '#1D9E75' } : {}}>
                  {park.name}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ── Step 2 ────────────────────────────────────────────────────────────────────

function Step2Content({
  parkData, selectedDate, filtered, loadingExps,
  checkedExpIds, toggleExp,
  searchQuery, setSearchQuery,
  selectedCategory, setSelectedCategory,
  tripNotes, setTripNotes,
  addingToExisting,
}) {
  return (
    <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col">
      <div className="px-4 pt-4 flex-shrink-0">

        {/* Context bar */}
        <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-3.5 py-2.5 mb-4">
          <ParkIcon park={parkData?.name} size={18} color="#78716C" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{parkData?.name}</p>
            <p className="text-xs text-gray-500">{formatDateDisplay(selectedDate)}</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
               fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search experiences…"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none"
            onFocus={e => e.target.style.borderColor = '#1D9E75'}
            onBlur={e  => e.target.style.borderColor = '#e5e7eb'}
          />
        </div>

        {/* Category pills */}
        <div className="overflow-x-auto no-scrollbar mb-3">
          <div className="flex gap-2 w-max pb-0.5">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-colors ${
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
      </div>

      {/* Experience list */}
      {loadingExps ? (
        <div className="flex justify-center py-10">
          <p className="text-gray-400 text-sm">Loading…</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center py-10 gap-3 px-6">
          <Search size={26} color="#C5C1BB" strokeWidth={1.5} />
          <p className="text-gray-500 text-sm text-center">No experiences found.</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-100 border-t border-gray-100">
          {filtered.map(exp => {
            const checked = checkedExpIds.has(exp.id)
            return (
              <button
                key={exp.id}
                onClick={() => toggleExp(exp.id)}
                className="w-full flex items-center px-4 py-3.5 gap-3 active:bg-gray-50 text-left"
              >
                {/* Circle */}
                <span className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center transition-all"
                      style={checked
                        ? { backgroundColor: '#1D9E75' }
                        : { border: '1.5px solid #D6D3D1', backgroundColor: '#fff' }}>
                  {checked && (
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>

                {/* Name + location | type */}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold leading-snug truncate ${checked ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
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
              </button>
            )
          })}
        </div>
      )}

      {/* Trip notes — only show for new trips */}
      {!addingToExisting && (
        <div className="px-4 pt-5 pb-4 flex-shrink-0">
          <SectionLabel>Trip notes</SectionLabel>
          <textarea
            value={tripNotes}
            onChange={e => setTripNotes(e.target.value)}
            placeholder="Anything memorable from this visit? (optional)"
            rows={3}
            className="w-full mt-2 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 outline-none resize-none"
            onFocus={e => e.target.style.borderColor = '#1D9E75'}
            onBlur={e  => e.target.style.borderColor = '#e5e7eb'}
          />
        </div>
      )}
    </div>
  )
}

// ── Shared sub-components ─────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.12em]">{children}</p>
}
