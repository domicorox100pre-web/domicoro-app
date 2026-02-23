import { useMemo } from 'react'
import axios from 'axios'
import { useAuthStore } from './useAuth'
import { CONFIG } from '../utils/constants'
import toast from 'react-hot-toast'

export const useApi = () => {
  const { token, logout } = useAuthStore()

  return useMemo(() => {
    const instance = axios.create({
      baseURL: CONFIG.API_URL,
      headers: { 'Content-Type': 'application/json' },
      timeout: 10000,
    })

    instance.interceptors.request.use((config) => {
      if (token) config.headers.Authorization = `Bearer ${token}`
      return config
    })

    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          logout()
          toast.error('Sesión expirada')
          window.location.href = '/login'
        }
        if (error.response?.data?.message) toast.error(error.response.data.message)
        return Promise.reject(error)
      }
    )

    return instance
  }, [token, logout])
}