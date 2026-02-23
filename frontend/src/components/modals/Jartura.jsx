import { motion } from 'framer-motion'
import { X, MapPin, Star, Clock, Phone } from 'lucide-react'
import { Card, Badge } from '../ui'

const spots = [
  { id: 1, name: 'Pepito\'s Pizza', type: 'Pizza', rating: 4.8, distance: '0.3km', open: true, phone: '809-555-0123' },
  { id: 2, name: 'El Conuco', type: 'Comida Criolla', rating: 4.5, distance: '0.8km', open: true, phone: '809-555-0456' },
  { id: 3, name: 'McDonald\'s 27', type: 'Rápida', rating: 4.2, distance: '1.2km', open: false, phone: '809-555-0789' },
]

export const Jartura = ({ onClose }) => (
  <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="fixed inset-0 bg-domi-dark z-50 flex flex-col">
    <div className="flex justify-between items-center p-4 border-b border-white/10 bg-orange-600/20">
      <h2 className="text-xl font-black text-white flex items-center gap-2">
        <span className="text-2xl">🍕</span> Modo Jartura
      </h2>
      <button onClick={onClose} className="p-2 bg-white/10 rounded-full"><X size={24} /></button>
    </div>

    <div className="p-4 bg-orange-600/10">
      <p className="text-orange-400 text-sm text-center">Comida rápida cerca de ti • Abierto ahora</p>
    </div>

    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {spots.map((spot, i) => (
        <motion.div key={spot.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
          <Card className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-white">{spot.name}</h3>
                {spot.open ? <Badge variant="green">Abierto</Badge> : <Badge variant="red">Cerrado</Badge>}
              </div>
              <p className="text-gray-400 text-sm mb-2">{spot.type} • ⭐ {spot.rating}</p>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1"><MapPin size={12} className="text-orange-400" /> {spot.distance}</span>
                <span className="flex items-center gap-1"><Phone size={12} /> {spot.phone}</span>
              </div>
            </div>
            <button className="p-2 bg-orange-500/20 rounded-full text-orange-400">
              <MapPin size={20} />
            </button>
          </Card>
        </motion.div>
      ))}
    </div>
  </motion.div>
)