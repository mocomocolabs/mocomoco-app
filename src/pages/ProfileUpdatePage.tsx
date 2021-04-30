import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react'
import { useCallback, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { BackButton } from '../components/molecules/BackButtonComponent'
import { ProfileUpdateFormComponent } from '../components/molecules/ProfileUpdateFormComponent'
import { useStore } from '../hooks/use-store'

export const ProfileUpdatePage: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const userId: number = parseInt(match.params.id)

  const { $ui } = useStore()

  useIonViewWillEnter(() => {
    $ui.setIsBottomTab(false)
  })

  const [submittable, setSubmittable] = useState(false)
  const onSubmittableChange = useCallback((available: boolean) => setSubmittable(available), [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div slot='start'>
            <BackButton type='close' />
          </div>
          <IonTitle slot='start'>프로필 수정</IonTitle>

          <button slot='end' form='profile-form' type='submit' disabled={!submittable}>
            완료
          </button>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className='px-container flex-col items-center'>
          <ProfileUpdateFormComponent userId={userId} onSubmittableChange={onSubmittableChange} />
        </div>
      </IonContent>
    </IonPage>
  )
}
