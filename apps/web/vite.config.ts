import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vite'
import { qrcode } from 'vite-plugin-qrcode'

export default defineConfig({
  plugins: [tailwindcss(), tanstackRouter({}), react(), qrcode()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
