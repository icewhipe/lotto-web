import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CalendarProps {
  isDark: boolean
  onClose: () => void
}

export default function Calendar({ isDark, onClose }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ]

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
    return day === 0 ? 6 : day - 1 // Convert Sunday (0) to 6
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`p-6 rounded-3xl ${
        isDark ? 'bg-slate-800 border-2 border-blue-500/30' : 'bg-white border-2 border-blue-200'
      } shadow-2xl max-w-sm`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={previousMonth}
          className={`p-2 rounded-xl ${
            isDark ? 'hover:bg-blue-500/20 text-slate-300' : 'hover:bg-blue-50 text-slate-700'
          } transition-all`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>

        <button
          onClick={nextMonth}
          className={`p-2 rounded-xl ${
            isDark ? 'hover:bg-blue-500/20 text-slate-300' : 'hover:bg-blue-50 text-slate-700'
          } transition-all`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Weekday names */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
          <div
            key={day}
            className={`text-center text-xs font-bold ${
              isDark ? 'text-slate-500' : 'text-slate-600'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {emptyDays.map((i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}
        {days.map((day) => {
          const isToday =
            day === new Date().getDate() &&
            currentDate.getMonth() === new Date().getMonth() &&
            currentDate.getFullYear() === new Date().getFullYear()

          return (
            <motion.button
              key={day}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
                isToday
                  ? 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-lg'
                  : isDark
                  ? 'hover:bg-blue-500/20 text-slate-300'
                  : 'hover:bg-blue-50 text-slate-700'
              }`}
            >
              {day}
            </motion.button>
          )
        })}
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="mt-6 w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold hover:shadow-xl transition-all"
      >
        Закрыть
      </button>
    </motion.div>
  )
}
