import { motion } from 'framer-motion'
import { BookOpen, Calendar, TrendingUp, Award, Clock, AlertCircle } from 'lucide-react'
import InDevelopment from '../InDevelopment'

// Mock data
const recentGrades = [
  { subject: 'Математика', grade: 5, date: '2025-10-07', teacher: 'Иванова М.П.' },
  { subject: 'Информатика', grade: 4, date: '2025-10-06', teacher: 'Петров А.С.' },
  { subject: 'История', grade: 5, date: '2025-10-05', teacher: 'Смирнова Е.В.' },
]

const todaySchedule = [
  { time: '08:30 - 10:00', subject: 'Математика', room: '201', teacher: 'Иванова М.П.' },
  { time: '10:15 - 11:45', subject: 'Информатика', room: '305', teacher: 'Петров А.С.' },
  { time: '12:00 - 13:30', subject: 'История', room: '102', teacher: 'Смирнова Е.В.' },
  { time: '13:45 - 15:15', subject: 'Физика', room: '204', teacher: 'Козлов И.А.' },
]

const stats = [
  { label: 'Средний балл', value: '4.7', icon: TrendingUp, color: 'from-green-500 to-emerald-600' },
  { label: 'Посещаемость', value: '95%', icon: Calendar, color: 'from-blue-500 to-cyan-600' },
  { label: 'Пропусков', value: '3', icon: AlertCircle, color: 'from-orange-500 to-red-600' },
  { label: 'Достижения', value: '12', icon: Award, color: 'from-purple-500 to-pink-600' },
]

export default function StudentDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-black mb-2">Добро пожаловать! 👋</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Вот обзор вашей успеваемости на сегодня
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-effect rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-3xl font-black mb-1">{stat.value}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-effect rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            <h2 className="text-xl font-bold">Расписание на сегодня</h2>
          </div>
          
          <div className="space-y-3">
            {todaySchedule.map((lesson, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <div className="text-sm font-mono text-gray-500 min-w-[110px]">
                  {lesson.time}
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{lesson.subject}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lesson.teacher} • Каб. {lesson.room}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Grades */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-effect rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            <h2 className="text-xl font-bold">Последние оценки</h2>
          </div>
          
          <div className="space-y-3">
            {recentGrades.map((grade, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-semibold">{grade.subject}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {grade.teacher} • {grade.date}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${
                  grade.grade === 5 ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                  grade.grade === 4 ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                  'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                }`}>
                  {grade.grade}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
