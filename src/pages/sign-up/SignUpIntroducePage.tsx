import { IonContent, IonHeader, IonPage } from '@ionic/react'
import { useEffect } from 'react'
import { BackButtonIntro } from '../../components/molecules/BackButtonIntroComponent'
import { SignUpIntroduceForm } from '../../components/organisms/SignUpIntroduceFormComponent'
import { useStore } from '../../hooks/use-store'

export const SignUpIntroducePage: React.FC = () => {
  const { $ui } = useStore()

  useEffect(() => {
    $ui.setIsBottomTab(false)
  }, [])

  return (
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent>
        <div className='px-container mt-8'>
          <BackButtonIntro>나는 누구인가요?</BackButtonIntro>
          <SignUpIntroduceForm />
        </div>
      </IonContent>
    </IonPage>
  )
}
