import { motion } from 'framer-motion'
import { Wrench, Rocket, Code, Coffee, Zap } from 'lucide-react'

interface InDevelopmentProps {
  title?: string
  description?: string
}

export default function InDevelopment({ 
  title = "В разработке",
  description = "Эта функция находится в процессе разработки и скоро будет доступна"
}: InDevelopmentProps) {
  return (
    <div className="min-h-[400px] flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full text-center"
      >
        {/* Animated Icon */}
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 10, 0],
            scale: [1, 1.1, 1, 1.1, 1]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-32 h-32 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-2xl"
        >
          <Wrench className="w-16 h-16 text-white" />
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-black mb-4"
        >
          <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 dark:from-violet-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            {title}
          </span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto"
        >
          {description}
        </motion.p>

        {/* Features Coming Soon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { icon: Rocket, text: 'API интеграция' },
            { icon: Code, text: 'Backend готов' },
            { icon: Zap, text: 'Скоро запуск' },
            { icon: Coffee, text: 'Идёт работа' },
          ].map((item, index) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border-2 border-violet-200 dark:border-violet-800"
            >
              <item.icon className="w-8 h-8 mx-auto mb-2 text-violet-600 dark:text-violet-400" />
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                {item.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 p-6 rounded-2xl border-2 border-violet-200 dark:border-violet-800"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
              Прогресс разработки
            </span>
            <span className="text-2xl font-black bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
              85%
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '85%' }}
              transition={{ delay: 1, duration: 1.5, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500"
            />
          </div>

          <p className="text-xs text-gray-600 dark:text-gray-400 mt-3">
            🎯 Backend API готов • Frontend интеграция в процессе
          </p>
        </motion.div>

        {/* Loading Animation */}
        <motion.div
          animate={{ 
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity 
          }}
          className="mt-8 text-sm text-gray-500 dark:text-gray-400"
        >
          Загрузка данных с сервера...
        </motion.div>
      </motion.div>
    </div>
  )
}
