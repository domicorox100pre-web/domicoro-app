import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, MapPin, Users, Calendar, Music } from 'lucide-react'
import { Button, Input, Card } from '../ui'
import { CORO_TYPES } from '../../utils/constants'
import toast from 'react-hot-toast'

export const CrearCoro = ({ onClose }) => {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ name: '', type: '', date: '', maxPeople: 10 })

  const create = () => {
    toast.success('¡Coro creado exitosamente! 🔥')
    onClose()
  }

  return (
    <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="fixed inset-0 bg-domi-dark z-50 flex flex-col">
      <div className="flex justify-between items-center p-4 border-b border-white/10">
        <h2 className="text-xl font-black text-white">Crear Coro</h2>
        <button onClick={onClose} className="p-2 bg-white/10 rounded-full"><X size={24} /></button>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        {step === 1 && (
          <div className="space-y-6">
            <p className="text-gray-400 text-center">¿Qué tipo de coro quieres crear?</p>
            <div className="grid grid-cols-2 gap-4">
              {CORO_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => { setForm({...form, type: type.id}); setStep(2) }}
                  className="p-6 bg-domi-card rounded-2xl border border-white/10 hover:border-domi-red transition-all text-center"
                >
                  <div className={`w-16 h-16 ${type.bg} rounded-full flex items-center justify-center mx-auto mb-3`}>
                    <Music className={type.color} size={32} />
                  </div>
                  <p className="font-bold text-white">{type.label}</p>
                  <p className="text-xs text-gray-400">{type.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <Input label="Nombre del Coro" placeholder="Ej: Rumba en la Zona" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
            <Input label="Fecha" type="datetime-local" value={form.date} onChange={(e) => setForm({...form, date: e.target.value})} />
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Máximo de personas: {form.maxPeople}</label>
              <input type="range" min="2" max="50" value={form.maxPeople} onChange={(e) => setForm({...form, maxPeople: e.target.value})} className="w-full accent-domi-red" />
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" className="flex-1" onClick={() => setStep(1)}>Atrás</Button>
              <Button className="flex-1" onClick={create} disabled={!form.name}>Crear Coro</Button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}