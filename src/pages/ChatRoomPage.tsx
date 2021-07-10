import { IonContent, IonFooter, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import _ from 'lodash'
import { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { BackButton } from '../components/molecules/BackButtonComponent'
import { ChatInsertForm } from '../components/organisms/ChatInsertFormComponent'
import { ChatRoomDetail } from '../components/organisms/ChatRoomDetailComponent'
import { useStore } from '../hooks/use-store'

interface ILocationState {
  autoFocus?: boolean
}

export const ChatRoomPage: React.FC = () => {
  const roomId = parseInt(useParams<{ id: string }>().id)
  const autoFocus = useHistory<ILocationState>().location.state?.autoFocus

  const { $ui, $chat } = useStore()

  useEffect(() => {
    $ui.setIsBottomTab(false)

    return () => $chat.setCurrentRoomId(null)
  }, [])

  useEffect(() => {
    // TODO : 접근제한 테스트 필요
    if (roomId !== undefined) $chat.setCurrentRoomId(roomId)
    const curReadChatId = $chat.storeRoom?.readChatId
    const lastReadChatId = _.maxBy($chat.room?.chats, (v) => v.createdAt)?.id

    // 방입장시 읽음 처리
    if (lastReadChatId !== undefined && curReadChatId !== undefined && lastReadChatId > curReadChatId) {
      $chat.setLastChatId({
        roomId,
        readChatId: lastReadChatId,
      })
    }
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div slot='start'>
            <BackButton type='arrow' />
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
        <ChatInsertForm roomId={roomId} autoFocus={autoFocus}></ChatInsertForm>
      </IonFooter>
    </IonPage>
  )
}
