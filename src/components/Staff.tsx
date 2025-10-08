import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from '../hooks/useInView'
import { User, Award, BookOpen, GraduationCap } from 'lucide-react'

const staff = [
  {
    name: 'Иванов Иван Иванович',
    position: 'Директор',
    qualification: 'Кандидат педагогических наук',
    experience: '25 лет',
    awards: 'Почетный работник СПО РФ',
    gradient: 'from-primary-500 to-purple-600',
  },
  {
    name: 'Петрова Елена Александровна',
    position: 'Заместитель директора по учебной работе',
    qualification: 'Высшая категория',
    experience: '20 лет',
    awards: 'Отличник профтехобразования',
    gradient: 'from-secondary-500 to-pink-600',
  },
  {
    name: 'Сидоров Алексей Петрович',
    position: 'Преподаватель специальных дисциплин',
    qualification: 'Кандидат технических наук',
    experience: '15 лет',
    awards: 'Победитель конкурса "Лучший преподаватель года"',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    name: 'Козлова Мария Сергеевна',
    position: 'Преподаватель информатики',
    qualification: 'Первая категория',
    experience: '10 лет',
    awards: 'Эксперт WorldSkills Russia',
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    name: 'Михайлов Дмитрий Николаевич',
    position: 'Мастер производственного обучения',
    qualification: 'Высшая категория',
    experience: '18 лет',
    awards: 'Наставник года',
    gradient: 'from-yellow-500 to-orange-600',
  },
  {
    name: 'Новикова Ольга Викторовна',
    position: 'Преподаватель общеобразовательных дисциплин',
    qualification: 'Высшая категория',
    experience: '22 года',
    awards: 'Почетная грамота Минобразования',
    gradient: 'from-indigo-500 to-purple-600',
  },
]

const departments = [
  {
    name: 'Кафедра транспорта',
    head: 'Иванов А.Б.',
    teachers: 12,
    icon: GraduationCap,
  },
  {
    name: 'Кафедра информационных технологий',
    head: 'Петрова М.С.',
    teachers: 8,
    icon: BookOpen,
  },
  {
    name: 'Кафедра общеобразовательных дисциплин',
    head: 'Сидорова Е.П.',
    teachers: 15,
    icon: Award,
  },
]

export default function Staff() {
  const ref = useRef(null)
  const isInView = useInView(ref, { threshold: 0.05 })

  return (
    <section id="staff" className="section-padding bg-gray-50 dark:bg-gray-900/50" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 glass-effect rounded-full text-sm font-semibold">
            Преподаватели
          </span>
          <h2 className="text-4xl md:text-5xl font-black">
            Наша <span className="gradient-text">команда</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Высококвалифицированные преподаватели с большим опытом работы и практическими знаниями
          </p>
        </motion.div>

        {/* Departments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {departments.map((dept, index) => (
            <motion.div
              key={dept.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-effect rounded-3xl p-6 text-center"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center">
                <dept.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold mb-2">{dept.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Заведующий: {dept.head}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Преподавателей: {dept.teachers}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Staff Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staff.map((person, index) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-effect rounded-3xl p-8 group cursor-pointer"
            >
              {/* Avatar */}
              <motion.div
                className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br ${person.gradient} flex items-center justify-center shadow-lg`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <User className="w-12 h-12 text-white" />
              </motion.div>

              {/* Info */}
              <h3 className="text-xl font-bold text-center mb-2 group-hover:gradient-text transition-all">
                {person.name}
              </h3>

              <p className="text-center text-sm font-semibold text-primary-600 dark:text-primary-400 mb-4">
                {person.position}
              </p>

              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-start gap-2">
                  <GraduationCap className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary-500" />
                  <span>{person.qualification}</span>
                </div>
                <div className="flex items-start gap-2">
                  <BookOpen className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary-500" />
                  <span>Опыт: {person.experience}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Award className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary-500" />
                  <span>{person.awards}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-16 glass-effect rounded-3xl p-8 md:p-12 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Присоединяйтесь к нашей команде!
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            ЛПТТ всегда рад видеть в своих рядах талантливых и мотивированных преподавателей
          </p>
          <a href="#contacts" className="btn-primary inline-flex">
            <span>Связаться с нами</span>
            <User className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
