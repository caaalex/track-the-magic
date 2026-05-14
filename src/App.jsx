import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import BottomNav from './components/BottomNav'
import Home from './pages/Home'
import Tracker from './pages/Tracker'
import Challenges from './pages/Challenges'
import ChallengeDetail from './pages/ChallengeDetail'
import Trips from './pages/Trips'
import ExperienceDetail from './pages/ExperienceDetail'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { LogVisitProvider } from './contexts/LogVisitContext'

function AuthGate() {
  const { user, loading } = useAuth()
  const [showSignUp, setShowSignUp] = useState(false)

  if (loading) return <LoadingScreen />

  if (!user) {
    return showSignUp
      ? <SignUp onSwitch={() => setShowSignUp(false)} />
      : <Login onSwitch={() => setShowSignUp(true)} />
  }

  return (
    <BrowserRouter>
      <LogVisitProvider>
        <div className="relative mx-auto flex flex-col min-h-screen bg-white" style={{ maxWidth: 375 }}>
          <main className="flex-1 flex flex-col pb-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tracker" element={<Tracker />} />
              <Route path="/tracker/:id" element={<ExperienceDetail />} />
              <Route path="/challenges" element={<Challenges />} />
              <Route path="/challenges/:id" element={<ChallengeDetail />} />
              <Route path="/trips" element={<Trips />} />
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
    <div className="min-h-screen flex items-center justify-center bg-white"
         style={{ maxWidth: 375, margin: '0 auto' }}>
      <div className="text-center">
        <span className="text-5xl block mb-3">🏰</span>
        <p className="text-gray-400 text-sm">Loading…</p>
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
