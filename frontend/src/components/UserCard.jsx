import { useState } from 'react'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import { MapPin, Gift, Heart, X, Info } from 'lucide-react'
import { Badge, Avatar } from './ui'

export const UserCard = ({ user, onLike, onPass, onGift, onInfo }) => {
  const [currentImage, setCurrentImage] = useState(0)
  const [exitDirection, setExitDirection] = useState(null)
  
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-30, 30])
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5])

  const handleDragEnd = (e, { offset, velocity }) => {
    const swipe = offset.x * velocity.x

    if (swipe < -5000) {
      setExitDirection('left')
      setTimeout(() => onPass(), 300)
    } else if (swipe > 5000) {
      setExitDirection('right')
      setTimeout(() => onLike(), 300)
    }
  }

  const images = user.photos?.length > 0 ? user.photos : [null]

  return (
    <motion.div
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
      animate={exitDirection === 'left' ? { x: -300, opacity: 0 } : exitDirection === 'right' ? { x: 300, opacity: 0 } : {}}
      className="relative bg-domi-card rounded-3xl overflow-hidden mb-6 aspect-[3/4] shadow-2xl border border-white/5 cursor-grab active:cursor-grabbing select-none"
    >
      {/* Image Carousel */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900">
        <AnimatePresence mode="wait">
          <motion.img 
            key={currentImage}
            src={images[currentImage] || '/default-avatar.png'}
            alt={user.name}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            draggable={false}
            onError={(e) => {
              e.target.src = '/default-avatar.png'
            }}
          />
        </AnimatePresence>
        
        {/* Image indicators */}
        {images.length > 1 && (
          <div className="absolute top-4 left-4 right-4 flex gap-1">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentImage(i)
                }}
                className={`flex-1 h-1 rounded-full transition-all ${i === currentImage ? 'bg-white' : 'bg-white/30'}`}
              />
            ))}
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />
      </div>

      {/* Top buttons */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <button 
          onClick={(e) => { e.stopPropagation(); onInfo() }}
          className="p-3 bg-black/40 backdrop-blur-md rounded-full hover:bg-black/60 transition-colors border border-white/10"
        >
          <Info size={20} className="text-white" />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onGift() }}
          className="p-3 bg-black/40 backdrop-blur-md rounded-full hover:bg-black/60 transition-colors border border-white/10"
        >
          <Gift size={20} className="text-white" />
        </button>
      </div>

      {/* Info */}
      <div className="absolute bottom-0 w-full p-6 z-20">
        <div className="flex items-end justify-between mb-2">
          <div>
            <h2 className="text-4xl font-black text-white mb-1 flex items-center gap-2">
              {user.name}
              {user.verified && <Badge variant="vip" className="text-xs">✓</Badge>}
            </h2>
            <p className="text-gray-300 flex items-center gap-2 text-sm">
              <MapPin size={16} className="text-domi-red" />
              {user.distance} km • {user.location || 'Santo Domingo'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-white">{user.age}</p>
            <p className="text-gray-400 text-xs">años</p>
          </div>
        </div>

        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{user.bio}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {user.interests?.slice(0, 4).map(tag => (
            <Badge key={tag} variant="red">{tag}</Badge>
          ))}
          {user.interests?.length > 4 && (
            <Badge variant="outline">+{user.interests.length - 4}</Badge>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex justify-center gap-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => { 
              e.stopPropagation()
              setExitDirection('left')
              setTimeout(() => onPass(), 300)
            }}
            className="w-16 h-16 bg-black/60 backdrop-blur-md border-2 border-red-500/50 rounded-full text-red-500 flex items-center justify-center hover:bg-red-500/20 transition-colors"
          >
            <X size={32} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => { 
              e.stopPropagation()
              setExitDirection('right')
              setTimeout(() => onLike(), 300)
            }}
            className="w-16 h-16 bg-black/60 backdrop-blur-md border-2 border-green-500/50 rounded-full text-green-500 flex items-center justify-center hover:bg-green-500/20 transition-colors"
          >
            <Heart size={32} fill="currentColor" />
          </motion.button>
        </div>
      </div>

      {/* Drag hints */}
      <motion.div 
        className="absolute top-1/2 left-8 z-20 pointer-events-none"
        style={{ opacity: useTransform(x, [-200, -100], [1, 0]) }}
      >
        <div className="w-20 h-20 rounded-full border-4 border-red-500 flex items-center justify-center bg-red-500/20 backdrop-blur-sm">
          <X size={40} className="text-red-500" />
        </div>
      </motion.div>
      
      <motion.div 
        className="absolute top-1/2 right-8 z-20 pointer-events-none"
        style={{ opacity: useTransform(x, [100, 200], [0, 1]) }}
      >
        <div className="w-20 h-20 rounded-full border-4 border-green-500 flex items-center justify-center bg-green-500/20 backdrop-blur-sm">
          <Heart size={40} className="text-green-500" fill="currentColor" />
        </div>
      </motion.div>
    </motion.div>
  )
}
