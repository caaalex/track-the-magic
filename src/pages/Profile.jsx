import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabaseClient'
import { PARK_EMOJI } from '../lib/constants'

// ── Avatar (same logic as Home) ────────────────────────────────────────────
function Avatar({ name, size = 60 }) {
  const parts   = (name || '').trim().split(/\s+/)
  const initials = parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : (name || '').slice(0, 2).toUpperCase()
  return (
    <div
      className="rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
      style={{ width: size, height: size, backgroundColor: '#5B21B6', fontSize: size * 0.3 }}
    >
      {initials}
    </div>
  )
}

// ── Stat row ──────────────────────────────────────────────────────────────
function StatRow({ label, value }) {
  return (
    <div className="flex items-center justify-between px-4 py-3.5">
      <p className="text-sm font-medium text-gray-700">{label}</p>
      <p className="text-sm font-bold text-gray-900">{value}</p>
    </div>
  )
}

function RowDivider() {
  return <div className="h-px bg-gray-100 mx-4" />
}

export default function Profile() {
  const { user, signOut } = useAuth()
  const navigate          = useNavigate()

  const [stats,   setStats]   = useState(null)
  const [loading, setLoading] = useState(true)

  // Display name edit state
  const [displayName,    setDisplayName]    = useState(user?.user_metadata?.full_name ?? '')
  const [editingName,    setEditingName]    = useState(false)
  const [nameInput,      setNameInput]      = useState('')
  const [savingName,     setSavingName]     = useState(false)

  useEffect(() => {
    ;(async () => {
      setLoading(true)

      const [
        { count: expCount },
        { count: tripCount },
        { data: trips },
        { data: topAttr },
        { data: challenges },
        { data: allItems },
        { data: userItems },
      ] = await Promise.all([
        supabase
          .from('user_experiences')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .eq('completed', true),
        supabase
          .from('trips')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id),
        supabase
          .from('trips')
          .select('park')
          .eq('user_id', user.id),
        supabase
          .from('user_experiences')
          .select('experience_id, times_visited, experiences(name)')
          .eq('user_id', user.id)
          .eq('completed', true)
          .order('times_visited', { ascending: false })
          .limit(1)
          .maybeSingle(),
        supabase
          .from('challenges')
          .select('id')
          .eq('is_active', true),
        supabase
          .from('challenge_items')
          .select('id, challenge_id'),
        supabase
          .from('user_challenge_items')
          .select('challenge_item_id')
          .eq('user_id', user.id)
          .eq('completed', true),
      ])

      // Most visited park
      const parkCounts = {}
      ;(trips || []).forEach(t => {
        parkCounts[t.park] = (parkCounts[t.park] || 0) + 1
      })
      const mostVisitedPark = Object.entries(parkCounts)
        .sort((a, b) => b[1] - a[1])[0]?.[0] ?? null

      // Challenges completed
      const byChallenge = {}
      ;(allItems || []).forEach(item => {
        if (!byChallenge[item.challenge_id]) byChallenge[item.challenge_id] = []
        byChallenge[item.challenge_id].push(item.id)
      })
      const completedSet = new Set((userItems || []).map(u => u.challenge_item_id))
      const completedChallenges = (challenges || []).filter(ch => {
        const ids = byChallenge[ch.id] || []
        return ids.length > 0 && ids.every(id => completedSet.has(id))
      }).length

      setStats({
        expCount:            expCount ?? 0,
        tripCount:           tripCount ?? 0,
        mostVisitedPark,
        topAttrName:         topAttr?.experiences?.name ?? null,
        completedChallenges,
        totalChallenges:     (challenges || []).length,
      })

      setLoading(false)
    })()
  }, [user.id])

  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : null

  const startEditName = () => {
    setNameInput(displayName)
    setEditingName(true)
  }

  const cancelEditName = () => {
    setEditingName(false)
    setNameInput('')
  }

  const saveDisplayName = async () => {
    setSavingName(true)
    const { error } = await supabase.auth.updateUser({
      data: { full_name: nameInput.trim() },
    })
    if (!error) setDisplayName(nameInput.trim())
    setSavingName(false)
    setEditingName(false)
  }

  const handleSignOut = async () => {
    await signOut()
  }

  const avatarName = displayName || user?.email || ''
  const mostParkEmoji = stats?.mostVisitedPark ? (PARK_EMOJI[stats.mostVisitedPark] ?? '') : ''

  return (
    <div className="flex flex-col bg-gray-50 min-h-full">

      {/* ── Top bar ── */}
      <div className="flex items-center px-4 pt-4 pb-3 bg-white border-b border-gray-100 sticky top-0 z-10">
        <button
          onClick={() => navigate('/')}
          className="w-9 h-9 flex items-center justify-center rounded-full active:bg-gray-100 transition-colors"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <p className="ml-1 text-xl font-bold text-gray-900">Profile</p>
      </div>

      <div className="flex flex-col gap-4 px-4 py-4 pb-8">

        {/* ── Profile card ── */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col items-center gap-2">
          <Avatar name={avatarName} size={60} />
          <p className="text-sm font-semibold text-gray-800 mt-1">{user?.email}</p>
          {memberSince && (
            <p className="text-xs text-gray-400">Member since {memberSince}</p>
          )}
        </div>

        {/* ── Your stats ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <p className="px-4 pt-3.5 pb-2 text-xs font-bold text-gray-400 uppercase tracking-wide">
            Your stats
          </p>
          <RowDivider />

          {loading ? (
            <div className="py-8 flex justify-center">
              <p className="text-gray-400 text-sm">Loading…</p>
            </div>
          ) : (
            <>
              <StatRow label="Experiences completed" value={stats.expCount} />
              <RowDivider />
              <StatRow label="Trips logged" value={stats.tripCount} />
              <RowDivider />
              <StatRow
                label="Most visited park"
                value={stats.mostVisitedPark
                  ? `${mostParkEmoji} ${stats.mostVisitedPark}`
                  : '—'}
              />
              <RowDivider />
              <StatRow
                label="Most visited attraction"
                value={stats.topAttrName ?? '—'}
              />
              <RowDivider />
              <StatRow
                label="Challenges completed"
                value={`${stats.completedChallenges} of ${stats.totalChallenges}`}
              />
            </>
          )}
        </div>

        {/* ── Account section ── */}
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Account</p>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          {/* Display name row */}
          <div className="px-4 py-3.5">
            {editingName ? (
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-gray-700">Display name</p>
                <input
                  value={nameInput}
                  onChange={e => setNameInput(e.target.value)}
                  placeholder="Your name"
                  autoFocus
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 outline-none transition-colors"
                  onFocus={e => e.target.style.borderColor = '#1D9E75'}
                  onBlur={e  => e.target.style.borderColor = '#e5e7eb'}
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={cancelEditName}
                    className="text-xs font-medium text-gray-400 px-3 py-1.5"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveDisplayName}
                    disabled={savingName}
                    className="text-xs font-bold px-4 py-1.5 rounded-lg text-white disabled:opacity-60"
                    style={{ backgroundColor: '#1D9E75' }}
                  >
                    {savingName ? 'Saving…' : 'Save'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-700">Display name</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-500">{displayName || 'Not set'}</p>
                  <button
                    onClick={startEditName}
                    className="text-xs font-semibold"
                    style={{ color: '#1D9E75' }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            )}
          </div>

          <RowDivider />

          {/* Email row (read only) */}
          <div className="flex items-center justify-between px-4 py-3.5">
            <p className="text-sm font-medium text-gray-700">Email</p>
            <p className="text-sm text-gray-500 truncate max-w-[180px]">{user?.email}</p>
          </div>
        </div>

        {/* ── Sign out ── */}
        <button
          onClick={handleSignOut}
          className="w-full py-3.5 rounded-xl font-bold text-sm text-white active:opacity-80 transition-opacity mt-2"
          style={{ backgroundColor: '#EF4444' }}
        >
          Sign out
        </button>

      </div>
    </div>
  )
}
