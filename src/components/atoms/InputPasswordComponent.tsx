import { IonIcon } from '@ionic/react'
import { eyeOff, eyeOutline } from 'ionicons/icons'
import React, { FC, useState } from 'react'
import { IInput, Input } from './InputComponent'

export const InputPassword: FC<IInput> = (props) => {
  const [showsPassword, setShowsPassword] = useState(false)

  return (
    <div className='relative'>
      <Input {...props} className='w-full h-10 my-1' type={showsPassword ? 'text' : 'password'}></Input>
      <IonIcon
        onClick={() => setShowsPassword(!showsPassword)}
        icon={showsPassword ? eyeOff : eyeOutline}
        className='absolute-vertical-center right-0 pr-2'
      ></IonIcon>
    </div>
  )
}
