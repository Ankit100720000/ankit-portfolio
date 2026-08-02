import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: './',
  plugins: [tailwindcss(), react()],
  // GSAP's optional plugin modules can retain stale optimized-dependency URLs
  // during hot reloads. Let Vite transform them directly in development.
  optimizeDeps: {
    exclude: ['gsap', 'gsap/ScrollTrigger'],
  },
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes('node_modules/three') ||
            id.includes('@react-three') ||
            id.includes('@react-spring') ||
            id.includes('/drei/')
          ) {
            return 'three-vendor'
          }

          if (id.includes('framer-motion')) {
            return 'motion-vendor'
          }

          if (id.includes('gsap') || id.includes('lenis')) {
            return 'scroll-vendor'
          }
        },
      },
    },
  },
})
