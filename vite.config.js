import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // Production (GitHub Pages) is served from /Movie/; local dev stays at
  // root so `npm run dev` URLs are unaffected. vite-plugin-pwa reads this
  // value automatically and rewrites the manifest, service worker scope,
  // and icon URLs to match: https://jershikaa17-code.github.io/Movie/
  base: command === 'build' ? '/Movie/' : '/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      devOptions: {
        enabled: false, // keep the service worker out of `npm run dev`
      },
      manifest: {
        name: 'Velora',
        short_name: 'Velora',
        description:
          'Discover movies, explore trending titles, and find your next favorite film.',
        theme_color: '#0a0a0a',
        background_color: '#0a0a0a',
        display: 'standalone',
        start_url: '.',
        scope: '.',
        icons: [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png',
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        // App shell (JS/CSS/HTML/icons) — precached for offline load.
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
        runtimeCaching: [
          {
            // TMDB API responses: always prefer the network so movie data
            // never goes stale; only fall back to cache when offline.
            urlPattern: ({ url }) => url.hostname === 'api.themoviedb.org',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'tmdb-api-cache',
              networkTimeoutSeconds: 8,
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 5 * 60, // 5 minutes
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            // TMDB posters/backdrops are immutable per path — safe to cache
            // aggressively for a fast, offline-friendly app shell.
            urlPattern: ({ url }) => url.hostname === 'image.tmdb.org',
            handler: 'CacheFirst',
            options: {
              cacheName: 'tmdb-image-cache',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
}))
