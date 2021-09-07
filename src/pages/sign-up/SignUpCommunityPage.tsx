import { IonContent, IonPage } from '@ionic/react'
import { useEffect } from 'react'
import { BackButtonIntro } from '../../components/molecules/BackButtonIntroComponent'
import { SignUpCommunity } from '../../components/organisms/SignUpCommunityComponent'
import { useStore } from '../../hooks/use-store'

export const SignUpCommunityPage: React.FC = () => {
  const { $ui } = useStore()

  useEffect(() => {
    $ui.setIsBottomTab(false)
  }, [])

  return (
    <IonPage>
      <IonContent>
        <div className='px-container ios-pt-container'>
          <BackButtonIntro>나의 마을은 어디인가요?</BackButtonIntro>
          <SignUpCommunity />
        </div>
      </IonContent>
    </IonPage>
  )
}
