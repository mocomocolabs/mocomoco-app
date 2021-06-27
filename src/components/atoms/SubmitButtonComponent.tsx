import { FC } from 'react'
import { TextLg } from './TextLgComponent'

type Color = 'primary' | 'gray' | 'secondary'

export interface ISubmitButton {
  text: string
  color?: Color
  disabled?: boolean
  onClick?: () => void
  className?: string
}

export const SubmitButton: FC<ISubmitButton> = ({
  text,
  disabled = false,
  color = 'primary',
  className = '',
  onClick,
}) => {
  const getTextColor = (color: Color) => {
    switch (color) {
      case 'primary':
        return 'd-gray'
      case 'secondary':
      case 'gray':
        return 'white'
    }
  }

  return (
    <button
      type='submit'
      className={`shadow w-full height-56 br-28 ${disabled ? 'bg-gray' : `bg-${color}`} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      <TextLg className={`white text-bold ${getTextColor(color)}`}>{text}</TextLg>
    </button>
  )
}
