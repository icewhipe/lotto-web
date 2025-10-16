import { motion } from 'framer-motion'
import { Image, Play, Calendar, Eye } from 'lucide-react'

interface PhotoVideoGalleryProps {
  isDark: boolean
  onNavigate: (section: string, subsection?: string) => void
}

const PhotoVideoGallery = ({ isDark, onNavigate }: PhotoVideoGalleryProps) => {
  const photos = [
    {
      id: 1,
      title: 'День открытых дверей 2025',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
      date: '15.10.2025',
      views: 1240
    },
    {
      id: 2,
      title: 'Региональный чемпионат',
      image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800',
      date: '10.10.2025',
      views: 856
    },
    {
      id: 3,
      title: 'Торжественная линейка',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800',
      date: '01.09.2025',
      views: 2134
    }
  ]

  const videos = [
    {
      id: 1,
      title: 'Презентация техникума 2025',
      thumbnail: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800',
      duration: '3:45',
      views: 3420
    },
    {
      id: 2,
      title: 'Выпускной 2024',
      thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800',
      duration: '5:20',
      views: 2890
    }
  ]

  return (
    <section className="relative py-20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className={`text-4xl lg:text-5xl font-black mb-4 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Фото и видео
          </h2>
          <p className={`text-lg ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Жизнь техникума в моментах
          </p>
        </motion.div>

        {/* Photo Gallery */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-2xl font-bold flex items-center gap-2 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              <Image className="w-6 h-6" />
              Фотогалерея
            </h3>
            <motion.button
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('press-center', 'gallery')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold ${
                isDark
                  ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              } transition-colors`}
            >
              Все фото →
            </motion.button>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer ${
                  isDark ? 'bg-white/5' : 'bg-white'
                } shadow-lg hover:shadow-2xl transition-all duration-300`}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="p-4">
                  <h4 className={`font-bold mb-2 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    {photo.title}
                  </h4>
                  <div className={`flex items-center justify-between text-xs ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {photo.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {photo.views}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Video Gallery */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-2xl font-bold flex items-center gap-2 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              <Play className="w-6 h-6" />
              Видеогалерея
            </h3>
            <motion.button
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('press-center', 'video-gallery')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold ${
                isDark
                  ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              } transition-colors`}
            >
              Все видео →
            </motion.button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer ${
                  isDark ? 'bg-white/5' : 'bg-white'
                } shadow-lg hover:shadow-2xl transition-all duration-300`}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors duration-300">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl"
                    >
                      <Play className="w-8 h-8 text-blue-600 ml-1" fill="currentColor" />
                    </motion.div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-black/70 text-white text-xs font-semibold">
                    {video.duration}
                  </div>
                </div>

                <div className="p-4">
                  <h4 className={`font-bold mb-2 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    {video.title}
                  </h4>
                  <div className={`flex items-center gap-1 text-xs ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    <Eye className="w-3 h-3" />
                    {video.views} просмотров
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PhotoVideoGallery
