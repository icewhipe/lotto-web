import { useState } from 'react'
import { motion } from 'framer-motion'
import { LogIn, Mail, Lock, AlertCircle, ArrowLeft, Shield, Zap, Users, XCircle, CheckCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import toast, { Toaster } from 'react-hot-toast'

interface LoginPageProps {
  onBack?: () => void
}

export default function LoginPage({ onBack }: LoginPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Сбрасываем ошибку и включаем loading
    setError('')
    setLoading(true)

    // Используем setTimeout чтобы гарантировать что loading сбросится
    const timeoutId = setTimeout(() => {
      console.error('Login timeout - сбрасываем loading')
      setLoading(false)
      setError('Превышено время ожидания. Попробуйте ещё раз.')
    }, 10000) // 10 секунд timeout

    try {
      await login(email, password)
      
      // Успешный вход - очищаем timeout
      clearTimeout(timeoutId)
      
      // Показываем toast
      toast.success('Вход выполнен успешно! 🎉', {
        duration: 2000,
        icon: '✅',
      })
      
      // НЕ делаем setLoading(false) - идёт редирект на dashboard
      
    } catch (err) {
      // ОШИБКА - очищаем timeout и останавливаем loading
      clearTimeout(timeoutId)
      setLoading(false)
      
      const errorMessage = (err as Error).message
      setError(errorMessage)
      
      // Toast уведомление
      toast.error(errorMessage || 'Ошибка входа', {
        duration: 4000,
        icon: '❌',
      })
      
      console.error('Login failed:', errorMessage)
    }
  }

  const demoAccounts = [
    { email: 'student@lptt.ru', role: 'Студент', icon: '👨‍🎓' },
    { email: 'teacher@lptt.ru', role: 'Преподаватель', icon: '👩‍🏫' },
    { email: 'parent@lptt.ru', role: 'Родитель', icon: '👨‍👩‍👦' },
    { email: 'applicant@lptt.ru', role: 'Абитуриент', icon: '🎓' },
    { email: 'admin@lptt.ru', role: 'Администратор', icon: '⚙️' },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-white dark:bg-gray-950">
      {/* Simple Back Button */}
      <button
        onClick={onBack || (() => window.location.href = '/')}
        className="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 hover:scale-105 transition-transform"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-semibold">Назад</span>
      </button>

      {/* Simple Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left Side - Info */}
        <div className="text-center lg:text-left space-y-6">
          <div>
            <h1 className="text-6xl font-black mb-3">
              <span className="bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
                ЛПТТ
              </span>
            </h1>
            <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
              Электронный дневник
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Лискинский промышленно-транспортный техникум
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              Возможности системы
            </h2>
            <div className="space-y-3">
              {[
                { icon: Shield, title: 'Безопасность', desc: 'Защищенное хранение данных' },
                { icon: Zap, title: 'Быстрый доступ', desc: 'Оценки и расписание 24/7' },
                { icon: Users, title: 'Для всех', desc: 'Студенты, преподаватели, родители' },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-900 dark:text-white">{feature.title}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Login Form - SIMPLIFIED */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
              Вход в систему
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Введите свои данные
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-4 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/30 dark:to-rose-900/30 border-2 border-red-300 dark:border-red-700 rounded-2xl shadow-lg"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-red-500 rounded-full flex-shrink-0">
                    <XCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-red-900 dark:text-red-100 mb-1">Ошибка входа</h4>
                    <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                    <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                      💡 Проверьте правильность email и пароля
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@lptt.ru"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500 text-gray-900 dark:text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Пароль</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500 text-gray-900 dark:text-white"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5" />
              {loading ? 'Вход...' : 'Войти'}
            </button>
          </form>

          {/* Demo Accounts - Simplified */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-center text-gray-600 dark:text-gray-400 mb-3">
              Тестовые аккаунты (пароль: 123456)
            </p>
            <div className="grid grid-cols-2 gap-2">
              {demoAccounts.map((account) => (
                <button
                  key={account.email}
                  onClick={() => {
                    setEmail(account.email)
                    setPassword('123456')
                  }}
                  className="p-2 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 text-center"
                >
                  <span className="text-xl mb-1 block">{account.icon}</span>
                  <p className="text-xs font-semibold text-gray-900 dark:text-white">{account.role}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
