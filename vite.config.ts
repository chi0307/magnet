import path from 'path'

import UnpluginTypia from '@ryoppippi/unplugin-typia/vite'
import react from '@vitejs/plugin-react'
import presetUno from 'unocss/preset-uno'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
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
