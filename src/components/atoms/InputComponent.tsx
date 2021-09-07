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
      {...props}
      {...register}
      // onChange를 custom하게 사용할 것이므로, register 보다 늦게 설정해서
      // register.onChange를 덮어써야(overwrite)해야 한다.
      onChange={(e) => {
        register?.onChange(e)
        onChange && onChange(e.target.value!)
      }}
    />
  )
}
