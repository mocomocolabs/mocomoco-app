import { IonContent, IonHeader, IonPage, IonToolbar, useIonViewWillEnter } from '@ionic/react'
import { BackButton } from '../components/molecules/BackButtonComponent'
import { SignInEmail } from '../components/organisms/SignInEmailComponent'
import { useStore } from '../hooks/use-store'
import { route } from '../services/route-service'

export const SignInPage: React.FC = () => {
  const { $ui } = useStore()

  useIonViewWillEnter(() => {
    $ui.setIsBottomTab(false)
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div slot='start'>
            <BackButton action={() => route.signUp()}></BackButton>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <SignInEmail></SignInEmail>
      </IonContent>
    </IonPage>
  )
}
