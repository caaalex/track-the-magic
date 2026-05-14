import { createContext, useContext, useState } from 'react'
import LogVisitModal from '../components/LogVisitModal'

const LogVisitContext = createContext({ openLogVisit: () => {} })

export function LogVisitProvider({ children }) {
  const [open,        setOpen]        = useState(false)
  const [initialData, setInitialData] = useState(null)

  // Can be called with no args (blank new-trip modal) or with
  // { park, date, tripId } to add experiences to an existing trip
  const openLogVisit = (data = null) => {
    setInitialData(data)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setInitialData(null)
  }

  return (
    <LogVisitContext.Provider value={{ openLogVisit }}>
      {children}
      {open && (
        <LogVisitModal
          onClose={handleClose}
          initialPark={initialData?.park   ?? ''}
          initialDate={initialData?.date   ?? null}
          existingTripId={initialData?.tripId ?? null}
        />
      )}
    </LogVisitContext.Provider>
  )
}

export const useLogVisit = () => useContext(LogVisitContext)
