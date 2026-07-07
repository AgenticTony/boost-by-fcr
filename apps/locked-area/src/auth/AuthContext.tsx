import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

// ── Types ───────────────────────────────────────────────

interface Member {
  id: string
  name: string
  email: string
  isVerified: boolean
  isApproved: boolean
}

interface AuthContextValue {
  user: Member | null
  isAuthenticated: boolean
  isAdmin: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

// ── Context ───────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null)

const HYGRAPH_ENDPOINT = import.meta.env.VITE_HYGRAPH_URL
const HYGRAPH_TOKEN = import.meta.env.VITE_HYGRAPH_TOKEN_LOCKED

// ── Provider ────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Member | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('fcr_user')
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch {
        localStorage.removeItem('fcr_user')
      }
    }
    setIsLoading(false)
  }, [])

  const hygraphFetch = async (query: string, variables?: Record<string, unknown>) => {
    const res = await fetch(HYGRAPH_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${HYGRAPH_TOKEN}`,
      },
      body: JSON.stringify({ query, variables }),
    })
    return res.json()
  }

  const hashPassword = (password: string): string => {
    let hash = 0
    const str = password + 'fcr-salt-2026'
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & 0xFFFFFFFF
    }
    const hex = (hash >>> 0).toString(16).padStart(16, '0')
    return hex.repeat(4)
  }

  // ── Login ───────────────────────────────────────────

const login = async (email: string, password: string) => {
  try {
    const hashedPassword = hashPassword(password)

    const { data, errors } = await hygraphFetch(
      `query GetMemberByEmail($email: String!) {
        members(where: { email: $email }) {
          id
          name
          email
          password
          isVerified
          isApproved
        }
      }`,
      { email }
    )

    if (errors) {
      console.error('GraphQL errors:', JSON.stringify(errors, null, 2))
      return { success: false, error: errors[0]?.message || 'Databasfel. Försök igen.' }
    }

    const members = data?.members
    if (!members || members.length === 0) {
      return { success: false, error: 'Felaktig e-post eller lösenord' }
    }

    const found = members[0]

    if (found.password !== hashedPassword) {
      return { success: false, error: 'Felaktig e-post eller lösenord' }
    }

    if (!found.isVerified) {
      return { success: false, error: 'Ditt konto är inte verifierat. Kontrollera din e-post.' }
    }

    if (!found.isApproved) {
      return { success: false, error: 'Ditt konto väntar på godkännande från administratören.' }
    }

    const memberData: Member = {
      id: found.id,
      name: found.name,
      email: found.email,
      isVerified: found.isVerified,
      isApproved: found.isApproved,
    }

    setUser(memberData)
    localStorage.setItem('fcr_user', JSON.stringify(memberData))
    return { success: true }
  } catch (err) {
    console.error('Login error:', err)
    return { success: false, error: 'Ett fel uppstod. Försök igen.' }
  }
}

  // ── Register ────────────────────────────────────────

  const register = async (name: string, email: string, password: string) => {
    try {
      const { data: existing } = await hygraphFetch(
        `query CheckEmail($email: String!) {
          members(where: { email: $email }) { id }
        }`,
        { email }
      )

      if (existing?.members?.length > 0) {
        return { success: false, error: 'E-postadressen är redan registrerad' }
      }

      const hashedPassword = hashPassword(password)
      
      const verificationToken = typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).substring(2) + Date.now().toString(36)

   const { data, errors } = await hygraphFetch(
  `mutation CreateMember($name: String!, $email: String!, $password: String!, $verificationToken: String!) {
    createMember(data: {
      name: $name
      email: $email
      password: $password
      verificationToken: $verificationToken
      isVerified: true 
      isApproved: false
      user: ADMIN
    }) {
      id
      email
    }
  }`,
  { name, email, password: hashedPassword, verificationToken }
)
     if (errors) {
       console.error('GraphQL errors:', JSON.stringify(errors, null, 2))
       alert('Error: ' + JSON.stringify(errors, null, 2))
       return { success: false, error: 'Kunde inte skapa konto. Försök igen.' }
}

      if (!data?.createMember) {
        return { success: false, error: 'Kunde inte skapa konto. Försök igen.' }
      }

      return { success: true }
    } catch (err) {
      console.error('Register error:', err)
      return { success: false, error: 'Ett fel uppstod. Försök igen.' }
    }
  }

  // ── Logout ──────────────────────────────────────────

  const logout = () => {
    setUser(null)
    localStorage.removeItem('fcr_user')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.email === 'moh17670s@gmail.com',
        // isAdmin: user?.role === 'admin',
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}