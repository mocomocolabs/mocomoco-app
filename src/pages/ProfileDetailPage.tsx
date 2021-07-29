import { IonContent, IonPage } from '@ionic/react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { HeaderSubmitText } from '../components/atoms/HeaderSubmitText'
import { BackButton } from '../components/molecules/BackButtonComponent'
import { ProfileDetail } from '../components/molecules/ProfileDetailComponent'
import { Header } from '../components/organisms/HeaderComponent'
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
      <Header>
        <div slot='start' className='text-header'>
          <BackButton type='close'></BackButton>
        </div>
        <div className='text-header text-center'>프로필 보기</div>

        <div slot='end'>
          {$auth.user.id === userId && (
            <HeaderSubmitText
              text='수정'
              isSubmittable={true}
              onSubmit={() => route.profileDetailEdit(userId)}
            />
          )}
        </div>
      </Header>

      <IonContent>
        <div className='px-container'>
          <ProfileDetail userId={userId} />
        </div>
      </IonContent>
    </IonPage>
  )
}
