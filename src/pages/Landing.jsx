// Public marketing landing page — shown to logged-out visitors.
// Responsive: single column on mobile, two-column hero on desktop.

import { Sparkles, CalendarDays, Trophy, Hotel, ArrowRight, Check } from 'lucide-react'

const GREEN = '#1D9E75'
const HAIRLINE = '1px solid #E7E5E0'

// ── Logo mark (same as auth/onboarding) ────────────────────────────────────
function LogoMark({ size = 36 }) {
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

// ── Phone mockup of the Home screen ────────────────────────────────────────
function PhoneMock() {
  const parks = [
    { name: 'Magic Kingdom', pct: 74 },
    { name: 'Epcot', pct: 52 },
    { name: 'Hollywood Studios', pct: 38 },
    { name: 'Animal Kingdom', pct: 61 },
  ]
  return (
    <div
      className="mx-auto"
      style={{
        width: 300,
        background: '#15161a',
        borderRadius: 44,
        padding: 9,
        boxShadow: '0 24px 60px rgba(0,0,0,0.16)',
      }}
    >
      <div style={{ borderRadius: 36, overflow: 'hidden', background: '#FAFAF9' }}>
        <div className="px-5 pt-6 pb-5">
          <div className="flex items-center justify-between mb-5">
            <span className="text-[15px] font-bold text-gray-900">Track the Magic</span>
            <span
              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[9px] font-bold"
              style={{ background: 'linear-gradient(135deg, #1D9E75, #16a870)' }}
            >
              CA
            </span>
          </div>

          <p className="text-[11px] text-gray-400">Experiences completed</p>
          <p className="text-gray-900 tabular-nums leading-tight" style={{ fontSize: 42, fontWeight: 300, letterSpacing: '-0.02em' }}>
            212 <span className="text-sm font-normal text-gray-300">/ 348</span>
          </p>
          <div className="mt-2.5 rounded-full overflow-hidden" style={{ height: 2, backgroundColor: '#ECEAE5' }}>
            <div className="h-full rounded-full" style={{ width: '61%', backgroundColor: GREEN }} />
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-[11px] text-gray-400">61% of all Disney World</p>
            <span className="text-[11px] font-semibold flex items-center gap-1" style={{ color: GREEN }}>
              Log a visit <ArrowRight size={11} strokeWidth={2} />
            </span>
          </div>

          <div className="mt-4 pt-3 flex items-center gap-2.5" style={{ borderTop: HAIRLINE }}>
            <Trophy size={13} color="#A8A29E" strokeWidth={1.5} />
            <p className="flex-1 text-[11px] text-gray-500">Top 1% of all users</p>
            <p className="text-[11px] font-semibold text-gray-900">1%</p>
          </div>

          <div className="mt-3 pt-3" style={{ borderTop: HAIRLINE }}>
            <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-[0.12em]">Parks</p>
            {parks.map((p, i) => (
              <div key={p.name} className="flex items-center gap-2.5 py-2.5"
                   style={{ borderBottom: i < parks.length - 1 ? '1px solid #EDEBE6' : 'none' }}>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-gray-900">{p.name}</p>
                  <div className="mt-1.5 overflow-hidden" style={{ height: 1.5, backgroundColor: '#ECEAE5' }}>
                    <div className="h-full" style={{ width: `${p.pct}%`, backgroundColor: GREEN }} />
                  </div>
                </div>
                <p className="text-[10px] text-gray-400 tabular-nums">{p.pct}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Small building blocks ──────────────────────────────────────────────────
function Stat({ value, label }) {
  return (
    <div className="text-center">
      <p className="text-gray-900 tabular-nums leading-tight" style={{ fontSize: 34, fontWeight: 300, letterSpacing: '-0.02em' }}>
        {value}
      </p>
      <p className="text-[13px] text-gray-400 mt-1">{label}</p>
    </div>
  )
}

function Feature({ icon: Icon, title, children }) {
  return (
    <div className="rounded-2xl p-6" style={{ border: HAIRLINE }}>
      <Icon size={20} color="#78716C" strokeWidth={1.5} />
      <p className="text-[15px] font-semibold text-gray-900 mt-3">{title}</p>
      <p className="text-[13px] text-gray-500 leading-relaxed mt-1.5">{children}</p>
    </div>
  )
}

function Faq({ q, children }) {
  return (
    <div className="py-5" style={{ borderTop: HAIRLINE }}>
      <p className="text-[15px] font-semibold text-gray-900">{q}</p>
      <p className="text-[13px] text-gray-500 leading-relaxed mt-1.5">{children}</p>
    </div>
  )
}

function CtaButton({ onClick, children, subtle = false }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold whitespace-nowrap active:scale-[0.98] ${
        subtle ? 'text-[13px] px-5 py-2.5' : 'text-sm px-7 py-3.5 text-white'
      }`}
      style={
        subtle
          ? { border: `1px solid ${GREEN}`, color: GREEN, transition: 'transform 0.2s ease' }
          : { backgroundColor: GREEN, boxShadow: '0 2px 14px rgba(29,158,117,0.3)', transition: 'transform 0.2s ease' }
      }
    >
      {children}
      <ArrowRight size={15} strokeWidth={2} />
    </button>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function Landing({ onGetStarted, onSignIn }) {
  return (
    <div className="min-h-screen" style={{ background: '#FAFAF9' }}>
      <div className="mx-auto px-6" style={{ maxWidth: 1000 }}>

        {/* ── Nav ── */}
        <nav className="flex items-center justify-between pt-6">
          <div className="flex items-center gap-2.5">
            <LogoMark size={32} />
            <span className="text-[15px] font-bold text-gray-900">Track the Magic</span>
          </div>
          <button
            onClick={onSignIn}
            className="text-[13px] font-semibold text-gray-500 active:opacity-60"
          >
            Sign in
          </button>
        </nav>

        {/* ── Hero ── */}
        <header className="pt-14 md:pt-24 pb-16 md:pb-24 grid md:grid-cols-2 gap-12 md:gap-8 items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: GREEN }}>
              For Disney World fans
            </p>
            <h1
              className="text-gray-900 font-bold mt-3 leading-[1.08]"
              style={{ fontSize: 'clamp(34px, 5.5vw, 52px)', letterSpacing: '-0.03em' }}
            >
              How much of the magic have you <em className="not-italic" style={{ color: GREEN }}>actually</em> done?
            </h1>
            <p className="text-gray-500 text-[15px] leading-relaxed mt-5 max-w-md">
              Hundreds of experiences across all Disney World destinations, from rides
              and restaurants to hidden gems. Track every one, relive every trip, and
              find out exactly how much magic you have left.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
              <CtaButton onClick={onGetStarted}>Start tracking free</CtaButton>
              <p className="text-xs text-gray-400">
                Free during early access · $20/year at launch
              </p>
            </div>
          </div>
          <div>
            <PhoneMock />
          </div>
        </header>

        {/* ── Stats strip ── */}
        <section className="py-10" style={{ borderTop: HAIRLINE, borderBottom: HAIRLINE }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Stat value="300+" label="experiences to collect" />
            <Stat value="9" label="destinations covered" />
            <Stat value="24" label="resorts included" />
            <Stat value="100%" label="made by fans" />
          </div>
          <p className="text-xs text-gray-400 text-center mt-8">
            Updated frequently as Disney World evolves.
          </p>
        </section>

        {/* ── Features ── */}
        <section className="py-16 md:py-24">
          <h2 className="text-gray-900 font-bold text-center leading-tight" style={{ fontSize: 'clamp(26px, 4vw, 36px)', letterSpacing: '-0.02em' }}>
            Your entire Disney life, in one place
          </h2>
          <p className="text-gray-500 text-[15px] text-center mt-3 max-w-md mx-auto">
            Not a wait-times app. Not a planning app. The first app for what you've{' '}
            <span className="font-semibold text-gray-700">done</span>.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mt-10">
            <Feature icon={Sparkles} title="Check off all of Disney World">
              Every attraction, dining experience, snack stand, stage show, and nighttime
              spectacular. If it's in Disney World, it's on your list.
            </Feature>
            <Feature icon={CalendarDays} title="Log trips like a travel journal">
              One tap logs a park day with everything you did. Your Disney history builds
              itself: every trip, every first ride, every repeat.
            </Feature>
            <Feature icon={Trophy} title="Challenges only true fans finish">
              Ride every mountain in one day. Eat around World Showcase. Hear every song on
              Cosmic Rewind. The bragging rights are real.
            </Feature>
            <Feature icon={Hotel} title="Even the resorts count">
              All 24 resorts with their pools, lounges, beaches, and monorail rides. Resort
              days are Disney days too.
            </Feature>
          </div>
        </section>

        {/* ── Identity band ── */}
        <section className="py-16 md:py-20 text-center" style={{ borderTop: HAIRLINE }}>
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.14em]">
            Where do you rank?
          </p>
          <p className="text-gray-900 tabular-nums leading-none mt-4" style={{ fontSize: 'clamp(64px, 10vw, 96px)', fontWeight: 300, letterSpacing: '-0.03em' }}>
            Top 33<span className="text-gray-300">%</span>
          </p>
          <p className="text-gray-500 text-[15px] leading-relaxed mt-5 max-w-sm mx-auto">
            See how your progress stacks up against every other tracker. Whether it's
            your fortieth visit or your first, there's always something you haven't done yet.
          </p>
        </section>

        {/* ── Pricing ── */}
        <section className="py-16 md:py-20" style={{ borderTop: HAIRLINE }}>
          <div className="mx-auto rounded-2xl p-8 md:p-10 text-center" style={{ maxWidth: 440, border: `1px solid ${GREEN}` }}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: GREEN }}>
              Early access
            </p>
            <div className="mt-4 flex items-baseline justify-center gap-3">
              <span className="text-gray-300 line-through text-xl tabular-nums">$20/yr</span>
              <span className="text-gray-900 tabular-nums" style={{ fontSize: 56, fontWeight: 300, letterSpacing: '-0.03em' }}>
                $0
              </span>
            </div>
            <p className="text-[13px] text-gray-500 leading-relaxed mt-3">
              Free while we build. When pricing launches at $20/year, founding
              members hear about it first, and keep every bit of their progress.
            </p>
            <div className="mt-6 flex flex-col gap-2.5 text-left mx-auto" style={{ maxWidth: 280 }}>
              {['Every experience, every destination', 'Unlimited trips and history', 'Every challenge and ranking', 'Updated frequently with new experiences'].map(line => (
                <div key={line} className="flex items-center gap-2.5">
                  <Check size={14} color={GREEN} strokeWidth={2.5} className="flex-shrink-0" />
                  <p className="text-[13px] text-gray-600">{line}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <CtaButton onClick={onGetStarted}>Claim your free account</CtaButton>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-16 md:py-20" style={{ borderTop: HAIRLINE }}>
          <h2 className="text-gray-900 font-bold leading-tight mb-8" style={{ fontSize: 'clamp(22px, 3vw, 28px)', letterSpacing: '-0.02em' }}>
            Questions, answered
          </h2>
          <div style={{ borderBottom: HAIRLINE }}>
            <Faq q="Is it really free?">
              Yes, completely free during early access. We plan to charge $20/year once the
              app is fully grown, and early members will hear from us well before anything changes.
            </Faq>
            <Faq q="Does it work on my phone?">
              Track the Magic is a web app that works on iPhone, Android, and any computer.
              Add it to your home screen and it feels like a native app.
            </Faq>
            <Faq q="Do I need to do anything special at the parks?">
              Nothing. Check things off in line, or log the whole day from your hotel that
              night. Your progress updates everywhere, instantly.
            </Faq>
            <Faq q="Is this an official Disney app?">
              No. Track the Magic is an independent, fan-made project. It is not affiliated
              with, endorsed by, or sponsored by The Walt Disney Company.
            </Faq>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="py-16 md:py-24 text-center" style={{ borderTop: HAIRLINE }}>
          <h2 className="text-gray-900 font-bold leading-tight" style={{ fontSize: 'clamp(26px, 4vw, 36px)', letterSpacing: '-0.02em' }}>
            The magic doesn't count itself.
          </h2>
          <p className="text-gray-500 text-[15px] mt-3">
            Start your list today. Your next trip will thank you.
          </p>
          <div className="mt-8">
            <CtaButton onClick={onGetStarted}>Start tracking free</CtaButton>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="py-10 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: HAIRLINE }}>
          <div className="flex items-center gap-2">
            <LogoMark size={24} />
            <span className="text-[13px] font-semibold text-gray-700">Track the Magic</span>
          </div>
          <p className="text-[11px] text-gray-400 text-center md:text-right leading-relaxed" style={{ maxWidth: 420 }}>
            © 2026 Track the Magic. A fan-made project, not affiliated with, endorsed by,
            or sponsored by The Walt Disney Company.
          </p>
        </footer>

      </div>
    </div>
  )
}
