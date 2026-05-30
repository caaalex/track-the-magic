import { createContext, useContext, useState } from 'react'
import LogVisitModal from '../components/LogVisitModal'

const LogVisitContext = createContext({ openLogVisit: () => {}, savedCount: 0 })

export function LogVisitProvider({ children }) {
  const [open,        setOpen]        = useState(false)
  const [initialData, setInitialData] = useState(null)
  const [savedCount,  setSavedCount]  = useState(0)

  const openLogVisit = (data = null) => {
    setInitialData(data)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setInitialData(null)
  }

  const handleSave = () => {
    setSavedCount(c => c + 1)
    handleClose()
  }

  return (
    <LogVisitContext.Provider value={{ openLogVisit, savedCount }}>
      {children}
      {open && (
        <LogVisitModal
          onClose={handleClose}
          onSave={handleSave}
          initialPark={initialData?.park   ?? ''}
          initialDate={initialData?.date   ?? null}
          existingTripId={initialData?.tripId ?? null}
        />
      )}
    </LogVisitContext.Provider>
  )
}

export const useLogVisit = () => useContext(LogVisitContext)
