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
      className='w-full px-3 py-4'
      onChange={(e) => onChange && onChange(e.target.value!)}
      {...props}
      {...register}
    ></textarea>
  )
}
