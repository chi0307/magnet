import i18n, { type ResourceLanguage } from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '@/locales/en-US.json'
import jp from '@/locales/ja-JP.json'
import hk from '@/locales/zh-HK.json'
import tw from '@/locales/zh-TW.json'
import { type Locale, getLocale } from '@/utils/locale'
import { localStorageManager } from '@/utils/StorageManager'

const resources: Record<Locale, { translation: ResourceLanguage }> = {
  'en-US': { translation: en },
  'ja-JP': { translation: jp },
  'zh-HK': { translation: hk },
  'zh-TW': { translation: tw },
}
const locale = getLocale()
const fallbackLng: Locale = 'en-US'
const initI18n = async (): Promise<void> => {
  await i18n.use(initReactI18next).init({
    resources,
    lng: locale,
    fallbackLng,
    interpolation: {
      escapeValue: false,
    },
  })
}

localStorageManager.set('locale', locale)

void initI18n()

export default i18n
