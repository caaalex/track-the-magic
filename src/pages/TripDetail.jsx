import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useLogVisit } from '../contexts/LogVisitContext'
import { supabase } from '../lib/supabaseClient'
import ParkIcon from '../lib/ParkIcon'

export default function TripDetail() {
  const { id }         = useParams()
  const navigate       = useNavigate()
  const location       = useLocation()
  const { user }       = useAuth()
  const { openLogVisit } = useLogVisit()

  const [trip,        setTrip]        = useState(null)
  const [experiences, setExperiences] = useState([]) // { experience, isNew }
  const [loading,     setLoading]     = useState(true)
  const [deleting,    setDeleting]    = useState(false)

  const handleDelete = async () => {
    if (!window.confirm('Delete this trip? This removes the visit from your history. Your tracked experiences stay marked as done.')) return
    setDeleting(true)
    // Detach any Guardians ride logs so the trip delete never hits a FK block
    await supabase.from('ride_logs').update({ trip_id: null }).eq('trip_id', id).eq('user_id', user.id)
    const { error } = await supabase.from('trips').delete().eq('id', id)
    if (error) {
      console.error('Delete trip error:', error)
      setDeleting(false)
      window.alert('Could not delete the trip. Please try again.')
      return
    }
    navigate('/trips')
  }

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)

      // 1. Fetch trip + this trip's experiences (with full experience details)
      const [{ data: tripData, error: tripError }, { data: tripExps }] = await Promise.all([
        supabase.from('trips').select('*').eq('id', id).single(),
        supabase
          .from('trip_experiences')
          .select('experience_id, experiences(id, name, category, type, location)')
          .eq('trip_id', id),
      ])

      if (cancelled) return
      if (tripError || !tripData) { navigate('/trips'); return }

      // 2. Find trips by this user that happened BEFORE this one
      //    — strictly earlier date, or same date but created earlier
      const [{ data: strictlyBefore }, { data: sameDay }] = await Promise.all([
        supabase
          .from('trips')
          .select('id')
          .eq('user_id', user.id)
          .neq('id', id)
          .lt('visit_date', tripData.visit_date),
        supabase
          .from('trips')
          .select('id')
          .eq('user_id', user.id)
          .neq('id', id)
          .eq('visit_date', tripData.visit_date)
          .lt('created_at', tripData.created_at),
      ])

      if (cancelled) return

      const priorTripIds = [
        ...(strictlyBefore || []).map(t => t.id),
        ...(sameDay        || []).map(t => t.id),
      ]

      // 3. Get experience IDs that appeared in prior trips
      let priorExpIds = new Set()
      if (priorTripIds.length > 0) {
        const { data: priorExps } = await supabase
          .from('trip_experiences')
          .select('experience_id')
          .in('trip_id', priorTripIds)
        priorExpIds = new Set((priorExps || []).map(te => te.experience_id))
      }

      if (cancelled) return

      // 4. Enrich each experience with isNew flag
      const enriched = (tripExps || [])
        .map(te => ({
          experience: te.experiences,
          isNew: !priorExpIds.has(te.experience_id),
        }))
        .filter(e => e.experience != null)
        // New experiences first, then repeats, each group alphabetical
        .sort((a, b) => {
          if (a.isNew !== b.isNew) return a.isNew ? -1 : 1
          return a.experience.name.localeCompare(b.experience.name)
        })

      setTrip(tripData)
      setExperiences(enriched)
      setLoading(false)
    })()
    return () => { cancelled = true }
  }, [id, user.id, navigate, location.key])

  if (loading) return (
    <div className="flex items-center justify-center flex-1 py-20">
      <p className="text-gray-400 text-sm">Loading…</p>
    </div>
  )
  if (!trip) return null

  const dateDisplay = new Date(trip.visit_date + 'T12:00:00').toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  })

  const newCount    = experiences.filter(e =>  e.isNew).length
  const repeatCount = experiences.filter(e => !e.isNew).length

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
          onClick={() => navigate('/trips')}
          className="w-9 h-9 -ml-2 flex items-center justify-center rounded-full active:opacity-60 transition-opacity"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <p className="ml-1 text-base font-bold text-gray-900">{dateDisplay}</p>
      </div>

      <div className="px-4 pt-4 pb-8">

        {/* ── Hero ── */}
        <div className="flex items-center gap-2">
          <ParkIcon park={trip.park} size={16} color="#78716C" />
          <p className="text-xs text-gray-400">{trip.park}</p>
        </div>
        <p
          className="text-gray-900 tabular-nums leading-tight"
          style={{ fontSize: 40, fontWeight: 300, letterSpacing: '-0.02em' }}
        >
          {experiences.length}{' '}
          <span className="text-base font-normal text-gray-300">
            experience{experiences.length !== 1 ? 's' : ''}
          </span>
        </p>
        <div className="mt-3 pt-3 flex flex-col gap-1.5" style={{ borderTop: '1px solid #EDEBE6' }}>
          <div className="flex items-baseline justify-between">
            <p className="text-xs text-gray-400">New experiences</p>
            <p className="text-[13px] text-gray-900 tabular-nums">{newCount}</p>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-xs text-gray-400">Repeats</p>
            <p className="text-[13px] text-gray-900 tabular-nums">{repeatCount}</p>
          </div>
        </div>

        {/* ── Notes ── */}
        {trip.notes && (
          <div className="mt-5 pt-4" style={{ borderTop: '1px solid #E7E5E0' }}>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.12em] mb-1.5">Trip notes</p>
            <p className="text-sm text-gray-600 leading-relaxed">{trip.notes}</p>
          </div>
        )}

        {/* ── Experiences logged ── */}
        {experiences.length > 0 && (
          <div className="mt-5 pt-4" style={{ borderTop: '1px solid #E7E5E0' }}>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.12em]">
              Experiences logged
            </p>
            <div>
              {experiences.map(({ experience }, idx) => (
                <button
                  key={experience.id}
                  onClick={() => navigate(`/tracker/${experience.id}`, { state: { tripId: trip.id } })}
                  className="w-full flex items-center gap-3 py-3.5 text-left active:opacity-60"
                  style={{
                    borderBottom: idx < experiences.length - 1 ? '1px solid #EDEBE6' : 'none',
                    transition: 'opacity 0.2s ease',
                  }}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] text-gray-900 leading-snug">
                      {experience.name}
                    </p>
                    {(experience.location || experience.type) && (
                      <p className="text-[11px] mt-0.5 flex items-center gap-1">
                        {experience.location && <span className="text-gray-500">{experience.location}</span>}
                        {experience.location && experience.type && <span className="text-gray-300">|</span>}
                        {experience.type && <span className="text-gray-400">{experience.type}</span>}
                      </p>
                    )}
                  </div>
                  <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Actions ── */}
        <div className="mt-4 pt-4 flex items-center justify-between" style={{ borderTop: '1px solid #E7E5E0' }}>
          <button
            onClick={() => openLogVisit({ park: trip.park, date: trip.visit_date, tripId: trip.id })}
            className="flex items-center gap-1.5 text-[13px] font-semibold active:opacity-60"
            style={{ color: '#1D9E75', transition: 'opacity 0.2s ease' }}
          >
            Add experiences to this trip
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="text-[13px] font-semibold text-red-500 active:opacity-60 disabled:opacity-50"
            style={{ transition: 'opacity 0.2s ease' }}
          >
            {deleting ? 'Deleting…' : 'Delete trip'}
          </button>
        </div>

      </div>
    </div>
  )
}
