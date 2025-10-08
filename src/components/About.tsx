import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from '../hooks/useInView'
import { BookOpen, Users, Award, TrendingUp, Heart, Sparkles } from 'lucide-react'

const features = [
  {
    icon: BookOpen,
    title: 'Современная программа обучения',
    description: 'Актуальные знания и навыки, востребованные на рынке труда',
    gradient: 'from-primary-500 to-purple-600',
  },
  {
    icon: Users,
    title: 'Опытные преподаватели',
    description: 'Квалифицированный педагогический состав с практическим опытом',
    gradient: 'from-secondary-500 to-pink-600',
  },
  {
    icon: Award,
    title: 'Современное оборудование',
    description: 'Оснащенные лаборатории и мастерские для практических занятий',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    icon: TrendingUp,
    title: 'Помощь в трудоустройстве',
    description: 'Партнерство с ведущими предприятиями региона',
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    icon: Heart,
    title: 'Дополнительное образование',
    description: 'Кружки, секции и развивающие программы для студентов',
    gradient: 'from-orange-500 to-yellow-600',
  },
  {
    icon: Sparkles,
    title: 'Студенческая жизнь',
    description: 'Активная внеучебная деятельность и мероприятия',
    gradient: 'from-purple-500 to-indigo-600',
  },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { threshold: 0.1 })

  return (
    <section id="about" className="section-padding bg-gray-50 dark:bg-gray-900/50" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 glass-effect rounded-full text-sm font-semibold">
            О техникуме
          </span>
          <h2 className="text-4xl md:text-5xl font-black">
            Почему выбирают <span className="gradient-text">ЛПТТ?</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Мы создаем условия для успешного старта вашей карьеры
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-effect rounded-3xl p-8 cursor-pointer group"
            >
              <motion.div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg`}
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <feature.icon className="w-7 h-7 text-white" />
              </motion.div>
              
              <h3 className="text-xl font-bold mb-3 group-hover:gradient-text transition-all">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
