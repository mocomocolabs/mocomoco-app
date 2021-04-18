import { IonContent, IonHeader, IonPage, IonToolbar, useIonViewWillEnter } from '@ionic/react'
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
            <BackButton type='arrow'></BackButton>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <SignUpCommunity></SignUpCommunity>
      </IonContent>
    </IonPage>
  )
}
