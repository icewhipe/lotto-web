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
  Phone,
  Mail,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Play,
  X as CloseIcon,
} from 'lucide-react'
import { navigationStructure } from '../data/navigationStructure'

interface ImprovedMainSiteProps {
  onNavigateToDiary: () => void
}

export default function ImprovedMainSite({ onNavigateToDiary }: ImprovedMainSiteProps) {
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [currentBanner, setCurrentBanner] = useState(0)
  const [currentMainNews, setCurrentMainNews] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState('')
  const [videoPlayerOpen, setVideoPlayerOpen] = useState(false)
  const [currentVideo, setCurrentVideo] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setShowScrollTop(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-rotate banners
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % 4)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Auto-rotate main news
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMainNews((prev) => (prev + 1) % 4)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const handleNavigate = (section: string) => {
    setActiveSection(section)
    setMobileMenuOpen(false)
    setDropdownOpen(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const banners = [
    { id: 1, title: 'IT-Куб', subtitle: 'Цифровое образование будущего', color: 'from-blue-600 to-cyan-500', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=400&fit=crop' },
    { id: 2, title: 'Профессионалитет', subtitle: 'Федеральный проект', color: 'from-blue-700 to-blue-500', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=400&fit=crop' },
    { id: 3, title: '80 лет Победы', subtitle: 'Помним и гордимся', color: 'from-red-600 to-orange-500', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=400&fit=crop' },
    { id: 4, title: 'Приёмная кампания 2025', subtitle: 'Поступай к нам!', color: 'from-green-600 to-emerald-500', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&h=400&fit=crop' },
  ]

  const mainNews = [
    { id: 1, title: 'Техникум победил в региональном конкурсе', date: '15.01.2025', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=610&h=407&fit=crop' },
    { id: 2, title: 'Открытие нового IT-Куба', date: '12.01.2025', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=610&h=407&fit=crop' },
    { id: 3, title: 'День открытых дверей 2025', date: '10.01.2025', image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=610&h=407&fit=crop' },
    { id: 4, title: 'Новые специальности', date: '08.01.2025', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=610&h=407&fit=crop' },
  ]

  const regularNews = [
    { id: 1, title: 'Студенты приняли участие в форуме', date: '14.01.2025', image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=290&h=193&fit=crop' },
    { id: 2, title: 'Спортивные достижения', date: '13.01.2025', image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=290&h=193&fit=crop' },
    { id: 3, title: 'Конференция преподавателей', date: '11.01.2025', image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=290&h=193&fit=crop' },
    { id: 4, title: 'Волонтёрская акция', date: '09.01.2025', image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=290&h=193&fit=crop' },
  ]

  const events = [
    { id: 1, title: 'Спортивный турнир', date: '20.01.2025', image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=250&fit=crop' },
    { id: 2, title: 'Конкурс талантов', date: '22.01.2025', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=250&fit=crop' },
    { id: 3, title: 'Научная конференция', date: '25.01.2025', image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=250&fit=crop' },
    { id: 4, title: 'День карьеры', date: '27.01.2025', image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=250&fit=crop' },
    { id: 5, title: 'Культурный вечер', date: '29.01.2025', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=250&fit=crop' },
    { id: 6, title: 'Мастер-классы', date: '31.01.2025', image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=250&fit=crop' },
  ]

  const videos = [
    { id: 1, title: 'Экскурсия по кампусу', date: '18.01.2025', thumbnail: 'https://images.unsplash.com/photo-1562774053-701939374585?w=300&h=200&fit=crop', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { id: 2, title: 'День открытых дверей', date: '17.01.2025', thumbnail: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&h=200&fit=crop', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { id: 3, title: 'Наши достижения', date: '16.01.2025', thumbnail: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=300&h=200&fit=crop', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { id: 4, title: 'Студенческая жизнь', date: '15.01.2025', thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=300&h=200&fit=crop', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { id: 5, title: 'Отзывы студентов', date: '14.01.2025', thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&h=200&fit=crop', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { id: 6, title: 'Мастер-классы', date: '13.01.2025', thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { id: 7, title: 'Производственная практика', date: '12.01.2025', thumbnail: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=300&h=200&fit=crop', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { id: 8, title: 'Выпускной 2024', date: '11.01.2025', thumbnail: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&h=200&fit=crop', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  ]

  const photos = Array.from({ length: 16 }, (_, i) => ({
    id: i + 1,
    image: `https://images.unsplash.com/photo-${[
      '1523050854058-8df90110c9f1',
      '1541339907198-e08756dedf3f',
      '1562774053-701939374585',
      '1523240795612-9a054b0db644',
      '1517486808906-6ca8b3f04846',
      '1524178232363-1fb2b075b655',
      '1521737604893-d14cc237f11d',
      '1519389950473-47ba0277781c',
      '1461896836934-ffe607ba8211',
      '1552664730-d307ca884978',
      '1504384308090-c894fdcc538d',
      '1591115765373-5207764f72e7',
      '1511578314322-379afb476865',
      '1505373877841-8d25f7d46678',
      '1492684223066-81342ee5ff30',
      '1559027615-cd4628902d4a'
    ][i]}?w=300&h=300&fit=crop`
  }))

  // Split navigation into 2 rows
  const firstRow = navigationStructure.slice(0, 6)
  const secondRow = navigationStructure.slice(6)

  // Filter content based on search
  const filteredNews = searchQuery
    ? regularNews.filter(n => n.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : regularNews

  const filteredEvents = searchQuery
    ? events.filter(e => e.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : events

  const filteredVideos = searchQuery
    ? videos.filter(v => v.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : videos

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDark 
        ? 'bg-slate-900 text-white' 
        : 'bg-gradient-to-br from-blue-50/30 via-white to-cyan-50/30'
    }`}>
      {/* Fixed Header - 3 Layers - Same color */}
      <motion.header
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollY > 50
            ? isDark
              ? 'bg-slate-900/98 backdrop-blur-2xl shadow-2xl'
              : 'bg-white/98 backdrop-blur-2xl shadow-xl'
            : isDark 
              ? 'bg-slate-900/95' 
              : 'bg-white/95'
        }`}
      >
        {/* Layer 1: Logo + Contacts + Actions - Same background */}
        <div className={`border-b ${isDark ? 'border-blue-500/20' : 'border-blue-200'}`}>
          <div className="container mx-auto px-6 py-3">
            <div className="flex items-center justify-between gap-6">
              {/* Logo - clickable to go top */}
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-black bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
                    ЛПТТ
                  </h1>
                  <p className={`text-[10px] font-medium ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                    с 1958 года
                  </p>
                </div>
              </motion.button>

              {/* Contacts */}
              <div className="hidden lg:flex items-center gap-6">
                <a href="tel:+74739144665" className={`flex items-center gap-2 text-sm font-medium ${
                  isDark ? 'text-slate-300 hover:text-blue-400' : 'text-slate-700 hover:text-blue-600'
                } transition-colors`}>
                  <Phone className="w-4 h-4" />
                  +7 (47391) 4-46-65
                </a>
                <a href="mailto:lptt@govvrn.ru" className={`flex items-center gap-2 text-sm font-medium ${
                  isDark ? 'text-slate-300 hover:text-blue-400' : 'text-slate-700 hover:text-blue-600'
                } transition-colors`}>
                  <Mail className="w-4 h-4" />
                  lptt@govvrn.ru
                </a>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                {/* Search */}
                <div className="relative">
                  {searchOpen ? (
                    <motion.input
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 200, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      type="text"
                      placeholder="Поиск..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onBlur={() => !searchQuery && setSearchOpen(false)}
                      autoFocus
                      className={`px-3 py-2 rounded-lg text-sm ${
                        isDark 
                          ? 'bg-slate-800 text-white border border-blue-500/30' 
                          : 'bg-white border border-blue-200'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSearchOpen(true)}
                      className={`p-2 rounded-lg ${
                        isDark ? 'hover:bg-blue-500/20 text-slate-300' : 'hover:bg-blue-50 text-slate-700'
                      } transition-all`}
                    >
                      <Search className="w-5 h-5" />
                    </motion.button>
                  )}
                </div>

                {/* Theme */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsDark(!isDark)}
                  className={`p-2 rounded-lg ${
                    isDark ? 'hover:bg-blue-500/20 text-slate-300' : 'hover:bg-blue-50 text-slate-700'
                  } transition-all`}
                >
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: isDark ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </motion.div>
                </motion.button>

                {/* Diary Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onNavigateToDiary}
                  className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-bold text-sm shadow-lg hover:shadow-xl transition-all"
                >
                  <LogIn className="w-4 h-4" />
                  Электронный дневник
                </motion.button>

                {/* Mobile menu */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className={`lg:hidden p-2 rounded-lg ${
                    isDark ? 'hover:bg-blue-500/20 text-slate-300' : 'hover:bg-blue-50 text-slate-700'
                  }`}
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Layer 2 & 3: Navbar - Same background color */}
        <div className={`hidden lg:block ${isDark ? 'border-blue-500/10' : 'border-blue-100'}`}>
          <div className="container mx-auto px-6">
            {/* Row 1 */}
            <nav className="flex items-center justify-between py-2 border-b border-blue-100 dark:border-blue-500/10">
              {firstRow.map((section) => (
                <div
                  key={section.id}
                  className="relative group"
                  onMouseEnter={() => section.subsections && setDropdownOpen(section.id)}
                  onMouseLeave={() => setDropdownOpen(null)}
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={() => section.subsections ? {} : handleNavigate(section.id)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1 whitespace-nowrap ${
                      activeSection === section.id
                        ? isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'
                        : isDark ? 'text-slate-300 hover:bg-blue-500/10' : 'text-slate-700 hover:bg-blue-50'
                    }`}
                  >
                    {section.label}
                    {section.subsections && <ChevronDown className="w-3 h-3" />}
                  </motion.button>

                  {/* Dropdown - Opaque */}
                  <AnimatePresence>
                    {section.subsections && dropdownOpen === section.id && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`absolute top-full left-0 mt-1 min-w-[240px] rounded-xl shadow-2xl z-[100] ${
                          isDark ? 'bg-slate-800 border border-blue-500/30' : 'bg-white border border-blue-200'
                        }`}
                        style={{ maxHeight: '400px', overflowY: 'auto' }}
                      >
                        {section.subsections.map((sub) => (
                          <motion.button
                            key={sub.id}
                            whileHover={{ x: 5, backgroundColor: isDark ? 'rgba(59, 130, 246, 0.15)' : 'rgba(59, 130, 246, 0.08)' }}
                            onClick={() => handleNavigate(section.id)}
                            className={`w-full text-left px-4 py-2 text-sm ${
                              isDark ? 'text-slate-300 hover:text-blue-300' : 'text-slate-700 hover:text-blue-700'
                            }`}
                          >
                            {sub.label}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Row 2 - Same color */}
            <nav className="flex items-center justify-between py-2">
              {secondRow.map((section) => (
                <div
                  key={section.id}
                  className="relative group"
                  onMouseEnter={() => section.subsections && setDropdownOpen(section.id)}
                  onMouseLeave={() => setDropdownOpen(null)}
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={() => section.subsections ? {} : handleNavigate(section.id)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1 whitespace-nowrap ${
                      activeSection === section.id
                        ? isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'
                        : isDark ? 'text-slate-300 hover:bg-blue-500/10' : 'text-slate-700 hover:bg-blue-50'
                    }`}
                  >
                    {section.label}
                    {section.subsections && <ChevronDown className="w-3 h-3" />}
                  </motion.button>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {section.subsections && dropdownOpen === section.id && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`absolute top-full left-0 mt-1 min-w-[240px] rounded-xl shadow-2xl z-[100] ${
                          isDark ? 'bg-slate-800 border border-blue-500/30' : 'bg-white border border-blue-200'
                        }`}
                        style={{ maxHeight: '400px', overflowY: 'auto' }}
                      >
                        {section.subsections.map((sub) => (
                          <motion.button
                            key={sub.id}
                            whileHover={{ x: 5, backgroundColor: isDark ? 'rgba(59, 130, 246, 0.15)' : 'rgba(59, 130, 246, 0.08)' }}
                            onClick={() => handleNavigate(section.id)}
                            className={`w-full text-left px-4 py-2 text-sm ${
                              isDark ? 'text-slate-300 hover:text-blue-300' : 'text-slate-700 hover:text-blue-700'
                            }`}
                          >
                            {sub.label}
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
      </motion.header>

      {/* Main Content */}
      <main className="pt-[180px]">
        <AnimatePresence mode="wait">
          {activeSection === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Banners Carousel - Stretched to navbar width, rounded, lowered */}
              <section className="container mx-auto px-6 mb-8">
                <div className="relative h-[400px] overflow-hidden rounded-3xl shadow-2xl">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentBanner}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.4), rgba(0,0,0,0.2)), url(${banners[currentBanner].image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                        <div>
                          <motion.h2 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-5xl font-black mb-4"
                          >
                            {banners[currentBanner].title}
                          </motion.h2>
                          <motion.p 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-2xl font-medium"
                          >
                            {banners[currentBanner].subtitle}
                          </motion.p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Banner controls */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {banners.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentBanner(idx)}
                        className={`transition-all ${
                          currentBanner === idx ? 'bg-white w-8 h-3' : 'bg-white/50 w-3 h-3'
                        } rounded-full`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentBanner((currentBanner - 1 + 4) % 4)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/40 rounded-full backdrop-blur-sm transition-all z-10"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  <button
                    onClick={() => setCurrentBanner((currentBanner + 1) % 4)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/40 rounded-full backdrop-blur-sm transition-all z-10"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                </div>
              </section>

              {/* Hero Section - Redesigned */}
              <section className="relative py-16 overflow-hidden">
                <div className="container mx-auto px-6 text-center">
                  {/* Title - 2 lines with gradient */}
                  <h1 className="text-5xl lg:text-6xl font-black mb-8 leading-tight">
                    <span className="block bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
                      Лискинский Промышленно-
                    </span>
                    <span className="block bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
                      Транспортный Техникум
                    </span>
                  </h1>

                  {/* Buttons under title */}
                  <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold text-lg shadow-2xl hover:shadow-blue-500/50 transition-all"
                    >
                      Поступить в техникум
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onNavigateToDiary}
                      className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-bold text-lg shadow-2xl hover:shadow-cyan-500/50 transition-all flex items-center gap-2"
                    >
                      <LogIn className="w-5 h-5" />
                      Электронный дневник
                    </motion.button>
                  </div>

                  {/* Badges below buttons */}
                  <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                    <span className={`px-4 py-2 rounded-full ${
                      isDark 
                        ? 'bg-blue-500/20 border border-blue-500/30 text-blue-300' 
                        : 'bg-blue-50 border border-blue-200 text-blue-700'
                    } text-sm font-bold`}>
                      Набор 2025-2026
                    </span>
                    <span className={`px-4 py-2 rounded-full ${
                      isDark 
                        ? 'bg-cyan-500/20 border border-cyan-500/30 text-cyan-300' 
                        : 'bg-cyan-50 border border-cyan-200 text-cyan-700'
                    } text-sm font-bold`}>
                      г. Лиски, ул. Лысенко, 1А
                    </span>
                  </div>

                  {/* Stats Cards below badges */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <motion.div
                      whileHover={{ y: -5, scale: 1.03 }}
                      className={`p-6 rounded-2xl text-center ${
                        isDark ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-blue-50 border border-blue-200'
                      }`}
                    >
                      <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                        50+
                      </div>
                      <div className={`text-sm font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        лет опыта
                      </div>
                    </motion.div>
                    <motion.div
                      whileHover={{ y: -5, scale: 1.03 }}
                      className={`p-6 rounded-2xl text-center ${
                        isDark ? 'bg-cyan-500/10 border border-cyan-500/30' : 'bg-cyan-50 border border-cyan-200'
                      }`}
                    >
                      <div className="text-4xl font-black bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2">
                        532+
                      </div>
                      <div className={`text-sm font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        студентов
                      </div>
                    </motion.div>
                    <motion.div
                      whileHover={{ y: -5, scale: 1.03 }}
                      className={`p-6 rounded-2xl text-center ${
                        isDark ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-blue-50 border border-blue-200'
                      }`}
                    >
                      <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                        12+
                      </div>
                      <div className={`text-sm font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        специальностей
                      </div>
                    </motion.div>
                  </div>
                </div>
              </section>

              {/* Floating Cards - Raised higher */}
              <section className="relative -mt-8 pb-16">
                <div className="container mx-auto px-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.div
                      whileHover={{ y: -10, scale: 1.05 }}
                      className={`p-6 rounded-2xl ${
                        isDark ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-blue-50 border border-blue-200'
                      }`}
                    >
                      <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Качественное образование
                      </h3>
                      <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                        Современные программы подготовки специалистов
                      </p>
                    </motion.div>
                    <motion.div
                      whileHover={{ y: -10, scale: 1.05 }}
                      className={`p-6 rounded-2xl ${
                        isDark ? 'bg-cyan-500/10 border border-cyan-500/30' : 'bg-cyan-50 border border-cyan-200'
                      }`}
                    >
                      <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Гарантия трудоустройства
                      </h3>
                      <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                        98% выпускников трудоустроены
                      </p>
                    </motion.div>
                    <motion.div
                      whileHover={{ y: -10, scale: 1.05 }}
                      className={`p-6 rounded-2xl ${
                        isDark ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-blue-50 border border-blue-200'
                      }`}
                    >
                      <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Современное оборудование
                      </h3>
                      <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                        Обучение на новейших технологиях
                      </p>
                    </motion.div>
                  </div>
                </div>
              </section>

              {/* Main News Section - Aligned titles */}
              <section className="py-16">
                <div className="container mx-auto px-6">
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Main News - Left half - 1 large carousel */}
                    <div>
                      <h2 className={`text-3xl font-black mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Главное
                      </h2>
                      <div className="relative h-[500px]">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={currentMainNews}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5 }}
                            className={`rounded-2xl overflow-hidden cursor-pointer h-full ${
                              isDark ? 'bg-slate-800' : 'bg-white shadow-lg'
                            }`}
                          >
                            <div className="relative h-3/4">
                              <img 
                                src={mainNews[currentMainNews].image} 
                                alt={mainNews[currentMainNews].title} 
                                className="w-full h-full object-cover" 
                              />
                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                                <p className="text-white/80 text-xs mb-2">
                                  {mainNews[currentMainNews].date}
                                </p>
                                <h3 className="text-white text-2xl font-bold">
                                  {mainNews[currentMainNews].title}
                                </h3>
                              </div>
                            </div>
                            <div className="p-4 flex justify-center gap-2">
                              {mainNews.map((_, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => setCurrentMainNews(idx)}
                                  className={`transition-all ${
                                    currentMainNews === idx 
                                      ? 'bg-blue-600 w-8 h-2' 
                                      : isDark ? 'bg-slate-700 w-2 h-2' : 'bg-slate-300 w-2 h-2'
                                  } rounded-full`}
                                />
                              ))}
                            </div>
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Regular News - Right half - 4 news */}
                    <div>
                      <div className="flex items-center justify-between mb-8">
                        <h3 className={`text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          Новости
                        </h3>
                        <button className={`text-sm font-semibold ${isDark ? 'text-blue-400' : 'text-blue-600'} hover:underline`}>
                          Все новости →
                        </button>
                      </div>
                      <div className="space-y-4">
                        {filteredNews.map((news) => (
                          <motion.div
                            key={news.id}
                            whileHover={{ scale: 1.03 }}
                            className={`rounded-xl overflow-hidden cursor-pointer ${
                              isDark ? 'bg-slate-800' : 'bg-white shadow'
                            }`}
                          >
                            <div className="overflow-hidden">
                              <motion.img
                                whileHover={{ scale: 1.1 }}
                                src={news.image}
                                alt={news.title}
                                className="w-full h-32 object-cover transition-transform duration-300"
                              />
                            </div>
                            <div className="p-3">
                              <p className={`text-xs mb-1 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                                {news.date}
                              </p>
                              <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                {news.title}
                              </h4>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* About College - Fixed expansion */}
              <section className={`py-16 ${isDark ? 'bg-slate-900/50' : 'bg-blue-50/50'}`}>
                <div className="container mx-auto px-6">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className={`text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      О колледже
                    </h2>
                    <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-bold hover:shadow-xl transition-all">
                      → Перейти
                    </button>
                  </div>

                  <div className="grid lg:grid-cols-4 gap-8">
                    {/* Director Card - Fixed width */}
                    <motion.div
                      whileHover={{ y: -5 }}
                      className={`p-6 rounded-2xl text-center ${
                        isDark ? 'bg-slate-800' : 'bg-white shadow-lg'
                      } lg:col-span-1`}
                    >
                      <img
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=250&fit=crop"
                        alt="Директор"
                        className="w-32 h-40 mx-auto rounded-xl object-cover mb-4"
                      />
                      <p className={`text-xs font-bold mb-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                        Директор
                      </p>
                      <button className={`text-lg font-bold ${isDark ? 'text-white hover:text-blue-400' : 'text-slate-900 hover:text-blue-600'} transition-colors`}>
                        Бровченко Нелли Анатольевна
                      </button>
                    </motion.div>

                    {/* History Text - Scrollable, doesn't affect neighbors */}
                    <div className="lg:col-span-3">
                      <div className={`p-6 rounded-2xl ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
                        <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                          В целях создания необходимых условий для получения различными категориями населения качественного профессионального образования, удовлетворения потребности областной экономики в квалифицированных кадрах, для подготовки, переподготовки и повышения квалификации рабочих кадров и специалистов для предприятий и организаций различных форм собственности...
                        </p>
                        <details className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          <summary className="cursor-pointer font-bold mb-2 hover:text-blue-600 transition-colors">
                            ЭТАПЫ РАЗВИТИЯ ▼
                          </summary>
                          <motion.ul 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="list-disc pl-6 space-y-1 mt-2"
                          >
                            <li>Основан в 1930 году как фабрично-заводская школа</li>
                            <li>В 1940 году – железнодорожное училище №3</li>
                            <li>В 1963 году – железнодорожное техническое училище №6</li>
                            <li>В 1984 году – СПТУ №6</li>
                            <li>С 1992 года – профессиональный лицей №6</li>
                            <li>С 2015 года – ГБПОУ ВО "ЛПТТ имени А.К. Лысенко"</li>
                          </motion.ul>
                        </details>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Announcements - Increased height */}
              <section className="py-20">
                <div className="container mx-auto px-6">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className={`text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Объявления
                    </h2>
                    <button className={`text-sm font-semibold ${isDark ? 'text-blue-400' : 'text-blue-600'} hover:underline`}>
                      → Все объявления
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        whileHover={{ y: -5 }}
                        className={`p-8 rounded-2xl min-h-[200px] ${
                          isDark ? 'bg-slate-800 border border-blue-500/20' : 'bg-white shadow-lg'
                        }`}
                      >
                        <div className={`text-xs font-bold mb-3 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                          15.01.2025
                        </div>
                        <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          Объявление {i}
                        </h3>
                        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          Краткое описание объявления для студентов и абитуриентов...
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Events - 2x3 with calendar */}
              <section className={`py-16 ${isDark ? 'bg-slate-900/50' : 'bg-blue-50/50'}`}>
                <div className="container mx-auto px-6">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className={`text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Мероприятия
                    </h2>
                    <div className="flex gap-3">
                      <button className={`text-sm font-semibold ${isDark ? 'text-blue-400' : 'text-blue-600'} hover:underline`}>
                        → Все мероприятия
                      </button>
                      <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-bold flex items-center gap-2 hover:shadow-xl transition-all">
                        <CalendarIcon className="w-4 h-4" />
                        Календарь
                      </button>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    {filteredEvents.map((event) => (
                      <motion.div
                        key={event.id}
                        whileHover={{ y: -5, scale: 1.03 }}
                        className={`rounded-2xl overflow-hidden ${
                          isDark ? 'bg-slate-800' : 'bg-white shadow-lg'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <motion.img
                            whileHover={{ scale: 1.1 }}
                            src={event.image}
                            alt={event.title}
                            className="w-full h-48 object-cover transition-transform duration-300"
                          />
                        </div>
                        <div className="p-4">
                          <p className={`text-xs font-bold mb-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                            {event.date}
                          </p>
                          <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {event.title}
                          </h3>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Videos - 2x4 with player */}
              <section className="py-20">
                <div className="container mx-auto px-6">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className={`text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Видео
                    </h2>
                    <button className={`text-sm font-semibold ${isDark ? 'text-blue-400' : 'text-blue-600'} hover:underline`}>
                      → Все видео
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredVideos.map((video) => (
                      <motion.div
                        key={video.id}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => {
                          setCurrentVideo(video.url)
                          setVideoPlayerOpen(true)
                        }}
                        className={`rounded-2xl overflow-hidden cursor-pointer ${
                          isDark ? 'bg-slate-800' : 'bg-white shadow-lg'
                        }`}
                      >
                        <div className="relative">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-40 object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition-colors">
                            <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                              <Play className="w-6 h-6 text-blue-600 ml-1" />
                            </div>
                          </div>
                        </div>
                        <div className="p-3">
                          <p className={`text-xs mb-1 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                            {video.date}
                          </p>
                          <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {video.title}
                          </h4>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Photo Gallery - 4x4 with lightbox */}
              <section className={`py-16 ${isDark ? 'bg-slate-900/50' : 'bg-blue-50/50'}`}>
                <div className="container mx-auto px-6">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className={`text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Фотогалерея
                    </h2>
                    <button className={`text-sm font-semibold ${isDark ? 'text-blue-400' : 'text-blue-600'} hover:underline`}>
                      → Все фото
                    </button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {photos.map((photo) => (
                      <motion.div
                        key={photo.id}
                        whileHover={{ scale: 1.05, zIndex: 10 }}
                        onClick={() => {
                          setLightboxImage(photo.image)
                          setLightboxOpen(true)
                        }}
                        className="rounded-xl overflow-hidden cursor-pointer shadow-lg"
                      >
                        <img
                          src={photo.image}
                          alt={`Фото ${photo.id}`}
                          className="w-full h-48 object-cover"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            </motion.div>
          ) : (
            <div className="container mx-auto px-6 py-20">
              <h2 className={`text-4xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {navigationStructure.find(s => s.id === activeSection)?.label}
              </h2>
              <p className={`mt-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Раздел в разработке...
              </p>
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full shadow-2xl hover:shadow-blue-500/50 z-50"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Lightbox for photos */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 bg-black/90 z-[200] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[90vh]"
            >
              <img src={lightboxImage} alt="Lightbox" className="w-full h-full object-contain rounded-2xl" />
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 rounded-full backdrop-blur-sm transition-all"
              >
                <CloseIcon className="w-6 h-6 text-white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Player Modal */}
      <AnimatePresence>
        {videoPlayerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVideoPlayerOpen(false)}
            className="fixed inset-0 bg-black/90 z-[200] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl aspect-video"
            >
              <iframe
                src={currentVideo}
                className="w-full h-full rounded-2xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <button
                onClick={() => setVideoPlayerOpen(false)}
                className="absolute -top-12 right-0 p-2 bg-white/20 hover:bg-white/40 rounded-full backdrop-blur-sm transition-all"
              >
                <CloseIcon className="w-6 h-6 text-white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern Footer */}
      <footer className={`relative mt-20 overflow-hidden ${
        isDark ? 'bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900' : 'bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50'
      }`}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Contacts */}
            <div>
              <h4 className={`font-bold text-lg mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <Phone className="w-5 h-5 text-blue-600" />
                КОНТАКТЫ
              </h4>
              <div className={`space-y-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                <p className="font-semibold">397908, Воронежская область</p>
                <p>г. Лиски, ул. Лысенко, д. 1</p>
                <a href="tel:+74739144665" className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                  <Phone className="w-4 h-4" />
                  +7 (47391) 4-46-65
                </a>
                <a href="mailto:lptt@govvrn.ru" className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                  <Mail className="w-4 h-4" />
                  lptt@govvrn.ru
                </a>
              </div>
            </div>

            {/* Menu */}
            <div>
              <h4 className={`font-bold text-lg mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                МЕНЮ
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {navigationStructure.slice(0, 8).map((section) => (
                  <button
                    key={section.id}
                    onClick={() => handleNavigate(section.id)}
                    className={`text-left ${
                      isDark ? 'text-slate-400 hover:text-blue-400' : 'text-slate-600 hover:text-blue-600'
                    } transition-colors`}
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Social */}
            <div>
              <h4 className={`font-bold text-lg mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                СОЦИАЛЬНЫЕ СЕТИ
              </h4>
              <div className="flex gap-3">
                <motion.a
                  href="https://vk.com/lptt"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -3 }}
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center text-white shadow-lg"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.45 14.22h-1.8c-.61 0-.79-.49-1.89-1.59-.95-.9-1.37-1.02-1.61-1.02-.33 0-.42.09-.42.54v1.44c0 .39-.13.62-1.14.62-1.68 0-3.55-.99-4.86-2.83-1.97-2.72-2.51-4.77-2.51-5.19 0-.24.09-.46.54-.46h1.8c.4 0 .55.19.71.62.78 2.14 2.09 4.01 2.63 4.01.2 0 .29-.09.29-.6V9.56c-.06-1.05-.62-1.14-.62-1.51 0-.19.16-.39.42-.39h2.83c.34 0 .46.18.46.58v3.11c0 .34.15.46.25.46.2 0 .36-.12.73-.49 1.12-1.26 1.93-3.21 1.93-3.21.11-.22.29-.43.73-.43h1.8c.54 0 .66.28.54.66-.21.94-2.42 3.82-2.42 3.82-.17.27-.23.39 0 .71.17.23.73.72 1.11 1.15.68.79 1.21 1.45 1.35 1.91.14.46-.09.7-.62.7z"/>
                  </svg>
                </motion.a>
                <motion.a
                  href="https://ok.ru/lptt"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -3 }}
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-600 to-orange-500 flex items-center justify-center text-white shadow-lg"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 3.6c2.204 0 4 1.796 4 4s-1.796 4-4 4-4-1.796-4-4 1.796-4 4-4zm0 15.6c-3.315 0-6-2.685-6-6 0-.825.675-1.5 1.5-1.5s1.5.675 1.5 1.5c0 1.655 1.345 3 3 3s3-1.345 3-3c0-.825.675-1.5 1.5-1.5s1.5.675 1.5 1.5c0 3.315-2.685 6-6 6z"/>
                  </svg>
                </motion.a>
                <motion.a
                  href="https://youtube.com/@lptt"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -3 }}
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-500 flex items-center justify-center text-white shadow-lg"
                >
                  <Play className="w-6 h-6" />
                </motion.a>
              </div>
            </div>
          </div>

          <div className={`relative h-px mb-8 ${isDark ? 'bg-blue-500/20' : 'bg-blue-200'}`}>
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px"
            />
          </div>

          <div className="text-center">
            <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
              © 2025 <span className="font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">ГБПОУ ВО "ЛПТТ имени А.К. Лысенко"</span>. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
