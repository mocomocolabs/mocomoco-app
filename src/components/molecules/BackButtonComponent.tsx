import { IonIcon } from '@ionic/react'
import { closeOutline } from 'ionicons/icons'
import React, { FC } from 'react'
import { useHistory } from 'react-router'

export interface IBackButton {}

export const BackButton: FC<IBackButton> = () => {
  const history = useHistory()
  return (
    <div onClick={() => history.goBack()}>
      <IonIcon icon={closeOutline} size='large'></IonIcon>
    </div>
  )
}
