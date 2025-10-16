import { motion } from 'framer-motion'
import { GraduationCap, Clock, Users } from 'lucide-react'

interface SpecialtiesSectionProps {
  isDark: boolean
}

export default function SpecialtiesSection({ isDark }: SpecialtiesSectionProps) {
  const specialties = [
    { id: 1, code: 'ИС', name: 'Информационные системы и программирование', duration: '3 года 10 месяцев', places: 25 },
    { id: 2, code: 'АТ', name: 'Автоматизация технологических процессов', duration: '3 года 10 месяцев', places: 25 },
  ]

  return (
    <div className="container mx-auto px-6 py-20">
      <h1 className={`text-4xl font-black mb-12 ${isDark ? 'text-white' : 'text-slate-900'}`}>Специальности</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {specialties.map((spec, index) => (
          <motion.div
            key={spec.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className={`p-8 rounded-2xl ${isDark ? 'bg-slate-800/50 border border-blue-500/20' : 'bg-white border border-blue-100'} shadow-xl`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <span className={`px-3 py-1 rounded-lg text-sm font-bold mb-3 inline-block ${isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-50 text-blue-600'}`}>{spec.code}</span>
                <h3 className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{spec.name}</h3>
              </div>
              <GraduationCap className={`w-10 h-10 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <div className={`flex gap-4 mt-4 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              <span className="flex items-center gap-2"><Clock className="w-4 h-4" />{spec.duration}</span>
              <span className="flex items-center gap-2"><Users className="w-4 h-4" />{spec.places} мест</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
