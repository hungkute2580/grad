import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const varsPath  = path.resolve(__dirname, 'src/styles/variables').replace(/\\/g, '/')
const mixPath   = path.resolve(__dirname, 'src/styles/mixins').replace(/\\/g, '/')

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Inject variables + mixins into every component SCSS file
        // Skip the partials themselves to avoid circular imports
        additionalData: (content: string, filepath: string) => {
          if (/_variables|_mixins|_animations|main\.scss/.test(filepath)) {
            return content
          }
          return `@use "${varsPath}" as *;\n@use "${mixPath}" as *;\n${content}`
        },
      },
    },
  },
})
