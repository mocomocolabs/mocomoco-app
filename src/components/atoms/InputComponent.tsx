import { IonInput } from '@ionic/react'
import React, { FC } from 'react'

export interface IInput {
  placeholder?: string
}

export const Input: FC<IInput> = ({ placeholder }) => {
  return (
    <div className='border-border px-3'>
      <IonInput placeholder={placeholder}></IonInput>
    </div>
  )
}
