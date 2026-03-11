import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use '@/assets/variables' as *;`,
      },
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    watch: {
      usePolling: true, // ← fixes WSL file watching
    },
  },
})
