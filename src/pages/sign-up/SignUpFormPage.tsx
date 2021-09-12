import { IonContent, IonHeader, IonPage } from '@ionic/react'
import { useEffect } from 'react'
import { BackButtonIntro } from '../../components/molecules/BackButtonIntroComponent'
import { SignUpForm } from '../../components/organisms/SignUpFormComponent'
import { useStore } from '../../hooks/use-store'

export const SignUpFormPage: React.FC = () => {
  const { $ui } = useStore()

  useEffect(() => {
    $ui.setIsBottomTab(false)
  }, [])

  return (
    <IonPage>
      <IonHeader className='ion-no-border'>
        <BackButtonIntro>
          환영합니다!
          <br />
          하마는 처음이신가요?
        </BackButtonIntro>
      </IonHeader>
      <IonContent>
        <div className='px-container'>
          <SignUpForm></SignUpForm>
        </div>
      </IonContent>
    </IonPage>
  )
}
