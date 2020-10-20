import {
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from '@ionic/react'
import React, { useEffect } from 'react'
import { StaticContext } from 'react-router'
import { RouteComponentProps } from 'react-router-dom'
import { BackButton } from '../components/molecules/BackButtonComponent'
import { ChatInsertForm } from '../components/organisms/ChatInsertFormComponent'
import { ChatRoomDetail } from '../components/organisms/ChatRoomDetailComponent'
import { useStore } from '../hooks/use-store'

interface ILocationState {
  autoFocus?: boolean
}

export const ChatRoom: React.FC<RouteComponentProps<{ id: string }, StaticContext, ILocationState>> = ({
  match,
  location,
}) => {
  const roomId: number = parseInt(match.params.id)

  const { $ui, $chat } = useStore()

  useEffect(() => {
    // TODO : 접근제한 테스트 필요
  }, [])

  useIonViewWillEnter(() => {
    $ui.setIsBottomTab(false)
  })

  useIonViewWillLeave(() => {
    $ui.setIsBottomTab(true)
    $chat.setCurrentRoomId(null)
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div slot='start'>
            <BackButton />
          </div>
          <IonTitle slot='start'>쪽지 보내기</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className='px-container flex-col justify-end'>
          <ChatRoomDetail roomId={roomId}></ChatRoomDetail>
        </div>
      </IonContent>

      <IonFooter>
        <ChatInsertForm roomId={roomId} autoFocus={location?.state?.autoFocus}></ChatInsertForm>
      </IonFooter>
    </IonPage>
  )
}
