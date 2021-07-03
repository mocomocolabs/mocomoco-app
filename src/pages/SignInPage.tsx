import { IonContent, IonPage, useIonViewWillEnter } from '@ionic/react'
import { Pad } from '../components/atoms/PadComponent'
import { BackButtonIntro } from '../components/molecules/BackButtonIntroComponent'
import { SignInEmail } from '../components/organisms/SignInEmailComponent'
import { useStore } from '../hooks/use-store'

export const SignInPage: React.FC = () => {
  const { $ui } = useStore()

  useIonViewWillEnter(() => {
    $ui.setIsBottomTab(false)
  })

  return (
    <IonPage>
      <IonContent>
        <div className='px-container'>
          <BackButtonIntro>
            이미 회원이시군요!
            <br /> 다시 만나서 반가워요 :)
          </BackButtonIntro>
          <Pad className='height-50'></Pad>
          <SignInEmail></SignInEmail>
        </div>
      </IonContent>
    </IonPage>
  )
}
