import { IonHeader, IonToolbar } from '@ionic/react'
import React, { FC } from 'react'
import './HeaderComponent.scss'

export interface IHeader {
  children?: React.ReactNode
}

export const Header: FC<IHeader> = ({ children }) => {
  return (
    <IonHeader>
      <IonToolbar className='height-full'>{children}</IonToolbar>
    </IonHeader>
  )
}
