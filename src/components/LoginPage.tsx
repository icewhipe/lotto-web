import { useState } from 'react'
import { motion } from 'framer-motion'
import { LogIn, Mail, Lock, ArrowLeft, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'

interface LoginPageProps {
  onBack?: () => void
  onRegisterClick?: () => void
}

export default function LoginPage({ onBack, onRegisterClick }: LoginPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    setError('')
    setLoading(true)

    const timeoutId = setTimeout(() => {
      setLoading(false)
      setError('Превышено время ожидания')
    }, 10000)

    try {
      await login(email, password)
      clearTimeout(timeoutId)
      
      toast.success('Вход выполнен! 🎉', {
        duration: 2000,
      })
      
    } catch (err) {
      clearTimeout(timeoutId)
      setLoading(false)
      
      const errorMessage = (err as Error).message
      setError(errorMessage)
      
      toast.error(errorMessage || 'Ошибка входа')
    }
  }

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

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-effect rounded-3xl p-8 md:p-10 border border-white/20 shadow-2xl">
          {/* Logo/Icon */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', duration: 0.8 }}
              className="inline-block mb-6"
            >
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-xl">
                <LogIn className="w-10 h-10 text-white" />
              </div>
            </motion.div>
            
            <h1 className="text-4xl font-black mb-2">
              <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Вход
              </span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Электронный дневник ЛПТТ
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-red-800 dark:text-red-200">{error}</p>
                  <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                    Проверьте email и пароль
                  </p>
                </div>
              </motion.div>
            )}

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
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-violet-500 dark:focus:border-violet-500 outline-none transition-colors text-gray-900 dark:text-white placeholder-gray-400"
                  required
                  disabled={loading}
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
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-violet-500 dark:focus:border-violet-500 outline-none transition-colors text-gray-900 dark:text-white placeholder-gray-400"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white font-bold text-lg hover:shadow-xl hover:shadow-violet-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 relative overflow-hidden group"
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <LogIn className="w-5 h-5" />
                  </motion.div>
                  <span>Вход...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Войти</span>
                </>
              )}
              
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              />
            </button>
          </form>

          {/* Register Link */}
          {onRegisterClick && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Нет аккаунта?{' '}
                <button
                  onClick={onRegisterClick}
                  className="text-violet-600 dark:text-violet-400 font-bold hover:underline"
                >
                  Зарегистрироваться
                </button>
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
