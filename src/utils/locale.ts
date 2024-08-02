export type Locale = (typeof locales)[number]

export const locales = ['en-US', 'ja-JP', 'zh-HK', 'zh-TW'] as const
export const defaultLocale: Locale = 'en-US'

export function isLocale(input: unknown): input is Locale {
  const list: readonly string[] = locales
  return typeof input === 'string' && list.includes(input)
}

export enum Locales {
  EN_US = 'en-US',
  JA_JP = 'ja-JP',
  ZH_HK = 'zh-HK',
  ZH_TW = 'zh-TW',
}
