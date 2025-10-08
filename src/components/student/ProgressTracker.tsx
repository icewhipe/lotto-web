import { motion } from 'framer-motion'
import { TrendingUp, Award, Target, Calendar } from 'lucide-react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const mockData = {
  labels: ['Сен', 'Окт', 'Ноя', 'Дек', 'Янв', 'Фев', 'Мар', 'Апр'],
  datasets: [
    {
      label: 'Средний балл',
      data: [4.2, 4.3, 4.1, 4.5, 4.6, 4.4, 4.7, 4.8],
      borderColor: 'rgb(102, 126, 234)',
      backgroundColor: 'rgba(102, 126, 234, 0.1)',
      fill: true,
      tension: 0.4,
    },
  ],
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: false,
      min: 3,
      max: 5,
    },
  },
}

export default function ProgressTracker() {
  const stats = [
    {
      icon: TrendingUp,
      title: 'Прогресс',
      value: '+0.6',
      description: 'За последний семестр',
      color: 'from-green-500 to-emerald-600',
    },
    {
      icon: Award,
      title: 'Рейтинг',
      value: '15/150',
      description: 'Место в группе',
      color: 'from-yellow-500 to-orange-600',
    },
    {
      icon: Target,
      title: 'Цель',
      value: '4.8',
      description: 'Средний балл к концу года',
      color: 'from-primary-500 to-purple-600',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-black gradient-text">Трекер успеваемости</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Следите за своим прогрессом</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-effect rounded-3xl p-6"
            >
              <div className={`w-14 h-14 mb-4 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              <div className="text-3xl font-black mb-1">{stat.value}</div>
              <div className="font-semibold mb-1">{stat.title}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.description}</div>
            </motion.div>
          )
        })}
      </div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-effect rounded-3xl p-6"
      >
        <h3 className="text-xl font-bold mb-6">Динамика успеваемости</h3>
        <div className="h-64">
          <Line data={mockData} options={options} />
        </div>
      </motion.div>

      {/* Subjects Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-effect rounded-3xl p-6"
      >
        <h3 className="text-xl font-bold mb-6">Прогресс по предметам</h3>
        <div className="space-y-4">
          {[
            { subject: 'Математика', score: 4.8, progress: 96 },
            { subject: 'Физика', score: 4.5, progress: 90 },
            { subject: 'Информатика', score: 5.0, progress: 100 },
            { subject: 'История', score: 4.2, progress: 84 },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">{item.subject}</span>
                <span className="text-sm font-bold text-primary-600 dark:text-primary-400">{item.score}</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary-500 to-purple-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${item.progress}%` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
