import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],

  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './src/vitest.setup.js',
    deps: {
      optimizer: {
        web: {
          include: ['html-encoding-sniffer']
        }
      }
    },
    server: {
      deps: {
        inline: [/html-encoding-sniffer/, /@exodus\/bytes/],
      },
    },

  },
})
