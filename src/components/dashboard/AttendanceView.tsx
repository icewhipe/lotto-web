import { motion } from 'framer-motion'
import { Calendar, Sparkles, TrendingUp } from 'lucide-react'

export default function AttendanceView() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 dark:from-blue-950/50 dark:via-cyan-950/50 dark:to-blue-950/50 rounded-3xl p-12 text-center border-2 border-blue-200 dark:border-blue-800 shadow-2xl"
      >
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 10, 0],
            scale: [1, 1.05, 1, 1.05, 1]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="w-32 h-32 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-2xl"
        >
          <Calendar className="w-16 h-16 text-white" />
        </motion.div>

        <h2 className="text-4xl font-black mb-4">
          <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 dark:from-blue-400 dark:via-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
            Посещаемость
          </span>
        </h2>

        <div className="flex items-center justify-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <p className="text-lg font-bold text-gray-700 dark:text-gray-300">
            RFID система на финальной стадии
          </p>
          <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>

        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          Интеграция с турникетами и RFID картами. Автоматическая отметка посещаемости 
          при проходе через турникет. Backend логика готова на 95%!
        </p>

        <div className="max-w-md mx-auto bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-blue-200 dark:border-blue-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="font-bold text-gray-700 dark:text-gray-300">Прогресс разработки</span>
            </div>
            <span className="text-3xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
              95%
            </span>
          </div>
          
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '95%' }}
              transition={{ delay: 0.5, duration: 1.5, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 shadow-lg"
            />
          </div>

          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            ✅ RFID API готов • ⚡ Турникеты подключаются
          </div>
        </div>

        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="mt-8 text-sm font-semibold text-blue-600 dark:text-blue-400"
        >
          Автоматизация посещаемости • Скоро запуск
        </motion.p>
      </motion.div>
    </div>
  )
}
