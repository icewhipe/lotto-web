import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BookOpen, Calendar, TrendingUp, Award, Clock,
  AlertCircle, Bell, MessageCircle, FileText, CheckCircle,
  ArrowRight, Heart, Star
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

export default function ParentDashboard() {
  const { user } = useAuth()
  const [selectedChild, setSelectedChild] = useState(0)

  // Mock данные детей
  const children = [
    {
      id: '1',
      name: 'Иван Петров',
      group: 'ИС-21',
      avatar: '👨‍🎓',
      avgGrade: 4.7,
      attendance: 95,
      lastVisit: 'Сегодня, 14:30'
    }
  ]

  const currentChild = children[selectedChild]

  const stats = [
    { label: 'Средний балл', value: currentChild.avgGrade.toFixed(1), icon: TrendingUp, color: 'from-green-500 to-emerald-600', badge: '↑ 0.2' },
    { label: 'Посещаемость', value: `${currentChild.attendance}%`, icon: Calendar, color: 'from-blue-500 to-cyan-600', badge: 'Отлично' },
    { label: 'Пропусков', value: '2', icon: AlertCircle, color: 'from-orange-500 to-red-600', badge: 'За месяц' },
    { label: 'Оценок', value: '24', icon: Award, color: 'from-purple-500 to-pink-600', badge: 'За неделю' },
  ]

  const recentGrades = [
    { subject: 'Математика', value: 5, date: '15.10', teacher: 'Иванова М.П.', type: 'Экзамен' },
    { subject: 'Программирование', value: 5, date: '14.10', teacher: 'Петров А.С.', type: 'Практика' },
    { subject: 'Базы данных', value: 4, date: '13.10', teacher: 'Смирнов В.И.', type: 'Тест' },
    { subject: 'Английский язык', value: 5, date: '12.10', teacher: 'Волкова Н.П.', type: 'Устный ответ' },
    { subject: 'История', value: 4, date: '11.10', teacher: 'Козлова Е.В.', type: 'Контрольная' },
  ]

  const todaySchedule = [
    { time: '09:00', subject: 'Математика', teacher: 'Иванова М.П.', room: '205' },
    { time: '10:45', subject: 'Программирование', teacher: 'Петров А.С.', room: '305' },
    { time: '12:30', subject: 'Физика', teacher: 'Новиков И.И.', room: '401' },
  ]

  const notifications = [
    { text: 'Родительское собрание 20 октября в 18:00', time: '2 часа назад', type: 'info' },
    { text: 'Оплата за обучение до 25 октября', time: '1 день назад', type: 'warning' },
    { text: 'Новая оценка по математике: 5', time: '2 дня назад', type: 'success' },
  ]

  return (
    <div className="space-y-6">
      {/* Приветственный баннер */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 rounded-3xl p-8 text-white shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-rose-400/20 rounded-full blur-2xl" />
        
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-5xl shadow-lg ring-4 ring-white/30">
              👨‍👩‍👦
            </div>
            
            <div>
              <h1 className="text-4xl font-black mb-2 flex items-center gap-3">
                Добро пожаловать, {user?.name?.split(' ')[0] || 'Родитель'}!
                <span className="animate-wave inline-block">👋</span>
              </h1>
              <div className="flex items-center gap-4 text-white/90">
                <span className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  Родитель студента
                </span>
                <span className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Следите за успеваемостью
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="relative p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl transition-all">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full text-xs flex items-center justify-center font-bold">
                2
              </span>
            </button>
            <button className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl transition-all flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span className="font-semibold">Связаться с учителем</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Выбор ребёнка (если детей несколько) */}
      {children.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {children.map((child, index) => (
            <button
              key={child.id}
              onClick={() => setSelectedChild(index)}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all ${
                selectedChild === index
                  ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg'
                  : 'glass-effect hover:scale-105'
              }`}
            >
              <span className="text-2xl">{child.avatar}</span>
              <div className="text-left">
                <p className="font-bold">{child.name}</p>
                <p className="text-xs opacity-80">{child.group}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Информация о ребёнке */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-effect rounded-2xl p-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-3xl">
              {currentChild.avatar}
            </div>
            <div>
              <h2 className="text-2xl font-black">{currentChild.name}</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Группа {currentChild.group} • Последний визит: {currentChild.lastVisit}
              </p>
            </div>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
            Написать классному руководителю
          </button>
        </div>
      </motion.div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="stat-card bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 bg-white/50 dark:bg-gray-800/50 px-2 py-1 rounded-lg">
                {stat.badge}
              </span>
            </div>
            <p className="text-3xl font-black mb-1">{stat.value}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Основная сетка */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Последние оценки */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-effect rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-xl flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-pink-600" />
                Последние оценки
              </h3>
              <button className="text-sm text-pink-600 hover:text-pink-700 font-semibold flex items-center gap-1">
                Все оценки <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-2">
              {recentGrades.map((grade, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-bold">{grade.subject}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {grade.teacher} • {grade.type} • {grade.date}
                    </p>
                  </div>
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-black shadow-lg ${
                    grade.value === 5 ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white' :
                    grade.value === 4 ? 'bg-gradient-to-br from-blue-400 to-cyan-500 text-white' :
                    'bg-gradient-to-br from-yellow-400 to-orange-500 text-white'
                  }`}>
                    {grade.value}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Расписание на сегодня */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="glass-effect rounded-2xl p-6 mt-6"
          >
            <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
              <Clock className="w-6 h-6 text-blue-600" />
              Расписание на сегодня
            </h3>
            
            <div className="space-y-3">
              {todaySchedule.map((lesson, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"
                >
                  <div className="text-sm font-mono font-bold text-blue-600 min-w-[60px]">
                    {lesson.time}
                  </div>
                  <div className="h-10 w-px bg-blue-200 dark:bg-blue-700" />
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
        </div>

        {/* Боковая колонка */}
        <div className="space-y-6">
          {/* Уведомления */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="glass-effect rounded-2xl p-6"
          >
            <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
              <Bell className="w-6 h-6 text-orange-600" />
              Уведомления
            </h3>
            
            <div className="space-y-3">
              {notifications.map((notif, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-xl border-2 ${
                    notif.type === 'warning'
                      ? 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20'
                      : notif.type === 'success'
                      ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20'
                      : 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20'
                  }`}
                >
                  <p className="font-semibold text-sm mb-1">{notif.text}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{notif.time}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Быстрые действия */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
            className="glass-effect rounded-2xl p-6"
          >
            <h3 className="font-bold text-lg mb-4">Полезные ссылки</h3>
            
            <div className="space-y-2">
              <button className="w-full p-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <FileText className="w-5 h-5" />
                Успеваемость
              </button>
              <button className="w-full p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <Calendar className="w-5 h-5" />
                Посещаемость
              </button>
              <button className="w-full p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Связаться с учителем
              </button>
            </div>
          </motion.div>

          {/* Советы */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="glass-effect rounded-2xl p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
          >
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold mb-2">Отличная успеваемость!</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Ваш ребёнок показывает стабильные результаты. Средний балл вырос на 0.2 за месяц!
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
