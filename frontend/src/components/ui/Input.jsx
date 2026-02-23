import { memo, forwardRef } from 'react'

export const Input = memo(forwardRef(({ label, error, icon: Icon, className = '', ...props }, ref) => (
  <div className={`space-y-1.5 ${className}`}>
    {label && <label className="text-gray-400 text-sm font-medium block">{label}</label>}
    <div className="relative">
      {Icon && <Icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />}
      <input
        ref={ref}
        className={`w-full bg-domi-card border rounded-2xl text-white placeholder-gray-600 transition-all focus:outline-none focus:ring-2 ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-4 ${error ? 'border-red-500 focus:ring-red-500/50' : 'border-white/10 hover:border-white/20 focus:border-domi-red focus:ring-domi-red/50'}`}
        {...props}
      />
    </div>
    {error && <p className="text-red-400 text-xs">{error}</p>}
  </div>
)))