import { IonContent, IonPage, useIonViewWillEnter } from '@ionic/react'
import { BackButtonIntro } from '../../components/molecules/BackButtonIntroComponent'
import { SignUpCommunity } from '../../components/organisms/SignUpCommunityComponent'
import { useStore } from '../../hooks/use-store'

export const SignUpCommunityPage: React.FC = () => {
  const { $ui } = useStore()

  useIonViewWillEnter(() => {
    $ui.setIsBottomTab(false)
  })

  return (
    <IonPage>
      <IonContent>
        <div className='px-container'>
          <BackButtonIntro>
            참여하고 계신
            <br />
            공동체를 선택해주세요!
          </BackButtonIntro>
          <SignUpCommunity></SignUpCommunity>
        </div>
      </IonContent>
    </IonPage>
  )
}
