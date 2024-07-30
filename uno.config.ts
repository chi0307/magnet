import {
  defineConfig,
  presetUno,
  presetAttributify
} from 'unocss'
import { Breakpoints } from './src/constant/breakpoint'
import type { Theme } from '@unocss/preset-mini'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
  ],
  theme: <Theme>{
    breakpoints: {
      md: `${Breakpoints.md}px`,
      lg: `${Breakpoints.lg}px`,
      xl: `${Breakpoints.xl}px`,
    },
  }
})