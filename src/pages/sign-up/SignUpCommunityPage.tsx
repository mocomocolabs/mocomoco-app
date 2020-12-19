import { IonContent, IonHeader, IonPage, IonToolbar, useIonViewWillEnter } from '@ionic/react'
import React from 'react'
import { BackButton } from '../../components/molecules/BackButtonComponent'
import { SignUpCommunity } from '../../components/organisms/SignUpCommunityComponent'
import { useStore } from '../../hooks/use-store'

export const SignUpCommunityPage: React.FC = () => {
  const { $ui } = useStore()

  useIonViewWillEnter(() => {
    $ui.setIsBottomTab(false)
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div slot='start'>
            <BackButton></BackButton>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <SignUpCommunity></SignUpCommunity>
      </IonContent>
    </IonPage>
  )
}
