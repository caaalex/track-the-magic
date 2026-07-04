// Shown once after a new user's first login.
// Dismissed state is persisted in localStorage so it never appears again.

import { Map, CalendarDays } from 'lucide-react'

function OnboardingRow({ icon: Icon, title, description, last }) {
  return (
    <div
      className="flex items-start gap-3.5 py-4"
      style={{ borderBottom: last ? 'none' : '1px solid #EDEBE6' }}
    >
      <Icon size={18} color="#78716C" strokeWidth={1.5} className="mt-0.5 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-gray-900 mb-1">{title}</p>
        <p className="text-[13px] text-gray-400 leading-snug">{description}</p>
      </div>
    </div>
  )
}

export default function Onboarding({ onDismiss }) {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col overflow-y-auto"
      style={{
        maxWidth: 375,
        left: 0, right: 0,
        margin: '0 auto',
        background: '#FAFAF9',
      }}
    >
      <div className="flex-1 flex flex-col items-center px-6 pt-16 pb-6">

        {/* ── Logo mark ── */}
        <div
          className="w-[68px] h-[68px] rounded-[18px] flex items-center justify-center mb-6"
          style={{
            background: 'linear-gradient(145deg, #1D9E75 0%, #13855f 100%)',
            boxShadow: '0 8px 24px rgba(29,158,117,0.30)',
          }}
        >
          <svg width="34" height="34" viewBox="0 0 36 36" fill="none">
            <path
              d="M18 3 C18 3 19.5 12.5 24.5 17.5 C19.5 17.5 19.5 17.5 24.5 17.5 C19.5 22.5 18 33 18 33 C18 33 16.5 22.5 11.5 17.5 C16.5 17.5 16.5 17.5 11.5 17.5 C16.5 12.5 18 3 18 3Z"
              fill="white"
              fillOpacity="0.95"
            />
            <circle cx="27" cy="9" r="2.2" fill="white" fillOpacity="0.55" />
            <circle cx="9" cy="27" r="1.5" fill="white" fillOpacity="0.38" />
          </svg>
        </div>

        {/* ── Headline ── */}
        <h1 className="text-[26px] font-bold text-gray-900 text-center leading-tight mb-2.5 tracking-[-0.025em]">
          Welcome to<br />Track the Magic
        </h1>
        <p className="text-gray-400 text-[13px] text-center leading-relaxed mb-8 max-w-[230px]">
          Two ways to track every Disney experience you've had
        </p>

        {/* ── Rows ── */}
        <div className="w-full">
          <OnboardingRow
            icon={Map}
            title="Use the Tracker"
            description="Browse any destination and check off experiences one by one."
          />
          <OnboardingRow
            icon={CalendarDays}
            title="Log a visit"
            description="Add everything you did in one park visit all at once. Both methods update your progress automatically."
            last
          />
        </div>

      </div>

      {/* ── CTA ── */}
      <div className="px-6 pb-12">
        <button
          onClick={onDismiss}
          className="w-full py-3.5 rounded-xl text-white font-semibold text-sm active:scale-[0.98]"
          style={{
            backgroundColor: '#1D9E75',
            transition: 'transform 0.25s cubic-bezier(0.32,0.72,0,1)',
          }}
        >
          Let's go
        </button>
      </div>

    </div>
  )
}
