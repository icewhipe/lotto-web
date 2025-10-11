import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { useInView } from '../hooks/useInView'
import { Megaphone, Trophy, PartyPopper, ArrowRight, X, Calendar, User } from 'lucide-react'

const newsItems = [
  {
    icon: Megaphone,
    category: 'Объявление',
    title: 'Начало приема документов на 2026 учебный год',
    excerpt: 'Приемная комиссия ЛПТТ объявляет о начале приема документов для поступления на новый учебный год.',
    fullText: 'Уважаемые абитуриенты! Приемная комиссия Лискинского промышленно-транспортного техникума рада объявить о начале приема документов на 2025-2026 учебный год. Прием осуществляется с 20 июня по 15 августа 2025 года.\n\nМы предлагаем обучение по 15+ специальностям, включая самые востребованные направления: информационные системы, эксплуатация железнодорожного транспорта, автомобильный сервис и многие другие.\n\nДля поступления необходимы: паспорт, аттестат об основном общем образовании, 6 фотографий 3x4, медицинская справка формы 086/у.\n\nПриходите к нам! Мы открыты каждый будний день с 9:00 до 17:00.',
    date: '15 сентября 2025',
    author: 'Приемная комиссия',
    gradient: 'from-primary-500 to-purple-600',
  },
  {
    icon: Trophy,
    category: 'Событие',
    title: 'Студенты ЛПТТ заняли призовые места на областной олимпиаде',
    excerpt: 'Наши студенты показали отличные результаты на профессиональной олимпиаде по специальности "Техническая эксплуатация подвижного состава".',
    fullText: 'Поздравляем наших студентов с блестящей победой на областной профессиональной олимпиаде!\n\nКоманда ЛПТТ в составе Петрова Александра, Ивановой Марии и Сидорова Дмитрия заняла 1-е место в командном зачете и получила три индивидуальных призовых места.\n\nОлимпиада проходила на базе Воронежского железнодорожного техникума и собрала более 200 участников из 15 учебных заведений области.\n\nНаши студенты продемонстрировали отличные знания в области технической эксплуатации подвижного состава, диагностики и ремонта железнодорожной техники.\n\nГордимся нашими ребятами! Так держать!',
    date: '10 сентября 2025',
    author: 'Пресс-служба ЛПТТ',
    gradient: 'from-secondary-500 to-pink-600',
  },
  {
    icon: PartyPopper,
    category: 'Мероприятие',
    title: 'День знаний в ЛПТТ - начало нового учебного года',
    excerpt: 'Торжественная линейка, посвященная Дню знаний, собрала студентов, преподавателей и гостей техникума.',
    fullText: '1 сентября 2025 года ЛПТТ распахнул свои двери для более чем 350 первокурсников!\n\nТоржественная линейка прошла на площади перед главным корпусом. С приветственным словом выступил директор техникума, почетные гости, представители администрации города.\n\nПервокурсники получили студенческие билеты и познакомились со своими кураторами. После официальной части состоялась экскурсия по техникуму, где новые студенты увидели учебные аудитории, лаборатории, мастерские и общежитие.\n\nВечером для всех студентов был организован праздничный концерт с участием творческих коллективов техникума.\n\nЖелаем всем студентам успехов в новом учебном году!',
    date: '1 сентября 2025',
    author: 'Студенческий совет',
    gradient: 'from-cyan-500 to-blue-600',
  },
]

export default function News() {
  const ref = useRef(null)
  const isInView = useInView(ref, { threshold: 0.1 })
  const [selectedNews, setSelectedNews] = useState<typeof newsItems[0] | null>(null)

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
                  onClick={() => setSelectedNews(item)}
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

      {/* News Modal - Beautiful Without Backdrop Darkening */}
      <AnimatePresence>
        {selectedNews && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" onClick={() => setSelectedNews(null)}>
            {/* Blur only, no darkening */}
            <div className="absolute inset-0 backdrop-blur-md" style={{ backgroundColor: 'rgba(255,255,255,0.3)' }} />
            <div className="absolute inset-0 backdrop-blur-md dark:backdrop-blur-lg" style={{ backgroundColor: 'rgba(0,0,0,0.2)' }} />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-effect rounded-3xl shadow-2xl"
            >
              {/* Header */}
              <div className={`relative bg-gradient-to-br ${selectedNews.gradient} p-8 text-white`}>
                <button
                  onClick={() => setSelectedNews(null)}
                  className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="inline-flex p-4 bg-white/20 backdrop-blur-sm rounded-2xl mb-4"
                >
                  <selectedNews.icon className="w-12 h-12" />
                </motion.div>

                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-semibold mb-3">
                  {selectedNews.category}
                </span>
                
                <h2 className="text-3xl font-black mb-4">{selectedNews.title}</h2>
                
                <div className="flex items-center gap-4 text-white/80 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{selectedNews.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{selectedNews.author}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  {selectedNews.fullText.split('\n\n').map((paragraph, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed"
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
                >
                  <button
                    onClick={() => setSelectedNews(null)}
                    className="w-full btn-primary justify-center"
                  >
                    Закрыть
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
