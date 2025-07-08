import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      strict: false
    }
  },
  build: {
    outDir: 'dist'
  },
  preview: {
    port: 4173,
    strictPort: true
  }
})
