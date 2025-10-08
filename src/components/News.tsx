import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from '../hooks/useInView'
import { Megaphone, Trophy, PartyPopper, ArrowRight } from 'lucide-react'

const newsItems = [
  {
    icon: Megaphone,
    category: 'Объявление',
    title: 'Начало приема документов на 2026 учебный год',
    excerpt: 'Приемная комиссия ЛПТТ объявляет о начале приема документов для поступления на новый учебный год.',
    date: '15 сентября 2025',
    gradient: 'from-primary-500 to-purple-600',
  },
  {
    icon: Trophy,
    category: 'Событие',
    title: 'Студенты ЛПТТ заняли призовые места на областной олимпиаде',
    excerpt: 'Наши студенты показали отличные результаты на профессиональной олимпиаде по специальности "Техническая эксплуатация подвижного состава".',
    date: '10 сентября 2025',
    gradient: 'from-secondary-500 to-pink-600',
  },
  {
    icon: PartyPopper,
    category: 'Мероприятие',
    title: 'День знаний в ЛПТТ - начало нового учебного года',
    excerpt: 'Торжественная линейка, посвященная Дню знаний, собрала студентов, преподавателей и гостей техникума.',
    date: '1 сентября 2025',
    gradient: 'from-cyan-500 to-blue-600',
  },
]

export default function News() {
  const ref = useRef(null)
  const isInView = useInView(ref, { threshold: 0.1 })

  return (
    <section id="news" className="section-padding bg-gray-50 dark:bg-gray-900/50" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 glass-effect rounded-full text-sm font-semibold">
            Новости и события
          </span>
          <h2 className="text-4xl md:text-5xl font-black">
            Последние <span className="gradient-text">новости</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Следите за событиями в жизни техникума
          </p>
        </motion.div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="glass-effect rounded-3xl overflow-hidden group cursor-pointer"
            >
              {/* Image/Icon Area */}
              <div className={`relative h-48 bg-gradient-to-br ${item.gradient} flex items-center justify-center overflow-hidden`}>
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <item.icon className="w-20 h-20 text-white/90" />
                </motion.div>
                
                <span className="absolute top-4 left-4 px-3 py-1 glass-effect rounded-full text-xs font-semibold text-white">
                  {item.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 space-y-3">
                <time className="text-xs text-gray-500 dark:text-gray-400">
                  {item.date}
                </time>

                <h3 className="text-xl font-bold leading-tight group-hover:gradient-text transition-all">
                  {item.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.excerpt}
                </p>

                <motion.button
                  className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold group/btn"
                  whileHover={{ x: 5 }}
                >
                  <span>Читать далее</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
