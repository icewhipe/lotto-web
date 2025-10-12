import { motion } from 'framer-motion'
import { FileText, Upload, Download, Star } from 'lucide-react'
import InDevelopmentOverlay from '../InDevelopmentOverlay'

const mockNotes = [
  { id: 1, title: 'Конспект по математике - Интегралы', author: 'Иван П.', downloads: 45, rating: 4.8 },
  { id: 2, title: 'Информатика - Алгоритмы сортировки', author: 'Мария И.', downloads: 32, rating: 5.0 },
  { id: 3, title: 'История - Вторая мировая война', author: 'Петр С.', downloads: 28, rating: 4.5 },
]

export default function NotesExchange() {
  return (
    <div className="relative space-y-6">
      {/* Mock Content (Blurred) */}
      <div className="opacity-60 pointer-events-none">
        <div className="glass-effect rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Конспекты группы</h2>
            <button className="px-4 py-2 bg-violet-600 text-white rounded-xl font-semibold flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Загрузить
            </button>
          </div>

          <div className="space-y-3">
            {mockNotes.map((note) => (
              <div key={note.id} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{note.title}</p>
                    <p className="text-sm text-gray-500">
                      {note.author} • {note.downloads} загрузок • ⭐ {note.rating}
                    </p>
                  </div>
                </div>
                <button className="p-2 rounded-lg bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 hover:bg-violet-100 dark:hover:bg-violet-900/40">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Development Overlay */}
      <InDevelopmentOverlay 
        title="Конспекты в разработке"
        description="File upload через Multer готов на backend! Скоро можно будет загружать и обмениваться конспектами с одногруппниками."
      />
    </div>
  )
}
