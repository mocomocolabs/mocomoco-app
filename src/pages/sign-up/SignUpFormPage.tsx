import { IonContent, IonHeader, IonPage, IonToolbar, useIonViewWillEnter } from '@ionic/react'
import { BackButton } from '../../components/molecules/BackButtonComponent'
import { SignUpForm } from '../../components/organisms/SignUpFormComponent'
import { useStore } from '../../hooks/use-store'

export const SignUpFormPage: React.FC = () => {
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
        <div className='px-container'>회원가입</div>
        <SignUpForm></SignUpForm>
      </IonContent>
    </IonPage>
  )
}
