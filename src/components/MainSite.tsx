import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  GraduationCap,
  Users,
  BookOpen,
  Award,
  Mail,
  Phone,
  MapPin,
  Star,
  TrendingUp,
  Shield,
  Zap,
  ArrowRight,
  Menu,
  X,
  Sun,
  Moon,
} from 'lucide-react'

interface MainSiteProps {
  onNavigateToDiary: () => void
}

export default function MainSite({ onNavigateToDiary }: MainSiteProps) {
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { id: 'home', label: 'Главная' },
    { id: 'about', label: 'О техникуме' },
    { id: 'applicant', label: 'Абитуриенту' },
    { id: 'student', label: 'Студенту' },
    { id: 'staff', label: 'Сотруднику' },
    { id: 'parents', label: 'Родителям' },
    { id: 'news', label: 'Новости' },
    { id: 'contacts', label: 'Контакты' },
  ]

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900' : 'bg-white'}`}>
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollY > 50
            ? isDark
              ? 'bg-slate-900/95 backdrop-blur-xl shadow-xl shadow-blue-500/10'
              : 'bg-white/95 backdrop-blur-xl shadow-xl shadow-blue-500/5'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center ${isDark ? 'shadow-lg shadow-blue-500/50' : 'shadow-lg'}`}>
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  ЛПТТ
                </h1>
                <p className={`text-xs ${isDark ? 'text-blue-300' : 'text-blue-600'}`}>
                  Ленинградский политехнический техникум
                </p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveSection(item.id)}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                    activeSection === item.id
                      ? isDark
                        ? 'bg-blue-500/20 text-blue-300'
                        : 'bg-blue-50 text-blue-600'
                      : isDark
                      ? 'text-slate-300 hover:bg-blue-500/10'
                      : 'text-slate-600 hover:bg-blue-50'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsDark(!isDark)}
                className={`p-3 rounded-xl ${
                  isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-50 text-blue-600'
                }`}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>

              {/* Diary Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNavigateToDiary}
                className="hidden lg:flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
              >
                Электронный дневник
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              {/* Mobile Menu */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden p-3 rounded-xl ${
                  isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-50 text-blue-600'
                }`}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`lg:hidden border-t ${
                isDark ? 'border-blue-500/20 bg-slate-900/95' : 'border-blue-100 bg-white/95'
              } backdrop-blur-xl`}
            >
              <div className="container mx-auto px-6 py-4 space-y-2">
                {navigation.map((item) => (
                  <motion.button
                    key={item.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setActiveSection(item.id)
                      setMobileMenuOpen(false)
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all ${
                      activeSection === item.id
                        ? isDark
                          ? 'bg-blue-500/20 text-blue-300'
                          : 'bg-blue-50 text-blue-600'
                        : isDark
                        ? 'text-slate-300 hover:bg-blue-500/10'
                        : 'text-slate-600 hover:bg-blue-50'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={onNavigateToDiary}
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold"
                >
                  Электронный дневник
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Content */}
      <main className="pt-24">
        {activeSection === 'home' && <HomeSection isDark={isDark} onNavigateToDiary={onNavigateToDiary} />}
        {activeSection === 'about' && <AboutSection isDark={isDark} />}
        {activeSection === 'applicant' && <ApplicantSection isDark={isDark} />}
        {activeSection === 'student' && <StudentSection isDark={isDark} onNavigateToDiary={onNavigateToDiary} />}
        {activeSection === 'staff' && <StaffSection isDark={isDark} onNavigateToDiary={onNavigateToDiary} />}
        {activeSection === 'parents' && <ParentsSection isDark={isDark} onNavigateToDiary={onNavigateToDiary} />}
        {activeSection === 'news' && <NewsSection isDark={isDark} />}
        {activeSection === 'contacts' && <ContactsSection isDark={isDark} />}
      </main>

      {/* Footer */}
      <footer className={`mt-20 py-12 border-t ${isDark ? 'border-blue-500/20 bg-slate-900/50' : 'border-blue-100 bg-slate-50'}`}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className={`text-lg font-black mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                ЛПТТ
              </h3>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Ленинградский политехнический техникум — современное образование для успешного будущего
              </p>
            </div>
            <div>
              <h4 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Контакты
              </h4>
              <div className={`space-y-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +7 (XXX) XXX-XX-XX
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  info@lptt.ru
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  г. Ленинградская область
                </p>
              </div>
            </div>
            <div>
              <h4 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Быстрые ссылки
              </h4>
              <div className="space-y-2">
                <button
                  onClick={onNavigateToDiary}
                  className={`block text-sm ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
                >
                  Электронный дневник
                </button>
              </div>
            </div>
          </div>
          <div className={`mt-8 pt-8 border-t text-center text-sm ${
            isDark ? 'border-blue-500/20 text-slate-500' : 'border-blue-100 text-slate-500'
          }`}>
            <p>© 2025 ЛПТТ. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Home Section
function HomeSection({ isDark, onNavigateToDiary }: { isDark: boolean; onNavigateToDiary: () => void }) {
  const stats = [
    { icon: Users, label: 'Студентов', value: '500+' },
    { icon: BookOpen, label: 'Специальностей', value: '10+' },
    { icon: Award, label: 'Лет опыта', value: '50+' },
    { icon: TrendingUp, label: 'Трудоустройство', value: '95%' },
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
                  <stat.icon className={`w-10 h-10 mb-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
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

      {/* Features */}
      <section className={`py-20 ${isDark ? 'bg-slate-800/30' : 'bg-slate-50'}`}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl font-black mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Почему выбирают нас?
            </h2>
            <p className={`text-xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Современное образование для успешного будущего
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Современные технологии',
                desc: 'Обучение на актуальном оборудовании и программном обеспечении',
              },
              {
                icon: Shield,
                title: 'Гарантия трудоустройства',
                desc: '95% выпускников находят работу по специальности',
              },
              {
                icon: Star,
                title: 'Опытные преподаватели',
                desc: 'Практики с многолетним опытом в индустрии',
              },
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
        </div>
      </section>
    </div>
  )
}

// Placeholder sections (simplified for now)
function AboutSection({ isDark }: { isDark: boolean }) {
  return (
    <div className="container mx-auto px-6 py-20">
      <h2 className={`text-4xl font-black mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>
        О техникуме
      </h2>
      <p className={`text-xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
        История и достижения ЛПТТ...
      </p>
    </div>
  )
}

function ApplicantSection({ isDark }: { isDark: boolean }) {
  return (
    <div className="container mx-auto px-6 py-20">
      <h2 className={`text-4xl font-black mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>
        Абитуриенту
      </h2>
      <p className={`text-xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
        Информация для поступающих...
      </p>
    </div>
  )
}

function StudentSection({ isDark, onNavigateToDiary }: { isDark: boolean; onNavigateToDiary: () => void }) {
  return (
    <div className="container mx-auto px-6 py-20">
      <h2 className={`text-4xl font-black mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>
        Студенту
      </h2>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNavigateToDiary}
        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl font-bold text-lg"
      >
        Перейти в электронный дневник
      </motion.button>
    </div>
  )
}

function StaffSection({ isDark, onNavigateToDiary }: { isDark: boolean; onNavigateToDiary: () => void }) {
  return (
    <div className="container mx-auto px-6 py-20">
      <h2 className={`text-4xl font-black mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>
        Сотруднику
      </h2>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNavigateToDiary}
        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl font-bold text-lg"
      >
        Войти в систему
      </motion.button>
    </div>
  )
}

function ParentsSection({ isDark, onNavigateToDiary }: { isDark: boolean; onNavigateToDiary: () => void }) {
  return (
    <div className="container mx-auto px-6 py-20">
      <h2 className={`text-4xl font-black mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>
        Родителям
      </h2>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNavigateToDiary}
        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl font-bold text-lg"
      >
        Электронный дневник
      </motion.button>
    </div>
  )
}

function NewsSection({ isDark }: { isDark: boolean }) {
  return (
    <div className="container mx-auto px-6 py-20">
      <h2 className={`text-4xl font-black mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>
        Новости
      </h2>
      <p className={`text-xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
        Последние события техникума...
      </p>
    </div>
  )
}

function ContactsSection({ isDark }: { isDark: boolean }) {
  return (
    <div className="container mx-auto px-6 py-20">
      <h2 className={`text-4xl font-black mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>
        Контакты
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Свяжитесь с нами
          </h3>
          <div className={`space-y-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            <p className="flex items-center gap-3">
              <Phone className="w-5 h-5" />
              +7 (XXX) XXX-XX-XX
            </p>
            <p className="flex items-center gap-3">
              <Mail className="w-5 h-5" />
              info@lptt.ru
            </p>
            <p className="flex items-center gap-3">
              <MapPin className="w-5 h-5" />
              г. Ленинградская область
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
