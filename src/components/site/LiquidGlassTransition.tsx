import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface LiquidGlassTransitionProps {
  onComplete: () => void
}

export default function LiquidGlassTransition({ onComplete }: LiquidGlassTransitionProps) {
  const [waves, setWaves] = useState<Array<{ id: number; delay: number }>>([])

  useEffect(() => {
    // Generate liquid waves - increased from 8 to 12 for smoother effect
    const newWaves = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      delay: i * 0.08,
    }))
    setWaves(newWaves)

    // Complete transition - optimized timing
    setTimeout(onComplete, 2200)
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, delay: 1.2 }}
      className="fixed inset-0 z-[100] overflow-hidden pointer-events-none"
    >
      {/* Liquid glass background - smoother transition */}
      <motion.div
        initial={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        animate={{ 
          opacity: 0, 
          scale: 1.15,
          filter: 'blur(30px)'
        }}
        transition={{ 
          duration: 1.8, 
          ease: [0.2, 0.9, 0.2, 1] // Apple-like smooth easing
        }}
        className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-slate-900 dark:via-blue-900 dark:to-slate-900"
      />

      {/* Flowing waves - enhanced with more organic movement */}
      {waves.map((wave) => (
        <motion.div
          key={wave.id}
          initial={{
            y: '100%',
            opacity: 0.8,
            scaleY: 1,
          }}
          animate={{
            y: '-100%',
            opacity: 0,
            scaleY: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 2.2,
            delay: wave.delay,
            ease: [0.2, 0.9, 0.2, 1],
          }}
          className="absolute inset-x-0 h-[220px]"
          style={{
            background: `linear-gradient(180deg, 
              rgba(59, 130, 246, 0) 0%, 
              rgba(59, 130, 246, ${wave.id % 2 === 0 ? '0.15' : '0.12'}) 50%, 
              rgba(59, 130, 246, 0) 100%)`,
            filter: `blur(${35 + wave.id * 2}px)`,
            transformOrigin: 'center',
          }}
        />
      ))}

      {/* Liquid droplets - more organic morphing */}
      {[...Array(25)].map((_, i) => {
        const startX = Math.random() * 100
        const startY = Math.random() * 100
        const endX = startX + (Math.random() - 0.5) * 40
        
        return (
          <motion.div
            key={`droplet-${i}`}
            initial={{
              x: `${startX}vw`,
              y: `${startY}vh`,
              scale: 0.8,
              opacity: 0.5,
              rotate: 0,
            }}
            animate={{
              x: `${endX}vw`,
              y: `${100 + Math.random() * 50}vh`,
              scale: [0.8, 1.3, 1.8, 0],
              opacity: [0.5, 0.4, 0.2, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 1.8,
              delay: Math.random() * 0.6,
              ease: [0.34, 1.56, 0.64, 1], // Elastic easing
            }}
            className="absolute rounded-full"
            style={{
              width: `${80 + Math.random() * 80}px`,
              height: `${80 + Math.random() * 80}px`,
              background: `radial-gradient(circle, rgba(59, 130, 246, ${0.15 + Math.random() * 0.15}) 0%, transparent 70%)`,
              filter: `blur(${25 + Math.random() * 20}px)`,
            }}
          />
        )
      })}

      {/* Center liquid sphere */}
      <motion.div
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: [0, 1.5, 3], opacity: [1, 0.5, 0] }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Ripple rings */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 5, opacity: 0 }}
          transition={{
            duration: 2,
            delay: i * 0.2,
            ease: 'easeOut',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-4 rounded-full"
          style={{
            borderColor: 'rgba(59, 130, 246, 0.3)',
          }}
        />
      ))}

      {/* Text fade out - enhanced with morphing */}
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 0, y: -60, scale: 0.95 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.2, 0.9, 0.2, 1] }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="text-center">
          <motion.div
            animate={{
              scale: [1, 1.08, 0.98],
              filter: ['blur(0px)', 'blur(8px)', 'blur(25px)'],
              opacity: [1, 0.8, 0],
            }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
            className="text-6xl font-black bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent"
          >
            ЛПТТ
          </motion.div>
          <motion.p
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 text-sm font-semibold text-slate-600 dark:text-slate-400"
          >
            Загрузка...
          </motion.p>
        </div>
      </motion.div>

      {/* Reduced motion support */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </motion.div>
  )
}
