import { FC } from 'react'
import { IInput, Input } from './InputComponent'

export const InputNormal: FC<IInput> = (props) => {
  return (
    <div className=''>
      <Input {...props} className='w-full px-4 mb-4 py-3 br-base border-gray'></Input>
    </div>
  )
}
