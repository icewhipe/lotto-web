import { motion } from 'framer-motion'
import { TrendingUp, Target, Award } from 'lucide-react'

const mockProgress = [
  { subject: 'Математика', current: 4.5, goal: 5.0, progress: 90, color: 'violet' },
  { subject: 'Информатика', current: 5.0, goal: 5.0, progress: 100, color: 'green' },
  { subject: 'История', current: 4.2, goal: 4.5, progress: 93, color: 'blue' },
  { subject: 'Физика', current: 4.8, goal: 5.0, progress: 96, color: 'purple' },
]

const achievements = [
  { label: 'Динамика', value: '+0.3', icon: TrendingUp },
  { label: 'Цели', value: '3/4', icon: Target },
  { label: 'Награды', value: '12', icon: Award },
]

export default function ProgressTracker() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black mb-2">Академический прогресс 📈</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Демо-данные • Аналитика в разработке
        </p>
      </div>

      {/* Achievements */}
      <div className="grid grid-cols-3 gap-4">
        {achievements.map((stat, index) => (
          <div key={stat.label} className="glass-effect rounded-2xl p-6 text-center">
            <stat.icon className="w-8 h-8 mx-auto mb-2 text-violet-600 dark:text-violet-400" />
            <p className="text-3xl font-black mb-1">{stat.value}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Progress by Subject */}
      <div className="glass-effect rounded-2xl p-6 space-y-6">
        <h2 className="text-xl font-bold">Прогресс по предметам</h2>
        
        {mockProgress.map((item, index) => (
          <motion.div
            key={item.subject}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">{item.subject}</span>
              <span className="text-sm">
                <span className="text-violet-600 dark:text-violet-400 font-bold">{item.current}</span>
                <span className="text-gray-400 mx-1">/</span>
                <span className="text-gray-500">{item.goal}</span>
              </span>
            </div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.progress}%` }}
                transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                className={`h-full ${
                  item.color === 'violet' ? 'bg-gradient-to-r from-violet-500 to-purple-600' :
                  item.color === 'green' ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                  item.color === 'blue' ? 'bg-gradient-to-r from-blue-500 to-cyan-600' :
                  'bg-gradient-to-r from-purple-500 to-pink-600'
                }`}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">{item.progress}% к цели</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
