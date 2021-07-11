import { FC } from 'react'
import { IInput, Input } from './InputComponent'

export const InputNormal: FC<IInput> = ({ className, ...props }) => {
  return <Input {...props} className={`w-full px-3 py-3 text-sm ${className}`}></Input>
}
