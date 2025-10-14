import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users, BookOpen, Calendar, Clock, Award,
  FileText, Bell, Edit2, Target, BarChart3,
  CheckCircle, ArrowRight, Activity, MessageSquare
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

export default function TeacherDashboard() {
  const { user } = useAuth()
  const [showNotifications, setShowNotifications] = useState(false)

  // Mock данные для демо
  const stats = [
    { label: 'Мои группы', value: '4', icon: Users, color: 'from-blue-500 to-cyan-600', change: '+2' },
    { label: 'Студентов', value: '96', icon: Target, color: 'from-green-500 to-emerald-600', change: '+12' },
    { label: 'Занятий сегодня', value: '6', icon: Calendar, color: 'from-purple-500 to-pink-600', change: '' },
    { label: 'Оценок выставлено', value: '28', icon: Award, color: 'from-orange-500 to-red-600', change: '+8' },
  ]

  const todayClasses = [
    { time: '09:00', group: 'ИС-21', subject: 'Программирование', room: '305', type: 'Практика' },
    { time: '10:45', group: 'ИС-22', subject: 'Базы данных', room: '301', type: 'Лекция' },
    { time: '12:30', group: 'ПТ-31', subject: 'Программирование', room: '305', type: 'Практика' },
    { time: '14:15', group: 'ИС-21', subject: 'Математика', room: '205', type: 'Семинар' },
  ]

  const recentActivities = [
    { action: 'Выставлено 12 оценок', group: 'ИС-21', time: '2 часа назад', icon: Award, color: 'text-green-600' },
    { action: 'Добавлено домашнее задание', group: 'ИС-22', time: '4 часа назад', icon: FileText, color: 'text-blue-600' },
    { action: 'Проверены работы', group: 'ПТ-31', time: '6 часов назад', icon: CheckCircle, color: 'text-purple-600' },
    { action: 'Новое сообщение от студента', group: 'ИС-21', time: '1 день назад', icon: MessageSquare, color: 'text-orange-600' },
  ]

  const upcomingTasks = [
    { task: 'Проверить контрольные работы ИС-21', deadline: 'До завтра', priority: 'high' },
    { task: 'Подготовить материалы к лекции', deadline: 'До 15:00', priority: 'medium' },
    { task: 'Выставить оценки за семестр', deadline: 'До 20.10', priority: 'high' },
    { task: 'Обновить учебный план', deadline: 'До конца недели', priority: 'low' },
  ]

  return (
    <div className="space-y-6">
      {/* Приветственный баннер */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-500 rounded-3xl p-8 text-white shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-400/20 rounded-full blur-2xl" />
        
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-5xl shadow-lg ring-4 ring-white/30">
              👩‍🏫
            </div>
            
            <div>
              <h1 className="text-4xl font-black mb-2 flex items-center gap-3">
                Добро пожаловать, {user?.name?.split(' ')[0] || 'Преподаватель'}!
                <span className="animate-wave inline-block">👋</span>
              </h1>
              <div className="flex items-center gap-4 text-white/90">
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Преподаватель информатики
                </span>
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  4 группы
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl transition-all"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center font-bold">
                3
              </span>
            </button>
            <button className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl transition-all flex items-center gap-2">
              <Edit2 className="w-4 h-4" />
              <span className="font-semibold">Профиль</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-effect rounded-2xl p-6 hover:scale-105 transition-transform cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              {stat.change && (
                <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                  {stat.change}
                </span>
              )}
            </div>
            <p className="text-3xl font-black mb-1">{stat.value}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Основная сетка */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Расписание на сегодня */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-effect rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-xl flex items-center gap-2">
                <Clock className="w-6 h-6 text-blue-600" />
                Расписание на сегодня
              </h3>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1">
                Полное расписание <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-3">
              {todayClasses.map((lesson, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 hover:shadow-md transition-shadow"
                >
                  <div className="text-center min-w-[70px]">
                    <p className="text-sm font-mono font-bold text-blue-600">{lesson.time}</p>
                  </div>
                  <div className="h-12 w-px bg-blue-200 dark:bg-blue-700" />
                  <div className="flex-1">
                    <p className="font-bold">{lesson.subject}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {lesson.group} • Каб. {lesson.room}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-semibold">
                    {lesson.type}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Последняя активность */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-effect rounded-2xl p-6"
          >
            <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
              <Activity className="w-6 h-6 text-purple-600" />
              Последняя активность
            </h3>
            
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 ${activity.color}`}>
                    <activity.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{activity.action}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {activity.group} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Боковая колонка */}
        <div className="space-y-6">
          {/* Задачи */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-effect rounded-2xl p-6"
          >
            <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
              <Target className="w-6 h-6 text-orange-600" />
              Задачи
            </h3>
            
            <div className="space-y-3">
              {upcomingTasks.map((task, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-xl border-2 ${
                    task.priority === 'high' 
                      ? 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20'
                      : task.priority === 'medium'
                      ? 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20'
                      : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      className="mt-1 w-5 h-5 rounded-lg accent-violet-600"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-sm mb-1">{task.task}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {task.deadline}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
              + Добавить задачу
            </button>
          </motion.div>

          {/* Быстрые действия */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="glass-effect rounded-2xl p-6"
          >
            <h3 className="font-bold text-lg mb-4">Быстрые действия</h3>
            
            <div className="space-y-2">
              <button className="w-full p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <FileText className="w-5 h-5" />
                Электронный журнал
              </button>
              <button className="w-full p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <Award className="w-5 h-5" />
                Выставить оценки
              </button>
              <button className="w-full p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Отчёты и аналитика
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
