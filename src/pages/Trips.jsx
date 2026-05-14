import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useLogVisit } from '../contexts/LogVisitContext'
import { supabase } from '../lib/supabaseClient'
import { PARK_EMOJI, PARK_COLORS } from '../lib/constants'

function groupByMonth(trips) {
  return trips.reduce((acc, trip) => {
    const key = new Date(trip.visit_date + 'T12:00:00').toLocaleDateString('en-US', {
      month: 'long', year: 'numeric',
    })
    if (!acc[key]) acc[key] = []
    acc[key].push(trip)
    return acc
  }, {})
}

export default function Trips() {
  const { user }         = useAuth()
  const { openLogVisit } = useLogVisit()
  const [trips, setTrips]     = useState([])
  const [ueMap, setUeMap]     = useState({})
  const [topAttr, setTopAttr] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      setLoading(true)

      const [{ data: tripsData }, { data: uesData }, { data: topData }] = await Promise.all([
        supabase
          .from('trips')
          .select('id, park, visit_date, notes, created_at, trip_experiences(experience_id, experiences(id, name, category))')
          .eq('user_id', user.id)
          .order('visit_date', { ascending: false })
          .order('created_at', { ascending: false }),
        supabase
          .from('user_experiences')
          .select('experience_id, times_visited')
          .eq('user_id', user.id),
        supabase
          .from('user_experiences')
          .select('experience_id, times_visited, experiences(name)')
          .eq('user_id', user.id)
          .order('times_visited', { ascending: false })
          .limit(1)
          .maybeSingle(),
      ])

      setTrips(tripsData || [])

      const map = {}
      ;(uesData || []).forEach(ue => { map[ue.experience_id] = ue.times_visited })
      setUeMap(map)

      setTopAttr(topData || null)
      setLoading(false)
    })()
  }, [user.id])

  // Stats
  const totalVisits = trips.length
  const parkCounts  = trips.reduce((acc, t) => { acc[t.park] = (acc[t.park] || 0) + 1; return acc }, {})
  const mostVisitedPark = Object.entries(parkCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null

  const monthGroups = groupByMonth(trips)
  const monthKeys   = Object.keys(monthGroups)

  return (
    <div className="flex flex-col min-h-full">

      {/* Header */}
      <div className="px-4 pt-4 pb-3 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">My trips</h2>
        <button
          onClick={openLogVisit}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-white text-xs font-bold active:scale-95 transition-transform"
          style={{ backgroundColor: '#1D9E75' }}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Log a visit
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <p className="text-gray-400 text-sm">Loading…</p>
        </div>
      ) : trips.length === 0 ? (
        <EmptyState onLog={openLogVisit} />
      ) : (
        <>
          {/* Stat boxes */}
          <div className="px-4 pb-4 grid grid-cols-3 gap-2">
            <StatBox label="Total Visits" value={totalVisits} />
            <StatBox
              label="Most Visited Park"
              value={mostVisitedPark ? PARK_EMOJI[mostVisitedPark] : '—'}
              sub={mostVisitedPark ?? '—'}
              emojiValue
            />
            <StatBox
              label="Most Visited Attraction"
              value="🎢"
              sub={topAttr?.experiences?.name ?? '—'}
              emojiValue
            />
          </div>

          {/* Visit history */}
          <div className="px-4 pb-2 flex items-center justify-between">
            <p className="text-sm font-bold text-gray-800">Visit history</p>
            <button className="flex items-center gap-1 text-xs font-medium text-gray-500 px-2.5 py-1 rounded-lg bg-gray-100 active:bg-gray-200 transition-colors">
              Filter
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Month groups */}
          <div className="px-4 flex flex-col gap-4 pb-8">
            {monthKeys.map(month => (
              <div key={month}>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">{month}</p>
                <div className="flex flex-col gap-3">
                  {monthGroups[month].map(trip => (
                    <TripCard key={trip.id} trip={trip} ueMap={ueMap} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function StatBox({ label, value, sub, emojiValue }) {
  return (
    <div className="bg-white rounded-2xl px-3 py-3 shadow-sm border border-gray-100 flex flex-col items-center text-center gap-0.5">
      <p className="text-xs text-gray-400 leading-tight">{label}</p>
      {emojiValue ? (
        <>
          <span className="text-2xl leading-none mt-0.5">{value}</span>
          <p className="text-xs font-semibold text-gray-700 leading-tight text-center break-words w-full">{sub}</p>
        </>
      ) : (
        <p className="text-2xl font-bold mt-0.5" style={{ color: '#1D9E75' }}>{value}</p>
      )}
    </div>
  )
}

function TripCard({ trip, ueMap }) {
  const navigate    = useNavigate()
  const emoji       = PARK_EMOJI[trip.park] ?? '🏞️'
  const parkColor   = PARK_COLORS[trip.park] ?? { bg: '#F3F4F6', color: '#374151' }
  const dateDisplay = new Date(trip.visit_date + 'T12:00:00').toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
  })

  const experiences = (trip.trip_experiences || [])
    .map(te => te.experiences)
    .filter(Boolean)

  const firstTime = experiences.filter(e => (ueMap[e.id] ?? 0) === 1)
  const repeats   = experiences.filter(e => (ueMap[e.id] ?? 0) > 1)

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Card header */}
      <div className="px-4 py-3 flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
          style={{ backgroundColor: parkColor.bg }}
        >
          {emoji}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-gray-800 truncate">{trip.park}</p>
          <p className="text-xs text-gray-500 mt-0.5">{dateDisplay}</p>
        </div>
        {experiences.length > 0 && (
          <div
            className="flex-shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold"
            style={{ backgroundColor: parkColor.bg, color: parkColor.color }}
          >
            {experiences.length}
          </div>
        )}
      </div>

      {/* Experience tags */}
      {experiences.length > 0 && (
        <div className="px-4 pb-3 flex flex-wrap gap-1.5">
          {firstTime.map(e => (
            <span
              key={e.id}
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ backgroundColor: '#D1FAE5', color: '#065F46' }}
            >
              {e.name}
            </span>
          ))}
          {repeats.map(e => (
            <span
              key={e.id}
              className="text-xs px-2 py-0.5 rounded-full font-medium bg-gray-100 text-gray-600"
            >
              {e.name}
            </span>
          ))}
        </div>
      )}

      {/* Notes */}
      {trip.notes && (
        <div className="px-4 pb-3">
          <p className="text-xs text-gray-500 italic leading-relaxed line-clamp-2">{trip.notes}</p>
        </div>
      )}

      {/* Footer */}
      <div
        className="px-4 py-2.5 flex items-center justify-between border-t border-gray-100"
        style={{ backgroundColor: '#FAFAFA' }}
      >
        <p className="text-xs text-gray-400">
          {firstTime.length > 0 && (
            <span style={{ color: '#059669' }} className="font-medium">{firstTime.length} new</span>
          )}
          {firstTime.length > 0 && repeats.length > 0 && (
            <span className="mx-1">·</span>
          )}
          {repeats.length > 0 && (
            <span>{repeats.length} repeat{repeats.length !== 1 ? 's' : ''}</span>
          )}
          {experiences.length === 0 && (
            <span>No experiences logged</span>
          )}
        </p>
        <button
          onClick={() => navigate(`/trips/${trip.id}`)}
          className="text-xs font-semibold active:opacity-70 transition-opacity"
          style={{ color: '#1D9E75' }}
        >
          View details →
        </button>
      </div>
    </div>
  )
}

function EmptyState({ onLog }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-4 px-6 py-16">
      <span className="text-5xl">✈️</span>
      <div className="text-center">
        <p className="text-gray-700 font-semibold text-base">No trips logged yet</p>
        <p className="text-gray-400 text-sm mt-1 leading-relaxed">
          Tap "Log a visit" to get started.
        </p>
      </div>
      <button
        onClick={onLog}
        className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-sm active:scale-95 transition-transform"
        style={{ backgroundColor: '#1D9E75' }}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Log your first visit
      </button>
    </div>
  )
}
