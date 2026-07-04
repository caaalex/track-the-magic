import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabaseClient'
import Avatar from '../components/Avatar'

// ── Stat row ──────────────────────────────────────────────────────────────
function StatRow({ label, value, last = false }) {
  return (
    <div
      className="flex items-center justify-between py-3.5"
      style={{ borderBottom: last ? 'none' : '1px solid #EDEBE6' }}
    >
      <p className="text-[13px] text-gray-500">{label}</p>
      <p className="text-[13px] text-gray-900 text-right">{value}</p>
    </div>
  )
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
          onClick={() => navigate('/')}
          className="w-9 h-9 -ml-2 flex items-center justify-center rounded-full active:opacity-60 transition-opacity"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <p className="ml-1 text-xl font-bold text-gray-900">Profile</p>
      </div>

      <div className="px-4 pt-6 pb-8">

        {/* ── Identity ── */}
        <div className="flex flex-col items-center gap-2">
          <Avatar name={avatarName} size={60} />
          <p className="text-sm font-semibold text-gray-800 mt-1">{user?.email}</p>
          {memberSince && (
            <p className="text-xs text-gray-400">Member since {memberSince}</p>
          )}
        </div>

        {/* ── Your stats ── */}
        <div className="mt-7 pt-4" style={{ borderTop: '1px solid #E7E5E0' }}>
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.12em]">
            Your stats
          </p>

          {loading ? (
            <div className="py-8 flex justify-center">
              <p className="text-gray-400 text-sm">Loading…</p>
            </div>
          ) : (
            <div>
              <StatRow label="Experiences completed" value={stats.expCount} />
              <StatRow label="Trips logged" value={stats.tripCount} />
              <StatRow label="Most visited park" value={stats.mostVisitedPark ?? '—'} />
              <StatRow label="Most visited experience" value={stats.topAttrName ?? '—'} />
              <StatRow
                label="Challenges completed"
                value={`${stats.completedChallenges} of ${stats.totalChallenges}`}
                last
              />
            </div>
          )}
        </div>

        {/* ── Account ── */}
        <div className="mt-5 pt-4" style={{ borderTop: '1px solid #E7E5E0' }}>
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.12em]">
            Account
          </p>

          {/* Display name row */}
          <div className="py-3.5" style={{ borderBottom: '1px solid #EDEBE6' }}>
            {editingName ? (
              <div className="flex flex-col gap-2">
                <p className="text-[13px] text-gray-500">Display name</p>
                <input
                  value={nameInput}
                  onChange={e => setNameInput(e.target.value)}
                  placeholder="Your name"
                  autoFocus
                  className="w-full rounded-xl px-3 py-2 text-sm text-gray-700 outline-none transition-colors bg-transparent"
                  style={{ border: '1px solid #E7E5E0' }}
                  onFocus={e => e.target.style.borderColor = '#1D9E75'}
                  onBlur={e  => e.target.style.borderColor = '#E7E5E0'}
                />
                <div className="flex justify-end gap-4 mt-1">
                  <button
                    onClick={cancelEditName}
                    className="text-xs font-medium text-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveDisplayName}
                    disabled={savingName}
                    className="text-xs font-semibold disabled:opacity-60"
                    style={{ color: '#1D9E75' }}
                  >
                    {savingName ? 'Saving…' : 'Save'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <p className="text-[13px] text-gray-500">Display name</p>
                <div className="flex items-center gap-3">
                  <p className="text-[13px] text-gray-900">{displayName || 'Not set'}</p>
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

          {/* Email row (read only) */}
          <div className="flex items-center justify-between py-3.5">
            <p className="text-[13px] text-gray-500">Email</p>
            <p className="text-[13px] text-gray-900 truncate max-w-[180px]">{user?.email}</p>
          </div>
        </div>

        {/* ── Sign out ── */}
        <div className="mt-4 pt-4" style={{ borderTop: '1px solid #E7E5E0' }}>
          <button
            onClick={handleSignOut}
            className="text-[13px] font-semibold text-red-500 active:opacity-60"
            style={{ transition: 'opacity 0.2s ease' }}
          >
            Sign out
          </button>
        </div>

      </div>
    </div>
  )
}
