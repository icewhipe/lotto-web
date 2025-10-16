import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  placeholderSrc?: string
  onLoad?: () => void
  aspectRatio?: string // e.g., "16/9", "4/3", "1/1"
}

/**
 * Lazy Loading Image Component with blur-up effect
 * 
 * Features:
 * - Intersection Observer для lazy loading
 * - Blur-up placeholder
 * - Smooth fade-in animation
 * - AVIF/WebP support с fallback
 * 
 * Usage:
 * <LazyImage 
 *   src="/images/photo.jpg" 
 *   alt="Description" 
 *   aspectRatio="16/9"
 * />
 */
export default function LazyImage({
  src,
  alt,
  className = '',
  placeholderSrc,
  onLoad,
  aspectRatio = '16/9',
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [imageSrc, setImageSrc] = useState(placeholderSrc || '')
  const imgRef = useRef<HTMLDivElement>(null)

  // Intersection Observer для lazy loading
  useEffect(() => {
    if (!imgRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '100px', // Начинаем загрузку за 100px до появления
      }
    )

    observer.observe(imgRef.current)

    return () => observer.disconnect()
  }, [])

  // Загрузка изображения когда в viewport
  useEffect(() => {
    if (!isInView) return

    const img = new Image()
    
    // Try AVIF first, then WebP, then original
    const formats = [
      src.replace(/\.(jpg|jpeg|png)$/i, '.avif'),
      src.replace(/\.(jpg|jpeg|png)$/i, '.webp'),
      src,
    ]

    const loadImage = async () => {
      for (const format of formats) {
        try {
          img.src = format
          await img.decode()
          setImageSrc(format)
          setIsLoaded(true)
          onLoad?.()
          break
        } catch {
          continue // Try next format
        }
      }
    }

    loadImage()
  }, [isInView, src, onLoad])

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio }}
    >
      {/* Placeholder with blur */}
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 animate-pulse"
          style={{
            backgroundImage: placeholderSrc
              ? `url(${placeholderSrc})`
              : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(20px)',
            transform: 'scale(1.1)',
          }}
        />
      )}

      {/* Actual image */}
      {isInView && (
        <motion.img
          src={imageSrc}
          alt={alt}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.2, 0.9, 0.2, 1] }}
        />
      )}

      {/* Loading indicator */}
      {isInView && !isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}
