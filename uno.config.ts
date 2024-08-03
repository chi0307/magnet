import {
  defineConfig,
  presetUno,
  presetAttributify,
  transformerVariantGroup,
} from 'unocss'
import type { Theme } from 'unocss/preset-mini'
import { Breakpoints } from './src/constant/breakpoint'

export default defineConfig<Theme>({
  presets: [
    presetUno(),
    presetAttributify(),
  ],
  theme: {
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