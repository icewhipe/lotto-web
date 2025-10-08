import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, CheckCircle, XCircle, Clock, TrendingUp } from 'lucide-react'

interface AttendanceRecord {
  date: string
  subject: string
  status: 'present' | 'absent' | 'late'
  reason?: string
}

const attendanceData: AttendanceRecord[] = [
  { date: '2025-10-07', subject: 'Математика', status: 'present' },
  { date: '2025-10-07', subject: 'Информатика', status: 'present' },
  { date: '2025-10-07', subject: 'История', status: 'late', reason: 'Опоздание на 10 минут' },
  { date: '2025-10-06', subject: 'Математика', status: 'present' },
  { date: '2025-10-06', subject: 'Физика', status: 'absent', reason: 'Уважительная причина (справка)' },
  { date: '2025-10-06', subject: 'Английский', status: 'present' },
  { date: '2025-10-05', subject: 'История', status: 'present' },
  { date: '2025-10-05', subject: 'Информатика', status: 'present' },
]

const statusConfig = {
  present: {
    label: 'Присутствовал',
    icon: CheckCircle,
    color: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-100 dark:bg-green-900/30',
  },
  absent: {
    label: 'Отсутствовал',
    icon: XCircle,
    color: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-100 dark:bg-red-900/30',
  },
  late: {
    label: 'Опоздание',
    icon: Clock,
    color: 'text-yellow-600 dark:text-yellow-400',
    bg: 'bg-yellow-100 dark:bg-yellow-900/30',
  },
}

export default function AttendanceView() {
  const [filter, setFilter] = useState<'all' | 'present' | 'absent' | 'late'>('all')

  const filteredData = filter === 'all' 
    ? attendanceData 
    : attendanceData.filter(record => record.status === filter)

  const stats = {
    total: attendanceData.length,
    present: attendanceData.filter(r => r.status === 'present').length,
    absent: attendanceData.filter(r => r.status === 'absent').length,
    late: attendanceData.filter(r => r.status === 'late').length,
  }

  const attendanceRate = ((stats.present + stats.late) / stats.total * 100).toFixed(1)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black mb-2">Посещаемость</h1>
          <p className="text-gray-600 dark:text-gray-400">
            История посещений за последний месяц
          </p>
        </div>

        <div className="glass-effect rounded-2xl p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-3xl font-black">{attendanceRate}%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Посещаемость</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-effect rounded-2xl p-4">
          <p className="text-2xl font-black mb-1">{stats.total}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Всего занятий</p>
        </div>
        
        <div className="glass-effect rounded-2xl p-4">
          <p className="text-2xl font-black text-green-600 dark:text-green-400 mb-1">{stats.present}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Присутствовал</p>
        </div>
        
        <div className="glass-effect rounded-2xl p-4">
          <p className="text-2xl font-black text-yellow-600 dark:text-yellow-400 mb-1">{stats.late}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Опозданий</p>
        </div>
        
        <div className="glass-effect rounded-2xl p-4">
          <p className="text-2xl font-black text-red-600 dark:text-red-400 mb-1">{stats.absent}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Пропусков</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {(['all', 'present', 'absent', 'late'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
              filter === status
                ? 'bg-gradient-to-r from-primary-500 to-purple-600 text-white shadow-lg'
                : 'glass-effect hover:shadow-lg'
            }`}
          >
            {status === 'all' ? 'Все' : statusConfig[status].label}
          </button>
        ))}
      </div>

      {/* Attendance List */}
      <div className="space-y-3">
        {filteredData.map((record, index) => {
          const config = statusConfig[record.status]
          const Icon = config.icon

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-effect rounded-2xl p-4"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${config.bg}`}>
                  <Icon className={`w-6 h-6 ${config.color}`} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold">{record.subject}</h3>
                    <span className={`text-sm font-semibold ${config.color}`}>
                      {config.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{record.date}</span>
                    </div>
                    {record.reason && (
                      <span className="italic">{record.reason}</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
