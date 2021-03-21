import { FC } from 'react'
import './TextareaComponent.scss'

export interface ITextarea {
  value?: string
  rows?: number
  placeholder?: string
  onChange?: (v: string) => void
}

export const Textarea: FC<ITextarea> = ({ value, rows, placeholder, onChange }) => {
  return (
    <textarea
      value={value}
      className='br-base border-gray leading-8 w-full px-4 py-3 text-base'
      rows={rows}
      placeholder={placeholder}
      onChange={(e) => onChange && onChange(e.target.value)}
    ></textarea>
  )
}
