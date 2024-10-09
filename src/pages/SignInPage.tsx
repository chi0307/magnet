import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FaFacebookF, FaGoogle, FaApple, FaUser, FaLine } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

import SignInButton from '@/components/SignInButton'
import { signInOrRegisterUser } from '@/services/User'
import { initializeCurrency } from '@/utils/CurrencyManager'
import { localStorageManager } from '@/utils/StorageManager'

const SignInPage = (): JSX.Element => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const buttons: Omit<Parameters<typeof SignInButton>[0], 'onClick'>[] = [
    { color: '#4267B2', icon: <FaFacebookF />, text: 'facebook' },
    { color: '#DB4437', icon: <FaGoogle />, text: 'google' },
    { color: '#4BC764', icon: <FaLine />, text: 'line' },
    { color: '#000000', icon: <FaApple />, text: 'apple' },
  ]

  const handleRegisterUser = async (service: string): Promise<void> => {
    console.info('logging service is ', service)

    // mock sso user data
    const userData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
    }

    try {
      const userId = await signInOrRegisterUser(userData)
      localStorageManager.set('userId', userId)
      navigate('/magnet/ledger')
    } catch {
      console.error('register fail')
    }
  }

  useEffect(() => {
    initializeCurrency()
  }, [])

  return (
    <div className='mx-auto max-w-107.5 max-h-100dvh flex items-center flex-col'>
      <p className='mt-15 px-5 text-(8 bold-lg)'>{t('general.welcome')}</p>
      <img src='https://fakeimg.pl/400/' alt='Logo' className='mt-8 max-w-50' />
      <div className='mt-20 flex flex-center flex-col gap-4'>
        {buttons.map((button, index) => (
          <SignInButton
            key={index}
            color={button.color}
            icon={button.icon}
            text={t(`sign-in.${button.text}`)}
            onClick={() => {
              handleRegisterUser(button.text).catch((error) => {
                console.error('Error during user registration:', error)
              })
            }}
          />
        ))}
        <span className='text-4'>-</span>
        <SignInButton
          color='#9E9E9E'
          icon={<FaUser />}
          text={t('sign-in.guest')}
          onClick={() => {
            handleRegisterUser('guest').catch((error) => {
              console.error('Error during user registration:', error)
            })
          }}
        />
      </div>
    </div>
  )
}

export default SignInPage
