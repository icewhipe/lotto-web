import { motion } from 'framer-motion'
import { BookOpen, Sparkles, TrendingUp } from 'lucide-react'

export default function GradesView() {
  return (
    <div className="space-y-6">
      {/* Beautiful Development Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 dark:from-violet-950/50 dark:via-purple-950/50 dark:to-pink-950/50 rounded-3xl p-12 text-center border-2 border-violet-200 dark:border-violet-800 shadow-2xl"
      >
        {/* Animated Icon */}
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 10, 0],
            scale: [1, 1.05, 1, 1.05, 1]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="w-32 h-32 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-2xl"
        >
          <BookOpen className="w-16 h-16 text-white" />
        </motion.div>

        {/* Title */}
        <h2 className="text-4xl font-black mb-4">
          <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 dark:from-violet-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            Оценки
          </span>
        </h2>

        {/* Subtitle */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-violet-600 dark:text-violet-400" />
          <p className="text-lg font-bold text-gray-700 dark:text-gray-300">
            Интеграция с базой данных в процессе
          </p>
          <Sparkles className="w-5 h-5 text-violet-600 dark:text-violet-400" />
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          Backend API полностью готов! Сейчас мы подключаем отображение ваших реальных оценок 
          из базы данных PostgreSQL. Скоро здесь появятся все оценки по предметам с детальной статистикой.
        </p>

        {/* Progress Section */}
        <div className="max-w-md mx-auto bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-violet-200 dark:border-violet-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-violet-600 dark:text-violet-400" />
              <span className="font-bold text-gray-700 dark:text-gray-300">Прогресс разработки</span>
            </div>
            <span className="text-3xl font-black bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
              92%
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '92%' }}
              transition={{ delay: 0.5, duration: 1.5, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 shadow-lg"
            />
          </div>

          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            ✅ Backend API готов • ⚡ Frontend интеграция
          </div>
        </div>

        {/* Pulsing Text */}
        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="mt-8 text-sm font-semibold text-violet-600 dark:text-violet-400"
        >
          Скоро запуск • Следите за обновлениями
        </motion.p>
      </motion.div>
    </div>
  )
}
