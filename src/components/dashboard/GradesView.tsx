import { motion } from 'framer-motion'
import { BookOpen, TrendingUp, Loader, Calendar, Award, BarChart3, Filter } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useGrades } from '../../hooks/useGrades'
import { useState } from 'react'

export default function GradesView() {
  const { user } = useAuth()
  const { grades, loading, error, average } = useGrades(user?.id)
  const [filterSubject, setFilterSubject] = useState<string>('all')

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-violet-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Загрузка оценок...</p>
        </div>
      </div>
    )
  }

  // Если backend не вернул данные - используем демо
  const displayGrades = grades.length > 0 ? grades : [
    { id: '1', subject: { name: 'Математика' }, value: 5, date: '2024-10-12', type: 'EXAM', teacher: { user: { name: 'Иванова М.П.' } } },
    { id: '2', subject: { name: 'Информатика' }, value: 5, date: '2024-10-11', type: 'TEST', teacher: { user: { name: 'Петров А.С.' } } },
    { id: '3', subject: { name: 'История' }, value: 4, date: '2024-10-10', type: 'HOMEWORK', teacher: { user: { name: 'Смирнова Е.В.' } } },
    { id: '4', subject: { name: 'Физика' }, value: 5, date: '2024-10-09', type: 'PRACTICE', teacher: { user: { name: 'Козлов И.И.' } } },
    { id: '5', subject: { name: 'Английский язык' }, value: 4, date: '2024-10-08', type: 'TEST', teacher: { user: { name: 'Новикова А.А.' } } },
    { id: '6', subject: { name: 'Математика' }, value: 5, date: '2024-10-07', type: 'HOMEWORK', teacher: { user: { name: 'Иванова М.П.' } } },
    { id: '7', subject: { name: 'Информатика' }, value: 4, date: '2024-10-06', type: 'PRACTICE', teacher: { user: { name: 'Петров А.С.' } } },
    { id: '8', subject: { name: 'История' }, value: 5, date: '2024-10-05', type: 'TEST', teacher: { user: { name: 'Смирнова Е.В.' } } },
  ]

  const displayAverage = average || 4.6

  // Уникальные предметы
  const uniqueSubjects = Array.from(new Set(displayGrades.map(g => g.subject.name)))
  
  // Фильтрация
  const filteredGrades = filterSubject === 'all' 
    ? displayGrades 
    : displayGrades.filter(g => g.subject.name === filterSubject)

  // Статистика по оценкам
  const gradeStats = {
    total: displayGrades.length,
    fives: displayGrades.filter(g => g.value === 5).length,
    fours: displayGrades.filter(g => g.value === 4).length,
    threes: displayGrades.filter(g => g.value === 3).length,
    twos: displayGrades.filter(g => g.value === 2).length,
  }

  const getGradeTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      'EXAM': 'Экзамен',
      'TEST': 'Контрольная',
      'HOMEWORK': 'Домашняя работа',
      'PRACTICE': 'Практика',
      'LAB': 'Лабораторная',
    }
    return types[type] || type
  }

  const getGradeColor = (value: number) => {
    if (value === 5) return 'from-green-500 to-emerald-600'
    if (value === 4) return 'from-blue-500 to-cyan-600'
    if (value === 3) return 'from-yellow-500 to-orange-600'
    return 'from-red-500 to-rose-600'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect rounded-2xl p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              Мои оценки
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {grades.length > 0 ? '📡 Реальные данные' : '💾 Демо-данные (Backend недоступен)'}
            </p>
          </div>
          
          <div className="text-right">
            <p className="text-5xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {displayAverage.toFixed(2)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Средний балл</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="stat-card bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">Всего</span>
          </div>
          <span className="text-3xl font-black text-violet-600">{gradeStats.total}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="stat-card bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
              <Award className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">Пятёрок</span>
          </div>
          <span className="text-3xl font-black text-green-600">{gradeStats.fives}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="stat-card bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">Четвёрок</span>
          </div>
          <span className="text-3xl font-black text-blue-600">{gradeStats.fours}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="stat-card bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 shadow-lg">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">Троек</span>
          </div>
          <span className="text-3xl font-black text-orange-600">{gradeStats.threes}</span>
        </motion.div>
      </div>

      {/* Filter */}
      <div className="glass-effect rounded-2xl p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-violet-600" />
            <span className="font-semibold">Предмет:</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilterSubject('all')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                filterSubject === 'all'
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              Все
            </button>
            {uniqueSubjects.map(subject => (
              <button
                key={subject}
                onClick={() => setFilterSubject(subject)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  filterSubject === subject
                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grades List */}
      <div className="space-y-3">
        {filteredGrades.map((grade, index) => (
          <motion.div
            key={grade.id || index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="glass-effect rounded-2xl p-5 hover:shadow-xl transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-black shadow-lg group-hover:scale-110 transition-transform bg-gradient-to-br ${getGradeColor(grade.value)} text-white`}>
                  {grade.value}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-lg mb-1">{grade.subject.name}</p>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(grade.date).toLocaleDateString('ru-RU', { 
                        day: 'numeric', 
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                    <span>•</span>
                    <span className="px-2 py-1 bg-violet-100 dark:bg-violet-900/30 rounded-lg font-semibold">
                      {getGradeTypeLabel(grade.type)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Преподаватель: {grade.teacher.user.name}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {filteredGrades.length === 0 && (
          <div className="glass-effect rounded-2xl p-12 text-center">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-xl font-bold text-gray-600 dark:text-gray-400">
              {filterSubject === 'all' ? 'Оценок пока нет' : `Нет оценок по предмету "${filterSubject}"`}
            </p>
          </div>
        )}
      </div>

      {error && (
        <div className="glass-effect rounded-2xl p-6 border-2 border-yellow-200 dark:border-yellow-800">
          <p className="text-yellow-800 dark:text-yellow-200">
            ⚠️ Backend недоступен. Показаны демо-данные.
          </p>
        </div>
      )}
    </div>
  )
}
