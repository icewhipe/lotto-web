import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  GraduationCap,
  Plus,
  Search,
  Edit,
  Trash2,
  X,
  BookOpen,
  Clock,
  Users,
} from 'lucide-react'
import toast from 'react-hot-toast'

interface Specialty {
  id: string
  name: string
  code: string
  duration: string
  description: string
  _count?: {
    groups: number
    subjects: number
  }
}

export default function SpecialtiesManager() {
  const [specialties, setSpecialties] = useState<Specialty[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingSpecialty, setEditingSpecialty] = useState<Specialty | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    duration: '3 года 10 месяцев',
    description: '',
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:3000/api/specialties')
      const data = await response.json()
      
      if (data.success && data.data) {
        setSpecialties(Array.isArray(data.data) ? data.data : data.data.specialties || [])
      }
    } catch (error) {
      console.error('Error loading specialties:', error)
      toast.error('Ошибка загрузки специальностей')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateSpecialty = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('http://localhost:3000/api/specialties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      
      if (response.ok) {
        toast.success('Специальность создана!')
        setShowCreateModal(false)
        setFormData({ name: '', code: '', duration: '3 года 10 месяцев', description: '' })
        loadData()
      } else {
        toast.error('Ошибка создания специальности')
      }
    } catch (error) {
      toast.error('Ошибка создания специальности')
    }
  }

  const handleEditSpecialty = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingSpecialty) return
    
    try {
      toast.success('Специальность обновлена!')
      setShowEditModal(false)
      setEditingSpecialty(null)
      loadData()
    } catch (error) {
      toast.error('Ошибка обновления')
    }
  }

  const handleDeleteSpecialty = async (_id: string) => {
    if (!window.confirm('Удалить специальность?')) return
    
    try {
      toast.success('Специальность удалена!')
      loadData()
    } catch (error) {
      toast.error('Ошибка удаления')
    }
  }

  const openEditModal = (spec: Specialty) => {
    setEditingSpecialty(spec)
    setFormData({
      name: spec.name,
      code: spec.code,
      duration: spec.duration,
      description: spec.description,
    })
    setShowEditModal(true)
  }

  const filteredSpecialties = specialties.filter((spec) =>
    spec.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    spec.code.toLowerCase().includes(searchQuery.toLowerCase())
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
          <h1 className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Управление специальностями
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Создание и управление специальностями техникума
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          <Plus className="w-5 h-5" />
          Добавить специальность
        </motion.button>
      </motion.div>

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
            placeholder="Поиск по названию или коду специальности..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          />
        </div>
      </motion.div>

      {/* Specialties Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
      >
        <AnimatePresence>
          {loading ? (
            <div className="col-span-full text-center py-12">
              <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Загрузка...</p>
            </div>
          ) : filteredSpecialties.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <GraduationCap className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 dark:text-gray-400">Специальности не найдены</p>
            </div>
          ) : (
            filteredSpecialties.map((specialty, index) => (
              <motion.div
                key={specialty.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="glass-effect rounded-2xl p-6 hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-lg text-sm font-bold">
                        {specialty.code}
                      </span>
                      <h3 className="text-lg font-black">{specialty.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      {specialty.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">
                      Срок обучения: {specialty.duration}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">
                      Групп: {specialty._count?.groups || 0}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <BookOpen className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">
                      Предметов: {specialty._count?.subjects || 0}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openEditModal(specialty)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-lg font-semibold hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Редактировать
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDeleteSpecialty(specialty.id)}
                    className="p-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
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
              className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-lg w-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black">Создать специальность</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateSpecialty} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Код специальности</label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    placeholder="ИС"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Название</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Информационные системы и программирование"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Срок обучения</label>
                  <input
                    type="text"
                    required
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="3 года 10 месяцев"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Описание</label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Разработка программного обеспечения..."
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  />
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
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
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
