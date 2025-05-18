import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/CCIS_CONNECT/', 
  plugins: [react()],
  historyApiFallback: true, // Add this line
})
