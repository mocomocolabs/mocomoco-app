import { FC } from 'react'
import { TextLg } from './TextLgComponent'

export interface ISubmitButton {
  text: string
  disabled?: boolean
  onClick?: () => void
  className?: string
}

export const SubmitButton: FC<ISubmitButton> = ({ text, disabled = false, className = '', onClick }) => {
  return (
    <button
      type='submit'
      className={`w-full h-10 br-28 ${disabled ? '' : 'bg-yellow'} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      <TextLg className='white text-bold'>{text}</TextLg>
    </button>
  )
}
