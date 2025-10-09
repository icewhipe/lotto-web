import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Upload, 
  Trash2, 
  ZoomIn,
  Download,
  Grid3x3,
  List,
  X,
  Image as ImageIcon,
  Check
} from 'lucide-react'

interface GalleryImage {
  id: number
  url: string
  title: string
  category: string
  uploadDate: string
  size: string
  selected?: boolean
}

const mockImages: GalleryImage[] = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600',
    title: 'Учебный корпус',
    category: 'Здания',
    uploadDate: '2024-10-08',
    size: '2.4 MB'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600',
    title: 'Компьютерный класс',
    category: 'Лаборатории',
    uploadDate: '2024-10-07',
    size: '1.8 MB'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600',
    title: 'Спортивный зал',
    category: 'Спорт',
    uploadDate: '2024-10-06',
    size: '3.2 MB'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600',
    title: 'Библиотека',
    category: 'Учеба',
    uploadDate: '2024-10-05',
    size: '2.1 MB'
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600',
    title: 'Студенты на практике',
    category: 'События',
    uploadDate: '2024-10-04',
    size: '2.7 MB'
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600',
    title: 'Лаборатория',
    category: 'Лаборатории',
    uploadDate: '2024-10-03',
    size: '1.9 MB'
  }
]

export default function GalleryManager() {
  const [images, setImages] = useState<GalleryImage[]>(mockImages)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const categories = ['Все', 'Здания', 'Лаборатории', 'Спорт', 'Учеба', 'События']

  const filteredImages = images.filter(img => 
    selectedCategory === 'all' || img.category === selectedCategory
  )

  const toggleSelect = (id: number) => {
    setImages(images.map(img => 
      img.id === id ? { ...img, selected: !img.selected } : img
    ))
  }

  const selectedCount = images.filter(img => img.selected).length

  const deleteSelected = () => {
    setImages(images.filter(img => !img.selected))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-pink-600 to-rose-600 dark:from-pink-400 dark:to-rose-400 bg-clip-text text-transparent">
            Управление галереей
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Загружайте и управляйте фотографиями
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsUploading(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
        >
          <Upload className="w-5 h-5" />
          Загрузить фото
        </motion.button>
      </div>

      {/* Toolbar */}
      <div className="glass-effect rounded-2xl p-4 border border-gray-200/50 dark:border-gray-700/50">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map(cat => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(cat === 'Все' ? 'all' : cat)}
                className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                  (cat === 'Все' && selectedCategory === 'all') || cat === selectedCategory
                    ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          {/* View Mode & Actions */}
          <div className="flex items-center gap-2">
            {selectedCount > 0 && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={deleteSelected}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Удалить ({selectedCount})
              </motion.button>
            )}

            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-gray-700 shadow-sm'
                    : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-gray-700 shadow-sm'
                    : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Images Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.05 }}
                className="relative group"
              >
                {/* Image */}
                <div className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onClick={() => setSelectedImage(image)}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-bold text-sm mb-1">{image.title}</h3>
                      <p className="text-white/70 text-xs">{image.category}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedImage(image)
                      }}
                      className="p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-lg"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleSelect(image.id)
                      }}
                      className={`p-2 backdrop-blur-sm rounded-lg shadow-lg ${
                        image.selected
                          ? 'bg-pink-600 text-white'
                          : 'bg-white/90 dark:bg-gray-800/90'
                      }`}
                    >
                      <Check className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Info */}
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  <p>{image.size} • {new Date(image.uploadDate).toLocaleDateString('ru-RU')}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-effect rounded-2xl p-4 border border-gray-200/50 dark:border-gray-700/50 hover:border-pink-400/50 dark:hover:border-pink-600/50 transition-all"
            >
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={image.selected}
                  onChange={() => toggleSelect(image.id)}
                  className="w-5 h-5 rounded accent-pink-600"
                />

                <img
                  src={image.url}
                  alt={image.title}
                  className="w-16 h-16 object-cover rounded-lg cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                />

                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white">{image.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {image.category} • {image.size}
                  </p>
                </div>

                <div className="text-sm text-gray-500">
                  {new Date(image.uploadDate).toLocaleDateString('ru-RU')}
                </div>

                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImage(image)}
                    className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      <AnimatePresence>
        {isUploading && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setIsUploading(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-50"
            >
              <div className="glass-effect rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50 m-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-black">Загрузить фотографии</h2>
                  <button
                    onClick={() => setIsUploading(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Drop Zone */}
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-12 text-center hover:border-pink-400 dark:hover:border-pink-600 transition-colors cursor-pointer">
                  <ImageIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-bold mb-2">
                    Перетащите изображения сюда
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    или нажмите для выбора файлов
                  </p>
                  <p className="text-xs text-gray-500">
                    Поддерживаются: JPG, PNG, GIF (макс. 10 MB)
                  </p>
                </div>

                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Категория</label>
                    <select className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500">
                      {categories.filter(c => c !== 'Все').map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold rounded-xl hover:shadow-lg transition-all"
                  >
                    Загрузить
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Image Preview Modal */}
      <AnimatePresence>
        {selectedImage && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
              onClick={() => setSelectedImage(null)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 max-w-4xl w-full p-4"
            >
              <div className="relative">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="w-full rounded-2xl shadow-2xl"
                />
                
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl hover:bg-white dark:hover:bg-gray-800 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="absolute bottom-4 left-4 right-4 glass-effect rounded-2xl p-4">
                  <h3 className="text-xl font-bold text-white mb-1">{selectedImage.title}</h3>
                  <p className="text-sm text-white/70">
                    {selectedImage.category} • {selectedImage.size} • {new Date(selectedImage.uploadDate).toLocaleDateString('ru-RU')}
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
