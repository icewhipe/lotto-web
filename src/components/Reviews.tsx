import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { useInView } from '../hooks/useInView'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'

const reviews = [
  {
    name: 'Александр Петров',
    year: 'Выпускник 2023',
    specialty: 'Информационные системы и программирование',
    rating: 5,
    text: 'ЛПТТ дал мне отличную базу знаний и практические навыки. Сразу после выпуска нашел работу в IT-компании. Преподаватели - профессионалы своего дела!',
    avatar: '👨‍💻',
  },
  {
    name: 'Мария Иванова',
    year: 'Студентка 3 курса',
    specialty: 'Эксплуатация железнодорожного транспорта',
    rating: 5,
    text: 'Учусь с удовольствием! Современное оборудование, интересные практические занятия. Уже прохожу практику на РЖД. Рекомендую всем!',
    avatar: '👩‍🎓',
  },
  {
    name: 'Дмитрий Сидоров',
    year: 'Выпускник 2022',
    specialty: 'Техническое обслуживание автомобилей',
    rating: 5,
    text: 'Отличный техникум! Получил профессию, которая востребована. Работаю механиком в официальном дилерском центре. Спасибо ЛПТТ!',
    avatar: '👨‍🔧',
  },
  {
    name: 'Елена Козлова',
    year: 'Выпускница 2024',
    specialty: 'Информационные системы',
    rating: 5,
    text: 'Лучшие годы моей жизни! Не только получила знания, но и нашла друзей. Преподаватели всегда готовы помочь. Техникум - это большая семья!',
    avatar: '👩‍💼',
  },
  {
    name: 'Игорь Новиков',
    year: 'Студент 2 курса',
    specialty: 'Электроснабжение',
    rating: 5,
    text: 'Поступил по совету старшего брата - он тоже учился здесь. Не пожалел! Качественное образование, интересные мероприятия, хорошее общежитие.',
    avatar: '👨‍🎓',
  },
  {
    name: 'Ольга Михайлова',
    year: 'Выпускница 2021',
    specialty: 'Строительство железных дорог',
    rating: 5,
    text: 'ЛПТТ помог мне найти свое призвание. Сейчас работаю инженером в крупной строительной компании. Благодарна за полученные знания!',
    avatar: '👩‍🏭',
  },
]

export default function Reviews() {
  const ref = useRef(null)
  const isInView = useInView(ref, { threshold: 0.1 })
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  const visibleReviews = [
    reviews[currentIndex],
    reviews[(currentIndex + 1) % reviews.length],
    reviews[(currentIndex + 2) % reviews.length],
  ]

  return (
    <section id="reviews" className="section-padding" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 glass-effect rounded-full text-sm font-semibold">
            Отзывы
          </span>
          <h2 className="text-4xl md:text-5xl font-black">
            Что говорят наши <span className="gradient-text">студенты</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Реальные отзывы студентов и выпускников ЛПТТ
          </p>
        </motion.div>

        {/* Reviews Carousel */}
        <div className="relative">
          <div className="grid md:grid-cols-3 gap-6">
            {visibleReviews.map((review, index) => (
              <motion.div
                key={`${currentIndex}-${index}`}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-effect rounded-3xl p-8 relative"
              >
                {/* Quote Icon */}
                <Quote className="absolute top-6 right-6 w-12 h-12 text-primary-200 dark:text-primary-900/30" />

                {/* Avatar */}
                <div className="relative z-10 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-3xl mb-4">
                    {review.avatar}
                  </div>
                  <h3 className="font-bold text-lg">{review.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{review.year}</p>
                  <p className="text-xs text-primary-600 dark:text-primary-400 mt-1">
                    {review.specialty}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed italic">
                  "{review.text}"
                </p>
              </motion.div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <motion.button
              onClick={prevReview}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-full glass-effect flex items-center justify-center hover:shadow-lg transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              onClick={nextReview}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-full glass-effect flex items-center justify-center hover:shadow-lg transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 bg-gradient-to-r from-primary-500 to-purple-600'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center glass-effect rounded-3xl p-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Станьте частью нашей истории успеха!
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Присоединяйтесь к тысячам успешных выпускников ЛПТТ
          </p>
          <a href="#admissions" className="btn-primary inline-flex">
            Подать заявление
          </a>
        </motion.div>
      </div>
    </section>
  )
}
