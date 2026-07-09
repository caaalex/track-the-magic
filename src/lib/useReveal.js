import { useState, useEffect } from 'react'

// Animates a value from 0 → 1 (ease-out) using requestAnimationFrame. Multiply
// target numbers / bar widths by the returned value to get a synchronized
// count-up + progress-bar fill. The animation (re)starts whenever `active`
// becomes true or `trigger` changes — pass a changing key (e.g. the current
// filter/values) to re-run it on updates, not just on load.
// Respects the user's reduced-motion preference.
export function useReveal(active = true, duration = 850, trigger = 0) {
  const [t, setT] = useState(0)

  useEffect(() => {
    if (!active) return

    const reduce = typeof window !== 'undefined' && window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { setT(1); return }

    let raf
    let start = null
    setT(0)
    const tick = (now) => {
      if (start === null) start = now
      const p = Math.min((now - start) / duration, 1)
      setT(1 - Math.pow(1 - p, 3)) // easeOutCubic
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => { if (raf) cancelAnimationFrame(raf) }
  }, [active, duration, trigger])

  return t
}
