import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from '../hooks/useInView'
import { Building2, Handshake } from 'lucide-react'

const partners = [
  {
    name: 'ОАО "Российские железные дороги"',
    type: 'Производственная практика',
    logo: '🚂',
    gradient: 'from-red-500 to-orange-600',
  },
  {
    name: 'ЛВРЗ - Лискинский вагоноремонтный завод',
    type: 'Трудоустройство',
    logo: '🏭',
    gradient: 'from-primary-500 to-purple-600',
  },
  {
    name: 'АО "НЛМК"',
    type: 'Партнер',
    logo: '⚙️',
    gradient: 'from-secondary-500 to-pink-600',
  },
  {
    name: 'Воронежский государственный технический университет',
    type: 'Образовательное сотрудничество',
    logo: '🎓',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    name: 'Группа ГАЗ',
    type: 'Производственная практика',
    logo: '🚗',
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    name: 'Воронежская электросеть',
    type: 'Трудоустройство',
    logo: '⚡',
    gradient: 'from-yellow-500 to-orange-600',
  },
  {
    name: 'ООО "Стройтехмонтаж"',
    type: 'Партнер',
    logo: '🏗️',
    gradient: 'from-indigo-500 to-purple-600',
  },
  {
    name: 'IT-компании Воронежа',
    type: 'Трудоустройство',
    logo: '💻',
    gradient: 'from-pink-500 to-rose-600',
  },
]

const stats = [
  { number: '50+', label: 'партнеров-работодателей', icon: Building2 },
  { number: '98%', label: 'трудоустройства', icon: Handshake },
  { number: '500+', label: 'рабочих мест ежегодно', icon: Building2 },
]

export default function Partners() {
  const ref = useRef(null)
  const isInView = useInView(ref, { threshold: 0.05 })

  return (
    <section id="partners" className="section-padding" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 glass-effect rounded-full text-sm font-semibold">
            Партнеры
          </span>
          <h2 className="text-4xl md:text-5xl font-black">
            Наши <span className="gradient-text">партнеры</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Мы сотрудничаем с ведущими предприятиями региона для обеспечения качественной практики и трудоустройства выпускников
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-effect rounded-3xl p-8 text-center"
            >
              <stat.icon className="w-12 h-12 mx-auto mb-4 text-primary-600 dark:text-primary-400" />
              <div className="text-4xl font-black gradient-text mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Partners Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + index * 0.05 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-effect rounded-3xl p-6 text-center group cursor-pointer"
            >
              <motion.div
                className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${partner.gradient} flex items-center justify-center text-4xl shadow-lg`}
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                {partner.logo}
              </motion.div>

              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-3">
                {partner.type}
              </span>

              <h3 className="font-bold text-sm leading-tight group-hover:gradient-text transition-all">
                {partner.name}
              </h3>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
          className="mt-16 glass-effect rounded-3xl p-12 text-center"
        >
          <Handshake className="w-16 h-16 mx-auto mb-4 text-primary-600 dark:text-primary-400" />
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Хотите стать партнером?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Мы всегда открыты для сотрудничества с работодателями и готовы обсудить возможности взаимовыгодного партнерства
          </p>
          <a href="#contacts" className="btn-primary inline-flex">
            <span>Связаться с нами</span>
            <Handshake className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
