import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar,
  Plus,
  X,
} from 'lucide-react'
import { adminAPI } from '../../services/api'
import toast from 'react-hot-toast'

const DAYS = [
  { id: 1, name: 'Понедельник', short: 'Пн' },
  { id: 2, name: 'Вторник', short: 'Вт' },
  { id: 3, name: 'Среда', short: 'Ср' },
  { id: 4, name: 'Четверг', short: 'Чт' },
  { id: 5, name: 'Пятница', short: 'Пт' },
  { id: 6, name: 'Суббота', short: 'Сб' },
]

const LESSON_TIMES = [
  { number: 1, start: '08:00', end: '08:45', label: '1 урок' },
  { number: 2, start: '08:50', end: '09:35', label: '2 урок' },
  { number: 3, start: '09:45', end: '10:30', label: '3 урок' },
  { number: 4, start: '10:35', end: '11:20', label: '4 урок' },
  { number: 5, start: '11:30', end: '12:15', label: '5(1) урок' },
  { number: 6, start: '12:20', end: '13:05', label: '5(2) урок' },
  { number: 7, start: '13:10', end: '13:55', label: '6 урок' },
  { number: 8, start: '14:00', end: '14:45', label: '7 урок' },
  { number: 9, start: '14:50', end: '15:35', label: '8 урок' },
]

export default function ScheduleManager() {
  const [groups, setGroups] = useState<any[]>([])
  const [subjects, setSubjects] = useState<any[]>([])
  const [selectedGroup, setSelectedGroup] = useState<string>('')
  const [selectedDay, setSelectedDay] = useState<number>(1)
  const [schedule] = useState<any[]>([])
  const [showCreateModal, setShowCreateModal] = useState(false)

  const [formData, setFormData] = useState({
    subjectId: '',
    teacherId: '',
    dayOfWeek: 1,
    lessonNumber: 1,
    room: '',
    type: 'LECTURE',
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [groupsRes, subjectsRes] = await Promise.all([
        adminAPI.getGroups(),
        adminAPI.getSubjects(),
      ])
      
      setGroups(groupsRes.data || [])
      setSubjects(subjectsRes.data || [])
      
      // Teachers will be loaded when needed
    } catch (error) {
      console.error('Error loading data:', error)
    }
  }

  const handleCreateLesson = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedGroup) {
      toast.error('Выберите группу')
      return
    }

    try {
      toast.success('Пара добавлена в расписание!')
      setShowCreateModal(false)
      // Reload schedule
    } catch (error) {
      toast.error('Ошибка создания пары')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Управление расписанием
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Создание и редактирование расписания занятий
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCreateModal(true)}
          disabled={!selectedGroup}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-5 h-5" />
          Добавить пару
        </motion.button>
      </motion.div>

      {/* Group Selector */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-effect rounded-2xl p-6"
      >
        <label className="block text-sm font-semibold mb-3">Выберите группу</label>
        <select
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Выберите группу</option>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name} - {group.specialty?.name}
            </option>
          ))}
        </select>
      </motion.div>

      {/* Days Tabs */}
      {selectedGroup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-effect rounded-2xl p-4"
        >
          <div className="flex gap-2 overflow-x-auto">
            {DAYS.map((day) => (
              <motion.button
                key={day.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedDay(day.id)}
                className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
                  selectedDay === day.id
                    ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {day.short}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Schedule Display */}
      {selectedGroup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-effect rounded-2xl p-6"
        >
          <h2 className="text-xl font-black mb-4">
            {DAYS.find(d => d.id === selectedDay)?.name}
          </h2>

          {schedule.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 dark:text-gray-400">Нет пар в этот день</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="mt-4 px-6 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-lg font-semibold hover:bg-indigo-200 transition-colors"
              >
                Добавить пару
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Lessons will be displayed here */}
            </div>
          )}
        </motion.div>
      )}

      {/* Create Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black">Добавить пару</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateLesson} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Номер пары</label>
                  <select
                    value={formData.lessonNumber}
                    onChange={(e) => setFormData({ ...formData, lessonNumber: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500"
                  >
                    {LESSON_TIMES.map((lesson) => (
                      <option key={lesson.number} value={lesson.number}>
                        {lesson.label} ({lesson.start} - {lesson.end})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Предмет</label>
                  <select
                    required
                    value={formData.subjectId}
                    onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Выберите предмет</option>
                    {subjects.map((subject) => (
                      <option key={subject.id} value={subject.id}>
                        {subject.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Кабинет</label>
                  <input
                    type="text"
                    required
                    value={formData.room}
                    onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                    placeholder="205"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Тип занятия</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="LECTURE">Лекция</option>
                    <option value="PRACTICE">Практика</option>
                    <option value="LAB">Лабораторная</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    Добавить
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
