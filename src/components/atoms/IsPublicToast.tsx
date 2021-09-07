import { IonToast } from '@ionic/react'
import { FC } from 'react'
import './IsPublicToast.scss'

export interface IIsPublicToast {
  isOpen?: boolean
}

export const IsPublicToast: FC<IIsPublicToast> = ({ isOpen = true }) => {
  return (
    <IonToast
      cssClass='is-public-toast'
      isOpen={isOpen}
      message='더 많은 사람들과 나누고 싶다면 모든 마을에 보이기를 선택해보세요!'
      duration={3000}
    />
  )
}
