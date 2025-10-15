import { motion } from 'framer-motion'
import { Calendar, MapPin, Clock } from 'lucide-react'

interface EventsSectionProps {
  isDark: boolean
}

export default function EventsSection({ isDark }: EventsSectionProps) {
  const events = [
    { id: 1, title: 'День открытых дверей', date: '2025-02-15', time: '10:00', location: 'Главный корпус' },
    { id: 2, title: 'Спортивные соревнования', date: '2025-02-20', time: '14:00', location: 'Спортзал' },
  ]

  return (
    <div className="container mx-auto px-6 py-20">
      <h1 className={`text-4xl font-black mb-12 ${isDark ? 'text-white' : 'text-slate-900'}`}>Мероприятия</h1>
      <div className="space-y-6">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ x: 10 }}
            className={`p-6 rounded-2xl ${isDark ? 'bg-slate-800/50 border border-blue-500/20' : 'bg-white border border-blue-100'} shadow-xl`}
          >
            <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>{event.title}</h3>
            <div className={`flex flex-wrap gap-4 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4" />{event.date}</span>
              <span className="flex items-center gap-2"><Clock className="w-4 h-4" />{event.time}</span>
              <span className="flex items-center gap-2"><MapPin className="w-4 h-4" />{event.location}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
