import { motion } from 'framer-motion'
import { Video } from 'lucide-react'

interface VideoGallerySectionProps {
  isDark: boolean
}

export default function VideoGallerySection({ isDark }: VideoGallerySectionProps) {
  return (
    <div className="container mx-auto px-6 py-20">
      <h1 className={`text-4xl font-black mb-12 ${isDark ? 'text-white' : 'text-slate-900'}`}>Видеогалерея</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className={`aspect-video rounded-2xl ${isDark ? 'bg-slate-800/50 border border-blue-500/20' : 'bg-slate-100 border border-blue-100'} flex items-center justify-center cursor-pointer`}
          >
            <Video className={`w-16 h-16 ${isDark ? 'text-slate-600' : 'text-slate-400'}`} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
