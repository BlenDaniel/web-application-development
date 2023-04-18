import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  clearScreen: false,
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    },
    output: {
      format: 'es',
      dir: 'dist',
    },
    emptyOutDir: false,
  },
  server: {
    host: 'localhost',
    port: 3000,
  },
  optimizeDeps: {
    include: ['jquery'],
  },
  plugins: [
    {
      name: 'copy-src',
      apply: 'build',
      async writeBundle() {
        const fse = require('fs-extra')
        await fse.copy('./src', './dist/src')
      },
    },
  ],
})
