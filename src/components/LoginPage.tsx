import { useState } from 'react'
import { motion } from 'framer-motion'
import { LogIn, Mail, Lock, AlertCircle, ArrowLeft, CheckCircle, Shield, Zap, Users } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

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
    setError('')
    setLoading(true)

    try {
      await login(email, password)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-violet-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Back Button - Fixed Position */}
      <motion.button
        onClick={onBack || (() => window.location.href = '/')}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-800 border-2 border-violet-300 dark:border-violet-700 rounded-full hover:shadow-xl hover:scale-105 transition-all group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform text-violet-600 dark:text-violet-400" />
        <span className="font-bold text-gray-900 dark:text-white">На главную</span>
      </motion.button>

      {/* Background Pattern - Enhanced */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-violet-500/20 to-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-pink-500/20 to-rose-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-blue-500/10 to-cyan-600/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left Side - Welcome */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-center lg:text-left space-y-6"
        >
          <div>
            <h1 className="text-5xl md:text-6xl font-black mb-4">
              <span className="gradient-text">ЛПТТ</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Электронный дневник
            </p>
            <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
              Лискинский промышленно-транспортный техникум
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold gradient-text">Возможности системы</h2>
            <div className="space-y-4">
              {[
                { icon: '📚', title: 'Электронный дневник', desc: 'Оценки по всем предметам в реальном времени', color: 'from-blue-500 to-cyan-600' },
                { icon: '📅', title: 'Расписание занятий', desc: 'Индивидуальное расписание для каждой группы', color: 'from-green-500 to-emerald-600' },
                { icon: '📊', title: 'Учет посещаемости', desc: 'Автоматический учет без бумажных рапортов', color: 'from-purple-500 to-pink-600' },
                { icon: '👥', title: 'Для всех', desc: 'Студенты, родители, преподаватели, абитуриенты', color: 'from-orange-500 to-red-600' },
                { icon: '📄', title: 'Электронные документы', desc: 'Все документы в одном месте', color: 'from-indigo-500 to-purple-600' },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index + 0.3 }}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="flex items-start gap-4 p-4 rounded-2xl glass-effect hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
                      {feature.title}
                      <CheckCircle className="w-4 h-4 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-3xl p-10 shadow-2xl border-2 border-violet-200/50 dark:border-violet-800/50"
        >
          {/* Header with Icon */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-2xl"
            >
              <LogIn className="w-12 h-12 text-white" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent mb-3">
              Вход в систему
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Введите свои учетные данные для доступа
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-xl bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center gap-3 border-2 border-red-300 dark:border-red-700"
              >
                <AlertCircle className="w-6 h-6 flex-shrink-0" />
                <span className="font-semibold">{error}</span>
              </motion.div>
            )}

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold mb-3 text-gray-700 dark:text-gray-300">Email адрес</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@lptt.ru"
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all text-gray-900 dark:text-white font-medium"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-3 text-gray-700 dark:text-gray-300">Пароль</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all text-gray-900 dark:text-white font-medium"
                    required
                  />
                </div>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white font-bold text-lg hover:shadow-2xl hover:shadow-violet-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              <LogIn className="w-6 h-6" />
              <span>{loading ? 'Вход...' : 'Войти в систему'}</span>
            </motion.button>
          </form>

          {/* Demo Accounts - Beautiful Grid */}
          <div className="mt-8 pt-8 border-t-2 border-gray-200 dark:border-gray-700">
            <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-5 text-center">
              💡 Тестовые аккаунты <span className="text-violet-600 dark:text-violet-400">(пароль: 123456)</span>
            </p>
            <div className="grid grid-cols-2 gap-3">
              {demoAccounts.map((account, index) => (
                <motion.button
                  key={account.email}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, type: 'spring' }}
                  onClick={() => {
                    setEmail(account.email)
                    setPassword('123456')
                  }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 rounded-xl bg-gradient-to-br from-violet-50 to-purple-50 dark:from-gray-700 dark:to-gray-700 hover:from-violet-100 hover:to-purple-100 dark:hover:from-gray-600 dark:hover:to-gray-600 border-2 border-violet-200/50 dark:border-violet-700/50 hover:border-violet-400 dark:hover:border-violet-500 transition-all shadow-md hover:shadow-xl"
                >
                  <div className="flex flex-col items-center gap-2.5 text-center">
                    <span className="text-3xl">{account.icon}</span>
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{account.role}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 truncate max-w-[140px]">
                        {account.email.split('@')[0]}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
            <p className="text-xs text-center text-gray-500 mt-4">
              Нажмите на карточку для автозаполнения формы
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
