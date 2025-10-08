import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, ArrowRight } from 'lucide-react'

interface SearchResult {
  title: string
  description: string
  section: string
  href: string
}

const searchData: SearchResult[] = [
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

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (query.trim()) {
      const filtered = searchData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.section.toLowerCase().includes(query.toLowerCase())
      )
      setResults(filtered)
    } else {
      setResults(searchData.slice(0, 5))
    }
  }, [query])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const handleResultClick = (href: string) => {
    setIsOpen(false)
    setQuery('')
    window.location.href = href
  }

  return (
    <>
      {/* Search Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed top-5 right-20 z-50 px-4 py-2 glass-effect rounded-full flex items-center gap-2 text-sm font-medium hover:shadow-lg transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Search className="w-4 h-4" />
        <span className="hidden md:inline">Поиск</span>
        <kbd className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-white/20 dark:bg-gray-800/50 rounded">
          <span>⌘</span>K
        </kbd>
      </motion.button>

      {/* Search Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
              onClick={() => setIsOpen(false)}
            />

            {/* Search Panel */}
            <motion.div
              ref={searchRef}
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-[70]"
            >
              <div className="glass-effect rounded-3xl shadow-2xl overflow-hidden mx-4">
                {/* Search Input */}
                <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
                  <Search className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Поиск по сайту..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-lg"
                    autoFocus
                  />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Results */}
                <div className="max-h-96 overflow-y-auto p-2">
                  {results.length > 0 ? (
                    <div className="space-y-1">
                      {results.map((result, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => handleResultClick(result.href)}
                          className="w-full text-left p-3 rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors group"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                                  {result.section}
                                </span>
                              </div>
                              <h4 className="font-semibold group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                {result.title}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {result.description}
                              </p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors flex-shrink-0 mt-1" />
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      <p>Ничего не найдено</p>
                      <p className="text-sm mt-1">Попробуйте изменить запрос</p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <kbd className="px-2 py-0.5 bg-white/20 dark:bg-gray-800/50 rounded">↑</kbd>
                      <kbd className="px-2 py-0.5 bg-white/20 dark:bg-gray-800/50 rounded">↓</kbd>
                      для навигации
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-2 py-0.5 bg-white/20 dark:bg-gray-800/50 rounded">Enter</kbd>
                      выбрать
                    </span>
                  </div>
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
