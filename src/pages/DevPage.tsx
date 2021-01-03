import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react'
import React from 'react'
import { useStore } from '../hooks/use-store'

export const DevPage: React.FC = () => {
  const { $ui } = useStore()

  useIonViewWillEnter(() => {
    $ui.setIsBottomTab(true)
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dev</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent></IonContent>
    </IonPage>
  )
}
