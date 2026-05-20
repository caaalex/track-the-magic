export default function Avatar({ user }) {
  const name     = user?.user_metadata?.full_name ?? user?.email ?? ''
  const parts    = name.trim().split(/\s+/)
  const initials = parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : name.slice(0, 2).toUpperCase()

  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
      style={{ background: 'linear-gradient(135deg, #1D9E75, #16a870)' }}
    >
      {initials}
    </div>
  )
}
