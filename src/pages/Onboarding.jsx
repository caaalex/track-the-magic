// Shown once after a new user's first login.
// Dismissed state is persisted in localStorage so it never appears again.

import { Map, CalendarDays, Trophy, Plane, Smartphone } from 'lucide-react'

const GREEN = '#1D9E75'

function OnboardingRow({ icon: Icon, title, description, last }) {
  return (
    <div
      className="flex items-start gap-3.5 py-4"
      style={{ borderBottom: last ? 'none' : '1px solid #EDEBE6' }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: '#EAF5F0' }}
      >
        <Icon size={17} color={GREEN} strokeWidth={1.5} />
      </div>
      <div className="flex-1 min-w-0 pt-0.5">
        <p className="text-[14px] font-semibold text-gray-900 mb-1">{title}</p>
        <p className="text-[14px] text-gray-400 leading-snug">{description}</p>
      </div>
    </div>
  )
}

export default function Onboarding({ onDismiss }) {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{
        maxWidth: 375,
        left: 0, right: 0,
        margin: '0 auto',
        background: '#FAFAF9',
      }}
    >
      <div className="flex-1 flex flex-col justify-center px-6 overflow-y-auto no-scrollbar">

        {/* ── Logo mark ── */}
        <div
          className="w-[64px] h-[64px] rounded-[16px] flex items-center justify-center mb-5"
          style={{
            background: 'linear-gradient(145deg, #1D9E75 0%, #13855f 100%)',
            boxShadow: '0 8px 24px rgba(29,158,117,0.30)',
          }}
        >
          <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
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
        <h1 className="text-[24px] font-bold text-gray-900 leading-tight mb-2 tracking-[-0.025em]">
          Welcome to Track the Magic
        </h1>
        <p className="text-gray-400 text-[14px] leading-relaxed mb-7 max-w-[280px]">
          Hundreds of experiences across every Disney World destination and
          resort, all in one place.
        </p>

        {/* ── Rows ── */}
        <div className="w-full">
          <OnboardingRow
            icon={Map}
            title="Use the Tracker"
            description="Browse any destination and check off attractions, dining, and more, one by one."
          />
          <OnboardingRow
            icon={CalendarDays}
            title="Log a visit"
            description="Add everything you did in a single visit at once. Both ways update your progress automatically."
          />
          <OnboardingRow
            icon={Trophy}
            title="Take on challenges"
            description="Complete checklists only true Disney fans can finish, and see where you rank."
          />
          <OnboardingRow
            icon={Plane}
            title="Build your history"
            description="Every trip you log becomes part of your own Disney World journal."
          />
          <OnboardingRow
            icon={Smartphone}
            title="Add it to your home screen"
            description="Tap Share in your browser (iPhone) or the ⋮ menu (Android), then “Add to Home Screen,” to launch Track the Magic full screen, just like a native app."
            last
          />
        </div>

      </div>

      {/* ── CTA ── */}
      <div className="px-6 pt-4 pb-10 flex-shrink-0" style={{ borderTop: '1px solid #E7E5E0' }}>
        <button
          onClick={onDismiss}
          className="w-full py-3.5 rounded-xl text-white font-semibold text-sm active:scale-[0.98]"
          style={{
            backgroundColor: GREEN,
            boxShadow: '0 2px 14px rgba(29,158,117,0.3)',
            transition: 'transform 0.25s cubic-bezier(0.32,0.72,0,1)',
          }}
        >
          Let's go
        </button>
      </div>

    </div>
  )
}
