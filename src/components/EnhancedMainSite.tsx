import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  GraduationCap,
  Menu,
  X,
  Sun,
  Moon,
  Search,
  ChevronDown,
  LogIn,
  Users,
  BookOpen,
  Award,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  TrendingUp,
  Shield,
  Zap,
  Target,
} from 'lucide-react'
import Hero from './Hero'

interface EnhancedMainSiteProps {
  onNavigateToDiary: () => void
}

export default function EnhancedMainSite({ onNavigateToDiary }: EnhancedMainSiteProps) {
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [searchOpen, setSearchOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { id: 'home', label: 'Главная' },
    { 
      id: 'about', 
      label: 'О техникуме',
      submenu: [
        { id: 'history', label: 'История' },
        { id: 'team', label: 'Руководство' },
        { id: 'achievements', label: 'Достижения' }
      ]
    },
    { 
      id: 'applicant', 
      label: 'Абитуриенту',
      submenu: [
        { id: 'specialties', label: 'Специальности' },
        { id: 'admission', label: 'Приём' },
        { id: 'docs', label: 'Документы' }
      ]
    },
    { 
      id: 'student', 
      label: 'Студенту',
      submenu: [
        { id: 'schedule', label: 'Расписание' },
        { id: 'library', label: 'Библиотека' },
        { id: 'events', label: 'Мероприятия' }
      ]
    },
    { id: 'news', label: 'Новости' },
    { id: 'contacts', label: 'Контакты' },
  ]

  const stats = [
    { icon: Award, value: '65+', label: 'лет опыта', color: 'from-violet-500 to-purple-600' },
    { icon: Users, value: '1000+', label: 'студентов', color: 'from-blue-500 to-cyan-600' },
    { icon: BookOpen, value: '15+', label: 'специальностей', color: 'from-pink-500 to-rose-600' },
    { icon: TrendingUp, value: '98%', label: 'трудоустройство', color: 'from-green-500 to-emerald-600' },
  ]

  const features = [
    {
      icon: Shield,
      title: 'Гарантия качества',
      description: 'Аккредитованные программы с государственной гарантией',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: Zap,
      title: 'Современное оборудование',
      description: 'Обучение на новейшем оборудовании и технологиях',
      color: 'from-violet-500 to-purple-600'
    },
    {
      icon: Target,
      title: 'Практика и стажировки',
      description: 'Партнёрство с ведущими предприятиями региона',
      color: 'from-pink-500 to-rose-600'
    },
  ]

  const newsItems = [
    { title: 'День открытых дверей 2025', date: '15 января 2025', category: 'Мероприятия' },
    { title: 'Победа в региональном чемпионате', date: '10 января 2025', category: 'Достижения' },
    { title: 'Новые специальности 2025-2026', date: '5 января 2025', category: 'Образование' },
  ]

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDark ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' : 'bg-white'
    }`}>
      {/* Enhanced Header with Sticky Navbar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollY > 50
            ? isDark
              ? 'bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-violet-500/10'
              : 'bg-white/95 backdrop-blur-xl shadow-xl'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <motion.div 
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-xl ${
                  isDark ? 'shadow-violet-500/50' : 'shadow-violet-500/30'
                }`}
                whileHover={{ rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <GraduationCap className="w-8 h-8 text-white" />
              </motion.div>
              <h1 className={`text-3xl font-black tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              } group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all`}>
                ЛПТТ
              </h1>
            </motion.div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Search */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSearchOpen(!searchOpen)}
                className={`p-3 rounded-xl transition-all ${
                  isDark ? 'bg-violet-500/20 text-violet-300 hover:bg-violet-500/30' : 'bg-violet-50 text-violet-600 hover:bg-violet-100'
                }`}
              >
                <Search className="w-5 h-5" />
              </motion.button>

              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsDark(!isDark)}
                className={`p-3 rounded-xl transition-all ${
                  isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-50 text-blue-600'
                }`}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>

              {/* Diary Button - Enhanced */}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNavigateToDiary}
                className="group relative px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:shadow-violet-500/50 transition-all overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <LogIn className="w-5 h-5" />
                  Электронный дневник
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-violet-600"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-3 rounded-xl ${
                isDark ? 'bg-violet-500/20 text-violet-300' : 'bg-violet-50 text-violet-600'
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Enhanced Navbar - Below header, scrolls into view */}
        <div className={`hidden lg:block border-t ${
          isDark ? 'border-violet-500/20 bg-slate-900/90' : 'border-violet-100 bg-white/90'
        } backdrop-blur-xl`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center justify-center gap-2 py-3">
              {navigation.map((item) => (
                <div 
                  key={item.id} 
                  className="relative"
                  onMouseEnter={() => item.submenu && setDropdownOpen(item.id)}
                  onMouseLeave={() => setDropdownOpen(null)}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveSection(item.id)}
                    className={`px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-1 ${
                      activeSection === item.id
                        ? isDark
                          ? 'bg-violet-500/20 text-violet-300'
                          : 'bg-violet-50 text-violet-600'
                        : isDark
                        ? 'text-slate-300 hover:bg-violet-500/10'
                        : 'text-slate-600 hover:bg-violet-50'
                    }`}
                  >
                    {item.label}
                    {item.submenu && (
                      <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen === item.id ? 'rotate-180' : ''}`} />
                    )}
                  </motion.button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {item.submenu && dropdownOpen === item.id && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute top-full left-0 mt-2 w-56 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl ${
                          isDark ? 'bg-slate-800/95 border border-violet-500/30' : 'bg-white/95 border border-violet-200'
                        }`}
                      >
                        {item.submenu.map((subItem, idx) => (
                          <motion.button
                            key={subItem.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            whileHover={{ x: 8, backgroundColor: isDark ? 'rgba(139, 92, 246, 0.15)' : 'rgba(139, 92, 246, 0.08)' }}
                            onClick={() => setActiveSection(subItem.id)}
                            className={`w-full text-left px-5 py-3 transition-all ${
                              isDark ? 'text-slate-300 hover:text-violet-300' : 'text-slate-700 hover:text-violet-700'
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                isDark ? 'bg-violet-400' : 'bg-violet-500'
                              }`} />
                              {subItem.label}
                            </span>
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`border-t ${isDark ? 'border-violet-500/20 bg-slate-900' : 'border-violet-100 bg-white'}`}
            >
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="relative">
                  <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                    isDark ? 'text-violet-400' : 'text-violet-600'
                  }`} />
                  <input
                    type="text"
                    placeholder="Поиск по сайту..."
                    className={`w-full pl-12 pr-4 py-3 rounded-xl ${
                      isDark 
                        ? 'bg-slate-800 text-white placeholder-slate-400 border border-violet-500/30' 
                        : 'bg-violet-50 text-slate-900 placeholder-slate-500 border border-violet-200'
                    } focus:outline-none focus:ring-2 focus:ring-violet-500`}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`lg:hidden border-t ${
                isDark ? 'border-violet-500/20 bg-slate-900/95' : 'border-violet-100 bg-white/95'
              } backdrop-blur-xl`}
            >
              <div className="container mx-auto px-4 py-4 space-y-2">
                {navigation.map((item) => (
                  <div key={item.id}>
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl font-semibold ${
                        activeSection === item.id
                          ? isDark
                            ? 'bg-violet-500/20 text-violet-300'
                            : 'bg-violet-50 text-violet-600'
                          : isDark
                          ? 'text-slate-300'
                          : 'text-slate-600'
                      }`}
                    >
                      {item.label}
                    </motion.button>
                    {item.submenu && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.submenu.map((sub) => (
                          <button
                            key={sub.id}
                            onClick={() => setActiveSection(sub.id)}
                            className={`block w-full text-left px-4 py-2 rounded-lg text-sm ${
                              isDark ? 'text-slate-400 hover:bg-violet-500/10' : 'text-slate-500 hover:bg-violet-50'
                            }`}
                          >
                            {sub.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={onNavigateToDiary}
                  className="w-full px-4 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-bold mt-4"
                >
                  Электронный дневник
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Main Content */}
      <main className="pt-32 lg:pt-40">
        <AnimatePresence mode="wait">
          {activeSection === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Hero />

              {/* Stats Section */}
              <section className="py-16 relative overflow-hidden">
                <div className="container mx-auto px-6">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, idx) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ y: -8, scale: 1.05 }}
                        className={`relative p-6 rounded-3xl bg-gradient-to-br ${stat.color} text-white shadow-2xl overflow-hidden group`}
                      >
                        <motion.div
                          className="absolute inset-0 bg-white/20"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.6 }}
                        />
                        <stat.icon className="w-12 h-12 mb-4 opacity-80" />
                        <p className="text-4xl font-black mb-2">{stat.value}</p>
                        <p className="text-sm opacity-90">{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Features */}
              <section className="py-16">
                <div className="container mx-auto px-6">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`text-4xl font-black text-center mb-12 ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    Почему выбирают нас?
                  </motion.h2>
                  <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.15 }}
                        whileHover={{ y: -12 }}
                        className={`p-8 rounded-3xl ${
                          isDark ? 'bg-slate-800/50' : 'bg-white'
                        } shadow-xl backdrop-blur-sm`}
                      >
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6`}>
                          <feature.icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {feature.title}
                        </h3>
                        <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                          {feature.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* News Section */}
              <section className={`py-16 ${isDark ? 'bg-slate-900/50' : 'bg-violet-50/50'}`}>
                <div className="container mx-auto px-6">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`text-4xl font-black text-center mb-12 ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    Последние новости
                  </motion.h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {newsItems.map((news, idx) => (
                      <motion.div
                        key={news.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ y: -8 }}
                        className={`p-6 rounded-2xl ${
                          isDark ? 'bg-slate-800' : 'bg-white'
                        } shadow-lg cursor-pointer`}
                      >
                        <div className={`text-xs font-bold px-3 py-1 rounded-full inline-block mb-3 ${
                          isDark ? 'bg-violet-500/20 text-violet-300' : 'bg-violet-100 text-violet-700'
                        }`}>
                          {news.category}
                        </div>
                        <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {news.title}
                        </h3>
                        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          {news.date}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            </motion.div>
          ) : (
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="container mx-auto px-6 py-20 text-center"
            >
              <h2 className={`text-4xl font-black mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {navigation.find(n => n.id === activeSection)?.label}
              </h2>
              <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                Контент раздела в разработке...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Enhanced Footer */}
      <footer className={`mt-20 border-t ${
        isDark ? 'border-violet-500/20 bg-slate-900/50' : 'border-violet-100 bg-violet-50/30'
      } backdrop-blur-xl`}>
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* About */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <h3 className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  ЛПТТ
                </h3>
              </div>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Ленинградский политехнический техникум — 65+ лет качественного профессионального образования
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Быстрые ссылки
              </h4>
              <div className="space-y-2">
                {['О техникуме', 'Абитуриенту', 'Студенту', 'Новости'].map((link) => (
                  <a
                    key={link}
                    href="#"
                    className={`block text-sm ${
                      isDark ? 'text-slate-400 hover:text-violet-400' : 'text-slate-600 hover:text-violet-600'
                    } transition-colors`}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Contacts */}
            <div>
              <h4 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Контакты
              </h4>
              <div className={`space-y-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                <a href="tel:+7123456789" className="flex items-center gap-2 hover:text-violet-500 transition-colors">
                  <Phone className="w-4 h-4" />
                  +7 (123) 456-78-90
                </a>
                <a href="mailto:info@lptt.ru" className="flex items-center gap-2 hover:text-violet-500 transition-colors">
                  <Mail className="w-4 h-4" />
                  info@lptt.ru
                </a>
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5" />
                  Ленинградская область, г. Кировск
                </p>
              </div>
            </div>

            {/* Social */}
            <div>
              <h4 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Мы в соцсетях
              </h4>
              <div className="flex gap-2">
                {[Facebook, Instagram, Youtube].map((Icon, idx) => (
                  <motion.a
                    key={idx}
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isDark ? 'bg-violet-500/20 text-violet-300' : 'bg-violet-100 text-violet-600'
                    } hover:bg-violet-500 hover:text-white transition-all`}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          <div className={`pt-6 border-t text-center text-sm ${
            isDark ? 'border-violet-500/20 text-slate-500' : 'border-violet-100 text-slate-500'
          }`}>
            <p>© 2025 ЛПТТ. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
