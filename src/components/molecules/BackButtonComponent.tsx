import { IonIcon } from '@ionic/react'
import { closeOutline } from 'ionicons/icons'
import React, { FC } from 'react'
import { useHistory } from 'react-router'

export interface IBackButton {
  icon?: string
}

export const BackButton: FC<IBackButton> = ({ icon = closeOutline }) => {
  const history = useHistory()

  return (
    <div onClick={() => history.goBack()}>
      <IonIcon icon={icon} size='large'></IonIcon>
    </div>
  )
}
