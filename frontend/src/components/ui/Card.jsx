import { memo } from 'react'

export const Card = memo(({ children, className = '', onClick, hover = true }) => (
  <div
    onClick={onClick}
    className={`bg-domi-card rounded-3xl border border-white/5 overflow-hidden p-4 ${hover ? 'hover:border-white/10 transition-all duration-200' : ''} ${onClick ? 'cursor-pointer active:scale-[0.98]' : ''} ${className}`}
  >
    {children}
  </div>
))