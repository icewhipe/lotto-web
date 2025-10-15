import { motion } from 'framer-motion'
import { Calendar, Clock } from 'lucide-react'

interface ScheduleSectionProps {
  isDark: boolean
}

export default function ScheduleSection({ isDark }: ScheduleSectionProps) {
  const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница']
  const lessons = [
    { time: '08:00-08:45', subject: 'Математика', teacher: 'Иванов И.И.', room: '101' },
    { time: '08:50-09:35', subject: 'Информатика', teacher: 'Петров П.П.', room: '205' },
  ]

  return (
    <div className="container mx-auto px-6 py-20">
      <h1 className={`text-4xl font-black mb-12 ${isDark ? 'text-white' : 'text-slate-900'}`}>Расписание занятий</h1>
      <div className="space-y-6">
        {days.map((day, dayIndex) => (
          <motion.div key={day} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: dayIndex * 0.1 }} className={`p-6 rounded-2xl ${isDark ? 'bg-slate-800/50 border border-blue-500/20' : 'bg-white border border-blue-100'} shadow-xl`}>
            <h3 className={`text-2xl font-bold mb-4 flex items-center gap-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <Calendar className="w-6 h-6" />
              {day}
            </h3>
            <div className="space-y-3">
              {lessons.map((lesson, lessonIndex) => (
                <div key={lessonIndex} className={`p-4 rounded-xl ${isDark ? 'bg-slate-900/50' : 'bg-slate-50'}`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className={`font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{lesson.subject}</p>
                      <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{lesson.teacher}</p>
                    </div>
                    <div className={`text-right text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      <p className="flex items-center gap-1 justify-end"><Clock className="w-4 h-4" />{lesson.time}</p>
                      <p>Каб. {lesson.room}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
