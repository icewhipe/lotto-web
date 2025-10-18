import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
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
  MapPin,
  Award,
  Users,
  Briefcase,
  TrendingUp,
} from 'lucide-react'
import { navigationStructure } from '../data/navigationStructure'
import { rafThrottle } from '../utils/performance'
import { publicAPI } from '../services/api'
import Calendar from './Calendar'
import ApplicationForm from './ApplicationForm'

interface FinalMainSiteProps {
  onNavigateToDiary: () => void
}

export default function FinalMainSite({ onNavigateToDiary }: FinalMainSiteProps) {
  const shouldReduceMotion = useReducedMotion()
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(() => {
    // Проверяем localStorage и системные настройки
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    return savedTheme === 'dark' || (!savedTheme && prefersDark)
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null)
  const [navbarVisible, setNavbarVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [currentBanner, setCurrentBanner] = useState(0)
  const [currentMainNews, setCurrentMainNews] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState('')
  const [videoPlayerOpen, setVideoPlayerOpen] = useState(false)
  const [currentVideo, setCurrentVideo] = useState('')
  const [showCalendar, setShowCalendar] = useState(false)
  const [expandedAnnouncement, setExpandedAnnouncement] = useState<number | null>(null)
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null)
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [apiData, setApiData] = useState({
    stats: null as any,
    news: [] as any[],
    loading: true
  })

  const handleScroll = useCallback(
    rafThrottle(() => {
      const scroll = window.scrollY
      setShowScrollTop(scroll > 500)
    }),
    []
  )

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Инициализация темы
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  // Загрузка данных с API
  useEffect(() => {
    const loadApiData = async () => {
      try {
        const [statsResponse, newsResponse] = await Promise.all([
          publicAPI.getStats(),
          publicAPI.getNews({ limit: 4 })
        ])
        
        setApiData({
          stats: statsResponse.data,
          news: newsResponse.data?.items || [],
          loading: false
        })
      } catch (error) {
        console.error('Failed to load API data:', error)
        setApiData(prev => ({ ...prev, loading: false }))
      }
    }

    loadApiData()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % 4)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMainNews((prev) => (prev + 1) % 4)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  // Скрытие navbar при скролле
  useEffect(() => {
    const handleScroll = rafThrottle(() => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Скроллим вниз - скрываем navbar
        setNavbarVisible(false)
      } else {
        // Скроллим вверх - показываем navbar
        setNavbarVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    })

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const handleNavigate = useCallback((section: string) => {
    setActiveSection(section)
    setMobileMenuOpen(false)
    setDropdownOpen(null)
    window.scrollTo({ top: 0, behavior: shouldReduceMotion ? 'auto' : 'smooth' })
  }, [shouldReduceMotion])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: shouldReduceMotion ? 'auto' : 'smooth' })
  }, [shouldReduceMotion])

  // Мемоизируем статические данные для оптимизации
  const banners = useMemo(() => [
    { id: 1, title: 'IT-Куб', subtitle: 'Цифровое образование будущего', gradient: 'from-blue-600 via-cyan-500 to-blue-400', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=400&fit=crop&q=80' },
    { id: 2, title: 'Профессионалитет', subtitle: 'Федеральный проект развития', gradient: 'from-indigo-600 via-blue-500 to-cyan-400', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=400&fit=crop&q=80' },
    { id: 3, title: '80 лет Победы', subtitle: 'Помним. Гордимся. Наследуем', gradient: 'from-red-600 via-orange-500 to-yellow-400', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=400&fit=crop&q=80' },
    { id: 4, title: 'Приёмная кампания 2025', subtitle: 'Стань частью команды ЛПТТ!', gradient: 'from-green-600 via-emerald-500 to-teal-400', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&h=400&fit=crop&q=80' },
  ], [])

  const mainNews = [
    { id: 1, title: 'Техникум победил в региональном конкурсе профмастерства', date: '15.01.2025', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=610&h=407&fit=crop' },
    { id: 2, title: 'Открытие нового IT-Куба с современным оборудованием', date: '12.01.2025', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=610&h=407&fit=crop' },
    { id: 3, title: 'День открытых дверей 2025 - встречаем абитуриентов', date: '10.01.2025', image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=610&h=407&fit=crop' },
    { id: 4, title: 'Новые специальности на 2025-2026 учебный год', date: '08.01.2025', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=610&h=407&fit=crop' },
  ]

  const regularNews = [
    { id: 1, title: 'Студенты приняли участие в молодёжном форуме', date: '14.01.2025', image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=290&h=193&fit=crop' },
    { id: 2, title: 'Спортивные достижения наших студентов', date: '13.01.2025', image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=290&h=193&fit=crop' },
    { id: 3, title: 'Конференция преподавателей', date: '11.01.2025', image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=290&h=193&fit=crop' },
    { id: 4, title: 'Волонтёрская акция помощи', date: '09.01.2025', image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=290&h=193&fit=crop' },
  ]

  const timeline = [
    { year: '1930', title: 'Основание', desc: 'Фабрично-заводская школа' },
    { year: '1940', title: 'Железнодорожное училище №3', desc: 'Новый этап развития' },
    { year: '1963', title: 'Техническое училище №6', desc: 'Расширение специальностей' },
    { year: '1984', title: 'СПТУ №6', desc: 'Профессиональное образование' },
    { year: '1992', title: 'Профессиональный лицей №6', desc: 'Повышение статуса' },
    { year: '2010', title: 'Промышленно-транспортный техникум', desc: 'Современное образование' },
    { year: '2015', title: 'ГБПОУ ВО ЛПТТ им. А.К. Лысенко', desc: 'Актуальный статус' },
  ]

  const events = [
    { id: 1, title: 'Спортивный турнир "Кубок ЛПТТ"', date: '20.01.2025', description: 'Ежегодный спортивный турнир между группами техникума. Соревнования по волейболу, баскетболу, настольному теннису.', image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=250&fit=crop' },
    { id: 2, title: 'Конкурс талантов "Студенческая весна"', date: '22.01.2025', description: 'Творческий конкурс для студентов. Вокал, танцы, оригинальный жанр. Призы и дипломы победителям.', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=250&fit=crop' },
    { id: 3, title: 'Научная конференция молодых специалистов', date: '25.01.2025', description: 'Презентация научных проектов студентов. Участие преподавателей и работодателей.', image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=250&fit=crop' },
    { id: 4, title: 'День карьеры с работодателями', date: '27.01.2025', description: 'Встреча с потенциальными работодателями региона. Презентация вакансий, стажировок.', image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=250&fit=crop' },
    { id: 5, title: 'Культурный вечер "Традиции народов"', date: '29.01.2025', description: 'Знакомство с культурой разных народов России. Национальная кухня, костюмы, танцы.', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=250&fit=crop' },
    { id: 6, title: 'Мастер-классы от профессионалов', date: '31.01.2025', description: 'Практические занятия от ведущих специалистов отрасли. Новые технологии и методы работы.', image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=250&fit=crop' },
  ]

  const videos = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    title: `Видео ${i + 1}`,
    date: `${15 - i}.01.2025`,
    thumbnail: `https://images.unsplash.com/photo-${[
      '1562774053-701939374585',
      '1523050854058-8df90110c9f1',
      '1521737604893-d14cc237f11d',
      '1519389950473-47ba0277781c',
      '1461896836934-ffe607ba8211',
      '1552664730-d307ca884978',
      '1504384308090-c894fdcc538d',
      '1591115765373-5207764f72e7'
    ][i]}?w=300&h=200&fit=crop`,
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  }))

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

  const firstRow = useMemo(() => navigationStructure.slice(0, 6), [])
  const secondRow = useMemo(() => navigationStructure.slice(6), [])

  // Поиск с API интеграцией
  const performSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    try {
      // Поиск по новостям
      const newsResponse = await publicAPI.getNews({ limit: 5 })
      const newsResults = newsResponse.data?.items || []

      // Поиск по событиям (локально, так как API для событий может не быть)
      const localEventResults = events.filter(e => 
        e.title.toLowerCase().includes(query.toLowerCase()) ||
        e.description.toLowerCase().includes(query.toLowerCase())
      )

      // Поиск по видео (локально)
      const localVideoResults = videos.filter(v => 
        v.title.toLowerCase().includes(query.toLowerCase())
      )

      setSearchResults([
        ...newsResults.map((item: any) => ({ ...item, type: 'news' })),
        ...localEventResults.map(item => ({ ...item, type: 'event' })),
        ...localVideoResults.map(item => ({ ...item, type: 'video' }))
      ])
    } catch (error) {
      console.error('Search error:', error)
      // Fallback к локальному поиску
      const localResults = [
        ...regularNews.filter(n => n.title.toLowerCase().includes(query.toLowerCase())).map(item => ({ ...item, type: 'news' })),
        ...events.filter(e => e.title.toLowerCase().includes(query.toLowerCase())).map(item => ({ ...item, type: 'event' })),
        ...videos.filter(v => v.title.toLowerCase().includes(query.toLowerCase())).map(item => ({ ...item, type: 'video' }))
      ]
      setSearchResults(localResults)
    } finally {
      setIsSearching(false)
    }
  }

  // Debounced search с мемоизацией
  const debouncedSearch = useCallback(
    (() => {
      let timeoutId: number
      return (query: string) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          performSearch(query)
        }, 300)
      }
    })(),
    []
  )

  useEffect(() => {
    debouncedSearch(searchQuery)
  }, [searchQuery, debouncedSearch])

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
    <div className={`min-h-screen transition-all duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900' 
        : 'bg-gradient-to-br from-blue-50/40 via-white to-cyan-50/40'
    }`} style={{
      backgroundImage: isDark 
        ? 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.05) 0%, transparent 50%)'
        : 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.08) 0%, transparent 50%)'
    }}>
      {/* TWO-FLOOR NAVBAR - Full Width */}
      <motion.header
        initial={{ y: -200 }}
        animate={{ y: navbarVisible ? 0 : -200 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`fixed top-0 left-0 right-0 z-50 ${
          isDark ? 'bg-slate-900/95' : 'bg-white/95'
        } backdrop-blur-xl shadow-lg border-b ${isDark ? 'border-blue-500/20' : 'border-blue-200'}`}
      >
        {/* Floor 1: Logo + Contacts + Actions */}
        <div className="w-full border-b border-blue-100 dark:border-blue-500/10">
          <div className="max-w-[1920px] mx-auto px-6 py-3">
            <div className="flex items-center justify-between gap-6">
              {/* Logo */}
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
                <a href="tel:+74739144665" className={`flex items-center gap-2 text-sm font-semibold ${
                  isDark ? 'text-slate-300 hover:text-blue-400' : 'text-slate-700 hover:text-blue-600'
                } transition-colors`}>
                  <Phone className="w-4 h-4" />
                  +7 (47391) 4-46-65
                </a>
                <a href="mailto:lptt@govvrn.ru" className={`flex items-center gap-2 text-sm font-semibold ${
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
                  <AnimatePresence>
                  {searchOpen ? (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 300, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative"
                    >
                      <input
                        type="text"
                        placeholder="Поиск по сайту..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onBlur={() => !searchQuery && setSearchOpen(false)}
                        autoFocus
                        className={`w-full px-4 py-2 pr-10 rounded-xl text-sm font-medium ${
                          isDark 
                            ? 'bg-slate-800 text-white border-2 border-blue-500/30' 
                            : 'bg-white border-2 border-blue-200'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                      {isSearching && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                      )}
                      
                      {/* Search Results Dropdown */}
                      {searchQuery && searchResults.length > 0 && (
                        <div className={`absolute top-full left-0 right-0 mt-2 max-h-96 overflow-y-auto rounded-xl shadow-2xl z-50 ${
                          isDark ? 'bg-slate-800 border border-blue-500/30' : 'bg-white border border-blue-200'
                        }`}>
                          {searchResults.map((result, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className={`p-4 border-b last:border-b-0 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors ${
                                isDark ? 'border-slate-700' : 'border-gray-200'
                              }`}
                              onClick={() => {
                                if (result.type === 'news') {
                                  // Переход к новостям
                                  setActiveSection('news')
                                } else if (result.type === 'event') {
                                  // Переход к мероприятиям
                                  setActiveSection('events')
                                } else if (result.type === 'video') {
                                  // Открыть видео
                                  setCurrentVideo(result.url)
                                  setVideoPlayerOpen(true)
                                }
                                setSearchOpen(false)
                                setSearchQuery('')
                              }}
                            >
                              <div className="flex items-start gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                  result.type === 'news' ? 'bg-blue-100 dark:bg-blue-500/20' :
                                  result.type === 'event' ? 'bg-green-100 dark:bg-green-500/20' :
                                  'bg-purple-100 dark:bg-purple-500/20'
                                }`}>
                                  {result.type === 'news' ? '📰' : result.type === 'event' ? '🎭' : '🎬'}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className={`font-semibold text-sm truncate ${
                                    isDark ? 'text-white' : 'text-slate-900'
                                  }`}>
                                    {result.title}
                                  </h4>
                                  <p className={`text-xs mt-1 ${
                                    isDark ? 'text-slate-400' : 'text-slate-600'
                                  }`}>
                                    {result.type === 'news' ? 'Новость' : 
                                     result.type === 'event' ? 'Мероприятие' : 'Видео'}
                                    {result.date && ` • ${result.date}`}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSearchOpen(true)}
                      className={`p-2 rounded-xl ${
                        isDark ? 'hover:bg-blue-500/20 text-slate-300' : 'hover:bg-blue-50 text-slate-700'
                      } transition-all`}
                    >
                      <Search className="w-5 h-5" />
                    </motion.button>
                  )}
                  </AnimatePresence>
                </div>

                {/* Theme */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    const newIsDark = !isDark
                    setIsDark(newIsDark)
                    localStorage.setItem('theme', newIsDark ? 'dark' : 'light')
                    if (newIsDark) {
                      document.documentElement.classList.add('dark')
                    } else {
                      document.documentElement.classList.remove('dark')
                    }
                  }}
                  className={`p-2 rounded-xl ${
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

                {/* Diary */}
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onNavigateToDiary}
                  className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all"
                >
                  <LogIn className="w-4 h-4" />
                  Электронный дневник
                </motion.button>

                {/* Mobile */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className={`lg:hidden p-2 rounded-xl ${
                    isDark ? 'hover:bg-blue-500/20 text-slate-300' : 'hover:bg-blue-50 text-slate-700'
                  }`}
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Floor 2: Navigation Row 1 */}
        <div className="hidden lg:block w-full border-b border-blue-100 dark:border-blue-500/10">
          <div className="max-w-[1920px] mx-auto px-6">
            <nav className="flex items-center justify-between py-2">
              {firstRow.map((section: any) => (
                <div
                  key={section.id}
                  className="relative"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={() => {
                      if (section.subsections) {
                        setDropdownOpen(dropdownOpen === `first-${section.id}` ? null : `first-${section.id}`)
                      } else {
                        handleNavigate(section.id)
                      }
                    }}
                    className={`px-3 py-1.5 rounded-xl text-sm font-bold transition-all flex items-center gap-1 whitespace-nowrap ${
                      activeSection === section.id
                        ? isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'
                        : isDark ? 'text-slate-300 hover:bg-blue-500/10' : 'text-slate-700 hover:bg-blue-50'
                    }`}
                  >
                    {section.label}
                    {section.subsections && (
                      <motion.div
                        animate={{ rotate: dropdownOpen === `first-${section.id}` ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-3 h-3" />
                      </motion.div>
                    )}
                  </motion.button>

                  <AnimatePresence>
                    {section.subsections && dropdownOpen === `first-${section.id}` && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`absolute top-full left-0 mt-1 min-w-[240px] rounded-2xl shadow-2xl z-[100] ${
                          isDark ? 'bg-slate-800 border border-blue-500/30' : 'bg-white border border-blue-200'
                        }`}
                        style={{ maxHeight: '400px', overflowY: 'auto' }}
                      >
                        {section.subsections.map((sub: any) => (
                          <motion.button
                            key={sub.id}
                            whileHover={{ x: 5 }}
                            onClick={() => handleNavigate(section.id)}
                            className={`w-full text-left px-4 py-2 text-sm font-medium ${
                              isDark ? 'text-slate-300 hover:bg-blue-500/15 hover:text-blue-300' : 'text-slate-700 hover:bg-blue-50 hover:text-blue-700'
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

        {/* Floor 3: Navigation Row 2 */}
        <div className={`hidden lg:block w-full ${isDark ? '' : ''}`}>
          <div className="max-w-[1920px] mx-auto px-6">
            <nav className="flex items-center justify-between py-2">
              {secondRow.map((section: any) => (
                <div
                  key={section.id}
                  className="relative"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={() => {
                      if (section.subsections) {
                        setDropdownOpen(dropdownOpen === `first-${section.id}` ? null : `first-${section.id}`)
                      } else {
                        handleNavigate(section.id)
                      }
                    }}
                    className={`px-3 py-1.5 rounded-xl text-sm font-bold transition-all flex items-center gap-1 whitespace-nowrap ${
                      activeSection === section.id
                        ? isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'
                        : isDark ? 'text-slate-300 hover:bg-blue-500/10' : 'text-slate-700 hover:bg-blue-50'
                    }`}
                  >
                    {section.label}
                    {section.subsections && (
                      <motion.div
                        animate={{ rotate: dropdownOpen === `first-${section.id}` ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-3 h-3" />
                      </motion.div>
                    )}
                  </motion.button>

                  <AnimatePresence>
                    {section.subsections && dropdownOpen === `second-${section.id}` && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`absolute top-full left-0 mt-1 min-w-[240px] rounded-2xl shadow-2xl z-[100] ${
                          isDark ? 'bg-slate-800 border border-blue-500/30' : 'bg-white border border-blue-200'
                        }`}
                        style={{ maxHeight: '400px', overflowY: 'auto' }}
                      >
                        {section.subsections.map((sub: any) => (
                          <motion.button
                            key={sub.id}
                            whileHover={{ x: 5 }}
                            onClick={() => handleNavigate(section.id)}
                            className={`w-full text-left px-4 py-2 text-sm font-medium ${
                              isDark ? 'text-slate-300 hover:bg-blue-500/15 hover:text-blue-300' : 'text-slate-700 hover:bg-blue-50 hover:text-blue-700'
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
      <main className="pt-[190px]">
        <AnimatePresence mode="wait">
          {activeSection === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* BANNERS - Rounded, with gap */}
              <section className="max-w-[1920px] mx-auto px-6 mb-4">
                <div className="relative h-[420px] overflow-hidden rounded-3xl shadow-2xl" style={{
                  backgroundImage: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%)'
                }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentBanner}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.5), rgba(0,0,0,0.3)), url(${banners[currentBanner].image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center text-center">
                        <div>
                          <motion.h2 
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-6xl font-black mb-4 text-white drop-shadow-lg"
                          >
                            {banners[currentBanner].title}
                          </motion.h2>
                          <motion.p 
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="text-2xl font-semibold text-white/90"
                          >
                            {banners[currentBanner].subtitle}
                          </motion.p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Controls */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {banners.map((_, idx) => (
                      <motion.button
                        key={idx}
                        onClick={() => setCurrentBanner(idx)}
                        whileHover={{ scale: 1.2 }}
                        className={`transition-all rounded-full ${
                          currentBanner === idx ? 'bg-white w-10 h-3' : 'bg-white/50 w-3 h-3'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentBanner((currentBanner - 1 + 4) % 4)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/30 hover:bg-white/50 rounded-full backdrop-blur-sm transition-all z-10"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  <button
                    onClick={() => setCurrentBanner((currentBanner + 1) % 4)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/30 hover:bg-white/50 rounded-full backdrop-blur-sm transition-all z-10"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                </div>
              </section>

              {/* HERO - Gradient Title, Badges, Buttons */}
              <section className="relative py-20 overflow-hidden">
                <div className="max-w-[1920px] mx-auto px-6 text-center">
                  {/* Title - 2 lines with gradient */}
                  <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-6xl lg:text-7xl font-black mb-8 leading-tight"
                  >
                    <span className="block bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
                      Лискинский Промышленно-
                    </span>
                    <span className="block bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
                      Транспортный Техникум
                    </span>
                  </motion.h1>

                  {/* Buttons */}
                  <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowApplicationForm(true)}
                      className="px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-blue-500/50 transition-all"
                    >
                      Поступить в техникум
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onNavigateToDiary}
                      className="px-10 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-cyan-500/50 transition-all flex items-center gap-2"
                    >
                      <LogIn className="w-5 h-5" />
                      Электронный дневник
                    </motion.button>
                  </div>

                  {/* Badges - Different shapes */}
                  <div className="flex flex-wrap items-center justify-center gap-4 max-w-5xl mx-auto">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 3 }}
                      className={`px-6 py-4 rounded-2xl ${
                        isDark ? 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-2 border-blue-500/30' : 'bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200'
                      } shadow-xl`}
                    >
                      <Users className={`w-6 h-6 mx-auto mb-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                      <div className="text-3xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                        {apiData.loading ? '...' : `${apiData.stats?.students || 532}+`}
                      </div>
                      <div className={`text-sm font-bold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        студентов
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.1, rotate: -3 }}
                      className={`px-6 py-4 rounded-3xl ${
                        isDark ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500/30' : 'bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200'
                      } shadow-xl`}
                    >
                      <Briefcase className={`w-6 h-6 mx-auto mb-2 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
                      <div className="text-3xl font-black bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                        {apiData.loading ? '...' : `${apiData.stats?.specialties || 12}+`}
                      </div>
                      <div className={`text-sm font-bold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        специальностей
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 3 }}
                      className={`px-6 py-4 rounded-xl ${
                        isDark ? 'bg-gradient-to-br from-indigo-500/20 to-blue-500/20 border-2 border-indigo-500/30' : 'bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-indigo-200'
                      } shadow-xl`}
                    >
                      <Award className={`w-6 h-6 mx-auto mb-2 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
                      <div className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                        {apiData.loading ? '...' : `${apiData.stats?.yearsOfExperience || 50}+`}
                      </div>
                      <div className={`text-sm font-bold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        лет опыта
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.1, rotate: -3 }}
                      className={`px-6 py-4 rounded-full ${
                        isDark ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-500/30' : 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200'
                      } shadow-xl`}
                    >
                      <TrendingUp className={`w-6 h-6 mx-auto mb-2 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                      <div className="text-3xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        {apiData.loading ? '...' : `${apiData.stats?.employmentRate || 98}%`}
                      </div>
                      <div className={`text-sm font-bold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        трудоустройства
                      </div>
                    </motion.div>
                  </div>
                </div>
              </section>

              {/* NEWS - Big Left + 4 Right */}
              <section className="py-20">
                <div className="max-w-[1920px] mx-auto px-6">
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Main News */}
                    <div>
                      <h2 className={`text-4xl font-black mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        📰 Главное
                      </h2>
                      <div className="relative h-[600px]">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={currentMainNews}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={`rounded-3xl overflow-hidden cursor-pointer h-full shadow-2xl ${
                              isDark ? 'bg-slate-800' : 'bg-white'
                            }`}
                          >
                            <div className="relative h-3/4">
                              <motion.img 
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                src={mainNews[currentMainNews].image} 
                                alt={mainNews[currentMainNews].title} 
                                className="w-full h-full object-cover" 
                              />
                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                                <p className="text-white/80 text-sm mb-2">
                                  📅 {mainNews[currentMainNews].date}
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
                                  className={`transition-all rounded-full ${
                                    currentMainNews === idx 
                                      ? 'bg-blue-600 w-10 h-2' 
                                      : isDark ? 'bg-slate-700 w-2 h-2' : 'bg-slate-300 w-2 h-2'
                                  }`}
                                />
                              ))}
                            </div>
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Regular News */}
                    <div>
                      <div className="flex items-center justify-between mb-8">
                        <h3 className={`text-4xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          📑 Новости
                        </h3>
                        <button className={`text-sm font-bold px-4 py-2 rounded-xl ${isDark ? 'text-blue-400 hover:bg-blue-500/20' : 'text-blue-600 hover:bg-blue-50'} transition-all`}>
                          Все новости →
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {filteredNews.map((news: any) => (
                          <motion.div
                            key={news.id}
                            whileHover={{ scale: 1.03, y: -5 }}
                            className={`rounded-2xl overflow-hidden cursor-pointer shadow-xl ${
                              isDark ? 'bg-slate-800' : 'bg-white'
                            }`}
                          >
                            <div className="overflow-hidden">
                              <motion.img
                                whileHover={{ scale: 1.15 }}
                                transition={{ duration: 0.4 }}
                                src={news.image}
                                alt={news.title}
                                className="w-full h-32 object-cover"
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

              {/* ABOUT - Timeline + Director */}
              <section className={`py-20 ${isDark ? 'bg-slate-900/50' : 'bg-blue-50/50'}`}>
                <div className="max-w-[1920px] mx-auto px-6">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className={`text-4xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      📘 О колледже
                    </h2>
                    <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all">
                      → Подробнее
                    </button>
                  </div>

                  <div className="grid lg:grid-cols-4 gap-8 mb-12">
                    {/* Director */}
                    <motion.div
                      whileHover={{ y: -8, scale: 1.02 }}
                      className={`p-6 rounded-3xl text-center shadow-2xl ${
                        isDark ? 'bg-slate-800 border-2 border-blue-500/30' : 'bg-white border-2 border-blue-200'
                      }`}
                    >
                      <img
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=250&fit=crop"
                        alt="Директор"
                        className="w-32 h-40 mx-auto rounded-2xl object-cover mb-4 shadow-lg"
                      />
                      <p className={`text-sm font-bold mb-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                        Директор
                      </p>
                      <button className={`text-lg font-bold ${isDark ? 'text-white hover:text-blue-400' : 'text-slate-900 hover:text-blue-600'} transition-colors`}>
                        Бровченко Нелли Анатольевна
                      </button>
                    </motion.div>

                    {/* Text */}
                    <div className="lg:col-span-3">
                      <div className={`p-8 rounded-3xl shadow-xl ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
                        <p className={`text-base leading-relaxed mb-6 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                          🏫 В целях создания необходимых условий для получения различными категориями населения качественного профессионального образования, удовлетворения потребности областной экономики в квалифицированных кадрах, для подготовки, переподготовки и повышения квалификации рабочих кадров и специалистов для предприятий и организаций различных форм собственности...
                        </p>
                        <p className={`text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                          🛠️ Именно с этого момента началась история нашего учебного заведения в новом статусе.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="relative">
                    <h3 className={`text-2xl font-black mb-8 text-center ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      📍 Этапы развития
                    </h3>
                    <div className="grid md:grid-cols-7 gap-4">
                        {timeline.map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1 }}
                          className="relative"
                        >
                          {/* Timeline connector */}
                          {idx < timeline.length - 1 && (
                            <div className={`absolute top-1/2 left-full w-full h-0.5 ${
                              isDark ? 'bg-gradient-to-r from-blue-500/50 to-transparent' : 'bg-gradient-to-r from-blue-400/50 to-transparent'
                            }`} />
                          )}
                          
                          <motion.div
                            whileHover={{ y: -10, scale: 1.05 }}
                            className={`relative p-6 rounded-2xl text-center ${
                              isDark ? 'bg-slate-800/50 backdrop-blur-sm border border-blue-500/30' : 'bg-white/80 backdrop-blur-sm border border-blue-200'
                            } shadow-lg overflow-hidden`}
                          >
                            {/* Background accent */}
                            <div className={`absolute inset-0 opacity-10 ${
                              isDark ? 'bg-gradient-to-br from-blue-500 to-cyan-500' : 'bg-gradient-to-br from-blue-400 to-cyan-400'
                            }`} />
                            
                            {/* Content */}
                            <div className="relative z-10">
                              <div className={`text-3xl font-black mb-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent`}>
                                {item.year}
                              </div>
                              <div className={`text-sm font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                {item.title}
                              </div>
                              <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                {item.desc}
                              </div>
                            </div>
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* ANNOUNCEMENTS - Increased height */}
              <section className="py-24">
                <div className="max-w-[1920px] mx-auto px-6">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className={`text-4xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      📢 Объявления
                    </h2>
                    <button className={`text-sm font-bold px-4 py-2 rounded-xl ${isDark ? 'text-blue-400 hover:bg-blue-500/20' : 'text-blue-600 hover:bg-blue-50'} transition-all`}>
                      → Все объявления
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { id: 1, date: '15.01.2025', title: 'Начало приёмной кампании', desc: 'Подача документов для поступления на 2025-2026 учебный год открыта!' },
                      { id: 2, date: '14.01.2025', title: 'Расписание экзаменов', desc: 'Опубликовано расписание вступительных испытаний для абитуриентов.' },
                      { id: 3, date: '13.01.2025', title: 'Конкурс профмастерства', desc: 'Приглашаем студентов принять участие в региональном чемпионате.' }
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        onClick={() => setExpandedAnnouncement(expandedAnnouncement === item.id ? null : item.id)}
                        className={`p-8 rounded-3xl min-h-[250px] shadow-2xl cursor-pointer transition-all ${
                          isDark ? 'bg-gradient-to-br from-slate-800 to-blue-900/20 border-2 border-blue-500/20 hover:border-blue-500/40' : 'bg-gradient-to-br from-white to-blue-50 border-2 border-blue-200 hover:border-blue-400'
                        }`}
                      >
                        <div className={`text-sm font-bold mb-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                          {item.date}
                        </div>
                        <h3 className={`text-2xl font-black mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {item.title}
                        </h3>
                        <AnimatePresence>
                          {expandedAnnouncement === item.id ? (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className={`text-base leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
                            >
                              {item.desc}
                            </motion.p>
                          ) : (
                            <p className={`text-base leading-relaxed line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                              {item.desc}
                            </p>
                          )}
                        </AnimatePresence>
                        <div className={`text-sm font-semibold mt-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                          {expandedAnnouncement === item.id ? 'Скрыть' : 'Подробнее'} →
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* EVENTS 2x3 + Calendar */}
              <section className={`py-20 ${isDark ? 'bg-slate-900/50' : 'bg-blue-50/50'}`}>
                <div className="max-w-[1920px] mx-auto px-6">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className={`text-4xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      🎭 Мероприятия
                    </h2>
                    <div className="flex gap-3">
                      <button className={`text-sm font-bold px-4 py-2 rounded-xl ${isDark ? 'text-blue-400 hover:bg-blue-500/20' : 'text-blue-600 hover:bg-blue-50'} transition-all`}>
                        → Все мероприятия
                      </button>
                      <button 
                        onClick={() => setShowCalendar(!showCalendar)}
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
                      >
                        <CalendarIcon className="w-4 h-4" />
                        📅 Календарь
                      </button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                      {filteredEvents.map((event: any) => (
                        <motion.div
                          key={event.id}
                          whileHover={{ y: -8, scale: 1.03 }}
                          onClick={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
                          className={`rounded-3xl overflow-hidden shadow-2xl cursor-pointer ${
                            isDark ? 'bg-slate-800/95' : 'bg-white'
                          }`}
                        >
                          <div className="overflow-hidden">
                            <motion.img
                              whileHover={{ scale: 1.15 }}
                              transition={{ duration: 0.4 }}
                              src={event.image}
                              alt={event.title}
                              className="w-full h-48 object-cover"
                            />
                          </div>
                          <div className="p-5">
                            <p className={`text-sm font-bold mb-2 flex items-center gap-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                              <CalendarIcon className="w-4 h-4" />
                              {event.date}
                            </p>
                            <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                              {event.title}
                            </h3>
                            <AnimatePresence>
                              {expandedEvent === event.id && event.description && (
                                <motion.p
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
                                >
                                  {event.description}
                                </motion.p>
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </div>
              </section>

              {/* VIDEOS 2x4 */}
              <section className={`py-20 ${isDark ? 'bg-slate-900/50' : 'bg-blue-50/50'}`}>
                <div className="max-w-[1920px] mx-auto px-6">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className={`text-4xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      🎬 Видео
                    </h2>
                    <button className={`text-sm font-bold px-4 py-2 rounded-xl ${isDark ? 'text-blue-400 hover:bg-blue-500/20' : 'text-blue-600 hover:bg-blue-50'} transition-all`}>
                      → Все видео
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredVideos.map((video: any) => (
                      <motion.div
                        key={video.id}
                        whileHover={{ scale: 1.05, y: -5 }}
                        onClick={() => {
                          setCurrentVideo(video.url)
                          setVideoPlayerOpen(true)
                        }}
                        className={`rounded-3xl overflow-hidden cursor-pointer shadow-2xl ${
                          isDark ? 'bg-slate-800 border-2 border-transparent hover:border-blue-500' : 'bg-white border-2 border-transparent hover:border-blue-400'
                        } transition-all`}
                      >
                        <div className="relative">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-40 object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 to-transparent hover:from-black/70 transition-all">
                            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-2xl">
                              <Play className="w-8 h-8 text-blue-600 ml-1" />
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
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

              {/* PHOTOS 4x4 */}
              <section className="py-20">
                <div className="max-w-[1920px] mx-auto px-6">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className={`text-4xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      🖼️ Фотогалерея
                    </h2>
                    <button className={`text-sm font-bold px-4 py-2 rounded-xl ${isDark ? 'text-blue-400 hover:bg-blue-500/20' : 'text-blue-600 hover:bg-blue-50'} transition-all`}>
                      → Все фото
                    </button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {photos.map((photo) => (
                      <motion.div
                        key={photo.id}
                        whileHover={{ scale: 1.08, rotate: 2, zIndex: 10 }}
                        onClick={() => {
                          setLightboxImage(photo.image)
                          setLightboxOpen(true)
                        }}
                        className={`rounded-3xl overflow-hidden cursor-pointer shadow-2xl ${
                          isDark ? 'ring-2 ring-transparent hover:ring-blue-500' : 'ring-2 ring-transparent hover:ring-blue-400'
                        } transition-all`}
                      >
                        <img
                          src={photo.image}
                          alt={`Фото ${photo.id}`}
                          className="w-full h-56 object-cover"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className={`relative mt-20 overflow-hidden ${
        isDark ? 'bg-gradient-to-br from-slate-900 via-blue-900/30 to-slate-900' : 'bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50'
      }`}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-[1920px] mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Contacts */}
            <div>
              <h4 className={`font-bold text-lg mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                КОНТАКТЫ
              </h4>
              <div className={`space-y-3 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                <p className="font-semibold flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  397908, Воронежская область
                </p>
                <p className="ml-6">г. Лиски, ул. Лысенко, д. 1</p>
                <a href="tel:+74739144665" className="flex items-center gap-2 hover:text-blue-500 transition-colors font-bold">
                  <Phone className="w-4 h-4" />
                  +7 (47391) 4-46-65
                </a>
                <a href="mailto:lptt@govvrn.ru" className="flex items-center gap-2 hover:text-blue-500 transition-colors font-bold">
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
              <div className="flex flex-col gap-2 text-sm">
                {navigationStructure.slice(0, 8).map((section: any) => (
                  <button
                    key={section.id}
                    onClick={() => handleNavigate(section.id)}
                    className={`text-left font-medium ${
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
                {[
                  { Icon: Play, href: 'https://vk.com/lptt', color: 'from-blue-600 to-blue-500', name: 'ВКонтакте' },
                  { Icon: Users, href: 'https://ok.ru/lptt', color: 'from-orange-600 to-orange-500', name: 'Одноклассники' },
                  { Icon: Play, href: 'https://youtube.com/@lptt', color: 'from-red-600 to-red-500', name: 'YouTube' }
                ].map(({ Icon, href, color, name }, idx) => (
                  <motion.a
                    key={idx}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-xl hover:shadow-2xl transition-all`}
                    title={name}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.a>
                ))}
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

          <div className="text-center space-y-3">
            <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
              © 2025 <span className="font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">ГБПОУ ВО "ЛПТТ имени А.К. Лысенко"</span>. Все права защищены.
            </p>
            <p className="text-lg font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              💙 С любовью от студентов ЛПТТ
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top - Fixed Side */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full shadow-2xl hover:shadow-blue-500/50 z-50"
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Calendar Modal */}
      <AnimatePresence>
        {showCalendar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCalendar(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
          >
            <div onClick={(e) => e.stopPropagation()}>
              <Calendar isDark={isDark} onClose={() => setShowCalendar(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 bg-black/95 z-[200] flex items-center justify-center p-4"
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

      {/* Video Player */}
      <AnimatePresence>
        {videoPlayerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVideoPlayerOpen(false)}
            className="fixed inset-0 bg-black/95 z-[200] flex items-center justify-center p-4"
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

      {/* Application Form */}
      <AnimatePresence>
        {showApplicationForm && (
          <ApplicationForm 
            isDark={isDark} 
            onClose={() => setShowApplicationForm(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  )
}
