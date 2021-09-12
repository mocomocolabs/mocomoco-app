import { IonContent, IonPage } from '@ionic/react'
import _ from 'lodash'
import { Observer } from 'mobx-react-lite'
import { useEffect, useMemo } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { BackButton } from '../components/molecules/BackButtonComponent'
import { StuffTalentItem } from '../components/molecules/StuffTalentItemComponent'
import { ChatInsertForm } from '../components/organisms/ChatInsertFormComponent'
import { ChatRoomDetail } from '../components/organisms/ChatRoomDetailComponent'
import { Footer } from '../components/organisms/FooterComponent'
import { Header } from '../components/organisms/HeaderComponent'
import { useStore } from '../hooks/use-store'
import { ChatRoomType } from '../models/chat.d'
import { StuffTalentPageKey } from '../models/stufftalent.d'

interface ILocationState {
  autoFocus?: boolean
}

export const ChatRoomPage: React.FC = () => {
  // TODO: 1:1 개인 채팅시, 첫 채팅 후 채팅방이 생성되도록 수정 필요
  const roomId = parseInt(useParams<{ id: string }>().id)
  const autoFocus = useHistory<ILocationState>().location.state?.autoFocus

  const { $ui, $chat, $auth } = useStore()

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

  const roomName = useMemo(() => {
    return (
      <Observer>
        {() => {
          const roomName =
            $chat.room?.type === ChatRoomType.CLUB
              ? $chat.room?.name
              : $chat.room?.users.find(({ id }) => id !== $auth.user.id)?.nickname

          return <>{roomName}</>
        }}
      </Observer>
    )
  }, [])

  // TODO 코드가 지저분하다. 리팩토링 필요함
  const topFixedContent = useMemo(
    () => (
      <Observer>
        {() => {
          const type = $chat.room?.type

          if (type === ChatRoomType.STUFF && !!$chat.room?.stuff?.id) {
            return (
              <div className='mx-5 mt-3'>
                <StuffTalentItem
                  item={$chat.room?.stuff}
                  loginUserId={$auth.user.id}
                  pageKey={StuffTalentPageKey.STUFF}
                  hideMoreIcon
                  thin
                />
              </div>
            )
          }

          if (type === ChatRoomType.TALENT && !!$chat.room?.talent?.id) {
            return (
              <div className='mx-5 mt-3'>
                <StuffTalentItem
                  item={$chat.room?.talent}
                  loginUserId={$auth.user.id}
                  pageKey={StuffTalentPageKey.TALENT}
                  hideMoreIcon
                  thin
                />
              </div>
            )
          }

          return <></>
        }}
      </Observer>
    ),
    []
  )

  return (
    <IonPage>
      <Header start={<BackButton type='arrow' />} center={roomName} bottom={topFixedContent} />

      <IonContent>
        <ChatRoomDetail />
      </IonContent>

      <Footer>
        <ChatInsertForm roomId={roomId} autoFocus={autoFocus} />
      </Footer>
    </IonPage>
  )
}
