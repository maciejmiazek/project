import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/logowanie': 'http://localhost:3000',
      '/api/logout': 'http://localhost:3000',
      '/api/auth': 'http://localhost:3000',
      '/api/pracownicy': 'http://localhost:3000',
      '/api/maszyny': 'http://localhost:3000',
      '/api/planowanie': 'http://localhost:3000',
      '/api/magazyn': 'http://localhost:3000',
      '/api/finanse': 'http://localhost:3000',
    },
  },
})
