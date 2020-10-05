import { IonIcon, IonLabel } from '@ionic/react'
import React from 'react'
import { Link } from 'react-router-dom'

interface IMypageColumnItem {
  icon: string
  title: string
  href: string
}

export const MypageColumnItem: React.FC<IMypageColumnItem> = ({ icon, title, href }) => {
  return (
    <Link to={href} className='no-underline black'>
      <div className='flex-row w-100 items-center height-50'>
        <IonIcon icon={icon} slot='start' />
        <IonLabel className='ml-4 text-xl'>{title}</IonLabel>
      </div>
    </Link>
  )
}
