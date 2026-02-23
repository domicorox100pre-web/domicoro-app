import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Play, Heart, MessageCircle, Share2, Tv } from 'lucide-react'
import { Button, Avatar } from '../ui'

const videos = [
  { id: 1, user: 'Sofía', title: 'Rumba en 75 Grados 🔥', likes: 1240, comments: 89 },
  { id: 2, user: 'Carlos', title: 'Noche de bachata 💃', likes: 892, comments: 45 },
  { id: 3, user: 'María', title: 'After party en la Zona', likes: 2341, comments: 156 },
]

export const DomiTV = ({ onClose }) => {
  const [activeVideo, setActiveVideo] = useState(0)
  const [liked, setLiked] = useState(false)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10 bg-gradient-to-b from-black/80 to-transparent">
        <h2 className="text-xl font-black text-white flex items-center gap-2">
          <Tv className="text-domi-red" /> DomiTV
        </h2>
        <button onClick={onClose} className="p-2 bg-white/20 backdrop-blur rounded-full"><X size={24} /></button>
      </div>

      <div className="flex-1 relative bg-domi-dark flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-500">Reproductor de video</p>
        </div>
        
        <div className="absolute right-4 bottom-24 space-y-4">
          <div className="flex flex-col items-center gap-1">
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setLiked(!liked)} className="w-12 h-12 bg-white/10 backdrop-blur rounded-full flex items-center justify-center">
              <Heart size={24} className={liked ? 'text-red-500 fill-red-500' : 'text-white'} />
            </motion.button>
            <span className="text-xs text-white">{videos[activeVideo].likes}</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <button className="w-12 h-12 bg-white/10 backdrop-blur rounded-full flex items-center justify-center">
              <MessageCircle size={24} className="text-white" />
            </button>
            <span className="text-xs text-white">{videos[activeVideo].comments}</span>
          </div>
          <button className="w-12 h-12 bg-white/10 backdrop-blur rounded-full flex items-center justify-center">
            <Share2 size={24} className="text-white" />
          </button>
        </div>

        <div className="absolute left-4 bottom-24">
          <div className="flex items-center gap-3 mb-2">
            <Avatar name={videos[activeVideo].user} size="sm" />
            <span className="font-bold text-white">@{videos[activeVideo].user}</span>
            <Button size="sm" variant="primary">Seguir</Button>
          </div>
          <p className="text-white text-sm max-w-[70%]">{videos[activeVideo].title}</p>
        </div>
      </div>

      <div className="h-20 bg-domi-card border-t border-white/10 flex overflow-x-auto">
        {videos.map((v, i) => (
          <button key={v.id} onClick={() => { setActiveVideo(i); setLiked(false) }} className={`flex-shrink-0 w-24 h-full border-r border-white/10 flex items-center justify-center ${i === activeVideo ? 'bg-domi-red/20' : ''}`}>
            <div className="text-center">
              <Play size={20} className="mx-auto mb-1 text-white" />
              <span className="text-[10px] text-gray-400">{v.user}</span>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  )
}