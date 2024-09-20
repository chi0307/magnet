import {
  defineConfig,
  presetUno,
  presetAttributify,
  transformerVariantGroup,
} from 'unocss'
import type { Theme } from 'unocss/preset-mini'

import { Breakpoints } from './src/constant/breakpoint'

export default defineConfig<Theme>({
  presets: [presetUno(), presetAttributify()],
  theme: {
    breakpoints: {
      md: `${Breakpoints.md}px`,
      lg: `${Breakpoints.lg}px`,
      xl: `${Breakpoints.xl}px`,
    },
  },
  shortcuts: [
    {
      'text-bold-md': 'font-medium',
      'text-bold-lg': 'font-bold',
      'z-low': 'z-100',
      'z-medium': 'z-200',
      'z-high': 'z-300',
    },
    [/^(flex|grid)-center/g, (): string => 'justify-center items-center'],
  ],
  transformers: [transformerVariantGroup()],
})
