import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { X, ZoomIn, ArrowLeft, ArrowRight } from 'lucide-react'
import { useInView } from '../hooks/useInView'

const galleryImages = [
  {
    id: 1,
    title: 'Главный корпус ЛПТТ',
    category: 'Здания',
    gradient: 'from-primary-500 to-purple-600',
    parallaxOffset: 100,
  },
  {
    id: 2,
    title: 'Современные лаборатории',
    category: 'Обучение',
    gradient: 'from-cyan-500 to-blue-600',
    parallaxOffset: -50,
  },
  {
    id: 3,
    title: 'Студенты на практике',
    category: 'Студенты',
    gradient: 'from-green-500 to-emerald-600',
    parallaxOffset: 80,
  },
  {
    id: 4,
    title: 'Спортивные соревнования',
    category: 'События',
    gradient: 'from-orange-500 to-red-600',
    parallaxOffset: -70,
  },
  {
    id: 5,
    title: 'Выпускной 2024',
    category: 'События',
    gradient: 'from-pink-500 to-rose-600',
    parallaxOffset: 60,
  },
  {
    id: 6,
    title: 'Учебные мастерские',
    category: 'Обучение',
    gradient: 'from-indigo-500 to-purple-600',
    parallaxOffset: -90,
  },
]

export default function ParallaxGallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { threshold: 0.1 })
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const handlePrevious = () => {
    if (selectedImage !== null && selectedImage > 0) {
      setSelectedImage(selectedImage - 1)
    }
  }

  const handleNext = () => {
    if (selectedImage !== null && selectedImage < galleryImages.length - 1) {
      setSelectedImage(selectedImage + 1)
    }
  }

  return (
    <section ref={ref} className="section-padding relative overflow-hidden bg-gray-50 dark:bg-gray-900/50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, 300]),
            opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.5, 0.3]),
          }}
          className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-primary-500/20 to-purple-600/20 rounded-full blur-3xl"
        />
        <motion.div
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, -200]),
            opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.4, 0.2]),
          }}
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-tr from-secondary-500/20 to-pink-600/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 glass-effect rounded-full text-sm font-semibold">
            Фотогалерея
          </span>
          <h2 className="text-4xl md:text-5xl font-black">
            Жизнь <span className="gradient-text">в кадре</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Интерактивная галерея с параллакс эффектом - почувствуйте атмосферу нашего техникума
          </p>
        </motion.div>

        {/* Parallax Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => {
            const y = useTransform(
              scrollYProgress,
              [0, 1],
              [0, image.parallaxOffset]
            )

            return (
              <motion.div
                key={image.id}
                style={{ y }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group cursor-pointer"
                onClick={() => setSelectedImage(index)}
              >
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
                  {/* Image placeholder with gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${image.gradient}`}>
                    <motion.div
                      className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                      whileHover={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  {/* Overlay content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white">
                    <motion.div
                      className="mb-4"
                      whileHover={{ scale: 1.2, rotate: 90 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ZoomIn className="w-12 h-12" />
                    </motion.div>
                    <span className="text-xs font-semibold px-3 py-1 bg-white/20 rounded-full mb-2">
                      {image.category}
                    </span>
                    <h3 className="text-xl font-bold text-center">{image.title}</h3>
                  </div>

                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors z-10"
            >
              <X className="w-6 h-6 text-white" />
            </motion.button>

            {/* Navigation buttons */}
            {selectedImage > 0 && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={(e) => {
                  e.stopPropagation()
                  handlePrevious()
                }}
                className="absolute left-6 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors z-10"
              >
                <ArrowLeft className="w-6 h-6 text-white" />
              </motion.button>
            )}

            {selectedImage < galleryImages.length - 1 && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={(e) => {
                  e.stopPropagation()
                  handleNext()
                }}
                className="absolute right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors z-10"
              >
                <ArrowRight className="w-6 h-6 text-white" />
              </motion.button>
            )}

            {/* Image content */}
            <motion.div
              key={selectedImage}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl w-full"
            >
              <div className={`aspect-video rounded-3xl bg-gradient-to-br ${galleryImages[selectedImage].gradient} flex items-center justify-center`}>
                <div className="text-white text-center p-12">
                  <h3 className="text-4xl font-black mb-4">
                    {galleryImages[selectedImage].title}
                  </h3>
                  <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-semibold">
                    {galleryImages[selectedImage].category}
                  </span>
                </div>
              </div>

              {/* Image info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-center text-white"
              >
                <p className="text-sm opacity-60">
                  {selectedImage + 1} / {galleryImages.length}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
