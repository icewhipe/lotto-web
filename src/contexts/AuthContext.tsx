import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authAPI } from '../services/api'

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
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Normalize backend role strings to frontend roles
function normalizeRole(rawRole: string | undefined | null): UserRole {
  if (!rawRole) return 'student'
  const normalized = rawRole
    .toString()
    .trim()
    .toLowerCase()
    .replace(/^role[_-]?/, '')

  switch (normalized) {
    case 'student':
    case 'студент':
    case 'ученик':
      return 'student'
    case 'teacher':
    case 'преподаватель':
      return 'teacher'
    case 'parent':
    case 'guardian':
    case 'родитель':
      return 'parent'
    case 'applicant':
    case 'абитуриент':
      return 'applicant'
    case 'admin':
    case 'administrator':
    case 'администратор':
      return 'admin'
    default:
      if (normalized.includes('student')) return 'student'
      if (normalized.includes('teacher')) return 'teacher'
      if (normalized.includes('parent') || normalized.includes('guardian')) return 'parent'
      if (normalized.includes('applicant')) return 'applicant'
      if (normalized.includes('admin')) return 'admin'
      return 'student'
  }
}

// REMOVED: Mock users - теперь используем реальный API
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
  const [loading, setLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          // Проверяем токен через API
          const response = await authAPI.getMe()
          if (response.success && response.data) {
            const apiUser = response.data.user
            const normalizedRole = normalizeRole(apiUser.role)
            setUser({ ...apiUser, role: normalizedRole })
          }
        } catch (error) {
          // Токен невалиден
          console.error('Auth check failed:', error)
          localStorage.removeItem('token')
          localStorage.removeItem('user')
        }
      }
      setLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      // Пытаемся реальный API call к backend
      const response = await authAPI.login(email, password)
      
      if (response.success && response.data) {
        const { token, user: userData } = response.data
        const normalizedRole = normalizeRole(userData.role)
        
        // Сохраняем токен и пользователя
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify({ ...userData, role: normalizedRole }))
        setUser({ ...userData, role: normalizedRole })
        
        return // Успешный вход
      } else {
        // Backend вернул success: false
        throw new Error(response.error || 'Ошибка входа')
      }
    } catch (error: any) {
      console.error('Login error:', error)
      
      // Если backend недоступен - используем mock данные
      if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
        console.warn('Backend недоступен, используем mock данные')
        
        // Mock login
        const foundUser = mockUsers.find(u => u.email === email)
        if (foundUser && password === '123456') {
          // Mock токен
          const mockToken = 'mock_jwt_token_' + Date.now()
          localStorage.setItem('token', mockToken)
          localStorage.setItem('user', JSON.stringify(foundUser))
          setUser(foundUser)
          return // Успешный mock вход
        } else {
          throw new Error('Неверный email или пароль')
        }
      }
      
      // Другая ошибка - пробрасываем наверх
      const errorMessage = error.response?.data?.error || 
                          error.message || 
                          'Неверный email или пароль'
      
      throw new Error(errorMessage)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, loading }}>
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
