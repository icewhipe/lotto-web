import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UserPlus, Mail, Lock, Phone, Calendar, User, ArrowLeft, CheckCircle, XCircle, Key } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'

interface RegisterPageProps {
  onBack?: () => void
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export default function RegisterPage({ onBack }: RegisterPageProps) {
  const [step, setStep] = useState<'invite' | 'form' | 'success'>('invite')
  
  // Step 1: Invite Code
  const [inviteCode, setInviteCode] = useState('')
  const [groupInfo, setGroupInfo] = useState<any>(null)
  
  // Step 2: Form
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [birthDate, setBirthDate] = useState('')
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Проверка кода приглашения
  const handleCheckInvite = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await axios.post(`${API_URL}/registration/check-invite-code`, {
        code: inviteCode
      })

      if (response.data.success) {
        setGroupInfo(response.data.data)
        setStep('form')
        toast.success('Код подтверждён! Заполните форму ✅', {
          duration: 3000,
          icon: '🎉',
        })
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Неверный код приглашения'
      setError(errorMessage)
      toast.error(errorMessage, {
        duration: 4000,
        icon: '❌',
      })
    } finally {
      setLoading(false)
    }
  }

  // Регистрация
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Валидация
    if (password !== confirmPassword) {
      setError('Пароли не совпадают')
      toast.error('Пароли не совпадают', { icon: '❌' })
      return
    }

    if (password.length < 6) {
      setError('Пароль должен быть минимум 6 символов')
      toast.error('Пароль слишком короткий', { icon: '❌' })
      return
    }

    setLoading(true)

    try {
      const response = await axios.post(`${API_URL}/registration/register-with-invite`, {
        code: inviteCode,
        name,
        email,
        password,
        phone,
        birthDate,
      })

      if (response.data.success) {
        setStep('success')
        toast.success('Регистрация успешна! 🎉', {
          duration: 3000,
          icon: '✅',
        })
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Ошибка регистрации'
      setError(errorMessage)
      toast.error(errorMessage, {
        duration: 4000,
        icon: '❌',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-violet-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Toast Notifications */}
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: 'white',
            color: '#333',
            fontWeight: '600',
            padding: '16px',
            borderRadius: '12px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
          },
          success: {
            style: {
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
            },
          },
          error: {
            style: {
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              color: 'white',
            },
          },
        }}
      />

      {/* Back Button */}
      <button
        onClick={onBack || (() => window.location.href = '/')}
        className="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 hover:scale-105 transition-transform"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-semibold">Назад</span>
      </button>

      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <AnimatePresence mode="wait">
          {/* Step 1: Invite Code */}
          {step === 'invite' && (
            <motion.div
              key="invite"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl border-2 border-gray-200 dark:border-gray-700"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                  <Key className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
                  Регистрация
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Введите код приглашения от администрации
                </p>
              </div>

              <form onSubmit={handleCheckInvite} className="space-y-4">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/30 dark:to-rose-900/30 border-2 border-red-300 dark:border-red-700 rounded-2xl shadow-lg"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-red-500 rounded-full flex-shrink-0">
                        <XCircle className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-red-900 dark:text-red-100 mb-1">Ошибка</h4>
                        <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    Код приглашения
                  </label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={inviteCode}
                      onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                      placeholder="LPTT-IS21-2024-001"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-gray-900 dark:text-white font-mono"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    💡 Код должен быть выдан администрацией техникума
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Проверка кода...
                    </span>
                  ) : 'Продолжить'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Уже есть аккаунт?{' '}
                  <button
                    onClick={onBack}
                    className="text-violet-600 dark:text-violet-400 font-semibold hover:underline"
                  >
                    Войти
                  </button>
                </p>
              </div>
            </motion.div>
          )}

          {/* Step 2: Registration Form */}
          {step === 'form' && groupInfo && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl border-2 border-gray-200 dark:border-gray-700"
            >
              {/* Group Info */}
              <div className="mb-6 p-4 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 border-2 border-violet-300 dark:border-violet-700 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-violet-500 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Группа: <span className="text-violet-600 dark:text-violet-400">{groupInfo.groupName}</span>
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {groupInfo.specialtyName}
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center mb-6">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-1">
                  Заполните данные
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Все поля обязательны
                </p>
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/30 dark:to-rose-900/30 border-2 border-red-300 dark:border-red-700 rounded-2xl shadow-lg"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-red-500 rounded-full flex-shrink-0">
                        <XCircle className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-red-900 dark:text-red-100 mb-1">Ошибка</h4>
                        <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ФИО */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    ФИО
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Иванов Иван Иванович"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-gray-900 dark:text-white"
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
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ivan@example.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-gray-900 dark:text-white"
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
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+7 900 123 45 67"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                </div>

                {/* Birth Date */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    Дата рождения
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-gray-900 dark:text-white"
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
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-gray-900 dark:text-white"
                      required
                      minLength={6}
                    />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Минимум 6 символов
                  </p>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    Повторите пароль
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Регистрация...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <UserPlus className="w-5 h-5" />
                      Зарегистрироваться
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStep('invite')
                    setGroupInfo(null)
                    setError('')
                  }}
                  className="w-full py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-semibold transition-colors"
                >
                  ← Изменить код
                </button>
              </form>
            </motion.div>
          )}

          {/* Step 3: Success */}
          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center"
              >
                <CheckCircle className="w-12 h-12 text-white" />
              </motion.div>

              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-3">
                Регистрация успешна!
              </h2>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Ваш аккаунт создан. Проверьте email для подтверждения.
              </p>

              <div className="space-y-3">
                <button
                  onClick={onBack}
                  className="w-full py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  Перейти ко входу
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
