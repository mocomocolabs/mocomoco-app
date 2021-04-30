import { FC, TextareaHTMLAttributes } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import './TextareaComponent.scss'

// Omit 'ref', to fix below warning
// Warning: Function components cannot be given refs. Attempts to access this ref will fail.
export interface ITextarea extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'ref' | 'onChange'> {
  onChange?: (v: string) => void
  register?: UseFormRegisterReturn
}

export const Textarea: FC<ITextarea> = ({ onChange, register, ...props }) => {
  return (
    <textarea
      className='br-base border-gray leading-8 w-full px-4 py-3 text-base'
      onChange={(e) => onChange && onChange(e.target.value!)}
      {...props}
      {...register}
    ></textarea>
  )
}
