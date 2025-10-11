import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { useInView } from '../hooks/useInView'
import { Camera, Building2, Users, GraduationCap, Trophy, BookOpen, X, ArrowLeft, ArrowRight } from 'lucide-react'

const galleryCategories = [
  { id: 'all', name: 'Все фото', icon: Camera },
  { id: 'building', name: 'Здания', icon: Building2 },
  { id: 'students', name: 'Студенты', icon: Users },
  { id: 'events', name: 'Мероприятия', icon: Trophy },
  { id: 'education', name: 'Обучение', icon: BookOpen },
]

const galleryItems = [
  {
    id: 1,
    category: 'building',
    title: 'Главный корпус ЛПТТ',
    gradient: 'from-primary-500 to-purple-600',
    icon: Building2,
  },
  {
    id: 2,
    category: 'students',
    title: 'Студенты на практике',
    gradient: 'from-secondary-500 to-pink-600',
    icon: Users,
  },
  {
    id: 3,
    category: 'education',
    title: 'Современная лаборатория',
    gradient: 'from-cyan-500 to-blue-600',
    icon: BookOpen,
  },
  {
    id: 4,
    category: 'events',
    title: 'День знаний 2024',
    gradient: 'from-green-500 to-emerald-600',
    icon: GraduationCap,
  },
  {
    id: 5,
    category: 'building',
    title: 'Учебные мастерские',
    gradient: 'from-yellow-500 to-orange-600',
    icon: Building2,
  },
  {
    id: 6,
    category: 'events',
    title: 'Спортивные соревнования',
    gradient: 'from-indigo-500 to-purple-600',
    icon: Trophy,
  },
  {
    id: 7,
    category: 'education',
    title: 'Компьютерный класс',
    gradient: 'from-pink-500 to-rose-600',
    icon: BookOpen,
  },
    {
    id: 8,
    category: 'students',
    title: 'Студенческая жизнь',
    gradient: 'from-teal-500 to-cyan-600',
    icon: Users,
  },
  {
    id: 9,
    category: 'building',
    title: 'Библиотека',
    gradient: 'from-violet-500 to-purple-600',
    icon: Building2,
  },
]

export default function Gallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { threshold: 0.05 })
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const filteredItems = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory)

  const handlePrevImage = () => {
    if (selectedImage !== null && selectedImage > 0) {
      setSelectedImage(selectedImage - 1)
    }
  }

  const handleNextImage = () => {
    if (selectedImage !== null && selectedImage < galleryItems.length - 1) {
      setSelectedImage(selectedImage + 1)
    }
  }

  return (
    <section id="gallery" className="section-padding bg-gray-50 dark:bg-gray-900/50" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 glass-effect rounded-full text-sm font-semibold">
            Галерея
          </span>
          <h2 className="text-4xl md:text-5xl font-black">
            Фото <span className="gradient-text">техникума</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Взгляните на нашу жизнь: учебные корпуса, современное оборудование и яркие события
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {galleryCategories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition-all ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-primary-500 to-purple-600 text-white shadow-lg'
                  : 'glass-effect hover:shadow-lg'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <category.icon className="w-4 h-4" />
              <span>{category.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => setSelectedImage(galleryItems.findIndex(i => i.id === item.id))}
              className="glass-effect rounded-3xl overflow-hidden cursor-pointer group"
            >
              {/* Image Placeholder */}
              <div className={`relative h-64 bg-gradient-to-br ${item.gradient} flex items-center justify-center overflow-hidden`}>
                <motion.div
                  className="absolute inset-0 bg-black/20"
                  whileHover={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
                />
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10"
                >
                  <item.icon className="w-20 h-20 text-white/90" />
                </motion.div>
                
                {/* Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 z-20"
                >
                  <Camera className="w-12 h-12 text-white" />
                </motion.div>
              </div>

              {/* Title */}
              <div className="p-6">
                <h3 className="text-lg font-bold group-hover:gradient-text transition-all">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            💡 Здесь будут размещены реальные фотографии техникума
          </p>
        </motion.div>
      </div>

      {/* Full-screen Image Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors z-10"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {selectedImage > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handlePrevImage()
                }}
                className="absolute left-6 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors z-10"
              >
                <ArrowLeft className="w-6 h-6 text-white" />
              </button>
            )}

            {selectedImage < galleryItems.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleNextImage()
                }}
                className="absolute right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors z-10"
              >
                <ArrowRight className="w-6 h-6 text-white" />
              </button>
            )}

            <motion.div
              key={selectedImage}
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl w-full z-10"
            >
              <div className={`aspect-video rounded-3xl bg-gradient-to-br ${galleryItems[selectedImage].gradient} flex items-center justify-center overflow-hidden relative`}>
                <motion.div
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  {(() => {
                    const Icon = galleryItems[selectedImage].icon
                    return <Icon className="w-32 h-32 text-white/90" />
                  })()}
                </motion.div>

                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {galleryItems[selectedImage].title}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {selectedImage + 1} / {galleryItems.length}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
