import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authAPI } from '../services/api'

export type UserRole = 'student' | 'teacher' | 'parent' | 'applicant' | 'admin' | 'director' | 'zavuch'

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
      const savedUser = localStorage.getItem('user')
      
      if (token && savedUser) {
        try {
          // Проверяем токен через API
          const response = await authAPI.getMe()
          if (response.success && response.data) {
            setUser(response.data.user)
          }
        } catch (error: any) {
          console.warn('Backend недоступен при проверке авторизации, используем сохранённые данные')
          
          // Если backend недоступен - используем данные из localStorage
          if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
            try {
              const parsedUser = JSON.parse(savedUser)
              setUser(parsedUser)
              console.log('Восстановлен пользователь из localStorage:', parsedUser.email)
            } catch (parseError) {
              // Данные повреждены - чистим
              console.error('Ошибка парсинга данных пользователя:', parseError)
              localStorage.removeItem('token')
              localStorage.removeItem('user')
            }
          } else {
            // Другая ошибка (401, 403 и т.д.) - токен невалиден
            console.error('Токен невалиден:', error)
            localStorage.removeItem('token')
            localStorage.removeItem('user')
          }
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
        
        // Сохраняем токен и пользователя
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(userData))
        setUser(userData)
        
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
