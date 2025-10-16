import { motion } from 'framer-motion'
import { Calendar, User } from 'lucide-react'

interface NewsSectionProps {
  isDark: boolean
}

export default function NewsSection({ isDark }: NewsSectionProps) {
  const news = [
    { id: 1, title: 'Новость 1', date: '2025-01-15', author: 'Администрация', content: 'Содержание новости...' },
    { id: 2, title: 'Новость 2', date: '2025-01-14', author: 'Администрация', content: 'Содержание новости...' },
    { id: 3, title: 'Новость 3', date: '2025-01-13', author: 'Администрация', content: 'Содержание новости...' },
  ]

  return (
    <div className="container mx-auto px-6 py-20">
      <h1 className={`text-4xl font-black mb-12 ${isDark ? 'text-white' : 'text-slate-900'}`}>Новости</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className={`p-6 rounded-2xl ${isDark ? 'bg-slate-800/50 border border-blue-500/20' : 'bg-white border border-blue-100'} shadow-xl`}
          >
            <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</h3>
            <div className={`flex items-center gap-4 mb-3 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{item.date}</span>
              <span className="flex items-center gap-1"><User className="w-4 h-4" />{item.author}</span>
            </div>
            <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>{item.content}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
