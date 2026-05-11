import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Vercel sets VERCEL=1 at build time. Pages serves from a subpath
// (/studio-frontdoor-starter-dough/), Vercel serves from /.
const isVercel = !!process.env.VERCEL

export default defineConfig({
  plugins: [react()],
  base: isVercel ? '/' : '/studio-frontdoor-starter-dough/',
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@assets': path.resolve(__dirname, 'assets'),
    },
  },
  build: {
    outDir: 'docs',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        'homepage-standalone': path.resolve(__dirname, 'pages/homepage-standalone/index.html'),
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})
