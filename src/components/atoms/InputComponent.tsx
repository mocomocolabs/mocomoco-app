import React, { FC } from 'react'

export interface IInput {
  name?: string
  type?: string
  value?: string
  defaultValue?: string
  placeholder?: string
  onChange?: (v: string) => void
  // eslint-disable-next-line
  register?: any
}

export const Input: FC<IInput> = ({ name, type, value, defaultValue, placeholder, onChange, register }) => {
  return (
    <div className='border-border px-3'>
      <input
        type={type || 'text'}
        name={name}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={(e) => onChange && onChange(e.target.value!)}
        ref={register}
      ></input>
    </div>
  )
}
