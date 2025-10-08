import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from '../hooks/useInView'
import { Train, Car, Code, Zap, Construction, Wrench, ArrowRight } from 'lucide-react'

const programs = [
  {
    icon: Train,
    title: 'Эксплуатация и ремонт железнодорожного транспорта',
    description: 'Подготовка специалистов по обслуживанию и ремонту подвижного состава',
    duration: '3 года 10 месяцев',
    form: 'Очная',
    feature: 'Практика на РЖД',
    badge: 'Популярно',
    gradient: 'from-primary-500 to-purple-600',
  },
  {
    icon: Car,
    title: 'Техническое обслуживание и ремонт автомобильного транспорта',
    description: 'Современные технологии диагностики и ремонта автомобилей',
    duration: '3 года 10 месяцев',
    form: 'Очная',
    feature: 'Собственная автомастерская',
    gradient: 'from-secondary-500 to-pink-600',
  },
  {
    icon: Code,
    title: 'Информационные системы и программирование',
    description: 'Разработка программного обеспечения и администрирование систем',
    duration: '3 года 10 месяцев',
    form: 'Очная',
    feature: 'Современные компьютерные классы',
    badge: 'Новинка',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    icon: Zap,
    title: 'Электроснабжение на железнодорожном транспорте',
    description: 'Обслуживание электротехнического оборудования и сетей',
    duration: '3 года 10 месяцев',
    form: 'Очная',
    feature: 'Высокий спрос на специалистов',
    gradient: 'from-yellow-500 to-orange-600',
  },
  {
    icon: Construction,
    title: 'Строительство железных дорог, путь и путевое хозяйство',
    description: 'Строительство и эксплуатация железнодорожных путей',
    duration: '3 года 10 месяцев',
    form: 'Очная',
    feature: 'Практика на реальных объектах',
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    icon: Wrench,
    title: 'Техническая эксплуатация подъемно-транспортных машин',
    description: 'Обслуживание и ремонт подъемно-транспортного оборудования',
    duration: '3 года 10 месяцев',
    form: 'Очная',
    feature: 'Востребованная профессия',
    gradient: 'from-indigo-500 to-purple-600',
  },
]

export default function Programs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { threshold: 0.05 })

  return (
    <section id="programs" className="section-padding" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 glass-effect rounded-full text-sm font-semibold">
            Образовательные программы
          </span>
          <h2 className="text-4xl md:text-5xl font-black">
            Наши <span className="gradient-text">специальности</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Выберите направление, которое поможет построить успешную карьеру
          </p>
        </motion.div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="glass-effect rounded-3xl p-8 relative group cursor-pointer"
            >
              {/* Badge */}
              {program.badge && (
                <span className={`absolute top-6 right-6 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${program.gradient}`}>
                  {program.badge}
                </span>
              )}

              {/* Icon */}
              <motion.div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${program.gradient} flex items-center justify-center mb-6 shadow-lg`}
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <program.icon className="w-8 h-8 text-white" />
              </motion.div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3 leading-tight group-hover:gradient-text transition-all">
                {program.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {program.description}
              </p>

              {/* Info List */}
              <ul className="space-y-2 mb-6">
                <li className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Срок обучения: {program.duration}
                </li>
                <li className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Форма обучения: {program.form}
                </li>
                <li className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  {program.feature}
                </li>
              </ul>

              {/* CTA Button */}
              <motion.a
                href="#admissions"
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold bg-gradient-to-r ${program.gradient} shadow-lg group/btn`}
                whileHover={{ x: 5 }}
              >
                <span>Подробнее</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
