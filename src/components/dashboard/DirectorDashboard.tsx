import { motion } from 'framer-motion'
import { 
  Users, 
  TrendingUp,
  DollarSign,
  Award,
  BarChart3,
  PieChart,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock
} from 'lucide-react'

const overallStats = [
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
    title: 'Преподавателей',
    value: '87',
    change: '+3',
    trend: 'up',
    icon: Users,
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20'
  },
  {
    title: 'Ср. посещаемость',
    value: '92%',
    change: '+5.2%',
    trend: 'up',
    icon: TrendingUp,
    color: 'from-emerald-500 to-green-600',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/20'
  },
  {
    title: 'Ср. успеваемость',
    value: '4.3',
    change: '+0.2',
    trend: 'up',
    icon: Award,
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-100 dark:bg-amber-900/20'
  }
]

const facultyStats = [
  { name: 'Информационные технологии', students: 420, avgGrade: 4.5, attendance: 94 },
  { name: 'Транспорт', students: 380, avgGrade: 4.2, attendance: 91 },
  { name: 'Промышленность', students: 320, avgGrade: 4.3, attendance: 93 },
  { name: 'Строительство', students: 164, avgGrade: 4.1, attendance: 89 }
]

const alerts = [
  {
    id: 1,
    type: 'warning',
    title: 'Низкая посещаемость',
    description: 'Группа АТ-22: посещаемость 78%',
    time: '10 минут назад',
    icon: AlertTriangle,
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-50 dark:bg-amber-900/10'
  },
  {
    id: 2,
    type: 'success',
    title: 'Отличные результаты',
    description: 'Группа ИС-21: средний балл 4.8',
    time: '1 час назад',
    icon: CheckCircle2,
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-50 dark:bg-emerald-900/10'
  },
  {
    id: 3,
    type: 'info',
    title: 'Новый преподаватель',
    description: 'Назначен преподаватель по программированию',
    time: '2 часа назад',
    icon: Users,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-900/10'
  }
]

const recentReports = [
  { title: 'Отчет по успеваемости за сентябрь', date: '2024-10-01', status: 'completed' },
  { title: 'Анализ посещаемости', date: '2024-09-28', status: 'completed' },
  { title: 'Финансовый отчет Q3', date: '2024-09-25', status: 'pending' }
]

export default function DirectorDashboard() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-black bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
          Панель директора
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Общая статистика и аналитика техникума
        </p>
      </motion.div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overallStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="glass-effect rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50 cursor-pointer"
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
              
              <div className={`p-3 rounded-2xl ${stat.bgColor}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Faculty Stats & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Faculty Stats */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-effect rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black">Статистика по факультетам</h2>
            <PieChart className="w-6 h-6 text-violet-600 dark:text-violet-400" />
          </div>

          <div className="space-y-4">
            {facultyStats.map((faculty, index) => (
              <motion.div
                key={faculty.name}
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    {faculty.name}
                  </h3>
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                    {faculty.students} студентов
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/10 dark:to-green-900/10 border border-emerald-200 dark:border-emerald-800">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Ср. балл</p>
                    <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                      {faculty.avgGrade}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 border border-blue-200 dark:border-blue-800">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Посещаемость</p>
                    <p className="text-2xl font-black text-blue-600 dark:text-blue-400">
                      {faculty.attendance}%
                    </p>
                  </div>
                </div>

                {index < facultyStats.length - 1 && (
                  <div className="h-px bg-gray-200 dark:bg-gray-700" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Alerts */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-effect rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black">Уведомления</h2>
            <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>

          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-2xl border-2 ${alert.bgColor} cursor-pointer hover:shadow-md transition-shadow`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white dark:bg-gray-800">
                    <alert.icon className={`w-5 h-5 ${alert.color}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                      {alert.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {alert.description}
                    </p>
                    <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      {alert.time}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <button className="w-full mt-4 py-3 text-sm font-bold text-violet-600 dark:text-violet-400 hover:bg-violet-100 dark:hover:bg-violet-900/20 rounded-xl transition-colors">
            Посмотреть все уведомления →
          </button>
        </motion.div>
      </div>

      {/* Recent Reports & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Reports */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black">Последние отчёты</h2>
            <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>

          <div className="space-y-3">
            {recentReports.map((report, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-2xl hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-colors cursor-pointer"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {report.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {new Date(report.date).toLocaleDateString('ru-RU')}
                  </p>
                </div>
                
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  report.status === 'completed'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-yellow-500 text-white'
                }`}>
                  {report.status === 'completed' ? 'Готов' : 'В работе'}
                </span>
              </motion.div>
            ))}
          </div>

          <button className="w-full mt-4 py-3 text-sm font-bold text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/20 rounded-xl transition-colors">
            Все отчёты →
          </button>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50"
        >
          <h2 className="text-2xl font-black mb-6">Быстрые действия</h2>

          <div className="grid grid-cols-2 gap-3">
            {[
              { title: 'Создать отчёт', icon: BarChart3, color: 'from-violet-500 to-purple-600' },
              { title: 'Добавить объявление', icon: Activity, color: 'from-blue-500 to-cyan-600' },
              { title: 'Просмотр бюджета', icon: DollarSign, color: 'from-emerald-500 to-green-600' },
              { title: 'Управление', icon: Users, color: 'from-pink-500 to-rose-600' }
            ].map((action, index) => (
              <motion.button
                key={action.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 rounded-2xl glass-effect border-2 border-transparent hover:border-violet-400/50 dark:hover:border-violet-600/50 transition-all text-left group"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} p-2 mb-3 shadow-lg group-hover:shadow-xl transition-shadow`}>
                  <action.icon className="w-full h-full text-white" />
                </div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                  {action.title}
                </p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
