import { motion } from 'framer-motion'
import { BookOpen, TrendingUp } from 'lucide-react'

const mockGrades = [
  { subject: 'Математика', grade: 5, date: '08.10.2025', type: 'Экзамен', teacher: 'Иванова М.П.' },
  { subject: 'Информатика', grade: 5, date: '07.10.2025', type: 'Контрольная', teacher: 'Петров А.С.' },
  { subject: 'История', grade: 4, date: '06.10.2025', type: 'Тест', teacher: 'Смирнова Е.В.' },
  { subject: 'Физика', grade: 5, date: '05.10.2025', type: 'Лабораторная', teacher: 'Козлов И.А.' },
  { subject: 'Английский', grade: 4, date: '04.10.2025', type: 'Зачёт', teacher: 'Волкова Н.П.' },
]

export default function GradesView() {
  const averageGrade = 4.6

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black mb-2">Оценки 📚</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Демо-данные • Backend интеграция в процессе
        </p>
      </div>

      {/* Average */}
      <div className="glass-effect rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-4xl font-black">{averageGrade}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Средний балл</p>
          </div>
        </div>
      </div>

      {/* Grades List */}
      <div className="space-y-3">
        {mockGrades.map((grade, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-effect rounded-2xl p-4 flex items-center justify-between hover:scale-102 transition-transform"
          >
            <div className="flex items-center gap-4 flex-1">
              <BookOpen className="w-10 h-10 text-violet-600 dark:text-violet-400" />
              <div className="flex-1">
                <p className="font-bold text-lg">{grade.subject}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {grade.type} • {grade.date} • {grade.teacher}
                </p>
              </div>
            </div>
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg ${
              grade.grade === 5 ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white' :
              grade.grade === 4 ? 'bg-gradient-to-br from-blue-500 to-cyan-600 text-white' :
              'bg-gradient-to-br from-yellow-500 to-orange-600 text-white'
            }`}>
              {grade.grade}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
