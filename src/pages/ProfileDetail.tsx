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
import { useHistory } from 'react-router'
import { RouteComponentProps } from 'react-router-dom'
import { BackButton } from '../components/molecules/BackButtonComponent'
import { ProfileDetailItem } from '../components/molecules/ProfileDetailComponent'
import { useStore } from '../hooks/use-store'

export const ProfileDetail: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const userId: number = parseInt(match.params.id)
  const { $ui } = useStore()
  const history = useHistory()

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
          <IonTitle slot='start'>프로필 보기</IonTitle>

          <button slot='end' onClick={() => history.push(`/users/${userId}/edit`)}>
            수정
          </button>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className='px-container'>
          <ProfileDetailItem userId={userId} />
        </div>
      </IonContent>
    </IonPage>
  )
}
