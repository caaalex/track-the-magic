// Shown once after a new user's first login.
// Dismissed state is persisted in localStorage so it never appears again.

function OnboardingCard({ emoji, title, description }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-4 text-left border border-gray-100">
      <div className="flex items-center gap-3 mb-1.5">
        <span className="text-2xl leading-none flex-shrink-0">{emoji}</span>
        <p className="text-sm font-bold text-gray-800">{title}</p>
      </div>
      <p className="text-sm text-gray-500 leading-snug pl-9">{description}</p>
    </div>
  )
}

export default function Onboarding({ onDismiss }) {
  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col overflow-y-auto"
         style={{ maxWidth: 375, left: 0, right: 0, margin: '0 auto' }}>

      <div className="flex-1 flex flex-col items-center px-6 pt-14 pb-6">

        {/* ── Hero ── */}
        <span className="text-6xl mb-5">🎉</span>
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
          Welcome to Track the Magic!
        </h1>
        <p className="text-gray-500 text-sm text-center leading-relaxed mb-8">
          You have two ways to track your Disney experiences:
        </p>

        {/* ── Cards ── */}
        <div className="flex flex-col gap-3 w-full">
          <OnboardingCard
            emoji="🗺️"
            title="Use the Tracker"
            description="Browse any destination and check off experiences one by one."
          />
          <OnboardingCard
            emoji="📅"
            title="Log a visit"
            description="Add everything you did in one park visit all at once. Both methods update your progress automatically."
          />
        </div>

      </div>

      {/* ── CTA ── */}
      <div className="px-6 pb-10">
        <button
          onClick={onDismiss}
          className="w-full py-3.5 rounded-xl text-white font-bold text-sm active:scale-[0.98] transition-transform"
          style={{ backgroundColor: '#1D9E75' }}
        >
          Let's go!
        </button>
      </div>

    </div>
  )
}
