import { IonRippleEffect } from '@ionic/react'
import { FC } from 'react'
import { Icon } from '../atoms/IconComponent'
import { TextLg } from '../atoms/TextLgComponent'

export interface IHomeTitle {
  title: string
  route?: () => void
}

export const HomeTitle: FC<IHomeTitle> = ({ title, route }) => {
  return (
    <div
      onClick={route ? route : () => {}}
      className={`flex-between-center py-4 ${route ? 'ion-activatable ripple-parent' : ''}`}
    >
      <IonRippleEffect></IonRippleEffect>
      <TextLg className='text-bold'>{title}</TextLg>
      {route && <Icon name='arrow' className='icon-rotate-180'></Icon>}
    </div>
  )
}
