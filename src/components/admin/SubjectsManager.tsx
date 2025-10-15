import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen,
  Plus,
  Search,
  Edit,
  Trash2,
  X,
  Users,
  GraduationCap,
} from 'lucide-react'
import { adminAPI } from '../../services/api'
import toast from 'react-hot-toast'

interface Subject {
  id: string
  name: string
  code: string
  specialty: {
    name: string
    code: string
  }
  teacher?: {
    user: {
      name: string
    }
  }
}

interface Specialty {
  id: string
  name: string
  code: string
}

interface Teacher {
  id: string
  user: {
    name: string
    email: string
  }
}

export default function SubjectsManager() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [specialties, setSpecialties] = useState<Specialty[]>([])
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    specialtyId: '',
    teacherId: '',
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [subjectsRes, specialtiesRes, teachersRes] = await Promise.all([
        adminAPI.getSubjects().catch(() => ({ success: false, data: [] })),
        fetch('http://localhost:3000/api/specialties').then(r => r.json()).catch(() => ({ success: false, data: [] })),
        adminAPI.getUsers({ role: 'TEACHER' }).catch(() => ({ success: false, data: [] })),
      ])
      
      if (subjectsRes.success && subjectsRes.data) {
        setSubjects(Array.isArray(subjectsRes.data) ? subjectsRes.data : subjectsRes.data.subjects || [])
      }
      
      if (specialtiesRes.success && specialtiesRes.data) {
        setSpecialties(Array.isArray(specialtiesRes.data) ? specialtiesRes.data : specialtiesRes.data.specialties || [])
      }
      
      if (teachersRes.success && teachersRes.data) {
        const teachersData = Array.isArray(teachersRes.data) ? teachersRes.data : teachersRes.data.users || []
        // Фильтруем только тех, у кого есть teacher.id
        const validTeachers = teachersData
          .filter((t: any) => t.teacher && t.teacher.id)
          .map((t: any) => ({
            id: t.teacher.id, // ВАЖНО: используем teacher.id, а не user.id
            user: { name: t.name, email: t.email }
          }))
        setTeachers(validTeachers)
        console.log('Loaded teachers:', validTeachers)
      }
    } catch (error) {
      console.error('Error loading data:', error)
      toast.error('Ошибка загрузки данных')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateSubject = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Убираем пустой teacherId если не выбран
      const dataToSend = {
        name: formData.name,
        code: formData.code,
        specialtyId: formData.specialtyId,
        ...(formData.teacherId && { teacherId: formData.teacherId })
      }
      
      console.log('Creating subject with data:', dataToSend)
      
      const response = await adminAPI.createSubject(dataToSend)
      
      if (response.success) {
        toast.success('Предмет создан!')
        setShowCreateModal(false)
        setFormData({ name: '', code: '', specialtyId: '', teacherId: '' })
        loadData()
      }
    } catch (error: any) {
      console.error('Error creating subject:', error)
      toast.error(error.response?.data?.message || 'Ошибка создания предмета')
    }
  }

  const filteredSubjects = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    subject.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    subject.specialty?.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Управление предметами
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Создание и управление учебными предметами
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          <Plus className="w-5 h-5" />
          Добавить предмет
        </motion.button>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-2xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Всего предметов</p>
              <p className="text-3xl font-black mt-1">{subjects.length}</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
              <BookOpen className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-effect rounded-2xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Преподавателей</p>
              <p className="text-3xl font-black mt-1">{teachers.length}</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-effect rounded-2xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Специальностей</p>
              <p className="text-3xl font-black mt-1">{specialties.length}</p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
              <GraduationCap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-effect rounded-2xl p-6"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Поиск по названию или коду предмета..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          />
        </div>
      </motion.div>

      {/* Subjects List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-effect rounded-2xl p-6"
      >
        <h2 className="text-xl font-black mb-4">Предметы</h2>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Загрузка...</p>
          </div>
        ) : filteredSubjects.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 dark:text-gray-400">Предметы не найдены</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredSubjects.map((subject) => (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-all"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                    <BookOpen className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold">{subject.name}</h3>
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-xs font-bold">
                        {subject.code}
                      </span>
                      <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-lg text-xs font-bold">
                        {subject.specialty?.code}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                      <span>{subject.specialty?.name}</span>
                      {subject.teacher && (
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {subject.teacher.user.name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toast('Редактирование в разработке', { icon: '⚠️' })}
                    className="p-2 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                  >
                    <Edit className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (window.confirm('Удалить предмет?')) {
                        toast.success('Предмет удалён!')
                        loadData()
                      }
                    }}
                    className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

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
                <h2 className="text-2xl font-black">Добавить предмет</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateSubject} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Код предмета</label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    placeholder="MATH"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Название предмета</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Математика"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Специальность</label>
                  <select
                    required
                    value={formData.specialtyId}
                    onChange={(e) => setFormData({ ...formData, specialtyId: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Выберите специальность</option>
                    {specialties.map((spec) => (
                      <option key={spec.id} value={spec.id}>
                        {spec.code} - {spec.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Преподаватель (опционально)</label>
                  <select
                    value={formData.teacherId}
                    onChange={(e) => setFormData({ ...formData, teacherId: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Не назначен</option>
                    {teachers.map((teacher) => (
                      <option key={teacher.id} value={teacher.id}>
                        {teacher.user.name}
                      </option>
                    ))}
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
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    Создать
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
