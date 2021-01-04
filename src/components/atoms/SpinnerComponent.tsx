import { IonSpinner } from '@ionic/react'
import React, { FC } from 'react'

export interface ISpinnerComponent {
  isFull?: boolean
  color?: string
}

export const Spinner: FC<ISpinnerComponent> = ({ isFull, color = 'dark' }) => {
  return (
    <div className={isFull ? 'absolute-center' : ''}>
      <IonSpinner name='crescent' color={color} />
    </div>
  )
}
