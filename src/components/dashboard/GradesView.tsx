import { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, TrendingUp, ChevronDown } from 'lucide-react'
import InDevelopmentOverlay from '../InDevelopmentOverlay'

// Mock data для демонстрации
const mockSubjects = [
  {
    name: 'Математика',
    grades: [
      { date: '2025-10-07', grade: 5, type: 'exam' },
      { date: '2025-09-30', grade: 4, type: 'test' },
      { date: '2025-09-20', grade: 5, type: 'homework' },
    ],
    average: 4.7
  },
  {
    name: 'Информатика',
    grades: [
      { date: '2025-10-06', grade: 5, type: 'test' },
      { date: '2025-09-28', grade: 5, type: 'homework' },
    ],
    average: 5.0
  },
  {
    name: 'История',
    grades: [
      { date: '2025-10-05', grade: 4, type: 'test' },
      { date: '2025-09-25', grade: 5, type: 'exam' },
    ],
    average: 4.5
  },
]

export default function GradesView() {
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null)
  const overallAverage = 4.7

  return (
    <div className="space-y-6 relative">
      {/* Mock Content (Blurred Background) */}
      <div className="opacity-60 pointer-events-none">
        {/* Overall Average */}
        <div className="glass-effect rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-3xl font-black">{overallAverage.toFixed(2)}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Средний балл</p>
            </div>
          </div>
        </div>

        {/* Subjects */}
        <div className="space-y-4">
          {mockSubjects.map((subject) => (
            <div key={subject.name} className="glass-effect rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                  <h3 className="text-xl font-bold">{subject.name}</h3>
                </div>
                <div className="text-2xl font-black text-violet-600 dark:text-violet-400">
                  {subject.average.toFixed(1)}
                </div>
              </div>
              
              <div className="space-y-2">
                {subject.grades.map((grade, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                    <span className="text-sm">{grade.date}</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                      grade.grade === 5 ? 'bg-green-100 text-green-600' :
                      grade.grade === 4 ? 'bg-blue-100 text-blue-600' :
                      'bg-yellow-100 text-yellow-600'
                    }`}>
                      {grade.grade}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Development Overlay */}
      <InDevelopmentOverlay 
        title="Оценки в разработке"
        description="Backend API готов! Идёт интеграция с реальными оценками из базы данных. Скоро здесь будут ваши настоящие оценки!"
      />
    </div>
  )
}
