import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function Login({ onSwitch }) {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await signIn(email, password)
    if (error) {
      console.error('Supabase sign-in error:', error)
      setError(friendlyError(error.message))
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-white" style={{ maxWidth: 375, margin: '0 auto' }}>

      {/* Teal header */}
      <div className="flex flex-col items-center justify-end px-6 pt-14 pb-10"
           style={{ backgroundColor: '#1D9E75' }}>
        <span className="text-6xl mb-4">🏰</span>
        <h1 className="text-2xl font-bold text-white tracking-tight">Track the Magic</h1>
        <p className="text-white/70 text-sm mt-1">Your Disney World experience tracker</p>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 pt-8 pb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Welcome back</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none transition"
              style={{ '--tw-ring-color': '#1D9E75' }}
              onFocus={e => e.target.style.borderColor = '#1D9E75'}
              onBlur={e => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none transition"
              onFocus={e => e.target.style.borderColor = '#1D9E75'}
              onBlur={e => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-white font-semibold text-sm mt-1 disabled:opacity-60 active:scale-[0.98] transition-transform"
            style={{ backgroundColor: '#1D9E75' }}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-8">
          Don't have an account?{' '}
          <button
            onClick={onSwitch}
            className="font-semibold"
            style={{ color: '#1D9E75' }}
          >
            Create one
          </button>
        </p>
      </div>
    </div>
  )
}

function friendlyError(msg) {
  if (msg.includes('Invalid login credentials')) return 'Incorrect email or password.'
  if (msg.includes('Email not confirmed')) return 'Please confirm your email before signing in.'
  if (msg.includes('Too many requests')) return 'Too many attempts. Please wait a moment and try again.'
  // Show the real error so we can diagnose unexpected issues
  return msg || 'Something went wrong. Please try again.'
}
