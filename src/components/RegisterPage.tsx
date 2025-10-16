import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  UserPlus, Mail, Lock, Phone, User, ArrowLeft, CheckCircle, 
  Key, GraduationCap, BookOpen, Users, Shield, Eye, EyeOff, AlertCircle
} from 'lucide-react'
import toast from 'react-hot-toast'

interface RegisterPageProps {
  onBack?: () => void
}

type UserRole = 'applicant' | 'student' | 'teacher' | 'parent'
type Step = 'role' | 'invite' | 'form' | 'success'

const ROLES = [
  { 
    id: 'applicant' as UserRole, 
    label: 'Абитуриент', 
    icon: GraduationCap, 
    color: 'from-green-500 to-emerald-600',
    description: 'Поступление в техникум',
    needsCode: false
  },
  { 
    id: 'student' as UserRole, 
    label: 'Студент', 
    icon: BookOpen, 
    color: 'from-violet-500 to-purple-600',
    description: 'Учусь в техникуме',
    needsCode: true
  },
  { 
    id: 'parent' as UserRole, 
    label: 'Родитель', 
    icon: Users, 
    color: 'from-pink-500 to-rose-600',
    description: 'Родитель студента',
    needsCode: true
  },
  { 
    id: 'teacher' as UserRole, 
    label: 'Преподаватель', 
    icon: Shield, 
    color: 'from-blue-500 to-cyan-600',
    description: 'Работаю в техникуме',
    needsCode: true
  },
]

export default function RegisterPage({ onBack }: RegisterPageProps) {
  const [step, setStep] = useState<Step>('role')
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  
  // Form fields
  const [inviteCode, setInviteCode] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phone, setPhone] = useState('')
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role)
    const roleConfig = ROLES.find(r => r.id === role)
    
    if (roleConfig?.needsCode) {
      setStep('invite')
    } else {
      setStep('form')
    }
  }

  const handleCheckInvite = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Симуляция проверки кода
    setTimeout(() => {
      if (inviteCode.length >= 6) {
        toast.success('Код подтверждён! ✅')
        setStep('form')
      } else {
        setError('Неверный код приглашения')
        toast.error('Неверный код')
      }
      setLoading(false)
    }, 1000)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Валидация
    if (password !== confirmPassword) {
      setError('Пароли не совпадают')
      toast.error('Пароли не совпадают')
      return
    }

    if (password.length < 6) {
      setError('Пароль должен быть минимум 6 символов')
      toast.error('Пароль слишком короткий')
      return
    }

    setLoading(true)

    // Симуляция регистрации
    setTimeout(() => {
      // Сохраняем в localStorage (временно)
      const credentials = JSON.parse(localStorage.getItem('user_credentials') || '{}')
      credentials[email] = {
        password: password,
        user: {
          id: Date.now().toString(),
          email: email,
          name: name,
          role: selectedRole?.toUpperCase() || 'APPLICANT',
          isActive: true
        }
      }
      localStorage.setItem('user_credentials', JSON.stringify(credentials))

      toast.success('Регистрация успешна! 🎉')
      setStep('success')
      setLoading(false)
    }, 1500)
  }

  const getRoleConfig = () => ROLES.find(r => r.id === selectedRole)

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-gray-50 via-violet-50/30 to-purple-50/30 dark:from-gray-950 dark:via-violet-950/20 dark:to-purple-950/20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-violet-500 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack || (() => window.location.href = '/')}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 glass-effect rounded-xl hover:scale-105 transition-transform"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-semibold">Назад</span>
      </motion.button>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-2xl"
      >
        <AnimatePresence mode="wait">
          {/* Step 1: Role Selection */}
          {step === 'role' && (
            <motion.div
              key="role"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-effect rounded-3xl p-8 md:p-10 border border-white/20 shadow-2xl"
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', duration: 0.8 }}
                  className="inline-block mb-6"
                >
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-xl">
                    <UserPlus className="w-10 h-10 text-white" />
                  </div>
                </motion.div>
                
                <h1 className="text-4xl font-black mb-2">
                  <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Регистрация
                  </span>
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Выберите вашу роль
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {ROLES.map((role) => (
                  <motion.button
                    key={role.id}
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleRoleSelect(role.id)}
                    className="group relative p-6 rounded-2xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-violet-500 dark:hover:border-violet-500 transition-all overflow-hidden"
                  >
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                    
                    <div className="relative">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:scale-110 transition-transform`}>
                        <role.icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="font-bold text-lg mb-1">{role.label}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{role.description}</p>
                      
                      {role.needsCode && (
                        <div className="mt-3 flex items-center justify-center gap-1 text-xs text-gray-500">
                          <Key className="w-3 h-3" />
                          <span>Нужен код</span>
                        </div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>

              <p className="mt-6 text-xs text-center text-gray-500 dark:text-gray-500">
                💡 Абитуриентам не нужен код приглашения
              </p>
            </motion.div>
          )}

          {/* Step 2: Invite Code */}
          {step === 'invite' && (
            <motion.div
              key="invite"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-effect rounded-3xl p-8 md:p-10 border border-white/20 shadow-2xl"
            >
              <button
                onClick={() => setStep('role')}
                className="mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-semibold">Изменить роль</span>
              </button>

              <div className="text-center mb-8">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${getRoleConfig()?.color} flex items-center justify-center shadow-xl`}>
                  <Key className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-black mb-2">Код приглашения</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Введите код, полученный от администрации
                </p>
              </div>

              <form onSubmit={handleCheckInvite} className="space-y-5">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-start gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm font-semibold text-red-800 dark:text-red-200">{error}</p>
                  </motion.div>
                )}

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    Код приглашения
                  </label>
                  <input
                    type="text"
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                    placeholder="ABCD-1234-EFGH"
                    className="w-full px-4 py-3.5 rounded-xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-violet-500 dark:focus:border-violet-500 outline-none transition-colors text-gray-900 dark:text-white placeholder-gray-400 text-center text-lg font-mono tracking-wider"
                    required
                    disabled={loading}
                  />
                  <p className="mt-2 text-xs text-gray-500 text-center">
                    Код можно получить в администрации техникума
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white font-bold text-lg hover:shadow-xl hover:shadow-violet-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {loading ? 'Проверка...' : 'Продолжить'}
                </button>
              </form>
            </motion.div>
          )}

          {/* Step 3: Registration Form */}
          {step === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-effect rounded-3xl p-8 md:p-10 border border-white/20 shadow-2xl"
            >
              <button
                onClick={() => setStep(selectedRole && ROLES.find(r => r.id === selectedRole)?.needsCode ? 'invite' : 'role')}
                className="mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-semibold">Назад</span>
              </button>

              <div className="text-center mb-8">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${getRoleConfig()?.color} flex items-center justify-center shadow-xl`}>
                  {getRoleConfig()?.icon && (
                    <div>
                      {/* Dynamic Icon */}
                      {selectedRole === 'applicant' && <GraduationCap className="w-8 h-8 text-white" />}
                      {selectedRole === 'student' && <BookOpen className="w-8 h-8 text-white" />}
                      {selectedRole === 'parent' && <Users className="w-8 h-8 text-white" />}
                      {selectedRole === 'teacher' && <Shield className="w-8 h-8 text-white" />}
                    </div>
                  )}
                </div>
                <h2 className="text-3xl font-black mb-2">Регистрация</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {getRoleConfig()?.label} • Заполните данные
                </p>
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    ФИО
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Иванов Иван Иванович"
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-violet-500 dark:focus:border-violet-500 outline-none transition-colors text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@lptt.ru"
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-violet-500 dark:focus:border-violet-500 outline-none transition-colors text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    Телефон
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+7 (999) 123-45-67"
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-violet-500 dark:focus:border-violet-500 outline-none transition-colors text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    Пароль
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Минимум 6 символов"
                      className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-violet-500 dark:focus:border-violet-500 outline-none transition-colors text-gray-900 dark:text-white"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    Подтвердите пароль
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Повторите пароль"
                      className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-violet-500 dark:focus:border-violet-500 outline-none transition-colors text-gray-900 dark:text-white"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0" />
                    <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white font-bold text-lg hover:shadow-xl hover:shadow-violet-500/50 disabled:opacity-50 transition-all"
                >
                  {loading ? 'Регистрация...' : 'Зарегистрироваться'}
                </button>
              </form>
            </motion.div>
          )}

          {/* Step 4: Success */}
          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-effect rounded-3xl p-10 border border-white/20 shadow-2xl text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.6 }}
                className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-2xl"
              >
                <CheckCircle className="w-12 h-12 text-white" />
              </motion.div>

              <h2 className="text-4xl font-black mb-4">
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Готово!
                </span>
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                Регистрация успешно завершена
              </p>

              <button
                onClick={onBack}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white font-bold hover:shadow-xl transition-all"
              >
                Войти в систему
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
