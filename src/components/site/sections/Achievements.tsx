import { motion } from 'framer-motion'
import { Trophy, Star, Award, Medal, Target, Zap } from 'lucide-react'

interface AchievementsProps {
  isDark: boolean
}

const Achievements = ({ isDark }: AchievementsProps) => {
  const achievements = [
    {
      icon: Trophy,
      title: 'Победа в WorldSkills',
      description: 'Золотая медаль по компетенции "Программирование"',
      year: '2024',
      color: 'from-yellow-500 to-orange-500',
      highlight: true
    },
    {
      icon: Award,
      title: 'Лучший техникум региона',
      description: 'По версии Министерства образования',
      year: '2024',
      color: 'from-blue-500 to-cyan-500',
      highlight: true
    },
    {
      icon: Medal,
      title: '15 медалистов',
      description: 'Выпускники 2024 года с красными дипломами',
      year: '2024',
      color: 'from-red-500 to-pink-500',
      highlight: false
    },
    {
      icon: Star,
      title: 'Топ-10 в России',
      description: 'Рейтинг профессиональных образовательных организаций',
      year: '2023',
      color: 'from-purple-500 to-indigo-500',
      highlight: false
    },
    {
      icon: Target,
      title: '98% трудоустройство',
      description: 'Выпускники находят работу в течение 3 месяцев',
      year: '2024',
      color: 'from-green-500 to-emerald-500',
      highlight: false
    },
    {
      icon: Zap,
      title: 'Инновационная площадка',
      description: 'Федеральный статус экспериментальной площадки',
      year: '2023',
      color: 'from-orange-500 to-red-500',
      highlight: false
    }
  ]

  return (
    <section className="relative py-20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className={`text-4xl lg:text-5xl font-black mb-4 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Наши достижения
          </h2>
          <p className={`text-lg ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Гордимся успехами студентов и преподавателей
          </p>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10, scale: 1.03 }}
              className={`group relative p-6 rounded-3xl backdrop-blur-xl ${
                achievement.highlight
                  ? `bg-gradient-to-br ${achievement.color} shadow-2xl`
                  : isDark
                  ? 'bg-white/5 border border-white/10 hover:bg-white/10'
                  : 'bg-white/80 border border-white/40 hover:bg-white'
              } ${achievement.highlight ? 'shadow-2xl' : 'shadow-lg hover:shadow-2xl'} transition-all duration-300 overflow-hidden`}
            >
              {/* Background Glow */}
              {!achievement.highlight && (
                <div className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              )}

              {/* Year Badge */}
              <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${
                achievement.highlight
                  ? 'bg-white/20 text-white'
                  : isDark
                  ? 'bg-white/10 text-slate-300'
                  : 'bg-slate-100 text-slate-700'
              }`}>
                {achievement.year}
              </div>

              {/* Icon */}
              <div className={`relative w-16 h-16 mb-4 rounded-2xl ${
                achievement.highlight
                  ? 'bg-white/20'
                  : `bg-gradient-to-br ${achievement.color}`
              } flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                <achievement.icon className={`w-8 h-8 ${
                  achievement.highlight ? 'text-white' : 'text-white'
                }`} />
              </div>

              {/* Content */}
              <h3 className={`text-xl font-bold mb-2 ${
                achievement.highlight
                  ? 'text-white'
                  : isDark
                  ? 'text-white'
                  : 'text-slate-900'
              }`}>
                {achievement.title}
              </h3>

              <p className={`text-sm ${
                achievement.highlight
                  ? 'text-white/90'
                  : isDark
                  ? 'text-slate-400'
                  : 'text-slate-600'
              }`}>
                {achievement.description}
              </p>

              {/* Shimmer Effect for Highlights */}
              {achievement.highlight && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className={`mt-12 p-8 rounded-3xl backdrop-blur-xl ${
            isDark
              ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10'
              : 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100'
          }`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className={`text-4xl font-black mb-2 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent`}>
                120+
              </div>
              <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Наград и дипломов
              </div>
            </div>
            <div>
              <div className={`text-4xl font-black mb-2 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent`}>
                25
              </div>
              <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Лет в топе региона
              </div>
            </div>
            <div>
              <div className={`text-4xl font-black mb-2 bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent`}>
                98%
              </div>
              <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Трудоустройство
              </div>
            </div>
            <div>
              <div className={`text-4xl font-black mb-2 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent`}>
                50+
              </div>
              <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Партнёров-работодателей
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Achievements
