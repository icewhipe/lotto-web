import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Ticket,
  Copy,
  Check,
  Trash2,
  X,
  Users,
  Calendar,
  Sparkles,
} from 'lucide-react'
import toast from 'react-hot-toast'

interface InviteCode {
  id: string
  code: string
  group?: {
    name: string
  }
  usedBy?: {
    name: string
    email: string
  }
  expiresAt: string
  createdAt: string
}

export default function InviteCodesManager() {
  const [codes, setCodes] = useState<InviteCode[]>([])
  const [groups, setGroups] = useState<any[]>([])
  const [, setLoading] = useState(false)
  const [showGenerateModal, setShowGenerateModal] = useState(false)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    groupId: '',
    quantity: 1,
    expiresInDays: 30,
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      // Mock data for now
      setCodes([
        {
          id: '1',
          code: 'LPTT-ИС21-ABC123',
          group: { name: 'ИС-21' },
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          code: 'LPTT-ИС22-DEF456',
          group: { name: 'ИС-22' },
          usedBy: { name: 'Иванов И.И.', email: 'ivanov@lptt.ru' },
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          createdAt: new Date().toISOString(),
        },
      ])
      setGroups([
        { id: '1', name: 'ИС-21' },
        { id: '2', name: 'ИС-22' },
        { id: '3', name: 'АТ-21' },
      ])
    } catch (error) {
      console.error('Error loading codes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateCodes = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      toast.success(`Сгенерировано ${formData.quantity} инвайт-кодов!`)
      setShowGenerateModal(false)
      setFormData({ groupId: '', quantity: 1, expiresInDays: 30 })
      loadData()
    } catch (error) {
      toast.error('Ошибка генерации кодов')
    }
  }

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    toast.success('Код скопирован!')
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const handleDeleteCode = async (codeId: string) => {
    if (!window.confirm('Вы уверены, что хотите удалить этот код?')) return
    
    try {
      // TODO: Подключить к API
      setCodes(codes.filter(c => c.id !== codeId))
      toast.success('Код удалён!')
    } catch (error) {
      console.error('Error deleting code:', error)
      toast.error('Ошибка удаления кода')
    }
  }

  const stats = {
    total: codes.length,
    used: codes.filter(c => c.usedBy).length,
    active: codes.filter(c => !c.usedBy && new Date(c.expiresAt) > new Date()).length,
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
          <h1 className="text-3xl font-black bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            Инвайт-коды
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Генерация и управление кодами приглашений
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowGenerateModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          <Sparkles className="w-5 h-5" />
          Сгенерировать коды
        </motion.button>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Всего кодов', value: stats.total, icon: Ticket, color: 'pink' },
          { label: 'Использовано', value: stats.used, icon: Check, color: 'green' },
          { label: 'Активных', value: stats.active, icon: Sparkles, color: 'blue' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-effect rounded-2xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-3xl font-black mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 bg-${stat.color}-100 dark:bg-${stat.color}-900/30 rounded-xl`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Codes List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-effect rounded-2xl p-6"
      >
        <h2 className="text-xl font-black mb-6">Сгенерированные коды</h2>

        <div className="space-y-3">
          <AnimatePresence>
            {codes.map((code, index) => (
              <motion.div
                key={code.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-pink-500 dark:hover:border-pink-500 transition-all"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-xl">
                    <Ticket className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <code className="text-lg font-bold font-mono bg-gray-100 dark:bg-gray-900 px-3 py-1 rounded-lg">
                        {code.code}
                      </code>
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg text-xs font-bold">
                        {code.group?.name}
                      </span>
                      {code.usedBy ? (
                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-xs font-bold">
                          Использован
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-lg text-xs font-bold">
                          Активен
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                      {code.usedBy && (
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {code.usedBy.name}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Истекает: {new Date(code.expiresAt).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => copyToClipboard(code.code)}
                    className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                    title="Копировать"
                  >
                    {copiedCode === code.code ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <Copy className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    )}
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDeleteCode(code.id)}
                    className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                    title="Удалить"
                  >
                    <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Generate Modal */}
      <AnimatePresence>
        {showGenerateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowGenerateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, rotateX: 10 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.9, opacity: 0, rotateX: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-xl">
                    <Sparkles className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                  </div>
                  <h2 className="text-2xl font-black">Генерация кодов</h2>
                </div>
                <button
                  onClick={() => setShowGenerateModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleGenerateCodes} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Группа</label>
                  <select
                    required
                    value={formData.groupId}
                    onChange={(e) => setFormData({ ...formData, groupId: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="">Выберите группу</option>
                    {groups.map((group) => (
                      <option key={group.id} value={group.id}>
                        {group.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Количество кодов</label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="50"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Срок действия (дней)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="365"
                    value={formData.expiresInDays}
                    onChange={(e) => setFormData({ ...formData, expiresInDays: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowGenerateModal(false)}
                    className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    Сгенерировать
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
