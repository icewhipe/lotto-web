import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

interface ContactsSectionProps {
  isDark: boolean
}

export default function ContactsSection({ isDark }: ContactsSectionProps) {
  return (
    <div className="container mx-auto px-6 py-20">
      <h1 className={`text-4xl font-black mb-12 ${isDark ? 'text-white' : 'text-slate-900'}`}>Контакты</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className={`p-8 rounded-2xl ${isDark ? 'bg-slate-800/50 border border-blue-500/20' : 'bg-white border border-blue-100'} shadow-xl`}>
          <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>Свяжитесь с нами</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className={`p-3 rounded-xl ${isDark ? 'bg-blue-500/20' : 'bg-blue-50'}`}>
                <Phone className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <div>
                <p className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>Телефон</p>
                <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>+7 (XXX) XXX-XX-XX</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className={`p-3 rounded-xl ${isDark ? 'bg-blue-500/20' : 'bg-blue-50'}`}>
                <Mail className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <div>
                <p className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>Email</p>
                <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>info@lptt.ru</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className={`p-3 rounded-xl ${isDark ? 'bg-blue-500/20' : 'bg-blue-50'}`}>
                <MapPin className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <div>
                <p className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>Адрес</p>
                <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Ленинградская область</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className={`p-3 rounded-xl ${isDark ? 'bg-blue-500/20' : 'bg-blue-50'}`}>
                <Clock className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <div>
                <p className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>Режим работы</p>
                <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Пн-Пт: 8:00-17:00</p>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className={`aspect-square md:aspect-auto rounded-2xl ${isDark ? 'bg-slate-800/50 border border-blue-500/20' : 'bg-slate-100 border border-blue-100'} flex items-center justify-center`}>
          <MapPin className={`w-20 h-20 ${isDark ? 'text-slate-600' : 'text-slate-400'}`} />
        </motion.div>
      </div>
    </div>
  )
}
