import { motion, AnimatePresence } from 'framer-motion'
import { X, Clock, Users, Award, Briefcase, CheckCircle, BookOpen } from 'lucide-react'
import { LucideIcon } from 'lucide-react'

interface Program {
  icon: LucideIcon
  title: string
  description: string
  duration: string
  form: string
  feature: string
  badge?: string
  gradient: string
}

interface ProgramModalProps {
  program: Program | null
  onClose: () => void
}

export default function ProgramModal({ program, onClose }: ProgramModalProps) {
  if (!program) return null

  const Icon = program.icon

  const details = {
    subjects: [
      'Математика',
      'Физика',
      'Информатика',
      'Инженерная графика',
      'Материаловедение',
      'Электротехника',
      'Специальные дисциплины',
      'Охрана труда'
    ],
    skills: [
      'Техническое обслуживание оборудования',
      'Диагностика неисправностей',
      'Ремонтные работы',
      'Работа с технической документацией',
      'Соблюдение техники безопасности',
      'Командная работа'
    ],
    career: [
      'Техник',
      'Мастер участка',
      'Инженер',
      'Начальник смены',
      'Руководитель подразделения'
    ]
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-5xl max-h-[90vh] overflow-y-auto glass-effect rounded-3xl shadow-2xl"
        >
          {/* Header */}
          <div className={`relative bg-gradient-to-br ${program.gradient} p-8 text-white`}>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-start gap-6">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="p-6 bg-white/20 backdrop-blur-sm rounded-3xl"
              >
                <Icon className="w-16 h-16" />
              </motion.div>

              <div className="flex-1">
                {program.badge && (
                  <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-semibold mb-3">
                    {program.badge}
                  </span>
                )}
                <h2 className="text-3xl font-black mb-3">{program.title}</h2>
                <p className="text-white/90 text-lg mb-4">{program.description}</p>

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-semibold">{program.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
                    <Users className="w-4 h-4" />
                    <span className="text-sm font-semibold">{program.form}</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
                    <Award className="w-4 h-4" />
                    <span className="text-sm font-semibold">{program.feature}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">
            {/* Subjects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-xl">
                  <BookOpen className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-2xl font-bold">Изучаемые дисциплины</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {details.subjects.map((subject, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span>{subject}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                  <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold">Получаемые навыки</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {details.skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" />
                    <span>{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Career */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-xl">
                  <Briefcase className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-bold">Карьерные перспективы</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {details.career.map((position, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className={`px-4 py-2 rounded-full bg-gradient-to-r ${program.gradient} text-white font-semibold`}
                  >
                    {position}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex gap-4 pt-4"
            >
              <a
                href="#admissions"
                onClick={onClose}
                className="flex-1 btn-primary justify-center"
              >
                Поступить на эту специальность
              </a>
              <button
                onClick={onClose}
                className="px-6 py-3 glass-effect rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Закрыть
              </button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
