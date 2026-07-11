import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useLogVisit } from '../contexts/LogVisitContext'
import { supabase } from '../lib/supabaseClient'
import { PARKS, GUARDIANS_EXPERIENCE_ID, GUARDIANS_CHALLENGE_ID } from '../lib/constants'
import { Search, Plane, ArrowRight, ChevronRight } from 'lucide-react'
import ParkIcon from '../lib/ParkIcon'
import Avatar from '../components/Avatar'
import { useReveal } from '../lib/useReveal'

// ── Filter constants ───────────────────────────────────────────────────────
const ALL_PARKS  = 'All parks'
const ALL_TIME   = 'All time'
const PARK_OPTIONS   = [ALL_PARKS, ...PARKS.map(p => p.name)]
const BASE_PERIODS   = [ALL_TIME]

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
  return trips.filter(trip => {
    if (park !== ALL_PARKS && trip.park !== park) return false
    if (/^\d{4}$/.test(period)) {
      const d = new Date(trip.visit_date + 'T12:00:00')
      if (d.getFullYear() !== Number(period)) return false
    }
    return true
  })
}

export default function Trips() {
  const { user }         = useAuth()
  const { openLogVisit, savedCount } = useLogVisit()
  const navigate         = useNavigate()
  const [trips, setTrips]           = useState([])
  const [ueMap, setUeMap]           = useState({})
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
      const [{ data: tripsData }, { data: uesData }, { data: rideLogs }, { data: songItems }] = await Promise.all([
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
  }, [user.id, savedCount])

  // Stats always reflect ALL trips (not filtered)
  const totalVisits     = trips.length
  const reveal          = useReveal(!loading)

  // Year wheel options: from the current year back to when Disney World opened (1971)
  const currentYear   = new Date().getFullYear()
  const yearOptions    = []
  for (let y = currentYear; y >= 1971; y--) yearOptions.push(y)
  const pendingIsYear  = /^\d{4}$/.test(pendingPeriod)

  // Filtered trips for the history list
  const filteredTrips = applyFilters(trips, filterPark, filterPeriod)
  const monthGroups   = groupByMonth(filteredTrips)
  const monthKeys     = Object.keys(monthGroups)

  return (
    <div className="flex flex-col min-h-full">

      {/* ── Header ── */}
      <div className="px-4 pt-5 pb-3 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">My trips</h2>
        <button onClick={() => navigate('/profile')} className="active:opacity-70">
          <Avatar user={user} />
        </button>
      </div>

      {loading ? (
        <div className="px-4 pt-2 animate-pulse">
          <div className="h-3 rounded-full bg-gray-100 w-24" />
          <div className="h-10 rounded-lg bg-gray-100 w-20 mt-3" />
          <div className="h-3 rounded-full bg-gray-100 w-full mt-5" />
          <div className="h-3 rounded-full bg-gray-100 w-3/4 mt-2" />
          <div className="mt-10 flex flex-col gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-md bg-gray-100 flex-shrink-0" />
                <div className="flex-1 flex flex-col gap-2">
                  <div className="h-3 rounded-full bg-gray-100 w-1/2" />
                  <div className="h-2.5 rounded-full bg-gray-100 w-1/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : trips.length === 0 ? (
        <EmptyState onLog={openLogVisit} />
      ) : (
        <>
          {/* Stats */}
          <div className="px-4 pt-1 pb-4">
            <p className="text-sm text-gray-400">Visits logged</p>
            <div className="flex items-end justify-between">
              <p
                className="text-gray-900 tabular-nums leading-tight"
                style={{ fontSize: 40, fontWeight: 300, letterSpacing: '-0.02em' }}
              >
                {Math.round(totalVisits * reveal)}
              </p>
              <button
                onClick={openLogVisit}
                className="flex items-center gap-1.5 text-[14px] font-semibold active:opacity-60 mb-2"
                style={{ color: '#1D9E75', transition: 'opacity 0.2s ease' }}
              >
                Log a visit
                <ArrowRight size={14} strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Visit history header + Filter button */}
          <div className="px-4 pt-4 pb-1 mx-0 flex items-center justify-between" style={{ borderTop: '1px solid #E7E5E0' }}>
            <p className="text-[12px] font-semibold text-gray-400 uppercase tracking-[0.12em]">Visit history</p>
            <button
              onClick={openSheet}
              className="relative flex items-center gap-1 text-xs font-medium active:opacity-60"
              style={{ color: filtersActive ? '#1D9E75' : '#78716C', transition: 'opacity 0.2s ease' }}
            >
              Filter
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Active filter chips */}
          {filtersActive && (
            <div className="px-4 pt-1.5 pb-1 flex gap-2 flex-wrap">
              {filterPark !== ALL_PARKS && (
                <span className="text-xs font-semibold px-3 py-1 rounded-full"
                      style={{ border: '1px solid #1D9E75', color: '#1D9E75' }}>
                  {filterPark}
                </span>
              )}
              {filterPeriod !== ALL_TIME && (
                <span className="text-xs font-semibold px-3 py-1 rounded-full"
                      style={{ border: '1px solid #1D9E75', color: '#1D9E75' }}>
                  {filterPeriod}
                </span>
              )}
            </div>
          )}

          {/* Month groups */}
          {filteredTrips.length === 0 ? (
            <div className="flex flex-col items-center py-16 gap-3 px-6">
              <Search size={26} color="#C5C1BB" strokeWidth={1.5} />
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
            <div className="px-4 flex flex-col gap-2 pb-8">
              {monthKeys.map(month => (
                <div key={month} className="pt-2">
                  <p className="text-[12px] font-medium text-gray-400">{month}</p>
                  <div>
                    {monthGroups[month].map((trip, i) => (
                      <TripRow key={trip.id} trip={trip} last={i === monthGroups[month].length - 1} />
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
          className="fixed inset-0 z-50 flex items-end justify-center"
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
            <p className="px-5 pb-2 text-[12px] font-semibold text-gray-400 uppercase tracking-[0.12em]">
              Filter by park
            </p>
            <div className="flex flex-col">
              {PARK_OPTIONS.map(option => (
                <button
                  key={option}
                  onClick={() => setPendingPark(option)}
                  className="flex items-center gap-3 px-5 py-2.5 active:bg-gray-50 transition-colors"
                >
                  {option !== ALL_PARKS && (
                    <ParkIcon park={option} size={18} color="#78716C" />
                  )}
                  <span className={`flex-1 text-left text-sm ${pendingPark === option ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
                    {option}
                  </span>
                  {pendingPark === option && (
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="#1D9E75" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  )}
                </button>
              ))}
            </div>

            <div className="mx-5 my-3" style={{ borderTop: '1px solid #EDEBE6' }} />

            {/* Time period filter */}
            <p className="px-5 pb-2 text-[12px] font-semibold text-gray-400 uppercase tracking-[0.12em]">
              Filter by time period
            </p>
            <div className="flex flex-col">
              {BASE_PERIODS.map(option => (
                <button
                  key={option}
                  onClick={() => setPendingPeriod(option)}
                  className="flex items-center justify-between px-5 py-3 active:bg-gray-50 transition-colors"
                >
                  <span className={`text-sm ${pendingPeriod === option ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
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

            {/* Specific year — native rotating wheel picker */}
            <div className="mx-5 mt-2 mb-2" style={{ borderTop: '1px solid #EDEBE6' }} />
            <div className="px-5 pb-1">
              <div
                className="relative rounded-xl"
                style={{ border: `1px solid ${pendingIsYear ? '#1D9E75' : '#E7E5E0'}` }}
              >
                <div className="flex items-center justify-between px-4 py-3 pointer-events-none">
                  <span className={`text-sm ${pendingIsYear ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>
                    {pendingIsYear ? pendingPeriod : 'Filter by a specific year'}
                  </span>
                  {pendingIsYear ? (
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="#1D9E75" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 flex-shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </div>
                {/* Invisible native select overlay — iOS renders it as a rotating wheel */}
                <select
                  value={pendingIsYear ? pendingPeriod : ''}
                  onChange={e => setPendingPeriod(e.target.value === '' ? ALL_TIME : e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  style={{ WebkitAppearance: 'none', appearance: 'none' }}
                  aria-label="Filter by a specific year"
                >
                  <option value="">Any year</option>
                  {yearOptions.map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 px-5 mt-5">
              <button
                onClick={resetSheet}
                className="flex-1 py-3 rounded-xl text-sm font-semibold text-gray-600 active:opacity-60 transition-opacity"
                style={{ border: '1px solid #E7E5E0' }}
              >
                Reset
              </button>
              <button
                onClick={applySheet}
                className="flex-1 py-3 rounded-xl text-sm font-semibold text-white active:opacity-90 transition-opacity"
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

function TripRow({ trip, last }) {
  const navigate    = useNavigate()
  const dateDisplay = new Date(trip.visit_date + 'T12:00:00').toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
  })
  const expCount = (trip.trip_experiences || []).length

  return (
    <button
      onClick={() => navigate(`/trips/${trip.id}`)}
      className="w-full flex items-center gap-3 py-3.5 text-left active:opacity-60"
      style={{
        borderBottom: last ? 'none' : '1px solid #EDEBE6',
        transition: 'opacity 0.2s ease',
      }}
    >
      <ParkIcon park={trip.park} size={18} color="#78716C" />
      <div className="flex-1 min-w-0">
        <p className="text-[14px] text-gray-900">{trip.park}</p>
        <div className="flex items-baseline justify-between gap-2 mt-0.5">
          <p className="text-[12px] text-gray-400">{dateDisplay}</p>
          {expCount > 0 && (
            <span className="text-[12px] text-gray-400 tabular-nums flex-shrink-0">
              {expCount} {expCount === 1 ? 'experience' : 'experiences'}
            </span>
          )}
        </div>
      </div>
      <ChevronRight size={15} color="#D6D3D1" strokeWidth={2} className="flex-shrink-0" />
    </button>
  )
}

function EmptyState({ onLog }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-3 px-6 py-16">
      <Plane size={26} color="#C5C1BB" strokeWidth={1.5} />
      <div className="text-center">
        <p className="text-gray-700 font-semibold text-base">No trips logged yet</p>
        <p className="text-gray-400 text-[12px] mt-1 leading-relaxed">Log a visit to start building your Disney history.</p>
      </div>
      <button
        onClick={onLog}
        className="flex items-center gap-1.5 text-[14px] font-semibold mt-1 active:opacity-60"
        style={{ color: '#1D9E75', transition: 'opacity 0.2s ease' }}
      >
        Log a visit
        <ArrowRight size={14} strokeWidth={2} />
      </button>
    </div>
  )
}
