import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useLogVisit } from '../contexts/LogVisitContext'
import { supabase } from '../lib/supabaseClient'
import { PARK_COLORS } from '../lib/constants'
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
  const colors = PARK_COLORS[trip.park] ?? { bg: '#F3F4F6', color: '#374151' }

  const newCount    = experiences.filter(e =>  e.isNew).length
  const repeatCount = experiences.filter(e => !e.isNew).length

  return (
    <div className="flex flex-col bg-gray-50 min-h-full">

      {/* ── Top bar ── */}
      <div className="flex items-center px-4 pt-4 pb-3 bg-white border-b border-gray-100 sticky top-0 z-10">
        <button
          onClick={() => navigate('/trips')}
          className="w-9 h-9 flex items-center justify-center rounded-full active:bg-gray-100 transition-colors"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <p className="ml-1 text-base font-bold text-gray-900">{dateDisplay}</p>
      </div>

      <div className="flex flex-col gap-4 px-4 py-4 pb-8">

        {/* ── Trip summary card ── */}
        <div className="bg-white rounded-2xl px-4 py-3.5 card-shadow">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: colors.bg }}
            >
              <ParkIcon park={trip.park} size={22} color={colors.color} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-800">{trip.park}</p>
              <p className="text-xs text-gray-400 mt-0.5">{dateDisplay}</p>
            </div>
            <div
              className="flex-shrink-0 px-3 py-1 rounded-full text-xs font-bold"
              style={{ backgroundColor: colors.bg, color: colors.color }}
            >
              {experiences.length} experience{experiences.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {/* ── Stats row ── */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl px-4 py-3.5 card-shadow text-center">
            <p className="text-xs text-gray-400 mb-1">New experiences</p>
            <p className="text-2xl font-bold" style={{ color: '#1D9E75' }}>{newCount}</p>
          </div>
          <div className="bg-white rounded-2xl px-4 py-3.5 card-shadow text-center">
            <p className="text-xs text-gray-400 mb-1">Repeats</p>
            <p className="text-2xl font-bold" style={{ color: '#1D9E75' }}>{repeatCount}</p>
          </div>
        </div>

        {/* ── Notes card ── */}
        {trip.notes && (
          <div className="bg-white rounded-2xl px-4 py-3.5 card-shadow">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Trip notes</p>
            <p className="text-sm text-gray-600 leading-relaxed">{trip.notes}</p>
          </div>
        )}

        {/* ── Experiences logged ── */}
        {experiences.length > 0 && (
          <>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
              Experiences logged
            </p>

            <div className="bg-white rounded-2xl card-shadow overflow-hidden">
              {experiences.map(({ experience, isNew }, idx) => (
                <div key={experience.id}>
                  {idx > 0 && <div className="h-px bg-gray-100 mx-4" />}
                  <button
                    onClick={() => navigate(`/tracker/${experience.id}`, { state: { tripId: trip.id } })}
                    className="w-full flex items-center gap-3 px-4 py-3.5 text-left active:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 leading-snug">
                        {experience.name}
                      </p>
                      {(experience.location || experience.type) && (
                        <p className="text-xs mt-0.5 flex items-center gap-1">
                          {experience.location && <span className="text-gray-500 font-medium">{experience.location}</span>}
                          {experience.location && experience.type && <span className="text-gray-300">|</span>}
                          {experience.type && <span className="text-gray-400">{experience.type}</span>}
                        </p>
                      )}
                    </div>
                    <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── Add experiences button ── */}
        <button
          onClick={() => openLogVisit({ park: trip.park, date: trip.visit_date, tripId: trip.id })}
          className="w-full py-3.5 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-transform mt-2"
          style={{ backgroundColor: '#1D9E75' }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add experiences to this trip
        </button>

      </div>
    </div>
  )
}
