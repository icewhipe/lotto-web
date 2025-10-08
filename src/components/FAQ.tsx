import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { useInView } from '../hooks/useInView'
import { Plus, Minus, HelpCircle } from 'lucide-react'

const faqs = [
  {
    category: 'Поступление',
    questions: [
      {
        q: 'Какие документы нужны для поступления?',
        a: 'Для поступления необходимы: паспорт, аттестат об основном общем образовании, 6 фотографий 3x4, медицинская справка формы 086/у, СНИЛС.',
      },
      {
        q: 'Есть ли вступительные экзамены?',
        a: 'Прием осуществляется на базе конкурса аттестатов без вступительных испытаний. Зачисление происходит по среднему баллу аттестата.',
      },
      {
        q: 'Когда начинается прием документов?',
        a: 'Прием документов начинается с 20 июня и продолжается до 15 августа. Рекомендуем подавать документы как можно раньше.',
      },
      {
        q: 'Можно ли подать документы онлайн?',
        a: 'Да, вы можете подать документы через портал Госуслуги или принести лично в приемную комиссию техникума.',
      },
    ],
  },
  {
    category: 'Обучение',
    questions: [
      {
        q: 'Какова продолжительность обучения?',
        a: 'Срок обучения на базе 9 классов составляет 3 года 10 месяцев. На базе 11 классов - 2 года 10 месяцев.',
      },
      {
        q: 'Есть ли общежитие?',
        a: 'Да, техникум предоставляет общежитие для иногородних студентов. Размещение в комнатах по 2-3 человека. Все удобства в комнатах.',
      },
      {
        q: 'Предоставляется ли стипендия?',
        a: 'Да, студенты бюджетной формы обучения получают стипендию. Размер зависит от успеваемости. Также есть социальная стипендия для льготных категорий.',
      },
      {
        q: 'Есть ли практика?',
        a: 'Практика является обязательной частью обучения. Студенты проходят практику на предприятиях-партнерах техникума, включая РЖД и другие крупные компании.',
      },
    ],
  },
  {
    category: 'Студенческая жизнь',
    questions: [
      {
        q: 'Какие есть кружки и секции?',
        a: 'В техникуме работают спортивные секции (волейбол, футбол, баскетбол), творческие студии, научные кружки, студенческий совет.',
      },
      {
        q: 'Проводятся ли мероприятия?',
        a: 'Да, регулярно проводятся культурно-массовые мероприятия, спортивные соревнования, конкурсы, фестивали, экскурсии.',
      },
      {
        q: 'Есть ли столовая?',
        a: 'Да, в техникуме работает современная столовая с разнообразным меню. Для льготных категорий предусмотрено бесплатное питание.',
      },
    ],
  },
  {
    category: 'После выпуска',
    questions: [
      {
        q: 'Помогаете ли с трудоустройством?',
        a: 'Да, мы активно помогаем выпускникам с трудоустройством. Проводим ярмарки вакансий, сотрудничаем с работодателями. 98% выпускников трудоустраиваются в первые 3 месяца.',
      },
      {
        q: 'Можно ли продолжить обучение в вузе?',
        a: 'Да, выпускники могут поступить в вузы по сокращенной программе. У нас есть договоры с ведущими техническими университетами.',
      },
      {
        q: 'Какой диплом получают выпускники?',
        a: 'Выпускники получают диплом государственного образца о среднем профессиональном образовании с квалификацией "Техник".',
      },
    ],
  },
]

export default function FAQ() {
  const ref = useRef(null)
  const isInView = useInView(ref, { threshold: 0.05 })
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({})

  const toggleItem = (key: string) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <section id="faq" className="section-padding bg-gray-50 dark:bg-gray-900/50" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 glass-effect rounded-full text-sm font-semibold">
            Вопросы и ответы
          </span>
          <h2 className="text-4xl md:text-5xl font-black">
            Часто задаваемые <span className="gradient-text">вопросы</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Ответы на самые популярные вопросы о поступлении и обучении в ЛПТТ
          </p>
        </motion.div>

        {/* FAQ Categories */}
        <div className="grid lg:grid-cols-2 gap-8">
          {faqs.map((category, catIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: catIndex * 0.1 }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center">
                  <HelpCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">{category.category}</h3>
              </div>

              {/* Questions */}
              <div className="space-y-3">
                {category.questions.map((item, qIndex) => {
                  const key = `${catIndex}-${qIndex}`
                  const isOpen = openItems[key]

                  return (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: catIndex * 0.1 + qIndex * 0.05 }}
                      className="glass-effect rounded-2xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggleItem(key)}
                        className="w-full flex items-start justify-between gap-4 p-5 text-left hover:bg-white/30 dark:hover:bg-gray-800/30 transition-colors"
                      >
                        <span className="font-semibold pr-4">{item.q}</span>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex-shrink-0"
                        >
                          {isOpen ? (
                            <Minus className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                          ) : (
                            <Plus className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                          )}
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 text-gray-600 dark:text-gray-400 leading-relaxed">
                              {item.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 glass-effect rounded-3xl p-12 text-center"
        >
          <HelpCircle className="w-16 h-16 mx-auto mb-4 text-primary-600 dark:text-primary-400" />
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Не нашли ответ на свой вопрос?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Свяжитесь с нами, и мы с радостью ответим на все ваши вопросы
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#contacts" className="btn-primary">
              Связаться с нами
            </a>
            <a href="tel:+74739147149" className="btn-secondary">
              Позвонить: +7 (47391) 4-71-49
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
