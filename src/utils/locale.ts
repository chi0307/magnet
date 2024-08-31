import typia from 'typia'
import { localStorageManager } from "./StorageManager"

export type Locale = (typeof locales)[number]

export const locales = ['en-US', 'ja-JP', 'zh-HK', 'zh-TW'] as const
export const defaultLocale: Locale = 'en-US'

export const isLocale = typia.createIs<Locale>()

export function getBrowserLanguage(): Locale {
  const language = navigator.language
  return isLocale(language) ? language : defaultLocale
}

export function getLocale(): Locale {
  return localStorageManager.get('locale') ?? getBrowserLanguage()
}
