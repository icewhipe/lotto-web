import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BookOpen, Calendar, TrendingUp, Award, Clock, Loader,
  User, Edit2, Target, Zap, Star, Bell, CheckCircle, ArrowRight,
  BarChart3, PieChart, Activity, Users
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useGrades } from '../../hooks/useGrades'
import { useSchedule } from '../../hooks/useSchedule'
import { Line, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface StudentDashboardProps {
  onTabChange?: (tab: string) => void
}

export default function StudentDashboard({ onTabChange }: StudentDashboardProps) {
  const { user } = useAuth()
  const { grades, loading: gradesLoading, average } = useGrades(user?.id)
  const { schedule, loading: scheduleLoading } = useSchedule(user?.groupId, new Date().getDay())
  const [showProfileEdit, setShowProfileEdit] = useState(false)

  // Статистика
  const totalGrades = grades.length
  const fives = grades.filter(g => g.value === 5).length
  const fours = grades.filter(g => g.value === 4).length
  const threes = grades.filter(g => g.value === 3).length
  const avgGrade = average || 0

  // Последние оценки (топ 5)
  const recentGrades = grades.slice(0, 5)
  
  // Расписание на сегодня (первые 4)
  const todayLessons = schedule.slice(0, 4)

  // Данные для графика прогресса (последние 7 оценок)
  const recentGradesForChart = grades.slice(0, 7).reverse()
  const progressData = {
    labels: recentGradesForChart.map((_g, i) => `${i + 1}`),
    datasets: [
      {
        label: 'Оценки',
        data: recentGradesForChart.map(g => g.value),
        borderColor: 'rgb(139, 92, 246)',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: 'rgb(139, 92, 246)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      }
    ]
  }

  // Данные для круговой диаграммы оценок
  const gradeDistribution = {
    labels: ['Отлично (5)', 'Хорошо (4)', 'Удовл. (3)'],
    datasets: [
      {
        data: [fives, fours, threes],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(251, 191, 36, 0.8)',
        ],
        borderColor: [
          'rgb(34, 197, 94)',
          'rgb(59, 130, 246)',
          'rgb(251, 191, 36)',
        ],
        borderWidth: 2,
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        borderRadius: 8,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        ticks: {
          stepSize: 1
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 15,
          font: {
            size: 12,
            weight: 600 as any
          }
        }
      }
    },
    cutout: '70%'
  }

  return (
    <div className="space-y-6">
      {/* Приветственный баннер с профилем */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-pink-500 rounded-3xl p-8 text-white shadow-2xl"
      >
        {/* Декоративные элементы */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-400/20 rounded-full blur-2xl" />
        
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Аватар с возможностью редактирования */}
            <div className="relative group">
              <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-5xl shadow-lg ring-4 ring-white/30">
                {user?.avatar || '👨‍🎓'}
              </div>
              <button
                onClick={() => setShowProfileEdit(true)}
                className="absolute -bottom-2 -right-2 p-2 bg-white text-violet-600 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
            
            <div>
              <h1 className="text-4xl font-black mb-2 flex items-center gap-3">
                Привет, {user?.name?.split(' ')[0] || 'Студент'}! 
                <span className="animate-wave inline-block">👋</span>
              </h1>
              <div className="flex items-center gap-4 text-white/90">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {user?.groupId && `Группа ${user.groupId}`}
                </span>
                <span className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Средний балл: {avgGrade.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Быстрые действия */}
          <div className="flex gap-3">
            <button className="p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl transition-all">
              <Bell className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setShowProfileEdit(true)}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl transition-all flex items-center gap-2"
            >
              <Edit2 className="w-4 h-4" />
              <span className="font-semibold">Профиль</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Основная сетка - 3 колонки */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* ЛЕВАЯ КОЛОНКА - Статистика */}
        <div className="space-y-6">
          {/* Статистика карточки */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-effect rounded-2xl p-6"
          >
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-violet-600" />
              Статистика
            </h3>
            
            <div className="space-y-3">
              <div className="stat-card bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">Средний балл</span>
                </div>
                <span className="text-3xl font-black text-green-600">{avgGrade.toFixed(2)}</span>
              </div>

              <div className="stat-card bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">Всего оценок</span>
                </div>
                <span className="text-3xl font-black text-blue-600">{totalGrades}</span>
              </div>

              <div className="stat-card bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">Отличных</span>
                </div>
                <span className="text-3xl font-black text-purple-600">{fives}</span>
              </div>

              <div className="stat-card bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 shadow-lg">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">Посещаемость</span>
                </div>
                <span className="text-3xl font-black text-orange-600">95%</span>
              </div>
            </div>
          </motion.div>

          {/* Распределение оценок */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-effect rounded-2xl p-6"
          >
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-violet-600" />
              Распределение оценок
            </h3>
            <div className="h-64">
              {totalGrades > 0 ? (
                <Doughnut data={gradeDistribution} options={doughnutOptions} />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  Нет данных
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* ЦЕНТРАЛЬНАЯ КОЛОНКА - График и расписание */}
        <div className="space-y-6">
          {/* График прогресса */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-effect rounded-2xl p-6"
          >
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-violet-600" />
              Динамика оценок
            </h3>
            <div className="h-64">
              {recentGradesForChart.length > 0 ? (
                <Line data={progressData} options={chartOptions} />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  Недостаточно данных для графика
                </div>
              )}
            </div>
          </motion.div>

          {/* Расписание на сегодня */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-effect rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Clock className="w-5 h-5 text-violet-600" />
                Расписание на сегодня
              </h3>
              <button className="text-sm text-violet-600 hover:text-violet-700 font-semibold flex items-center gap-1">
                Смотреть всё <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            {scheduleLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader className="w-8 h-8 animate-spin text-violet-600" />
              </div>
            ) : todayLessons.length > 0 ? (
              <div className="space-y-2">
                {todayLessons.map((lesson, index) => (
                  <div
                    key={lesson.id || index}
                    className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 hover:shadow-md transition-shadow"
                  >
                    <div className="text-xs font-mono font-bold text-violet-600 min-w-[80px]">
                      {lesson.startTime}
                    </div>
                    <div className="h-8 w-px bg-violet-200 dark:bg-violet-700" />
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{lesson.subject.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {lesson.teacher.user.name} • Каб. {lesson.room}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                      lesson.type === 'LECTURE' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30' :
                      lesson.type === 'PRACTICE' ? 'bg-green-100 text-green-700 dark:bg-green-900/30' :
                      'bg-purple-100 text-purple-700 dark:bg-purple-900/30'
                    }`}>
                      {lesson.type === 'LECTURE' ? 'Лекция' : 
                       lesson.type === 'PRACTICE' ? 'Практика' : 'Лаб'}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>На сегодня занятий нет</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* ПРАВАЯ КОЛОНКА - Последние оценки и быстрые ссылки */}
        <div className="space-y-6">
          {/* Последние оценки */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-effect rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Star className="w-5 h-5 text-violet-600" />
                Последние оценки
              </h3>
              <button className="text-sm text-violet-600 hover:text-violet-700 font-semibold flex items-center gap-1">
                Все оценки <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            {gradesLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader className="w-8 h-8 animate-spin text-violet-600" />
              </div>
            ) : recentGrades.length > 0 ? (
              <div className="space-y-2">
                {recentGrades.map((grade, index) => (
                  <div
                    key={grade.id || index}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors group"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{grade.subject.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {new Date(grade.date).toLocaleDateString('ru-RU', { 
                          day: 'numeric', 
                          month: 'short' 
                        })}
                      </p>
                    </div>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-black shadow-md group-hover:scale-110 transition-transform ${
                      grade.value === 5 ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white' :
                      grade.value === 4 ? 'bg-gradient-to-br from-blue-400 to-cyan-500 text-white' :
                      grade.value === 3 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white' :
                      'bg-gradient-to-br from-red-400 to-rose-500 text-white'
                    }`}>
                      {grade.value}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <BookOpen className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Оценок пока нет</p>
              </div>
            )}
          </motion.div>

          {/* Быстрые ссылки */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-effect rounded-2xl p-6"
          >
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-violet-600" />
              Быстрые действия
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => onTabChange?.('grades')}
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white hover:shadow-lg hover:scale-105 transition-all"
              >
                <BookOpen className="w-6 h-6 mb-2" />
                <span className="text-sm font-semibold">Оценки</span>
              </button>
              
              <button 
                onClick={() => onTabChange?.('schedule')}
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 text-white hover:shadow-lg hover:scale-105 transition-all"
              >
                <Calendar className="w-6 h-6 mb-2" />
                <span className="text-sm font-semibold">Расписание</span>
              </button>
              
              <button 
                onClick={() => onTabChange?.('attendance')}
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white hover:shadow-lg hover:scale-105 transition-all"
              >
                <Users className="w-6 h-6 mb-2" />
                <span className="text-sm font-semibold">Посещаемость</span>
              </button>
              
              <button 
                onClick={() => onTabChange?.('progress')}
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 text-white hover:shadow-lg hover:scale-105 transition-all"
              >
                <Target className="w-6 h-6 mb-2" />
                <span className="text-sm font-semibold">Прогресс</span>
              </button>
            </div>
          </motion.div>

          {/* Статус подключения */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className={`rounded-2xl p-4 border-2 ${
              grades.length > 0 
                ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800'
                : 'bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <CheckCircle className={`w-5 h-5 ${grades.length > 0 ? 'text-green-600' : 'text-amber-600'}`} />
              <div className="flex-1">
                <p className="font-bold text-sm">
                  {grades.length > 0 ? '✅ Backend подключён' : '⚠️ Демо-режим'}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {grades.length > 0 
                    ? 'Данные загружены из базы PostgreSQL'
                    : 'Показываются тестовые данные'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Модальное окно редактирования профиля */}
      {showProfileEdit && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-900 rounded-3xl p-8 max-w-2xl w-full shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black">Редактировать профиль</h2>
              <button
                onClick={() => setShowProfileEdit(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-6xl mb-4">
                  {user?.avatar || '👨‍🎓'}
                </div>
                <button className="text-violet-600 hover:text-violet-700 font-semibold">
                  Изменить аватар
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Имя</label>
                  <input
                    type="text"
                    defaultValue={user?.name}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-violet-500 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue={user?.email}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-violet-500 outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">О себе</label>
                <textarea
                  rows={4}
                  placeholder="Расскажи о себе..."
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-violet-500 outline-none transition-colors resize-none"
                />
              </div>

              <div className="flex gap-3">
                <button className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                  Сохранить
                </button>
                <button
                  onClick={() => setShowProfileEdit(false)}
                  className="px-6 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  Отмена
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
