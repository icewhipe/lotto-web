import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
      mangle: {
        safari10: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor splitting для оптимального кэширования
          if (id.includes('node_modules')) {
            // React core
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor'
            }
            // Animation library
            if (id.includes('framer-motion')) {
              return 'animation-vendor'
            }
            // Icons
            if (id.includes('lucide-react')) {
              return 'icons-vendor'
            }
            // Router
            if (id.includes('react-router')) {
              return 'router-vendor'
            }
            // HTTP client
            if (id.includes('axios')) {
              return 'http-vendor'
            }
            // Other vendors
            return 'vendor'
          }
          
          // Code splitting по разделам сайта
          if (id.includes('/components/site/sections/')) {
            return 'site-sections'
          }
          if (id.includes('/components/admin/')) {
            return 'admin-panel'
          }
          if (id.includes('/components/dashboard/')) {
            return 'dashboard'
          }
        },
        // Оптимизация имён файлов
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.')
          const ext = info?.[info.length - 1]
          
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp|avif/i.test(ext || '')) {
            return `assets/images/[name]-[hash][extname]`
          } else if (/woff|woff2|eot|ttf|otf/i.test(ext || '')) {
            return `assets/fonts/[name]-[hash][extname]`
          }
          return `assets/[ext]/[name]-[hash][extname]`
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    // Увеличиваем лимит для inline assets
    assetsInlineLimit: 4096, // 4KB
    // CSS code splitting
    cssCodeSplit: true,
    // Compression hints
    reportCompressedSize: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'lucide-react'],
    // Exclude heavy deps from optimization
    exclude: [],
  },
  // Preview server settings
  preview: {
    port: 4173,
    open: true,
  },
})
