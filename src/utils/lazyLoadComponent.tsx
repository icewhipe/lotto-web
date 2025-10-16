import { lazy, Suspense, ComponentType } from 'react'
import { motion } from 'framer-motion'

/**
 * Utility для lazy loading компонентов с loading state
 * 
 * Usage:
 * const AdminPanel = lazyLoadComponent(() => import('./components/admin/AdminPanel'))
 */

interface LoadingFallbackProps {
  text?: string
}

const LoadingFallback = ({ text = 'Загрузка...' }: LoadingFallbackProps) => (
  <div className="flex items-center justify-center min-h-[400px]">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center"
    >
      {/* Spinner */}
      <div className="relative w-16 h-16 mx-auto mb-4">
        <div className="absolute inset-0 border-4 border-blue-200 dark:border-blue-800 rounded-full" />
        <motion.div
          className="absolute inset-0 border-4 border-blue-600 dark:border-blue-400 rounded-full border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      
      {/* Loading text */}
      <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
        {text}
      </p>
      
      {/* Dots animation */}
      <div className="flex items-center justify-center gap-1 mt-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"
            animate={{
              y: [-4, 4, -4],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.15,
            }}
          />
        ))}
      </div>
    </motion.div>
  </div>
)

/**
 * Lazy load component with Suspense
 */
export function lazyLoadComponent<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallbackText?: string
) {
  const LazyComponent = lazy(importFunc)
  
  return (props: any) => (
    <Suspense fallback={<LoadingFallback text={fallbackText} />}>
      <LazyComponent {...props} />
    </Suspense>
  )
}

/**
 * Preload component (для prefetching)
 */
export function preloadComponent<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
) {
  return () => {
    importFunc()
  }
}

/**
 * Example usage:
 * 
 * // In your routes or component
 * const AdminPanel = lazyLoadComponent(
 *   () => import('./components/admin/AdminPanel'),
 *   'Загрузка админ-панели...'
 * )
 * 
 * // Preload on hover
 * const preloadAdmin = preloadComponent(() => import('./components/admin/AdminPanel'))
 * 
 * <button 
 *   onMouseEnter={preloadAdmin}
 *   onClick={() => navigate('/admin')}
 * >
 *   Админ-панель
 * </button>
 */
