import { memo } from 'react'

export const Badge = memo(({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-white/10 text-white',
    red: 'bg-domi-red/20 text-domi-red border border-domi-red/30',
    green: 'bg-green-500/20 text-green-400 border border-green-500/30',
    yellow: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
    blue: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    vip: 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold',
    outline: 'border border-white/20 text-white',
  }

  return (
    <span className={`
      inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold
      ${variants[variant]} ${className}
    `}>
      {children}
    </span>
  )
})
