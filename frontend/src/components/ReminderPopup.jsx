import { useEffect, useState } from 'react'

export default function ReminderPopup() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const last = localStorage.getItem('reminder-date')
    const today = new Date().toISOString().slice(0, 10)
    if (last !== today) {
      setTimeout(() => setShow(true), 1200)
      localStorage.setItem('reminder-date', today)
    }
  }, [])
  if (!show) return null
  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-neutral-800 border border-blue-200 dark:border-neutral-700 rounded shadow-lg p-4">
      <div className="font-semibold mb-2">Don’t forget to drink water!</div>
      <button className="px-3 py-1 bg-primary text-white rounded" onClick={() => setShow(false)}>Got it</button>
    </div>
  )
}
