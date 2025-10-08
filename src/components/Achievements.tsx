import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from '../hooks/useInView'
import { Trophy, Medal, Award, Star, Target, Crown } from 'lucide-react'

const achievements = [
  {
    icon: Trophy,
    title: '1 место на региональном чемпионате WorldSkills',
    category: 'Профессиональные олимпиады',
    year: '2024',
    description: 'Студент специальности "Техническая эксплуатация подвижного состава" занял первое место',
    gradient: 'from-yellow-500 to-orange-600',
  },
  {
    icon: Medal,
    title: 'Призеры всероссийской олимпиады по информатике',
    category: 'Академические достижения',
    year: '2024',
    description: 'Команда студентов вошла в тройку лучших на всероссийском уровне',
    gradient: 'from-primary-500 to-purple-600',
  },
  {
    icon: Award,
    title: 'Лучшее учебное заведение Воронежской области',
    category: 'Награды техникума',
    year: '2023',
    description: 'Присвоено звание по итогам государственной аттестации',
    gradient: 'from-secondary-500 to-pink-600',
  },
  {
    icon: Star,
    title: 'Победители спортивных соревнований',
    category: 'Спортивные достижения',
    year: '2024',
    description: 'Сборная техникума заняла призовые места в областных соревнованиях по волейболу и футболу',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    icon: Target,
    title: '98% трудоустройства выпускников',
    category: 'Показатели эффективности',
    year: '2024',
    description: 'Высокий процент выпускников трудоустроены по специальности в первые 3 месяца',
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    icon: Crown,
    title: 'Грант на развитие материальной базы',
    category: 'Финансирование',
    year: '2023',
    description: 'Получен федеральный грант на модернизацию лабораторий и мастерских',
    gradient: 'from-indigo-500 to-purple-600',
  },
]

const stats = [
  {
    number: '120+',
    label: 'наград и дипломов',
    icon: Trophy,
    gradient: 'from-yellow-500 to-orange-600',
  },
  {
    number: '15',
    label: 'победителей WorldSkills',
    icon: Medal,
    gradient: 'from-primary-500 to-purple-600',
  },
  {
    number: '98%',
    label: 'успеваемость студентов',
    icon: Star,
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    number: '50+',
    label: 'партнеров-работодателей',
    icon: Award,
    gradient: 'from-cyan-500 to-blue-600',
  },
]

export default function Achievements() {
  const ref = useRef(null)
  const isInView = useInView(ref, { threshold: 0.05 })

  return (
    <section id="achievements" className="section-padding" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 glass-effect rounded-full text-sm font-semibold">
            Достижения
          </span>
          <h2 className="text-4xl md:text-5xl font-black">
            Наши <span className="gradient-text">успехи</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Мы гордимся достижениями наших студентов и постоянно стремимся к новым высотам
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="glass-effect rounded-3xl p-6 text-center"
            >
              <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`text-3xl md:text-4xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}>
                {stat.number}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-effect rounded-3xl p-8 group cursor-pointer"
            >
              <motion.div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${achievement.gradient} flex items-center justify-center mb-6 shadow-lg`}
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <achievement.icon className="w-8 h-8 text-white" />
              </motion.div>

              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                  {achievement.category}
                </span>
                <span className="text-xs font-bold gradient-text">
                  {achievement.year}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-3 leading-tight group-hover:gradient-text transition-all">
                {achievement.title}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {achievement.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
