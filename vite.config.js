import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' makes all asset paths relative, so the build works on
// GitHub Pages no matter what the repository is called.
export default defineConfig({
  plugins: [react()],
  base: './',
})
