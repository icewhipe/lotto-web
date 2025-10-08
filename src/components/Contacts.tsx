import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from '../hooks/useInView'
import { MapPin, Phone, Mail, Globe, Facebook, Instagram, Youtube } from 'lucide-react'

const contactDetails = [
  {
    icon: MapPin,
    label: 'Адрес',
    value: 'Воронежская область, г. Лиски, ул. Титова, д. 10',
  },
  {
    icon: Phone,
    label: 'Телефон',
    value: '+7 (47391) 4-71-49',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'lptt@mail.ru',
  },
  {
    icon: Globe,
    label: 'Официальный сайт',
    value: 'lptt.obrvrn.ru',
  },
]

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
]

export default function Contacts() {
  const ref = useRef(null)
  const isInView = useInView(ref, { threshold: 0.1 })

  return (
    <section id="contacts" className="section-padding bg-gray-50 dark:bg-gray-900/50" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 glass-effect rounded-full text-sm font-semibold">
            Контакты
          </span>
          <h2 className="text-4xl md:text-5xl font-black">
            Как нас <span className="gradient-text">найти</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Мы всегда рады ответить на ваши вопросы
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="glass-effect rounded-3xl p-8 md:p-12 space-y-8"
          >
            <h3 className="text-2xl font-bold mb-8">Контактная информация</h3>

            <div className="space-y-6">
              {contactDetails.map((detail, index) => (
                <motion.div
                  key={detail.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <detail.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      {detail.label}
                    </div>
                    <div className="font-semibold text-lg">
                      {detail.value}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold mb-4">Мы в социальных сетях</h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + index * 0.1, type: 'spring' }}
                    whileHover={{ y: -4, scale: 1.1 }}
                    className="w-12 h-12 rounded-xl glass-effect flex items-center justify-center group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="glass-effect rounded-3xl overflow-hidden min-h-[400px] lg:min-h-full"
          >
            <div className="w-full h-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center p-12 text-white text-center">
              <div className="space-y-4">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-8xl"
                >
                  🗺️
                </motion.div>
                <h3 className="text-2xl font-bold">Карта местоположения</h3>
                <p className="text-white/90">г. Лиски, ул. Титова, д. 10</p>
                <p className="text-sm text-white/70">
                  Воронежская область, Россия
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
