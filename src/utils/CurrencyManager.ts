import { getBrowserLanguage, type Locale } from "./locale";
import { currencyStorageManager } from "./StorageManager";

const currencyMap: Record<Locale, string> = {
  'en-US': 'USD',
  'ja-JP': 'JPY',
  'zh-HK': 'HKD',
  'zh-TW': 'TWD',
}

export function initializeCurrency(): void {
  currencyStorageManager.set('currency', getCurrency())
}

export function getCurrency(): string {
  return currencyStorageManager.get('currency') ?? currencyMap[getBrowserLanguage()]
}