import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import { Button, Input } from './ui'
import { useAuthStore } from '../hooks/useAuth'
import { useApi } from '../hooks/useApi'
import { validateEmail } from '../utils/helpers'
import toast from 'react-hot-toast'

export const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '', name: '' })
  const [errors, setErrors] = useState({})
  
  const setAuth = useAuthStore(state => state.setAuth)
  const api = useApi()

  const validate = () => {
    const newErrors = {}
    if (!formData.email || !validateEmail(formData.email)) newErrors.email = 'Email válido requerido'
    if (!formData.password || formData.password.length < 6) newErrors.password = 'Mínimo 6 caracteres'
    if (!isLogin && (!formData.name || formData.name.length < 3)) newErrors.name = 'Nombre requerido'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    
    setLoading(true)
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register'
      const { data } = await api.post(endpoint, formData)
      setAuth(data)
      toast.success(isLogin ? '¡Bienvenido!' : '¡Cuenta creada!')
    } catch (error) {
      console.error('Auth error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-domi-dark flex flex-col items-center justify-center p-6">
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-black italic mb-2"><span className="text-domi-red">DOMI</span><span className="text-domi-blue">CORO</span></h1>
          <p className="text-gray-400">Encuentra tu coro ideal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <Input label="Nombre completo" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} error={errors.name} />
          )}
          <Input label="Email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} error={errors.email} />
          <div className="relative">
            <Input label="Contraseña" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} error={errors.password} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-[38px] text-gray-500">
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <Button type="submit" loading={loading} className="w-full" size="lg">
            {isLogin ? 'INICIAR SESIÓN' : 'CREAR CUENTA'}
          </Button>
        </form>

        <p className="text-center text-gray-400 text-sm">
          {isLogin ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
          <button onClick={() => setIsLogin(!isLogin)} className="text-domi-red font-bold hover:underline">
            {isLogin ? 'Regístrate' : 'Inicia sesión'}
          </button>
        </p>
      </motion.div>
    </div>
  )
}