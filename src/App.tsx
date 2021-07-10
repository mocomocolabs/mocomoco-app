import { IonApp } from '@ionic/react'
import { when } from 'mobx'
import { useEffect, useState } from 'react'
import { Alert } from './components/atoms/AlertComponent'
import { Spinner } from './components/atoms/SpinnerComponent'
import { Toast } from './components/atoms/ToastComponent'
import { config } from './config'
import './global.scss'
import { useStore } from './hooks/use-store'
import { ISubChat } from './models/chat'
import { SIGN_UP_STATUS } from './models/sign-up.d'
import { RouterTab } from './RouterTab'
import { route } from './services/route-service'
import { storage } from './services/storage-service'
import { webSocket } from './services/web-socket-service'

export const App: React.FC = () => {
  const { $community, $chat, $auth } = useStore()
  const [intialized, setInitailzed] = useState(false)

  const init = async () => {
    // 로그인
    await Promise.all([
      //
      $auth.signInWithToken(),
      $community.getCommunities(),
    ])

    // login 이후 실행할 공통 호출들
    if ($auth.isLogin && $auth.user.communityId) {
      $community.setSelectedId($auth.user.communityId)

      if ($auth.user.status === SIGN_UP_STATUS.대기 && config.IS_PROD) {
        route.signUpComplete()
      }

      // 챗방 리스트 조회
      // TODO: SignInEmailComponent.tsx의 코드와 중복됌. 하나로 합칠 필요가 있을듯
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
    } else {
      if (!(await storage.getHaveSeenIntro())) {
        route.intro()
      }
    }

    setInitailzed(true)
  }

  useEffect(() => {
    const mobxWhen = when(
      () => $auth.isLogin === false,
      () => {
        init()
      }
    )

    return () => {
      mobxWhen()
    }
  }, [])

  return (
    <IonApp>
      {intialized ? <RouterTab /> : <Spinner isFull={true} color='white' />}

      <Alert></Alert>
      <Toast></Toast>
    </IonApp>
  )
}
