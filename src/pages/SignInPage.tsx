import SignInButton from '../components/SignInButton'
import { FaFacebookF, FaGoogle, FaApple, FaUser, FaLine } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

const SignInPage = (): JSX.Element => {
  const { t } = useTranslation()
  const buttons: Parameters<typeof SignInButton>[0][] = [
    { color: '#4267B2', icon: <FaFacebookF />, text: t('sign-in.facebook') },
    { color: '#DB4437', icon: <FaGoogle />, text: t('sign-in.google') },
    { color: '#4BC764', icon: <FaLine />, text: t('sign-in.line') },
    { color: '#000000', icon: <FaApple />, text: t('sign-in.apple') },
  ]

  return (
    <div className='mx-auto max-w-192 max-h-100dvh flex items-center flex-col'>
      <p className='mt-15 px-5 text-(8 bold-lg)'>{t('general.welcome')}</p>
      <img src='https://fakeimg.pl/400/' alt='Logo' className='mt-8 max-w-50' />
      <div className='mt-20 flex flex-center flex-col gap-4'>
        {buttons.map((button, index) => (
          <SignInButton
            key={index}
            color={button.color}
            icon={button.icon}
            text={button.text}
          />
        ))}
        <span className='text-4'>-</span>
        <SignInButton
          color='#9E9E9E'
          icon={<FaUser />}
          text={t('sign-in.guest')}
        />
      </div>
    </div>
  )
}

export default SignInPage
