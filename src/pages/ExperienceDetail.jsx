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

  const isGuardians    = id === GUARDIANS_EXPERIENCE_ID
  const tripId         = location.state?.tripId ?? null
  const openPickerOnLoad = location.state?.openSongPicker ?? false

  const [exp, setExp]             = useState(null)
  const [userExp, setUserExp]     = useState(null)
  const [community, setCommunity] = useState(null)
  const [loading, setLoading]     = useState(true)
  const [editingNotes, setEditingNotes] = useState(false)
  const [notesInput, setNotesInput]     = useState('')
  const [savingNotes, setSavingNotes]   = useState(false)

  // Guardians-specific state
  const [songs, setSongs]                   = useState([])   // [{ id, title, subtitle, sort_order, count }]
  const [rideLogQueue, setRideLogQueue]     = useState([])   // [{ id, challenge_item_id }] oldest→newest
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
          supabase.from('ride_logs')
            .select('id, challenge_item_id, ridden_at')
            .eq('user_id', user.id)
            .eq('experience_id', id)
            .order('ridden_at', { ascending: true })
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
        const { data: items }    = results[3]
        const { data: rideLogs } = results[4]
        const logs = rideLogs || []
        setSongs(buildSongsFromLogs(items || [], logs))
        setRideLogQueue(logs.map(l => ({ id: l.id, challenge_item_id: l.challenge_item_id })))

        // Sync user_experiences if times_visited is out of step with ride_logs
        const actualCount = logs.length
        if (actualCount !== (ueData?.times_visited ?? 0)) {
          const today = logs.length > 0
            ? logs[logs.length - 1].ridden_at?.split('T')[0] ?? null
            : null
          supabase.from('user_experiences').upsert(
            { user_id: user.id, experience_id: id,
              times_visited: actualCount,
              completed: actualCount > 0,
              last_visited_date: today },
            { onConflict: 'user_id,experience_id' }
          ) // fire-and-forget — display already correct via rideLogQueue.length
        }
      }

      setLoading(false)
      if (isGuardians && openPickerOnLoad) setSongPickerOpen(true)
    })()
    return () => { cancelled = true }
  }, [id, user.id, navigate, isGuardians, openPickerOnLoad])

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
    if (userExp?.completed) {
      // Undo done — reset everything
      visitValueRef.current = 0
      setUserExp(prev => ({ ...(prev ?? {}), completed: false, times_visited: 0, last_visited_date: null }))
      persist({ completed: false, times_visited: 0, last_visited_date: null })
      if (isGuardians) {
        setSongs(prev => prev.map(s => ({ ...s, count: 0 })))
        setRideLogQueue([])
      }
    } else {
      // Mark as done
      if (isGuardians) {
        // For Guardians, opening the song picker IS confirming the first ride
        setSongPickerOpen(true)
      } else {
        const today  = new Date().toISOString().split('T')[0]
        const visits = Math.max(visitValueRef.current, 1)
        visitValueRef.current = visits
        setUserExp(prev => ({ ...(prev ?? {}), completed: true, times_visited: visits, last_visited_date: today }))
        persist({ completed: true, times_visited: visits, last_visited_date: today })
      }
    }
  }

  const changeVisits = (delta) => {
    if (isGuardians) {
      if (delta > 0) {
        setSongPickerOpen(true)   // + → pick a song
      } else {
        removeLastRide()           // − → remove most recent ride
      }
      return
    }
    const prev = visitValueRef.current
    visitValueRef.current = Math.max(0, prev + delta)
    const next = visitValueRef.current
    const today = new Date().toISOString().split('T')[0]
    let extra = {}
    if (next === 0 && prev > 0)       extra = { completed: false, last_visited_date: null }
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

  // ── Guardians: log a song (called after picker selection) ────────────────
  const logSong = async (challengeItemId) => {
    setSongPickerOpen(false)
    const now       = new Date().toISOString()
    const today     = now.split('T')[0]
    const newVisits = (userExp?.times_visited ?? 0) + 1
    const tempId    = `temp-${Date.now()}`

    // Optimistic
    setSongs(prev => prev.map(s => s.id === challengeItemId ? { ...s, count: s.count + 1 } : s))
    setRideLogQueue(prev => [...prev, { id: tempId, challenge_item_id: challengeItemId }])
    setUserExp(prev => ({ ...(prev ?? {}), completed: true, times_visited: newVisits, last_visited_date: today }))
    visitValueRef.current = newVisits

    // DB write
    const { data: logData, error: logErr } = await supabase
      .from('ride_logs')
      .insert({ user_id: user.id, experience_id: id, challenge_item_id: challengeItemId, trip_id: tripId, ridden_at: now })
      .select('id')
      .single()

    if (logErr) {
      console.error('ride_logs insert failed:', logErr.message, logErr)
      // Don't revert the UI — keep the optimistic state and mark the queue entry
      // with a special prefix so removeLastRide knows it has no real DB row to delete
      setRideLogQueue(prev => prev.map(l =>
        l.id === tempId ? { ...l, id: `failed-${Date.now()}` } : l
      ))
    } else {
      // Swap temp ID for real ID
      setRideLogQueue(prev => prev.map(l => l.id === tempId ? { ...l, id: logData.id } : l))
    }

    await Promise.all([
      supabase.from('user_experiences').upsert(
        { user_id: user.id, experience_id: id, completed: true, times_visited: newVisits, last_visited_date: today },
        { onConflict: 'user_id,experience_id' }
      ),
      // Mark this song as collected in the Challenges section
      supabase.from('user_challenge_items').upsert(
        { user_id: user.id, challenge_item_id: challengeItemId, completed: true },
        { onConflict: 'user_id,challenge_item_id' }
      ),
    ])
  }

  // ── Guardians: remove the most recently logged ride ───────────────────────
  const removeLastRide = async () => {
    if (rideLogQueue.length === 0) return

    const last      = rideLogQueue[rideLogQueue.length - 1]
    const newVisits = Math.max(0, (userExp?.times_visited ?? 0) - 1)

    // Optimistic
    setSongs(prev => prev.map(s =>
      s.id === last.challenge_item_id ? { ...s, count: Math.max(0, s.count - 1) } : s
    ))
    setRideLogQueue(prev => prev.slice(0, -1))
    setUserExp(prev => ({
      ...(prev ?? {}),
      times_visited: newVisits,
      completed: newVisits > 0,
      last_visited_date: newVisits > 0 ? (prev?.last_visited_date ?? null) : null,
    }))
    visitValueRef.current = newVisits

    // Only delete rows that were successfully persisted
    // Find the new count for this song after removal
    const songNewCount = (songs.find(s => s.id === last.challenge_item_id)?.count ?? 1) - 1

    const writes = [
      supabase.from('user_experiences').upsert(
        { user_id: user.id, experience_id: id, times_visited: newVisits, completed: newVisits > 0,
          last_visited_date: newVisits > 0 ? (userExp?.last_visited_date ?? null) : null },
        { onConflict: 'user_id,experience_id' }
      ),
    ]

    if (!last.id.startsWith('temp-') && !last.id.startsWith('failed-')) {
      writes.push(supabase.from('ride_logs').delete().eq('id', last.id))
    }

    // If this was the last play of this song, unmark it in Challenges
    if (songNewCount === 0) {
      writes.push(
        supabase.from('user_challenge_items').upsert(
          { user_id: user.id, challenge_item_id: last.challenge_item_id, completed: false },
          { onConflict: 'user_id,challenge_item_id' }
        )
      )
    }

    await Promise.all(writes)
  }

  // ── Render ────────────────────────────────────────────────────────────────
  if (loading) return (
    <div className="flex items-center justify-center flex-1 py-20">
      <p className="text-gray-400 text-sm">Loading…</p>
    </div>
  )
  if (!exp) return null

  // For Guardians, ride_logs is the source of truth — never trust user_experiences counter
  const timesVisited = isGuardians ? rideLogQueue.length : (userExp?.times_visited ?? 0)
  const completed    = isGuardians ? rideLogQueue.length > 0 : (userExp?.completed ?? false)
  const wishlisted   = userExp?.wishlist ?? false
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

          {/* Times visited */}
          <Row label="Times visited">
            <div className="flex items-center gap-3">
              <StepButton direction="minus" onClick={() => changeVisits(-1)} disabled={timesVisited === 0} />
              <span className="text-sm font-bold text-gray-800 w-5 text-center tabular-nums">
                {timesVisited}
              </span>
              <StepButton direction="plus" onClick={() => changeVisits(1)} />
            </div>
          </Row>

          {/* Guardians: song list below stepper */}
          {isGuardians && songs.length > 0 && (
            <SongsSection songs={songs} />
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
          onClose={() => setSongPickerOpen(false)}
        />
      )}
    </div>
  )
}

// ── Guardians helpers ─────────────────────────────────────────────────────────

/** Merges challenge_items with ride_logs to produce [{ ...item, count }] */
function buildSongsFromLogs(items, rideLogs) {
  const countById = {}
  for (const log of rideLogs) {
    countById[log.challenge_item_id] = (countById[log.challenge_item_id] ?? 0) + 1
  }
  return items.map(item => ({ ...item, count: countById[item.id] ?? 0 }))
}

// ── Guardians: Songs list (read-only, shown below Times Visited) ──────────────

function SongsSection({ songs }) {
  return (
    <div className="border-t border-gray-100 mx-0 px-4 pt-3 pb-3.5">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2.5">Songs</p>
      <div className="flex flex-col gap-2.5">
        {songs.map(song => {
          const heard = song.count > 0
          return (
            <div key={song.id} className="flex items-center gap-3">
              <div
                className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center border-2"
                style={heard
                  ? { backgroundColor: '#1D9E75', borderColor: '#1D9E75' }
                  : { borderColor: '#D1D5DB' }}
              >
                {heard && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold leading-snug ${heard ? 'text-gray-800' : 'text-gray-400'}`}>
                  {song.title}
                </p>
                <p className="text-xs text-gray-400">{song.subtitle}</p>
              </div>
              {song.count > 0 && (
                <span
                  className="flex-shrink-0 text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: '#D1FAE5', color: '#059669' }}
                >
                  ×{song.count}
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Guardians: Song picker bottom sheet ───────────────────────────────────────

function SongPickerSheet({ open, songs, onSelect, onClose }) {
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
          <p className="text-sm text-gray-400 mt-0.5">Select the song that played on your ride</p>
        </div>

        <div className="flex flex-col px-3 pb-8">
          {songs.map(song => (
            <button
              key={song.id}
              onClick={() => onSelect(song.id)}
              className="w-full flex items-center gap-3 px-3 py-3.5 rounded-xl text-left active:bg-gray-50 transition-colors"
            >
              <div
                className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center border-2"
                style={{ borderColor: '#1D9E75' }}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                     style={{ color: '#1D9E75' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 leading-snug">{song.title}</p>
                <p className="text-xs text-gray-400">{song.subtitle}</p>
              </div>
              {song.count > 0 && (
                <span
                  className="flex-shrink-0 text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: '#D1FAE5', color: '#059669' }}
                >
                  ×{song.count}
                </span>
              )}
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
