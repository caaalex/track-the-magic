import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabaseClient'
import { GUARDIANS_EXPERIENCE_ID, GUARDIANS_CHALLENGE_ID } from '../lib/constants'

export default function ExperienceDetail() {
  const { id }        = useParams()
  const navigate      = useNavigate()
  const location      = useLocation()
  const { user }      = useAuth()

  const isGuardians = id === GUARDIANS_EXPERIENCE_ID
  const tripId      = location.state?.tripId ?? null

  const [exp, setExp]             = useState(null)
  const [userExp, setUserExp]     = useState(null)
  const [community, setCommunity] = useState(null)
  const [loading, setLoading]     = useState(true)
  const [editingNotes, setEditingNotes] = useState(false)
  const [notesInput, setNotesInput]     = useState('')
  const [savingNotes, setSavingNotes]   = useState(false)

  // Guardians-specific state
  const [songs, setSongs]               = useState([])
  const [songPickerOpen, setSongPickerOpen] = useState(false)

  // Debounce ref for stepper saves
  const visitTimerRef = useRef(null)
  const visitValueRef = useRef(0)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)

      const fetches = [
        supabase.from('experiences').select('*').eq('id', id).single(),
        supabase.from('user_experiences').select('*').eq('user_id', user.id).eq('experience_id', id).maybeSingle(),
        supabase.rpc('get_experience_avg_rating', { exp_id: id }),
      ]

      if (isGuardians) {
        fetches.push(
          supabase.from('challenge_items')
            .select('id, title, subtitle, sort_order')
            .eq('challenge_id', GUARDIANS_CHALLENGE_ID)
            .order('sort_order'),
          supabase.from('user_challenge_items')
            .select('challenge_item_id')
            .eq('user_id', user.id)
            .eq('completed', true)
        )
      }

      const results = await Promise.all(fetches)
      if (cancelled) return

      const [{ data: expData, error: expError }, { data: ueData }, { data: avgData }] = results

      if (expError || !expData) { navigate('/tracker'); return }

      setExp(expData)
      setUserExp(ueData)
      setNotesInput(ueData?.personal_notes ?? '')
      visitValueRef.current = ueData?.times_visited ?? 0
      if (avgData?.[0]) setCommunity(avgData[0])

      if (isGuardians) {
        const { data: items }     = results[3]
        const { data: userItems } = results[4]
        const collectedSet = new Set((userItems || []).map(u => u.challenge_item_id))
        setSongs((items || []).map(item => ({ ...item, collected: collectedSet.has(item.id) })))
      }

      setLoading(false)
    })()
    return () => { cancelled = true }
  }, [id, user.id, navigate, isGuardians])

  // ── Persist helper ────────────────────────────────────────────────────────
  const persist = async (updates) => {
    const { data, error } = await supabase
      .from('user_experiences')
      .upsert(
        { user_id: user.id, experience_id: id, ...updates },
        { onConflict: 'user_id,experience_id' }
      )
      .select()
      .single()
    if (!error && data) setUserExp(data)
    if (error) console.error('Save error:', error)
  }

  // ── Actions ───────────────────────────────────────────────────────────────
  const toggleWishlist = () => {
    const next = !(userExp?.wishlist)
    setUserExp(prev => ({ ...(prev ?? {}), wishlist: next }))
    persist({ wishlist: next })
  }

  const toggleStatus = () => {
    clearTimeout(visitTimerRef.current)
    const today = new Date().toISOString().split('T')[0]
    if (userExp?.completed) {
      visitValueRef.current = 0
      setUserExp(prev => ({ ...(prev ?? {}), completed: false, times_visited: 0, last_visited_date: null }))
      persist({ completed: false, times_visited: 0, last_visited_date: null })
    } else {
      const visits = Math.max(visitValueRef.current, 1)
      visitValueRef.current = visits
      setUserExp(prev => ({ ...(prev ?? {}), completed: true, times_visited: visits, last_visited_date: today }))
      persist({ completed: true, times_visited: visits, last_visited_date: today })
    }
  }

  const changeVisits = (delta) => {
    const prev = visitValueRef.current
    visitValueRef.current = Math.max(0, prev + delta)
    const next = visitValueRef.current
    const today = new Date().toISOString().split('T')[0]
    let extra = {}
    if (next === 0 && prev > 0)      extra = { completed: false, last_visited_date: null }
    else if (next === 1 && prev === 0) extra = { completed: true, last_visited_date: today }
    setUserExp(prev => ({ ...(prev ?? {}), times_visited: next, ...extra }))
    clearTimeout(visitTimerRef.current)
    visitTimerRef.current = setTimeout(() => persist({ times_visited: next, ...extra }), 600)
  }

  const setRating = (rating) => {
    setUserExp(prev => ({ ...(prev ?? {}), personal_rating: rating }))
    persist({ personal_rating: rating })
  }

  const saveNotes = async () => {
    setSavingNotes(true)
    await persist({ personal_notes: notesInput })
    setSavingNotes(false)
    setEditingNotes(false)
  }

  const handleShare = async () => {
    const text = `${exp.name} at ${exp.park} — Track the Magic`
    if (navigator.share) navigator.share({ title: exp.name, text }).catch(() => {})
    else navigator.clipboard.writeText(window.location.href)
  }

  // ── Guardians: remove a song ──────────────────────────────────────────────
  const removeSong = async (challengeItemId) => {
    const newVisits = Math.max(0, (userExp?.times_visited ?? 0) - 1)

    // Optimistic updates
    setSongs(prev => prev.map(s => s.id === challengeItemId ? { ...s, collected: false } : s))
    setUserExp(prev => ({
      ...(prev ?? {}),
      times_visited: newVisits,
      completed: newVisits > 0,
      last_visited_date: newVisits > 0 ? (prev?.last_visited_date ?? null) : null,
    }))
    visitValueRef.current = newVisits

    await Promise.all([
      supabase.from('user_challenge_items').upsert(
        { user_id: user.id, challenge_item_id: challengeItemId, completed: false },
        { onConflict: 'user_id,challenge_item_id' }
      ),
      supabase.from('user_experiences').upsert(
        {
          user_id: user.id, experience_id: id,
          times_visited: newVisits,
          completed: newVisits > 0,
          last_visited_date: newVisits > 0 ? (userExp?.last_visited_date ?? null) : null,
        },
        { onConflict: 'user_id,experience_id' }
      ),
    ])
  }

  // ── Guardians: log a song ─────────────────────────────────────────────────
  const logSong = async (challengeItemId) => {
    setSongPickerOpen(false)
    const today    = new Date().toISOString().split('T')[0]
    const newVisits = (userExp?.times_visited ?? 0) + 1

    // Optimistic updates
    setSongs(prev => prev.map(s => s.id === challengeItemId ? { ...s, collected: true } : s))
    setUserExp(prev => ({ ...(prev ?? {}), completed: true, times_visited: newVisits, last_visited_date: today }))
    visitValueRef.current = newVisits

    // Parallel DB writes
    const [{ error: logErr }, { error: ueErr }, { error: ciErr }] = await Promise.all([
      supabase.from('ride_logs').insert({
        user_id:           user.id,
        experience_id:     id,
        challenge_item_id: challengeItemId,
        trip_id:           tripId,
        ridden_at:         new Date().toISOString(),
      }),
      supabase.from('user_experiences').upsert(
        { user_id: user.id, experience_id: id, completed: true, times_visited: newVisits, last_visited_date: today },
        { onConflict: 'user_id,experience_id' }
      ),
      supabase.from('user_challenge_items').upsert(
        { user_id: user.id, challenge_item_id: challengeItemId, completed: true },
        { onConflict: 'user_id,challenge_item_id' }
      ),
    ])
    if (logErr) console.error('ride_logs error:', logErr)
    if (ueErr)  console.error('user_experiences error:', ueErr)
    if (ciErr)  console.error('user_challenge_items error:', ciErr)
  }

  // ── Render ────────────────────────────────────────────────────────────────
  if (loading) return (
    <div className="flex items-center justify-center flex-1 py-20">
      <p className="text-gray-400 text-sm">Loading…</p>
    </div>
  )
  if (!exp) return null

  const completed    = userExp?.completed ?? false
  const wishlisted   = userExp?.wishlist ?? false
  const timesVisited = userExp?.times_visited ?? 0
  const rating       = userExp?.personal_rating ?? 0
  const lastVisited  = userExp?.last_visited_date

  return (
    <div className="flex flex-col bg-gray-50 min-h-full">

      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-3 pt-3 pb-2 bg-white border-b border-gray-100 sticky top-0 z-10">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 flex items-center justify-center rounded-full active:bg-gray-100 transition-colors"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={handleShare}
          className="w-9 h-9 flex items-center justify-center rounded-full active:bg-gray-100 transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col gap-4 px-4 py-4 pb-8">

        {/* ── Info card ───────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h1 className="text-xl font-bold text-gray-900 leading-tight flex-1">{exp.name}</h1>
            <button onClick={toggleWishlist} className="mt-0.5 flex-shrink-0 active:scale-110 transition-transform">
              <svg className="w-6 h-6" fill={wishlisted ? '#F59E0B' : 'none'} viewBox="0 0 24 24"
                   stroke={wishlisted ? '#F59E0B' : '#9CA3AF'} strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-2">
            {exp.park     && <Pill color="blue">{exp.park}</Pill>}
            {exp.category && <Pill color="purple">{exp.category}</Pill>}
            {exp.type     && <Pill color="green">{exp.type}</Pill>}
          </div>

          {(exp.opening_year || exp.duration) && (
            <div className="flex flex-wrap gap-1.5 mb-2">
              {exp.opening_year && <Pill color="gray">Opened {exp.opening_year}</Pill>}
              {exp.duration     && <Pill color="gray">{exp.duration}</Pill>}
            </div>
          )}

          {exp.description && (
            <>
              <div className="border-t border-gray-100 my-3" />
              <p className="text-sm text-gray-500 leading-relaxed">{exp.description}</p>
            </>
          )}
        </div>

        {/* ── Your experience ─────────────────────────────────────────── */}
        <SectionLabel>Your experience</SectionLabel>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

          {/* Status */}
          <Row label="Status">
            <button
              onClick={toggleStatus}
              className={`text-xs font-bold px-3 py-1.5 rounded-full transition-colors active:opacity-75 ${
                completed ? 'text-white' : 'bg-gray-100 text-gray-500 active:bg-gray-200'
              }`}
              style={completed ? { backgroundColor: '#1D9E75' } : {}}
            >
              {completed ? 'Done ✓' : 'Mark as done'}
            </button>
          </Row>

          <RowDivider />

          {/* Guardians: songs collected — otherwise: stepper */}
          {isGuardians ? (
            <SongsSection
              songs={songs}
              timesVisited={timesVisited}
              onOpenPicker={() => setSongPickerOpen(true)}
              onRemove={removeSong}
            />
          ) : (
            <Row label="Times visited">
              <div className="flex items-center gap-3">
                <StepButton direction="minus" onClick={() => changeVisits(-1)} disabled={timesVisited === 0} />
                <span className="text-sm font-bold text-gray-800 w-5 text-center tabular-nums">
                  {timesVisited}
                </span>
                <StepButton direction="plus" onClick={() => changeVisits(1)} />
              </div>
            </Row>
          )}

          <RowDivider />

          {/* Your rating */}
          <Row label="Your rating">
            <StarRating value={rating} onChange={setRating} interactive />
          </Row>

          <RowDivider />

          {/* Community avg */}
          <Row label="Community avg">
            <CommunityRating data={community} />
          </Row>

          {lastVisited && (
            <p className="text-xs text-gray-400 text-center py-3 border-t border-gray-100">
              Last visited {formatDate(lastVisited)}
            </p>
          )}
        </div>

        {/* ── Your notes ──────────────────────────────────────────────── */}
        <SectionLabel>Your notes</SectionLabel>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-gray-700">Private notes</p>
            {!editingNotes && (
              <button onClick={() => setEditingNotes(true)}
                      className="text-sm font-semibold"
                      style={{ color: '#1D9E75' }}>
                Edit
              </button>
            )}
          </div>

          {editingNotes ? (
            <div className="flex flex-col gap-2">
              <textarea
                value={notesInput}
                onChange={e => setNotesInput(e.target.value)}
                placeholder="Add your personal notes about this experience…"
                rows={4}
                autoFocus
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 outline-none resize-none transition-colors"
                onFocus={e => e.target.style.borderColor = '#1D9E75'}
                onBlur={e  => e.target.style.borderColor = '#e5e7eb'}
              />
              <div className="flex justify-end gap-2 mt-1">
                <button
                  onClick={() => { setEditingNotes(false); setNotesInput(userExp?.personal_notes ?? '') }}
                  className="text-xs font-medium text-gray-400 px-3 py-1.5"
                >
                  Cancel
                </button>
                <button
                  onClick={saveNotes}
                  disabled={savingNotes}
                  className="text-xs font-bold px-4 py-1.5 rounded-lg text-white disabled:opacity-60 transition-opacity"
                  style={{ backgroundColor: '#1D9E75' }}
                >
                  {savingNotes ? 'Saving…' : 'Save'}
                </button>
              </div>
            </div>
          ) : (
            <p className={`text-sm leading-relaxed ${userExp?.personal_notes ? 'text-gray-600' : 'text-gray-400'}`}>
              {userExp?.personal_notes || 'No notes yet. Tap Edit to add some.'}
            </p>
          )}
        </div>

      </div>

      {/* ── Song picker sheet ────────────────────────────────────────────── */}
      {isGuardians && (
        <SongPickerSheet
          open={songPickerOpen}
          songs={songs}
          onSelect={logSong}
          onRemove={removeSong}
          onClose={() => setSongPickerOpen(false)}
        />
      )}
    </div>
  )
}

// ── Guardians: Songs collected section ────────────────────────────────────────

function SongsSection({ songs, timesVisited, onOpenPicker, onRemove }) {
  const collectedCount = songs.filter(s => s.collected).length
  const collectedSongs = songs.filter(s => s.collected)

  return (
    <div className="px-4 py-3.5">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-sm font-medium text-gray-700">Songs collected</p>
          <p className="text-xs text-gray-400 mt-0.5">
            {collectedCount} of {songs.length}
            {timesVisited > 0 && ` · ${timesVisited} ride${timesVisited !== 1 ? 's' : ''} total`}
          </p>
        </div>
        <button
          onClick={onOpenPicker}
          className="w-8 h-8 rounded-full border-2 flex items-center justify-center active:scale-90 transition-transform"
          style={{ borderColor: '#1D9E75', color: '#1D9E75' }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* Only show collected songs — empty state if none yet */}
      {collectedSongs.length === 0 ? (
        <p className="text-xs text-gray-400">
          Tap + to log a ride and collect your first song.
        </p>
      ) : (
        <div className="flex flex-col gap-2.5">
          {collectedSongs.map(song => (
            <div key={song.id} className="flex items-center gap-3">
              {/* Tap circle to deselect */}
              <button
                onClick={() => onRemove(song.id)}
                className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center active:scale-90 transition-transform"
                style={{ backgroundColor: '#1D9E75' }}
              >
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </button>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-800 leading-snug">{song.title}</p>
                <p className="text-xs text-gray-400">{song.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Guardians: Song picker bottom sheet ───────────────────────────────────────

function SongPickerSheet({ open, songs, onSelect, onRemove, onClose }) {
  if (!open) return null
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />
      <div
        className="fixed bottom-0 z-50 bg-white rounded-t-3xl w-full"
        style={{ maxWidth: 375, left: '50%', transform: 'translateX(-50%)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-gray-200 rounded-full" />
        </div>

        <div className="px-5 pt-3 pb-2">
          <p className="text-lg font-bold text-gray-900">Which song played?</p>
          <p className="text-sm text-gray-400 mt-0.5">Tap to add or remove a song</p>
        </div>

        <div className="flex flex-col px-3 pb-8">
          {songs.map(song => (
            <button
              key={song.id}
              onClick={() => song.collected ? onRemove(song.id) : onSelect(song.id)}
              className="w-full flex items-center gap-3 px-3 py-3.5 rounded-xl text-left active:bg-gray-50 transition-colors"
            >
              <div
                className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center border-2 transition-colors"
                style={song.collected
                  ? { backgroundColor: '#1D9E75', borderColor: '#1D9E75' }
                  : { borderColor: '#1D9E75' }}
              >
                {song.collected ? (
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                       style={{ color: '#1D9E75' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 leading-snug">{song.title}</p>
                <p className="text-xs text-gray-400">{song.subtitle}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

// ── Shared sub-components ─────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">{children}</p>
}

function Row({ label, children }) {
  return (
    <div className="flex items-center justify-between px-4 py-3.5">
      <p className="text-sm font-medium text-gray-700">{label}</p>
      {children}
    </div>
  )
}

function RowDivider() {
  return <div className="h-px bg-gray-100 mx-4" />
}

const PILL_STYLES = {
  blue:   'bg-blue-50 text-blue-600',
  purple: 'bg-purple-50 text-purple-600',
  green:  'bg-green-50 text-green-700',
  gray:   'bg-gray-100 text-gray-500',
}

function Pill({ color, children }) {
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${PILL_STYLES[color]}`}>
      {children}
    </span>
  )
}

function StepButton({ direction, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-8 h-8 rounded-full border flex items-center justify-center transition-colors active:scale-90 disabled:opacity-30"
      style={{ borderColor: disabled ? '#e5e7eb' : '#1D9E75', color: disabled ? '#9ca3af' : '#1D9E75' }}
    >
      {direction === 'plus' ? (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
        </svg>
      )}
    </button>
  )
}

function StarRating({ value, onChange, interactive }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          onClick={() => interactive && onChange(star)}
          className={interactive ? 'active:scale-125 transition-transform' : 'cursor-default'}
        >
          <svg className="w-6 h-6"
               fill={star <= value ? '#F59E0B' : 'none'}
               viewBox="0 0 24 24"
               stroke={star <= value ? '#F59E0B' : '#D1D5DB'}
               strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
          </svg>
        </button>
      ))}
    </div>
  )
}

function CommunityRating({ data }) {
  if (!data || Number(data.total_ratings) === 0) {
    return <span className="text-xs text-gray-400">No ratings yet</span>
  }
  const avg   = parseFloat(data.avg_rating)
  const total = Number(data.total_ratings)
  return (
    <div className="flex items-center gap-1.5">
      <StarRating value={Math.round(avg)} interactive={false} />
      <span className="text-sm font-bold text-gray-800 ml-0.5">{avg.toFixed(1)}</span>
      <span className="text-xs text-gray-400">({total})</span>
    </div>
  )
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}
