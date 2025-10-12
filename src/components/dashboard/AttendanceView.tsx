import { motion } from 'framer-motion'
import { Calendar, CheckCircle, XCircle, Clock, TrendingUp } from 'lucide-react'
import InDevelopmentOverlay from '../InDevelopmentOverlay'

const mockAttendance = [
  { date: '2025-10-08', subject: 'Математика', status: 'present' },
  { date: '2025-10-08', subject: 'Информатика', status: 'present' },
  { date: '2025-10-07', subject: 'История', status: 'present' },
  { date: '2025-10-07', subject: 'Физика', status: 'late' },
  { date: '2025-10-06', subject: 'Математика', status: 'present' },
  { date: '2025-10-06', subject: 'Английский', status: 'absent' },
]

export default function AttendanceView() {
  return (
    <div className="space-y-6 relative">
      {/* Mock Content (Blurred) */}
      <div className="opacity-60 pointer-events-none">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Посещено', value: '85%', color: 'from-green-500 to-emerald-600', icon: CheckCircle },
            { label: 'Пропущено', value: '10%', color: 'from-red-500 to-rose-600', icon: XCircle },
            { label: 'Опоздания', value: '5%', color: 'from-yellow-500 to-orange-600', icon: Clock },
            { label: 'За месяц', value: '92%', color: 'from-blue-500 to-cyan-600', icon: TrendingUp },
          ].map((stat, index) => (
            <div key={stat.label} className="glass-effect rounded-2xl p-4">
              <div className={`w-12 h-12 mb-3 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-black mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Attendance List */}
        <div className="glass-effect rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">История посещаемости</h2>
          <div className="space-y-2">
            {mockAttendance.map((record, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center gap-3">
                  {record.status === 'present' ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : record.status === 'late' ? (
                    <Clock className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                  <div>
                    <p className="font-semibold">{record.subject}</p>
                    <p className="text-sm text-gray-500">{record.date}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  record.status === 'present' ? 'bg-green-100 text-green-600' :
                  record.status === 'late' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-red-100 text-red-600'
                }`}>
                  {record.status === 'present' ? 'Присутствовал' :
                   record.status === 'late' ? 'Опоздал' : 'Отсутствовал'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Development Overlay */}
      <InDevelopmentOverlay 
        title="Посещаемость в разработке"
        description="Интеграция с RFID системой для автоматической отметки посещаемости через турникеты. Backend готов на 90%!"
      />
    </div>
  )
}
