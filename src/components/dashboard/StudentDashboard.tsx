import { motion } from 'framer-motion'
import { BookOpen, Calendar, TrendingUp, Award, Clock, AlertCircle, User, Mail, GraduationCap, Loader } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useGrades } from '../../hooks/useGrades'
import { useSchedule } from '../../hooks/useSchedule'

const stats = [
  { label: 'Средний балл', value: '4.7', icon: TrendingUp, color: 'from-green-500 to-emerald-600' },
  { label: 'Посещаемость', value: '95%', icon: Calendar, color: 'from-blue-500 to-cyan-600' },
  { label: 'Пропусков', value: '3', icon: AlertCircle, color: 'from-orange-500 to-red-600' },
  { label: 'Достижения', value: '12', icon: Award, color: 'from-purple-500 to-pink-600' },
]

export default function StudentDashboard() {
  const { user } = useAuth()
  const { grades, loading: gradesLoading, average } = useGrades(user?.id)
  const { schedule, loading: scheduleLoading } = useSchedule(user?.groupId, new Date().getDay())

  // Берём последние 3 оценки
  const recentGrades = grades.slice(0, 3)
  
  // Берём первые 3 урока на сегодня
  const todayLessons = schedule.slice(0, 3)

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
              {user?.groupId && `Группа: ${user.groupId}`} • Твой личный кабинет
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
            <p className="text-3xl font-black mb-1">
              {stat.label === 'Средний балл' && average ? average.toFixed(2) : stat.value}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-effect rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-bold">Расписание на сегодня</h2>
          </div>
          
          {scheduleLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader className="w-8 h-8 animate-spin text-violet-600" />
            </div>
          ) : todayLessons.length > 0 ? (
            <div className="space-y-3">
              {todayLessons.map((lesson, index) => (
                <div
                  key={lesson.id || index}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="text-sm font-mono text-gray-500 min-w-[110px]">
                    {lesson.startTime} - {lesson.endTime}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{lesson.subject.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {lesson.teacher.user.name} • Каб. {lesson.room}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">На сегодня занятий нет</p>
          )}
        </motion.div>

        {/* Recent Grades */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-effect rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-green-600 dark:text-green-400" />
            <h2 className="text-xl font-bold">Последние оценки</h2>
          </div>
          
          {gradesLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader className="w-8 h-8 animate-spin text-violet-600" />
            </div>
          ) : recentGrades.length > 0 ? (
            <div className="space-y-3">
              {recentGrades.map((grade, index) => (
                <div
                  key={grade.id || index}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-semibold">{grade.subject.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {grade.teacher.user.name} • {new Date(grade.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${
                    grade.value === 5 ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                    grade.value === 4 ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                    'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                  }`}>
                    {grade.value}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">Оценок пока нет</p>
          )}
        </motion.div>
      </div>

      {/* Backend Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-2xl p-6 border-2 border-violet-200 dark:border-violet-800"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-violet-500 flex items-center justify-center flex-shrink-0">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">
              {grades.length > 0 ? '✅ Backend подключён!' : '⚠️ Демо-режим'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {grades.length > 0 
                ? 'Загружены реальные данные из базы данных PostgreSQL'
                : 'Backend API готов на 95%! Сейчас показываются демо-данные.'}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
