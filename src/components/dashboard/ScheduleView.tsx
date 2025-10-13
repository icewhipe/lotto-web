import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, User, Loader } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useSchedule } from '../../hooks/useSchedule'

const weekDays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']

// Mock данные как fallback
const mockSchedule: any = {
  0: [ 
    { id: '1', subject: { name: 'Математика' }, teacher: { user: { name: 'Иванова М.П.' } }, startTime: '08:30', endTime: '10:00', room: '201', type: 'LECTURE' },
    { id: '2', subject: { name: 'Информатика' }, teacher: { user: { name: 'Петров А.С.' } }, startTime: '10:15', endTime: '11:45', room: '305', type: 'PRACTICE' },
  ],
  1: [
    { id: '3', subject: { name: 'Английский' }, teacher: { user: { name: 'Волкова Н.П.' } }, startTime: '08:30', endTime: '10:00', room: '301', type: 'PRACTICE' },
  ],
}

export default function ScheduleView() {
  const [selectedDay, setSelectedDay] = useState(new Date().getDay())
  const { user } = useAuth()
  const { schedule, loading, error } = useSchedule(user?.groupId, selectedDay)

  // Если API вернул данные - используем их, иначе mock
  const lessons = schedule.length > 0 ? schedule : (mockSchedule[selectedDay] || [])

  const getTypeLabel = (type: string) => {
    const types: any = {
      'LECTURE': 'Лекция',
      'PRACTICE': 'Практика',
      'LAB': 'Лаб. работа',
      'SEMINAR': 'Семинар',
    }
    return types[type] || type
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black mb-2">Расписание 📅</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {schedule.length > 0 ? '✅ Реальные данные из API' : '💡 Демо-данные (Backend недоступен)'}
        </p>
      </div>

      {/* Week Days Selector */}
      <div className="glass-effect rounded-2xl p-4">
        <div className="flex gap-2 overflow-x-auto">
          {weekDays.map((day, index) => (
            <button
              key={day}
              onClick={() => setSelectedDay(index)}
              className={`px-6 py-3 rounded-xl font-semibold text-sm whitespace-nowrap transition-all ${
                selectedDay === index
                  ? 'bg-violet-600 text-white shadow-lg scale-105'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader className="w-12 h-12 animate-spin text-violet-600 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Загрузка расписания...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="glass-effect rounded-2xl p-6 text-center text-red-600 dark:text-red-400">
          <p className="font-bold mb-2">Ошибка загрузки</p>
          <p className="text-sm">{error}</p>
          <p className="text-xs text-gray-500 mt-2">Показываю демо-данные</p>
        </div>
      )}

      {/* Schedule List */}
      {!loading && (
        <div className="space-y-3">
          {lessons.length > 0 ? lessons.map((lesson: any, index: number) => (
            <motion.div
              key={lesson.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-effect rounded-2xl p-4 hover:scale-102 transition-transform"
            >
              <div className="flex items-center gap-4">
                <div className="text-center min-w-[100px]">
                  <Clock className="w-5 h-5 mx-auto mb-1 text-violet-600 dark:text-violet-400" />
                  <p className="text-sm font-mono font-bold">
                    {lesson.startTime} - {lesson.endTime}
                  </p>
                </div>
                
                <div className="h-12 w-px bg-gray-200 dark:bg-gray-700" />
                
                <div className="flex-1">
                  <p className="font-bold text-lg">{lesson.subject.name}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {lesson.teacher.user.name}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      Каб. {lesson.room}
                    </span>
                  </div>
                </div>
                
                <div className={`px-4 py-2 rounded-xl text-sm font-semibold ${
                  lesson.type === 'LECTURE' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                  lesson.type === 'PRACTICE' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
                  lesson.type === 'LAB' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' :
                  'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'
                }`}>
                  {getTypeLabel(lesson.type)}
                </div>
              </div>
            </motion.div>
          )) : (
            <div className="glass-effect rounded-2xl p-12 text-center">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500 dark:text-gray-400">
                На этот день занятий нет
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
