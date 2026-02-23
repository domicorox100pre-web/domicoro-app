export const debounce = (fn, delay) => {
  let timeoutId
  return (...args) => { clearTimeout(timeoutId); timeoutId = setTimeout(() => fn(...args), delay) }
}

export const getInitials = (name) => name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
export const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
export const formatTime = (ms) => {
  const hours = Math.floor(ms / 3600000)
  const minutes = Math.floor((ms % 3600000) / 60000)
  return `${hours}h ${minutes}m`
}