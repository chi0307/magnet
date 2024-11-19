import path from 'path'

import UnpluginTypia from '@ryoppippi/unplugin-typia/vite'
import react from '@vitejs/plugin-react'
import presetUno from 'unocss/preset-uno'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

import { Route } from './src/router/route'

const input = Object.fromEntries([
  ['main', 'index.html'] as const,
  ...Object.values(Route)
    .filter((route) => route !== Route.Home)
    .map((route) => {
      const pageName = route.replace(/^\//, '')
      return [pageName, `${pageName}.html`] as const
    }),
])

// https://vitejs.dev/config/
export default defineConfig({
  base: '/magnet',
  build: {
    rollupOptions: {
      input,
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },
  plugins: [
    UnpluginTypia(),
    UnoCSS({
      presets: [presetUno()],
    }),
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
