import { IonFab, IonFabButton } from '@ionic/react'
import React, { FC } from 'react'
import { route } from '../../services/route-service'
import { BackButton } from './BackButtonComponent'
import './BackFloatingButtonComponent.scss'

interface IBackFloatingButton {
  action?: () => void
}

export const BackFloatingButton: FC<IBackFloatingButton> = ({ action }) => {
  const defaultAction = () => route.goBack()

  return (
    <>
      <IonFab
        className='top-0-safe-area'
        vertical='top'
        horizontal='start'
        slot='fixed'
        onClick={action ?? defaultAction}
      >
        <IonFabButton routerDirection='back'>
          <BackButton type='arrow'></BackButton>
        </IonFabButton>
      </IonFab>
    </>
  )
}
