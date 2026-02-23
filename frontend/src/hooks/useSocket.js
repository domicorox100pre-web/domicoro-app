import { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import { useAuthStore } from './useAuth'
import { CONFIG } from '../utils/constants'

export const useSocket = () => {
  const socketRef = useRef(null)
  const { token, isAuthenticated } = useAuthStore()
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    if (!isAuthenticated || !token) return

    socketRef.current = io(CONFIG.SOCKET_URL, {
      auth: { token },
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
    })

    socketRef.current.on('connect', () => setConnected(true))
    socketRef.current.on('disconnect', () => setConnected(false))

    return () => socketRef.current?.disconnect()
  }, [token, isAuthenticated])

  return { socket: socketRef.current, connected }
}