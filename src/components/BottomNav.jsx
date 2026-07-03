import { NavLink } from 'react-router-dom'
import { House, CircleCheck, Trophy, Plane } from 'lucide-react'

const tabs = [
  { to: '/',           label: 'Home',       icon: House },
  { to: '/tracker',    label: 'Tracker',    icon: CircleCheck },
  { to: '/challenges', label: 'Challenges', icon: Trophy },
  { to: '/trips',      label: 'Trips',      icon: Plane },
]

export default function BottomNav() {
  return (
    <nav
      className="fixed left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-[343px]"
      style={{ bottom: 'calc(1.25rem + env(safe-area-inset-bottom))' }}
    >
      <div
        className="flex items-center justify-around rounded-2xl px-1 py-1.5"
        style={{
          background: 'rgba(255,255,255,0.88)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow:
            '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)',
        }}
      >
        {tabs.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className="flex flex-col items-center justify-center flex-1 gap-0.5 rounded-xl py-2 text-[10px] font-semibold"
            style={({ isActive }) =>
              isActive
                ? {
                    color: '#fff',
                    background: 'linear-gradient(135deg, #1D9E75 0%, #16a870 100%)',
                    boxShadow: '0 2px 10px rgba(29,158,117,0.32)',
                    transition: 'all 0.35s cubic-bezier(0.32,0.72,0,1)',
                  }
                : {
                    color: '#a8a29e',
                    transition: 'all 0.35s cubic-bezier(0.32,0.72,0,1)',
                  }
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
