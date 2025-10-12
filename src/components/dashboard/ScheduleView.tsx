import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, User } from 'lucide-react'

const weekDays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']

const mockSchedule = {
  0: [ // Понедельник
    { time: '08:30 - 10:00', subject: 'Математика', teacher: 'Иванова М.П.', room: '201', type: 'Лекция' },
    { time: '10:15 - 11:45', subject: 'Информатика', teacher: 'Петров А.С.', room: '305', type: 'Практика' },
    { time: '12:00 - 13:30', subject: 'История', teacher: 'Смирнова Е.В.', room: '102', type: 'Лекция' },
    { time: '13:45 - 15:15', subject: 'Физика', teacher: 'Козлов И.А.', room: '204', type: 'Лаб. работа' },
  ],
  1: [ // Вторник
    { time: '08:30 - 10:00', subject: 'Английский язык', teacher: 'Волкова Н.П.', room: '301', type: 'Практика' },
    { time: '10:15 - 11:45', subject: 'Математика', teacher: 'Иванова М.П.', room: '201', type: 'Практика' },
    { time: '12:00 - 13:30', subject: 'Информатика', teacher: 'Петров А.С.', room: '305', type: 'Лекция' },
  ],
  2: [ // Среда
    { time: '08:30 - 10:00', subject: 'Физика', teacher: 'Козлов И.А.', room: '204', type: 'Лекция' },
    { time: '10:15 - 11:45', subject: 'История', teacher: 'Смирнова Е.В.', room: '102', type: 'Семинар' },
  ],
}

export default function ScheduleView() {
  const [selectedDay, setSelectedDay] = useState(0)
  const lessons = mockSchedule[selectedDay as keyof typeof mockSchedule] || []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black mb-2">Расписание 📅</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Демо-данные • Backend интеграция в процессе
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

      {/* Schedule List */}
      <div className="space-y-3">
        {lessons.length > 0 ? lessons.map((lesson, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-effect rounded-2xl p-4 hover:scale-102 transition-transform"
          >
            <div className="flex items-center gap-4">
              <div className="text-center min-w-[100px]">
                <Clock className="w-5 h-5 mx-auto mb-1 text-violet-600 dark:text-violet-400" />
                <p className="text-sm font-mono font-bold">{lesson.time}</p>
              </div>
              
              <div className="h-12 w-px bg-gray-200 dark:bg-gray-700" />
              
              <div className="flex-1">
                <p className="font-bold text-lg">{lesson.subject}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {lesson.teacher}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    Каб. {lesson.room}
                  </span>
                </div>
              </div>
              
              <div className={`px-4 py-2 rounded-xl text-sm font-semibold ${
                lesson.type === 'Лекция' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                lesson.type === 'Практика' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
                lesson.type === 'Лаб. работа' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' :
                'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'
              }`}>
                {lesson.type}
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
    </div>
  )
}
