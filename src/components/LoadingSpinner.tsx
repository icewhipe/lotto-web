import { motion } from 'framer-motion'

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <motion.div
        className="relative w-16 h-16"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute inset-0 rounded-full border-4 border-violet-200 dark:border-violet-900" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-violet-600 dark:border-t-violet-400" />
      </motion.div>
    </div>
  )
}
