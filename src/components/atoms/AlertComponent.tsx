import { IonAlert } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import React, { FC } from 'react'
import { useStore } from '../../hooks/use-store'

export const Alert: FC = () => {
  const { $ui } = useStore()

  return useObserver(() => (
    <IonAlert
      isOpen={$ui.alert.isOpen}
      onDidDismiss={() => $ui.hideAlert()}
      header={$ui.alert.header}
      message={$ui.alert.message}
      buttons={[
        {
          text: '취소',
          role: 'cancel',
          handler: $ui.alert.onFail,
        },
        {
          text: '확인',
          handler: $ui.alert.onSuccess,
        },
      ]}
    ></IonAlert>
  ))
}
