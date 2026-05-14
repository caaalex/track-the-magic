import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function SignUp({ onSwitch }) {
  const { signUp } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [needsConfirmation, setNeedsConfirmation] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setLoading(true)
    const { data, error } = await signUp(email, password)
    setLoading(false)

    if (error) {
      setError(friendlyError(error.message))
      return
    }

    // If Supabase returns a user but no session, email confirmation is required
    if (data.user && !data.session) {
      setNeedsConfirmation(true)
    }
  }

  if (needsConfirmation) {
    return (
      <div className="min-h-screen flex flex-col bg-white" style={{ maxWidth: 375, margin: '0 auto' }}>
        <div className="flex flex-col items-center justify-end px-6 pt-14 pb-10"
             style={{ backgroundColor: '#1D9E75' }}>
          <span className="text-6xl mb-4">✉️</span>
          <h1 className="text-2xl font-bold text-white tracking-tight">Check your email</h1>
          <p className="text-white/70 text-sm mt-1 text-center">One step away from the magic</p>
        </div>
        <div className="flex-1 px-6 pt-8 pb-10">
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            We sent a confirmation link to <span className="font-semibold text-gray-800">{email}</span>.
            Click the link to activate your account, then come back here to sign in.
          </p>
          <button
            onClick={onSwitch}
            className="w-full py-3.5 rounded-xl text-white font-semibold text-sm"
            style={{ backgroundColor: '#1D9E75' }}
          >
            Go to Sign In
          </button>
        </div>
      </div>
    )
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
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Create your account</h2>

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
              placeholder="At least 6 characters"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none transition"
              onFocus={e => e.target.style.borderColor = '#1D9E75'}
              onBlur={e => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
            <input
              type="password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
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
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-8">
          Already have an account?{' '}
          <button
            onClick={onSwitch}
            className="font-semibold"
            style={{ color: '#1D9E75' }}
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  )
}

function friendlyError(msg) {
  if (msg.includes('already registered') || msg.includes('already been registered'))
    return 'An account with this email already exists.'
  if (msg.includes('Password should be'))
    return 'Password must be at least 6 characters.'
  if (msg.includes('valid email'))
    return 'Please enter a valid email address.'
  return 'Something went wrong. Please try again.'
}
