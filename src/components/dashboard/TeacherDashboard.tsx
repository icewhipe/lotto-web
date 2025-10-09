import { motion } from 'framer-motion'
import { 
  Users, 
  BookOpen, 
  Calendar, 
  FileText,
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react'

const myGroups = [
  { id: 1, name: 'ИС-21', students: 28, subject: 'Программирование', nextLesson: 'Сегодня, 14:00' },
  { id: 2, name: 'ИС-22', students: 25, subject: 'Базы данных', nextLesson: 'Завтра, 10:00' },
  { id: 3, name: 'АТ-21', students: 30, subject: 'Программирование', nextLesson: 'Завтра, 14:00' },
]

const stats = [
  {
    title: 'Моих групп',
    value: '3',
    icon: Users,
    color: 'from-violet-500 to-purple-600',
    bgColor: 'bg-violet-100 dark:bg-violet-900/20'
  },
  {
    title: 'Студентов',
    value: '83',
    icon: Users,
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20'
  },
  {
    title: 'Занятий в неделю',
    value: '18',
    icon: Calendar,
    color: 'from-pink-500 to-rose-600',
    bgColor: 'bg-pink-100 dark:bg-pink-900/20'
  },
  {
    title: 'Ср. посещаемость',
    value: '94%',
    icon: TrendingUp,
    color: 'from-emerald-500 to-green-600',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/20'
  }
]

const recentActivities = [
  {
    id: 1,
    type: 'grade',
    text: 'Выставлены оценки группе ИС-21',
    time: '10 минут назад',
    icon: CheckCircle,
    color: 'text-emerald-600 dark:text-emerald-400'
  },
  {
    id: 2,
    type: 'lesson',
    text: 'Проведено занятие: Базы данных',
    time: '2 часа назад',
    icon: BookOpen,
    color: 'text-blue-600 dark:text-blue-400'
  },
  {
    id: 3,
    type: 'homework',
    text: 'Новое задание для ИС-22',
    time: 'Вчера, 18:00',
    icon: FileText,
    color: 'text-purple-600 dark:text-purple-400'
  }
]

const todaySchedule = [
  { time: '09:00 - 10:30', subject: 'Программирование', group: 'ИС-21', room: 'Каб. 205', status: 'completed' },
  { time: '11:00 - 12:30', subject: 'Базы данных', group: 'ИС-22', room: 'Каб. 301', status: 'completed' },
  { time: '14:00 - 15:30', subject: 'Программирование', group: 'АТ-21', room: 'Каб. 205', status: 'upcoming' },
]

export default function TeacherDashboard() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-black bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
          Панель преподавателя
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Добро пожаловать! Управляйте своими группами и занятиями
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="glass-effect rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50 cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-2">
                  {stat.title}
                </p>
                <h3 className="text-3xl font-black bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  {stat.value}
                </h3>
              </div>
              
              <div className={`p-3 rounded-2xl ${stat.bgColor}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Today's Schedule & Groups */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-effect rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black">Расписание на сегодня</h2>
            <Calendar className="w-6 h-6 text-violet-600 dark:text-violet-400" />
          </div>

          <div className="space-y-3">
            {todaySchedule.map((lesson, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-2xl border-2 ${
                  lesson.status === 'completed'
                    ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/10'
                    : 'border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-violet-900/10'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                        {lesson.time}
                      </span>
                      {lesson.status === 'completed' && (
                        <span className="px-2 py-0.5 bg-emerald-500 text-white text-xs font-bold rounded-full">
                          Проведено
                        </span>
                      )}
                      {lesson.status === 'upcoming' && (
                        <span className="px-2 py-0.5 bg-violet-500 text-white text-xs font-bold rounded-full">
                          Предстоит
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                      {lesson.subject}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Группа {lesson.group} • {lesson.room}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* My Groups */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-effect rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black">Мои группы</h2>
            <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>

          <div className="space-y-3">
            {myGroups.map((group, index) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 border border-blue-200 dark:border-blue-800 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-black text-gray-900 dark:text-white">
                      {group.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {group.subject}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-blue-600 text-white text-sm font-bold rounded-full">
                    {group.students} чел.
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  Следующее занятие: {group.nextLesson}
                </div>
              </motion.div>
            ))}
          </div>

          <button className="w-full mt-4 py-3 text-sm font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-xl transition-colors">
            Открыть журнал →
          </button>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black">Последняя активность</h2>
          <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        </div>

        <div className="space-y-3">
          {recentActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 p-4 rounded-2xl hover:bg-violet-50 dark:hover:bg-violet-900/10 transition-colors"
            >
              <div className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800">
                <activity.icon className={`w-5 h-5 ${activity.color}`} />
              </div>
              
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">
                  {activity.text}
                </p>
                <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
