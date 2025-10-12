import { motion } from 'framer-motion'
import { FileText, Sparkles, Upload } from 'lucide-react'

export default function NotesExchange() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-pink-50 via-rose-50 to-pink-50 dark:from-pink-950/50 dark:via-rose-950/50 dark:to-pink-950/50 rounded-3xl p-12 text-center border-2 border-pink-200 dark:border-pink-800 shadow-2xl"
      >
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 10, 0],
            scale: [1, 1.05, 1, 1.05, 1]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="w-32 h-32 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-2xl"
        >
          <FileText className="w-16 h-16 text-white" />
        </motion.div>

        <h2 className="text-4xl font-black mb-4">
          <span className="bg-gradient-to-r from-pink-600 via-rose-600 to-pink-600 dark:from-pink-400 dark:via-rose-400 dark:to-pink-400 bg-clip-text text-transparent">
            Конспекты
          </span>
        </h2>

        <div className="flex items-center justify-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-pink-600 dark:text-pink-400" />
          <p className="text-lg font-bold text-gray-700 dark:text-gray-300">
            File upload система готова
          </p>
          <Sparkles className="w-5 h-5 text-pink-600 dark:text-pink-400" />
        </div>

        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          Multer настроен на backend для загрузки файлов! Скоро можно будет загружать свои конспекты, 
          делиться ими с одногруппниками и скачивать материалы других студентов.
        </p>

        <div className="max-w-md mx-auto bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-pink-200 dark:border-pink-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-pink-600 dark:text-pink-400" />
              <span className="font-bold text-gray-700 dark:text-gray-300">Прогресс разработки</span>
            </div>
            <span className="text-3xl font-black bg-gradient-to-r from-pink-600 to-rose-600 dark:from-pink-400 dark:to-rose-400 bg-clip-text text-transparent">
              90%
            </span>
          </div>
          
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '90%' }}
              transition={{ delay: 0.5, duration: 1.5, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 shadow-lg"
            />
          </div>

          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            ✅ Upload API • ✅ Storage • ⚡ Обмен файлами
          </div>
        </div>

        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="mt-8 text-sm font-semibold text-pink-600 dark:text-pink-400"
        >
          Обмен конспектами • Скоро доступно
        </motion.p>
      </motion.div>
    </div>
  )
}
