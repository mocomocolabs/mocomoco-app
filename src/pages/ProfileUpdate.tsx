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
import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { BackButton } from '../components/molecules/BackButtonComponent'
import { ProfileUpdateForm } from '../components/molecules/ProfileUpdateFormComponent'
import { useStore } from '../hooks/use-store'

export const ProfileUpdate: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const userId: number = parseInt(match.params.id)

  const { $ui } = useStore()

  useIonViewWillEnter(() => {
    $ui.setIsBottomTab(false)
  })

  useIonViewWillLeave(() => {
    $ui.setIsBottomTab(true)
  })

  const [submitAvailble, setSubmitAvailable] = useState(false)
  const handleSubmitAvailable = (isValid: boolean) => {
    setSubmitAvailable(isValid)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div slot='start'>
            <BackButton icon={chevronBack} />
          </div>
          <IonTitle slot='start'>프로필 수정</IonTitle>

          <button slot='end' form='profile-form' type='submit' disabled={!submitAvailble}>
            완료
          </button>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className='px-container flex-col items-center'>
          <ProfileUpdateForm userId={userId} handleSubmitAvailable={handleSubmitAvailable} />
        </div>
      </IonContent>
    </IonPage>
  )
}
