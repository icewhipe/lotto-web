import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
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
  Sparkles,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react'
import { publicAPI } from '../../services/api'

interface LiquidGlassHomeV2Props {
  isDark: boolean
  onNavigate: (section: string, subsection?: string) => void
  onNavigateToDiary: () => void
}

export default function LiquidGlassHomeV2({ isDark, onNavigate, onNavigateToDiary }: LiquidGlassHomeV2Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  // Mouse position for liquid effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 150 }
  const mouseXSpring = useSpring(mouseX, springConfig)

  const [stats, setStats] = useState({
    students: 532,
    specialties: 12,
    years: 50,
    employment: 98,
  })

  const [contacts, setContacts] = useState({
    phone: '+7 (47391) 4-11-91',
    email: 'lptt@lptt.obrvrn.ru',
  })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  useEffect(() => {
    // Load stats from API
    publicAPI.getStats().then(response => {
      if (response.success && response.data) {
        setStats({
          students: response.data.students || 532,
          specialties: response.data.specialties || 12,
          years: response.data.yearsOfExperience || 50,
          employment: response.data.employmentRate || 98,
        })
      }
    })

    // Load contacts
    publicAPI.getContacts().then(response => {
      if (response.success && response.data) {
        setContacts({
          phone: response.data.phone || '+7 (47391) 4-11-91',
          email: response.data.email || 'lptt@lptt.obrvrn.ru',
        })
      }
    })
  }, [])

  const statsData = [
    { icon: Users, label: 'Студентов', value: `${stats.students}+`, color: 'from-blue-500 to-cyan-500' },
    { icon: BookOpen, label: 'Специальностей', value: `${stats.specialties}+`, color: 'from-violet-500 to-purple-500' },
    { icon: Award, label: 'Лет опыта', value: `${stats.years}+`, color: 'from-orange-500 to-red-500' },
    { icon: TrendingUp, label: 'Трудоустройство', value: `${stats.employment}%`, color: 'from-green-500 to-emerald-500' },
  ]

  const features = [
    {
      icon: Zap,
      title: 'Современные технологии',
      desc: 'Обучение на актуальном оборудовании и программном обеспечении',
      gradient: 'from-yellow-400 to-orange-500',
    },
    {
      icon: Shield,
      title: 'Гарантия трудоустройства',
      desc: `${stats.employment}% выпускников находят работу по специальности`,
      gradient: 'from-blue-400 to-cyan-500',
    },
    {
      icon: Star,
      title: 'Опытные преподаватели',
      desc: 'Практики с многолетним опытом работы в индустрии',
      gradient: 'from-purple-400 to-pink-500',
    },
  ]

  const quickLinks = [
    { icon: Calendar, label: 'Расписание', action: () => onNavigate('students', 'schedule'), color: 'from-blue-500 to-cyan-500' },
    { icon: GraduationCap, label: 'Специальности', action: () => onNavigate('applicants', 'specialties'), color: 'from-violet-500 to-purple-500' },
    { icon: Newspaper, label: 'Новости', action: () => onNavigate('press-center', 'news'), color: 'from-orange-500 to-red-500' },
    { icon: BookOpen, label: 'Дневник', action: onNavigateToDiary, color: 'from-green-500 to-emerald-500' },
  ]

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* Animated liquid background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{
            y: y1,
            x: useTransform(mouseXSpring, [0, window.innerWidth], [-50, 50]),
          }}
          className={`absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full blur-3xl ${
            isDark
              ? 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10'
              : 'bg-gradient-to-br from-blue-500/5 to-cyan-500/5'
          }`}
        />
        <motion.div
          style={{
            y: y2,
            x: useTransform(mouseXSpring, [0, window.innerWidth], [50, -50]),
          }}
          className={`absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full blur-3xl ${
            isDark
              ? 'bg-gradient-to-br from-violet-500/10 to-purple-500/10'
              : 'bg-gradient-to-br from-violet-500/5 to-purple-500/5'
          }`}
        />

        {/* Flowing particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full bg-gradient-to-r ${statsData[i % 4].color}`}
            style={{
              left: `${20 + i * 6}%`,
              top: `${10 + (i * 7) % 80}%`,
            }}
            animate={{
              y: [-30, 30, -30],
              x: [-20, 20, -20],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Hero Section - Compact & Raised */}
      <section className="relative min-h-[70vh] flex items-center pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            {/* Badges Row - Location + Enrollment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-3 mb-6"
            >
              {/* Location Badge */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full backdrop-blur-xl ${
                  isDark
                    ? 'bg-white/5 border border-white/10'
                    : 'bg-white/70 border border-white/30'
                } shadow-lg`}
              >
                <MapPin className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-blue-600'}`} />
                <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  г. Лиски, ул. Лысенко, 1А
                </span>
              </motion.div>

              {/* Enrollment Badge */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full backdrop-blur-xl ${
                  isDark
                    ? 'bg-white/5 border border-white/10'
                    : 'bg-white/70 border border-white/30'
                } shadow-lg group`}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-blue-600'}`} />
                </motion.div>
                <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Набор 2025-2026
                </span>
              </motion.div>
            </motion.div>

            {/* Main Heading - Compact Bold */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`text-6xl lg:text-7xl font-black leading-[1.05] mb-5 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Лискинский
              <br />
              Промышленно-Транспортный
              <br />
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-600 bg-clip-text text-transparent">
                  Техникум
                </span>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-600 rounded-full"
                />
              </span>
            </motion.h1>

            {/* Stats Row - 4 badges above fold */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 max-w-4xl"
            >
              {statsData.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className={`relative p-4 rounded-2xl backdrop-blur-xl ${
                    isDark
                      ? 'bg-white/5 border border-white/10'
                      : 'bg-white/70 border border-white/30'
                  } shadow-xl overflow-hidden group`}
                >
                  {/* Glow effect */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10`}
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{ backgroundSize: '200% 200%' }}
                  />

                  <div className="relative flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'} leading-tight`}>
                        {stat.value}
                      </p>
                      <p className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'} leading-tight truncate`}>
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 mb-6"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate('applicants', 'application-screen')}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl font-bold text-base shadow-2xl shadow-blue-500/50 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Подать документы
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={onNavigateToDiary}
                className={`px-8 py-4 rounded-2xl font-bold text-base backdrop-blur-xl ${
                  isDark
                    ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                    : 'bg-white/70 border border-white/30 text-slate-900 hover:bg-white/90'
                } shadow-xl transition-all`}
              >
                Электронный дневник
              </motion.button>
            </motion.div>

            {/* Contact Info Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap items-center gap-4 mb-5"
            >
              <div className="flex items-center gap-2">
                <Phone className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-blue-600'}`} />
                <a href={`tel:${contacts.phone.replace(/\s+/g, '')}`} className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'} hover:underline`}>
                  {contacts.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-blue-600'}`} />
                <a href={`mailto:${contacts.email}`} className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'} hover:underline`}>
                  {contacts.email}
                </a>
              </div>
            </motion.div>

            {/* Trust Badges Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap items-center gap-4"
            >
              {[
                { icon: CheckCircle2, text: 'Гос. аккредитация' },
                { icon: CheckCircle2, text: 'Лицензия' },
                { icon: CheckCircle2, text: 'Диплом гос. образца' },
              ].map((badge, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2"
                >
                  <badge.icon className={`w-5 h-5 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                  <span className={`text-sm font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {badge.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="relative py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className={`text-4xl font-black mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Быстрый доступ
            </h2>
            <p className={`text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Популярные разделы портала
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickLinks.map((link, index) => (
              <motion.button
                key={link.label}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={link.action}
                className={`group relative p-8 rounded-3xl backdrop-blur-xl ${
                  isDark
                    ? 'bg-white/5 border border-white/10 hover:bg-white/10'
                    : 'bg-white/70 border border-white/30 hover:bg-white/90'
                } shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden`}
              >
                {/* Liquid gradient glow */}
                <motion.div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${link.color} opacity-0 group-hover:opacity-20 blur-xl`}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{ backgroundSize: '200% 200%' }}
                />

                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.15 }}
                  transition={{ duration: 0.6 }}
                  className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${link.color} flex items-center justify-center shadow-lg relative z-10`}
                >
                  <link.icon className="w-7 h-7 text-white" />
                </motion.div>

                {/* Label */}
                <p className={`font-bold text-base relative z-10 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {link.label}
                </p>

                {/* Arrow */}
                <motion.div
                  className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100"
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}
                >
                  <ArrowRight className={`w-5 h-5 ${isDark ? 'text-cyan-400' : 'text-blue-600'}`} />
                </motion.div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className={`text-4xl font-black mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Почему выбирают ЛПТТ?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -15, scale: 1.02 }}
                className={`group relative p-8 rounded-3xl backdrop-blur-xl ${
                  isDark
                    ? 'bg-white/5 border border-white/10'
                    : 'bg-white/70 border border-white/30'
                } shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden`}
              >
                {/* Animated liquid gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10`}
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                  style={{ backgroundSize: '200% 200%' }}
                />

                {/* Icon */}
                <div className={`relative w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className={`text-2xl font-black mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {feature.title}
                </h3>

                {/* Description */}
                <p className={`text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {feature.desc}
                </p>

                {/* Decorative liquid blob */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{ duration: 10, repeat: Infinity }}
                  className="absolute top-6 right-6 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-2xl"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
