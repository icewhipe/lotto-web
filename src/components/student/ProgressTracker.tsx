import { motion } from 'framer-motion'
import { TrendingUp, Sparkles, Award } from 'lucide-react'

export default function ProgressTracker() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-orange-50 via-red-50 to-orange-50 dark:from-orange-950/50 dark:via-red-950/50 dark:to-orange-950/50 rounded-3xl p-12 text-center border-2 border-orange-200 dark:border-orange-800 shadow-2xl"
      >
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 10, 0],
            scale: [1, 1.05, 1, 1.05, 1]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="w-32 h-32 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-2xl"
        >
          <TrendingUp className="w-16 h-16 text-white" />
        </motion.div>

        <h2 className="text-4xl font-black mb-4">
          <span className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 dark:from-orange-400 dark:via-red-400 dark:to-orange-400 bg-clip-text text-transparent">
            Академический прогресс
          </span>
        </h2>

        <div className="flex items-center justify-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          <p className="text-lg font-bold text-gray-700 dark:text-gray-300">
            Система аналитики в разработке
          </p>
          <Sparkles className="w-5 h-5 text-orange-600 dark:text-orange-400" />
        </div>

        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          Здесь будет полная аналитика вашей успеваемости: динамика оценок по времени, 
          графики посещаемости, достижения, цели на семестр и персональные рекомендации.
        </p>

        <div className="max-w-md mx-auto bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-orange-200 dark:border-orange-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              <span className="font-bold text-gray-700 dark:text-gray-300">Прогресс разработки</span>
            </div>
            <span className="text-3xl font-black bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent">
              85%
            </span>
          </div>
          
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '85%' }}
              transition={{ delay: 0.5, duration: 1.5, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 shadow-lg"
            />
          </div>

          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            ✅ Аналитика • ✅ Графики • ⚡ Рекомендации
          </div>
        </div>

        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="mt-8 text-sm font-semibold text-orange-600 dark:text-orange-400"
        >
          Персональная аналитика • В разработке
        </motion.p>
      </motion.div>
    </div>
  )
}
