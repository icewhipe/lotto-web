import { motion } from 'framer-motion'
import { BookOpen, Users, Code, Award, CreditCard, Briefcase } from 'lucide-react'

interface EducationalProjectsProps {
  isDark: boolean
}

const EducationalProjects = ({ isDark }: EducationalProjectsProps) => {
  const projects = [
    {
      icon: CreditCard,
      title: 'Образовательный кредит',
      description: 'Льготные условия кредитования обучения',
      color: 'from-blue-500 to-cyan-500',
      link: '#credit'
    },
    {
      icon: Users,
      title: 'Наставничество',
      description: 'Программа поддержки студентов',
      color: 'from-purple-500 to-pink-500',
      link: '#mentoring'
    },
    {
      icon: Code,
      title: 'Код будущего',
      description: 'Бесплатное обучение программированию',
      color: 'from-green-500 to-emerald-500',
      link: '#code-future'
    },
    {
      icon: Award,
      title: 'Первая профессия',
      description: 'Получи профессию уже в школе',
      color: 'from-orange-500 to-red-500',
      link: '#first-profession'
    },
    {
      icon: Briefcase,
      title: 'Профессионалитет',
      description: 'Инновационная образовательная программа',
      color: 'from-indigo-500 to-blue-500',
      link: '#professionalitet'
    },
    {
      icon: BookOpen,
      title: 'Билет в будущее',
      description: 'Профориентация для школьников',
      color: 'from-teal-500 to-cyan-500',
      link: '#ticket-future'
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
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className={`text-4xl lg:text-5xl font-black mb-4 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Образовательные проекты
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Участвуйте в федеральных и региональных программах для развития своих навыков
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.a
              key={project.title}
              href={project.link}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`group relative p-6 rounded-3xl backdrop-blur-xl ${
                isDark
                  ? 'bg-white/5 border border-white/10 hover:bg-white/10'
                  : 'bg-white/80 border border-white/40 hover:bg-white'
              } shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer`}
            >
              {/* Gradient Background Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              {/* Icon */}
              <div className={`relative w-14 h-14 mb-4 rounded-2xl bg-gradient-to-br ${project.color} flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                <project.icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className={`text-xl font-bold mb-2 ${
                isDark ? 'text-white' : 'text-slate-900'
              } group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:${project.color} group-hover:bg-clip-text transition-all duration-300`}>
                {project.title}
              </h3>
              
              <p className={`text-sm ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              } group-hover:text-slate-500 transition-colors duration-300`}>
                {project.description}
              </p>

              {/* Arrow Indicator */}
              <motion.div
                className={`mt-4 flex items-center gap-2 text-sm font-semibold ${
                  isDark ? 'text-blue-400' : 'text-blue-600'
                } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                initial={{ x: -10 }}
                whileHover={{ x: 0 }}
              >
                Подробнее
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EducationalProjects
