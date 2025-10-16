import { motion } from 'framer-motion'
import { Home, Mail } from 'lucide-react'

interface NotFoundProps {
  onGoHome: () => void
}

export default function NotFound({ onGoHome }: NotFoundProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-400 flex items-center justify-center p-6 overflow-hidden relative">
      {/* Background animated orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              x: [0, i % 2 === 0 ? 20 : -20, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            className="absolute w-64 h-64 bg-white/10 rounded-full blur-3xl"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i * 15) % 60}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 15,
            duration: 0.8 
          }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-32 h-32 bg-white/20 backdrop-blur-xl rounded-full shadow-2xl mb-6">
            <span className="text-7xl">😢</span>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h1 className="text-7xl font-black mb-4">
            <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              404
            </span>
          </h1>
          
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-4xl font-bold text-white mb-6"
          >
            Страница не найдена
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-white/90 mb-12"
          >
            Кажется, вы заблудились. Но не волнуйтесь, мы поможем вам вернуться! 💙
          </motion.p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={onGoHome}
              className="flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-white/50 transition-all"
            >
              <Home className="w-5 h-5" />
              На главную ЛПТТ
            </motion.button>

            <motion.a
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:lptt@govvrn.ru"
              className="flex items-center gap-2 px-8 py-4 bg-white/20 backdrop-blur-xl text-white rounded-2xl font-bold text-lg border-2 border-white/30 hover:bg-white/30 transition-all"
            >
              <Mail className="w-5 h-5" />
              Связаться с поддержкой
            </motion.a>
          </div>
        </motion.div>

        {/* Floating decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -20, 0],
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
              className="absolute text-white/20 text-6xl font-black"
              style={{
                left: `${15 + i * 14}%`,
                top: `${30 + (i * 12) % 50}%`,
              }}
            >
              {['🎓', '📚', '🏫', '⭐', '💡', '🚀'][i]}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
