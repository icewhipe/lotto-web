import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from '../hooks/useInView'
import { Calendar, Clock, MapPin, Users } from 'lucide-react'

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
    </section>
  )
}
