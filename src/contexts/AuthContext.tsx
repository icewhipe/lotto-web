import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type UserRole = 'student' | 'teacher' | 'parent' | 'applicant' | 'admin'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  groupId?: string // для студентов
  studentId?: string // для родителей
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Иван Петров',
    email: 'student@lptt.ru',
    role: 'student',
    groupId: 'ПТ-21',
    avatar: '👨‍🎓'
  },
  {
    id: '2',
    name: 'Мария Смирнова',
    email: 'teacher@lptt.ru',
    role: 'teacher',
    avatar: '👩‍🏫'
  },
  {
    id: '3',
    name: 'Елена Петрова',
    email: 'parent@lptt.ru',
    role: 'parent',
    studentId: '1',
    avatar: '👨‍👩‍👦'
  },
  {
    id: '4',
    name: 'Алексей Новиков',
    email: 'applicant@lptt.ru',
    role: 'applicant',
    avatar: '🎓'
  },
  {
    id: '5',
    name: 'Администратор',
    email: 'admin@lptt.ru',
    role: 'admin',
    avatar: '⚙️'
  }
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check for saved user session
    const savedUser = localStorage.getItem('lptt_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const foundUser = mockUsers.find(u => u.email === email)
    if (foundUser && password === '123456') { // Mock password
      setUser(foundUser)
      localStorage.setItem('lptt_user', JSON.stringify(foundUser))
    } else {
      throw new Error('Неверный email или пароль')
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('lptt_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
