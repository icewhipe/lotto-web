import { motion } from 'framer-motion'
import { 
  Users, 
  FileText, 
  Image, 
  Calendar,
  TrendingUp,
  Settings,
  BarChart3,
  Activity,
  UserPlus,
  Eye,
  ThumbsUp
} from 'lucide-react'

const stats = [
  {
    title: 'Всего студентов',
    value: '1,284',
    change: '+12.5%',
    trend: 'up',
    icon: Users,
    color: 'from-violet-500 to-purple-600',
    bgColor: 'bg-violet-100 dark:bg-violet-900/20'
  },
  {
    title: 'Новостей',
    value: '156',
    change: '+8',
    trend: 'up',
    icon: FileText,
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20'
  },
  {
    title: 'Мероприятий',
    value: '24',
    change: '+3',
    trend: 'up',
    icon: Calendar,
    color: 'from-pink-500 to-rose-600',
    bgColor: 'bg-pink-100 dark:bg-pink-900/20'
  },
  {
    title: 'Посещений/день',
    value: '8,429',
    change: '+23.1%',
    trend: 'up',
    icon: Eye,
    color: 'from-emerald-500 to-green-600',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/20'
  }
]

const recentActivities = [
  {
    id: 1,
    user: 'Иванов И.И.',
    action: 'добавил новость',
    title: 'День открытых дверей',
    time: '5 минут назад',
    icon: FileText,
    color: 'text-blue-600 dark:text-blue-400'
  },
  {
    id: 2,
    user: 'Петрова А.С.',
    action: 'загрузила фото',
    title: '12 фотографий в галерею',
    time: '15 минут назад',
    icon: Image,
    color: 'text-pink-600 dark:text-pink-400'
  },
  {
    id: 3,
    user: 'Сидоров П.П.',
    action: 'создал событие',
    title: 'Спортивные соревнования',
    time: '1 час назад',
    icon: Calendar,
    color: 'text-purple-600 dark:text-purple-400'
  },
  {
    id: 4,
    user: 'Система',
    action: 'зарегистрирован новый пользователь',
    title: 'student@lptt.ru',
    time: '2 часа назад',
    icon: UserPlus,
    color: 'text-emerald-600 dark:text-emerald-400'
  }
]

const quickActions = [
  { 
    title: 'Добавить новость', 
    icon: FileText, 
    color: 'from-violet-500 to-purple-600',
    action: 'news'
  },
  { 
    title: 'Загрузить фото', 
    icon: Image, 
    color: 'from-blue-500 to-cyan-600',
    action: 'gallery'
  },
  { 
    title: 'Создать событие', 
    icon: Calendar, 
    color: 'from-pink-500 to-rose-600',
    action: 'event'
  },
  { 
    title: 'Управление пользователями', 
    icon: Users, 
    color: 'from-emerald-500 to-green-600',
    action: 'users'
  }
]

interface AdminDashboardProps {
  onActionClick: (action: string) => void
}

export default function AdminDashboard({ onActionClick }: AdminDashboardProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
            Админ панель
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Добро пожаловать! Управляйте контентом сайта
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
        >
          <Settings className="w-5 h-5" />
          Настройки
        </motion.button>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="glass-effect rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:border-violet-400/50 dark:hover:border-violet-600/50 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-2">
                  {stat.title}
                </p>
                <h3 className="text-3xl font-black bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  {stat.value}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="flex items-center gap-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    <TrendingUp className="w-4 h-4" />
                    {stat.change}
                  </span>
                  <span className="text-xs text-gray-500">за месяц</span>
                </div>
              </div>
              
              <div className={`p-3 rounded-2xl ${stat.bgColor} group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-6 h-6 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} 
                  style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text' }}
                />
              </div>
            </div>

            {/* Sparkline placeholder */}
            <div className="mt-4 h-1 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${stat.color}`}
                initial={{ width: 0 }}
                animate={{ width: '70%' }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-black mb-6">Быстрые действия</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <motion.button
              key={action.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onActionClick(action.action)}
              className="relative group overflow-hidden glass-effect rounded-2xl p-6 border-2 border-transparent hover:border-violet-400/50 dark:hover:border-violet-600/50 transition-all text-left"
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity`}
              />
              
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} p-3 mb-4 shadow-lg`}>
                <action.icon className="w-full h-full text-white" />
              </div>
              
              <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                {action.title}
              </h3>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Recent Activity & Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-effect rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black">Последняя активность</h2>
            <Activity className="w-6 h-6 text-violet-600 dark:text-violet-400" />
          </div>

          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-2xl hover:bg-violet-50 dark:hover:bg-violet-900/10 transition-colors cursor-pointer group"
              >
                <div className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 group-hover:scale-110 transition-transform">
                  <activity.icon className={`w-5 h-5 ${activity.color}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="font-semibold text-gray-900 dark:text-white">{activity.user}</span>
                    {' '}
                    <span className="text-gray-600 dark:text-gray-400">{activity.action}</span>
                  </p>
                  <p className="text-sm font-medium text-violet-600 dark:text-violet-400 truncate">
                    {activity.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <button className="w-full mt-4 py-2 text-sm font-semibold text-violet-600 dark:text-violet-400 hover:underline">
            Посмотреть всю активность →
          </button>
        </motion.div>

        {/* Analytics Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-effect rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black">Аналитика сайта</h2>
            <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>

          {/* Simple chart placeholder */}
          <div className="space-y-4">
            {[
              { label: 'Главная', visits: 3420, color: 'violet' },
              { label: 'Специальности', visits: 2140, color: 'blue' },
              { label: 'Поступление', visits: 1890, color: 'pink' },
              { label: 'Новости', visits: 1560, color: 'emerald' },
              { label: 'Контакты', visits: 980, color: 'orange' }
            ].map((page, index) => (
              <motion.div
                key={page.label}
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700 dark:text-gray-300">{page.label}</span>
                  <span className="font-bold text-gray-900 dark:text-white">{page.visits}</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r from-${page.color}-500 to-${page.color}-600 rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(page.visits / 3420) * 100}%` }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900/20 dark:to-purple-900/20 border border-violet-200 dark:border-violet-800">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white dark:bg-gray-800">
                <ThumbsUp className="w-5 h-5 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  Отличная динамика! 📈
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Посещаемость выросла на 23% за последний месяц
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
