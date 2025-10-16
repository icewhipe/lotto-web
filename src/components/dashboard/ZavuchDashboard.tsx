import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Calendar, Users, FileText, AlertCircle,
  Edit2, Plus, Settings, Search,
  Award, Activity, Bell, ClipboardCheck,
  UserCheck, BarChart3
} from 'lucide-react'
import { Bar, Line } from 'react-chartjs-2'

export default function ZavuchDashboard() {
  const [selectedTab, setSelectedTab] = useState<'schedule' | 'groups' | 'teachers'>('schedule')

  // Статистика
  const stats = [
    { label: 'Учебных групп', value: '48', icon: Users, color: 'from-green-500 to-emerald-600', change: '+4' },
    { label: 'Преподавателей', value: '87', icon: UserCheck, color: 'from-blue-500 to-cyan-600', change: '+3' },
    { label: 'Замен на неделе', value: '12', icon: Calendar, color: 'from-orange-500 to-red-600', change: '+5' },
    { label: 'Должников', value: '23', icon: AlertCircle, color: 'from-red-500 to-rose-600', change: '-3' },
  ]

  // Группы требующие внимания
  const problemGroups = [
    { name: 'ТО-11', issue: 'Низкая успеваемость', avgGrade: 3.5, attendance: 78, priority: 'high' },
    { name: 'СА-21', issue: 'Много пропусков', avgGrade: 4.1, attendance: 72, priority: 'high' },
    { name: 'ПКС-31', issue: 'Задолженности', avgGrade: 3.8, attendance: 85, priority: 'medium' },
    { name: 'РТ-22', issue: 'Проблемы с дисциплиной', avgGrade: 3.9, attendance: 81, priority: 'medium' },
  ]

  // Замены на сегодня
  const todayReplacements = [
    { time: '09:00', teacher: 'Иванова М.П.', replacement: 'Петров А.С.', group: 'ИС-21', subject: 'Математика', room: '205', reason: 'Больничный' },
    { time: '10:45', teacher: 'Сидорова Е.В.', replacement: 'Козлова Н.П.', group: 'ПКС-22', subject: 'История', room: '301', reason: 'Отпуск' },
    { time: '12:30', teacher: 'Новиков И.И.', replacement: 'Смирнов В.И.', group: 'РТ-31', subject: 'Физика', room: '401', reason: 'Командировка' },
  ]

  // Нагрузка преподавателей
  const teachersLoad = [
    { name: 'Петров А.С.', hours: 42, maxHours: 36, groups: 6, overload: true },
    { name: 'Иванова М.П.', hours: 36, maxHours: 36, groups: 5, overload: false },
    { name: 'Сидорова Е.В.', hours: 28, maxHours: 36, groups: 4, overload: false },
    { name: 'Козлова Н.П.', hours: 32, maxHours: 36, groups: 4, overload: false },
    { name: 'Смирнов В.И.', hours: 38, maxHours: 36, groups: 5, overload: true },
  ]

  // График успеваемости по группам
  const groupsPerformanceData = {
    labels: ['ИС-31', 'ПКС-21', 'РТ-41', 'ЭК-22', 'СА-31', 'ТО-11'],
    datasets: [
      {
        label: 'Средний балл',
        data: [4.7, 4.5, 4.4, 4.3, 4.2, 3.5],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(251, 146, 60, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgb(34, 197, 94)',
          'rgb(59, 130, 246)',
          'rgb(139, 92, 246)',
          'rgb(251, 146, 60)',
          'rgb(236, 72, 153)',
          'rgb(239, 68, 68)',
        ],
        borderWidth: 2,
      }
    ]
  }

  // График посещаемости
  const attendanceData = {
    labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    datasets: [
      {
        label: 'Посещаемость (%)',
        data: [92, 89, 91, 88, 87, 85],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
        fill: true,
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
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

  return (
    <div className="space-y-6">
      {/* Приветственный баннер */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-3xl p-8 text-white shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-400/20 rounded-full blur-2xl" />
        
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-5xl shadow-lg ring-4 ring-white/30">
              📚
            </div>
            
            <div>
              <h1 className="text-4xl font-black mb-2 flex items-center gap-3">
                Панель заместителя директора
                <span className="animate-wave inline-block">👨‍💼</span>
              </h1>
              <div className="flex items-center gap-4 text-white/90">
                <span className="flex items-center gap-2">
                  <ClipboardCheck className="w-4 h-4" />
                  Управление учебным процессом
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  2024-2025 учебный год
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="relative p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl transition-all">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center font-bold">
                5
              </span>
            </button>
            <button className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl transition-all flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="font-semibold">Настройки</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="stat-card bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              {stat.change && (
                <span className="text-sm font-bold text-green-600">{stat.change}</span>
              )}
            </div>
            <p className="text-3xl font-black mb-1">{stat.value}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Табы */}
      <div className="flex gap-2 glass-effect rounded-xl p-1">
        {[
          { id: 'schedule', label: 'Расписание и замены', icon: Calendar },
          { id: 'groups', label: 'Контроль групп', icon: Users },
          { id: 'teachers', label: 'Нагрузка преподавателей', icon: UserCheck },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id as any)}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
              selectedTab === tab.id
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Контент табов */}
      <div className="grid lg:grid-cols-3 gap-6">
        {selectedTab === 'schedule' && (
          <>
            {/* Замены на сегодня */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 glass-effect rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-xl flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-green-600" />
                  Замены на сегодня
                </h3>
                <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Добавить замену
                </button>
              </div>
              
              <div className="space-y-3">
                {todayReplacements.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-2 border-orange-200 dark:border-orange-800"
                  >
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-sm font-mono font-bold text-orange-600">{item.time}</span>
                      <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-xs font-bold">
                        {item.reason}
                      </span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Замещаемый:</p>
                        <p className="font-bold text-red-600">{item.teacher}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Замена:</p>
                        <p className="font-bold text-green-600">{item.replacement}</p>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                      <span className="font-semibold">{item.subject}</span> • {item.group} • Каб. {item.room}
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 p-3 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl text-gray-600 dark:text-gray-400 hover:border-green-500 hover:text-green-600 transition-all flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" />
                Запланировать замену
              </button>
            </motion.div>

            {/* Быстрые действия */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="glass-effect rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-4">Расписание</h3>
                <div className="space-y-2">
                  <button className="w-full p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                    <Edit2 className="w-4 h-4" />
                    Редактировать
                  </button>
                  <button className="w-full p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                    <FileText className="w-4 h-4" />
                    Экспорт в Excel
                  </button>
                  <button className="w-full p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Сформировать на семестр
                  </button>
                </div>
              </div>

              <div className="glass-effect rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-4">Поиск</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Найти группу, преподавателя..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-green-500 outline-none transition-colors"
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}

        {selectedTab === 'groups' && (
          <>
            {/* Проблемные группы */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 glass-effect rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-xl flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                  Группы требующие внимания
                </h3>
              </div>
              
              <div className="space-y-3">
                {problemGroups.map((group, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border-2 ${
                      group.priority === 'high'
                        ? 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20'
                        : 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-black text-lg">{group.name}</h4>
                        <p className="text-sm font-semibold text-red-600">{group.issue}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        group.priority === 'high'
                          ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                          : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                      }`}>
                        {group.priority === 'high' ? 'Критично' : 'Важно'}
                      </span>
                    </div>
                    <div className="flex gap-6">
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Средний балл</p>
                        <p className="text-2xl font-black text-orange-600">{group.avgGrade}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Посещаемость</p>
                        <p className="text-2xl font-black text-blue-600">{group.attendance}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* График успеваемости */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-effect rounded-2xl p-6"
            >
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-green-600" />
                Успеваемость групп
              </h3>
              <div className="h-80">
                <Bar data={groupsPerformanceData} options={chartOptions} />
              </div>
            </motion.div>
          </>
        )}

        {selectedTab === 'teachers' && (
          <>
            {/* Нагрузка преподавателей */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-3 glass-effect rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-xl flex items-center gap-2">
                  <UserCheck className="w-6 h-6 text-green-600" />
                  Нагрузка преподавателей
                </h3>
                <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Назначить на занятие
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                      <th className="text-left p-3 font-bold">Преподаватель</th>
                      <th className="text-center p-3 font-bold">Часов</th>
                      <th className="text-center p-3 font-bold">Норма</th>
                      <th className="text-center p-3 font-bold">Групп</th>
                      <th className="text-center p-3 font-bold">Статус</th>
                      <th className="text-right p-3 font-bold">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachersLoad.map((teacher, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
                      >
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold">
                              {teacher.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="font-semibold">{teacher.name}</span>
                          </div>
                        </td>
                        <td className="text-center p-3">
                          <span className="text-xl font-black">{teacher.hours}</span>
                        </td>
                        <td className="text-center p-3 text-gray-600 dark:text-gray-400">
                          {teacher.maxHours}
                        </td>
                        <td className="text-center p-3">
                          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg font-bold">
                            {teacher.groups}
                          </span>
                        </td>
                        <td className="text-center p-3">
                          {teacher.overload ? (
                            <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm font-bold">
                              Перегрузка
                            </span>
                          ) : (
                            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-sm font-bold">
                              Норма
                            </span>
                          )}
                        </td>
                        <td className="text-right p-3">
                          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                            <Edit2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </>
        )}

        {selectedTab === 'groups' && (
          <>
            {/* График посещаемости */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-effect rounded-2xl p-6"
            >
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-600" />
                Посещаемость за неделю
              </h3>
              <div className="h-64">
                <Line data={attendanceData} options={chartOptions} />
              </div>
            </motion.div>
          </>
        )}
      </div>

      {/* Быстрые действия */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid md:grid-cols-4 gap-4"
      >
        <button className="btn-zavuch flex items-center justify-center gap-2">
          <Calendar className="w-5 h-5" />
          Составить расписание
        </button>
        <button className="btn-zavuch flex items-center justify-center gap-2">
          <ClipboardCheck className="w-5 h-5" />
          Проверить успеваемость
        </button>
        <button className="btn-zavuch flex items-center justify-center gap-2">
          <FileText className="w-5 h-5" />
          Отчёт по учебному плану
        </button>
        <button className="btn-zavuch flex items-center justify-center gap-2">
          <Award className="w-5 h-5" />
          Допуск к экзаменам
        </button>
      </motion.div>
    </div>
  )
}
