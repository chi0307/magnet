import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import tw from './locales/zh-TW.json'
import hk from './locales/zh-HK.json'
import ja from './locales/ja.json'

const initI18n = async (): Promise<void> => {
  await i18n.use(initReactI18next).init({
    resources: {
      en: {
        translation: en,
      },
      tw: {
        translation: tw,
      },
      hk: {
        translation: hk,
      },
      ja: {
        translation: ja,
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })
}

void initI18n()

export default i18n
