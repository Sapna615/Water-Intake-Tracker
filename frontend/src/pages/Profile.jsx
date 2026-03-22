import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001' })

export default function Profile() {
  const { user, login, register, isAuthenticated, logout } = useAuth()
  const [isLoginView, setIsLoginView] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [dailyGoal, setDailyGoal] = useState(2000)
  const [weight, setWeight] = useState(70)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setName(user.name || '')
      setDailyGoal(user.dailyGoal || 2000)
      setWeight(user.weight || 70)
    }
  }, [user])

  const handleAuth = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    let result
    if (isLoginView) {
      result = await login(email, password)
    } else {
      result = await register(name, email, password)
    }
    
    setIsLoading(false)
    if (result.success) {
      toast.success(isLoginView ? 'Logged in successfully!' : 'Registered successfully!')
    } else {
      toast.error(result.error)
    }
  }

  const updateProfile = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const token = localStorage.getItem('token')
      const res = await api.put('/user/profile', { name, dailyGoal, weight }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      toast.success('Profile updated successfully!')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed')
    } finally {
      setIsLoading(false)
    }
  }

  const setRecommendedGoal = () => {
    const ml = Math.round((Number(weight) || 70) * 35)
    setDailyGoal(ml)
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-100 dark:border-gray-700">
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">
            {isLoginView ? 'Welcome Back' : 'Join Us'}
          </h2>
          
          <form onSubmit={handleAuth} className="space-y-4">
            {!isLoginView && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <input 
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" 
                  placeholder="John Doe" 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
              <input 
                type="email"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" 
                placeholder="john@example.com" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
              <input 
                type="password"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" 
                placeholder="••••••••" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required
              />
            </div>
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : (isLoginView ? 'Login' : 'Sign Up')}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <button 
              onClick={() => setIsLoginView(!isLoginView)}
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
            >
              {isLoginView ? "Don't have an account? Sign Up" : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile Settings</h1>
        <button 
          onClick={logout}
          className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-medium transition-colors"
        >
          Logout
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200 border-b pb-2">Personal Goals & Info</h2>
        <form onSubmit={updateProfile} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
              <input 
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" 
                value={name} 
                onChange={e => setName(e.target.value)} 
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Weight (kg)</label>
              <input 
                type="number"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" 
                value={weight} 
                onChange={e => setWeight(e.target.value)} 
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Daily Goal (ml)</label>
              <input 
                type="number"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" 
                value={dailyGoal} 
                onChange={e => setDailyGoal(e.target.value)} 
                required
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              type="button" 
              onClick={setRecommendedGoal}
              className="flex-1 px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg font-medium transition-colors"
            >
              Auto-calculate by weight
            </button>
            <button 
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
