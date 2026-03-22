import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext()

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001' })

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('token') || '')
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'))

  useEffect(() => {
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`
      setIsAuthenticated(true)
    } else {
      delete api.defaults.headers.common.Authorization
      setIsAuthenticated(false)
    }
  }, [token])

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password })
      setUser(res.data.user)
      setToken(res.data.token)
      localStorage.setItem('token', res.data.token)
      return { success: true }
    } catch (err) {
      return { success: false, error: err.response?.data?.message || 'Login failed' }
    }
  }

  const register = async (name, email, password) => {
    try {
      const res = await api.post('/auth/register', { name, email, password })
      setUser(res.data.user)
      setToken(res.data.token)
      localStorage.setItem('token', res.data.token)
      return { success: true }
    } catch (err) {
      return { success: false, error: err.response?.data?.message || 'Registration failed' }
    }
  }

  const logout = () => {
    setUser(null)
    setToken('')
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
