import i18n, { type ResourceLanguage } from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en-US.json'
import jp from './locales/ja-JP.json'
import hk from './locales/zh-HK.json'
import tw from './locales/zh-TW.json'
import { defaultLocale, Locales, isLocale, type Locale } from './utils/locale'
import { localStorageManager } from './utils/StorageManager'

const resources: Record<Locales, { translation: ResourceLanguage }> = {
  [Locales.EN_US]: { translation: en },
  [Locales.JA_JP]: { translation: jp },
  [Locales.ZH_HK]: { translation: hk },
  [Locales.ZH_TW]: { translation: tw },
}

const getBrowserLanguage = (): Locale => {
  const language = navigator.language
  return isLocale(language) ? language : defaultLocale
}

const savedLanguage = localStorageManager.get('locale')
const languageToUse: Locale = savedLanguage || getBrowserLanguage()

localStorageManager.set('locale', languageToUse)

const initI18n = async (): Promise<void> => {
  await i18n.use(initReactI18next).init({
    resources,
    lng: languageToUse,
    fallbackLng: Locales.EN_US,
    interpolation: {
      escapeValue: false,
    },
  })
}

void initI18n()

export default i18n
