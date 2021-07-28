import { IonContent, IonPage } from '@ionic/react'
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
      <IonContent>
        <div className='px-container ios-pt-container'>
          <BackButtonIntro>
            환영합니다!
            <br />
            하마는 처음이신가요?
          </BackButtonIntro>
          <SignUpForm></SignUpForm>
        </div>
      </IonContent>
    </IonPage>
  )
}
