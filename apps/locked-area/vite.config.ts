import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/locked-area/',
  server: {
    port: 5174,
  },
  build: {
    // outDir removed – defaults to 'dist' (Cloudflare expects this)
  },
})