import { FC } from 'react'
import { IInput, Input } from './InputComponent'
import './InputComponent.scss'

export const InputNormal: FC<IInput> = ({ className, ...props }) => {
  return <Input {...props} className={`inputnormal ${className}`}></Input>
}
