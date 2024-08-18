import UnpluginTypia from '@ryoppippi/unplugin-typia/vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import presetUno from 'unocss/preset-uno'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    UnpluginTypia(),
    UnoCSS({
      presets: [presetUno()],
    }),
    react(),
  ],
})
