export default function Avatar({ user, name, size = 36 }) {
  const display  = name ?? user?.user_metadata?.full_name ?? user?.email ?? ''
  const parts    = display.trim().split(/\s+/)
  const initials = parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : display.slice(0, 2).toUpperCase()

  return (
    <div
      className="rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.36,
        background: 'linear-gradient(135deg, #1D9E75, #16a870)',
      }}
    >
      {initials}
    </div>
  )
}
