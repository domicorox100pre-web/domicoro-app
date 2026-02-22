import { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import { useAuthStore } from './useAuth'
import { CONFIG } from '../utils/constants'

export const useSocket = () => {
  const socketRef = useRef(null)
  const { token, isAuthenticated } = useAuthStore()
  const [connected, setConnected] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!isAuthenticated || !token) {
      setConnected(false)
      return
    }

    socketRef.current = io(CONFIG.SOCKET_URL, {
      auth: { token },
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    })

    socketRef.current.on('connect', () => {
      setConnected(true)
      setError(null)
    })

    socketRef.current.on('disconnect', (reason) => {
      setConnected(false)
      if (reason === 'io server disconnect') {
        // Desconectado por el servidor, no reconectar automáticamente
        socketRef.current?.connect()
      }
    })

    socketRef.current.on('connect_error', (err) => {
      setError(err.message)
      setConnected(false)
    })

    return () => {
      socketRef.current?.disconnect()
    }
  }, [token, isAuthenticated])

  return { socket: socketRef.current, connected, error }
}
