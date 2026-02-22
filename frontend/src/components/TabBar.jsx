import { memo } from 'react'
import { motion } from 'framer-motion'
import { Plus, Tv, Grid, Crown, Ghost, User } from 'lucide-react'

const tabs = [
  { id: 'crear', icon: Plus, label: 'Crear', color: 'hover:text-domi-blue' },
  { id: 'tv', icon: Tv, label: 'TV', color: 'hover:text-purple-400' },
  { id: 'feed', icon: Grid, label: 'Coro', color: 'text-domi-red', active: true },
  { id: 'jartura', icon: () => <span className="text-xl">🍗</span>, label: 'Jartura', color: 'text-orange-400 hover:text-orange-500' },
  { id: 'vip', icon: Crown, label: 'VIP', color: 'text-yellow-400 hover:text-yellow-500' },
  { id: 'fantasma', icon: Ghost, label: 'Fantasma', color: 'text-green-400 hover:text-green-500' },
  { id: 'perfil', icon: User, label: 'Yo', color: 'hover:text-blue-400' },
]

export const TabBar = memo(({ activeTab, onTabClick }) => (
  <nav className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-white/10 flex justify-around items-center pb-safe pt-2 z-40 px-1">
    {tabs.map((tab) => {
      const Icon = tab.icon
      const isActive = activeTab === tab.id
      
      return (
        <motion.button
          key={tab.id}
          onClick={() => onTabClick(tab.id)}
          className={`
            flex flex-col items-center gap-1 w-14 py-2 transition-colors relative
            ${isActive ? tab.color : `text-gray-600 ${tab.color}`}
          `}
          whileTap={{ scale: 0.9 }}
        >
          {isActive && (
            <motion.div
              layoutId="activeTab"
              className="absolute -top-1 w-8 h-1 bg-domi-red rounded-full"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
          <Icon size={22} strokeWidth={isActive ? 3 : 2} />
          <span className="text-[9px] font-black uppercase">{tab.label}</span>
        </motion.button>
      )
    })}
  </nav>
))
