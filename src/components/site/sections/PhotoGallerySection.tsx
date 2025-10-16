import { motion } from 'framer-motion'
import { Image } from 'lucide-react'

interface PhotoGallerySectionProps {
  isDark: boolean
}

export default function PhotoGallerySection({ isDark }: PhotoGallerySectionProps) {
  return (
    <div className="container mx-auto px-6 py-20">
      <h1 className={`text-4xl font-black mb-12 ${isDark ? 'text-white' : 'text-slate-900'}`}>Фотогалерея</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.05 }}
            className={`aspect-square rounded-2xl ${isDark ? 'bg-slate-800/50 border border-blue-500/20' : 'bg-slate-100 border border-blue-100'} flex items-center justify-center cursor-pointer`}
          >
            <Image className={`w-12 h-12 ${isDark ? 'text-slate-600' : 'text-slate-400'}`} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
