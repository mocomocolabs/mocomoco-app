import { FC, useState } from 'react'
import { Icon } from './IconComponent'
import { IInput, Input } from './InputComponent'

export const InputPassword: FC<IInput> = (props) => {
  const [showsPassword, setShowsPassword] = useState(false)

  return (
    <div className='relative'>
      <Input
        {...props}
        className='w-full px-3 py-1 text-sm'
        type={showsPassword ? 'text' : 'password'}
      ></Input>
      <Icon
        onClick={() => setShowsPassword(!showsPassword)}
        name={showsPassword ? 'eyeOff' : 'eyeOn'}
        className='absolute-vertical-center right-0 mr-2 icon-primary'
      ></Icon>
    </div>
  )
}
