import typia from 'typia'

export type Locale = (typeof locales)[number]

export const locales = ['en-US', 'ja-JP', 'zh-HK', 'zh-TW'] as const
export const defaultLocale: Locale = 'en-US'

export const isLocale = typia.createIs<Locale>()
