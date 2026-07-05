import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Sparkles, CalendarDays, Trophy, Mail } from 'lucide-react'

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

// ── Logo mark ──────────────────────────────────────────────────────────────
function LogoMark() {
  return (
    <div
      className="w-[72px] h-[72px] rounded-[20px] flex items-center justify-center flex-shrink-0"
      style={{
        background: 'linear-gradient(145deg, #1D9E75 0%, #13855f 100%)',
        boxShadow: '0 8px 28px rgba(29,158,117,0.32), 0 2px 6px rgba(29,158,117,0.18)',
      }}
    >
      {/* 4-pointed star / sparkle */}
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        {/* Main 4-pointed star */}
        <path
          d="M18 3 C18 3 19.5 12.5 24.5 17.5 C19.5 17.5 19.5 17.5 24.5 17.5 C19.5 22.5 18 33 18 33 C18 33 16.5 22.5 11.5 17.5 C16.5 17.5 16.5 17.5 11.5 17.5 C16.5 12.5 18 3 18 3Z"
          fill="white"
          fillOpacity="0.95"
        />
        {/* Small accent dot top-right */}
        <circle cx="27" cy="9" r="2.2" fill="white" fillOpacity="0.55" />
        {/* Small accent dot bottom-left */}
        <circle cx="9" cy="27" r="1.5" fill="white" fillOpacity="0.38" />
      </svg>
    </div>
  )
}

// ── Feature item ───────────────────────────────────────────────────────────
function Feature({ icon: Icon, iconBg, iconColor, text }) {
  return (
    <div className="flex items-center gap-3.5">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: iconBg }}
      >
        <Icon size={17} color={iconColor} strokeWidth={1.5} />
      </div>
      <p className="text-[13px] text-stone-500 leading-snug">{text}</p>
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
      onFocus={e => (e.target.style.borderColor = '#1D9E75')}
      onBlur={e  => (e.target.style.borderColor = 'transparent')}
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
        className="w-[68px] h-[68px] rounded-[18px] flex items-center justify-center mb-6"
        style={{
          background: 'linear-gradient(145deg, #1D9E75 0%, #13855f 100%)',
          boxShadow: '0 6px 22px rgba(29,158,117,0.28)',
        }}
      >
        <Mail size={30} color="white" strokeWidth={1.5} />
      </div>
      <h1 className="text-2xl font-bold text-stone-900 text-center mb-3 tracking-[-0.02em]">
        Check your email
      </h1>
      <p className="text-stone-500 text-[13px] text-center leading-relaxed mb-8 max-w-[260px]">
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
export default function AuthScreen({ initialMode = 'signup', onBack }) {
  const { signIn, signUp } = useAuth()

  const [mode,              setMode]              = useState(initialMode)
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

        {/* ── Back to landing ── */}
        {onBack && (
          <button
            onClick={onBack}
            className="self-start -mt-6 mb-4 flex items-center gap-1 text-[13px] font-medium text-stone-400 active:opacity-60"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        )}

        {/* ── Hero ── */}
        <div className="flex flex-col items-center text-center mb-10">
          <LogoMark />
          <h1 className="text-[28px] font-bold text-stone-900 mt-5 mb-2 tracking-[-0.025em]">
            Track the Magic
          </h1>
          <p className="text-stone-400 text-[13px] leading-relaxed max-w-[230px]">
            Your personal Disney World companion
          </p>
        </div>

        {/* ── Feature highlights ── */}
        <div className="flex flex-col gap-3.5 mb-9">
          <Feature
            icon={Sparkles}
            iconBg="#F0FCED"
            iconColor="#1D9E75"
            text="Track 200+ experiences across all 9 Disney World destinations"
          />
          <Feature
            icon={CalendarDays}
            iconBg="#EEF6FF"
            iconColor="#4A90D9"
            text="Log every visit and build your personal Disney history"
          />
          <Feature
            icon={Trophy}
            iconBg="#FEF7E6"
            iconColor="#D4A017"
            text="Complete challenges only true Disney fans will know"
          />
        </div>

        {/* ── Form card ── */}
        <div
          className="rounded-2xl px-5 py-5"
          style={{
            background: '#ffffff',
            boxShadow: '0 2px 16px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
          }}
        >
          {/* Sign in / Sign up toggle */}
          <div className="flex bg-stone-100 rounded-xl p-1 mb-4">
            {['signup', 'signin'].map(m => (
              <button
                key={m}
                onClick={() => switchMode(m)}
                className="flex-1 py-2 rounded-[10px] text-[13px] font-semibold transition-all"
                style={{
                  backgroundColor: mode === m ? '#ffffff' : 'transparent',
                  color: mode === m ? '#1D9E75' : '#9ca3af',
                  boxShadow: mode === m ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                  transition: 'all 0.2s cubic-bezier(0.32,0.72,0,1)',
                }}
              >
                {m === 'signup' ? 'Create account' : 'Sign in'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
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
        </div>

      </div>
    </div>
  )
}
