import { motion } from 'framer-motion'
import { MessageCircle, Sparkles, TrendingUp } from 'lucide-react'

export default function StudentChat() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 dark:from-green-950/50 dark:via-emerald-950/50 dark:to-green-950/50 rounded-3xl p-12 text-center border-2 border-green-200 dark:border-green-800 shadow-2xl"
      >
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 10, 0],
            scale: [1, 1.05, 1, 1.05, 1]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="w-32 h-32 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-2xl"
        >
          <MessageCircle className="w-16 h-16 text-white" />
        </motion.div>

        <h2 className="text-4xl font-black mb-4">
          <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 dark:from-green-400 dark:via-emerald-400 dark:to-green-400 bg-clip-text text-transparent">
            Чат
          </span>
        </h2>

        <div className="flex items-center justify-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-green-600 dark:text-green-400" />
          <p className="text-lg font-bold text-gray-700 dark:text-gray-300">
            WebSocket готов к запуску
          </p>
          <Sparkles className="w-5 h-5 text-green-600 dark:text-green-400" />
        </div>

        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          Socket.IO настроен на backend! Скоро будут доступны групповые чаты, 
          личные сообщения с преподавателями и real-time уведомления о новых сообщениях.
        </p>

        <div className="max-w-md mx-auto bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-green-200 dark:border-green-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span className="font-bold text-gray-700 dark:text-gray-300">Прогресс разработки</span>
            </div>
            <span className="text-3xl font-black bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
              88%
            </span>
          </div>
          
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '88%' }}
              transition={{ delay: 0.5, duration: 1.5, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 shadow-lg"
            />
          </div>

          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            ✅ WebSocket • ✅ Chat API • ⚡ Frontend интеграция
          </div>
        </div>

        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="mt-8 text-sm font-semibold text-green-600 dark:text-green-400"
        >
          Real-time сообщения • Готовится к запуску
        </motion.p>
      </motion.div>
    </div>
  )
}
