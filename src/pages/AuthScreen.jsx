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
      <span
        className="text-base leading-none mt-0.5 flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center"
        style={{ background: 'rgba(29,158,117,0.08)' }}
      >
        {emoji}
      </span>
      <p className="text-[13px] text-stone-500 leading-relaxed pt-1">{text}</p>
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
      className="w-full rounded-xl px-4 py-3 text-sm outline-none text-stone-800 placeholder-stone-400"
      style={{
        background: '#F5F4F2',
        border: '1.5px solid transparent',
        transition: 'border-color 0.2s cubic-bezier(0.32,0.72,0,1)',
      }}
      onFocus={e  => (e.target.style.borderColor = '#1D9E75')}
      onBlur={e   => (e.target.style.borderColor = 'transparent')}
    />
  )
}

// ── Email confirmation screen ──────────────────────────────────────────────
function ConfirmationScreen({ email, onGoToSignIn }) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAF9] px-6 py-12"
      style={{ maxWidth: 375, margin: '0 auto' }}
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-5"
        style={{
          background: 'linear-gradient(135deg, #e6f7f1, #f0fdf8)',
          boxShadow: '0 4px 16px rgba(29,158,117,0.12)',
        }}
      >
        ✉️
      </div>
      <h1 className="text-2xl font-bold text-stone-900 text-center mb-3 tracking-[-0.02em]">
        Check your email
      </h1>
      <p className="text-stone-500 text-[13px] text-center leading-relaxed mb-8">
        We sent a confirmation link to{' '}
        <span className="font-semibold text-stone-800">{email}</span>.{' '}
        Click it to activate your account, then come back to sign in.
      </p>
      <button
        onClick={onGoToSignIn}
        className="w-full py-3.5 rounded-xl text-white font-bold text-sm active:scale-[0.98]"
        style={{
          backgroundColor: '#1D9E75',
          boxShadow: '0 2px 10px rgba(29,158,117,0.28)',
          transition: 'transform 0.25s cubic-bezier(0.32,0.72,0,1)',
        }}
      >
        Go to sign in
      </button>
    </div>
  )
}

// ── Main auth screen ───────────────────────────────────────────────────────
export default function AuthScreen() {
  const { signIn, signUp } = useAuth()

  const [mode,              setMode]              = useState('signup')
  const [email,             setEmail]             = useState('')
  const [password,          setPassword]          = useState('')
  const [error,             setError]             = useState('')
  const [loading,           setLoading]           = useState(false)
  const [needsConfirmation, setNeedsConfirmation] = useState(false)
  const [confirmedEmail,    setConfirmedEmail]    = useState('')

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
        window.history.replaceState({}, '', '/')
      }
    } else {
      const { error: err } = await signIn(email, password)
      setLoading(false)
      if (err) {
        console.error('Supabase sign-in error:', err)
        setError(friendlySignInError(err.message))
      } else {
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
      className="min-h-screen bg-[#FAFAF9] flex flex-col overflow-y-auto"
      style={{ maxWidth: 375, margin: '0 auto' }}
    >
      <div className="flex-1 flex flex-col px-6 pt-14 pb-10">

        {/* ── Hero ── */}
        <div className="flex flex-col items-center text-center mb-8">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-5"
            style={{
              background: 'linear-gradient(135deg, #e6f7f1, #f0fdf8)',
              boxShadow: '0 4px 20px rgba(29,158,117,0.14)',
            }}
          >
            🏰
          </div>
          <h1 className="text-[28px] font-bold text-stone-900 mb-2 tracking-[-0.025em]">
            Track the Magic
          </h1>
          <p className="text-stone-500 text-[13px] leading-relaxed max-w-[240px]">
            Track every ride, meal, and moment across all of Disney World
          </p>
        </div>

        {/* ── Feature highlights ── */}
        <div className="flex flex-col gap-3 mb-8">
          <Feature emoji="✨" text="Track 200+ experiences across all 9 Disney World destinations" />
          <Feature emoji="📅" text="Log every visit and build your Disney history" />
          <Feature emoji="🏆" text="Complete challenges only true Disney fans will know" />
        </div>

        {/* ── Divider ── */}
        <div className="h-px bg-stone-200/60 mb-7" />

        {/* ── Form ── */}
        <div className="flex flex-col gap-4">
          <h2 className="text-[17px] font-bold text-stone-900 tracking-[-0.015em]">
            {mode === 'signup' ? 'Create your account' : 'Welcome back'}
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
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
              <p className="text-red-600 text-[12px] bg-red-50 px-3 py-2.5 rounded-xl leading-snug">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-white font-bold text-sm mt-1 disabled:opacity-60 active:scale-[0.98]"
              style={{
                backgroundColor: '#1D9E75',
                boxShadow: '0 2px 10px rgba(29,158,117,0.28)',
                transition: 'all 0.25s cubic-bezier(0.32,0.72,0,1)',
              }}
            >
              {loading
                ? (mode === 'signup' ? 'Creating account…' : 'Signing in…')
                : (mode === 'signup' ? 'Create account' : 'Sign in')}
            </button>
          </form>

          <p className="text-center text-[12px] text-stone-400">
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
