import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useLogVisit } from '../contexts/LogVisitContext'
import { supabase } from '../lib/supabaseClient'
import { PARKS, PARK_EMOJI, PARK_COLORS, GUARDIANS_EXPERIENCE_ID, GUARDIANS_CHALLENGE_ID } from '../lib/constants'
import ParkIcon from '../lib/ParkIcon'

// ── Filter constants ───────────────────────────────────────────────────────
const ALL_PARKS  = 'All parks'
const ALL_TIME   = 'All time'
const PARK_OPTIONS   = [ALL_PARKS, ...PARKS.map(p => p.name)]
const PERIOD_OPTIONS = [ALL_TIME, 'This month', 'This year']

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

function applyFilters(trips, park, period) {
  const now = new Date()
  return trips.filter(trip => {
    if (park !== ALL_PARKS && trip.park !== park) return false
    if (period !== ALL_TIME) {
      const d = new Date(trip.visit_date + 'T12:00:00')
      if (period === 'This month' &&
          (d.getMonth() !== now.getMonth() || d.getFullYear() !== now.getFullYear())) return false
      if (period === 'This year' && d.getFullYear() !== now.getFullYear()) return false
    }
    return true
  })
}

export default function Trips() {
  const { user }         = useAuth()
  const { openLogVisit } = useLogVisit()
  const [trips, setTrips]           = useState([])
  const [ueMap, setUeMap]           = useState({})
  const [topAttr, setTopAttr]       = useState(null)
  const [songsByTrip, setSongsByTrip] = useState({}) // tripId → [songTitle, ...]
  const [loading, setLoading]       = useState(true)

  // ── Filter state ──────────────────────────────────────────────────────────
  const [filterPark,   setFilterPark]   = useState(ALL_PARKS)
  const [filterPeriod, setFilterPeriod] = useState(ALL_TIME)
  const [sheetOpen,    setSheetOpen]    = useState(false)

  // Pending selections inside the sheet (applied on "Apply")
  const [pendingPark,   setPendingPark]   = useState(ALL_PARKS)
  const [pendingPeriod, setPendingPeriod] = useState(ALL_TIME)

  const filtersActive = filterPark !== ALL_PARKS || filterPeriod !== ALL_TIME

  const openSheet = () => {
    setPendingPark(filterPark)
    setPendingPeriod(filterPeriod)
    setSheetOpen(true)
  }
  const applySheet = () => {
    setFilterPark(pendingPark)
    setFilterPeriod(pendingPeriod)
    setSheetOpen(false)
  }
  const resetSheet = () => {
    setPendingPark(ALL_PARKS)
    setPendingPeriod(ALL_TIME)
  }

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const [{ data: tripsData }, { data: uesData }, { data: topData }, { data: rideLogs }, { data: songItems }] = await Promise.all([
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
        supabase
          .from('ride_logs')
          .select('trip_id, challenge_item_id')
          .eq('user_id', user.id)
          .eq('experience_id', GUARDIANS_EXPERIENCE_ID)
          .not('trip_id', 'is', null),
        supabase
          .from('challenge_items')
          .select('id, title')
          .eq('challenge_id', GUARDIANS_CHALLENGE_ID),
      ])

      setTrips(tripsData || [])
      const map = {}
      ;(uesData || []).forEach(ue => { map[ue.experience_id] = ue.times_visited })
      setUeMap(map)
      setTopAttr(topData || null)

      // Build songsByTrip map
      const songTitleById = {}
      ;(songItems || []).forEach(s => { songTitleById[s.id] = s.title })
      const songMap = {}
      ;(rideLogs || []).forEach(log => {
        if (!log.trip_id || !log.challenge_item_id) return
        if (!songMap[log.trip_id]) songMap[log.trip_id] = []
        const title = songTitleById[log.challenge_item_id]
        if (title && !songMap[log.trip_id].includes(title)) songMap[log.trip_id].push(title)
      })
      setSongsByTrip(songMap)

      setLoading(false)
    })()
  }, [user.id])

  // Stats always reflect ALL trips (not filtered)
  const totalVisits     = trips.length
  const parkCounts      = trips.reduce((acc, t) => { acc[t.park] = (acc[t.park] || 0) + 1; return acc }, {})
  const mostVisitedPark = Object.entries(parkCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null

  // Filtered trips for the history list
  const filteredTrips = applyFilters(trips, filterPark, filterPeriod)
  const monthGroups   = groupByMonth(filteredTrips)
  const monthKeys     = Object.keys(monthGroups)

  return (
    <div className="flex flex-col min-h-full">

      {/* ── Header ── */}
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

          {/* Visit history header + Filter button */}
          <div className="px-4 pb-2 flex items-center justify-between">
            <p className="text-sm font-bold text-gray-800">Visit history</p>
            <button
              onClick={openSheet}
              className="relative flex items-center gap-1 text-xs font-medium text-gray-500 px-2.5 py-1 rounded-lg bg-gray-100 active:bg-gray-200 transition-colors"
            >
              Filter
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
              {/* Active indicator dot */}
              {filtersActive && (
                <span
                  className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-white"
                  style={{ backgroundColor: '#1D9E75' }}
                />
              )}
            </button>
          </div>

          {/* Active filter chips */}
          {filtersActive && (
            <div className="px-4 pb-2 flex gap-2 flex-wrap">
              {filterPark !== ALL_PARKS && (
                <span className="text-xs font-medium px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: '#1D9E75' }}>
                  {PARK_EMOJI[filterPark]} {filterPark}
                </span>
              )}
              {filterPeriod !== ALL_TIME && (
                <span className="text-xs font-medium px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: '#1D9E75' }}>
                  {filterPeriod}
                </span>
              )}
            </div>
          )}

          {/* Month groups */}
          {filteredTrips.length === 0 ? (
            <div className="flex flex-col items-center py-16 gap-3 px-6">
              <span className="text-4xl">🔍</span>
              <p className="text-gray-700 font-semibold text-base text-center">No trips match your filters</p>
              <button
                onClick={() => { setFilterPark(ALL_PARKS); setFilterPeriod(ALL_TIME) }}
                className="text-sm font-semibold"
                style={{ color: '#1D9E75' }}
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="px-4 flex flex-col gap-4 pb-8">
              {monthKeys.map(month => (
                <div key={month}>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">{month}</p>
                  <div className="flex flex-col gap-3">
                    {monthGroups[month].map(trip => (
                      <TripCard key={trip.id} trip={trip} ueMap={ueMap} songs={songsByTrip[trip.id] ?? []} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* ── Filter bottom sheet ── */}
      {sheetOpen && (
        <div
          className="fixed inset-0 z-40 flex items-end justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
          onClick={() => setSheetOpen(false)}
        >
          <div
            className="w-full max-w-[375px] bg-white rounded-t-3xl pb-8"
            onClick={e => e.stopPropagation()}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-4">
              <div className="w-10 h-1 rounded-full bg-gray-200" />
            </div>

            {/* Park filter */}
            <p className="px-5 pb-2 text-xs font-bold text-gray-400 uppercase tracking-wide">
              Filter by park
            </p>
            <div className="flex flex-col">
              {PARK_OPTIONS.map(option => (
                <button
                  key={option}
                  onClick={() => setPendingPark(option)}
                  className="flex items-center justify-between px-5 py-3 active:bg-gray-50 transition-colors"
                >
                  <span className={`text-sm ${pendingPark === option ? 'font-bold text-gray-900' : 'font-medium text-gray-600'}`}>
                    {option !== ALL_PARKS && PARK_EMOJI[option] ? `${PARK_EMOJI[option]}  ` : ''}{option}
                  </span>
                  {pendingPark === option && (
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="#1D9E75" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  )}
                </button>
              ))}
            </div>

            <div className="h-px bg-gray-100 mx-5 my-3" />

            {/* Time period filter */}
            <p className="px-5 pb-2 text-xs font-bold text-gray-400 uppercase tracking-wide">
              Filter by time period
            </p>
            <div className="flex flex-col">
              {PERIOD_OPTIONS.map(option => (
                <button
                  key={option}
                  onClick={() => setPendingPeriod(option)}
                  className="flex items-center justify-between px-5 py-3 active:bg-gray-50 transition-colors"
                >
                  <span className={`text-sm ${pendingPeriod === option ? 'font-bold text-gray-900' : 'font-medium text-gray-600'}`}>
                    {option}
                  </span>
                  {pendingPeriod === option && (
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="#1D9E75" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  )}
                </button>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 px-5 mt-5">
              <button
                onClick={resetSheet}
                className="flex-1 py-3 rounded-xl text-sm font-bold bg-gray-100 text-gray-600 active:bg-gray-200 transition-colors"
              >
                Reset
              </button>
              <button
                onClick={applySheet}
                className="flex-1 py-3 rounded-xl text-sm font-bold text-white active:opacity-90 transition-opacity"
                style={{ backgroundColor: '#1D9E75' }}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Sub-components ─────────────────────────────────────────────────────────

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

function TripCard({ trip, ueMap, songs = [] }) {
  const navigate    = useNavigate()
  const parkColor   = PARK_COLORS[trip.park] ?? { bg: '#F3F4F6', color: '#374151' }
  const dateDisplay = new Date(trip.visit_date + 'T12:00:00').toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
  })

  const experiences = (trip.trip_experiences || []).map(te => te.experiences).filter(Boolean)
  const firstTime   = experiences.filter(e => (ueMap[e.id] ?? 0) === 1)
  const repeats     = experiences.filter(e => (ueMap[e.id] ?? 0) > 1)

  return (
    <button
      onClick={() => navigate(`/trips/${trip.id}`)}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden w-full text-left active:scale-[0.98] transition-transform"
    >
      <div className="px-4 py-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
             style={{ backgroundColor: parkColor.bg }}>
          <ParkIcon park={trip.park} size={20} color={parkColor.color} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-gray-800 truncate">{trip.park}</p>
          <p className="text-xs text-gray-500 mt-0.5">{dateDisplay}</p>
        </div>
        {experiences.length > 0 && (
          <div className="flex-shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold"
               style={{ backgroundColor: parkColor.bg, color: parkColor.color }}>
            {experiences.length}
          </div>
        )}
      </div>

      {(experiences.length > 0 || songs.length > 0) && (
        <div className="px-4 pb-3 flex flex-wrap gap-1.5">
          {firstTime.map(e => (
            <span key={e.id} className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ backgroundColor: '#D1FAE5', color: '#065F46' }}>
              {e.name}
            </span>
          ))}
          {repeats.map(e => (
            <span key={e.id} className="text-xs px-2 py-0.5 rounded-full font-medium bg-gray-100 text-gray-600">
              {e.name}
            </span>
          ))}
          {songs.map(song => (
            <span key={song} className="text-xs px-2 py-0.5 rounded-full font-bold text-white flex items-center gap-1"
                  style={{ backgroundColor: '#1D9E75' }}>
              🎵 {song}
            </span>
          ))}
        </div>
      )}

      {trip.notes && (
        <div className="px-4 pb-3">
          <p className="text-xs text-gray-500 italic leading-relaxed line-clamp-2">{trip.notes}</p>
        </div>
      )}

      <div className="px-4 py-2.5 border-t border-gray-100" style={{ backgroundColor: '#FAFAFA' }}>
        <p className="text-xs text-gray-400">
          {firstTime.length > 0 && (
            <span style={{ color: '#059669' }} className="font-medium">{firstTime.length} new</span>
          )}
          {firstTime.length > 0 && repeats.length > 0 && <span className="mx-1">·</span>}
          {repeats.length > 0 && <span>{repeats.length} repeat{repeats.length !== 1 ? 's' : ''}</span>}
          {experiences.length === 0 && <span>No experiences logged</span>}
        </p>
      </div>
    </button>
  )
}

function EmptyState({ onLog }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-4 px-6 py-16">
      <span className="text-5xl">✈️</span>
      <div className="text-center">
        <p className="text-gray-700 font-semibold text-base">No trips logged yet</p>
        <p className="text-gray-400 text-sm mt-1 leading-relaxed">Tap "Log a visit" to get started.</p>
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
