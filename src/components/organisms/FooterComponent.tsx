import { IonFooter } from '@ionic/react'
import React, { FC } from 'react'
import './HeaderComponent.scss'

export interface IFooter {
  children?: React.ReactNode
}

export const Footer: FC<IFooter> = ({ children }) => {
  return (
    <IonFooter className='shadow-sm'>
      <div className='my-2'>{children}</div>
    </IonFooter>
  )
}
