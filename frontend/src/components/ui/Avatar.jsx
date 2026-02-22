import { memo } from 'react'
import { User } from 'lucide-react'
import { getInitials } from '../../utils/helpers'

export const Avatar = memo(({ 
  src, 
  name, 
  size = 'md', 
  online = false, 
  story = false, 
  onClick,
  className = '',
}) => {
  const sizes = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-14 h-14 text-base',
    lg: 'w-20 h-20 text-xl',
    xl: 'w-28 h-28 text-3xl',
  }

  const initials = getInitials(name)

  return (
    <div 
      onClick={onClick} 
      className={`relative inline-block ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {story && (
        <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-pink-500 to-domi-red animate-pulse" />
      )}
      <div className={`
        relative rounded-full overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800
        flex items-center justify-center font-bold text-white
        ${sizes[size]} ${story ? 'border-2 border-domi-dark' : ''}
      `}>
        {src ? (
          <img 
            src={src} 
            alt={name} 
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
        ) : null}
        <div className={`w-full h-full flex items-center justify-center ${src ? 'hidden' : ''}`}>
          {initials || <User size={size === 'sm' ? 16 : size === 'md' ? 20 : 24} />}
        </div>
      </div>
      {online && (
        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-domi-dark" />
      )}
    </div>
  )
})
