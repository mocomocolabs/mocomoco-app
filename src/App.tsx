import { IonApp, IonIcon, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { basket, beer, home, paperPlane, personCircle } from 'ionicons/icons'
import { useObserver } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'
import './App.scss'
import { Alert } from './components/molecules/AlertComponent'
import './global.scss'
import { useStore } from './hooks/use-store'
import { ChatPage } from './pages/ChatPage'
import { ChatRoomPage } from './pages/ChatRoomPage'
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
import { TradePage } from './pages/TradePage'
import { route } from './route'

export const App: React.FC = () => {
  const { $community, $ui, $chat } = useStore()

  useEffect(() => {
    // TODO: login 이후 실행할 공통 호출들
    $community.getCommunities()
    $chat.getRooms()
    // eslint-disable-next-line
  }, [])

  return useObserver(() => (
    <IonApp>
      <IonReactRouter history={route.history}>
        <IonTabs>
          <IonRouterOutlet id='main'>
            <Route path='/sign-up/community' component={SignUpCommunityPage} exact />
            <Route path='/sign-up/form' component={SignUpFormPage} exact />
            <Route path='/home' component={HomePage} exact />
            <Route path='/feed' component={FeedPage} exact />
            <Route path='/feed/:id' component={FeedDetailPage} exact />
            <Route path='/feed-write' component={FeedWritePage} exact />
            <Route path='/trade' component={TradePage} exact />
            <Route path='/chat' component={ChatPage} exact />
            <Route path='/chat/:id' component={ChatRoomPage} exact />
            <Route path='/my-page' component={MyPage} exact />
            <Route path='/settings' component={SettingsPage} exact />
            <Route path='/users/:id' component={ProfileDetailPage} exact />
            <Route path='/users/:id/edit' component={ProfileUpdatePage} exact />
            <Redirect from='/' to='/home' exact />
          </IonRouterOutlet>
          <IonTabBar slot='bottom' hidden={!$ui.isBottomTab}>
            <IonTabButton tab='home' href='/home'>
              <IonIcon icon={home} />
            </IonTabButton>
            <IonTabButton tab='feed' href='/feed'>
              <IonIcon icon={beer} />
            </IonTabButton>
            <IonTabButton tab='trade' href='/trade'>
              <IonIcon icon={basket} />
            </IonTabButton>
            <IonTabButton tab='chat' href='/chat'>
              <IonIcon icon={paperPlane} />
              {$chat.countUnread > 0 && <div className='badge'></div>}
            </IonTabButton>
            <IonTabButton tab='my-page' href='/my-page'>
              <IonIcon icon={personCircle} />
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>

      <Alert></Alert>
    </IonApp>
  ))
}
