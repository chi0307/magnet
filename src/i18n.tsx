import i18n, { type ResourceLanguage } from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en-US.json'
import jp from './locales/ja-JP.json'
import hk from './locales/zh-HK.json'
import tw from './locales/zh-TW.json'
import { defaultLocale, isLocale, type Locale } from './utils/locale'
import { localStorageManager } from './utils/StorageManager'

const resources: Record<Locale, { translation: ResourceLanguage }> = {
  'en-US': { translation: en },
  'ja-JP': { translation: jp },
  'zh-HK': { translation: hk },
  'zh-TW': { translation: tw },
}

const getBrowserLanguage = (): Locale => {
  const language = navigator.language
  return isLocale(language) ? language : defaultLocale
}

const savedLanguage = localStorageManager.get('locale')
const languageToUse: Locale = savedLanguage || getBrowserLanguage()

localStorageManager.set('locale', languageToUse)

const fallbackLng: Locale = 'en-US'
const initI18n = async (): Promise<void> => {
  await i18n.use(initReactI18next).init({
    resources,
    lng: languageToUse,
    fallbackLng,
    interpolation: {
      escapeValue: false,
    },
  })
}

void initI18n()

export default i18n
