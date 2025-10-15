import { motion } from 'framer-motion'
import { Rocket, ArrowRight } from 'lucide-react'

interface UnderConstructionProps {
  onLoginClick: () => void
  onNavigateToSite?: () => void
}

export default function UnderConstruction({ onLoginClick }: UnderConstructionProps) {

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-violet-50/50 to-purple-50/50 dark:from-gray-950 dark:via-violet-950/30 dark:to-purple-950/30 flex items-center justify-center p-6 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-40">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-violet-500 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl w-full">
        <div className="text-center">
          {/* Main Logo/Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', duration: 1 }}
            className="inline-block mb-12"
          >
            <div className="relative">
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 rounded-full blur-3xl opacity-30"
              />
              <div className="relative w-28 h-28 bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 rounded-3xl flex items-center justify-center shadow-2xl">
                <Rocket className="w-14 h-14 text-white" />
              </div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-black mb-4">
              <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Сайт в разработке
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Готовим для вас что-то особенное
            </p>
          </motion.div>

        {/* CTA Section - Вход в электронный дневник */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-20" />
          <div className="relative glass-effect rounded-3xl p-10 border border-white/20">
            <div className="text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Электронный дневник
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 max-w-md mx-auto">
                Продолжает работать в штатном режиме
              </p>
              
              <motion.button
                onClick={onLoginClick}
                className="group relative px-10 py-5 text-white text-xl font-black rounded-2xl overflow-hidden mx-auto inline-flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Анимированный градиентный фон */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{
                    backgroundSize: '200% 200%',
                  }}
                />
                
                {/* Пульсирующее свечение */}
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-50 blur-2xl"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [0.98, 1.02, 0.98],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                {/* Блики */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  initial={{ x: '-100%' }}
                  whileHover={{
                    x: '100%',
                    transition: {
                      duration: 0.6,
                      ease: 'easeInOut',
                    },
                  }}
                >
                  <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
                </motion.div>

                {/* Частицы */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-white rounded-full"
                    style={{
                      left: `${25 + i * 20}%`,
                      top: '50%',
                    }}
                    animate={{
                      y: [-15, -30, -15],
                      opacity: [0, 1, 0],
                      scale: [0, 1.2, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: 'easeInOut',
                    }}
                  />
                ))}

                {/* Текст кнопки */}
                <span className="relative z-10">
                  <motion.span
                    animate={{
                      textShadow: [
                        '0 0 20px rgba(255,255,255,0.5)',
                        '0 0 30px rgba(255,255,255,0.8)',
                        '0 0 20px rgba(255,255,255,0.5)',
                      ],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    Войти
                  </motion.span>
                </span>
                
                <motion.div
                  className="relative z-10"
                  animate={{
                    x: [0, 5, 0],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.div>

                {/* Граница с анимацией */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-white/20"
                  animate={{
                    borderColor: ['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.5)', 'rgba(255,255,255,0.2)'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </motion.button>
            </div>
          </div>
        </motion.div>
        </div>
      </div>
    </div>
  )
}
