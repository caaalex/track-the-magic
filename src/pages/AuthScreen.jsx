import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Mail, ArrowRight } from 'lucide-react'

const GREEN = '#1D9E75'
const HAIRLINE = '1px solid #E7E5E0'

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

// ── Logo mark (same as landing) ────────────────────────────────────────────
function LogoMark({ size = 32 }) {
  const inner = Math.round(size * 0.5)
  return (
    <div
      className="rounded-xl flex items-center justify-center flex-shrink-0"
      style={{
        width: size,
        height: size,
        background: 'linear-gradient(145deg, #1D9E75 0%, #13855f 100%)',
        boxShadow: '0 4px 14px rgba(29,158,117,0.25)',
      }}
    >
      <svg width={inner} height={inner} viewBox="0 0 36 36" fill="none">
        <path
          d="M18 3 C18 3 19.5 12.5 24.5 17.5 C19.5 17.5 19.5 17.5 24.5 17.5 C19.5 22.5 18 33 18 33 C18 33 16.5 22.5 11.5 17.5 C16.5 17.5 16.5 17.5 11.5 17.5 C16.5 12.5 18 3 18 3Z"
          fill="white" fillOpacity="0.95"
        />
        <circle cx="27" cy="9" r="2.2" fill="white" fillOpacity="0.55" />
        <circle cx="9" cy="27" r="1.5" fill="white" fillOpacity="0.38" />
      </svg>
    </div>
  )
}

// ── Shared shell: landing-style nav + centered column ──────────────────────
function Shell({ onBack, navAction, children }) {
  return (
    <div className="min-h-screen" style={{ background: '#FAFAF9' }}>
      <div className="mx-auto px-6" style={{ maxWidth: 1000 }}>
        <nav className="flex items-center justify-between pt-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2.5 active:opacity-60"
            style={{ transition: 'opacity 0.2s ease' }}
          >
            <LogoMark />
            <span className="text-[15px] font-bold text-gray-900">Track the Magic</span>
          </button>
          {navAction}
        </nav>
      </div>
      <div className="mx-auto px-6 pt-14 md:pt-20 pb-16" style={{ maxWidth: 420 }}>
        {children}
      </div>
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
      className="w-full rounded-xl px-4 py-3 outline-none bg-transparent text-gray-800 placeholder-gray-400"
      style={{ border: HAIRLINE, transition: 'border-color 0.2s ease' }}
      onFocus={e => (e.target.style.borderColor = GREEN)}
      onBlur={e  => (e.target.style.borderColor = '#E7E5E0')}
    />
  )
}

// ── Email confirmation screen ──────────────────────────────────────────────
function ConfirmationScreen({ email, onGoToSignIn, onBack }) {
  return (
    <Shell onBack={onBack}>
      <div className="flex flex-col items-center text-center">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{
            background: 'linear-gradient(145deg, #1D9E75 0%, #13855f 100%)',
            boxShadow: '0 6px 20px rgba(29,158,117,0.28)',
          }}
        >
          <Mail size={24} color="white" strokeWidth={1.5} />
        </div>
        <h1 className="text-gray-900 font-bold mt-6 leading-tight" style={{ fontSize: 'clamp(24px, 4vw, 30px)', letterSpacing: '-0.02em' }}>
          Check your email
        </h1>
        <p className="text-gray-500 text-[13px] leading-relaxed mt-3 max-w-[300px]">
          We sent a confirmation link to{' '}
          <span className="font-semibold text-gray-800">{email}</span>.{' '}
          Click it to activate your account, then come back to sign in.
        </p>
        <button
          onClick={onGoToSignIn}
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl font-semibold text-sm px-7 py-3.5 text-white whitespace-nowrap active:scale-[0.98]"
          style={{ backgroundColor: GREEN, boxShadow: '0 2px 14px rgba(29,158,117,0.3)', transition: 'transform 0.2s ease' }}
        >
          Go to sign in
          <ArrowRight size={15} strokeWidth={2} />
        </button>
      </div>
    </Shell>
  )
}

// ── Main auth screen ───────────────────────────────────────────────────────
export default function AuthScreen({ initialMode = 'signup', onBack }) {
  const { signIn, signUp } = useAuth()

  const [mode,              setMode]              = useState(initialMode)
  const [email,             setEmail]             = useState('')
  const [password,          setPassword]          = useState('')
  const [error,             setError]             = useState('')
  const [loading,           setLoading]           = useState(false)
  const [needsConfirmation, setNeedsConfirmation] = useState(false)
  const [confirmedEmail,    setConfirmedEmail]    = useState('')

  const isSignup = mode === 'signup'

  const switchMode = (next) => {
    setMode(next)
    setError('')
    setEmail('')
    setPassword('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (isSignup && password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setLoading(true)

    if (isSignup) {
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
        onBack={onBack}
        onGoToSignIn={() => { setNeedsConfirmation(false); switchMode('signin') }}
      />
    )
  }

  return (
    <Shell
      onBack={onBack}
      navAction={
        <button
          onClick={() => switchMode(isSignup ? 'signin' : 'signup')}
          className="text-[13px] font-semibold text-gray-500 active:opacity-60"
        >
          {isSignup ? 'Sign in' : 'Create account'}
        </button>
      }
    >
      {/* ── Heading ── */}
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: GREEN }}>
        {isSignup ? 'Early access — free' : 'Welcome back'}
      </p>
      <h1 className="text-gray-900 font-bold mt-3 leading-tight" style={{ fontSize: 'clamp(28px, 4.5vw, 36px)', letterSpacing: '-0.025em' }}>
        {isSignup ? 'Start your list.' : 'Pick up where you left off.'}
      </h1>
      <p className="text-gray-500 text-[13px] leading-relaxed mt-3">
        {isSignup
          ? '348 experiences are waiting to be checked off. Free during early access — $20/year at launch.'
          : 'Sign in to keep tracking the magic.'}
      </p>

      {/* ── Form ── */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-8">
        <AuthInput
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email address"
          autoComplete="email"
        />
        <AuthInput
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder={isSignup ? 'Password (min. 6 characters)' : 'Password'}
          autoComplete={isSignup ? 'new-password' : 'current-password'}
        />

        {error && (
          <p className="text-red-600 text-[12px] leading-snug rounded-xl px-4 py-3"
             style={{ border: '1px solid #FECACA', background: '#FEF2F2' }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl font-semibold text-sm py-3.5 text-white mt-1 disabled:opacity-60 active:scale-[0.98]"
          style={{ backgroundColor: GREEN, boxShadow: '0 2px 14px rgba(29,158,117,0.3)', transition: 'transform 0.2s ease' }}
        >
          {loading
            ? (isSignup ? 'Creating account…' : 'Signing in…')
            : (isSignup ? 'Create free account' : 'Sign in')}
          {!loading && <ArrowRight size={15} strokeWidth={2} />}
        </button>
      </form>

      {/* ── Mode switch ── */}
      <p className="text-[13px] text-gray-400 mt-6">
        {isSignup ? 'Already tracking?' : "Don't have an account?"}{' '}
        <button
          onClick={() => switchMode(isSignup ? 'signin' : 'signup')}
          className="font-semibold active:opacity-60"
          style={{ color: GREEN }}
        >
          {isSignup ? 'Sign in' : 'Create one — free'}
        </button>
      </p>

      {/* ── Reassurance ── */}
      <p className="text-[11px] text-gray-400 leading-relaxed mt-10 pt-5" style={{ borderTop: HAIRLINE }}>
        348 experiences · 9 destinations · 24 resorts. A fan-made project — not
        affiliated with The Walt Disney Company.
      </p>
    </Shell>
  )
}
