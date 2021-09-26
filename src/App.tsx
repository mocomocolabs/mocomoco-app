import { App as AppPlugin } from '@capacitor/app'
import { Capacitor } from '@capacitor/core'
import { SplashScreen } from '@capacitor/splash-screen'
import { StatusBar, Style } from '@capacitor/status-bar'
import { IonApp } from '@ionic/react'
import { reaction } from 'mobx'
import { useEffect, useState } from 'react'
import { Alert } from './components/atoms/AlertComponent'
import { Popover } from './components/atoms/PopoverComponent'
import { Spinner } from './components/atoms/SpinnerComponent'
import { Toast } from './components/atoms/ToastComponent'
import { Modal } from './components/modals/ModalComponent'
import './global.scss'
import { useStore } from './hooks/use-store'
import { cannotGoBackPaths, RouterTab } from './RouterTab'
import { route } from './services/route-service'
import { storage } from './services/storage-service'

export const App: React.FC = () => {
  const { $community, $chat, $auth, $stuff, $talent, $ui } = useStore()
  const [initialized, setInitailzed] = useState(false)

  const init = async () => {
    console.log('app init called')

    if (Capacitor.isNativePlatform()) {
      StatusBar.setStyle({ style: Style.Light })

      SplashScreen.hide({ fadeOutDuration: 300 })
    }

    await $community.getCommunities()

    if (!(await storage.getHaveSeenIntro())) {
      route.intro()
    } else {
      await $auth.signInWithToken()
    }

    setInitailzed(true)
  }

  const onLogin = async () => {
    console.log('login reaction')

    $community.setSelectedId($auth.user.communityId)
    $chat.connectRooms()
    $stuff.getCategories()
    $talent.getCategories()

    route.home()
  }

  const onLogout = async () => {
    console.log('logout reaction')

    $community.setSelectedId(null)
    $chat.disconnect()

    route.intro()
  }

  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    const disposeLoginReaction = reaction(
      () => $auth.isLogin,
      async (isLogin: boolean) => {
        isLogin && $auth.user.communityId ? onLogin() : onLogout()
      }
    )

    return () => disposeLoginReaction()
  }, [])

  useEffect(() => {
    AppPlugin.addListener('backButton', (event) => {
      if ($ui.modal.isOpen) {
        $ui.hideModal()
        return
      }

      if ($ui.popover.isOpen) {
        $ui.hidePopover()
        return
      }

      if ($ui.alert.isOpen) {
        $ui.hideAlert()
        return
      }

      const canGoBack = event.canGoBack && !cannotGoBackPaths.includes(location.pathname)
      canGoBack ? route.goBack() : AppPlugin.exitApp()
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

      <Modal />
      <Popover />
      <Alert />
      <Toast />
    </IonApp>
  )
}
