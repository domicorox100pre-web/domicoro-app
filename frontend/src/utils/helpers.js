import { format, formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'

export const debounce = (fn, delay) => {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

export const throttle = (fn, limit) => {
  let inThrottle
  return (...args) => {
    if (!inThrottle) {
      fn(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

export const formatDate = (date) => {
  return format(new Date(date), 'dd/MM/yyyy', { locale: es })
}

export const formatRelative = (date) => {
  return formatDistanceToNow(new Date(date), { locale: es, addSuffix: true })
}

export const formatTime = (ms) => {
  const hours = Math.floor(ms / 3600000)
  const minutes = Math.floor((ms % 3600000) / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  return `${hours}h ${minutes}m ${seconds}s`
}

export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371 // Radio de la tierra en km
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return Math.round(R * c * 10) / 10
}

export const getInitials = (name) => {
  return name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
}

export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export const validatePhone = (phone) => {
  return /^\+?[\d\s-]{10,}$/.test(phone)
}
