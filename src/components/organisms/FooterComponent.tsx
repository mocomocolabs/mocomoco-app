import { IonFooter } from '@ionic/react'
import React, { FC } from 'react'

export interface IFooter {
  children?: React.ReactNode
}

export const Footer: FC<IFooter> = ({ children }) => {
  return (
    <IonFooter className='px-container shadow-sm'>
      <div className='flex-between-center min-height-56 w-full'>{children}</div>
    </IonFooter>
  )
}
