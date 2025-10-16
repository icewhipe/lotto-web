import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  GraduationCap,
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  Search,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Home,
  Newspaper,
  Camera,
  Video,
  Calendar,
  Users,
  BookOpen,
  Briefcase,
  Code,
  Car,
} from 'lucide-react'
import { navigationStructure } from '../../data/navigationStructure'

// Import section components
import { lazyLoadComponent } from '../../utils/lazyLoadComponent'
import LiquidGlassHomeV2 from './LiquidGlassHomeV2' // Home не lazy load - нужен сразу
import EducationalProjects from './sections/EducationalProjects'
import PhotoVideoGallery from './sections/PhotoVideoGallery'
import Achievements from './sections/Achievements'

// Lazy load остальные секции для лучшей производительности
const NewsSection = lazyLoadComponent(() => import('./sections/NewsSection'), 'Загрузка новостей...')
const PhotoGallerySection = lazyLoadComponent(() => import('./sections/PhotoGallerySection'), 'Загрузка галереи...')
const VideoGallerySection = lazyLoadComponent(() => import('./sections/VideoGallerySection'), 'Загрузка видео...')
const EventsSection = lazyLoadComponent(() => import('./sections/EventsSection'), 'Загрузка событий...')
const SpecialtiesSection = lazyLoadComponent(() => import('./sections/SpecialtiesSection'), 'Загрузка специальностей...')
const ApplicationScreen = lazyLoadComponent(() => import('./sections/ApplicationScreen'), 'Загрузка формы...')
const ScheduleSection = lazyLoadComponent(() => import('./sections/ScheduleSection'), 'Загрузка расписания...')
const ContactsSection = lazyLoadComponent(() => import('./sections/ContactsSection'), 'Загрузка контактов...')

interface FullSiteProps {
  onNavigateToDiary: () => void
  isDarkMode: boolean
  onToggleTheme: () => void
}

const sectionIcons: Record<string, any> = {
  home: Home,
  'press-center': Newspaper,
  'photo-gallery': Camera,
  'video-gallery': Video,
  events: Calendar,
  news: Newspaper,
  applicants: Users,
  students: BookOpen,
  graduates: Briefcase,
  projects: Code,
  'it-cube': Code,
  teachers: BookOpen,
  'driving-school': Car,
  contacts: Phone,
  about: GraduationCap,
}

export default function FullSite({ onNavigateToDiary, isDarkMode, onToggleTheme }: FullSiteProps) {
  const [activeSection, setActiveSection] = useState('home')
  const [activeSubsection, setActiveSubsection] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null)
  const [scrollY, setScrollY] = useState(0)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavigate = (sectionId: string, subsectionId?: string) => {
    setActiveSection(sectionId)
    setActiveSubsection(subsectionId || null)
    setMobileMenuOpen(false)
    setExpandedMenu(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderContent = () => {
    // Home - Use new Liquid Glass Home V2 with new sections
    if (activeSection === 'home') {
      return (
        <>
          <LiquidGlassHomeV2 isDark={isDarkMode} onNavigate={handleNavigate} onNavigateToDiary={onNavigateToDiary} />
          <PhotoVideoGallery isDark={isDarkMode} onNavigate={handleNavigate} />
          <EducationalProjects isDark={isDarkMode} />
          <Achievements isDark={isDarkMode} />
        </>
      )
    }

    // Press Center
    if (activeSection === 'press-center') {
      if (activeSubsection === 'news') return <NewsSection isDark={isDarkMode} />
      if (activeSubsection === 'photo-gallery') return <PhotoGallerySection isDark={isDarkMode} />
      if (activeSubsection === 'video-gallery') return <VideoGallerySection isDark={isDarkMode} />
      if (activeSubsection === 'events') return <EventsSection isDark={isDarkMode} />
    }

    // Applicants
    if (activeSection === 'applicants') {
      if (activeSubsection === 'specialties') return <SpecialtiesSection isDark={isDarkMode} />
      if (activeSubsection === 'application-screen') return <ApplicationScreen isDark={isDarkMode} />
    }

    // Students
    if (activeSection === 'students') {
      if (activeSubsection === 'schedule') return <ScheduleSection isDark={isDarkMode} />
      if (activeSubsection === 'diary') {
        onNavigateToDiary()
        return null
      }
    }

    // Teachers
    if (activeSection === 'teachers' && activeSubsection === 'teacher-diary') {
      onNavigateToDiary()
      return null
    }

    // Contacts
    if (activeSection === 'contacts') {
      return <ContactsSection isDark={isDarkMode} />
    }

    // Default placeholder for other sections
    return (
      <div className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`max-w-4xl mx-auto text-center`}
        >
          <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center ${
            isDarkMode ? 'bg-blue-500/20' : 'bg-blue-50'
          }`}>
            {(() => {
              const Icon = sectionIcons[activeSection] || BookOpen
              return <Icon className={`w-10 h-10 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            })()}
          </div>
          <h1 className={`text-4xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {navigationStructure.find(s => s.id === activeSection)?.label}
          </h1>
          {activeSubsection && (
            <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              {navigationStructure
                .find(s => s.id === activeSection)
                ?.subsections?.find(ss => ss.id === activeSubsection)?.label}
            </h2>
          )}
          <p className={`text-xl mb-8 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Раздел находится в разработке
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavigate('home')}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold"
          >
            Вернуться на главную
          </motion.button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900' 
        : 'bg-white'
    }`}>
      {/* Header - Enhanced Sticky */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.2, 0.9, 0.2, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrollY > 50
            ? isDarkMode
              ? 'bg-slate-900/90 backdrop-blur-2xl shadow-2xl shadow-blue-500/20 border-b border-blue-500/10'
              : 'bg-white/90 backdrop-blur-2xl shadow-2xl shadow-blue-500/10 border-b border-blue-100'
            : isDarkMode
            ? 'bg-transparent'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => handleNavigate('home')}
              className="flex items-center gap-3"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center ${
                isDarkMode ? 'shadow-lg shadow-blue-500/50' : 'shadow-lg'
              }`}>
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  ЛПТТ
                </h1>
              </div>
            </motion.button>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Search */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSearchOpen(!searchOpen)}
                className={`p-3 rounded-xl ${
                  isDarkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-50 text-blue-600'
                }`}
              >
                <Search className="w-5 h-5" />
              </motion.button>

              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={onToggleTheme}
                className={`p-3 rounded-xl ${
                  isDarkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-50 text-blue-600'
                }`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>

              {/* Diary Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNavigateToDiary}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold shadow-lg"
              >
                Электронный дневник
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-3 rounded-xl ${
                isDarkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-50 text-blue-600'
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Navigation Bar - Compact, no horizontal scroll */}
        <div className={`hidden lg:block border-t ${
          isDarkMode ? 'border-blue-500/10 bg-slate-900/70' : 'border-blue-100 bg-white/70'
        } backdrop-blur-xl`}>
          <div className="container mx-auto px-6">
            <div className="flex items-center gap-0.5 overflow-x-auto scrollbar-hide">
              {navigationStructure.map((section) => (
                <div key={section.id} className="relative group">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={() => section.subsections ? setExpandedMenu(expandedMenu === section.id ? null : section.id) : handleNavigate(section.id)}
                    className={`px-3 py-2.5 text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 rounded-lg ${
                      activeSection === section.id
                        ? isDarkMode
                          ? 'text-blue-300 bg-blue-500/15'
                          : 'text-blue-600 bg-blue-50'
                        : isDarkMode
                        ? 'text-slate-300 hover:bg-blue-500/10'
                        : 'text-slate-600 hover:bg-blue-50'
                    }`}
                  >
                    {section.label}
                    {section.subsections && <ChevronDown className={`w-4 h-4 transition-transform ${expandedMenu === section.id ? 'rotate-180' : ''}`} />}
                  </motion.button>

                  {/* Dropdown */}
                  {section.subsections && expandedMenu === section.id && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`absolute top-full left-0 mt-1 min-w-[250px] rounded-xl shadow-2xl overflow-hidden ${
                        isDarkMode ? 'bg-slate-800 border border-blue-500/20' : 'bg-white border border-blue-100'
                      }`}
                    >
                      {section.subsections.map((sub) => (
                        <motion.button
                          key={sub.id}
                          whileHover={{ x: 5 }}
                          onClick={() => handleNavigate(section.id, sub.id)}
                          className={`w-full text-left px-4 py-3 transition-colors ${
                            activeSubsection === sub.id
                              ? isDarkMode
                                ? 'bg-blue-500/20 text-blue-300'
                                : 'bg-blue-50 text-blue-600'
                              : isDarkMode
                              ? 'text-slate-300 hover:bg-blue-500/10'
                              : 'text-slate-600 hover:bg-blue-50'
                          }`}
                        >
                          {sub.label}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
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
                isDarkMode ? 'border-blue-500/20 bg-slate-900/95' : 'border-blue-100 bg-white/95'
              } backdrop-blur-xl max-h-[70vh] overflow-y-auto`}
            >
              <div className="container mx-auto px-6 py-4 space-y-2">
                {navigationStructure.map((section) => (
                  <div key={section.id}>
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={() => section.subsections ? setExpandedMenu(expandedMenu === section.id ? null : section.id) : handleNavigate(section.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl font-semibold flex items-center justify-between ${
                        activeSection === section.id
                          ? isDarkMode
                            ? 'bg-blue-500/20 text-blue-300'
                            : 'bg-blue-50 text-blue-600'
                          : isDarkMode
                          ? 'text-slate-300 hover:bg-blue-500/10'
                          : 'text-slate-600 hover:bg-blue-50'
                      }`}
                    >
                      {section.label}
                      {section.subsections && <ChevronDown className={`w-4 h-4 transition-transform ${expandedMenu === section.id ? 'rotate-180' : ''}`} />}
                    </motion.button>
                    
                    {section.subsections && expandedMenu === section.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        className="ml-4 mt-2 space-y-1"
                      >
                        {section.subsections.map((sub) => (
                          <motion.button
                            key={sub.id}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleNavigate(section.id, sub.id)}
                            className={`w-full text-left px-4 py-2 rounded-lg text-sm ${
                              activeSubsection === sub.id
                                ? isDarkMode
                                  ? 'bg-blue-500/10 text-blue-300'
                                  : 'bg-blue-50 text-blue-600'
                                : isDarkMode
                                ? 'text-slate-400 hover:bg-blue-500/5'
                                : 'text-slate-500 hover:bg-blue-50'
                            }`}
                          >
                            {sub.label}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ))}

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={onNavigateToDiary}
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold mt-4"
                >
                  Электронный дневник
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Main Content */}
      <main className="pt-32 lg:pt-36">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeSection}-${activeSubsection}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Enhanced Footer */}
      <footer className={`mt-16 py-10 border-t ${
        isDarkMode ? 'border-blue-500/10 bg-slate-900/70' : 'border-blue-100 bg-slate-50'
      } backdrop-blur-xl`}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* About */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <h3 className={`text-base font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  ЛПТТ
                </h3>
              </div>
              <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Лискинский Промышленно-Транспортный Техникум — современное профессиональное образование с 1958 года
              </p>
            </div>

            {/* Contacts */}
            <div>
              <h4 className={`font-bold mb-4 text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Контакты
              </h4>
              <div className={`space-y-2.5 text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                <a href="tel:+74739141191" className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>+7 (47391) 4-11-91</span>
                </a>
                <a href="mailto:lptt@lptt.obrvrn.ru" className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                  <Mail className="w-4 h-4" />
                  <span>lptt@lptt.obrvrn.ru</span>
                </a>
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>г. Лиски, ул. Лысенко, 1А,<br/>Воронежская область, 397900</span>
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className={`font-bold mb-4 text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Разделы сайта
              </h4>
              <div className="space-y-2">
                <button
                  onClick={() => handleNavigate('applicants', 'specialties')}
                  className={`block text-sm ${isDarkMode ? 'text-slate-400 hover:text-blue-400' : 'text-slate-600 hover:text-blue-600'} transition-colors text-left`}
                >
                  Специальности
                </button>
                <button
                  onClick={() => handleNavigate('press-center', 'news')}
                  className={`block text-sm ${isDarkMode ? 'text-slate-400 hover:text-blue-400' : 'text-slate-600 hover:text-blue-600'} transition-colors text-left`}
                >
                  Новости
                </button>
                <button
                  onClick={onNavigateToDiary}
                  className={`block text-sm ${isDarkMode ? 'text-slate-400 hover:text-blue-400' : 'text-slate-600 hover:text-blue-600'} transition-colors text-left`}
                >
                  Электронный дневник
                </button>
                <button
                  onClick={() => handleNavigate('applicants', 'application-screen')}
                  className={`block text-sm ${isDarkMode ? 'text-slate-400 hover:text-blue-400' : 'text-slate-600 hover:text-blue-600'} transition-colors text-left`}
                >
                  Подать документы
                </button>
              </div>
            </div>

            {/* Social & Info */}
            <div>
              <h4 className={`font-bold mb-4 text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Мы в соцсетях
              </h4>
              <div className="flex gap-2 mb-4">
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="https://vk.com/lptt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                    isDarkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-600'
                  } hover:bg-blue-500 hover:text-white transition-all`}
                  title="ВКонтакте"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.91 12.68h-1.48c-.52 0-.68-.42-1.61-1.35-.81-.76-1.17-.86-1.37-.86-.28 0-.36.08-.36.48v1.23c0 .33-.1.53-1.01.53-1.46 0-3.08-.88-4.22-2.53-1.7-2.42-2.17-4.24-2.17-4.61 0-.2.08-.39.48-.39h1.48c.36 0 .5.17.63.55.7 2.03 1.89 3.81 2.37 3.81.18 0 .27-.08.27-.54V9.5c-.06-.98-.58-1.06-.58-1.41 0-.17.14-.33.36-.33h2.33c.3 0 .41.16.41.5v2.97c0 .3.13.41.22.41.18 0 .33-.11.66-.44 1.01-1.13 1.73-2.88 1.73-2.88.1-.19.26-.39.66-.39h1.48c.44 0 .54.23.44.55-.16.75-1.8 3.18-1.8 3.18-.14.23-.19.33 0 .59.14.19.59.58.89.92.53.6 1.03 1.11 1.15 1.45.11.39-.08.59-.52.59z"/>
                  </svg>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="https://t.me/lptt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                    isDarkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-600'
                  } hover:bg-blue-500 hover:text-white transition-all`}
                  title="Telegram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121L7.773 13.98l-2.886-.918c-.63-.196-.64-.63.135-.935l11.274-4.34c.524-.192.984.12.81.914z"/>
                  </svg>
                </motion.a>
              </div>
              <p className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                Режим работы:<br/>
                Пн-Пт: 8:00-17:00
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className={`pt-6 border-t ${
            isDarkMode ? 'border-blue-500/10' : 'border-blue-100'
          }`}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className={`text-sm text-center md:text-left ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                © 2025 ЛПТТ - Лискинский Промышленно-Транспортный Техникум. Все права защищены.
              </p>
              <div className="flex gap-4 text-xs">
                <a href="#" className={`${isDarkMode ? 'text-slate-500 hover:text-slate-400' : 'text-slate-500 hover:text-slate-600'} transition-colors`}>
                  Политика конфиденциальности
                </a>
                <span className={isDarkMode ? 'text-slate-700' : 'text-slate-300'}>•</span>
                <a href="#" className={`${isDarkMode ? 'text-slate-500 hover:text-slate-400' : 'text-slate-500 hover:text-slate-600'} transition-colors`}>
                  Пользовательское соглашение
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
