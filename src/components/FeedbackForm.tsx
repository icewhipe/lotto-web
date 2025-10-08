import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { useInView } from '../hooks/useInView'
import { Send, Mail, User, MessageSquare, CheckCircle } from 'lucide-react'

export default function FeedbackForm() {
  const ref = useRef(null)
  const isInView = useInView(ref, { threshold: 0.1 })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Здесь будет логика отправки формы
    console.log('Form submitted:', formData)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', phone: '', message: '' })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="feedback" className="section-padding bg-gray-50 dark:bg-gray-900/50" ref={ref}>
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 glass-effect rounded-full text-sm font-semibold mb-6">
              Обратная связь
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Свяжитесь <span className="gradient-text">с нами</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Остались вопросы? Заполните форму, и мы свяжемся с вами в ближайшее время!
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Быстрый ответ</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Отвечаем в течение 24 часов в рабочие дни
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Персональный подход</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Индивидуальная консультация по всем вопросам
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Любые вопросы</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Поступление, обучение, общежитие, документы
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-effect rounded-3xl p-8 md:p-12">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold mb-2">
                      Ваше имя *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                      placeholder="Иван Иванов"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                      placeholder="example@mail.ru"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                      placeholder="+7 (999) 123-45-67"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold mb-2">
                      Сообщение *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-primary-500 transition-all resize-none"
                      placeholder="Ваш вопрос..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full btn-primary justify-center text-lg py-4"
                  >
                    <span>Отправить сообщение</span>
                    <Send className="w-5 h-5" />
                  </motion.button>

                  <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                    Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
                  </p>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    <CheckCircle className="w-20 h-20 mx-auto mb-6 text-green-500" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-3">Спасибо за обращение!</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Мы получили ваше сообщение и свяжемся с вами в ближайшее время
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
