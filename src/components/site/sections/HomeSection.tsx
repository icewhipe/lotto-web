import { motion } from 'framer-motion'
import {
  Users,
  BookOpen,
  Award,
  TrendingUp,
  Zap,
  Shield,
  Star,
  Calendar,
  GraduationCap,
  Newspaper,
} from 'lucide-react'

interface HomeSectionProps {
  isDark: boolean
  onNavigate: (section: string, subsection?: string) => void
  onNavigateToDiary: () => void
}

export default function HomeSection({ isDark, onNavigate, onNavigateToDiary }: HomeSectionProps) {
  const stats = [
    { icon: Users, label: 'Студентов', value: '500+', color: 'from-blue-500 to-cyan-500' },
    { icon: BookOpen, label: 'Специальностей', value: '10+', color: 'from-violet-500 to-purple-500' },
    { icon: Award, label: 'Лет опыта', value: '50+', color: 'from-orange-500 to-red-500' },
    { icon: TrendingUp, label: 'Трудоустройство', value: '95%', color: 'from-green-500 to-emerald-500' },
  ]

  const quickLinks = [
    { icon: Calendar, label: 'Расписание', action: () => onNavigate('students', 'schedule') },
    { icon: GraduationCap, label: 'Специальности', action: () => onNavigate('applicants', 'specialties') },
    { icon: Newspaper, label: 'Новости', action: () => onNavigate('press-center', 'news') },
    { icon: BookOpen, label: 'Дневник', action: onNavigateToDiary },
  ]

  return (
    <div className="space-y-20">
      {/* Hero */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`inline-block px-4 py-2 rounded-full mb-6 ${
                isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-50 text-blue-600'
              }`}
            >
              <span className="text-sm font-bold">Набор 2025-2026</span>
            </motion.div>
            
            <h1 className={`text-5xl lg:text-6xl font-black mb-6 leading-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Твоё будущее
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                начинается здесь
              </span>
            </h1>
            
            <p className={`text-xl mb-8 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Современное профессиональное образование в Ленинградском политехническом техникуме
            </p>
            
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('applicants', 'application-screen')}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
              >
                Подать документы
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNavigateToDiary}
                className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all ${
                  isDark
                    ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30'
                    : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                }`}
              >
                Электронный дневник
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl blur-3xl opacity-20`} />
            <div className={`relative grid grid-cols-2 gap-4`}>
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className={`p-6 rounded-2xl backdrop-blur-xl ${
                    isDark
                      ? 'bg-slate-800/50 border border-blue-500/20'
                      : 'bg-white border border-blue-100'
                  } shadow-xl`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className={`text-3xl font-black mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {stat.value}
                  </p>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className={`py-20 ${isDark ? 'bg-slate-800/30' : 'bg-slate-50'}`}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl font-black mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Быстрый доступ
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickLinks.map((link, index) => (
              <motion.button
                key={link.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={link.action}
                className={`p-8 rounded-2xl ${
                  isDark
                    ? 'bg-slate-800/50 border border-blue-500/20'
                    : 'bg-white border border-blue-100'
                } shadow-xl text-center`}
              >
                <link.icon className={`w-12 h-12 mx-auto mb-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                <p className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {link.label}
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl font-black mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Почему выбирают нас?
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Zap, title: 'Современные технологии', desc: 'Обучение на актуальном оборудовании' },
            { icon: Shield, title: 'Гарантия трудоустройства', desc: '95% выпускников находят работу' },
            { icon: Star, title: 'Опытные преподаватели', desc: 'Практики с многолетним опытом' },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className={`p-8 rounded-2xl ${
                isDark
                  ? 'bg-slate-800/50 border border-blue-500/20'
                  : 'bg-white border border-blue-100'
              } shadow-xl`}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-xl font-black mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {feature.title}
              </h3>
              <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
