import { IonApp, IonIcon, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { basket, beer, home, paperPlane, people, personCircle } from 'ionicons/icons'
import { useObserver } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { Redirect, Route } from 'react-router-dom'
import './App.scss'
import { Alert } from './components/atoms/AlertComponent'
import { Spinner } from './components/atoms/SpinnerComponent'
import { Toast } from './components/atoms/ToastComponent'
import './global.scss'
import { GuardRoute } from './GuardRoute'
import { useStore } from './hooks/use-store'
import { ChatPage } from './pages/ChatPage'
import { ChatRoomPage } from './pages/ChatRoomPage'
import { ClubDetailPage } from './pages/club/ClubDetailPage'
import { ClubFormPage } from './pages/club/ClubFormPage'
import { ClubPage } from './pages/club/ClubPage'
import { DevPage } from './pages/DevPage'
import { FeedDetailPage } from './pages/FeedDetailPage'
import { FeedPage } from './pages/FeedPage'
import { FeedWritePage } from './pages/FeedWritePage'
import { HomePage } from './pages/HomePage'
import { MyPage } from './pages/MyPage'
import { ProfileDetailPage } from './pages/ProfileDetailPage'
import { ProfileUpdatePage } from './pages/ProfileUpdatePage'
import { SettingsPage } from './pages/SettingsPage'
import { SignUpCommunityPage } from './pages/sign-up/SignUpCommunityPage'
import { SignUpFormPage } from './pages/sign-up/SignUpFormPage'
import { SignUpPage } from './pages/sign-up/SignUpPage'
import { SignInPage } from './pages/SignInPage'
import { TradePage } from './pages/TradePage'
import { route } from './services/route-service'
import { storage } from './services/storage-service'

export const App: React.FC = () => {
  const { $community, $ui, $chat, $auth } = useStore()
  const [intialized, setInitailzed] = useState(false)

  useEffect(() => {
    init()
    // eslint-disable-next-line
  }, [])

  const init = async () => {
    // 로그인
    await Promise.all([
      //
      $auth.signInWithToken(),
      $community.getCommunities(),
    ])

    // $auth.setIsLogin()

    // TODO: login 이후 실행할 공통 호출들
    if ($auth.user && !storage.communityId) {
      storage.setCommunityId($auth.user.communities[0].id)
    }
    $community.setSelectedId(storage.communityId)
    $chat.getRooms()
    setInitailzed(true)
  }

  return useObserver(() => (
    <IonApp>
      {intialized ? (
        <IonReactRouter history={route.history}>
          <IonTabs>
            <IonRouterOutlet id='main'>
              <Route path='/dev' component={DevPage} exact />
              <Route path='/sign-in' component={SignInPage} exact />
              <Route path='/sign-up' component={SignUpPage} exact />
              <Route path='/sign-up/community' component={SignUpCommunityPage} exact />
              <Route path='/sign-up/form' component={SignUpFormPage} exact />
              <GuardRoute path='/home' component={HomePage} exact />
              <GuardRoute path='/feed' component={FeedPage} exact />
              <GuardRoute path='/feed/:id' component={FeedDetailPage} exact />
              <GuardRoute path='/feed-write' component={FeedWritePage} exact />
              {/* TODO fix it */}
              <GuardRoute path='/stuff' component={TradePage} exact />
              <GuardRoute path='/talent' component={TradePage} exact />
              <GuardRoute path='/club' component={ClubPage} exact />
              <GuardRoute path='/club-form' component={ClubFormPage} exact />
              <GuardRoute path='/club/:id' component={ClubDetailPage} exact />
              <GuardRoute path='/trade' component={TradePage} exact />
              <GuardRoute path='/chat' component={ChatPage} exact />
              <GuardRoute path='/chat/:id' component={ChatRoomPage} exact />
              <GuardRoute path='/my-page' component={MyPage} exact />
              <GuardRoute path='/settings' component={SettingsPage} exact />
              <GuardRoute path='/users/:id' component={ProfileDetailPage} exact />
              <GuardRoute path='/users/:id/edit' component={ProfileUpdatePage} exact />
              <Redirect from='/' to='/home' exact />
            </IonRouterOutlet>
            <IonTabBar slot='bottom' hidden={!$ui.isBottomTab}>
              <IonTabButton tab='home' href='/home'>
                <IonIcon icon={home} />
              </IonTabButton>
              <IonTabButton tab='feed' href='/feed'>
                <IonIcon icon={beer} />
              </IonTabButton>
              <IonTabButton tab='stuff' href='/stuff'>
                <IonIcon icon={basket} />
              </IonTabButton>
              <IonTabButton tab='chat' href='/chat'>
                <IonIcon icon={paperPlane} />
                {$chat.countUnread > 0 && <div className='badge'></div>}
              </IonTabButton>
              <IonTabButton tab='club' href='/club'>
                <IonIcon icon={people} />
              </IonTabButton>
              <IonTabButton tab='my-page' href='/my-page'>
                <IonIcon icon={personCircle} />
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      ) : (
        <Spinner isFull={true} color='white'></Spinner>
      )}

      <Alert></Alert>
      <Toast></Toast>
    </IonApp>
  ))
}
