import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, MapPin, Share2, Users, Clock, Navigation } from 'lucide-react'
import { Button, Badge } from '../ui'

export const AfterParty = ({ onClose }) => {
  const [sharing, setSharing] = useState(false)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-domi-dark z-50 flex flex-col">
      <div className="flex justify-between items-center p-4 border-b border-white/10">
        <h2 className="text-xl font-black text-white flex items-center gap-2">
          <span className="text-2xl">🎉</span> After Party
        </h2>
        <button onClick={onClose} className="p-2 bg-white/10 rounded-full"><X size={24} /></button>
      </div>

      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        {!sharing ? (
          <>
            <div className="bg-gradient-to-br from-domi-red/20 to-purple-500/20 rounded-3xl p-6 text-center border border-domi-red/30">
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="w-20 h-20 bg-domi-red rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin size={40} className="text-white" />
              </motion.div>
              <h3 className="text-2xl font-black text-white mb-2">¿Dónde sigue la rumba?</h3>
              <p className="text-gray-400">Comparte tu ubicación en tiempo real con tus matches por 4 horas</p>
            </div>

            <div className="space-y-3">
              <div className="bg-domi-card p-4 rounded-2xl flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center text-green-400"><Navigation size={24} /></div>
                <div>
                  <p className="font-bold text-white">Ubicación exacta</p>
                  <p className="text-xs text-gray-400">GPS en tiempo real</p>
                </div>
              </div>
              <div className="bg-domi-card p-4 rounded-2xl flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400"><Users size={24} /></div>
                <div>
                  <p className="font-bold text-white">Solo matches</p>
                  <p className="text-xs text-gray-400">Solo quienes hicieron match contigo</p>
                </div>
              </div>
              <div className="bg-domi-card p-4 rounded-2xl flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-400"><Clock size={24} /></div>
                <div>
                  <p className="font-bold text-white">4 horas máximo</p>
                  <p className="text-xs text-gray-400">Se desactiva automáticamente</p>
                </div>
              </div>
            </div>

            <Button size="lg" className="w-full" onClick={() => setSharing(true)}>
              <Share2 size={20} className="mr-2" /> Compartir Ahora
            </Button>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }} className="w-32 h-32 border-4 border-domi-red/30 border-t-domi-red rounded-full" />
            <div>
              <h3 className="text-2xl font-black text-white mb-2">¡Compartiendo!</h3>
              <p className="text-gray-400">Tus matches pueden verte en el mapa</p>
            </div>
            <Badge variant="green">● EN VIVO</Badge>
            <Button variant="danger" onClick={() => setSharing(false)}>Detener</Button>
          </div>
        )}
      </div>
    </motion.div>
  )
}