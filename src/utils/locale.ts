export type Locale = (typeof locales)[number]

export const locales = ['en', 'zh-HK', 'zh-TW'] as const
export const defaultLocale: Locale = 'en'

export function isLocale(input: unknown): input is Locale {
  const list: readonly string[] = locales
  return typeof input === 'string' && list.includes(input)
}
