import { useState, useEffect, useCallback } from 'react'

export const useGeolocation = (options = {}) => {
  const [location, setLocation] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [permission, setPermission] = useState('prompt')

  const requestPermission = useCallback(async () => {
    if (!navigator.permissions) return true
    
    try {
      const result = await navigator.permissions.query({ name: 'geolocation' })
      setPermission(result.state)
      
      result.onchange = () => setPermission(result.state)
      
      return result.state === 'granted'
    } catch {
      return true
    }
  }, [])

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocalización no soportada en este dispositivo')
      setLoading(false)
      return
    }

    requestPermission()

    const watcher = navigator.geolocation.watchPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          altitude: pos.coords.altitude,
          heading: pos.coords.heading,
          speed: pos.coords.speed,
          timestamp: pos.timestamp,
        })
        setLoading(false)
        setError(null)
      },
      (err) => {
        setError(err.message)
        setLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
        ...options,
      }
    )

    return () => navigator.geolocation.clearWatch(watcher)
  }, [options, requestPermission])

  return { location, error, loading, permission }
}
