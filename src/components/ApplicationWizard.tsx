import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, 
  Mail, 
  FileText, 
  Upload, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  X,
  GraduationCap,
  FileCheck
} from 'lucide-react'

interface ApplicationWizardProps {
  isOpen: boolean
  onClose: () => void
}

const steps = [
  { id: 1, title: 'Личные данные', icon: User },
  { id: 2, title: 'Контакты', icon: Mail },
  { id: 3, title: 'Образование', icon: GraduationCap },
  { id: 4, title: 'Документы', icon: FileText },
  { id: 5, title: 'Подтверждение', icon: CheckCircle },
]

export default function ApplicationWizard({ isOpen, onClose }: ApplicationWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    birthDate: '',
    email: '',
    phone: '',
    address: '',
    education: '',
    schoolNumber: '',
    graduationYear: '',
    program: '',
    documents: [] as string[],
  })

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Здесь будет отправка данных
    alert('Заявление успешно подано! Ожидайте звонка от приемной комиссии.')
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
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
            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-effect rounded-3xl shadow-2xl"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-primary-500 to-purple-600 p-8 text-white">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-3xl font-black mb-2">Подача документов онлайн</h2>
              <p className="text-white/90">Заполните форму и станьте студентом ЛПТТ</p>
            </div>

            {/* Progress Steps */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                  const Icon = step.icon
                  const isActive = currentStep === step.id
                  const isCompleted = currentStep > step.id

                  return (
                    <div key={step.id} className="flex items-center flex-1">
                      <div className="flex flex-col items-center flex-1">
                        <motion.div
                          animate={{
                            scale: isActive ? 1.1 : 1,
                            backgroundColor: isCompleted ? '#10b981' : isActive ? '#667eea' : '#e5e7eb'
                          }}
                          className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                            isCompleted ? 'text-white' : isActive ? 'text-white' : 'text-gray-400'
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle className="w-6 h-6" />
                          ) : (
                            <Icon className="w-6 h-6" />
                          )}
                        </motion.div>
                        <span className={`text-xs font-semibold text-center ${
                          isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500'
                        }`}>
                          {step.title}
                        </span>
                      </div>
                      
                      {index < steps.length - 1 && (
                        <div className={`h-1 flex-1 mx-2 rounded-full ${
                          isCompleted ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
                        }`} />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Form Content */}
            <div className="p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold mb-6">Личные данные</h3>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Фамилия *</label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl glass-effect outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="Иванов"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Имя *</label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl glass-effect outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="Иван"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Отчество</label>
                        <input
                          type="text"
                          value={formData.middleName}
                          onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl glass-effect outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="Иванович"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Дата рождения *</label>
                        <input
                          type="date"
                          value={formData.birthDate}
                          onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl glass-effect outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold mb-6">Контактные данные</h3>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Email *</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl glass-effect outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="example@mail.ru"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Телефон *</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl glass-effect outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="+7 (900) 123-45-67"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Адрес проживания *</label>
                        <textarea
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          rows={3}
                          className="w-full px-4 py-3 rounded-xl glass-effect outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="Область, город, улица, дом, квартира"
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold mb-6">Образование</h3>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Уровень образования *</label>
                        <select
                          value={formData.education}
                          onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl glass-effect outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="">Выберите...</option>
                          <option value="9-класс">9 классов</option>
                          <option value="11-класс">11 классов</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Номер школы *</label>
                        <input
                          type="text"
                          value={formData.schoolNumber}
                          onChange={(e) => setFormData({ ...formData, schoolNumber: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl glass-effect outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="МБОУ СОШ №1"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Год окончания *</label>
                        <input
                          type="number"
                          value={formData.graduationYear}
                          onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl glass-effect outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="2025"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Выбранная специальность *</label>
                        <select
                          value={formData.program}
                          onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl glass-effect outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="">Выберите специальность...</option>
                          <option value="railway">Эксплуатация железнодорожного транспорта</option>
                          <option value="auto">Техническое обслуживание автомобилей</option>
                          <option value="it">Информационные системы и программирование</option>
                          <option value="electric">Электроснабжение</option>
                          <option value="construction">Строительство железных дорог</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold mb-6">Загрузите документы</h3>
                      
                      {[
                        { id: 'passport', title: 'Паспорт (копия)', required: true },
                        { id: 'certificate', title: 'Аттестат', required: true },
                        { id: 'photos', title: '6 фотографий 3x4', required: true },
                        { id: 'medical', title: 'Медицинская справка 086/у', required: true },
                        { id: 'snils', title: 'СНИЛС (копия)', required: false },
                      ].map((doc, index) => (
                        <motion.div
                          key={doc.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 rounded-xl glass-effect"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <FileText className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                              <div>
                                <h4 className="font-semibold">{doc.title}</h4>
                                {doc.required && (
                                  <span className="text-xs text-red-500">* Обязательно</span>
                                )}
                              </div>
                            </div>
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          </div>
                          <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all">
                            <Upload className="w-5 h-5" />
                            <span className="font-semibold">Загрузить файл</span>
                            <input type="file" className="hidden" />
                          </label>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {currentStep === 5 && (
                    <div className="space-y-6">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                        className="text-center"
                      >
                        <div className="w-24 h-24 mx-auto mb-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                          <FileCheck className="w-12 h-12 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="text-3xl font-black mb-3">Проверьте данные</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                          Убедитесь, что все данные заполнены корректно
                        </p>
                      </motion.div>

                      <div className="space-y-4">
                        <div className="p-4 rounded-xl glass-effect">
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <User className="w-5 h-5" />
                            Личные данные
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {formData.lastName} {formData.firstName} {formData.middleName}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Дата рождения: {formData.birthDate || 'Не указана'}
                          </p>
                        </div>

                        <div className="p-4 rounded-xl glass-effect">
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Mail className="w-5 h-5" />
                            Контакты
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Email: {formData.email || 'Не указан'}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Телефон: {formData.phone || 'Не указан'}
                          </p>
                        </div>

                        <div className="p-4 rounded-xl glass-effect">
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <GraduationCap className="w-5 h-5" />
                            Специальность
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {formData.program || 'Не выбрана'}
                          </p>
                        </div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 rounded-2xl bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800"
                      >
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                              Готово к отправке!
                            </h4>
                            <p className="text-sm text-green-700 dark:text-green-300">
                              После отправки с вами свяжется приемная комиссия в течение 1-2 рабочих дней.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <button
                onClick={handlePrev}
                disabled={currentStep === 1}
                className="flex items-center gap-2 px-6 py-3 rounded-xl glass-effect disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-semibold">Назад</span>
              </button>

              {currentStep < steps.length ? (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-purple-600 text-white font-semibold hover:shadow-lg transition-all"
                >
                  <span>Далее</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold hover:shadow-lg transition-all"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Подать заявление</span>
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
