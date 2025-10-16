import { motion } from 'framer-motion'
import { FileText, Download, Upload } from 'lucide-react'

export default function NotesExchange() {
  const mockNotes = [
    { id: 1, title: 'Математика - Интегралы', author: 'Иван П.', date: '08.10.2025', downloads: 45, rating: 4.8 },
    { id: 2, title: 'Информатика - Алгоритмы', author: 'Мария И.', date: '07.10.2025', downloads: 32, rating: 5.0 },
    { id: 3, title: 'История - ВОВ', author: 'Петр С.', date: '06.10.2025', downloads: 28, rating: 4.5 },
    { id: 4, title: 'Физика - Механика', author: 'Анна К.', date: '05.10.2025', downloads: 19, rating: 4.7 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black mb-2">Конспекты 📄</h1>
          <p className="text-gray-600 dark:text-gray-400">Демо-данные</p>
        </div>
        <button className="px-6 py-3 bg-violet-600 text-white rounded-xl font-semibold flex items-center gap-2" disabled>
          <Upload className="w-5 h-5" />
          Загрузить
        </button>
      </div>

      <div className="space-y-3">
        {mockNotes.map((note, index) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-effect rounded-2xl p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
                <FileText className="w-6 h-6 text-violet-600 dark:text-violet-400" />
              </div>
              <div className="flex-1">
                <p className="font-bold">{note.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {note.author} • {note.date} • {note.downloads} загрузок • ⭐ {note.rating}
                </p>
              </div>
            </div>
            <button className="p-3 rounded-xl bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400" disabled>
              <Download className="w-5 h-5" />
            </button>
          </motion.div>
        ))}
      </div>

      <p className="text-center text-sm text-gray-500 dark:text-gray-400 p-4">
        💡 File upload в разработке
      </p>
    </div>
  )
}
