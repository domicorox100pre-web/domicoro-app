export const CONFIG = {
  API_URL: import.meta.env.VITE_API_URL || 'https://api.domicoro.com',
  SOCKET_URL: import.meta.env.VITE_SOCKET_URL || 'wss://api.domicoro.com',
  MAPBOX_TOKEN: import.meta.env.VITE_MAPBOX_TOKEN,
  CLOUDINARY_CLOUD: import.meta.env.VITE_CLOUDINARY_CLOUD,
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  DEBOUNCE_DELAY: 300,
  REFRESH_INTERVAL: 30000,
  GHOST_MODE_DURATION: 4 * 60 * 60 * 1000, // 4 horas
}

export const ENDPOINTS = {
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    refresh: '/api/auth/refresh',
    logout: '/api/auth/logout',
    me: '/api/auth/me',
  },
  users: {
    profile: '/api/users/profile',
    update: '/api/users/update',
    upload: '/api/users/upload',
    nearby: '/api/users/nearby',
    like: '/api/users/like',
    pass: '/api/users/pass',
    matches: '/api/users/matches',
  },
  coros: {
    list: '/api/coros',
    create: '/api/coros',
    join: '/api/coros/join',
    leave: '/api/coros/leave',
    nearby: '/api/coros/nearby',
    myCoros: '/api/coros/my',
  },
  chat: {
    conversations: '/api/chat/conversations',
    messages: '/api/chat/messages',
    send: '/api/chat/send',
    read: '/api/chat/read',
  },
  gifts: {
    list: '/api/gifts',
    send: '/api/gifts/send',
    balance: '/api/gifts/balance',
  },
  jartura: {
    nearby: '/api/jartura/nearby',
    search: '/api/jartura/search',
  },
  afterparty: {
    activate: '/api/afterparty/activate',
    deactivate: '/api/afterparty/deactivate',
    locations: '/api/afterparty/locations',
  },
  stories: {
    active: '/api/stories/active',
    create: '/api/stories',
    view: '/api/stories/view',
  }
}

export const GIFTS = [
  { id: 'cerveza', name: 'Cerveza', icon: '🍺', price: 50, animation: 'bounce' },
  { id: 'whisky', name: 'Whisky', icon: '🥃', price: 150, animation: 'shake' },
  { id: 'rosa', name: 'Rosa', icon: '🌹', price: 75, animation: 'float' },
  { id: 'corazon', name: 'Corazón', icon: '❤️', price: 100, animation: 'pulse' },
  { id: 'teddy', name: 'Teddy', icon: '🧸', price: 300, animation: 'wiggle' },
  { id: 'diamante', name: 'Diamante', icon: '💎', price: 5000, animation: 'sparkle' },
  { id: 'corona', name: 'Corona', icon: '👑', price: 1000, animation: 'glow' },
  { id: 'fuego', name: 'Fuego', icon: '🔥', price: 200, animation: 'burn' },
]

export const CORO_TYPES = [
  { id: 'teteo', icon: 'Flame', label: 'Teteo', color: 'text-red-500', bg: 'bg-red-500/20', desc: 'Rumba y pachata' },
  { id: 'beber', icon: 'Beer', label: 'Beber', color: 'text-yellow-500', bg: 'bg-yellow-500/20', desc: 'Tomar algo' },
  { id: 'bailar', icon: 'Music', label: 'Bailar', color: 'text-purple-500', bg: 'bg-purple-500/20', desc: 'Bachata, merengue' },
  { id: 'playa', icon: 'MapPin', label: 'Playa', color: 'text-cyan-500', bg: 'bg-cyan-500/20', desc: 'Día de playa' },
  { id: 'comer', icon: 'Beer', label: 'Jartura', color: 'text-orange-500', bg: 'bg-orange-500/20', desc: 'Comida rápida' },
  { id: 'otro', icon: 'Plus', label: 'Otro', color: 'text-gray-400', bg: 'bg-gray-500/20', desc: 'Personalizado' },
]
