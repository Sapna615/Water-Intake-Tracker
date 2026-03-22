import { useState } from 'react'
import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001' })

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [reply, setReply] = useState('')

  const submit = async () => {
    const res = await api.post('/contact', { name, email, message })
    setReply(res.data.autoReply)
    setName(''); setEmail(''); setMessage('')
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Contact</h1>
      <div className="bg-white dark:bg-neutral-800 rounded p-4 shadow space-y-2">
        <input className="w-full border rounded p-2" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input className="w-full border rounded p-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <textarea className="w-full border rounded p-2 h-32" placeholder="Message" value={message} onChange={e => setMessage(e.target.value)} />
        <button className="px-4 py-2 bg-primary text-white rounded" onClick={submit}>Send</button>
        {reply && <div className="mt-2 text-sm text-green-600">{reply}</div>}
      </div>
    </div>
  )
}
