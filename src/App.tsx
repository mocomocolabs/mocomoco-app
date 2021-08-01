import { App as AppPlugin } from '@capacitor/app'
import { IonApp } from '@ionic/react'
import { when } from 'mobx'
import { useEffect, useState } from 'react'
import { Alert } from './components/atoms/AlertComponent'
import { Popover } from './components/atoms/PopoverComponent'
import { Spinner } from './components/atoms/SpinnerComponent'
import { Toast } from './components/atoms/ToastComponent'
import { config } from './config'
import './global.scss'
import { useStore } from './hooks/use-store'
import { SIGN_UP_STATUS } from './models/sign-up.d'
import { RouterTab } from './RouterTab'
import { route } from './services/route-service'
import { storage } from './services/storage-service'

export const App: React.FC = () => {
  const { $community, $chat, $auth, $stuff, $talent, $ui } = useStore()
  const [initialized, setInitailzed] = useState(false)

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

      $chat.connectRooms()
      $stuff.getCategories()
      $talent.getCategories()
    } else {
      if (!(await storage.getHaveSeenIntro())) {
        route.intro()
      }
    }

    setInitailzed(true)
  }

  useEffect(() => {
    const disposeInitReaction = when(
      () => $auth.isLogin === false,
      () => {
        init()
      }
    )

    return disposeInitReaction()
  }, [])

  useEffect(() => {
    AppPlugin.addListener('backButton', (event) => {
      if ($ui.popover.isOpen) {
        $ui.hidePopover()
        return
      }

      if ($ui.alert.isOpen) {
        $ui.hideAlert()
        return
      }

      if (!event.canGoBack) {
        AppPlugin.exitApp()
      } else {
        route.goBack()
      }
    })

    return () => {
      AppPlugin.removeAllListeners().then(() => {
        console.log('cleanup: removed all listeners!')
      })
    }
  }, [])

  return (
    <IonApp>
      {initialized ? <RouterTab /> : <Spinner position='center' color='white' />}

      <Popover />
      <Alert />
      <Toast />
    </IonApp>
  )
}
