import confetti from 'canvas-confetti'

// Brand green + gold celebration burst. Used on trip save and challenge
// completion so both feel identical.
const COLORS = ['#1D9E75', '#5DCAA5', '#0F6E56', '#F5C542', '#FBEB9E']

export function celebrate() {
  confetti({ particleCount: 160, spread: 100, origin: { y: 0.55 }, colors: COLORS })
  setTimeout(() => {
    confetti({ particleCount: 60, spread: 60, origin: { x: 0.1, y: 0.6 }, colors: ['#1D9E75', '#F5C542', '#5DCAA5'] })
    confetti({ particleCount: 60, spread: 60, origin: { x: 0.9, y: 0.6 }, colors: ['#0F6E56', '#FBEB9E', '#F5C542'] })
  }, 250)
}
