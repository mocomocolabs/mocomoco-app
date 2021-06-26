import { IonApp } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import './App.scss'
import { Alert } from './components/atoms/AlertComponent'
import { Spinner } from './components/atoms/SpinnerComponent'
import { Toast } from './components/atoms/ToastComponent'
import './global.scss'
import { useStore } from './hooks/use-store'
import { ISubChat } from './models/chat'
import { RouterTab } from './RouterTab'
import { storage } from './services/storage-service'
import { webSocket } from './services/web-socket-service'

export const App: React.FC = () => {
  const { $community, $ui, $chat, $auth } = useStore()
  const [intialized, setInitailzed] = useState(false)

  useEffect(() => {
    init()
    // eslint-disable-next-line
  }, [])

  // useEffect(() => {}, [$chat.unReadCountAll])

  const init = async () => {
    // 로그인
    await Promise.all([
      //
      $auth.signInWithToken(),
      $community.getCommunities(),
    ])

    // $auth.setIsLogin()

    // TODO: login 이후 실행할 공통 호출들
    if ($auth.isLogin && $auth.user.communityId && !storage.communityId) {
      $community.setSelectedId($auth.user.communityId)

      // 챗방 리스트 조회
      await $chat.getRooms({ roomIds: $auth.user.chatroomIds })
      // 웹소켓 연결
      webSocket.init()
      webSocket.connectRooms(
        $chat.rooms.map((v) => v.id),
        (data) => {
          const subChat = JSON.parse(data.body) as ISubChat
          $chat.setChat(subChat)
          $chat.setLastChatId({
            roomId: subChat.chatroom.id,
            readChatId: subChat.id,
          })
        }
      )
    }

    setInitailzed(true)
  }

  return useObserver(() => (
    <IonApp>
      {intialized ? (
        <RouterTab chatUnreadCount={$chat.unReadCountAll} isShow={$ui.isBottomTab}></RouterTab>
      ) : (
        <Spinner isFull={true} color='white'></Spinner>
      )}

      <Alert></Alert>
      <Toast></Toast>
    </IonApp>
  ))
}
