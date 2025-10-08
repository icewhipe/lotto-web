import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from '../hooks/useInView'
import { FileText, Send, ClipboardCheck, UserCheck, Phone, Mail, Clock } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: FileText,
    title: 'Подготовка документов',
    description: 'Соберите необходимые документы: паспорт, аттестат, медицинская справка, фотографии 3x4',
  },
  {
    number: '02',
    icon: Send,
    title: 'Подача заявления',
    description: 'Подайте заявление лично в приемной комиссии или через портал госуслуг',
  },
  {
    number: '03',
    icon: ClipboardCheck,
    title: 'Вступительные испытания',
    description: 'Пройдите вступительные испытания (при необходимости) и ожидайте результатов',
  },
  {
    number: '04',
    icon: UserCheck,
    title: 'Зачисление',
    description: 'Получите приказ о зачислении и приступайте к обучению!',
  },
]

const contactInfo = [
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
    icon: Clock,
    label: 'Режим работы',
    value: 'Пн-Пт: 9:00 - 17:00',
  },
]

export default function Admissions() {
  const ref = useRef(null)
  const isInView = useInView(ref, { threshold: 0.05 })

  return (
    <section id="admissions" className="section-padding" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 glass-effect rounded-full text-sm font-semibold">
            Приемная комиссия
          </span>
          <h2 className="text-4xl md:text-5xl font-black">
            Как <span className="gradient-text">поступить</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Простой процесс поступления в наш техникум
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="glass-effect rounded-3xl p-6 text-center group cursor-pointer"
            >
              <motion.div
                className="text-6xl font-black gradient-text mb-4"
                whileHover={{ scale: 1.2 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                {step.number}
              </motion.div>

              <motion.div
                className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center shadow-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <step.icon className="w-7 h-7 text-white" />
              </motion.div>

              <h3 className="text-lg font-bold mb-3 group-hover:gradient-text transition-all">
                {step.title}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="glass-effect rounded-3xl p-8 md:p-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Контакты приемной комиссии
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <info.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    {info.label}
                  </div>
                  <div className="font-semibold text-lg">
                    {info.value}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
