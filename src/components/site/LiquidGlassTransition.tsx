import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface LiquidGlassTransitionProps {
  onComplete: () => void
}

export default function LiquidGlassTransition({ onComplete }: LiquidGlassTransitionProps) {
  const [waves, setWaves] = useState<Array<{ id: number; delay: number }>>([])

  useEffect(() => {
    // Generate liquid waves
    const newWaves = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      delay: i * 0.1,
    }))
    setWaves(newWaves)

    // Complete transition
    setTimeout(onComplete, 2000)
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, delay: 1 }}
      className="fixed inset-0 z-[100] overflow-hidden pointer-events-none"
    >
      {/* Liquid glass background */}
      <motion.div
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: 0, scale: 1.2 }}
        transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
        className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-slate-900 dark:via-blue-900 dark:to-slate-900"
      />

      {/* Flowing waves */}
      {waves.map((wave) => (
        <motion.div
          key={wave.id}
          initial={{
            y: '100%',
            opacity: 0.8,
          }}
          animate={{
            y: '-100%',
            opacity: 0,
          }}
          transition={{
            duration: 2,
            delay: wave.delay,
            ease: [0.43, 0.13, 0.23, 0.96],
          }}
          className="absolute inset-x-0 h-[200px]"
          style={{
            background: `linear-gradient(180deg, 
              rgba(59, 130, 246, 0) 0%, 
              rgba(59, 130, 246, 0.1) 50%, 
              rgba(59, 130, 246, 0) 100%)`,
            filter: 'blur(40px)',
          }}
        />
      ))}

      {/* Liquid droplets */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: `${Math.random() * 100}vw`,
            y: `${Math.random() * 100}vh`,
            scale: 1,
            opacity: 0.6,
          }}
          animate={{
            x: `${Math.random() * 100}vw`,
            y: `${100 + Math.random() * 50}vh`,
            scale: [1, 1.5, 0],
            opacity: [0.6, 0.3, 0],
          }}
          transition={{
            duration: 1.5,
            delay: Math.random() * 0.5,
            ease: [0.43, 0.13, 0.23, 0.96],
          }}
          className="absolute w-32 h-32 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }}
        />
      ))}

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

      {/* Text fade out */}
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="text-center">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              filter: ['blur(0px)', 'blur(10px)', 'blur(20px)'],
            }}
            transition={{ duration: 1.5 }}
            className="text-6xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"
          >
            ЛПТТ
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
