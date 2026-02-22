import { useMemo } from 'react'
import axios from 'axios'
import { useAuthStore } from './useAuth'
import { CONFIG } from '../utils/constants'
import toast from 'react-hot-toast'

export const useApi = () => {
  const { token, refreshToken, logout, setAuth } = useAuthStore()

  const api = useMemo(() => {
    const instance = axios.create({
      baseURL: CONFIG.API_URL,
      headers: { 'Content-Type': 'application/json' },
      timeout: 10000,
    })

    instance.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true

          try {
            const { data } = await axios.post(`${CONFIG.API_URL}/api/auth/refresh`, {
              refreshToken,
            })
            
            setAuth({
              user: data.user,
              token: data.token,
              refreshToken: data.refreshToken,
            })
            
            originalRequest.headers.Authorization = `Bearer ${data.token}`
            return instance(originalRequest)
          } catch (refreshError) {
            logout()
            toast.error('Sesión expirada. Por favor inicia sesión nuevamente.')
            window.location.href = '/login'
            return Promise.reject(refreshError)
          }
        }

        if (error.response?.data?.message) {
          toast.error(error.response.data.message)
        }

        return Promise.reject(error)
      }
    )

    return instance
  }, [token, refreshToken, logout, setAuth])

  return api
}
