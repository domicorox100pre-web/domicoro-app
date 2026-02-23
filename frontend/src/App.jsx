import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useAuthStore } from './hooks/useAuth'
import { useApi } from './hooks/useApi'
import { SplashScreen } from './components/SplashScreen'
import { AuthScreen } from './components/AuthScreen'
import { StoryCarousel } from './components/StoryCarousel'
import { UserCard } from './components/UserCard'
import { TabBar } from './components/TabBar'
import { MapPin, MessageCircle } from 'lucide-react'
import toast from 'react-hot-toast'

// Modales simples (inline por ahora)
const SimpleModal = ({ title, onClose, children }) => (
  <div className="fixed inset-0 bg-domi-dark z-50 flex flex-col">
    <div className="flex items-center gap-4 p-4 border-b border-white/10">
      <button onClick={onClose} className="p-2 bg-white/10 rounded-full">←</button>
      <h2 className="text-xl font-black text-white">{title}</h2>
    </div>
    <div className="flex-1 overflow-y-auto p-4">{children}</div>
  </div>
)

function App() {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('feed')
  const [modal, setModal] = useState(null)
  const [feedUsers, setFeedUsers] = useState([{ id: 1, name: 'Sofía', distance: 2 }, { id: 2, name: 'Juan', distance: 5 }])

  const { isAuthenticated } = useAuthStore()

  const handleLike = () => {
    setFeedUsers(prev => prev.slice(1))
    toast.success('¡Like enviado!')
  }

  const handlePass = () => {
    setFeedUsers(prev => prev.slice(1))
  }

  if (loading) return <SplashScreen onFinish={() => setLoading(false)} />
  if (!isAuthenticated) return <AuthScreen />

  return (
    <div className="bg-domi-dark min-h-screen text-white font-sans pb-24">
      <AnimatePresence>
        {modal === 'mapa' && <SimpleModal title="Mapa de Coros" onClose={() => setModal(null)}><p className="text-gray-400">Mapa interactivo aquí</p></SimpleModal>}
        {modal === 'chat' && <SimpleModal title="Chat" onClose={() => setModal(null)}><p className="text-gray-400">Mensajes aquí</p></SimpleModal>}
        {modal === 'fantasma' && <SimpleModal title="Modo Fantasma 👻" onClose={() => setModal(null)}><p className="text-green-400">Navegación anónima activada</p></SimpleModal>}
        {modal === 'jartura' && <SimpleModal title="Modo Jartura 🍗" onClose={() => setModal(null)}><p className="text-orange-400">Comida rápida cercana</p></SimpleModal>}
        {modal === 'vip' && <SimpleModal title="Zona VIP 👑" onClose={() => setModal(null)}><p className="text-yellow-400">Desbloquea todo el potencial</p></SimpleModal>}
      </AnimatePresence>

      <header className="flex justify-between items-center p-4 bg-black/80 backdrop-blur-lg sticky top-0 z-40 border-b border-white/5">
        <h1 className="text-2xl font-black italic bg-gradient-to-r from-domi-red via-white to-domi-blue bg-clip-text text-transparent">DomiCoro</h1>
        <div className="flex gap-2">
          <button onClick={() => setModal('mapa')} className="p-2 bg-white/10 rounded-full hover:bg-white/20"><MapPin size={20} className="text-white" /></button>
          <button onClick={() => setModal('chat')} className="p-2 bg-white/10 rounded-full hover:bg-white/20 relative"><MessageCircle size={20} className="text-white" /><span className="absolute top-0 right-0 w-3 h-3 bg-domi-red rounded-full border-2 border-black animate-pulse" /></button>
        </div>
      </header>

      <main className="p-4 space-y-6">
        <StoryCarousel onStoryClick={() => setModal('chat')} onMyStoryClick={() => setModal(null)} />
        
        <section>
          <div className="flex justify-between items-center mb-4 px-4">
            <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest">Descubrir</h3>
            <button onClick={() => setModal('crear')} className="w-8 h-8 bg-domi-red rounded-full flex items-center justify-center hover:bg-red-600 text-white font-bold">+</button>
          </div>
          {feedUsers.length > 0 ? (
            <UserCard user={feedUsers[0]} onLike={handleLike} onPass={handlePass} onGift={() => toast.success('Sistema de regalos')} />
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>No hay más coristas cerca</p>
              <button onClick={() => window.location.reload()} className="mt-4 text-domi-red">Recargar</button>
            </div>
          )}
        </section>

        <section className="grid grid-cols-2 gap-4 px-4">
          <button onClick={() => setModal('mapa')} className="bg-domi-red/10 border border-domi-red/30 p-5 rounded-3xl text-left hover:bg-domi-red/20">
            <div className="w-12 h-12 bg-domi-red/20 rounded-2xl flex items-center justify-center mb-3 text-2xl">📍</div>
            <p className="text-white font-bold text-lg">After Party</p>
            <p className="text-domi-red text-xs">Compartir ubicación</p>
          </button>
          <button onClick={() => setModal('jartura')} className="bg-orange-600/10 border border-orange-500/30 p-5 rounded-3xl text-left hover:bg-orange-600/20">
            <div className="w-12 h-12 bg-orange-600/20 rounded-2xl flex items-center justify-center mb-3 text-2xl">🍗</div>
            <p className="text-white font-bold text-lg">Modo Jartura</p>
            <p className="text-orange-400 text-xs">Comida cercana</p>
          </button>
        </section>
      </main>

      <TabBar activeTab={activeTab} onTabClick={(tab) => {
        if (['crear', 'tv', 'jartura', 'vip', 'fantasma', 'perfil'].includes(tab)) setModal(tab)
        else setActiveTab(tab)
      }} />
    </div>
  )
}

export default App