import { useEffect, useRef, useState } from 'react'

interface UseScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true
  } = options

  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (triggerOnce) {
            observer.unobserve(element)
          }
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, triggerOnce])

  return { ref, isVisible }
}

export const getScrollAnimationVariants = () => ({
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.6, ease: [0.25, 0.9, 0.25, 1] }
    }
  },
  slideUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.9, 0.25, 1] }
    }
  },
  slideLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { 
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.25, 0.9, 0.25, 1] }
    }
  },
  slideRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { 
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.25, 0.9, 0.25, 1] }
    }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.25, 0.9, 0.25, 1] }
    }
  },
  stagger: {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }
})
