import { IonSpinner } from '@ionic/react'
import React, { FC } from 'react'

export interface ISpinnerComponent {
  isFull?: boolean
}

export const Spinner: FC<ISpinnerComponent> = ({ isFull }) => {
  return (
    <div className={isFull ? 'absolute-center' : ''}>
      <IonSpinner name='crescent' color='dark' />
    </div>
  )
}
