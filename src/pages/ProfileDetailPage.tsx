import { IonContent, IonPage } from '@ionic/react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { BackFloatingButton } from '../components/molecules/BackFloatingButtonComponent'
import { ProfileDetail } from '../components/molecules/ProfileDetailComponent'
import { useStore } from '../hooks/use-store'

export const ProfileDetailPage: React.FC = () => {
  const userId = parseInt(useParams<{ id: string }>().id)
  const { $ui } = useStore()

  useEffect(() => {
    $ui.setIsBottomTab(false)
  }, [])

  return (
    <IonPage>
      <IonContent>
        <BackFloatingButton />
        <div className='h-full'>
          <ProfileDetail userId={userId} />
        </div>
      </IonContent>
    </IonPage>
  )
}
