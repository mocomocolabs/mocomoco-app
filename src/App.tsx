import { IonApp, IonIcon, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { basket, beer, home, paperPlane, personCircle } from 'ionicons/icons'
import { useObserver } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { Alert } from './components/molecules/AlertComponent'
import './global.scss'
import { useStore } from './hooks/use-store'
import { Chat } from './pages/Chat'
import { ChatRoom } from './pages/ChatRoom'
import { Feed } from './pages/Feed'
import { FeedDetail } from './pages/FeedDetail'
import { FeedWrite } from './pages/FeedWrite'
import { Home } from './pages/Home'
import { MyPage } from './pages/MyPage'
import { ProfileDetail } from './pages/ProfileDetail'
import { ProfileUpdate } from './pages/ProfileUpdate'
import { Settings } from './pages/Settings'
import { Trade } from './pages/Trade'
import { route } from './route'

export const App: React.FC = () => {
  const { $community, $ui } = useStore()

  useEffect(() => {
    // TODO: login 이후 실행할 공통 호출들
    $community.getCommunities()

    // eslint-disable-next-line
  }, [])

  return useObserver(() => (
    <IonApp>
      <IonReactRouter history={route.history}>
        <IonTabs>
          <IonRouterOutlet id='main'>
            <Route path='/home' component={Home} exact />
            <Route path='/feed' component={Feed} exact />
            <Route path='/feed/:id' component={FeedDetail} exact />
            <Route path='/feed-write' component={FeedWrite} exact />
            <Route path='/trade' component={Trade} exact />
            <Route path='/chat' component={Chat} exact />
            <Route path='/chat/:id' component={ChatRoom} exact />
            <Route path='/my-page' component={MyPage} exact />
            <Route path='/settings' component={Settings} exact />
            <Route path='/users/:id' component={ProfileDetail} exact />
            <Route path='/users/:id/edit' component={ProfileUpdate} exact />
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
