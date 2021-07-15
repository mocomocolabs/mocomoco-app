import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react'
import { useEffect } from 'react'
import { BackButton } from '../components/molecules/BackButtonComponent'
import { SignInEmail } from '../components/organisms/SignInEmailComponent'
import { useStore } from '../hooks/use-store'

export const LoginPage: React.FC = () => {
  const { $ui } = useStore()

  useEffect(() => {
    $ui.setIsBottomTab(false)
  }, [])

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
        <SignInEmail></SignInEmail>
      </IonContent>
    </IonPage>
  )
}
