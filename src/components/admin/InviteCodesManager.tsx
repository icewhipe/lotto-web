import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Key, Plus, Check, X, Copy, Printer } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

interface InviteCode {
  id: string
  code: string
  group: {
    name: string
    specialty: {
      name: string
    }
  }
  isActive: boolean
  currentUses: number
  maxUses: number
  usedBy: string | null
  usedAt: string | null
  expiresAt: string
  createdAt: string
}

export default function InviteCodesManager() {
  const [codes, setCodes] = useState<InviteCode[]>([])
  const [loading, setLoading] = useState(true)
  const [showGenerateModal, setShowGenerateModal] = useState(false)
  
  // Form state
  const [selectedGroupId, setSelectedGroupId] = useState('')
  const [count, setCount] = useState(10)
  const [expiresInDays, setExpiresInDays] = useState(30)
  const [generating, setGenerating] = useState(false)
  
  const [groups, setGroups] = useState<any[]>([])

  useEffect(() => {
    fetchCodes()
    fetchGroups()
  }, [])

  const fetchCodes = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${API_URL}/registration/invite-codes`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      if (response.data.success) {
        setCodes(response.data.data.codes || [])
      }
    } catch (error: any) {
      console.error('Failed to fetch codes:', error)
      toast.error('Не удалось загрузить коды')
    } finally {
      setLoading(false)
    }
  }

  const fetchGroups = async () => {
    try {
      const token = localStorage.getItem('token')
      // Assuming you have a groups endpoint
      const response = await axios.get(`${API_URL}/groups`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      if (response.data.success) {
        setGroups(response.data.data.groups || [])
      }
    } catch (error: any) {
      console.error('Failed to fetch groups:', error)
      // For now, use mock group if endpoint doesn't exist
      setGroups([{ id: 'mock-1', name: 'ИС-21', specialty: { name: 'Информационные системы' } }])
    }
  }

  const handleGenerate = async () => {
    if (!selectedGroupId) {
      toast.error('Выберите группу')
      return
    }

    setGenerating(true)

    try {
      const token = localStorage.getItem('token')
      const response = await axios.post(
        `${API_URL}/registration/invite-codes/generate`,
        {
          groupId: selectedGroupId,
          count: parseInt(count.toString()),
          expiresInDays: parseInt(expiresInDays.toString()),
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      if (response.data.success) {
        toast.success(`Сгенерировано ${count} кодов! 🎉`)
        setShowGenerateModal(false)
        fetchCodes()
      }
    } catch (error: any) {
      console.error('Generate error:', error)
      toast.error(error.response?.data?.error || 'Ошибка генерации')
    } finally {
      setGenerating(false)
    }
  }

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    toast.success('Код скопирован!', { icon: '📋' })
  }

  const printCodes = () => {
    const activeCodes = codes.filter(c => c.isActive && !c.usedBy)
    
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Коды приглашения ЛПТТ</title>
            <style>
              body { font-family: Arial; padding: 40px; }
              h1 { color: #7c3aed; margin-bottom: 30px; }
              .code { 
                font-size: 18px; 
                font-weight: bold; 
                margin: 15px 0; 
                padding: 15px; 
                border: 2px solid #e0e0e0;
                border-radius: 8px;
              }
            </style>
          </head>
          <body>
            <h1>🎓 Коды приглашения ЛПТТ</h1>
            ${activeCodes.map(c => `
              <div class="code">
                <div>${c.code}</div>
                <div style="font-size: 14px; color: #666; margin-top: 5px;">
                  Группа: ${c.group.name} • Действует до: ${new Date(c.expiresAt).toLocaleDateString()}
                </div>
              </div>
            `).join('')}
            <p style="margin-top: 30px; color: #666; font-size: 12px;">
              Распечатано: ${new Date().toLocaleString()}<br>
              Всего кодов: ${activeCodes.length}
            </p>
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Toaster position="top-center" />
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black mb-2">Коды приглашения 🔑</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Управление кодами для регистрации студентов
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={printCodes}
            className="px-4 py-2 bg-gray-600 text-white rounded-xl font-semibold flex items-center gap-2 hover:bg-gray-700 transition-colors"
          >
            <Printer className="w-5 h-5" />
            Печать
          </button>
          <button
            onClick={() => setShowGenerateModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Сгенерировать коды
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="glass-effect rounded-2xl p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Всего</p>
          <p className="text-3xl font-black">{codes.length}</p>
        </div>
        <div className="glass-effect rounded-2xl p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Активных</p>
          <p className="text-3xl font-black text-green-600">{codes.filter(c => c.isActive && !c.usedBy).length}</p>
        </div>
        <div className="glass-effect rounded-2xl p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Использовано</p>
          <p className="text-3xl font-black text-blue-600">{codes.filter(c => c.usedBy).length}</p>
        </div>
        <div className="glass-effect rounded-2xl p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Истекло</p>
          <p className="text-3xl font-black text-red-600">
            {codes.filter(c => new Date(c.expiresAt) < new Date() && !c.usedBy).length}
          </p>
        </div>
      </div>

      {/* Codes List */}
      <div className="space-y-3">
        {codes.map((code) => (
          <motion.div
            key={code.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-effect rounded-2xl p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  code.usedBy ? 'bg-blue-100 dark:bg-blue-900/30' :
                  !code.isActive ? 'bg-gray-100 dark:bg-gray-800' :
                  new Date(code.expiresAt) < new Date() ? 'bg-red-100 dark:bg-red-900/30' :
                  'bg-green-100 dark:bg-green-900/30'
                }`}>
                  <Key className={`w-6 h-6 ${
                    code.usedBy ? 'text-blue-600 dark:text-blue-400' :
                    !code.isActive ? 'text-gray-400' :
                    new Date(code.expiresAt) < new Date() ? 'text-red-600 dark:text-red-400' :
                    'text-green-600 dark:text-green-400'
                  }`} />
                </div>
                
                <div className="flex-1">
                  <p className="font-bold text-lg font-mono">{code.code}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {code.group.name} • {code.group.specialty.name}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                    <span>Создан: {new Date(code.createdAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>Истекает: {new Date(code.expiresAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {code.usedBy ? (
                  <span className="px-4 py-2 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-xl text-sm font-bold flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Использован
                  </span>
                ) : !code.isActive ? (
                  <span className="px-4 py-2 bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 rounded-xl text-sm font-bold">
                    Деактивирован
                  </span>
                ) : new Date(code.expiresAt) < new Date() ? (
                  <span className="px-4 py-2 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 rounded-xl text-sm font-bold">
                    Истёк
                  </span>
                ) : (
                  <span className="px-4 py-2 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 rounded-xl text-sm font-bold flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Активен
                  </span>
                )}

                <button
                  onClick={() => copyCode(code.code)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  title="Скопировать код"
                >
                  <Copy className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>

            {code.usedBy && (
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
                Использован {new Date(code.usedAt!).toLocaleString()}
              </div>
            )}
          </motion.div>
        ))}

        {codes.length === 0 && (
          <div className="glass-effect rounded-2xl p-12 text-center">
            <Key className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500 dark:text-gray-400">
              Кодов пока нет. Сгенерируйте первые коды!
            </p>
          </div>
        )}
      </div>

      {/* Generate Modal */}
      <AnimatePresence>
        {showGenerateModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" onClick={() => setShowGenerateModal(false)}>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-md w-full shadow-2xl z-10"
            >
              <button
                onClick={() => setShowGenerateModal(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                  <Key className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-black text-center mb-2">Генерация кодов</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  Создайте коды приглашения для студентов
                </p>
              </div>

              <div className="space-y-4">
                {/* Group Select */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Группа</label>
                  <select
                    value={selectedGroupId}
                    onChange={(e) => setSelectedGroupId(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    required
                  >
                    <option value="">Выберите группу</option>
                    {groups.map((group) => (
                      <option key={group.id} value={group.id}>
                        {group.name} - {group.specialty?.name || ''}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Count */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Количество кодов</label>
                  <input
                    type="number"
                    value={count}
                    onChange={(e) => setCount(parseInt(e.target.value))}
                    min="1"
                    max="100"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    required
                  />
                </div>

                {/* Expires In Days */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Срок действия (дней)</label>
                  <input
                    type="number"
                    value={expiresInDays}
                    onChange={(e) => setExpiresInDays(parseInt(e.target.value))}
                    min="1"
                    max="365"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    required
                  />
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={generating}
                  className="w-full py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-bold hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {generating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                      Генерация...
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      Сгенерировать
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
