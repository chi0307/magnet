import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useTranslation } from 'react-i18next'
import './App.css'
import { Locales, type Locale } from './utils/locale'
import { localStorageManager } from './utils/StorageManager'

function App(): JSX.Element {
  const { t, i18n } = useTranslation()
  const changeLanguage = (lng: Locale): void => {
    i18n
      .changeLanguage(lng)
      .then(() => {
        localStorageManager.set('locale', lng)
        console.log('Language changed successfully')
      })
      .catch((error) => {
        console.error('Error changing language:', error)
      })
  }
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
      <div>
        <h1>{t('general.welcome')}</h1>
        <button onClick={() => changeLanguage(Locales.EN_US)}>
          {t('language.en-us')}
        </button>
        <button onClick={() => changeLanguage(Locales.JA_JP)}>
          {t('language.ja-jp')}
        </button>
        <button onClick={() => changeLanguage(Locales.ZH_HK)}>
          {t('language.zh-hk')}
        </button>
        <button onClick={() => changeLanguage(Locales.ZH_TW)}>
          {t('language.zh-tw')}
        </button>
      </div>
    </>
  )
}

export default App
