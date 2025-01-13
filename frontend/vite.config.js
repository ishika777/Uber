import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
<<<<<<< HEAD
    build: {
        chunkSizeWarningLimit: 1000, // Set the limit to 1000 KB (1 MB)
      },
=======
  build: {
    chunkSizeWarningLimit: 1000, // Set the limit to 1000 KB (1 MB)
  },
>>>>>>> 296a04dee01447c41c9350cebbc9f035683f20c9
  plugins: [react()],
})
