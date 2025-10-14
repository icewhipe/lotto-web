import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, Plus, Search, Trash2, X, Eye, EyeOff,
  UserPlus, Shield, GraduationCap, BookOpen,
  Crown, Briefcase, Save
} from 'lucide-react'
import toast from 'react-hot-toast'

interface User {
  id: string
  email: string
  name: string
  role: string
  isActive: boolean
  createdAt?: string
}

const ROLES = [
  { value: 'STUDENT', label: 'Студент', icon: GraduationCap, color: 'violet' },
  { value: 'TEACHER', label: 'Преподаватель', icon: BookOpen, color: 'blue' },
  { value: 'PARENT', label: 'Родитель', icon: Users, color: 'pink' },
  { value: 'APPLICANT', label: 'Абитуриент', icon: UserPlus, color: 'green' },
  { value: 'ADMIN', label: 'Администратор', icon: Shield, color: 'red' },
  { value: 'DIRECTOR', label: 'Директор', icon: Crown, color: 'amber' },
  { value: 'ZAVUCH', label: 'Завуч', icon: Briefcase, color: 'emerald' },
]

export default function UsersManager() {
  const [users, setUsers] = useState<User[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    name: '',
    role: 'STUDENT'
  })

  // Загрузка пользователей из localStorage (временно)
  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = () => {
    // Пробуем загрузить из localStorage
    const savedUsers = localStorage.getItem('all_users')
    if (savedUsers) {
      try {
        setUsers(JSON.parse(savedUsers))
      } catch (e) {
        console.error('Error loading users:', e)
        setUsers(getDemoUsers())
      }
    } else {
      setUsers(getDemoUsers())
    }
  }

  const getDemoUsers = (): User[] => {
    return [
      {
        id: '1',
        email: 'admin@lptt.ru',
        name: 'Администратор',
        role: 'ADMIN',
        isActive: true,
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        email: 'student@lptt.ru',
        name: 'Иван Иванов',
        role: 'STUDENT',
        isActive: true,
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        email: 'teacher@lptt.ru',
        name: 'Мария Петровна',
        role: 'TEACHER',
        isActive: true,
        createdAt: new Date().toISOString()
      }
    ]
  }

  const handleCreateUser = () => {
    if (!newUser.email || !newUser.password || !newUser.name) {
      toast.error('Заполните все поля!')
      return
    }

    // Проверка email
    if (users.find(u => u.email === newUser.email)) {
      toast.error('Пользователь с таким email уже существует!')
      return
    }

    const user: User = {
      id: Date.now().toString(),
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      isActive: true,
      createdAt: new Date().toISOString()
    }

    const updatedUsers = [...users, user]
    setUsers(updatedUsers)
    
    // Сохраняем в localStorage
    localStorage.setItem('all_users', JSON.stringify(updatedUsers))
    
    // ВАЖНО! Если создаём пользователя, нужно сохранить его данные для входа
    // Сохраняем хеш пароля (в реальности это делает backend)
    const userCredentials = JSON.parse(localStorage.getItem('user_credentials') || '{}')
    userCredentials[newUser.email] = {
      password: newUser.password, // В реале тут был бы хеш
      user: user
    }
    localStorage.setItem('user_credentials', JSON.stringify(userCredentials))

    toast.success(`Пользователь ${newUser.name} создан!`)
    
    setIsCreateModalOpen(false)
    setNewUser({ email: '', password: '', name: '', role: 'STUDENT' })
  }

  const handleDeleteUser = (userId: string) => {
    const user = users.find(u => u.id === userId)
    if (!user) return

    if (user.role === 'ADMIN' && users.filter(u => u.role === 'ADMIN').length === 1) {
      toast.error('Нельзя удалить последнего администратора!')
      return
    }

    if (window.confirm(`Удалить пользователя ${user.name}?`)) {
      const updatedUsers = users.filter(u => u.id !== userId)
      setUsers(updatedUsers)
      localStorage.setItem('all_users', JSON.stringify(updatedUsers))
      
      // Удаляем credentials
      const credentials = JSON.parse(localStorage.getItem('user_credentials') || '{}')
      delete credentials[user.email]
      localStorage.setItem('user_credentials', JSON.stringify(credentials))
      
      toast.success('Пользователь удалён!')
    }
  }

  const toggleUserStatus = (userId: string) => {
    const updatedUsers = users.map(u => 
      u.id === userId ? { ...u, isActive: !u.isActive } : u
    )
    setUsers(updatedUsers)
    localStorage.setItem('all_users', JSON.stringify(updatedUsers))
    toast.success('Статус изменён!')
  }

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getRoleInfo = (role: string) => {
    return ROLES.find(r => r.value === role) || ROLES[0]
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-br from-red-500 via-rose-500 to-pink-500 rounded-3xl p-8 text-white shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-rose-400/20 rounded-full blur-2xl" />
        
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl shadow-lg ring-4 ring-white/30">
              👥
            </div>
            <div>
              <h1 className="text-4xl font-black mb-2">Управление пользователями</h1>
              <p className="text-white/90 text-lg">
                Всего пользователей: {users.length}
              </p>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCreateModalOpen(true)}
            className="px-6 py-3 bg-white text-red-600 rounded-xl font-bold transition-all flex items-center gap-2 shadow-xl hover:shadow-2xl"
          >
            <Plus className="w-5 h-5" />
            Создать пользователя
          </motion.button>
        </div>
      </motion.div>

      {/* Search */}
      <div className="glass-effect rounded-2xl p-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по имени, email или роли..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-red-500 outline-none transition-colors"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="glass-effect rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="text-left p-4 font-bold">Пользователь</th>
                <th className="text-left p-4 font-bold">Email</th>
                <th className="text-left p-4 font-bold">Роль</th>
                <th className="text-center p-4 font-bold">Статус</th>
                <th className="text-right p-4 font-bold">Действия</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => {
                const roleInfo = getRoleInfo(user.role)
                return (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-t border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${roleInfo.color}-500 to-${roleInfo.color}-600 flex items-center justify-center text-white shadow-lg`}>
                          <roleInfo.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-bold">{user.name}</p>
                          <p className="text-xs text-gray-500">ID: {user.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-mono text-sm">{user.email}</p>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-lg text-sm font-bold bg-${roleInfo.color}-100 dark:bg-${roleInfo.color}-900/30 text-${roleInfo.color}-700 dark:text-${roleInfo.color}-400`}>
                        {roleInfo.label}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className={`px-3 py-1 rounded-lg text-sm font-bold transition-colors ${
                          user.isActive
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
                        }`}
                      >
                        {user.isActive ? 'Активен' : 'Неактивен'}
                      </button>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 transition-colors"
                          title="Удалить"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="p-12 text-center">
            <Users className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 dark:text-gray-400 text-lg font-semibold">
              Пользователи не найдены
            </p>
          </div>
        )}
      </div>

      {/* Create User Modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setIsCreateModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl glass-effect rounded-3xl p-8 z-50 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-black">Создать пользователя</h2>
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-bold mb-2">Имя</label>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    placeholder="Иванов Иван Иванович"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-red-500 outline-none transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-bold mb-2">Email</label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    placeholder="user@lptt.ru"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-red-500 outline-none transition-colors"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-bold mb-2">Пароль</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={newUser.password}
                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-red-500 outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-bold mb-2">Роль</label>
                  <div className="grid grid-cols-2 gap-3">
                    {ROLES.map(role => (
                      <button
                        key={role.value}
                        onClick={() => setNewUser({ ...newUser, role: role.value })}
                        className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                          newUser.role === role.value
                            ? `border-${role.color}-500 bg-${role.color}-50 dark:bg-${role.color}-900/20`
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-${role.color}-500 to-${role.color}-600 flex items-center justify-center text-white`}>
                          <role.icon className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-sm">{role.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="flex-1 px-6 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  Отмена
                </button>
                <button
                  onClick={handleCreateUser}
                  className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Создать пользователя
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
