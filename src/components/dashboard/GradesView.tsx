import { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, TrendingUp, ChevronDown } from 'lucide-react'

interface Grade {
  date: string
  grade: number
  type: 'exam' | 'test' | 'homework'
}

interface Subject {
  name: string
  teacher: string
  grades: Grade[]
  average: number
}

const subjects: Subject[] = [
  {
    name: 'Математика',
    teacher: 'Иванова М.П.',
    grades: [
      { date: '2025-10-07', grade: 5, type: 'exam' },
      { date: '2025-10-05', grade: 4, type: 'test' },
      { date: '2025-10-03', grade: 5, type: 'homework' },
      { date: '2025-10-01', grade: 5, type: 'test' },
    ],
    average: 4.75,
  },
  {
    name: 'Информатика',
    teacher: 'Петров А.С.',
    grades: [
      { date: '2025-10-06', grade: 4, type: 'test' },
      { date: '2025-10-04', grade: 5, type: 'homework' },
      { date: '2025-10-02', grade: 4, type: 'test' },
    ],
    average: 4.33,
  },
  {
    name: 'История',
    teacher: 'Смирнова Е.В.',
    grades: [
      { date: '2025-10-05', grade: 5, type: 'exam' },
      { date: '2025-10-03', grade: 5, type: 'homework' },
      { date: '2025-10-01', grade: 4, type: 'test' },
    ],
    average: 4.67,
  },
  {
    name: 'Физика',
    teacher: 'Козлов И.А.',
    grades: [
      { date: '2025-10-07', grade: 4, type: 'test' },
      { date: '2025-10-04', grade: 5, type: 'homework' },
      { date: '2025-10-02', grade: 4, type: 'test' },
    ],
    average: 4.33,
  },
]

const gradeTypeLabels = {
  exam: 'Экзамен',
  test: 'Контрольная',
  homework: 'Домашняя работа',
}

export default function GradesView() {
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null)

  const overallAverage = subjects.reduce((acc, subject) => acc + subject.average, 0) / subjects.length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black mb-2">Успеваемость</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Ваши оценки по всем предметам
          </p>
        </div>
        
        <div className="glass-effect rounded-2xl p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-3xl font-black">{overallAverage.toFixed(2)}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Средний балл</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {subjects.map((subject, index) => (
          <motion.div
            key={subject.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-effect rounded-2xl overflow-hidden"
          >
            <button
              onClick={() => setExpandedSubject(expandedSubject === subject.name ? null : subject.name)}
              className="w-full p-6 flex items-center justify-between hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-bold">{subject.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{subject.teacher}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-2xl font-black">{subject.average.toFixed(2)}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Средний балл</p>
                </div>
                <ChevronDown 
                  className={`w-5 h-5 transition-transform ${
                    expandedSubject === subject.name ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </button>

            {expandedSubject === subject.name && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-gray-200 dark:border-gray-800"
              >
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {subject.grades.map((grade, gradeIndex) => (
                      <div
                        key={gradeIndex}
                        className="p-4 rounded-xl bg-white/50 dark:bg-gray-800/50"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {grade.date}
                          </span>
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${
                            grade.grade === 5 ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                            grade.grade === 4 ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                            'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                          }`}>
                            {grade.grade}
                          </div>
                        </div>
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                          {gradeTypeLabels[grade.type]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
  */
}
