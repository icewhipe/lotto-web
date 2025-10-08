import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Search, Sun, Moon } from 'lucide-react'
import { useScrollPosition } from '../hooks/useScrollPosition'

const navLinks = [
  { name: 'Главная', href: '#home' },
  { name: 'О техникуме', href: '#about' },
  { name: 'Специальности', href: '#programs' },
  { name: 'Преподаватели', href: '#staff' },
  { name: 'Новости', href: '#news' },
  { name: 'Поступающим', href: '#admissions' },
  { name: 'Документы', href: '#documents' },
  { name: 'Контакты', href: '#contacts' },
]

const searchData = [
  { title: 'История техникума', description: 'Узнайте о нашей истории с 1958 года', section: 'История', href: '#history' },
  { title: 'Преимущества ЛПТТ', description: '12 причин выбрать наш техникум', section: 'Преимущества', href: '#advantages' },
  { title: 'Специальности', description: 'Все направления подготовки', section: 'Образование', href: '#programs' },
  { title: 'Преподаватели', description: 'Наш педагогический состав', section: 'О нас', href: '#staff' },
  { title: 'Поступление', description: 'Как поступить в ЛПТТ', section: 'Абитуриентам', href: '#admissions' },
  { title: 'Документы', description: 'Нормативная база техникума', section: 'Документы', href: '#documents' },
  { title: 'Контакты', description: 'Свяжитесь с нами', section: 'Контакты', href: '#contacts' },
  { title: 'Новости', description: 'Последние события', section: 'Новости', href: '#news' },
  { title: 'Мероприятия', description: 'Календарь событий', section: 'События', href: '#events' },
  { title: 'Галерея', description: 'Фотографии техникума', section: 'Медиа', href: '#gallery' },
  { title: 'Достижения', description: 'Наши успехи и награды', section: 'О нас', href: '#achievements' },
]

interface NavbarProps {
  isDark: boolean
  toggleTheme: () => void
  onLoginClick?: () => void
}

export default function Navbar({ isDark, toggleTheme, onLoginClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState(searchData.slice(0, 5))
  const [activeSection, setActiveSection] = useState('home')
  const searchRef = useRef<HTMLDivElement>(null)
  const scrollY = useScrollPosition()

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.href.substring(1))
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 150 && rect.bottom >= 150
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = searchData.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.section.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setSearchResults(filtered)
    } else {
      setSearchResults(searchData.slice(0, 5))
    }
  }, [searchQuery])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false)
      }
    }
    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isSearchOpen])

  const handleSearchResult = (href: string) => {
    setIsSearchOpen(false)
    setSearchQuery('')
    window.location.href = href
  }

  const scrolled = scrollY > 50

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-5 left-0 right-0 z-40 mx-auto w-[calc(100%-2.5rem)] max-w-7xl rounded-3xl transition-all duration-300 ${
          scrolled ? 'glass-effect shadow-2xl' : 'glass-effect'
        }`}
      >
        <div className="px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div 
              className="flex flex-col"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-3xl font-black gradient-text">ЛПТТ</span>
              <span className="text-[10px] text-gray-600 dark:text-gray-400 font-medium -mt-1">
                Лискинский промышленно-транспортный техникум
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.slice(0, 5).map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors ${
                    activeSection === link.href.substring(1)
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                  }`}
                >
                  {link.name}
                  {activeSection === link.href.substring(1) && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-purple-600"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              ))}
              
              {/* Action Buttons */}
              <div className="flex items-center gap-2 ml-4 border-l border-gray-300 dark:border-gray-600 pl-4">
                <motion.button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2.5 glass-effect rounded-xl hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Search className="w-4 h-4" />
                </motion.button>
                
                <motion.button
                  onClick={toggleTheme}
                  className="p-2.5 glass-effect rounded-xl hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.05, rotate: 10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isDark ? (
                    <Moon className="w-4 h-4 text-primary-400" />
                  ) : (
                    <Sun className="w-4 h-4 text-primary-600" />
                  )}
                </motion.button>

                {onLoginClick && (
                  <motion.button
                    onClick={onLoginClick}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-purple-600 text-white font-semibold hover:shadow-lg transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Вход
                  </motion.button>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              <motion.button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 glass-effect rounded-xl"
                whileTap={{ scale: 0.95 }}
              >
                <Search className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                onClick={toggleTheme}
                className="p-2 glass-effect rounded-xl"
                whileTap={{ scale: 0.95 }}
              >
                {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </motion.button>

              {onLoginClick && (
                <motion.button
                  onClick={onLoginClick}
                  className="px-3 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-purple-600 text-white font-semibold text-sm"
                  whileTap={{ scale: 0.95 }}
                >
                  Вход
                </motion.button>
              )}
              
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-xl glass-effect"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="px-6 pb-6 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-xl font-medium transition-colors ${
                      activeSection === link.href.substring(1)
                        ? 'bg-gradient-to-r from-primary-500 to-purple-600 text-white'
                        : 'glass-effect text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
              onClick={() => setIsSearchOpen(false)}
            />
            
            <motion.div
              ref={searchRef}
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-[70]"
            >
              <div className="glass-effect rounded-3xl shadow-2xl overflow-hidden mx-4">
                <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
                  <Search className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Поиск по сайту..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-lg"
                    autoFocus
                  />
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="max-h-96 overflow-y-auto p-2">
                  {searchResults.length > 0 ? (
                    <div className="space-y-1">
                      {searchResults.map((result, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearchResult(result.href)}
                          className="w-full text-left p-3 rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                                {result.section}
                              </span>
                              <h4 className="font-semibold mt-1">{result.title}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {result.description}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      <p>Ничего не найдено</p>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <kbd className="px-2 py-0.5 bg-white/20 dark:bg-gray-800/50 rounded">⌘K</kbd>
                    для поиска
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-2 py-0.5 bg-white/20 dark:bg-gray-800/50 rounded">Esc</kbd>
                    закрыть
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
