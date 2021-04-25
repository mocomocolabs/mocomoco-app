import { FC } from 'react'
import { route } from '../../services/route-service'
import { Icon } from '../atoms/IconComponent'

export interface IBackButton {
  icon?: string
  action?: () => void
  type: 'close' | 'arrow'
}

export const BackButton: FC<IBackButton> = ({ type, action }) => {
  const defaultAction = () => route.goBack()

  return (
    <div
      className='flex'
      onClick={(e) => {
        e.stopPropagation()
        action ? action() : defaultAction()
      }}
    >
      <Icon name={type === 'close' ? 'close' : 'back-arrow'}></Icon>
    </div>
  )
}
