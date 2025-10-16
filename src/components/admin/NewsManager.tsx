import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Image as ImageIcon,
  Calendar,
  User,
  Search,
  Filter,
  X
} from 'lucide-react'

interface NewsItem {
  id: number
  title: string
  excerpt: string
  content: string
  image: string
  author: string
  date: string
  category: string
  status: 'published' | 'draft'
  views: number
}

const mockNews: NewsItem[] = [
  {
    id: 1,
    title: 'День открытых дверей 2024',
    excerpt: 'Приглашаем всех желающих посетить наш техникум',
    content: 'Полный текст новости...',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400',
    author: 'Иванов И.И.',
    date: '2024-10-08',
    category: 'События',
    status: 'published',
    views: 342
  },
  {
    id: 2,
    title: 'Новое оборудование в лабораториях',
    excerpt: 'Закуплено современное оборудование для практических занятий',
    content: 'Полный текст новости...',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400',
    author: 'Петрова А.С.',
    date: '2024-10-07',
    category: 'Образование',
    status: 'published',
    views: 218
  },
  {
    id: 3,
    title: 'Спортивные достижения',
    excerpt: 'Наши студенты заняли призовые места',
    content: 'Полный текст новости...',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400',
    author: 'Сидоров П.П.',
    date: '2024-10-06',
    category: 'Спорт',
    status: 'draft',
    views: 89
  }
]

export default function NewsManager() {
  const [news] = useState<NewsItem[]>(mockNews)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isCreating, setIsCreating] = useState(false)
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null)

  const categories = ['Все', 'События', 'Образование', 'Спорт', 'Достижения']

  const filteredNews = news.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Управление новостями
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Создавайте и редактируйте новости сайта
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
        >
          <Plus className="w-5 h-5" />
          Создать новость
        </motion.button>
      </div>

      {/* Filters */}
      <div className="glass-effect rounded-2xl p-4 border border-gray-200/50 dark:border-gray-700/50">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск новостей..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat === 'Все' ? 'all' : cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredNews.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.1 }}
              className="glass-effect rounded-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-400/50 dark:hover:border-blue-600/50 transition-all group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    item.status === 'published' 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-yellow-500 text-white'
                  }`}>
                    {item.status === 'published' ? 'Опубликовано' : 'Черновик'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Eye className="w-3 h-3" />
                    {item.views}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {item.title}
                </h3>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                  {item.excerpt}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {item.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(item.date).toLocaleDateString('ru-RU')}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setEditingNews(item)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold rounded-xl hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Редактировать
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {(isCreating || editingNews) && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => {
                setIsCreating(false)
                setEditingNews(null)
              }}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto z-10"
            >
              <div className="glass-effect rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50 m-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-black">
                    {editingNews ? 'Редактировать новость' : 'Создать новость'}
                  </h2>
                  <button
                    onClick={() => {
                      setIsCreating(false)
                      setEditingNews(null)
                    }}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Заголовок</label>
                    <input
                      type="text"
                      defaultValue={editingNews?.title}
                      placeholder="Введите заголовок новости"
                      className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Категория</label>
                    <select className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                      {categories.filter(c => c !== 'Все').map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Краткое описание</label>
                    <textarea
                      defaultValue={editingNews?.excerpt}
                      placeholder="Краткое описание новости"
                      rows={2}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Полный текст</label>
                    <textarea
                      defaultValue={editingNews?.content}
                      placeholder="Полный текст новости"
                      rows={8}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Изображение</label>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      >
                        <ImageIcon className="w-5 h-5" />
                        Загрузить изображение
                      </button>
                      {editingNews?.image && (
                        <img src={editingNews.image} alt="" className="h-12 w-12 object-cover rounded-lg" />
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl hover:shadow-lg transition-all"
                    >
                      {editingNews ? 'Сохранить изменения' : 'Опубликовать'}
                    </motion.button>
                    
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-bold rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      Сохранить как черновик
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {filteredNews.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            Новостей не найдено
          </p>
        </div>
      )}
    </div>
  )
}
