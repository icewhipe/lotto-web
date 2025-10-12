import { motion } from 'framer-motion'
import { BookOpen, Calendar, TrendingUp, Award, Clock, AlertCircle, User, Mail, Phone, GraduationCap } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

const stats = [
  { label: 'Средний балл', value: '4.7', icon: TrendingUp, color: 'from-green-500 to-emerald-600' },
  { label: 'Посещаемость', value: '95%', icon: Calendar, color: 'from-blue-500 to-cyan-600' },
  { label: 'Пропусков', value: '3', icon: AlertCircle, color: 'from-orange-500 to-red-600' },
  { label: 'Достижения', value: '12', icon: Award, color: 'from-purple-500 to-pink-600' },
]

export default function StudentDashboard() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 rounded-3xl p-8 text-white shadow-2xl"
      >
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl shadow-lg">
            {user?.avatar || '👨‍🎓'}
          </div>
          <div>
            <h1 className="text-4xl font-black mb-2">Добро пожаловать, {user?.name?.split(' ')[0] || 'Студент'}! 👋</h1>
            <p className="text-white/90 text-lg">
              {user?.groupId && `Группа: ${user.groupId}`} • Статистика за текущий семестр
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-effect rounded-2xl p-6 hover:scale-105 transition-transform cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-3xl font-black mb-1">{stat.value}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Info Cards */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-effect rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <User className="w-6 h-6 text-violet-600 dark:text-violet-400" />
            <h2 className="text-xl font-bold">Профиль</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-violet-50 dark:bg-violet-900/20">
              <Mail className="w-5 h-5 text-violet-600 dark:text-violet-400" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                <p className="font-semibold text-sm">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20">
              <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Группа</p>
                <p className="font-semibold text-sm">{user?.groupId || 'Не назначена'}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Today's Schedule Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-effect rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-bold">Сегодня</h2>
          </div>
          
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Следующее занятие</div>
              <p className="font-bold">Математика</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">10:15 - 11:45 • Каб. 201</p>
            </div>
            <div className="text-center py-4 text-sm text-gray-500 dark:text-gray-400">
              💡 Полное расписание в разделе "Расписание"
            </div>
          </div>
        </motion.div>

        {/* Recent Grade */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-effect rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-green-600 dark:text-green-400" />
            <h2 className="text-xl font-bold">Последняя оценка</h2>
          </div>
          
          <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="font-bold">Информатика</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Контрольная работа</p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-3xl font-black shadow-lg">
                5
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">08.10.2025 • Петров А.С.</p>
          </div>
          
          <div className="text-center py-3 text-sm text-gray-500 dark:text-gray-400">
            💡 Все оценки в разделе "Оценки"
          </div>
        </motion.div>
      </div>

      {/* Development Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-2xl p-6 border-2 border-violet-200 dark:border-violet-800"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-violet-500 flex items-center justify-center flex-shrink-0">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">Интеграция с backend в процессе</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Сейчас отображаются демо-данные. Backend API готов на 90%! Скоро подключим реальные оценки, расписание и посещаемость из базы данных.
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-black bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
              90%
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">готово</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
