import { IonIcon } from '@ionic/react'
import React from 'react'
import { TextXl } from '../atoms/TextXlComponent'

interface IMypageRowItem {
  icon: string
  title: string
}

export const MypageRowItem: React.FC<IMypageRowItem> = ({ icon, title }) => {
  return (
    <div className='flex-col items-center'>
      <IonIcon icon={icon} size='large' />
      <TextXl>{title}</TextXl>
    </div>
  )
}
