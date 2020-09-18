import { IonApp, IonIcon, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { basket, beer, home, paperPlane, personCircle } from 'ionicons/icons'
import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import './global.scss'
import Chat from './pages/Chat'
import Community from './pages/Community'
import Home from './pages/Home'
import MyPage from './pages/MyPage'
import Trade from './pages/Trade'

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet id='main'>
            <Route path='/home' component={Home} exact />
            <Route path='/feed' component={Community} exact />
            <Route path='/trade' component={Trade} exact />
            <Route path='/chat' component={Chat} exact />
            <Route path='/my-page' component={MyPage} exact />
            <Redirect from='/' to='/home' exact />
          </IonRouterOutlet>
          <IonTabBar slot='bottom'>
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
    </IonApp>
  )
}

export default App
