import { memo } from 'react'
import { Loader2 } from 'lucide-react'

export const Button = memo(({ 
  children, variant = 'primary', size = 'md', loading = false, 
  disabled = false, className = '', onClick, type = 'button', ...props 
}) => {
  const variants = {
    primary: 'bg-domi-red hover:bg-red-600 text-white shadow-lg shadow-red-500/25',
    secondary: 'bg-domi-card hover:bg-gray-800 text-white border border-white/10',
    ghost: 'hover:bg-white/10 text-white',
    success: 'bg-green-600 hover:bg-green-700 text-white',
    vip: 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-black',
  }
  const sizes = { sm: 'px-3 py-2 text-xs', md: 'px-4 py-3 text-sm', lg: 'px-6 py-4 text-base', icon: 'p-3' }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`relative inline-flex items-center justify-center rounded-2xl font-bold transition-all duration-200 disabled:opacity-50 active:scale-95 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading ? <><Loader2 size={16} className="animate-spin mr-2" />{size !== 'icon' && 'Cargando...'}</> : children}
    </button>
  )
})