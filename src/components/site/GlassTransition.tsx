import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface GlassTransitionProps {
  onComplete: () => void
}

export default function GlassTransition({ onComplete }: GlassTransitionProps) {
  const [fragments, setFragments] = useState<Array<{ x: number; y: number; delay: number }>>([])

  useEffect(() => {
    // Generate glass fragments
    const newFragments = []
    for (let i = 0; i < 20; i++) {
      newFragments.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 0.5,
      })
    }
    setFragments(newFragments)

    // Complete transition after animation
    setTimeout(onComplete, 1500)
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed inset-0 z-[100] pointer-events-none"
    >
      {/* Glass overlay */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-slate-900 dark:via-blue-900 dark:to-slate-900 backdrop-blur-3xl"
      />

      {/* Glass fragments */}
      {fragments.map((fragment, i) => (
        <motion.div
          key={i}
          initial={{
            x: `${fragment.x}vw`,
            y: `${fragment.y}vh`,
            scale: 1,
            opacity: 0.8,
            rotate: 0,
          }}
          animate={{
            x: `${fragment.x + (Math.random() - 0.5) * 200}vw`,
            y: `${fragment.y + 150}vh`,
            scale: 0,
            opacity: 0,
            rotate: Math.random() * 360,
          }}
          transition={{
            duration: 1.2,
            delay: fragment.delay,
            ease: [0.43, 0.13, 0.23, 0.96],
          }}
          className="absolute w-20 h-20 bg-white/20 dark:bg-blue-400/10 backdrop-blur-md border border-white/30 dark:border-blue-400/20 rounded-lg shadow-2xl"
          style={{
            boxShadow: '0 8px 32px rgba(59, 130, 246, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
          }}
        />
      ))}

      {/* Center glow effect */}
      <motion.div
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 3, opacity: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl"
      />

      {/* Ripple effect */}
      <motion.div
        initial={{ scale: 0, opacity: 0.5 }}
        animate={{ scale: 5, opacity: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-4 border-blue-400/30 rounded-full"
      />
    </motion.div>
  )
}
