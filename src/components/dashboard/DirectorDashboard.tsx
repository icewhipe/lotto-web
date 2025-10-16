import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users, TrendingUp, GraduationCap, BookOpen, DollarSign,
  Award, Target, BarChart3, PieChart, Activity, AlertCircle,
  Calendar, FileText, Bell, ArrowRight, Crown,
  School, Briefcase, TrendingDown
} from 'lucide-react'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
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
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default function DirectorDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month')

  // Общая статистика техникума
  const stats = [
    { 
      label: 'Всего студентов', 
      value: '1,247', 
      change: '+85', 
      trend: 'up',
      icon: GraduationCap, 
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20'
    },
    { 
      label: 'Преподавателей', 
      value: '87', 
      change: '+3', 
      trend: 'up',
      icon: Users, 
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20'
    },
    { 
      label: 'Средний балл', 
      value: '4.2', 
      change: '+0.1', 
      trend: 'up',
      icon: TrendingUp, 
      color: 'from-violet-500 to-purple-600',
      bgColor: 'from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20'
    },
    { 
      label: 'Посещаемость', 
      value: '89%', 
      change: '-2%', 
      trend: 'down',
      icon: Calendar, 
      color: 'from-orange-500 to-red-600',
      bgColor: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20'
    },
    { 
      label: 'Специальностей', 
      value: '12', 
      change: '+1', 
      trend: 'up',
      icon: BookOpen, 
      color: 'from-pink-500 to-rose-600',
      bgColor: 'from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20'
    },
    { 
      label: 'Учебных групп', 
      value: '48', 
      change: '+4', 
      trend: 'up',
      icon: School, 
      color: 'from-indigo-500 to-blue-600',
      bgColor: 'from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20'
    },
    { 
      label: 'Абитуриентов', 
      value: '324', 
      change: '+54', 
      trend: 'up',
      icon: Target, 
      color: 'from-teal-500 to-cyan-600',
      bgColor: 'from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20'
    },
    { 
      label: 'Бюджет (млн ₽)', 
      value: '24.5', 
      change: '+3.2', 
      trend: 'up',
      icon: DollarSign, 
      color: 'from-yellow-500 to-amber-600',
      bgColor: 'from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20'
    },
  ]

  // График динамики успеваемости
  const performanceData = {
    labels: ['Сент', 'Окт', 'Нояб', 'Дек', 'Янв', 'Фев', 'Март', 'Апр', 'Май'],
    datasets: [
      {
        label: 'Средний балл',
        data: [4.0, 4.1, 4.0, 4.2, 4.1, 4.2, 4.3, 4.2, 4.2],
        borderColor: 'rgb(139, 92, 246)',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: 'Посещаемость (%)',
        data: [92, 91, 90, 89, 88, 90, 89, 90, 89],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 7,
      }
    ]
  }

  // График по специальностям
  const specialtiesData = {
    labels: ['ПКС', 'ИС', 'ЭК', 'ТО', 'СА', 'РТ'],
    datasets: [
      {
        label: 'Средний балл',
        data: [4.3, 4.5, 4.1, 4.0, 4.2, 4.4],
        backgroundColor: [
          'rgba(139, 92, 246, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(251, 146, 60, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(14, 165, 233, 0.8)',
        ],
        borderColor: [
          'rgb(139, 92, 246)',
          'rgb(59, 130, 246)',
          'rgb(34, 197, 94)',
          'rgb(251, 146, 60)',
          'rgb(236, 72, 153)',
          'rgb(14, 165, 233)',
        ],
        borderWidth: 2,
      }
    ]
  }

  // Распределение студентов по курсам
  const studentsDistribution = {
    labels: ['1 курс', '2 курс', '3 курс', '4 курс'],
    datasets: [
      {
        data: [380, 340, 310, 217],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(251, 146, 60, 0.8)',
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(139, 92, 246)',
          'rgb(236, 72, 153)',
          'rgb(251, 146, 60)',
        ],
        borderWidth: 2,
      }
    ]
  }

  // Топ-5 групп
  const topGroups = [
    { name: 'ИС-31', avgGrade: 4.7, students: 28, attendance: 95 },
    { name: 'ПКС-21', avgGrade: 4.5, students: 30, attendance: 93 },
    { name: 'РТ-41', avgGrade: 4.4, students: 25, attendance: 91 },
    { name: 'ЭК-22', avgGrade: 4.3, students: 27, attendance: 94 },
    { name: 'СА-31', avgGrade: 4.2, students: 26, attendance: 90 },
  ]

  // Топ-10 студентов
  const topStudents = [
    { name: 'Иванов Иван', group: 'ИС-31', avgGrade: 4.9 },
    { name: 'Петрова Мария', group: 'ПКС-21', avgGrade: 4.9 },
    { name: 'Сидоров Петр', group: 'РТ-41', avgGrade: 4.8 },
    { name: 'Козлова Анна', group: 'ИС-31', avgGrade: 4.8 },
    { name: 'Смирнов Алексей', group: 'ЭК-22', avgGrade: 4.7 },
  ]

  // Проблемные зоны
  const issues = [
    { type: 'danger', text: 'Посещаемость снизилась на 2% за месяц', icon: TrendingDown },
    { type: 'warning', text: 'В группе ТО-11 средний балл 3.5', icon: AlertCircle },
    { type: 'warning', text: '12 студентов имеют задолженности', icon: AlertCircle },
    { type: 'info', text: 'Поступило 54 новых заявки от абитуриентов', icon: Users },
  ]

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 12,
            weight: 600 as any
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 15,
          font: {
            size: 12,
            weight: 600 as any
          }
        }
      }
    },
    cutout: '70%'
  }

  return (
    <div className="space-y-6">
      {/* Приветственный баннер */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative overflow-hidden bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-500 rounded-3xl p-8 text-white shadow-2xl`}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-400/20 rounded-full blur-2xl" />
        
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-5xl shadow-lg ring-4 ring-white/30">
              <Crown className="w-14 h-14" />
            </div>
            
            <div>
              <h1 className="text-4xl font-black mb-2 flex items-center gap-3">
                Панель директора
                <span className="animate-wave inline-block">👨‍💼</span>
              </h1>
              <div className="flex items-center gap-4 text-white/90">
                <span className="flex items-center gap-2">
                  <School className="w-4 h-4" />
                  Лискинский промышленно-транспортный техникум
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  2024-2025 учебный год
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl transition-all">
              <Bell className="w-5 h-5" />
            </button>
            <button className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl transition-all flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span className="font-semibold">Отчёты</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Период */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black">Общая статистика</h2>
        <div className="flex gap-2 glass-effect rounded-xl p-1">
          {(['week', 'month', 'year'] as const).map(period => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                selectedPeriod === period
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-lg'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {period === 'week' ? 'Неделя' : period === 'month' ? 'Месяц' : 'Год'}
            </button>
          ))}
        </div>
      </div>

      {/* Основная статистика - сетка 4x2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`stat-card bg-gradient-to-br ${stat.bgColor}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-bold ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? '↑' : '↓'} {stat.change}
              </div>
            </div>
            <p className="text-3xl font-black mb-1">{stat.value}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Проблемные зоны */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-effect rounded-2xl p-6"
      >
        <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-orange-600" />
          Требуют внимания
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
          {issues.map((issue, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border-2 flex items-center gap-3 ${
                issue.type === 'danger' 
                  ? 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20'
                  : issue.type === 'warning'
                  ? 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20'
                  : 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20'
              }`}
            >
              <issue.icon className={`w-5 h-5 ${
                issue.type === 'danger' ? 'text-red-600' :
                issue.type === 'warning' ? 'text-yellow-600' :
                'text-blue-600'
              }`} />
              <p className="text-sm font-semibold">{issue.text}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Графики - основная сетка */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* График динамики */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-effect rounded-2xl p-6"
        >
          <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
            <Activity className="w-6 h-6 text-violet-600" />
            Динамика показателей
          </h3>
          <div className="h-80">
            <Line data={performanceData} options={chartOptions} />
          </div>
        </motion.div>

        {/* График по специальностям */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-effect rounded-2xl p-6"
        >
          <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            Средний балл по специальностям
          </h3>
          <div className="h-80">
            <Bar data={specialtiesData} options={chartOptions} />
          </div>
        </motion.div>

        {/* Топ-5 групп */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-effect rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-xl flex items-center gap-2">
              <Award className="w-6 h-6 text-amber-600" />
              Топ-5 групп
            </h3>
          </div>
          <div className="space-y-3">
            {topGroups.map((group, index) => (
              <div
                key={group.name}
                className="flex items-center gap-4 p-3 rounded-xl bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center text-white font-black shadow-lg">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-bold">{group.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {group.students} студентов • {group.attendance}% посещаемость
                  </p>
                </div>
                <div className="text-2xl font-black text-amber-600">
                  {group.avgGrade}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Распределение студентов */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="glass-effect rounded-2xl p-6"
        >
          <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
            <PieChart className="w-6 h-6 text-pink-600" />
            Распределение по курсам
          </h3>
          <div className="h-64">
            <Doughnut data={studentsDistribution} options={doughnutOptions} />
          </div>
        </motion.div>
      </div>

      {/* Топ-10 студентов */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="glass-effect rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-xl flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-600" />
            Топ-10 студентов техникума
          </h3>
          <button className="text-sm text-amber-600 hover:text-amber-700 font-semibold flex items-center gap-1">
            Смотреть всех <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-3">
          {topStudents.map((student, index) => (
            <div
              key={student.name}
              className="p-4 rounded-xl bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 text-center hover:scale-105 transition-transform"
            >
              <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-black shadow-lg">
                {index + 1}
              </div>
              <p className="font-bold text-sm mb-1">{student.name}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{student.group}</p>
              <p className="text-xl font-black text-violet-600">{student.avgGrade}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Быстрые действия */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="grid md:grid-cols-4 gap-4"
      >
        <button className="btn-director flex items-center justify-center gap-2">
          <FileText className="w-5 h-5" />
          Сформировать отчёт
        </button>
        <button className="btn-director flex items-center justify-center gap-2">
          <Users className="w-5 h-5" />
          Управление персоналом
        </button>
        <button className="btn-director flex items-center justify-center gap-2">
          <Briefcase className="w-5 h-5" />
          Финансовые показатели
        </button>
        <button className="btn-director flex items-center justify-center gap-2">
          <Target className="w-5 h-5" />
          Стратегические цели
        </button>
      </motion.div>
    </div>
  )
}

// Добавляем иконку Trophy если её нет
function Trophy({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  )
}
