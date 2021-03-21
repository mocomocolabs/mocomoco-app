import { arrowBackOutline } from 'ionicons/icons'
import { FC } from 'react'
import { route } from '../../services/route-service'
import { Icon } from '../atoms/IconComponent'

export interface IBackButton {
  icon?: string
  action?: () => void
}

export const BackButton: FC<IBackButton> = ({ icon = arrowBackOutline, action }) => {
  const defaultAction = () => route.goBack()

  return (
    <div className='flex' onClick={action ?? defaultAction}>
      <Icon name='close'></Icon>
    </div>
  )
}
