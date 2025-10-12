import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, GraduationCap, Briefcase, Award, Sparkles, Rocket } from 'lucide-react'

const stats = [
  { number: '65+', label: 'лет опыта', icon: Award },
  { number: '1000+', label: 'студентов', icon: GraduationCap },
  { number: '15+', label: 'специальностей', icon: Briefcase },
]

const floatingCards = [
  { icon: GraduationCap, text: 'Качественное образование', delay: 0, color: 'from-violet-500 to-purple-600', top: '0%', left: '5%' },
  { icon: Briefcase, text: 'Гарантия трудоустройства', delay: 0.2, color: 'from-blue-500 to-cyan-600', top: '28%', left: '25%' },
  { icon: Award, text: 'Современное оборудование', delay: 0.4, color: 'from-pink-500 to-rose-600', top: '56%', left: '10%' },
]

export default function Hero() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 150])
  const y2 = useTransform(scrollY, [0, 500], [0, -150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32">
      {/* Enhanced Background - Improved Light Theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-violet-50/20 to-purple-50/20 dark:from-gray-950 dark:via-purple-950/30 dark:to-cyan-950/30" />
      
      {/* Simplified Gradient Orbs - Better Performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-48 -right-48 w-[600px] h-[600px] rounded-full opacity-20"
          style={{ 
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)',
            filter: 'blur(60px)',
            willChange: 'transform'
          }}
        />
        <div 
          className="absolute -bottom-48 -left-48 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ 
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
            filter: 'blur(60px)'
          }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] dark:bg-grid-slate-100/[0.03] bg-[size:32px_32px]" />

      <motion.div className="container-custom relative z-10" style={{ opacity }}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 relative z-30"
          >
            {/* Badges - Two Main Badges */}
            <div className="flex flex-wrap items-center gap-3 relative z-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/15 via-purple-500/15 to-pink-500/15 border-2 border-violet-400/40 dark:border-violet-500/30 backdrop-blur-md shadow-lg"
              >
                <Sparkles className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                <span className="text-sm font-bold bg-gradient-to-r from-violet-600 to-pink-600 dark:from-violet-400 dark:to-pink-400 bg-clip-text text-transparent">
                  Лучший техникум 2024
                </span>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/15 via-cyan-500/15 to-blue-500/15 border-2 border-blue-400/40 dark:border-blue-500/30 backdrop-blur-md shadow-lg"
              >
                <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                  Аккредитация 2024
                </span>
              </motion.div>
              
              {/* Third badge - positioned to the right with margin */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/15 via-green-500/15 to-emerald-500/15 border-2 border-emerald-400/40 dark:border-emerald-500/30 backdrop-blur-md shadow-lg sm:ml-auto"
              >
                <Rocket className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm font-bold bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400 bg-clip-text text-transparent">
                  Топ-10 в регионе
                </span>
              </motion.div>
            </div>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.1] tracking-tight relative z-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              Твоё будущее <br />
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 dark:from-violet-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  начинается здесь
                </span>
                <motion.span
                  className="absolute -inset-1 bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-pink-600/20 blur-2xl"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed relative z-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              Современное профессиональное образование в сфере промышленности и транспорта.
              Качественная подготовка специалистов с 1958 года.
            </motion.p>

            {/* Enhanced Stats - BEFORE Buttons! */}
            <motion.div
              className="flex flex-wrap gap-6 relative z-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="group relative"
                >
                  <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-5 border-3 border-violet-400/70 dark:border-violet-600/70 hover:border-violet-500 dark:hover:border-violet-500 transition-all shadow-2xl hover:shadow-violet-500/30 hover:scale-105 duration-300">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg">
                        <stat.icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <div className="text-4xl font-black bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 dark:from-violet-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                          {stat.number}
                        </div>
                        <div className="text-sm font-semibold" style={{ color: '#475569' }}>{stat.label}</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                </motion.div>
              ))}
            </motion.div>

            {/* Action Buttons - AFTER Stats */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 relative z-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.3 }}
            >
              <motion.a 
                href="#admissions" 
                className="group relative px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold rounded-2xl overflow-hidden shadow-lg shadow-violet-500/50 dark:shadow-violet-500/30"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center gap-2 justify-center">
                  Поступить в техникум
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
              
              <motion.a 
                href="#programs" 
                className="group px-8 py-4 glass-effect font-bold rounded-2xl border-2 border-violet-200 dark:border-violet-800 hover:border-violet-400 dark:hover:border-violet-600 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center gap-2 justify-center">
                  Наши специальности
                  <Rocket className="w-5 h-5 group-hover:translate-y-[-2px] transition-transform" />
                </span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Enhanced 3D Floating Cards - All Visible on Load */}
          <div className="relative h-[600px] hidden lg:block" style={{ zIndex: 50 }}>
            {floatingCards.map((card, index) => (
              <motion.div
                key={card.text}
                className="absolute group"
                initial={{ opacity: 0, scale: 0, rotateY: -180 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ 
                  delay: 0.7 + card.delay, 
                  type: 'spring',
                  stiffness: 100
                }}
                style={{
                  top: card.top,
                  left: card.left,
                  perspective: '1000px'
                }}
              >
                <motion.div
                  className="glass-effect rounded-3xl p-6 border-2 border-transparent hover:border-violet-400/50 dark:hover:border-violet-600/50 transition-all cursor-pointer"
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                  whileHover={{ 
                    scale: 1.1,
                    rotateY: 5,
                    rotateX: 5,
                    z: 50
                  }}
                  style={{
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {/* Glow effect on hover */}
                  <motion.div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity -z-10`}
                  />
                  
                  <div className="relative" style={{ transform: 'translateZ(20px)' }}>
                    <div className={`w-14 h-14 mb-4 rounded-2xl bg-gradient-to-br ${card.color} p-3 shadow-lg`}>
                      <card.icon className="w-full h-full text-white" />
                    </div>
                    <p className="text-base font-bold max-w-[180px] bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                      {card.text}
                    </p>
                  </div>
                  
                  {/* Sparkle effect */}
                  <motion.div
                    className="absolute -top-1 -right-1"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                  >
                    <Sparkles className="w-5 h-5 text-violet-500" />
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
            
            {/* Central glow orb */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
                filter: 'blur(40px)',
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="relative group cursor-pointer"
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              className="w-8 h-12 border-2 border-violet-400/50 dark:border-violet-600/50 rounded-full p-1.5 backdrop-blur-sm"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-2 h-3 bg-gradient-to-b from-violet-500 to-purple-600 rounded-full mx-auto"
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-violet-500/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </motion.div>
          
          <motion.p
            className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Листай вниз
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  )
}
