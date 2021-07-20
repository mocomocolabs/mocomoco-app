import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react'
import _ from 'lodash'
import { Observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { BackButton } from '../components/molecules/BackButtonComponent'
import { ChatInsertForm } from '../components/organisms/ChatInsertFormComponent'
import { ChatRoomDetail } from '../components/organisms/ChatRoomDetailComponent'
import { Footer } from '../components/organisms/FooterComponent'
import { useStore } from '../hooks/use-store'

interface ILocationState {
  autoFocus?: boolean
}

export const ChatRoomPage: React.FC = () => {
  // TODO: 1:1 개인 채팅시, 첫 채팅 후 채팅방이 생성되도록 수정 필요
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
          <Observer>{() => <div className='text-header text-center'>{$chat.room?.name}</div>}</Observer>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <ChatRoomDetail></ChatRoomDetail>
      </IonContent>

      <Footer>
        <ChatInsertForm roomId={roomId} autoFocus={autoFocus}></ChatInsertForm>
      </Footer>
    </IonPage>
  )
}
