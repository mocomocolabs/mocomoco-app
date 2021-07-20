import { FC } from 'react'
import { TextLg } from './TextLgComponent'

type Color = 'primary' | 'gray' | 'secondary'

export interface ISubmitButton {
  text: string
  color?: Color
  disabled?: boolean
  onClick?: () => void
  className?: string
  size?: 'medium' | 'large'
}

export const SubmitButton: FC<ISubmitButton> = ({
  text,
  disabled = false,
  color = 'primary',
  className = '',
  onClick,
  size = 'medium',
}) => {
  const getTextColor = (color: Color) => {
    switch (color) {
      case 'primary':
        return 'textprimary'
      case 'secondary':
      case 'gray':
        return 'white'
    }
  }

  return (
    <button
      type='submit'
      className={`shadow w-full height-${size === 'large' ? '56' : '40'} br-28 ${
        disabled ? 'bg-disabled' : `bg-${color}`
      } ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      <TextLg className={`text-bold ${disabled ? 'white' : getTextColor(color)}`}>{text}</TextLg>
    </button>
  )
}
