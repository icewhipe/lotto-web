import { motion } from 'framer-motion'
import { BookOpen, TrendingUp, Loader } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useGrades } from '../../hooks/useGrades'

export default function GradesView() {
  const { user } = useAuth()
  const { grades, loading, error, average } = useGrades(user?.id)

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

  if (error) {
    return (
      <div className="glass-effect rounded-2xl p-8 text-center">
        <div className="text-red-600 dark:text-red-400 mb-4">
          <p className="font-bold text-xl mb-2">Ошибка загрузки</p>
          <p className="text-sm">{error}</p>
        </div>
        <p className="text-xs text-gray-500">Показываю демо-данные:</p>
      </div>
    )
  }

  // Если backend не вернул данные - используем mock
  const displayGrades = grades.length > 0 ? grades : [
    { id: '1', subject: { name: 'Математика' }, value: 5, date: '2025-10-08', type: 'EXAM', teacher: { user: { name: 'Иванова М.П.' } } },
    { id: '2', subject: { name: 'Информатика' }, value: 5, date: '2025-10-07', type: 'TEST', teacher: { user: { name: 'Петров А.С.' } } },
    { id: '3', subject: { name: 'История' }, value: 4, date: '2025-10-06', type: 'HOMEWORK', teacher: { user: { name: 'Смирнова Е.В.' } } },
  ]

  const displayAverage = average || 4.6

  const getGradeTypeLabel = (type: string) => {
    const types: any = {
      'EXAM': 'Экзамен',
      'TEST': 'Тест',
      'HOMEWORK': 'Домашняя работа',
      'PRACTICE': 'Практика',
    }
    return types[type] || type
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black mb-2">Оценки 📚</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {grades.length > 0 ? 'Реальные данные из API' : 'Демо-данные (Backend недоступен)'}
        </p>
      </div>

      {/* Average */}
      <div className="glass-effect rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-4xl font-black">{displayAverage.toFixed(2)}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Средний балл</p>
          </div>
        </div>
      </div>

      {/* Grades List */}
      <div className="space-y-3">
        {displayGrades.map((grade, index) => (
          <motion.div
            key={grade.id || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-effect rounded-2xl p-4 flex items-center justify-between hover:scale-102 transition-transform"
          >
            <div className="flex items-center gap-4 flex-1">
              <BookOpen className="w-10 h-10 text-violet-600 dark:text-violet-400" />
              <div className="flex-1">
                <p className="font-bold text-lg">{grade.subject.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {getGradeTypeLabel(grade.type)} • {new Date(grade.date).toLocaleDateString()} • {grade.teacher.user.name}
                </p>
              </div>
            </div>
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg ${
              grade.value === 5 ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white' :
              grade.value === 4 ? 'bg-gradient-to-br from-blue-500 to-cyan-600 text-white' :
              grade.value === 3 ? 'bg-gradient-to-br from-yellow-500 to-orange-600 text-white' :
              'bg-gradient-to-br from-red-500 to-rose-600 text-white'
            }`}>
              {grade.value}
            </div>
          </motion.div>
        ))}

        {displayGrades.length === 0 && (
          <div className="glass-effect rounded-2xl p-12 text-center">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500 dark:text-gray-400">
              Оценок пока нет
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
