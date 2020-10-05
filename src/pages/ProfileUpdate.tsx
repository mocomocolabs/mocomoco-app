import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from '@ionic/react'
import { chevronBack } from 'ionicons/icons'
import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { BackButton } from '../components/molecules/BackButtonComponent'
import { ProfileUpdateForm } from '../components/molecules/ProfileUpdateFormComponent'
import { useStore } from '../hooks/use-store'

export const ProfileUpdate: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const { $ui } = useStore()
  const userId: number = parseInt(match.params.id)

  useIonViewWillEnter(() => {
    $ui.setIsBottomTab(false)
  })

  useIonViewWillLeave(() => {
    $ui.setIsBottomTab(true)
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div slot='start'>
            <BackButton icon={chevronBack} />
          </div>
          <IonTitle slot='start'>프로필 수정</IonTitle>

          <button slot='end' form='profile-form' type='submit'>
            완료
          </button>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className='px-container flex-col items-center'>
          <ProfileUpdateForm userId={userId} />
        </div>
      </IonContent>
    </IonPage>
  )
}
