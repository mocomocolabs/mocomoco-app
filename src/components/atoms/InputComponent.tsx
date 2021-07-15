import { FC, InputHTMLAttributes } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import './InputComponent.scss'

// Omit 'ref', to fix below warning
// Warning: Function components cannot be given refs. Attempts to access this ref will fail.
export interface IInput extends Omit<InputHTMLAttributes<HTMLInputElement>, 'ref' | 'onChange'> {
  className?: string
  onChange?: (v: string) => void
  register?: UseFormRegisterReturn
}

export const Input: FC<IInput> = ({ type, onChange, register, ...props }) => {
  return (
    <input
      type={type || 'text'}
      onChange={(e) => onChange && onChange(e.target.value!)}
      {...props}
      {...register}
    ></input>
  )
}
