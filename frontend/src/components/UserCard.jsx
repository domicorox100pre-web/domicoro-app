import { useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { MapPin, Gift, Heart, X } from 'lucide-react'
import { Badge } from './ui'

export const UserCard = ({ user, onLike, onPass, onGift }) => {
  const [exitDirection, setExitDirection] = useState(null)
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-30, 30])

  const handleDragEnd = (e, { offset, velocity }) => {
    const swipe = offset.x * velocity.x
    if (swipe < -5000) { setExitDirection('left'); setTimeout(onPass, 300) }
    else if (swipe > 5000) { setExitDirection('right'); setTimeout(onLike, 300) }
  }

  return (
    <motion.div
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
      animate={exitDirection === 'left' ? { x: -300, opacity: 0 } : exitDirection === 'right' ? { x: 300, opacity: 0 } : {}}
      className="relative bg-domi-card rounded-3xl overflow-hidden mb-6 aspect-[3/4] shadow-2xl border border-white/5 cursor-grab active:cursor-grabbing"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-8xl">
        👤
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />
      
      <button onClick={(e) => { e.stopPropagation(); onGift() }} className="absolute top-4 right-4 z-20 p-3 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
        <Gift size={20} className="text-white" />
      </button>

      <div className="absolute bottom-0 w-full p-6 z-20">
        <h2 className="text-4xl font-black text-white mb-1">{user?.name || 'Usuario'}</h2>
        <p className="text-gray-300 flex items-center gap-2 text-sm mb-4">
          <MapPin size={16} className="text-domi-red" />
          {user?.distance || '2'} km • Santo Domingo
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {['🔥 Teteo', '🍻 Beber', '💃 Bailar'].map(tag => <Badge key={tag} variant="red">{tag}</Badge>)}
        </div>
        <div className="flex justify-center gap-6">
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => { setExitDirection('left'); setTimeout(onPass, 300) }} className="w-16 h-16 bg-black/60 backdrop-blur-md border-2 border-red-500/50 rounded-full text-red-500 flex items-center justify-center">
            <X size={32} />
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => { setExitDirection('right'); setTimeout(onLike, 300) }} className="w-16 h-16 bg-black/60 backdrop-blur-md border-2 border-green-500/50 rounded-full text-green-500 flex items-center justify-center">
            <Heart size={32} fill="currentColor" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}