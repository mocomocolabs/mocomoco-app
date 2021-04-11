import { FC } from 'react'
import './TextareaComponent.scss'

export interface ITextarea {
  name?: string
  value?: string
  rows?: number
  placeholder?: string
  onChange?: (v: string) => void
  register?: any
}

export const Textarea: FC<ITextarea> = ({ name, value, rows, placeholder, onChange, register }) => {
  return (
    <textarea
      name={name}
      value={value}
      className='br-base border-gray leading-8 w-full px-4 py-3 text-base'
      rows={rows}
      placeholder={placeholder}
      onChange={(e) => onChange && onChange(e.target.value)}
      ref={register}
    ></textarea>
  )
}
