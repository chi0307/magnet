import {
  defineConfig,
  presetUno,
  presetAttributify,
  transformerVariantGroup,
} from 'unocss'
import type { Theme } from 'unocss/preset-mini'
import { Breakpoints } from './src/constant/breakpoint'

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
  },
  transformers: [
    transformerVariantGroup(),
  ],
})