import SignInButton from '../components/SignInButton'
import { FaFacebookF, FaGoogle, FaApple, FaUser, FaLine } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

const SignInPage = (): JSX.Element => {
  const { t } = useTranslation()

  return (
    <div className='mx-auto h-100dvh flex items-center flex-col'>
      <p className='mt-15 px-5 text-(8 bold)'>{t('general.welcome')}</p>
      <img src='https://fakeimg.pl/400/' alt='Logo' className='mt-8 max-w-50' />
      <div className='mt-20 flex flex-center flex-col gap-3'>
        <SignInButton
          color='#4267B2'
          icon={<FaFacebookF />}
          text={t('sign-in.facebook')}
        />
        <SignInButton
          color='#DB4437'
          icon={<FaGoogle />}
          text={t('sign-in.google')}
        />
        <SignInButton
          color='#4BC764'
          icon={<FaLine />}
          text={t('sign-in.line')}
        />
        <SignInButton
          color='#000000'
          icon={<FaApple />}
          text={t('sign-in.apple')}
        />
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
