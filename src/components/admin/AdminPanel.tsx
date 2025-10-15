import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard,
  FileText,
  Calendar,
  Users,
  Settings,
  LogOut
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import AdminDashboard from './AdminDashboard'
import StudentsManager from './StudentsManager'
import GroupsManager from './GroupsManager'
import InviteCodesManager from './InviteCodesManager'
import UsersManager from './UsersManager'

const menuItems = [
  { id: 'dashboard', name: 'Дэшборд', icon: LayoutDashboard },
  { id: 'students', name: 'Студенты', icon: Users },
  { id: 'groups', name: 'Группы', icon: FileText },
  { id: 'invite-codes', name: 'Инвайт-коды', icon: Calendar },
  { id: 'users', name: 'Все пользователи', icon: Users },
  { id: 'settings', name: 'Настройки', icon: Settings },
]

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const { logout } = useAuth()

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard onActionClick={setActiveTab} />
      case 'students':
        return <StudentsManager />
      case 'groups':
        return <GroupsManager />
      case 'invite-codes':
        return <InviteCodesManager />
      case 'users':
        return <UsersManager />
      case 'settings':
        return (
          <div className="glass-effect rounded-2xl p-8 text-center">
            <Settings className="w-16 h-16 mx-auto mb-4 text-gray-600 dark:text-gray-400" />
            <h2 className="text-2xl font-black mb-2">Настройки</h2>
            <p className="text-gray-600 dark:text-gray-400">В разработке</p>
          </div>
        )
      default:
        return <AdminDashboard onActionClick={setActiveTab} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 glass-effect border-r border-gray-200 dark:border-gray-800 p-6 z-40">
        <div className="mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-white shadow-xl">
            <Settings className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-center bg-gradient-to-r from-red-600 to-rose-600 dark:from-red-400 dark:to-rose-400 bg-clip-text text-transparent">
            ADMIN
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">Панель управления</p>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </motion.button>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              logout()
              window.location.href = '/'
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Выйти
          </motion.button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </main>
    </div>
  )
}
