import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // elérhető a belső hálózatról (0.0.0.0)
    ...(process.env.PORT ? { port: Number(process.env.PORT) } : {}),
  },
})
