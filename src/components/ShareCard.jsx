import { useRef, useState, useEffect } from 'react'
import { X, Share2, Download } from 'lucide-react'

const GREEN = '#1D9E75'
const GREEN_DARK = '#13855f'
const CANVAS = '#FAFAF9'
const TRACK = '#ECEAE5'
const INK = '#1c1917'
const MUTED = '#a8a29e'
const SLATE = '#78716c'
const HAIR = '#E7E5E0'

const W = 320   // logical card width
const H = 400   // logical card height
const S = 3     // export scale → 960×1200 png

const FONT_STACK = "'Plus Jakarta Sans', system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
const font = (weight, size) => `${weight} ${size}px ${FONT_STACK}`

const STAR = 'M18 3 C18 3 19.5 12.5 24.5 17.5 C19.5 17.5 19.5 17.5 24.5 17.5 C19.5 22.5 18 33 18 33 C18 33 16.5 22.5 11.5 17.5 C16.5 17.5 16.5 17.5 11.5 17.5 C16.5 12.5 18 3 18 3Z'

// Parks featured on the card (the four theme parks).
const FEATURED = [
  { name: 'Magic Kingdom', short: 'Magic Kingdom' },
  { name: 'Epcot', short: 'Epcot' },
  { name: 'Hollywood Studios', short: 'Hollywood Studios' },
  { name: 'Animal Kingdom', short: 'Animal Kingdom' },
]

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.roundRect(x, y, w, h, r)
}

// Centered run of styled text segments on one baseline.
function centeredSegments(ctx, cx, y, segments) {
  let total = 0
  for (const s of segments) { ctx.font = s.font; total += ctx.measureText(s.text).width }
  let x = cx - total / 2
  ctx.textAlign = 'left'
  ctx.textBaseline = 'alphabetic'
  for (const s of segments) {
    ctx.font = s.font
    ctx.fillStyle = s.color
    ctx.fillText(s.text, x, y)
    x += ctx.measureText(s.text).width
  }
}

function drawCard(canvas, { pct, completed, total, percentile, parks }) {
  const ctx = canvas.getContext('2d')
  canvas.width = W * S
  canvas.height = H * S
  ctx.setTransform(S, 0, 0, S, 0, 0)
  ctx.clearRect(0, 0, W, H)

  // Background
  ctx.fillStyle = CANVAS
  ctx.fillRect(0, 0, W, H)

  // ── Header: logo + wordmark ──
  const g = ctx.createLinearGradient(24, 24, 48, 48)
  g.addColorStop(0, GREEN)
  g.addColorStop(1, GREEN_DARK)
  ctx.fillStyle = g
  roundRect(ctx, 24, 24, 24, 24, 7)
  ctx.fill()
  // star mark (36×36 viewBox scaled into 12px, centered in the 24px square)
  ctx.save()
  ctx.translate(30, 30)
  ctx.scale(12 / 36, 12 / 36)
  ctx.fillStyle = 'rgba(255,255,255,0.95)'
  ctx.fill(new Path2D(STAR))
  ctx.fillStyle = 'rgba(255,255,255,0.55)'
  ctx.beginPath(); ctx.arc(27, 9, 2.2, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = 'rgba(255,255,255,0.38)'
  ctx.beginPath(); ctx.arc(9, 27, 1.5, 0, Math.PI * 2); ctx.fill()
  ctx.restore()

  ctx.fillStyle = INK
  ctx.font = font(700, 13)
  ctx.textAlign = 'left'
  ctx.textBaseline = 'middle'
  ctx.fillText('Track the Magic', 56, 37)

  // ── Ring ──
  const cx = 160, cy = 128, r = 59
  ctx.lineWidth = 11
  ctx.lineCap = 'round'
  ctx.strokeStyle = TRACK
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke()
  const start = -Math.PI / 2
  ctx.strokeStyle = GREEN
  ctx.beginPath(); ctx.arc(cx, cy, r, start, start + (2 * Math.PI * Math.min(pct, 100)) / 100); ctx.stroke()

  ctx.fillStyle = INK
  ctx.font = font(300, 40)
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(`${pct}%`, cx, cy + 1)

  // ── Sub-labels ──
  ctx.fillStyle = SLATE
  ctx.font = font(400, 12)
  ctx.textBaseline = 'alphabetic'
  ctx.fillText('of all Disney World done', cx, 210)

  const statSegs = [
    { text: String(completed), font: font(600, 12), color: INK },
    { text: ` of ${total} experiences`, font: font(400, 12), color: MUTED },
  ]
  if (percentile != null) {
    statSegs.push({ text: ' · ', font: font(400, 12), color: MUTED })
    statSegs.push({ text: `Top ${percentile}%`, font: font(600, 12), color: GREEN })
  }
  centeredSegments(ctx, cx, 230, statSegs)

  // ── Park breakdown (2×2) ──
  const gap = 14
  const colW = (W - 48 - gap) / 2
  const cols = [24, 24 + colW + gap]
  const rowsY = [300, 334]
  parks.slice(0, 4).forEach((p, i) => {
    const x = cols[i % 2]
    const y = rowsY[Math.floor(i / 2)]
    ctx.textBaseline = 'alphabetic'
    ctx.font = font(400, 9.5)
    ctx.fillStyle = SLATE
    ctx.textAlign = 'left'
    // clip long labels to the column
    let label = p.label
    while (ctx.measureText(label).width > colW - 26 && label.length > 3) label = label.slice(0, -1)
    if (label !== p.label) label = label.slice(0, -1) + '…'
    ctx.fillText(label, x, y)
    ctx.font = font(600, 9.5)
    ctx.fillStyle = INK
    ctx.textAlign = 'right'
    ctx.fillText(`${p.pct}%`, x + colW, y)
    // bar
    ctx.fillStyle = TRACK
    roundRect(ctx, x, y + 6, colW, 3, 1.5); ctx.fill()
    ctx.fillStyle = GREEN
    roundRect(ctx, x, y + 6, (colW * Math.min(p.pct, 100)) / 100, 3, 1.5); ctx.fill()
  })

  // ── Footer ──
  ctx.strokeStyle = HAIR
  ctx.lineWidth = 1
  ctx.lineCap = 'butt'
  ctx.beginPath(); ctx.moveTo(24, 360); ctx.lineTo(W - 24, 360); ctx.stroke()
  ctx.font = font(400, 10.5)
  ctx.fillStyle = MUTED
  ctx.textAlign = 'left'
  ctx.fillText('How much have you done?', 24, 378)
  ctx.font = font(600, 10.5)
  ctx.fillStyle = GREEN
  ctx.textAlign = 'right'
  ctx.fillText('trackthemagic.com', W - 24, 378)
}

function canvasToBlob(canvas) {
  return new Promise(resolve => canvas.toBlob(resolve, 'image/png'))
}

export default function ShareProgressModal({ onClose, pct, completed, total, percentile, parkStats = [] }) {
  const canvasRef = useRef(null)
  const [busy, setBusy] = useState(false)
  const [savedHint, setSavedHint] = useState(false)

  const parks = FEATURED.map(f => {
    const match = parkStats.find(p => p.name === f.name)
    return { label: f.short, pct: match ? match.pct : 0 }
  })

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      if (document.fonts && document.fonts.ready) await document.fonts.ready
      if (cancelled || !canvasRef.current) return
      drawCard(canvasRef.current, { pct, completed, total, percentile, parks })
    })()
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pct, completed, total, percentile])

  const handleShare = async () => {
    setBusy(true)
    try {
      const blob = await canvasToBlob(canvasRef.current)
      const file = new File([blob], 'track-the-magic.png', { type: 'image/png' })
      const text = `I've done ${pct}% of Disney World. How much have you done?`
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: 'My Disney World progress', text })
      } else {
        saveBlob(blob)
        flashSaved()
      }
    } catch (err) {
      if (err && err.name === 'AbortError') return // user closed the share sheet
      console.error('Share failed:', err)
    } finally {
      setBusy(false)
    }
  }

  const handleDownload = async () => {
    setBusy(true)
    try {
      saveBlob(await canvasToBlob(canvasRef.current))
      flashSaved()
    } catch (err) {
      console.error('Download failed:', err)
    } finally {
      setBusy(false)
    }
  }

  const flashSaved = () => { setSavedHint(true); setTimeout(() => setSavedHint(false), 2500) }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6"
      style={{ backgroundColor: 'rgba(28,25,23,0.55)', backdropFilter: 'blur(2px)' }}
      onClick={onClose}
    >
      <div className="w-full mx-auto" style={{ maxWidth: W }} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-3">
          <p className="text-white font-semibold text-[15px]">Share your progress</p>
          <button onClick={onClose} className="text-white/70 active:opacity-60 p-1" aria-label="Close">
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        {/* Card preview — the same canvas that gets exported */}
        <canvas
          ref={canvasRef}
          className="rounded-2xl mx-auto block"
          style={{ width: W, height: H, boxShadow: '0 12px 40px rgba(0,0,0,0.3)' }}
        />

        {/* Actions */}
        <div className="flex items-center gap-2.5 mt-4">
          <button
            onClick={handleShare}
            disabled={busy}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl font-semibold text-sm py-3 text-white active:scale-[0.98] disabled:opacity-60"
            style={{ backgroundColor: GREEN, boxShadow: '0 2px 14px rgba(29,158,117,0.35)', transition: 'transform 0.2s ease' }}
          >
            <Share2 size={16} strokeWidth={2} />
            {busy ? 'Preparing…' : 'Share'}
          </button>
          <button
            onClick={handleDownload}
            disabled={busy}
            className="inline-flex items-center justify-center gap-2 rounded-xl font-semibold text-sm py-3 px-4 active:scale-[0.98] disabled:opacity-60"
            style={{ backgroundColor: 'rgba(255,255,255,0.14)', color: 'white', transition: 'transform 0.2s ease' }}
            aria-label="Save image"
          >
            <Download size={16} strokeWidth={2} />
          </button>
        </div>
        {savedHint && (
          <p className="text-center text-white/80 text-xs mt-3">Image saved to your device</p>
        )}
      </div>
    </div>
  )
}

function saveBlob(blob) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'track-the-magic.png'
  a.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
