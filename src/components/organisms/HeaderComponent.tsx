import { IonHeader, IonToolbar } from '@ionic/react'
import React, { FC } from 'react'

export interface IHeader {
  children?: React.ReactNode
}

export const Header: FC<IHeader> = ({ children }) => {
  return (
    <IonHeader>
      <IonToolbar>{children}</IonToolbar>
    </IonHeader>
  )
}
