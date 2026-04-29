import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
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
