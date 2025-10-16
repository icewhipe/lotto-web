import { motion } from 'framer-motion'
import { Construction, Rocket, Clock, ArrowLeft } from 'lucide-react'

interface UnderDevelopmentProps {
  isDark: boolean
  sectionName: string
  onBack: () => void
}

export default function UnderDevelopment({ isDark, sectionName, onBack }: UnderDevelopmentProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6 py-20">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 15,
            duration: 0.8 
          }}
          className="relative inline-block mb-8"
        >
          {/* Glow effect */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full blur-2xl"
          />
          
          <div className={`relative w-32 h-32 rounded-3xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-2xl ${
            isDark ? 'shadow-violet-500/50' : 'shadow-violet-500/30'
          }`}>
            <Construction className="w-16 h-16 text-white" strokeWidth={1.5} />
          </div>

          {/* Floating decorations */}
          <motion.div
            animate={{
              y: [-10, 10, -10],
              rotate: [0, 360],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg"
          >
            <Rocket className="w-6 h-6 text-white" />
          </motion.div>

          <motion.div
            animate={{
              y: [10, -10, 10],
              rotate: [0, -360],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center shadow-lg"
          >
            <Clock className="w-6 h-6 text-white" />
          </motion.div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2 className={`text-4xl font-black mb-4 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {sectionName}
            </span>
          </h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={`text-xl mb-8 ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Раздел находится в разработке
          </motion.p>

          {/* Progress indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl ${
              isDark ? 'bg-violet-500/10 border border-violet-500/30' : 'bg-violet-50 border border-violet-200'
            }`}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-6 h-6 border-3 border-violet-500 border-t-transparent rounded-full"
            />
            <span className={`font-semibold ${isDark ? 'text-violet-300' : 'text-violet-700'}`}>
              Скоро появится новый контент
            </span>
          </motion.div>

          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className={`mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              isDark 
                ? 'bg-slate-800 text-violet-300 hover:bg-slate-700' 
                : 'bg-white text-violet-600 hover:bg-violet-50 shadow-lg'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            Вернуться на главную
          </motion.button>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className={`absolute w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-purple-500`}
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + (i * 10) % 60}%`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
