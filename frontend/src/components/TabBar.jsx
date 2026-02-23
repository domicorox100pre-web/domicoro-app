import { memo } from 'react'
import { motion } from 'framer-motion'
import { Plus, Tv, Grid, Crown, Ghost, User } from 'lucide-react'

const tabs = [
  { id: 'crear', icon: Plus, label: 'Crear' },
  { id: 'tv', icon: Tv, label: 'TV' },
  { id: 'feed', icon: Grid, label: 'Coro', active: true },
  { id: 'jartura', icon: () => <span className="text-xl">🍗</span>, label: 'Jartura' },
  { id: 'vip', icon: Crown, label: 'VIP' },
  { id: 'fantasma', icon: Ghost, label: 'Fantasma' },
  { id: 'perfil', icon: User, label: 'Yo' },
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
          className={`flex flex-col items-center gap-1 w-14 py-2 transition-colors ${isActive ? 'text-domi-red' : 'text-gray-600 hover:text-white'}`}
          whileTap={{ scale: 0.9 }}
        >
          {isActive && <motion.div layoutId="activeTab" className="absolute -top-1 w-8 h-1 bg-domi-red rounded-full" />}
          <Icon size={22} strokeWidth={isActive ? 3 : 2} />
          <span className="text-[9px] font-black uppercase">{tab.label}</span>
        </motion.button>
      )
    })}
  </nav>
))