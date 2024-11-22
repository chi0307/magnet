import { getBrowserLanguage, type Locale } from '@/utils/locale'
import { localStorageManager } from '@/utils/StorageManager'

const currencyMap = {
  'en-US': 'USD',
  'ja-JP': 'JPY',
  'zh-HK': 'HKD',
  'zh-TW': 'TWD',
} as const satisfies Record<Locale, string>
export type Currency = (typeof currencyMap)[keyof typeof currencyMap]

export function initializeCurrency(): void {
  localStorageManager.set('currency', getCurrency())
}

export function getCurrency(): Currency {
  return localStorageManager.get('currency') ?? currencyMap[getBrowserLanguage()]
}
