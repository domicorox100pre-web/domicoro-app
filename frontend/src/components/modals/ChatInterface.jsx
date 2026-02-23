import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Send, Phone, Video, MoreVertical, Gift, Heart } from 'lucide-react'
import { Button, Avatar } from '../ui'

const mockMessages = [
  { id: 1, from: 'them', text: 'Hey! 👋', time: '14:30' },
  { id: 2, from: 'me', text: 'Hola! ¿Cómo estás?', time: '14:31' },
  { id: 3, from: 'them', text: 'Bien, ¿vamos pa\' la Zona Colonial hoy?', time: '14:32' },
]

export const ChatInterface = ({ user, onClose }) => {
  const [messages, setMessages] = useState(mockMessages)
  const [input, setInput] = useState('')
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    const newMsg = { id: Date.now(), from: 'me', text: input, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
    setMessages([...messages, newMsg])
    setInput('')
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now()+1, from: 'them', text: '¡Dale! 🔥', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }])
    }, 1500)
  }

  return (
    <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-0 bg-domi-dark z-50 flex flex-col">
      <div className="flex justify-between items-center p-4 border-b border-white/10 bg-domi-card/90 backdrop-blur-lg">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="p-2 -ml-2"><X size={24} /></button>
          <Avatar name={user?.name} online size="sm" />
          <div>
            <h3 className="font-bold text-white">{user?.name || 'Usuario'}</h3>
            <p className="text-xs text-green-400">En línea</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 bg-white/10 rounded-full"><Phone size={18} /></button>
          <button className="p-2 bg-white/10 rounded-full"><Video size={18} /></button>
          <button className="p-2 bg-white/10 rounded-full"><MoreVertical size={18} /></button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] px-4 py-2 rounded-2xl ${msg.from === 'me' ? 'bg-domi-red text-white rounded-br-md' : 'bg-domi-card text-white rounded-bl-md'}`}>
              <p>{msg.text}</p>
              <p className="text-[10px] opacity-70 mt-1 text-right">{msg.time}</p>
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      <div className="p-4 border-t border-white/10 bg-domi-card">
        <div className="flex gap-2 mb-3">
          <button className="p-2 bg-white/10 rounded-full text-yellow-400"><Gift size={18} /></button>
          <button className="p-2 bg-white/10 rounded-full text-red-400"><Heart size={18} /></button>
        </div>
        <form onSubmit={sendMessage} className="flex gap-2">
          <input 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Escribe un mensaje..." 
            className="flex-1 bg-domi-dark border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-domi-red"
          />
          <Button type="submit" variant="primary" className="px-4"><Send size={20} /></Button>
        </form>
      </div>
    </motion.div>
  )
}