import { motion } from 'framer-motion'
import { Clock, MapPin, User, Loader, BookOpen } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useSchedule } from '../../hooks/useSchedule'
import { useState } from 'react'

const WEEKDAYS = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']

export default function ScheduleView() {
  const { user } = useAuth()
  const [selectedDay, setSelectedDay] = useState(new Date().getDay() || 1)
  const { schedule, loading } = useSchedule(user?.groupId, selectedDay)

  // Демо-расписание
  const demoSchedule: Record<number, any[]> = {
    1: [ // Понедельник
      { id: '1', subject: { name: 'Математика' }, teacher: { user: { name: 'Иванова М.П.' } }, startTime: '09:00', endTime: '10:30', room: '205', type: 'LECTURE' },
      { id: '2', subject: { name: 'Информатика' }, teacher: { user: { name: 'Петров А.С.' } }, startTime: '10:45', endTime: '12:15', room: '301', type: 'PRACTICE' },
      { id: '3', subject: { name: 'Физкультура' }, teacher: { user: { name: 'Смирнов В.И.' } }, startTime: '12:30', endTime: '14:00', room: 'Спортзал', type: 'PRACTICE' },
    ],
    2: [ // Вторник
      { id: '4', subject: { name: 'История' }, teacher: { user: { name: 'Смирнова Е.В.' } }, startTime: '09:00', endTime: '10:30', room: '102', type: 'LECTURE' },
      { id: '5', subject: { name: 'Английский язык' }, teacher: { user: { name: 'Новикова А.А.' } }, startTime: '10:45', endTime: '12:15', room: '204', type: 'PRACTICE' },
      { id: '6', subject: { name: 'Физика' }, teacher: { user: { name: 'Козлов И.И.' } }, startTime: '12:30', endTime: '14:00', room: '305', type: 'LAB' },
    ],
    3: [ // Среда
      { id: '7', subject: { name: 'Математика' }, teacher: { user: { name: 'Иванова М.П.' } }, startTime: '09:00', endTime: '10:30', room: '205', type: 'PRACTICE' },
      { id: '8', subject: { name: 'Информатика' }, teacher: { user: { name: 'Петров А.С.' } }, startTime: '10:45', endTime: '12:15', room: '301', type: 'LAB' },
    ],
    4: [ // Четверг
      { id: '9', subject: { name: 'История' }, teacher: { user: { name: 'Смирнова Е.В.' } }, startTime: '09:00', endTime: '10:30', room: '102', type: 'LECTURE' },
      { id: '10', subject: { name: 'Физика' }, teacher: { user: { name: 'Козлов И.И.' } }, startTime: '10:45', endTime: '12:15', room: '305', type: 'LECTURE' },
      { id: '11', subject: { name: 'Английский язык' }, teacher: { user: { name: 'Новикова А.А.' } }, startTime: '12:30', endTime: '14:00', room: '204', type: 'PRACTICE' },
    ],
    5: [ // Пятница
      { id: '12', subject: { name: 'Математика' }, teacher: { user: { name: 'Иванова М.П.' } }, startTime: '09:00', endTime: '10:30', room: '205', type: 'LECTURE' },
      { id: '13', subject: { name: 'Информатика' }, teacher: { user: { name: 'Петров А.С.' } }, startTime: '10:45', endTime: '12:15', room: '301', type: 'PRACTICE' },
    ],
    6: [ // Суббота
      { id: '14', subject: { name: 'Физкультура' }, teacher: { user: { name: 'Смирнов В.И.' } }, startTime: '09:00', endTime: '10:30', room: 'Спортзал', type: 'PRACTICE' },
    ],
  }

  const displaySchedule = schedule.length > 0 ? schedule : (demoSchedule[selectedDay] || [])

  const getLessonTypeColor = (type: string) => {
    if (type === 'LECTURE') return 'from-blue-500 to-cyan-600'
    if (type === 'PRACTICE') return 'from-green-500 to-emerald-600'
    if (type === 'LAB') return 'from-purple-500 to-pink-600'
    return 'from-gray-500 to-gray-600'
  }

  const getLessonTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      'LECTURE': 'Лекция',
      'PRACTICE': 'Практика',
      'LAB': 'Лабораторная'
    }
    return types[type] || type
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect rounded-2xl p-6"
      >
        <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Расписание
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {schedule.length > 0 ? '📡 Реальные данные' : '💾 Демо-данные'}
        </p>
      </motion.div>

      {/* Week Days Tabs */}
      <div className="glass-effect rounded-2xl p-2">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {WEEKDAYS.map((day, index) => (
            <button
              key={index}
              onClick={() => setSelectedDay(index + 1)}
              className={`px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                selectedDay === index + 1
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <div className="hidden md:block">{day}</div>
              <div className="md:hidden">{day.slice(0, 2)}</div>
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Загрузка расписания...</p>
          </div>
        </div>
      ) : displaySchedule.length > 0 ? (
        <div className="space-y-3">
          {displaySchedule.map((lesson, index) => (
            <motion.div
              key={lesson.id || index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-effect rounded-2xl p-6 hover:shadow-xl transition-all group"
            >
              <div className="flex items-start gap-4">
                {/* Time */}
                <div className="text-center min-w-[80px]">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <p className="text-sm font-mono font-bold text-blue-600">
                      {lesson.startTime}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 font-mono">
                    {lesson.endTime}
                  </p>
                </div>

                <div className="h-full w-px bg-gradient-to-b from-blue-500 to-cyan-500" />

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-xl mb-1">{lesson.subject.name}</h3>
                      <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {lesson.teacher.user.name}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          Каб. {lesson.room}
                        </span>
                      </div>
                    </div>
                    
                    <span className={`px-3 py-1 rounded-lg text-sm font-bold bg-gradient-to-r ${getLessonTypeColor(lesson.type)} text-white shadow-md`}>
                      {getLessonTypeLabel(lesson.type)}
                    </span>
                  </div>

                  {/* Progress bar (simulate time) */}
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full w-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="glass-effect rounded-2xl p-12 text-center">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-xl font-bold text-gray-600 dark:text-gray-400">
            На этот день занятий нет
          </p>
        </div>
      )}
    </div>
  )
}
