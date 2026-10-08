import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
export default defineConfig({
  plugins: [{ name: 'unit-test-no-css', enforce: 'pre', transform(source, id) { if (id.endsWith('.vue')) return source.replace(/<style[\s\S]*?<\/style>/g, '') } }, vue()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  css: { preprocessorOptions: { scss: { additionalData: '@import "@/assets/scss/helpers/_variables.scss";' } } },
  test: { environment: 'jsdom', include: ['tests/**/*.test.js'], clearMocks: true },
})
