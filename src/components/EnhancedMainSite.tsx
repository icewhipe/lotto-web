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
  Facebook,
  Instagram,
  Youtube,
  TrendingUp,
  Shield,
  Zap,
  Target,
} from 'lucide-react'
import Hero from './Hero'
import { navigationStructure } from '../data/navigationStructure'
import UnderDevelopment from './UnderDevelopment'

interface EnhancedMainSiteProps {
  onNavigateToDiary: () => void
}

export default function EnhancedMainSite({ onNavigateToDiary }: EnhancedMainSiteProps) {
  const [activeSection, setActiveSection] = useState('home')
  const [activeSubsection, setActiveSubsection] = useState<string | null>(null)
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

  const handleNavigate = (section: string, subsection?: string) => {
    setActiveSection(section)
    setActiveSubsection(subsection || null)
    setMobileMenuOpen(false)
    setDropdownOpen(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const stats = [
    { icon: Award, value: '50+', label: 'лет опыта', color: 'from-violet-500 to-purple-600' },
    { icon: Users, value: '532+', label: 'студентов', color: 'from-blue-500 to-cyan-600' },
    { icon: BookOpen, value: '12+', label: 'специальностей', color: 'from-pink-500 to-rose-600' },
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
      {/* Two-Story Header: Logo on top, Navbar below */}
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
        {/* Top Row: Logo + Actions */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 border-b border-violet-500/10">
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
              <div>
                <h1 className={`text-3xl font-black tracking-tight ${
                  isDark ? 'text-white' : 'text-slate-900'
                } group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all`}>
                  ЛПТТ
                </h1>
                <p className={`text-[10px] font-semibold ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                  Лискинский Промышленно-Транспортный Техникум
                </p>
              </div>
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

        {/* Second Row: Full Navigation from navigationStructure */}
        <div className={`${
          isDark ? 'bg-slate-900/90' : 'bg-white/90'
        } backdrop-blur-xl`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center justify-between gap-1 py-2 overflow-x-auto scrollbar-hide">
              <div className="flex items-center gap-1">
                {navigationStructure.map((section) => (
                  <div 
                    key={section.id} 
                    className="relative"
                    onMouseEnter={() => section.subsections && setDropdownOpen(section.id)}
                    onMouseLeave={() => setDropdownOpen(null)}
                    style={{ zIndex: dropdownOpen === section.id ? 60 : 1 }}
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => section.subsections ? {} : handleNavigate(section.id)}
                      className={`px-3 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-1 whitespace-nowrap ${
                        activeSection === section.id
                          ? isDark
                            ? 'bg-violet-500/20 text-violet-300'
                            : 'bg-violet-50 text-violet-600'
                          : isDark
                          ? 'text-slate-300 hover:bg-violet-500/10'
                          : 'text-slate-600 hover:bg-violet-50'
                      }`}
                    >
                      {section.label}
                      {section.subsections && (
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen === section.id ? 'rotate-180' : ''}`} />
                      )}
                    </motion.button>

                    {/* Mega Dropdown Menu */}
                    <AnimatePresence>
                      {section.subsections && dropdownOpen === section.id && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                          className={`absolute top-full left-0 mt-2 min-w-[280px] max-w-md rounded-2xl shadow-2xl overflow-hidden backdrop-blur-2xl border ${
                            isDark ? 'bg-slate-800/98 border-violet-500/30' : 'bg-white/98 border-violet-200'
                          }`}
                          style={{ 
                            backdropFilter: 'blur(20px) saturate(180%)',
                            WebkitBackdropFilter: 'blur(20px) saturate(180%)'
                          }}
                        >
                          <div className="py-2 max-h-[70vh] overflow-y-auto">
                            {section.subsections.map((subsection, idx) => (
                              <motion.button
                                key={subsection.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.04, duration: 0.2 }}
                                whileHover={{ x: 8 }}
                                onClick={() => handleNavigate(section.id, subsection.id)}
                                className={`w-full text-left px-5 py-2.5 transition-all text-sm font-medium ${
                                  activeSubsection === subsection.id
                                    ? isDark
                                      ? 'bg-violet-500/25 text-violet-300'
                                      : 'bg-violet-100 text-violet-700'
                                    : isDark
                                    ? 'text-slate-300 hover:bg-violet-500/15 hover:text-violet-300'
                                    : 'text-slate-700 hover:bg-violet-50 hover:text-violet-700'
                                }`}
                              >
                                <span className="flex items-center gap-2">
                                  <span className={`w-1.5 h-1.5 rounded-full transition-all ${
                                    activeSubsection === subsection.id 
                                      ? 'bg-violet-500 scale-100' 
                                      : 'bg-transparent scale-0'
                                  }`} />
                                  {subsection.label}
                                </span>
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* Diary button in navbar */}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNavigateToDiary}
                className="group relative px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-bold text-sm shadow-lg hover:shadow-xl hover:shadow-violet-500/50 transition-all overflow-hidden whitespace-nowrap flex-shrink-0"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  <LogIn className="w-4 h-4" />
                  Электронный дневник
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-violet-600"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
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
                {navigationStructure.map((section) => (
                  <div key={section.id}>
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={() => section.subsections ? {} : handleNavigate(section.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl font-semibold ${
                        activeSection === section.id
                          ? isDark
                            ? 'bg-violet-500/20 text-violet-300'
                            : 'bg-violet-50 text-violet-600'
                          : isDark
                          ? 'text-slate-300'
                          : 'text-slate-600'
                      }`}
                    >
                      {section.label}
                    </motion.button>
                    {section.subsections && (
                      <div className="ml-4 mt-1 space-y-1">
                        {section.subsections.map((sub) => (
                          <button
                            key={sub.id}
                            onClick={() => handleNavigate(section.id, sub.id)}
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
              key={`${activeSection}-${activeSubsection}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <UnderDevelopment
                isDark={isDark}
                sectionName={
                  navigationStructure.find(s => s.id === activeSection)?.label || 
                  'Раздел'
                }
                onBack={() => handleNavigate('home')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Premium Footer - Beautiful design for all */}
      <footer className={`relative mt-20 overflow-hidden ${
        isDark ? 'bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900' : 'bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50'
      }`}>
        {/* Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
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
              <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Лискинский Промышленно-Транспортный Техникум — 50+ лет качественного профессионального образования. г. Лиски, ул. Лысенко, 1А
              </p>
            </div>

            {/* For Students */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4 className={`font-bold text-sm mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <Users className="w-4 h-4" />
                Студентам
              </h4>
              <div className="space-y-2">
                {[
                  { label: 'Расписание', onClick: () => handleNavigate('students', 'schedule') },
                  { label: 'Электронный дневник', onClick: onNavigateToDiary },
                  { label: 'Библиотека', onClick: () => handleNavigate('students', 'e-resources') },
                  { label: 'Спортклуб', onClick: () => handleNavigate('students', 'sport-club') },
                ].map((link) => (
                  <motion.button
                    key={link.label}
                    onClick={link.onClick}
                    whileHover={{ x: 5 }}
                    className={`block w-full text-left text-sm ${
                      isDark ? 'text-slate-400 hover:text-violet-400' : 'text-slate-600 hover:text-violet-600'
                    } transition-all`}
                  >
                    → {link.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* For Teachers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className={`font-bold text-sm mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <BookOpen className="w-4 h-4" />
                Преподавателям
              </h4>
              <div className="space-y-2">
                {[
                  { label: 'Воспитательная работа', onClick: () => handleNavigate('teachers', 'educational-work') },
                  { label: 'Дневник преподавателя', onClick: () => handleNavigate('teachers', 'teacher-diary') },
                  { label: 'Проекты', onClick: () => handleNavigate('projects') },
                  { label: 'Профессионалитет', onClick: () => handleNavigate('professionalism') },
                ].map((link) => (
                  <motion.button
                    key={link.label}
                    onClick={link.onClick}
                    whileHover={{ x: 5 }}
                    className={`block w-full text-left text-sm ${
                      isDark ? 'text-slate-400 hover:text-violet-400' : 'text-slate-600 hover:text-violet-600'
                    } transition-all`}
                  >
                    → {link.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Contacts & Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h4 className={`font-bold text-sm mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Связаться с нами
              </h4>
              <div className={`space-y-3 text-sm mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                <motion.a 
                  href="tel:+74739141191" 
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 hover:text-violet-500 transition-all"
                >
                  <Phone className="w-4 h-4" />
                  +7 (47391) 4-11-91
                </motion.a>
                <motion.a 
                  href="mailto:lptt@lptt.obrvrn.ru" 
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 hover:text-violet-500 transition-all"
                >
                  <Mail className="w-4 h-4" />
                  lptt@lptt.obrvrn.ru
                </motion.a>
              </div>

              <h5 className={`font-bold text-xs mb-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Мы в соцсетях
              </h5>
              <div className="flex gap-2">
                {[
                  { Icon: Facebook, href: 'https://facebook.com/lptt', color: 'from-blue-600 to-blue-500' },
                  { Icon: Instagram, href: 'https://instagram.com/lptt', color: 'from-pink-600 to-rose-500' },
                  { Icon: Youtube, href: 'https://youtube.com/lptt', color: 'from-red-600 to-red-500' }
                ].map(({ Icon, href, color }, idx) => (
                  <motion.a
                    key={idx}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all`}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Divider with animated gradient */}
          <div className={`relative h-px mb-8 ${isDark ? 'bg-violet-500/20' : 'bg-violet-200'}`}>
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500 to-transparent h-px"
            />
          </div>

          {/* Bottom Row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-600'}`}
            >
              © 2025 <span className="font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">ЛПТТ</span> — Лискинский Промышленно-Транспортный Техникум. Все права защищены.
            </motion.p>
            
            <div className="flex gap-4 text-xs">
              <motion.a href="#" whileHover={{ scale: 1.05 }} className={`${isDark ? 'text-slate-500 hover:text-violet-400' : 'text-slate-500 hover:text-violet-600'} transition-colors`}>
                Политика конфиденциальности
              </motion.a>
              <span className={isDark ? 'text-slate-700' : 'text-slate-300'}>•</span>
              <motion.a href="#" whileHover={{ scale: 1.05 }} className={`${isDark ? 'text-slate-500 hover:text-violet-400' : 'text-slate-500 hover:text-violet-600'} transition-colors`}>
                Карта сайта
              </motion.a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
