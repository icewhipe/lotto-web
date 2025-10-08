import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { useInView } from '../hooks/useInView'
import { Calendar, Clock, MapPin, Users, X, CheckCircle } from 'lucide-react'

const upcomingEvents = [
  {
    date: '15',
    month: 'Окт',
    year: '2025',
    title: 'День открытых дверей',
    time: '10:00 - 15:00',
    location: 'Главный корпус',
    attendees: 'Для всех желающих',
    description: 'Познакомьтесь с техникумом, преподавателями и студентами. Экскурсии по учебным корпусам и мастерским.',
    fullDescription: 'Приглашаем всех желающих на День открытых дверей ЛПТТ!\n\nПрограмма мероприятия:\n• 10:00 - Регистрация участников\n• 10:30 - Презентация техникума в актовом зале\n• 11:30 - Экскурсии по учебным корпусам\n• 12:30 - Посещение лабораторий и мастерских\n• 13:30 - Встреча с преподавателями\n• 14:00 - Знакомство с условиями поступления\n• 14:30 - Ответы на вопросы\n\nВы сможете:\n✓ Познакомиться с преподавателями\n✓ Увидеть учебные аудитории и оборудование\n✓ Пообщаться со студентами\n✓ Получить консультацию по поступлению\n✓ Задать все интересующие вопросы\n\nПриходите всей семьей! Ждем вас!',
    program: ['Регистрация', 'Презентация', 'Экскурсия', 'Встреча с преподавателями', 'Консультации'],
    gradient: 'from-primary-500 to-purple-600',
  },
  {
    date: '25',
    month: 'Окт',
    year: '2025',
    title: 'Профориентационная встреча',
    time: '14:00 - 16:00',
    location: 'Актовый зал',
    attendees: 'Школьники 9-11 классов',
    description: 'Встреча с представителями предприятий-партнеров. Рассказ о востребованных профессиях.',
    gradient: 'from-secondary-500 to-pink-600',
  },
  {
    date: '10',
    month: 'Ноя',
    year: '2025',
    title: 'Спортивные соревнования',
    time: '09:00 - 17:00',
    location: 'Спортивный зал',
    attendees: 'Студенты техникума',
    description: 'Областные соревнования по волейболу среди средних профессиональных учебных заведений.',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    date: '20',
    month: 'Ноя',
    year: '2025',
    title: 'Научно-практическая конференция',
    time: '10:00 - 14:00',
    location: 'Конференц-зал',
    attendees: 'Студенты и преподаватели',
    description: 'Презентация исследовательских работ студентов. Награждение победителей.',
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    date: '01',
    month: 'Дек',
    year: '2025',
    title: 'Новогодний концерт',
    time: '18:00 - 21:00',
    location: 'Актовый зал',
    attendees: 'Студенты, преподаватели',
    description: 'Праздничный концерт, подведение итогов года, награждение лучших студентов.',
    gradient: 'from-yellow-500 to-orange-600',
  },
  {
    date: '15',
    month: 'Дек',
    year: '2025',
    title: 'Ярмарка вакансий',
    time: '11:00 - 16:00',
    location: 'Главный корпус',
    attendees: 'Выпускники и студенты',
    description: 'Встреча с работодателями, презентация вакансий, консультации по трудоустройству.',
    gradient: 'from-indigo-500 to-purple-600',
  },
]

export default function Events() {
  const ref = useRef(null)
  const isInView = useInView(ref, { threshold: 0.05 })

  return (
    <section id="events" className="section-padding" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 glass-effect rounded-full text-sm font-semibold">
            Мероприятия
          </span>
          <h2 className="text-4xl md:text-5xl font-black">
            Календарь <span className="gradient-text">событий</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Следите за предстоящими мероприятиями и событиями в жизни техникума
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={`${event.date}-${event.month}`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => setSelectedEvent(event)}
              className="glass-effect rounded-3xl overflow-hidden group cursor-pointer"
            >
              {/* Date Badge */}
              <div className={`relative bg-gradient-to-br ${event.gradient} p-6 text-white text-center`}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative z-10"
                >
                  <div className="text-5xl font-black mb-1">{event.date}</div>
                  <div className="text-xl font-semibold uppercase">{event.month}</div>
                  <div className="text-sm opacity-90">{event.year}</div>
                </motion.div>
                <div className="absolute inset-0 bg-black/10" />
              </div>

              {/* Event Info */}
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-bold leading-tight group-hover:gradient-text transition-all">
                  {event.title}
                </h3>

                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary-500 flex-shrink-0" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary-500 flex-shrink-0" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary-500 flex-shrink-0" />
                    <span>{event.attendees}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed pt-2 border-t border-gray-200 dark:border-gray-700">
                  {event.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 glass-effect rounded-3xl p-8 md:p-12 text-center"
        >
          <Calendar className="w-16 h-16 mx-auto mb-4 text-primary-600 dark:text-primary-400" />
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Не пропустите наши мероприятия!
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Подпишитесь на наши социальные сети, чтобы быть в курсе всех событий
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#contacts" className="btn-primary">
              Подписаться на новости
            </a>
            <a href="#admissions" className="btn-secondary">
              День открытых дверей
            </a>
          </div>
        </motion.div>
      </div>

      {/* Event Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-effect rounded-3xl shadow-2xl"
            >
              {/* Header */}
              <div className={`relative bg-gradient-to-br ${selectedEvent.gradient} p-8 text-white`}>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="flex items-center gap-6 mb-4"
                >
                  <div className="text-center">
                    <div className="text-6xl font-black">{selectedEvent.date}</div>
                    <div className="text-2xl font-bold uppercase">{selectedEvent.month}</div>
                    <div className="text-sm opacity-90">{selectedEvent.year}</div>
                  </div>
                  
                  <div className="flex-1">
                    <h2 className="text-3xl font-black mb-4">{selectedEvent.title}</h2>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        <span className="font-semibold">{selectedEvent.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        <span className="font-semibold">{selectedEvent.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        <span className="font-semibold">{selectedEvent.attendees}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-8">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6"
                >
                  {selectedEvent.description}
                </motion.p>

                {selectedEvent.fullDescription && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="prose prose-lg dark:prose-invert max-w-none"
                  >
                    {selectedEvent.fullDescription.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="mb-4">{paragraph}</p>
                    ))}
                  </motion.div>
                )}

                {selectedEvent.program && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6"
                  >
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Программа мероприятия
                    </h3>
                    <div className="space-y-2">
                      {selectedEvent.program.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors"
                        >
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span>{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
                >
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="w-full btn-primary justify-center"
                  >
                    Закрыть
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
