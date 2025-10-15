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
import HomeSection from './sections/HomeSection'
import NewsSection from './sections/NewsSection'
import PhotoGallerySection from './sections/PhotoGallerySection'
import VideoGallerySection from './sections/VideoGallerySection'
import EventsSection from './sections/EventsSection'
import SpecialtiesSection from './sections/SpecialtiesSection'
import ApplicationScreen from './sections/ApplicationScreen'
import ScheduleSection from './sections/ScheduleSection'
import ContactsSection from './sections/ContactsSection'

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
    // Home
    if (activeSection === 'home') {
      return <HomeSection isDark={isDarkMode} onNavigate={handleNavigate} onNavigateToDiary={onNavigateToDiary} />
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
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollY > 50
            ? isDarkMode
              ? 'bg-slate-900/95 backdrop-blur-xl shadow-xl shadow-blue-500/10'
              : 'bg-white/95 backdrop-blur-xl shadow-xl shadow-blue-500/5'
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
                <h1 className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  ЛПТТ
                </h1>
                <p className={`text-xs ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                  Ленинградский политехнический
                </p>
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

        {/* Navigation Bar */}
        <div className={`hidden lg:block border-t ${
          isDarkMode ? 'border-blue-500/20 bg-slate-900/50' : 'border-blue-100 bg-white/50'
        } backdrop-blur-xl`}>
          <div className="container mx-auto px-6">
            <div className="flex items-center gap-1 overflow-x-auto">
              {navigationStructure.map((section) => (
                <div key={section.id} className="relative group">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={() => section.subsections ? setExpandedMenu(expandedMenu === section.id ? null : section.id) : handleNavigate(section.id)}
                    className={`px-4 py-3 font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                      activeSection === section.id
                        ? isDarkMode
                          ? 'text-blue-300 bg-blue-500/10'
                          : 'text-blue-600 bg-blue-50'
                        : isDarkMode
                        ? 'text-slate-300 hover:bg-blue-500/5'
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

      {/* Footer */}
      <footer className={`mt-20 py-12 border-t ${
        isDarkMode ? 'border-blue-500/20 bg-slate-900/50' : 'border-blue-100 bg-slate-50'
      }`}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className={`text-lg font-black mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                ЛПТТ
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Ленинградский политехнический техникум
              </p>
            </div>
            <div>
              <h4 className={`font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Контакты
              </h4>
              <div className={`space-y-2 text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
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
                  Ленинградская область
                </p>
              </div>
            </div>
            <div>
              <h4 className={`font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Быстрые ссылки
              </h4>
              <div className="space-y-2">
                <button
                  onClick={onNavigateToDiary}
                  className={`block text-sm ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
                >
                  Электронный дневник
                </button>
                <button
                  onClick={() => handleNavigate('applicants', 'application-screen')}
                  className={`block text-sm ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
                >
                  Подать заявление
                </button>
              </div>
            </div>
            <div>
              <h4 className={`font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Социальные сети
              </h4>
              <div className="flex gap-2">
                {/* Add social media icons here */}
              </div>
            </div>
          </div>
          <div className={`mt-8 pt-8 border-t text-center text-sm ${
            isDarkMode ? 'border-blue-500/20 text-slate-500' : 'border-blue-100 text-slate-500'
          }`}>
            <p>© 2025 ЛПТТ. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
