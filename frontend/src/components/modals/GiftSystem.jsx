import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Gift, Coins } from 'lucide-react'
import { Button, Card } from '../ui'
import { GIFTS } from '../../utils/constants'
import toast from 'react-hot-toast'

export const GiftSystem = ({ recipient, onClose }) => {
  const [selected, setSelected] = useState(null)
  const [coins] = useState(1250)

  const sendGift = () => {
    if (!selected) return
    toast.success(`¡Enviaste ${selected.name} a ${recipient?.name}!`)
    onClose()
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/90 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-domi-card w-full max-w-md rounded-3xl p-6 border border-white/10">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <Gift className="text-pink-400" /> Enviar Regalo
            </h2>
            <p className="text-gray-400 text-sm">Para: {recipient?.name}</p>
          </div>
          <button onClick={onClose} className="p-2 bg-white/10 rounded-full"><X size={20} /></button>
        </div>

        <div className="flex items-center justify-center gap-2 mb-6 bg-yellow-500/10 py-2 rounded-xl">
          <Coins size={20} className="text-yellow-400" />
          <span className="text-xl font-black text-yellow-400">{coins}</span>
          <span className="text-xs text-gray-400">monedas</span>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {GIFTS.map((gift) => (
            <motion.button
              key={gift.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelected(gift)}
              className={`p-4 rounded-2xl border-2 transition-all ${selected?.id === gift.id ? 'border-pink-500 bg-pink-500/20' : 'border-white/10 bg-domi-dark'}`}
            >
              <div className="text-3xl mb-2">{gift.icon}</div>
              <p className="text-xs font-bold text-white mb-1">{gift.name}</p>
              <p className="text-xs text-yellow-400">{gift.price}</p>
            </motion.button>
          ))}
        </div>

        <Button 
          variant={selected ? 'primary' : 'secondary'} 
          className="w-full" 
          disabled={!selected || coins < selected.price}
          onClick={sendGift}
        >
          {selected ? `Enviar ${selected.name} (${selected.price})` : 'Selecciona un regalo'}
        </Button>
      </div>
    </motion.div>
  )
}