import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

interface AuthContextValue {
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('boost_auth_token')
    if (stored && stored.length > 0) {
      setToken(stored)
    }
    setIsLoading(false)
  }, [])

  const login = (newToken: string) => {
    localStorage.setItem('boost_auth_token', newToken)
    setToken(newToken)
  }

  const logout = () => {
    localStorage.removeItem('boost_auth_token')
    setToken(null)
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider')
  }
  return context
}