import { createContext, useContext, useEffect, useState, useMemo } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Initialize theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('dark')
    if (savedTheme !== null) {
      setDark(savedTheme === '1')
    } else {
      // Default to system preference if no saved theme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setDark(prefersDark)
    }
    setMounted(true)
  }, [])

  // Apply theme class to document element when theme changes
  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.toggle('dark', dark)
      localStorage.setItem('dark', dark ? '1' : '0')
    }
  }, [dark, mounted])

  const value = useMemo(() => ({
    dark,
    setDark: (value) => setDark(prev => typeof value === 'function' ? value(prev) : value),
    toggleTheme: () => setDark(prev => !prev)
  }), [dark])

  // Prevent flash of incorrect theme by only rendering children when mounted
  if (!mounted) {
    return null
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
