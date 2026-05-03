import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/',
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
        'consumer-ordering-flow': path.resolve(__dirname, 'pages/consumer-ordering-flow/index.html'),
        'homepage-standalone': path.resolve(__dirname, 'pages/homepage-standalone/index.html'),
        'store-page-standalone': path.resolve(__dirname, 'pages/store-page-standalone/index.html'),
        'store-page-copy': path.resolve(__dirname, 'pages/store-page-copy/index.html'),
        'reviews-feed': path.resolve(__dirname, 'pages/reviews-feed/index.html'),
        'post-checkout-standalone': path.resolve(__dirname, 'pages/post-checkout-standalone/index.html'),
        'search-results': path.resolve(__dirname, 'pages/search-results/index.html'),
        'cart-sheet': path.resolve(__dirname, 'pages/cart-sheet/index.html'),
        'store-page-prism': path.resolve(__dirname, 'pages/store-page-prism/index.html'),
        'ratings-and-reviews': path.resolve(__dirname, 'pages/ratings-and-reviews/index.html'),
        'review-halfsheet': path.resolve(__dirname, 'pages/review-halfsheet/index.html'),
        'media-gallery': path.resolve(__dirname, 'pages/media-gallery/index.html'),
        'item-page': path.resolve(__dirname, 'pages/item-page/index.html'),
        'homepage-prism': path.resolve(__dirname, 'pages/homepage-prism/index.html'),
        'prototypes': path.resolve(__dirname, 'prototypes/index.html'),
        'masumi-social-feed-v01': path.resolve(__dirname, 'prototypes/masumi-social-feed-v01/index.html'),
        'wesley-reorder-v2': path.resolve(__dirname, 'prototypes/wesley-reorder-v2/index.html'),
        'reorder-favorite-filters': path.resolve(__dirname, 'prototypes/reorder-favorite-filters/index.html'),
        'reviews-insights-carousel': path.resolve(__dirname, 'prototypes/reviews-insights-carousel/index.html'),
        'get-started-v2': path.resolve(__dirname, 'pages/get-started-v2/index.html'),
      },
    },
  },
  server: {
    proxy: {
      // Forward /api/* to the Python store server (scripts/serve_stores.py)
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})
