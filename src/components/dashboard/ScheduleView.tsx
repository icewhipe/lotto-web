import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, User } from 'lucide-react'

const weekDays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']

interface Lesson {
  time: string
  subject: string
  teacher: string
  room: string
  type: 'lecture' | 'practice' | 'lab'
}

const schedule: Record<string, Lesson[]> = {
  'Понедельник': [
    { time: '08:30 - 10:00', subject: 'Математика', teacher: 'Иванова М.П.', room: '201', type: 'lecture' },
    { time: '10:15 - 11:45', subject: 'Информатика', teacher: 'Петров А.С.', room: '305', type: 'practice' },
    { time: '12:00 - 13:30', subject: 'История', teacher: 'Смирнова Е.В.', room: '102', type: 'lecture' },
    { time: '13:45 - 15:15', subject: 'Физика', teacher: 'Козлов И.А.', room: '204', type: 'lab' },
  ],
  'Вторник': [
    { time: '08:30 - 10:00', subject: 'Английский язык', teacher: 'Белова Н.А.', room: '303', type: 'practice' },
    { time: '10:15 - 11:45', subject: 'Математика', teacher: 'Иванова М.П.', room: '201', type: 'practice' },
    { time: '12:00 - 13:30', subject: 'Химия', teacher: 'Морозов П.Р.', room: '105', type: 'lab' },
  ],
  'Среда': [
    { time: '08:30 - 10:00', subject: 'Информатика', teacher: 'Петров А.С.', room: '305', type: 'lab' },
    { time: '10:15 - 11:45', subject: 'Физкультура', teacher: 'Громов С.В.', room: 'Спортзал', type: 'practice' },
    { time: '12:00 - 13:30', subject: 'Обществознание', teacher: 'Смирнова Е.В.', room: '102', type: 'lecture' },
    { time: '13:45 - 15:15', subject: 'Литература', teacher: 'Павлова А.И.', room: '210', type: 'lecture' },
  ],
  'Четверг': [
    { time: '08:30 - 10:00', subject: 'Физика', teacher: 'Козлов И.А.', room: '204', type: 'lecture' },
    { time: '10:15 - 11:45', subject: 'Математика', teacher: 'Иванова М.П.', room: '201', type: 'practice' },
    { time: '12:00 - 13:30', subject: 'Английский язык', teacher: 'Белова Н.А.', room: '303', type: 'practice' },
  ],
  'Пятница': [
    { time: '08:30 - 10:00', subject: 'История', teacher: 'Смирнова Е.В.', room: '102', type: 'lecture' },
    { time: '10:15 - 11:45', subject: 'Информатика', teacher: 'Петров А.С.', room: '305', type: 'practice' },
    { time: '12:00 - 13:30', subject: 'Химия', teacher: 'Морозов П.Р.', room: '105', type: 'lecture' },
  ],
  'Суббота': [
    { time: '08:30 - 10:00', subject: 'Физкультура', teacher: 'Громов С.В.', room: 'Спортзал', type: 'practice' },
    { time: '10:15 - 11:45', subject: 'Классный час', teacher: 'Иванова М.П.', room: '201', type: 'lecture' },
  ],
}

const lessonTypeColors = {
  lecture: 'from-blue-500 to-cyan-600',
  practice: 'from-green-500 to-emerald-600',
  lab: 'from-purple-500 to-pink-600',
}

const lessonTypeLabels = {
  lecture: 'Лекция',
  practice: 'Практика',
  lab: 'Лабораторная',
}

export default function ScheduleView() {
  const [selectedDay, setSelectedDay] = useState('Понедельник')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black mb-2">Расписание занятий</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Группа ПТ-21 • Недельное расписание
        </p>
      </div>

      {/* Day Selector */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {weekDays.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
              selectedDay === day
                ? 'bg-gradient-to-r from-primary-500 to-purple-600 text-white shadow-lg'
                : 'glass-effect hover:shadow-lg'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Schedule Grid */}
      <motion.div
        key={selectedDay}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-4"
      >
        {schedule[selectedDay].map((lesson, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-effect rounded-2xl p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className={`p-4 rounded-xl bg-gradient-to-br ${lessonTypeColors[lesson.type]} min-w-[140px]`}>
                <div className="flex items-center gap-2 text-white mb-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-semibold">{lesson.time}</span>
                </div>
                <span className="inline-block px-2 py-1 bg-white/20 rounded-lg text-xs font-semibold text-white">
                  {lessonTypeLabels[lesson.type]}
                </span>
              </div>

              <div className="flex-1 space-y-2">
                <h3 className="text-xl font-bold">{lesson.subject}</h3>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{lesson.teacher}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>Аудитория {lesson.room}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Legend */}
      <div className="glass-effect rounded-2xl p-6">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Типы занятий
        </h3>
        <div className="flex flex-wrap gap-4">
          {Object.entries(lessonTypeLabels).map(([type, label]) => (
            <div key={type} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded bg-gradient-to-br ${lessonTypeColors[type as keyof typeof lessonTypeColors]}`} />
              <span className="text-sm">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
  */
}
   </div>
      </div>
    </div>
  )
}
