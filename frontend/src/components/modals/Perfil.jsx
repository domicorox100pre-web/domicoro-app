import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Settings, Edit3, MapPin, Heart, Star, LogOut, Camera, ChevronRight } from 'lucide-react'
import { Button, Avatar, Badge, Card } from '../ui'
import { useAuthStore } from '../../hooks/useAuth'

export const Perfil = ({ onClose }) => {
  const { user, logout } = useAuthStore()
  const [activeTab, setActiveTab] = useState('photos')

  const handleLogout = () => {
    logout()
    onClose()
  }

  const stats = [
    { label: 'Likes', value: '234', icon: Heart },
    { label: 'Matches', value: '18', icon: Star },
    { label: 'Coros', value: '7', icon: MapPin },
  ]

  return (
    <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-0 bg-domi-dark z-50 flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-domi-dark/95 backdrop-blur-lg z-10 p-4 border-b border-white/10">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-black text-white">Mi Perfil</h2>
          <div className="flex gap-2">
            <button className="p-2 bg-white/10 rounded-full"><Settings size={20} /></button>
            <button onClick={onClose} className="p-2 bg-white/10 rounded-full"><X size={20} /></button>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="p-6 text-center">
        <div className="relative inline-block mb-4">
          <Avatar name={user?.name} size="lg" online />
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-domi-red rounded-full flex items-center justify-center border-2 border-domi-dark">
            <Camera size={16} />
          </button>
        </div>
        <h3 className="text-2xl font-black text-white mb-1">{user?.name || 'Usuario'}</h3>
        <p className="text-gray-400 flex items-center justify-center gap-1 mb-4">
          <MapPin size={14} className="text-domi-red" /> Santo Domingo
        </p>
        
        <div className="flex justify-center gap-2 mb-6">
          <Badge variant="vip">VIP</Badge>
          <Badge variant="green">● En línea</Badge>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-6 mb-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon size={20} className="mx-auto mb-1 text-domi-red" />
              <p className="text-xl font-black text-white">{stat.value}</p>
              <p className="text-xs text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        <Button variant="secondary" className="w-full mb-6">
          <Edit3 size={18} className="mr-2" /> Editar Perfil
        </Button>
      </div>

      {/* Menu */}
      <div className="px-4 pb-24 space-y-2">
        <Card className="p-0 overflow-hidden">
          {[ 
            { label: 'Mis Fotos', icon: Camera, action: () => setActiveTab('photos') },
            { label: 'Configuración', icon: Settings, action: () => {} },
            { label: 'Ayuda y Soporte', icon: ChevronRight, action: () => {} },
          ].map((item, i) => (
            <button key={i} onClick={item.action} className="w-full flex items-center justify-between p-4 hover:bg-white/5 border-b border-white/5 last:border-0">
              <div className="flex items-center gap-3">
                <item.icon size={20} className="text-gray-400" />
                <span className="text-white font-medium">{item.label}</span>
              </div>
              <ChevronRight size={20} className="text-gray-600" />
            </button>
          ))}
        </Card>

        <Button variant="danger" className="w-full" onClick={handleLogout}>
          <LogOut size={18} className="mr-2" /> Cerrar Sesión
        </Button>
      </div>
    </motion.div>
  )
}