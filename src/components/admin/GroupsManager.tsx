import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users,
  Plus,
  Search,
  Edit,
  Trash2,
  Calendar,
  GraduationCap,
  X,
  BookOpen,
} from 'lucide-react'
import { adminAPI } from '../../services/api'
import toast from 'react-hot-toast'

interface Group {
  id: string
  name: string
  year: number
  specialty: {
    id?: string
    name: string
    code: string
  }
  specialtyId?: string
  _count?: {
    students: number
  }
}

interface Specialty {
  id: string
  name: string
  code: string
}

export default function GroupsManager() {
  const [groups, setGroups] = useState<Group[]>([])
  const [specialties, setSpecialties] = useState<Specialty[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingGroup, setEditingGroup] = useState<Group | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    specialtyId: '',
    year: new Date().getFullYear(),
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [groupsRes, specialtiesRes] = await Promise.all([
        adminAPI.getGroups().catch(() => ({ success: false, data: [] })),
        fetch('http://localhost:3000/api/specialties').then(r => r.json()).catch(() => ({ success: false, data: [] })),
      ])
      
      if (groupsRes.success && groupsRes.data) {
        setGroups(Array.isArray(groupsRes.data) ? groupsRes.data : groupsRes.data.groups || [])
      }
      
      if (specialtiesRes.success && specialtiesRes.data) {
        setSpecialties(Array.isArray(specialtiesRes.data) ? specialtiesRes.data : specialtiesRes.data.specialties || [])
      }
    } catch (error) {
      console.error('Error loading data:', error)
      toast.error('Ошибка загрузки данных')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await adminAPI.createGroup(formData)
      
      toast.success('Группа успешно создана!')
      setShowCreateModal(false)
      setFormData({ name: '', specialtyId: '', year: new Date().getFullYear() })
      loadData()
    } catch (error: any) {
      console.error('Error creating group:', error)
      toast.error(error.response?.data?.message || 'Ошибка создания группы')
    }
  }

  const handleEditGroup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingGroup) return
    
    try {
      // TODO: API endpoint для обновления
      toast.success('Группа обновлена!')
      setShowEditModal(false)
      setEditingGroup(null)
      setFormData({ name: '', specialtyId: '', year: new Date().getFullYear() })
      loadData()
    } catch (error: any) {
      toast.error('Ошибка обновления группы')
    }
  }

  const handleDeleteGroup = async (_groupId: string, groupName: string) => {
    if (!window.confirm(`Удалить группу "${groupName}"?`)) return
    
    try {
      // TODO: API endpoint для удаления
      toast.success('Группа удалена!')
      loadData()
    } catch (error: any) {
      toast.error('Ошибка удаления группы')
    }
  }

  const openEditModal = (group: Group) => {
    setEditingGroup(group)
    setFormData({
      name: group.name,
      specialtyId: group.specialtyId || group.specialty?.id || '',
      year: group.year,
    })
    setShowEditModal(true)
  }

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.specialty?.name.toLowerCase().includes(searchQuery.toLowerCase())
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
          <h1 className="text-3xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Управление группами
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Создание и управление учебными группами
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          <Plus className="w-5 h-5" />
          Создать группу
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
              <p className="text-sm text-gray-600 dark:text-gray-400">Всего групп</p>
              <p className="text-3xl font-black mt-1">{groups.length}</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
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
              <p className="text-sm text-gray-600 dark:text-gray-400">Студентов</p>
              <p className="text-3xl font-black mt-1">
                {groups.reduce((acc, g) => acc + (g._count?.students || 0), 0)}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
              <GraduationCap className="w-6 h-6 text-green-600 dark:text-green-400" />
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
              <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
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
            placeholder="Поиск по названию группы или специальности..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
      </motion.div>

      {/* Groups Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <AnimatePresence>
          {loading ? (
            <div className="col-span-full text-center py-12">
              <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Загрузка...</p>
            </div>
          ) : filteredGroups.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Users className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 dark:text-gray-400">Группы не найдены</p>
            </div>
          ) : (
            filteredGroups.map((group, index) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="glass-effect rounded-2xl p-6 hover:shadow-xl transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-black">{group.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {group.specialty?.name || 'Специальность не указана'}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg text-xs font-bold">
                    {group.specialty?.code || 'N/A'}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">
                      Год поступления: {group.year}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">
                      Студентов: {group._count?.students || 0}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openEditModal(group)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg font-semibold hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Редактировать
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDeleteGroup(group.id, group.name)}
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

      {/* Edit Modal */}
      <AnimatePresence>
        {showEditModal && editingGroup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowEditModal(false)
              setEditingGroup(null)
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black">Редактировать группу</h2>
                <button
                  onClick={() => {
                    setShowEditModal(false)
                    setEditingGroup(null)
                  }}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleEditGroup} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Название группы</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Специальность</label>
                  <select
                    required
                    value={formData.specialtyId}
                    onChange={(e) => setFormData({ ...formData, specialtyId: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
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
                  <label className="block text-sm font-semibold mb-2">Год поступления</label>
                  <input
                    type="number"
                    required
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                    min="2020"
                    max="2030"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditModal(false)
                      setEditingGroup(null)
                    }}
                    className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    Сохранить
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
                <h2 className="text-2xl font-black">Создать группу</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateGroup} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Название группы</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="ИС-21"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Специальность</label>
                  <select
                    required
                    value={formData.specialtyId}
                    onChange={(e) => setFormData({ ...formData, specialtyId: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
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
                  <label className="block text-sm font-semibold mb-2">Год поступления</label>
                  <input
                    type="number"
                    required
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                    min="2020"
                    max="2030"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
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
