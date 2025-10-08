import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from '../hooks/useInView'
import { 
  GraduationCap, 
  Building, 
  Users, 
  BookOpen, 
  Trophy, 
  Briefcase,
  Heart,
  Shield,
  TrendingUp,
  Zap,
  Globe,
  Award
} from 'lucide-react'

const advantages = [
  {
    icon: GraduationCap,
    title: 'Государственный диплом',
    description: 'Диплом государственного образца о среднем профессиональном образовании, признаваемый во всей России',
    gradient: 'from-primary-500 to-purple-600',
  },
  {
    icon: Building,
    title: 'Современная инфраструктура',
    description: 'Новые учебные корпуса, оборудованные лаборатории, мастерские с современным оборудованием',
    gradient: 'from-secondary-500 to-pink-600',
  },
  {
    icon: Users,
    title: 'Опытные преподаватели',
    description: 'Высококвалифицированный педагогический состав с большим практическим опытом работы',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    icon: BookOpen,
    title: 'Актуальные программы',
    description: 'Образовательные программы, соответствующие современным требованиям рынка труда и ФГОС',
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    icon: Trophy,
    title: 'Высокие результаты',
    description: 'Наши студенты - победители и призеры региональных и всероссийских олимпиад',
    gradient: 'from-yellow-500 to-orange-600',
  },
  {
    icon: Briefcase,
    title: 'Гарантия трудоустройства',
    description: '98% выпускников трудоустраиваются в течение первых 3 месяцев после окончания',
    gradient: 'from-indigo-500 to-purple-600',
  },
  {
    icon: Heart,
    title: 'Комфортные условия',
    description: 'Общежитие для иногородних, столовая, медпункт, спортзал, библиотека с читальным залом',
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    icon: Shield,
    title: 'Социальная поддержка',
    description: 'Стипендии, материальная помощь, бесплатное питание для льготных категорий',
    gradient: 'from-teal-500 to-cyan-600',
  },
  {
    icon: TrendingUp,
    title: 'Карьерный рост',
    description: 'Наши выпускники работают на ключевых позициях в ведущих компаниях региона',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    icon: Zap,
    title: 'Практическая подготовка',
    description: 'Производственная практика на предприятиях-партнерах с возможностью дальнейшего трудоустройства',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    icon: Globe,
    title: 'Международное сотрудничество',
    description: 'Участие в международных образовательных программах и обмен опытом',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    icon: Award,
    title: 'Дополнительное образование',
    description: 'Курсы повышения квалификации, кружки, секции, творческие студии для всестороннего развития',
    gradient: 'from-emerald-500 to-green-600',
  },
]

export default function Advantages() {
  const ref = useRef(null)
  const isInView = useInView(ref, { threshold: 0.05 })

  return (
    <section id="advantages" className="section-padding" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 glass-effect rounded-full text-sm font-semibold">
            Наши преимущества
          </span>
          <h2 className="text-4xl md:text-5xl font-black">
            Почему <span className="gradient-text">стоит учиться</span> в ЛПТТ?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Мы предоставляем все условия для качественного образования и успешного старта вашей карьеры
          </p>
        </motion.div>

        {/* Advantages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {advantages.map((advantage, index) => (
            <motion.div
              key={advantage.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-effect rounded-3xl p-6 cursor-pointer group"
            >
              <motion.div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${advantage.gradient} flex items-center justify-center mb-4 shadow-lg`}
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <advantage.icon className="w-7 h-7 text-white" />
              </motion.div>

              <h3 className="text-lg font-bold mb-2 group-hover:gradient-text transition-all">
                {advantage.title}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {advantage.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <a href="#admissions" className="btn-primary inline-flex">
            <span>Поступить в ЛПТТ</span>
            <GraduationCap className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
