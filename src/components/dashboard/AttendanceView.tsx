import { motion } from 'framer-motion'
import { Calendar, CheckCircle, XCircle, Clock } from 'lucide-react'

export default function AttendanceView() {
  const mockAttendance = [
    { date: '08.10.2025', subject: 'Математика', status: 'present', time: '09:00' },
    { date: '08.10.2025', subject: 'Информатика', status: 'present', time: '10:45' },
    { date: '07.10.2025', subject: 'История', status: 'late', time: '09:00' },
    { date: '07.10.2025', subject: 'Физика', status: 'present', time: '12:00' },
    { date: '06.10.2025', subject: 'Английский', status: 'absent', time: '10:45' },
    { date: '06.10.2025', subject: 'Математика', status: 'present', time: '13:45' },
  ]

  const stats = [
    { label: 'Посещено', value: '85%', color: 'from-green-500 to-emerald-600' },
    { label: 'Опоздания', value: '5%', color: 'from-yellow-500 to-orange-600' },
    { label: 'Пропуски', value: '10%', color: 'from-red-500 to-rose-600' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black mb-2">Посещаемость 📅</h1>
        <p className="text-gray-600 dark:text-gray-400">Демо-данные</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-effect rounded-2xl p-6 text-center">
            <p className="text-3xl font-black mb-2">{stat.value}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {mockAttendance.map((record, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-effect rounded-2xl p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              {record.status === 'present' ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : record.status === 'late' ? (
                <Clock className="w-6 h-6 text-yellow-500" />
              ) : (
                <XCircle className="w-6 h-6 text-red-500" />
              )}
              <div>
                <p className="font-bold">{record.subject}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {record.date} • {record.time}
                </p>
              </div>
            </div>
            <span className={`px-4 py-2 rounded-xl text-sm font-bold ${
              record.status === 'present' ? 'bg-green-100 text-green-600 dark:bg-green-900/30' :
              record.status === 'late' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30' :
              'bg-red-100 text-red-600 dark:bg-red-900/30'
            }`}>
              {record.status === 'present' ? 'Присутствовал' :
               record.status === 'late' ? 'Опоздал' : 'Отсутствовал'}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
