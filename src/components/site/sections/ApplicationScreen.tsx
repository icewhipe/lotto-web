import { motion } from 'framer-motion'
import { FileText, Send } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface ApplicationScreenProps {
  isDark: boolean
}

export default function ApplicationScreen({ isDark }: ApplicationScreenProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    specialty: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Заявление успешно отправлено!')
    setFormData({ fullName: '', email: '', phone: '', specialty: '' })
  }

  return (
    <div className="container mx-auto px-6 py-20">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center ${isDark ? 'bg-blue-500/20' : 'bg-blue-50'}`}>
            <FileText className={`w-10 h-10 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
          </div>
          <h1 className={`text-4xl font-black mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Подать заявление</h1>
          <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Заполните форму для подачи документов</p>
        </motion.div>
        <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} onSubmit={handleSubmit} className={`p-8 rounded-2xl ${isDark ? 'bg-slate-800/50 border border-blue-500/20' : 'bg-white border border-blue-100'} shadow-xl space-y-6`}>
          <div>
            <label className={`block mb-2 font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>ФИО</label>
            <input required type="text" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className={`w-full px-4 py-3 rounded-xl ${isDark ? 'bg-slate-900 border-blue-500/20 text-white' : 'bg-slate-50 border-blue-100 text-slate-900'} border focus:ring-2 focus:ring-blue-500`} />
          </div>
          <div>
            <label className={`block mb-2 font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Email</label>
            <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className={`w-full px-4 py-3 rounded-xl ${isDark ? 'bg-slate-900 border-blue-500/20 text-white' : 'bg-slate-50 border-blue-100 text-slate-900'} border focus:ring-2 focus:ring-blue-500`} />
          </div>
          <div>
            <label className={`block mb-2 font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Телефон</label>
            <input required type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className={`w-full px-4 py-3 rounded-xl ${isDark ? 'bg-slate-900 border-blue-500/20 text-white' : 'bg-slate-50 border-blue-100 text-slate-900'} border focus:ring-2 focus:ring-blue-500`} />
          </div>
          <div>
            <label className={`block mb-2 font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Специальность</label>
            <select required value={formData.specialty} onChange={(e) => setFormData({...formData, specialty: e.target.value})} className={`w-full px-4 py-3 rounded-xl ${isDark ? 'bg-slate-900 border-blue-500/20 text-white' : 'bg-slate-50 border-blue-100 text-slate-900'} border focus:ring-2 focus:ring-blue-500`}>
              <option value="">Выберите специальность</option>
              <option value="IS">Информационные системы</option>
              <option value="AT">Автоматизация</option>
            </select>
          </div>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit" className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold flex items-center justify-center gap-2">
            <Send className="w-5 h-5" />
            Отправить заявление
          </motion.button>
        </motion.form>
      </div>
    </div>
  )
}
