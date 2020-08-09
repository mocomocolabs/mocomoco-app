import './global.scss'

import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import React from 'react'
import { Redirect, Route } from 'react-router-dom'

import Menu from './components/Menu'
import News from './pages/example/News'
import Todo from './pages/example/Todo'

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId='main'>
          <Menu />
          <IonRouterOutlet id='main'>
            <Route path='/news' component={News} exact />
            <Route path='/todo' component={Todo} exact />
            <Redirect from='/' to='/news' exact />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  )
}

export default App
