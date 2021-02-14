import { FC } from 'react'

export interface IInput {
  className?: string
  name?: string
  type?: string
  value?: string
  defaultValue?: string
  placeholder?: string
  onChange?: (v: string) => void
  // eslint-disable-next-line
  register?: any
}

export const Input: FC<IInput> = ({
  className,
  name,
  type,
  value,
  defaultValue,
  placeholder,
  onChange,
  register,
}) => {
  return (
    <input
      className={className}
      type={type || 'text'}
      name={name}
      value={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
      onChange={(e) => onChange && onChange(e.target.value!)}
      ref={register}
    ></input>
  )
}
