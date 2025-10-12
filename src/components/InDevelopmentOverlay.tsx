import { motion } from 'framer-motion'
import { Wrench, Rocket, Code, Coffee, Zap } from 'lucide-react'

interface InDevelopmentOverlayProps {
  title?: string
  description?: string
}

export default function InDevelopmentOverlay({ 
  title = "В разработке",
  description = "Эта функция находится в процессе разработки"
}: InDevelopmentOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 z-50 flex items-center justify-center"
    >
      {/* Beautiful Blur Background */}
      <div className="absolute inset-0 backdrop-blur-2xl bg-white/80 dark:bg-gray-900/80" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative max-w-2xl w-full mx-4 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border-3 border-violet-300 dark:border-violet-700 p-8 z-10"
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
          className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-2xl"
        >
          <Wrench className="w-12 h-12 text-white" />
        </motion.div>

        {/* Title */}
        <h2 className="text-3xl font-black mb-4 text-center">
          <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 dark:from-violet-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            {title}
          </span>
        </h2>

        {/* Description */}
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          {description}
        </p>

        {/* Features Coming Soon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { icon: Rocket, text: 'API' },
            { icon: Code, text: 'Backend' },
            { icon: Zap, text: 'Скоро' },
            { icon: Coffee, text: 'В работе' },
          ].map((item, index) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="p-3 bg-violet-50 dark:bg-violet-900/30 rounded-xl border border-violet-200 dark:border-violet-700 text-center"
            >
              <item.icon className="w-6 h-6 mx-auto mb-1 text-violet-600 dark:text-violet-400" />
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Progress */}
        <div className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/30 dark:to-purple-900/30 p-4 rounded-2xl border border-violet-200 dark:border-violet-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
              Прогресс
            </span>
            <span className="text-xl font-black bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
              90%
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '90%' }}
              transition={{ delay: 1, duration: 1.5, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500"
            />
          </div>

          <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 text-center">
            Backend API готов • Интеграция данных в процессе
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}
