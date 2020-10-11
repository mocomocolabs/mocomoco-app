import { IonInput } from '@ionic/react'
import React, { FC } from 'react'

export interface IInput {
  value?: string
  placeholder?: string
  onChange?: (v: string) => void
}

export const Input: FC<IInput> = ({ value, placeholder, onChange }) => {
  return (
    <div className='border-border px-3'>
      <IonInput
        value={value}
        placeholder={placeholder}
        onIonChange={(e) => onChange && onChange(e.detail.value!)}
      ></IonInput>
    </div>
  )
}
