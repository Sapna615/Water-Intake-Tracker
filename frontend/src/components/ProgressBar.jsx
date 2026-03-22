export default function ProgressBar({ value, max }) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  return (
    <div className="w-full bg-blue-100 rounded h-4">
      <div className="h-4 rounded bg-primary" style={{ width: pct + '%' }} />
    </div>
  )
}
