import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Ghost, Clock, EyeOff, Shield, Zap } from 'lucide-react'
import { Button } from '../ui'

export const ModoFantasma = ({ onClose }) => {
  const [active, setActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(4 * 60 * 60) // 4 horas en segundos

  useEffect(() => {
    if (!active) return
    const timer = setInterval(() => {
      setTimeLeft(t => t > 0 ? t - 1 : 0)
    }, 1000)
    return () => clearInterval(timer)
  }, [active])

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  if (!active) return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-domi-dark z-50 flex flex-col p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-black text-white flex items-center gap-3">
          <Ghost className="text-purple-400" /> Modo Fantasma 👻
        </h2>
        <button onClick={onClose} className="p-2 bg-white/10 rounded-full"><X size={24} /></button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="w-32 h-32 bg-purple-500/20 rounded-full flex items-center justify-center">
          <Ghost size={64} className="text-purple-400" />
        </motion.div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white">Navegación Anónima</h3>
          <p className="text-gray-400">Durante 4 horas nadie sabrá que estás en línea ni podrás ver quién te visita</p>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
          <div className="bg-domi-card p-4 rounded-2xl text-center">
            <EyeOff className="mx-auto mb-2 text-purple-400" />
            <p className="text-xs text-gray-400">Invisible</p>
          </div>
          <div className="bg-domi-card p-4 rounded-2xl text-center">
            <Shield className="mx-auto mb-2 text-green-400" />
            <p className="text-xs text-gray-400">Sin rastro</p>
          </div>
        </div>

        <Button size="lg" className="w-full max-w-sm" onClick={() => setActive(true)}>
          <Zap size={20} className="mr-2" /> Activar Ahora
        </Button>
      </div>
    </motion.div>
  )

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-domi-dark z-50 flex flex-col p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-black text-purple-400 flex items-center gap-2">
          <Ghost /> ACTIVO
        </h2>
        <button onClick={onClose} className="p-2 bg-white/10 rounded-full"><X size={24} /></button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-48 h-48 rounded-full border-4 border-purple-500/30 flex items-center justify-center relative">
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 10, ease: "linear" }} className="absolute inset-0 rounded-full border-t-4 border-purple-500" />
          <div className="text-center">
            <Clock size={32} className="mx-auto mb-2 text-purple-400" />
            <p className="text-3xl font-black text-white">{formatTime(timeLeft)}</p>
            <p className="text-xs text-gray-400">restantes</p>
          </div>
        </div>
        <p className="mt-8 text-gray-400 text-center">Estás navegando completamente invisible</p>
      </div>
    </motion.div>
  )
}