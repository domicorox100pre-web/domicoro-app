export const CONFIG = {
  API_URL: import.meta.env.VITE_API_URL || 'https://api.domicoro.com',
  SOCKET_URL: import.meta.env.VITE_SOCKET_URL || 'wss://api.domicoro.com',
}

export const ENDPOINTS = {
  auth: { login: '/api/auth/login', register: '/api/auth/register', me: '/api/auth/me' },
  users: { nearby: '/api/users/nearby', like: '/api/users/like', profile: '/api/users/profile' },
  coros: { list: '/api/coros', create: '/api/coros', nearby: '/api/coros/nearby' },
  chat: { conversations: '/api/chat/conversations', messages: '/api/chat/messages' },
}

export const GIFTS = [
  { id: 'cerveza', name: 'Cerveza', icon: '🍺', price: 50 },
  { id: 'whisky', name: 'Whisky', icon: '🥃', price: 150 },
  { id: 'rosa', name: 'Rosa', icon: '🌹', price: 75 },
  { id: 'corazon', name: 'Corazón', icon: '❤️', price: 100 },
  { id: 'teddy', name: 'Teddy', icon: '🧸', price: 300 },
  { id: 'diamante', name: 'Diamante', icon: '💎', price: 5000 },
]

export const CORO_TYPES = [
  { id: 'teteo', label: 'Teteo', color: 'text-red-500', bg: 'bg-red-500/20' },
  { id: 'beber', label: 'Beber', color: 'text-yellow-500', bg: 'bg-yellow-500/20' },
  { id: 'bailar', label: 'Bailar', color: 'text-purple-500', bg: 'bg-purple-500/20' },
  { id: 'playa', label: 'Playa', color: 'text-cyan-500', bg: 'bg-cyan-500/20' },
]