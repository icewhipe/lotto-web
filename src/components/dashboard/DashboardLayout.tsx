import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  Calendar, 
  BookOpen, 
  Users, 
  FileText, 
  Settings, 
  LogOut,
  Home,
  ArrowLeft,
  TrendingUp,
  MessageCircle
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

interface DashboardLayoutProps {
  children: ReactNode
  activeTab: string
  onTabChange: (tab: string) => void
}

const menuItems = {
  student: [
    { id: 'dashboard', name: 'Главная', icon: LayoutDashboard },
    { id: 'schedule', name: 'Расписание', icon: Calendar },
    { id: 'grades', name: 'Оценки', icon: BookOpen },
    { id: 'attendance', name: 'Посещаемость', icon: Users },
    { id: 'notes', name: 'Конспекты', icon: FileText },
    { id: 'progress', name: 'Прогресс', icon: TrendingUp },
    { id: 'chat', name: 'Чат', icon: MessageCircle },
    { id: 'documents', name: 'Документы', icon: FileText },
  ],
  teacher: [
    { id: 'dashboard', name: 'Главная', icon: LayoutDashboard },
    { id: 'schedule', name: 'Расписание', icon: Calendar },
    { id: 'journal', name: 'Журнал', icon: BookOpen },
    { id: 'groups', name: 'Группы', icon: Users },
    { id: 'reports', name: 'Отчеты', icon: FileText },
  ],
  parent: [
    { id: 'dashboard', name: 'Главная', icon: LayoutDashboard },
    { id: 'grades', name: 'Оценки ребенка', icon: BookOpen },
    { id: 'attendance', name: 'Посещаемость', icon: Users },
    { id: 'schedule', name: 'Расписание', icon: Calendar },
  ],
  applicant: [
    { id: 'dashboard', name: 'Главная', icon: LayoutDashboard },
    { id: 'application', name: 'Заявление', icon: FileText },
    { id: 'documents', name: 'Документы', icon: FileText },
    { id: 'status', name: 'Статус', icon: Settings },
  ],
  admin: [
    { id: 'dashboard', name: 'Главная', icon: LayoutDashboard },
    { id: 'users', name: 'Пользователи', icon: Users },
    { id: 'groups', name: 'Группы', icon: Users },
    { id: 'schedule', name: 'Расписание', icon: Calendar },
    { id: 'reports', name: 'Отчеты', icon: FileText },
    { id: 'settings', name: 'Настройки', icon: Settings },
  ],
}

export default function DashboardLayout({ children, activeTab, onTabChange }: DashboardLayoutProps) {
  const { user, logout } = useAuth()
  
  if (!user) return null

  const menu = menuItems[user.role] || menuItems.student

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Top Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-gray-200 dark:border-gray-800"
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => window.location.href = '/'}
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-semibold">На главную</span>
              </button>
              <div className="h-8 w-px bg-gray-300 dark:bg-gray-600" />
              <div className="flex items-center gap-3">
                <Home className="w-5 h-5" />
                <span className="text-xl font-black gradient-text">ЛПТТ</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-semibold">{user.name}</p>
                <p className="text-xs text-gray-500">
                  {user.role === 'student' && 'Студент'}
                  {user.role === 'teacher' && 'Преподаватель'}
                  {user.role === 'parent' && 'Родитель'}
                  {user.role === 'applicant' && 'Абитуриент'}
                  {user.role === 'admin' && 'Администратор'}
                </p>
              </div>
              
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white text-xl">
                {user.avatar || '👤'}
              </div>
              
              <button
                onClick={() => {
                  logout()
                  window.location.href = '/'
                }}
                className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors group"
                title="Выход"
              >
                <LogOut className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-400" />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <div className="flex pt-16">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className="fixed left-0 top-16 bottom-0 w-64 glass-effect border-r border-gray-200 dark:border-gray-800 p-6 overflow-y-auto"
        >
          <nav className="space-y-2">
            {menu.map((item) => (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-primary-500 to-purple-600 text-white shadow-lg'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
          </nav>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-8">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}
