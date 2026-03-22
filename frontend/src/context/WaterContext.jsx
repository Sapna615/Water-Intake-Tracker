import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { useAuth } from './AuthContext.jsx'

const WaterContext = createContext()
const api = axios.create({ 
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001',
  withCredentials: true
})

export const WaterProvider = ({ children }) => {
  const { token, isAuthenticated } = useAuth()
  const [today, setToday] = useState({ date: '', total: 0, goal: 2000, remaining: 2000, logs: [] })
  const [history, setHistory] = useState([])
  const [stats, setStats] = useState({})
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // Set up axios interceptor to include token in requests
  useEffect(() => {
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`
    } else {
      delete api.defaults.headers.common.Authorization
    }
  }, [token])

  // Refresh data
  const refresh = useCallback(async () => {
    if (!isAuthenticated) return
    
    setIsLoading(true)
    setError(null)
    try {
      const [todayRes, historyRes, statsRes] = await Promise.all([
        api.get('/water/today'),
        api.get('/water/history'),
        api.get('/water/stats')
      ])
      
      setToday(todayRes.data)
      setHistory(historyRes.data.daily || [])
      setStats(statsRes.data || {})
    } catch (error) {
      console.error('Error refreshing data:', error)
    } finally {
      setIsLoading(false)
    }
  }, [isAuthenticated])

  // Add water intake
  const addIntake = async (amount) => {
    if (!isAuthenticated) {
      setError('Please log in to track water intake')
      return { success: false, error: 'Not authenticated' }
    }

    setIsLoading(true)
    setError(null)
    try {
      const response = await api.post('/water/add', { amount: Number(amount) })
      await refresh() // Refresh all data after adding intake
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Error adding water intake:', error)
      const message = error.response?.data?.message || 'Failed to add water intake'
      setError(message)
      return { 
        success: false, 
        error: message
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Reset today's intake
  const resetToday = async () => {
    if (!isAuthenticated) return

    setIsLoading(true)
    try {
      await api.post('/water/reset')
      await refresh()
    } catch (error) {
      console.error('Error resetting today\'s intake:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Initial data load
  useEffect(() => {
    if (isAuthenticated) {
      refresh()
    }
  }, [isAuthenticated, refresh])

  return (
    <WaterContext.Provider 
      value={{ 
        today, 
        history, 
        stats, 
        error,
        isLoading,
        addIntake, 
        refresh, 
        resetToday 
      }}
    >
      {children}
    </WaterContext.Provider>
  )
}

export const useWater = () => {
  const context = useContext(WaterContext)
  if (context === undefined) {
    throw new Error('useWater must be used within a WaterProvider')
  }
  return context
}
