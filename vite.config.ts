import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/malung/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(process.cwd(), 'index.html'),
        attendees: resolve(process.cwd(), 'attendees.html'),
        archive2024: resolve(process.cwd(), 'archive-2024.html'),
      },
    },
  },
})
