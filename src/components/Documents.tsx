import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from '../hooks/useInView'
import { FileText, Download, Shield, BookOpen, Scale, Award } from 'lucide-react'

const documentCategories = [
  {
    title: 'Документы о лицензировании',
    icon: Shield,
    gradient: 'from-primary-500 to-purple-600',
    documents: [
      { name: 'Лицензия на образовательную деятельность', size: '2.5 MB' },
      { name: 'Приложение к лицензии', size: '1.8 MB' },
      { name: 'Свидетельство о государственной аккредитации', size: '1.2 MB' },
    ],
  },
  {
    title: 'Устав и локальные акты',
    icon: Scale,
    gradient: 'from-secondary-500 to-pink-600',
    documents: [
      { name: 'Устав техникума', size: '3.2 MB' },
      { name: 'Правила внутреннего распорядка', size: '1.5 MB' },
      { name: 'Положение о приемной комиссии', size: '800 KB' },
      { name: 'Правила приема обучающихся', size: '1.1 MB' },
    ],
  },
  {
    title: 'Образовательные программы',
    icon: BookOpen,
    gradient: 'from-cyan-500 to-blue-600',
    documents: [
      { name: 'Программа подготовки специалистов среднего звена', size: '5.2 MB' },
      { name: 'Учебный план 2024-2025', size: '2.1 MB' },
      { name: 'Календарный учебный график', size: '950 KB' },
      { name: 'Рабочие программы дисциплин', size: '8.5 MB' },
    ],
  },
  {
    title: 'Противодействие коррупции',
    icon: Shield,
    gradient: 'from-green-500 to-emerald-600',
    documents: [
      { name: 'Антикоррупционная политика', size: '1.3 MB' },
      { name: 'План мероприятий по противодействию коррупции', size: '850 KB' },
      { name: 'Положение о комиссии по противодействию коррупции', size: '700 KB' },
      { name: 'Порядок уведомления о фактах коррупции', size: '600 KB' },
    ],
  },
  {
    title: 'Финансово-хозяйственная деятельность',
    icon: FileText,
    gradient: 'from-yellow-500 to-orange-600',
    documents: [
      { name: 'План финансово-хозяйственной деятельности', size: '2.8 MB' },
      { name: 'Отчет о результатах деятельности', size: '3.5 MB' },
      { name: 'Информация о закупках', size: '1.6 MB' },
    ],
  },
  {
    title: 'Отчеты и результаты проверок',
    icon: Award,
    gradient: 'from-indigo-500 to-purple-600',
    documents: [
      { name: 'Результаты самообследования', size: '4.2 MB' },
      { name: 'Отчет о работе за учебный год', size: '3.1 MB' },
      { name: 'Предписания контролирующих органов', size: '1.4 MB' },
    ],
  },
]

const quickLinks = [
  { name: 'Поступающим', icon: FileText, href: '#admissions' },
  { name: 'Правила приема', icon: BookOpen, href: '#' },
  { name: 'Контакты', icon: Shield, href: '#contacts' },
  { name: 'FAQ', icon: Award, href: '#' },
]

export default function Documents() {
  const ref = useRef(null)
  const isInView = useInView(ref, { threshold: 0.05 })

  return (
    <section id="documents" className="section-padding bg-gray-50 dark:bg-gray-900/50" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 glass-effect rounded-full text-sm font-semibold">
            Документы
          </span>
          <h2 className="text-4xl md:text-5xl font-black">
            Нормативные <span className="gradient-text">документы</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Все необходимые документы и нормативные акты техникума в открытом доступе
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {quickLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="glass-effect rounded-2xl p-4 text-center group"
            >
              <link.icon className="w-8 h-8 mx-auto mb-2 text-primary-600 dark:text-primary-400" />
              <span className="text-sm font-semibold">{link.name}</span>
            </motion.a>
          ))}
        </motion.div>

        {/* Document Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documentCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="glass-effect rounded-3xl p-8 group"
            >
              {/* Icon */}
              <motion.div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-6 shadow-lg`}
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <category.icon className="w-8 h-8 text-white" />
              </motion.div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-6 group-hover:gradient-text transition-all">
                {category.title}
              </h3>

              {/* Documents List */}
              <div className="space-y-3">
                {category.documents.map((doc, docIndex) => (
                  <motion.button
                    key={docIndex}
                    whileHover={{ x: 5 }}
                    className="w-full flex items-start gap-3 p-3 rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors text-left group/item"
                  >
                    <Download className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary-500 group-hover/item:text-primary-600" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover/item:text-primary-600 dark:group-hover/item:text-primary-400 transition-colors">
                        {doc.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {doc.size}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-16 glass-effect rounded-3xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Нужна помощь с документами?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Если у вас возникли вопросы или вам нужна консультация по документам, 
                наши специалисты всегда готовы помочь
              </p>
              <a href="#contacts" className="btn-primary inline-flex">
                <span>Связаться с нами</span>
                <FileText className="w-5 h-5" />
              </a>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold mb-1">Открытость и прозрачность</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Все документы находятся в открытом доступе согласно требованиям законодательства
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Download className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold mb-1">Свободное скачивание</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Вы можете бесплатно скачать любой документ в формате PDF
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold mb-1">Актуальная информация</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Документы регулярно обновляются в соответствии с изменениями законодательства
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
