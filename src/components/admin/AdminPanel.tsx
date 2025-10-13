import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard,
  FileText,
  Image,
  Calendar,
  Users,
  Settings,
  LogOut
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import AdminDashboard from './AdminDashboard'
import NewsManager from './NewsManager'
import GalleryManager from './GalleryManager'
import InviteCodesManager from './InviteCodesManager'

const menuItems = [
  { id: 'dashboard', name: 'Дэшборд', icon: LayoutDashboard },
  { id: 'news', name: 'Новости', icon: FileText },
  { id: 'gallery', name: 'Галерея', icon: Image },
  { id: 'events', name: 'События', icon: Calendar },
  { id: 'users', name: 'Пользователи', icon: Users },
  { id: 'settings', name: 'Настройки', icon: Settings },
]

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const { logout } = useAuth()

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard onActionClick={setActiveTab} />
      case 'news':
        return <NewsManager />
      case 'gallery':
        return <GalleryManager />
      case 'events':
        return (
          <div className="glass-effect rounded-2xl p-8 text-center">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-purple-600 dark:text-purple-400" />
            <h2 className="text-2xl font-black mb-2">События</h2>
            <p className="text-gray-600 dark:text-gray-400">В разработке</p>
          </div>
        )
      case 'users':
        return (
          <div className="glass-effect rounded-2xl p-8 text-center">
            <Users className="w-16 h-16 mx-auto mb-4 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-2xl font-black mb-2">Пользователи</h2>
            <p className="text-gray-600 dark:text-gray-400">В разработке</p>
          </div>
        )
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
          <h2 className="text-2xl font-black bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
            ADMIN
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Панель управления</p>
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
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg'
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
