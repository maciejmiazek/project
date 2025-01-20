import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://buildplan.online:3000', // Proxy dla backendu
      '/api/pracownicy': 'https://buildplan.online:3000',
    },
  },
})
