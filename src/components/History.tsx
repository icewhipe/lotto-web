import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from '../hooks/useInView'
import { Calendar, Building2, Users2, Trophy } from 'lucide-react'

const timeline = [
  {
    year: '1958',
    title: 'Основание техникума',
    description: 'Лискинский промышленно-транспортный техникум был основан для подготовки квалифицированных специалистов для развивающейся железнодорожной отрасли региона.',
    icon: Building2,
  },
  {
    year: '1975',
    title: 'Расширение специальностей',
    description: 'Открыты новые специальности по техническому обслуживанию автомобильного транспорта и электроснабжению.',
    icon: Users2,
  },
  {
    year: '1995',
    title: 'Модернизация базы',
    description: 'Проведена масштабная модернизация материально-технической базы, открыты современные лаборатории и мастерские.',
    icon: Trophy,
  },
  {
    year: '2010',
    title: 'Информатизация',
    description: 'Внедрены современные информационные технологии в учебный процесс, открыты компьютерные классы.',
    icon: Calendar,
  },
  {
    year: '2020',
    title: 'Цифровая трансформация',
    description: 'Внедрены дистанционные технологии обучения, электронный документооборот, современные образовательные платформы.',
    icon: Trophy,
  },
  {
    year: '2025',
    title: 'Современный техникум',
    description: 'ЛПТТ - лидер профессионального образования региона с современной базой, квалифицированными кадрами и высокими показателями трудоустройства выпускников.',
    icon: Trophy,
  },
]

export default function History() {
  const ref = useRef(null)
  const isInView = useInView(ref, { threshold: 0.1 })

  return (
    <section id="history" className="section-padding bg-gray-50 dark:bg-gray-900/50" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 glass-effect rounded-full text-sm font-semibold">
            История
          </span>
          <h2 className="text-4xl md:text-5xl font-black">
            Наша <span className="gradient-text">история</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Более 65 лет мы готовим квалифицированных специалистов для промышленности и транспорта
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-purple-600 transform -translate-x-1/2" />

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className={`relative grid lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 0 ? '' : 'lg:grid-flow-dense'
                }`}
              >
                {/* Content */}
                <div className={`${index % 2 === 0 ? 'lg:text-right' : 'lg:col-start-2'}`}>
                  <motion.div
                    className="glass-effect rounded-3xl p-8 hover:shadow-2xl transition-all duration-300"
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <div className={`flex items-center gap-4 mb-4 ${index % 2 === 0 ? 'lg:justify-end' : ''}`}>
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-3xl font-black gradient-text">{item.year}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                </div>

                {/* Timeline Dot */}
                <div className="hidden lg:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 border-4 border-white dark:border-gray-900 shadow-lg"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: index * 0.2 + 0.3, type: 'spring' }}
                    whileHover={{ scale: 1.5 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { number: '65+', label: 'лет на рынке образования', gradient: 'from-primary-500 to-purple-600' },
            { number: '15,000+', label: 'выпускников', gradient: 'from-secondary-500 to-pink-600' },
            { number: '98%', label: 'трудоустроенных', gradient: 'from-cyan-500 to-blue-600' },
            { number: '50+', label: 'партнеров-работодателей', gradient: 'from-green-500 to-emerald-600' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.4 + index * 0.1, type: 'spring' }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 text-center border-2 border-violet-200/50 dark:border-violet-800/50 hover:border-violet-400 dark:hover:border-violet-600 shadow-lg hover:shadow-xl transition-all"
              whileHover={{ y: -5, scale: 1.05 }}
            >
              <div className={`text-3xl md:text-4xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}>
                {stat.number}
              </div>
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
