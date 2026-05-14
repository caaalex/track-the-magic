import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

// ── Error helpers ──────────────────────────────────────────────────────────
function friendlySignInError(msg) {
  if (msg.includes('Invalid login credentials')) return 'Incorrect email or password.'
  if (msg.includes('Email not confirmed'))        return 'Please confirm your email before signing in.'
  if (msg.includes('Too many requests'))          return 'Too many attempts. Please wait a moment and try again.'
  return msg || 'Something went wrong. Please try again.'
}

function friendlySignUpError(msg) {
  if (msg.includes('already registered') || msg.includes('already been registered'))
    return 'An account with this email already exists.'
  if (msg.includes('Password should be'))
    return 'Password must be at least 6 characters.'
  if (msg.includes('valid email'))
    return 'Please enter a valid email address.'
  return 'Something went wrong. Please try again.'
}

// ── Feature item ───────────────────────────────────────────────────────────
function Feature({ emoji, text }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-xl leading-none mt-0.5 flex-shrink-0">{emoji}</span>
      <p className="text-sm text-gray-600 leading-snug">{text}</p>
    </div>
  )
}

// ── Input ──────────────────────────────────────────────────────────────────
function AuthInput({ type, value, onChange, placeholder, autoComplete }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      required
      placeholder={placeholder}
      autoComplete={autoComplete}
      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
      onFocus={e => (e.target.style.borderColor = '#1D9E75')}
      onBlur={e  => (e.target.style.borderColor = '#e5e7eb')}
    />
  )
}

// ── Email confirmation screen ──────────────────────────────────────────────
function ConfirmationScreen({ email, onGoToSignIn }) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-white px-6 py-12"
      style={{ maxWidth: 375, margin: '0 auto' }}
    >
      <span className="text-6xl mb-5">✉️</span>
      <h1 className="text-2xl font-bold text-gray-900 text-center mb-3">Check your email</h1>
      <p className="text-gray-500 text-sm text-center leading-relaxed mb-8">
        We sent a confirmation link to{' '}
        <span className="font-semibold text-gray-800">{email}</span>.
        Click it to activate your account, then come back here to sign in.
      </p>
      <button
        onClick={onGoToSignIn}
        className="w-full py-3.5 rounded-xl text-white font-bold text-sm active:scale-[0.98] transition-transform"
        style={{ backgroundColor: '#1D9E75' }}
      >
        Go to Sign In
      </button>
    </div>
  )
}

// ── Main auth screen ───────────────────────────────────────────────────────
export default function AuthScreen() {
  const { signIn, signUp } = useAuth()

  const [mode,               setMode]               = useState('signup') // 'signup' | 'signin'
  const [email,              setEmail]              = useState('')
  const [password,           setPassword]           = useState('')
  const [error,              setError]              = useState('')
  const [loading,            setLoading]            = useState(false)
  const [needsConfirmation,  setNeedsConfirmation]  = useState(false)
  const [confirmedEmail,     setConfirmedEmail]     = useState('')

  const switchMode = (next) => {
    setMode(next)
    setError('')
    setEmail('')
    setPassword('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (mode === 'signup' && password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setLoading(true)

    if (mode === 'signup') {
      const { data, error: err } = await signUp(email, password)
      setLoading(false)
      if (err) { setError(friendlySignUpError(err.message)); return }
      if (data.user && !data.session) {
        setConfirmedEmail(email)
        setNeedsConfirmation(true)
      } else {
        // Immediate session (email confirmation disabled) — ensure we land on Home
        window.history.replaceState({}, '', '/')
      }
    } else {
      const { error: err } = await signIn(email, password)
      setLoading(false)
      if (err) {
        console.error('Supabase sign-in error:', err)
        setError(friendlySignInError(err.message))
      } else {
        // Reset URL so BrowserRouter always mounts at Home, not a stale route
        window.history.replaceState({}, '', '/')
      }
    }
  }

  if (needsConfirmation) {
    return (
      <ConfirmationScreen
        email={confirmedEmail}
        onGoToSignIn={() => { setNeedsConfirmation(false); switchMode('signin') }}
      />
    )
  }

  return (
    <div
      className="min-h-screen bg-white flex flex-col overflow-y-auto"
      style={{ maxWidth: 375, margin: '0 auto' }}
    >
      <div className="flex-1 flex flex-col px-6 pt-12 pb-10">

        {/* ── Hero ── */}
        <div className="flex flex-col items-center text-center mb-8">
          <span className="text-6xl mb-4">🏰</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Track the Magic</h1>
          <p className="text-gray-500 text-sm leading-relaxed max-w-[260px]">
            Track every ride, meal, and moment across all of Disney World
          </p>
        </div>

        {/* ── Feature highlights ── */}
        <div className="flex flex-col gap-3.5 mb-8">
          <Feature emoji="✨" text="Track 200+ experiences across all 9 Disney World destinations" />
          <Feature emoji="📅" text="Log every visit and build your Disney history" />
          <Feature emoji="🏆" text="Complete challenges only true Disney fans will know" />
        </div>

        {/* ── Divider ── */}
        <div className="h-px bg-gray-100 mb-8" />

        {/* ── Form ── */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold text-gray-900">
            {mode === 'signup' ? 'Create your account' : 'Welcome back'}
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <AuthInput
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              autoComplete="email"
            />
            <AuthInput
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder={mode === 'signup' ? 'Password (min. 6 characters)' : 'Password'}
              autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
            />

            {error && (
              <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-white font-bold text-sm mt-1 disabled:opacity-60 active:scale-[0.98] transition-transform"
              style={{ backgroundColor: '#1D9E75' }}
            >
              {loading
                ? (mode === 'signup' ? 'Creating account…' : 'Signing in…')
                : (mode === 'signup' ? 'Create Account'    : 'Sign In')
              }
            </button>
          </form>

          <p className="text-center text-sm text-gray-500">
            {mode === 'signup' ? (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => switchMode('signin')}
                  className="font-semibold"
                  style={{ color: '#1D9E75' }}
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <button
                  onClick={() => switchMode('signup')}
                  className="font-semibold"
                  style={{ color: '#1D9E75' }}
                >
                  Create one
                </button>
              </>
            )}
          </p>
        </div>

      </div>
    </div>
  )
}
