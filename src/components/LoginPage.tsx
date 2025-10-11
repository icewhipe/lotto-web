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
      {/* Back Button - Fixed Position, Won't Overlap */}
      <motion.button
        onClick={onBack || (() => window.location.href = '/')}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-800 border-2 border-violet-300 dark:border-violet-700 rounded-full hover:shadow-xl hover:scale-105 transition-all group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform text-violet-600 dark:text-violet-400" />
        <span className="font-bold text-gray-900 dark:text-white">На главную</span>
      </motion.button>

      {/* Beautiful Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-violet-500/20 to-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-pink-500/20 to-rose-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-blue-500/10 to-cyan-600/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Side - Welcome & Features */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-left space-y-10"
        >
          {/* Logo Section */}
          <div className="space-y-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-3">
                <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 dark:from-violet-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  ЛПТТ
                </span>
              </h1>
            </motion.div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200">
                Электронный дневник
              </p>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mt-2">
                Лискинский промышленно-транспортный техникум
              </p>
            </div>
          </div>

          {/* Key Features - Redesigned */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
              Возможности системы
            </h2>
            <div className="space-y-4">
              {[
                { icon: Shield, title: 'Безопасность данных', desc: 'Защищенное хранение персональной информации', color: 'from-violet-500 to-purple-600' },
                { icon: Zap, title: 'Быстрый доступ 24/7', desc: 'Оценки и расписание всегда под рукой', color: 'from-blue-500 to-cyan-600' },
                { icon: Users, title: 'Для всех ролей', desc: 'Студенты, преподаватели, родители, администрация', color: 'from-pink-500 to-rose-600' },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 * index + 0.5, duration: 0.5 }}
                  whileHover={{ x: 10, scale: 1.03 }}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-2 border-violet-200/60 dark:border-violet-800/60 hover:border-violet-400 dark:hover:border-violet-600 shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
                >
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1.5 flex items-center gap-2 text-gray-900 dark:text-white">
                      {feature.title}
                      <CheckCircle className="w-5 h-5 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Side - Login Form - REDESIGNED */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-3xl p-10 shadow-2xl border-2 border-violet-200/50 dark:border-violet-800/50"
        >