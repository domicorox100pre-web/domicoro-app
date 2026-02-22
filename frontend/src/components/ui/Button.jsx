import { memo } from 'react'
import { Loader2 } from 'lucide-react'

export const Button = memo(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  disabled = false, 
  className = '', 
  onClick,
  type = 'button',
  ...props 
}) => {
  const variants = {
    primary: 'bg-domi-red hover:bg-red-600 text-white shadow-lg shadow-red-500/25',
    secondary: 'bg-domi-card hover:bg-gray-800 text-white border border-white/10',
    ghost: 'hover:bg-white/10 text-white',
    success: 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/25',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    vip: 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-black shadow-lg shadow-yellow-500/25',
    outline: 'border-2 border-white/20 hover:border-white/40 text-white hover:bg-white/5',
  }

  const sizes = {
    sm: 'px-3 py-2 text-xs',
    md: 'px-4 py-3 text-sm',
    lg: 'px-6 py-4 text-base',
    xl: 'px-8 py-5 text-lg',
    icon: 'p-3',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        relative inline-flex items-center justify-center rounded-2xl font-bold 
        transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
        active:scale-95 hover:scale-[1.02] disabled:hover:scale-100
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 size={size === 'sm' ? 14 : size === 'icon' ? 18 : 16} className="animate-spin mr-2" />
          {size !== 'icon' && 'Cargando...'}
        </>
      ) : children}
    </button>
  )
})
