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
import { useObserver } from 'mobx-react-lite'
import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { BackButton } from '../components/molecules/BackButtonComponent'
import { ProfileDetailItem } from '../components/molecules/ProfileDetailComponent'
import { useStore } from '../hooks/use-store'
import { route } from '../route'

export const ProfileDetail: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const userId: number = parseInt(match.params.id)
  const { $ui, $user } = useStore()

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

          {useObserver(
            () =>
              $user.currentUserId === userId && (
                <button slot='end' onClick={() => route.profileDetailEdit(userId)}>
                  수정
                </button>
              )
          )}
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
