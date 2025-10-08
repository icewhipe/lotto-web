import { useState } from 'react'
import { motion } from 'framer-motion'
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export default function LoginPage() {
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary-50 to-purple-100 dark:from-gray-950 dark:to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary-500/30 to-purple-600/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-secondary-500/30 to-pink-600/30 rounded-full blur-3xl" />
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

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Возможности системы:</h2>
            <ul className="space-y-3">
              {[
                '📚 Электронный дневник и оценки',
                '📅 Расписание занятий',
                '📊 Учет посещаемости',
                '👥 Доступ для студентов, родителей и преподавателей',
                '📄 Электронные документы',
              ].map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center gap-3 text-lg"
                >
                  <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                    {feature.charAt(0)}
                  </div>
                  <span>{feature.substring(2)}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-effect rounded-3xl p-8 shadow-2xl"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black mb-2">Вход в систему</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Введите свои учетные данные
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center gap-2"
              >
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </motion.div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@lptt.ru"
                    className="w-full pl-12 pr-4 py-3 rounded-xl glass-effect outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Пароль</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3 rounded-xl glass-effect outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-500 to-purple-600 text-white font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5" />
              <span>{loading ? 'Вход...' : 'Войти'}</span>
            </button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-8">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Демо-аккаунты (пароль: 123456):
            </p>
            <div className="grid grid-cols-2 gap-2">
              {demoAccounts.map((account) => (
                <button
                  key={account.email}
                  onClick={() => {
                    setEmail(account.email)
                    setPassword('123456')
                  }}
                  className="p-3 rounded-xl glass-effect hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors text-left"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{account.icon}</span>
                    <div>
                      <p className="text-xs font-semibold">{account.role}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {account.email}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
