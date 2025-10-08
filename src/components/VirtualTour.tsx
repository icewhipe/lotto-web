import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { useInView } from '../hooks/useInView'
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react'

const tourSpots = [
  {
    id: 1,
    title: 'Главный корпус',
    description: 'Современное здание с учебными аудиториями',
    icon: '🏢',
    gradient: 'from-primary-500 to-purple-600',
  },
  {
    id: 2,
    title: 'Лаборатории',
    description: 'Оснащенные по последнему слову техники',
    icon: '🔬',
    gradient: 'from-secondary-500 to-pink-600',
  },
  {
    id: 3,
    title: 'Мастерские',
    description: 'Для практических занятий студентов',
    icon: '⚙️',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    id: 4,
    title: 'Спортзал',
    description: 'Современный спортивный комплекс',
    icon: '🏀',
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    id: 5,
    title: 'Библиотека',
    description: 'Более 50,000 единиц литературы',
    icon: '📚',
    gradient: 'from-yellow-500 to-orange-600',
  },
  {
    id: 6,
    title: 'Общежитие',
    description: 'Комфортные условия проживания',
    icon: '🏠',
    gradient: 'from-indigo-500 to-purple-600',
  },
]

export default function VirtualTour() {
  const ref = useRef(null)
  const isInView = useInView(ref, { threshold: 0.1 })
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [selectedSpot, setSelectedSpot] = useState(tourSpots[0])

  return (
    <section id="virtual-tour" className="section-padding" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 glass-effect rounded-full text-sm font-semibold">
            Виртуальный тур
          </span>
          <h2 className="text-4xl md:text-5xl font-black">
            Прогуляйтесь по <span className="gradient-text">техникуму</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Познакомьтесь с нашей инфраструктурой, не выходя из дома
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tour Spots List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            {tourSpots.map((spot, index) => (
              <motion.button
                key={spot.id}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.05 }}
                onClick={() => setSelectedSpot(spot)}
                className={`w-full text-left p-4 rounded-2xl transition-all ${
                  selectedSpot.id === spot.id
                    ? 'bg-gradient-to-r from-primary-500 to-purple-600 text-white shadow-lg'
                    : 'glass-effect hover:shadow-lg'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{spot.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-bold">{spot.title}</h3>
                    <p className={`text-sm ${selectedSpot.id === spot.id ? 'text-white/80' : 'text-gray-600 dark:text-gray-400'}`}>
                      {spot.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Video Player */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="glass-effect rounded-3xl overflow-hidden">
              {/* Video Area */}
              <div className={`relative aspect-video bg-gradient-to-br ${selectedSpot.gradient} flex items-center justify-center`}>
                <motion.div
                  key={selectedSpot.id}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center text-white p-12"
                >
                  <div className="text-8xl mb-6">{selectedSpot.icon}</div>
                  <h3 className="text-3xl font-bold mb-3">{selectedSpot.title}</h3>
                  <p className="text-xl opacity-90">{selectedSpot.description}</p>
                </motion.div>

                {/* Play Button */}
                <motion.button
                  onClick={() => setIsPlaying(!isPlaying)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group hover:bg-white/30 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-10 h-10 text-white" />
                  ) : (
                    <Play className="w-10 h-10 text-white ml-1" />
                  )}
                </motion.button>
              </div>

              {/* Controls */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-lg transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5" />
                    )}
                  </button>

                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-lg transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </button>

                  <div className="flex-1 mx-4">
                    <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary-500 to-purple-600"
                        initial={{ width: 0 }}
                        animate={{ width: isPlaying ? '100%' : '0%' }}
                        transition={{ duration: 30, ease: 'linear' }}
                      />
                    </div>
                  </div>
                </div>

                <button className="p-2 hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-lg transition-colors">
                  <Maximize className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-6 glass-effect rounded-2xl p-6"
            >
              <h4 className="font-bold mb-3">О локации</h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {selectedSpot.title} - одна из ключевых частей нашей инфраструктуры. 
                {selectedSpot.description.toLowerCase()}. Мы постоянно модернизируем 
                и улучшаем наши помещения для комфортного обучения студентов.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center glass-effect rounded-3xl p-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Хотите посетить техникум лично?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Запишитесь на очную экскурсию и познакомьтесь с ЛПТТ вживую!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#events" className="btn-primary">
              День открытых дверей
            </a>
            <a href="#contacts" className="btn-secondary">
              Записаться на экскурсию
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
