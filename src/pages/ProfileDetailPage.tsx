import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { BackButton } from '../components/molecules/BackButtonComponent'
import { ProfileDetail } from '../components/molecules/ProfileDetailComponent'
import { useStore } from '../hooks/use-store'
import { route } from '../services/route-service'

export const ProfileDetailPage: React.FC = () => {
  const userId = parseInt(useParams<{ id: string }>().id)
  const { $ui, $auth } = useStore()

  useEffect(() => {
    $ui.setIsBottomTab(false)
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div slot='start'>
            <BackButton type='close' />
          </div>
          <IonTitle slot='start'>프로필 보기</IonTitle>

          {useObserver(
            () =>
              $auth.user.id === userId && (
                <button slot='end' onClick={() => route.profileDetailEdit(userId)}>
                  수정
                </button>
              )
          )}
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className='px-container'>
          <ProfileDetail userId={userId} />
        </div>
      </IonContent>
    </IonPage>
  )
}
