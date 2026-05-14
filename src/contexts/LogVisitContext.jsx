import { createContext, useContext, useState } from 'react'
import LogVisitModal from '../components/LogVisitModal'

const LogVisitContext = createContext({ openLogVisit: () => {} })

export function LogVisitProvider({ children }) {
  const [open, setOpen] = useState(false)

  return (
    <LogVisitContext.Provider value={{ openLogVisit: () => setOpen(true) }}>
      {children}
      {open && <LogVisitModal onClose={() => setOpen(false)} />}
    </LogVisitContext.Provider>
  )
}

export const useLogVisit = () => useContext(LogVisitContext)
