import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, User } from 'lucide-react'
import InDevelopmentOverlay from '../InDevelopmentOverlay'

const weekDays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']

const mockSchedule = [
  { time: '08:30 - 10:00', subject: 'Математика', teacher: 'Иванова М.П.', room: '201', type: 'lecture' },
  { time: '10:15 - 11:45', subject: 'Информатика', teacher: 'Петров А.С.', room: '305', type: 'practice' },
  { time: '12:00 - 13:30', subject: 'История', teacher: 'Смирнова Е.В.', room: '102', type: 'lecture' },
  { time: '13:45 - 15:15', subject: 'Физика', teacher: 'Козлов И.А.', room: '204', type: 'lab' },
]

export default function ScheduleView() {
  const [selectedDay, setSelectedDay] = useState(0)

  return (
    <div className="space-y-6 relative">
      {/* Mock Content (Blurred) */}
      <div className="opacity-60 pointer-events-none">
        {/* Week Days Selector */}
        <div className="glass-effect rounded-2xl p-4 mb-6">
          <div className="flex gap-2 overflow-x-auto">
            {weekDays.map((day, index) => (
              <button
                key={day}
                className={`px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap transition-colors ${
                  selectedDay === index
                    ? 'bg-violet-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Schedule List */}
        <div className="space-y-3">
          {mockSchedule.map((lesson, index) => (
            <div key={index} className="glass-effect rounded-2xl p-4">
              <div className="flex items-center gap-4">
                <div className="text-sm font-mono text-gray-500 min-w-[110px]">
                  <Clock className="w-4 h-4 inline mr-1" />
                  {lesson.time}
                </div>
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
                <div className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                  lesson.type === 'lecture' ? 'bg-blue-100 text-blue-600' :
                  lesson.type === 'practice' ? 'bg-green-100 text-green-600' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  {lesson.type === 'lecture' ? 'Лекция' :
                   lesson.type === 'practice' ? 'Практика' : 'Лабораторная'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Development Overlay */}
      <InDevelopmentOverlay 
        title="Расписание в разработке"
        description="Backend API готов! Загрузка расписания из базы данных. Скоро вы сможете видеть своё актуальное расписание!"
      />
    </div>
  )
}
