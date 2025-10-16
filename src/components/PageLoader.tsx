import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GraduationCap, Zap, Code, Cpu } from 'lucide-react'

const techIcons = [GraduationCap, Zap, Code, Cpu]

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('Инициализация...')

  useEffect(() => {
    const texts = [
      'Инициализация...',
      'Загрузка компонентов...',
      'Подключение к системе...',
      'Оптимизация производительности...',
      'Готово!'
    ]
    
    let textIndex = 0
    const textInterval = setInterval(() => {
      if (textIndex < texts.length - 1) {
        textIndex++
        setLoadingText(texts[textIndex])
      }
    }, 400)

    // Симуляция загрузки
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          clearInterval(textInterval)
          setLoadingText('Готово!')
          setTimeout(() => setIsLoading(false), 800)
          return 100
        }
        return prev + Math.random() * 25
      })
    }, 150)

    return () => {
      clearInterval(interval)
      clearInterval(textInterval)
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
        >
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary-500 via-purple-600 to-secondary-500"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{ backgroundSize: '200% 200%' }}
          />

          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }} />
          </div>

          {/* Animated tech particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{ 
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                  opacity: 0,
                }}
                animate={{
                  y: [null, -200],
                  opacity: [0, 0.6, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              >
                {techIcons[i % techIcons.length] && (
                  (() => {
                    const Icon = techIcons[i % techIcons.length]
                    return <Icon className="w-6 h-6 text-white" />
                  })()
                )}
              </motion.div>
            ))}
          </div>

          {/* Orbiting circles */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                width: 200 + i * 100,
                height: 200 + i * 100,
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 20 - i * 5,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <div className="absolute top-0 left-1/2 w-3 h-3 bg-white/40 rounded-full -translate-x-1/2" />
            </motion.div>
          ))}

          {/* Main loader content */}
          <div className="relative z-10 text-center px-4">
            {/* Animated logo with tech effect */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 200 }}
              className="mb-8 relative"
            >
              {/* Pulsing rings */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 -m-8"
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: 1.5 + i * 0.3, opacity: 0 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.4,
                  }}
                >
                  <div className="w-32 h-32 border-2 border-white/40 rounded-full" />
                </motion.div>
              ))}

              <div className="relative">
                {/* Rotating ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 -m-4"
                >
                  <div className="w-32 h-32 border-4 border-white/30 border-t-white border-r-white rounded-full" />
                </motion.div>
                
                {/* Counter rotating ring */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 -m-6"
                >
                  <div className="w-36 h-36 border-2 border-white/20 border-b-white/60 rounded-full" />
                </motion.div>
                
                {/* Logo */}
                <motion.div 
                  className="w-24 h-24 mx-auto bg-white/20 backdrop-blur-2xl rounded-3xl flex items-center justify-center relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                  <motion.div
                    animate={{ 
                      rotateY: [0, 360],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  >
                    <GraduationCap className="w-12 h-12 text-white" />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <motion.h2 
                className="text-5xl font-black text-white mb-3"
                animate={{ 
                  textShadow: [
                    '0 0 20px rgba(255,255,255,0.5)',
                    '0 0 40px rgba(255,255,255,0.8)',
                    '0 0 20px rgba(255,255,255,0.5)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ЛПТТ
              </motion.h2>
              <motion.p
                className="text-white/90 text-lg font-semibold"
                key={loadingText}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {loadingText}
              </motion.p>
            </motion.div>

            {/* Progress bar with glow */}
            <div className="w-80 max-w-full mx-auto">
              <div className="h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-white via-cyan-200 to-white relative"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  />
                </motion.div>
              </div>
              
              {/* Percentage with tech style */}
              <div className="flex items-center justify-between mt-3">
                <motion.p
                  className="text-white/80 text-sm font-mono"
                  key={Math.floor(progress)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {Math.floor(progress)}%
                </motion.p>
                <motion.div
                  className="flex gap-1"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 bg-white/60 rounded-full" />
                  ))}
                </motion.div>
              </div>
            </div>
          </div>

          {/* Bottom decoration */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-12 text-center"
          >
            <p className="text-white/60 text-sm">
              Лискинский промышленно-транспортный техникум
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
