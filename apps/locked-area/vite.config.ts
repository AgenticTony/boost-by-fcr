import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/locked-area/', // 👈 THIS is the magic line
  server: {
    port: 5174,
  },
  build: {
    outDir: '../../dist/locked-area', // 👈 Builds into the root 'dist/locked-area' folder
  },
})