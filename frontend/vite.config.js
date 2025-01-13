import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    build: {
        chunkSizeWarningLimit: 1000, // Set the limit to 1000 KB (1 MB)
      },
  plugins: [react()],
})
