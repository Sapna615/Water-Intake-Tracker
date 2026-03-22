import { useEffect, useState } from 'react'
import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001' })

export default function Chatbot() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => {
    api.get('/chatbot/sample').then(res => {
      setMessages(res.data.samples.map(s => ({ from: 'bot', text: s.a })))
    })
  }, [])

  const send = async () => {
    if (!input) return
    setMessages(m => [...m, { from: 'user', text: input }])
    const res = await api.post('/chatbot/ask', { prompt: input })
    setMessages(m => [...m, { from: 'bot', text: res.data.answer }])
    setInput('')
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">AI Chatbot</h1>
      <div className="bg-white dark:bg-neutral-800 rounded p-4 shadow h-96 overflow-y-auto space-y-2">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`px-3 py-2 rounded ${m.from === 'user' ? 'bg-primary text-white' : 'bg-blue-100'}`}>{m.text}</div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-3">
        <input className="flex-1 border rounded p-2" value={input} onChange={e => setInput(e.target.value)} placeholder="Ask about hydration..." />
        <button className="px-4 py-2 bg-primary text-white rounded" onClick={send}>Send</button>
      </div>
    </div>
  )
}
