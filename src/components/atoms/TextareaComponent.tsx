import { IonTextarea } from '@ionic/react'
import React, { FC } from 'react'

export interface ITextarea {
  value?: string
  rows?: number
  placeholder?: string
  onChange?: (v: string) => void
}

export const Textarea: FC<ITextarea> = ({ value, rows, placeholder, onChange }) => {
  return (
    <IonTextarea
      value={value}
      className='border-border px-3 leading-8'
      rows={rows}
      placeholder={placeholder}
      onIonChange={(e) => onChange && onChange(e.detail.value!)}
    ></IonTextarea>
  )
}
