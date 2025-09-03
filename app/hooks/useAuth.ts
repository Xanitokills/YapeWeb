import { useState, useEffect, createContext, useContext, ReactNode, createElement } from 'react'
import { User } from '../lib/types'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<void>
  logout: () => Promise<void>
  forgotPassword: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const login = async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error)
    }
    
    const data = await response.json()
    setUser(data.user)
  }

  const signup = async (email: string, password: string, firstName: string, lastName: string) => {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, firstName, lastName })
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error)
    }
  }

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    setUser(null)
  }

  const forgotPassword = async (email: string) => {
    const response = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error)
    }
  }

  useEffect(() => {
    // Verificar token al cargar
    const checkAuth = async () => {
      try {
        const token = document.cookie.split('token=')[1]?.split(';')[0]
        if (token) {
          const response = await fetch('/api/auth/verify-token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token })
          })
          
          if (response.ok) {
            const data = await response.json()
            setUser(data.user)
          }
        }
      } catch (error) {
        console.error('Error verificando autenticación:', error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  return createElement(
    AuthContext.Provider,
    { value: { user, loading, login, signup, logout, forgotPassword } },
    children
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }
  return context
}