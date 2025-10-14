import { motion } from 'framer-motion'
import { Rocket, Code, Database, Zap, ArrowRight, LogIn, Sparkles } from 'lucide-react'
import { useState } from 'react'

interface UnderConstructionProps {
  onLoginClick: () => void
}

export default function UnderConstruction({ onLoginClick }: UnderConstructionProps) {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  const features = [
    {
      icon: Code,
      title: 'Новый дизайн',
      description: 'Полностью переработанный интерфейс',
      color: 'from-violet-500 to-purple-600'
    },
    {
      icon: Database,
      title: 'Backend интеграция',
      description: 'Подключение к реальной базе данных',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: Zap,
      title: 'Оптимизация',
      description: 'Максимальная скорость работы',
      color: 'from-orange-500 to-red-600'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-violet-950/20 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-violet-400/20 dark:bg-violet-400/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl w-full">
        <div className="text-center mb-12">
          {/* Main Logo/Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', duration: 1 }}
            className="inline-block mb-8"
          >
            <div className="relative">
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-50"
              />
              <div className="relative w-32 h-32 bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 rounded-3xl flex items-center justify-center shadow-2xl">
                <Rocket className="w-16 h-16 text-white" />
              </div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-8xl font-black mb-6">
              <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Мы обновляемся
              </span>
            </h1>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-violet-600" />
              <p className="text-2xl md:text-3xl font-bold text-gray-700 dark:text-gray-300">
                Сайт находится в разработке
              </p>
              <Sparkles className="w-6 h-6 text-pink-600" />
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Мы работаем над улучшением сайта и внедрением новых возможностей. 
              Скоро вы увидите совершенно новый опыт!
            </p>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              onHoverStart={() => setHoveredFeature(index)}
              onHoverEnd={() => setHoveredFeature(null)}
              className="glass-effect rounded-2xl p-6 cursor-pointer"
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg transition-transform ${
                hoveredFeature === index ? 'scale-110' : 'scale-100'
              }`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section - Вход в электронный дневник */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 rounded-3xl blur-xl opacity-50" />
          <div className="relative glass-effect rounded-3xl p-8 md:p-12 border-2 border-white/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                    <LogIn className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                    Электронный дневник
                  </h2>
                </div>
                <p className="text-xl text-gray-700 dark:text-gray-300 mb-2">
                  <span className="font-bold">Работает в штатном режиме!</span>
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Студенты, преподаватели и администрация могут продолжать использовать систему
                </p>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onLoginClick}
                className="group relative px-8 py-4 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white font-black text-xl rounded-2xl shadow-2xl hover:shadow-violet-500/50 transition-all"
              >
                <span className="flex items-center gap-3">
                  Войти в дневник
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <ArrowRight className="w-6 h-6" />
                  </motion.div>
                </span>
                
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-2xl"
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                />
              </motion.button>
            </div>

            {/* Quick Links */}
            <div className="mt-8 pt-8 border-t border-gray-200/50 dark:border-gray-700/50">
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
                Быстрый доступ:
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                {['👨‍🎓 Студент', '👨‍🏫 Преподаватель', '👨‍💼 Директор', '📚 Завуч', '⚙️ Администратор'].map((role, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + i * 0.1 }}
                    className="px-4 py-2 bg-white/50 dark:bg-gray-800/50 rounded-xl text-sm font-semibold backdrop-blur-sm"
                  >
                    {role}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12 text-center"
        >
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4">
            Прогресс разработки
          </p>
          <div className="max-w-md mx-auto">
            <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '75%' }}
                transition={{ duration: 2, delay: 1.2 }}
                className="h-full bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600"
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">75% завершено</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
