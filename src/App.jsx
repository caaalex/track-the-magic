import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import BottomNav from './components/BottomNav'
import Home from './pages/Home'
import Tracker from './pages/Tracker'
import Challenges from './pages/Challenges'
import ChallengeDetail from './pages/ChallengeDetail'
import Trips from './pages/Trips'
import TripDetail from './pages/TripDetail'
import Profile from './pages/Profile'
import ExperienceDetail from './pages/ExperienceDetail'
import AuthScreen from './pages/AuthScreen'
import { LogVisitProvider } from './contexts/LogVisitContext'

function AuthGate() {
  const { user, loading } = useAuth()

  if (loading) return <LoadingScreen />

  if (!user) return <AuthScreen />

  return (
    <BrowserRouter>
      <LogVisitProvider>
        <div className="relative mx-auto flex flex-col min-h-screen bg-[#FAFAF9]" style={{ maxWidth: 375 }}>
          <main className="flex-1 flex flex-col pb-28">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tracker" element={<Tracker />} />
              <Route path="/tracker/:id" element={<ExperienceDetail />} />
              <Route path="/challenges" element={<Challenges />} />
              <Route path="/challenges/:id" element={<ChallengeDetail />} />
              <Route path="/trips" element={<Trips />} />
              <Route path="/trips/:id" element={<TripDetail />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          <BottomNav />
        </div>
      </LogVisitProvider>
    </BrowserRouter>
  )
}

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAF9]"
         style={{ maxWidth: 375, margin: '0 auto' }}>
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
          style={{ background: 'linear-gradient(135deg, #e6f7f1, #f0fdf8)', boxShadow: '0 4px 16px rgba(29,158,117,0.12)' }}
        >
          🏰
        </div>
        <div className="flex gap-1.5">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[#1D9E75]"
              style={{ animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`, opacity: 0.4 }}
            />
          ))}
        </div>
        <style>{`@keyframes pulse { 0%,100%{opacity:.3;transform:scale(.8)} 50%{opacity:1;transform:scale(1)} }`}</style>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AuthGate />
    </AuthProvider>
  )
}
