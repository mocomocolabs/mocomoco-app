import { IonIcon, IonLabel } from '@ionic/react'
import React from 'react'

interface IMypageColumnItemPropTypes {
  icon: string
  title: string
  href?: string
}

export const MypageColumnItem: React.FC<IMypageColumnItemPropTypes> = ({ icon, title, href }) => {
  return (
    <div className='flex-row items-center height-50'>
      <IonIcon icon={icon} slot='start' />
      <IonLabel className='ml-4 text-xl'>{title}</IonLabel>
    </div>
  )
}
