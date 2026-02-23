import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { Avatar } from './ui'

const mockStories = [
  { id: 1, user: { name: 'Sofía', avatar: null, online: true }, viewed: false },
  { id: 2, user: { name: 'Juan', avatar: null, online: false }, viewed: true },
  { id: 3, user: { name: 'María', avatar: null, online: true }, viewed: false },
]

export const StoryCarousel = ({ onStoryClick, onMyStoryClick }) => (
  <section className="mb-6">
    <h3 className="text-xs font-black text-gray-500 mb-3 uppercase tracking-widest px-4">Estados del Coro</h3>
    <div className="flex space-x-4 overflow-x-auto px-4 pb-2 scrollbar-hide">
      <motion.div className="flex flex-col items-center flex-shrink-0 cursor-pointer" onClick={onMyStoryClick} whileHover={{ scale: 1.05 }}>
        <div className="w-16 h-16 rounded-full p-[2px] border-2 border-dashed border-gray-600 hover:border-domi-red transition-colors relative">
          <div className="w-full h-full rounded-full bg-domi-dark p-[2px]">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
              <Plus size={24} className="text-gray-400" />
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-domi-red rounded-full flex items-center justify-center border-2 border-domi-dark">
            <Plus size={12} className="text-white" />
          </div>
        </div>
        <span className="text-[10px] mt-1 text-gray-300 font-medium">Tu historia</span>
      </motion.div>

      {mockStories.map((story, i) => (
        <motion.div key={story.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="flex flex-col items-center flex-shrink-0 cursor-pointer" onClick={() => onStoryClick(story)}>
          <Avatar name={story.user.name} story={!story.viewed} online={story.user.online} size="md" />
          <span className="text-[10px] mt-1 text-gray-300 font-medium truncate max-w-[64px]">{story.user.name}</span>
        </motion.div>
      ))}
    </div>
  </section>
)