import './Menu.css'

import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react'
import { heartOutline, heartSharp, mailOutline, mailSharp } from 'ionicons/icons'
import React from 'react'
import { useLocation } from 'react-router-dom'

interface AppPage {
  url: string
  iosIcon: string
  mdIcon: string
  title: string
}

const appPages: AppPage[] = [
  {
    title: 'Todo',
    url: '/todo',
    iosIcon: heartOutline,
    mdIcon: heartSharp,
  },
  {
    title: 'News',
    url: '/news',
    iosIcon: mailOutline,
    mdIcon: mailSharp,
  },
]

const Menu: React.FC = () => {
  const location = useLocation()

  return (
    <IonMenu contentId='main' type='overlay'>
      <IonContent forceOverscroll={false}>
        <IonList lines='none'>
          <IonListHeader>Inbox</IonListHeader>
          <IonNote>hi@ionicframework.com</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={location.pathname === appPage.url ? 'selected' : ''}
                  routerLink={appPage.url}
                  routerDirection='none'
                  lines='none'
                  detail={false}
                >
                  <IonIcon slot='start' icon={appPage.iosIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            )
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  )
}

export default Menu
