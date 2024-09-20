import React from 'react'

interface SignInButtonProps {
  color: string
  icon: React.ReactNode
  text: string
  onClick: () => void
  className?: string
}

const SignInButton = ({
  color,
  icon,
  text,
  onClick,
  className = '',
}: SignInButtonProps): JSX.Element => {
  return (
    <button
      className={`px-6 py-2 min-w-40 rounded-5 text-white text-bold-lg ${className}`}
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      <div className='mx-auto flex flex-center gap-2'>
        <div>{icon}</div>
        <span className='min-w-45'>{text}</span>
      </div>
    </button>
  )
}

export default SignInButton
