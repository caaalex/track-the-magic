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
      className="fixed bottom-0 left-1/2 -translate-x-1/2 z-40 w-full max-w-[375px]"
      style={{
        background: 'rgba(250,250,249,0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderTop: '1px solid #E7E5E0',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <div className="flex items-center justify-around py-1.5">
        {tabs.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className="flex flex-col items-center justify-center gap-0.5 py-1.5 px-3 text-[10px] font-medium"
            style={({ isActive }) => ({
              color: isActive ? '#1D9E75' : '#C5C1BB',
              transition: 'color 0.25s cubic-bezier(0.32,0.72,0,1)',
            })}
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
