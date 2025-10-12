import { motion } from 'framer-motion'
import { FileText } from 'lucide-react'

export default function NotesExchange() {
  return (
    <div className="min-h-[500px] flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full text-center space-y-6"
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-2xl"
        >
          <FileText className="w-12 h-12 text-white" />
        </motion.div>

        <h2 className="text-3xl font-black">
          <span className="bg-gradient-to-r from-pink-600 via-rose-600 to-pink-600 dark:from-pink-400 dark:via-rose-400 dark:to-pink-400 bg-clip-text text-transparent">
            Конспекты в разработке
          </span>
        </h2>

        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          File upload через Multer готов на backend! Скоро можно будет загружать и 
          обмениваться конспектами с одногруппниками.
        </p>

        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border-2 border-pink-200 dark:border-pink-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold">Прогресс</span>
            <span className="text-2xl font-black bg-gradient-to-r from-pink-600 to-rose-600 dark:from-pink-400 dark:to-rose-400 bg-clip-text text-transparent">
              90%
            </span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '90%' }}
              transition={{ delay: 0.5, duration: 1 }}
              className="h-full bg-gradient-to-r from-pink-500 to-rose-600"
            />
          </div>
        </div>

        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-sm text-gray-500 dark:text-gray-400"
        >
          Скоро запуск...
        </motion.p>
      </motion.div>
    </div>
  )
}
