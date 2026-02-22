import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useAuthStore } from './hooks/useAuth'
import { useApi } from './hooks/useApi'
import { SplashScreen } from './components/SplashScreen'
import { AuthScreen } from './components/AuthScreen'
import { StoryCarousel } from './components/StoryCarousel'
import { UserCard } from './components/UserCard'
import { TabBar } from './components/TabBar'
import { Button, Card } from './components/ui'
import { MapPin, MessageCircle, RefreshCw } from 'lucide-react'
import toast from 'react-hot-toast'

// Modales (lazy loaded)
import { MapaRD } from './components/modals/MapaRD'
import { ModoFantasma } from './components/modals/ModoFantasma'
import { ChatInterface } from './components/modals/ChatInterface'
import { AfterParty } from './components/modals/AfterParty'
import { Jartura } from './components/modals/Jartura'
import { GiftSystem } from './components/modals/GiftSystem'
import { VIPSection } from './components/modals/VIPSection'
import { CrearCoro } from './components/modals/CrearCoro'
import { DomiTV } from './components/modals/DomiTV'
import { Perfil } from './components/modals/Perfil'

function App() {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('feed')
  const [modals, setModals] = useState({
    mapa: false,
    fantasma: false,
    chat: false,
    afterParty: false,
    jartura: false,
    gift: false,
    vip: false,
    crear: false,
    tv: false,
    perfil: false,
  })
  const [selectedUser, setSelectedUser] = useState(null)
  const [feedUsers, setFeedUsers] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  const { isAuthenticated, user } = useAuthStore()
  const api = useApi()

  // Cargar usuarios del feed
  const loadFeed = useCallback(async () => {
    try {
      const { data } = await api.get('/api/users/nearby')
      setFeedUsers(data)
    } catch (error) {
      toast.error('Error cargando usuarios')
    }
  }, [api])

  useEffect(() => {
    if (isAuthenticated) {
      loadFeed()
    }
  }, [isAuthenticated, loadFeed])

  const toggleModal = (name, state = null) => {
    setModals(prev => ({ ...prev, [name]: state !== null ? state : !prev[name] }))
  }

  const handleLike = async (userId) => {
    try {
      await api.post('/api/users/like', { userId })
      setFeedUsers(prev => prev.filter(u => u.id !== userId))
      toast.success('¡Like enviado!')
    } catch (error) {
      toast.error('Error al dar like')
    }
  }

  const handlePass = (userId) => {
    setFeedUsers(prev => prev.filter(u => u.id !== userId))
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await loadFeed()
    setRefreshing(false)
  }

  const openChat = (user) => {
    setSelectedUser(user)
    toggleModal('chat', true)
  }

  const openGift = (user) => {
    setSelectedUser(user)
    toggleModal('gift', true)
  }

  if (loading) {
    return <SplashScreen onFinish={() => setLoading(false)} />
  }

  if (!isAuthenticated) {
    return <AuthScreen />
  }

  return (
    <div className="bg-domi-dark min-h-screen text-white font-sans pb-24">
      <AnimatePresence>
        {modals.mapa && <MapaRD onClose={() => toggleModal('mapa', false)} />}
        {modals.fantasma && <ModoFantasma onClose={() => toggleModal('fantasma', false)} />}
        {modals.chat && selectedUser && (
          <ChatInterface 
            user={selectedUser} 
            onClose={() => toggleModal('chat', false)} 
          />
        )}
        {modals.afterParty && <AfterParty onClose={() => toggleModal('afterParty', false)} />}
        {modals.jartura && <Jartura onClose={() => toggleModal('jartura', false)} />}
        {modals.gift && selectedUser && (
          <GiftSystem 
            recipient={selectedUser} 
            onClose={() => toggleModal('gift', false)} 
          />
        )}
        {modals.vip && <VIPSection onClose={() => toggleModal('vip', false)} />}
        {modals.crear && <CrearCoro onClose={() => toggleModal('crear', false)} />}
        {modals.tv && <DomiTV onClose={() => toggleModal('tv', false)} />}
        {modals.perfil && <Perfil onClose={() => toggleModal('perfil', false)} />}
      </AnimatePresence>

      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-black/80 backdrop-blur-lg sticky top-0 z-40 border-b border-white/5">
        <h1 className="text-2xl font-black italic bg-gradient-to-r from-domi-red via-white to-domi-blue bg-clip-text text-transparent">
          DomiCoro
        </h1>
        <div className="flex gap-2">
          <button 
            onClick={() => toggleModal('mapa', true)} 
            className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          >
            <MapPin size={20} className="text-white" />
          </button>
          <button 
            onClick={() => openChat({ id: 'support', name: 'Soporte' })}
            className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors relative"
          >
            <MessageCircle size={20} className="text-white" />
            <span className="absolute top-0 right-0 w-3 h-3 bg-domi-red rounded-full border-2 border-black animate-pulse" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 space-y-6">
        <StoryCarousel 
          onStoryClick={(story) => openChat(story.user)}
          onMyStoryClick={() => toggleModal('perfil', true)}
        />

        {/* Feed */}
        <section>
          <div className="flex justify-between items-center mb-4 px-4">
            <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest">
              Descubrir
            </h3>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleRefresh}
                loading={refreshing}
              >
                <RefreshCw size={18} className={refreshing ? 'animate-spin' : ''} />
              </Button>
              <Button 
                variant="primary" 
                size="icon" 
                onClick={() => toggleModal('crear', true)}
              >
                <span className="text-lg">+</span>
              </Button>
            </div>
          </div>

          {feedUsers.length > 0 ? (
            <UserCard 
              user={feedUsers[0]}
              onLike={() => handleLike(feedUsers[0].id)}
              onPass={() => handlePass(feedUsers[0].id)}
              onGift={() => openGift(feedUsers[0])}
              onInfo={() => openChat(feedUsers[0])}
