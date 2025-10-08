import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, Download, BookOpen, Star, Search } from 'lucide-react'

const mockNotes = [
  {
    id: 1,
    title: 'Конспект по математике - Производные',
    subject: 'Математика',
    author: 'Иван Петров',
    rating: 4.8,
    downloads: 156,
    date: '15.09.2025',
    preview: 'Подробный конспект по теме производных с примерами...',
  },
  {
    id: 2,
    title: 'Физика - Законы Ньютона',
    subject: 'Физика',
    author: 'Мария Сидорова',
    rating: 5.0,
    downloads: 243,
    date: '12.09.2025',
    preview: 'Все три закона Ньютона с решенными задачами...',
  },
  {
    id: 3,
    title: 'История России - 19 век',
    subject: 'История',
    author: 'Алексей Иванов',
    rating: 4.5,
    downloads: 89,
    date: '10.09.2025',
    preview: 'Основные события 19 века в хронологическом порядке...',
  },
]

export default function NotesExchange() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('all')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black gradient-text">Обмен конспектами</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Делитесь знаниями с другими студентами</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary"
        >
          <Upload className="w-5 h-5" />
          <span>Загрузить конспект</span>
        </motion.button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск конспектов..."
            className="w-full pl-12 pr-4 py-3 glass-effect rounded-xl outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="px-4 py-3 glass-effect rounded-xl outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="all">Все предметы</option>
          <option value="math">Математика</option>
          <option value="physics">Физика</option>
          <option value="history">История</option>
          <option value="it">Информатика</option>
        </select>
      </div>

      {/* Notes Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockNotes.map((note, index) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="glass-effect rounded-3xl p-6 cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="w-4 h-4 fill-yellow-500" />
                <span className="text-sm font-semibold">{note.rating}</span>
              </div>
            </div>

            <h3 className="font-bold text-lg mb-2 group-hover:gradient-text transition-all">
              {note.title}
            </h3>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
              {note.preview}
            </p>

            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500 mb-4">
              <span>{note.author}</span>
              <span>{note.date}</span>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 text-sm">
                <Download className="w-4 h-4" />
                <span>{note.downloads} скачиваний</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-primary-500 to-purple-600 text-white rounded-xl font-semibold text-sm"
              >
                Скачать
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-effect rounded-3xl p-8 text-center"
      >
        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center">
          <Upload className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Поделитесь своими конспектами</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Помогите другим студентам и заработайте репутацию
        </p>
        <button className="btn-primary">
          Загрузить конспект
        </button>
      </motion.div>
    </div>
  )
}
