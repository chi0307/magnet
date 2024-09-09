import React from 'react'
import { localStorageManager } from '../utils/StorageManager'

interface SignInButtonProps {
  color: string
  icon: React.ReactNode
  text: string
  className?: string
}

const SignInButton = ({
  color,
  icon,
  text,
  className = '',
}: SignInButtonProps): JSX.Element => {
  const handleClick = (method: string): void => {
    localStorageManager.set('loginMethod', method)
    window.location.reload()
  }

  return (
    <button
      className={`px-6 py-2 min-w-40 rounded-5 text-white text-bold-lg ${className}`}
      style={{ backgroundColor: color }}
      onClick={() => handleClick(text)}
    >
      <div className='mx-auto flex flex-center gap-2'>
        <div>{icon}</div>
        <span className='min-w-45'>{text}</span>
      </div>
    </button>
  )
}

export default SignInButton
