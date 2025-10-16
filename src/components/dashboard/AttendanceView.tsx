import { motion } from 'framer-motion'
import { Calendar, CheckCircle, XCircle, Clock, BarChart3 } from 'lucide-react'

export default function AttendanceView() {
  
  // Демо-данные посещаемости
  const attendance = [
    { id: '1', date: '2024-10-12', subject: { name: 'Математика' }, status: 'PRESENT', lesson: 1 },
    { id: '2', date: '2024-10-12', subject: { name: 'Информатика' }, status: 'PRESENT', lesson: 2 },
    { id: '3', date: '2024-10-11', subject: { name: 'История' }, status: 'PRESENT', lesson: 1 },
    { id: '4', date: '2024-10-11', subject: { name: 'Физика' }, status: 'ABSENT', lesson: 2, reason: 'Болезнь' },
    { id: '5', date: '2024-10-10', subject: { name: 'Английский' }, status: 'PRESENT', lesson: 1 },
    { id: '6', date: '2024-10-10', subject: { name: 'Математика' }, status: 'PRESENT', lesson: 2 },
    { id: '7', date: '2024-10-09', subject: { name: 'Информатика' }, status: 'LATE', lesson: 1, reason: 'Опоздание' },
    { id: '8', date: '2024-10-09', subject: { name: 'История' }, status: 'PRESENT', lesson: 2 },
  ]

  // Статистика
  const stats = {
    total: attendance.length,
    present: attendance.filter(a => a.status === 'PRESENT').length,
    absent: attendance.filter(a => a.status === 'ABSENT').length,
    late: attendance.filter(a => a.status === 'LATE').length,
  }

  const attendancePercent = ((stats.present / stats.total) * 100).toFixed(1)

  // Группировка по датам
  const groupedByDate = attendance.reduce((acc: any, curr) => {
    const date = curr.date
    if (!acc[date]) acc[date] = []
    acc[date].push(curr)
    return acc
  }, {})

  const getStatusColor = (status: string) => {
    if (status === 'PRESENT') return 'from-green-500 to-emerald-600'
    if (status === 'LATE') return 'from-yellow-500 to-orange-600'
    return 'from-red-500 to-rose-600'
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      'PRESENT': 'Присутствовал',
      'ABSENT': 'Отсутствовал',
      'LATE': 'Опоздал'
    }
    return labels[status] || status
  }

  const getStatusIcon = (status: string) => {
    if (status === 'PRESENT') return <CheckCircle className="w-5 h-5" />
    if (status === 'LATE') return <Clock className="w-5 h-5" />
    return <XCircle className="w-5 h-5" />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect rounded-2xl p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Посещаемость
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              💾 Демо-данные (Backend недоступен)
            </p>
          </div>
          
          <div className="text-right">
            <p className="text-5xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {attendancePercent}%
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Посещаемость</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="stat-card bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">Всего</span>
          </div>
          <span className="text-3xl font-black text-violet-600">{stats.total}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="stat-card bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">Был</span>
          </div>
          <span className="text-3xl font-black text-green-600">{stats.present}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="stat-card bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-red-500 to-rose-600 shadow-lg">
              <XCircle className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">Пропусков</span>
          </div>
          <span className="text-3xl font-black text-red-600">{stats.absent}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="stat-card bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-600 shadow-lg">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">Опозданий</span>
          </div>
          <span className="text-3xl font-black text-orange-600">{stats.late}</span>
        </motion.div>
      </div>

      {/* Attendance List by Date */}
      <div className="space-y-4">
        {Object.entries(groupedByDate).reverse().map(([date, records]: [string, any], dateIndex) => (
          <motion.div
            key={date}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: dateIndex * 0.1 }}
            className="glass-effect rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-5 h-5 text-violet-600" />
              <h3 className="font-bold text-lg">
                {new Date(date).toLocaleDateString('ru-RU', { 
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long'
                })}
              </h3>
            </div>

            <div className="space-y-2">
              {records.map((record: any, index: number) => (
                <div
                  key={record.id || index}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <span className="text-sm font-mono font-bold text-violet-600 min-w-[60px]">
                      {record.lesson} пара
                    </span>
                    <div className="h-8 w-px bg-gray-300 dark:bg-gray-600" />
                    <p className="font-semibold">{record.subject.name}</p>
                  </div>
                  
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r ${getStatusColor(record.status)} text-white shadow-md`}>
                    {getStatusIcon(record.status)}
                    <span className="font-semibold text-sm">{getStatusLabel(record.status)}</span>
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
